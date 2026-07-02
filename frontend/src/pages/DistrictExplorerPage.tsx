import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { districts } from '@/data/kerala';

const containerVariants: any = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function DistrictExplorerPage() {
  return (
    <div className="py-12 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container">
        <SectionHeader
          badge="Regions"
          title="Explore Districts of Kerala"
          description="Kerala is divided into 14 unique districts, each offering its own blend of landscape, heritage, and local flavor."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {districts.map((district) => (
            <motion.div
              key={district.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg shadow-black/5 dark:shadow-black/20"
            >
              {/* Header Image */}
              <div className="relative aspect-video overflow-hidden">
                <div
                  className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-950 dark:to-teal-900 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${district.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold">{district.destinationCount} Featured Spots</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {district.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3">
                  {district.description}
                </p>

                <Link
                  to={`/explore?district=${district.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline group/btn"
                >
                  Explore Destinations
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
