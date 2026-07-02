import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, MapPin, Calendar, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * AI Trip Planner call-to-action section.
 * Full-width gradient banner with animated elements and compelling copy.
 */
export function AIPlannerCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 dark:from-emerald-800 dark:via-teal-800 dark:to-cyan-900" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-white/3 animate-float" />

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-sm font-semibold">Powered by Artificial Intelligence</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Let AI Plan Your
            <br />
            <span className="text-amber-300">Perfect Kerala Trip</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Tell us your preferences, and our AI will craft a personalized itinerary
            with the best destinations, routes, accommodations, and hidden gems.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {[
              { icon: <MapPin className="w-4 h-4" />, text: 'Smart Routes' },
              { icon: <Calendar className="w-4 h-4" />, text: 'Day-by-Day Plans' },
              { icon: <Zap className="w-4 h-4" />, text: 'Budget Optimized' },
              { icon: <Sparkles className="w-4 h-4" />, text: 'Hidden Gems' },
            ].map((feature) => (
              <span
                key={feature.text}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/15"
              >
                {feature.icon}
                {feature.text}
              </span>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'inline-flex items-center gap-2 px-10 py-4 rounded-2xl',
                'bg-white text-emerald-700 font-bold text-lg',
                'shadow-2xl shadow-black/20',
                'hover:shadow-white/20 transition-shadow duration-300'
              )}
            >
              <Sparkles className="w-5 h-5" />
              Start Planning with AI
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
