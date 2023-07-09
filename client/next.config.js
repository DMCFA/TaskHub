/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        missing: [
          {
            type: 'cookie',
            key: 'access_token',
          },
        ],
        permanent: false,
        destination: '/',
      },
    ];
  },
};

module.exports = nextConfig;
