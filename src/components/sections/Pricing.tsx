"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TiltCard } from "@/components/ui/TiltCard";
import { PLANS } from "@/data/pricing";

// Keep comparison table data local to the component to keep pricing.ts clean
const COMPARISON_FEATURES = [
  { name: "Products limit", free: "500", pro: "5,000", ent: "Unlimited" },
  { name: "Staff accounts", free: "2", pro: "10", ent: "Unlimited" },
  { name: "Basic POS & GRN", free: true, pro: true, ent: true },
  { name: "Customer Credit (Naya Potha)", free: false, pro: true, ent: true },
  { name: "Offline POS (PWA)", free: false, pro: true, ent: true },
  { name: "Smart Expiry Alerts", free: false, pro: true, ent: true },
  { name: "Advanced Analytics", free: false, pro: true, ent: true },
  { name: "Multi-branch ready", free: false, pro: false, ent: true },
  { name: "Dedicated Manager", free: false, pro: false, ent: true },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  // Helper to render correct icon based on plan name
  const renderPlanIcon = (planName: string) => {
    if (planName === "Free") return <svg viewBox="0 0 24 24" fill="none" className="w-[26px] h-[26px] stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>;
    if (planName === "Pro") return <svg viewBox="0 0 24 24" fill="none" className="w-[26px] h-[26px] stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 2.9 6.6L22 9.3l-5 4.9 1.2 7.1L12 17.8l-6.2 3.5L7 14.2 2 9.3l7.1-.7L12 2Z"/></svg>;
    return <svg viewBox="0 0 24 24" fill="none" className="w-[26px] h-[26px] stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9h6v6H9z"/></svg>;
  };

  const CheckMark = () => (
    <motion.span 
      initial={{ scale: 0.4, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600/10"
    >
      <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 stroke-blue-600 stroke-[3px]" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
    </motion.span>
  );

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 md:py-32 isolate" id="pricing">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, 60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-120px] left-[-80px] w-[420px] h-[420px] rounded-full bg-teal-600 opacity-10 blur-[60px] will-change-transform"
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[60px] right-[-100px] w-[360px] h-[360px] rounded-full bg-blue-400 opacity-10 blur-[60px] will-change-transform"
        />
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-100px] left-[38%] w-[300px] h-[300px] rounded-full bg-blue-600 opacity-[0.12] blur-[60px] will-change-transform"
        />
      </div>

      <div className="container relative z-10 px-6 mx-auto max-w-[1120px]">
        {/* Header */}
        <div className="max-w-[560px] mx-auto text-center mb-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="inline-block px-4 py-1.5 mb-4 text-[13px] font-bold tracking-widest uppercase text-blue-600 bg-blue-600/10 rounded-full"
          >
            Pricing
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.1 }}
            className="mb-3 text-[clamp(28px,4.5vw,42px)] font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-blue-600"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.2 }}
            className="text-base leading-relaxed text-slate-500"
          >
            Built specifically for Sri Lankan retail. Pick a plan that scales with your business.
          </motion.p>
        </div>

        {/* Toggle */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <span className={`text-[15px] font-semibold transition-colors duration-300 ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
          <button 
            role="switch" 
            aria-checked={isAnnual}
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative flex-shrink-0 w-[54px] h-[30px] p-0 rounded-full outline-none cursor-pointer bg-gradient-to-br from-blue-500 to-teal-600 shadow-inner"
          >
            <motion.span 
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-[3px] left-[3px] w-[24px] h-[24px] bg-white rounded-full shadow-md"
              style={{ x: isAnnual ? 24 : 0 }}
            />
          </button>
          <span className={`text-[15px] font-semibold transition-colors duration-300 ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Annual</span>
          <motion.span 
            key={isAnnual ? "pulse" : "static"}
            initial={{ scale: 1 }}
            animate={isAnnual ? { scale: [1, 1.12, 1] } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="px-3 py-1 text-xs font-bold text-blue-600 bg-blue-600/10 rounded-full"
          >
            Save 20%
          </motion.span>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 lg:gap-8 max-w-[420px] md:max-w-none mx-auto [perspective:1500px]">
          {PLANS.map((plan, i) => {
            // Calculate dynamic annual price
            const displayPrice = isAnnual && plan.name === "Pro" ? "Rs. 2,499" : plan.price;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <TiltCard 
                  isPopular={plan.popular} 
                  className={`h-full flex flex-col ${plan.popular ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 md:-translate-y-3 md:scale-[1.04] shadow-[0_25px_60px_-12px_rgba(37,99,235,0.55)]' : ''}`}
                >
                  {plan.badge && (
                    <div className="absolute top-[-13px] left-1/2 -translate-x-1/2 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-950 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full shadow-[0_8px_20px_rgba(245,158,11,0.4)]">
                      {plan.badge}
                    </div>
                  )}
                  
                  <div className={`flex items-center justify-center w-[52px] h-[52px] mb-5 rounded-xl shadow-lg ${plan.popular ? 'bg-white/15 shadow-none text-white' : 'bg-gradient-to-br from-blue-500 to-teal-600 text-white'}`}>
                    {renderPlanIcon(plan.name)}
                  </div>
                  
                  <h3 className="text-xl font-extrabold mb-2">{plan.name}</h3>
                  <p className={`text-sm leading-relaxed mb-5 min-h-[42px] ${plan.popular ? 'text-white/80' : 'text-slate-500'}`}>
                    {plan.desc}
                  </p>
                  
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-[32px] md:text-[42px] font-extrabold tracking-tight">
                      {displayPrice}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className={`text-sm font-semibold ${plan.popular ? 'text-white/70' : 'text-slate-500'}`}>{plan.period}</span>
                    )}
                  </div>

                  {/* Feature List processing object properties */}
                  <ul className="flex-1 space-y-3.5 mb-8 pointer-events-none">
                    {plan.features.map((feature, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ delay: 0.1 + (idx * 0.05) }}
                        className={`flex items-start gap-2.5 text-[14.5px] font-medium ${
                          !feature.included ? 'text-slate-400 opacity-60' : plan.popular ? 'text-white/90' : 'text-slate-700'
                        }`}
                      >
                        <span className={`flex-shrink-0 flex items-center justify-center w-[19px] h-[19px] rounded-full mt-0.5 ${
                          !feature.included ? 'bg-slate-200/50' : plan.popular ? 'bg-white/20' : 'bg-green-500/15'
                        }`}>
                          {feature.included ? (
                            <svg viewBox="0 0 24 24" fill="none" className={`w-[11px] h-[11px] stroke-[3px] ${plan.popular ? 'stroke-white' : 'stroke-green-500'}`} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" className="w-[9px] h-[9px] stroke-[3px] stroke-slate-400" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                          )}
                        </span>
                        {feature.text}
                      </motion.li>
                    ))}
                  </ul>

                  <Link 
                    href={plan.link} target="_blank"
                    className={`block text-center relative w-full py-3.5 px-5 rounded-2xl text-[15px] font-bold tracking-wide overflow-hidden transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0
                      ${plan.popular 
                        ? 'bg-white text-blue-600 shadow-[0_10px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)]' 
                        : plan.price === "Custom"
                          ? 'bg-slate-50 border border-slate-200 text-blue-600 hover:bg-slate-100' 
                          : 'bg-gradient-to-br from-blue-500 to-teal-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.3)] hover:shadow-[0_14px_30px_rgba(37,99,235,0.4)]'
                      }
                    `}
                  >
                    {plan.buttonText}
                  </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="container relative z-10 px-6 mx-auto max-w-[1120px] pt-20 mt-10 pointer-events-none">
        <div className="max-w-[520px] mx-auto text-center mb-10">
          <h3 className="text-[clamp(22px,3.5vw,30px)] font-extrabold text-slate-900 mb-2">Compare every feature</h3>
          <p className="text-[15px] text-slate-500">A detailed look at what's included to run your shop.</p>
        </div>

        {/* Desktop Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="hidden md:block w-full bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(37,99,235,0.08)]"
        >
          <table className="w-full text-left text-[14.5px] border-collapse">
            <thead>
              <tr>
                <th className="sticky top-0 bg-gradient-to-br from-blue-600 to-teal-600 text-white font-bold p-[18px_20px]">Feature</th>
                <th className="sticky top-0 bg-gradient-to-br from-blue-600 to-teal-600 text-white font-bold p-[18px_20px] text-center">Free</th>
                <th className="sticky top-0 bg-gradient-to-br from-blue-600 to-teal-600 text-white font-bold p-[18px_20px] text-center">Pro</th>
                <th className="sticky top-0 bg-gradient-to-br from-blue-600 to-teal-600 text-white font-bold p-[18px_20px] text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_FEATURES.map((feat, idx) => (
                <tr key={idx} className="transition-colors duration-200 hover:bg-slate-50 group border-b border-slate-200 last:border-0">
                  <td className="p-[15px_20px] font-semibold text-slate-900">{feat.name}</td>
                  <td className="p-[15px_20px] text-center text-slate-700">
                    {typeof feat.free === 'boolean' ? (feat.free ? <CheckMark /> : <span className="text-slate-400 opacity-40">—</span>) : feat.free}
                  </td>
                  <td className="p-[15px_20px] text-center text-slate-700">
                    {typeof feat.pro === 'boolean' ? (feat.pro ? <CheckMark /> : <span className="text-slate-400 opacity-40">—</span>) : feat.pro}
                  </td>
                  <td className="p-[15px_20px] text-center text-slate-700">
                    {typeof feat.ent === 'boolean' ? (feat.ent ? <CheckMark /> : <span className="text-slate-400 opacity-40">—</span>) : feat.ent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile Accordion */}
        <div className="flex flex-col gap-3.5 md:hidden pointer-events-auto">
          {PLANS.map((plan) => (
            <motion.details 
              key={plan.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              className="group bg-white border border-slate-200 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgba(37,99,235,0.08)]"
              open={plan.popular}
            >
              <summary className="flex items-center justify-between p-[18px_20px] cursor-pointer list-none font-bold text-[15.5px] text-slate-900 [&::-webkit-details-marker]:hidden">
                <span>{plan.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[14px] font-extrabold text-blue-600">
                    {plan.price}
                  </span>
                  <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] stroke-slate-500 transition-transform duration-300 group-open:rotate-180" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </summary>
              <div className="p-[0_20px_18px]">
                {COMPARISON_FEATURES.map((feat, idx) => {
                  const val = plan.name === "Free" ? feat.free : plan.name === "Pro" ? feat.pro : feat.ent;
                  return (
                    <div key={idx} className="flex items-center justify-between py-2.5 border-t border-slate-100 text-[14px] text-slate-700 first:border-0">
                      <span className="font-medium">{feat.name}</span>
                      <span>
                        {typeof val === 'boolean' ? (val ? "✓" : <span className="text-slate-400 opacity-40">—</span>) : val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}