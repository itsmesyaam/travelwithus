import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

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

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Ken Burns Slideshow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.0, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
          />
        </AnimatePresence>
        {/* Dark radial and linear gradient vignette for readability and premium look */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent dark:from-gray-950" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-8 select-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-emerald-400">
            Welcome to Kerala
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal leading-tight tracking-tight">
            Explore <span className="italic font-light text-emerald-100">God's Own Country</span>
          </h1>
          <p className="text-sm md:text-xl text-slate-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            Discover serene backwaters, misty hill stations, golden beaches, and rich cultural heritage. Plan your customized itinerary powered by local AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/planner"
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-sm shadow-xl active:scale-[0.98] transition-all"
          >
            Plan Your Journey
          </Link>
          <Link
            to="/explore"
            className="px-8 py-3.5 border border-white/40 text-white rounded-full font-bold text-sm backdrop-blur-md hover:bg-white/10 active:scale-[0.98] transition-all"
          >
            Explore Destinations
          </Link>
        </motion.div>
      </div>

      {/* Multi-layered Wave Curve Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none translate-y-[2px]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto text-slate-50 fill-current dark:text-gray-900"
          preserveAspectRatio="none"
        >
          <path
            fillOpacity="0.2"
            d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"
          />
          <path
            fillOpacity="0.4"
            d="M0,64L120,58.7C240,53,480,43,720,48C960,53,1200,75,1320,85.3L1440,96L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"
          />
          <path
            d="M0,80L120,85.3C240,91,480,101,720,96C960,91,1200,71,1320,60.7L1440,50L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}

