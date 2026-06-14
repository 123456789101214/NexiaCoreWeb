'use client';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SmoothTextAnimate({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={cn("inline-flex flex-wrap gap-1.5", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            opacity: [0.5, 1, 0.5],
            filter: ["blur(2px)", "blur(0px)", "blur(2px)"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}