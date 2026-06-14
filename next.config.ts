import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Port එක නැතුව IP එක විතරක් මේ විදියට දාන්න
  allowedDevOrigins: ['192.168.1.3'], 
  
  output: "export",
  images: {
    unoptimized: true, // Static export සඳහා අනිවාර්යයි
  },
};

export default nextConfig;