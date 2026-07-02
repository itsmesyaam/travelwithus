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
    <section className="relative w-full max-w-7xl mx-auto px-4 pt-28 pb-10">
      {/* ── Immersive Floating Bento Hero Card ── */}
      <div className="relative h-[550px] md:h-[600px] w-full rounded-[32px] overflow-hidden shadow-2xl flex flex-col justify-center items-start px-8 md:px-20 text-left">
        
        {/* Background Ken Burns Slideshow */}
        <div className="absolute inset-0 -z-20 overflow-hidden bg-slate-950">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.05 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
            />
          </AnimatePresence>
          {/* Transparent slate vignette to maximize text contract and match the premium mockup */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="max-w-2xl text-white space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase select-none leading-none">
              KERALA<span className="text-emerald-400">.in</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-100/90 font-medium leading-relaxed">
              Discover breathtaking destinations across Kerala with curated tours, local insights, and hassle-free planning all in one platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              to="/planner"
              className="px-8 py-3.5 bg-white text-gray-900 rounded-full font-bold text-sm hover:bg-slate-100 active:scale-[0.98] transition-all shadow-lg"
            >
              Plan Your Trip
            </Link>
            <Link
              to="/explore"
              className="px-8 py-3.5 border border-white/40 text-white rounded-full font-bold text-sm backdrop-blur-xs hover:bg-white/10 active:scale-[0.98] transition-all"
            >
              Explore Destinations
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
