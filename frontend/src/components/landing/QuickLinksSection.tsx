import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Waves, Mountain, Palmtree, Compass, Landmark, Flame } from 'lucide-react';

const categories = [
  {
    id: 'backwaters',
    name: 'Backwaters',
    icon: Waves,
    bgClass: 'from-blue-500/10 to-teal-500/5 hover:from-blue-500/20 hover:to-teal-500/10 text-blue-400 border-blue-500/10',
    description: 'Serene houseboat channels'
  },
  {
    id: 'hill-station',
    name: 'Hill Stations',
    icon: Mountain,
    bgClass: 'from-emerald-500/10 to-green-500/5 hover:from-emerald-500/20 hover:to-green-500/10 text-emerald-400 border-emerald-500/10',
    description: 'Misty tea terraces'
  },
  {
    id: 'beach',
    name: 'Beaches',
    icon: Palmtree,
    bgClass: 'from-amber-500/10 to-orange-500/5 hover:from-amber-500/20 hover:to-orange-500/10 text-amber-400 border-amber-500/10',
    description: 'Golden ocean cliffs'
  },
  {
    id: 'wildlife',
    name: 'Wildlife Reserves',
    icon: Compass,
    bgClass: 'from-purple-500/10 to-indigo-500/5 hover:from-purple-500/20 hover:to-indigo-500/10 text-purple-400 border-purple-500/10',
    description: 'Deep forest safaris'
  },
  {
    id: 'heritage',
    name: 'Cultural Heritage',
    icon: Landmark,
    bgClass: 'from-rose-500/10 to-pink-500/5 hover:from-rose-500/20 hover:to-pink-500/10 text-rose-400 border-rose-500/10',
    description: 'Ancient temples & Kathakali'
  },
  {
    id: 'adventure',
    name: 'Adventure Trails',
    icon: Flame,
    bgClass: 'from-orange-500/10 to-red-500/5 hover:from-orange-500/20 hover:to-red-500/10 text-orange-400 border-orange-500/10',
    description: 'Trekking & river rapids'
  }
];

export function QuickLinksSection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 bg-slate-50 dark:bg-gray-950 overflow-hidden">
      {/* Ambient glass background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div>
            <span className="text-[10px] uppercase font-semibold text-emerald-500 dark:text-emerald-400 tracking-[0.2em] block mb-2">
              Curated Moods
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-slate-900 dark:text-white tracking-tight">
              Choose your <span className="italic font-normal text-emerald-600 dark:text-emerald-400">sensory landscape.</span>
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm font-light">
            Skip directly into hand-picked destinations matching your current travel mood.
          </p>
        </div>

        {/* Horizontal Drag-Scrollable Category Track */}
        <div className="overflow-x-auto pb-6 scrollbar-hide -mx-6 px-6">
          <div className="flex gap-6 min-w-max">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => navigate(`/explore?category=${cat.id}`)}
                  className={`group relative flex flex-col items-start p-6 w-64 rounded-2xl border bg-gradient-to-br backdrop-blur-md transition-all duration-300 text-left active:scale-[0.98] ${cat.bgClass}`}
                >
                  <div className="p-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-white/20 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="mt-8 font-semibold text-slate-800 dark:text-slate-200 text-base">
                    {cat.name}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-light line-clamp-2">
                    {cat.description}
                  </span>
                  <div className="absolute bottom-6 right-6 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-500">
                    →
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

