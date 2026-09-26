'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

interface ServicesProps {
  onOpenCommission: () => void;
}

export function Services({ onOpenCommission }: ServicesProps) {
  const practices = [
    {
      code: 'SERVICE 01',
      title: 'Gated Luxury Villas',
      desc: 'Master-planned residential enclaves featuring individual 3-BHK luxury villas with private terrace gardens, 100% Vasthu compliance, and high-end teakwood finishes.',
      deliverables: ['100% Vasthu & Manaiyadi', 'Private Terrace Gardens', 'Seasoned Teakwood Doors', 'Dedicated Car Parks'],
    },
    {
      code: 'SERVICE 02',
      title: 'Private Residences',
      desc: 'Contemporary 2 & 3 BHK apartment communities designed for modern family living, cross-ventilation, automatic elevators, and round-the-clock CCTV security.',
      deliverables: ['Vitrified Tile Flooring', 'Solar Water & Power Backup', 'Hydro-Pneumatic Water', 'Branded Sanitaryware'],
    },
    {
      code: 'SERVICE 03',
      title: 'Commercial IT Hubs',
      desc: 'Column-free IT and commercial office buildings constructed with Post-Tensioned (PT) concrete slabs for adaptable tenant workspaces and high floor-to-ceiling heights.',
      deliverables: ['Column-Free PT Slabs', 'High-Speed Elevators', '100% Power Generator Backup', 'Fire Safety Networks'],
    },
    {
      code: 'SERVICE 04',
      title: 'Turnkey Civil Execution',
      desc: 'End-to-end contracting, structural engineering, architectural planning, MEP coordination, and strict on-schedule delivery for residential and commercial clients.',
      deliverables: ['Soil & Concrete Testing', 'Dedicated Partner Governance', 'Transparent Milestone Delivery', 'Post-Handover Support'],
    },
  ];

  const methodology = [
    {
      phase: 'I',
      num: '01',
      name: 'Site Survey & Vasthu Planning',
      stage: 'Feasibility & Orientation',
      detail: 'Soil-bearing testing, topographic leveling, and Manaiyadi Shastra dimensional planning.',
      focus: 'Vasthu & Soil Bearing',
    },
    {
      phase: 'II',
      num: '02',
      name: 'Structural & PT Engineering',
      stage: 'Design & Approvals',
      detail: 'Seismic structural design, post-tensioned tendon calculation, and regulatory plan approvals.',
      focus: 'PT Slabs & Seismic RCC',
    },
    {
      phase: 'III',
      num: '03',
      name: 'Material Quality Batching',
      stage: 'Procurement & Testing',
      detail: 'M25/M30 concrete batching, certified high-tensile steel procurement, and teakwood seasoning.',
      focus: 'M25/M30 & Seasoned Teak',
    },
    {
      phase: 'IV',
      num: '04',
      name: 'Superstructure & MEP Execution',
      stage: 'Civil Construction',
      detail: 'Precision shuttering, concealed electrical conduit networks, and pressurized plumbing lines.',
      focus: 'Concealed MEP Networks',
    },
    {
      phase: 'V',
      num: '05',
      name: 'Handover & Warranty Support',
      stage: 'Audits & Commissioning',
      detail: 'Exhaustive snag audits, documentation handover, and long-term structural maintenance commitment.',
      focus: 'Zero-Snag Certification',
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-28 bg-[#ECE7DF] text-[#1C1A17] border-b border-[#D8D0C2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="flex flex-col items-center text-center gap-6 pb-12 mb-16">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 text-[#B8936D] text-[9px] tracking-[0.3em] uppercase font-sans mb-3 font-bold">
              <span className="w-2.5 h-px bg-[#B8936D]" />
              <span>SERVICES &amp; DEVELOPMENT PRACTICE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#181714] tracking-[-0.03em] font-normal leading-tight">
              Scope of Development
            </h2>
          </div>
        </ScrollReveal>

        {/* 4 Disciplines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {practices.map((practice, i) => (
            <ScrollReveal
              key={i}
              delay={i * 0.1}
              className="border border-[#DCD5C8] bg-[#FAF8F4] p-8 rounded-lg flex flex-col text-left justify-between hover:border-[#CBB8A0] transition-all shadow-none"
            >
              <div className="flex flex-col text-left w-full">
                <span className="text-[9px] font-sans text-[#B8936D] tracking-widest block mb-2 font-bold uppercase">
                  {practice.code}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#181714] mb-3 font-normal">
                  {practice.title}
                </h3>
                <p className="text-xs text-[#5C5346] leading-relaxed font-light">
                  {practice.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Phased Methodology Timeline */}
        <ScrollReveal yOffset={32} className="border border-[#DCD5C8] bg-[#FAF8F4] p-6 sm:p-10 rounded-2xl shadow-xs">
          <div className="border-b border-[#E0D9CB] pb-6 mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4 text-left">
            <div className="flex flex-col items-start text-left max-w-2xl">
              <span className="text-[9px] font-sans text-[#B8936D] tracking-[0.25em] uppercase font-bold mb-1">
                THE SOUL SPACE METHODOLOGY
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#181714] font-normal tracking-tight">
                Systematic Execution Phases
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6152] font-light mt-1.5 leading-relaxed">
                A disciplined five-stage civil engineering framework — ensuring geotechnical integrity, structural precision, and zero-snag delivery.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0EAE0] border border-[#DDD5C6] text-[10px] font-mono text-[#5C5346] uppercase tracking-wider shrink-0 self-start lg:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8936D] animate-pulse" />
              <span>5 Sequential Milestones</span>
            </div>
          </div>

          {/* 5 Architectural Milestone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {methodology.map((m, i) => (
              <div
                key={i}
                className="bg-white/90 p-5 rounded-xl border border-[#DFD7C8] hover:border-[#B8936D] transition-all flex flex-col justify-between relative group overflow-hidden shadow-2xs hover:shadow-sm"
              >
                {/* Accent Highlight Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#EAE3D6] group-hover:bg-[#B8936D] transition-colors" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#B8936D] uppercase">
                      PHASE {m.phase}
                    </span>
                    <span className="text-lg font-serif text-[#CFC5B4] group-hover:text-[#99744C] transition-colors font-light">
                      {m.num}
                    </span>
                  </div>

                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#8A8071] mb-1.5 block font-medium">
                    {m.stage}
                  </span>

                  <h4 className="font-serif text-[15px] sm:text-base text-[#181715] mb-2 font-normal leading-snug group-hover:text-[#000] transition-colors">
                    {m.name}
                  </h4>

                  <p className="text-xs text-[#5C5346] leading-relaxed font-light mb-4">
                    {m.detail}
                  </p>
                </div>

                {/* Milestone Focus Pill */}
                <div className="pt-3 border-t border-[#F2ECE2] flex items-center gap-1.5 text-[10.5px] font-sans text-[#7A7061]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8936D] shrink-0" />
                  <span className="truncate font-medium">{m.focus}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Inquire Bottom Action Bar */}
          <div className="mt-8 pt-6 border-t border-[#E5DFD4] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <p className="text-xs text-[#6E6457] font-light max-w-md">
              Inquire regarding ongoing residential bookings, custom villa plots, or commercial leasing opportunities.
            </p>
            <button
              onClick={onOpenCommission}
              className="h-[40px] px-6 bg-[#181715] hover:bg-[#2C2720] text-white text-[10px] tracking-[0.2em] uppercase rounded-full transition-all flex items-center justify-center gap-3 cursor-pointer border border-[#2D2A26] hover:border-[#CBB8A0] shadow-sm hover:shadow whitespace-nowrap"
            >
              <span>Inquire on Developments</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/90" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
