"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue
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

const screenVariants = {
  initial: { opacity: 0, x: 30, scale: 0.98, filter: "blur(5px)" },
  animate: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, x: -30, scale: 0.98, filter: "blur(5px)" }
};

const screenTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as const
};

export default function HeroDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

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

  // CHANGED: Shifted isReducedMotion evaluation inside the output arrays to guarantee a stable MotionValue<number> return
  const yTabs = useTransform(smoothProgress, [0, 1], isReducedMotion ? [0, 0] : [30, -30]);
  const yBanner = useTransform(smoothProgress, [0, 1], isReducedMotion ? [0, 0] : [60, -60]);
  const yMain = useTransform(smoothProgress, [0, 1], isReducedMotion ? [0, 0] : [90, -90]);
  const yChip1 = useTransform(smoothProgress, [0, 1], isReducedMotion ? [0, 0] : [140, -140]);
  const yChip2 = useTransform(smoothProgress, [0, 1], isReducedMotion ? [0, 0] : [170, -170]);
  const yPayment = useTransform(smoothProgress, [0, 1], isReducedMotion ? [0, 0] : [220, -220]);

  // ━━━ PREMIUM 3D CARD HOVER ARCHITECTURE ━━━
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 160, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Compound Stage Rotations (Maps mouse position to 3D angles)
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-16, 16]);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [16, -16]);

  // Outward Z-Axis Explosion Springs (Triggers when mouse enters stage)
  const popZMain = useSpring(isHovered ? 25 : 0, springConfig);
  const popZBanner = useSpring(isHovered ? 60 : 0, springConfig);
  const popZChip1 = useSpring(isHovered ? 85 : 0, springConfig);
  const popZChip2 = useSpring(isHovered ? 95 : 0, springConfig);
  const popZPayment = useSpring(isHovered ? 130 : 0, springConfig);

  // Parallax multi-angle shift to enhance Z-depth perception
  const shiftXSubtle = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const shiftYSubtle = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);
  const shiftXStrong = useTransform(smoothMouseX, [-0.5, 0.5], [-28, 28]);
  const shiftYStrong = useTransform(smoothMouseY, [-0.5, 0.5], [-28, 28]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || isReducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

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
      className="relative w-full flex flex-col items-center justify-center h-[480px] sm:h-[580px] md:h-[680px] z-10"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* CHANGED: Glassmorphism Tab Menu upgraded to auto-adapt to Obsidian Glass in dark mode */}
      <motion.div style={{ y: yTabs }} className="absolute top-0 md:top-4 z-40 w-full flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-1 sm:gap-2 p-1.5 bg-bg-base/70  backdrop-blur-2xl border border-border-main rounded-full shadow-glass pointer-events-auto transition-all duration-400"
        >
          {TABS.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-[12px] font-bold transition-all duration-300 ${activeTab === idx
                ? 'bg-blue-primary text-white shadow-md shadow-blue-primary/20 dark:shadow-blue-primary/40 border border-blue-500/30'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-subtle/80 dark:hover:bg-white/5'
                }`}
            >
              {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* ━━━ UPGRADED RESPONSIVE STAGE (Fixed Tablet 768px Viewport Compression) ━━━ */}
      <div className="relative w-full h-[280px] sm:h-[380px] md:h-[460px] lg:h-[480px] mt-16 md:mt-20 flex justify-center">

        {/* CHANGED: md:scale-100 forces 100% true scale on Tablet screens */}
        <div className="absolute top-0 w-[520px] md:w-[580px] lg:w-[600px] h-[400px] scale-[0.65] sm:scale-[0.85] md:scale-100 origin-top perspective-[1400px]">

          {/* ━━━ 3D MASTER ROTATION WRAPPER ━━━ */}
          <motion.div
            style={{
              rotateX: isHovered ? rotateX : (isReducedMotion ? 0 : 5),
              rotateY: isHovered ? rotateY : (isReducedMotion ? 0 : -12),
              transformStyle: "preserve-3d"
            }}
            className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out pointer-events-none"
          >

            {/* CHANGED: Safari Browser Mockup converted to dynamic Dual-Theme with Neurom AI Cyber-Glow */}
            <motion.div style={{ y: yMain }} className="absolute inset-0 z-10 pointer-events-none group">
              <motion.div
                initial={{ rotateY: -12, rotateX: 5, z: -50, opacity: 0 }}
                animate={isReducedMotion ?
                  { rotateY: 0, rotateX: 0, z: 0, opacity: 1, y: 0 } :
                  { rotateY: -12, rotateX: 5, z: -50, opacity: 1, y: [0, -8, 0] }
                }
                transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 1 } }}
                className="absolute inset-0 bg-bg-base rounded-xl shadow-2xl border border-border-main dark:border-blue-primary/40 dark:shadow-[0_0_50px_-15px_rgba(37,99,235,0.35)] overflow-hidden pointer-events-auto transition-all duration-400"
              >

                {/* SAFARI HEADER */}
                <div className="absolute top-0 left-0 w-full h-10 bg-bg-subtle border-b border-border-main flex items-center px-3 justify-between z-20 transition-colors duration-400">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ED6A5E] border border-black/10 dark:border-transparent"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#F4BF4F] border border-black/10 dark:border-transparent"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#61C554] border border-black/10 dark:border-transparent"></div>
                    </div>
                    <div className="hidden sm:flex gap-1.5 text-text-muted">
                      <ChevronLeft size={14} className="cursor-pointer hover:text-text-primary transition-colors" />
                      <ChevronRight size={14} className="cursor-pointer hover:text-text-primary transition-colors" />
                    </div>
                  </div>

                  <div className="flex-1 max-w-[180px] sm:max-w-[240px] h-6 bg-bg-base rounded flex items-center justify-center gap-1.5 shadow-inner border border-border-subtle transition-colors duration-400">
                    <Lock size={10} className="text-blue-primary" />
                    <span className="text-[9px] font-medium text-text-secondary tracking-wide">app.nexiacore.shop</span>
                  </div>

                  <div className="flex items-center gap-2 text-text-muted">
                    <Share size={12} className="hidden sm:block cursor-pointer hover:text-text-primary transition-colors" />
                    <Plus size={14} className="cursor-pointer hover:text-text-primary transition-colors" />
                  </div>
                </div>

                {/* SCREEN SLIDES */}
                <AnimatePresence>
                  {activeTab === 0 && (
                    <motion.div key="dashboard" variants={screenVariants} initial="initial" animate="animate" exit="exit" transition={screenTransition} className="absolute inset-0 pt-10 pb-0 px-0">
                      <div className="relative w-full h-full bg-bg-base transition-colors duration-400">
                        <Image src="/images/hero-dashboard-1.png" alt="NexiaCore Dashboard" fill className="object-contain object-center" priority />
                      </div>
                    </motion.div>
                  )}
                  {activeTab === 1 && (
                    <motion.div key="pos" variants={screenVariants} initial="initial" animate="animate" exit="exit" transition={screenTransition} className="absolute inset-0 pt-10 pb-0 px-0">
                      <div className="relative w-full h-full bg-bg-base transition-colors duration-400">
                        <Image src="/images/hero-dashboard-2.png" alt="NexiaCore POS System" fill className="object-contain object-center" priority />
                      </div>
                    </motion.div>
                  )}
                  {activeTab === 2 && (
                    <motion.div key="inventory" variants={screenVariants} initial="initial" animate="animate" exit="exit" transition={screenTransition} className="absolute inset-0 pt-10 pb-0 px-0">
                      <div className="relative w-full h-full bg-bg-base transition-colors duration-400">
                        <Image src="/images/hero-dashboard-3.png" alt="NexiaCore Inventory" fill className="object-contain object-center" priority />
                      </div>
                    </motion.div>
                  )}
                  {activeTab === 3 && (
                    <motion.div key="reports" variants={screenVariants} initial="initial" animate="animate" exit="exit" transition={screenTransition} className="absolute inset-0 pt-10 pb-0 px-0">
                      <div className="relative w-full h-full bg-bg-base transition-colors duration-400">
                        <Image src="/images/hero-dashboard-4.png" alt="NexiaCore Reports" fill className="object-contain object-center" priority />
                      </div>
                    </motion.div>
                  )}

                  {/* CHANGED: Coverage Map upgraded to respect light/dark tokens */}
                  {activeTab === 4 && (
                    <motion.div
                      key="coverage"
                      variants={screenVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={screenTransition}
                      className="absolute inset-0 pt-10 flex flex-col bg-slate-900 overflow-hidden">
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

            {/* CHANGED: Floating elements converted to dynamic glass tokens */}

            {/* Payment Card Wrapper */}
            <motion.div style={{ y: isReducedMotion ? 0 : yPayment }} className="absolute inset-0 z-20 pointer-events-none">
              <motion.div
                initial={{ x: 80, y: 50, z: 80, opacity: 0 }}
                animate={{ x: 5, z: 80, opacity: 1, y: [240, 230, 240] }}
                transition={{ y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }, opacity: { duration: 0.8, delay: 0.6 } }}
                className="absolute w-[240px] bg-bg-base/90 backdrop-blur-2xl rounded-[20px] shadow-glass border border-border-main p-5 z-20 pointer-events-auto transition-all duration-400"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-8 h-8 rounded-full bg-bg-subtle flex items-center justify-center border border-border-subtle shadow-sm">
                    <ShoppingCart size={14} className="text-text-primary" />
                  </div>
                  <div className="text-[8px] font-bold text-success bg-success/10 px-2 py-1 rounded-full flex items-center gap-1 border border-success/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div> Secure
                  </div>
                </div>
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Total Amount</div>
                <div className="text-2xl font-black text-text-primary tracking-tight mb-4">Rs. 2,850.00</div>

                <div className="h-10 rounded-xl bg-bg-subtle dark:bg-[#0B101D] border border-border-main dark:border-blue-500/30 flex items-center justify-between px-3 text-text-primary dark:text-white shadow-sm transition-colors duration-400">
                  <div className="flex items-center gap-2">
                    <CreditCard size={14} className="text-blue-primary dark:text-blue-400 opacity-80" />
                    <span className="text-[10px] font-mono tracking-widest opacity-80">•••• 4242</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-primary dark:text-blue-400"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /></svg>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Metrics Chip 1 Wrapper */}
            <motion.div style={{ y: isReducedMotion ? 0 : yChip1 }} className="absolute inset-0 z-30 pointer-events-none">
              <motion.div
                animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1 -right-4 bg-bg-base/90 backdrop-blur-xl px-3 py-2 rounded-xl shadow-glass border border-border-main flex items-center gap-2 pointer-events-auto transition-all duration-400"
              >
                <TrendingUp size={14} className="text-success" />
                <span className="text-[10px] font-bold text-text-secondary"><span className="text-success">↑ 8.5%</span> vs yesterday</span>
              </motion.div>
            </motion.div>

            {/* Floating Metrics Chip 2 Wrapper */}
            <motion.div style={{ y: isReducedMotion ? 0 : yChip2 }} className="absolute inset-0 z-30 pointer-events-none">
              <motion.div
                animate={{ y: [5, -5, 5] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-52 -left-12 bg-bg-base/90 backdrop-blur-xl px-3 py-2 rounded-xl shadow-glass border border-border-main flex items-center gap-2 pointer-events-auto transition-all duration-400"
              >
                <AlertCircle size={14} className="text-red-500" />
                <span className="text-[10px] font-bold text-text-secondary">96 Low Stock Items</span>
              </motion.div>
            </motion.div>

            {/* Trial Banner Wrapper */}
            <motion.div style={{ y: isReducedMotion ? 0 : yBanner }} className="absolute inset-0 z-30 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                className="absolute -top-5 left-8 bg-amber-100 border border-amber-200 px-4 py-2 rounded-full shadow-sm flex items-center gap-2 cursor-pointer hover:bg-amber-200 transition-colors pointer-events-auto">
                <span className="text-[10px] font-bold text-amber-800">⚡ Your trial ends in 14 days. Upgrade Now →</span>
              </motion.div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}