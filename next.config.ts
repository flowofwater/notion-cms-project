import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Notion 첨부 파일 이미지
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
      {
        // Notion 외부 이미지
        protocol: "https",
        hostname: "www.notion.so",
      },
      {
        // Notion CDN 이미지
        protocol: "https",
        hostname: "*.notion.site",
      },
    ],
  },
};

export default nextConfig;
