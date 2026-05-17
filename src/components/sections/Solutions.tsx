"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Pill, Shirt, Utensils } from "lucide-react";
import GlowCard from "../ui/GlowCard";

import { SOLUTIONS } from "../../data/solutions";

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 md:py-32 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-3">Tailored Solutions</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
            One platform. <br className="md:hidden" />
            <span className="text-slate-400 font-medium">Every retail business.</span>
          </h3>
        </div>

        {/* Mobile: Horizontal Scroll, Desktop: Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          {SOLUTIONS.map((solution, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="min-w-[280px] w-full snap-start"
            >
              <GlowCard className={`h-full p-8 flex flex-col group cursor-default transition-colors duration-300 ${solution.bg}`}>
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <solution.icon size={24} className={solution.iconColor} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{solution.title}</h4>
                <ul className="space-y-3">
                  {solution.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-blue-500 mt-0.5 opacity-70">•</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Hide scrollbar utility for the mobile horizontal scroll */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}