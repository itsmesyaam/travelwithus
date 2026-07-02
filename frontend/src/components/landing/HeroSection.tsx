import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[650px] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* ── Cinematic Autoplay Video Backdrop ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 opacity-80 dark:opacity-70 transition-opacity duration-1000"
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

        {/* Cinematic radial and linear overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-black/40 to-slate-50 dark:to-gray-950" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/30 to-black/60" />
      </div>

      {/* ── Content Layout ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white space-y-8 select-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="text-[10px] uppercase font-semibold text-emerald-400 tracking-[0.3em] block"
          >
            TravelWithUs • Experiences
          </motion.span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal leading-tight tracking-tight">
            Discover the <span className="italic font-light text-emerald-100 block md:inline">soul of Kerala.</span>
          </h1>
          <p className="text-sm md:text-xl text-slate-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            Personalized journeys, handcrafted by AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/planner"
            className="px-8 py-3.5 bg-white text-gray-950 hover:bg-slate-100 rounded-full font-semibold text-sm shadow-xl active:scale-[0.98] transition-all duration-300"
          >
            Plan My Journey
          </Link>
          <Link
            to="/explore"
            className="px-8 py-3.5 border border-white/30 text-white rounded-full font-semibold text-sm backdrop-blur-md hover:bg-white/10 active:scale-[0.98] transition-all duration-300"
          >
            Explore Kerala
          </Link>
        </motion.div>
      </div>

      {/* ── Multi-layered Wave Curve Divider ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none translate-y-[2px]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto text-slate-50 fill-current dark:text-gray-950"
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
