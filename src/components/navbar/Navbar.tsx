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

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    
    // 1. Mobile menu eka close karanawa
    setIsMobileMenuOpen(false); 
    
    // 2. URL eka update karanawa (Premium UX - user ta link eka share karanna puluwan wenna)
    if (href !== '/') {
      window.history.pushState(null, '', href);
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }

    // 3. Event Loop eke next tick ekata scroll eka push karanawa (Fix for mobile scroll drop)
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
    }, 50); // 50ms delay eken menu animation ekayi scroll ekayi gatenne na
  };

  return (
    <nav className={`fixed top-0 inset-x-0 z-[1000] transition-colors duration-[var(--transition-duration)] ${
      scrolled || isMobileMenuOpen 
        ? 'bg-[var(--navbar-bg)] shadow-[var(--navbar-shadow)]' 
        : 'bg-transparent'
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

        {/* Center Pill Nav */}
        <div className="hidden md:flex items-center bg-[var(--pill-bg)] shadow-[var(--pill-shadow)] rounded-full p-1 gap-0.5 transition-colors duration-[var(--transition-duration)] relative z-10">
          {NAV_LINKS.filter(link => link.name !== 'Home').map((link) => {
            const isActive = activeSection === link.href.substring(1);
            
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-[7px] rounded-full text-sm whitespace-nowrap transition-colors duration-200 z-10
                  ${isActive 
                    ? 'text-text-primary font-semibold' 
                    : 'text-text-muted font-medium hover:text-[var(--navtext-hover-color)]'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-[var(--active-bg)] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.12)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.4)] border border-border-subtle"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
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