"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export default function AnimatedCounter({ 
  value, 
  suffix = "", 
  prefix = "", 
  decimals = 0 
}: AnimatedCounterProps) {
  
  const ref = useRef<HTMLSpanElement>(null);
  
  // 1. Trigger animation ONLY when the component comes into the viewport
  // once: true (එක්පාරක් විතරක් දුවන්න), amount: 0.5 (භාගයක්වත් පේන්න ඕනේ පටන් ගන්න)
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  // 2. Start from 0
  const motionValue = useMotionValue(0);
  
  // 3. Apply Apple-like Spring Physics for the count up
  const springValue = useSpring(motionValue, {
    damping: 50,    // Resistance (higher = less bounce)
    stiffness: 100, // Speed of the spring
    restDelta: 0.5  // Stop calculating when it's very close to the target
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    // 4. Update the DOM directly for 60fps performance (bypassing React state)
    springValue.on("change", (latest) => {
      if (ref.current) {
        // Automatically add commas for thousands (e.g., 50000 -> 50,000)
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(latest);
      }
    });
  }, [springValue, decimals]);

  return (
    <div className="inline-flex items-center">
      {prefix && <span>{prefix}</span>}
      <span ref={ref}>0</span>
      {suffix && <span>{suffix}</span>}
    </div>
  );
}