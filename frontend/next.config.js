/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/flights',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
