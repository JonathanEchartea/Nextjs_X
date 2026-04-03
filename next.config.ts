import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tech.sparkfabrik.com'
      }
    ]
  }
};

export default nextConfig;
