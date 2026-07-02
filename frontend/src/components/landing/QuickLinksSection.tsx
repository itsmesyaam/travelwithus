import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Waves, Mountain, Palmtree, Compass } from 'lucide-react';

const categories = [
  {
    id: 'backwaters',
    name: 'Backwaters',
    icon: Waves,
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border-blue-100 dark:border-blue-900/60',
    hoverColor: 'hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/60 hover:border-blue-300',
    description: 'Serene houseboat cruises'
  },
  {
    id: 'hills',
    name: 'Hill Stations',
    icon: Mountain,
    color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/60',
    hoverColor: 'hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-emerald-900/60 hover:border-emerald-300',
    description: 'Misty valleys & tea estates'
  },
  {
    id: 'beaches',
    name: 'Beaches',
    icon: Palmtree,
    color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-100 dark:border-amber-900/60',
    hoverColor: 'hover:bg-amber-100 hover:text-amber-700 dark:hover:bg-amber-900/60 hover:border-amber-300',
    description: 'Golden sands & ocean cliffs'
  },
  {
    id: 'wildlife',
    name: 'Wildlife & Culture',
    icon: Compass,
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 border-purple-100 dark:border-purple-900/60',
    hoverColor: 'hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-900/60 hover:border-purple-300',
    description: 'Forest reserves & local arts'
  }
];

export function QuickLinksSection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 bg-slate-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-gray-900 dark:text-white">
            Choose Your <span className="italic font-light text-emerald-600 dark:text-emerald-400">Experience</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Hop directly into destinations matching your unique travel style
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <button
                  onClick={() => navigate(`/explore?category=${cat.id}`)}
                  className={`w-24 h-24 rounded-full flex items-center justify-center border shadow-sm transition-all duration-300 ${cat.color} ${cat.hoverColor} group active:scale-95`}
                >
                  <Icon className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />
                </button>
                <span className="mt-4 font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base">
                  {cat.name}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 max-w-[150px]">
                  {cat.description}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
