import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // මේ තියෙන්නේ ඔයාගේ අලුත් Hotspot IP එක මචං (Port එක නැතුව)
  allowedDevOrigins: ['10.41.9.75'], 
  
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;