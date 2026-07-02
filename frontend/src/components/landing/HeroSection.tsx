'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80',
    title: 'Misty Tea Terraces of Munnar',
  },
  {
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80',
    title: 'Serene Houseboat Canals of Alleppey',
  },
  {
    url: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1920&q=80',
    title: 'Scenic Coastal Cliffs of Varkala',
  }
];

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
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* ── Background Slideshow with cross-fade & Ken Burns zoom ── */}
      <div className="absolute inset-0 -z-20 overflow-hidden bg-slate-950">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
          />
        </AnimatePresence>
        {/* Dark vignette overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-slate-950/70" />
      </div>

      {/* ── Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 text-center mt-12 sm:mt-16"
      >
        {/* Welcome Tag */}
        <motion.span
          variants={fadeUp}
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20"
        >
          🌴 Welcome to God&apos;s Own Country
        </motion.span>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-sans"
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
                (word === "God's" || word === 'Own' || word === 'Country' || word === 'Magic') &&
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
          className="mb-6 max-w-2xl text-base text-emerald-100/80 sm:text-lg md:text-xl font-medium"
        >
          The Smartest Way to Explore Kerala&apos;s Most Breathtaking Destinations.
        </motion.p>

        {/* Trust Seals */}
        <motion.div
          variants={fadeUp}
          className="mb-10 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold"
        >
          <span className="flex items-center gap-1.5 bg-red-600/90 text-white px-3 py-1.5 rounded-md border border-red-500/20 uppercase tracking-wider text-[10px] font-extrabold shadow-md">
            🛡️ GOVT. APPROVED PARTNER
          </span>
          <span className="flex items-center gap-1.5 bg-emerald-600/90 text-white px-3 py-1.5 rounded-md border border-emerald-500/20 uppercase tracking-wider text-[10px] font-extrabold shadow-md">
            🏆 TRAVELERS&apos; CHOICE 2026
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900/95 text-slate-200 px-3 py-1.5 rounded-md border border-white/5 uppercase tracking-wider text-[10px] font-extrabold shadow-md">
            🔒 SAFE TOURISM CERTIFIED
          </span>
        </motion.div>

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
