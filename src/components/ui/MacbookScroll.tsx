'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion, useMotionValueEvent, useMotionValue } from 'framer-motion';

// --- Types & Data ---
type TabType = 'dashboard' | 'pos' | 'inventory' | 'coverage';

const TABS: { id: TabType; label: string; icon: React.ReactNode }[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'pos',
    label: 'POS System',
    icon: (
      <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: (
      <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    id: 'coverage',
    label: 'Coverage',
    icon: (
      <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

const PROVINCES = [
  { name: 'Northern', x: 140, y: 20 },
  { name: 'N.Central', x: 155, y: 65 },
  { name: 'N.Western', x: 90, y: 110 },
  { name: 'Central', x: 155, y: 135 },
  { name: 'Eastern', x: 215, y: 95 },
  { name: 'Western', x: 70, y: 165 },
  { name: 'Sabaragamuwa', x: 125, y: 180 },
  { name: 'Uva', x: 195, y: 160 },
  { name: 'Southern', x: 140, y: 215 },
];

export function MacbookScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const prefersReduced = useReducedMotion();

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isScreenHovered, setIsScreenHovered] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        typeof window !== 'undefined' &&
        ('ontouchstart' in window || navigator.maxTouchPoints > 0)
      );
    };
    checkTouch();
  }, []);

  useEffect(() => {
    if (prefersReduced || isScreenHovered) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = TABS.findIndex((t) => t.id === prev);
        return TABS[(currentIndex + 1) % TABS.length].id;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isScreenHovered, prefersReduced]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    mass: 0.8,
  });

  const staticProgress = useMotionValue(1);
  const progressToUse = prefersReduced ? staticProgress : smoothProgress;

  const lidAngle = useTransform(progressToUse, [0, 1], [-92, 0]);
  const scale = useTransform(progressToUse, [0, 1], [0.55, 1]);
  const translateY = useTransform(progressToUse, [0, 1], [220, 0]);
  const rotateX = useTransform(progressToUse, [0, 1], [18, 0]);
  
  const headerOpacity = useTransform(progressToUse, [0, 0.3], [1, 0]);
  const headerTranslateY = useTransform(progressToUse, [0, 0.3], [0, -40]);
  const scrollHintOpacity = useTransform(progressToUse, [0, 0.2], [1, 0]);
  
  const glowOpacity = useTransform(progressToUse, [0.4, 1], [0, 0.12]); 
  const screenReflectionOpacity = useTransform(progressToUse, [0.6, 1], [0, 0.9]);

  useMotionValueEvent(progressToUse, "change", (latest) => {
    if (latest > 0.65 && !shimmer) {
      setShimmer(true);
      setTimeout(() => setShimmer(false), 1500);
    }
  });

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#080810] text-white overflow-clip">
      
      {/* Using cqw (Container Query Width) handles infinite scaling perfectly. 
        It ties all visual dimensions directly to the laptop's real-time width.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        .mac-key {
          background: linear-gradient(175deg, #454545 0%, #323232 60%, #2a2a2a 100%);
          box-shadow: 0 0.2cqw 0 #0d0d0d, 0 0.2cqw 0.3cqw rgba(0,0,0,.6), inset 0 0.1cqw 0 rgba(255,255,255,.13), inset 0 0 0 0.05cqw rgba(255,255,255,.06);
          position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 0.3cqw;
        }
        .mac-key::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,.04) 0%, transparent 70%);
          border-radius: inherit; pointer-events: none;
        }
        .mac-key span {
          font-size: 0.55cqw; color: rgba(255,255,255,.55); font-weight: 500; letter-spacing: .01em; user-select: none; line-height: 1; text-align: center; font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}} />

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-[1400px]">
        
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,.6) 0%, transparent 100%),
              radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,.4) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 50% 60%, rgba(255,255,255,.5) 0%, transparent 100%),
              radial-gradient(1px 1px at 10% 80%, rgba(255,255,255,.3) 0%, transparent 100%),
              radial-gradient(1px 1px at 90% 70%, rgba(255,255,255,.4) 0%, transparent 100%)
            `
          }}
        />

        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,1) 0%, transparent 70%)', opacity: glowOpacity }}
        />

        <motion.div 
          className="absolute top-[10%] text-center z-20 w-full px-4"
          style={{ opacity: headerOpacity, y: headerTranslateY }}
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/60 tracking-wider mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_#2563eb]" />
            NEXIACORE CLOUD POS
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
            Your retail empire,<br />beautifully managed.
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/40 tracking-wide">
            Scroll to open the dashboard
          </p>
        </motion.div>

        <div className="w-full flex justify-center items-center mt-20" style={{ perspective: '1400px', perspectiveOrigin: '50% 40%' }}>
          {/* Main Laptop Wrapper with Container Query */}
          <motion.div 
            className="relative w-[min(900px,88vw)]"
            style={{ 
              transformStyle: 'preserve-3d',
              scale,
              y: translateY,
              rotateX,
              containerType: 'inline-size' // Establishes cqw bounds
            }}
          >
            {/* --- LAPTOP LID --- */}
            <motion.div className="relative w-full aspect-[16/10] origin-bottom" style={{ transformStyle: 'preserve-3d', rotateX: lidAngle }}>
              
              <div 
                className="absolute inset-0 rounded-t-[2cqw]"
                style={{
                  background: 'linear-gradient(160deg,#c8c9cc 0%,#a8a9ac 40%,#989a9d 70%,#a0a2a5 100%)',
                  boxShadow: 'inset 0 0.1cqw 0 rgba(255,255,255,.6), inset 0 -0.1cqw 0 rgba(0,0,0,.2), 0 -0.6cqw 2cqw rgba(0,0,0,.5)'
                }}
              />
              
              <div 
                className="absolute top-[1cqw] left-[1cqw] right-[1cqw] bottom-0 bg-[#0a0a0e] rounded-t-[1.1cqw] overflow-hidden"
                style={{ boxShadow: 'inset 0 0 0 0.1cqw rgba(255,255,255,.06), inset 0 0.2cqw 0.8cqw rgba(0,0,0,.8)' }}
              >
                <div className="absolute top-[0.8cqw] left-1/2 -translate-x-1/2 w-[0.6cqw] h-[0.6cqw] rounded-full bg-[#1a1a1f] border border-[#333] z-10 flex items-center justify-center">
                  <div className="w-[0.2cqw] h-[0.2cqw] rounded-full bg-blue-500/60" />
                </div>

                {/* SaaS Screen Frame */}
                <div 
                  className="absolute top-[2cqw] left-0 right-0 bottom-0 bg-slate-950 overflow-hidden flex justify-center"
                  onMouseEnter={() => setIsScreenHovered(true)}
                  onMouseLeave={() => setIsScreenHovered(false)}
                >
                  {/* PRO SCALER: We lock the UI to exactly 800x485 pixels. 
                    Then scale it via CSS purely based on the available container width (98cqw).
                    This guarantees it NEVER squashes or breaks.
                  */}
                  <div 
                    className="w-[800px] h-[485px] origin-top-left flex flex-col shrink-0"
                    style={{ transform: 'scale(calc(98cqw / 800))' }}
                  >
                    {/* MacOS Title Bar */}
                    <div className="h-8 bg-slate-900 border-b border-white/5 flex items-center px-4 gap-2 shrink-0 relative z-20">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/90" />
                        <div className="w-3 h-3 rounded-full bg-amber-400/90" />
                        <div className="w-3 h-3 rounded-full bg-green-500/90" />
                      </div>
                      <span className="absolute left-1/2 -translate-x-1/2 text-xs text-slate-500 font-medium tracking-wide">
                        app.nexiacore.shop - Cloud POS
                      </span>
                    </div>

                    {/* Tab Bar */}
                    <div className="bg-slate-900 border-b border-white/5 px-4 py-3 flex items-center justify-center z-20 shrink-0 h-14">
                      <div className="flex items-center gap-1 p-1 bg-slate-950/50 rounded-full border border-white/5">
                        {TABS.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                              activeTab === tab.id
                                ? 'bg-blue-600 text-white shadow-[0_2px_8px_rgba(37,99,235,0.4)]'
                                : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                          >
                            {tab.icon}
                            <span>{tab.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Views Area */}
                    <div className="flex-1 relative w-full bg-slate-950 overflow-hidden">
                      <ViewWrapper active={activeTab === 'dashboard'}><DashboardDarkView /></ViewWrapper>
                      <ViewWrapper active={activeTab === 'pos'}><POSDarkView /></ViewWrapper>
                      <ViewWrapper active={activeTab === 'inventory'}><InventoryDarkView /></ViewWrapper>
                      <ViewWrapper active={activeTab === 'coverage'}><CoverageDarkView /></ViewWrapper>
                    </div>

                    {/* Screen Shimmer */}
                    <motion.div 
                      className="absolute inset-0 z-50 pointer-events-none"
                      initial={{ x: '-100%', opacity: 0 }}
                      animate={shimmer ? { x: '100%', opacity: 1 } : { x: '-100%', opacity: 0 }}
                      transition={{ duration: 1, ease: 'easeInOut' }}
                      style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)' }}
                    />
                  </div>
                </div>
              </div>

              <div 
                className="absolute bottom-0 left-0 right-0 h-[0.5cqw] rounded-none"
                style={{ background: 'linear-gradient(to right,#888,#aaa,#888)' }}
              />

              <motion.div 
                className="absolute -bottom-[2cqw] left-[5%] right-[5%] h-[6cqw] blur-[1.2cqw] -z-10 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.2) 0%, transparent 70%)', opacity: screenReflectionOpacity }}
              />
            </motion.div>

            {/* --- LAPTOP BASE --- */}
            <div className="relative w-full">
              <div 
                className="w-full h-[0.6cqw] shadow-[0_0.1cqw_0.3cqw_rgba(0,0,0,0.6)]"
                style={{ background: 'linear-gradient(to bottom,#8a8b8e,#aaabae,#8a8b8e)' }}
              />
              <div 
                className="rounded-b-[1.5cqw] p-[1.5cqw] pb-[2cqw] relative"
                style={{ 
                  background: 'linear-gradient(180deg,#b0b2b5 0%,#a8aaad 50%,#a0a2a5 100%)',
                  boxShadow: '0 1.2cqw 4cqw rgba(0,0,0,.7), 0 0.2cqw 0 rgba(255,255,255,.15) inset, 0 -0.2cqw 0 rgba(0,0,0,.2) inset'
                }}
              >
                <div className="flex justify-between mb-[1cqw]">
                  <div className="w-[22%] h-[0.4cqw] rounded-[0.2cqw]" style={{ background: 'repeating-linear-gradient(90deg, rgba(0,0,0,.3) 0, rgba(0,0,0,.3) 0.2cqw, transparent 0.2cqw, transparent 0.5cqw)' }} />
                  <div className="w-[22%] h-[0.4cqw] rounded-[0.2cqw]" style={{ background: 'repeating-linear-gradient(90deg, rgba(0,0,0,.3) 0, rgba(0,0,0,.3) 0.2cqw, transparent 0.2cqw, transparent 0.5cqw)' }} />
                </div>

                {/* Keyboard Grid - Strict Percentages and Aspect Ratio */}
                <div 
                  className="w-full aspect-[2.65] rounded-[0.5cqw] p-[0.6cqw] flex flex-col justify-between"
                  style={{ 
                    background: 'linear-gradient(180deg,#1e1e1e 0%,#181818 100%)',
                    boxShadow: 'inset 0 0.2cqw 0.8cqw rgba(0,0,0,.8),0 0.1cqw 0 rgba(255,255,255,.08)'
                  }}
                >
                  <div className="flex gap-[0.3cqw] items-stretch h-[12%]">
                    <div className="mac-key" style={{ flex: 1 }}><span style={{ fontSize: '0.45cqw' }}>esc</span></div>
                    {['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'].map((key, i) => (
                      <div key={key} className="mac-key" style={{ flex: 0.8, marginLeft: [4, 8].includes(i) ? '0.3cqw' : '0' }}><span style={{ fontSize: '0.45cqw' }}>{key}</span></div>
                    ))}
                    <div className="mac-key" style={{ flex: 1, marginLeft: '0.3cqw', background: 'linear-gradient(175deg,#3a3a3a 0%,#2a2a2a 100%)' }}>
                      <div className="w-[0.8cqw] h-[0.8cqw] rounded-full border border-white/20 shadow-[inset_0_0_0.3cqw_rgba(0,0,0,0.5)] absolute" />
                    </div>
                  </div>

                  <div className="flex gap-[0.3cqw] items-stretch h-[16.5%]">
                    {['`','1','2','3','4','5','6','7','8','9','0','-','='].map(key => (
                      <div key={key} className="mac-key" style={{ flex: 1 }}><span>{key}</span></div>
                    ))}
                    <div className="mac-key" style={{ flex: 1.8 }}><span>delete</span></div>
                  </div>

                  <div className="flex gap-[0.3cqw] items-stretch h-[16.5%]">
                    <div className="mac-key" style={{ flex: 1.5 }}><span>tab</span></div>
                    {['Q','W','E','R','T','Y','U','I','O','P','[',']','\\'].map(key => (
                      <div key={key} className="mac-key" style={{ flex: 1 }}><span>{key}</span></div>
                    ))}
                  </div>

                  <div className="flex gap-[0.3cqw] items-stretch h-[16.5%]">
                    <div className="mac-key" style={{ flex: 1.8 }}><span>caps</span></div>
                    {['A','S','D','F','G','H','J','K','L',';',"'"].map(key => (
                      <div key={key} className="mac-key" style={{ flex: 1 }}><span>{key}</span></div>
                    ))}
                    <div className="mac-key" style={{ flex: 2.2 }}><span>return</span></div>
                  </div>

                  <div className="flex gap-[0.3cqw] items-stretch h-[16.5%]">
                    <div className="mac-key" style={{ flex: 2.3 }}><span>shift</span></div>
                    {['Z','X','C','V','B','N','M',',','.','/'].map(key => (
                      <div key={key} className="mac-key" style={{ flex: 1 }}><span>{key}</span></div>
                    ))}
                    <div className="mac-key" style={{ flex: 2.3 }}><span>shift</span></div>
                  </div>

                  <div className="flex gap-[0.3cqw] items-stretch h-[16.5%]">
                    <div className="mac-key" style={{ flex: 1.1 }}><span>fn</span></div>
                    <div className="mac-key" style={{ flex: 1.1 }}><span>control</span></div>
                    <div className="mac-key" style={{ flex: 1.1 }}><span>option</span></div>
                    <div className="mac-key" style={{ flex: 1.5 }}><span>command</span></div>
                    <div className="mac-key" style={{ flex: 5 }} />
                    <div className="mac-key" style={{ flex: 1.5 }}><span>command</span></div>
                    <div className="mac-key" style={{ flex: 1.1 }}><span>option</span></div>
                    <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '0.3cqw' }}>
                      <div className="mac-key flex-1" style={{ borderRadius: '0.2cqw' }}><span style={{ fontSize: '0.4cqw' }}>▲</span></div>
                      <div className="flex gap-[0.3cqw] flex-1">
                        <div className="mac-key flex-1" style={{ borderRadius: '0.2cqw' }}><span style={{ fontSize: '0.4cqw' }}>◀</span></div>
                        <div className="mac-key flex-1" style={{ borderRadius: '0.2cqw' }}><span style={{ fontSize: '0.4cqw' }}>▼</span></div>
                        <div className="mac-key flex-1" style={{ borderRadius: '0.2cqw' }}><span style={{ fontSize: '0.4cqw' }}>▶</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-[1cqw]">
                  <div 
                    className="w-[38%] aspect-[16/9] rounded-[0.5cqw]"
                    style={{ 
                      background: 'linear-gradient(145deg,#999a9d,#8a8b8e)',
                      boxShadow: 'inset 0 0.1cqw 0.3cqw rgba(0,0,0,.3),0 0.1cqw 0 rgba(255,255,255,.12)'
                    }}
                  />
                </div>
                <div className="absolute right-[1.5cqw] bottom-[1cqw] w-[0.6cqw] h-[0.6cqw] rounded-full bg-green-500 shadow-[0_0_0.6cqw_#22c55e] opacity-70" />
              </div>
            </div>

            <div 
              className="absolute -bottom-[4cqw] left-[10%] right-[10%] h-[4cqw] rounded-full blur-md pointer-events-none"
              style={{ background: 'linear-gradient(to bottom,rgba(160,162,165,.06),transparent)' }}
            />
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-[5%] flex flex-col items-center gap-2"
          style={{ opacity: scrollHintOpacity }}
        >
          <span className="text-[11px] tracking-[0.12em] text-white/30 uppercase font-medium">Scroll</span>
          <motion.div 
            className="w-[1px] h-9 origin-top"
            style={{ background: 'linear-gradient(to bottom,rgba(255,255,255,.3),transparent)' }}
            animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.8, 1, 0.8] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>

      </div>
    </div>
  );
}

// --- VIEW COMPONENTS (Locked 800x485 fixed sizing for pure scale behavior) ---

function ViewWrapper({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <div
      className={`absolute inset-0 transition-all duration-500 ease-in-out flex flex-col w-full h-full bg-slate-950 ${
        active ? 'opacity-100 blur-0 pointer-events-auto scale-100' : 'opacity-0 blur-md pointer-events-none scale-[0.98]'
      }`}
    >
      {children}
    </div>
  );
}

function DashboardDarkView() {
  return (
    <div className="p-6 flex flex-col h-full gap-4 bg-slate-950 text-slate-200">
      <div className="flex justify-between items-end border-b border-white/10 pb-3">
        <div>
          <h3 className="text-xl font-black text-white tracking-tight">Dashboard Overview</h3>
          <p className="text-xs font-bold text-slate-500 mt-1">Colombo Branch Performance</p>
        </div>
        <div className="bg-slate-900 border border-white/10 px-4 py-1.5 rounded-lg text-xs font-bold text-slate-400">
          Today
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="bg-slate-900 p-4 rounded-xl border border-white/5 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            Total Sales
          </div>
          <div className="text-2xl font-black text-white tracking-tight">Rs. 125,430</div>
        </div>
        <div className="bg-slate-900 p-4 rounded-xl border border-white/5 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Orders
          </div>
          <div className="text-2xl font-black text-white tracking-tight">320</div>
        </div>
      </div>
      <div className="flex-1 bg-slate-900 rounded-xl border border-white/5 p-4 flex flex-col min-h-0 mt-2">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Hourly Revenue Trend</div>
        <div className="flex-1 flex items-end gap-2 min-h-0">
          {[20, 45, 30, 80, 50, 100, 60, 40].map((height, i) => (
            <div key={i} className="flex-1 bg-slate-800/50 rounded-t-md h-full flex items-end overflow-hidden group">
              <div 
                className={`w-full rounded-t-md transition-colors duration-300 ${height === 100 ? 'bg-blue-500' : 'bg-blue-500/40 group-hover:bg-blue-400'}`}
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function POSDarkView() {
  const items = [
    { name: 'Munchee Cracker', price: '250' },
    { name: 'Siddhalepa 50g', price: '150' },
    { name: 'Anchor 400g', price: '1,150' },
    { name: 'Sunsilk Black', price: '480' },
    { name: 'Lifebuoy Soap', price: '120' },
    { name: 'Sustagen 400g', price: '2,400' },
  ];

  return (
    <div className="flex h-full w-full bg-slate-950 text-slate-200">
      <div className="flex-[3] p-5 flex flex-col gap-4 border-r border-white/5">
        <div className="flex gap-2">
          {['All Categories', 'Grocery', 'Pharmacy', 'Bakery'].map((cat, i) => (
            <div key={i} className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer border transition-colors ${i === 0 ? 'bg-slate-800 text-white border-slate-700 shadow-sm' : 'bg-transparent text-slate-500 border-white/5 hover:border-white/20'}`}>
              {cat}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 mt-2 overflow-y-auto pr-2">
          {items.map((item, i) => (
            <div key={i} className="bg-slate-900 p-3 rounded-xl border border-white/5 shadow-sm cursor-pointer hover:border-blue-500/50 transition-colors">
              <div className="w-full h-14 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-600 mb-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
              </div>
              <div className="text-xs font-bold text-slate-200 leading-tight truncate">{item.name}</div>
              <div className="text-sm font-black text-blue-400 mt-1">Rs. {item.price}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-[2] bg-slate-900/50 flex flex-col">
        <div className="p-4 border-b border-white/5 bg-slate-900/80 text-xs font-bold text-slate-400">
          Current Order (3 Items)
        </div>
        <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
          <div className="flex justify-between items-center pb-3 border-b border-dashed border-white/10">
            <div>
              <div className="text-sm font-bold text-white">Munchee Cracker</div>
              <div className="text-xs text-slate-500 mt-0.5">2 x Rs.250</div>
            </div>
            <div className="text-sm font-black text-white">Rs. 500</div>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-dashed border-white/10">
            <div>
              <div className="text-sm font-bold text-white">Anchor 400g</div>
              <div className="text-xs text-slate-500 mt-0.5">1 x Rs.1,150</div>
            </div>
            <div className="text-sm font-black text-white">Rs. 1,150</div>
          </div>
        </div>
        <div className="p-5 bg-slate-900 border-t border-white/5">
          <div className="flex justify-between items-center text-sm font-bold text-slate-400 mb-4">
            <span>Total Payable</span>
            <span className="text-2xl font-black text-white">Rs. 1,650</span>
          </div>
          <button className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
            Complete Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

function InventoryDarkView() {
  const invData = [
    { name: 'Maggi Coconut Milk Powder', code: '847192', price: '450', stock: 128, color: 'green', width: '85%' },
    { name: 'Anchor Butter 200g', code: '479102', price: '950', stock: 34, color: 'amber', width: '23%' },
    { name: 'Prima Noodles Pack', code: '931245', price: '180', stock: 0, color: 'red', width: '0%' },
    { name: 'Sunsilk Black Shampoo', code: '112948', price: '480', stock: 450, color: 'green', width: '100%' },
  ];

  return (
    <div className="h-full w-full bg-slate-950 flex flex-col text-slate-200">
      <div className="px-6 py-4 flex justify-between items-center border-b border-white/5 bg-slate-900">
        <div>
          <div className="text-xl font-black text-white tracking-tight">Inventory Management</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Real-time Stock & GRN Tracking</div>
        </div>
        <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-[0_4px_12px_rgba(37,99,235,0.3)] cursor-pointer hover:bg-blue-500 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add Product
        </div>
      </div>
      <div className="flex px-6 py-3 border-b border-white/5 text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-950">
        <div className="flex-[2]">Product Details</div>
        <div className="flex-1">Selling Price</div>
        <div className="flex-1">Current Stock</div>
      </div>
      <div className="flex flex-col overflow-y-auto">
        {invData.map((row, i) => (
          <div key={i} className="flex items-center px-6 py-4 border-b border-white/5 hover:bg-slate-900/50 transition-colors">
            <div className="flex-[2] flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center text-slate-500 shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-200">{row.name}</div>
                <div className="text-xs text-slate-500 font-mono tracking-wide mt-0.5">▐ {row.code}</div>
              </div>
            </div>
            <div className="flex-1 text-sm font-black text-white">Rs.{row.price}</div>
            <div className="flex-1">
              <div className={`text-xs font-black mb-1.5 ${row.color === 'green' ? 'text-green-400' : row.color === 'amber' ? 'text-amber-400' : 'text-red-400'}`}>
                {row.stock} Units Available
              </div>
              <div className="w-3/4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${row.color === 'green' ? 'bg-green-500' : row.color === 'amber' ? 'bg-amber-500' : 'bg-red-500'}`} 
                  style={{ width: row.width }} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoverageDarkView() {
  return (
    <div className="h-full w-full bg-slate-950 flex flex-col relative overflow-hidden">
      <div className="px-6 py-4 flex justify-between items-center border-b border-white/5 relative z-10 bg-slate-900">
        <div>
          <div className="text-xl font-black text-white tracking-tight">Island-Wide Server Network</div>
          <div className="text-xs text-slate-400 mt-1">Real-time sync across 9 Sri Lankan provinces</div>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-500/20">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          Live Nodes Active
        </div>
      </div>
      <div className="flex-1 flex relative min-h-0">
        <div className="w-[180px] border-r border-white/5 bg-slate-950/80 p-5 flex flex-col gap-6 relative z-10">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Active Tenants</div>
            <div className="text-3xl font-black text-white">1,500+</div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Data Latency</div>
            <div className="text-xl font-black text-emerald-400">&lt;50ms</div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
            Syncing Databases...
          </div>
        </div>
        
        <div className="flex-1 relative overflow-hidden bg-slate-950">
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(rgba(59,130,246,0.5) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(59,130,246,0.5) 0 1px, transparent 1px 100%)', backgroundSize: '20px 20px' }} 
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(37,99,235,0.1)_0%,transparent_70%)] pointer-events-none" />

          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 350 250">
            <path d="M140 20 L155 135 L140 215" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" fill="none">
              <animate attributeName="stroke-dashoffset" from="20" to="0" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M70 165 L155 135 L215 95" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" fill="none">
              <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2.5s" repeatCount="indefinite" />
            </path>
          </svg>

          {PROVINCES.map((r, i) => (
            <div key={i} className="absolute flex flex-col items-center pointer-events-none" style={{ left: r.x * 1.5, top: r.y * 1.5 }}>
              <div className="relative w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]">
                <span 
                  className="absolute top-1/2 left-1/2 w-full h-full rounded-full bg-blue-400/50 -translate-x-1/2 -translate-y-1/2 motion-safe:animate-ping"
                  style={{ animationDelay: `${i * 0.15}s` }} 
                />
              </div>
              <div className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest whitespace-nowrap">
                {r.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}