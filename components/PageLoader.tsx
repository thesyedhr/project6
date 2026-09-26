'use client';

/* ==============================================================================================
   CRITICAL MANDATORY SYSTEM COMPONENT: PAGE LOADER & LUXURY BRAND PRELOADER
   ==============================================================================================
   IMPORTANT NOTICE:
   Do NOT remove, disable, bypass, or change the default visibility logic of this component.
   This component provides:
   1. Initial site launch preloader with signature continuous champagne light glide across
      the SOUL SPACE | INFRASTRUCTURE brand lockup.
   2. Seamless client-side route transition loader on navigation across pages.
   3. Auto-unlock safeguards guaranteeing zero scroll lock hangs.
   ============================================================================================== */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

// Exact duration of 1 full completed animation cycle passing through the logo, SOUL SPACE, and through INFRASTRUCTURE (2.6s)
export const ANIMATION_CYCLE_DURATION = 2600;
// Minimum initial brand intro display duration on first site visit/refresh
export const INITIAL_LOAD_MIN_DURATION = 1600;

/**
 * Reusable animated luxury brand display with continuous light glide across both mark and typography.
 * Smoothly loops seamlessly via pure hardware-accelerated CSS keyframes at constant speed.
 */
export function LoadingBrandDisplay() {
  const logoSrc = '/brand/logo-mark.png';

  return (
    <div className="inline-flex items-center gap-3 sm:gap-4 md:gap-5 select-none py-3 px-2 leading-none pointer-events-none">
      {/* Animated Logo Mark Image at Left Side - Zero background, rock-solid stationary */}
      <div className="relative shrink-0 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 pointer-events-none">
        {/* Base structural mark - always crisp solid dark charcoal */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="Soul Space Logo Mark"
          className="w-full h-full object-contain pointer-events-none bg-transparent"
        />
        {/* Continuous light glide mask, running in unified single coordinate flow */}
        <div
          className="absolute inset-0 animate-flow-light-glide-mask pointer-events-none"
          style={{
            WebkitMaskImage: `url(${logoSrc})`,
            maskImage: `url(${logoSrc})`,
          }}
        />
      </div>

      {/* Typography with unified single continuous light glide running simultaneously */}
      <div className="animate-flow-light-glide inline-flex items-center gap-2 sm:gap-3 md:gap-3.5 select-none leading-none">
        <span className="font-serif text-[28px] sm:text-[38px] md:text-[46px] font-normal tracking-[-0.015em] whitespace-nowrap">
          SOUL SPACE
        </span>
        <span
          className="font-sans font-thin text-[18px] sm:text-[24px] md:text-[30px] opacity-40 select-none -translate-y-[1px] shrink-0"
          aria-hidden="true"
        >
          |
        </span>
        <span className="font-sans text-[10px] sm:text-[12px] md:text-[14px] font-light uppercase tracking-[0.28em] whitespace-nowrap opacity-85 pt-[2px]">
          INFRASTRUCTURE
        </span>
      </div>
    </div>
  );
}

/**
 * Programmatic helper to trigger the page transition loader from any component.
 */
export function navigateWithLoader(url: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('soulspace-navigate', { detail: { url } }));
  }
}

export function usePageTransition() {
  return {
    navigate: navigateWithLoader,
  };
}

export function PageLoader() {
  const pathname = usePathname();
  const router = useRouter();

  // Initial visit starts visible to ensure signature brand welcome experience
  const [isVisible, setIsVisible] = useState(true);
  const [loaderKey, setLoaderKey] = useState(0);

  const initialLoadDoneRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isNavigatingRef = useRef<boolean>(false);
  const currentPathRef = useRef<string>(pathname);

  // Clean dismissal helper
  const dismissLoader = useCallback((delay = 300) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = setTimeout(() => {
      setIsVisible(false);
      isNavigatingRef.current = false;
      document.body.style.overflow = '';
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current);
        safetyTimerRef.current = null;
      }
    }, delay);
  }, []);

  // 1. Initial Page Mount: Run the brand intro animation then smoothly dismiss
  useEffect(() => {
    // Lock scroll during initial preloader
    document.body.style.overflow = 'hidden';

    const initialTimer = setTimeout(() => {
      initialLoadDoneRef.current = true;
      dismissLoader(0);
    }, INITIAL_LOAD_MIN_DURATION);

    return () => {
      clearTimeout(initialTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      document.body.style.overflow = '';
    };
  }, [dismissLoader]);

  // 2. When pathname changes (route transition completed): dismiss loader
  useEffect(() => {
    if (initialLoadDoneRef.current) {
      currentPathRef.current = pathname;
      dismissLoader(250);
    }
  }, [pathname, dismissLoader]);

  // 3. Initiate a new page transition on explicit navigation trigger:
  const startPageTransition = useCallback(
    (targetHref: string) => {
      let targetPath = targetHref;
      try {
        const parsed = new URL(targetHref, window.location.href);
        targetPath = parsed.pathname;
      } catch {
        // fallback
      }

      // If already on target path, do nothing
      if (targetPath === window.location.pathname) {
        return;
      }

      isNavigatingRef.current = true;
      setLoaderKey((prev) => prev + 1);
      setIsVisible(true);
      document.body.style.overflow = 'hidden';

      // Safety timeout: dismiss after 1.5s max so user is never trapped
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = setTimeout(() => {
        dismissLoader(0);
      }, 1500);

      // Trigger Next.js client-side navigation
      try {
        router.push(targetHref);
      } catch {
        window.location.href = targetHref;
      }
    },
    [router, dismissLoader]
  );

  // 4. Intercept clicks on internal navigation links to smoothly trigger the loader
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Find nearest anchor tag
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');
      const download = target.getAttribute('download');

      // Ignore external links, downloads, new tabs, tel:, mailto:, and in-page anchor hash links
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        targetAttr === '_blank' ||
        download !== null ||
        e.defaultPrevented ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      try {
        const url = new URL(href, window.location.href);
        // Only trigger for same-origin navigation to a different pathname
        if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
          setLoaderKey((prev) => prev + 1);
          setIsVisible(true);
          document.body.style.overflow = 'hidden';

          // Safety timeout
          if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
          safetyTimerRef.current = setTimeout(() => {
            dismissLoader(0);
          }, 1500);
        }
      } catch {
        // ignore invalid url
      }
    };

    document.addEventListener('click', handleLinkClick, { capture: true });
    return () => document.removeEventListener('click', handleLinkClick, { capture: true });
  }, [dismissLoader]);

  // 5. Listen to custom navigation events
  useEffect(() => {
    const handleCustomNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{ url: string }>;
      if (customEvent.detail?.url) {
        startPageTransition(customEvent.detail.url);
      }
    };
    window.addEventListener('soulspace-navigate', handleCustomNavigate);
    return () => window.removeEventListener('soulspace-navigate', handleCustomNavigate);
  }, [startPageTransition]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="soul-space-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { ease: [0.16, 1, 0.3, 1], duration: 0.45 },
          }}
          onAnimationComplete={() => {
            if (!isVisible) {
              document.body.style.overflow = '';
            }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F7F5F0] text-[#1D1B18] select-none overflow-hidden"
          id="global-page-loader"
        >
          {/* Centered brand lockup with single continuous uniform light glide */}
          <div className="flex items-center justify-center px-6 pointer-events-none">
            <LoadingBrandDisplay key={`brand-display-${loaderKey}`} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
