export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const urlsParam = searchParams.get("urls");

  const APP_ID = process.env.FB_APP_ID || process.env.THREADS_APP_ID || process.env.NEXT_PUBLIC_FB_APP_ID;
  const APP_SECRET = process.env.FB_APP_SECRET || process.env.THREADS_APP_SECRET;
  const VERSION = process.env.GRAPH_API_VERSION || "v20.0";

  if (!APP_ID || !APP_SECRET) {
    return new Response(
      JSON.stringify({ error: "Missing FB_APP_ID/FB_APP_SECRET (or THREADS_APP_ID/THREADS_APP_SECRET) for oEmbed" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  let urls = [];
  if (urlsParam) {
    urls = urlsParam.split(/[\n,]/).map((u) => u.trim()).filter(Boolean);
  } else if (process.env.INSTAGRAM_POST_URLS) {
    urls = process.env.INSTAGRAM_POST_URLS.split(/[\n,]/).map((u) => u.trim()).filter(Boolean);
  }

  if (!urls.length) {
    return new Response(JSON.stringify({ data: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const token = `${APP_ID}|${APP_SECRET}`;
    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          const endpoint = `https://graph.facebook.com/${VERSION}/oembed_instagram?url=${encodeURIComponent(url)}&access_token=${encodeURIComponent(token)}&omitscript=true&hidecaption=false`;
          const res = await fetch(endpoint, { next: { revalidate: 300 } });
          if (!res.ok) {
            const detail = await res.text();
            return { error: true, url, detail };
          }
          const data = await res.json();
          return {
            id: data?.author_id ? `${data.author_id}_${Date.now()}` : url,
            caption: data?.title || data?.author_name || "",
            media_type: "IMAGE",
            media_url: data?.thumbnail_url || null,
            thumbnail_url: data?.thumbnail_url || null,
            permalink: url,
            timestamp: Date.now(),
            provider: "instagram_oembed",
          };
        } catch (e) {
          return { error: true, url, detail: e.message };
        }
      })
    );

    const ok = results.filter((r) => !r.error && r.media_url);
    return new Response(JSON.stringify({ data: ok }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
