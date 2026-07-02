import { MapPin, Sliders, CheckCircle } from 'lucide-react';

const steps = [
  {
    step: '1',
    title: 'Pick Your Destination',
    description: 'Browse our curated list of scenic hill stations, beaches, and historic ports.',
    icon: MapPin,
  },
  {
    step: '2',
    title: 'Customize Your Itinerary',
    description: 'Enter your budget, travel dates, and pace to let our AI build your ideal schedule.',
    icon: Sliders,
  },
  {
    step: '3',
    title: 'Confirm & Travel',
    description: 'Save your customized schedule, view directions, and set off on your Kerala journey.',
    icon: CheckCircle,
  },
];

export function BookingStepsSection() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-6 border-t border-slate-200 dark:border-slate-800">
      <div className="space-y-12">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Booking made as easy as 1-2-3
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Frictionless path from discovering God&apos;s Own Country to landing on its shores.
          </p>
        </div>

        {/* Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-4 relative z-10 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-900 shadow-xs">
              <div className="relative">
                {/* Step circle */}
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center font-bold text-lg">
                  <s.icon className="w-6 h-6 text-emerald-500" />
                </div>
                {/* Step badge */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 rounded-full flex items-center justify-center font-bold text-xs">
                  {s.step}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{s.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
