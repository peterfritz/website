import { getRecentlyPlayed } from '@/service/spotify';

export const config = {
  runtime: 'edge',
};

const handler = async () => {
  const recentlyPlayed = await getRecentlyPlayed();

  return new Response(
    JSON.stringify(recentlyPlayed),
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
