import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: (process.env.BACKEND_URL || 'https://smartmenyu.onrender.com') + '/api/:path*',
      },
    ]
  },
};

export default nextConfig;
