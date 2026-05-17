"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, Package, TrendingUp, AlertCircle, ShoppingCart, 
  LayoutDashboard, Users, Receipt, Barcode, Plus, Globe, Activity 
} from "lucide-react";

// Added 'Coverage' tab
const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={14} /> },
  { id: 'pos', label: 'POS System', icon: <ShoppingCart size={14} /> },
  { id: 'inventory', label: 'Inventory', icon: <Package size={14} /> },
  { id: 'coverage', label: 'Coverage', icon: <Globe size={14} /> }
];

// Mini coordinates for Sri Lanka to fit inside the dashboard card
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

export default function HeroDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play tabs every 5 seconds (now loops through 4 tabs)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % TABS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="relative w-full flex flex-col items-center justify-center h-[450px] sm:h-[550px] md:h-[650px] z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* ━━━ GLASSMORPHISM TAB MENU (Above the 3D setup) ━━━ */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-0 md:top-4 z-40 flex items-center gap-1 sm:gap-2 p-1.5 bg-white/60 backdrop-blur-xl border border-black/[0.05] rounded-full shadow-sm"
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

      {/* ━━━ SCALING WRAPPER (Mobile Responsiveness) ━━━ */}
      <div className="relative w-[520px] h-[400px] scale-[0.55] sm:scale-[0.80] md:scale-100 origin-center perspective-[2000px] mt-16 md:mt-20">
        
        {/* MAIN MULTI-VIEW PANEL */}
        <motion.div 
          initial={{ rotateY: -12, rotateX: 5, z: -50, opacity: 0 }}
          animate={{ rotateY: -12, rotateX: 5, z: -50, opacity: 1, y: [0, -8, 0] }}
          transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 1 } }}
          className="absolute inset-0 bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden flex flex-col"
        >
          {/* WINDOW CONTROLS */}
          <div className="absolute top-3 left-4 flex gap-1.5 z-20">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
          </div>

          <AnimatePresence mode="wait">
            
            {/* ━━━ VIEW 1: DASHBOARD ━━━ */}
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
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">Dashboard Overview</h2>
                    <p className="text-slate-500 text-[10px] font-medium">Colombo Branch Performance</p>
                  </div>
                  <div className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-[10px] font-bold text-slate-600 shadow-sm">
                    Today
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="p-3 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col justify-center">
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><TrendingUp size={12} className="text-blue-500"/> Total Sales</div>
                    <div className="text-xl font-black text-slate-800 tracking-tight">Rs. 125,430</div>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col justify-center">
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Receipt size={12} className="text-emerald-500"/> Orders</div>
                    <div className="text-xl font-black text-slate-800 tracking-tight">320</div>
                  </div>
                </div>

                <div className="flex-1 bg-white rounded-xl border border-slate-100 shadow-sm p-3 flex flex-col mt-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Hourly Revenue Trend</div>
                  <div className="flex-1 flex items-end justify-between gap-1.5">
                    {[20, 45, 30, 80, 50, 100, 60, 40].map((h, i) => (
                      <div key={i} className="w-full bg-blue-50 rounded-t-sm relative group overflow-hidden" style={{ height: '100%' }}>
                        <div className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-500 ${i === 5 ? 'bg-blue-600' : 'bg-blue-300 group-hover:bg-blue-400'}`} style={{ height: `${h}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ━━━ VIEW 2: POS SYSTEM ━━━ */}
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
                    {['All', 'Grocery', 'Pharmacy'].map((cat, i) => (
                      <div key={i} className={`px-2 py-1 rounded-md text-[9px] font-bold cursor-pointer ${i === 0 ? 'bg-slate-800 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-500'}`}>{cat}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 overflow-hidden">
                    {[
                      { n: "Munchee Cracker", p: "250" }, { n: "Siddhalepa 50g", p: "150" },
                      { n: "Anchor 400g", p: "1,150" }, { n: "Sunsilk Black", p: "480" }
                    ].map((p, i) => (
                      <div key={i} className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-1.5 hover:border-blue-300 cursor-pointer">
                        <div className="w-full h-12 bg-slate-50 rounded-lg flex items-center justify-center text-slate-300"><Package size={16}/></div>
                        <div>
                          <div className="text-[10px] font-bold text-slate-800 leading-tight truncate">{p.n}</div>
                          <div className="text-[9px] font-black text-blue-600 mt-0.5">Rs. {p.p}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex-[2] bg-white flex flex-col">
                  <div className="p-3 border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-500">Current Order (3)</div>
                  <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-hidden">
                    {[
                      { n: "Munchee Cracker", q: 2, p: "500" },
                      { n: "Anchor 400g", q: 1, p: "1,150" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center pb-2 border-b border-slate-50 border-dashed">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-800 truncate max-w-[80px]">{item.n}</span>
                          <span className="text-[8px] text-slate-400">{item.q} x Unit</span>
                        </div>
                        <span className="text-[10px] font-black text-slate-800">Rs. {item.p}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-slate-50/50 border-t border-slate-100 flex flex-col gap-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500"><span>Total</span> <span className="text-[14px] font-black text-slate-800">Rs. 1,650</span></div>
                    <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-[11px] font-bold shadow-md flex items-center justify-center gap-1.5">
                      <CreditCard size={12}/> Pay Now
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ━━━ VIEW 3: INVENTORY ━━━ */}
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
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">Inventory Data</h2>
                    <p className="text-slate-500 text-[9px] font-medium mt-0.5">Stock & GRN Tracking</p>
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
                      { name: "Maggi Coconut Milk", barcode: "847192", price: "450", stock: 128, color: "text-emerald-500", bg: "bg-emerald-500" },
                      { name: "Anchor Butter 200g", barcode: "479102", price: "950", stock: 34, color: "text-amber-500", bg: "bg-amber-500" },
                      { name: "Prima Noodles", barcode: "931245", price: "180", stock: 0, color: "text-red-500", bg: "bg-red-500" },
                    ].map((product, i) => (
                      <div key={i} className="flex items-center px-5 py-2.5 hover:bg-slate-50 transition-colors">
                        <div className="flex-[2] flex items-center gap-2.5">
                          <div className="w-7 h-7 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-300">
                            <Package size={12} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-700 truncate max-w-[100px]">{product.name}</span>
                            <span className="text-[8px] text-slate-400 font-mono"><Barcode size={8} className="inline" /> {product.barcode}</span>
                          </div>
                        </div>
                        <div className="flex-1 font-black text-[10px] text-slate-800">Rs.{product.price}</div>
                        <div className="flex-1 flex flex-col gap-1">
                          <span className={`text-[8px] font-black ${product.color}`}>{product.stock} Units</span>
                          <div className="w-10 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${product.bg}`} style={{ width: `${Math.min((product.stock / 150) * 100, 100)}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ━━━ VIEW 4: ISLAND-WIDE COVERAGE (NEW!) ━━━ */}
            {activeTab === 3 && (
              <motion.div 
                key="coverage"
                initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex flex-col bg-slate-900 overflow-hidden relative"
              >
                {/* Header (Dark Mode) */}
                <div className="px-5 pt-10 pb-3 flex justify-between items-center border-b border-slate-800 bg-slate-900 z-10">
                  <div>
                    <h2 className="text-lg font-black text-white tracking-tight">Island-Wide Network</h2>
                    <p className="text-slate-400 text-[9px] font-medium mt-0.5">Real-time sync across all 9 provinces</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-md font-bold text-[9px] border border-emerald-500/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Live Nodes
                  </div>
                </div>

                {/* Inner Map View */}
                <div className="flex-1 relative flex">
                  {/* Left Stats Panel */}
                  <div className="w-1/3 border-r border-slate-800 bg-slate-900/80 backdrop-blur-md z-10 flex flex-col p-4 gap-4">
                    <div>
                      <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Tenants</div>
                      <div className="text-xl font-black text-white">1,500+</div>
                    </div>
                    <div>
                      <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Data Latency</div>
                      <div className="text-base font-bold text-emerald-400">{'< 50ms'}</div>
                    </div>
                    <div className="flex-1"></div>
                    <div className="flex items-center gap-2 text-[8px] text-slate-400">
                      <Activity size={12} className="text-blue-500" />
                      <span>Syncing multi-tenant isolated databases...</span>
                    </div>
                  </div>

                  {/* Right Map Area */}
                  <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
                    
                    {MINI_REGIONS.map((region, i) => (
                      <div key={region.name} className="absolute flex flex-col items-center" style={{ top: region.y, left: region.x }}>
                        <div className="relative flex h-2 w-2">
                          <motion.span animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }} className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></motion.span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                        </div>
                        <span className="text-[7px] font-bold text-slate-300 mt-1 uppercase tracking-widest">{region.name}</span>
                      </div>
                    ))}

                    {/* SVG Connections for Mini Map */}
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

        {/* ━━━ FLOATING ELEMENTS AROUND THE DASHBOARD ━━━ */}
        
        {/* Payment Card (Floating Right) */}
        <motion.div 
          initial={{ x: 80, y: 50, z: 80, opacity: 0 }}
          animate={{ x: 5, z: 80, opacity: 1, y: [240, 230, 240] }}
          transition={{ y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }, opacity: { duration: 0.8, delay: 0.6 } }}
          className="absolute w-[240px] bg-white rounded-[20px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 p-5 z-20"
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

        {/* Floating Metrics Chips */}
        <motion.div 
          animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1 -right-4 z-30 bg-white px-3 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2"
        >
          <TrendingUp size={14} className="text-emerald-500" />
          <span className="text-[10px] font-bold text-slate-700"><span className="text-emerald-600">↑ 8.5%</span> vs yesterday</span>
        </motion.div>

        <motion.div 
          animate={{ y: [5, -5, 5] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-53 -left-12 z-30 bg-white px-3 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2"
        >
          <AlertCircle size={14} className="text-red-500" />
          <span className="text-[10px] font-bold text-slate-700">96 Low Stock Items</span>
        </motion.div>

        {/* Trial Banner (Top Left) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
          className="absolute -top-5 left-8 z-30 bg-amber-100 border border-amber-200 px-4 py-2 rounded-full shadow-sm flex items-center gap-2 cursor-pointer hover:bg-amber-200 transition-colors"
        >
          <span className="text-[10px] font-bold text-amber-800">⚡ Your trial ends in 14 days. Upgrade Now →</span>
        </motion.div>
        
      </div>
    </div>
  );
}