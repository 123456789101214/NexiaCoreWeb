import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Static export සඳහා අනිවාර්යයි
  },
};

export default nextConfig;