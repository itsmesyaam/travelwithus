'use client';

import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  ArrowRight,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  { label: '500+ Destinations', icon: MapPin },
  { label: '50K+ Happy Travelers', icon: Users },
  { label: '14 Districts', icon: Search },
  { label: '4.9★ Rating', icon: Star },
];

const container: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const headingWords = 'Discover the Magic of God\'s Own Country'.split(' ');

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* ── Animated gradient background ── */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-emerald-950 via-teal-900 to-gray-950 animate-gradient-shift" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_20%,rgba(16,185,129,.18),transparent_60%)]" />

      {/* ── Floating decorative orbs ── */}
      <div className="absolute top-[12%] left-[8%] h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl animate-float" />
      <div className="absolute bottom-[18%] right-[6%] h-96 w-96 rounded-full bg-teal-400/15 blur-3xl animate-float [animation-delay:2s]" />
      <div className="absolute top-[55%] left-[55%] h-56 w-56 rounded-full bg-cyan-400/10 blur-2xl animate-float [animation-delay:4s]" />

      {/* ── Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 text-center"
      >
        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {headingWords.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.5, delay: i * 0.08 },
                },
              }}
              className={cn(
                'inline-block mr-[0.3em]',
                (word === "God's" || word === 'Own' || word === 'Country') &&
                  'bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent'
              )}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          variants={fadeUp}
          className="mb-10 max-w-2xl text-base text-emerald-100/70 sm:text-lg md:text-xl"
        >
          AI-powered travel planning for Kerala&apos;s most breathtaking destinations
        </motion.p>

        {/* ── Quick-search widget ── */}
        <motion.div
          variants={fadeUp}
          className={cn(
            'w-full max-w-3xl rounded-2xl border border-white/10',
            'bg-white/5 p-4 shadow-2xl shadow-emerald-900/30 backdrop-blur-xl',
            'sm:p-6'
          )}
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Destination */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-300" />
              <input
                type="text"
                placeholder="Where to?"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-sm text-white placeholder-white/40 outline-none ring-emerald-400 transition focus:ring-2"
              />
            </div>

            {/* Date */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-300" />
              <input
                type="date"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-sm text-white placeholder-white/40 outline-none ring-emerald-400 transition focus:ring-2 [color-scheme:dark]"
              />
            </div>

            {/* Travelers */}
            <div className="relative">
              <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-300" />
              <select className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-sm text-white outline-none ring-emerald-400 transition focus:ring-2">
                <option value="" disabled selected className="text-gray-900">
                  Travelers
                </option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n} className="text-gray-900">
                    {n} {n === 1 ? 'Traveler' : 'Travelers'}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA */}
            <button
              className={cn(
                'group flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white',
                'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25',
                'transition-all duration-300 hover:shadow-emerald-500/40 hover:scale-[1.03] active:scale-[0.98]'
              )}
            >
              Explore Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="absolute bottom-24 z-10 mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-6 px-4 sm:gap-10"
      >
        {stats.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-sm text-emerald-100/60 sm:text-base"
          >
            <Icon className="h-4 w-4 text-emerald-400" />
            <span>{label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-xs tracking-widest text-emerald-200/40 uppercase">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce text-emerald-300/50" />
      </motion.div>
    </section>
  );
}
