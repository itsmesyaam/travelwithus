import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight, Compass, Waves, Mountain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Destination {
  name: string;
  tagline: string;
  slug: string;
}

interface Region {
  id: string;
  name: string;
  districts: string[];
  description: string;
  destinations: Destination[];
  icon: React.ElementType;
  accentColor: string;
  bgGlow: string;
}

const REGIONS: Region[] = [
  {
    id: 'north',
    name: 'North Malabar Coast',
    districts: ['Kasaragod', 'Kannur', 'Wayanad', 'Kozhikode', 'Malappuram'],
    description: 'A land of pristine spice trails, untouched beaches, and ancient folklore temples.',
    destinations: [
      { name: 'Wayanad Sanctuary', tagline: 'Misty peak trails & wild herds', slug: 'wayanad' },
      { name: 'Bekal Seaside Fort', tagline: 'Majestic rock citadel kissing the waves', slug: 'bekal' },
      { name: 'Chembra Peak', tagline: 'Heart-shaped high altitude tarn', slug: 'chembra-peak' },
    ],
    icon: Mountain,
    accentColor: 'text-emerald-600 dark:text-emerald-400',
    bgGlow: 'from-emerald-500/10 to-transparent',
  },
  {
    id: 'central',
    name: 'Central Highlands',
    districts: ['Palakkad', 'Thrissur', 'Ernakulam', 'Idukki'],
    description: 'Rolling velvet tea estates, cascading jungle waterfalls, and vibrant historic spice ports.',
    destinations: [
      { name: 'Munnar Valley', tagline: 'Lush green velvet heights', slug: 'munnar' },
      { name: 'Fort Kochi Lanes', tagline: 'Colonial pathways & trade canals', slug: 'kochi' },
      { name: 'Athirappilly Falls', tagline: 'Thundering tropical cascades', slug: 'athirappilly' },
    ],
    icon: Compass,
    accentColor: 'text-gold',
    bgGlow: 'from-amber-500/10 to-transparent',
  },
  {
    id: 'south',
    name: 'South Backwater Lagoons',
    districts: ['Kottayam', 'Alappuzha', 'Pathanamthitta', 'Kollam', 'Thiruvananthapuram'],
    description: 'Still water channels, houseboats floating under palms, and vertical red cliffs.',
    destinations: [
      { name: 'Alleppey Canals', tagline: 'Serene palm-fringed backwaters', slug: 'alleppey' },
      { name: 'Varkala Cliffs', tagline: 'Mineral springs meeting the sea', slug: 'varkala' },
      { name: 'Kovalam Beach', tagline: 'Sun-drenched crescent shores', slug: 'kovalam' },
    ],
    icon: Waves,
    accentColor: 'text-teal-lagoon dark:text-teal-400',
    bgGlow: 'from-teal-500/10 to-transparent',
  },
];

export function KeralaMap() {
  const [activeRegion, setActiveRegion] = useState<string>('central');
  const selectedRegion = REGIONS.find((r) => r.id === activeRegion) ?? REGIONS[1];

  return (
    <section className="py-24 bg-sand-warm dark:bg-gray-950 border-t border-emerald-950/[0.03] dark:border-white/[0.01] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Title Header */}
        <div className="text-center mb-20 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">
            Geography of Sanctuary
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-normal text-emerald-deep dark:text-white leading-tight">
            Explore Kerala by <span className="italic font-light text-emerald-600 dark:text-emerald-400">Region</span>
          </h2>
          <p className="text-xs md:text-sm text-emerald-deep/60 dark:text-sand-warm/60 max-w-lg mx-auto font-sans tracking-wide">
            Select a coastal segment on the map or browse the regional cards to uncover handpicked sanctuaries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
          {/* Column 1: Bespoke minimalist SVG Map Container (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center items-center p-8 bg-mist/40 dark:bg-gray-900/40 rounded-[32px] border border-emerald-950/[0.03] dark:border-white/[0.02] shadow-sm min-h-[500px] relative overflow-hidden">
            {/* Compass rose accent details */}
            <div className="absolute top-6 left-6 text-[9px] font-mono text-emerald-deep/40 dark:text-sand-warm/30 uppercase tracking-widest">
              Laccadive Sea / 10.8° N
            </div>
            
            {/* Interactive SVG path outline of Kerala */}
            <svg
              viewBox="0 0 200 450"
              className="w-full max-w-[220px] h-auto text-slate-300 dark:text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Regional Vector segments */}
              {/* North Malabar Coast segment */}
              <motion.path
                d="M 60,30 C 50,60 45,90 55,120 L 78,140 C 90,130 92,100 80,60 Z"
                className={cn(
                  "cursor-pointer stroke-[1.5] transition-all duration-300 fill-current",
                  activeRegion === 'north'
                    ? "text-emerald-800/20 stroke-emerald-600 dark:text-emerald-400/10 dark:stroke-emerald-400 filter drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                    : "text-emerald-950/[0.04] stroke-emerald-900/15 hover:text-emerald-800/10 dark:text-white/5 dark:stroke-white/10"
                )}
                onClick={() => setActiveRegion('north')}
                whileHover={{ scale: 1.02 }}
              />

              {/* Central Highlands segment */}
              <motion.path
                d="M 78,140 L 55,120 C 60,150 70,180 85,210 C 90,225 105,230 115,240 L 125,200 Z"
                className={cn(
                  "cursor-pointer stroke-[1.5] transition-all duration-300 fill-current",
                  activeRegion === 'central'
                    ? "text-amber-800/20 stroke-amber-500 dark:text-amber-400/10 dark:stroke-amber-400 filter drop-shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                    : "text-emerald-950/[0.04] stroke-emerald-900/15 hover:text-emerald-800/10 dark:text-white/5 dark:stroke-white/10"
                )}
                onClick={() => setActiveRegion('central')}
                whileHover={{ scale: 1.02 }}
              />

              {/* South Backwater Lagoons segment */}
              <motion.path
                d="M 115,240 C 120,260 130,300 145,340 C 152,360 168,390 178,410 L 182,390 C 175,370 162,310 142,245 Z"
                className={cn(
                  "cursor-pointer stroke-[1.5] transition-all duration-300 fill-current",
                  activeRegion === 'south'
                    ? "text-teal-800/20 stroke-teal-500 dark:text-teal-400/10 dark:stroke-teal-400 filter drop-shadow-[0_0_12px_rgba(7,76,78,0.3)]"
                    : "text-emerald-950/[0.04] stroke-emerald-900/15 hover:text-emerald-800/10 dark:text-white/5 dark:stroke-white/10"
                )}
                onClick={() => setActiveRegion('south')}
                whileHover={{ scale: 1.02 }}
              />

              {/* Wayanad Pulsing Pin */}
              <circle
                cx="65"
                cy="85"
                r="4"
                className={cn("fill-current cursor-pointer", activeRegion === 'north' ? "text-emerald-600 animate-pulse" : "text-emerald-700/60")}
                onClick={() => setActiveRegion('north')}
              />
              
              {/* Munnar Pulsing Pin */}
              <circle
                cx="92"
                cy="175"
                r="4"
                className={cn("fill-current cursor-pointer", activeRegion === 'central' ? "text-gold animate-pulse" : "text-amber-600/60")}
                onClick={() => setActiveRegion('central')}
              />

              {/* Alleppey Pulsing Pin */}
              <circle
                cx="135"
                cy="295"
                r="4"
                className={cn("fill-current cursor-pointer", activeRegion === 'south' ? "text-teal-500 animate-pulse" : "text-teal-600/60")}
                onClick={() => setActiveRegion('south')}
              />
            </svg>
          </div>

          {/* Column 2: Regional Details & Highlights Spread (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between h-full min-h-[500px]">
            {/* Quick selectors row */}
            <div className="flex flex-col gap-3">
              {REGIONS.map((region) => {
                const Icon = region.icon;
                const isActive = activeRegion === region.id;

                return (
                  <button
                    key={region.id}
                    onClick={() => setActiveRegion(region.id)}
                    className={cn(
                      "flex items-center justify-between p-5 rounded-2xl border transition-all duration-500 text-left w-full cursor-pointer relative overflow-hidden",
                      isActive
                        ? "bg-white dark:bg-gray-900 border-emerald-950/10 dark:border-white/5 shadow-md shadow-emerald-950/[0.02]"
                        : "bg-transparent border-emerald-950/[0.04] dark:border-white/[0.03] hover:border-emerald-950/10 dark:hover:border-white/10 hover:bg-white/40 dark:hover:bg-gray-900/20"
                    )}
                  >
                    <div className="flex items-center gap-4.5 z-10">
                      <div className={cn("p-2.5 rounded-xl border border-emerald-950/5 dark:border-white/5 bg-sand-warm dark:bg-gray-950", isActive && "bg-emerald-deep text-white dark:bg-emerald-400 dark:text-emerald-deep")}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-emerald-deep dark:text-white">
                          {region.name}
                        </h3>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-deep/45 dark:text-sand-warm/40 mt-1">
                          {region.districts.join(' • ')}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={cn(
                      "w-4 h-4 text-emerald-deep/40 dark:text-sand-warm/45 transition-transform duration-300 z-10",
                      isActive && "transform translate-x-1"
                    )} />
                  </button>
                );
              })}
            </div>

            {/* Featured Destinations Board */}
            <div className="rounded-3xl border border-emerald-950/5 dark:border-white/5 bg-white dark:bg-gray-900 p-8 flex-1 flex flex-col justify-center shadow-md shadow-emerald-950/[0.02]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRegion.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <span className={cn("text-[9px] uppercase font-bold tracking-widest mb-1.5 block", selectedRegion.accentColor)}>
                      Handpicked Sanctuaries
                    </span>
                    <p className="text-xs text-emerald-deep/60 dark:text-sand-warm/60 leading-relaxed max-w-md">
                      {selectedRegion.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 pt-4 border-t border-emerald-950/5 dark:border-white/5">
                    {selectedRegion.destinations.map((dest) => (
                      <div
                        key={dest.slug}
                        className="flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-sand-warm/50 dark:hover:bg-gray-950/40 group cursor-pointer transition-colors"
                      >
                        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-deep/5 dark:bg-emerald-400/10 text-emerald-deep dark:text-emerald-400 shrink-0">
                          <MapPin className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <p className="font-serif text-sm font-bold text-emerald-deep dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                            {dest.name}
                          </p>
                          <p className="text-[10px] text-emerald-deep/45 dark:text-sand-warm/40 mt-1">
                            {dest.tagline}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
