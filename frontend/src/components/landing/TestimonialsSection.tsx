import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { Testimonial } from '@/data/kerala';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

/**
 * Testimonials section with animated cards in a masonry-style grid.
 * Features user avatars, star ratings, and trip type badges.
 */
export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-24 bg-gray-50/50 dark:bg-gray-950/50">
      <div className="container">
        <SectionHeader
          badge="What Travelers Say"
          title="Stories from Kerala"
          description="Real experiences from travelers who explored God's Own Country with TravelWithUs."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as any,
              }}
              whileHover={{ y: -4 }}
              className={cn(
                'relative rounded-2xl p-6',
                'bg-white dark:bg-gray-900',
                'border border-gray-100 dark:border-gray-800',
                'shadow-lg shadow-black/5 dark:shadow-black/20',
                'transition-shadow duration-300 hover:shadow-xl'
              )}
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 text-emerald-200 dark:text-emerald-800">
                <Quote className="w-8 h-8" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < testimonial.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                    )}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-4">
                "{testimonial.text}"
              </p>

              {/* Author info */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-100 dark:ring-emerald-900"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {testimonial.location}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                    {testimonial.tripType}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
