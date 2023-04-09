/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
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
      source: '/api/spotify/now-playing.:filetype(svg|png)',
      destination: '/api/spotify/now-playing/image.:filetype',
    },
  ]),
};

module.exports = nextConfig;
