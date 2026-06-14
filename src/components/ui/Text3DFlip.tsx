'use client';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Text3DFlip({
  text,
  className,
  gradient = false,
  delayOffset = 0, // 👈 ලයින් දෙක Sync කරන්න මේක පාවිච්චි කරනවා
}: {
  text: string;
  className?: string;
  gradient?: boolean;
  delayOffset?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={cn("inline-flex flex-wrap gap-x-3 sm:gap-x-4", className)}>
      {words.map((word, i) => (
        // pb-2 දාලා තියෙන්නේ 'y', 'p' වගේ අකුරු වල යට කෑල්ල කැපෙන්නේ නැති වෙන්න
        <span key={i} className="relative inline-flex overflow-hidden pb-2" style={{ perspective: "1000px" }}>
          <motion.span
            className={cn(
              "inline-block origin-bottom",
              gradient && "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500"
            )}
            // 👈 Cinematic Entrance (එක පාරක් ඇවිත් තියෙනවා)
            initial={{ rotateX: 90, opacity: 0, y: 20 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: delayOffset + (i * 0.15), // වචනෙන් වචනේ ලස්සනට එන්න Stagger කරනවා
              type: "spring",
              damping: 20,
              stiffness: 100,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}