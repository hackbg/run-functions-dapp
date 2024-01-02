/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['pbs.twimg.com', 'abs.twimg.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/x',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
}
