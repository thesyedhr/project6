'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';

export function AboutSummarySection() {
  return (
    <section 
      id="about-summary" 
      className="w-full bg-[#FAF8F5] border-b border-[#E5DFD4] flex flex-col items-center justify-center py-14 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
        <ScrollReveal className="flex flex-col items-center text-center space-y-6 sm:space-y-8 md:space-y-10 w-full">
          {/* Centered Heading and Paragraph */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 text-center max-w-4xl mx-auto w-full">
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[46px] text-[#141311] font-normal leading-snug sm:leading-tight lg:leading-[1.22] text-center tracking-[-0.02em]">
              Quality, Time &amp; Safety — <br className="hidden sm:inline" />
              <span className="italic text-[#B8936D]">Hands-On Civil Construction Precision.</span>
            </h2>

            <p className="text-xs sm:text-sm md:text-[15px] text-[#524B40] font-light leading-relaxed text-center max-w-3xl mx-auto">
              Established in 2016 as a civil construction practice in Coimbatore, Soul Space Infrastructure has grown into a trusted mid-level builder. <br className="hidden md:inline" />
              Driven by quality, timeliness, and safety, we emphasize hands-on management style and personal attention to every client.
            </p>
          </div>

          {/* Centered Link / Button Below the Text */}
          <div className="flex items-center justify-center pt-1">
            <Link
              href="/about"
              className="font-serif italic font-normal text-lg sm:text-xl md:text-2xl text-[#524B40] hover:text-[#B8936D] transition-colors cursor-pointer text-center tracking-[-0.01em] leading-none no-underline hover:no-underline"
              id="about-section-wanna-know-more-btn"
            >
              Wanna know more?
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

