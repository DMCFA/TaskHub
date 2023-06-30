/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'cookie',
            key: 'access_token',
            value: 'true',
          },
        ],
        permanent: false,
        destination: '/dashboard',
      },
    ];
  },
};

module.exports = nextConfig;
