'use client';
import { cn } from "@/lib/utils";
import React from "react";

export function AnimatedGradientBadge({
  text,
  icon,
  className,
}: {
  text: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("group relative inline-flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#2563eb1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#2563eb3f] bg-[var(--animatedbadge-bg)] backdrop-blur-md", className)}>
      {/* Animated Border Mask */}
      <span
        className="absolute inset-0 block h-full w-full rounded-full bg-gradient-to-r from-blue-500/80 via-teal-400/80 to-blue-500/80 bg-[length:300%_100%] p-[1px] animate-gradient-bg"
        style={{
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        }}
      />
      <style>{`
        @keyframes gradient-bg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-bg {
          animation: gradient-bg 4s ease infinite;
        }
      `}</style>
      
      {/* Content */}
      <div className="relative flex items-center z-10 text-sm font-bold text-slate-800">
        {icon && <span className="mr-1.5">{icon}</span>}
        <span className="bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent">
          {text}
        </span>
      </div>
    </div>
  );
}