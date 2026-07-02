import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ExperiencesSection() {
  return (
    <section className="py-32 bg-slate-50 dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        
        {/* ── Spotlight 1: Munnar (Left Text, Right Image) ── */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 space-y-6"
          >
            <span className="text-[10px] uppercase font-semibold text-emerald-500 dark:text-emerald-400 tracking-[0.2em] block">
              Editorial Spotlight
            </span>
            <h3 className="font-serif text-4xl md:text-5xl font-light text-slate-900 dark:text-white leading-tight tracking-tight">
              Misty slopes & <br />
              <span className="italic font-normal text-emerald-600 dark:text-emerald-400">emerald horizons.</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed text-sm md:text-base">
              Munnar is a tapestry of endless tea plantations where morning clouds settle gently over silent valleys. Walk along quiet paths lined with wild eucalyptus, smell the sweet aroma of drying cardamoms, and witness the rare Nilgiri Tahr bounding gracefully across craggy clifftops at sunrise.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <Link
                to="/destination/munnar"
                className="group flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Read Article 
                <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                4.9/5 Rating
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
            <img
              src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80"
              alt="Misty tea gardens of Munnar"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>
        </div>

        {/* ── Spotlight 2: Alleppey (Right Text, Left Image) ── */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 space-y-6"
          >
            <span className="text-[10px] uppercase font-semibold text-emerald-500 dark:text-emerald-400 tracking-[0.2em] block">
              Slow Travel
            </span>
            <h3 className="font-serif text-4xl md:text-5xl font-light text-slate-900 dark:text-white leading-tight tracking-tight">
              Drifting through <br />
              <span className="italic font-normal text-emerald-600 dark:text-emerald-400">labyrinths of palm.</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed text-sm md:text-base">
              The backwaters of Alleppey offer a sanctuary of slow-paced living. Board a hand-crafted wooden houseboat woven with coir knots, glide past quiet farming hamlets hugging narrow canals, and watch local fishermen cast nets under a warm, amber sky reflecting the beauty of old-world Kerala.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <Link
                to="/destination/alleppey"
                className="group flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Read Article 
                <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                4.8/5 Rating
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
            <img
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
              alt="Houseboat cruising the canals of Alleppey"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}

