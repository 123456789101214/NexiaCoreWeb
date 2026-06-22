// src/components/hero/Hero.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, CheckCircle2 } from "lucide-react";

// Components
import HeroDashboard from "./HeroDashboard";
import { Button } from "../ui/button";
import VideoModal from "../ui/VideoModal";
import MagneticButton from "../ui/MagneticButton";
import { ShimmerButton } from '../ui/ShimmerButton';
import { AnimatedGradientBadge } from '../ui/AnimatedGradientBadge';
import { Text3DFlip } from '../ui/Text3DFlip';
import { SmoothTextAnimate } from '../ui/SmoothTextAnimate';
import { Particles } from '../ui/Particles';

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="about" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-bg-subtle dark:bg-bg-base transition-colors duration-500">
      
      <Particles 
        className="z-0 absolute inset-0" 
        quantity={60} 
        ease={80} 
        staticity={40} 
      />
      
      {/* Mesh Gradient Background from globals.css */}
      <div className="absolute inset-0 bg-mesh-fog dark:opacity-100 transition-opacity duration-500 z-0 pointer-events-none before:absolute before:top-[-15%] before:left-[-10%] before:w-[65vw] before:h-[65vw] before:rounded-full before:bg-gradient-to-br before:from-blue-primary/[0.12] before:via-teal-accent/[0.08] before:to-transparent before:blur-[130px] before:opacity-0 dark:before:opacity-100 before:transition-opacity before:duration-700"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* CHANGED: Graphizo-Inspired Orbiting Feature Constellation (Only triggers in Dark Mode) */}
        <div className="absolute inset-0 pointer-events-none hidden xl:block z-10 select-none opacity-0 dark:opacity-100 transition-opacity duration-700">
          {/* Top-Left Arch */}
          <motion.div 
            viewport={{ once: true, margin: '-50px' }}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-[-10%] left-[25%] px-4 py-2 rounded-full border border-blue-500/[0.18] bg-slate-900/90 backdrop-blur-md shadow-glass text-xs font-semibold text-blue-200 flex items-center gap-2 animate-float-slow rotate-[-12deg]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-primary animate-pulse" /> Multi-Tenant Isolation
          </motion.div>

          {/* Bottom-Left Arch */}
          <motion.div 
            viewport={{ once: true, margin: '-50px' }}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            className="absolute top-[26%] left-[35%] px-4 py-2 rounded-full border border-teal-500/[0.18] bg-slate-900/90 backdrop-blur-md shadow-glass text-xs font-semibold text-teal-200 flex items-center gap-2 animate-float-medium rotate-[-10deg]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-accent" /> Offline POS (App)
          </motion.div>

          {/* Top Mid-Right Arch */}
          <motion.div 
            viewport={{ once: true, margin: '-50px' }}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute top-[4%] right-[55%] px-4 py-2 rounded-full border border-gold-accent/[0.18] bg-slate-900/90 backdrop-blur-md shadow-glass text-xs font-semibold text-amber-200 flex items-center gap-2 animate-float-fast rotate-[14deg]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" /> Naya Potha Credit
          </motion.div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* ━━━ LEFT SIDE: Typography & CTAs ━━━ */}
          <div className="flex-1 w-full flex flex-col items-start text-left">

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <AnimatedGradientBadge
                icon="🇱🇰"
                text="#1 POS Platform in Sri Lanka"
                className="mb-6"
              />
            </motion.div>

            {/* TEXT 3D FLIP ANIMATION */}
            <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-black  leading-[1.05] tracking-tighter mb-4 text-[var(--hero-text)]">
              <Text3DFlip text="Power Your Business." delayOffset={0} />
              <br className="hidden sm:block" />
              <Text3DFlip text="Anywhere. Anytime." gradient={true} delayOffset={0.4} className="mt-2" />
            </h2>

            {/* SMOOTH TEXT ANIMATE */}
            <h2 className="text-lg sm:text-xl font-medium text-slate-600 dark:text-slate-300 italic mb-6">
              <SmoothTextAnimate text="Built for Sri Lankan retailers who demand more." />
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}
              className="text-base sm:text-lg text-slate-500 ark:text-slate-300 max-w-xl mb-8 leading-relaxed"
            >
              NexiaCore is the cloud-native POS platform trusted by 1,500+ supermarkets, pharmacies, and retail stores across Sri Lanka. Real-time analytics, multi-tenant security, and full inventory control.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10 z-20 relative"
            >
              <MagneticButton>
                <ShimmerButton href="https://app.nexiacore.shop/register" target="_blank" size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]">
                  <span className="flex items-center">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </ShimmerButton>
              </MagneticButton>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Button
                  onClick={() => setIsVideoOpen(true)}
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 rounded-full font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <PlayCircle className="mr-2 h-5 w-5" /> Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 text-[13px] font-semibold text-slate-500 dark:text-slate-400 mb-8"
            >
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 14-day free trial</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cancel anytime</div>
            </motion.div>

            {/* City Presence */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }}
              className="text-[12px] font-bold text-slate-400 uppercase tracking-widest"
            >
              Active in Colombo · Kandy · Galle · Jaffna · Negombo
            </motion.div>
          </div>

          {/* ━━━ RIGHT SIDE: Smooth Scroll 3D Mockup ━━━ */}
          <div className="flex-[1.1] w-full relative min-h-[500px] lg:min-h-[700px] flex items-center justify-center">
            {/* The upgraded dashboard will now natively handle the scroll reveal and parallax! */}
            <HeroDashboard />
          </div>

        </div>
      </div>
      
      {/* ━━━ CINEMATIC VIDEO MODAL ━━━ */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc="https://assets.mixkit.co/videos/preview/mixkit-financial-trading-dashboard-on-a-monitor-screen-40010-large.mp4"
      />
    </section>
  );
}