'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SmoothAutoHeightProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  ease?: [number, number, number, number];
  animateOpacity?: boolean;
}

/**
 * SmoothAutoHeight: High-performance auto-animating layout container.
 * Automatically animates its height whenever children content, text length,
 * wrapped lines, or child dimensions change.
 * 
 * - Seamlessly transitions from current px height to new px height
 * - Unlocks to height: 'auto' once transition completes to remain responsive
 * - Respects prefers-reduced-motion
 * - Uses ResizeObserver with proper disconnect cleanup
 */
export function SmoothAutoHeight({
  children,
  className = '',
  duration = 0.38,
  ease = [0.16, 1, 0.3, 1],
  animateOpacity = false,
}: SmoothAutoHeightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newHeight = entry.contentRect.height;
        if (newHeight > 0) {
          if (prefersReducedMotion) {
            setHeight('auto');
            return;
          }
          setIsTransitioning(true);
          setHeight(newHeight);
        }
      }
    });

    observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <motion.div
      ref={containerRef}
      style={{ overflow: isTransitioning ? 'hidden' : 'visible' }}
      animate={{
        height: height === 'auto' ? 'auto' : height,
        ...(animateOpacity ? { opacity: 1 } : {}),
      }}
      initial={false}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              height: { duration, ease },
              opacity: { duration: duration * 0.7, ease },
            }
      }
      onAnimationComplete={() => {
        setIsTransitioning(false);
      }}
      className={className}
    >
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </motion.div>
  );
}
