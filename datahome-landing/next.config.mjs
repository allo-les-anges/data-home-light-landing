/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
