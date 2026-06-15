// src/components/ui/SmoothHero.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
  MotionValue,
} from "framer-motion";
import {
  CreditCard,
  Package,
  TrendingUp,
  AlertCircle,
  ShoppingCart,
  LayoutDashboard,
  Receipt,
  Barcode,
  Plus,
  Globe,
  Activity,
  ArrowRight,
  MapPin,
  Database,
  WifiOff,
  Bell,
  BarChart,
  Store,
} from "lucide-react";

// --- CONSTANTS ---
const TABS = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={14} /> },
  { id: "pos", label: "POS System", icon: <ShoppingCart size={14} /> },
  { id: "inventory", label: "Inventory", icon: <Package size={14} /> },
  { id: "coverage", label: "Coverage", icon: <Globe size={14} /> },
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

const SECTION_HEIGHT = 1500;

export const SmoothHero = () => {
  // Respect user preferences
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div className="bg-slate-950 text-slate-50">
      <Nav />
      <Hero isReducedMotion={isReducedMotion} />
      <FeaturesSchedule />
    </div>
  );
};

// --- SUBCOMPONENTS ---

const Nav = () => {
  return (
    <nav className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 text-white">
      <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
        <Store className="text-blue-500" />
        NEXIA<span className="text-blue-500">CORE</span>
      </div>
      <button
        onClick={() => {
          document.getElementById("system-features")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
      >
        EXPLORE SYSTEM <ArrowRight size={14} />
      </button>
    </nav>
  );
};

const Hero = ({ isReducedMotion }: { isReducedMotion: boolean }) => {
  // We use useSpring to emulate Lenis smooth scrolling natively without npm packages
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      {/* Background Text Behind the Window */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 -z-10">
        <h1 className="text-[12vw] font-black text-slate-900 leading-none select-none tracking-tighter">
          NEXIACORE
        </h1>
      </div>

      <CenterReveal smoothY={smoothY} isReducedMotion={isReducedMotion} />
      <ParallaxWidgets smoothY={smoothY} isReducedMotion={isReducedMotion} />

      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-slate-950/0 to-slate-950 pointer-events-none z-40" />
    </div>
  );
};

const CenterReveal = ({
  smoothY,
  isReducedMotion,
}: {
  smoothY: MotionValue<number>;
  isReducedMotion: boolean;
}) => {
  // Expanding Clip Path Logic
  const clip1 = useTransform(smoothY, [0, 1500], [25, 0]);
  const clip2 = useTransform(smoothY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const opacity = useTransform(
    smoothY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full bg-slate-50 overflow-hidden shadow-2xl flex items-center justify-center"
      style={{
        clipPath: isReducedMotion ? "none" : clipPath,
        opacity,
      }}
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 via-slate-50 to-teal-50/30" />

      {/* Embedded Dashboard Multi-View */}
      <DashboardCore smoothY={smoothY} isReducedMotion={isReducedMotion} />
    </motion.div>
  );
};

const DashboardCore = ({
  smoothY,
  isReducedMotion,
}: {
  smoothY: MotionValue<number>;
  isReducedMotion: boolean;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  }, []);

  useEffect(() => {
    if (isHovered || isReducedMotion) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % TABS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, isReducedMotion]);

  // Parallax based on global smooth scroll to ensure movement within the sticky container
  const yTabs = useTransform(smoothY, [0, SECTION_HEIGHT], [0, -60]);
  const yMain = useTransform(smoothY, [0, SECTION_HEIGHT], [0, -20]);

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center h-full z-10"
      onMouseEnter={() => !isTouch && setIsHovered(true)}
      onMouseLeave={() => !isTouch && setIsHovered(false)}
    >
      {/* --- GLASSMORPHISM TAB MENU --- */}
      <motion.div
        style={{ y: isReducedMotion ? 0 : yTabs }}
        className="absolute top-12 md:top-24 z-40 w-full flex justify-center pointer-events-none"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-1 sm:gap-2 p-1.5 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-full shadow-sm pointer-events-auto"
        >
          {TABS.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-[12px] font-bold transition-all duration-300 ${
                activeTab === idx
                  ? "bg-blue-600 text-white shadow-md border border-blue-500"
                  : "text-slate-500 hover:text-slate-900 hover:bg-white/80"
              }`}
            >
              {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* --- MAIN MULTI-VIEW PANEL --- */}
      <div className="relative w-[320px] sm:w-[520px] h-[400px] scale-[0.80] sm:scale-100 origin-center perspective-[2000px] mt-16 md:mt-20">
        <motion.div
          style={{ y: isReducedMotion ? 0 : yMain }}
          className="absolute inset-0 z-10 pointer-events-none"
        >
          <motion.div
            initial={{ rotateY: -12, rotateX: 5, z: -50, opacity: 0 }}
            animate={
              isReducedMotion
                ? { rotateY: 0, rotateX: 0, z: 0, opacity: 1, y: 0 }
                : {
                    rotateY: -12,
                    rotateX: 5,
                    z: -50,
                    opacity: 1,
                    y: [0, -8, 0],
                  }
            }
            transition={{
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 1 },
            }}
            className="absolute inset-0 bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden flex flex-col pointer-events-auto"
          >
            {/* WINDOW CONTROLS */}
            <div className="absolute top-3 left-4 flex gap-1.5 z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
            </div>

            <AnimatePresence mode="wait">
              {/* VIEW 1: DASHBOARD */}
              {activeTab === 0 && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full pt-10 px-5 pb-5 bg-slate-50/50 flex flex-col gap-3"
                >
                  <div className="flex justify-between items-end border-b border-slate-200 pb-3">
                    <div>
                      <h2 className="text-lg font-black text-slate-800 tracking-tight">
                        Dashboard Overview
                      </h2>
                      <p className="text-slate-500 text-[10px] font-medium">
                        Colombo Branch Performance
                      </p>
                    </div>
                    <div className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-[10px] font-bold text-slate-600 shadow-sm">
                      Today
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="p-3 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col justify-center">
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <TrendingUp size={12} className="text-blue-500" /> Total
                        Sales
                      </div>
                      <div className="text-xl font-black text-slate-800 tracking-tight">
                        Rs. 125,430
                      </div>
                    </div>
                    <div className="p-3 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col justify-center">
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Receipt size={12} className="text-emerald-500" />{" "}
                        Orders
                      </div>
                      <div className="text-xl font-black text-slate-800 tracking-tight">
                        320
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 bg-white rounded-xl border border-slate-100 shadow-sm p-3 flex flex-col mt-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Hourly Revenue Trend
                    </div>
                    <div className="flex-1 flex items-end justify-between gap-1.5">
                      {[20, 45, 30, 80, 50, 100, 60, 40].map((h, i) => (
                        <div
                          key={i}
                          className="w-full bg-blue-50 rounded-t-sm relative group overflow-hidden"
                          style={{ height: "100%" }}
                        >
                          <div
                            className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-500 ${
                              i === 5
                                ? "bg-blue-600"
                                : "bg-blue-300 group-hover:bg-blue-400"
                            }`}
                            style={{ height: `${h}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VIEW 2: POS SYSTEM */}
              {activeTab === 1 && (
                <motion.div
                  key="pos"
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full pt-10 flex bg-slate-50/50"
                >
                  <div className="flex-[3] p-4 flex flex-col gap-3 border-r border-slate-100">
                    <div className="flex gap-2">
                      {["All", "Grocery", "Pharmacy"].map((cat, i) => (
                        <div
                          key={i}
                          className={`px-2 py-1 rounded-md text-[9px] font-bold cursor-pointer ${
                            i === 0
                              ? "bg-slate-800 text-white shadow-sm"
                              : "bg-white border border-slate-200 text-slate-500"
                          }`}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 overflow-hidden">
                      {[
                        { n: "Munchee Cracker", p: "250" },
                        { n: "Siddhalepa 50g", p: "150" },
                        { n: "Anchor 400g", p: "1,150" },
                        { n: "Sunsilk Black", p: "480" },
                      ].map((p, i) => (
                        <div
                          key={i}
                          className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-1.5 hover:border-blue-300 cursor-pointer"
                        >
                          <div className="w-full h-12 bg-slate-50 rounded-lg flex items-center justify-center text-slate-300">
                            <Package size={16} />
                          </div>
                          <div>
                            <div className="text-[10px] font-bold text-slate-800 leading-tight truncate">
                              {p.n}
                            </div>
                            <div className="text-[9px] font-black text-blue-600 mt-0.5">
                              Rs. {p.p}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-[2] bg-white flex flex-col">
                    <div className="p-3 border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-500">
                      Current Order (3)
                    </div>
                    <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-hidden">
                      {[
                        { n: "Munchee Cracker", q: 2, p: "500" },
                        { n: "Anchor 400g", q: 1, p: "1,150" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center pb-2 border-b border-slate-50 border-dashed"
                        >
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-800 truncate max-w-[80px]">
                              {item.n}
                            </span>
                            <span className="text-[8px] text-slate-400">
                              {item.q} x Unit
                            </span>
                          </div>
                          <span className="text-[10px] font-black text-slate-800">
                            Rs. {item.p}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-slate-50/50 border-t border-slate-100 flex flex-col gap-2">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500">
                        <span>Total</span>{" "}
                        <span className="text-[14px] font-black text-slate-800">
                          Rs. 1,650
                        </span>
                      </div>
                      <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-[11px] font-bold shadow-md flex items-center justify-center gap-1.5">
                        <CreditCard size={12} /> Pay Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VIEW 3: INVENTORY */}
              {activeTab === 2 && (
                <motion.div
                  key="inventory"
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col bg-white"
                >
                  <div className="px-5 pt-10 pb-3 flex justify-between items-center border-b border-slate-100 bg-slate-50/50">
                    <div>
                      <h2 className="text-lg font-black text-slate-800 tracking-tight">
                        Inventory Data
                      </h2>
                      <p className="text-slate-500 text-[9px] font-medium mt-0.5">
                        Stock & GRN Tracking
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-md font-bold text-[9px] shadow-sm">
                      <Plus size={10} /> Add Item
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="flex items-center px-5 py-2 border-b border-slate-100 text-[8px] font-bold text-slate-400 uppercase tracking-widest bg-white">
                      <div className="flex-[2]">Product</div>
                      <div className="flex-1">Selling</div>
                      <div className="flex-1">Stock</div>
                    </div>

                    <div className="divide-y divide-slate-50">
                      {[
                        {
                          name: "Maggi Coconut Milk",
                          barcode: "847192",
                          price: "450",
                          stock: 128,
                          color: "text-emerald-500",
                          bg: "bg-emerald-500",
                        },
                        {
                          name: "Anchor Butter 200g",
                          barcode: "479102",
                          price: "950",
                          stock: 34,
                          color: "text-amber-500",
                          bg: "bg-amber-500",
                        },
                        {
                          name: "Prima Noodles",
                          barcode: "931245",
                          price: "180",
                          stock: 0,
                          color: "text-red-500",
                          bg: "bg-red-500",
                        },
                      ].map((product, i) => (
                        <div
                          key={i}
                          className="flex items-center px-5 py-2.5 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex-[2] flex items-center gap-2.5">
                            <div className="w-7 h-7 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-300">
                              <Package size={12} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-slate-700 truncate max-w-[100px]">
                                {product.name}
                              </span>
                              <span className="text-[8px] text-slate-400 font-mono">
                                <Barcode size={8} className="inline" />{" "}
                                {product.barcode}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 font-black text-[10px] text-slate-800">
                            Rs.{product.price}
                          </div>
                          <div className="flex-1 flex flex-col gap-1">
                            <span
                              className={`text-[8px] font-black ${product.color}`}
                            >
                              {product.stock} Units
                            </span>
                            <div className="w-10 h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${product.bg}`}
                                style={{
                                  width: `${Math.min(
                                    (product.stock / 150) * 100,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VIEW 4: ISLAND-WIDE COVERAGE */}
              {activeTab === 3 && (
                <motion.div
                  key="coverage"
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col bg-slate-900 overflow-hidden relative"
                >
                  <div className="px-5 pt-10 pb-3 flex justify-between items-center border-b border-slate-800 bg-slate-900 z-10">
                    <div>
                      <h2 className="text-lg font-black text-white tracking-tight">
                        Island-Wide Network
                      </h2>
                      <p className="text-slate-400 text-[9px] font-medium mt-0.5">
                        Real-time sync across all 9 provinces
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-md font-bold text-[9px] border border-emerald-500/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>{" "}
                      Live Nodes
                    </div>
                  </div>

                  <div className="flex-1 relative flex">
                    <div className="w-1/3 border-r border-slate-800 bg-slate-900/80 backdrop-blur-md z-10 flex flex-col p-4 gap-4">
                      <div>
                        <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                          Active Tenants
                        </div>
                        <div className="text-xl font-black text-white">
                          1,500+
                        </div>
                      </div>
                      <div>
                        <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                          Data Latency
                        </div>
                        <div className="text-base font-bold text-emerald-400">
                          {"< 50ms"}
                        </div>
                      </div>
                      <div className="flex-1"></div>
                      <div className="flex items-center gap-2 text-[8px] text-slate-400">
                        <Activity size={12} className="text-blue-500" />
                        <span>Syncing isolated databases...</span>
                      </div>
                    </div>

                    <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent"></div>

                      {MINI_REGIONS.map((region, i) => (
                        <div
                          key={region.name}
                          className="absolute flex flex-col items-center"
                          style={{ top: region.y, left: region.x }}
                        >
                          <div className="relative flex h-2 w-2">
                            <motion.span
                              animate={{
                                scale: [1, 2.5, 1],
                                opacity: [0.6, 0, 0.6],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
                              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
                            ></motion.span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                          </div>
                          <span className="text-[7px] font-bold text-slate-300 mt-1 uppercase tracking-widest">
                            {region.name}
                          </span>
                        </div>
                      ))}

                      <svg
                        className="absolute inset-0 w-full h-full opacity-30"
                        viewBox="0 0 350 250"
                      >
                        <motion.path
                          d="M 140 20 L 155 135 L 140 215"
                          stroke="#3b82f6"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.path
                          d="M 70 165 L 155 135 L 230 95"
                          stroke="#10b981"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: 0.5,
                          }}
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const ParallaxWidgets = ({
  smoothY,
  isReducedMotion,
}: {
  smoothY: MotionValue<number>;
  isReducedMotion: boolean;
}) => {
  return (
    <div className="mx-auto max-w-5xl px-4 absolute inset-0 pointer-events-none">
      <ParallaxCard
        smoothY={smoothY}
        start={-100}
        end={300}
        className="hidden md:flex absolute top-[25%] left-[5%] w-56 flex-col gap-2 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 pointer-events-auto"
        isReducedMotion={isReducedMotion}
      >
        <div className="flex items-center justify-between">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <TrendingUp size={14} className="text-blue-600" />
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            +18.5%
          </span>
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
          Daily Sales
        </div>
        <div className="text-xl font-black text-slate-800">Rs. 84,500.00</div>
      </ParallaxCard>

      <ParallaxCard
        smoothY={smoothY}
        start={200}
        end={-300}
        className="hidden md:flex absolute top-[60%] right-[10%] w-60 flex-col gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 pointer-events-auto"
        isReducedMotion={isReducedMotion}
      >
        <div className="flex items-center gap-2">
          <AlertCircle size={14} className="text-amber-500" />
          <span className="text-[10px] font-bold text-slate-700">
            Smart Expiry Alerts
          </span>
        </div>
        <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg border border-slate-100">
          <div>
            <div className="text-[10px] font-bold text-slate-800">
              Highland Milk 1L
            </div>
            <div className="text-[8px] text-slate-400">Expires in 3 Days</div>
          </div>
          <div className="text-[10px] font-black text-amber-600">4 Units</div>
        </div>
      </ParallaxCard>
    </div>
  );
};

const ParallaxCard = ({
  className,
  children,
  start,
  end,
  smoothY,
  isReducedMotion,
}: {
  className: string;
  children: React.ReactNode;
  start: number;
  end: number;
  smoothY: MotionValue<number>;
  isReducedMotion: boolean;
}) => {
  const y = useTransform(smoothY, [0, SECTION_HEIGHT], [start, end]);
  const transform = useMotionTemplate`translateY(${isReducedMotion ? 0 : y}px)`;

  return (
    <motion.div className={className} style={{ transform }}>
      {children}
    </motion.div>
  );
};

const FeaturesSchedule = () => {
  return (
    <section
      id="system-features"
      className="mx-auto max-w-5xl px-4 py-48 text-white relative z-10"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-slate-50 tracking-tighter"
      >
        Enterprise-Grade Features
      </motion.h1>

      <ScheduleItem
        title="Multi-Tenant Architecture"
        desc="100% Data isolation per shop"
        location="All Provinces"
        icon={<Database size={16} />}
      />
      <ScheduleItem
        title="Naya Potha (Customer Credit)"
        desc="Digital smart ledger system"
        location="Island-wide Sync"
        icon={<Store size={16} />}
      />
      <ScheduleItem
        title="Offline POS (PWA)"
        desc="Continues working without internet"
        location="Local Storage"
        icon={<WifiOff size={16} />}
      />
      <ScheduleItem
        title="Smart Expiry Alerts"
        desc="Automated stock health tracking"
        location="Cloud Cloud"
        icon={<Bell size={16} />}
      />
      <ScheduleItem
        title="Real-time Analytics"
        desc="Live sales & coverage tracking"
        location="Owner Dashboard"
        icon={<BarChart size={16} />}
      />
    </section>
  );
};

const ScheduleItem = ({
  title,
  desc,
  location,
  icon,
}: {
  title: string;
  desc: string;
  location: string;
  icon: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 px-3 pb-9 gap-4 group hover:bg-slate-900/50 transition-colors p-4 rounded-xl -mx-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
          {icon}
        </div>
        <div>
          <p className="mb-1.5 text-xl font-bold text-slate-50 tracking-tight">
            {title}
          </p>
          <p className="text-sm font-medium text-slate-400">{desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-start md:text-end text-sm uppercase font-bold text-slate-500">
        <p>{location}</p>
        <MapPin size={14} className="text-blue-500" />
      </div>
    </motion.div>
  );
};