'use client';

import React, { useEffect } from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'nav' | 'banner' | 'footer' | 'drawer';
  theme?: 'light' | 'dark';
  animated?: boolean;
}

export function BrandLogo({ 
  className = '', 
  variant = 'nav',
  theme = 'light',
  animated = false,
}: BrandLogoProps) {
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

  const isDark = theme === 'dark';

  // Colors matching the exact brand lockup:
  // Primary serif text: deep charcoal in light mode, off-white in dark mode
  const titleColor = isDark ? 'text-[#FAF8F5]' : 'text-[#1A1815] group-hover:text-[#B8936D]';
  // Vertical divider line: warm architectural sand/gold
  const dividerBg = isDark ? 'bg-[#C8B195]/60' : 'bg-[#C8B195]';
  // Subtitle sans-serif text: warm muted taupe/stone
  const subtitleColor = isDark ? 'text-[#A69B8D]' : 'text-[#7D7364]';
  // Logo image: transparent PNG - zero background, completely stationary on hover
  const logoFilter = isDark ? 'brightness-0 invert opacity-90' : '';
  const logoMarkSrc = '/brand/logo-mark.png';
  const animatedMarkClass = isDark ? 'animate-flow-light-glide-mask-dark' : 'animate-flow-light-glide-mask';
  const animatedTextClass = isDark ? 'animate-flow-light-glide-dark' : 'animate-flow-light-glide';

  // Variant: Navigation Header (compact, perfectly balanced, responsive)
  if (variant === 'nav') {
    return (
      <div 
        style={{ fontSize: '16px' }}
        className={`flex items-center gap-2 sm:gap-2.5 lg:gap-3 select-none text-[16px] bg-transparent ${className}`}
      >
        {/* Logo Mark Image at Left Side - Completely Still on Hover, Zero Background */}
        <div className="relative shrink-0 flex items-center justify-center pointer-events-none bg-transparent">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoMarkSrc}
            alt="Soul Space Logo Mark"
            className={`h-7 w-7 sm:h-8 sm:w-8 md:h-[34px] md:w-[34px] object-contain pointer-events-none bg-transparent ${logoFilter}`}
          />
          {animated && (
            <div 
              className={`absolute inset-0 ${animatedMarkClass} pointer-events-none bg-transparent`}
              style={{
                WebkitMaskImage: `url(${logoMarkSrc})`,
                maskImage: `url(${logoMarkSrc})`,
              }}
            />
          )}
        </div>

        {/* Text Lockup - Hidden strictly on mobile only */}
        <div className={`hidden sm:flex items-center gap-2 sm:gap-2.5 lg:gap-3 bg-transparent ${animated ? animatedTextClass : ''}`}>
          <span 
            style={{ fontSize: '30px' }}
            className={`font-serif text-[24px] sm:text-[28px] md:text-[30px] tracking-[-0.01em] font-medium leading-none whitespace-nowrap transition-colors duration-300 ${titleColor}`}
          >
            SOUL SPACE
          </span>
          <div className={`h-5 sm:h-6 w-[1px] shrink-0 self-center ${dividerBg}`} />
          <span 
            style={{ fontSize: '13px' }}
            className={`font-sans text-[10.5px] sm:text-[12px] md:text-[13px] tracking-[0.26em] uppercase font-light leading-none whitespace-nowrap pt-[1px] ${subtitleColor}`}
          >
            INFRASTRUCTURE
          </span>
        </div>
      </div>
    );
  }

  // Variant: Drawer Menu (clean, high legibility)
  if (variant === 'drawer') {
    return (
      <div className={`flex items-center gap-2 sm:gap-2.5 select-none bg-transparent ${className}`}>
        <div className="relative shrink-0 flex items-center justify-center bg-transparent">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoMarkSrc}
            alt="Soul Space Logo Mark"
            className={`h-6 w-6 sm:h-7 sm:w-7 object-contain bg-transparent ${logoFilter}`}
          />
          {animated && (
            <div 
              className={`absolute inset-0 ${animatedMarkClass} pointer-events-none bg-transparent`}
              style={{
                WebkitMaskImage: `url(${logoMarkSrc})`,
                maskImage: `url(${logoMarkSrc})`,
              }}
            />
          )}
        </div>
        <div className={`flex items-center gap-2 sm:gap-2.5 bg-transparent ${animated ? animatedTextClass : ''}`}>
          <span className={`font-serif text-xl sm:text-2xl tracking-[-0.01em] font-medium leading-none whitespace-nowrap ${titleColor}`}>
            SOUL SPACE
          </span>
          <div className={`h-5 w-[1px] shrink-0 self-center ${dividerBg}`} />
          <span className={`font-sans text-[9px] sm:text-[10px] tracking-[0.26em] uppercase font-light leading-none whitespace-nowrap pt-[1px] ${subtitleColor}`}>
            INFRASTRUCTURE
          </span>
        </div>
      </div>
    );
  }

  // Variant: Footer
  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3 select-none bg-transparent ${className}`}>
        <div className="relative shrink-0 flex items-center justify-center bg-transparent">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoMarkSrc}
            alt="Soul Space Logo Mark"
            className={`h-8 w-8 sm:h-9 sm:w-9 object-contain bg-transparent ${logoFilter}`}
          />
          {animated && (
            <div 
              className={`absolute inset-0 ${animatedMarkClass} pointer-events-none bg-transparent`}
              style={{
                WebkitMaskImage: `url(${logoMarkSrc})`,
                maskImage: `url(${logoMarkSrc})`,
              }}
            />
          )}
        </div>
        <div className={`flex items-center gap-2.5 sm:gap-3 bg-transparent ${animated ? animatedTextClass : ''}`}>
          <span className={`font-serif text-2xl sm:text-3xl tracking-[-0.01em] font-normal leading-none text-[#181714] whitespace-nowrap`}>
            SOUL SPACE
          </span>
          <div className="h-5 sm:h-6 w-[1px] bg-[#C8B195] shrink-0 self-center" />
          <span className="font-sans text-[9.5px] sm:text-[11px] tracking-[0.28em] uppercase font-light text-[#7D7364] leading-none whitespace-nowrap pt-[1px]">
            INFRASTRUCTURE
          </span>
        </div>
      </div>
    );
  }

  // Default Variant: Large Hero / Identity Banner Lockup
  return (
    <div className={`flex items-center gap-3 sm:gap-4.5 select-none bg-transparent ${className}`}>
      <div className="relative shrink-0 flex items-center justify-center bg-transparent">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoMarkSrc}
          alt="Soul Space Logo Mark"
          className={`h-10 w-10 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain bg-transparent ${logoFilter}`}
        />
        {animated && (
          <div 
            className={`absolute inset-0 ${animatedMarkClass} pointer-events-none bg-transparent`}
            style={{
              WebkitMaskImage: `url(${logoMarkSrc})`,
              maskImage: `url(${logoMarkSrc})`,
            }}
          />
        )}
      </div>
      <div className={`flex items-center gap-2.5 sm:gap-4 bg-transparent ${animated ? animatedTextClass : ''}`}>
        <span className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-[-0.02em] font-medium leading-none text-[#1A1815] whitespace-nowrap">
          SOUL SPACE
        </span>
        <div className="h-7 sm:h-11 lg:h-13 w-[1px] bg-[#C8B195] shrink-0 self-center mx-0.5 sm:mx-1" />
        <span className="font-sans text-xs sm:text-sm lg:text-base tracking-[0.3em] uppercase font-light text-[#7D7364] leading-none whitespace-nowrap pt-[2px]">
          INFRASTRUCTURE
        </span>
      </div>
    </div>
  );
}
