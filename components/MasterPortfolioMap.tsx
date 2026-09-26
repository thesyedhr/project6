'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { 
  MapPin, 
  Navigation, 
  Compass, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Sparkles, 
  Car, 
  Building2, 
  ExternalLink,
  ArrowUpRight,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECT_MAP_DATA } from '@/data/projectMapData';
import { ScrollReveal } from '@/components/ScrollReveal';

// Architectural Sand Palette
const ARCHITECTURAL_SAND_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#F3EFE6' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#FAF8F5' }, { weight: 3 }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#4A4237' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8C6F4E' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#E9E4D8' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#E1DDCF' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#FFFFFF' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#DFD8CA' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#E7DCB9' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#CDBE99' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#E5DFD4' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#CAD7D2' }],
  },
];

// Midnight Obsidian Palette
const MIDNIGHT_OBSIDIAN_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#141312' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1A1816' }, { weight: 4 }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#B0A799' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#D4B38C' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#1E1C1A' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#252320' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#3A3228' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#6B573D' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#162329' }],
  },
];

// Coimbatore Master Centroid
const MASTER_CENTER = { lat: 11.0045, lng: 76.9616 };
const MASTER_ZOOM = 11;

interface MasterPortfolioMapProps {
  onOpenProject?: (projectId: string) => void;
}

export function MasterPortfolioMap({ onOpenProject }: MasterPortfolioMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const [mapTheme, setMapTheme] = useState<'sand' | 'noir' | 'satellite'>('sand');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const projectsList = useMemo(() => Object.values(PROJECT_MAP_DATA), []);
  const activeProject = useMemo(
    () => (selectedProjectId ? PROJECT_MAP_DATA[selectedProjectId] : null),
    [selectedProjectId]
  );

  // Intercept Ctrl/Cmd + Wheel to zoom the map and prevent browser whole-page zoom; normal scroll flows through untouched
  useEffect(() => {
    const el = mapWrapperRef.current;
    if (!el) return;

    let accumulatedDelta = 0;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        // PREVENT full-page browser zooming and zoom map
        e.preventDefault();
        e.stopPropagation();

        if (mapInstanceRef.current) {
          accumulatedDelta += -e.deltaY;
          if (Math.abs(accumulatedDelta) >= 40) {
            const step = accumulatedDelta > 0 ? 1 : -1;
            const currentZoom = mapInstanceRef.current.getZoom() || MASTER_ZOOM;
            mapInstanceRef.current.setZoom(Math.min(Math.max(currentZoom + step, 3), 20));
            accumulatedDelta = 0;
          }
        }
      }
      // On normal scroll without Ctrl: do not preventDefault, do not show prompts, let page scroll naturally with zero map reaction
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  // Load Map
  useEffect(() => {
    let isMounted = true;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyDSEdnrFfGTjSrFjAFjwZrcKM2WLkcFQTE';

    setOptions({
      key: apiKey,
      v: 'weekly',
    });

    Promise.all([
      importLibrary('maps') as Promise<google.maps.MapsLibrary>,
      importLibrary('marker') as Promise<google.maps.MarkerLibrary>,
    ])
      .then(([{ Map }, { Marker }]) => {
        if (!isMounted || !mapContainerRef.current) return;

        const map = new Map(mapContainerRef.current, {
          center: MASTER_CENTER,
          zoom: MASTER_ZOOM,
          mapTypeId: mapTheme === 'satellite' ? google.maps.MapTypeId.HYBRID : google.maps.MapTypeId.ROADMAP,
          styles: mapTheme === 'sand' ? ARCHITECTURAL_SAND_STYLE : mapTheme === 'noir' ? MIDNIGHT_OBSIDIAN_STYLE : undefined,
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          scrollwheel: false,
          gestureHandling: 'greedy',
        });

        mapInstanceRef.current = map;

        // Render clean project markers
        projectsList.forEach((proj) => {
          const pinSvg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="58" viewBox="0 0 48 58" fill="none">
              <defs>
                <filter id="p-sh" x="0" y="0" width="48" height="58" filterUnits="userSpaceOnUse">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#141312" flood-opacity="0.32"/>
                </filter>
                <linearGradient id="goldG" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#E2C7A7"/>
                  <stop offset="0.45" stop-color="#C5A075"/>
                  <stop offset="1" stop-color="#99744C"/>
                </linearGradient>
              </defs>
              <g filter="url(#p-sh)">
                <path d="M24 3C14.6112 3 7 10.6112 7 20C7 31.5 24 48 24 48C24 48 41 31.5 41 20C41 10.6112 33.3888 3 24 3Z" fill="url(#goldG)" stroke="#FAF8F5" stroke-width="2.5"/>
                <circle cx="24" cy="20" r="7" fill="#FAF8F5"/>
                <circle cx="24" cy="20" r="4" fill="#99744C"/>
              </g>
            </svg>
          `;

          const marker = new Marker({
            position: { lat: proj.lat, lng: proj.lng },
            map,
            title: proj.projectTitle,
            zIndex: 900,
            icon: {
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(pinSvg)}`,
              scaledSize: new google.maps.Size(38, 46),
              anchor: new google.maps.Point(19, 44),
            },
          });

          marker.addListener('click', () => {
            setSelectedProjectId(proj.projectId);
            map.panTo({ lat: proj.lat, lng: proj.lng });
            map.setZoom(14);
          });

          markersRef.current.push(marker);
        });
      })
      .catch((err) => {
        console.error('Master Map load error', err);
      });

    return () => {
      isMounted = false;
    };
  }, [projectsList]);

  // Update theme
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google) return;
    const map = mapInstanceRef.current;

    if (mapTheme === 'satellite') {
      map.setMapTypeId(google.maps.MapTypeId.HYBRID);
      map.setOptions({ styles: undefined });
    } else {
      map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
      map.setOptions({
        styles: mapTheme === 'sand' ? ARCHITECTURAL_SAND_STYLE : MIDNIGHT_OBSIDIAN_STYLE,
      });
    }
  }, [mapTheme]);

  const selectProject = (id: string) => {
    setSelectedProjectId(id);
    const proj = PROJECT_MAP_DATA[id];
    if (proj && mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat: proj.lat, lng: proj.lng });
      mapInstanceRef.current.setZoom(14);
    }
  };

  const resetMasterView = () => {
    setSelectedProjectId(null);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo(MASTER_CENTER);
      mapInstanceRef.current.setZoom(MASTER_ZOOM);
    }
  };

  return (
    <section id="portfolio-map" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E5DFD4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-[#99744C] text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-bold font-sans">
            <span className="w-3 h-px bg-[#B8936D]" />
            <span>COIMBATORE TERRITORY RADAR</span>
            <span className="w-3 h-px bg-[#B8936D]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#181715] font-normal tracking-[-0.025em]">
            Interactive City Cartography &amp; <br />
            <span className="italic text-[#B8936D]">Flagship Developments.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5346] font-light leading-relaxed">
            Explore Soul Space&apos;s prime residential enclaves, luxury plantation estates, and commercial tech developments across Coimbatore.
          </p>
        </ScrollReveal>

        {/* Interactive Master Map Container */}
        <ScrollReveal className="relative w-full rounded-2xl overflow-hidden border border-[#D5CDBF] bg-[#FAF8F4] shadow-sm">
          {/* Top Control Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 sm:p-5 bg-[#F3EFE6] border-b border-[#DFD8CA]">
            {/* Project Switcher Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button
                onClick={resetMasterView}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all whitespace-nowrap ${
                  selectedProjectId === null
                    ? 'bg-[#2C2218] text-[#FAF8F5] shadow-xs border border-[#3D3024]'
                    : 'bg-[#FAF8F5] text-[#5C5346] hover:bg-[#EBE4D6] border border-[#D5CDBF]'
                }`}
              >
                All Projects ({projectsList.length})
              </button>

              {projectsList.map((p) => (
                <button
                  key={p.projectId}
                  onClick={() => selectProject(p.projectId)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    selectedProjectId === p.projectId
                      ? 'bg-[#2C2218] text-[#FAF8F5] shadow-xs border border-[#3D3024]'
                      : 'bg-[#FAF8F5] text-[#5C5346] hover:bg-[#EBE4D6] border border-[#D5CDBF]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedProjectId === p.projectId ? 'bg-[#D4B38C]' : 'bg-[#B8936D]'}`} />
                  <span>{p.projectTitle}</span>
                </button>
              ))}
            </div>

            {/* Map Style & View Controls */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <div className="inline-flex rounded-lg border border-[#D5CDBF] bg-[#FAF8F5] p-0.5 text-xs font-sans">
                <button
                  onClick={() => setMapTheme('sand')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    mapTheme === 'sand' ? 'bg-[#181715] text-[#FAF8F5]' : 'text-[#6B6152]'
                  }`}
                >
                  Sandstone
                </button>
                <button
                  onClick={() => setMapTheme('noir')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    mapTheme === 'noir' ? 'bg-[#181715] text-[#FAF8F5]' : 'text-[#6B6152]'
                  }`}
                >
                  Obsidian
                </button>
                <button
                  onClick={() => setMapTheme('satellite')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    mapTheme === 'satellite' ? 'bg-[#181715] text-[#FAF8F5]' : 'text-[#6B6152]'
                  }`}
                >
                  Satellite
                </button>
              </div>

              <button
                onClick={resetMasterView}
                className="p-1.5 rounded-lg border border-[#D5CDBF] bg-[#FAF8F5] hover:bg-[#EBE4D6] text-[#4A4237]"
                title="Reset to City Overview"
              >
                <RotateCcw className="w-4 h-4 text-[#B8936D]" />
              </button>
            </div>
          </div>

          {/* Map Canvas */}
          <div 
            ref={mapWrapperRef}
            className="relative w-full h-[460px] sm:h-[520px] lg:h-[560px] bg-[#EBE7DE] overflow-hidden"
          >
            <div ref={mapContainerRef} className="w-full h-full" />

            {/* Active Project Dossier Overlay Card */}
            <AnimatePresence>
              {activeProject && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.96 }}
                  className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[360px] z-20 bg-[#FAF8F5]/95 backdrop-blur-md p-5 rounded-xl border border-[#D5CDBF] shadow-xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-[#B8936D] font-bold">
                      SELECTED FLAGSHIP
                    </span>
                    <button
                      onClick={() => setSelectedProjectId(null)}
                      className="text-[#786E5F] hover:text-[#181715] text-xs p-1"
                    >
                      ✕
                    </button>
                  </div>

                  <div>
                    <h4 className="font-serif text-xl text-[#181715] font-normal leading-snug">
                      {activeProject.projectTitle}
                    </h4>
                    <p className="text-xs text-[#5C5346] font-light mt-0.5">
                      {activeProject.projectSubtitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#786E5F] font-sans">
                    {activeProject.address}
                  </p>

                  <div className="pt-2 border-t border-[#E5DFD4] flex items-center justify-between gap-2">
                    <Link
                      href={`/projects/${activeProject.projectId}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#181715] hover:bg-[#B8936D] text-white hover:text-[#181715] text-xs font-sans font-medium uppercase tracking-wider transition-colors"
                    >
                      <span>Explore Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(activeProject.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#99744C] hover:text-[#181715] font-sans font-medium transition-colors"
                    >
                      <span>Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Map Minimal Navigation Hint */}
          <div className="px-4 py-1.5 bg-[#FAF8F5]/90 border-t border-[#EAE4D8] flex items-center justify-between text-[11px] font-sans text-[#8A8072]">
            <span>⌘ / Ctrl + scroll to zoom · Drag to pan</span>
            <span className="hidden sm:inline text-[#A89E90]">Use + / − buttons on map</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
