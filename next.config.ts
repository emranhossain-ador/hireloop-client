import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/sign-in",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/sign-up",
        permanent: true,
      },
      {
        source: "/jobs",
        destination: "/browse-jobs",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/dashboard/seeker",
        permanent: true,
      },
      {
        source: "/dashboard/saved-jobs",
        destination: "/dashboard/seeker/saved-jobs",
        permanent: true,
      },
      {
        source: "/dashboard/seeker/save-jobs",
        destination: "/dashboard/seeker/saved-jobs",
        permanent: true,
      },
    ]
  },
}

export default nextConfig;
