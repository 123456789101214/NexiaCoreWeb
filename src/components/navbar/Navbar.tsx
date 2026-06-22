'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HexagonThemeToggler } from '../ui/HexagonThemeToggler';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Features', href: '#features' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

// Pure inline SVGs locked to 2.2px stroke for premium high-DPI crispness
const getNavIcon = (name: string) => {
  switch (name) {
    case 'About':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
        </svg>
      );
    case 'Features':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        </svg>
      );
    case 'Solutions':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      );
    case 'Pricing':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/>
        </svg>
      );
    case 'Contact':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      );
    default:
      return null;
  }
};

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null); // CHANGED

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_LINKS.map((link) => link.href.substring(1)).filter(Boolean);
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
          }
        }
      }
      
      if (window.scrollY < 200) {
        current = 'about';
      }
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); 
    
    if (href !== '/') {
      window.history.pushState(null, '', href);
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }

    setTimeout(() => {
      if (href === '/' || href === '#about') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        const offset = 80; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50); 
  };

  return (
    <nav className={`fixed top-0 inset-x-0 z-[1000] transition-colors duration-[var(--transition-duration)] ${
      scrolled || isMobileMenuOpen 
        ? 'bg-[var(--navbar-bg)] shadow-[var(--navbar-shadow)] backdrop-blur-xl border-b border-transparent dark:border-white/[0.05]' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link 
          href="/" 
          onClick={(e) => handleNavClick(e as any, '/')}
          className="flex items-center gap-2 flex-shrink-0 group relative z-10"
        >
          <div className="w-8 h-8 bg-[var(--logo-bg)] rounded-[7px] flex items-center justify-center text-[var(--logo-text)] text-[15px] font-bold tracking-[-0.5px] transition-colors duration-300">
            N
          </div>
          <span className="text-base font-bold text-text-primary transition-colors duration-[var(--transition-duration)]">
            NexiaCore
          </span>
        </Link>

        {/* CHANGED: Center Pill Nav — replaced native title with aria-label and added spring-animated inverted tooltips */}
        <div className="hidden md:flex items-center bg-[var(--pill-bg)] shadow-[var(--pill-shadow)] border border-transparent dark:border-white/[0.06] backdrop-blur-md rounded-full p-1 gap-0.5 transition-colors duration-[var(--transition-duration)] relative z-10">
          {NAV_LINKS.filter(link => link.name !== 'Home').map((link) => {
            const isActive = activeSection === link.href.substring(1);
            const isHovered = hoveredNav === link.name; // CHANGED
            
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-label={link.name} // CHANGED: Replaced 'title' to suppress clashing OS default tooltips
                onMouseEnter={() => {  // CHANGED: Touch-safe pointer detection
                  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
                  if (!isTouch) setHoveredNav(link.name);
                }}
                onMouseLeave={() => setHoveredNav(null)} // CHANGED
                className={`relative flex items-center justify-center rounded-full text-sm whitespace-nowrap transition-colors duration-200 z-10
                  w-[34px] h-[34px] lg:w-auto lg:h-auto lg:px-4 lg:py-[7px]
                  ${isActive 
                    ? 'text-text-primary font-semibold' 
                    : 'text-text-muted font-medium hover:text-[var(--navtext-hover-color)]'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-[var(--active-bg)] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.12)] dark:shadow-[0_0_16px_rgba(37,99,235,0.45)] border border-border-subtle dark:border-white/15"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}

                {/* Tablet Viewport Icon (768px - 1023px) */}
                <span className="inline-flex lg:hidden items-center justify-center relative z-10">
                  {getNavIcon(link.name)}
                </span>

                {/* CHANGED: Premium Framer Motion Tooltip (Strictly active on tablet breakpoints) */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.92 }}
                      animate={{ opacity: 1, y: 10, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.92 }}
                      transition={{ type: "spring", stiffness: 450, damping: 25 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pointer-events-none hidden md:flex lg:hidden z-50"
                    >
                      <div className="relative px-2.5 py-1 bg-text-primary text-bg-base text-[11px] font-semibold tracking-wide rounded-[6px] shadow-xl border border-border-main whitespace-nowrap">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-text-primary rotate-45 rounded-xs" />
                        {link.name}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Desktop Viewport Text (>= 1024px) */}
                <span className="hidden lg:inline relative z-10">
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 flex-shrink-0 relative z-10">
          <HexagonThemeToggler />
          
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="https://app.nexiacore.shop/login"
              className="text-sm font-bold text-[var(--btn-login-text)] px-1 py-2 transition-colors duration-[var(--transition-duration)] whitespace-nowrap hover:opacity-80"
              target="_blank"
            >
              Sign In
            </Link>
            <Link 
              href="https://app.nexiacore.shop/register"
              className="bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] text-sm font-semibold px-[18px] py-[9px] rounded-lg whitespace-nowrap transition-all duration-[var(--transition-duration)] hover:opacity-90 shadow-md"
              target="_blank"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Animated SVG Hamburger (Mobile) */}
          <button 
            className="flex md:hidden flex-col justify-center items-center gap-[5px] w-9 h-9 p-1 bg-transparent border-none cursor-pointer z-50 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`block w-[22px] h-[2px] bg-text-primary rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`}></span>
            <span className={`block w-[22px] h-[2px] bg-text-primary rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-[22px] h-[2px] bg-text-primary rounded-sm transition-all duration-300 ${isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[var(--mobile-menu-bg)] border-t border-border-main shadow-xl transition-colors duration-[var(--transition-duration)]"
          >
            <div className="flex flex-col px-4 py-3 pb-5 gap-1">
              {NAV_LINKS.filter(link => link.name !== 'Home').map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-[15px] font-semibold p-[10px_12px] rounded-lg transition-colors duration-200
                      ${isActive ? 'bg-[var(--active-bg)] text-text-primary' : 'text-text-muted hover:bg-[var(--active-bg)] hover:text-[var(--navtext-hover-color)]'}
                    `}
                  >
                    {link.name}
                  </a>
                );
              })}
              
              <div className="h-px bg-border-main my-2" />
              
              <div className="flex flex-col gap-3 px-1 mt-1">
                <Link 
                  href="https://app.nexiacore.shop/login"
                  className="w-full text-center py-3 text-sm font-bold text-btn-signin-text border border-border-main rounded-xl transition-colors duration-[var(--transition-duration)] active:opacity-70"
                  target="_blank"
                >
                  Sign In
                </Link>
                <Link 
                  href="https://app.nexiacore.shop/register"
                  className="w-full text-center py-3 text-sm font-bold bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] rounded-xl shadow-md transition-all duration-[var(--transition-duration)] active:scale-[0.98]"
                  target="_blank"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}