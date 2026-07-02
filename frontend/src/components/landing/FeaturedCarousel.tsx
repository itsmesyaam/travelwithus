import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star, MapPin } from 'lucide-react';
import { destinations } from '@/data/kerala';

interface CarouselItem {
  name: string;
  slug: string;
  category: string;
  district: string;
  region: string;
  rating: number;
  reviews: number;
  image: string;
  price: string;
}

const fallbackCarouselItems: CarouselItem[] = [
  {
    name: 'Munnar Hills',
    slug: 'munnar',
    category: 'Hill Station Retreats',
    district: 'Idukki',
    region: 'Central Kerala',
    rating: 4.8,
    reviews: 1250,
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&h=800&q=80',
    price: '₹3,200',
  },
  {
    name: 'Alleppey Backwaters',
    slug: 'alleppey',
    category: 'Backwater Cruises',
    district: 'Alappuzha',
    region: 'South Kerala',
    rating: 4.9,
    reviews: 1840,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&h=800&q=80',
    price: '₹4,999',
  },
  {
    name: 'Varkala Beach',
    slug: 'varkala',
    category: 'Beach Holidays',
    district: 'Thiruvananthapuram',
    region: 'South Kerala',
    rating: 4.8,
    reviews: 980,
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&h=800&q=80',
    price: '₹3,500',
  },
  {
    name: 'Wayanad Forests',
    slug: 'wayanad',
    category: 'Wildlife Safari',
    district: 'Wayanad',
    region: 'North Kerala',
    rating: 4.7,
    reviews: 920,
    image: 'https://images.unsplash.com/photo-11685458078059-be1415eab4c3?auto=format&fit=crop&w=600&h=800&q=80',
    price: '₹2,500',
  }
];

export function FeaturedCarousel() {
  const [items, setItems] = useState<CarouselItem[]>(fallbackCarouselItems);

  useEffect(() => {
    fetch('/api/destinations')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API failed');
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Map backend schemas to carousel requirements
          const mapped = data.slice(0, 4).map((d: any, idx: number) => ({
            name: d.name,
            slug: d.slug,
            category: d.category.replace('-', ' ').toUpperCase(),
            district: d.district,
            region: d.region,
            rating: d.rating || 4.5,
            reviews: d.reviews || 10,
            image: fallbackCarouselItems[idx % 4].image, // use premium portrait cards
            price: fallbackCarouselItems[idx % 4].price,
          }));
          setItems(mapped);
        }
      })
      .catch((err) => console.log('Carousel falling back to static premium slides:', err));
  }, []);

  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      {/* Container Card in mockup */}
      <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/40 rounded-[32px] p-8 md:p-12 space-y-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 text-left">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Top Destinations
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg">
              From backwater escapes to cool mountain towns, discover where your next journey will take you.
            </p>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link
              key={item.slug}
              to={`/destination/${item.slug}`}
              className="group relative h-[380px] rounded-2xl overflow-hidden shadow-md flex flex-col justify-end p-5 transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
            >
              {/* Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Price Tag badge (top right) */}
              <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-950/95 text-slate-800 dark:text-slate-100 px-3 py-1 rounded-full text-[10px] font-extrabold shadow-sm">
                starts at {item.price}
              </div>

              {/* Bottom details */}
              <div className="relative z-10 text-left space-y-1.5 text-white">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  {item.category}
                </span>
                <h3 className="text-lg font-black tracking-tight leading-snug">
                  {item.name}
                </h3>
                
                <div className="flex items-center gap-3 text-xs text-slate-200/90 font-medium">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    {item.rating} ({item.reviews})
                  </span>
                  <span className="text-slate-400">|</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-300" />
                    {item.district}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Actions Row */}
        <div className="flex justify-between items-center pt-2">
          <Link
            to="/explore"
            className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold text-xs hover:bg-slate-800 active:scale-[0.98] transition-all"
          >
            View more
          </Link>
          
          <div className="flex items-center gap-3">
            <button className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>
            <button className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer">
              <ArrowRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
