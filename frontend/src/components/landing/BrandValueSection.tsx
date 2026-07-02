import { motion } from 'framer-motion';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Compass, 
  CalendarCheck, 
  Headphones,
  Users,
  Award,
  MapPin
} from 'lucide-react';

const stats = [
  { count: '12k', label: 'Happy and Satisfied Travelers', icon: Users },
  { count: '10yrs', label: 'Proven Travel Experience', icon: Award },
  { count: '50+', label: 'Kerala Destinations Covered', icon: MapPin },
];

const cards = [
  {
    title: 'Local Expertise',
    description: 'Our native travel experts craft unique experiences with insider knowledge you won\'t find in typical tours.',
    icon: Compass,
  },
  {
    title: 'All-in-One Booking',
    description: 'Book everything in one place—easy, fast, and hassle-free, whether for quick getaways or planned vacations.',
    icon: CalendarCheck,
  },
  {
    title: '24/7 Support',
    description: 'We\'re here anytime, anywhere. Get real-time help anytime you need it before, during, or after your trip.',
    icon: Headphones,
  },
];

export function BrandValueSection() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-6 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Copy and Stats */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Why Thousands of Travelers Choose KERALA.in for Their Kerala Adventures
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              From pristine backwaters to cultural hotspots, we make exploring the Spice Coast easier, safer, and more exciting with expert-crafted itineraries and round-the-clock support.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <a href="#" className="hover:text-emerald-500 transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-emerald-500 transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-emerald-500 transition-colors"><Facebook className="w-5 h-5" /></a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            {stats.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-full">
                  <s.icon className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none">{s.count}</h3>
                  <p className="text-[10px] md:text-xs text-slate-500 font-medium mt-1 leading-tight">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Stacked Translucent Cards */}
        <div className="space-y-4">
          {cards.map((c, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 6 }}
              className="flex gap-5 p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-xs"
            >
              <div className="flex-shrink-0 p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl h-fit">
                <c.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{c.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {c.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
