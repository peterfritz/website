/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
  rewrites: async () => ([
    {
      source: '/api/spotify/now-playing.png',
      destination: '/api/spotify/now-playing/image',
    },
  ]),
};

module.exports = nextConfig;
