"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "../ui/AnimatedCounter";

const STATS = [
  { value: 1500, suffix: "+", label: "Active Tenants" },
  { value: 50000, suffix: "+", label: "Daily Transactions" },
  { value: 99, suffix: ".9%", label: "Uptime SLA" },
  { value: 24, suffix: "/7", label: "Local Support" },
];

const BRANDS = ["SuperMart", "FreshPharm", "KandyTextiles", "IslandEats", "TechZone"];

export default function TrustBar() {
  return (
    <section className="py-16 md:py-24 border-y border-slate-200 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ROW 1: Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {STATS.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center space-y-2"
            >
              <div className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ROW 2: Trusted Brands Marquee */}
        <div className="flex flex-col items-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8 text-center">
            Trusted by businesses across Sri Lanka
          </p>
          
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {BRANDS.map((brand, i) => (
              <span key={i} className="text-xl md:text-2xl font-black tracking-tighter text-slate-800">
                {brand}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}