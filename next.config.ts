import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Automation was folded into custom software and AI products.
      { source: "/services/automation", destination: "/services/web-development", permanent: true },
    ];
  },
};

export default nextConfig;
