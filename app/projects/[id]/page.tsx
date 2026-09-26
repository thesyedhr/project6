import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProjectBySlug, FULL_PROJECTS_DATA } from '@/data/projectDataFull';
import { ProjectPageClient } from '@/components/ProjectPageClient';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return [
    { id: 'aurum-villas' },
    { id: 'abv-arbor' },
    { id: 'dotcom-workspaces' },
    { id: 'mystic-villas' },
    { id: 'uptown-residences' },
    { id: 'aurum' },
    { id: 'abv' },
    { id: 'dotcom' },
    { id: 'mystic' },
    { id: 'uptown' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectBySlug(id);

  if (!project) {
    return {
      title: 'Project Dossier | Soul Space Infrastructure',
    };
  }

  return {
    title: `${project.title} — ${project.tagline} | Soul Space Infrastructure`,
    description: `${project.subtitle} High-end residential & commercial architectural portfolio in Coimbatore.`,
    openGraph: {
      title: `${project.title} | Soul Space Infrastructure`,
      description: project.subtitle,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectBySlug(id);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}
