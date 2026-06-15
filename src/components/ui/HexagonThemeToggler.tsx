'use client';

import { useEffect, useRef, useState } from 'react';

// Math function for the Hexagon points
const HEX_CLIP = (cx: number, cy: number, r: number) => {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
};

export function HexagonThemeToggler() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initialize theme from localStorage on mount to prevent hydration issues
  useEffect(() => {
    const saved = localStorage.getItem('nexiacore-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentIsDark = saved === 'dark' || (!saved && prefersDark);
    
    if (currentIsDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      setIsDark(true);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const handleToggle = () => {
    if (animating || !canvasRef.current || !buttonRef.current) return;
    
    // Disable interactions during animation
    setAnimating(true);

    const btn = buttonRef.current;
    const canvas = canvasRef.current;
    const rect = btn.getBoundingClientRect();
    const ox = rect.left + rect.width / 2;
    const oy = rect.top + rect.height / 2;

    const willBeDark = !isDark;
    
    const W = window.innerWidth;
    const H = window.innerHeight;
    const maxR = Math.hypot(Math.max(ox, W - ox), Math.max(oy, H - oy)) * 1.12;

    canvas.width = W;
    canvas.height = H;
    canvas.style.display = 'block';

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DURATION = 420;
    const start = performance.now();
    const bgColor = willBeDark ? '#0f1117' : '#f0f2f5';
    let themeFlipped = false;

    const step = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const r = ease * maxR;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      
      const pts = HEX_CLIP(ox, oy, r);
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < 6; i++) {
        ctx.lineTo(pts[i][0], pts[i][1]);
      }
      ctx.closePath();
      ctx.fill();

      // Flip the DOM theme at 40% completion for smooth reveal
      if (t >= 0.4 && !themeFlipped) {
        themeFlipped = true;
        document.documentElement.setAttribute('data-theme', willBeDark ? 'dark' : 'light');
        localStorage.setItem('nexiacore-theme', willBeDark ? 'dark' : 'light');
        setIsDark(willBeDark); // Update React state sync
      }

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        ctx.clearRect(0, 0, W, H);
        canvas.style.display = 'none';
        setAnimating(false);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="relative w-10 h-10 flex-shrink-0 bg-transparent p-0 cursor-pointer outline-none group"
        aria-label="Toggle theme"
        title="Toggle light/dark mode"
      >
        <div 
          className="w-10 h-10 flex items-center justify-center transition-all duration-250 ease-out bg-[var(--toggler-hex-bg)] group-hover:bg-[var(--toggler-hex-hover)] group-hover:scale-105 active:scale-95"
          style={{ clipPath: 'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)' }}
        >
          <div className="relative w-5 h-5">
            {/* Sun SVG */}
            <svg 
              className={`absolute top-0 left-0 w-5 h-5 transition-all duration-[350ms] ease-out ${isDark ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
              viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4"/>
              <line x1="12" y1="2" x2="12" y2="4"/>
              <line x1="12" y1="20" x2="12" y2="22"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="2" y1="12" x2="4" y2="12"/>
              <line x1="20" y1="12" x2="22" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            {/* Moon SVG */}
            <svg 
              className={`absolute top-0 left-0 w-5 h-5 transition-all duration-[450ms] ease-out ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}
              viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </div>
        </div>
      </button>

      {/* Global Canvas Overlay for View Transition */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99999] hidden"
      />
    </>
  );
}