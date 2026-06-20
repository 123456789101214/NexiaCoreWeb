"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring,
  useMotionTemplate
} from "framer-motion";
import { 
  CreditCard, Package, TrendingUp, AlertCircle, ShoppingCart, 
  LayoutDashboard, Users, Receipt, Barcode, Plus, Globe, Activity,
  Lock, ChevronLeft, ChevronRight, Share
} from "lucide-react";

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={14} /> },
  { id: 'pos', label: 'POS System', icon: <ShoppingCart size={14} /> },
  { id: 'inventory', label: 'Inventory', icon: <Package size={14} /> },
  { id: 'reports', label: 'Reports', icon: <Package size={14} /> },
  { id: 'coverage', label: 'Coverage', icon: <Globe size={14} /> }
];

const MINI_REGIONS = [
  { name: "Northern", x: 140, y: 20 },
  { name: "North Central", x: 155, y: 65 },
  { name: "North Western", x: 90, y: 110 },
  { name: "Central", x: 155, y: 135 },
  { name: "Eastern", x: 230, y: 95 },
  { name: "Western", x: 70, y: 165 },
  { name: "Sabaragamuwa", x: 125, y: 180 },
  { name: "Uva", x: 200, y: 160 },
  { name: "Southern", x: 140, y: 215 },
];

// ━━━ BARBA.JS STYLE CINEMATIC TRANSITIONS ━━━
// Extracted out here to keep the JSX clean and fix TypeScript errors
const screenVariants = {
  initial: { opacity: 0, x: 30, scale: 0.98, filter: "blur(5px)" },
  animate: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, x: -30, scale: 0.98, filter: "blur(5px)" }
};

const screenTransition = { 
  duration: 0.8, 
  ease: [0.22, 1, 0.36, 1] as const // 'as const' completely fixes the VS Code TypeScript error
};

export default function HeroDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // ━━━ ACCESSIBILITY & DEVICE CHECKS ━━━
  useEffect(() => {
    setIsTouch(
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // ━━━ SMOOTH PARALLAX SCROLL LOGIC ━━━
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], 
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  const yTabs = useTransform(smoothProgress, [0, 1], [30, -30]);      
  const yBanner = useTransform(smoothProgress, [0, 1], [60, -60]);    
  const yMain = useTransform(smoothProgress, [0, 1], [90, -90]);      
  const yChip1 = useTransform(smoothProgress, [0, 1], [140, -140]);   
  const yChip2 = useTransform(smoothProgress, [0, 1], [170, -170]);   
  const yPayment = useTransform(smoothProgress, [0, 1], [220, -220]); 

  useEffect(() => {
    if (isHovered || isReducedMotion) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % TABS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, isReducedMotion]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center h-[450px] sm:h-[550px] md:h-[650px] z-10"
      onMouseEnter={() => !isTouch && setIsHovered(true)}
      onMouseLeave={() => !isTouch && setIsHovered(false)}
    >
      
      {/* ━━━ GLASSMORPHISM TAB MENU ━━━ */}
      <motion.div style={{ y: isReducedMotion ? 0 : yTabs }} className="absolute top-0 md:top-4 z-40 w-full flex justify-center pointer-events-none">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-1 sm:gap-2 p-1.5 bg-white/60 backdrop-blur-xl border border-black/[0.05] rounded-full shadow-sm pointer-events-auto"
        >
          {TABS.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-[12px] font-bold transition-all duration-300 ${
                activeTab === idx 
                  ? 'bg-blue-600 text-white shadow-md border border-blue-500' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* ━━━ SCALING WRAPPER (Mobile Responsiveness Fix) ━━━ */}
      <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[400px] mt-16 md:mt-20">
        
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[520px] h-[400px] scale-[0.62] sm:scale-[0.80] lg:scale-100 origin-top perspective-[2000px]">
          
          {/* ━━━ MAIN MULTI-VIEW PANEL (SAFARI MOCKUP) ━━━ */}
          <motion.div style={{ y: isReducedMotion ? 0 : yMain }} className="absolute inset-0 z-10 pointer-events-none">
            <motion.div 
              initial={{ rotateY: -12, rotateX: 5, z: -50, opacity: 0 }}
              animate={isReducedMotion ? 
                { rotateY: 0, rotateX: 0, z: 0, opacity: 1, y: 0 } : 
                { rotateY: -12, rotateX: 5, z: -50, opacity: 1, y: [0, -8, 0] }
              }
              transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 1 } }}
              className="absolute inset-0 bg-[#1C1C1E] rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border border-[#333336] overflow-hidden pointer-events-auto"
            >
              
              {/* ━━━ SAFARI HEADER ━━━ */}
              <div className="absolute top-0 left-0 w-full h-10 bg-[#2D2D2D] border-b border-black/40 flex items-center px-3 justify-between z-20">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ED6A5E] border border-black/10"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F4BF4F] border border-black/10"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#61C554] border border-black/10"></div>
                  </div>
                  <div className="hidden sm:flex gap-1.5 text-[#8E8E93]">
                    <ChevronLeft size={14} className="cursor-pointer hover:text-white transition-colors" />
                    <ChevronRight size={14} className="cursor-pointer hover:text-white transition-colors" />
                  </div>
                </div>

                <div className="flex-1 max-w-[180px] sm:max-w-[240px] h-6 bg-[#1C1C1E] rounded flex items-center justify-center gap-1.5 shadow-inner border border-white/5">
                  <Lock size={10} className="text-[#8E8E93]" />
                  <span className="text-[9px] font-medium text-[#8E8E93] tracking-wide">app.nexiacore.shop</span>
                </div>

                <div className="flex items-center gap-2 text-[#8E8E93]">
                  <Share size={12} className="hidden sm:block cursor-pointer hover:text-white transition-colors" />
                  <Plus size={14} className="cursor-pointer hover:text-white transition-colors" />
                </div>
              </div>

              {/* ━━━ SCREEN SLIDES ━━━ */}
              <AnimatePresence>
                
                {/* VIEW 1: DASHBOARD */}
                {activeTab === 0 && (
                  <motion.div 
                    key="dashboard"
                    variants={screenVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={screenTransition}
                    className="absolute inset-0 pt-10 pb-0 px-0"
                  >
                    <div className="relative w-full h-full bg-[#1C1C1E]">
                      <Image 
                        src="/images/hero-dashboard-1.png" 
                        alt="NexiaCore Dashboard"
                        fill
                        className="object-contain object-center" 
                        priority
                      />
                    </div>
                  </motion.div>
                )}

                {/* VIEW 2: POS SYSTEM */}
                {activeTab === 1 && (
                  <motion.div 
                    key="pos"
                    variants={screenVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={screenTransition}
                    className="absolute inset-0 pt-10 pb-0 px-0"
                  >
                    <div className="relative w-full h-full bg-[#1C1C1E]">
                      <Image 
                        src="/images/hero-dashboard-2.png" 
                        alt="NexiaCore POS System"
                        fill
                        className="object-contain object-center"
                        priority
                      />
                    </div>
                  </motion.div>
                )}

                {/* VIEW 3: INVENTORY */}
                {activeTab === 2 && (
                  <motion.div 
                    key="inventory"
                    variants={screenVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={screenTransition}
                    className="absolute inset-0 pt-10 pb-0 px-0"
                  >
                    <div className="relative w-full h-full bg-[#1C1C1E]">
                      <Image 
                        src="/images/hero-dashboard-3.png" 
                        alt="NexiaCore Inventory"
                        fill
                        className="object-contain object-center"
                        priority
                      />
                    </div>
                  </motion.div>
                )}

                {/* VIEW 4: REPORTS */}
                {activeTab === 3 && (
                  <motion.div 
                    key="reports"
                    variants={screenVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={screenTransition}
                    className="absolute inset-0 pt-10 pb-0 px-0"
                  >
                    <div className="relative w-full h-full bg-[#1C1C1E]">
                      <Image 
                        src="/images/hero-dashboard-4.png" 
                        alt="NexiaCore Reports"
                        fill
                        className="object-contain object-center"
                        priority
                      />
                    </div>
                  </motion.div>
                )}

                {/* VIEW 5: ISLAND-WIDE COVERAGE (RESTORED INTERACTIVE MAP VIEW) */}
                {activeTab === 4 && (
                  <motion.div 
                    key="coverage"
                    variants={screenVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={screenTransition}
                    className="absolute inset-0 pt-10 flex flex-col bg-slate-900 overflow-hidden"
                  >
                    {/* Restored Map Inner Header */}
                    <div className="px-4 py-2 flex justify-between items-center border-b border-slate-800 bg-slate-900/50 z-10">
                      <div>
                        <h2 className="text-[11px] font-black text-white tracking-tight">Island-Wide Network</h2>
                        <p className="text-slate-400 text-[8px] font-medium mt-0.5">Real-time sync across all 9 provinces</p>
                      </div>
                      <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md font-bold text-[8px] border border-emerald-500/30">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div> Live Nodes
                      </div>
                    </div>

                    <div className="flex-1 relative flex">
                      {/* Left Sidebar inside Safari Mockup */}
                      <div className="w-1/3 border-r border-slate-800 bg-slate-900/80 backdrop-blur-md z-10 flex flex-col p-3 gap-3">
                        <div>
                          <div className="text-[7px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Active Tenants</div>
                          <div className="text-sm font-black text-white">1,500+</div>
                        </div>
                        <div>
                          <div className="text-[7px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Data Latency</div>
                          <div className="text-xs font-bold text-emerald-400">{'< 50ms'}</div>
                        </div>
                        <div className="flex-1"></div>
                        <div className="flex items-center gap-1.5 text-[7px] text-slate-400">
                          <Activity size={10} className="text-blue-500" />
                          <span>Syncing isolated DBs...</span>
                        </div>
                      </div>

                      {/* Map View Area with 9 Provinces */}
                      <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-10">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
                        
                        {MINI_REGIONS.map((region, i) => (
                          <div key={region.name} className="absolute flex flex-col items-center" style={{ top: region.y - 12, left: region.x - 18 }}>
                            <div className="relative flex h-1.5 w-1.5">
                              <motion.span animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }} className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></motion.span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                            </div>
                            <span className="text-[6px] font-bold text-slate-300 mt-0.5 uppercase tracking-widest">{region.name}</span>
                          </div>
                        ))}

                        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 350 250">
                          <motion.path d="M 140 20 L 155 135 L 140 215" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, repeat: Infinity }} />
                          <motion.path d="M 70 165 L 155 135 L 230 95" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* ━━━ FLOATING ELEMENTS AROUND THE DASHBOARD ━━━ */}
          
          {/* Payment Card Wrapper */}
          <motion.div style={{ y: isReducedMotion ? 0 : yPayment }} className="absolute inset-0 z-20 pointer-events-none">
            <motion.div 
              initial={{ x: 80, y: 50, z: 80, opacity: 0 }}
              animate={{ x: 5, z: 80, opacity: 1, y: [240, 230, 240] }}
              transition={{ y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }, opacity: { duration: 0.8, delay: 0.6 } }}
              className="absolute w-[240px] bg-white rounded-[20px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 p-5 z-20 pointer-events-auto"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
                  <ShoppingCart size={14} className="text-slate-600" />
                </div>
                <div className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Secure
                </div>
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Amount</div>
              <div className="text-2xl font-black text-slate-800 tracking-tight mb-4">Rs. 2,850.00</div>
              
              <div className="h-10 rounded-xl bg-slate-900 flex items-center justify-between px-3 text-white shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2">
                  <CreditCard size={14} className="opacity-80"/>
                  <span className="text-[10px] font-mono tracking-widest opacity-80">•••• 4242</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/></svg>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Metrics Chip 1 Wrapper */}
          <motion.div style={{ y: isReducedMotion ? 0 : yChip1 }} className="absolute inset-0 z-30 pointer-events-none">
            <motion.div 
              animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1 -right-4 bg-white px-3 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2 pointer-events-auto"
            >
              <TrendingUp size={14} className="text-emerald-500" />
              <span className="text-[10px] font-bold text-slate-700"><span className="text-emerald-600">↑ 8.5%</span> vs yesterday</span>
            </motion.div>
          </motion.div>

          {/* Floating Metrics Chip 2 Wrapper */}
          <motion.div style={{ y: isReducedMotion ? 0 : yChip2 }} className="absolute inset-0 z-30 pointer-events-none">
            <motion.div 
              animate={{ y: [5, -5, 5] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-52 -left-12 bg-white px-3 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2 pointer-events-auto"
            >
              <AlertCircle size={14} className="text-red-500" />
              <span className="text-[10px] font-bold text-slate-700">96 Low Stock Items</span>
            </motion.div>
          </motion.div>

          {/* Trial Banner Wrapper */}
          <motion.div style={{ y: isReducedMotion ? 0 : yBanner }} className="absolute inset-0 z-30 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
              className="absolute -top-5 left-8 bg-amber-100 border border-amber-200 px-4 py-2 rounded-full shadow-sm flex items-center gap-2 cursor-pointer hover:bg-amber-200 transition-colors pointer-events-auto"
            >
              <span className="text-[10px] font-bold text-amber-800">⚡ Your trial ends in 14 days. Upgrade Now →</span>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}