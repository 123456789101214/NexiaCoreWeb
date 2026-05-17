"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
  { name: "Solutions", href: "#solutions" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

// --- PRODUCTION-GRADE ANIMATION VARIANTS (Physics-based) ---

// Parent dropdown container variants (Staggered Children logic)
const dropdownVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -15, 
    transition: { 
      when: "afterChildren", // Close parent only after children are hidden
      staggerChildren: 0.05, // Interval between each child animating out
      staggerDirection: -1,  // Animate from bottom to top on exit
    } 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", stiffness: 400, damping: 30, // Butter-smooth spring
      when: "beforeChildren", // Show parent first, then show children
      staggerChildren: 0.1,  // Interval between each child animating in
      delayChildren: 0.1,    // Wait before animating first child
    } 
  },
};

// Individual child item variants (Slide + Blur + Stagger logic)
const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -25,              // Start slightly outside left
    filter: "blur(6px)",  // Start fully blurred
    transition: { type: "spring", stiffness: 300, damping: 25 } 
  },
  visible: { 
    opacity: 1, 
    x: 0,               // Settle at original position
    filter: "blur(0px)", // Settle without blur (Cinematic effect)
    transition: { type: "spring", stiffness: 300, damping: 25 } 
  },
};

// Icon rotation variant (Hamburger to X)
const iconVariants: Variants = {
  open: { rotate: 180, scale: 1.1 },
  closed: { rotate: 0, scale: 1 },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State to track which item is hovered (for the smart blur effect)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const lenis = useLenis();

  // Handle Navbar background blur on scroll & Active Section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section logic...
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      }
      if (window.scrollY < 200) current = "";
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll logic...
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close menu when link is clicked
    
    if (href === "/") {
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      return;
    }

    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -80, duration: 1.2 });
    }
  };

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || isMobileMenuOpen ? "bg-white/80 backdrop-blur-lg border-b border-slate-200/50 py-3 shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        
        {/* Brand Logo */}
        <Link 
          href="/" 
          onClick={(e) => handleNavClick(e as any, "/")}
          className="flex items-center gap-2 relative z-10"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">NexiaCore</span>
        </Link>

        {/* Desktop Navigation... (No changes here) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-50/50 border border-slate-200/50 p-1 rounded-full shadow-sm backdrop-blur-md">
          {NAV_LINKS.filter(link => link.name !== "Home").map((link) => {
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
                  <motion.div layoutId="nav-indicator" className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-100" transition={{ type: "spring", stiffness: 300, damping: 30 }} style={{ zIndex: -1 }}/>
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Desktop CTAs... (No changes here) */}
        <div className="hidden md:flex items-center gap-4 relative z-10">
          <Link href="https://nexia-core.vercel.app/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">Sign In</Link>
          <Link href="https://nexia-core.vercel.app/register" className="text-sm font-bold bg-slate-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full transition-colors shadow-md">Start Free Trial</Link>
        </div>

        {/* ━━━ MOBILE MENU TOGGLE BUTTON (with Rotation Animation) ━━━ */}
        <motion.button 
          className="md:hidden relative z-10 p-2 text-slate-600 hover:text-blue-600 transition-colors rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          animate={isMobileMenuOpen ? "open" : "closed"} // Linked to variants
          variants={iconVariants}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* ━━━ MOBILE MENU DROPDOWN (Cinematic & Smart Blur applied) ━━━ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"   // Start state
            animate="visible"  // Active state
            exit="hidden"     // Exit state
            variants={dropdownVariants} // Parent container options
            className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl py-8 px-6 flex flex-col gap-5 md:hidden overflow-hidden origin-top"
          >
            {/* List links with staggered entrance + blur */}
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              // Smart blur logic: if an item is hovered, blur all OTHER items
              const isOtherItemHovered = hoveredItem !== null && hoveredItem !== link.name;

              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={itemVariants} // Inherits stagger delay from parent
                  onClick={(e) => handleNavClick(e, link.href)}
                  // Smart Blur & Hover Tracking
                  onMouseEnter={() => setHoveredItem(link.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  // Direct Tailwind class binding for immediate visual state update
                  className={`text-xl font-extrabold transition-all duration-300 origin-left inline-block ${
                    isActive ? "text-blue-600" : "text-slate-900"
                  } ${isOtherItemHovered ? 'blur(3px) opacity-60 scale-95' : 'blur(0px) opacity-100 scale-100'}`}
                >
                  {link.name}
                </motion.a>
              );
            })}
            
            {/* Staggered CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3 mt-4 pt-6 border-t border-slate-100">
              <Link href="https://nexia-core.vercel.app/login" className="w-full py-4 text-center rounded-xl font-bold text-slate-700 bg-slate-50 border border-slate-200 active:bg-slate-100 transition-colors">Sign In</Link>
              <Link href="https://nexia-core.vercel.app/register" className="w-full py-4 text-center rounded-xl font-bold text-white bg-blue-600 shadow-md active:bg-blue-700 transition-colors">Start Free Trial</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}