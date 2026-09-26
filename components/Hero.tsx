'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenProject: (projectId: string) => void;
  onExploreWorks: () => void;
}

export function Hero({ onOpenProject, onExploreWorks }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Purge any stale client image from localStorage to ensure clean transparent logo
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('soulspace_client_images');
        if (raw) {
          const map = JSON.parse(raw);
          if (map['logo_img_01']) {
            delete map['logo_img_01'];
            localStorage.setItem('soulspace_client_images', JSON.stringify(map));
          }
        }
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[calc(100vh-76px)] flex flex-col items-center justify-center bg-[#FAF8F5] pt-10 pb-18 sm:py-20 lg:py-24 overflow-hidden scroll-mt-20"
    >
      {/* Subtle Architectural Background Grid */}
      <div className="absolute inset-0 bg-grid-architectural opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full flex flex-col items-center justify-center z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center w-full">
          {/* Brand Anchor: Logo Mark on Top (Bigger), Logo Words Below */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center mb-6 sm:mb-8 text-center select-none pointer-events-none"
          >
            {/* Logo Mark - Bigger, Completely Still on Hover, Zero Background */}
            <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3 sm:mb-3.5 pointer-events-none bg-transparent">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo-mark.png"
                alt="Soul Space Infrastructure Logo Mark"
                className="w-full h-full object-contain pointer-events-none bg-transparent"
              />
            </div>

            {/* Logo Words Below Logo Mark */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 leading-none">
              <span className="font-serif text-2xl sm:text-3xl md:text-[34px] text-[#181715] font-normal tracking-[-0.015em] whitespace-nowrap">
                SOUL SPACE
              </span>
              <span
                className="font-sans font-thin text-base sm:text-lg md:text-xl text-[#B8936D] opacity-60 select-none -translate-y-[1px] shrink-0"
                aria-hidden="true"
              >
                |
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] md:text-[12px] font-light uppercase tracking-[0.28em] text-[#7D7364] whitespace-nowrap pt-[2px]">
                INFRASTRUCTURE
              </span>
            </div>
          </motion.div>

          {/* Centered Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: '40px',
              marginLeft: '8px',
              marginTop: '-28px',
            }}
            className="font-serif max-sm:!text-2xl max-md:!text-3xl text-[#1A1815] font-normal tracking-[-0.025em] text-center w-full max-w-4xl mx-auto leading-snug sm:leading-tight px-2"
          >
            Crafting Spaces with Quality,{' '}
            <span className="italic text-[#B8936D] font-normal">&amp; Enduring Value.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: '14px',
              lineHeight: '23px',
            }}
            className="text-[#645D52] max-w-xl mx-auto font-light text-center px-4 mt-3 sm:mt-4"
          >
            Exclusive luxury residences, gated villa enclaves, and landmark commercial IT workspaces across Coimbatore.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
