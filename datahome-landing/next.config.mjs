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
}

export default nextConfig
