import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'j3alkfksufzmdyhq.public.blob.vercel-storage.com',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
