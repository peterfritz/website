/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => ([
    {
      source: '/api/spotify/now-playing.png',
      destination: '/api/spotify/now-playing/image',
    },
  ]),
};

module.exports = nextConfig;
