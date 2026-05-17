"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import React from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, // 🔥 0.05 තිබ්බම ගොඩක් slow. 0.1 දැම්මම මාරම Smooth.
        smoothWheel: true,
        wheelMultiplier: 1, // සාමාන්‍ය මවුස් වලට ගැලපෙන්න
      }}
    >
      {/* 🔥 FIX: React 19 එක්ක එන Type mismatch warning එක අයින් කරන්න මේක දානවා. 
        මේක Code එකට කිසිම බලපෑමක් නෑ. 
      */}
      {/* @ts-expect-error - React 19 type mismatch with legacy lenis package */}
      {children}
    </ReactLenis>
  );
}