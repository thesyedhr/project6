'use client';

import React, { useState } from 'react';
import { Compass, Sun, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SmoothAutoHeight } from '@/components/SmoothAutoHeight';

export interface VasthuZone {
  id: string;
  name: string;
  tamilName: string;
  element: string;
  tamilElement: string;
  recommendedUse: string;
  prohibitedUse: string;
  scientificReason: string;
  manaiDimensionExample: string;
  gridRow: number;
  gridCol: number;
}

export const VASTHU_ZONES: VasthuZone[] = [
  {
    id: 'ishanya',
    name: 'North-East (Ishanya)',
    tamilName: 'ஈசான்யம் (வடகிழக்கு)',
    element: 'Water (Jal)',
    tamilElement: 'நீர் (Water)',
    recommendedUse: 'Underground Water Sump, Borewell, Pooja Sanctum, Open Lawn',
    prohibitedUse: 'Heavy Master Bedroom, Overhead Tank, Septic Tank, Heavy Staircase',
    scientificReason: 'In Tamil Nadu (11°N latitude), early morning soft solar radiation is rich in beneficial UV-A rays. Keeping the North-East light, low, and open allows germicidal sunlight to naturally sterilize underground water reservoirs and infuse living areas with morning circadian alertness.',
    manaiDimensionExample: '11 ft × 11 ft / 16 ft × 21 ft (Dhana Ayadi Harmony)',
    gridRow: 1,
    gridCol: 3,
  },
  {
    id: 'indra',
    name: 'East (Poorva)',
    tamilName: 'கிழக்கு',
    element: 'Solar Light (Tejas)',
    tamilElement: 'சூரியன் / ஒளி (Light)',
    recommendedUse: 'Main Entrance Door, Verandah (Thinnai), Living Entrance Hall, Study Room',
    prohibitedUse: 'Toilets, Heavy Store Rooms, Closed Solid Walls without Windows',
    scientificReason: 'Captures early sunrise angles before solar heat intensifies. Facilitates psychological morning freshness and fills living halls with warm natural daylight, eliminating the need for daytime electric illumination.',
    manaiDimensionExample: '16 ft × 24 ft (Gaja Ayadi Strength)',
    gridRow: 2,
    gridCol: 3,
  },
  {
    id: 'agni',
    name: 'South-East (Agneya)',
    tamilName: 'ஆக்னேயம் (தென்கிழக்கு)',
    element: 'Fire (Agni)',
    tamilElement: 'நெருப்பு (Fire)',
    recommendedUse: 'Modular Kitchen, Inverter / Battery Hub, Main Electrical DB Panel, Utility Wash',
    prohibitedUse: 'Borewell, Underground Sump, Master Bedroom, Pooja Room',
    scientificReason: 'In Coimbatore and western Tamil Nadu, prevailing tropical winds cycle through the Palghat wind corridor (SW & NE Monsoons). Locating the kitchen in the South-East ensures cooking fumes, heat, and oil aerosols exhaust directly out of the building envelope without contaminating bedrooms.',
    manaiDimensionExample: '10 ft × 12 ft / 11 ft × 14 ft (Auspicious Manai)',
    gridRow: 3,
    gridCol: 3,
  },
  {
    id: 'yama',
    name: 'South (Dakshina)',
    tamilName: 'தெற்கு',
    element: 'Earth & Stability',
    tamilElement: 'நிலம் / திண்மை (Earth)',
    recommendedUse: 'Heavy RCC Staircase, Structural Load Walls, Dining Room, Wardrobes',
    prohibitedUse: 'Main Entrance (unless specific Manai grid), Borewell, Open Water Bodies',
    scientificReason: 'The southern sun delivers peak thermal load throughout South India afternoons. Constructing high-density masonry, stairwells, and buffer walls on the south provides natural thermal lag, keeping interior family spaces cool.',
    manaiDimensionExample: '14 ft × 21 ft (Vriddha Ayadi Alignment)',
    gridRow: 3,
    gridCol: 2,
  },
  {
    id: 'niruthi',
    name: 'South-West (Niruthi / Kubera)',
    tamilName: 'நிருதி (தென்மேற்கு)',
    element: 'Heavy Earth (Prithvi)',
    tamilElement: 'பூமி / ஸ்திரத்தன்மை (Dense Earth)',
    recommendedUse: 'Master Bedroom Suite, Family Safe / Treasury, Overhead RCC Water Tank',
    prohibitedUse: 'Underground Sump, Well, Main Gate, Kitchen, Pooja Room',
    scientificReason: 'South-West is the highest and heaviest structural zone. Building the master suite and overhead water tank here acts as a physical thermal shield against blistering afternoon infrared radiation while providing maximum acoustic privacy and restful deep sleep.',
    manaiDimensionExample: '16 ft × 16 ft / 16 ft × 21 ft (Simha Ayadi)',
    gridRow: 3,
    gridCol: 1,
  },
  {
    id: 'varuna',
    name: 'West (Paschima)',
    tamilName: 'மேற்கு',
    element: 'Atmosphere (Vayu / Water)',
    tamilElement: 'நீர் / காற்று (Atmosphere)',
    recommendedUse: 'Children’s Bedroom, Study Library, Dining Hall, Overhead Tank Structure',
    prohibitedUse: 'Pooja Room, Open Balcony with low wall, Low-lying Water sump',
    scientificReason: 'Western sun is hot in late afternoon but rapidly recedes by sunset. Shaded by trees or terrace overhangs, this zone provides serene, quiet quarters for evening focus and family dining.',
    manaiDimensionExample: '12 ft × 16 ft (Auspicious Manai Count)',
    gridRow: 2,
    gridCol: 1,
  },
  {
    id: 'vayu',
    name: 'North-West (Vayuvya)',
    tamilName: 'வாயுவியம் (வடமேற்கு)',
    element: 'Air / Motion (Vayu)',
    tamilElement: 'காற்று (Air)',
    recommendedUse: 'Guest Bedroom, Attached Toilets, Septic Tank, Covered Car Parking Porch',
    prohibitedUse: 'Master Bedroom, Pooja Sanctum, Heavy Safe / Vault',
    scientificReason: 'Acts as the convective pressure escape valve. Thermal updrafts naturally carry air impurities, septic odors, and moisture away towards the North-West, keeping the core living sanctum pristine and fresh.',
    manaiDimensionExample: '11 ft × 14 ft / 12 ft × 15 ft (Dhwaja Ayadi)',
    gridRow: 1,
    gridCol: 1,
  },
  {
    id: 'kubera',
    name: 'North (Uttara)',
    tamilName: 'வடக்கு',
    element: 'Magnetic Flux & Light',
    tamilElement: 'காந்த விசை / செல்வம் (Flux)',
    recommendedUse: 'Open Living Balcony, Family Treasury / Cash Box, Executive Home Office, Garden',
    prohibitedUse: 'Heavy RCC Staircase, Heavy Storage, Septic Tank, Kitchen',
    scientificReason: 'In the northern hemisphere, north-facing apertures provide consistent, shadowless, glare-free indirect sunlight all day with near-zero heat penalty. Perfect for reading, executive work, and open terrace gardens.',
    manaiDimensionExample: '16 ft × 20 ft (Auspicious Prosperity Manai)',
    gridRow: 1,
    gridCol: 2,
  },
  {
    id: 'brahmasthanam',
    name: 'Center (Brahmasthanam)',
    tamilName: 'பிரம்மஸ்தானம் (முற்றம்)',
    element: 'Space / Ether (Akasha)',
    tamilElement: 'ஆகாயம் / வெளி (Space)',
    recommendedUse: 'Traditional Open Courtyard (Mutram), Sky-lit Atrium, Unobstructed Family Hall',
    prohibitedUse: 'Heavy Structural Columns, Staircases, Toilets, Beams across Center',
    scientificReason: 'The traditional Tamil Nadu "Thotti Veedu" / central Mutram generates a continuous natural "Thermal Chimney" (Stack Effect). Hot indoor air naturally rises and exhausts through the high central skylight, pulling cool fresh air in through shaded ground-level windows.',
    manaiDimensionExample: 'Open Uncluttered Span (Zero Column Point)',
    gridRow: 2,
    gridCol: 2,
  },
];

export function VasthuMandala() {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('ishanya');
  const [activeTab, setActiveTab] = useState<'scientific' | 'traditional' | 'manai'>('scientific');

  const selectedZone = VASTHU_ZONES.find((z) => z.id === selectedZoneId) || VASTHU_ZONES[0];

  return (
    <div className="border border-[#DCD5C8] bg-[#FAF8F4] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-none relative overflow-hidden">
      {/* Top Section Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-[#E0D9CB] pb-8 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[#B8936D] text-[9px] tracking-[0.25em] uppercase mb-2 font-bold">
            <Compass className="w-3.5 h-3.5 text-[#B8936D]" />
            <span>AUTHENTIC TAMIL VASTHU &amp; MANAIYADI SHASTRA</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#181714] font-normal tracking-tight">
              Vastu Spatial Mandala
            </h3>
            <span className="text-xs sm:text-sm font-sans font-medium text-[#B8936D] px-3 py-0.5 bg-[#B8936D]/10 rounded-full border border-[#B8936D]/20">
              மனை அடி சாஸ்திரம்
            </span>
          </div>

          <p className="text-xs text-[#6B6153] mt-2 font-light max-w-2xl leading-relaxed">
            Calibrated for Tamil Nadu&apos;s tropical latitude (11°N Coimbatore) and the Palghat gap wind corridor. Click any direction to explore scientific climate engineering alongside sacred Manai proportions.
          </p>
        </div>

        {/* Unified Mode Switcher - Adaptive on mobile, horizontal pill on desktop */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-1.5 bg-[#E8E2D7] p-1.5 rounded-xl sm:rounded-full border border-[#DDD5C7] self-stretch sm:self-start xl:self-center shrink-0">
          <button
            onClick={() => setActiveTab('scientific')}
            className={`px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-lg sm:rounded-full text-xs font-sans text-center transition-all duration-200 cursor-pointer border ${
              activeTab === 'scientific'
                ? 'bg-[#181715] text-white font-semibold border-[#2D2A26] hover:border-[#CBB8A0] shadow-none'
                : 'text-[#5C5346] hover:text-black border-transparent hover:border-[#CBB8A0]'
            }`}
          >
            Scientific &amp; Climatic
          </button>
          <button
            onClick={() => setActiveTab('traditional')}
            className={`px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-lg sm:rounded-full text-xs font-sans text-center transition-all duration-200 cursor-pointer border ${
              activeTab === 'traditional'
                ? 'bg-[#181715] text-white font-semibold border-[#2D2A26] hover:border-[#CBB8A0] shadow-none'
                : 'text-[#5C5346] hover:text-black border-transparent hover:border-[#CBB8A0]'
            }`}
          >
            Tamil Shastra <span className="text-[10px] opacity-75">(சாஸ்திரம்)</span>
          </button>
          <button
            onClick={() => setActiveTab('manai')}
            className={`px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-lg sm:rounded-full text-xs font-sans text-center transition-all duration-200 cursor-pointer border ${
              activeTab === 'manai'
                ? 'bg-[#181715] text-white font-semibold border-[#2D2A26] hover:border-[#CBB8A0] shadow-none'
                : 'text-[#5C5346] hover:text-black border-transparent hover:border-[#CBB8A0]'
            }`}
          >
            Manai Ratios <span className="text-[10px] opacity-75">(மனை அளவு)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive 9-Square Mandala + Real-time Scientific Blueprint Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: 9-Box Mandala Interactive Compass (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex flex-wrap items-center justify-between text-xs font-sans text-[#786E5F] px-1 mb-2 gap-2">
              <span className="font-semibold uppercase tracking-widest text-[10px] text-[#B8936D]">VASTU MANDALA GRID (3×3)</span>
              <div className="flex items-center gap-2">
                <span className="text-[#5C5346] font-medium text-[10px]">
                  ACTIVE: <strong className="text-[#181714] uppercase">{selectedZone.name}</strong>
                </span>
                <span className="text-[#D5CDBF]">&bull;</span>
                <span className="text-[#5C5346] font-medium text-[10px]" title="Fixed blueprint orientation facing True Geographic North">
                  GRID NORTH ⬆ <span className="text-[9px] opacity-75">(வடக்கு)</span>
                </span>
              </div>
            </div>

            <div className="relative aspect-square w-full max-w-[420px] mx-auto p-2 bg-[#EAE4D9] rounded-2xl border border-[#D5CDBF] shadow-inner grid grid-cols-3 grid-rows-3 gap-2">
              {/* 1. North-West (Vayu) */}
              {renderMandalaCell('vayu', 'NW', 'வாயுவியம்', 'Air (காற்று)', selectedZoneId, setSelectedZoneId)}
              {/* 2. North (Kubera) */}
              {renderMandalaCell('kubera', 'NORTH', 'வடக்கு', 'Magnetic Flux', selectedZoneId, setSelectedZoneId)}
              {/* 3. North-East (Ishanya) */}
              {renderMandalaCell('ishanya', 'NE', 'ஈசான்யம்', 'Water (நீர்)', selectedZoneId, setSelectedZoneId)}
              {/* 4. West (Varuna) */}
              {renderMandalaCell('varuna', 'WEST', 'மேற்கு', 'Atmosphere (காற்று)', selectedZoneId, setSelectedZoneId)}
              {/* 5. Center (Brahmasthanam) */}
              {renderMandalaCell('brahmasthanam', 'CENTER', 'பிரம்மஸ்தானம்', 'Space (முற்றம்)', selectedZoneId, setSelectedZoneId, true)}
              {/* 6. East (Indra) */}
              {renderMandalaCell('indra', 'EAST', 'கிழக்கு', 'Solar (சூரியன்)', selectedZoneId, setSelectedZoneId)}
              {/* 7. South-West (Niruthi) */}
              {renderMandalaCell('niruthi', 'SW', 'நிருதி', 'Earth (நிலம்)', selectedZoneId, setSelectedZoneId)}
              {/* 8. South (Yama) */}
              {renderMandalaCell('yama', 'SOUTH', 'தெற்கு', 'Earth / Mass', selectedZoneId, setSelectedZoneId)}
              {/* 9. South-East (Agni) */}
              {renderMandalaCell('agni', 'SE', 'ஆக்னேயம்', 'Fire (நெருப்பு)', selectedZoneId, setSelectedZoneId)}
            </div>
          </div>

          {/* Compass Orientation Callout */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#F4F2EB] rounded-xl border border-[#DDD5C7] text-[11px] font-sans text-[#5C5346]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B8936D]" />
              <span>Coimbatore Solar Azimuth: <strong>11°00′ N</strong></span>
            </span>
            <span className="text-[#B8936D] font-medium">100% Soul Space Calibrated</span>
          </div>
        </div>

        {/* Right: Dynamic Detailed Scientific / Shastra Assessment Dossier (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <SmoothAutoHeight duration={0.36} className="h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedZone.id}-${activeTab}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#F4F2EB] border border-[#DCD5C8] rounded-2xl p-6 sm:p-8 shadow-none flex flex-col justify-between h-full space-y-6"
              >
              <div>
                {/* Header Information Bar with Clean Alignment */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2DCCE] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider bg-[#B8936D]/10 text-[#B8936D] border border-[#B8936D]/20">
                        {selectedZone.tamilElement}
                      </span>
                      <span className="text-xs font-sans text-[#786E5F] uppercase tracking-wider font-medium">
                        Pancha Bootham: {selectedZone.element}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-baseline gap-2 pt-1">
                      <h4 className="font-serif text-2xl sm:text-3xl text-[#181714] font-normal tracking-tight">
                        {selectedZone.name}
                      </h4>
                      <span className="text-sm sm:text-base font-sans font-medium text-[#B8936D]">
                        &bull; {selectedZone.tamilName}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-sans text-[#8C7A65] block uppercase tracking-widest font-semibold">COORDINATE</span>
                    <span className="font-sans text-sm text-[#181714] font-medium">Zone 0{selectedZone.gridRow}{selectedZone.gridCol}</span>
                  </div>
                </div>

                {/* View 1: Scientific & Micro-Climatic Reason */}
                {activeTab === 'scientific' && (
                  <div className="space-y-4 mt-5">
                    <div className="p-4 sm:p-5 bg-[#FAF8F4] rounded-xl border border-[#E0D9CB]">
                      <div className="flex items-center gap-2 text-[#B8936D] text-[10px] font-sans font-bold uppercase tracking-widest mb-2">
                        <Sun className="w-3.5 h-3.5 text-[#B8936D]" />
                        <span>TROPICAL SOLAR &amp; PALGHAT WIND DYNAMICS</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#3E3830] leading-relaxed font-light">
                        {selectedZone.scientificReason}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="p-4 bg-[#FAF8F4] rounded-xl border border-[#DFD8CC]">
                        <span className="text-[10px] font-sans text-[#181714] font-bold uppercase tracking-wider block mb-1.5">
                          ✓ Scientific Room Allocation
                        </span>
                        <p className="text-xs text-[#3E3830] leading-relaxed">
                          {selectedZone.recommendedUse}
                        </p>
                      </div>

                      <div className="p-4 bg-[#EFE9E2] rounded-xl border border-[#DCD5C8]">
                        <span className="text-[10px] font-sans text-[#785E48] font-bold uppercase tracking-wider block mb-1.5">
                          ✕ Climate &amp; Health Restriction
                        </span>
                        <p className="text-xs text-[#5C4A3A] leading-relaxed">
                          {selectedZone.prohibitedUse}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* View 2: Traditional Tamil Shastra */}
                {activeTab === 'traditional' && (
                  <div className="space-y-4 mt-5">
                    <div className="p-4 sm:p-5 bg-[#FAF8F4] rounded-xl border border-[#E0D9CB]">
                      <div className="flex items-center gap-2 text-[#B8936D] text-[10px] font-sans font-bold uppercase tracking-widest mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#B8936D]" />
                        <span>TRADITIONAL VASTU PURUSHA MANDALA SPATIAL HARMONY</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#3E3830] leading-relaxed font-light">
                        In authentic Tamil Vastu Purusha Mandala (வாஸ்து புருஷ மண்டலம்), spatial energy flows diagonally from <strong>Ishanya (North-East)</strong> through the central <strong>Brahmasthanam (Center)</strong> to anchor in <strong>Niruthi (South-West)</strong>.
                      </p>
                      <p className="text-xs sm:text-sm text-[#3E3830] leading-relaxed font-light mt-2">
                        Aligning room functions with natural elements and cardinal directions brings tranquility (சாந்தி), enduring prosperity (ஐஸ்வர்யம்), and healthy positive airflow to generations of occupants.
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 bg-[#FAF8F4] rounded-xl border border-[#DFD8CC] space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-baseline gap-1.5 sm:gap-4 pb-2.5 border-b border-[#E5DFD4]">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#786E5F]">
                          PANCHA BOOTHAM
                        </span>
                        <span className="text-xs font-sans font-bold text-[#181714]">
                          {selectedZone.tamilElement}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-baseline gap-1.5 sm:gap-4 pb-2.5 border-b border-[#E5DFD4]">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#786E5F]">
                          DIRECTION / ZONE
                        </span>
                        <span className="text-xs font-sans font-semibold text-[#B8936D]">
                          {selectedZone.name}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-baseline gap-1.5 sm:gap-4">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#786E5F]">
                          RECOMMENDED ALLOCATION
                        </span>
                        <span className="text-xs font-sans text-[#2E2820] leading-relaxed">
                          {selectedZone.recommendedUse}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* View 3: Manaiyadi Proportions */}
                {activeTab === 'manai' && (
                  <div className="space-y-4 mt-5">
                    <div className="p-4 sm:p-5 bg-[#FAF8F4] rounded-xl border border-[#E0D9CB]">
                      <div className="flex items-center gap-2 text-[#B8936D] text-[10px] font-sans font-bold uppercase tracking-widest mb-2">
                        <Layers className="w-3.5 h-3.5 text-[#B8936D]" />
                        <span>MANAIYADI SHASTRA HARMONIC RATIOS (மனை அடி)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#3E3830] leading-relaxed font-light">
                        Every room dimension in Soul Space&apos;s <strong>AURUM Luxury Villas</strong> and <strong>ABV ARBOR Suites</strong> is proportioned in accordance with classical Manaiyadi measurements (multiples of auspicious feet).
                      </p>
                      <div className="mt-3 p-3 bg-[#F4F2EB] rounded-lg border border-[#DFD8CC] flex items-center justify-between text-xs font-sans">
                        <span className="text-[#5C5346] font-medium">Standard Recommended Manai Dimension:</span>
                        <span className="text-[#B8936D] font-bold">{selectedZone.manaiDimensionExample}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#FAF8F4] rounded-xl border border-[#DFD8CC] text-xs text-[#5C5346] space-y-1 font-light">
                      <p>• <strong>Dhana Ayadi (Income)</strong> exceeds Vyaya (Expense) calculations in all floor plans.</p>
                      <p>• Designed for acoustic resonance, natural air circulation, and structural timber/steel modularity.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Verified Soul Space Standard Footer */}
              <div className="pt-4 border-t border-[#E5DFD4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-sans text-[#786E5F]">
                <span className="flex items-center gap-1.5 text-[#5C5346] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B8936D]" />
                  <span>100% Certified in Aurum Villas &amp; ABV Arbor Developments</span>
                </span>
                <span className="text-[#B8936D] font-semibold">COIMBATORE SOUL SPACE STANDARD</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </SmoothAutoHeight>
      </div>
      </div>
    </div>
  );
}

function renderMandalaCell(
  id: string,
  code: string,
  tamil: string,
  sub: string,
  selectedId: string,
  onSelect: (id: string) => void,
  isCenter = false
) {
  const isSelected = selectedId === id;

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`relative rounded-xl p-2 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer overflow-hidden border ${
        isSelected
          ? 'bg-[#181715] text-white border-[#2D2A26] hover:border-[#CBB8A0] shadow-none scale-[1.02] z-10'
          : isCenter
          ? 'bg-[#F2EAE0] text-[#181714] border-[#D5C6B5] hover:border-[#CBB8A0]'
          : 'bg-[#FAF8F5] text-[#2D2821] border-[#DDD5C7] hover:border-[#CBB8A0]'
      }`}
    >
      <span className={`text-[8.5px] font-sans font-bold tracking-wider uppercase block ${isSelected ? 'text-[#C5A880]' : isCenter ? 'text-[#B8936D]' : 'text-[#8C7A65]'}`}>
        {code}
      </span>
      <span className="text-[11px] sm:text-xs font-sans font-medium leading-tight mt-0.5 block w-full px-0.5 break-words">
        {tamil}
      </span>
      <span className={`text-[8px] font-sans mt-0.5 truncate w-full block ${isSelected ? 'text-white/90' : 'text-[#7A7061]'}`}>
        {sub}
      </span>
      {isSelected && (
        <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
      )}
    </button>
  );
}
