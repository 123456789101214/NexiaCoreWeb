'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  target?: string; // 👈 අලුතින් එකතු කරපු Prop එක
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ShimmerButton = ({
  children,
  href,
  target, // 👈 Destructure කරපු තැන
  className,
  size = 'md',
  ...props
}: ShimmerButtonProps) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg md:px-10 md:py-5 md:text-xl',
  };

  const baseClasses = cn(
    'group relative inline-flex items-center justify-center overflow-hidden',
    'bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl',
    'transition-all duration-300 ease-out',
    'hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-[0.98]',
    sizeClasses[size],
    className
  );

  const ShimmerEffect = () => (
    <>
      <style>{`
        @keyframes shimmer-slide {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(250%) skewX(-15deg); }
        }
        .animate-shimmer-slide {
          animation: shimmer-slide 2.5s ease-in-out infinite;
        }
      `}</style>
      <div
        className="absolute inset-0 z-0 w-[40%] bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer-slide"
        aria-hidden="true"
      />
    </>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        target={target} // 👈 Link එකට pass කරනවා
        rel={target === "_blank" ? "noopener noreferrer" : undefined} // 👈 Security Fix
        className={baseClasses}
      >
        <ShimmerEffect />
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      <ShimmerEffect />
      <span className="relative z-10">{children}</span>
    </button>
  );
};