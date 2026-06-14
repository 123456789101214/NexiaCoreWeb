import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  intensity?: 'light' | 'medium' | 'heavy';
}

export const GlassCard = ({
  children,
  className,
  hover = true,
  intensity = 'medium',
  ...props
}: GlassCardProps) => {
  // Map glass intensities to Tailwind classes based on the master prompt
  const intensityClasses = {
    light: 'bg-white/30 backdrop-blur-md border border-white/30',
    medium: 'bg-white/50 backdrop-blur-xl border border-white/40',
    heavy: 'bg-white/70 backdrop-blur-2xl border border-white/60',
  };

  return (
    <div
      className={cn(
        // Base glass styles and shadow
        'rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]',
        intensityClasses[intensity],
        // Hover effects (conditional)
        hover && 'hover:-translate-y-1 hover:shadow-[0_16px_40px_0_rgba(31,38,135,0.15)] transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};