"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Star } from "lucide-react";

import { REVIEWS } from "../../data/testimonials";

export default function Testimonials() {
  // Setup Embla with Loop, DragFree (smooth continuous scroll), and AutoScroll plugin
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" }, 
    [AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false })]
  );

  return (
    <section className="py-24 md:py-32 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-3">Customer Stories</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
            Trusted by Sri Lankan <br className="md:hidden" /> business owners.
          </h3>
          <p className="text-lg text-slate-500 font-medium">Hear from the enterprises scaling faster with NexiaCore.</p>
        </div>

        {/* ━━━ THE SLIDER CONTAINER ━━━ */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* ━━━ THE MAGIC FADE OVERLAYS (Uses our bg-slate-50 color) ━━━ */}
          <div className="absolute top-0 left-0 h-full w-16 sm:w-32 md:w-48 z-20 pointer-events-none bg-gradient-to-r from-slate-50 to-transparent"></div>
          <div className="absolute top-0 right-0 h-full w-16 sm:w-32 md:w-48 z-20 pointer-events-none bg-gradient-to-l from-slate-50 to-transparent"></div>

          {/* ━━━ EMBLA CAROUSEL VIEWPORT ━━━ */}
          <div className="overflow-hidden" ref={emblaRef}>
            
            {/* Slider Container (Flex) */}
            <div className="flex touch-pan-y">
              
              {REVIEWS.map((t, i) => (
                <div key={i} className="relative flex-[0_0_100%] sm:flex-[0_0_55%] md:flex-[0_0_40%] min-w-0 pl-6">
                  
                  {/* Testimonial Card UI */}
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-full cursor-grab active:cursor-grabbing hover:border-blue-300 hover:shadow-md transition-all duration-300 group">
                    <div>
                      <div className="flex gap-1 mb-6 text-amber-400">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={16} className="fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${j * 50}ms` }} />
                        ))}
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed mb-8 text-[15px]">
                        "{t.text}"
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{t.name}</div>
                        <div className="text-[12px] text-slate-500 font-medium">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}