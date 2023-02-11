import { getNowPlaying } from '@/service/spotify';
import { NextRequest } from 'next/server';

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
        'content-type': 'application/json',
      },
    },
  );
};

export default handler;
