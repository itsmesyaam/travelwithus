import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const navigate = useNavigate();
  const [sourceCity, setSourceCity] = useState('');
  const [duration, setDuration] = useState('3');

  const handleQuickCurate = (e: React.FormEvent) => {
    e.preventDefault();
    // Cache the pre-fill parameters locally and route to planner
    const prefill = {
      source_city: sourceCity || 'Cochin',
      duration: parseInt(duration),
      budget: 'mid-range',
      travel_style: 'Solo',
      interests: [],
    };
    localStorage.setItem('travelwithus-prefill-trip', JSON.stringify(prefill));
    navigate('/planner');
  };

  return (
    <section className="relative w-full h-screen min-h-[750px] flex items-center justify-center overflow-hidden bg-emerald-deep">
      {/* ── Cinematic Slow-Motion Video Backdrop ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 opacity-55 dark:opacity-40 transition-opacity duration-1000"
          poster="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-boat-on-the-water-with-tropical-vegetation-43184-large.mp4"
            type="video/mp4"
          />
          {/* Fallback image */}
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80')` }}
          />
        </video>

        {/* Premium ambient grading layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/90 via-emerald-deep/30 to-sand-warm dark:to-gray-950" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-emerald-deep/20 to-emerald-deep/80" />
      </div>

      {/* ── Immersive Editorial Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <span className="text-[10px] uppercase font-bold text-gold tracking-[0.4em] block mb-2">
            God's Own Country • AI Concierge
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal leading-[1.1] tracking-tight">
            Where water whispers, <br />
            <span className="italic font-light text-emerald-300">and palms sway.</span>
          </h1>
          <p className="text-sm md:text-lg text-sand-warm/80 max-w-xl mx-auto font-sans tracking-wide font-light leading-relaxed">
            Handcrafted travel sanctuaries designed dynamically matching your spirit.
          </p>
        </motion.div>

        {/* ── Luxury Glassmorphic Quick Planner Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <form 
            onSubmit={handleQuickCurate}
            className="flex flex-col md:flex-row items-stretch gap-3 md:gap-2 p-3 bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 rounded-[28px] md:rounded-full shadow-2xl text-left"
          >
            {/* departure inputs */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-1.5 border-b md:border-b-0 md:border-r border-white/10">
              <MapPin className="w-4 h-4 text-emerald-300 shrink-0" />
              <div className="flex-1">
                <span className="block text-[9px] uppercase font-bold tracking-widest text-emerald-100/70">Departing From</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cochin, London, Berlin"
                  value={sourceCity}
                  onChange={(e) => setSourceCity(e.target.value)}
                  className="w-full bg-transparent border-none text-xs font-semibold placeholder-white/50 text-white outline-none focus:ring-0 p-0 mt-0.5"
                />
              </div>
            </div>

            {/* duration selection */}
            <div className="w-full md:w-48 flex items-center gap-3 px-4 py-3 md:py-1.5">
              <Calendar className="w-4 h-4 text-emerald-300 shrink-0" />
              <div className="flex-1">
                <span className="block text-[9px] uppercase font-bold tracking-widest text-emerald-100/70">Duration</span>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-transparent border-none text-xs font-semibold text-white outline-none focus:ring-0 p-0 mt-0.5 cursor-pointer [color-scheme:dark]"
                >
                  <option value="3">3 Days (Weekend)</option>
                  <option value="5">5 Days (Explore)</option>
                  <option value="7">7 Days (Standard)</option>
                  <option value="10">10 Days (Grand Tour)</option>
                </select>
              </div>
            </div>

            {/* button */}
            <button
              type="submit"
              className="px-8 py-4 bg-gold hover:bg-gold/90 text-emerald-deep hover:scale-[1.01] active:scale-[0.99] rounded-[20px] md:rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Curate Sanctuary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>

        {/* Ambient Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
          onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}
        >
          <span className="text-[9px] uppercase font-bold tracking-widest text-white/50">Scroll to Explore</span>
          <div className="w-1.5 h-6 rounded-full bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-1.5 h-2 bg-emerald-300 rounded-full absolute top-0"
            />
          </div>
        </motion.div>
      </div>

      {/* ── Multi-layered Wave Curve Divider filling sand-warm color ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none translate-y-[2px]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto text-sand-warm fill-current dark:text-gray-950"
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
