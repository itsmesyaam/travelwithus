import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ChevronRight,
  Heart,
  Bookmark,
  Share2,
  Search,
  Sparkles,
  Send,
  Compass,
  MessageSquare,
  Check,
  ThumbsUp,
  X,
  Map,
  Award,
  Globe
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { blogPosts } from '@/data/kerala';

// ── RICH, DETAILED ARTICLES DATABASE ──
// Map slug to full written articles, gallery, facts, and guide tips.
interface Section {
  title?: string;
  content: string;
  quote?: string;
  highlightCard?: {
    title: string;
    icon: 'trek' | 'rain' | 'spice' | 'boat';
    items: { title: string; desc: string }[];
  };
}

interface RichArticle {
  title: string;
  image: string;
  subtitle: string;
  accentColor: 'emerald' | 'sky' | 'amber' | 'teal';
  accentTheme: {
    badge: string;
    glow: string;
    border: string;
    bg: string;
    text: string;
  };
  quickFacts: { label: string; value: string; icon: any }[];
  localTip: {
    guide: string;
    role: string;
    text: string;
    avatar: string;
  };
  highlights: string[];
  sections: Section[];
  conclusion: string;
}

const RICH_ARTICLES: Record<string, RichArticle> = {
  '10-hidden-gems-kerala': {
    title: '10 Hidden Gems in Kerala That Most Tourists Never Discover',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Step off the tourist trail and discover the wild, mist-covered mountain peaks, phantom rock formations, and untouched shores of God\'s Own Country.',
    accentColor: 'emerald',
    accentTheme: {
      badge: 'emerald',
      glow: 'shadow-glow-emerald',
      border: 'border-emerald-500/20 dark:border-emerald-500/10',
      bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      text: 'text-emerald-600 dark:text-emerald-400'
    },
    quickFacts: [
      { label: 'Best Time', value: 'October to March', icon: Calendar },
      { label: 'Permits', value: 'Required for Gavi Eco-trek', icon: Compass },
      { label: 'Difficulty', value: 'Moderate to Challenging', icon: Map },
      { label: 'Duration', value: '3 to 5 Days Itinerary', icon: Clock }
    ],
    localTip: {
      guide: 'Manoj Kumaran',
      role: 'Vagamon Wilderness Ranger',
      text: 'The hills here have a rhythm of their own. Always trek in the mornings; by 2 PM, the mountain mist rolls in so thick you won\'t see your hand in front of your face. It\'s beautiful but unforgiving.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'
    },
    highlights: [
      'Trek the cloud-veiled paths of Nelliyampathy.',
      'Spot the rare Nilgiri Tahr in Gavi.',
      'Stand on Kasaragod\'s highest rock monolith in Ranipuram.',
      'Walk the bamboo forest trails of Athirappilly.'
    ],
    sections: [
      {
        title: 'The Lure of the Western Ghats: Nelliyampathy Hills',
        content: 'Rising from the Palakkad Gap, the winding roads to Nelliyampathy ascend through 10 hair-raising hairpin bends, revealing panoramic views of the Pothundy Dam reservoir below. The highlight of this trail is the Seetharkundu viewpoint, where ancient mythology meets dramatic geography. Locals believe Lord Rama, Lakshmana, and Sita rested here during their exile. The trail winds through dense tea and cardamom estates, culminating in a giant rock overhang that projects out over a 1000-foot drop. The air here is thin, scented with wild eucalyptus, and perpetually cooled by mountain drafts. It is the perfect introduction to Kerala\'s high-altitude hidden trails.',
        quote: 'In the quiet of Nelliyampathy\'s valleys, you can hear the whispers of the clouds as they brush against the cardamom leaves.'
      },
      {
        title: 'Gavi: Into the Deep Emerald Forest',
        content: 'Managed under the Kerala Forest Development Corporation, Gavi is a sanctuary of eco-tourism. Unlike typical reserve forests, Gavi limits entry to only a few vehicles daily, preserving its pristine wilderness. The trail here leads you through towering pine trees, silent reservoir lakes, and thick bamboo groves. A night safari guided by local tribal naturalists offers a rare opportunity to hear the call of the wild, and you might catch the reflective eyes of a barking deer or a herd of wild elephants grazing under the moonlight. The silence here is dense, interrupted only by the rustle of the canopy.',
        highlightCard: {
          title: 'Gavi Wildlife Sightings',
          icon: 'trek',
          items: [
            { title: 'Lion-tailed Macaque', desc: 'One of the most endangered primates, often spotted in the tree canopy.' },
            { title: 'Nilgiri Goral', desc: 'A stocky mountain goat that grazes on the grassy slopes.' },
            { title: 'Indian Elephant', desc: 'Majestic herds that frequent the watering holes at sunset.' }
          ]
        }
      },
      {
        title: 'Ranipuram: Standing on the Roof of Kasaragod',
        content: 'Located in the northernmost district of Kasaragod, Ranipuram is often compared to Ooty for its cool, refreshing climate. The trekking trail is a challenging 2.5-hour ascent that climbs through dense shola forests, home to wild orchids and butterfly species, before opening up into expansive, wind-swept grasslands. The pinnacle is a massive, dome-shaped rock monolith. Standing atop this peak, surrounded by clouds moving at lightning speed, you feel as though you are standing on the roof of Malabar. It\'s a surreal vista where mountains roll like giant waves into the horizon.',
        quote: 'Standing on the peak of Ranipuram, the world below dissolves into an endless ocean of green hills and racing mist.'
      },
      {
        title: 'Ilaveezhapoonchira: The Valley of No Leaves',
        content: 'Tucked away in the Kottayam district, Ilaveezhapoonchira is a hilltop destination that translates literally to "the pond where leaves do not fall." Because no trees grow on these bare mountain tops, the wind sweeps all leaves away. This unique landscape offers an unobstructed 360-degree view of three surrounding mountain peaks—Mankunnu, Kudayathoor Vindhyan, and Karandikallu. At sunrise, the entire valley fills with a sea of white fog, with only the peaks rising above like islands in an ocean.'
      }
    ],
    conclusion: 'Kerala\'s hidden trails are not just destinations; they are invitations to slow down and listen to the natural world. Far from the concrete resort pools and crowded photo lines, these quiet sanctuaries remind us of why we travel in the first place—to be wowed, to be humbled, and to discover the wild corners of ourselves.'
  },
  'ultimate-kerala-monsoon-guide': {
    title: 'The Ultimate Kerala Monsoon Guide: Why Rainy Season Is the Best Season',
    image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Experience God\'s Own Country as its landscapes turn into neon-green valleys, waterfalls roar with primeval force, and Ayurvedic retreats offer deep physical healing.',
    accentColor: 'sky',
    accentTheme: {
      badge: 'blue',
      glow: 'shadow-glow-ocean',
      border: 'border-sky-500/20 dark:border-sky-500/10',
      bg: 'bg-sky-50/50 dark:bg-sky-950/20',
      text: 'text-sky-600 dark:text-sky-400'
    },
    quickFacts: [
      { label: 'Monsoon Cycle', value: 'June to September', icon: Calendar },
      { label: 'Temperature', value: '22°C to 29°C', icon: Compass },
      { label: 'Best For', value: 'Ayurveda & Waterfalls', icon: Map },
      { label: 'Savings Rate', value: 'Up to 40% Off Peak', icon: Clock }
    ],
    localTip: {
      guide: 'Dr. Anjali Nair',
      role: 'Lead Ayurvedic Physician, Kovalam',
      text: 'During the monsoon, the body\'s humors (doshas) are in transition. The wet weather clears the dust, lowers body temperature, and dilates the skin pores. This makes the muscles soft and extremely receptive to targeted herbal oil infusions.',
      avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&w=150&h=150&q=80'
    },
    highlights: [
      'Experience the southwest monsoon (Edavappathi) raw power.',
      'Undergo traditional Panchakarma detoxification treatments.',
      'Witness Athirappilly and Soochipara falls at peak volume.',
      'Cruise the quiet backwaters under tapping raindrops.'
    ],
    sections: [
      {
        title: 'The Magic of Edavappathi: The Coming of the Rains',
        content: 'When the southwest monsoon rolls in from the Arabian Sea, it brings the dry heat of the Indian summer to a dramatic end. In Kerala, this season is called Edavappathi. Unlike the gloomy, depressing rain of northern latitudes, the monsoon here is dynamic. Bright spells of hot sunshine are interrupted by heavy, thunderous downpours that wash the skies clean and release the fragrant aroma of wet earth. Vegetation explodes in shades of neon-green, and rivers swell, breathing life back into the entire ecosystem.',
        quote: 'The monsoon in Kerala is not a season of staying indoors; it is a celebration of water, growth, and the cycle of life.'
      },
      {
        title: 'Rejuvenation through Monsoon Ayurveda',
        content: 'For centuries, the monsoon has been the traditional season for Ayurvedic treatments in South India. High humidity keeps the skin moist and helps the pores open up, letting healing herbal oils penetrate deep into the muscle tissues and bloodstream. In this climate, the body is naturally relaxed and ready to release toxins. Treatments like Abhyanga (warm oil massage), Pizhichil (oil bath), and Shirodhara (warm oil poured on the forehead) are highly effective during these wet months. It\'s a total reboot for the body and mind.',
        highlightCard: {
          title: 'Key Monsoon Ayurvedic Benefits',
          icon: 'rain',
          items: [
            { title: 'Detoxification', desc: 'Warm climate opens pores, accelerating the release of stored environmental toxins.' },
            { title: 'Joint Mobility', desc: 'Ayurvedic oils lubricate stiff joints, reducing inflammation aggravated by summer heat.' },
            { title: 'Mental Calm', desc: 'The sound of rainfall combined with herbal therapy induces deep meditative sleep.' }
          ]
        }
      },
      {
        title: 'Waterfall Chasing: Witnessing the Roar of the Giants',
        content: 'If you have ever wanted to witness the raw, primeval power of water, Kerala\'s monsoons are your ticket. Athirappilly Falls, often called the "Niagara of India," becomes a thunderous, terrifying sheet of white foam, sending mist flying for miles. The roar of the water can be heard from a distance of two kilometers. Similarly, in Wayanad, the Meenmutty and Soochipara falls cascade down multi-tiered rock faces with majestic force. Walking the forest trails leading to these falls is an adventure in itself, with rain capes flapping and the forest canopy humming with life.'
      }
    ],
    conclusion: 'Traveling during the monsoon requires a shift in mindset. You must accept that you will get wet, that schedules might delay, and that nature is in charge. But if you embrace the rain, you will experience a version of Kerala that is incredibly lush, quiet, and deeply healing—a side of the country that fair-weather tourists will never know.'
  },
  'food-lovers-road-trip-spice-coast': {
    title: 'A Food Lover\'s Road Trip Through Kerala\'s Spice Coast',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Embark on an 800 km road trip along the ancient Spice Coast, tasting spicy Malabar biryani, cardamom hill tea, and toddy shop fish curry.',
    accentColor: 'amber',
    accentTheme: {
      badge: 'amber',
      glow: 'shadow-glow-ocean',
      border: 'border-amber-500/20 dark:border-amber-500/10',
      bg: 'bg-amber-50/50 dark:bg-amber-950/20',
      text: 'text-amber-600 dark:text-amber-400'
    },
    quickFacts: [
      { label: 'Total Distance', value: '800 Kilometers', icon: Map },
      { label: 'Key Spices', value: 'Cardamom & Black Pepper', icon: Compass },
      { label: 'Best Season', value: 'November to February', icon: Calendar },
      { label: 'Signature Meal', value: 'Karimeen & Red Matta Rice', icon: Clock }
    ],
    localTip: {
      guide: 'Chef K.R. Pillai',
      role: 'Malabar Culinary Historian',
      text: 'To understand Kerala food, you must understand our geography. Our coast gives us fresh seafood and coconuts, while our mountains give us pepper and cardamom. Every dish is a dialogue between the sea and the hills.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
    },
    highlights: [
      'Savor aromatic, short-grain Thalassery Biryani in Kozhikode.',
      'Tour active pepper and cardamom plantations in Munnar hills.',
      'Taste mild Portuguese-influenced Fish Molee in Fort Kochi.',
      'Sip fresh coconut toddy with spicy Pearl Spot fry in Alleppey.'
    ],
    sections: [
      {
        title: 'Kozhikode: The Port of Biryani and Halwa',
        content: 'We begin our culinary pilgrimage in Kozhikode, a historic port city. Here, the cuisine is a beautiful blend of Arab and local Mappila traditions. The crown jewel is the Thalassery Biryani. Unlike the long-grained Basmati biryanis of the north, this version uses a short, fragrant local rice called Kaima. The spices are subtle—cardamom, mace, fennel seeds—and the meat is cooked slow in a sealed pot (Savala), ensuring it remains tender and heavily infused with flavor. Pair it with a slice of sweet, dark-red Kozhikodan Halwa, made with flour, coconut oil, and cardamom.',
        quote: 'A bite of Thalassery Biryani is like reading a chapter of Kerala\'s maritime history—fragrant, layered, and rich with cross-cultural exchange.'
      },
      {
        title: 'Munnar: Cardamom and Pepper Estates',
        content: 'Leaving the coast, we drive up into the Western Ghats to Munnar. The cool mountain air here is thick with the scent of green cardamom, cloves, and fresh tea. We visit a family-owned spice estate where green cardamom pods are harvested by hand. In Munnar\'s kitchens, these spices find their way into hearty, warming dishes like Pepper-crusted Wild Duck and Cardamom-infused Coconut Toddy Chicken. The spice is not just heat; it is an aromatic experience that warms the body against the mountain chill.',
        highlightCard: {
          title: 'Essential Spices of the Coast',
          icon: 'spice',
          items: [
            { title: 'Black Pepper', desc: 'The "Black Gold" that drove global empires. It offers a clean, aromatic heat.' },
            { title: 'Green Cardamom', desc: 'Grown in high-altitude forests, it gives a sweet, cooling, citrusy undertone.' },
            { title: 'Nutmeg & Mace', desc: 'Derived from the same fruit, they provide warm, nutty, and sweet-spicy notes.' }
          ]
        }
      },
      {
        title: 'Fort Kochi: Syncretic Flavors of Empires',
        content: 'In the colonial enclave of Fort Kochi, the food reflects the city\'s multicultural history. Here we taste Fish Molee, a delicate fish stew prepared with coconut milk, turmeric, curry leaves, and green chilies. The dish was famously created to soften the spicy local curries for Portuguese settlers who could not handle the heat. We also explore Jewish-style preparations of ginger and tamarind sauces at local homestays. The balance of sweet coconut milk and sharp ginger is a masterclass in culinary harmony.'
      },
      {
        title: 'Alleppey: Toddy Shop Gastronomy',
        content: 'Venturing into the backwater shacks, we experience Toddy Shop Gastronomy. Toddy shops (local taverns selling fermented coconut sap) are famous for serving some of the spiciest and most flavorful dishes in the state. We try Karimeen Pollichathu—Pearl Spot fish coated in a paste of fiery red chilies, shallots, garlic, and curry leaves, wrapped in a fresh banana leaf and pan-seared. It is eaten with steamed tapioca (Kappa) and a cup of fresh, sweet toddy.'
      }
    ],
    conclusion: 'From the northern ports of Malabar to the backwaters of the south, this food journey is a testament to how geography, spice migrations, and local heritage can blend. To eat in Kerala is to participate in an ancient ritual of flavor—one that has been perfected over thousands of years.'
  },
  'first-kerala-houseboat-experience-guide': {
    title: 'Planning Your First Kerala Houseboat Experience: Everything You Need to Know',
    image: 'https://images.unsplash.com/photo-1593693411515-c202e974fe05?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'A complete practical guide to booking a traditional wooden houseboat (Kettuvallam), choosing routes, and sailing through the palm-fringed backwaters.',
    accentColor: 'teal',
    accentTheme: {
      badge: 'purple',
      glow: 'shadow-glow-ocean',
      border: 'border-teal-500/20 dark:border-teal-500/10',
      bg: 'bg-teal-50/50 dark:bg-teal-950/20',
      text: 'text-teal-600 dark:text-teal-400'
    },
    quickFacts: [
      { label: 'Vessel Style', value: 'Traditional Kettuvallam', icon: Compass },
      { label: 'Cruising Route', value: 'Alleppey or Kumarakom', icon: Map },
      { label: 'Best Months', value: 'September to March', icon: Calendar },
      { label: 'Inclusions', value: 'Private Chef & Full Board', icon: Clock }
    ],
    localTip: {
      guide: 'Joseph Fernandez',
      role: 'Houseboat Captain, Kumarakom',
      text: 'A houseboat is a slow journey. Don\'t rush to cover long distances. The best moments are when we anchor near a small village in the afternoon, and you can watch the sunset over the coconut trees. Let the water set your pace.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80'
    },
    highlights: [
      'Learn the history of the nail-free Kettuvallam construction.',
      'Choose between the lively Alleppey canals and the quiet Kumarakom lake.',
      'Enjoy fresh meals prepared by your personal onboard chef.',
      'Wake up to the serene morning mist on the backwaters.'
    ],
    sections: [
      {
        title: 'The Anatomy of a Kettuvallam: A Nail-Free Marvel',
        content: 'Long before they were floating hotel suites, kettuvallams were cargo boats used to transport rice and spices across the backwaters. The name translates to "tied boat" (kettu means to tie, and vallam means boat). Remarkably, these massive structures are constructed without a single nail. Planks of jackwood are joined together using coir ropes made of coconut fiber and sealed with a caustic black resin boiled from cashew nut shells. Today, they are retrofitted with air-conditioned bedrooms, modern plumbing, observation decks, and fully equipped kitchens. The curved thatched roofs, woven from bamboo and coconut leaves, provide natural insulation from the tropical sun.',
        quote: 'To sleep inside a Kettuvallam is to sleep inside an engineering masterpiece—held together not by steel and nails, but by coconut fibers and ancient ingenuity.'
      },
      {
        title: 'Choosing Your Path: Alleppey vs. Kumarakom',
        content: 'One of the most important decisions you will make is choosing your cruising route. The Alleppey (Alappuzha) Circuit is the most active and popular route. The canals here are narrow, allowing you to float close to the banks. You\'ll see locals washing clothes, children paddling to school in tiny canoes, and duck farmers herding thousands of ducks. It is a lively, culturally rich route. The Kumarakom Circuit, on the other hand, sits on the eastern shore of Vembanad Lake. The waterways here are wider and quieter. It is ideal for birdwatchers, as it stops near the Kumarakom Bird Sanctuary, and for travelers seeking luxury, peace, and uninterrupted sunset views over the open lake.',
        highlightCard: {
          title: 'Alleppey vs. Kumarakom Comparison',
          icon: 'boat',
          items: [
            { title: 'Alleppey Canal Circuit', desc: 'Narrow canals, rich cultural interaction, bustling houseboat traffic, local village life.' },
            { title: 'Kumarakom Open Waters', desc: 'Open waters of Vembanad lake, quiet luxury resorts, excellent bird watching, peaceful.' }
          ]
        }
      },
      {
        title: 'The Culinary Voyage: Feast of the Backwaters',
        content: 'Your houseboat booking includes a private chef who prepares all your meals fresh in the galley. The culinary highlight is the Karimeen Pollichathu—Pearl Spot fish marinated in a rich paste of shallots, ginger, garlic, chili, and curry leaves, wrapped in a banana leaf, and pan-fried to perfection. Accompanied by red Matta rice, vegetable Thoran (stir-fried veggies with grated coconut), and fresh banana fritters (Pazham Fori) for afternoon tea, the food alone is worth the trip. The chef can customize the spice levels to your preference, and can even cook fresh fish purchased from local fishermen along the canal banks.'
      }
    ],
    conclusion: 'A night on a Kerala houseboat is a journey into a slower, gentler era. As the boat engines quiet down at sundown and the houseboats anchor near a sleepy village bank, the water reflects the orange sky, and the only sounds are the chirping of crickets and the soft lapping of the canal. It is an unforgettable experience that captures the true soul of Kerala\'s backwaters.'
  }
};

// ── INITIAL MOCK COMMENTS DATA ──
interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  text: string;
  likes: number;
  hasLiked?: boolean;
}

const INITIAL_COMMENTS: Record<string, Comment[]> = {
  '10-hidden-gems-kerala': [
    {
      id: 1,
      author: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80',
      date: '2 days ago',
      text: 'Nelliyampathy is absolutely magical! We climbed the Seetharkundu trail last December and the fog was unreal. Great write-up, Arjun.',
      likes: 12
    },
    {
      id: 2,
      author: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&h=80&q=80',
      date: '5 days ago',
      text: 'Is Gavi safe for solo female travelers? Planning to do the night safari and want to make sure of the logistics.',
      likes: 8
    }
  ],
  'ultimate-kerala-monsoon-guide': [
    {
      id: 1,
      author: 'Marcus Aurelius',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
      date: '3 days ago',
      text: 'I did an Ayurveda retreat in Wayanad during July and it changed my life. The rain adds such a peaceful backdrop to the therapies.',
      likes: 15
    },
    {
      id: 2,
      author: 'Rohit Sen',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80',
      date: '1 week ago',
      text: 'Athirappilly during July is pure wild power. Bring a good raincoat though, you will get drenched within seconds!',
      likes: 24
    }
  ],
  'food-lovers-road-trip-spice-coast': [
    {
      id: 1,
      author: 'Vikram Seth',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=80&h=80&q=80',
      date: '1 day ago',
      text: 'That Thalassery Biryani in Kozhikode is the stuff of dreams. Kaima rice makes all the difference. Nice guide!',
      likes: 19
    },
    {
      id: 2,
      author: 'Clara Dupont',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
      date: '4 days ago',
      text: 'Where was that toddy shop in Alleppey located? Need to add that to my itinerary.',
      likes: 5
    }
  ],
  'first-kerala-houseboat-experience-guide': [
    {
      id: 1,
      author: 'John & Emily',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=80&h=80&q=80',
      date: '6 days ago',
      text: 'We booked the Kumarakom route for our honeymoon last year. So glad we did, it was so quiet and peaceful compared to Alleppey.',
      likes: 14
    },
    {
      id: 2,
      author: 'Meera Nair',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&h=80&q=80',
      date: '2 weeks ago',
      text: 'The food on houseboats is seriously under-rated. The pearl spot fish fry was the best meal of our entire trip!',
      likes: 31
    }
  ]
};

// ── BLOG LIST VIEW COMPONENT ──
export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Sync document metadata
  useEffect(() => {
    document.title = 'Kerala Travel Journal | Stories, Guides & Local Insights';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore fully written articles on Kerala backwaters, spice tours, and hidden trails. Get professional tips, seasonal advice, and cultural stories.'
      );
    }
  }, []);

  const categories = ['All', 'Hidden Trails', 'Spice Tours', 'Backwaters', 'Monsoon'];

  // Filter posts based on Category tab & Search query
  const filteredPosts = blogPosts.filter((post) => {
    let matchesCategory = true;
    if (selectedFilter === 'Hidden Trails') {
      matchesCategory = post.slug === '10-hidden-gems-kerala';
    } else if (selectedFilter === 'Spice Tours') {
      matchesCategory = post.slug === 'food-lovers-road-trip-spice-coast';
    } else if (selectedFilter === 'Backwaters') {
      matchesCategory = post.slug === 'first-kerala-houseboat-experience-guide';
    } else if (selectedFilter === 'Monsoon') {
      matchesCategory = post.slug === 'ultimate-kerala-monsoon-guide';
    }

    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Featured post is the first element when all posts are displayed
  const featuredPost =
    selectedFilter === 'All' && searchQuery === '' && filteredPosts.length > 0
      ? filteredPosts[0]
      : null;

  const displayPosts = featuredPost
    ? filteredPosts.filter((p) => p.id !== featuredPost.id)
    : filteredPosts;

  return (
    <div className="relative min-h-screen py-16 bg-sand-warm dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      {/* Decorative organic glassmorphic background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-emerald-300/10 dark:bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-amber-200/10 dark:bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-sky-200/10 dark:bg-sky-500/5 blur-3xl pointer-events-none" />

      <div className="container px-4 mx-auto max-w-6xl relative z-10">
        {/* Header section */}
        <SectionHeader
          badge="Travel Journal"
          title="Chronicles of Kerala"
          description="Immerse yourself in comprehensive narratives, local trade secrets, and hidden trails written by our expert editorial explorers."
          className="mb-12"
        />

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 p-4 rounded-3xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/40 dark:border-white/5 shadow-glass">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-emerald-600 rounded-full shadow-md"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stories & authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-2.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 text-sm text-gray-800 dark:text-gray-100 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="mb-12 group rounded-[2.5rem] overflow-hidden bg-white/70 dark:bg-gray-900/70 border border-white/50 dark:border-white/5 backdrop-blur-xl shadow-glass hover:shadow-elevated transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Image half */}
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[480px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${RICH_ARTICLES[featuredPost.slug]?.image || featuredPost.image})`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 lg:from-transparent via-black/40 lg:via-transparent to-transparent" />
                <div className="absolute top-6 left-6">
                  <Badge variant="emerald" size="md" className="backdrop-blur-md bg-emerald-600/90 text-white shadow-lg">
                    ★ Featured Story
                  </Badge>
                </div>
              </div>

              {/* Text half */}
              <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <span>{featuredPost.category}</span>
                    <span>·</span>
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <h3 className="font-serif text-3xl lg:text-4xl font-extrabold leading-tight text-gray-950 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h3>

                  <p className="text-gray-650 dark:text-gray-350 text-base leading-relaxed mb-6 font-light">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800/80 pt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-700 dark:text-emerald-300">
                      {featuredPost.author[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{featuredPost.author}</div>
                      <div className="text-xs text-gray-400">{featuredPost.date}</div>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-600/20 dark:shadow-emerald-950/20 transition-all hover:translate-x-1 cursor-pointer"
                  >
                    Read Narrative <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <AnimatePresence mode="popLayout">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-white/40 dark:bg-gray-900/40 border border-dashed border-gray-200 dark:border-gray-800 rounded-3xl"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Stories Found</h3>
              <p className="text-gray-500 max-w-sm mx-auto text-sm">
                We couldn't find any articles matching "{searchQuery}". Try selecting another category or check your spelling.
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {displayPosts.map((post, index) => {
                const richInfo = RICH_ARTICLES[post.slug];
                const cardImage = richInfo?.image || post.image;
                const theme = richInfo?.accentTheme || {
                  badge: 'emerald',
                  glow: 'shadow-glow-emerald',
                  border: 'border-emerald-500/20 dark:border-emerald-500/10',
                  bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
                  text: 'text-emerald-600 dark:text-emerald-400'
                };

                return (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 17, delay: index * 0.05 }}
                    whileHover={{ y: -6 }}
                    className={`group flex flex-col justify-between rounded-[2rem] overflow-hidden bg-white/70 dark:bg-gray-900/70 border border-white/50 dark:border-white/5 backdrop-blur-xl shadow-glass hover:shadow-elevated transition-all duration-300`}
                  >
                    {/* Cover image area */}
                    <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${cardImage})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge variant={theme.badge as any} size="sm" className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 font-bold">
                          {post.category}
                        </Badge>
                      </div>
                    </Link>

                    {/* Card Body */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Meta */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readTime}</span>
                          <span>·</span>
                          <Calendar className="w-3.5 h-3.5 ml-1" />
                          <span>{post.date}</span>
                        </div>

                        {/* Title */}
                        <h4 className="font-serif text-xl font-bold leading-snug text-gray-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h4>

                        {/* Excerpt */}
                        <p className="text-sm text-gray-500 dark:text-gray-455 leading-relaxed mb-6 line-clamp-3 font-light">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="border-t border-gray-100 dark:border-gray-800/80 pt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center font-bold text-xs text-emerald-700 dark:text-emerald-400">
                            {post.author[0]}
                          </div>
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{post.author}</span>
                        </div>

                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline"
                        >
                          Read <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── BLOG DETAIL COMPONENT ──
export function BlogPostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const richPost = slug ? RICH_ARTICLES[slug] : null;

  // Progress bar tracking
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stateful interactions
  const [likesCount, setLikesCount] = useState(142);
  const [hasLiked, setHasLiked] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  // Stateful Comments
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  // Sync document metadata
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Kerala Chronicles`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', post.excerpt);
      }
    }
  }, [post]);

  // Load comments
  useEffect(() => {
    if (slug && INITIAL_COMMENTS[slug]) {
      setComments(INITIAL_COMMENTS[slug]);
    } else {
      setComments([]);
    }
  }, [slug]);

  if (!post || !richPost) {
    return (
      <div className="container py-24 text-center min-h-[70vh] flex flex-col items-center justify-center bg-sand-warm dark:bg-gray-950">
        <h2 className="font-serif text-3xl font-bold mb-3 text-gray-900 dark:text-white">Article Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-sm">The requested journal article could not be located in our archives.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-600/20 transition-all hover:scale-102"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>
      </div>
    );
  }

  // Floating Heart Animation handler
  const handleLike = () => {
    if (!hasLiked) {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikesCount((prev) => prev - 1);
      setHasLiked(false);
    }

    // Add heart animation entity
    const newHeart = {
      id: Date.now() + Math.random(),
      x: Math.random() * 40 - 20 // Random offset between -20px and 20px
    };
    setHearts((prev) => [...prev, newHeart]);
  };

  // Copy share link
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

  // Handle new comment submission
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: commentName.trim(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(commentName)}&background=random`,
      date: 'Just now',
      text: commentText.trim(),
      likes: 0
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentName('');
    setCommentText('');
  };

  const handleLikeComment = (commentId: number) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            likes: c.hasLiked ? c.likes - 1 : c.likes + 1,
            hasLiked: !c.hasLiked
          };
        }
        return c;
      })
    );
  };

  const theme = richPost.accentTheme;

  return (
    <div className="relative min-h-screen pb-24 bg-sand-warm dark:bg-gray-950 transition-colors duration-500">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-gray-200 dark:bg-gray-900 z-50">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-500 transition-all duration-75"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Slide down Toast for Copied URL */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 16 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-gray-900/90 dark:bg-white/90 text-white dark:text-gray-900 backdrop-blur-md shadow-2xl border border-white/10 dark:border-black/5 text-sm font-semibold"
          >
            <Check className="w-4 h-4 text-emerald-500" /> Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-10 w-96 h-96 rounded-full bg-emerald-500/5 dark:bg-emerald-500/2.5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] rounded-full bg-amber-400/5 dark:bg-amber-400/2 blur-3xl pointer-events-none" />

      {/* Top Banner Image with Overlay details */}
      <div className="w-full relative h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${richPost.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sand-warm via-sand-warm/30 dark:from-gray-950 dark:via-gray-950/30 to-black/40" />

        {/* Back Link Overlay */}
        <div className="absolute top-8 left-4 sm:left-8 container mx-auto max-w-6xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/20 dark:border-white/10 text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-md transition-all hover:-translate-x-0.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container px-4 mx-auto max-w-6xl -mt-24 sm:-mt-32 md:-mt-40 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ARTICLE CONTENT BODY (Left Col) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Box (Glassmorphic) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-10 rounded-[2.5rem] bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/50 dark:border-white/5 shadow-glass"
            >
              {/* Category & Read Time */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <Badge variant={theme.badge as any} size="sm" className="font-bold uppercase tracking-wider">
                  {post.category}
                </Badge>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </span>
                <span className="text-gray-300 dark:text-gray-705">·</span>
                <span className="text-xs text-gray-400 dark:text-gray-505 font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" /> {post.date}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-gray-950 dark:text-white mb-6">
                {post.title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-650 dark:text-gray-300 leading-relaxed font-light mb-8 border-l-2 border-emerald-500/50 pl-4">
                {richPost.subtitle}
              </p>

              {/* Author Info + Action Bar */}
              <div className="border-t border-gray-100 dark:border-gray-800/80 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                
                {/* Author Avatar Card */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center font-bold text-lg text-emerald-700 dark:text-emerald-400 border border-emerald-500/25">
                    {post.author[0]}
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-1.5">
                      {post.author}
                      <Award className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="text-xs text-gray-400">Verified Travel Journalist</div>
                  </div>
                </div>

                {/* Floating pill interaction items */}
                <div className="flex items-center gap-2 self-start sm:self-auto bg-gray-50 dark:bg-gray-950/50 p-1.5 rounded-full border border-gray-200/50 dark:border-gray-850">
                  
                  {/* Like Button */}
                  <button
                    onClick={handleLike}
                    className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      hasLiked
                        ? 'bg-red-50 dark:bg-red-950/20 text-red-500 border border-red-500/20'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${hasLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{likesCount}</span>

                    {/* Flying hearts micro-interaction */}
                    <AnimatePresence>
                      {hearts.map((h) => (
                        <motion.span
                          key={h.id}
                          initial={{ opacity: 1, y: 0, scale: 1 }}
                          animate={{ opacity: 0, y: -45, scale: 1.4 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className="absolute text-red-500 pointer-events-none"
                          style={{ left: `calc(50% + ${h.x}px)` }}
                        >
                          ❤️
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </button>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => setIsBookmarked((prev) => !prev)}
                    className={`p-2 rounded-full transition-all cursor-pointer ${
                      isBookmarked
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                </div>
              </div>
            </motion.div>

            {/* Article Prose Content (Semantic HTML & Large Typography Scale) */}
            <article className="p-6 sm:p-10 rounded-[2.5rem] bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/50 dark:border-white/5 shadow-glass prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-250 leading-relaxed font-sans text-base sm:text-lg space-y-8 animate-fadeIn">
              
              {/* Introduction with drop cap */}
              <div className="relative">
                <span className="float-left text-7xl font-serif font-black text-emerald-600 dark:text-emerald-400 mr-3 mt-1 leading-none">
                  {richPost.sections[0]?.content[0] || 'K'}
                </span>
                <p className="font-light text-gray-905 dark:text-white text-lg sm:text-xl leading-relaxed mb-6">
                  {richPost.sections[0]?.content.substring(1)}
                </p>
              </div>

              {/* Render subsections dynamically */}
              {richPost.sections.slice(1).map((section, sIndex) => (
                <div key={sIndex} className="space-y-4 pt-4">
                  {section.title && (
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-8 mb-4">
                      {section.title}
                    </h3>
                  )}

                  <p className="leading-relaxed text-gray-700 dark:text-gray-300 font-light">
                    {section.content}
                  </p>

                  {/* Elegant quotes */}
                  {section.quote && (
                    <blockquote className="relative p-6 my-6 border-l-4 border-amber-500 bg-amber-500/5 dark:bg-amber-500/2.5 rounded-r-2xl font-serif text-lg md:text-xl italic text-teal-850 dark:text-teal-400 leading-relaxed">
                      "{section.quote}"
                    </blockquote>
                  )}

                  {/* Highlights card (e.g. trek details, spice matrix, houseboat compare) */}
                  {section.highlightCard && (
                    <div className="my-8 p-6 rounded-3xl bg-gray-50/50 dark:bg-gray-950/40 border border-gray-150 dark:border-gray-850">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        <h4 className="font-serif text-lg font-bold text-gray-900 dark:text-white">
                          {section.highlightCard.title}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {section.highlightCard.items.map((item, iKey) => (
                          <div key={iKey} className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-805 shadow-sm">
                            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> {item.title}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Conclusion paragraph */}
              <div className="pt-8 border-t border-gray-100 dark:border-gray-800/80">
                <h4 className="font-serif text-xl font-extrabold text-gray-900 dark:text-white mb-3">Reflections</h4>
                <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                  {richPost.conclusion}
                </p>
              </div>
            </article>

            {/* INTERACTIVE COMMENTS SECTION */}
            <div className="p-6 sm:p-10 rounded-[2.5rem] bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/50 dark:border-white/5 shadow-glass">
              
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-gray-800/80">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">
                    Reader Discussions ({comments.length})
                  </h3>
                </div>
              </div>

              {/* New Comment Submission Form */}
              <form onSubmit={handleAddComment} className="mb-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Name..."
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 text-sm text-gray-850 dark:text-gray-100 transition-all shadow-inner"
                  />
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your thoughts, experiences, or ask questions about this guide..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-955/55 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 text-sm text-gray-850 dark:text-gray-100 transition-all shadow-inner resize-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-505 text-white text-sm font-semibold shadow-lg shadow-emerald-600/25 dark:shadow-emerald-950/25 transition-all hover:scale-102 cursor-pointer"
                >
                  Post Comment <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Render Comments List */}
              <div className="space-y-6">
                <AnimatePresence initial={false}>
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-5 rounded-2xl bg-gray-50/50 dark:bg-gray-950/40 border border-gray-150 dark:border-gray-850/60"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={comment.avatar}
                            alt={comment.author}
                            className="w-8 h-8 rounded-full border border-white dark:border-gray-800"
                          />
                          <div>
                            <h5 className="text-xs font-bold text-gray-900 dark:text-white">{comment.author}</h5>
                            <span className="text-[10px] text-gray-400">{comment.date}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleLikeComment(comment.id)}
                          className={`flex items-center gap-1 text-[10px] font-bold py-1 px-2.5 rounded-full transition-all cursor-pointer ${
                            comment.hasLiked
                              ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{comment.likes}</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-650 dark:text-gray-350 leading-relaxed font-light">
                        {comment.text}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

            </div>

          </div>

          {/* SIDEBAR WIDGETS (Right Col) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quick Facts Card (Glassmorphic) */}
            <div className="p-6 rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/50 dark:border-white/5 shadow-glass">
              <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Quick Itinerary Facts
              </h3>

              <div className="space-y-4">
                {richPost.quickFacts.map((fact, index) => {
                  const FactIcon = fact.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50/50 dark:bg-gray-950/30 border border-gray-150 dark:border-gray-850">
                      <div className="p-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        <FactIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{fact.label}</div>
                        <div className="text-sm font-bold text-gray-850 dark:text-gray-250">{fact.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Local Ranger / Guide Quote Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-900 to-emerald-950 dark:from-teal-950 dark:to-gray-950 text-white shadow-elevated border border-teal-500/25">
              <h3 className="font-serif text-lg font-bold text-emerald-350 dark:text-emerald-400 mb-5 flex items-center gap-2">
                <Globe className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                Local Insider Tip
              </h3>

              <div className="space-y-4">
                {/* Bubble speech */}
                <div className="relative p-4 rounded-2xl bg-white/10 dark:bg-black/25 text-xs sm:text-sm italic leading-relaxed font-light text-gray-200">
                  "{richPost.localTip.text}"
                </div>

                {/* Guide author */}
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={richPost.localTip.avatar}
                    alt={richPost.localTip.guide}
                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{richPost.localTip.guide}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{richPost.localTip.role}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Essential Highlights Checklist */}
            <div className="p-6 rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/50 dark:border-white/5 shadow-glass">
              <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-white mb-4">
                Key Experiences Included
              </h3>
              <ul className="space-y-3">
                {richPost.highlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-650 dark:text-gray-350 font-light">
                    <span className="mt-1 p-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Read Next / Related Articles */}
            <div className="p-6 rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/50 dark:border-white/5 shadow-glass">
              <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-white mb-5">
                Continue Reading
              </h3>

              <div className="space-y-4">
                {blogPosts
                  .filter((p) => p.slug !== slug)
                  .slice(0, 2)
                  .map((relPost) => {
                    const relInfo = RICH_ARTICLES[relPost.slug];
                    const relImage = relInfo?.image || relPost.image;
                    return (
                      <Link
                        key={relPost.id}
                        to={`/blog/${relPost.slug}`}
                        className="group flex gap-3 p-2 rounded-2xl hover:bg-gray-50/50 dark:hover:bg-gray-950/50 border border-transparent hover:border-gray-150 dark:hover:border-gray-850 transition-all duration-300"
                      >
                        <div
                          className="w-16 h-16 rounded-xl bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url(${relImage})` }}
                        />
                        <div className="flex flex-col justify-center min-w-0">
                          <h4 className="font-serif text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-emerald-650 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                            {relPost.title}
                          </h4>
                          <span className="text-[10px] text-gray-400 mt-1">{relPost.readTime}</span>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
