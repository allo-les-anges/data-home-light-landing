/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
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
