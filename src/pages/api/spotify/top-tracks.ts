import { getTopTracks } from '@/service/spotify';

export const config = {
  runtime: 'edge',
};

const handler = async () => {
  const topTracks = await getTopTracks();

  return new Response(
    JSON.stringify(topTracks),
    {
      status: 200,
      headers: {
        // make it so that the response is stale for 1 day but is refreshed every 5 hours
        'cache-control': 'public, maxage=18000, s-maxage=18000, stale-while-revalidate=86400',
        'content-type': 'application/json',
      },
    },
  );
};

export default handler;
