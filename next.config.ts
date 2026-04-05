import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Instagram CDN (profile and feed images; subdomains vary by region)
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
