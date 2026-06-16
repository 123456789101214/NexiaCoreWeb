'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

// --- Types ---
type TabType = 'dashboard' | 'pos' | 'inventory' | 'coverage';

const TABS: { id: TabType; label: string; icon: React.ReactNode }[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
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
      <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
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
      <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    id: 'coverage',
    label: 'Coverage',
    icon: (
      <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
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

export default function HeroDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  // Auto-cycle tabs
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = TABS.findIndex((t) => t.id === prev);
        return TABS[(currentIndex + 1) % TABS.length].id;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Touch device detection
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Framer Motion 3D Tilt Values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 1], [-10, 10]);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  };

  // Scroll Parallax for floating elements
  const { scrollY } = useScroll();
  const parallaxY1 = useTransform(scrollY, [0, 1000], [0, -60]);
  const parallaxY2 = useTransform(scrollY, [0, 1000], [0, -30]);
  const parallaxY3 = useTransform(scrollY, [0, 1000], [0, -90]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full max-w-[600px] mx-auto py-10 px-4 md:px-0 flex items-center justify-center [perspective:1200px]"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      <motion.div
        style={{
          rotateX: isTouch ? 0 : smoothRotateX,
          rotateY: isTouch ? 0 : smoothRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full transition-transform duration-200 ease-linear will-change-transform"
      >
        {/* Glassmorphism Tab Bar */}
        <div
          className="flex items-center gap-1.5 p-1.5 bg-white/60 backdrop-blur-xl border border-white/40 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.06)] w-fit mx-auto mb-6 relative z-50"
          style={{ transform: 'translateZ(40px)' }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] border border-blue-500'
                  : 'bg-transparent text-slate-500 hover:bg-white/80 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dashboard Scale Wrapper */}
        <div className="relative w-[520px] h-[420px] mx-auto scale-[0.6] sm:scale-75 md:scale-100 origin-top -mb-[170px] sm:-mb-[100px] md:mb-0">
          
          {/* Main Glass Panel */}
          <div
            className="absolute inset-0 bg-white/95 backdrop-blur-2xl border border-white/60 rounded-[18px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] overflow-hidden motion-safe:animate-hero-float"
            style={{
              transform: 'rotateY(-12deg) rotateX(5deg) translateZ(-30px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* macOS styled window dots */}
            <div className="absolute top-3 left-4 flex gap-1.5 z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-300"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-300"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200 border border-slate-300"></div>
            </div>

            {/* Views Setup */}
            <div className="relative w-full h-full pt-10">
              <ViewWrapper active={activeTab === 'dashboard'}><DashboardView /></ViewWrapper>
              <ViewWrapper active={activeTab === 'pos'}><POSView /></ViewWrapper>
              <ViewWrapper active={activeTab === 'inventory'}><InventoryView /></ViewWrapper>
              <ViewWrapper active={activeTab === 'coverage'}><CoverageView /></ViewWrapper>
            </div>
          </div>

          {/* Floating Element 1: Payment Card (Parallax + Float) */}
          <motion.div
            style={{ y: parallaxY1, z: 80, transformStyle: 'preserve-3d' }}
            className="absolute -left-6 bottom-4 w-[240px] z-30"
          >
            <div className="bg-white/85 backdrop-blur-xl border border-white/60 rounded-[18px] p-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] motion-safe:animate-float-slow">
              <div className="flex justify-between items-start mb-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {TABS[1].icon}
                </div>
                <div className="flex items-center gap-1 bg-green-50 text-green-600 text-[8px] font-bold px-2 py-1 rounded-full border border-green-100">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  SECURE
                </div>
              </div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Amount</div>
              <div className="text-[22px] font-black text-slate-900 tracking-tight mb-3">Rs. 2,850.00</div>
              <div className="h-9 rounded-lg bg-slate-900 flex items-center justify-between px-3 text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                  <span className="text-[10px] font-mono opacity-80 tracking-[0.2em]">•••• 4242</span>
                </div>
                <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Floating Element 2: Trend Chip */}
          <motion.div
            style={{ y: parallaxY2, z: 100 }}
            className="absolute top-2 -right-4 z-40"
          >
            <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.1)] border border-white/50 flex items-center gap-2 text-[10px] font-bold text-slate-700 motion-safe:animate-float-fast">
              <svg className="w-3.5 h-3.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              <span><span className="text-green-600">↑ 8.5%</span> vs yesterday</span>
            </div>
          </motion.div>

          {/* Floating Element 3: Low Stock Alert */}
          <motion.div
            style={{ y: parallaxY3, z: 90 }}
            className="absolute top-[200px] -left-[45px] z-40"
          >
            <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.1)] border border-white/50 flex items-center gap-2 text-[10px] font-bold text-slate-700 motion-safe:animate-float-medium">
              <svg className="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              96 Low Stock Items
            </div>
          </motion.div>

          {/* Floating Element 4: Trial Banner */}
          <motion.div
            style={{ y: parallaxY2, z: 60 }}
            className="absolute -top-5 left-6 z-40"
          >
            <div className="bg-amber-100/90 backdrop-blur-md border border-amber-300 px-4 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-[10px] font-bold text-amber-900 whitespace-nowrap cursor-pointer hover:bg-amber-200 transition-colors">
              ⚡ Your trial ends in 14 days. Upgrade Now →
            </div>
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
}

// --- View Wrapper (Handles blur fade in/out) ---
function ViewWrapper({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <div
      className={`absolute inset-0 transition-all duration-500 ease-in-out flex flex-col w-full h-full bg-slate-50/50 ${
        active ? 'opacity-100 blur-0 pointer-events-auto' : 'opacity-0 blur-sm pointer-events-none'
      }`}
    >
      {children}
    </div>
  );
}

// --- SUB-VIEWS ---

function DashboardView() {
  return (
    <div className="p-5 flex flex-col h-full gap-3 bg-slate-50/50">
      <div className="flex justify-between items-end border-b border-slate-200 pb-2">
        <div>
          <h3 className="text-[17px] font-black text-slate-900 tracking-tight">Dashboard Overview</h3>
          <p className="text-[10px] font-bold text-slate-500 mt-0.5">Colombo Branch Performance</p>
        </div>
        <div className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-[9px] font-bold text-slate-600 shadow-sm">
          Today
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-1">
        <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <svg className="w-3 h-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            Total Sales
          </div>
          <div className="text-xl font-black text-slate-900 tracking-tight">Rs. 125,430</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <svg className="w-3 h-3 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Orders
          </div>
          <div className="text-xl font-black text-slate-900 tracking-tight">320</div>
        </div>
      </div>
      <div className="flex-1 bg-white rounded-xl border border-slate-100 p-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Hourly Revenue Trend</div>
        <div className="flex-1 flex items-end gap-1.5">
          {[20, 45, 30, 80, 50, 100, 60, 40].map((height, i) => (
            <div key={i} className="flex-1 bg-blue-50 rounded-t-sm h-full flex items-end overflow-hidden group">
              <div 
                className={`w-full rounded-t-sm transition-colors duration-300 ${height === 100 ? 'bg-blue-600' : 'bg-blue-300 group-hover:bg-blue-400'}`}
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function POSView() {
  const items = [
    { name: 'Munchee Cracker', price: '250' },
    { name: 'Siddhalepa 50g', price: '150' },
    { name: 'Anchor 400g', price: '1,150' },
    { name: 'Sunsilk Black', price: '480' },
  ];

  return (
    <div className="flex h-full w-full bg-slate-50/50">
      <div className="flex-[3] p-3 flex flex-col gap-2.5 border-r border-slate-100">
        <div className="flex gap-1.5">
          {['All', 'Grocery', 'Pharmacy'].map((cat, i) => (
            <div key={i} className={`px-2.5 py-1 rounded-md text-[9px] font-bold cursor-pointer border transition-colors ${i === 0 ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300'}`}>
              {cat}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {items.map((item, i) => (
            <div key={i} className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm cursor-pointer hover:border-blue-300 transition-colors">
              <div className="w-full h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-300 mb-1.5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
              </div>
              <div className="text-[10px] font-bold text-slate-900 leading-tight truncate">{item.name}</div>
              <div className="text-[9px] font-black text-blue-600 mt-0.5">Rs. {item.price}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-[2] bg-white flex flex-col">
        <div className="p-2.5 border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-500">
          Current Order (3)
        </div>
        <div className="flex-1 p-2.5 flex flex-col gap-2">
          <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-100">
            <div>
              <div className="text-[10px] font-bold text-slate-900 truncate max-w-[80px]">Munchee Cracker</div>
              <div className="text-[8px] text-slate-400">2 x Unit</div>
            </div>
            <div className="text-[10px] font-black text-slate-900">Rs. 500</div>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-100">
            <div>
              <div className="text-[10px] font-bold text-slate-900 truncate max-w-[80px]">Anchor 400g</div>
              <div className="text-[8px] text-slate-400">1 x Unit</div>
            </div>
            <div className="text-[10px] font-black text-slate-900">Rs. 1,150</div>
          </div>
        </div>
        <div className="p-2.5 bg-slate-50/50 border-t border-slate-100">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-2">
            <span>Total</span>
            <span className="text-[15px] font-black text-slate-900">Rs. 1,650</span>
          </div>
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-colors">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

function InventoryView() {
  const invData = [
    { name: 'Maggi Coconut Milk', code: '847192', price: '450', stock: 128, color: 'green', width: '85%' },
    { name: 'Anchor Butter 200g', code: '479102', price: '950', stock: 34, color: 'amber', width: '23%' },
    { name: 'Prima Noodles', code: '931245', price: '180', stock: 0, color: 'red', width: '0%' },
  ];

  return (
    <div className="h-full w-full bg-white flex flex-col">
      <div className="px-4 py-3 flex justify-between items-center border-b border-slate-100 bg-slate-50/50">
        <div>
          <div className="text-[17px] font-black text-slate-900 tracking-tight">Inventory Data</div>
          <div className="text-[9px] text-slate-500 mt-0.5 font-medium">Stock & GRN Tracking</div>
        </div>
        <div className="flex items-center gap-1 bg-blue-600 text-white px-2.5 py-1.5 rounded-lg text-[9px] font-bold shadow-[0_2px_8px_rgba(37,99,235,0.3)] cursor-pointer hover:bg-blue-700 transition-colors">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add Item
        </div>
      </div>
      <div className="flex px-4 py-2 border-b border-slate-100 text-[8px] font-bold text-slate-400 uppercase tracking-widest bg-white">
        <div className="flex-[2]">Product</div>
        <div className="flex-1">Selling</div>
        <div className="flex-1">Stock</div>
      </div>
      <div className="flex flex-col">
        {invData.map((row, i) => (
          <div key={i} className="flex items-center px-4 py-2.5 border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
            <div className="flex-[2] flex items-center gap-2">
              <div className="w-7 h-7 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-300 shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-700 truncate max-w-[100px]">{row.name}</div>
                <div className="text-[8px] text-slate-400 font-mono tracking-wide">▐ {row.code}</div>
              </div>
            </div>
            <div className="flex-1 text-[10px] font-black text-slate-900">Rs.{row.price}</div>
            <div className="flex-1">
              <div className={`text-[9px] font-black mb-1 ${row.color === 'green' ? 'text-green-600' : row.color === 'amber' ? 'text-amber-600' : 'text-red-600'}`}>
                {row.stock} Units
              </div>
              <div className="w-10 h-1 bg-slate-100 rounded-full overflow-hidden">
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

function CoverageView() {
  return (
    <div className="h-full w-full bg-slate-900 flex flex-col relative overflow-hidden">
      <div className="px-4 py-3 flex justify-between items-center border-b border-white/10 relative z-10">
        <div>
          <div className="text-[17px] font-black text-white tracking-tight">Island-Wide Network</div>
          <div className="text-[9px] text-slate-400 mt-0.5">Real-time sync across all 9 provinces</div>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md text-[9px] font-bold border border-emerald-500/20">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Live Nodes
        </div>
      </div>
      <div className="flex-1 flex relative">
        <div className="w-[110px] border-r border-white/10 p-3 flex flex-col gap-4 relative z-10">
          <div>
            <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Active Tenants</div>
            <div className="text-xl font-black text-white">1,500+</div>
          </div>
          <div>
            <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Data Latency</div>
            <div className="text-sm font-black text-emerald-400">&lt;50ms</div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 text-[8px] text-slate-400 font-medium">
            <svg className="w-3 h-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
            Syncing DBs...
          </div>
        </div>
        
        {/* Map Area */}
        <div className="flex-1 relative overflow-hidden bg-slate-900">
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(rgba(59,130,246,0.3) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(59,130,246,0.3) 0 1px, transparent 1px 100%)', backgroundSize: '20px 20px' }} 
          />
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(37,99,235,0.15)_0%,transparent_70%)] pointer-events-none" />

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" viewBox="0 0 350 250">
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
                  className="absolute top-1/2 left-1/2 w-full h-full rounded-full bg-blue-400/50 -translate-x-1/2 -translate-y-1/2 motion-safe:animate-ring"
                  style={{ animationDelay: `${i * 0.15}s` }} 
                />
              </div>
              <div className="text-[7px] font-bold text-slate-400 mt-1 uppercase tracking-widest whitespace-nowrap">
                {r.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}