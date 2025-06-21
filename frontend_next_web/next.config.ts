import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "balapin.s3.amazonaws.com", 
      },
    ]
  }
};

export default nextConfig;