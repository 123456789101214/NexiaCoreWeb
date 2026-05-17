"use client";

import { motion } from "framer-motion";
import { LineChart, TrendingUp, DollarSign, CalendarDays, AlertTriangle } from "lucide-react";

const FEATURES = [
  { icon: <CalendarDays size={18} />, text: "Daily, weekly, and monthly sales charts" },
  { icon: <DollarSign size={18} />, text: "Profit vs revenue comparison in LKR" },
  { icon: <TrendingUp size={18} />, text: "Top selling products and categories" },
  { icon: <LineChart size={18} />, text: "Stock forecast (7 days ahead)" },
  { icon: <AlertTriangle size={18} />, text: "Automated low stock alerts to your phone" },
];

export default function Analytics() {
  return (
    <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* ━━━ LEFT SIDE: Text & Features ━━━ */}
          <div className="flex-1 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-3">Business Intelligence</h2>
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
                Your business intelligence. <br />
                <span className="text-blue-600">In real time.</span>
              </h3>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed max-w-lg">
                Stop guessing. NexiaCore gives you enterprise-grade reporting built right in. Know exactly what's selling, what's expiring, and what your actual profit is at any given second.
              </p>

              <div className="space-y-4">
                {FEATURES.map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-slate-700 font-medium"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      {feature.icon}
                    </div>
                    {feature.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ━━━ RIGHT SIDE: Animated Chart Mockup ━━━ */}
          <div className="flex-[1.2] w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-200 relative"
            >
              <div className="flex justify-between items-end mb-8">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">7-Day Revenue Trend</div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">Rs. 845,250</div>
                </div>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-bold flex items-center gap-1 border border-emerald-100">
                  <TrendingUp size={12} /> +12.5%
                </div>
              </div>

              {/* SVG Area Chart Animation */}
              <div className="relative w-full h-[250px] mt-4">
                <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  {[0, 50, 100, 150].map((y) => (
                    <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#f1f5f9" strokeWidth="2" strokeDasharray="4 4" />
                  ))}
                  
                  {/* The Animated Line */}
                  <motion.path
                    d="M 0 150 C 50 140, 100 160, 150 110 C 200 60, 250 80, 300 40 C 350 0, 400 30, 450 10 L 500 20"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                  />
                  
                  {/* The Gradient Fill under the line */}
                  <motion.path
                    d="M 0 150 C 50 140, 100 160, 150 110 C 200 60, 250 80, 300 40 C 350 0, 400 30, 450 10 L 500 20 L 500 200 L 0 200 Z"
                    fill="url(#gradientFill)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />

                  {/* Defs for Gradient */}
                  <defs>
                    <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Data Points (Dots) */}
                  {[
                    { x: 150, y: 110, val: "120K" },
                    { x: 300, y: 40, val: "210K" },
                    { x: 450, y: 10, val: "280K" }
                  ].map((point, i) => (
                    <g key={i}>
                      <motion.circle 
                        cx={point.x} cy={point.y} r="6" fill="white" stroke="#2563eb" strokeWidth="3"
                        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.5 + (i * 0.2), type: "spring" }}
                      />
                      <motion.text 
                        x={point.x} y={point.y - 15} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569"
                        initial={{ opacity: 0, y: 5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.6 + (i * 0.2) }}
                      >
                        Rs.{point.val}
                      </motion.text>
                    </g>
                  ))}
                </svg>

                {/* X-Axis Labels */}
                <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}