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

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <section id="about" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-bg-subtle">
      
      {/* Mesh Gradient Background from globals.css */}
      <div className="absolute inset-0 bg-mesh-fog z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* ━━━ LEFT SIDE: Typography & CTAs ━━━ */}
          <div className="flex-1 w-full flex flex-col items-start text-left">
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge variant="outline" className="mb-6 px-3 py-1.5 border-blue-200 bg-white/50 backdrop-blur-sm text-blue-700 font-semibold shadow-sm">
                <span className="mr-1.5 text-sm">🇱🇰</span> #1 POS Platform in Sri Lanka
              </Badge>
            </motion.div>

            {/* 🎬 CINEMATIC TEXT REVEAL ANIMATION */}
            <motion.h1 
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
              className="text-5xl sm:text-6xl lg:text-[72px] font-black text-slate-900 leading-[1.05] tracking-tighter mb-4"
            >
              {/* Animate 'Power Your Business.' word by word */}
              {"Power Your Business.".split(" ").map((word, i) => (
                <motion.span 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="inline-block mr-4"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {/* Fade in the gradient text smoothly */}
              <motion.span 
                variants={{
                  hidden: { opacity: 0, scale: 0.95, filter: "blur(8px)" },
                  show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1, ease: "easeOut", delay: 0.3 } }
                }}
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500"
              >
                Anywhere. Anytime.
              </motion.span>
            </motion.h1>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg sm:text-xl font-medium text-slate-600 italic mb-6"
            >
              Built for Sri Lankan retailers who demand more.
            </motion.h2>

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
                <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] transition-all">
                  <Link href="https://app.nexiacore.shop/register">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
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
        // ඔයාගේ ඇත්ත NexiaCore Promo video එක හැදුවම මෙතනට ඒකේ YouTube embed link එක දාන්න
        // videoSrc="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
      />
    </section>
  );
}