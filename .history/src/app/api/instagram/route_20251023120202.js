export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || 50;

  const IG_TOKEN = process.env.IG_ACCESS_TOKEN; // Instagram Basic Display (user token)
  const FB_TOKEN = process.env.FB_GRAPH_TOKEN || process.env.FB_USER_TOKEN; // Facebook Graph user token (for IG Business)
  const GRAPH_VERSION = process.env.GRAPH_API_VERSION || "v20.0";

  // Helper to normalize and flatten carousel children
  const normalize = (arr) => {
    const out = [];
    (arr || []).forEach((m) => {
      if (m.media_type === "CAROUSEL_ALBUM" && m.children && m.children.data) {
        m.children.data.forEach((child) => {
          out.push({
            id: `${m.id}_${child.media_url?.slice(-8) || Math.random().toString(36).slice(2)}`,
            caption: m.caption,
            media_type: child.media_type,
            media_url: child.media_url,
            thumbnail_url: child.thumbnail_url,
            permalink: m.permalink,
            timestamp: m.timestamp,
          });
        });
      } else {
        out.push(m);
      }
    });
    return out;
  };

  try {
    const fields = [
      "id",
      "caption",
      "media_type",
      "media_url",
      "thumbnail_url",
      "permalink",
      "timestamp",
      "children{media_type,media_url,thumbnail_url}",
    ].join(",");

    if (IG_TOKEN) {
      // Instagram Basic Display API path (personal accounts)
      const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${IG_TOKEN}&limit=${limit}`;
      const res = await fetch(url, { next: { revalidate: 300 } });
      if (!res.ok) {
        const text = await res.text();
        return new Response(
          JSON.stringify({ provider: "basic_display", error: "Instagram API error", detail: text }),
          { status: 500, headers: { "content-type": "application/json" } }
        );
      }
      const data = await res.json();
      return new Response(JSON.stringify({ data: normalize(data.data) }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (FB_TOKEN) {
      // Facebook Graph API path for Instagram Business/Creator accounts
      // 1) Use direct IG user id if provided
      let igUserId = process.env.IG_BUSINESS_USER_ID;

      // 2) Otherwise discover via connected Pages -> instagram_business_account
      if (!igUserId) {
        const pagesRes = await fetch(
          `https://graph.facebook.com/${GRAPH_VERSION}/me/accounts?access_token=${encodeURIComponent(FB_TOKEN)}`,
          { next: { revalidate: 120 } }
        );
        if (!pagesRes.ok) {
          const detail = await pagesRes.text();
          return new Response(
            JSON.stringify({ provider: "graph_business", step: "list_pages", error: detail }),
            { status: 500, headers: { "content-type": "application/json" } }
          );
        }
        const pagesJson = await pagesRes.json();
        const pages = Array.isArray(pagesJson?.data) ? pagesJson.data : [];
        for (const p of pages) {
          const igRes = await fetch(
            `https://graph.facebook.com/${GRAPH_VERSION}/${p.id}?fields=instagram_business_account&access_token=${encodeURIComponent(FB_TOKEN)}`,
            { next: { revalidate: 120 } }
          );
          if (!igRes.ok) continue;
          const igJson = await igRes.json();
          const id = igJson?.instagram_business_account?.id;
          if (id) { igUserId = id; break; }
        }
      }

      if (!igUserId) {
        return new Response(
          JSON.stringify({ error: "IG business account not found. Provide IG_BUSINESS_USER_ID or a token with pages_show_list + instagram_basic and a connected Page." }),
          { status: 500, headers: { "content-type": "application/json" } }
        );
      }

      const mediaUrl = `https://graph.facebook.com/${GRAPH_VERSION}/${igUserId}/media?fields=${fields}&limit=${limit}&access_token=${encodeURIComponent(FB_TOKEN)}`;
      const mediaRes = await fetch(mediaUrl, { next: { revalidate: 300 } });
      if (!mediaRes.ok) {
        const detail = await mediaRes.text();
        return new Response(
          JSON.stringify({ provider: "graph_business", error: "Instagram Business API error", detail }),
          { status: 500, headers: { "content-type": "application/json" } }
        );
      }
      const mediaJson = await mediaRes.json();
      return new Response(JSON.stringify({ data: normalize(mediaJson.data) }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ error: "Missing token. Set IG_ACCESS_TOKEN (Basic Display) or FB_GRAPH_TOKEN (Graph user token)." }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
