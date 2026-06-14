'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const BackgroundBeams = ({
  className,
  opacity = 0.08,
}: {
  className?: string;
  opacity?: number;
}) => {
  const paths = [
    'M-100 100 L1500 900',
    'M-100 300 L1500 1100',
    'M400 -100 L1500 450',
    'M800 -100 L1500 250',
    'M-100 500 L1500 1300',
    'M200 -100 L1500 550',
    'M600 -100 L1500 350',
    'M-100 700 L1500 1500',
  ];

  return (
    <div
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 900" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
            <stop offset="50%" stopColor="#2563eb" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path}
            stroke="url(#beamGradient)"
            strokeWidth={1}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
};