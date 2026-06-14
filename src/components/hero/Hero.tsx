"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle, CheckCircle2 } from "lucide-react";
// Import using relative paths!
import SriLankaMap from "./SriLankaMap";
import HeroDashboard from "./HeroDashboard";
import { Badge } from "../ui/badge"; // Shadcn Badge
import { Button } from "../ui/button"; // Shadcn Button
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
    <section id="about" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-bg-subtle">
      <Particles 
        className="z-0 absolute inset-0" 
        quantity={60} 
        ease={80} 
        staticity={40} 
      />
      {/* Mesh Gradient Background from globals.css */}
      <div className="absolute inset-0 bg-mesh-fog z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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

            {/* 2. TEXT 3D FLIP ANIMATION (No Empty Spaces!) */}
            <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-black text-slate-900 leading-[1.05] tracking-tighter mb-4">

              {/* පළවෙනි ලයින් එක 0s වලින් පටන් ගන්නවා */}
              <Text3DFlip text="Power Your Business." delayOffset={0} />
              <br className="hidden sm:block" />

              {/* දෙවෙනි ලයින් එක 0.4s වලින් පටන් ගන්නවා (පළවෙනි එක එනවත් එක්කම ස්මූත් එකට එනවා) */}
              <Text3DFlip text="Anywhere. Anytime." gradient={true} delayOffset={0.4} className="mt-2" />

            </h2>

            {/* 3. SMOOTH TEXT ANIMATE */}
            <h2 className="text-lg sm:text-xl font-medium text-slate-600 italic mb-6">
              <SmoothTextAnimate text="Built for Sri Lankan retailers who demand more." />
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}
              className="text-base sm:text-lg text-slate-500 max-w-xl mb-8 leading-relaxed"
            >
              NexiaCore is the cloud-native POS platform trusted by 1,500+ supermarkets, pharmacies, and retail stores across Sri Lanka. Real-time analytics, multi-tenant security, and full inventory control.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
            >
              {/* Magnetic-style Button wrapper using Framer Motion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10 z-20 relative"
              >
                {/* ━━━ MAGNETIC BUTTON APPLIED HERE ━━━ */}
                <MagneticButton>
                  <ShimmerButton href="https://app.nexiacore.shop/register" target="_blank" size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]">
                    <span className="flex items-center">
                      Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </ShimmerButton>
                </MagneticButton>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Button
                    onClick={() => setIsVideoOpen(true)} // <-- ලින්ක් එක වෙනුවට මේක දාන්න
                    variant="ghost"
                    size="lg"
                    className="w-full sm:w-auto h-14 px-8 rounded-full font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                  >
                    <PlayCircle className="mr-2 h-5 w-5" /> Watch Demo
                  </Button>
                </motion.div>
              </motion.div>

            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 text-[13px] font-semibold text-slate-500 mb-8"
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

          {/* ━━━ RIGHT SIDE: 3D Mockup & Map ━━━ */}
          <div className="flex-[1.1] w-full relative min-h-[500px] lg:min-h-[700px] flex items-center justify-center">
            {/* <SriLankaMap /> */}
            <HeroDashboard />
          </div>

        </div>
      </div>
      
      {/* ━━━ CINEMATIC VIDEO MODAL ━━━ */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        // 👈 අර 404 ආපු Local ලින්ක් එක වෙනුවට මේ වැඩ කරන Online MP4 එක දෙන්න
        videoSrc="https://assets.mixkit.co/videos/preview/mixkit-financial-trading-dashboard-on-a-monitor-screen-40010-large.mp4"
      />
    </section>
  );
}