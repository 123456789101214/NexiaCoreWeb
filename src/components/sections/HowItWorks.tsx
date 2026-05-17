"use client";

import { motion } from "framer-motion";
import { UserPlus, Settings2, ShoppingBag } from "lucide-react";

const STEPS = [
  {
    icon: <UserPlus size={24} className="text-blue-600" />,
    title: "Create Your Account",
    desc: "Register with email verification. Choose Free, Pro, or Enterprise plan based on your scale."
  },
  {
    icon: <Settings2 size={24} className="text-blue-600" />,
    title: "Set Up Your Shop",
    desc: "Add products via bulk Excel upload or one by one. Configure staff roles and supplier contacts."
  },
  {
    icon: <ShoppingBag size={24} className="text-white" />,
    title: "Start Selling",
    desc: "Use the POS terminal on any device. Watch your analytics and stock updates live.",
    isActive: true // Highlights the final step
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-3">Onboarding</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Up and running in minutes.
          </h3>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop: Horizontal, Mobile: Vertical) */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-slate-200 border-t-2 border-dashed border-slate-300"></div>
          <div className="md:hidden absolute top-0 bottom-0 left-[28px] w-[2px] bg-slate-200 border-l-2 border-dashed border-slate-300"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {STEPS.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-4 text-left md:text-center"
              >
                {/* Step Circle */}
                <div className={`relative z-10 w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl flex items-center justify-center border-2 shadow-sm transition-transform hover:scale-110 duration-300 ${
                  step.isActive 
                    ? "bg-blue-600 border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
                    : "bg-white border-slate-100"
                }`}>
                  {step.icon}
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shadow-md border-2 border-white">
                    {i + 1}
                  </div>
                </div>

                {/* Step Content */}
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed md:px-4">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}