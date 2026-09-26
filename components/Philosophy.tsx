'use client';

import React from 'react';
import { ShieldCheck, Compass, Clock, Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { VasthuMandala } from '@/components/VasthuMandala';

export function Philosophy() {
  return (
    <section id="philosophy" className="py-16 sm:py-28 bg-[#ECE7DF] text-[#1C1A17] border-b border-[#D8D0C2] relative overflow-hidden">
      {/* Ambient Atmospheric Glows for Glass Refraction */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#B8936D]/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#C89D6A]/10 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-[#B8936D]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="pb-8 mb-12 text-center flex flex-col items-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-[#B8936D] text-[9px] tracking-[0.3em] uppercase font-bold mb-4">
            <span className="w-2.5 h-px bg-[#B8936D]" />
            <span>ABOUT SOUL SPACE INFRASTRUCTURE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#181714] tracking-[-0.03em] font-normal mb-6">
            Quality, Time &amp; Safety
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5346] leading-relaxed font-light text-center">
            In 2016, Soulspace Infrastructure was established as a small construction company which dealt in civil construction. It grew up to become Soul Space. We have always believed that quality, time and safety are the top most priority. Our focus is on quality work, functionality and value, emphasizing a hands-on management style and personal attention to clients.
          </p>
        </ScrollReveal>

        {/* 4 Architectural Pillars Grid with Exact Space Consistency & Luxury Card Presentation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 sm:mb-20 pt-10 border-t border-[#D5CDBF]">
          <ScrollReveal delay={0.05} className="h-full">
            <div className="group p-7 sm:p-8 rounded-2xl bg-[#FAF8F4] border border-[#DCD5C8] shadow-none flex flex-col items-center text-center justify-start h-full transition-all duration-300 hover:border-[#CBB8A0]">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#DCD5C8] flex items-center justify-center text-[#B8936D] shadow-none shrink-0 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-[19px] text-[#181714] font-normal leading-snug tracking-tight mb-3">
                Structural Integrity
              </h3>
              <p className="text-xs sm:text-[13px] text-[#5C5346] leading-relaxed font-light text-center">
                M25/M30 grade concrete, certified steel tensile checks, and precision soil-bearing foundation analysis for generational durability.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="h-full">
            <div className="group p-7 sm:p-8 rounded-2xl bg-[#FAF8F4] border border-[#DCD5C8] shadow-none flex flex-col items-center text-center justify-start h-full transition-all duration-300 hover:border-[#CBB8A0]">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#DCD5C8] flex items-center justify-center text-[#B8936D] shadow-none shrink-0 mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-[19px] text-[#181714] font-normal leading-snug tracking-tight mb-3">
                Vasthu &amp; Natural Light
              </h3>
              <p className="text-xs sm:text-[13px] text-[#5C5346] leading-relaxed font-light text-center">
                100% Manaiyadi Shastra spatial harmony, maximizing natural cross-ventilation, morning solar ingress, and positive energy flow.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25} className="h-full">
            <div className="group p-7 sm:p-8 rounded-2xl bg-[#FAF8F4] border border-[#DCD5C8] shadow-none flex flex-col items-center text-center justify-start h-full transition-all duration-300 hover:border-[#CBB8A0]">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#DCD5C8] flex items-center justify-center text-[#B8936D] shadow-none shrink-0 mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-[19px] text-[#181714] font-normal leading-snug tracking-tight mb-3">
                Punctual Delivery
              </h3>
              <p className="text-xs sm:text-[13px] text-[#5C5346] leading-relaxed font-light text-center">
                Direct partner site leadership and systematic project scheduling to ensure on-time handovers without compromise.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.35} className="h-full">
            <div className="group p-7 sm:p-8 rounded-2xl bg-[#FAF8F4] border border-[#DCD5C8] shadow-none flex flex-col items-center text-center justify-start h-full transition-all duration-300 hover:border-[#CBB8A0]">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#DCD5C8] flex items-center justify-center text-[#B8936D] shadow-none shrink-0 mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-[19px] text-[#181714] font-normal leading-snug tracking-tight mb-3">
                Premium Materiality
              </h3>
              <p className="text-xs sm:text-[13px] text-[#5C5346] leading-relaxed font-light text-center">
                Seasoned teakwood joinery, Kohler/Roca fittings, Legrand electricals, and Post-Tensioned (PT) commercial floor plates.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Authentic Tamil Vasthu & Manaiyadi Shastra Interactive Suite */}
        <ScrollReveal yOffset={36}>
          <VasthuMandala />
        </ScrollReveal>
      </div>
    </section>
  );
}
