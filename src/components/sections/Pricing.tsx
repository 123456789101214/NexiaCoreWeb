"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

import { PLANS } from "../../data/pricing";
export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-3">Transparent Pricing</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Start free. <span className="text-slate-400">Scale when you're ready.</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative flex flex-col p-8 rounded-3xl border ${
                plan.popular 
                  ? "border-blue-500 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] bg-blue-50/10" 
                  : "border-slate-200 shadow-sm bg-white"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-8">
                <h4 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h4>
                <p className="text-sm text-slate-500 mb-6 min-h-[40px]">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 tracking-tight">{plan.price}</span>
                  <span className="text-sm font-medium text-slate-500">{plan.period}</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {feat.included ? (
                      <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
                    ) : (
                      <XCircle size={18} className="text-slate-300 shrink-0" />
                    )}
                    <span className={`text-sm ${feat.included ? 'text-slate-700 font-medium' : 'text-slate-400 line-through'}`}>
                      {feat.text}
                    </span>
                  </div>
                ))}
              </div>

              <Link 
                href={plan.link}
                className={`w-full py-3.5 rounded-full text-center text-sm font-bold transition-all duration-300 ${
                  plan.popular 
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg" 
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                {plan.buttonText}
              </Link>
              {plan.popular && (
                <p className="text-center text-[10px] text-slate-500 mt-3 font-medium">No credit card required for trial.</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm font-medium text-slate-500">
          <span className="inline-block px-4 py-2 bg-slate-50 border border-slate-200 rounded-full">
            💡 Bank deposit and online transfer accepted. No international cards needed.
          </span>
        </div>

      </div>
    </section>
  );
}