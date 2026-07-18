import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do NOT set output: 'standalone' on Vercel — it breaks Payload admin SSR.
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fail2fixcms.vercel.app',
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
