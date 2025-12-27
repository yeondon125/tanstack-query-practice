import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://jsonplaceholder.typicode.com/:path*`,
      },
    ];
  },
};

export default nextConfig;
