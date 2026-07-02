'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight, Mountain, Waves, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import keralaMapImg from '@/assets/kerala_travel_map.jpg';

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
            Click on the interactive map pins or the sidebar list to discover handpicked spots across Kerala.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Map Column (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-950 rounded-3xl border-2 border-dashed border-gray-200/80 dark:border-gray-800/80 relative overflow-hidden shadow-sm h-[580px]">
            {/* Fine print styling details: Coords and design accents */}
            <div className="absolute top-4 left-6 text-[10px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest select-none z-10">
              MALABAR COAST • 10.8505° N, 76.2711° E
            </div>
            <div className="absolute bottom-4 right-6 text-[10px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest select-none z-10">
              ARABIAN SEA
            </div>

            {/* Real Kerala Map Backed Image with Interactive Hotspots */}
            <div className="relative w-full h-[480px] rounded-2xl overflow-hidden border border-gray-150 dark:border-gray-800 bg-slate-50 dark:bg-gray-900">
              <img
                src={keralaMapImg}
                alt="Kerala Travel Map"
                className="w-full h-full object-cover opacity-90 dark:opacity-85"
              />

              {/* Wayanad Pin Overlay */}
              <div
                className="absolute top-[22%] left-[45%] group pointer-events-auto cursor-pointer z-10"
                onClick={() => setActiveRegion('north')}
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute inline-flex h-5 w-5 rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className={cn(
                    "relative inline-flex rounded-full h-3 w-3 transition-colors duration-300",
                    activeRegion === 'north' ? "bg-emerald-600" : "bg-emerald-400"
                  )} />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-4 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xs px-2 py-0.5 rounded-full text-[9px] font-semibold shadow-md text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-800/50 select-none pointer-events-none whitespace-nowrap transition-transform duration-300 group-hover:scale-105">
                  Wayanad
                </div>
              </div>

              {/* Munnar Pin Overlay */}
              <div
                className="absolute top-[48%] left-[62%] group pointer-events-auto cursor-pointer z-10"
                onClick={() => setActiveRegion('central')}
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute inline-flex h-5 w-5 rounded-full bg-amber-400 opacity-75 animate-ping" />
                  <span className={cn(
                    "relative inline-flex rounded-full h-3 w-3 transition-colors duration-300",
                    activeRegion === 'central' ? "bg-amber-600" : "bg-amber-400"
                  )} />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-4 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xs px-2 py-0.5 rounded-full text-[9px] font-semibold shadow-md text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-800/50 select-none pointer-events-none whitespace-nowrap transition-transform duration-300 group-hover:scale-105">
                  Munnar
                </div>
              </div>

              {/* Alleppey Pin Overlay */}
              <div
                className="absolute top-[72%] left-[68%] group pointer-events-auto cursor-pointer z-10"
                onClick={() => setActiveRegion('south')}
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute inline-flex h-5 w-5 rounded-full bg-sky-400 opacity-75 animate-ping" />
                  <span className={cn(
                    "relative inline-flex rounded-full h-3 w-3 transition-colors duration-300",
                    activeRegion === 'south' ? "bg-sky-600" : "bg-sky-400"
                  )} />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-4 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xs px-2 py-0.5 rounded-full text-[9px] font-semibold shadow-md text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-800/50 select-none pointer-events-none whitespace-nowrap transition-transform duration-300 group-hover:scale-105">
                  Alleppey
                </div>
              </div>

              {/* Kovalam Pin Overlay */}
              <div
                className="absolute top-[88%] left-[80%] group pointer-events-auto cursor-pointer z-10"
                onClick={() => setActiveRegion('south')}
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute inline-flex h-5 w-5 rounded-full bg-sky-400 opacity-75 animate-ping" />
                  <span className={cn(
                    "relative inline-flex rounded-full h-3 w-3 transition-colors duration-300",
                    activeRegion === 'south' ? "bg-sky-600" : "bg-sky-400"
                  )} />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-4 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xs px-2 py-0.5 rounded-full text-[9px] font-semibold shadow-md text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-800/50 select-none pointer-events-none whitespace-nowrap transition-transform duration-300 group-hover:scale-105">
                  Kovalam
                </div>
              </div>
            </div>
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
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-950/20 dark:hover:bg-gray-900/60 transition-colors group cursor-pointer"
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
