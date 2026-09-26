'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { 
  Navigation, 
  RotateCcw, 
  Sparkles, 
  Car, 
  Plane, 
  TreePine, 
  Building2, 
  HeartPulse, 
  ExternalLink,
  Mountain
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface MapLandmark {
  id: string;
  name: string;
  category: 'transit' | 'nature' | 'tech' | 'spiritual' | 'health' | 'leisure';
  distanceKm: number;
  driveTime: string;
  lat: number;
  lng: number;
  description: string;
}

export interface LuxuryMapData {
  projectId: string;
  projectTitle: string;
  projectSubtitle: string;
  typologyLabel: string;
  lat: number;
  lng: number;
  zoom?: number;
  elevation?: string;
  waterSource?: string;
  coordinatesFormatted: string;
  address: string;
  landmarks: MapLandmark[];
}

// Architectural Sand Palette (Soul Space Warm Cream & Gold aesthetic)
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
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#7D7263' }],
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
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#685A48' }],
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
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#667C76' }],
  },
];

// Midnight Obsidian Palette (Ultra-Luxury Dark Gold aesthetic)
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
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#19211D' }],
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

interface LuxuryProjectMapProps {
  data: LuxuryMapData;
  className?: string;
  title?: string;
  subtitle?: string;
  variant?: 'embedded' | 'standalone';
}

export function LuxuryProjectMap({
  data,
  className = '',
  title = 'Geographic Positioning & Commute Dossier',
  subtitle = 'High-precision interactive geospatial radar calibrated with key Coimbatore corridors.',
  variant = 'embedded',
}: LuxuryProjectMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const projectMarkerRef = useRef<google.maps.Marker | null>(null);

  const [mapTheme, setMapTheme] = useState<'sand' | 'noir' | 'satellite'>('sand');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedLandmark, setSelectedLandmark] = useState<MapLandmark | null>(null);

  const defaultZoom = data.zoom || 14;

  // Intercept Ctrl/Cmd + Wheel to zoom the map and prevent browser whole-page zoom; normal scroll flows through untouched
  useEffect(() => {
    const el = mapWrapperRef.current;
    if (!el) return;

    let accumulatedDelta = 0;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        // Prevent full-page browser zooming and zoom the map
        e.preventDefault();
        e.stopPropagation();

        if (mapInstanceRef.current) {
          accumulatedDelta += -e.deltaY;
          if (Math.abs(accumulatedDelta) >= 40) {
            const step = accumulatedDelta > 0 ? 1 : -1;
            const currentZoom = mapInstanceRef.current.getZoom() || defaultZoom;
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
  }, [defaultZoom]);

  // Initialize Map
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

        const mapOptions: google.maps.MapOptions = {
          center: { lat: data.lat, lng: data.lng },
          zoom: defaultZoom,
          mapTypeId: mapTheme === 'satellite' ? google.maps.MapTypeId.HYBRID : google.maps.MapTypeId.ROADMAP,
          styles: mapTheme === 'sand' ? ARCHITECTURAL_SAND_STYLE : mapTheme === 'noir' ? MIDNIGHT_OBSIDIAN_STYLE : undefined,
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          scrollwheel: false,
          gestureHandling: 'greedy',
        };

        const map = new Map(mapContainerRef.current, mapOptions);
        mapInstanceRef.current = map;

        // Custom Minimalist Gold Project Pin Marker (Clean solid gold teardrop, no black circle, no triangle)
        const projectPinSvg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="52" height="62" viewBox="0 0 52 62" fill="none">
            <defs>
              <filter id="shadow" x="0" y="0" width="52" height="62" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#141312" flood-opacity="0.32"/>
              </filter>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                <stop stop-color="#E2C7A7"/>
                <stop offset="0.45" stop-color="#C5A075"/>
                <stop offset="1" stop-color="#99744C"/>
              </linearGradient>
            </defs>
            <g filter="url(#shadow)">
              <path d="M26 4C16.0589 4 8 12.0589 8 22C8 34.5 26 52 26 52C26 52 44 34.5 44 22C44 12.0589 35.9411 4 26 4Z" fill="url(#goldGrad)" stroke="#FAF8F5" stroke-width="2.5"/>
              <circle cx="26" cy="22" r="7.5" fill="#FAF8F5"/>
              <circle cx="26" cy="22" r="4.5" fill="#99744C"/>
            </g>
          </svg>
        `;

        const projectMarker = new Marker({
          position: { lat: data.lat, lng: data.lng },
          map,
          title: data.projectTitle,
          zIndex: 999,
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(projectPinSvg)}`,
            scaledSize: new google.maps.Size(42, 50),
            anchor: new google.maps.Point(21, 48),
          },
          animation: google.maps.Animation.DROP,
        });

        projectMarkerRef.current = projectMarker;

        // Click on project marker
        projectMarker.addListener('click', () => {
          setSelectedLandmark(null);
          map.panTo({ lat: data.lat, lng: data.lng });
          map.setZoom(defaultZoom);
        });
      })
      .catch((err) => {
        console.error('Google Maps Load Error:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [data.lat, data.lng, data.projectTitle, defaultZoom]);

  // Update Map Styles on Theme Change
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

  // Filtered Landmarks
  const filteredLandmarks = useMemo(() => {
    if (activeCategory === 'all') return data.landmarks;
    return data.landmarks.filter((l) => l.category === activeCategory);
  }, [data.landmarks, activeCategory]);

  // Category Colors & Icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transit':
        return <Plane className="w-3.5 h-3.5" />;
      case 'nature':
        return <TreePine className="w-3.5 h-3.5" />;
      case 'tech':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'spiritual':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'health':
        return <HeartPulse className="w-3.5 h-3.5" />;
      default:
        return <Navigation className="w-3.5 h-3.5" />;
    }
  };

  // Render Landmark Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google) return;
    const map = mapInstanceRef.current;

    // Clear old markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    // Add filtered landmark markers
    filteredLandmarks.forEach((landmark) => {
      const isSelected = selectedLandmark?.id === landmark.id;

      const landmarkSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="42" viewBox="0 0 36 42" fill="none">
          <defs>
            <filter id="sh" x="0" y="0" width="36" height="42" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000" flood-opacity="0.3"/>
            </filter>
          </defs>
          <g filter="url(#sh)">
            <path d="M18 3C10.82 3 5 8.82 5 16C5 25.5 18 37 18 37C18 37 31 25.5 31 16C31 8.82 25.18 3 18 3Z" fill="${isSelected ? '#181715' : '#FAF8F5'}" stroke="${isSelected ? '#B8936D' : '#8C7456'}" stroke-width="1.5"/>
            <circle cx="18" cy="16" r="5" fill="${isSelected ? '#D4B38C' : '#8C7456'}"/>
          </g>
        </svg>
      `;

      const marker = new google.maps.Marker({
        position: { lat: landmark.lat, lng: landmark.lng },
        map,
        title: landmark.name,
        zIndex: isSelected ? 900 : 100,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(landmarkSvg)}`,
          scaledSize: new google.maps.Size(30, 36),
          anchor: new google.maps.Point(15, 34),
        },
      });

      marker.addListener('click', () => {
        setSelectedLandmark(landmark);
        map.panTo({ lat: landmark.lat, lng: landmark.lng });
        map.setZoom(15);
      });

      markersRef.current.push(marker);
    });
  }, [filteredLandmarks, selectedLandmark]);

  const handleLandmarkClick = useCallback(
    (landmark: MapLandmark) => {
      setSelectedLandmark(landmark);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo({ lat: landmark.lat, lng: landmark.lng });
        mapInstanceRef.current.setZoom(15);
      }
    },
    []
  );

  const resetToProject = useCallback(() => {
    setSelectedLandmark(null);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat: data.lat, lng: data.lng });
      mapInstanceRef.current.setZoom(defaultZoom);
    }
  }, [data.lat, data.lng, defaultZoom]);

  const categories = [
    { id: 'all', label: 'All Corridors' },
    { id: 'transit', label: 'Transit & Air' },
    { id: 'nature', label: 'Nature & Siruvani' },
    { id: 'tech', label: 'IT & Commercial' },
    { id: 'spiritual', label: 'Spiritual & Heritage' },
    { id: 'health', label: 'Health & Wellness' },
  ];

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-[#D5CDBF] bg-[#FAF8F4] transition-all duration-300 ${className}`}
    >
      {/* Top Architectural Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 bg-[#F3EFE6] border-b border-[#DFD8CA]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#B8936D] font-bold">
              GEOSPATIAL DOSSIER
            </span>
            <span className="text-[10px] font-sans text-[#786E5F] px-2 py-0.5 bg-[#E8E2D5] rounded-full">
              {data.coordinatesFormatted}
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-[#181715] font-normal tracking-[-0.015em]">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#5C5346] font-light max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Map Control Cluster */}
        <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
          {/* Theme Selector */}
          <div className="inline-flex rounded-lg border border-[#D5CDBF] bg-[#FAF8F5] p-0.5 text-xs font-sans">
            <button
              onClick={() => setMapTheme('sand')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
                mapTheme === 'sand'
                  ? 'bg-[#181715] text-[#FAF8F5] shadow-xs'
                  : 'text-[#6B6152] hover:text-[#181715]'
              }`}
            >
              Sandstone
            </button>
            <button
              onClick={() => setMapTheme('noir')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
                mapTheme === 'noir'
                  ? 'bg-[#181715] text-[#FAF8F5] shadow-xs'
                  : 'text-[#6B6152] hover:text-[#181715]'
              }`}
            >
              Obsidian Noir
            </button>
            <button
              onClick={() => setMapTheme('satellite')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
                mapTheme === 'satellite'
                  ? 'bg-[#181715] text-[#FAF8F5] shadow-xs'
                  : 'text-[#6B6152] hover:text-[#181715]'
              }`}
            >
              Satellite
            </button>
          </div>

          {/* Recenter Button */}
          <button
            onClick={resetToProject}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D5CDBF] bg-[#FAF8F5] hover:bg-[#EBE4D6] text-[#4A4237] text-xs font-sans transition-colors"
            title="Recenter to Development"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#B8936D]" />
            <span className="text-[11px]">Center Project</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills Ribbon */}
      <div className="flex items-center gap-1.5 px-5 py-2.5 bg-[#FAF8F4] border-b border-[#E5DFD4] overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1 rounded-full text-[11px] font-sans font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-[#B8936D] text-[#141312] shadow-xs'
                : 'bg-[#EFECE5] text-[#5C5346] hover:bg-[#E5DFD4]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Map Canvas & Floating HUD Overlays */}
      <div 
        ref={mapWrapperRef}
        className="relative w-full h-[460px] sm:h-[540px] lg:h-[580px] bg-[#EBE7DE] overflow-hidden"
      >
        {/* Google Map Container Element */}
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Project Micro-Dossier Floating Badge */}
        <div className="absolute top-4 left-4 z-10 max-w-[280px] sm:max-w-[320px] bg-[#FAF8F5]/95 backdrop-blur-md p-4 rounded-xl border border-[#D5CDBF] shadow-lg space-y-2 pointer-events-auto">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-[#B8936D] font-bold">
              FLAGSHIP SITE
            </span>
            <span className="text-[10px] font-sans text-[#786E5F] font-medium">
              {data.typologyLabel}
            </span>
          </div>

          <h4 className="font-serif text-base sm:text-lg text-[#181715] font-normal leading-snug">
            {data.projectTitle}
          </h4>

          <p className="text-xs text-[#5C5346] line-clamp-2 font-light">
            {data.address}
          </p>

          <div className="pt-2 border-t border-[#E5DFD4] flex items-center justify-between text-[11px] font-sans">
            <span className="text-[#786E5F] inline-flex items-center gap-1">
              <Mountain className="w-3 h-3 text-[#B8936D]" />
              {data.elevation || '412m ASL'}
            </span>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(data.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#99744C] hover:text-[#181715] font-medium transition-colors group/nav"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3 h-3 group-hover/nav:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Selected Landmark Inspector Drawer */}
        <AnimatePresence>
          {selectedLandmark && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 right-4 left-4 sm:left-auto sm:w-[340px] z-20 bg-[#181715] text-[#FAF8F5] p-5 rounded-xl border border-[#38332C] shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
                  {getCategoryIcon(selectedLandmark.category)}
                  {selectedLandmark.category} Node
                </span>
                <button
                  onClick={() => setSelectedLandmark(null)}
                  className="text-[#998F81] hover:text-[#FAF8F5] text-xs transition-colors p-1"
                >
                  ✕
                </button>
              </div>

              <div>
                <h5 className="font-serif text-lg text-[#FAF8F5] font-normal leading-tight">
                  {selectedLandmark.name}
                </h5>
                <p className="text-xs text-[#A89F91] mt-1 font-light leading-relaxed">
                  {selectedLandmark.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#2D2A26] text-xs font-sans">
                <div className="bg-[#24211D] p-2 rounded-lg text-center">
                  <span className="text-[10px] text-[#8C8375] uppercase block">DISTANCE</span>
                  <span className="font-serif text-sm text-[#E5DFD4] font-medium">
                    {selectedLandmark.distanceKm} km
                  </span>
                </div>
                <div className="bg-[#24211D] p-2 rounded-lg text-center">
                  <span className="text-[10px] text-[#8C8375] uppercase block">DRIVE TIME</span>
                  <span className="font-serif text-sm text-[#D4B38C] font-medium">
                    {selectedLandmark.driveTime}
                  </span>
                </div>
              </div>

              <a
                href={`https://maps.google.com/?saddr=${data.lat},${data.lng}&daddr=${selectedLandmark.lat},${selectedLandmark.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#B8936D] hover:bg-[#C5A880] text-[#141312] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <Car className="w-3.5 h-3.5" />
                <span>Get Driving Directions</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Map Minimal Navigation Hint */}
      <div className="px-4 py-1.5 bg-[#FAF8F5]/90 border-t border-[#EAE4D8] flex items-center justify-between text-[11px] font-sans text-[#8A8072]">
        <span>⌘ / Ctrl + scroll to zoom · Drag to pan</span>
        <span className="hidden sm:inline text-[#A89E90]">Use + / − buttons on map</span>
      </div>

      {/* Proximity Commute Matrix Carousel / Grid */}
      <div className="p-5 sm:p-6 bg-[#FAF8F4] border-t border-[#DFD8CA]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#B8936D]" />
            <h4 className="font-serif text-base sm:text-lg text-[#181715] font-normal">
              Corridor Commute Matrix
            </h4>
          </div>
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#786E5F]">
            Click any node to zoom &amp; inspect
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {data.landmarks.map((landmark) => {
            const isSelected = selectedLandmark?.id === landmark.id;
            return (
              <button
                key={landmark.id}
                onClick={() => handleLandmarkClick(landmark)}
                className={`p-3 rounded-xl border text-left transition-colors duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#B8936D] bg-[#181715] text-[#FAF8F5] shadow-sm scale-[1.02]'
                    : 'border-[#E0D9CC] bg-[#F4EFE6] text-[#2C2720] hover:border-[#B8936D]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[9px] uppercase font-sans font-bold tracking-wider ${
                      isSelected ? 'text-[#D4B38C]' : 'text-[#8C6F4E]'
                    }`}
                  >
                    {landmark.category}
                  </span>
                  <span
                    className={`text-xs ${
                      isSelected ? 'text-[#D4B38C]' : 'text-[#8C6F4E]'
                    }`}
                  >
                    {getCategoryIcon(landmark.category)}
                  </span>
                </div>

                <div className="font-serif text-xs font-normal leading-snug line-clamp-2 mb-2">
                  {landmark.name}
                </div>

                <div className="flex items-baseline justify-between text-[10px] font-sans pt-1 border-t border-black/5">
                  <span className={isSelected ? 'text-[#A89F91]' : 'text-[#786E5F]'}>
                    {landmark.distanceKm} km
                  </span>
                  <span className={`font-semibold ${isSelected ? 'text-[#FAF8F5]' : 'text-[#181715]'}`}>
                    {landmark.driveTime}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
