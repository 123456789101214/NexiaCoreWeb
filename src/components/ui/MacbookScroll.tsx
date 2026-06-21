'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion, useMotionValueEvent, useMotionValue } from 'framer-motion';

// --- Types & Config ---
type DeviceType = 'desktop' | 'tablet' | 'mobile';

// Images paths based on uploaded screenshots
const DESKTOP_IMAGES = [
  { id: 'dashboard', src: '/dashboard-on-desktop.png' },
  { id: 'inventory', src: '/inventory-on-desktop.png' },
  { id: 'reports', src: '/reports-on-desktop.png' }
];

const TABLET_IMAGES = [
  { id: 'dasboard', src: '/dashboard-on-tablet.png' },
  { id: 'reports', src: '/reports-on-tablet.png' }
];

const MOBILE_IMAGES = [
  { id: 'dasboard', src: '/dashboard-on-mobile.png' },
  { id: 'inventory', src: '/inventory-on-mobile.png' },
  { id: 'reports', src: '/reports-on-mobile.png' }
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
      {/* Background Ambience Shared */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: `
          radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,.4) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 50% 60%, rgba(255,255,255,.5) 0%, transparent 100%),
          radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,.3) 0%, transparent 100%)
        `
      }} />

      {/* Render Appropriate Device Experience */}
      {device === 'desktop' && <DesktopMacbook prefersReduced={prefersReduced} />}
      {device === 'tablet' && <ContainerScroll type="tablet" prefersReduced={prefersReduced} />}
      {device === 'mobile' && <ContainerScroll type="mobile" prefersReduced={prefersReduced} />}
    </div>
  );
}

// ==========================================
// 1. DESKTOP MACBOOK ANIMATION
// ==========================================
function DesktopMacbook({ prefersReduced }: { prefersReduced: boolean | null }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shimmer, setShimmer] = useState(false);
  const [isPoweredOn, setIsPoweredOn] = useState(true);

  const togglePower = () => setIsPoweredOn(prev => !prev);

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
              <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="absolute inset-0 rounded-t-[18px] bg-gradient-to-br from-[#c8c9cc] to-[#a0a2a5] shadow-[inset_0_1px_0_rgba(255,255,255,.6),_0_-6px_20px_rgba(0,0,0,.5)]" />
                <div className="absolute top-2 left-2 right-2 bottom-0 bg-[#0a0a0e] rounded-t-[10px] overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,.06)]">
                  <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1a1a1f] border border-[#333] z-10 flex items-center justify-center">
                    <motion.div 
                      className="w-[2px] h-[2px] rounded-full bg-blue-500/60" 
                      animate={{ opacity: isPoweredOn ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  
                  {/* Screen Content */}
                  <div className="absolute top-[16px] left-0 right-0 bottom-0 bg-[#0f172a] overflow-hidden">
                    <UIContainer device="desktop" isPoweredOn={isPoweredOn} />
                    <motion.div className="absolute inset-0 z-50 pointer-events-none" initial={{ x: '-100%', opacity: 0 }} animate={shimmer ? { x: '100%', opacity: 1 } : { x: '-100%', opacity: 0 }} transition={{ duration: 1, ease: 'easeInOut' }} style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)' }} />
                    
                    {/* Realistic GPU-accelerated Power OFF/ON screen overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-[#08080f] z-40 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isPoweredOn ? 0 : 1 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#888] via-[#aaa] to-[#888]" />
              </div>

              {/* SIDE B: BACK FACE */}
              <div 
                className="absolute inset-0 w-full h-full rounded-t-[18px] bg-gradient-to-br from-[#d8d9dc] via-[#b5b6b9] to-[#929497] flex items-center justify-center border-t-[1.5px] border-x-[1.5px] border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.9)] overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg) translateZ(1px)',
                }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Crisp SVG Apple Logo */}
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white fill-current opacity-90" viewBox="0 0 384 512">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#555] via-[#333] to-[#555]" />
              </div>

            </motion.div>

            {/* BASE */}
            <div className="relative w-full">
              <div className="w-full h-1 bg-gradient-to-b from-[#8a8b8e] to-[#8a8b8e]" />
              <div className="rounded-b-[14px] p-4 bg-gradient-to-b from-[#b0b2b5] to-[#a0a2a5] shadow-[0_12px_40px_rgba(0,0,0,.7),_0_2px_0_rgba(255,255,255,.15)_inset]">
                <div className="flex justify-between mb-2">
                  <div className="w-[22%] h-1 bg-black/20 rounded-full" />
                  <div className="w-[22%] h-1 bg-black/20 rounded-full" />
                </div>
                
                {/* --- UPGRADED INTERACTIVE MACBOOK KEYBOARD --- */}
                <div className="w-full aspect-[2.65] bg-gradient-to-b from-[#1e1e1e] to-[#181818] rounded-md p-1.5 flex flex-col gap-[1.5%] shadow-[inset_0_2px_8px_rgba(0,0,0,.8),0_1px_0_rgba(255,255,255,.08)]">
                   <MacKeyboardRenderer togglePower={togglePower} />
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
          <motion.div 
            className="relative"
            style={{ 
              rotateX, 
              scale, 
              y: translateY,
              transformStyle: 'preserve-3d'
            }}
          >
            {isTablet ? (
              // iPAD FRAME
              <div className="w-[90vw] max-w-[800px] aspect-[4.5/3] bg-black rounded-[2rem] p-3 border-4 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
                <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#111] border border-white/10" />
                <div className="w-full h-full bg-[#0f172a] rounded-[1.2rem] overflow-hidden">
                  <UIContainer device="tablet" />
                </div>
              </div>
            ) : (
              // iPHONE FRAME
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
function HeaderTitle({ opacity }: { opacity: any }) {
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
// 4. THE SAAS UI CORE
// ==========================================
function UIContainer({ device, isPoweredOn = true }: { device: DeviceType; isPoweredOn?: boolean }) {
  const images = device === 'desktop' ? DESKTOP_IMAGES : device === 'tablet' ? TABLET_IMAGES : MOBILE_IMAGES;
  const [activeId, setActiveId] = useState(images[0].id);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Automatically pause image slider if the user shut down the macbook!
    if (prefersReduced || isHovered || images.length <= 1 || !isPoweredOn) return;
    
    const interval = setInterval(() => {
      setActiveId((prev) => {
        const currentIndex = images.findIndex((img) => img.id === prev);
        return images[(currentIndex + 1) % images.length].id;
      });
    }, 3000); 
    
    return () => clearInterval(interval);
  }, [isHovered, prefersReduced, images, isPoweredOn]);

  return (
    <div 
      className="flex flex-col h-full w-full bg-[#0f172a]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {device === 'desktop' && (
        <div className="h-8 md:h-10 bg-[#0f172a] border-b border-white/5 flex items-center justify-between px-4 z-20 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/90" />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 text-[10px] md:text-xs text-slate-500 font-medium">app.nexiacore.shop</span>
        </div>
      )}

      <div className="flex-1 relative overflow-hidden bg-[#0f172a]">
        {images.map((img) => (
          <div 
            key={img.id} 
            className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
              activeId === img.id ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.id} className="w-full h-full object-cover object-top" draggable="false" />
          </div>
        ))}
      </div>
    </div>
  );
}


// ==========================================
// 5. UPGRADED INTERACTIVE KEYBOARD ENGINE
// ==========================================

// Intercepts physical keyboard JS event and converts to our custom key ID
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

  if (code.startsWith('F') && !isNaN(parseInt(code.slice(1)))) {
    return code.toLowerCase();
  }

  if (key.length === 1) return key;

  return null;
}

// Reusable physical tactile Key sub-component
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
          ? 'translate-y-[1.5px] bg-gradient-to-b from-[#303030] to-[#181818] shadow-[0_0.5px_0_#0d0d0d,_inset_0_0.5px_0_rgba(255,255,255,.05)]'
          : 'bg-gradient-to-b from-[#454545] to-[#2a2a2a] shadow-[0_2px_0_#0d0d0d,_inset_0_1px_0_rgba(255,255,255,.13)]'
        }
      `}
    >
      {children || (
        <span className={`font-sans transition-colors duration-75 ${isPressed ? 'text-white/90 scale-[0.98]' : 'text-white/50'} text-[6px] lg:text-[8px] font-medium`}>
          {label || id}
        </span>
      )}
    </div>
  );
}

function MacKeyboardRenderer({ togglePower }: { togglePower?: () => void }) {
  const [activeKeys, setActiveKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mapped = normalizeKeyId(e);
      if (mapped) setActiveKeys(prev => ({ ...prev, [mapped]: true }));
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

  const setManual = (id: string, state: boolean) => {
    setActiveKeys(prev => ({ ...prev, [id]: state }));
  };

  const rowStyle = "flex-1 flex gap-[0.5%]";

  return (
    <>
      <div className={rowStyle}>
        <K id="esc" label="esc" activeMap={activeKeys} onManual={setManual} />
        {['f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12'].map((k) => (
          <K key={k} id={k} label={k.toUpperCase()} flex="flex-[0.8]" activeMap={activeKeys} onManual={setManual} />
        ))}
        {/* Hooked up onClick trigger directly to the Power Key */}
        <K id="power" flex="flex-1" activeMap={activeKeys} onManual={setManual} onClick={togglePower}>
          <div className="w-3 h-3 border border-white/20 rounded-full shadow-inner"/>
        </K>
      </div>

      <div className={rowStyle}>
        <K id="`" label="`" activeMap={activeKeys} onManual={setManual} />
        {['1','2','3','4','5','6','7','8','9','0','-','='].map(k => (
          <K key={k} id={k} label={k} activeMap={activeKeys} onManual={setManual} />
        ))}
        <K id="delete" label="delete" flex="flex-[1.8]" activeMap={activeKeys} onManual={setManual} />
      </div>

      <div className={rowStyle}>
        <K id="tab" label="tab" flex="flex-[1.5]" activeMap={activeKeys} onManual={setManual} />
        {['q','w','e','r','t','y','u','i','o','p','[',']','\\'].map(k => (
          <K key={k} id={k} label={k.toUpperCase()} activeMap={activeKeys} onManual={setManual} />
        ))}
      </div>

      <div className={rowStyle}>
        <K id="caps" label="caps" flex="flex-[1.8]" activeMap={activeKeys} onManual={setManual} />
        {['a','s','d','f','g','h','j','k','l',';','\''].map(k => (
          <K key={k} id={k} label={k.toUpperCase()} activeMap={activeKeys} onManual={setManual} />
        ))}
        <K id="return" label="return" flex="flex-[2.2]" activeMap={activeKeys} onManual={setManual} />
      </div>

      <div className={rowStyle}>
        <K id="shift-l" label="shift" flex="flex-[2.3]" activeMap={activeKeys} onManual={setManual} />
        {['z','x','c','v','b','n','m',',','.','/'].map(k => (
          <K key={k} id={k} label={k.toUpperCase()} activeMap={activeKeys} onManual={setManual} />
        ))}
        <K id="shift-r" label="shift" flex="flex-[2.3]" activeMap={activeKeys} onManual={setManual} />
      </div>

      <div className={rowStyle}>
        <K id="fn" label="fn" activeMap={activeKeys} onManual={setManual} />
        <K id="ctrl" label="ctrl" activeMap={activeKeys} onManual={setManual} />
        <K id="opt-l" label="opt" activeMap={activeKeys} onManual={setManual} />
        <K id="cmd-l" label="cmd" flex="flex-[1.5]" activeMap={activeKeys} onManual={setManual} />
        <K id="space" label="" flex="flex-[5]" activeMap={activeKeys} onManual={setManual} />
        <K id="cmd-r" label="cmd" flex="flex-[1.5]" activeMap={activeKeys} onManual={setManual} />
        <K id="opt-r" label="opt" activeMap={activeKeys} onManual={setManual} />
        <div className="flex-[1.5] flex flex-col gap-[2%]">
           <K id="up" label="▲" flex="flex-1" className="text-[5px]" activeMap={activeKeys} onManual={setManual} />
           <div className="flex-1 flex gap-[2%]">
             <K id="left" label="◀" flex="flex-1" className="text-[5px]" activeMap={activeKeys} onManual={setManual} />
             <K id="down" label="▼" flex="flex-1" className="text-[5px]" activeMap={activeKeys} onManual={setManual} />
             <K id="right" label="▶" flex="flex-1" className="text-[5px]" activeMap={activeKeys} onManual={setManual} />
           </div>
        </div>
      </div>
    </>
  );
}