"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
  { name: "Solutions", href: "#solutions" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lenis = useLenis();

  // Handle Navbar background blur on scroll & Active Section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Blur navbar when scrolled down
      setScrolled(window.scrollY > 50);

      // Track active section
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is in the upper part of the viewport
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      }
      // If we are at the very top, clear active section (to highlight 'Home')
      if (window.scrollY < 200) current = "";
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll using Lenis when a link is clicked
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element && lenis) {
      // offset: -80 prevents the navbar from covering the section title
      lenis.scrollTo(element, { offset: -80, duration: 1.2 });
    }
  };

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/70 backdrop-blur-lg border-b border-slate-200/50 py-3 shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            if (lenis) lenis.scrollTo(0, { duration: 1.2 });
          }}
          className="flex items-center gap-2 relative z-10"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">NexiaCore</span>
        </Link>

        {/* Desktop Navigation (The Animated Pill) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50/50 border border-slate-200/50 p-1 rounded-full shadow-sm backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  isActive ? "text-blue-700" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-100"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-4 relative z-10">
          <Link href="https://nexia-core.vercel.app/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
            Sign In
          </Link>
          <Link href="https://nexia-core.vercel.app/register" className="text-sm font-bold bg-slate-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full transition-colors shadow-md">
            Start Free Trial
          </Link>
        </div>

      </div>
    </header>
  );
}