'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export const Spotlight = ({ className, fill = 'white' }: SpotlightProps) => {
  return (
    <motion.div
      animate={{
        x: ['0%', '15%', '-15%', '0%'],
        y: ['0%', '10%', '-10%', '0%'],
      }}
      transition={{
        duration: 12,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
      className={cn(
        'pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] opacity-15',
        className
      )}
      style={{
        background: `radial-gradient(circle, ${fill} 0%, transparent 70%)`,
      }}
      aria-hidden="true"
    />
  );
};