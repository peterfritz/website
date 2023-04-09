import SpotifyTemplate from '@/components/og/SpotifyTemplate';
import { getNowPlaying } from '@/service/spotify';
import satori from 'satori';

export const config = {
  runtime: 'edge',
};

const fontSemiBold = fetch(
  new URL('../../../../assets/JetBrainsMono-SemiBold.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

const fontExtraBold = fetch(
  new URL('../../../../assets/JetBrainsMono-ExtraBold.ttf', import.meta.url),
).then((res) => res.arrayBuffer());

const handler = async () => {
  const fontDataSemiBold = await fontSemiBold;
  const fontDataExtraBold = await fontExtraBold;

  const nowPlaying = await getNowPlaying();

  if (!nowPlaying) {
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>',
      {
        headers: {
          'content-type': 'image/svg+xml',
        },
      },
    );
  }

  const svg = await satori(
    (
      <SpotifyTemplate nowPlaying={nowPlaying} />
    ),
    {
      fonts: [
        {
          name: 'JetBrains Mono',
          data: fontDataSemiBold,
          weight: 600,
          style: 'normal',
        },
        {
          name: 'JetBrains Mono',
          data: fontDataExtraBold,
          weight: 800,
          style: 'normal',
        },
      ],
      height: 128,
      width: 512,
    },
  );

  return new Response(svg, {
    status: 200,
    headers: {
      'content-type': 'image/svg+xml',
      'cache-control': 'public, s-maxage=0, stale-while-revalidate=60',
      'content-disposition': `filename=${nowPlaying.name.toLowerCase().replaceAll(/[^a-zA-Z1-9]/g, '_')}.svg`,
    },
  });
};

export default handler;
