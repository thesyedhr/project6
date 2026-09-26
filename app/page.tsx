'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { IdentityBanner } from '@/components/IdentityBanner';
import { AboutSummarySection } from '@/components/AboutSummarySection';
import { SelectedWorks } from '@/components/SelectedWorks';
import { MasterPortfolioMap } from '@/components/MasterPortfolioMap';
import { Studio } from '@/components/Studio';
import { ProjectModal } from '@/components/ProjectModal';
import { Philosophy } from '@/components/Philosophy';
import { Materiality } from '@/components/Materiality';
import { Services } from '@/components/Services';
import { CommissionEstimator } from '@/components/CommissionEstimator';
import { MonographJournal } from '@/components/MonographJournal';
import { Footer } from '@/components/Footer';
import { PROJECTS, Project } from '@/data/projects';
import { AnimatePresence } from 'motion/react';

export default function HomePage() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [inquireTypology, setInquireTypology] = useState<string>('residential');

  const selectedProject = selectedProjectId
    ? PROJECTS.find((p) => p.id === selectedProjectId) || null
    : null;

  const handleOpenProject = (id: string) => {
    setSelectedProjectId(id);
  };

  const handleOpenProjectByTitle = (title: string) => {
    const found = PROJECTS.find(
      (p) => p.title.toLowerCase() === title.toLowerCase()
    );
    if (found) {
      setSelectedProjectId(found.id);
    } else {
      const partial = PROJECTS.find((p) =>
        p.title.toLowerCase().includes(title.toLowerCase())
      );
      if (partial) setSelectedProjectId(partial.id);
    }
  };

  const handleOpenCommission = (typology?: string) => {
    if (typology) setInquireTypology(typology);
    const el = document.getElementById('inquiries');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreWorks = () => {
    const el = document.getElementById('works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#1D1B18] flex flex-col justify-between selection:bg-[#B8936D] selection:text-white">
      {/* Primary Global Navigation */}
      <Navbar
        onOpenProject={handleOpenProject}
        onOpenCommission={() => handleOpenCommission()}
      />

      {/* Flagship Hero Section */}
      <Hero
        onOpenProject={handleOpenProject}
        onExploreWorks={handleExploreWorks}
      />

      {/* Brand Identity Lockup & Featured Showcase Section */}
      <IdentityBanner onOpenProject={handleOpenProject} />

      {/* About Soul Space Infrastructure — Practice Summary */}
      <AboutSummarySection />

      {/* Works Archive */}
      <SelectedWorks onOpenProject={handleOpenProject} />

      {/* Interactive Master Portfolio Territory Map */}
      <MasterPortfolioMap onOpenProject={handleOpenProject} />

      {/* About Soul Space Infrastructure — Practice Profile */}
      <Studio />

      {/* Philosophy, Manifesto & Daylight Simulator */}
      <Philosophy />

      {/* Materiality & Tectonics */}
      <Materiality onOpenProjectByTitle={handleOpenProjectByTitle} />

      {/* Disciplines of Practice & Delivery Methodology */}
      <Services onOpenCommission={() => handleOpenCommission()} />

      {/* Monograph Archival Journal & Essays */}
      <MonographJournal />

      {/* Commission Feasibility Estimator & Inquiries */}
      <CommissionEstimator initialTypology={inquireTypology} />

      {/* Global Footer & Colophon */}
      <Footer
        onOpenProject={handleOpenProject}
        onOpenCommission={() => handleOpenCommission()}
      />

      {/* Project Case Study Dossier Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProjectId(null)}
            onInquireTypology={handleOpenCommission}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
