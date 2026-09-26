'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Building2, 
  ShieldCheck, 
  Clock, 
  Award,
  Compass,
  Check,
  MapPin,
  Phone,
  MessageSquare
} from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { DynamicPictureSlot } from '@/components/DynamicPictureSlot';
import { CommissionEstimator } from '@/components/CommissionEstimator';
import { BrandLogo } from '@/components/BrandLogo';

export default function AboutPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [hasScrolledPastTop, setHasScrolledPastTop] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHasScrolledPastTop(currentScrollY > 20);

      if (currentScrollY <= 40) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down -> disappear with blur effect
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> appear with blur effect
        setIsHeaderVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1D1B18] selection:bg-[#B8936D] selection:text-white antialiased">
      {/* =========================================================================================
          CRITICAL MANDATORY SYSTEM COMPONENT: VISIBLE FROSTED GLASSMORPHIC ABOUT HEADER
          =========================================================================================
          IMPORTANT: Visible blur & glassmorphism must always remain active on this header.
          ========================================================================================= */}
      <header
        id="about-header"
        className={`sticky top-0 z-40 py-3 sm:py-4 transition-all duration-300 border-none ${
          hasScrolledPastTop
            ? 'glassmorphic-header'
            : 'glassmorphic-header-top'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 grid grid-cols-3 items-center h-10">
          {/* Left: Pure Back Arrow Link (Disappears with blur on scroll down, reappears on scroll up) */}
          <div className="flex items-center justify-start">
            <Link
              href="/"
              style={{
                opacity: isHeaderVisible ? 1 : 0,
                filter: isHeaderVisible ? 'blur(0px)' : 'blur(8px)',
                pointerEvents: isHeaderVisible ? 'auto' : 'none',
                transition: 'opacity 0.4s ease, filter 0.4s ease',
              }}
              className="text-[#1A1815] hover:text-black transition-colors cursor-pointer inline-flex items-center"
              id="about-back-home-btn"
              aria-label="Return to Home"
              title="Return to Home"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
            </Link>
          </div>

          {/* Center: Brand Logo - Scrolls to top of current page */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  if ((window as any).__lenis) {
                    (window as any).__lenis.scrollTo(0, { duration: 1.2 });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }
              }}
              className="inline-block text-center group cursor-pointer focus:outline-hidden"
              id="about-brand-logo-link"
              aria-label="Scroll to top of current page"
            >
              <BrandLogo variant="nav" />
            </button>
          </div>

          {/* Right: Project Inquiry Button (Disappears with blur on scroll down, reappears on scroll up) */}
          <div className="flex items-center justify-end">
            <a
              href="#about-inquiries"
              style={{
                opacity: isHeaderVisible ? 1 : 0,
                filter: isHeaderVisible ? 'blur(0px)' : 'blur(8px)',
                pointerEvents: isHeaderVisible ? 'auto' : 'none',
                transition: 'opacity 0.4s ease, filter 0.4s ease',
              }}
              className="px-4 py-2 bg-[#181715] text-white text-[10.5px] font-sans tracking-[0.2em] uppercase font-semibold rounded-full border border-[#2D2A26] hover:border-[#CBB8A0] transition-colors cursor-pointer shadow-none flex items-center gap-1.5"
              id="about-project-inquiry-header-btn"
            >
              <span>Project Inquiry</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B8936D]" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-20 sm:space-y-28">
        {/* Section 1: Hero Header without Card Box Layout */}
        <ScrollReveal className="text-center space-y-6 max-w-4xl mx-auto px-4 pt-2 pb-4">
          <div className="flex items-center justify-center gap-2 text-[#99744C] text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold mb-2 font-sans">
            <span className="w-3 h-px bg-[#B8936D]" />
            <span>PRACTICE PROFILE &amp; INSTITUTIONAL HISTORY</span>
            <span className="w-3 h-px bg-[#B8936D]" />
          </div>

          <h1
            style={{ fontSize: '64px', lineHeight: '72px' }}
            className="font-serif max-sm:!text-3xl max-sm:!leading-tight max-md:!text-5xl max-md:!leading-snug text-[#1A1815] font-normal tracking-[-0.035em] px-2 text-center"
          >
            About Soul Space <br className="hidden sm:inline" />
            <span className="italic text-[#B8936D] font-normal">Infrastructure.</span>
          </h1>

          <p
            style={{ fontSize: '17px', lineHeight: '25px' }}
            className="text-[#645D52] max-w-2xl mx-auto font-light text-center px-4"
          >
            A mid-level building construction practice focused on quality civil engineering, functional space design, and enduring value across Coimbatore, Tamil Nadu.
          </p>
        </ScrollReveal>

        {/* Section 2: Comprehensive Company History & Foundation Data (Spacious Architectural Separation) */}
        <ScrollReveal className="bg-transparent border-b border-[#D8D0C0] pb-16 w-full text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
            {/* Narrative Story & Landing Page Style Metric Strip (First Column with barrier separator) */}
            <div className="lg:col-span-7 space-y-6 text-left pt-1 lg:pr-10 xl:pr-14 lg:border-r lg:border-[#D5CDBF]/70">
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#4A4338] font-light text-left text-pretty">
                <p className="font-serif text-lg sm:text-xl text-[#181715] font-normal italic leading-relaxed border-l-2 border-[#B8936D] pl-4 py-1">
                  &ldquo;We have always believed that quality, time, and safety are the topmost priority. Therefore, we set appropriate targets that do not force us to compromise on structural integrity or material quality of work delivered.&rdquo;
                </p>
                <p>
                  In 2016, we established a civil construction practice that grew to become <strong className="font-semibold text-[#181715]">Soul Space Infrastructure</strong>. We have been growing at a steady rate, broadening the horizon of our activities across Coimbatore.
                </p>
                <p>
                  Soul Space is a mid-level building construction company emphasizing hands-on management and personal attention to every client. We are structured to handle large premium projects, allowing us to schedule jobs sooner and complete them efficiently without administrative layers.
                </p>
              </div>

              {/* Landing Page Style Metric Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#D5CDBF] text-xs font-sans">
                <div>
                  <span className="text-[#8C7A65] uppercase block text-[10px] tracking-wider">Founded</span>
                  <span className="font-serif text-[#181715] text-lg font-medium">2016</span>
                </div>
                <div>
                  <span className="text-[#8C7A65] uppercase block text-[10px] tracking-wider">Focus</span>
                  <span className="font-serif text-[#181715] text-lg font-medium">Quality &amp; Value</span>
                </div>
                <div>
                  <span className="text-[#8C7A65] uppercase block text-[10px] tracking-wider">Style</span>
                  <span className="font-serif text-[#181715] text-lg font-medium">Hands-On</span>
                </div>
                <div>
                  <span className="text-[#8C7A65] uppercase block text-[10px] tracking-wider">Territory</span>
                  <a
                    href="https://maps.google.com/?q=Coimbatore,+Tamil+Nadu,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-[#181715] text-lg font-medium hover:text-[#B8936D] transition-colors inline-flex items-center gap-1 group/map"
                    aria-label="View Coimbatore, TN on Google Maps"
                  >
                    <span>Coimbatore, TN</span>
                    <MapPin className="w-3 h-3 text-[#B8936D] group-hover/map:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Eyebrow, Heading & Structured Company Metadata Box (Second Column) */}
            <div className="lg:col-span-5 space-y-5 text-left lg:pl-2 xl:pl-4">
              <div className="space-y-3">
                <span className="text-xs font-sans uppercase tracking-[0.22em] text-[#99744C] font-semibold block text-left">
                  OUR JOURNEY SINCE 2016
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#181715] font-normal leading-[1.18] tracking-tight text-left text-balance">
                  Established on Principles of Quality, Time &amp; Safety.
                </h2>
              </div>

              {/* Company Details Metadata Card */}
              <div className="w-full p-5 sm:p-6 bg-[#EFECE5] border border-[#E0D9CC] rounded-xl text-xs font-sans space-y-3 text-left">
                <div className="grid grid-cols-[130px_1fr] items-center border-b border-[#D5CDBF] pb-2.5 gap-2 text-left">
                  <span className="font-semibold text-[#8C7A65] uppercase tracking-wider text-[11px] block">
                    Company Name
                  </span>
                  <span className="text-[#181715] font-medium text-left">
                    Soul Space Infrastructure
                  </span>
                </div>
                <div className="grid grid-cols-[130px_1fr] items-center border-b border-[#D5CDBF] pb-2.5 gap-2 text-left">
                  <span className="font-semibold text-[#8C7A65] uppercase tracking-wider text-[11px] block">
                    Establishment
                  </span>
                  <span className="text-[#3D372E] font-medium text-left">
                    2016 (Civil Practice)
                  </span>
                </div>
                <div className="grid grid-cols-[130px_1fr] items-center border-b border-[#D5CDBF] pb-2.5 gap-2 text-left">
                  <span className="font-semibold text-[#8C7A65] uppercase tracking-wider text-[11px] block">
                    Focus &amp; Scope
                  </span>
                  <span className="text-[#3D372E] font-medium text-left">
                    Residential &amp; Commercial
                  </span>
                </div>
                <div className="grid grid-cols-[130px_1fr] items-center gap-2 text-left">
                  <span className="font-semibold text-[#8C7A65] uppercase tracking-wider text-[11px] block">
                    Territory
                  </span>
                  <a
                    href="https://maps.google.com/?q=Coimbatore,+Tamil+Nadu,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3D372E] hover:text-[#B8936D] font-medium text-left inline-flex items-center gap-1.5 transition-colors group/map"
                    aria-label="View Coimbatore, Tamil Nadu on Google Maps"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#B8936D] group-hover/map:scale-110 transition-transform" />
                    <span className="underline-offset-2 hover:underline">Coimbatore, Tamil Nadu</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 3: Pillars & Quality Priorities */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-b border-[#D8D0C0] pb-16 text-center">
          <ScrollReveal delay={0.05} className="space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#B8936D] mx-auto" />
            <h3 className="font-serif text-xl text-[#181715]">Quality &amp; Safety First</h3>
            <p className="text-xs text-[#5C5346] leading-relaxed font-light">
              Target setting ensures zero compromise on structural standards, ISO fire-resistant electricals, and M25 RCC concrete standards across every foundation.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="space-y-3">
            <Clock className="w-6 h-6 text-[#B8936D] mx-auto" />
            <h3 className="font-serif text-xl text-[#181715]">Timely Execution</h3>
            <p className="text-xs text-[#5C5346] leading-relaxed font-light">
              Our agile scale allows us to schedule jobs sooner and complete projects faster without administrative delays or subcontractor handoffs.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="space-y-3">
            <Award className="w-6 h-6 text-[#B8936D] mx-auto" />
            <h3 className="font-serif text-xl text-[#181715]">Hands-On Leadership</h3>
            <p className="text-xs text-[#5C5346] leading-relaxed font-light">
              Direct partner site supervision and personal attention to every client from initial architectural planning to final key handover.
            </p>
          </ScrollReveal>
        </div>

        {/* Section 4: Detailed Portfolio Breakdown (Strict Alphabetical Order: AURUM, ABV, DOTCOM, MYSTIC, UPTOWN) */}
        <div className="space-y-24 border-b border-[#D8D0C0] pb-24">
          <ScrollReveal className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-sans uppercase tracking-[0.22em] text-[#99744C] font-semibold block">
              FLAGSHIP DEVELOPMENTS &amp; PLUS POINTS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#181715] font-normal">
              Company Projects &amp; Architectural Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-[#61574B] font-light leading-relaxed">
              An in-depth architectural breakdown of Soul Space developments across Coimbatore, highlighting structural engineering, plus points, and dedicated visual picture slots.
            </p>
          </ScrollReveal>

          {/* 1. AURUM */}
          <ScrollReveal className="py-10 border-t border-[#E3DCCF] first:border-t-0 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2">
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-[#B8936D]">
                    LUXURY GATED VILLA COLLECTION
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#181715] font-normal">
                    AURUM —{' '}
                    <a
                      href="https://maps.google.com/?q=SF+No.189+190+Ashok+J+Nagar+RJ+Matriculation+School+Vilankurichi+Coimbatore+641035"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#B8936D] transition-colors inline-flex items-center gap-1 group/map"
                      aria-label="View AURUM Vilankurichi, Coimbatore on Google Maps"
                    >
                      <span className="underline-offset-4 hover:underline">Vilankurichi, Coimbatore</span>
                      <MapPin className="w-4 h-4 text-[#B8936D] group-hover/map:scale-110 transition-transform" />
                    </a>
                  </h3>
                  <p className="text-xs text-[#7A7061] font-sans">
                    SF No.189, 190, Ashok J Nagar, Behind R J Matriculation School, Vilankurichi, Coimbatore - 641035
                  </p>
                  <p className="text-base sm:text-lg text-[#4A4338] font-normal not-italic leading-relaxed">
                    A world of luxury awaits — collection of 33 three-bedroom villas with fully furnished clubhouse.
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-[#524B40] leading-relaxed font-light">
                  <p>
                    Welcome to <strong className="font-medium text-[#181715]">AURUM by Soul Space</strong>, where sophistication meets understated elegance. Situated in the fast-growing residential corridor of Vilankurichi, AURUM comprises a private gated enclave of 33 three-bedroom luxury villas crafted for families seeking high creature comforts and long-term asset value.
                  </p>
                  <p>
                    Every villa is engineered with earthquake-resistant M25 grade RCC foundations, solid block masonry, and teakwood joinery. The community is anchored by an exclusive resort-style clubhouse, providing private leisure and social spaces within steps of your front door.
                  </p>
                </div>

                {/* Plus Points & Highlights List */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#181715] font-semibold block">
                    Key Plus Points &amp; Architectural Highlights:
                  </span>
                  <ul className="space-y-2.5 text-xs text-[#4A4338] font-light">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">Resort-Style Furnished Clubhouse:</strong> Fully equipped gymnasium, adult &amp; kids swimming pool, air-conditioned banquet hall, and indoor snooker court.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">Continuous Infrastructure:</strong> 62.5 KVA generator backup for common area illumination and hydro-pneumatic treated R.O. water network.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">100% Vasthu Geometry:</strong> Precise directional orientation and room placement following traditional Vastu Shastra and Manaiyadi proportions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">Premium Finishes &amp; Joinery:</strong> Teakwood main entrance frames, 800x800mm vitrified flooring, and Kohler/Roca sanitaryware.</span>
                    </li>
                  </ul>
                </div>

                {/* More Details Button */}
                <div className="pt-3">
                  <Link
                    href="/projects/aurum-villas"
                    className="inline-flex items-center flex-nowrap gap-2 px-5 py-2.5 bg-[#181715] text-white text-[11px] font-sans tracking-[0.18em] uppercase font-semibold rounded-full border border-[#2D2A26] hover:border-[#CBB8A0] hover:bg-[#25221E] transition-all cursor-pointer shadow-none group whitespace-nowrap shrink-0"
                    id="about-more-details-aurum-btn"
                  >
                    <span className="whitespace-nowrap inline-block">More Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B8936D] shrink-0" />
                  </Link>
                </div>
              </div>

              {/* Picture Slot for AURUM */}
              <div className="lg:col-span-6">
                <DynamicPictureSlot
                  slotId="about_aurum_img"
                  title="AURUM — 33 Luxury Gated Villas"
                  caption="Vilankurichi luxury villa enclave with furnished clubhouse."
                  orientation="landscape"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* 2. ABV ARBOR */}
          <ScrollReveal className="pt-10 border-t border-[#E3DCCF] space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-6 order-2 lg:order-1">
                {/* Picture Slot for ABV ARBOR */}
                <DynamicPictureSlot
                  slotId="about_abv_arbor_img"
                  title="ABV ARBOR — 12 Exclusive Luxury Flats"
                  caption="Modern minimalist stilt+5 structure near Race Course."
                  orientation="landscape"
                />
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
                <div className="space-y-2">
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-[#B8936D]">
                    CITY CENTER BOUTIQUE RESIDENCES
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#181715] font-normal">
                    ABV ARBOR —{' '}
                    <a
                      href="https://maps.google.com/?q=Plot+no.18+G+Square+Blue+Crest+Near+GEM+Hospital+Ramanathapuram+Coimbatore+641045"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#B8936D] transition-colors inline-flex items-center gap-1 group/map"
                      aria-label="View ABV ARBOR Ramanathapuram, Coimbatore on Google Maps"
                    >
                      <span className="underline-offset-4 hover:underline">Ramanathapuram, Coimbatore</span>
                      <MapPin className="w-4 h-4 text-[#B8936D] group-hover/map:scale-110 transition-transform" />
                    </a>
                  </h3>
                  <p className="text-xs text-[#7A7061] font-sans">
                    Plot no.18, G Square Blue Crest, Near GEM Hospital, Ramanathapuram, Coimbatore - 641045
                  </p>
                  <p className="text-base sm:text-lg text-[#4A4338] font-normal not-italic leading-relaxed">
                    Heart of the city | 5 minutes from Race Course — 12 exclusive 3 BHK &amp; 4 BHK luxury residences.
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-[#524B40] leading-relaxed font-light">
                  <p>
                    Positioned at Sowripalayam Pirivu in Ramanathapuram, <strong className="font-medium text-[#181715]">ABV ARBOR</strong> represents urban luxury at its finest, situated just 5 minutes away from Coimbatore’s iconic Race Course promenade.
                  </p>
                  <p>
                    Designed with contemporary minimalist architecture, clean structural lines, and generous interior floor plates, ABV ARBOR houses only 12 luxury residences across a Stilt + 5 story elevation—ensuring low-density privacy and high security for discerning homeowners.
                  </p>
                </div>

                {/* Plus Points & Highlights List */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#181715] font-semibold block">
                    Key Plus Points &amp; Architectural Highlights:
                  </span>
                  <ul className="space-y-2.5 text-xs text-[#4A4338] font-light">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">Unmatched Urban Connectivity:</strong> 5 minutes from Race Course, offering swift access to Lakshmi Mills, Nava India, and central business hubs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">Exclusive Low Density:</strong> Only 12 homes in total (3 BHK ~2,395 sq ft &amp; 4 BHK Penthouse suites) for maximum quietude.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">Rooftop Amenities &amp; Conveniences:</strong> Landscaped terrace garden, indoor fitness studio, community hall, and reticulated piped gas system.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">Safety &amp; Backup Infrastructure:</strong> Video door phone security, stilt car parking, 1 kVA power backup per flat, and 100% Vastu compliance.</span>
                    </li>
                  </ul>
                </div>

                {/* More Details Button */}
                <div className="pt-3">
                  <Link
                    href="/projects/abv-arbor"
                    className="inline-flex items-center flex-nowrap gap-2 px-5 py-2.5 bg-[#181715] text-white text-[11px] font-sans tracking-[0.18em] uppercase font-semibold rounded-full border border-[#2D2A26] hover:border-[#CBB8A0] hover:bg-[#25221E] transition-all cursor-pointer shadow-none group whitespace-nowrap shrink-0"
                    id="about-more-details-abv-arbor-btn"
                  >
                    <span className="whitespace-nowrap inline-block">More Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B8936D] shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 3. DOTCOM */}
          <ScrollReveal className="pt-10 border-t border-[#E3DCCF] space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2">
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-[#B8936D]">
                    COMMERCIAL IT LANDMARK
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#181715] font-normal">
                    DOTCOM —{' '}
                    <a
                      href="https://maps.google.com/?q=No.58B+Parameshwaran+Layout+Road+PN+Palayam+Coimbatore+Tamil+Nadu+641037"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#B8936D] transition-colors inline-flex items-center gap-1 group/map"
                      aria-label="View DOTCOM PN Palayam, Coimbatore on Google Maps"
                    >
                      <span className="underline-offset-4 hover:underline">PN Palayam, Coimbatore</span>
                      <MapPin className="w-4 h-4 text-[#B8936D] group-hover/map:scale-110 transition-transform" />
                    </a>
                  </h3>
                  <p className="text-xs text-[#7A7061] font-sans">
                    No.58B, Parameshwaran Layout Road, PN Palayam, Coimbatore, Tamil Nadu, 641037
                  </p>
                  <p className="text-base sm:text-lg text-[#4A4338] font-normal not-italic leading-relaxed">
                    The city&apos;s tech address — 16 column-free workspaces with rooftop dining and corporate facilities.
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-[#524B40] leading-relaxed font-light">
                  <p>
                    Situated at the pivotal junction of Avinashi Road, Nava India Road, and Lakshmi Mills, <strong className="font-medium text-[#181715]">DOTCOM</strong> stands as a landmark commercial workspace for IT firms, corporate headquarters, and professional consultancies.
                  </p>
                  <p>
                    Engineered with Post-Tensioned (PT) beam and slab technology, DOTCOM eliminates intrusive structural columns, providing 100% clear floor plates that allow corporate tenants complete freedom in workspace partitioning and open-plan desk layouts.
                  </p>
                </div>

                {/* Plus Points & Highlights List */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#181715] font-semibold block">
                    Key Plus Points &amp; Architectural Highlights:
                  </span>
                  <ul className="space-y-2.5 text-xs text-[#4A4338] font-light">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">100% Column-Free Floor Plates:</strong> Advanced Post-Tensioned (PT) structural engineering providing open, flexible workspace layouts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">Airy High Ceilings:</strong> Generous 11’6” clear floor-to-floor height maximizing natural light, air circulation, and executive volume.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">Corporate Welfare Facilities:</strong> Dedicated rooftop dining cafeteria and fitness gymnasium for employee wellness.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">Access &amp; Parking Systems:</strong> Mechanized stacked parking for 2 &amp; 4 wheelers, high-speed 8-passenger lift, and video access control.</span>
                    </li>
                  </ul>
                </div>

                {/* More Details Button */}
                <div className="pt-3">
                  <Link
                    href="/projects/dotcom-workspaces"
                    className="inline-flex items-center flex-nowrap gap-2 px-5 py-2.5 bg-[#181715] text-white text-[11px] font-sans tracking-[0.18em] uppercase font-semibold rounded-full border border-[#2D2A26] hover:border-[#CBB8A0] hover:bg-[#25221E] transition-all cursor-pointer shadow-none group whitespace-nowrap shrink-0"
                    id="about-more-details-dotcom-btn"
                  >
                    <span className="whitespace-nowrap inline-block">More Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B8936D] shrink-0" />
                  </Link>
                </div>
              </div>

              {/* Picture Slot for DOTCOM */}
              <div className="lg:col-span-6">
                <DynamicPictureSlot
                  slotId="about_dotcom_img"
                  title="DOTCOM — 16 Commercial Workspaces"
                  caption="Post-tensioned column-free tech workspaces on Avinashi Road."
                  orientation="landscape"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* 4. MYSTIC */}
          <ScrollReveal className="pt-10 border-t border-[#E3DCCF] space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-6 order-2 lg:order-1">
                {/* Picture Slot for MYSTIC */}
                <DynamicPictureSlot
                  slotId="about_mystic_img"
                  title="MYSTIC — 22 Cents Plantation Farmhouse & Plunge Pool"
                  caption="Coconut plantation enclave near Adiyogi with private plunge pool."
                  orientation="landscape"
                />
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
                <div className="space-y-2">
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-[#B8936D]">
                    FLAGSHIP NATURE &amp; PLANTATION ENCLAVE
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#181715] font-normal">
                    MYSTIC —{' '}
                    <a
                      href="https://maps.google.com/?q=Semmedu+Near+Isha+Yoga+Centre+Adiyogi+Coimbatore+Tamil+Nadu+641114"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#B8936D] transition-colors inline-flex items-center gap-1 group/map"
                      aria-label="View MYSTIC Semmedu, Coimbatore on Google Maps"
                    >
                      <span className="underline-offset-4 hover:underline">Semmedu, Coimbatore</span>
                      <MapPin className="w-4 h-4 text-[#B8936D] group-hover/map:scale-110 transition-transform" />
                    </a>
                  </h3>
                  <p className="text-xs text-[#7A7061] font-sans">
                    Semmedu, Near Isha Yoga Centre &amp; Adiyogi, Coimbatore, Tamil Nadu 641114
                  </p>
                  <p className="text-base sm:text-lg text-[#4A4338] font-normal not-italic leading-relaxed">
                    Close to nature, near to your world — luxury gated community plantation villas near Isha.
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-[#524B40] leading-relaxed font-light">
                  <p>
                    With social responsibility at its heart, <strong className="font-medium text-[#181715]">MYSTIC by Soul Space</strong> was created across a 2.5 acre lush coconut grove in Semmedu to reunite residents with nature.
                  </p>
                  <p>
                    Pioneering our signature 80-20 concept (80% preserved coconut plantation paired with 20% footprint for nature homes), MYSTIC delivers 22+ cents of private land along with a custom 2,500 sq.ft. luxury farmhouse and private plunge pool—blessed with surplus Siruvani drinking water and pure mountain air.
                  </p>
                </div>

                {/* Plus Points & Highlights List */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#181715] font-semibold block">
                    Key Plus Points &amp; Architectural Highlights:
                  </span>
                  <ul className="space-y-2.5 text-xs text-[#4A4338] font-light">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">Pure Siruvani Water Supply:</strong> Abundant natural Siruvani water connection—renowned globally as the world’s 2nd tastiest drinking water.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">80-20 Ecological Design:</strong> 80% coconut grove canopy preserved alongside 20% sustainable residential footprint.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">Adiyogi &amp; Isha Proximity:</strong> Located just a 10-minute serene drive from Adiyogi and the Isha Yoga Centre in Semmedu.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">22+ Cents Estate &amp; Plunge Pool:</strong> Generous plot dimensions with a 2,500 sq ft custom farmhouse and private plunge pool.</span>
                    </li>
                  </ul>
                </div>

                {/* More Details Button */}
                <div className="pt-3">
                  <Link
                    href="/projects/mystic-villas"
                    className="inline-flex items-center flex-nowrap gap-2 px-5 py-2.5 bg-[#181715] text-white text-[11px] font-sans tracking-[0.18em] uppercase font-semibold rounded-full border border-[#2D2A26] hover:border-[#CBB8A0] hover:bg-[#25221E] transition-all cursor-pointer shadow-none group whitespace-nowrap shrink-0"
                    id="about-more-details-mystic-btn"
                  >
                    <span className="whitespace-nowrap inline-block">More Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B8936D] shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 5. UPTOWN */}
          <ScrollReveal className="pt-10 border-t border-[#E3DCCF] space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2">
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase font-bold text-[#B8936D]">
                    CRAFTED BUDGET APARTMENT ENCLAVE
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#181715] font-normal">
                    UPTOWN —{' '}
                    <a
                      href="https://maps.google.com/?q=SF+No.629/10A+Chettipalayam+Road+Eachanari+Site+Coimbatore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#B8936D] transition-colors inline-flex items-center gap-1 group/map"
                      aria-label="View UPTOWN Eachanari, Coimbatore on Google Maps"
                    >
                      <span className="underline-offset-4 hover:underline">Eachanari, Coimbatore</span>
                      <MapPin className="w-4 h-4 text-[#B8936D] group-hover/map:scale-110 transition-transform" />
                    </a>
                  </h3>
                  <p className="text-xs text-[#7A7061] font-sans">
                    SF No.629/10A, Chettipalayam Road, Eachanari Site, Coimbatore - 641021
                  </p>
                  <p className="text-base sm:text-lg text-[#4A4338] font-normal not-italic leading-relaxed">
                    Luxury space in an unbeatable price — 110 crafted budget apartments 500m from Eachanari Temple.
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-[#524B40] leading-relaxed font-light">
                  <p>
                    Located in Eachanari—a vibrant residential and educational hub famous for its 500-year-old Vinayagar Temple—<strong className="font-medium text-[#181715]">UPTOWN</strong> delivers &ldquo;Luxury Space in an Unbeatable Price.&rdquo;
                  </p>
                  <p>
                    Comprising 110 thoughtfully crafted 1 BHK, 2 BHK, and 3 BHK residences, UPTOWN features complete resort amenities including a swimming pool, community hall, indoor gym, home theatre, and children’s park—engineered with 8” thick solid block masonry and 100% Vasthu geometry.
                  </p>
                </div>

                {/* Plus Points & Highlights List */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#181715] font-semibold block">
                    Key Plus Points &amp; Architectural Highlights:
                  </span>
                  <ul className="space-y-2.5 text-xs text-[#4A4338] font-light">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">500 Meters from Eachanari Temple:</strong> Unbeatable location advantage with quick connectivity to Pollachi Highway and IT corridors.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">110 Versatile Apartments:</strong> 1 BHK, 2 BHK, and 3 BHK floor plans (~1,450 sq ft) engineered for high spatial efficiency.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">Full Lifestyle Amenities:</strong> Swimming pool, air-conditioned community hall, modern gym, home mini-theatre, and kids park.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5" />
                      <span><strong className="font-semibold text-[#181715]">Solid Block Masonry &amp; Sewage Treatment:</strong> Built with 8” thick solid blocks and equipped with an on-site sewage treatment plant (STP).</span>
                    </li>
                  </ul>
                </div>

                {/* More Details Button */}
                <div className="pt-3">
                  <Link
                    href="/projects/uptown-residences"
                    className="inline-flex items-center flex-nowrap gap-2 px-5 py-2.5 bg-[#181715] text-white text-[11px] font-sans tracking-[0.18em] uppercase font-semibold rounded-full border border-[#2D2A26] hover:border-[#CBB8A0] hover:bg-[#25221E] transition-all cursor-pointer shadow-none group whitespace-nowrap shrink-0"
                    id="about-more-details-uptown-btn"
                  >
                    <span className="whitespace-nowrap inline-block">More Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B8936D] shrink-0" />
                  </Link>
                </div>
              </div>

              {/* Picture Slot for UPTOWN */}
              <div className="lg:col-span-6">
                <DynamicPictureSlot
                  slotId="about_uptown_img"
                  title="UPTOWN — 110 Apartments in Eachanari"
                  caption="Modern budget apartment enclave 500m from Eachanari Temple."
                  orientation="landscape"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Section 5: Standard Technical Specifications Table */}
        <ScrollReveal className="p-6 sm:p-10 text-xs space-y-6 bg-[#ECE7DF] border border-[#D5CDBF] rounded-xl shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D5CDBF] pb-4 gap-2">
            <span className="flex items-center gap-2 text-[#181715] tracking-[0.18em] uppercase font-bold text-[11px]">
              <Compass className="w-4 h-4 text-[#B8936D]" />
              STANDARD TECHNICAL &amp; BRAND SPECIFICATIONS
            </span>
            <span className="text-[10px] text-[#7A6F60] font-sans">Coimbatore Operations Standard</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-[#2D2821]">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#8C7A65] tracking-wider block">
                STRUCTURAL SYSTEM
              </span>
              <p className="leading-relaxed">
                RCC Framed structure with isolated footing foundation &amp; 8” thick AAC blocks / Solid blocks / Porotherm bricks.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#8C7A65] tracking-wider block">
                FLOORING &amp; JOINERY
              </span>
              <p className="leading-relaxed">
                800x800mm Vitrified tiles in living/bedrooms, anti-skid ceramic tiles in toilets/balconies, teakwood door frames.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#8C7A65] tracking-wider block">
                ELECTRICAL &amp; CABLES
              </span>
              <p className="leading-relaxed">
                Fire-resistant ISO branded Finolex/Polycab products, GM / Legrand modular switches, power backup provided.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#8C7A65] tracking-wider block">
                PLUMBING &amp; SANITARY
              </span>
              <p className="leading-relaxed">
                Concealed CPVC lines, UPVC plumbing, Roca / Kohler / American Standard CP and sanitary fittings.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#8C7A65] tracking-wider block">
                COMPLIANCE &amp; GEOMETRY
              </span>
              <p className="leading-relaxed">
                100% Vasthu &amp; Manaiyadi compliant proportions, DTCP &amp; RERA approved layouts across Coimbatore.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#8C7A65] tracking-wider block">
                WATER &amp; UTILITIES
              </span>
              <p className="leading-relaxed">
                Siruvani water connections, hydro-pneumatic RO treated water, on-site sewage treatment &amp; rainwater harvesting.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 6: Direct Project Inquiry & Commission Estimator Module */}
        <div id="about-inquiries" className="pt-4">
          <CommissionEstimator />
        </div>
      </main>

      {/* Footer Colophon */}
      <footer className="border-t border-[#E5DFD4] py-8 text-center text-xs text-[#7A7061] font-sans">
        <p>
          &copy; 2016&mdash;2026 Soul Space Infrastructure.{' '}
          <a
            href="https://maps.google.com/?q=Coimbatore,+Tamil+Nadu,+India"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#B8936D] transition-colors inline-flex items-center gap-1 group/map"
          >
            <MapPin className="w-3 h-3 text-[#B8936D] group-hover/map:scale-110 transition-transform" />
            <span className="underline-offset-2 hover:underline">Coimbatore, Tamil Nadu</span>
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
