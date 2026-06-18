"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  isPopular?: boolean;
}

export function TiltCard({ children, className = "", isPopular = false }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Framer motion values for 3D rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for a premium feel
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), springConfig);

  useEffect(() => {
    // Safety check for touch devices (disables mouse effects)
    if (typeof window !== "undefined") {
      const checkTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouch(checkTouch);
      setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || prefersReducedMotion || !cardRef.current) return;
    
    // Check if cursor is hovering over a button OR a link (Next.js <Link> renders as <a>)
    const target = e.target as HTMLElement;
    if (target.closest('button, a')) {
      // Freeze/Reset the tilt effect when hovering the CTA button/link
      x.set(0);
      y.set(0);
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isTouch || prefersReducedMotion) return;
    x.set(0);
    y.set(0);
  };

  // Prevent tilt if interacting with specific elements like buttons/links via keyboard/pointer
  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a')) {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      style={
        isTouch || prefersReducedMotion
          ? {}
          : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
      }
      className={`relative rounded-[24px] border border-slate-200 bg-white p-[36px_30px] shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-[box-shadow,color,background-color,border-color,text-decoration-color,fill,stroke] duration-300 ease-out will-change-transform hover:shadow-[0_25px_60px_-15px_rgba(37,99,235,0.25)] ${
        isPopular ? "border-transparent text-white" : "text-slate-900"
      } ${className}`}
    >
      {/* Glossy gradient outline mask - hidden on touch devices for performance */}
      {!isTouch && !isPopular && (
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-transparent via-blue-500/40 to-transparent p-[1px] opacity-0 transition-opacity duration-400 ease-out hover:opacity-100" style={{ maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", WebkitMaskComposite: "xor" }} />
      )}
      
      {/* 3D Container to project children outward */}
      <div style={{ transform: isTouch || prefersReducedMotion ? "none" : "translateZ(30px)" }} className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}