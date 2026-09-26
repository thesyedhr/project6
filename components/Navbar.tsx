'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Layers, Send, Phone, MapPin, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '@/data/projects';
import { useScrollLock } from '@/lib/scrollLock';
import { BrandLogo } from '@/components/BrandLogo';

interface NavbarProps {
  onOpenProject: (projectId: string) => void;
  onOpenCommission: () => void;
}

export function Navbar({ onOpenProject, onOpenCommission }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasScrolledPastTop, setHasScrolledPastTop] = useState(false);
  const lastScrollY = React.useRef(0);
  const accumulatedScroll = React.useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [indexDrawerOpen, setIndexDrawerOpen] = useState(false);

  // Lock background scroll when floating sections/drawers are open
  useScrollLock(mobileMenuOpen || indexDrawerOpen);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      const threshold = 120; // "Noticeable level" in pixels

      setHasScrolledPastTop(currentScrollY > 20);

      // If at the absolute top, always show the full header
      if (currentScrollY <= 50) {
        setIsScrolled(false);
        accumulatedScroll.current = 0;
      } else {
        // Track accumulation for directional switching
        // We only care about delta if it's in the direction of changing the state
        setIsScrolled(prev => {
          if (delta > 0 && !prev) {
            // Scrolling down while full -> accumulation towards compact
            accumulatedScroll.current += delta;
            if (accumulatedScroll.current > threshold) {
              accumulatedScroll.current = 0;
              return true;
            }
          } else if (delta < 0 && prev) {
            // Scrolling up while compact -> accumulation towards full
            accumulatedScroll.current += Math.abs(delta);
            if (accumulatedScroll.current > threshold) {
              accumulatedScroll.current = 0;
              return false;
            }
          } else if ((delta < 0 && !prev) || (delta > 0 && prev)) {
            // Scrolling further in the direction we already are (down when compact, up when full)
            // Reset accumulation
            accumulatedScroll.current = 0;
          }
          return prev;
        });
      }
      
      lastScrollY.current = currentScrollY;
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setIndexDrawerOpen(false);
    if (id === 'hero') {
      if (typeof window !== 'undefined') {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -70, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // High-end spring transitions
  const springConfig = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 } as const;
  const fadeConfig = { duration: 0.5, ease: [0.16, 1, 0.3, 1] } as const;

  return (
    <>
      {/* =========================================================================================
          CRITICAL MANDATORY SYSTEM COMPONENT: VISIBLE FROSTED GLASSMORPHIC NAVBAR HEADER
          =========================================================================================
          IMPORTANT: Visible blur & glassmorphism must always remain active on this header.
          ========================================================================================= */}
      <header
        id="main-navigation"
        className={`sticky top-0 z-50 py-3 sm:py-4 transition-all duration-300 border-none ${
          hasScrolledPastTop
            ? 'glassmorphic-header'
            : 'glassmorphic-header-top'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-10 relative">
          {/* Logo Left - Always visible and clickable */}
          <div className="flex items-center z-20 shrink-0">
            <button
              onClick={() => scrollTo('hero')}
              className="text-left group cursor-pointer focus:outline-hidden shrink-0 flex items-center bg-transparent border-none shadow-none p-0"
              id="brand-home-link"
              aria-label="Soul Space Infrastructure Home"
            >
              <BrandLogo variant="nav" />
            </button>
          </div>

          {/* Desktop Nav Links Container */}
          <nav
            style={{ fontSize: '13px' }}
            className="hidden min-[1800px]:flex items-center space-x-6 xl:space-x-8 tracking-[0.14em] uppercase text-[#1D1B18] font-medium absolute left-1/2 -translate-x-1/2"
          >
            <button
              onClick={() => scrollTo('works')}
              className="hover:text-[#B8936D] transition-colors cursor-pointer py-1.5 px-1 whitespace-nowrap"
              id="nav-works-link"
            >
              <span>Projects</span>
            </button>
            <button
              onClick={() => scrollTo('philosophy')}
              className="hover:text-[#B8936D] transition-colors cursor-pointer py-1.5 px-1 whitespace-nowrap"
              id="nav-philosophy-link"
            >
              <span>Philosophy</span>
            </button>
            <button
              onClick={() => scrollTo('materiality')}
              className="hover:text-[#B8936D] transition-colors cursor-pointer py-1.5 px-1 whitespace-nowrap"
              id="nav-materiality-link"
            >
              <span>Materiality</span>
            </button>
            <button
              onClick={() => scrollTo('services')}
              className="hover:text-[#B8936D] transition-colors cursor-pointer py-1.5 px-1 whitespace-nowrap"
              id="nav-services-link"
            >
              <span>Services</span>
            </button>
            <button
              onClick={() => scrollTo('journal')}
              className="hover:text-[#B8936D] transition-colors cursor-pointer py-1.5 px-1 whitespace-nowrap"
              id="nav-journal-link"
            >
              <span>Journal</span>
            </button>
          </nav>

          {/* Right Section: Project Inquiry (Desktop/Tablet only) + Mobile Menu Toggle (Always accessible) */}
          <div className="flex items-center gap-x-3 shrink-0 z-20">
            {/* Project Inquiry Button - Strictly hidden on mobile, visible on sm: and up */}
            <button
              onClick={() => onOpenCommission()}
              style={{ height: '36.5052px' }}
              className="hidden sm:flex items-center gap-2 px-4 text-[11px] tracking-[0.2em] uppercase font-semibold bg-[#181715] text-white rounded-full transition-all cursor-pointer border border-[#2D2A26] hover:border-[#CBB8A0] shadow-none whitespace-nowrap group"
              id="nav-project-inquiry-btn"
            >
              <Send className="w-3.5 h-3.5 text-white/90" />
              <span style={{ fontSize: '11px' }}>Project Inquiry</span>
            </button>

            {/* Mobile Menu Toggle Button - Always available on screens below 1800px */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-[1800px]:hidden p-2 text-[#1D1B18] hover:text-[#B8936D] focus:outline-hidden cursor-pointer transition-colors bg-[#FAF8F5]/80 sm:bg-transparent rounded-full border border-[#E5DFD4] sm:border-none shadow-none flex items-center justify-center"
              id="mobile-nav-toggle-btn"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Centered Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 min-[1800px]:hidden z-50 bg-black/45 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overscroll-contain"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="bg-[#FAF8F5] text-[#181714] w-full max-w-[410px] sm:max-w-[430px] p-6 sm:p-8 flex flex-col items-center text-center border border-[#DCD5C8] rounded-2xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button Top Right */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#7D7364] hover:text-[#181714] hover:bg-[#EFECE5] rounded-full transition-colors cursor-pointer"
                id="mobile-menu-close-btn"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Brand Logo Centered */}
              <div className="flex flex-col items-center text-center pt-2 pb-5 border-b border-[#E5DFD4] w-full">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollTo('hero');
                  }}
                  className="cursor-pointer focus:outline-hidden"
                  aria-label="Scroll to top"
                  id="drawer-brand-logo-link"
                >
                  <BrandLogo variant="drawer" theme="light" />
                </button>
                <p className="text-[9.5px] tracking-[0.24em] text-[#7D7364] uppercase mt-2 font-sans font-medium">
                  Coimbatore · Since 2016
                </p>
              </div>

              {/* Navigation Links Centered */}
              <div className="flex flex-col items-center justify-center space-y-3.5 py-6 w-full">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollTo('works');
                  }}
                  className="text-center font-serif text-2xl sm:text-3xl text-[#181714] hover:text-[#B8936D] transition-colors cursor-pointer w-full py-0.5 tracking-[-0.01em]"
                  id="mobile-link-works"
                >
                  Projects
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollTo('philosophy');
                  }}
                  className="text-center font-serif text-2xl sm:text-3xl text-[#181714] hover:text-[#B8936D] transition-colors cursor-pointer w-full py-0.5 tracking-[-0.01em]"
                  id="mobile-link-philosophy"
                >
                  Philosophy
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollTo('materiality');
                  }}
                  className="text-center font-serif text-2xl sm:text-3xl text-[#181714] hover:text-[#B8936D] transition-colors cursor-pointer w-full py-0.5 tracking-[-0.01em]"
                  id="mobile-link-materiality"
                >
                  Materiality
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollTo('journal');
                  }}
                  className="text-center font-serif text-2xl sm:text-3xl text-[#181714] hover:text-[#B8936D] transition-colors cursor-pointer w-full py-0.5 tracking-[-0.01em]"
                  id="mobile-link-journal"
                >
                  Journal
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollTo('services');
                  }}
                  className="text-center font-serif text-2xl sm:text-3xl text-[#181714] hover:text-[#B8936D] transition-colors cursor-pointer w-full py-0.5 tracking-[-0.01em]"
                  id="mobile-link-services"
                >
                  Services
                </button>
              </div>

              {/* Inquire CTA & Contacts Centered */}
              <div className="border-t border-[#E5DFD4] pt-5 space-y-3.5 w-full flex flex-col items-center text-center">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommission();
                  }}
                  className="w-full py-3 bg-[#181715] hover:bg-[#282420] text-[#FAF8F5] font-semibold tracking-[0.18em] uppercase text-[11px] rounded-full border border-[#2D2A26] hover:border-[#CBB8A0] transition-colors flex items-center justify-center gap-2.5 cursor-pointer shadow-none"
                  id="mobile-commission-btn"
                >
                  <span>Project Inquiry</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                </button>

                <div className="flex flex-col items-center justify-center gap-2 text-center text-[11px] text-[#5C5346] w-full pt-1">
                  {/* Direct Phone Call Link */}
                  <a
                    href="tel:+919677771331"
                    className="inline-flex items-center gap-1.5 font-medium text-[#181714] hover:text-[#B8936D] transition-colors py-0.5"
                    aria-label="Call +91 96777 71331"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B8936D]" />
                    <span>+91 96777 71331</span>
                  </a>

                  {/* WhatsApp Direct Chat Link below phone */}
                  <a
                    href="https://wa.me/919677771331?text=Hello%20Soul%20Space%20Infrastructure%2C%20I%20would%20like%20to%20inquire%20about%20your%20projects."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10.5px] font-medium text-[#181714] hover:text-[#B8936D] transition-colors py-0.5"
                    aria-label="Chat on WhatsApp +91 96777 71331"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#B8936D]" />
                    <span>WhatsApp: +91 96777 71331</span>
                  </a>

                  {/* Location Linked to Google Maps */}
                  <a
                    href="https://maps.google.com/?q=Coimbatore,+Tamil+Nadu,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase text-[#7D7364] hover:text-[#B8936D] transition-colors pt-0.5"
                    aria-label="View Coimbatore location on Google Maps"
                  >
                    <MapPin className="w-3 h-3 text-[#B8936D]" />
                    <span>Coimbatore, Tamil Nadu</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Archive Centered Index Modal */}
      <AnimatePresence>
        {indexDrawerOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overscroll-contain"
            onClick={() => setIndexDrawerOpen(false)}
          >
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-[#ECE7DF] text-[#1C1A17] w-full max-w-2xl max-h-[85vh] overflow-y-auto overscroll-contain p-6 sm:p-10 flex flex-col border border-[#D8D0C2] rounded-xl shadow-none relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#D5CDBF] pb-6 mb-8">
                  <div>
                    <div className="flex items-center gap-2 text-[#B8936D] text-[11px] tracking-[0.2em] uppercase font-semibold">
                      <Layers className="w-4 h-4" />
                      <span>ARCHIVAL CATALOG INDEX</span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#181714] mt-1 font-normal">All Built Monoliths</h3>
                  </div>
                  <button
                    onClick={() => setIndexDrawerOpen(false)}
                    className="p-2 text-[#6E6457] hover:text-[#181714] rounded-full bg-[#E8E2D7] border border-[#DDD5C7] hover:border-[#CBB8A0] transition-colors cursor-pointer"
                    aria-label="Close archive drawer"
                    id="close-index-drawer-btn"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-xs text-[#5C5346] mb-6 leading-relaxed font-light">
                  Comprehensive index of residential enclaves, luxury villas, and commercial IT developments by Soul Space Infrastructure.
                </p>

                <div className="space-y-3">
                  {PROJECTS.map((p) => (
                    <div
                      key={p.id}
                      className="w-full text-left p-4 border border-[#DCD5C8] hover:border-[#CBB8A0] bg-[#FAF8F4] rounded-xl transition-all group shadow-none"
                      id={`index-item-${p.id}`}
                    >
                      <div className="flex items-center justify-between text-[11px] text-[#786E5F] tracking-widest uppercase mb-1 font-medium">
                        <span className="font-sans text-[#B8936D] font-medium">{p.typologyLabel}</span>
                        <span>{p.location}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            setIndexDrawerOpen(false);
                            onOpenProject(p.id);
                          }}
                          className="font-serif text-lg text-[#181714] group-hover:text-black transition-colors font-normal text-left cursor-pointer"
                        >
                          {p.title}
                        </button>
                        <Link
                          href={`/projects/${p.id}`}
                          onClick={() => setIndexDrawerOpen(false)}
                          className="text-[10px] font-sans uppercase tracking-widest text-white px-3 py-1 rounded-full bg-[#181715] border border-[#2D2A26] hover:border-[#CBB8A0] flex items-center gap-1 transition-colors font-medium shadow-none"
                        >
                          <span>Full Page</span>
                          <ArrowUpRight className="w-3 h-3 text-white" />
                        </Link>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#786E5F] mt-2 pt-2 border-t border-[#E5DFD4]">
                        <span>{p.typologyLabel}</span>
                        <span className="font-sans">{p.areaM2} m² · {p.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[#D5CDBF] mt-8 flex items-center justify-between text-xs text-[#6E6457]">
                <span>Soul Space Infrastructure Archives</span>
                <button
                  onClick={() => {
                    setIndexDrawerOpen(false);
                    scrollTo('works');
                  }}
                  className="text-[#B8936D] hover:underline uppercase tracking-widest text-[10px] font-semibold cursor-pointer"
                >
                  View Full Canvas &rarr;
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
