
import { NextResponse } from 'next/server';

let postsCache = {
  data: [],
  lastFetch: null
};


const isCacheValid = () => {
  if (!postsCache.lastFetch) return false;
  const cacheAge = Date.now() - postsCache.lastFetch;
  return cacheAge < 5 * 60 * 1000; 
};

async function fetchInstagramPosts() {
  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
    );
// https://developer.facebook.com
    if (!response.ok) {
      throw new Error(`Instagram API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    throw error;
  }
}

export async function GET() {
  try {
    if (isCacheValid()) {
      return NextResponse.json(postsCache.data);
    }

    const posts = await fetchInstagramPosts();

    postsCache = {
      data: posts,
      lastFetch: Date.now()
    };

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Instagram posts' },
      { status: 500 }
    );
  }
}