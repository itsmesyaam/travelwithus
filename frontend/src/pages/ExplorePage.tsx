import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Star,
  Compass,
  Ship,
  Mountain,
  Umbrella,
  Trees,
  Heart,
  Tent,
  Landmark,
  Utensils,
  ChevronDown,
  X,
  ArrowRight,
  SlidersHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { destinations, experiences, districts } from '@/data/kerala';

// Map experience slug to a matching Lucide icon for horizontal scroll selector
const CATEGORY_ICONS: Record<string, any> = {
  'all': Compass,
  'backwater-cruises': Ship,
  'hill-station-retreats': Mountain,
  'beach-holidays': Umbrella,
  'wildlife-safari': Trees,
  'ayurveda-wellness': Heart,
  'adventure-sports': Tent,
  'cultural-heritage': Landmark,
  'food-spice-tours': Utensils,
};

// Animation variants for container staggering
const containerVariants: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

// Animation variants for individual cards
const cardVariants: any = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Local filter states initialized from URL search params for bookmarkable states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [activeDistrict, setActiveDistrict] = useState(searchParams.get('district') || 'all');
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);

  // Sync URL search params to React state (for back/forward navigation)
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setActiveCategory(searchParams.get('category') || 'all');
    setActiveDistrict(searchParams.get('district') || 'all');
  }, [searchParams]);

  // Update URL search parameters when filters are changed
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

  // Filtered destinations list
  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        dest.name.toLowerCase().includes(searchLower) ||
        dest.district.toLowerCase().includes(searchLower) ||
        dest.shortDescription.toLowerCase().includes(searchLower) ||
        dest.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
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
        const matchedDistrict = districts.find(
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
  }, [searchQuery, activeCategory, activeDistrict]);

  // Display name of the active district filter
  const selectedDistrictName = useMemo(() => {
    if (activeDistrict === 'all') return 'All Districts';
    return districts.find(
      (d) => d.slug === activeDistrict || d.name.toLowerCase() === activeDistrict.toLowerCase()
    )?.name || activeDistrict;
  }, [activeDistrict]);

  // Category navigation items
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
    <div className="relative py-12 bg-white dark:bg-gray-950 min-h-screen overflow-hidden transition-colors duration-300">
      {/* Decorative premium ambient glow effects */}
      <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-emerald-500/5 dark:bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[450px] h-[450px] bg-teal-500/5 dark:bg-teal-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        <SectionHeader
          badge="Interactive Map & Guide"
          title="Explore Kerala Spots"
          description="Find your next sanctuary in the serene backwaters, mist-shrouded tea plantations, and pristine ocean cliffs."
        />

        {/* Premium Glassmorphic Filters Panel */}
        <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-3xl p-6 shadow-xl shadow-black/[0.02] dark:shadow-black/[0.1] mb-8">
          {/* Row 1: Search input & District Selector */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Box */}
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations, tags, activities..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-gray-100/50 dark:bg-gray-800/40 border border-gray-200/40 dark:border-gray-800/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-transparent backdrop-blur-sm transition-all text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-650 dark:hover:text-gray-250 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Custom Dropdown District Picker */}
            <div className="relative w-full md:w-64">
              <button
                type="button"
                onClick={() => setIsDistrictDropdownOpen(!isDistrictDropdownOpen)}
                className="flex items-center justify-between gap-2 px-4 py-3.5 rounded-2xl bg-gray-100/50 dark:bg-gray-800/40 border border-gray-200/40 dark:border-gray-800/60 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200/20 dark:hover:bg-gray-850 transition-all w-full text-left"
              >
                <span className="flex items-center gap-2 truncate">
                  <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="truncate">{selectedDistrictName}</span>
                </span>
                <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0", isDistrictDropdownOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isDistrictDropdownOpen && (
                  <>
                    {/* Backdrop to dismiss on click-out */}
                    <div className="fixed inset-0 z-20" onClick={() => setIsDistrictDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute right-0 mt-2 w-full rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-850 shadow-2xl overflow-hidden z-30"
                    >
                      <div className="max-h-60 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-200/80 dark:scrollbar-thumb-gray-800">
                        <button
                          type="button"
                          onClick={() => {
                            handleDistrictChange('all');
                            setIsDistrictDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-4 py-2.5 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors",
                            activeDistrict === 'all' ? "bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-semibold" : "text-gray-700 dark:text-gray-300"
                          )}
                        >
                          All Districts
                        </button>
                        {districts.map((d) => {
                          const isSelected = activeDistrict === d.slug || activeDistrict.toLowerCase() === d.name.toLowerCase();
                          return (
                            <button
                              key={d.id}
                              type="button"
                              onClick={() => {
                                handleDistrictChange(d.slug);
                                setIsDistrictDropdownOpen(false);
                              }}
                              className={cn(
                                "w-full text-left px-4 py-2.5 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors",
                                isSelected ? "bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-semibold" : "text-gray-700 dark:text-gray-300"
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

          {/* Row 2: Category Chips List */}
          <div className="border-t border-gray-200/40 dark:border-gray-800/40 pt-5">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-bold text-gray-450 dark:text-gray-500 uppercase tracking-wider">
                Filter by Category
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Scroll to explore themes
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1.5 -mx-2 px-2">
              {categoriesList.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={cn(
                      "flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md",
                      isActive
                        ? "bg-gradient-to-r from-emerald-600 to-teal-500 border-transparent text-white scale-[1.02] shadow-emerald-500/20 dark:shadow-emerald-900/10"
                        : "bg-white/40 dark:bg-gray-900/40 border-gray-200/50 dark:border-gray-800/80 text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive ? "text-white animate-pulse" : "text-emerald-500")} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Results Statement */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8 px-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-bold text-emerald-600 dark:text-emerald-400">{filteredDestinations.length}</span> of{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-300">{destinations.length}</span> destinations
          </p>
          {(searchQuery || activeCategory !== 'all' || activeDistrict !== 'all') && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 bg-red-50 dark:bg-red-950/20 px-3.5 py-1.5 rounded-full hover:underline transition-all cursor-pointer"
            >
              <X className="w-3 h-3" /> Clear all filters
            </button>
          )}
        </div>

        {/* Destination Reveal Animation / Grid Layout */}
        <AnimatePresence mode="wait">
          {filteredDestinations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="text-center py-20 bg-white/40 dark:bg-gray-900/10 border border-dashed border-gray-250 dark:border-gray-800 rounded-3xl backdrop-blur-sm max-w-md mx-auto"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 mb-4 animate-bounce">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No Destinations Found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6 px-4">
                We couldn't find any places matching your filters. Try search keywords or choosing a different district.
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold text-sm hover:from-emerald-500 hover:to-teal-400 transition-all shadow-md shadow-emerald-500/10"
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
                  className="group flex flex-col justify-between h-full bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-850 rounded-2xl overflow-hidden shadow-md shadow-black/[0.01] hover:shadow-xl dark:shadow-black/[0.12] transition-all duration-300 relative hover:-translate-y-2 hover:border-emerald-500/20 dark:hover:border-emerald-500/15"
                >
                  <Link to={`/destination/${destination.slug}`} className="block relative aspect-[4/3] overflow-hidden">
                    {/* Destination Image */}
                    <div
                      className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-950 dark:to-teal-900 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${destination.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    {/* Gradient Overlay for visual readibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Top badging */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
                      <Badge variant="emerald" size="sm" className="capitalize backdrop-blur-md bg-emerald-900/60 text-emerald-100 border-none">
                        {destination.category.replace('-', ' ')}
                      </Badge>
                      {destination.isHiddenGem && (
                        <Badge variant="amber" size="sm" className="backdrop-blur-md bg-amber-900/60 text-amber-200 border-none">
                          Hidden Gem
                        </Badge>
                      )}
                    </div>

                    {/* Rating badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-xs font-semibold border border-white/10 z-10">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
                      <span>{destination.rating}</span>
                    </div>

                    {/* Image overlay details */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <div className="flex items-center gap-1 text-emerald-450 dark:text-emerald-400 text-xs font-bold mb-1 uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{destination.district}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-wide leading-tight group-hover:text-emerald-100 transition-colors">
                        {destination.name}
                      </h3>
                    </div>
                  </Link>

                  {/* Card description and metadata */}
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
                        {destination.shortDescription}
                      </p>

                      {/* Display hashtags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {destination.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/40 px-2.5 py-0.5 rounded-md border border-gray-200/20 dark:border-gray-700/20 capitalize"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Metadata & CTA Action Link */}
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800/60 pt-4 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500">Best Season</span>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                          {destination.bestTimeToVisit.split(' (')[0] || destination.bestTimeToVisit}
                        </span>
                      </div>
                      <Link
                        to={`/destination/${destination.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-350 transition-colors group/btn cursor-pointer"
                      >
                        Explore Spot
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
