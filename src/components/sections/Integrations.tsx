"use client";

import { motion } from "framer-motion";
import React from "react";

// ━━━ PRODUCTION-GRADE INLINE SVGS FOR INTEGRATIONS ━━━
// We use inline SVGs so there are no external dependencies or loading delays.

const integrations = [
  {
    name: "AWS",
    color: "group-hover:text-[#FF9900] group-hover:drop-shadow-[0_0_15px_rgba(255,153,0,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
        <path d="M14.07 15.68c-.68.32-1.63.56-2.67.56-2.58 0-4.32-1.3-4.32-3.7 0-2.6 1.95-4.04 4.54-4.04 1.05 0 1.83.21 2.37.46v2.16c-.53-.35-1.3-.61-2.12-.61-1.32 0-2.15.7-2.15 1.88 0 1.04.72 1.63 1.88 1.63.85 0 1.66-.23 2.47-.64v2.3zm2.53-7.55h2.4l1.32 4.15 1.15-4.15h2.26l-2.28 7.37h-2.3l-1.28-3.95-1.26 3.95h-2.28l-2.27-7.37h2.38l1.17 4.3 1.34-4.3zM2.86 15.5h2.46l.72-2.16h3.2l.68 2.16h2.52L8.9 8.13H6.42l-3.56 7.37zm4.23-4.22h1.47l-.74-2.45-.73 2.45z"/>
        <path d="M12.9 17.58c-1.9.8-4.17 1.25-6.52 1.25-2.24 0-4.42-.4-6.28-1.12l.74-2.1c1.65.65 3.53 1 5.54 1 1.98 0 3.86-.34 5.52-.96l1 1.93z"/>
      </svg>
    )
  },
  {
    name: "MongoDB",
    color: "group-hover:text-[#47A248] group-hover:drop-shadow-[0_0_15px_rgba(71,162,72,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
        <path d="M11.64 0C8.42 1.73 6.13 6.64 7.03 12.2c0 0-1.84.45-3.08 1.86C2.7 15.48 2.86 18 2.86 18c2.94-1.24 5.1-1.15 5.83-.82.1.92.57 2.06 1.48 3.02 1.35 1.4 3.73 2.37 5.92 1.9.4.95.84 1.67 1.3 1.9h.44c1.2-2.3.8-6.15-.34-9.35-1.32-3.7-3.94-6.42-5.85-14.65z"/>
      </svg>
    )
  },
  {
    name: "Stripe",
    color: "group-hover:text-[#635BFF] group-hover:drop-shadow-[0_0_15px_rgba(99,91,255,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-12">
        <path d="M22.5 10.35h-4.82v-1.7c0-.85.66-1.13 1.5-1.13h3.2V3.74h-3.9c-3.5 0-5.4 1.77-5.4 5.12v2.3h-2.5v3.8h2.5v9h4.6v-9h3.84l.98-3.6zM6.9 14.16c-1.38 0-2.4-.6-2.4-1.8 0-1.2.98-1.74 2.76-1.74h2.5v1.2c0 1.4-1.23 2.34-2.86 2.34zM9.77 6.8c-1.15-.7-2.7-.93-4.1-.93C2.36 5.87 0 7.78 0 11.23c0 3.73 2.94 4.8 5.66 5.15 1.54.2 2.22.65 2.22 1.43 0 1.02-1.07 1.52-2.58 1.52-1.5 0-3-.5-4.2-1.24v3.94c1.23.63 3.03.95 4.67.95 3.52 0 6.08-1.74 6.08-5.26 0-3.3-2.28-4.52-5.45-5.06-1.7-.3-2.4-.6-2.4-1.36 0-.85.9-1.28 2.1-1.28 1.05 0 2.23.3 3.3.82L9.76 6.8z"/>
      </svg>
    )
  },
  {
    name: "PayHere",
    color: "group-hover:text-[#0055FF] group-hover:drop-shadow-[0_0_15px_rgba(0,85,255,0.4)]",
    icon: (
      <div className="text-2xl font-black tracking-tighter flex items-center">
        Pay<span className="text-[#0055FF] opacity-50 group-hover:opacity-100 transition-opacity">Here</span>
      </div>
    )
  },
  {
    name: "Dialog SMS",
    color: "group-hover:text-[#E81123] group-hover:drop-shadow-[0_0_15px_rgba(232,17,35,0.4)]",
    icon: (
      <div className="text-xl font-black tracking-tight flex items-center gap-1">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 2C6.48 2 2 6.03 2 11c0 2.85 1.47 5.4 3.77 7.03L5 22l3.43-1.63c1.13.34 2.33.52 3.57.52 5.52 0 10-4.03 10-9s-4.48-9-10-9z"/>
        </svg>
        Dialog
      </div>
    )
  },
  {
    name: "Vercel",
    color: "group-hover:text-black group-hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.2)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
        <path d="M12 2L2 21h20L12 2z"/>
      </svg>
    )
  }
];

export default function Integrations() {
  // Duplicate for seamless infinite loop
  const duplicatedLogos = [...integrations, ...integrations, ...integrations];

  return (
    <section className="py-20 bg-white border-y border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <p className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">
          Enterprise Infrastructure
        </p>
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
          Seamlessly integrates with tools you trust.
        </h3>
      </div>

      {/* ━━━ INFINITE MARQUEE SLIDER ━━━ */}
      <div className="relative w-full max-w-[100vw] overflow-hidden flex flex-col items-center justify-center pt-4 pb-8">
        
        {/* Magic CSS Mask for fading edges (Silicon Valley Standard) */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none" 
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
          }}
        ></div>

        {/* The Animated Track */}
        <motion.div
          className="flex items-center gap-16 md:gap-24 w-max px-8"
          animate={{ x: ["0%", "-33.33%"] }} // Slides exactly one set of logos
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Speed of the marquee
          }}
        >
          {duplicatedLogos.map((item, i) => (
            <div 
              key={i}
              className={`flex items-center justify-center text-slate-300 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer group ${item.color}`}
            >
              {item.icon}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}