import { motion } from 'framer-motion';
import { MapPin, Sliders, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    step: '01',
    label: 'PICK YOUR PARADISE',
    title: 'Discover Kerala’s diverse landscapes',
    description: 'Browse our curated collection of destinations. Whether you dream of waking up above the mist in Munnar’s tea estates, cruising the emerald canals of Alleppey in a luxury houseboat, or watching the sunset over Varkala’s towering red cliffs, we cover it all with genuine local details.',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    link: '/explore',
    linkText: 'Explore Destinations'
  },
  {
    step: '02',
    label: 'CRAFT THE ITINERARY',
    title: 'Tailor the journey with localized AI',
    description: 'Provide your travel duration, group size, budget, and style. Our advanced local AI planner instantly builds a custom day-by-day itinerary complete with realistic travel times, local dining recommendations, and hidden gems that standard guides miss.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    link: '/planner',
    linkText: 'Build Your Custom Trip'
  },
  {
    step: '03',
    label: 'CONFIRM & DEPART',
    title: 'Everything you need in one smart dashboard',
    description: 'Save your customized itinerary directly to your profile. Share it with friends or family with a single click, view interactive routing directions, and embark on your dream holiday with real-time updates and peace of mind.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    link: '/dashboard',
    linkText: 'Go to Your Dashboard'
  },
];

export function BookingStepsSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 space-y-24 md:space-y-36">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-emerald-600 dark:text-emerald-400">
            How it works
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-gray-900 dark:text-white leading-tight">
            Planning Your Journey is <span className="italic font-light text-emerald-600 dark:text-emerald-400">Frictionless</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-light">
            Three simple steps to transition from dreaming about Kerala to landing on its shores.
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-28 md:space-y-40">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={step.step}
                className={`grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center`}
              >
                {/* Text Block */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`md:col-span-6 relative space-y-6 ${!isEven ? 'md:order-2' : ''}`}
                >
                  {/* Big background number */}
                  <div className="absolute -top-12 -left-4 md:-top-20 md:-left-8 select-none pointer-events-none font-serif text-8xl md:text-9xl font-extrabold text-emerald-500/10 leading-none">
                    {step.step}
                  </div>

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="h-[2px] w-12 bg-emerald-500 rounded-full" />
                      <span className="text-xs font-bold tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
                        {step.label}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 dark:text-white leading-tight">
                      {step.title}
                    </h3>

                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                      {step.description}
                    </p>

                    <div className="pt-2">
                      <Link
                        to={step.link}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 group transition-colors"
                      >
                        {step.linkText}
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>

                {/* Image Block */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`md:col-span-6 ${!isEven ? 'md:order-1' : ''}`}
                >
                  <div className="relative group overflow-hidden rounded-3xl shadow-xl aspect-[4/3] bg-slate-100 dark:bg-gray-950 border border-gray-200/50 dark:border-gray-800/40">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/10 dark:bg-black/25 group-hover:opacity-0 transition-opacity duration-300" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
