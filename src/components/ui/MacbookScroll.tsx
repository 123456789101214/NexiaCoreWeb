'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
  useMotionValue,
  AnimatePresence,
  MotionValue
} from 'framer-motion';

// --- Types & Config ---
type DeviceType = 'desktop' | 'tablet' | 'mobile';

const DESKTOP_IMAGES = [
  { id: 'dashboard', src: '/dashboard-on-desktop.png', label: 'Real-time Dashboard' },
  { id: 'inventory', src: '/inventory-on-desktop.png', label: 'Stock & Inventory' },
  { id: 'reports', src: '/reports-on-desktop.png', label: 'Analytics & GRN' }
];

const TABLET_IMAGES = [
  { id: 'dashboard', src: '/dashboard-on-tablet.png', label: 'POS Overview' },
  { id: 'reports', src: '/reports-on-tablet.png', label: 'Daily Analytics' }
];

const MOBILE_IMAGES = [
  { id: 'dashboard', src: '/dashboard-on-mobile.png', label: 'Mobile POS' },
  { id: 'inventory', src: '/inventory-on-mobile.png', label: 'Quick Stock' },
  { id: 'reports', src: '/reports-on-mobile.png', label: 'Instant Reports' }
];

export function MacbookScroll() {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [isMounted, setIsMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      if (window.innerWidth < 768) setDevice('mobile');
      else if (window.innerWidth < 1024) setDevice('tablet');
      else setDevice('desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) return <div className="h-screen w-full bg-[#080810]" />;

  return (
    <div className="relative w-full bg-[#080810] text-white overflow-clip font-sans selection:bg-blue-500/30">
      {/* Shared Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: `
          radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,.4) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 50% 60%, rgba(255,255,255,.5) 0%, transparent 100%),
          radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,.3) 0%, transparent 100%)
        `
      }} />

      {device === 'desktop' && <DesktopMacbook prefersReduced={prefersReduced} />}
      {device === 'tablet' && <ContainerScroll type="tablet" prefersReduced={prefersReduced} />}
      {device === 'mobile' && <ContainerScroll type="mobile" prefersReduced={prefersReduced} />}
    </div>
  );
}

// ==========================================
// 1. DESKTOP MACBOOK ANIMATION & CONTROLLER
// ==========================================
function DesktopMacbook({ prefersReduced }: { prefersReduced: boolean | null }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shimmer, setShimmer] = useState(false);

  // Upgraded Feature States
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);

  const togglePower = () => {
    setIsPoweredOn(prev => {
      const nextState = !prev;
      if (nextState) setIsAutoPlayPaused(false);
      return nextState;
    });
  };

  const handleArrowNav = (direction: 'left' | 'right') => {
    if (!isPoweredOn) return;
    setIsAutoPlayPaused(true);
    setCurrentViewIndex(prev => {
      if (direction === 'left') {
        return (prev - 1 + DESKTOP_IMAGES.length) % DESKTOP_IMAGES.length;
      }
      return (prev + 1) % DESKTOP_IMAGES.length;
    });
  };

  // Auto-slide engine (pauses upon manual arrow override)
  useEffect(() => {
    if (prefersReduced || isAutoPlayPaused || !isPoweredOn) return;
    const interval = setInterval(() => {
      setCurrentViewIndex(prev => (prev + 1) % DESKTOP_IMAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlayPaused, isPoweredOn, prefersReduced]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 40, mass: 0.8 });
  const staticProgress = useMotionValue(1);
  const progressToUse = prefersReduced ? staticProgress : smoothProgress;

  const lidAngle = useTransform(progressToUse, [0, 1], [-108, 0]);
  const scale = useTransform(progressToUse, [0, 1], [0.65, 1]);
  const translateY = useTransform(progressToUse, [0, 1], ['12vh', '0px']);
  const rotateX = useTransform(progressToUse, [0, 1], [15, 0]);
  const headerOpacity = useTransform(progressToUse, [0, 0.3], [1, 0]);
  const glowOpacity = useTransform(progressToUse, [0.4, 1], [0, 0.12]);

  useMotionValueEvent(progressToUse, "change", (latest) => {
    if (latest > 0.65 && !shimmer) {
      setShimmer(true);
      setTimeout(() => setShimmer(false), 1500);
    }
  });

  return (
    <div ref={containerRef} className="h-[400vh] relative z-20">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-[1400px]">

        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,1) 0%, transparent 70%)', opacity: glowOpacity }} />

        <HeaderTitle opacity={headerOpacity} />

        <div className="w-full flex justify-center items-center mt-[min(10vh,6rem)]" style={{ perspective: '1400px', perspectiveOrigin: '50% 40%' }}>
          <motion.div className="relative w-[min(85vw,112vh,950px)]" style={{ transformStyle: 'preserve-3d', scale, y: translateY, rotateX }}>

            {/* --- 2-SIDED MACBOOK LID --- */}
            <motion.div className="relative w-full aspect-[16/10] origin-bottom" style={{ transformStyle: 'preserve-3d', rotateX: lidAngle }}>

              {/* SIDE A: FRONT FACE */}
              <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}>
                <div className="absolute inset-0 rounded-t-[18px] bg-gradient-to-br from-[#c8c9cc] to-[#a0a2a5] shadow-[inset_0_1px_0_rgba(255,255,255,.6),_0_-6px_20px_rgba(0,0,0,.5)]" />
                <div className="absolute top-2 left-2 right-2 bottom-0 bg-[#0a0a0e] rounded-t-[10px] overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,.06)] flex flex-col">

                  {/* Hardware Bezel & Active Indicator LED */}
                  <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1a1a1f] border border-[#333] z-50 flex items-center justify-center">
                    <motion.div
                      className="w-[2px] h-[2px] rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]"
                      animate={{ opacity: isPoweredOn ? 1 : 0.2, backgroundColor: isPoweredOn ? '#34d399' : '#f59e0b' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Screen Content Wrapper */}
                  <div className="absolute top-[16px] left-0 right-0 bottom-0 bg-[#0f172a] overflow-hidden">
                    {/* CHANGED: Wrapped the Desktop UIContainer in an Apple-grade hardware ignition sequence */}
                    <AnimatePresence mode="wait">
                      {isPoweredOn && (
                        <motion.div
                          key="active-display-canvas"
                          initial={{ opacity: 0, scale: 0.94, filter: "blur(12px) brightness(1.6)" }}
                          animate={{ opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }}
                          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 w-full h-full z-10"
                        >
                          {/* High-Voltage Backlight Surge Overlay */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-white/20 to-transparent pointer-events-none z-30 mix-blend-overlay"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                          />

                          <UIContainer
                            device="desktop"
                            isPoweredOn={isPoweredOn}
                            currentIndex={currentViewIndex}
                            onNavigate={handleArrowNav}
                            onSelectIndex={(idx) => { setIsAutoPlayPaused(true); setCurrentViewIndex(idx); }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div className="absolute inset-0 z-50 pointer-events-none" initial={{ x: '-100%', opacity: 0 }} animate={shimmer ? { x: '100%', opacity: 1 } : { x: '-100%', opacity: 0 }} transition={{ duration: 1, ease: 'easeInOut' }} style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)' }} />

                    {/* --- FEATURE 1: STANDBY OS BOOT OVERLAY --- */}
                    <AnimatePresence>
                      {!isPoweredOn && (
                        <motion.div
                          className="absolute inset-0 bg-[#080810] z-40 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden backdrop-blur-2xl"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0, scale: 1.04 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="absolute w-[350px] h-[350px] rounded-full bg-blue-600/10 blur-[85px] pointer-events-none" />

                          {/* Smooth Fade Animated Logo */}
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1, 0.98] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="flex flex-col items-center gap-3 z-10 cursor-pointer group"
                            onClick={togglePower}
                          >
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] border border-blue-400/30 group-hover:scale-105 transition-transform">
                              <span className="text-3xl font-bold text-white tracking-tighter">N</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">NexiaCore OS</span>
                          </motion.div>

                          {/* Professional Smooth Text Reveal Prompt */}
                          <div className="mt-6 overflow-hidden z-10">
                            <motion.div
                              initial={{ y: "100%", opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                              className="flex flex-col items-center gap-2"
                            >
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-slate-300 backdrop-blur-md">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                Standby Mode
                              </div>
                              <p className="text-xs md:text-sm text-slate-400 max-w-[280px] leading-relaxed">
                                Press the pulsing <span className="text-blue-400 font-medium">Power Button</span> on the keyboard below to boot system.
                              </p>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#888] via-[#aaa] to-[#888]" />
              </div>

              {/* SIDE B: BACK FACE */}
              <div className="absolute inset-0 w-full h-full rounded-t-[18px] bg-gradient-to-br from-[#d8d9dc] via-[#b5b6b9] to-[#929497] flex items-center justify-center border-t-[1.5px] border-x-[1.5px] border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.9)] overflow-hidden" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(1px)' }}>
                <div className="relative flex items-center justify-center">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white fill-current opacity-90" viewBox="0 0 384 512">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#555] via-[#333] to-[#555]" />
              </div>

            </motion.div>

            {/* BASE & INTERACTIVE KEYBOARD */}
            <div className="relative w-full">
              <div className="w-full h-1 bg-gradient-to-b from-[#8a8b8e] to-[#8a8b8e]" />
              <div className="rounded-b-[14px] p-4 bg-gradient-to-b from-[#b0b2b5] to-[#a0a2a5] shadow-[0_12px_40px_rgba(0,0,0,.7),_0_2px_0_rgba(255,255,255,.15)_inset]">
                <div className="flex justify-between mb-2">
                  <div className="w-[22%] h-1 bg-black/20 rounded-full" />
                  <div className="w-[22%] h-1 bg-black/20 rounded-full" />
                </div>

                <div className="w-full aspect-[2.65] bg-gradient-to-b from-[#1e1e1e] to-[#181818] rounded-md p-1.5 flex flex-col gap-[1.5%] shadow-[inset_0_2px_8px_rgba(0,0,0,.8),0_1px_0_rgba(255,255,255,.08)] relative">
                  <MacKeyboardRenderer
                    togglePower={togglePower}
                    isPoweredOn={isPoweredOn}
                    onArrowClick={handleArrowNav}
                  />
                </div>

                <div className="flex justify-center mt-2.5">
                  <div className="w-[38%] aspect-[16/9] rounded-md bg-gradient-to-br from-[#999a9d] to-[#8a8b8e] shadow-[inset_0_1px_3px_rgba(0,0,0,.3)]" />
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 2. TABLET / MOBILE CONTAINER SCROLL
// ==========================================
function ContainerScroll({ type, prefersReduced }: { type: 'tablet' | 'mobile', prefersReduced: boolean | null }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 350, damping: 40, mass: 0.8 });
  const staticProgress = useMotionValue(1);
  const progressToUse = prefersReduced ? staticProgress : smoothProgress;

  const rotateX = useTransform(progressToUse, [0, 1], [22, 0]);
  const scale = useTransform(progressToUse, [0, 1], [0.85, 1]);
  const translateY = useTransform(progressToUse, [0, 1], [200, 0]);
  const headerOpacity = useTransform(progressToUse, [0, 0.4], [1, 0]);

  const isTablet = type === 'tablet';

  return (
    <div ref={containerRef} className="h-[200vh] relative z-10">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-[1200px]">
        <HeaderTitle opacity={headerOpacity} />
        <div className="w-full flex justify-center items-center mt-12" style={{ perspective: '1200px' }}>
          <motion.div className="relative" style={{ rotateX, scale, y: translateY, transformStyle: 'preserve-3d' }}>
            {isTablet ? (
              <div className="w-[90vw] max-w-[800px] aspect-[4.5/3] bg-black rounded-[2rem] p-3 border-4 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
                <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#111] border border-white/10" />
                <div className="w-full h-full bg-[#0f172a] rounded-[1.2rem] overflow-hidden">
                  <UIContainer device="tablet" />
                </div>
              </div>
            ) : (
              <div className="w-[85vw] max-w-[380px] aspect-[9/19.5] bg-black rounded-[3rem] p-2 border-[6px] border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[35%] h-6 bg-black rounded-full z-50 flex items-center justify-end px-2">
                  <div className="w-2 h-2 rounded-full bg-blue-900/30" />
                </div>
                <div className="w-full h-full bg-[#0f172a] rounded-[2.2rem] overflow-hidden pt-6">
                  <UIContainer device="mobile" />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 3. SHARED HEADER TITLE
// ==========================================
function HeaderTitle({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div className="absolute top-[12%] text-center z-20 w-full px-4" style={{ opacity }}>
      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/60 tracking-wider mb-5 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_#2563eb]" />
        NEXIACORE CLOUD POS
      </div>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
        Your retail empire,<br />beautifully managed.
      </h1>
    </motion.div>
  );
}


// ==========================================
// 4. THE SAAS UI CORE & VIEW HUD
// ==========================================
function UIContainer({ 
  device, 
  isPoweredOn = true,
  currentIndex: controlledIndex,
  onNavigate,
  onSelectIndex
}: { 
  device: DeviceType; 
  isPoweredOn?: boolean;
  currentIndex?: number;
  onNavigate?: (direction: 'left' | 'right') => void;
  onSelectIndex?: (idx: number) => void;
})  {
  const images = device === 'desktop' ? DESKTOP_IMAGES : device === 'tablet' ? TABLET_IMAGES : MOBILE_IMAGES;
  
  // Swipe & Pagination State
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [userTouched, setUserTouched] = useState(false);
  const prefersReduced = useReducedMotion();

  const isControlled = controlledIndex !== undefined;
  const activeIndex = isControlled ? controlledIndex : page;
  const isTouchView = device === 'tablet' || device === 'mobile';

  const paginate = (newDirection: number) => {
    if (onNavigate) {
      onNavigate(newDirection > 0 ? 'right' : 'left');
      return;
    }
    setDirection(newDirection);
    setPage(prev => (prev + newDirection + images.length) % images.length);
  };

  // Standalone Auto-play for Tablet/Mobile (Pauses permanently the exact second a human touches it)
  useEffect(() => {
    if (isControlled || prefersReduced || userTouched || images.length <= 1 || !isPoweredOn) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 3200); 
    return () => clearInterval(interval);
  }, [isControlled, prefersReduced, userTouched, images.length, isPoweredOn]);

  // 120Hz ProMotion physical glass slide variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0.8,
      scale: 0.95,
      boxShadow: dir > 0 ? '20px 0 30px rgba(0,0,0,0.6)' : '-20px 0 30px rgba(0,0,0,0.6)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      boxShadow: '0 0 0 rgba(0,0,0,0)',
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0.8,
      scale: 0.95,
    })
  };
  return (
    <div 
      className="flex flex-col h-full w-full bg-[#0f172a] relative select-none overflow-hidden"
      onMouseEnter={() => !isTouchView && setUserTouched(true)}
      onMouseLeave={() => !isTouchView && setUserTouched(false)}
    >
      {device === 'desktop' && (
        <div className="h-8 md:h-10 bg-[#0f172a] border-b border-white/5 flex items-center justify-between px-4 z-20 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 text-[10px] md:text-xs text-slate-400 font-medium tracking-wide">
            {images[activeIndex]?.label || 'app.nexiacore.shop'}
          </span>
        </div>
      )}

      {/* Viewport Canvas */}
      <div className="flex-1 relative overflow-hidden bg-[#0f172a]">
        {isTouchView ? (
          /* --- FEATURE: Realistic Touch & Drag Screen View Canvas --- */
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                x: { type: "spring", stiffness: 320, damping: 30 }, 
                opacity: { duration: 0.2 },
                scale: { duration: 0.25 }
              }}
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.22} // Apple rubber-band tension coefficient
              onDragStart={() => setUserTouched(true)}
              onDragEnd={(e, { offset, velocity }) => {
                const swipePower = Math.abs(offset.x) * velocity.x;
                if (swipePower < -6000 || offset.x < -45) {
                  paginate(1);
                } else if (swipePower > 6000 || offset.x > 45) {
                  paginate(-1);
                }
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[activeIndex].src} alt={images[activeIndex].label} className="w-full h-full object-cover object-top pointer-events-none" draggable="false" />
            </motion.div>
          </AnimatePresence>
        ) : (
          /* --- Existing Desktop Liquid Retina Crossfade Canvas --- */
          images.map((img, idx) => (
            <div 
              key={img.id} 
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                activeIndex === idx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-[1.02] z-0 pointer-events-none'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.label} className="w-full h-full object-cover object-top" draggable="false" />
            </div>
          ))
        )}
      </div>

      {/* Floating subtle gesture hint (Disappears the moment they touch it) */}
      <AnimatePresence>
        {!userTouched && isTouchView && images.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ delay: 1.2, duration: 0.3 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-white/15 text-[11px] font-medium text-slate-200 tracking-wide shadow-[0_10px_25px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center gap-1.5"
          >
            <span className="inline-block animate-pulse">👆</span> Swipe screen
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation HUD for Desktop */}
      {isPoweredOn && images.length > 1 && !isTouchView && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-slate-950/80 hover:bg-slate-950 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md shadow-2xl transition-all">
          <button onClick={() => paginate(-1)} className="w-5 h-5 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors text-[10px]">◀</button>
          <div className="flex items-center gap-1.5 px-1">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => onSelectIndex ? onSelectIndex(idx) : setPage(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-5 bg-blue-500 shadow-[0_0_8px_#2563eb]' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
          <button onClick={() => paginate(1)} className="w-5 h-5 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors text-[10px]">▶</button>
        </div>
      )}
    </div>
  );
}


// ==========================================
// 5. UPGRADED KEYBOARD ENGINE & TACTILE MAP
// ==========================================
function normalizeKeyId(e: KeyboardEvent): string | null {
  const code = e.code;
  const key = e.key.toLowerCase();

  if (code === 'Space') return 'space';
  if (key === 'escape') return 'esc';
  if (key === 'backspace' || key === 'delete') return 'delete';
  if (key === 'enter') return 'return';
  if (key === 'tab') return 'tab';
  if (key === 'capslock') return 'caps';

  if (key === 'shift') return e.location === 2 ? 'shift-r' : 'shift-l';
  if (key === 'control') return 'ctrl';
  if (key === 'alt') return e.location === 2 ? 'opt-r' : 'opt-l';
  if (key === 'meta') return e.location === 2 ? 'cmd-r' : 'cmd-l';

  if (code === 'ArrowUp') return 'up';
  if (code === 'ArrowDown') return 'down';
  if (code === 'ArrowLeft') return 'left';
  if (code === 'ArrowRight') return 'right';

  if (code.startsWith('F') && !isNaN(parseInt(code.slice(1)))) return code.toLowerCase();
  if (key.length === 1) return key;

  return null;
}

function K({
  id,
  label,
  flex = "flex-1",
  className = "",
  activeMap,
  onManual,
  onClick,
  children
}: {
  id: string;
  label?: string;
  flex?: string;
  className?: string;
  activeMap: Record<string, boolean>;
  onManual: (id: string, state: boolean) => void;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  const isPressed = activeMap[id] || false;

  return (
    <div
      onMouseDown={() => { onManual(id, true); onClick?.(); }}
      onMouseUp={() => onManual(id, false)}
      onMouseLeave={() => onManual(id, false)}
      onTouchStart={() => { onManual(id, true); onClick?.(); }}
      onTouchEnd={() => onManual(id, false)}
      className={`
        ${flex} ${className}
        rounded-[3px] flex items-center justify-center relative overflow-hidden
        cursor-pointer select-none transition-all duration-75 ease-out
        ${isPressed
          ? 'translate-y-[1.5px] bg-gradient-to-b from-[#303030] to-[#181818] shadow-[0_0.5px_0_#0d0d0d,_inset_0_0.5px_0_rgba(255,255,255,.05)] text-blue-400 border-blue-500/50'
          : 'bg-gradient-to-b from-[#454545] to-[#2a2a2a] shadow-[0_2px_0_#0d0d0d,_inset_0_1px_0_rgba(255,255,255,.13)]'
        }
      `}
    >
      {children || (
        <span className={`font-sans transition-colors duration-75 ${isPressed ? 'text-white font-bold scale-[0.98]' : 'text-white/50'} text-[6px] lg:text-[8px] font-medium`}>
          {label || id}
        </span>
      )}
    </div>
  );
}

function MacKeyboardRenderer({
  togglePower,
  isPoweredOn,
  onArrowClick
}: {
  togglePower?: () => void;
  isPoweredOn?: boolean;
  onArrowClick?: (dir: 'left' | 'right') => void;
}) {
  const [activeKeys, setActiveKeys] = useState<Record<string, boolean>>({});

  // Senior architecture: highly stable stateRef prevents re-binding listeners on every render
  const stateRef = useRef({ isPoweredOn, togglePower, onArrowClick });
  useEffect(() => {
    stateRef.current = { isPoweredOn, togglePower, onArrowClick };
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mapped = normalizeKeyId(e);
      if (mapped) {
        setActiveKeys(prev => ({ ...prev, [mapped]: true }));

        // Synchronized physical arrow key triggers
        if (mapped === 'left') stateRef.current.onArrowClick?.('left');
        if (mapped === 'right') stateRef.current.onArrowClick?.('right');
        if (mapped === 'power') stateRef.current.togglePower?.();

        // Let physical space/return boot the OS when in Standby mode
        if ((mapped === 'space' || mapped === 'return') && !stateRef.current.isPoweredOn) {
          stateRef.current.togglePower?.();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const mapped = normalizeKeyId(e);
      if (mapped) setActiveKeys(prev => ({ ...prev, [mapped]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const setManual = (id: string, state: boolean) => setActiveKeys(prev => ({ ...prev, [id]: state }));
  const rowStyle = "flex-1 flex gap-[0.5%]";

  return (
    <>
      <div className={rowStyle}>
        <K id="esc" label="esc" activeMap={activeKeys} onManual={setManual} />
        {['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12'].map((k) => (
          <K key={k} id={k} label={k.toUpperCase()} flex="flex-[0.8]" activeMap={activeKeys} onManual={setManual} />
        ))}

        {/* --- FEATURE 1: RIPPLE ANIMATED POWER BUTTON --- */}
        <K id="power" flex="flex-1" activeMap={activeKeys} onManual={setManual} onClick={() => stateRef.current.togglePower?.()} className="relative overflow-visible z-30 group">
          <div className={`w-2.5 h-2.5 rounded-full border transition-colors duration-300 relative z-10 ${isPoweredOn ? 'border-emerald-500/50 bg-emerald-500/20' : 'border-white/20 bg-transparent group-hover:border-blue-400'}`} />
          {!isPoweredOn && (
            <>
              <span className="absolute w-6 h-6 rounded-full bg-blue-500/40 animate-ping pointer-events-none" style={{ animationDuration: '2.5s' }} />
              <span className="absolute w-7 h-7 rounded-full border border-blue-400/60 animate-pulse pointer-events-none" />
            </>
          )}
        </K>
      </div>

      <div className={rowStyle}>
        <K id="`" label="`" activeMap={activeKeys} onManual={setManual} />
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='].map(k => (
          <K key={k} id={k} label={k} activeMap={activeKeys} onManual={setManual} />
        ))}
        <K id="delete" label="delete" flex="flex-[1.8]" activeMap={activeKeys} onManual={setManual} />
      </div>

      <div className={rowStyle}>
        <K id="tab" label="tab" flex="flex-[1.5]" activeMap={activeKeys} onManual={setManual} />
        {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'].map(k => (
          <K key={k} id={k} label={k.toUpperCase()} activeMap={activeKeys} onManual={setManual} />
        ))}
      </div>

      <div className={rowStyle}>
        <K id="caps" label="caps" flex="flex-[1.8]" activeMap={activeKeys} onManual={setManual} />
        {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''].map(k => (
          <K key={k} id={k} label={k.toUpperCase()} activeMap={activeKeys} onManual={setManual} />
        ))}
        <K id="return" label="return" flex="flex-[2.2]" activeMap={activeKeys} onManual={setManual} />
      </div>

      <div className={rowStyle}>
        <K id="shift-l" label="shift" flex="flex-[2.3]" activeMap={activeKeys} onManual={setManual} />
        {['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'].map(k => (
          <K key={k} id={k} label={k.toUpperCase()} activeMap={activeKeys} onManual={setManual} />
        ))}
        <K id="shift-r" label="shift" flex="flex-[2.3]" activeMap={activeKeys} onManual={setManual} />
      </div>

      <div className={rowStyle}>
        <K id="fn" label="fn" activeMap={activeKeys} onManual={setManual} />
        <K id="ctrl" label="ctrl" activeMap={activeKeys} onManual={setManual} />
        <K id="opt-l" label="opt" activeMap={activeKeys} onManual={setManual} />
        <K id="cmd-l" label="cmd" flex="flex-[1.5]" activeMap={activeKeys} onManual={setManual} />
        <K id="space" label="" flex="flex-[5]" activeMap={activeKeys} onManual={setManual} onClick={() => { if (!stateRef.current.isPoweredOn) stateRef.current.togglePower?.(); }} />
        <K id="cmd-r" label="cmd" flex="flex-[1.5]" activeMap={activeKeys} onManual={setManual} />
        <K id="opt-r" label="opt" activeMap={activeKeys} onManual={setManual} />

        {/* --- FEATURE 2: INTERACTIVE MOCKUP ARROW KEYS --- */}
        <div className="flex-[1.5] flex flex-col gap-[2%]">
          <K id="up" label="▲" flex="flex-1" className="text-[5px]" activeMap={activeKeys} onManual={setManual} />
          <div className="flex-1 flex gap-[2%]">
            <K id="left" label="◀" flex="flex-1" className="text-[5px] hover:text-blue-400 hover:border-blue-500/40 transition-colors" activeMap={activeKeys} onManual={setManual} onClick={() => stateRef.current.onArrowClick?.('left')} />
            <K id="down" label="▼" flex="flex-1" className="text-[5px]" activeMap={activeKeys} onManual={setManual} />
            <K id="right" label="▶" flex="flex-1" className="text-[5px] hover:text-blue-400 hover:border-blue-500/40 transition-colors" activeMap={activeKeys} onManual={setManual} onClick={() => stateRef.current.onArrowClick?.('right')} />
          </div>
        </div>
      </div>
    </>
  );
}