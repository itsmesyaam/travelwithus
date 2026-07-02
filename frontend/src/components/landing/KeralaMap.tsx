'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight, Mountain, Waves, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Destination {
  name: string;
  tagline: string;
}

interface Region {
  id: string;
  name: string;
  districts: string[];
  destinations: Destination[];
  icon: React.ElementType;
  colorClass: string;
  strokeClass: string;
  fillClass: string;
  accentText: string;
}

const REGIONS: Region[] = [
  {
    id: 'north',
    name: 'North Kerala',
    districts: ['Kasaragod', 'Kannur', 'Wayanad', 'Kozhikode', 'Malappuram'],
    destinations: [
      { name: 'Wayanad Wildlife Sanctuary', tagline: 'Misty peaks & wild trails' },
      { name: 'Bekal Fort', tagline: 'Majestic seaside citadel' },
      { name: 'Kappad Beach', tagline: 'Historic explorer shoreline' },
      { name: 'Thusharagiri Waterfalls', tagline: 'Scenic forest cascades' },
    ],
    icon: Mountain,
    colorClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400',
    strokeClass: 'stroke-emerald-500 dark:stroke-emerald-400',
    fillClass: 'fill-emerald-500/10 dark:fill-emerald-500/5',
    accentText: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'central',
    name: 'Central Kerala',
    districts: ['Palakkad', 'Thrissur', 'Ernakulam', 'Idukki'],
    destinations: [
      { name: 'Munnar Tea Gardens', tagline: 'Rolling velvet green hills' },
      { name: 'Fort Kochi Heritage', tagline: 'Colonial lanes & spice ports' },
      { name: 'Athirappilly Falls', tagline: 'Lush tropical cascades' },
      { name: 'Vagamon Meadows', tagline: 'Tranquil pine forests' },
    ],
    icon: Compass,
    colorClass: 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400',
    strokeClass: 'stroke-amber-500 dark:stroke-amber-400',
    fillClass: 'fill-amber-500/10 dark:fill-amber-500/5',
    accentText: 'text-amber-600 dark:text-amber-400',
  },
  {
    id: 'south',
    name: 'South Kerala',
    districts: ['Kottayam', 'Alappuzha', 'Pathanamthitta', 'Kollam', 'Thiruvananthapuram'],
    destinations: [
      { name: 'Alleppey Backwaters', tagline: 'Serene houseboat channels' },
      { name: 'Kovalam Beach', tagline: 'Sun-drenched golden crescents' },
      { name: 'Varkala Cliff Beach', tagline: 'Red cliffs meeting the sea' },
      { name: 'Kumarakom Sanctuary', tagline: 'Migratory bird paradise' },
    ],
    icon: Waves,
    colorClass: 'bg-sky-500/10 border-sky-500/30 text-sky-700 dark:text-sky-400',
    strokeClass: 'stroke-sky-500 dark:stroke-sky-400',
    fillClass: 'fill-sky-500/10 dark:fill-sky-500/5',
    accentText: 'text-sky-600 dark:text-sky-400',
  },
];

export function KeralaMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>('central');
  const selectedRegion = REGIONS.find((r) => r.id === activeRegion) ?? REGIONS[1];

  return (
    <section className="py-20 md:py-28 bg-slate-50 dark:bg-gray-900 border-t border-b border-gray-200/55 dark:border-gray-800/40">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-emerald-600 dark:text-emerald-400">
            Interactive Map
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-gray-900 dark:text-white mt-3">
            Explore Kerala by <span className="italic font-light text-emerald-600 dark:text-emerald-400">Region</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto font-light">
            Click on the map regions or the sidebar list to see handpicked spots across Kerala.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Map Column (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-950 rounded-3xl border-2 border-dashed border-gray-200/80 dark:border-gray-800/80 relative overflow-hidden shadow-sm h-[580px]">
            {/* Fine print styling details: Coords and design accents */}
            <div className="absolute top-4 left-6 text-[10px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest select-none">
              MALABAR COAST • 10.8505° N, 76.2711° E
            </div>
            <div className="absolute bottom-4 right-6 text-[10px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest select-none">
              ARABIAN SEA
            </div>

            {/* Styled SVG Map of Kerala */}
            <svg
              viewBox="0 0 250 500"
              className="w-full h-[460px] select-none"
            >
              {/* Western Ghats dotted background contour */}
              <path
                d="M 160,40 Q 210,160 215,280 T 230,450"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4,6"
                className="text-gray-300 dark:text-gray-800"
              />
              <text
                x="200"
                y="150"
                transform="rotate(76 200 150)"
                className="text-[9px] font-sans tracking-[0.25em] fill-gray-400 dark:fill-gray-600 font-medium uppercase"
              >
                Western Ghats
              </text>

              {/* NORTH KERALA REGION */}
              <motion.path
                d="M 90,40 Q 120,45 130,95 T 140,170 C 130,175 110,170 100,160 Q 75,130 80,95 Z"
                className={cn(
                  "cursor-pointer transition-all duration-300 stroke-2",
                  activeRegion === 'north'
                    ? "fill-emerald-500/25 stroke-emerald-600 dark:stroke-emerald-400"
                    : "fill-gray-100/60 dark:fill-gray-900/40 stroke-gray-300 dark:stroke-gray-800 hover:fill-emerald-500/10 hover:stroke-emerald-500/60"
                )}
                onClick={() => setActiveRegion('north')}
              />

              {/* CENTRAL KERALA REGION */}
              <motion.path
                d="M 140,170 Q 150,195 165,240 T 180,310 C 160,315 140,300 130,285 Q 120,240 100,160 Z"
                className={cn(
                  "cursor-pointer transition-all duration-300 stroke-2",
                  activeRegion === 'central'
                    ? "fill-amber-500/25 stroke-amber-600 dark:stroke-amber-400"
                    : "fill-gray-100/60 dark:fill-gray-900/40 stroke-gray-300 dark:stroke-gray-800 hover:fill-amber-500/10 hover:stroke-amber-500/60"
                )}
                onClick={() => setActiveRegion('central')}
              />

              {/* SOUTH KERALA REGION */}
              <motion.path
                d="M 180,310 Q 185,340 190,390 T 215,465 C 205,470 190,450 185,435 Q 165,390 130,285 Z"
                className={cn(
                  "cursor-pointer transition-all duration-300 stroke-2",
                  activeRegion === 'south'
                    ? "fill-sky-500/25 stroke-sky-600 dark:stroke-sky-400"
                    : "fill-gray-100/60 dark:fill-gray-900/40 stroke-gray-300 dark:stroke-gray-800 hover:fill-sky-500/10 hover:stroke-sky-500/60"
                )}
                onClick={() => setActiveRegion('south')}
              />

              {/* Map Labels & Markers */}
              {/* Wayanad Pin */}
              <g className="pointer-events-none">
                <circle cx="108" cy="98" r="4" className="fill-emerald-600 dark:fill-emerald-400" />
                <circle cx="108" cy="98" r="8" className="stroke-emerald-600/30 fill-none stroke-[2] animate-ping" />
                <text x="116" y="101" className="text-[10px] font-sans font-medium fill-gray-700 dark:fill-gray-300">Wayanad</text>
              </g>

              {/* Munnar Pin */}
              <g className="pointer-events-none">
                <circle cx="150" cy="230" r="4" className="fill-amber-600 dark:fill-amber-400" />
                <circle cx="150" cy="230" r="8" className="stroke-amber-600/30 fill-none stroke-[2] animate-ping" />
                <text x="158" y="233" className="text-[10px] font-sans font-medium fill-gray-700 dark:fill-gray-300">Munnar</text>
              </g>

              {/* Alleppey Pin */}
              <g className="pointer-events-none">
                <circle cx="162" cy="340" r="4" className="fill-sky-600 dark:fill-sky-400" />
                <circle cx="162" cy="340" r="8" className="stroke-sky-600/30 fill-none stroke-[2] animate-ping" />
                <text x="170" y="343" className="text-[10px] font-sans font-medium fill-gray-700 dark:fill-gray-300">Alleppey</text>
              </g>

              {/* Kovalam Pin */}
              <g className="pointer-events-none">
                <circle cx="196" cy="435" r="4" className="fill-sky-600 dark:fill-sky-400" />
                <text x="156" y="450" className="text-[10px] font-sans font-medium fill-gray-700 dark:fill-gray-300">Kovalam</text>
              </g>
            </svg>
          </div>

          {/* Details Column (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6 justify-between h-full min-h-[500px]">
            {/* Region selectors */}
            <div className="flex flex-col gap-3">
              {REGIONS.map((region) => {
                const Icon = region.icon;
                const isActive = activeRegion === region.id;

                return (
                  <button
                    key={region.id}
                    onClick={() => setActiveRegion(region.id)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left w-full",
                      isActive
                        ? "bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 shadow-md ring-2 ring-emerald-500/20"
                        : "bg-transparent border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-white/40 dark:hover:bg-gray-950/20"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2.5 rounded-xl border", region.colorClass)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-base md:text-lg">
                          {region.name}
                        </h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          {region.districts.join(', ')}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={cn(
                      "w-5 h-5 text-gray-400 transition-transform duration-300",
                      isActive && "transform translate-x-1"
                    )} />
                  </button>
                );
              })}
            </div>

            {/* Destinations card */}
            <div className="rounded-3xl border-2 border-dashed border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-gray-950 p-6 md:p-8 flex-1 flex flex-col justify-center">
              <span className={cn("text-xs font-semibold uppercase tracking-wider mb-2", selectedRegion.accentText)}>
                Featured Highlights
              </span>
              <h4 className="font-serif text-2xl font-normal text-gray-900 dark:text-white mb-6">
                Must-Visit spots in <span className="italic font-light">{selectedRegion.name}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedRegion.destinations.map((dest) => (
                  <div
                    key={dest.name}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/60 transition-colors group cursor-pointer"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="font-medium text-sm text-gray-950 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                        {dest.name}
                      </p>
                      <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                        {dest.tagline}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
