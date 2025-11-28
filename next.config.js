/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from specific domains
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'lkqbkhaklhenhlahgvhj.supabase.co' }
    ],
  },
  // Handle SPA-style fallbacks if necessary (though App Router handles this natively)
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/',
      },
    ]
  },
}

export default nextConfig
