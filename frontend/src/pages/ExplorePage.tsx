import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, SlidersHorizontal, Compass, Star,
  ArrowRight, X, ChevronDown, Check, Sparkles, Sliders
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { destinations, districts, experiences } from '@/data/kerala';

const CATEGORY_ICONS: Record<string, any> = {
  'backwaters-cruises': Compass,
  'hill-station-retreats': Compass,
  'beach-holidays': Compass,
  'wildlife-safari': Compass,
  'ayurveda-wellness': Compass,
  'adventure-sports': Compass,
  'cultural-heritage': Compass,
  'food-spice-tours': Compass,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 25 }
  }
} as const;

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [activeDistrict, setActiveDistrict] = useState(searchParams.get('district') || 'all');
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Dynamic state loaded from local mock with API fallback
  const [destinationsList, setDestinationsList] = useState<any[]>(destinations);
  const [districtsList, setDistrictsList] = useState<any[]>(districts);

  useEffect(() => {
    fetch('/api/destinations')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API offline');
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setDestinationsList(data);
      })
      .catch((err) => console.log('Destinations fallback to kerala.ts:', err));

    fetch('/api/districts')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API offline');
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setDistrictsList(data);
      })
      .catch((err) => console.log('Districts fallback to kerala.ts:', err));
  }, []);

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setActiveCategory(searchParams.get('category') || 'all');
    setActiveDistrict(searchParams.get('district') || 'all');
  }, [searchParams]);

  const updateFilters = (search: string, category: string, district: string) => {
    const newParams: Record<string, string> = {};
    if (search) newParams.search = search;
    if (category !== 'all') newParams.category = category;
    if (district !== 'all') newParams.district = district;
    setSearchParams(newParams);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    updateFilters(val, activeCategory, activeDistrict);
  };

  const handleCategoryChange = (val: string) => {
    setActiveCategory(val);
    updateFilters(searchQuery, val, activeDistrict);
  };

  const handleDistrictChange = (val: string) => {
    setActiveDistrict(val);
    updateFilters(searchQuery, activeCategory, val);
  };

  const handleReset = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setActiveDistrict('all');
    setSearchParams({});
  };

  const filteredDestinations = useMemo(() => {
    return destinationsList.filter((dest) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        dest.name.toLowerCase().includes(searchLower) ||
        dest.district.toLowerCase().includes(searchLower) ||
        dest.shortDescription.toLowerCase().includes(searchLower) ||
        dest.tags.some((tag: string) => tag.toLowerCase().includes(searchLower)) ||
        dest.category.toLowerCase().includes(searchLower);

      let matchesCategory = true;
      if (activeCategory !== 'all') {
        const experience = experiences.find((e) => e.slug === activeCategory);
        if (experience) {
          matchesCategory = experience.destinations.includes(dest.slug);
        }
      }

      let matchesDistrict = true;
      if (activeDistrict !== 'all') {
        const matchedDistrict = districtsList.find(
          (d) => d.slug === activeDistrict || d.name.toLowerCase() === activeDistrict.toLowerCase()
        );
        if (matchedDistrict) {
          matchesDistrict = dest.district.toLowerCase() === matchedDistrict.name.toLowerCase();
        } else {
          matchesDistrict = dest.district.toLowerCase() === activeDistrict.toLowerCase();
        }
      }

      return matchesSearch && matchesCategory && matchesDistrict;
    });
  }, [searchQuery, activeCategory, activeDistrict, destinationsList, districtsList]);

  const selectedDistrictName = useMemo(() => {
    if (activeDistrict === 'all') return 'All Districts';
    return districtsList.find(
      (d) => d.slug === activeDistrict || d.name.toLowerCase() === activeDistrict.toLowerCase()
    )?.name || activeDistrict;
  }, [activeDistrict, districtsList]);

  const categoriesList = useMemo(() => {
    const list = [{ slug: 'all', name: 'All', icon: Compass }];
    experiences.forEach((exp) => {
      list.push({
        slug: exp.slug,
        name: exp.name.replace(' Retreats', '').replace(' Holidays', '').replace(' Cruises', '').replace(' Safari', '').replace(' Sports', '').replace(' Tours', ''),
        icon: CATEGORY_ICONS[exp.slug] || Compass,
      });
    });
    return list;
  }, []);

  return (
    <div className="relative py-24 bg-sand-warm dark:bg-gray-950 min-h-screen overflow-hidden transition-colors duration-500">
      {/* Decorative premium ambient glow effects */}
      <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] bg-emerald-500/5 dark:bg-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[550px] h-[550px] bg-teal-500/5 dark:bg-teal-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        <SectionHeader
          badge="Interactive Guide"
          title="Sanctuary Registry"
          description="Browse handcrafted destinations spanning serene coastal bays, cool tea slopes, and silent valleys."
        />

        {/* Premium Glassmorphic Filters Board */}
        <div className="bg-white/50 dark:bg-gray-900/40 backdrop-blur-2xl border border-emerald-950/[0.04] dark:border-white/[0.02] rounded-[32px] p-6 shadow-sm shadow-emerald-950/[0.01] mb-10">
          
          {/* Row 1: Search & dropdown filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-deep/40 dark:text-sand-warm/30 w-4.5 h-4.5" />
              <input
                type="text"
                placeholder="Search sanctuaries, moods, tags..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-sand-warm/60 dark:bg-gray-950/40 border border-emerald-950/[0.04] dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-gold focus:border-transparent transition-all text-xs font-bold uppercase tracking-widest text-emerald-deep dark:text-sand-warm placeholder:text-emerald-deep/30 dark:placeholder:text-sand-warm/20"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-450 hover:text-red-500 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Custom Dropdown District selector */}
            <div className="relative w-full md:w-64">
              <button
                type="button"
                onClick={() => setIsDistrictDropdownOpen(!isDistrictDropdownOpen)}
                className="flex items-center justify-between gap-2 px-5 py-3.5 rounded-2xl bg-sand-warm/60 dark:bg-gray-950/40 border border-emerald-950/[0.04] dark:border-white/5 text-xs font-bold uppercase tracking-widest text-emerald-deep dark:text-sand-warm hover:bg-emerald-950/5 dark:hover:bg-white/5 transition-all w-full text-left"
              >
                <span className="flex items-center gap-2 truncate">
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="truncate">{selectedDistrictName}</span>
                </span>
                <ChevronDown className={cn("w-4 h-4 text-emerald-deep/30 transition-transform duration-200 flex-shrink-0", isDistrictDropdownOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isDistrictDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setIsDistrictDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-full rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-emerald-950/5 dark:border-white/5 shadow-xl overflow-hidden z-30"
                    >
                      <div className="max-h-60 overflow-y-auto py-2">
                        <button
                          type="button"
                          onClick={() => {
                            handleDistrictChange('all');
                            setIsDistrictDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-emerald-50 dark:hover:bg-gray-950 hover:text-emerald-700 transition-colors",
                            activeDistrict === 'all' ? "text-emerald-700 font-black" : "text-gray-600 dark:text-gray-400"
                          )}
                        >
                          All Districts
                        </button>
                        {districtsList.map((d) => {
                          const isSelected = activeDistrict === d.slug || activeDistrict.toLowerCase() === d.name.toLowerCase();
                          return (
                            <button
                              key={d.id || d.slug}
                              type="button"
                              onClick={() => {
                                handleDistrictChange(d.slug);
                                setIsDistrictDropdownOpen(false);
                              }}
                              className={cn(
                                "w-full text-left px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-emerald-50 dark:hover:bg-gray-950 hover:text-emerald-700 transition-colors",
                                isSelected ? "text-emerald-700 font-black" : "text-gray-600 dark:text-gray-400"
                              )}
                            >
                              {d.name}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Row 2: Scrollable Categories Chips */}
          <div className="border-t border-emerald-950/[0.04] dark:border-white/5 pt-5">
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-[10px] font-bold text-emerald-deep/40 dark:text-sand-warm/30 uppercase tracking-widest">
                Curate by Experience Theme
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-emerald-deep/30 dark:text-sand-warm/20">
                <Sliders className="w-3 h-3" /> Scroll for themes
              </span>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
              {categoriesList.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={cn(
                      "flex items-center gap-2.5 px-5 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 cursor-pointer",
                      isActive
                        ? "bg-emerald-deep text-white dark:bg-emerald-400 dark:text-emerald-deep border-transparent"
                        : "bg-sand-warm/40 dark:bg-gray-950/20 border-emerald-950/[0.04] dark:border-white/5 text-emerald-deep/75 dark:text-sand-warm/75 hover:bg-emerald-950/5 dark:hover:bg-white/5"
                    )}
                  >
                    <Icon className={cn("w-3.5 h-3.5", isActive ? "text-white dark:text-emerald-deep" : "text-emerald-600 dark:text-emerald-400")} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Results Info Row */}
        <div className="flex justify-between items-center mb-8 px-2">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-deep/45 dark:text-sand-warm/40">
            Showing <span className="text-emerald-700 dark:text-emerald-400">{filteredDestinations.length}</span> of {destinations.length} spots
          </p>
          {(searchQuery || activeCategory !== 'all' || activeDistrict !== 'all') && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-red-500 bg-red-55/10 hover:bg-red-500/10 px-4 py-2 rounded-full cursor-pointer transition-colors"
            >
              <X className="w-3 h-3" /> Clear filters
            </button>
          )}
        </div>

        {/* Grid display */}
        <AnimatePresence mode="wait">
          {filteredDestinations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="text-center py-20 max-w-sm mx-auto"
            >
              <div className="inline-flex p-4 bg-emerald-500/5 rounded-full text-emerald-600 mb-4 animate-bounce">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-800 dark:text-white">No Sanctuaries Found</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                Try alternative keywords or district filters. We curatively update the registry continuously.
              </p>
              <button
                onClick={handleReset}
                className="mt-6 px-6 py-2.5 rounded-full bg-gold text-emerald-deep font-bold text-xs uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                Reset Search
              </button>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredDestinations.map((destination) => (
                <motion.div
                  key={destination.id}
                  variants={cardVariants}
                  layout
                  className="group flex flex-col justify-between h-full bg-white dark:bg-gray-900/40 border border-emerald-950/[0.04] dark:border-white/5 rounded-3xl overflow-hidden hover:shadow-lg dark:hover:shadow-black/20 hover:-translate-y-1.5 transition-all duration-500 relative"
                >
                  <Link to={`/destination/${destination.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-mist">
                    {/* Cover image */}
                    <div
                      className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${destination.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    
                    {/* Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Top badging */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
                      <Badge variant="emerald" className="bg-emerald-deep/70 dark:bg-emerald-400/90 text-white dark:text-emerald-deep border-none text-[9px] font-bold uppercase tracking-widest py-1 px-2.5 rounded-full">
                        {destination.category.replace('-', ' ')}
                      </Badge>
                      {destination.isHiddenGem && (
                        <Badge className="bg-gold text-emerald-deep border-none text-[9px] font-bold uppercase tracking-widest py-1 px-2.5 rounded-full flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 fill-emerald-deep" /> Hidden Gem
                        </Badge>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-bold border border-white/10 z-10">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                      <span>{destination.rating}</span>
                    </div>

                    {/* Overlay metadata */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <div className="flex items-center gap-1 text-gold text-[10px] font-bold uppercase tracking-widest mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{destination.district}</span>
                      </div>
                      <h3 className="font-serif text-2xl font-normal text-white tracking-wide leading-tight group-hover:text-emerald-350 transition-colors">
                        {destination.name}
                      </h3>
                    </div>
                  </Link>

                  {/* Body description */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <p className="text-xs text-emerald-deep/60 dark:text-sand-warm/60 line-clamp-2 leading-relaxed mb-6 font-normal">
                        {destination.shortDescription}
                      </p>

                      {/* Hashtags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {destination.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="text-[9px] font-bold text-slate-400 dark:text-slate-500 bg-sand-warm/50 dark:bg-gray-950/20 px-2.5 py-1 rounded-lg border border-emerald-950/[0.04] dark:border-white/5 capitalize tracking-wider"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom row metadata */}
                    <div className="flex items-center justify-between border-t border-emerald-950/5 dark:border-white/5 pt-4 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">Best Season</span>
                        <span className="text-xs font-semibold text-emerald-deep/80 dark:text-sand-warm/95">
                          {destination.bestTimeToVisit.split(' (')[0]}
                        </span>
                      </div>
                      <Link
                        to={`/destination/${destination.slug}`}
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-deep dark:text-emerald-450 hover:text-emerald-600 group/btn cursor-pointer"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
