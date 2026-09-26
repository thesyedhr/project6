'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageSquare, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { BrandLogo } from '@/components/BrandLogo';

interface FooterProps {
  onOpenProject: (projectId: string) => void;
  onOpenCommission?: () => void;
}

export function Footer({ onOpenProject }: FooterProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#ECE7DF] text-[#181714] border-t border-[#D5CDBF]">
      {/* Main Footer Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <ScrollReveal yOffset={32} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Brand & Details (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div>
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
                className="text-left cursor-pointer focus:outline-hidden"
                aria-label="Scroll to top of current page"
                id="footer-brand-logo-link"
              >
                <BrandLogo variant="footer" />
              </button>
              <p className="text-[10px] font-sans tracking-[0.2em] text-[#786E5F] uppercase mt-1 font-semibold">
                CIVIL CONSTRUCTION &bull; COIMBATORE, TAMIL NADU
              </p>
            </div>

            <p className="text-xs text-[#5C5346] leading-relaxed font-light max-w-md">
              Integrated residential and commercial development firm based in Coimbatore. Specializing in luxury villas, premium apartments, column-free commercial IT suites, and turnkey civil execution.
            </p>

            <div className="text-[11px] font-sans text-[#5C5346] space-y-2.5 pt-2">
              {/* Location linked to Google Maps */}
              <a
                href="https://maps.google.com/?q=Coimbatore,+Tamil+Nadu,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-[#B8936D] transition-colors group/map"
                aria-label="View Coimbatore on Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-[#B8936D] shrink-0 mt-0.5 group-hover/map:scale-110 transition-transform" />
                <span className="underline-offset-2 hover:underline">Coimbatore, Tamil Nadu, India</span>
              </a>

              {/* Phone Numbers with Call links */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Phone className="w-3.5 h-3.5 text-[#B8936D] shrink-0" />
                  <a
                    href="tel:+919677771331"
                    className="hover:text-[#B8936D] font-medium text-[#181714] transition-colors"
                    aria-label="Call +91 96777 71331"
                  >
                    +91 96777 71331
                  </a>
                  <span className="text-[#A89F91]">/</span>
                  <a
                    href="tel:+919159133331"
                    className="hover:text-[#B8936D] font-medium text-[#181714] transition-colors"
                    aria-label="Call +91 91591 33331"
                  >
                    +91 91591 33331
                  </a>
                </div>

                {/* WhatsApp links directly below */}
                <div className="flex items-center gap-3 pl-5 text-[10.5px] flex-wrap text-[#786E5F]">
                  <a
                    href="https://wa.me/919677771331?text=Hello%20Soul%20Space%20Infrastructure%2C%20I%20would%20like%20to%20inquire%20about%20your%20projects."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#B8936D] transition-colors"
                    aria-label="WhatsApp +91 96777 71331"
                  >
                    <MessageSquare className="w-3 h-3 text-[#B8936D]" />
                    <span>WhatsApp: +91 96777 71331</span>
                  </a>
                  <span>&bull;</span>
                  <a
                    href="https://wa.me/919159133331?text=Hello%20Soul%20Space%20Infrastructure%2C%20I%20would%20like%20to%20inquire%20about%20your%20projects."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#B8936D] transition-colors"
                    aria-label="WhatsApp +91 91591 33331"
                  >
                    <MessageSquare className="w-3 h-3 text-[#B8936D]" />
                    <span>WhatsApp: +91 91591 33331</span>
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B8936D] shrink-0" />
                <a
                  href="mailto:soulspaceinfrastructure@gmail.com"
                  className="hover:text-[#B8936D] transition-colors"
                >
                  soulspaceinfrastructure@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Nav Links: Developments (3 Cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <span className="text-[11px] font-sans tracking-[0.2em] text-[#B8936D] uppercase block mb-4 font-semibold">
              FEATURED DEVELOPMENTS
            </span>
            <ul className="space-y-2.5 text-[#5C5346]">
              <li>
                <Link
                  href="/projects/mystic-villas"
                  className="hover:text-[#181714] hover:text-[#B8936D] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Mystic — Luxury Villas (Semmedu)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/aurum-villas"
                  className="hover:text-[#181714] hover:text-[#B8936D] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Aurum — Luxury Villas (Vilankurichi)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/abv-arbor"
                  className="hover:text-[#181714] hover:text-[#B8936D] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>ABV Arbor — Luxury Flats (Ramanathapuram)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/dotcom-workspaces"
                  className="hover:text-[#181714] hover:text-[#B8936D] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Dotcom — Tech Workspaces (PN Palayam)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/uptown-residences"
                  className="hover:text-[#181714] hover:text-[#B8936D] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Uptown — Modern Apartments (Eachanari)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Links: Practice (3 Cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <span className="text-[11px] font-sans tracking-[0.2em] text-[#B8936D] uppercase block mb-4 font-semibold">
              PRACTICE &amp; CRAFT
            </span>
            <ul className="space-y-2 text-[#5C5346]">
              <li>
                <button
                  onClick={() => scrollToSection('philosophy')}
                  className="hover:text-[#181714] transition-colors cursor-pointer"
                >
                  Philosophy &amp; Vasthu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('materiality')}
                  className="hover:text-[#181714] transition-colors cursor-pointer"
                >
                  Specifications &amp; Materials
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-[#181714] transition-colors cursor-pointer"
                >
                  Services &amp; Phases
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('journal')}
                  className="hover:text-[#181714] transition-colors cursor-pointer"
                >
                  Technical Journal
                </button>
              </li>
            </ul>
          </div>
        </ScrollReveal>

        {/* Bottom Colophon & Copyright Bar */}
        <div className="pt-12 mt-12 border-t border-[#D5CDBF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#786E5F]">
          <div>
            &copy; 2016&mdash;2026 SOUL SPACE INFRASTRUCTURE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6 text-[11px]">
            <a
              href="https://maps.google.com/?q=Coimbatore,+Tamil+Nadu,+India"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#B8936D] transition-colors"
            >
              <MapPin className="w-3 h-3 text-[#B8936D]" />
              <span>COIMBATORE, TAMIL NADU</span>
            </a>
            <span>&bull;</span>
            <span>ESTABLISHED 2016</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
