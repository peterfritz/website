import type { NextRequest } from 'next/server';

import { getNowPlaying } from '@/service/spotify';

export const config = {
  runtime: 'edge',
};

const handler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const redirect = searchParams.get('redirect');

  const nowPlaying = await getNowPlaying();

  if (redirect && nowPlaying) {
    return Response.redirect(nowPlaying.trackUrl);
  }

  return new Response(
    JSON.stringify(nowPlaying),
    {
      status: 200,
      headers: {
        'cache-control': 'public, maxage=20, s-maxage=10, stale-while-revalidate=20',
        'content-type': 'application/json',
      },
    },
  );
};

export default handler;
