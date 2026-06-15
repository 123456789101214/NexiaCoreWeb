'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const SmoothCursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // --- 1. Raw Mouse Coordinates ---
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // --- 2. Arrow Physics (Fast, Snappy Trailing) ---
  const arrowSpringConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const cursorX = useSpring(mouseX, arrowSpringConfig);
  const cursorY = useSpring(mouseY, arrowSpringConfig);

  // --- 3. Lens Physics (Slower, Depth Parallax effect) ---
  const lensSpringConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const lensX = useSpring(mouseX, lensSpringConfig);
  const lensY = useSpring(mouseY, lensSpringConfig);

  // --- 4. Rotation Physics (Swimming/Steering effect) ---
  const rotation = useMotionValue(-135); // Initial Angle
  const smoothRotation = useSpring(rotation, { damping: 20, stiffness: 300, mass: 0.1 });

  // Refs for tracking previous position to calculate velocity
  const prevPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Touch & Accessibility Check
    if (!('ontouchstart' in window) && navigator.maxTouchPoints === 0) {
      setIsTouchDevice(false);
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    // Track Mouse Coordinates
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      // NOTE: Removed the auto-reset restingTimeout here. 
      // Now it will naturally stay pointed in the exact direction it stopped moving.
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Target interactive elements for the Lens magnify effect
      const isInteractive = target.closest('h1, h2, h3, h4, h5, h6, p, span, a, button, label, li, input');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    // --- THE STEERING ENGINE (60fps Math) ---
    let animationFrameId: number;
    const updateRotation = () => {
      const currentX = cursorX.get();
      const currentY = cursorY.get();

      const dx = currentX - prevPos.current.x;
      const dy = currentY - prevPos.current.y;

      // Only calculate new angle if moving fast enough.
      // If stopped, dx and dy are 0, so it safely skips this and holds its last angle!
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        // Prevent 360 flip glitches (Shortest path math)
        const currentRotation = rotation.get();
        let delta = angle - (currentRotation % 360);
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        rotation.set(currentRotation + delta);
      }

      prevPos.current = { x: currentX, y: currentY };
      animationFrameId = requestAnimationFrame(updateRotation);
    };

    updateRotation();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      mediaQuery.removeEventListener('change', handleMotionChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY, cursorX, cursorY, rotation, isVisible]);

  if (isTouchDevice || reduceMotion) return null;

  return (
    <>
      {/* --- LAYER 1: THE SAAS OPTICAL FOCUS LENS (Background) --- */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-blue-600/30 flex items-center justify-center will-change-transform"
        style={{
          x: lensX,
          y: lensY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          backdropFilter: isHovering 
            ? 'saturate(150%) contrast(120%) brightness(105%)' 
            : 'blur(2px)',
          WebkitBackdropFilter: isHovering 
            ? 'saturate(150%) contrast(120%) brightness(105%)' 
            : 'blur(2px)',
        }}
        animate={{
          width: isHovering ? 90 : 36,
          height: isHovering ? 90 : 36,
          backgroundColor: isHovering ? 'rgba(37, 99, 235, 0.04)' : 'rgba(37, 99, 235, 0.08)',
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      {/* --- LAYER 2: THE DIRECTIONAL SWIMMING ARROW (Foreground) --- */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] drop-shadow-md will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          rotate: smoothRotation,
          opacity: isVisible ? 1 : 0,
          // Master Trick: No translations needed because the SVG tip is engineered exactly at 0,0!
        }}
        aria-hidden="true"
      >
        <svg
          width="28"
          height="28"
          viewBox="-24 -14 28 28" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          // Smooth color morphing: NexiaCore Primary Blue -> Teal on hover
          className={`transition-colors duration-300 ${isHovering ? 'text-teal-600' : 'text-blue-600'}`}
        >
          <path
            d="M 0 0 L -20 -10 L -16 0 L -20 10 Z"
            fill="currentColor"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </>
  );
};