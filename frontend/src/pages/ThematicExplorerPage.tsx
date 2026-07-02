import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Sparkles, Compass, AlertCircle, ArrowLeft } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { destinations } from '@/data/kerala';

interface ThemeConfig {
  title: string;
  badge: string;
  description: string;
  filter: (d: any) => boolean;
}

const THEME_CONFIGS: Record<string, ThemeConfig> = {
  'hidden-gems': {
    title: "Kerala's Hidden Gems",
    badge: "Off the Beaten Path",
    description: "Discover pristine meadows, secret waterfalls, and quiet lagoons tucked away from mainstream tourists.",
    filter: (d) => d.isHiddenGem === true
  },
  'road-trips': {
    title: "Scenic Road Trips",
    badge: "Drive & Wander",
    description: "Hit the highway through mountain passes, tea garden curves, and ocean-facing coastal roadways.",
    filter: (d) => d.tags.includes('drive') || d.tags.includes('hills') || d.category === 'hill-station'
  },
  'weekend-getaways': {
    title: "Quick Weekend Getaways",
    badge: "Short Breaks",
    description: "Perfect short itineraries tailored for quick rejuvenations, close to city hubs like Kochi or Trivandrum.",
    filter: (d) => d.category === 'waterfall' || d.category === 'beach' || d.slug === 'vagamon' || d.slug === 'ponmudi'
  },
  'houseboats': {
    title: "Houseboat Cruises",
    badge: "Waterways",
    description: "Float down historic backwater channels on hand-crafted bamboo houseboats, tasting traditional local dishes.",
    filter: (d) => d.category === 'backwaters' || d.tags.includes('houseboats')
  },
  'adventure': {
    title: "Thrill & Adventure",
    badge: "Adrenaline",
    description: "Trek to high summits, go bamboo rafting in tiger reserves, or paraglide over sea cliffs.",
    filter: (d) => d.category === 'adventure' || d.tags.includes('trekking') || d.slug === 'varkala'
  },
  'wildlife': {
    title: "Wildlife & Nature Reserves",
    badge: "Into the Wild",
    description: "Explore evergreen forests, spot wild elephants, Nilgiri Tahrs, and endemic hornbills.",
    filter: (d) => d.category === 'wildlife' || d.tags.includes('elephants')
  },
  'pilgrimage': {
    title: "Spiritual & Pilgrimage Sites",
    badge: "Heritage",
    description: "Experience absolute peace at centuries-old temples, churches, and historic mosques representing secular harmony.",
    filter: (d) => d.category === 'pilgrimage' || d.tags.includes('history') || d.slug === 'varkala'
  },
  'festivals': {
    title: "Kerala Festivals & Culture",
    badge: "Vibrant Colors",
    description: "Plan your trip around legendary snake boat races, Theyyam dances, and grand temple festivals.",
    filter: (d) => d.category === 'heritage' || d.tags.includes('culture') || d.slug === 'kochi'
  },
  'food-trails': {
    title: "Food & Spice Trails",
    badge: "Culinary Tours",
    description: "Indulge in rich culinary journeys from hot seafood curry in toddy shops to organic pepper plantations.",
    filter: (d) => d.tags.includes('seafood') || d.tags.includes('spices')
  }
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' }
  })
};

export function ThematicExplorerPage() {
  const { themeSlug } = useParams<{ themeSlug: string }>();
  const activeSlug = themeSlug || 'hidden-gems';
  const config = THEME_CONFIGS[activeSlug];

  if (!config) {
    return (
      <div className="container py-24 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Theme Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The requested travel theme does not exist.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 font-semibold">
          <ArrowLeft className="w-4 h-4" /> Go Back Home
        </Link>
      </div>
    );
  }

  const results = destinations.filter(config.filter);

  return (
    <div className="py-12 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-8 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <SectionHeader
          badge={config.badge}
          title={config.title}
          description={config.description}
        />

        {results.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl">
            <Compass className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-spin-slow" />
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">Coming Soon!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
              Our travel experts are currently curation custom itineraries for this specific theme. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((destination, index) => (
              <motion.article
                key={destination.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg shadow-black/5 dark:shadow-black/20 cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-950 dark:to-teal-900 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${destination.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="emerald" size="sm">
                      {destination.category.replace('-', ' ')}
                    </Badge>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-0.5 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-white text-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{destination.rating}</span>
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white mb-0.5">{destination.name}</h3>
                    <div className="flex items-center gap-1 text-white/80 text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>{destination.district}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {destination.shortDescription}
                  </p>
                  <Link
                    to={`/destination/${destination.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 group/btn"
                  >
                    View Details
                    <Sparkles className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
