'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlobProps {
  color1?: string;
  color2?: string;
  opacity?: number;
  size?: number;
  className?: string;
  animate?: boolean;
  variant?: 'BlobHero' | 'BlobFeatures' | 'BlobCTA';
}

export const GradientBlob = ({
  color1 = '#2563eb',
  color2 = '#0d9488',
  opacity = 0.15,
  size = 600,
  className,
  animate = true,
  variant = 'BlobHero',
}: BlobProps) => {
  // SVG bezier curve morph paths for premium organic feel
  const paths = {
    BlobHero: [
      'M421.5,296.5Q375,343,321,369.5Q267,396,212.5,378Q158,360,120.5,318Q83,276,91,222.5Q99,169,141.5,136.5Q184,104,233.5,88Q283,72,327,101.5Q371,131,412,165.5Q453,200,421.5,296.5Z',
      'M432.5,302Q376,354,321.5,379.5Q267,405,212.5,379.5Q158,354,115,302Q72,250,115,198Q158,146,212.5,120.5Q267,95,321.5,120.5Q376,146,432.5,198Q489,250,432.5,302Z',
    ],
    BlobFeatures: [
      'M399,286Q358,322,304,360Q250,398,198.5,357.5Q147,317,117.5,263.5Q88,210,135.5,166Q183,122,238,102.5Q293,83,348,118.5Q403,154,421.5,202Q440,250,399,286Z',
      'M408.5,296.5Q377,343,313.5,364.5Q250,386,183.5,366.5Q117,347,93.5,283.5Q70,220,95,152Q120,84,185,69Q250,54,310.5,83.5Q371,113,405.5,181.5Q440,250,408.5,296.5Z',
    ],
    BlobCTA: [
      'M457,311Q414,372,332,410.5Q250,449,167,411.5Q84,374,53.5,289Q23,204,78.5,130Q134,56,218.5,41.5Q303,27,370,75.5Q437,124,468.5,187Q500,250,457,311Z',
      'M442.5,317.5Q385,385,317.5,417.5Q250,450,172.5,422.5Q95,395,64.5,322.5Q34,250,68.5,180.5Q103,111,176.5,74.5Q250,38,328.5,63.5Q407,89,453.5,169.5Q500,250,442.5,317.5Z',
    ],
  };

  const selectedPaths = paths[variant];

  return (
    <div
      className={cn('absolute pointer-events-none', className)}
      style={{ opacity, width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 500 500" width="100%" height="100%">
        <defs>
          <linearGradient id={`grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
        </defs>
        <motion.path
          fill={`url(#grad-${variant})`}
          d={selectedPaths[0]}
          animate={animate ? { d: selectedPaths } : {}}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  );
};