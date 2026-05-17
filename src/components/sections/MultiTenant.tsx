"use client";

import { motion } from "framer-motion";
import { Server, ShieldCheck, Lock, Database, Store } from "lucide-react";

export default function MultiTenant() {
  return (
    <section className="py-24 md:py-32 bg-slate-900 text-white overflow-hidden relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5 pointer-events-none opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase mb-3">Enterprise Architecture</h2>
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
            Enterprise-grade isolation. <br className="hidden md:block" />
            <span className="text-slate-400 font-medium">SaaS-level scale.</span>
          </h3>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Every shop is a completely separate tenant. Zero data leakage. Zero cross-contamination. Bank-level data isolation built for modern Sri Lankan chains.
          </p>
        </div>

        {/* ━━━ THE ARCHITECTURE VISUALIZATION ━━━ */}
        <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center mb-20">
          
          {/* Connecting SVG Lines (Animated Flow) */}
          <svg className="absolute inset-0 w-full h-full opacity-50" preserveAspectRatio="none">
            {/* Colombo to Core */}
            <motion.path d="M 15% 30% L 50% 50%" stroke="#10b981" strokeWidth="2" strokeDasharray="6 6" fill="none" initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            {/* Kandy to Core */}
            <motion.path d="M 85% 30% L 50% 50%" stroke="#10b981" strokeWidth="2" strokeDasharray="6 6" fill="none" initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            {/* Galle to Core */}
            <motion.path d="M 50% 85% L 50% 50%" stroke="#10b981" strokeWidth="2" strokeDasharray="6 6" fill="none" initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
          </svg>

          {/* Central Cloud Node */}
          <motion.div 
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
            className="absolute z-20 w-32 h-32 bg-slate-800 rounded-3xl border border-slate-700 shadow-[0_0_50px_rgba(16,185,129,0.2)] flex flex-col items-center justify-center text-center"
          >
            <Server size={32} className="text-emerald-400 mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-widest">NexiaCore<br/>Cloud</span>
          </motion.div>

          {/* Branch Node 1: Colombo */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="absolute top-[20%] left-[5%] md:left-[15%] z-10 w-32 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 p-3 text-center">
            <Store size={16} className="text-blue-400 mx-auto mb-1" />
            <div className="text-[10px] font-bold text-slate-300">Shop A (Colombo)</div>
            <div className="text-[8px] text-slate-500 mt-1">Tenant ID: 1001</div>
          </motion.div>

          {/* Branch Node 2: Kandy */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="absolute top-[20%] right-[5%] md:right-[15%] z-10 w-32 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 p-3 text-center">
            <Store size={16} className="text-purple-400 mx-auto mb-1" />
            <div className="text-[10px] font-bold text-slate-300">Shop B (Kandy)</div>
            <div className="text-[8px] text-slate-500 mt-1">Tenant ID: 1002</div>
          </motion.div>

          {/* Branch Node 3: Galle */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }} className="absolute bottom-[5%] z-10 w-32 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 p-3 text-center">
            <Store size={16} className="text-rose-400 mx-auto mb-1" />
            <div className="text-[10px] font-bold text-slate-300">Shop C (Galle)</div>
            <div className="text-[8px] text-slate-500 mt-1">Tenant ID: 1003</div>
          </motion.div>
        </div>

        {/* ━━━ TECHNICAL TRUST SIGNALS (Customer-Friendly Update) ━━━ */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 border-t border-slate-800 pt-12">
          {[
            { icon: <Database size={16} />, text: "Isolated Cloud Databases" },
            { icon: <Lock size={16} />, text: "Bank-Level Data Security" },
            { icon: <ShieldCheck size={16} />, text: "Strict Access Control" },
            { icon: <Server size={16} />, text: "99.9% Server Uptime" },
            { icon: <Lock size={16} />, text: "End-to-End Encryption" }
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + (i * 0.1) }} className="flex flex-col items-center justify-center text-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-default">
              <div className="text-emerald-400 mb-2">{item.icon}</div>
              <div className="text-[11px] font-medium text-slate-300">{item.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}