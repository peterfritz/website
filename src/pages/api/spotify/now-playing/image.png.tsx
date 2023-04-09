import SpotifyTemplate from '@/components/og/SpotifyTemplate';
import { getNowPlaying } from '@/service/spotify';
import { ImageResponse } from 'next/server';

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
    return new ImageResponse(
      (
        <div />
      ),
      {
        height: 1,
        width: 1,
        headers: {
          'cache-control': 'public, s-maxage=0, stale-while-revalidate=60',
        },
      },
    );
  }

  return new ImageResponse(
    (
      <SpotifyTemplate nowPlaying={nowPlaying} />
    ),
    {
      emoji: 'fluent',
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
      headers: {
        'cache-control': 'public, s-maxage=0, stale-while-revalidate=60',
        'content-disposition': `filename=${nowPlaying.name.toLowerCase().replaceAll(/[^a-zA-Z1-9]/g, '_')}.png`,
      },
      height: 128,
      width: 512,
    },
  );
};

export default handler;
