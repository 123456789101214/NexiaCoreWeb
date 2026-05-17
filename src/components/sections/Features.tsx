"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Package, BookOpen, BarChart3, Users } from "lucide-react";
import GlowCard from "../ui/GlowCard";

import { FEATURES } from "../../data/features";

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="max-w-2xl mb-16 md:mb-24">
          <h2 className="text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-3">Enterprise Core</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[1.1]">
            Everything your business needs. <br />
            <span className="text-slate-400 font-medium">Nothing it doesn't.</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <GlowCard className="p-8 h-full flex flex-col group cursor-default">
                <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={20} className={feature.iconColor} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}