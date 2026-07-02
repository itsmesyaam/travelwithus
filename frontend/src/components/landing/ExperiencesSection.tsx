import React from 'react';
import { motion } from 'framer-motion';
import {
  Ship, Mountain, Umbrella, Binoculars,
  Heart, Zap, Landmark, UtensilsCrossed,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { Experience } from '@/data/kerala';

interface ExperiencesSectionProps {
  experiences: Experience[];
}

const iconMap: Record<string, React.ReactNode> = {
  'ship': <Ship className="w-7 h-7" />,
  'mountain': <Mountain className="w-7 h-7" />,
  'umbrella': <Umbrella className="w-7 h-7" />,
  'binoculars': <Binoculars className="w-7 h-7" />,
  'heart': <Heart className="w-7 h-7" />,
  'zap': <Zap className="w-7 h-7" />,
  'landmark': <Landmark className="w-7 h-7" />,
  'utensils': <UtensilsCrossed className="w-7 h-7" />,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const gradients = [
  'from-emerald-500 to-teal-600',
  'from-sky-500 to-blue-600',
  'from-amber-500 to-orange-600',
  'from-purple-500 to-violet-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-teal-500',
  'from-indigo-500 to-blue-500',
  'from-lime-500 to-green-600',
];

/**
 * Experiences/categories section with animated icon cards.
 * Each card has a gradient background and hover lift effect.
 */
export function ExperiencesSection({ experiences }: ExperiencesSectionProps) {
  return (
    <section className="py-24">
      <div className="container">
        <SectionHeader
          badge="Curated For You"
          title="Unforgettable Experiences"
          description="From tranquil backwaters to thrilling adventures, Kerala offers something extraordinary for every traveler."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Gradient background */}
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-90 group-hover:opacity-100 transition-opacity duration-300',
                  gradients[index % gradients.length]
                )}
              />

              {/* Decorative circle */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/5" />

              {/* Content */}
              <div className="relative p-6 min-h-[200px] flex flex-col justify-between text-white">
                <div>
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {iconMap[experience.icon] || <Zap className="w-7 h-7" />}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{experience.name}</h3>
                  <p className="text-sm text-white/80 line-clamp-2">
                    {experience.description}
                  </p>
                </div>

                <motion.div
                  className="flex items-center gap-1 text-sm font-medium mt-4 text-white/90"
                  whileHover={{ x: 4 }}
                >
                  Discover
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
