const clientId = process.env.SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN as string;

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const basic = btoa(`${clientId}:${clientSecret}`);

const getAccessToken = async () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);

  const data = await fetch(
    TOKEN_ENDPOINT,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    },
  ).then((res) => (
    res.json()
  ));

  return data.access_token;
};

export interface NowPlaying {
  id: string,
  name: string,
  image: string,
  explicit: boolean,
  trackUrl: string,
  artists: {
    url: string,
    name: string,
  }[]
}

export const getNowPlaying = async (): Promise<NowPlaying | null> => {
  try {
    const accessToken = await getAccessToken();

    const data = await fetch(
      NOW_PLAYING_ENDPOINT,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ).then((res) => (
      res.json()
    ));

    if (!data.is_playing) {
      return null;
    }

    const {
      item: {
        type,
        name,
        id,
        explicit,
        album: {
          images: [, { url: albumImage }],
        },
        artists,
        external_urls: { spotify: trackUrl },
      },
    } = data;

    if (type !== 'track') {
      return null;
    }

    return {
      id,
      name,
      image: albumImage,
      explicit,
      trackUrl,
      artists: artists.map((
        artist: {
          external_urls: {
            spotify: string;
          };
          name: string;
        },
      ) => ({
        url: artist.external_urls.spotify,
        name: artist.name,
      })),
    } as NowPlaying;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);

    return null;
  }
};

export default {};
