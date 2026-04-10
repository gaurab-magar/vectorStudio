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
  // Allow cross-origin requests from local network during development
  ...(process.env.NODE_ENV === "development" && {
    allowedDevOrigins: ["http://localhost:3000", "http://192.168.2.121:3000"],
  }),
};

export default nextConfig;
