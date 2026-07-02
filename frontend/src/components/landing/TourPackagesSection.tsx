import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function TourPackagesSection() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Description Slate Card */}
        <div className="bg-slate-200 dark:bg-slate-900 border border-slate-300/30 dark:border-slate-800/40 rounded-[24px] p-8 flex flex-col justify-between items-start text-left h-[380px]">
          <div className="space-y-4">
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Tour Packages
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Affordable, customizable, and unforgettable adventures designed to show you the best of Kerala's culture and geography.
            </p>
          </div>
          <Link
            to="/explore"
            className="px-6 py-3.5 bg-slate-900 text-white rounded-full font-bold text-xs hover:bg-slate-800 active:scale-[0.98] transition-all"
          >
            Browse all packages
          </Link>
        </div>

        {/* Package Card 1 */}
        <Link
          to="/planner"
          className="group relative h-[380px] rounded-[24px] overflow-hidden shadow-md flex flex-col justify-end p-6 transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer text-left"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&h=800&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          <div className="relative z-10 space-y-2 text-white">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
              Backwaters Cruise
            </span>
            <h4 className="text-xl font-bold tracking-tight">
              Classic Vembanad Houseboat Cruise
            </h4>
            <p className="text-xs text-slate-200/90 line-clamp-2 leading-relaxed">
              Hop from beach to beach in Marari with boat tours, guided village walks, and sunset cruises.
            </p>
          </div>
        </Link>

        {/* Package Card 2 */}
        <Link
          to="/planner"
          className="group relative h-[380px] rounded-[24px] overflow-hidden shadow-md flex flex-col justify-end p-6 transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer text-left"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&h=800&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          <div className="relative z-10 space-y-2 text-white">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
              Highland Escape
            </span>
            <h4 className="text-xl font-bold tracking-tight">
              Misty Munnar Peak Escapes
            </h4>
            <p className="text-xs text-slate-200/90 line-clamp-2 leading-relaxed">
              Experience the cool breeze of Munnar with organic tea estate walks, spice plantation tours, and local food guides.
            </p>
          </div>
        </Link>

      </div>
    </section>
  );
}
