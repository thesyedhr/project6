export interface Material {
  id: string;
  name: string;
  category: string;
  origin: string;
  density: string;
  embodiedCarbon: string;
  finish: string;
  tactileDescription: string;
  provenance: string;
  structuralUtility: string;
  agingBehavior: string;
  image: string;
  featuredIn: string[];
}

export const MATERIALS: Material[] = [
  {
    id: 'teak-joinery',
    name: 'Seasoned Teakwood & Melamine Veneer',
    category: 'Natural Timber',
    origin: 'First-Quality Seasoned Teak, India',
    density: '660 kg/m³',
    embodiedCarbon: 'Sustainable Timber Standard',
    finish: 'Melamine Polished Matte / Yale Digital Locks',
    tactileDescription: 'Warm, hand-finished grain with tactile depth and precision flush-fit hardware.',
    provenance: 'Selected seasoned hardwood frames with mortise joinery and architectural hardware.',
    structuralUtility: 'Main doors, bespoke internal frames, acoustic room divisions, and architraves.',
    agingBehavior: 'Deepens in honey-gold richness over time with superior resistance to humidity.',
    image: '',
    featuredIn: ['MYSTIC', 'AURUM', 'ABV ARBOR', 'UPTOWN'],
  },
  {
    id: 'pt-concrete',
    name: 'Post-Tensioned (PT) M25 Concrete',
    category: 'Structural Core',
    origin: 'Automated Batching Plants, Tamil Nadu',
    density: '2,450 kg/m³',
    embodiedCarbon: 'Optimized Cement Ratio',
    finish: 'Monolithic Smooth Shuttered / Column-Free',
    tactileDescription: 'Ultra-dense structural finish providing expansive uninterrupted floor spans.',
    provenance: 'High-tensile steel tendon prestressing embedded within M25/M30 grade concrete matrices.',
    structuralUtility: 'Column-free IT office floor plates, seismic foundations, and cantilever decks.',
    agingBehavior: 'Permanent structural consolidation with zero deflection over multi-decade cycles.',
    image: '',
    featuredIn: ['MYSTIC', 'DOTCOM', 'ABV ARBOR', 'AURUM'],
  },
  {
    id: 'vitrified-slabs',
    name: '800x800mm Vitrified & Laminated Slabs',
    category: 'Floor Finishes',
    origin: 'Premium Ceramic Tile Hubs, India',
    density: '2,350 kg/m³',
    embodiedCarbon: 'Low VOC Certified',
    finish: 'Nano-Polished Gloss & Satin Matte',
    tactileDescription: 'Silky, dust-resistant surface with minimal joint lines and high reflectivity.',
    provenance: 'High-pressure hydraulic pressed porcelain tiles with anti-skid bathroom surfaces.',
    structuralUtility: 'Living areas, executive lounges, private bedrooms, and corridor lobbies.',
    agingBehavior: 'Stain-proof, scratch-resistant surface maintaining showroom luster for decades.',
    image: '',
    featuredIn: ['MYSTIC', 'AURUM', 'ABV ARBOR', 'UPTOWN'],
  },
  {
    id: 'brass-sanitary',
    name: 'Kohler & Roca Engineered Brassware',
    category: 'Fixtures & Fittings',
    origin: 'International Certified Manufacturing',
    density: '8,400 kg/m³',
    embodiedCarbon: '100% Recyclable Brass Body',
    finish: 'Polished Chrome & PVD Brushed Finishes',
    tactileDescription: 'Heavy-gauge solid brass fittings with ceramic disc cartridges for effortless flow.',
    provenance: 'Precision German/Spanish engineered CP sanitary fittings with water-saving aerators.',
    structuralUtility: 'Hydro-pneumatic pressurized water networks, master bathrooms, and wellness suites.',
    agingBehavior: 'Corrosion-free electroplated surfaces resistant to hard water mineral exposure.',
    image: '',
    featuredIn: ['MYSTIC', 'AURUM', 'ABV ARBOR', 'DOTCOM'],
  },
];
