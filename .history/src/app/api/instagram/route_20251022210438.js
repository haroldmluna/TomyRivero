export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || 50;
  const ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;

  if (!ACCESS_TOKEN) {
    return new Response(
      JSON.stringify({ error: "Missing IG_ACCESS_TOKEN in environment" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  try {
    const fields = [
      "id",
      "caption",
      "media_type",
      "media_url",
      "thumbnail_url",
      "permalink",
      "timestamp",
      // Expand carousel children to get individual media_url entries
      "children{media_type,media_url,thumbnail_url}"
    ].join(",");

    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${ACCESS_TOKEN}&limit=${limit}`;
    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      const text = await res.text();
      return new Response(JSON.stringify({ error: "Instagram API error", detail: text }), {
        status: 500,
        headers: { "content-type": "application/json" }
      });
    }

    const data = await res.json();

    const flatten = [];
    (data.data || []).forEach((m) => {
      if (m.media_type === "CAROUSEL_ALBUM" && m.children && m.children.data) {
        m.children.data.forEach((child) => {
          flatten.push({
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
        flatten.push(m);
      }
    });

    return new Response(JSON.stringify({ data: flatten }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
}
