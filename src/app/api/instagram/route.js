
import { NextResponse } from 'next/server';
import instatouch from 'instatouch';

// Helper to normalize and flatten carousel children
const normalize = (posts) => {
  const out = [];
  (posts || []).forEach((m) => {
    if (m.type === 'GraphSidecar' && m.children && m.children.length > 0) {
      m.children.forEach((child, index) => {
        out.push({
          id: `${m.id}_${index}`,
          caption: m.caption,
          media_type: child.type === 'GraphVideo' ? 'VIDEO' : 'IMAGE',
          media_url: child.display_url,
          thumbnail_url: child.thumbnail_src,
          permalink: `https://www.instagram.com/p/${m.shortcode}/`,
          timestamp: m.timestamp,
        });
      });
    } else {
      out.push({
        id: m.id,
        caption: m.caption,
        media_type: m.is_video ? 'VIDEO' : 'IMAGE',
        media_url: m.display_url,
        thumbnail_url: m.thumbnail_src,
        permalink: `https://www.instagram.com/p/${m.shortcode}/`,
        timestamp: m.timestamp,
      });
    }
  });
  return out;
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || 20;

  const accounts = ['tomyriverobeautylab', 'tomyriverobeautycafe'];

  try {
    const allPosts = [];

    for (const account of accounts) {
      try {
        const options = {
          count: limit,
          session: process.env.IG_SESSION_ID, // Recommended to avoid rate limits
        };
        const posts = await instatouch.user(account, options);
        if (posts && posts.collector) {
          allPosts.push(...posts.collector);
        }
      } catch (error) {
        console.error(`Error fetching posts for ${account}:`, error);
        // Continue to the next account
      }
    }

    // Sort all posts by timestamp in descending order (newest first)
    allPosts.sort((a, b) => b.timestamp - a.timestamp);

    // Normalize and take the top 'limit' posts
    const normalizedPosts = normalize(allPosts).slice(0, limit);

    return NextResponse.json({ data: normalizedPosts });

  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch Instagram posts', detail: error.message }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
