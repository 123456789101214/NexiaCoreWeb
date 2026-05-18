"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "../ui/AnimatedCounter";
import { Building2, ShoppingBag, ShieldCheck, Headphones } from "lucide-react";

const stats = [
  { 
    id: 1, 
    value: 1500, 
    suffix: "+", 
    label: "Active Tenants", 
    icon: <Building2 size={20} className="text-blue-500 mb-2" />,
    color: "from-blue-500 to-blue-700"
  },
  { 
    id: 2, 
    value: 50000, 
    suffix: "+", 
    label: "Daily Transactions", 
    icon: <ShoppingBag size={20} className="text-emerald-500 mb-2" />,
    color: "from-emerald-500 to-emerald-700"
  },
  { 
    id: 3, 
    value: 99, 
    suffix: ".9%", 
    label: "Uptime SLA", 
    icon: <ShieldCheck size={20} className="text-purple-500 mb-2" />,
    color: "from-purple-500 to-purple-700"
  },
  { 
    id: 4, 
    value: 24, 
    suffix: "/7", 
    label: "Local Support", 
    icon: <Headphones size={20} className="text-amber-500 mb-2" />,
    color: "from-amber-500 to-amber-700"
  },
];

// Production-grade typography for Sri Lankan business type representations
const trustLogos = [
  { name: "SuperMart Plus", style: "font-black tracking-tighter text-slate-800" },
  { name: "FreshPharm.", style: "font-bold font-serif text-emerald-900 tracking-tight" },
  { name: "KANDY TEXTILES", style: "font-black uppercase tracking-widest text-slate-700 text-sm" },
  { name: "IslandEats", style: "font-extrabold italic text-amber-600 tracking-tight" },
  { name: "TechZone", style: "font-mono font-bold text-blue-800 tracking-tighter" },
];

export default function TrustBar() {
  return (
    <section className="relative w-full py-16 bg-slate-50 overflow-hidden border-b border-slate-100">
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ━━━ ROW 1: ANIMATED STATS ━━━ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {stat.icon}
              <h3 className={`text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-1`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ━━━ ROW 2: LOCAL TRUSTED LOGOS ━━━ */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-10 border-t border-slate-200/60"
        >
          <p className="text-center text-sm font-semibold text-slate-400 mb-8 uppercase tracking-widest">
            Trusted by businesses across Sri Lanka
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            {trustLogos.map((logo, index) => (
              <div 
                key={index} 
                className={`text-xl md:text-2xl opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer ${logo.style}`}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}