export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const urlsParam = searchParams.get("urls");

  const APP_ID = process.env.THREADS_APP_ID || process.env.FB_APP_ID || process.env.NEXT_PUBLIC_FB_APP_ID;
  const APP_SECRET = process.env.THREADS_APP_SECRET || process.env.FB_APP_SECRET;

  if (!APP_ID || !APP_SECRET) {
    return new Response(
      JSON.stringify({ error: "Missing THREADS_APP_ID/THREADS_APP_SECRET in environment" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  // Build list of thread URLs to embed
  let urls = [];
  if (urlsParam) {
    urls = urlsParam.split(/[,\n]/).map((u) => u.trim()).filter(Boolean);
  } else if (process.env.THREADS_POST_URLS) {
    urls = process.env.THREADS_POST_URLS.split(/[,\n]/).map((u) => u.trim()).filter(Boolean);
  }

  if (!urls.length) {
    return new Response(JSON.stringify({ data: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const token = `${APP_ID}|${APP_SECRET}`;
    const version = process.env.GRAPH_API_VERSION || "v19.0";

    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          const api = `https://graph.facebook.com/${version}/oembed_thread?url=${encodeURIComponent(url)}&access_token=${encodeURIComponent(token)}`;
          const res = await fetch(api, { next: { revalidate: 300 } });
          if (!res.ok) {
            const detail = await res.text();
            return { error: true, url, detail };
          }
          const data = await res.json();
          // data.thumbnail_url may contain the preview image
          return {
            id: data?.author_id ? `${data.author_id}_${Date.now()}` : url,
            caption: data?.title || data?.author_name || "",
            media_type: "IMAGE",
            media_url: data?.thumbnail_url || null,
            thumbnail_url: data?.thumbnail_url || null,
            permalink: url,
            timestamp: Date.now(),
            provider: "threads",
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
