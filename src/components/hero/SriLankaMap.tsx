"use client";

import { motion } from "framer-motion";

// Massive 800x800 coordinate system for exact positioning
const REGIONS = [
  { name: "Northern", x: 360, y: 80 },
  { name: "North Central", x: 400, y: 240 },
  { name: "North Western", x: 200, y: 360 },
  { name: "Central", x: 400, y: 440 },
  { name: "Eastern", x: 640, y: 320 },
  { name: "Western", x: 160, y: 560 },
  { name: "Sabaragamuwa", x: 320, y: 600 },
  { name: "Uva", x: 560, y: 520 },
  { name: "Southern", x: 360, y: 720 },
];

export default function SriLankaMap() {
  return (
    // Centered but massive, overflowing its container to create a background network vibe
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] z-0 pointer-events-none perspective-[2000px]">
      
      {/* 3D Tilted Network Plane */}
      <motion.div 
        initial={{ rotateY: -15, rotateX: 10, opacity: 0 }}
        animate={{ rotateY: -15, rotateX: 10, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="relative w-full h-full transform-style-preserve-3d"
      >
        
        {/* Massive Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[700px] bg-blue-500/10 blur-[150px] rounded-full mix-blend-multiply"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-teal-500/10 blur-[120px] rounded-full mix-blend-multiply"></div>

        {/* Region Nodes */}
        {REGIONS.map((region, i) => (
          <div
            key={region.name}
            className="absolute flex flex-col items-center gap-2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${region.y}px`, left: `${region.x}px` }}
          >
            {/* Pulsing Dot */}
            <div className="relative flex h-4 w-4">
              <motion.span
                animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
              ></motion.span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white shadow-[0_0_15px_rgba(37,99,235,0.5)]"></span>
            </div>
            
            {/* Region Label */}
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm border border-slate-100">
              {region.name}
            </span>
          </div>
        ))}

        {/* ━━━ MATHEMATICALLY PERFECT SVG NETWORK ━━━ */}
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          
          {/* Core Backbone (North -> Center -> South) */}
          <motion.path
            d="M 360 80 L 400 240 L 400 440 L 320 600 L 360 720"
            stroke="#2563eb" strokeWidth="2" strokeDasharray="6 6"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          
          {/* East Wing */}
          <motion.path
            d="M 400 240 L 640 320 L 560 520 L 360 720"
            stroke="#0d9488" strokeWidth="1.5" strokeDasharray="4 4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "linear" }}
          />
          
          {/* West Wing */}
          <motion.path
            d="M 360 80 L 200 360 L 160 560 L 360 720"
            stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4 4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 5.5, repeat: Infinity, delay: 0.5, ease: "linear" }}
          />

          {/* Cross Links */}
          <motion.path
            d="M 160 560 L 400 440 L 560 520"
            stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, repeat: Infinity, delay: 2, ease: "linear" }}
          />
        </svg>

      </motion.div>
    </div>
  );
}