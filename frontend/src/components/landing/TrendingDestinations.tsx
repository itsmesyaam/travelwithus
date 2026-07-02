import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import type { Destination } from '@/data/kerala';

interface TrendingDestinationsProps {
  destinations: Destination[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  }),
};

/**
 * Trending destinations grid with premium card design.
 * Features hover effects, rating badges, and category tags.
 */
export function TrendingDestinations({ destinations }: TrendingDestinationsProps) {
  const trending = destinations.filter((d) => d.isTrending).slice(0, 6);

  return (
    <section className="py-24 bg-gray-50/50 dark:bg-gray-950/50">
      <div className="container">
        <SectionHeader
          badge="Popular Now"
          title="Trending Destinations"
          description="Discover the most sought-after destinations that travelers are raving about right now."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trending.map((destination, index) => (
            <motion.article
              key={destination.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg shadow-black/5 dark:shadow-black/20 border border-gray-100 dark:border-gray-800 cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="w-full h-full bg-gradient-to-br from-emerald-200 to-teal-300 dark:from-emerald-800 dark:to-teal-900 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${destination.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Top badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="emerald" size="sm">
                    {destination.category.replace('-', ' ')}
                  </Badge>
                  {destination.isHiddenGem && (
                    <Badge variant="amber" size="sm">
                      Hidden Gem
                    </Badge>
                  )}
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-white text-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{destination.rating}</span>
                </div>

                {/* Bottom info overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {destination.name}
                  </h3>
                  <div className="flex items-center gap-1 text-white/80 text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{destination.district}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                  {destination.shortDescription}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{destination.bestTimeToVisit}</span>
                  </div>
                  <motion.div
                    className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-sm"
                    whileHover={{ x: 4 }}
                  >
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-emerald-500/50 text-emerald-700 dark:text-emerald-400 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
          >
            View All Destinations
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
