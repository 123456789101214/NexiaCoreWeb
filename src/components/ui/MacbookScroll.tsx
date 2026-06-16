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

  // Screen-specific state
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

  // Auto-cycle tabs for the dashboard screen
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

  // Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    mass: 0.8,
  });

  // TS FIX: staticProgress eka MotionValue ekak widihata hadala pass karanna one.
  const staticProgress = useMotionValue(1);
  const progressToUse = prefersReduced ? staticProgress : smoothProgress;

  // Kinematics
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
      
      <style dangerouslySetInnerHTML={{__html: `
        .mac-key {
          background: linear-gradient(175deg, #454545 0%, #323232 60%, #2a2a2a 100%);
          box-shadow: 0 2px 0 #0d0d0d, 0 2px 3px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.13), inset 0 0 0 .5px rgba(255,255,255,.06);
          position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 3px;
        }
        .mac-key::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,.04) 0%, transparent 70%);
          border-radius: inherit; pointer-events: none;
        }
        .mac-key span {
          font-size: 4.5px; color: rgba(255,255,255,.55); font-weight: 500; letter-spacing: .01em; user-select: none; line-height: 1; text-align: center; font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .mac-key-fn { height: 14px; }
        .mac-key-fn span { font-size: 3.8px; }
      `}} />

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-[1400px]">
        
        {/* Stars Background Pattern */}
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

        {/* Ambient Glow */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,1) 0%, transparent 70%)',
            opacity: glowOpacity
          }}
        />

        {/* Header Content */}
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

        {/* 3D Scene Wrapper */}
        <div 
          className="w-full flex justify-center items-center mt-20"
          style={{ perspective: '1400px', perspectiveOrigin: '50% 40%' }}
        >
          <motion.div 
            className="relative w-[min(900px,88vw)]"
            style={{ 
              transformStyle: 'preserve-3d',
              scale,
              y: translateY,
              rotateX,
            }}
          >
            {/* --- LAPTOP LID --- */}
            <motion.div 
              className="relative w-full aspect-[16/10] origin-bottom"
              style={{ transformStyle: 'preserve-3d', rotateX: lidAngle }}
            >
              {/* Aluminium Outer Shell */}
              <div 
                className="absolute inset-0 rounded-t-[18px]"
                style={{
                  background: 'linear-gradient(160deg,#c8c9cc 0%,#a8a9ac 40%,#989a9d 70%,#a0a2a5 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6), inset 0 -1px 0 rgba(0,0,0,.2), 0 -6px 20px rgba(0,0,0,.5)'
                }}
              />
              
              {/* Bezel & Screen */}
              <div 
                className="absolute top-2 left-2 right-2 bottom-0 bg-[#0a0a0e] rounded-t-[10px] overflow-hidden"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.06), inset 0 2px 8px rgba(0,0,0,.8)' }}
              >
                {/* Webcam */}
                <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1a1a1f] border border-[#333] z-10 flex items-center justify-center">
                  <div className="w-[2px] h-[2px] rounded-full bg-blue-500/60" />
                </div>

                {/* Simulated Screen Content - Dark Theme SaaS */}
                <div 
                  className="absolute top-[18px] left-0 right-0 bottom-0 bg-slate-950 overflow-hidden flex flex-col"
                  onMouseEnter={() => setIsScreenHovered(true)}
                  onMouseLeave={() => setIsScreenHovered(false)}
                >
                  {/* MacOS Title Bar */}
                  <div className="h-7 bg-slate-900 border-b border-white/5 flex items-center px-3 gap-1.5 shrink-0 relative z-20">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/90" />
                      <div className="w-2 h-2 rounded-full bg-amber-400/90" />
                      <div className="w-2 h-2 rounded-full bg-green-500/90" />
                    </div>
                    <span className="absolute left-1/2 -translate-x-1/2 text-[9px] text-slate-500 font-medium tracking-wide">
                      app.nexiacore.shop - Cloud POS
                    </span>
                  </div>

                  {/* Dynamic Dark Theme Tab Bar */}
                  <div className="bg-slate-900 border-b border-white/5 px-4 py-2 flex items-center justify-center z-20">
                    <div className="flex items-center gap-1 p-1 bg-slate-950/50 rounded-full border border-white/5">
                      {TABS.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-300 ${
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

                  {/* Rendered Views Area */}
                  <div className="flex-1 relative w-full h-full bg-slate-950 overflow-hidden">
                    <ViewWrapper active={activeTab === 'dashboard'}><DashboardDarkView /></ViewWrapper>
                    <ViewWrapper active={activeTab === 'pos'}><POSDarkView /></ViewWrapper>
                    <ViewWrapper active={activeTab === 'inventory'}><InventoryDarkView /></ViewWrapper>
                    <ViewWrapper active={activeTab === 'coverage'}><CoverageDarkView /></ViewWrapper>
                  </div>

                  {/* Screen Shimmer Effect */}
                  <motion.div 
                    className="absolute inset-0 z-50 pointer-events-none"
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={shimmer ? { x: '100%', opacity: 1 } : { x: '-100%', opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)' }}
                  />
                </div>
              </div>

              {/* Hinge Notch Area */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 rounded-none"
                style={{ background: 'linear-gradient(to right,#888,#aaa,#888)' }}
              />

              {/* Dynamic Screen Reflection Glow */}
              <motion.div 
                className="absolute -bottom-5 left-[5%] right-[5%] h-[60px] blur-[12px] -z-10 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.2) 0%, transparent 70%)', opacity: screenReflectionOpacity }}
              />
            </motion.div>

            {/* --- LAPTOP BASE --- */}
            <div className="relative w-full">
              <div 
                className="w-full h-[5px] shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
                style={{ background: 'linear-gradient(to bottom,#8a8b8e,#aaabae,#8a8b8e)' }}
              />
              <div 
                className="rounded-b-[14px] p-3.5 pb-[18px] relative"
                style={{ 
                  background: 'linear-gradient(180deg,#b0b2b5 0%,#a8aaad 50%,#a0a2a5 100%)',
                  boxShadow: '0 12px 40px rgba(0,0,0,.7), 0 2px 0 rgba(255,255,255,.15) inset, 0 -2px 0 rgba(0,0,0,.2) inset'
                }}
              >
                <div className="flex justify-between mb-2">
                  <div className="w-[22%] h-1 rounded-[2px]" style={{ background: 'repeating-linear-gradient(90deg, rgba(0,0,0,.3) 0px,rgba(0,0,0,.3) 2px, transparent 2px,transparent 5px)' }} />
                  <div className="w-[22%] h-1 rounded-[2px]" style={{ background: 'repeating-linear-gradient(90deg, rgba(0,0,0,.3) 0px,rgba(0,0,0,.3) 2px, transparent 2px,transparent 5px)' }} />
                </div>

                {/* Keyboard Area */}
                <div 
                  className="w-full rounded-md p-1.5 flex flex-col gap-[2.5px]"
                  style={{ 
                    background: 'linear-gradient(180deg,#1e1e1e 0%,#181818 100%)',
                    boxShadow: 'inset 0 2px 8px rgba(0,0,0,.8),0 1px 0 rgba(255,255,255,.08)'
                  }}
                >
                  {/* Keyboard Rows */}
                  <div className="flex gap-[2.5px] items-stretch">
                    <div className="mac-key mac-key-fn" style={{ flex: 1 }}><span>esc</span></div>
                    {['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'].map((key, i) => (
                      <div key={key} className="mac-key mac-key-fn" style={{ flex: 0.8, marginLeft: [4, 8].includes(i) ? '3px' : '0' }}><span>{key}</span></div>
                    ))}
                    <div className="mac-key mac-key-fn" style={{ flex: 1, marginLeft: '3px', background: 'linear-gradient(175deg,#3a3a3a 0%,#2a2a2a 100%)' }}>
                      <div className="w-2 h-2 rounded-full border border-white/20 shadow-[inset_0_0_3px_rgba(0,0,0,0.5)] absolute" />
                    </div>
                  </div>
                  <div className="flex gap-[2.5px] h-[18px]">
                    {['`','1','2','3','4','5','6','7','8','9','0','-','='].map(key => (
                      <div key={key} className="mac-key flex-1"><span>{key}</span></div>
                    ))}
                    <div className="mac-key" style={{ flex: 1.8 }}><span>delete</span></div>
                  </div>
                  <div className="flex gap-[2.5px] h-[18px]">
                    <div className="mac-key" style={{ flex: 1.5 }}><span>tab</span></div>
                    {['Q','W','E','R','T','Y','U','I','O','P','[',']','\\'].map(key => (
                      <div key={key} className="mac-key flex-1"><span>{key}</span></div>
                    ))}
                  </div>
                  <div className="flex gap-[2.5px] h-[18px]">
                    <div className="mac-key" style={{ flex: 1.8 }}><span>caps</span></div>
                    {['A','S','D','F','G','H','J','K','L',';',"'"].map(key => (
                      <div key={key} className="mac-key flex-1"><span>{key}</span></div>
                    ))}
                    <div className="mac-key" style={{ flex: 2.2 }}><span>return</span></div>
                  </div>
                  <div className="flex gap-[2.5px] h-[18px]">
                    <div className="mac-key" style={{ flex: 2.3 }}><span>shift</span></div>
                    {['Z','X','C','V','B','N','M',',','.','/'].map(key => (
                      <div key={key} className="mac-key flex-1"><span>{key}</span></div>
                    ))}
                    <div className="mac-key" style={{ flex: 2.3 }}><span>shift</span></div>
                  </div>
                  <div className="flex gap-[2.5px] h-[18px]">
                    <div className="mac-key" style={{ flex: 1.1 }}><span>fn</span></div>
                    <div className="mac-key" style={{ flex: 1.1 }}><span>control</span></div>
                    <div className="mac-key" style={{ flex: 1.1 }}><span>option</span></div>
                    <div className="mac-key" style={{ flex: 1.5 }}><span>command</span></div>
                    <div className="mac-key" style={{ flex: 5 }} />
                    <div className="mac-key" style={{ flex: 1.5 }}><span>command</span></div>
                    <div className="mac-key" style={{ flex: 1.1 }}><span>option</span></div>
                    <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '2.5px' }}>
                      <div className="mac-key" style={{ height: '8px', borderRadius: '2px' }}><span style={{ fontSize: '4px' }}>▲</span></div>
                      <div style={{ display: 'flex', gap: '2.5px', height: '8px' }}>
                        <div className="mac-key flex-1" style={{ borderRadius: '2px' }}><span style={{ fontSize: '4px' }}>◀</span></div>
                        <div className="mac-key flex-1" style={{ borderRadius: '2px' }}><span style={{ fontSize: '4px' }}>▼</span></div>
                        <div className="mac-key flex-1" style={{ borderRadius: '2px' }}><span style={{ fontSize: '4px' }}>▶</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trackpad Container */}
                <div className="flex justify-center mt-2">
                  <div 
                    className="w-[38%] aspect-[16/9] rounded-md"
                    style={{ 
                      background: 'linear-gradient(145deg,#999a9d,#8a8b8e)',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,.3),0 1px 0 rgba(255,255,255,.12)'
                    }}
                  />
                </div>
                <div className="absolute right-[18px] bottom-[8px] w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e] opacity-70" />
              </div>
            </div>

            <div 
              className="absolute -bottom-10 left-[10%] right-[10%] h-10 rounded-full blur-md pointer-events-none"
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

// --- VIEW COMPONENTS ---

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
    <div className="p-4 md:p-5 flex flex-col h-full gap-3 bg-slate-950 text-slate-200">
      <div className="flex justify-between items-end border-b border-white/10 pb-2">
        <div>
          <h3 className="text-[14px] md:text-[17px] font-black text-white tracking-tight">Dashboard Overview</h3>
          <p className="text-[9px] md:text-[10px] font-bold text-slate-500 mt-0.5">Colombo Branch Performance</p>
        </div>
        <div className="bg-slate-900 border border-white/10 px-3 py-1 rounded-lg text-[9px] font-bold text-slate-400">
          Today
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-1">
        <div className="bg-slate-900 p-3 rounded-xl border border-white/5 shadow-sm">
          <div className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <svg className="w-3 h-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            Total Sales
          </div>
          <div className="text-lg md:text-xl font-black text-white tracking-tight">Rs. 125,430</div>
        </div>
        <div className="bg-slate-900 p-3 rounded-xl border border-white/5 shadow-sm">
          <div className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <svg className="w-3 h-3 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Orders
          </div>
          <div className="text-lg md:text-xl font-black text-white tracking-tight">320</div>
        </div>
      </div>
      <div className="flex-1 bg-slate-900 rounded-xl border border-white/5 p-3 flex flex-col min-h-0">
        <div className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Hourly Revenue Trend</div>
        <div className="flex-1 flex items-end gap-1.5 min-h-0">
          {[20, 45, 30, 80, 50, 100, 60, 40].map((height, i) => (
            <div key={i} className="flex-1 bg-slate-800/50 rounded-t-sm h-full flex items-end overflow-hidden group">
              <div 
                className={`w-full rounded-t-sm transition-colors duration-300 ${height === 100 ? 'bg-blue-500' : 'bg-blue-500/40 group-hover:bg-blue-400'}`}
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
  ];

  return (
    <div className="flex h-full w-full bg-slate-950 text-slate-200">
      <div className="flex-[3] p-3 flex flex-col gap-2.5 border-r border-white/5">
        <div className="flex gap-1.5">
          {['All', 'Grocery', 'Pharmacy'].map((cat, i) => (
            <div key={i} className={`px-2.5 py-1 rounded-md text-[8px] md:text-[9px] font-bold cursor-pointer border transition-colors ${i === 0 ? 'bg-slate-800 text-white border-slate-700 shadow-sm' : 'bg-transparent text-slate-500 border-white/5 hover:border-white/20'}`}>
              {cat}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1 overflow-y-auto pr-1">
          {items.map((item, i) => (
            <div key={i} className="bg-slate-900 p-2 rounded-xl border border-white/5 shadow-sm cursor-pointer hover:border-blue-500/50 transition-colors">
              <div className="w-full h-8 md:h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-600 mb-1.5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
              </div>
              <div className="text-[9px] md:text-[10px] font-bold text-slate-200 leading-tight truncate">{item.name}</div>
              <div className="text-[8px] md:text-[9px] font-black text-blue-400 mt-0.5">Rs. {item.price}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-[2] bg-slate-900/50 flex flex-col">
        <div className="p-2.5 border-b border-white/5 bg-slate-900/80 text-[9px] md:text-[10px] font-bold text-slate-400">
          Current Order (3)
        </div>
        <div className="flex-1 p-2.5 flex flex-col gap-2 overflow-y-auto">
          <div className="flex justify-between items-center pb-2 border-b border-dashed border-white/10">
            <div>
              <div className="text-[9px] md:text-[10px] font-bold text-white truncate max-w-[80px]">Munchee Cracker</div>
              <div className="text-[7px] md:text-[8px] text-slate-500">2 x Unit</div>
            </div>
            <div className="text-[9px] md:text-[10px] font-black text-white">Rs. 500</div>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-dashed border-white/10">
            <div>
              <div className="text-[9px] md:text-[10px] font-bold text-white truncate max-w-[80px]">Anchor 400g</div>
              <div className="text-[7px] md:text-[8px] text-slate-500">1 x Unit</div>
            </div>
            <div className="text-[9px] md:text-[10px] font-black text-white">Rs. 1,150</div>
          </div>
        </div>
        <div className="p-2.5 bg-slate-900 border-t border-white/5">
          <div className="flex justify-between items-center text-[9px] md:text-[10px] font-bold text-slate-400 mb-2">
            <span>Total</span>
            <span className="text-[13px] md:text-[15px] font-black text-white">Rs. 1,650</span>
          </div>
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-[10px] md:text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:bg-blue-500 transition-colors">
            <svg className="w-3 h-3 md:w-3.5 md:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

function InventoryDarkView() {
  const invData = [
    { name: 'Maggi Coconut Milk', code: '847192', price: '450', stock: 128, color: 'green', width: '85%' },
    { name: 'Anchor Butter 200g', code: '479102', price: '950', stock: 34, color: 'amber', width: '23%' },
    { name: 'Prima Noodles', code: '931245', price: '180', stock: 0, color: 'red', width: '0%' },
  ];

  return (
    <div className="h-full w-full bg-slate-950 flex flex-col text-slate-200">
      <div className="px-4 py-3 flex justify-between items-center border-b border-white/5 bg-slate-900">
        <div>
          <div className="text-[14px] md:text-[17px] font-black text-white tracking-tight">Inventory Data</div>
          <div className="text-[8px] md:text-[9px] text-slate-500 mt-0.5 font-medium">Stock & GRN Tracking</div>
        </div>
        <div className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 md:px-2.5 md:py-1.5 rounded-lg text-[8px] md:text-[9px] font-bold shadow-[0_2px_8px_rgba(37,99,235,0.3)] cursor-pointer hover:bg-blue-500 transition-colors">
          <svg className="w-2.5 h-2.5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add Item
        </div>
      </div>
      <div className="flex px-4 py-2 border-b border-white/5 text-[7px] md:text-[8px] font-bold text-slate-500 uppercase tracking-widest bg-slate-950">
        <div className="flex-[2]">Product</div>
        <div className="flex-1">Selling</div>
        <div className="flex-1">Stock</div>
      </div>
      <div className="flex flex-col overflow-y-auto">
        {invData.map((row, i) => (
          <div key={i} className="flex items-center px-4 py-2.5 border-b border-white/5 hover:bg-slate-900/50 transition-colors">
            <div className="flex-[2] flex items-center gap-2">
              <div className="w-6 h-6 md:w-7 md:h-7 bg-slate-900 border border-white/10 rounded-lg flex items-center justify-center text-slate-500 shrink-0">
                <svg className="w-3 h-3 md:w-3.5 md:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
              </div>
              <div>
                <div className="text-[9px] md:text-[10px] font-bold text-slate-200 truncate max-w-[100px]">{row.name}</div>
                <div className="text-[7px] md:text-[8px] text-slate-500 font-mono tracking-wide">▐ {row.code}</div>
              </div>
            </div>
            <div className="flex-1 text-[9px] md:text-[10px] font-black text-white">Rs.{row.price}</div>
            <div className="flex-1">
              <div className={`text-[8px] md:text-[9px] font-black mb-1 ${row.color === 'green' ? 'text-green-400' : row.color === 'amber' ? 'text-amber-400' : 'text-red-400'}`}>
                {row.stock} Units
              </div>
              <div className="w-10 h-1 bg-slate-800 rounded-full overflow-hidden">
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
      <div className="px-4 py-3 flex justify-between items-center border-b border-white/5 relative z-10 bg-slate-900">
        <div>
          <div className="text-[14px] md:text-[17px] font-black text-white tracking-tight">Island-Wide Network</div>
          <div className="text-[8px] md:text-[9px] text-slate-400 mt-0.5">Real-time sync across 9 provinces</div>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md text-[8px] md:text-[9px] font-bold border border-emerald-500/20">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Live Nodes
        </div>
      </div>
      <div className="flex-1 flex relative min-h-0">
        <div className="w-[100px] md:w-[110px] border-r border-white/5 bg-slate-950/80 p-3 flex flex-col gap-4 relative z-10">
          <div>
            <div className="text-[7px] md:text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Active Tenants</div>
            <div className="text-lg md:text-xl font-black text-white">1,500+</div>
          </div>
          <div>
            <div className="text-[7px] md:text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Data Latency</div>
            <div className="text-sm font-black text-emerald-400">&lt;50ms</div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 text-[7px] md:text-[8px] text-slate-400 font-medium">
            <svg className="w-3 h-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
            Syncing...
          </div>
        </div>
        
        {/* Map Area */}
        <div className="flex-1 relative overflow-hidden bg-slate-950">
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(rgba(59,130,246,0.5) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(59,130,246,0.5) 0 1px, transparent 1px 100%)', backgroundSize: '15px 15px' }} 
          />
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(37,99,235,0.1)_0%,transparent_70%)] pointer-events-none" />

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 350 250">
            <path d="M140 20 L155 135 L140 215" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" fill="none">
              <animate attributeName="stroke-dashoffset" from="20" to="0" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M70 165 L155 135 L215 95" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" fill="none">
              <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2.5s" repeatCount="indefinite" />
            </path>
          </svg>

          {/* Nodes */}
          {PROVINCES.map((r, i) => (
            <div key={i} className="absolute flex flex-col items-center pointer-events-none" style={{ left: r.x, top: r.y }}>
              <div className="relative w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                <span 
                  className="absolute top-1/2 left-1/2 w-full h-full rounded-full bg-blue-400/50 -translate-x-1/2 -translate-y-1/2 motion-safe:animate-ping"
                  style={{ animationDelay: `${i * 0.15}s` }} 
                />
              </div>
              <div className="text-[6px] md:text-[7px] font-bold text-slate-400 mt-1 uppercase tracking-widest whitespace-nowrap">
                {r.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}