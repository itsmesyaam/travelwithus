import React from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudRain, Thermometer, ArrowRight, Leaf, Snowflake, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { Season } from '@/data/kerala';

interface SeasonalSectionProps {
  seasons: Season[];
}

const seasonIcons: Record<string, React.ReactNode> = {
  summer: <Sun className="w-8 h-8" />,
  monsoon: <CloudRain className="w-8 h-8" />,
  winter: <Snowflake className="w-8 h-8" />,
};

const seasonGradients: Record<string, string> = {
  summer: 'from-amber-400 via-orange-500 to-red-500',
  monsoon: 'from-blue-400 via-teal-500 to-emerald-600',
  winter: 'from-sky-300 via-blue-400 to-indigo-500',
};

const seasonBgPatterns: Record<string, string> = {
  summer: 'bg-amber-50 dark:bg-amber-950/20',
  monsoon: 'bg-emerald-50 dark:bg-emerald-950/20',
  winter: 'bg-sky-50 dark:bg-sky-950/20',
};

/**
 * Seasonal recommendations section showing best times to visit Kerala.
 * Animated cards with gradient headers and activity lists.
 */
export function SeasonalSection({ seasons }: SeasonalSectionProps) {
  return (
    <section className="py-24">
      <div className="container">
        <SectionHeader
          badge="When to Visit"
          title="Every Season Tells a Story"
          description="Kerala transforms beautifully through the year. Discover what each season has to offer."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {seasons.map((season, index) => {
            const key = season.slug;
            return (
              <motion.div
                key={season.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }}
                whileHover={{ y: -6 }}
                className={cn(
                  'group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800',
                  'bg-white dark:bg-gray-900 shadow-lg shadow-black/5 dark:shadow-black/20',
                  'cursor-pointer transition-shadow duration-300 hover:shadow-xl'
                )}
              >
                {/* Gradient header */}
                <div
                  className={cn(
                    'relative px-6 py-8 bg-gradient-to-r text-white overflow-hidden',
                    seasonGradients[key] || seasonGradients.summer
                  )}
                >
                  {/* Decorative circles */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                  <div className="absolute -bottom-3 -left-3 w-16 h-16 rounded-full bg-white/5" />

                  <div className="relative flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{season.name}</h3>
                      <p className="text-white/80 text-sm">{season.months}</p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {seasonIcons[key] || <Leaf className="w-8 h-8" />}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Weather info */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <Thermometer className="w-4 h-4" />
                    <span>{season.temperature}</span>
                    <span className="mx-1">·</span>
                    <Droplets className="w-4 h-4" />
                    <span>{season.weather}</span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
                    {season.description}
                  </p>

                  {/* Activities */}
                  <div className="mb-5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      Top Activities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {season.activities.slice(0, 4).map((activity) => (
                        <span
                          key={activity}
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-medium',
                            seasonBgPatterns[key] || seasonBgPatterns.summer,
                            'text-gray-700 dark:text-gray-300'
                          )}
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Destinations */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      Best Destinations
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {season.destinations.slice(0, 3).join(', ')}
                    </p>
                  </div>

                  {/* CTA */}
                  <motion.div
                    className="flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400"
                    whileHover={{ x: 4 }}
                  >
                    Explore {season.name}
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
