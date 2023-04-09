const clientId = process.env.SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN as string;

const TOKEN_ENDPOINT = new URL('https://accounts.spotify.com/api/token');
const NOW_PLAYING_ENDPOINT = new URL('https://api.spotify.com/v1/me/player/currently-playing');
const RECENTLY_PLAYED_ENDPOINT = new URL('https://api.spotify.com/v1/me/player/recently-played?limit=5');
const TOP_TRACKS_ENDPOINT = new URL('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10');

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

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

export interface Track {
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

const getTrackData = (data: any): Track | null => {
  const {
    type,
    name,
    id,
    explicit,
    album: {
      images: [, { url: albumImage }],
    },
    artists,
    external_urls: { spotify: trackUrl },
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
  };
};

export const getNowPlaying = async (): Promise<Track | null> => {
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

    return getTrackData(data.item);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);

    return null;
  }
};

export const getRecentlyPlayed = async (): Promise<Track> => {
  const accessToken = await getAccessToken();

  const data = await fetch(
    RECENTLY_PLAYED_ENDPOINT,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  ).then((res) => (
    res.json()
  ));

  return data.items.map((item: any) => getTrackData(item.track));
};

export const getTopTracks = async (): Promise<Track> => {
  const accessToken = await getAccessToken();

  const data = await fetch(
    TOP_TRACKS_ENDPOINT,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  ).then((res) => (
    res.json()
  ));

  return data.items.map((item: any) => getTrackData(item));
};

const spotify = {
  getNowPlaying,
  getRecentlyPlayed,
  getTopTracks,
};

export default spotify;
