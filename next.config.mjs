import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  domains: ['localhost'],
  // Your Next.js config here
}

export default withPayload(nextConfig)
