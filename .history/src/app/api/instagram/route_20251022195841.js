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
      "timestamp"
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
    return new Response(JSON.stringify({ data: data.data || [] }), {
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
