import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sun, CloudRain, Snowflake, Thermometer, ArrowRight, Check } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { seasons } from '@/data/kerala';

const seasonIcons: Record<string, React.ReactNode> = {
  summer: <Sun className="w-12 h-12" />,
  monsoon: <CloudRain className="w-12 h-12" />,
  winter: <Snowflake className="w-12 h-12" />,
};

const gradients: Record<string, string> = {
  summer: 'from-amber-400 to-orange-500',
  monsoon: 'from-blue-400 to-emerald-600',
  winter: 'from-sky-300 to-indigo-500',
};

export function SeasonalExplorerPage() {
  return (
    <div className="py-12 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container">
        <SectionHeader
          badge="Timing"
          title="Seasonal Travel Guide"
          description="Find the absolute best time to visit Kerala depending on what sights and experiences you want to pursue."
        />

        <div className="space-y-12">
          {seasons.map((season, index) => {
            const key = season.slug;
            return (
              <motion.div
                key={season.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex flex-col lg:flex-row gap-8 items-stretch bg-gray-50/50 dark:bg-gray-900/40 rounded-3xl p-8 border border-gray-100 dark:border-gray-800"
              >
                {/* Visual block */}
                <div className={`w-full lg:w-1/3 rounded-2xl bg-gradient-to-br ${gradients[key] || gradients.summer} p-8 flex flex-col justify-between text-white relative overflow-hidden`}>
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
                  
                  <div className="relative">
                    <span className="text-sm font-semibold uppercase tracking-wider bg-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                      {season.months}
                    </span>
                    <h3 className="text-3xl font-extrabold mt-6">{season.name}</h3>
                  </div>

                  <div className="relative mt-12 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Thermometer className="w-5 h-5 text-white/90" />
                      <span className="text-sm font-semibold">{season.temperature}</span>
                    </div>
                    <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                      {seasonIcons[key] || <Sun className="w-12 h-12" />}
                    </div>
                  </div>
                </div>

                {/* Content block */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Overview</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {season.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Activities */}
                      <div>
                        <h5 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                          Recommended Activities
                        </h5>
                        <ul className="space-y-2">
                          {season.activities.map((act) => (
                            <li key={act} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Destinations */}
                      <div>
                        <h5 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                          Top Destinations to Visit
                        </h5>
                        <ul className="space-y-2">
                          {season.destinations.map((dest) => (
                            <li key={dest} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <Check className="w-4 h-4 text-sky-500 flex-shrink-0" />
                              <span>{dest}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Weather: <strong className="text-gray-800 dark:text-gray-200">{season.weather}</strong>
                    </span>
                    <Link
                      to={`/explore?season=${key}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500 transition-colors"
                    >
                      Filter Destinations
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
