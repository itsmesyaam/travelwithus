import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Star,
  Compass,
  Calendar,
  Thermometer,
  Plane,
  Check,
  Sparkles,
  Navigation,
  Share2,
  ChevronRight,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { destinations } from '@/data/kerala';

// Dynamic category style mapping
const categoryColors: Record<string, string> = {
  'hill-station': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
  'backwaters': 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25',
  'beach': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
  'wildlife': 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/25',
  'heritage': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25',
  'pilgrimage': 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/25',
  'adventure': 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25',
  'waterfall': 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/25',
};

// Category descriptions for AI dynamic responses
const categoryDetails: Record<string, { itinerary: string; food: string; spots: string; tips: string[] }> = {
  'hill-station': {
    itinerary: 'Morning: Trek misty peaks or walk tea plantations. Afternoon: Visit local dams and spice gardens. Evening: Enjoy sunset views and local tea.',
    food: 'Fresh cardamom tea, hot Appam with Veg Stew, banana fritters, and locally harvested honey.',
    spots: 'Hidden valleys, mist points, and sunrise lookouts.',
    tips: [
      'Carry warm clothing as temperature dips in the evenings.',
      'Plan early starts to avoid thick fog on mountain paths.',
      'Pre-book permits for peak hikes (e.g. Chembra Peak).',
      'Purchase spices and tea from authorized estate outlets.'
    ]
  },
  'backwaters': {
    itinerary: 'Morning: Canoe narrow canals for village life views. Afternoon: Traditional lunch on a houseboat. Evening: Sunset cruise on the lake.',
    food: 'Karimeen Pollichathu (pearl spot fish grilled in banana leaves), toddy, and Kerala red rice.',
    spots: 'Narrow village canals, bird sanctuary paths, and lakeside islets.',
    tips: [
      'Book houseboats in advance to avoid high on-the-spot rates.',
      'Carry mosquito repellent for evening and night hours.',
      'Opt for canoeing/shikara to navigate narrow streams houseboats cannot reach.',
      'Enjoy fresh local toddy responsibly at certified local shops.'
    ]
  },
  'beach': {
    itinerary: 'Morning: Swimming or early surf lessons. Afternoon: Ayurvedic massage at a beachside spa. Evening: Walk along cliffs or light house at sunset.',
    food: 'Spicy fish curry, grilled prawns, coconut water, and tapioca chips.',
    spots: 'Cliff trails, isolated coves, and beachside rock formations.',
    tips: [
      'Use high SPF sunscreen and wear sunglasses/hats.',
      'Pay attention to lifeguards and warning flags on the beach.',
      'Evening walks are cooler and offer magnificent views of the Arabian Sea.',
      'Dine at shacks for authentic, freshly caught seafood.'
    ]
  },
  'wildlife': {
    itinerary: 'Morning: Jungle safari or lake cruise. Afternoon: Guided forest walk. Evening: Tribal heritage presentation or wildlife movie.',
    food: 'Traditional Kerala Sadya, bamboo rice payasam, and herbal coffee.',
    spots: 'Animal drinking holes, bird nests, and watchtowers.',
    tips: [
      'Wear neutral, earth-toned clothing (khaki, olive, brown).',
      'Maintain absolute silence during safaris to avoid disturbing wildlife.',
      'Book safaris online well in advance via the Forest Department.',
      'Carry binoculars and zoom lenses for bird and animal spotting.'
    ]
  },
  'heritage': {
    itinerary: 'Morning: Heritage walking tour of palaces and monuments. Afternoon: Museum visits. Evening: Traditional art form performance.',
    food: 'Spicy biryani, Kerala parotta with curry, and local sweet snacks.',
    spots: 'Ancient murals, antique shops, and historic street lanes.',
    tips: [
      'Dress respectfully when visiting heritage monuments and palaces.',
      'Hire certified guides to understand historical mural work.',
      'Rent a bicycle to explore heritage streets at your own pace.',
      'Check local listings for Kathakali or Kalaripayattu performances.'
    ]
  },
  'pilgrimage': {
    itinerary: 'Morning: Participate in morning prayers/rituals. Afternoon: Visit temple museum. Evening: Walk temple pond surrounding paths.',
    food: 'Pure vegetarian temple prasadam, payasam, and simple local meals.',
    spots: 'Temple ponds, ancient Gopurams, and historical shrine structures.',
    tips: [
      'Check the dress code; many temples require traditional attire.',
      'Footwear must be left outside the temple complex.',
      'Photography is strictly prohibited inside the main shrine.',
      'Respect local customs, prayers, and silent zones.'
    ]
  },
  'adventure': {
    itinerary: 'Morning: Trekking or peak climbing. Afternoon: Kayaking or ziplining. Evening: Campfire and stargazing.',
    food: 'Steamed puttu with kadala curry, local energy snacks, and black tea.',
    spots: 'Windswept ridges, rocky cliffs, and river rafting routes.',
    tips: [
      'Wear sturdy trekking shoes with good grip.',
      'Stay hydrated and carry ample drinking water.',
      'Never venture into deep forests or climb peaks without a certified guide.',
      'Check local weather conditions before embarking on outdoor activities.'
    ]
  },
  'waterfall': {
    itinerary: 'Morning: Trek to the base of the waterfall. Afternoon: Relax at nearby forest picnic spots. Evening: Capture long exposure photographs.',
    food: 'Hot pepper tea, tapioca with fish curry, and fresh tropical fruits.',
    spots: 'Forest trails, misty viewpoints, and waterfall stream banks.',
    tips: [
      'Rocks near waterfalls are extremely slippery; stay within safety barriers.',
      'Avoid swimming during heavy monsoon flows; currents are treacherous.',
      'Keep your electronics inside waterproof bags.',
      'Carry salt or spray for forest leeches during rainy months.'
    ]
  }
};

export default function DestinationDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'food' | 'spots' | null>(null);

  // Look up destination
  const destination = destinations.find((d) => d.slug === slug);

  // Copy page link to clipboard
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate AI Recommendation
  const handleAiRecommend = (type: 'itinerary' | 'food' | 'spots') => {
    setAiLoading(true);
    setActiveTab(type);
    setAiResponse(null);
    
    setTimeout(() => {
      if (destination) {
        const details = categoryDetails[destination.category] || categoryDetails['hill-station'];
        setAiResponse(details[type]);
      }
      setAiLoading(false);
    }, 800);
  };

  // 404 Render
  if (!destination) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-white dark:bg-gray-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center p-8 rounded-2xl glass border border-gray-200 dark:border-gray-800 shadow-xl"
        >
          <div className="inline-flex p-4 bg-emerald-50 dark:bg-emerald-950/50 rounded-full text-emerald-600 dark:text-emerald-400 mb-6">
            <AlertCircle className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Destination Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            The destination you are looking for does not exist or might have been renamed. Let's get you back on track.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="w-full btn btn-primary flex justify-center items-center gap-2 cursor-pointer text-white"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  const categoryLabel = destination.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const detailsConfig = categoryDetails[destination.category] || categoryDetails['hill-station'];

  return (
    <div className="bg-slate-50 dark:bg-gray-950 text-slate-800 dark:text-slate-100 min-h-screen pb-20">
      
      {/* 1. Large Hero Header (50vh) */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url(${destination.coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        {/* Navigation & Share Row */}
        <div className="absolute top-6 left-0 right-0 z-10">
          <div className="container flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass text-white text-sm font-semibold hover:bg-white/20 transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass text-white text-sm font-semibold hover:bg-white/20 transition-all cursor-pointer shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              {copied ? 'Copied!' : 'Share'}
            </button>
          </div>
        </div>

        {/* Hero Meta (Overlaid) */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-4xl"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/25 text-white backdrop-blur-md">
                  {categoryLabel}
                </span>
                {destination.isHiddenGem && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-slate-950 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-slate-950" /> Hidden Gem
                  </span>
                )}
                {destination.isTrending && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white">
                    Trending
                  </span>
                )}
              </div>

              {/* Title & Location */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-3">
                {destination.name}
              </h1>
              <div className="flex items-center gap-2 text-slate-300 font-medium text-lg">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>{destination.district} District, {destination.region}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Main details) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description & Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="w-6 h-6 text-emerald-500" /> Overview
              </h2>
              <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed font-normal">
                {destination.description}
              </p>
            </motion.section>

            {/* 2. Quick Info Grid Card */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                
                {destination.elevation && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/50">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block mb-1 uppercase tracking-wider">Elevation</span>
                    <span className="text-base font-bold text-slate-800 dark:text-slate-200">{destination.elevation}</span>
                  </div>
                )}
                
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/50">
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block mb-1 uppercase tracking-wider">Best Time</span>
                  <span className="text-base font-bold text-slate-800 dark:text-slate-200">{destination.bestTimeToVisit}</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/50">
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block mb-1 uppercase tracking-wider">Temperature</span>
                  <span className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Thermometer className="w-4 h-4 text-rose-500" />
                    {destination.temperature.min}°C - {destination.temperature.max}°C
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/50 md:col-span-2">
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block mb-1 uppercase tracking-wider">Nearest Airport</span>
                  <span className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Plane className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="line-clamp-1">{destination.nearestAirport}</span>
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/50">
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block mb-1 uppercase tracking-wider">Rating</span>
                  <span className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {destination.rating} <span className="text-xs text-slate-400 font-normal">({destination.reviews.toLocaleString()})</span>
                  </span>
                </div>

              </div>
            </motion.section>

            {/* 4. Highlights Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" /> Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-xl hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="flex-shrink-0 p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* 5. Activities Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Navigation className="w-6 h-6 text-emerald-500" /> Recommended Activities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {destination.activities.map((activity, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="p-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/70 rounded-xl shadow-xs hover:border-emerald-500 dark:hover:border-emerald-500/80 transition-colors duration-300 flex flex-col justify-between"
                  >
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider block mb-2 uppercase">Activity {idx + 1}</span>
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-4">{activity}</h3>
                    <div className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 group cursor-pointer gap-1">
                      <span>Learn more</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* 6. Practical Travel Tips (Frosted Glass Card) */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass p-6 md:p-8 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /> Practical Travel Tips
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  To ensure a smooth and memorable visit to {destination.name}, our local travel experts suggest keeping these tips in mind:
                </p>
                <ul className="space-y-3.5">
                  {detailsConfig.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

            {/* 7. Map Coordinates Widget */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-6 h-6 text-emerald-500" /> Location Coordinates
              </h2>
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg">Geographic Coordinates</h3>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 font-mono">
                      Latitude: {destination.coordinates.lat.toFixed(4)} | Longitude: {destination.coordinates.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${destination.coordinates.lat},${destination.coordinates.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 text-sm font-semibold hover:text-emerald-500 transition-all flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center"
                >
                  <Navigation className="w-4 h-4" /> Open in Google Maps
                </a>
              </div>
            </motion.section>

          </div>

          {/* Right Column (AI Sidebar) */}
          <div className="space-y-6 lg:h-fit lg:sticky lg:top-24">
            
            {/* 8. AI Recommendations Sidebar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden rounded-2xl border border-emerald-500/20 dark:border-emerald-500/10 shadow-lg"
            >
              {/* Emerald header banner */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white relative">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3" />
                <div className="flex items-center gap-2.5 mb-2">
                  <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-100">KeralaX Concierge</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight">Ask Travel AI</h3>
                <p className="text-xs text-white/80 mt-1">Get instant personalized guidance for your journey to {destination.name}.</p>
              </div>

              {/* Bot panel body */}
              <div className="p-6 bg-white dark:bg-slate-900 space-y-6">
                
                {/* AI Chat Bubble */}
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 fill-emerald-500/20" />
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-800 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Hello! I'm your local AI travel assistant. Choose a recommendation topic below to generate details for {destination.name}:
                  </div>
                </div>

                {/* Option Chips */}
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'itinerary', label: 'Suggest a 2-Day Itinerary' },
                    { id: 'food', label: 'Local Food Recommendations' },
                    { id: 'spots', label: 'Photographer\'s Checklist' }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => handleAiRecommend(btn.id as any)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left text-sm font-semibold cursor-pointer transition-all ${
                        activeTab === btn.id
                          ? 'bg-emerald-500 border-emerald-500 text-white dark:text-slate-950'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-500'
                      }`}
                    >
                      <span>{btn.label}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ))}
                </div>

                {/* Interactive response window */}
                <AnimatePresence mode="wait">
                  {(aiLoading || aiResponse) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 relative"
                    >
                      {aiLoading ? (
                        <div className="flex items-center gap-3 text-slate-400 py-3">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-100" />
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-200" />
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-300" />
                          <span className="text-xs font-semibold font-sans tracking-wide">Crafting AI suggestions...</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">AI Response</span>
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 animate-fade-in">
                            {aiResponse}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>

          </div>

        </div>
      </div>

    </div>
  );
}
