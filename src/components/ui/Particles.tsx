'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

export const Particles = ({
  className,
  quantity = 80,
  staticity = 50,
  ease = 50,
}: ParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  // PrimeSoftCore Brand Colors (Blue, Teal, Muted)
  const colors = ['#2563eb', '#0d9488', '#64748b'];

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }
    initCanvas();
    animate();

    // 👈 මෙන්න මේක තමයි කලින් මිස් වෙලා තිබ්බේ! (Mouse Tracking Listener)
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasContainerRef.current) {
        const rect = canvasContainerRef.current.getBoundingClientRect();
        const { w, h } = canvasSize.current;
        // Mouse එකේ x, y ඛණ්ඩාංක Canvas එකේ මැදට සාපේක්ෂව හදාගන්නවා
        const x = e.clientX - rect.left - w / 2;
        const y = e.clientY - rect.top - h / 2;
        
        // Mouse එක Canvas එක ඇතුලෙද තියෙන්නේ කියලා බලනවා
        const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
        if (inside) {
          mouse.current.x = x;
          mouse.current.y = y;
        }
      }
    };

    window.addEventListener('resize', initCanvas);
    window.addEventListener('mousemove', handleMouseMove); // Listener එක Set කරා

    return () => {
      window.removeEventListener('resize', initCanvas);
      window.removeEventListener('mousemove', handleMouseMove); // Listener එක අයින් කරා (Memory Leaks නැති වෙන්න)
    };
  }, []);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2.5) + 1; // Particle size
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.5;
    const dy = (Math.random() - 0.5) * 0.5;
    const magnetism = 0.1 + Math.random() * 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    return { x, y, translateX, translateY, size, alpha, targetAlpha, dx, dy, magnetism, color };
  };

  const drawCircle = (circle: any, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha, color } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }
  };

  const drawParticles = () => {
    clearContext();
    for (let i = 0; i < quantity; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const animate = () => {
    clearContext();
    circles.current.forEach((circle: any, i: number) => {
      circle.alpha += 0.02;
      if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;

      circle.x += circle.dx;
      circle.y += circle.dy;
      
      // 👈 මෙතනින් තමයි Mouse එකට Magnetic විදිහට Particles ඇදෙන්නේ
      circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

      // Draw Network Lines
      for (let j = i + 1; j < circles.current.length; j++) {
        const circle2 = circles.current[j];
        const dx = circle.x + circle.translateX - (circle2.x + circle2.translateX);
        const dy = circle.y + circle.translateY - (circle2.y + circle2.translateY);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 90) { // Distance එක 90 ට අඩු වුණාම ලයින් එක අඳිනවා
          if (context.current) {
            context.current.beginPath();
            context.current.moveTo(circle.x + circle.translateX, circle.y + circle.translateY);
            context.current.lineTo(circle2.x + circle2.translateX, circle2.y + circle2.translateY);
            // distance එක අනුව line එකේ opacity එක වෙනස් කරනවා (ස්මූත් වෙන්න)
            const lineOpacity = Math.max(0, 0.15 - (distance / 90) * 0.15);
            context.current.strokeStyle = `${circle.color}${Math.floor(lineOpacity * 255).toString(16).padStart(2, '0')}`;
            context.current.lineWidth = 0.5;
            context.current.stroke();
          }
        }
      }

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      } else {
        drawCircle(circle, true);
      }
    });
    window.requestAnimationFrame(animate);
  };

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 z-0', className)}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};