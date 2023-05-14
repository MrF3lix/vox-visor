/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipyggeknpgugxfbzonsh.supabase.co',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
