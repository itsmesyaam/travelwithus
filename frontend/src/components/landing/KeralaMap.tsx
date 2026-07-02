'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight, Mountain, Waves, TreePalm } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

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
  gradient: string;
  glowColor: string;
  accentText: string;
}

const REGIONS: Region[] = [
  {
    id: 'north',
    name: 'North Kerala',
    districts: ['Kasaragod', 'Kannur', 'Wayanad', 'Kozhikode', 'Malappuram'],
    destinations: [
      { name: 'Wayanad Wildlife Sanctuary', tagline: 'Misty peaks & wildlife' },
      { name: 'Bekal Fort', tagline: 'Seaside citadel' },
      { name: 'Kappad Beach', tagline: 'Historic shoreline' },
      { name: 'Tholpetty', tagline: 'Forest trails' },
    ],
    icon: Mountain,
    gradient: 'from-emerald-600 to-teal-500',
    glowColor: 'shadow-emerald-500/30',
    accentText: 'text-emerald-300',
  },
  {
    id: 'central',
    name: 'Central Kerala',
    districts: ['Palakkad', 'Thrissur', 'Ernakulam', 'Idukki'],
    destinations: [
      { name: 'Munnar Tea Gardens', tagline: 'Rolling green hills' },
      { name: 'Fort Kochi', tagline: 'Colonial heritage' },
      { name: 'Athirappilly Falls', tagline: "Niagara of India" },
      { name: 'Vagamon', tagline: 'Serene meadows' },
    ],
    icon: TreePalm,
    gradient: 'from-teal-600 to-cyan-500',
    glowColor: 'shadow-teal-500/30',
    accentText: 'text-teal-300',
  },
  {
    id: 'south',
    name: 'South Kerala',
    districts: ['Kottayam', 'Alappuzha', 'Pathanamthitta', 'Kollam', 'Thiruvananthapuram'],
    destinations: [
      { name: 'Alleppey Backwaters', tagline: 'Houseboat paradise' },
      { name: 'Kovalam Beach', tagline: 'Golden crescent' },
      { name: 'Sabarimala', tagline: 'Sacred pilgrimage' },
      { name: 'Varkala Cliffs', tagline: 'Cliffside bliss' },
    ],
    icon: Waves,
    gradient: 'from-cyan-600 to-sky-500',
    glowColor: 'shadow-cyan-500/30',
    accentText: 'text-cyan-300',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function KeralaMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const selected = REGIONS.find((r) => r.id === activeRegion) ?? null;

  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Discover"
          title="Explore Kerala by Region"
          description="From the misty highlands of the north to the tranquil backwaters of the south — find your perfect destination."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* ---------- Region cards (left / top) ---------- */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {REGIONS.map((region, idx) => {
              const Icon = region.icon;
              const isActive = activeRegion === region.id;

              return (
                <motion.button
                  key={region.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: idx * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveRegion(isActive ? null : region.id)}
                  className={cn(
                    'relative w-full rounded-2xl p-5 text-left transition-shadow duration-300',
                    `bg-gradient-to-br ${region.gradient}`,
                    isActive
                      ? `ring-2 ring-white/60 shadow-xl ${region.glowColor}`
                      : 'shadow-lg hover:shadow-xl',
                  )}
                >
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-white/80" />
                      <h3 className="text-lg font-bold text-white">{region.name}</h3>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-white/70">
                      <MapPin className="w-3.5 h-3.5" />
                      {region.destinations.length} spots
                    </span>
                  </div>

                  {/* District badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {region.districts.map((d) => (
                      <span
                        key={d}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 text-white/90 backdrop-blur-sm"
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Active indicator */}
                  <motion.div
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    animate={{ rotate: isActive ? 90 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <ChevronRight className="w-5 h-5 text-white/60" />
                  </motion.div>
                </motion.button>
              );
            })}
          </div>

          {/* ---------- Detail panel (right / bottom) ---------- */}
          <div className="lg:col-span-3 min-h-[320px]">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8 shadow-lg h-full"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {selected.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Featured destinations in this region
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selected.destinations.map((dest, i) => (
                      <motion.div
                        key={dest.name}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.35 }}
                        className="group flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors cursor-pointer"
                      >
                        <span
                          className={cn(
                            'flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br shrink-0',
                            selected.gradient,
                          )}
                        >
                          <MapPin className="w-4.5 h-4.5 text-white" />
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {dest.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {dest.tagline}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 p-10 text-center"
                >
                  <MapPin className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Select a region to explore destinations
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Click on any region card on the left
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
