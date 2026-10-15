/**
 * Permanent redirects from URLs of the previous static site (*.html pages and
 * the old regional landing) to their closest equivalent in the current site.
 * Keeps inbound links and previously indexed URLs working and transfers
 * their ranking instead of returning 404.
 */
const legacyRedirects = [
  { source: '/index.html', destination: '/en' },
  { source: '/fr-be', destination: '/fr' },
  { source: '/templates.html', destination: '/en/templates' },
  { source: '/template-preview.html', destination: '/en/templates' },
  { source: '/landing-pages.html', destination: '/en/product' },
  { source: '/chatbot.html', destination: '/en/product' },
  { source: '/experience.html', destination: '/en/product' },
  { source: '/support.html', destination: '/en/contact' },
  { source: '/onboarding.html', destination: 'https://datahome.vercel.app/register' },
  { source: '/privacy.html', destination: '/en/privacy' },
  { source: '/legal.html', destination: '/en/legal' },
  { source: '/404.html', destination: '/en' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "medianewbuild.com",
        pathname: "/file/**",
      },
    ],
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }))
  },
}

export default nextConfig
