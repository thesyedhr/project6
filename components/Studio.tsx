'use client';

import React from 'react';
import { Award, ShieldCheck, Clock, CheckCircle2, MapPin } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

export function Studio() {
  const pillars = [
    {
      title: 'Quality First',
      desc: 'We never compromise with the quality of work delivered. From M25 concrete foundations to branded fittings from Kohler, Roca, and Legrand, every detail is built to last.',
      icon: ShieldCheck,
    },
    {
      title: 'Punctual Delivery',
      desc: 'We set realistic, disciplined targets that ensure projects finish on schedule without cutting corners, giving our clients total peace of mind.',
      icon: Clock,
    },
    {
      title: 'Safety & Compliance',
      desc: '100% earthquake-resistant RCC designs, 100% Vasthu & Manaiyadi compliance, and rigorous site worker safety protocols on every construction site.',
      icon: Award,
    },
    {
      title: 'Hands-On Management',
      desc: 'Our leadership emphasizes direct personal attention to every client, bridging the gap between vision and on-site engineering execution.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-28 bg-[#FAF8F4] border-b border-[#E3DCCF] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="flex flex-col items-center text-center gap-6 border-b border-[#D8D0C0] pb-10 mb-16">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-[#99744C] text-[10px] tracking-[0.3em] uppercase font-bold mb-4">
              <span className="w-3 h-px bg-[#B8936D]" />
              <span>ABOUT SOUL SPACE INFRASTRUCTURE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#141311] tracking-[-0.03em] font-normal">
              Quality, Functionality &amp; <br className="hidden sm:inline" />
              <span className="italic text-[#B8936D]">Enduring Value.</span>
            </h2>
          </div>

          <p className="text-sm text-[#575046] max-w-2xl leading-relaxed font-light">
            Building trust with passion and integrity since 2016 across Coimbatore, Tamil Nadu.
          </p>
        </ScrollReveal>

        {/* Official Company Statement Card */}
        <ScrollReveal yOffset={25} className="mb-16">
          <div className="bg-[#F4F2EB] border border-[#E5DFD4] p-8 sm:p-12 lg:p-14 rounded-2xl shadow-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B8936D]/5 rounded-bl-full pointer-events-none" />

            <div className="max-w-4xl">
              <span className="text-[10px] font-sans text-[#B8936D] tracking-[0.25em] uppercase font-bold block mb-4">
                FOUNDING PROFILE &bull; ESTABLISHED 2016
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#181715] font-normal leading-snug mb-6">
                &ldquo;We have always believed that quality, time and safety are the topmost priority.&rdquo;
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-[#4A433A] leading-relaxed font-light">
                <p>
                  In 2016, <strong>Soulspace Infrastructure</strong> was established as a small construction company that dealt in civil construction. It grew up to become <strong>Soul Space</strong>. We have been growing at a steady rate, broadening the horizon of our activities.
                </p>
                <p>
                  We have always believed that quality, time, and safety are the top most priority. Therefore, we always made an attempt to set appropriate targets which would not force us to compromise with the quality of work delivered.
                </p>
                <p>
                  Soul Space is a mid-level building construction company. Our focus is on quality work, functionality, and value. We emphasize a hands-on management style and personal attention to clients. We are large enough, however, to handle bigger premium projects and thus have the ability to schedule jobs sooner or complete them more quickly.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-8 border-t border-[#E5DFD4] text-xs font-sans">
                <div>
                  <span className="text-[#8C7A65] uppercase block text-[10px]">Founded</span>
                  <span className="font-serif text-[#181715] text-lg font-medium">2016</span>
                </div>
                <div>
                  <span className="text-[#8C7A65] uppercase block text-[10px]">Focus</span>
                  <span className="font-serif text-[#181715] text-lg font-medium">Quality &amp; Value</span>
                </div>
                <div>
                  <span className="text-[#8C7A65] uppercase block text-[10px]">Style</span>
                  <span className="font-serif text-[#181715] text-lg font-medium">Hands-On Management</span>
                </div>
                <div>
                  <span className="text-[#8C7A65] uppercase block text-[10px]">Territory</span>
                  <a
                    href="https://maps.google.com/?q=Coimbatore,+Tamil+Nadu,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-[#181715] text-lg font-medium hover:text-[#B8936D] transition-colors inline-flex items-center gap-1 group/map"
                    aria-label="View Coimbatore, TN on Google Maps"
                  >
                    <span>Coimbatore, TN</span>
                    <MapPin className="w-3.5 h-3.5 text-[#B8936D] shrink-0 group-hover/map:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Pillars of Practice */}
        <div>
          <div className="text-center mb-10">
            <span className="text-[10px] font-sans text-[#8C7A65] tracking-widest uppercase font-semibold">
              OUR CORE ETHOS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#181715] mt-1 font-normal">
              What Defines Soul Space
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="bg-[#F4F2EB] border border-[#E5DFD4] p-6 rounded-xl flex flex-col justify-between hover:border-[#CBB8A0] transition-all shadow-none"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-[#181715] text-[#C4BCB0] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#B8936D]" />
                    </div>
                    <h4 className="font-serif text-xl text-[#181715] font-normal mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-[#5C5346] leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-[#EFECE5] text-[10px] font-mono text-[#8C7A65]">
                    PILLAR 0{i + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
