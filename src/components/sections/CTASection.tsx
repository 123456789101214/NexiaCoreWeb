"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden bg-blue-600">
      {/* Premium Mesh Gradient Overlay */}
      <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(at 0% 0%, rgba(255, 255, 255, 0.4) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(0, 255, 255, 0.4) 0px, transparent 50%)' }}></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight"
        >
          Ready to modernize <br /> your business?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
        >
          Join 1,500+ Sri Lankan businesses already scaling faster and smarter with NexiaCore.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="https://app.nexiacore.shop/register"
            className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 rounded-full font-black text-base shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            Start Free Trial <ArrowRight size={18} />
          </Link>
          <Link 
            href="#demo"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-blue-300 text-white rounded-full font-bold text-base hover:bg-blue-500/30 transition-colors"
          >
            Book a Demo
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-8 text-[12px] font-medium text-blue-200 uppercase tracking-widest flex flex-wrap items-center justify-center gap-3 md:gap-6"
        >
          <span>No credit card</span>
          <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
          <span>14-day trial</span>
          <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
          <span>Cancel anytime</span>
        </motion.div>
      </div>
    </section>
  );
}