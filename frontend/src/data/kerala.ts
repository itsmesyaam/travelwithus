// ============================================================
// TravelWithUs AI Travel Platform — Kerala Tourism Data
// ============================================================

// ── Interfaces ──────────────────────────────────────────────

export interface Destination {
  id: string;
  name: string;
  slug: string;
  district: string;
  region: 'North Kerala' | 'Central Kerala' | 'South Kerala';
  description: string;
  shortDescription: string;
  image: string;
  coverImage: string;
  category:
    | 'backwaters'
    | 'hill-station'
    | 'beach'
    | 'wildlife'
    | 'heritage'
    | 'pilgrimage'
    | 'adventure'
    | 'waterfall';
  tags: string[];
  rating: number;
  reviews: number;
  bestTimeToVisit: string;
  temperature: { min: number; max: number };
  elevation?: string;
  nearestAirport: string;
  activities: string[];
  highlights: string[];
  coordinates: { lat: number; lng: number; details?: string };
  isHiddenGem: boolean;
  isTrending: boolean;
  priceRange: 'budget' | 'mid-range' | 'luxury';
  
  // Expanded Travel Consultant Parameters
  historicalSummary?: string;
  seasonalGuidelines?: string;
  packingSuggestions?: string[];
  transitDetails?: string;
}

export interface District {
  id: string;
  name: string;
  slug: string;
  description: string;
  destinationCount: number;
  image: string;

  // Expanded District Facts
  hq?: string;
  established?: string;
  area?: string;
  population?: string;
  historicalSummary?: string;
  keyFacts?: string[];
  nearestAirport?: string;
  coordinates?: { lat: number; lng: number };
}

export interface Season {
  id: string;
  name: string;
  slug: string;
  months: string;
  description: string;
  weather: string;
  temperature: string;
  activities: string[];
  destinations: string[];

  // Expanded Seasonal Guidelines
  packingSuggestions?: string[];
  travelGuidelines?: string[];
}

export interface Experience {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image: string;
  destinations: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  text: string;
  tripType: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

export interface PackingItem {
  item: string;
  category: 'Clothing' | 'Footwear' | 'Gear' | 'Personal Care' | 'Documents' | 'Medical';
  necessity: 'Essential' | 'Recommended' | 'Optional';
  notes: string;
}

export interface PackingRecommendation {
  region: 'North Kerala' | 'Central Kerala' | 'South Kerala' | 'All Kerala' | 'Highlands' | 'Coastline & Backwaters' | 'Wildlife & Forest';
  season: 'Monsoon' | 'Winter' | 'Summer' | 'All Seasons';
  items: PackingItem[];
  generalGuidelines: string[];
}

// ── Destinations (20) ───────────────────────────────────────

export const destinations: Destination[] = [
  {
    id: 'dest-001',
    name: 'Munnar',
    slug: 'munnar',
    district: 'Idukki',
    region: 'South Kerala',
    description:
      'Nestled at the confluence of three mountain streams — Mudrapuzha, Nallathanni, and Kundala — Munnar is the undisputed queen of Kerala\'s hill stations. Blanketed in emerald-green tea plantations that cascade over rolling hills, this former summer retreat of the British Raj sits at an elevation of roughly 1,600 m above sea level. Mornings unveil a sea of clouds drifting through valleys, while the cool mountain air carries the fragrance of cardamom and eucalyptus. Explore the Eravikulam National Park to spot the endangered Nilgiri tahr, trek to the summit of Anamudi — South India\'s highest peak — or simply lose yourself in the mist-kissed trails winding through spice gardens and colonial-era bungalows.',
    shortDescription:
      'Emerald tea gardens, misty peaks, and the romance of Kerala\'s most beloved hill station.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'hill-station',
    tags: ['tea plantations', 'trekking', 'hill station', 'honeymoon', 'nature'],
    rating: 4.7,
    reviews: 12840,
    bestTimeToVisit: 'September to May',
    temperature: { min: 10, max: 25 },
    elevation: '1,600 m',
    nearestAirport: 'Cochin International Airport (COK) - 110 km (approx. 3.5 to 4 hours drive via NH85. Roads are winding with beautiful valley views; hiring an experienced hill driver or pre-paid taxi from Ernakulam/COK is highly recommended).',
    activities: [
      'Tea plantation walks',
      'Trekking to Anamudi Peak',
      'Eravikulam National Park visit',
      'Mattupetty Dam boating',
      'Spice garden tours',
      'Mountain biking',
    ],
    highlights: [
      'Neelakurinji blooms once in 12 years',
      'Top Station panoramic views',
      'Lakkam Waterfalls',
      'Tea Museum',
    ],
    coordinates: { 
      lat: 10.0889, 
      lng: 77.0595,
      details: 'Confluence of Mudrapuzha, Nallathanni, and Kundala mountain streams, Devikulam Taluk, Idukki District.'
    },
    isHiddenGem: false,
    isTrending: true,
    priceRange: 'mid-range',
    historicalSummary: 'Historically a summer resort for the British Government in South India, Munnar\'s development began in the late 19th century with the arrival of European planters like John Daniel Munro. The territory was originally held by the Poonjar Royal Family and was leased to the Kannan Devan Hills Produce Company. Tea cultivation was introduced extensively, transforming the rugged forest landscape into the sprawling, well-manicured plantation hills visible today.',
    seasonalGuidelines: 'Monsoon (June-September) brings heavy rainfall, misty landscapes, and lower hotel rates, but outdoor trekking might be restricted due to slippery trails and landslides. Winter (October-February) is the peak season, offering clear skies, pleasant daytime weather (15°C to 22°C), and chilly nights (down to 10°C or lower), perfect for plantation walks and sightseeing. Summer (March-May) is mild and pleasant, ideal for escaping the plains\' heat.',
    packingSuggestions: [
      'Light woolens, cardigans, or fleece jackets for cool evenings (temperatures can drop to 10°C).',
      'Sturdy walking shoes or hiking boots with good grip for plantation trails.',
      'Umbrella or light raincoat (sudden mountain showers are common).',
      'Insect repellent and skin moisturizers.',
      'Motion sickness medication for navigating the winding hairpin turns.'
    ],
    transitDetails: 'Well-connected by KSRTC buses from Cochin, Madurai, and Kottayam. Driving requires caution during early morning mist and monsoon rains.'
  },
  {
    id: 'dest-002',
    name: 'Alleppey',
    slug: 'alleppey',
    district: 'Alappuzha',
    region: 'Central Kerala',
    description:
      'Often hailed as the "Venice of the East," Alleppey (Alappuzha) is a mesmerizing labyrinth of palm-fringed canals, tranquil lagoons, and shimmering lakes. A luxury houseboat cruise through the Vembanad backwaters is an experience that borders on the surreal — glide past paddy fields submerged in golden light, watch fishermen cast Chinese nets at dusk, and feast on freshly caught karimeen (pearl-spot fish) grilled in banana leaves. The annual Nehru Trophy Boat Race, held on Punnamada Lake, transforms the town into a carnival of colour, rhythm, and fierce competition between long snake boats crewed by over a hundred oarsmen.',
    shortDescription:
      'Cruise the legendary backwaters on a luxury houseboat through Kerala\'s watery wonderland.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'backwaters',
    tags: ['backwaters', 'houseboat', 'cruise', 'romantic', 'photography'],
    rating: 4.8,
    reviews: 15320,
    bestTimeToVisit: 'October to March',
    temperature: { min: 22, max: 33 },
    nearestAirport: 'Cochin International Airport (COK) - 75 km (approx. 2 hours drive via NH66. Easily accessible by pre-paid taxi, direct passenger train from Ernakulam, or KSRTC highway buses).',
    activities: [
      'Houseboat cruise',
      'Canoeing through narrow canals',
      'Nehru Trophy Boat Race (Aug)',
      'Village walks',
      'Toddy tasting',
      'Coir-making workshops',
    ],
    highlights: [
      'Vembanad Lake — Kerala\'s largest lake',
      'Punnamada Lake',
      'Alleppey Beach',
      'Krishnapuram Palace',
    ],
    coordinates: { 
      lat: 9.4981, 
      lng: 76.3388,
      details: 'Punnamada Lake and canal terminals area, Alappuzha Municipality.'
    },
    isHiddenGem: false,
    isTrending: true,
    priceRange: 'luxury',
    historicalSummary: 'Founded in the late 18th century by Raja Kesavadas, the visionary Prime Minister of the Kingdom of Travancore, Alappuzha was strategically developed as a port town to challenge Cochin\'s commercial dominance. It quickly became a bustling center of the coir industry and spice trade, earning the moniker \'Venice of the East\' from Lord Curzon due to its extensive system of canals built to transport goods.',
    seasonalGuidelines: 'October to March (Winter) is the best time for houseboats as the weather is pleasant and less humid. March to May (Summer) is hot and humid, but offers good off-season deals. June to September (Monsoon) brings heavy rains; while cruising is incredibly scenic with lush vegetation, heavy downpours can occasionally halt operations for safety.',
    packingSuggestions: [
      'Light, breathable cotton clothing to stay comfortable in the tropical humidity.',
      'Strong mosquito/insect repellent (essential for evening canal cruises).',
      'Sunglasses, sun block, and a wide-brimmed sun hat.',
      'Slippers or sandals that are easy to slip off when boarding houseboats.',
      'Personal power bank, as power fluctuations can happen on older houseboats.'
    ],
    transitDetails: 'Alleppey Railway Station is well connected to major cities in India. Water transport department operates cheap public ferry services to Kottayam and surrounding islands.'
  },
  {
    id: 'dest-003',
    name: 'Wayanad',
    slug: 'wayanad',
    district: 'Wayanad',
    region: 'North Kerala',
    description:
      'Perched on the Western Ghats at elevations between 700 and 2,100 m, Wayanad is a lush mosaic of ancient rainforests, spice plantations, tribal heritage, and mist-draped peaks. UNESCO has recognized the region as part of the Western Ghats biodiversity hotspot. The prehistoric Edakkal Caves bear petroglyphs dating back to the Neolithic era, while Banasura Sagar Dam — India\'s largest earth dam — offers kayaking amid emerald waters. Wildlife enthusiasts can track elephants and tigers through Wayanad Wildlife Sanctuary, a crucial corridor connecting Mudumalai and Nagarhole reserves.',
    shortDescription:
      'Ancient caves, misty peaks, and pristine rainforests in Kerala\'s green crown.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'hill-station',
    tags: ['rainforest', 'trekking', 'tribal culture', 'wildlife', 'caves'],
    rating: 4.6,
    reviews: 9870,
    bestTimeToVisit: 'October to May',
    temperature: { min: 15, max: 29 },
    elevation: '700–2,100 m',
    nearestAirport: 'Calicut International Airport (CCJ) - 100 km (approx. 3 hours drive via the scenic Thamarassery Churam mountain pass with 9 hairpin bends; drivers should be experienced with ghat driving).',
    activities: [
      'Edakkal Caves exploration',
      'Chembra Peak trek',
      'Bamboo rafting at Kuruva Island',
      'Banasura Sagar Dam kayaking',
      'Wildlife safari',
      'Spice plantation visit',
    ],
    highlights: [
      'Edakkal Caves petroglyphs',
      'Meenmutty Waterfalls',
      'Pookode Lake',
      'Wayanad Wildlife Sanctuary',
    ],
    coordinates: { 
      lat: 11.6854, 
      lng: 76.1320,
      details: 'High ranges of Western Ghats, northern region of Kerala bordering Karnataka.'
    },
    isHiddenGem: false,
    isTrending: true,
    priceRange: 'mid-range',
    historicalSummary: 'Wayanad\'s history is ancient, evidenced by the Neolithic carvings in Edakkal Caves. In medieval times, it was ruled by the Kutumbiyas and later the Western Ganga Dynasty, Hoysalas, and the Vijayanagara Empire. In the late 18th century, it was the site of the fierce guerrilla warfare led by Pazhassi Raja (the Lion of Kerala) against the British East India Company.',
    seasonalGuidelines: 'October to May is ideal for trekking, sightseeing, and exploring caves under pleasant weather. Monsoon (June-September) experiences heavy downpours, making the ghat roads challenging but turning the waterfalls and forests into lush, dramatic spectacles.',
    packingSuggestions: [
      'Sturdy trekking boots or trail shoes with good grip for cave climbs and peak treks.',
      'Moisture-wicking athletic wear and long pants to protect against leeches and brush.',
      'A light pullover or jacket for cool evening temperatures at higher altitudes.',
      'Leech socks and salt/antiseptic spray if trekking during or after rainy periods.',
      'Rain jacket or waterproof poncho.'
    ],
    transitDetails: 'Direct road access from Kozhikode, Mysore, and Ooty. KSRTC and Karnataka Sarige buses run frequently.'
  },
  {
    id: 'dest-004',
    name: 'Kovalam',
    slug: 'kovalam',
    district: 'Thiruvananthapuram',
    region: 'South Kerala',
    description:
      'Kovalam burst onto the global travel map in the 1930s when the Maharaja of Travancore built a beach resort, and it has never looked back. Three crescent-shaped beaches — Lighthouse Beach, Hawa Beach, and Samudra Beach — curve along the Arabian Sea coastline, flanked by coconut palms and dotted with Ayurvedic spas, seafood shacks, and surf schools. The iconic Vizhinjam Lighthouse atop the rocky promontory offers sweeping views of the coastline. Today, Kovalam remains one of India\'s premier beach destinations, seamlessly blending coastal charm with world-class Ayurveda and wellness retreats.',
    shortDescription:
      'Sun-kissed crescents, world-class Ayurveda, and the iconic lighthouse on Kerala\'s coast.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'beach',
    tags: ['beach', 'ayurveda', 'surfing', 'wellness', 'seafood'],
    rating: 4.5,
    reviews: 11200,
    bestTimeToVisit: 'September to March',
    temperature: { min: 24, max: 33 },
    nearestAirport: 'Trivandrum International Airport (TRV) - 15 km (approx. 20-30 minutes drive. Very convenient with direct flight connectivity across India and international gateways in the Middle East).',
    activities: [
      'Swimming & surfing',
      'Ayurvedic spa treatments',
      'Lighthouse visit',
      'Catamaran rides',
      'Yoga retreats',
      'Seafood dining',
    ],
    highlights: [
      'Lighthouse Beach',
      'Vizhinjam Marine Aquarium',
      'Hawa Beach',
      'Kovalam Art Gallery',
    ],
    coordinates: { 
      lat: 8.3988, 
      lng: 76.9782,
      details: 'Southern coast of Kerala, 13 km south of Thiruvananthapuram city center.'
    },
    isHiddenGem: false,
    isTrending: false,
    priceRange: 'mid-range',
    historicalSummary: 'Kovalam was a quiet fishing village until the Maharaja of Travancore, Sri Chithira Thirunal Balarama Varma, promoted it as a private beach resort in the 1930s. In the 1970s, it became a major node on the Hippie Trail, transforming it into a world-famous coastal destination with hotels, wellness clinics, and restaurants.',
    seasonalGuidelines: 'September to March offers excellent beach weather with calm seas and gentle breezes. Summer (March-May) is hot and humid with strong sun. Monsoon (June-August) sees rough seas, and swimming is strictly prohibited due to dangerous undercurrents.',
    packingSuggestions: [
      'Light linens and loose cotton garments suitable for warm coastal weather.',
      'Swimwear, rash guards, and flip-flops.',
      'High-SPF sunscreen (biodegradable preferred), sunglasses, and sun protective hats.',
      'Beach towels and dry bags to protect phones and electronics from sand and spray.',
      'Modest cover-ups for walking in the town off the beach.'
    ],
    transitDetails: 'Easily accessible via local taxis, auto-rickshaws, and city buses from Thiruvananthapuram Central Railway Station and city bus terminals.'
  },
  {
    id: 'dest-005',
    name: 'Varkala',
    slug: 'varkala',
    district: 'Thiruvananthapuram',
    region: 'South Kerala',
    description:
      'Varkala is where dramatic laterite cliffs plunge into the Arabian Sea, creating a coastal spectacle unlike any other in Kerala. The cliff-top promenade — lined with bohemian cafes, handicraft shops, and yoga shalas — overlooks Papanasam Beach, whose name translates to "destroyer of sins." According to legend, a dip in these sacred waters washes away a lifetime of transgressions. The 2,000-year-old Janardhana Swamy Temple, perched atop the cliff, adds a spiritual layer to the beach town\'s laid-back, free-spirited vibe. Natural mineral-water springs cascade down the cliff face onto the sand, drawing health-seekers from around the world.',
    shortDescription:
      'Dramatic cliffs, sacred shores, and bohemian vibes on Kerala\'s most stunning coastline.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'beach',
    tags: ['cliffs', 'yoga', 'spiritual', 'beach', 'bohemian'],
    rating: 4.6,
    reviews: 8950,
    bestTimeToVisit: 'October to March',
    temperature: { min: 23, max: 33 },
    nearestAirport: 'Trivandrum International Airport (TRV) - 42 km (approx. 1 hour and 15 minutes drive via the coastal road or NH66. Varkala is also well connected by direct trains from Trivandrum and Kochi).',
    activities: [
      'Cliff-top walks',
      'Yoga and meditation retreats',
      'Paragliding',
      'Papanasam Beach swimming',
      'Temple visit',
      'Sunset watching',
    ],
    highlights: [
      'Varkala Cliff (North Cliff)',
      'Papanasam Beach',
      'Janardhana Swamy Temple',
      'Mineral water springs',
    ],
    coordinates: { 
      lat: 8.7333, 
      lng: 76.7167,
      details: 'North Cliff and Papanasam Beach sector, Varkala Municipality.'
    },
    isHiddenGem: false,
    isTrending: true,
    priceRange: 'budget',
    historicalSummary: 'Varkala has ancient spiritual roots. The Janardhana Swamy Temple is believed to be over 2,000 years old, serving as a prominent Vaishnavite shrine. Historically known as Balathirtham, it was a major pilgrimage site where rites for ancestors were performed on Papanasam Beach, which has always been famous for its mineral springs.',
    seasonalGuidelines: 'October to March is the peak season with pleasant breezes and active cliff-top cafes. April to May is very hot and humid. Monsoon (June-September) brings dramatic cliffside views and rough waves, transforming it into a quiet, meditative retreat.',
    packingSuggestions: [
      'Bohemian-style loose cotton garments, shorts, and light t-shirts.',
      'Slip-on shoes or sandals with good grip for walking down rocky cliff stairs.',
      'Yoga wear and a reusable water bottle.',
      'Sunscreen, swimsuit, and cash (as cliff ATMs can occasionally run out).',
      'Modest clothing (covering shoulders and knees) for entering the historical temple.'
    ],
    transitDetails: 'Varkala Sivagiri Railway Station is connected to major cities in Kerala and neighboring states. Auto-rickshaws are readily available for transport between the station and the cliff.'
  },
  {
    id: 'dest-006',
    name: 'Kochi',
    slug: 'kochi',
    district: 'Ernakulam',
    region: 'Central Kerala',
    description:
      'Kochi — the Queen of the Arabian Sea — is a vibrant tapestry woven from centuries of global trade. Portuguese churches, Dutch palaces, Jewish synagogues, and British colonial warehouses coexist alongside Chinese fishing nets that have graced Fort Kochi\'s waterfront since the 14th century. The Kochi-Muziris Biennale, India\'s largest contemporary art festival, transforms heritage warehouses and spice godowns into world-class galleries. Explore Jew Town\'s antique shops, marvel at the frescoes of Mattancherry Palace, or catch a Kathakali performance at the Kerala Kathakali Centre. Kochi is where history breathes and cultures collide in the most beautiful way.',
    shortDescription:
      'Where Chinese fishing nets meet colonial charm — Kerala\'s cosmopolitan cultural capital.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'heritage',
    tags: ['heritage', 'art', 'culture', 'history', 'food'],
    rating: 4.7,
    reviews: 14500,
    bestTimeToVisit: 'October to March',
    temperature: { min: 24, max: 34 },
    nearestAirport: 'Cochin International Airport (COK) - 30 km (approx. 1 hour drive to Fort Kochi. The airport is the world\'s first fully solar-powered airport, offering excellent global connectivity).',
    activities: [
      'Fort Kochi heritage walk',
      'Chinese fishing nets viewing',
      'Kathakali performance',
      'Jew Town exploration',
      'Harbour cruise',
      'Street art trails',
    ],
    highlights: [
      'Chinese Fishing Nets',
      'Mattancherry Palace',
      'Santa Cruz Cathedral Basilica',
      'Kochi-Muziris Biennale',
    ],
    coordinates: { 
      lat: 9.9312, 
      lng: 76.2673,
      details: 'Fort Kochi and Mattancherry historic sectors, Ernakulam District.'
    },
    isHiddenGem: false,
    isTrending: false,
    priceRange: 'mid-range',
    historicalSummary: 'An ancient spice trading port, Kochi rose to prominence after a massive flood in 1341 opened its harbor, replacing Cranganore (Muziris) as the region\'s main port. It became the first European colonial settlement in India when Portuguese explorer Pedro Álvares Cabral arrived in 1500, followed by Vasco da Gama. It was subsequently occupied by the Dutch and British, leaving a unique, layered architectural legacy.',
    seasonalGuidelines: 'October to March is highly pleasant, featuring cultural events like the Kochi-Muziris Biennale (biennial) and Cochin Carnival. Summer (March-May) is humid. Monsoon (June-September) is wet but showcases a fresh, clean side of the historic town.',
    packingSuggestions: [
      'Smart casual cotton wear, comfortable for walking and dining.',
      'Comfortable walking shoes or sneakers for heritage walking tours.',
      'Umbrella or light poncho for unexpected coastal showers.',
      'Sunglasses, sun block, and a small backpack.',
      'Modest clothing (shoulders and knees covered) for synagogues, churches, and temples.'
    ],
    transitDetails: 'Served by Ernakulam Junction (ERS) and Ernakulam Town (ERN) railway stations. Water Metro operates modern, air-conditioned catamarans between Vyttila, Kakkanad, Fort Kochi, and Bolgatty.'
  },
  {
    id: 'dest-007',
    name: 'Thekkady',
    slug: 'thekkady',
    district: 'Idukki',
    region: 'South Kerala',
    description:
      'Thekkady is the gateway to the Periyar Tiger Reserve, one of India\'s most celebrated wildlife sanctuaries. Set around the shimmering Periyar Lake — created by the Mullaperiyar Dam in 1895 — the reserve shelters tigers, elephants, gaur, sambar deer, and over 260 bird species within its 925 sq km of tropical evergreen and deciduous forest. A bamboo raft ride across the lake at dawn, when wild elephants come to the water\'s edge to drink, is a moment of pure magic. Beyond the wildlife, Thekkady\'s spice plantations — cardamom, pepper, cinnamon, and clove — perfume the mountain air and offer immersive walking tours.',
    shortDescription:
      'Wild elephants, tiger trails, and spice-scented forests at Periyar\'s doorstep.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'wildlife',
    tags: ['wildlife', 'tiger reserve', 'spice plantation', 'trekking', 'nature'],
    rating: 4.5,
    reviews: 10230,
    bestTimeToVisit: 'September to May',
    temperature: { min: 15, max: 30 },
    elevation: '900–1,800 m',
    nearestAirport: 'Madurai Airport (IXM) - 136 km (approx. 3.5 hours drive across state lines). Alternatively, Cochin International Airport (COK) is 145 km away (approx. 4 hours drive).',
    activities: [
      'Periyar Lake boat cruise',
      'Bamboo rafting',
      'Border hiking',
      'Spice plantation tour',
      'Elephant camp visit',
      'Tribal heritage trail',
    ],
    highlights: [
      'Periyar Tiger Reserve',
      'Periyar Lake',
      'Mangala Devi Temple',
      'Chellarkovil viewpoint',
    ],
    coordinates: { 
      lat: 9.6003, 
      lng: 77.1747,
      details: 'Periyar Lake and Kumily area, Western Ghats border, Idukki District.'
    },
    isHiddenGem: false,
    isTrending: false,
    priceRange: 'mid-range',
    historicalSummary: 'Thekkady and the Periyar region were historically dense, uninhabited forests ruled by local chieftains. In 1895, the construction of the Mullaperiyar Dam submerged low-lying forests, creating the Periyar Lake. The surrounding area was declared a sanctuary in 1934 by the Maharaja of Travancore to protect the fauna, eventually becoming a Tiger Reserve in 1978.',
    seasonalGuidelines: 'September to May is excellent for forest walks and boat cruises. Wildlife spotting peaks in dry summer months (March-May) as animals gather near the lake, though the weather is warm. Monsoon is beautiful for lush greenery but restricts jungle treks.',
    packingSuggestions: [
      'Earthy or neutral-colored clothing (khaki, green, brown) to blend in during safaris.',
      'Comfortable walking boots or sturdy shoes for forest hikes.',
      'Binoculars and a zoom camera lens for wildlife viewing.',
      'Insect repellent and lightweight long-sleeve shirts.',
      'Warm layers (light jacket or fleece) for chilly night safaris and early morning cruises.'
    ],
    transitDetails: 'Direct bus services from Kottayam, Cochin, and Madurai. The main hub is Kumily, 4 km from Thekkady lake entrance.'
  },
  {
    id: 'dest-008',
    name: 'Kumarakom',
    slug: 'kumarakom',
    district: 'Kottayam',
    region: 'Central Kerala',
    description:
      'Spread across a cluster of tiny islands on the eastern shore of Vembanad Lake, Kumarakom is a serene backwater paradise that moves at the tempo of gently lapping water. The Kumarakom Bird Sanctuary, set within the grounds of a former rubber plantation, is a haven for migratory birds — Siberian cranes, egrets, herons, and cormorants descend here between November and February. Luxury resorts with infinity pools overlooking the lake, sunrise kayaking through narrow canals, and candlelit dinners on floating decks make Kumarakom one of Kerala\'s most romantic escapes.',
    shortDescription:
      'Island serenity and birdwatching bliss on the shores of Vembanad Lake.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'backwaters',
    tags: ['backwaters', 'birdwatching', 'luxury', 'romantic', 'lake'],
    rating: 4.7,
    reviews: 8640,
    bestTimeToVisit: 'November to February',
    temperature: { min: 22, max: 33 },
    nearestAirport: 'Cochin International Airport (COK) - 85 km (approx. 2 hours drive via the Ernakulam-Vaikom road. Safe and well-maintained asphalt highways).',
    activities: [
      'Houseboat stay',
      'Kumarakom Bird Sanctuary visit',
      'Kayaking',
      'Village cycling',
      'Ayurvedic treatments',
      'Fishing',
    ],
    highlights: [
      'Kumarakom Bird Sanctuary',
      'Vembanad Lake',
      'Pathiramanal Island',
      'Bay Island Driftwood Museum',
    ],
    coordinates: { 
      lat: 9.5921, 
      lng: 76.4307,
      details: 'Eastern shore of Vembanad Lake, Kottayam District.'
    },
    isHiddenGem: false,
    isTrending: false,
    priceRange: 'luxury',
    historicalSummary: 'Kumarakom was originally a swampy wetland reclaimed for agriculture in the mid-19th century by Alfred George Baker, an English planner. He planted rubber and coconut trees and built the Baker Bungalow, which paved the way for the region\'s transformation into a world-renowned resort destination.',
    seasonalGuidelines: 'November to February is the peak birdwatching season, coinciding with the arrival of migratory birds. Summer (March-May) is warm. Monsoon (June-September) offers quiet lake views and is the best time to experience traditional Ayurvedic rejuvenation.',
    packingSuggestions: [
      'Lightweight cottons and linens in light colors.',
      'Strong mosquito/insect repellent, particularly for sunset and evening hours.',
      'Sun block, sunglasses, and hat.',
      'Camera with a good zoom lens (minimum 300mm for bird photography) and binoculars.',
      'Slip-on sandals or canvas shoes for resort walks and boating.'
    ],
    transitDetails: 'Kottayam is the nearest railway station (15 km). Taxis and auto-rickshaws are easily available at the station. Local ferry services connect to Alleppey.'
  },
  {
    id: 'dest-009',
    name: 'Athirappilly',
    slug: 'athirappilly',
    district: 'Thrissur',
    region: 'Central Kerala',
    description:
      'Athirappilly Falls, often called the "Niagara of India," is Kerala\'s largest and most spectacular waterfall. The Chalakudy River plunges 80 feet through dense tropical rainforest, creating a thundering curtain of white water that has served as a backdrop for countless Bollywood and South Indian films. The surrounding Athirappilly-Vazhachal forests are part of the Sholayar range and harbour the endangered great hornbill, lion-tailed macaque, and Cochin forest cane turtle. A trek to the base of the falls through the misty jungle trail is an unforgettable sensory experience.',
    shortDescription:
      'Kerala\'s mightiest waterfall — a thundering spectacle in pristine tropical rainforest.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'waterfall',
    tags: ['waterfall', 'rainforest', 'photography', 'nature', 'trekking'],
    rating: 4.6,
    reviews: 7820,
    bestTimeToVisit: 'June to October (monsoon flow) / September to January (safe access)',
    temperature: { min: 22, max: 32 },
    nearestAirport: 'Cochin International Airport (COK) - 55 km (approx. 1 hour and 15 minutes drive. A very smooth ride through rubber plantations and rural roads).',
    activities: [
      'Waterfall viewing',
      'Jungle trekking',
      'Vazhachal Falls visit',
      'Charpa Falls visit',
      'Birdwatching',
      'Photography',
    ],
    highlights: [
      'Athirappilly Falls (80 ft)',
      'Vazhachal Falls',
      'Great Hornbill sightings',
      'Sholayar Dam',
    ],
    coordinates: { 
      lat: 10.2855, 
      lng: 76.5700,
      details: 'Chalakudy River basin, Sholayar Forest Range, Thrissur District.'
    },
    isHiddenGem: false,
    isTrending: true,
    priceRange: 'budget',
    historicalSummary: 'Historically a wild, remote forest corridor of the Sholayar range, the area around Athirappilly was occupied by indigenous tribal communities (Kadar). In modern times, it became a focal point of conservation debates in the late 20th century, where local activists successfully blocked a proposed hydroelectric project that would have destroyed the ecosystem.',
    seasonalGuidelines: 'June to October (Monsoon) is the most dramatic time when the waterfall is at its thunderous best, though paths near the base may be closed. September to January is the safest window for exploring the base and swimming in designated zones.',
    packingSuggestions: [
      'Waterproof jacket, poncho, or umbrella to protect against heavy spray.',
      'Non-slip footwear, water shoes, or trekking sandals with excellent grip.',
      'A change of dry clothes and towel (stored in a waterproof bag).',
      'Waterproof cover or dry bag for cameras, phones, and electronics.',
      'Insect repellent for the forest trails.'
    ],
    transitDetails: 'Well-connected by road from Chalakudy (30 km), which is the nearest railway station. Local buses and taxis run frequently.'
  },
  {
    id: 'dest-010',
    name: 'Bekal',
    slug: 'bekal',
    district: 'Kasaragod',
    region: 'North Kerala',
    description:
      'Bekal Fort, the largest and best-preserved fort in Kerala, rises majestically above the Arabian Sea in the northernmost district of Kasaragod. Built in 1650 CE, this keyhole-shaped laterite stronghold offers panoramic views of pristine, uncrowded beaches curving towards the horizon. Bekal is the jewel of North Kerala\'s undiscovered coast — a region where coconut groves meet the sea, Theyyam rituals light up temple courtyards, and luxury resorts like Taj and Vivanta offer cliff-top infinity pools. It\'s the Kerala that most tourists never see.',
    shortDescription:
      'An ancient fort overlooking untouched beaches — North Kerala\'s best-kept secret.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'heritage',
    tags: ['fort', 'beach', 'heritage', 'offbeat', 'luxury'],
    rating: 4.4,
    reviews: 5430,
    bestTimeToVisit: 'October to March',
    temperature: { min: 23, max: 34 },
    nearestAirport: 'Mangalore International Airport (IXE) - 50 km (approx. 1.5 hours drive via NH66. Alternatively, Kannur International Airport is 110 km south).',
    activities: [
      'Bekal Fort exploration',
      'Beach walks',
      'Theyyam performance viewing',
      'Kayaking in Valiyaparamba backwaters',
      'Snorkeling',
      'Ayurveda retreats',
    ],
    highlights: [
      'Bekal Fort',
      'Bekal Beach',
      'Valiyaparamba Backwaters',
      'Chandragiri Fort',
    ],
    coordinates: { 
      lat: 12.3928, 
      lng: 75.0337,
      details: 'Arabian Sea headland, Kasaragod District, North Malabar.'
    },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'luxury',
    historicalSummary: 'Bekal Fort was constructed in 1650 CE by Shivappa Nayaka of the Keladi Nayaka dynasty. Strategically built on a sea-facing promontory to defend against maritime attacks, it later passed to Hyder Ali, Tipu Sultan, and eventually the British East India Company after Tipu\'s fall in 1799.',
    seasonalGuidelines: 'October to March is ideal for exploring the fort and walking along the beach. Summer is hot but offers breezy evenings. Monsoon (June-September) is extremely dramatic, with giant waves crashing against the fort\'s stone bastions.',
    packingSuggestions: [
      'Breathable linen or cotton clothing to handle the coastal humidity.',
      'Comfortable walking shoes or sneakers for traversing the vast, rocky fort complex.',
      'Sunglasses, sun block, and a wide-brimmed sun hat.',
      'Camera gear with protective filters to shield against sea-salt spray.',
      'Umbrella for shade during hot days or cover during rains.'
    ],
    transitDetails: 'Kasaragod (16 km) and Kanhangad (12 km) are the nearest railway stations. Pre-paid taxis and auto-rickshaws are readily available.'
  },
  {
    id: 'dest-011',
    name: 'Marari',
    slug: 'marari',
    district: 'Alappuzha',
    region: 'Central Kerala',
    description:
      'Marari Beach is the antithesis of commercialized coastal tourism. This long, unspoiled stretch of golden sand, fringed by swaying palms and dotted with traditional fishing villages, offers a glimpse into Kerala\'s authentic coastal life. Wake to the sight of fishermen hauling in their catch at dawn, stroll barefoot on sand as fine as silk, and retreat to eco-luxury resorts that blend seamlessly into the landscape. Mararikulam, the village behind the beach, maintains its centuries-old way of life — coir spinning, toddy tapping, and temple festivals — making it one of the most genuine beach experiences in India.',
    shortDescription:
      'Unspoiled golden sands and authentic fishing-village life on Kerala\'s quieter coast.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'beach',
    tags: ['beach', 'eco-tourism', 'village life', 'relaxation', 'offbeat'],
    rating: 4.5,
    reviews: 4200,
    bestTimeToVisit: 'October to March',
    temperature: { min: 23, max: 33 },
    nearestAirport: 'Cochin International Airport (COK) - 80 km (approx. 2 hours drive via NH66. Well-connected by rail via the nearby Alappuzha or Cherthala stations).',
    activities: [
      'Beach walks',
      'Village cycling tours',
      'Coir spinning workshops',
      'Fishing with locals',
      'Ayurvedic treatments',
      'Cooking classes',
    ],
    highlights: [
      'Pristine Marari Beach',
      'Mararikulam fishing village',
      'Butterfly Garden',
      'St. Andrew\'s Church',
    ],
    coordinates: { 
      lat: 9.5942, 
      lng: 76.2889,
      details: 'Mararikulam coastal village, Alappuzha District.'
    },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'luxury',
    historicalSummary: 'Marari derives its name from Mararikulam, a quiet fishing village. Historically, the local economy depended entirely on traditional coir making and sea fishing. In recent decades, it was developed as a model for sustainable, low-impact eco-tourism, preserving its traditional village layout.',
    seasonalGuidelines: 'October to March is perfect for beach activities, sunbathing, and outdoor dining. Summer is hot. Monsoon is quiet, wet, and perfect for resort-based wellness retreats.',
    packingSuggestions: [
      'Light beachwear, linens, and light cotton clothes.',
      'Swimwear, rash guard, and flip-flops.',
      'High-SPF sunscreen, sunglasses, and sun protective hat.',
      'Insect repellent for the evenings.',
      'A light book or e-reader for peaceful beachside relaxation.'
    ],
    transitDetails: 'Local trains stop at Mararikulam railway station. Taxis can easily be arranged from Cochin or Alleppey.'
  },
  {
    id: 'dest-012',
    name: 'Vagamon',
    slug: 'vagamon',
    district: 'Idukki',
    region: 'South Kerala',
    description:
      'Vagamon is a dreamy hill station where rolling meadows, pine forests, and tea gardens converge at an altitude of 1,100 m. Far less crowded than Munnar, this little-known retreat has been gaining popularity among adventure seekers for its excellent paragliding conditions — the Vagamon Paragliding Festival attracts pilots from around the world. The Kurisumala Ashram, a Cistercian monastery nestled among the hills, adds a contemplative dimension, while the chain of three hills — Thangal, Murugan, and Kurisumala — holds legends from Islamic, Hindu, and Christian traditions, reflecting Kerala\'s pluralistic spirit.',
    shortDescription:
      'Pine-clad meadows, paragliding thrills, and spiritual calm in Idukki\'s hidden hills.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'hill-station',
    tags: ['hill station', 'paragliding', 'meadows', 'offbeat', 'adventure'],
    rating: 4.4,
    reviews: 4560,
    bestTimeToVisit: 'September to May',
    temperature: { min: 12, max: 25 },
    elevation: '1,100 m',
    nearestAirport: 'Cochin International Airport (COK) - 100 km (approx. 3 hours drive. Winding mountain roads via Pala offer spectacular views of deep ravines).',
    activities: [
      'Paragliding',
      'Pine forest trekking',
      'Rock climbing',
      'Mountain cycling',
      'Kurisumala Ashram visit',
      'Dairy farm tours',
    ],
    highlights: [
      'Vagamon Meadows',
      'Pine Hill Forest',
      'Kurisumala Ashram',
      'Vagamon Paragliding Festival',
    ],
    coordinates: { 
      lat: 9.6862, 
      lng: 76.9064,
      details: 'Highland border of Idukki and Kottayam districts.'
    },
    isHiddenGem: true,
    isTrending: true,
    priceRange: 'budget',
    historicalSummary: 'Initially a remote forest, Vagamon\'s plantation history began when the British discovered its moderate climate and fertile soil. They established tea and coffee estates. In the mid-20th century, Cistercian monks founded the Kurisumala Ashram, introducing dairy farming and sustainable agriculture to the hills.',
    seasonalGuidelines: 'September to May is excellent for paragliding and trekking. Winters (December-February) are cool and misty. Monsoons bring heavy fog and rainfall, making it green but limiting visibility.',
    packingSuggestions: [
      'Windbreaker or light sweater (evenings can be breezy and cool).',
      'Trekking shoes or sneakers with good traction.',
      'Umbrella or light rain jacket.',
      'Mosquito repellent.',
      'Sufficient cash (limited ATM availability in the local town).'
    ],
    transitDetails: 'Direct road access from Kottayam (60 km) and Ernakulam. KSRTC buses operate to Vagamon from Pala and Ernakulam.'
  },
  {
    id: 'dest-013',
    name: 'Ponmudi',
    slug: 'ponmudi',
    district: 'Thiruvananthapuram',
    region: 'South Kerala',
    description:
      'Ponmudi — meaning "Golden Peak" — is a charming hill station just 55 km from Thiruvananthapuram, making it the capital city\'s favourite weekend escape. The winding road to the summit passes through 22 hairpin bends, dense tropical forests, and cascading streams. At 1,100 m, the summit offers panoramic views of the misty Western Ghats and the distant plains. The recently opened Ponmudi Glass Bridge adds a modern thrill to this timeless landscape. Deer Park, with its resident sambar and barking deer, and the surrounding Golden Valley provide gentle trekking trails through pristine wilderness.',
    shortDescription:
      'The capital\'s golden peak — hairpin bends, misty summits, and the iconic glass bridge.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'hill-station',
    tags: ['hill station', 'trekking', 'weekend getaway', 'glass bridge', 'nature'],
    rating: 4.3,
    reviews: 3890,
    bestTimeToVisit: 'September to May',
    temperature: { min: 14, max: 24 },
    elevation: '1,100 m',
    nearestAirport: 'Trivandrum International Airport (TRV) - 61 km (approx. 1.5 to 2 hours drive. Winding forest road with 22 hairpin bends; caution is required during rains).',
    activities: [
      'Glass Bridge walkway',
      'Trekking to Golden Valley',
      'Deer Park visit',
      'Meenmutty Waterfalls trek',
      'Bird watching',
      'Nature photography',
    ],
    highlights: [
      'Ponmudi Glass Bridge',
      '22 hairpin bends drive',
      'Golden Valley',
      'Deer Park',
    ],
    coordinates: { 
      lat: 8.7576, 
      lng: 77.1154,
      details: 'Nedumangad Taluk, Agasthyamala Biosphere Reserve, southern Western Ghats.'
    },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'budget',
    historicalSummary: 'Ponmudi was originally inhabited by the Kani hill tribe. It was developed as a small hill station by the Travancore Royal Family and later by the state forest department. It serves as a vital eco-tourism corridor in the Agasthyamala Biosphere Reserve.',
    seasonalGuidelines: 'September to May is the best time to visit. Winter mornings feature dense fog that clears by noon. Monsoon visits offer lush green views but driving up the 22 hairpins requires caution due to mist and wet roads.',
    packingSuggestions: [
      'Light jacket or sweater for misty mornings and cool summit winds.',
      'Raincoat or windcheater (the high peak attracts sudden clouds).',
      'Comfortable walking shoes.',
      'Camera or smartphone for panoramic valley views.',
      'Water bottle and light snacks (limited eateries on the hilltop).'
    ],
    transitDetails: 'KSRTC runs daily buses from Trivandrum Nedumangad bus station. Renting a car or hiring a taxi is popular for weekend trips.'
  },
  {
    id: 'dest-014',
    name: 'Nelliyampathy',
    slug: 'nelliyampathy',
    district: 'Palakkad',
    region: 'Central Kerala',
    description:
      'Nelliyampathy is Palakkad\'s best-kept secret — a cluster of hills rising to 1,572 m, cloaked in orange orchards, coffee plantations, and dense shola forests. Named after the Nelli (Indian gooseberry) trees that once dominated the landscape, this offbeat hill station rewards adventurous travellers with panoramic viewpoints like Seetharkundu, misty treks through Palagapandi Estate, and the eerie beauty of Kesavan Para (Phantom Rock). With virtually zero commercialization, Nelliyampathy offers the authentic highland experience that more popular destinations have long lost.',
    shortDescription:
      'Orange groves, coffee estates, and untouched mountain solitude in Palakkad\'s hills.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'hill-station',
    tags: ['hill station', 'offbeat', 'coffee plantation', 'trekking', 'nature'],
    rating: 4.3,
    reviews: 2340,
    bestTimeToVisit: 'September to May',
    temperature: { min: 12, max: 26 },
    elevation: '1,572 m',
    nearestAirport: 'Coimbatore International Airport (CJB) - 110 km (approx. 3 hours drive via Palakkad). Alternatively, Cochin International Airport (COK) is 120 km away.',
    activities: [
      'Seetharkundu viewpoint trek',
      'Orange and coffee plantation tours',
      'Kesavan Para (Phantom Rock) visit',
      'Pothundi Dam visit',
      'Bird watching',
      'Camping',
    ],
    highlights: [
      'Seetharkundu Viewpoint',
      'Palagapandi Estate',
      'Kesavan Para (Phantom Rock)',
      'Pothundi Dam',
    ],
    coordinates: { 
      lat: 10.5274, 
      lng: 76.6854,
      details: 'Nelliampathy Forest Range, Palakkad District.'
    },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'budget',
    historicalSummary: 'During the British colonial era, Nelliyampathy was leased from the Vengunad Kovilakam (local rulers) by British planters to cultivate tea, coffee, and cardamom. It remained a relatively isolated highland settlement, preserving its raw shola ecosystems and wildlife corridors.',
    seasonalGuidelines: 'September to May is best. December and January are dry and cool. Monsoon (June-August) transforms the hills with numerous seasonal waterfalls but limits outdoor activities due to heavy forest downpours.',
    packingSuggestions: [
      'Warm clothing for nights (cardigan, jacket).',
      'Sturdy trekking footwear with good traction.',
      'Leech socks or protection sprays if walking through plantation trails.',
      'Insect repellent and sunblock.',
      'A basic first-aid kit.'
    ],
    transitDetails: 'Access is via Nenmara town (30 km), passing through Pothundi Dam. Winding road has 10 hairpin bends. Local public buses run from Nenmara.'
  },
  {
    id: 'dest-015',
    name: 'Gavi',
    slug: 'gavi',
    district: 'Pathanamthitta',
    region: 'South Kerala',
    description:
      'Gavi is an eco-tourism paradise tucked deep inside the Periyar Tiger Reserve, accessible only through the Kerala Forest Department. This exclusivity preserves its raw, untouched beauty — cardamom-scented forests teeming with elephants, lion-tailed macaques, and great Indian hornbills surround a pristine reservoir reflecting cloud-laden skies. Night safaris through the forest, guided by the calls of owls and the rustling of nocturnal creatures, are the hallmark experience. Visitor numbers are strictly capped, making Gavi one of the most intimate wildlife encounters in all of India.',
    shortDescription:
      'A forest-department gem — exclusive eco-tourism deep inside Periyar Tiger Reserve.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'wildlife',
    tags: ['eco-tourism', 'wildlife', 'offbeat', 'forest', 'exclusive'],
    rating: 4.7,
    reviews: 1890,
    bestTimeToVisit: 'October to May',
    temperature: { min: 12, max: 26 },
    elevation: '1,200 m',
    nearestAirport: 'Cochin International Airport (COK) - 175 km (approx. 5 hours drive via Pathanamthitta. Access requires prior booking/permission from the Forest Department).',
    activities: [
      'Jeep safari through cardamom hills',
      'Night safari',
      'Boating on Gavi reservoir',
      'Bird watching (260+ species)',
      'Trekking',
      'Camping under the stars',
    ],
    highlights: [
      'Gavi Reservoir',
      'Sabarimala forest corridor',
      'Cardamom hills',
      'Night wildlife safaris',
    ],
    coordinates: { 
      lat: 9.4064, 
      lng: 77.1408,
      details: 'Inside Periyar Tiger Reserve, Pathanamthitta District.'
    },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'mid-range',
    historicalSummary: 'Gavi was historically a cardamom plantation estate managed by the Gavi Forest Development Corporation for Sri Lankan repatriates. In the early 2000s, it was identified as an ecological haven and converted into a highly regulated, community-led eco-tourism project.',
    seasonalGuidelines: 'September to May is ideal. Winters are cool and pleasant. Monsoon (June-September) is wet and misty; while gorgeous, the forest trails become muddy and leech-prone.',
    packingSuggestions: [
      'Neutral or dark forest-colored clothing (avoid bright reds, yellows, and whites).',
      'Leech socks and insect repellent.',
      'Binoculars and a good flashlight.',
      'Warm pullover or jacket for cool highland forest nights.',
      'Rain jacket/waterproof covers for gear.'
    ],
    transitDetails: 'Vehicular access is restricted. Visitors must take the official KSRTC bus from Pathanamthitta/Kumily or book an approved tour package with a forest vehicle permit.'
  },
  {
    id: 'dest-016',
    name: 'Thenmala',
    slug: 'thenmala',
    district: 'Kollam',
    region: 'South Kerala',
    description:
      'Thenmala holds the distinction of being India\'s first planned eco-tourism destination, created in 1999 around the Parappar Dam and the foothills of the Western Ghats. The destination is divided into three zones — Culture, Adventure, and Leisure — each offering distinct experiences. A suspension bridge swings over the Kallada River, an elevated walkway threads through the forest canopy, and a sculptured garden features topiary art. The Shendurney Wildlife Sanctuary, with its lion-tailed macaques and Nilgiri langurs, lies just beyond the eco-tourism zone. The "Honey Valley" meaning of Thenmala perfectly captures the sweetness of this place.',
    shortDescription:
      'India\'s first eco-tourism destination — adventure zones, canopy walks, and Honey Valley.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'adventure',
    tags: ['eco-tourism', 'adventure', 'dam', 'family', 'nature'],
    rating: 4.2,
    reviews: 3420,
    bestTimeToVisit: 'October to March',
    temperature: { min: 20, max: 32 },
    nearestAirport: 'Trivandrum International Airport (TRV) - 72 km (approx. 2 hours drive via the Shenkottai Road). Direct rail connectivity via the historic Thenmala Railway Station.',
    activities: [
      'Canopy walkway',
      'Suspension bridge crossing',
      'Mountain biking',
      'Boating in Parappar Dam',
      'Deer rehabilitation centre visit',
      'Rock climbing',
    ],
    highlights: [
      'Canopy Walkway',
      'Parappar Dam',
      'Sculptured Garden',
      'Shendurney Wildlife Sanctuary',
    ],
    coordinates: { 
      lat: 8.9591, 
      lng: 77.0641,
      details: 'Kallada River basin, Pathanapuram Taluk, Kollam District.'
    },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'budget',
    historicalSummary: 'Thenmala\'s modern history is tied to the construction of the Kallada Dam (Parappar Dam) in the late 20th century. In 1999, the state government chose the surrounding area to create India\'s first planned eco-tourism project, utilizing the natural terrain and Shendurney forests.',
    seasonalGuidelines: 'October to March offers pleasant weather for outdoor activities, boating, and canopy walking. Monsoon is beautiful for dam views. Summer can be hot and humid, but suitable for leisure visits.',
    packingSuggestions: [
      'Comfortable athletic clothing suitable for climbing, biking, and walking.',
      'Good walking shoes or sneakers.',
      'Swimsuit (if participating in water sports or dam boating).',
      'Mosquito repellent.',
      'Sun hat and sunscreen.'
    ],
    transitDetails: 'Direct train access on the Kollam-Shenkottai line. National Highway 744 passes directly through Thenmala town.'
  },
  {
    id: 'dest-017',
    name: 'Poovar',
    slug: 'poovar',
    district: 'Thiruvananthapuram',
    region: 'South Kerala',
    description:
      'Poovar is a mesmerizing confluence where the Neyyar River meets the Arabian Sea, creating a unique estuary landscape of mangrove-lined backwaters, golden sand islands, and a floating resort experience found nowhere else in Kerala. Accessible primarily by boat, Poovar\'s Golden Sand Beach is an uninhabited stretch visible only at low tide — a genuine castaway experience. Luxury floating cottages on the backwaters, speedboat rides through mangrove tunnels, and the breathtaking convergence point of river and sea make Poovar a destination that feels almost too beautiful to be real.',
    shortDescription:
      'Where river meets sea — floating cottages, golden sandbars, and mangrove magic.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'backwaters',
    tags: ['backwaters', 'beach', 'mangroves', 'luxury', 'romantic'],
    rating: 4.6,
    reviews: 3780,
    bestTimeToVisit: 'September to March',
    temperature: { min: 24, max: 33 },
    nearestAirport: 'Trivandrum International Airport (TRV) - 30 km (approx. 45-60 minutes drive. Very close to the capital city, making it easy to access).',
    activities: [
      'Backwater cruise through mangroves',
      'Golden Sand Beach visit',
      'Floating cottage stay',
      'Speedboat ride to estuary',
      'Fishing',
      'Ayurvedic massage',
    ],
    highlights: [
      'Neyyar River estuary',
      'Golden Sand Beach',
      'Mangrove forests',
      'Floating resort',
    ],
    coordinates: { 
      lat: 8.3131, 
      lng: 77.0671,
      details: 'Neyyar River estuary, Neyyattinkara Taluk, Thiruvananthapuram District.'
    },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'luxury',
    historicalSummary: 'Poovar was an ancient port city known as Pokhar. According to historical lore, the legendary King Marthanda Varma of Travancore sought refuge here during a rebellion. Impressed by the blooming red flowers along the Neyyar River, he named it \'Poo-var\' (meaning \'flower river\').',
    seasonalGuidelines: 'September to March offers stable estuary waters and beautiful sunsets. Summer is hot but breezy. Monsoons see high river levels and strong currents where the river meets the sea, which may restrict boating.',
    packingSuggestions: [
      'Lightweight cotton clothes and resort wear.',
      'Insect repellent (important for backwater and river channels).',
      'Sun block, sunglasses, and beach hat.',
      'Slip-on sandals or waterproof shoes.',
      'Waterproof phone case or dry bag for boat rides.'
    ],
    transitDetails: 'Boat terminals are located in Poovar town. Resort bookings usually include motorboat transfers from the parking terminal.'
  },
  {
    id: 'dest-018',
    name: 'Chembra Peak',
    slug: 'chembra-peak',
    district: 'Wayanad',
    region: 'North Kerala',
    description:
      'At 2,100 m, Chembra Peak is the tallest summit in Wayanad and one of the most rewarding treks in Kerala. The star attraction en route is the heart-shaped lake — a natural pond perched at about 1,400 m that has become an Instagram sensation. The full-day guided trek traverses rolling grasslands, dense shola forests, and windswept ridges before reaching the summit, which offers 360-degree views of the Nilgiri Hills, Kozhikode plains, and the distant Lakkidi valley. Treks require Forest Department permission and are limited to sustainable group sizes, preserving the mountain\'s pristine character.',
    shortDescription:
      'Wayanad\'s highest peak — trek past the famed heart-shaped lake to panoramic summits.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'adventure',
    tags: ['trekking', 'adventure', 'heart lake', 'mountain', 'photography'],
    rating: 4.5,
    reviews: 5670,
    bestTimeToVisit: 'September to February',
    temperature: { min: 10, max: 22 },
    elevation: '2,100 m',
    nearestAirport: 'Calicut International Airport (CCJ) - 95 km (approx. 3 hours drive to the base camp at Meppadi. Trekking passes must be procured from the Forest Office at Meppadi).',
    activities: [
      'Chembra Peak trek',
      'Heart-shaped lake viewpoint',
      'Photography',
      'Camping',
      'Bird watching',
      'Nature walks',
    ],
    highlights: [
      'Heart-shaped lake',
      'Summit panoramic views',
      'Shola forest trails',
      'Sunrise from the peak',
    ],
    coordinates: { 
      lat: 11.5973, 
      lng: 76.0808,
      details: 'Vythiri Taluk, southern Wayanad, Western Ghats.'
    },
    isHiddenGem: false,
    isTrending: true,
    priceRange: 'budget',
    historicalSummary: 'The peak has been a landmark for travelers in the Wayanad region for centuries. Historically, British surveyors used it as a triangulation point. Local legends associate the heart-shaped lake (Hridayasarasu) with celestial beings who came down to bathe in its pristine, perennial waters.',
    seasonalGuidelines: 'September to February is the best trekking window. The trek is closed or heavily restricted during peak monsoons (June-August) for safety. Summer treks are hot and dry but offer clear summit visibility.',
    packingSuggestions: [
      'Hiking shoes or trail running shoes with excellent grip (essential for steep slopes).',
      '2 to 3 liters of water per person (no plastic containers allowed unless security tagged).',
      'Energy snacks, electrolyte packets, and a light lunch.',
      'Sun hat, sunscreen, and sunglasses.',
      'Leech socks (highly recommended for the forest sections).'
    ],
    transitDetails: 'Reach Meppadi town via bus from Kalpetta (12 km). From Meppadi, hire a local jeep to the Chembra trekking office and base camp.'
  },
  {
    id: 'dest-019',
    name: 'Eravikulam National Park',
    slug: 'eravikulam',
    district: 'Idukki',
    region: 'South Kerala',
    description:
      'Eravikulam National Park, a UNESCO World Heritage buffer zone in the High Ranges of the Western Ghats, is the last stronghold of the endangered Nilgiri tahr, a mountain goat found nowhere else on Earth. Approximately 800 tahr roam the park\'s rolling grasslands and shola forests between 1,200 and 2,695 m elevation. Every 12 years, the park\'s slopes erupt in a spectacular bloom of Neelakurinji (Strobilanthes kunthiana), painting entire mountainsides a vivid blue-purple — the next bloom is eagerly awaited in 2030. Anamudi, South India\'s highest peak at 2,695 m, forms the park\'s dramatic southern boundary.',
    shortDescription:
      'Home of the Nilgiri tahr and the once-in-12-years Neelakurinji bloom spectacle.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'wildlife',
    tags: ['wildlife', 'national park', 'Nilgiri tahr', 'trekking', 'Neelakurinji'],
    rating: 4.6,
    reviews: 7210,
    bestTimeToVisit: 'September to November / April to May',
    temperature: { min: 5, max: 20 },
    elevation: '1,200–2,695 m',
    nearestAirport: 'Cochin International Airport (COK) - 120 km (approx. 4 hours drive to Rajamala entrance). Pre-paid buses run from Munnar town, which is 15 km away.',
    activities: [
      'Nilgiri tahr spotting',
      'Guided nature walks',
      'Neelakurinji bloom viewing (seasonal)',
      'Photography',
      'Anamudi Peak trekking (with permission)',
      'Birdwatching',
    ],
    highlights: [
      'Nilgiri tahr habitat',
      'Anamudi Peak (2,695 m)',
      'Neelakurinji bloom (next: 2030)',
      'Rajamala slopes',
    ],
    coordinates: { 
      lat: 10.1723, 
      lng: 77.0611,
      details: 'High ranges of Devikulam Taluk, Munnar, Idukki District.'
    },
    isHiddenGem: false,
    isTrending: false,
    priceRange: 'budget',
    historicalSummary: 'Originally managed as a private game preserve by the Kannan Devan Hills Produce Company during the British era, the area was declared a sanctuary in 1975 due to its ecological significance. In 1978, it was upgraded to a National Park to protect the Nilgiri tahr.',
    seasonalGuidelines: 'Open from September to January and April to May. The park is closed to visitors during the calving season of the Nilgiri tahr (usually February to March). Monsoon brings heavy rain and strong winds.',
    packingSuggestions: [
      'Warm clothing layers (the park is wind-swept and temperature can drop to 5°C).',
      'Rain jacket or windproof jacket.',
      'Comfortable walking shoes (safari buses drop you at Rajamala, followed by a 2 km uphill walk).',
      'Binoculars and camera with zoom lens.',
      'Sunscreen and sun hat.'
    ],
    transitDetails: 'Private vehicles are parked at the forest station. Park-operated safari buses transport visitors to the tourism zone in Rajamala.'
  },
  {
    id: 'dest-020',
    name: 'Silent Valley National Park',
    slug: 'silent-valley',
    district: 'Palakkad',
    region: 'Central Kerala',
    description:
      'Silent Valley is one of the last remaining tracts of virgin tropical evergreen forest in India — a living museum of evolution that remained untouched because the Save Silent Valley campaign of the 1970s–80s successfully halted a proposed hydroelectric dam. The park harbours the largest population of lion-tailed macaques in the world, along with Nilgiri langurs, Malabar giant squirrels, and over 1,000 species of flowering plants. The "silence" is misleading — the forest throbs with cicadas, birdsong, and the rush of the Kunthipuzha River. Access is strictly regulated, making each visit an exclusive communion with primeval nature.',
    shortDescription:
      'Pristine primeval rainforest — India\'s most protected wilderness and conservation icon.',
    image: '/api/placeholder/800/600',
    coverImage: '/api/placeholder/1200/800',
    category: 'wildlife',
    tags: ['rainforest', 'conservation', 'wildlife', 'offbeat', 'nature'],
    rating: 4.8,
    reviews: 1560,
    bestTimeToVisit: 'December to April',
    temperature: { min: 16, max: 28 },
    elevation: '900–2,383 m',
    nearestAirport: 'Coimbatore International Airport (CJB) - 80 km (approx. 2.5 hours drive to Mukkali entry gate). Calicut International Airport (CCJ) is 100 km away.',
    activities: [
      'Guided forest treks',
      'Lion-tailed macaque spotting',
      'Birdwatching (over 200 species)',
      'Kunthipuzha River viewpoint',
      'Nature photography',
      'Research and education walks',
    ],
    highlights: [
      'Virgin tropical evergreen forest',
      'Lion-tailed macaque colony',
      'Kunthipuzha River',
      'Sairandhri — park headquarters',
    ],
    coordinates: { 
      lat: 11.0833, 
      lng: 76.4333,
      details: 'Mannarkkad Taluk, Palakkad District, Nilgiri Biosphere Reserve.'
    },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'budget',
    historicalSummary: 'Local legends refer to Silent Valley as Sairandhrivanam, where Draupadi (disguised as Sairandhri) lived with the Pandavas during their exile. In the 1970s, it became the battlefield for the \'Save Silent Valley\' movement, one of India\'s most successful environmental campaigns, which stopped a hydroelectric dam and led to its declaration as a National Park in 1984.',
    seasonalGuidelines: 'December to April is the dry winter/spring season, ideal for spotting wildlife and comfortable forest trekking. The park remains open in monsoon, but forest trails are extremely wet and infested with leeches.',
    packingSuggestions: [
      'Sturdy hiking boots with excellent wet grip.',
      'Leech socks (compulsory/highly recommended for walking in the undergrowth).',
      'Insect repellent and hand sanitizer.',
      'Raincoat or waterproof poncho.',
      'Neutral-colored, quick-dry clothing.'
    ],
    transitDetails: 'Visitors must check in at Mukkali, 23 km from Sairandhri. Forest department jeeps are hired from Mukkali to enter the park. Permits should be booked in advance.'
  },
];

// ── Districts (14) ──────────────────────────────────────────

export const districts: District[] = [
  {
    id: 'dist-01',
    name: 'Thiruvananthapuram',
    slug: 'thiruvananthapuram',
    description:
      'Kerala\'s capital city — a blend of royal heritage, golden beaches like Kovalam and Varkala, the world-renowned Padmanabhaswamy Temple, and cutting-edge space research at Thumba.',
    destinationCount: 5,
    image: '/api/placeholder/800/600',
    hq: 'Thiruvananthapuram',
    established: '1 November 1956',
    area: '2,192 sq km',
    population: 'Approx. 3.3 million',
    coordinates: { lat: 8.5241, lng: 76.9366 },
    nearestAirport: 'Trivandrum International Airport (TRV)',
    historicalSummary: 'Historically the seat of the Kingdom of Travancore, Thiruvananthapuram was established as the capital in 1795 by Maharaja Dharma Raja. The city\'s name is derived from the deity of the Padmanabhaswamy Temple, Lord Anantha. It is a major educational, royal, and scientific hub, being the birthplace of India\'s space program.',
    keyFacts: [
      'Southernmost district of Kerala, bordering Tamil Nadu.',
      'Home to the Padmanabhaswamy Temple, widely considered the wealthiest place of worship in the world.',
      'Contains the first IT park in India, Technopark, established in 1990.',
      'Features Agasthyamala, a biosphere reserve rich in medicinal herbs and rare fauna.'
    ]
  },
  {
    id: 'dist-02',
    name: 'Kollam',
    slug: 'kollam',
    description:
      'The gateway to Kerala\'s backwaters, Kollam offers Ashtamudi Lake cruises, the historic cashew industry, Thenmala eco-tourism, and Jatayu Earth\'s Centre — the world\'s largest bird sculpture.',
    destinationCount: 3,
    image: '/api/placeholder/800/600',
    hq: 'Kollam',
    established: '1 November 1956',
    area: '2,492 sq km',
    population: 'Approx. 2.6 million',
    coordinates: { lat: 8.8932, lng: 76.6141 },
    nearestAirport: 'Trivandrum International Airport (TRV) - 70 km',
    historicalSummary: 'Kollam (historically Quilon) is one of the oldest ports on the Arabian Sea, mentioned in Roman, Chinese, and Arab travelogues. It was a major node in the ancient spice trade and a base for Portuguese, Dutch, and British merchants. The Malayalam era (Kollavarsham) is believed to have commenced from Kollam in 825 CE.',
    keyFacts: [
      'Known as the Cashew Capital of the World due to its extensive processing industries.',
      'Gateway to the Ashtamudi Lake backwaters, the second-largest lake in Kerala.',
      'Home to the Jatayu Earth\'s Center, featuring the world\'s largest bird sculpture.',
      'Famed for historic Chinese fishing net ruins and traditional coir weaving.'
    ]
  },
  {
    id: 'dist-03',
    name: 'Pathanamthitta',
    slug: 'pathanamthitta',
    description:
      'The pilgrimage capital of Kerala, home to the famed Sabarimala Ayyappa Temple, the eco-tourism haven of Gavi, and Periyar Tiger Reserve\'s western reaches.',
    destinationCount: 2,
    image: '/api/placeholder/800/600',
    hq: 'Pathanamthitta',
    established: '1 November 1982',
    area: '2,637 sq km',
    population: 'Approx. 1.2 million',
    coordinates: { lat: 9.2648, lng: 76.7870 },
    nearestAirport: 'Trivandrum International Airport (TRV) - 110 km',
    historicalSummary: 'Pathanamthitta was historically part of the Pandalam Kingdom, which had close ties to the Travancore Royal Family. Pandalam is celebrated as the birthplace of Lord Ayyappa, the deity of Sabarimala. The district was carved out of parts of Kollam, Alappuzha, and Idukki in 1982.',
    keyFacts: [
      'Pilgrimage Capital of Kerala, hosting the Sabarimala Ayyappa temple.',
      'Over 50% of the district\'s area is covered by dense reserve forests.',
      'Hosts the Aranmula Snake Boat Race (Uthrattathi Vallamkali) and Aranmula Kannadi (metal mirror making).',
      'Gavi, an eco-tourism village in Periyar Tiger Reserve, lies here.'
    ]
  },
  {
    id: 'dist-04',
    name: 'Alappuzha',
    slug: 'alappuzha',
    description:
      'The "Venice of the East" — legendary houseboat cruises, the Nehru Trophy Boat Race, serene Marari Beach, and the vast Vembanad backwater network.',
    destinationCount: 4,
    image: '/api/placeholder/800/600',
    hq: 'Alappuzha',
    established: '17 August 1957',
    area: '1,414 sq km',
    population: 'Approx. 2.1 million',
    coordinates: { lat: 9.4981, lng: 76.3388 },
    nearestAirport: 'Cochin International Airport (COK) - 75 km',
    historicalSummary: 'Developed as a port town in the late 18th century by Raja Kesavadas of Travancore, Alappuzha became a bustling center of the coir industry and spice trade. Its extensive system of canals and backwaters earned it the name \'Venice of the East\'.',
    keyFacts: [
      'Smallest district in Kerala by land area, but highly populated.',
      'Known for the Vembanad Lake, the longest lake in India.',
      'Kuttanad region in Alappuzha is famous for farming below sea level (underwater rice cultivation).',
      'Hosts the world-famous Nehru Trophy Boat Race on Punnamada Lake.'
    ]
  },
  {
    id: 'dist-05',
    name: 'Kottayam',
    slug: 'kottayam',
    description:
      'Kerala\'s land of letters and latex — Kumarakom bird sanctuary, rubber plantations, ancient churches, and the eastern gateway to the Vembanad backwaters.',
    destinationCount: 2,
    image: '/api/placeholder/800/600',
    hq: 'Kottayam',
    established: '1 November 1956',
    area: '2,203 sq km',
    population: 'Approx. 1.9 million',
    coordinates: { lat: 9.5916, lng: 76.5224 },
    nearestAirport: 'Cochin International Airport (COK) - 90 km',
    historicalSummary: 'Historically ruled by the Thekkumkur kingdom, Kottayam later merged into Travancore. It was at the forefront of social reforms, including the Vaikom Satyagraha (1924-25) against untouchability. It was the first town in India to achieve 100% literacy in 1989.',
    keyFacts: [
      'Known as the \'Land of Letters, Latex, and Lakes\' (Akshara Nagari).',
      'A primary hub of natural rubber production in India.',
      'Home to the Kumarakom Bird Sanctuary and extensive Vembanad backwaters.',
      'Birthplace of major Malayalam print media houses.'
    ]
  },
  {
    id: 'dist-06',
    name: 'Idukki',
    slug: 'idukki',
    description:
      'Kerala\'s spice garden and highland wonderland — Munnar tea estates, Thekkady wildlife, Vagamon meadows, and the iconic double-curvature arch dam.',
    destinationCount: 5,
    image: '/api/placeholder/800/600',
    hq: 'Painavu',
    established: '26 January 1972',
    area: '4,358 sq km',
    population: 'Approx. 1.1 million',
    coordinates: { lat: 9.8500, lng: 76.9700 },
    nearestAirport: 'Cochin International Airport (COK) - 110 km',
    historicalSummary: 'Idukki was historically covered in dense mountain forests and inhabited by tribal communities like the Muthuvans. The region became prominent during the British era when tea estates were established in Munnar. In 1976, the grand Idukki Arch Dam, one of the tallest in Asia, was commissioned.',
    keyFacts: [
      'Second-largest district in Kerala but has the lowest population density.',
      'Home to Anamudi, the highest peak in South India (2,695 m).',
      'Hosts major wildlife reserves including Eravikulam National Park and Periyar Tiger Reserve.',
      'Produces a massive share of Kerala\'s hydroelectric power and spices like cardamom.'
    ]
  },
  {
    id: 'dist-07',
    name: 'Ernakulam',
    slug: 'ernakulam',
    description:
      'The commercial capital housing cosmopolitan Kochi — Fort Kochi heritage, Chinese fishing nets, Lulu Mall (India\'s largest), and the Kochi-Muziris Biennale.',
    destinationCount: 3,
    image: '/api/placeholder/800/600',
    hq: 'Kakkanad',
    established: '1 April 1958',
    area: '3,068 sq km',
    population: 'Approx. 3.4 million',
    coordinates: { lat: 9.9816, lng: 76.2998 },
    nearestAirport: 'Cochin International Airport (COK) - 30 km',
    historicalSummary: 'Historically the core of the Kingdom of Cochin, Ernakulam has been a commercial crossroads for millennia. The port town of Cochin rose to prominence after Muziris was destroyed. It became a colonial battleground between the Portuguese, Dutch, and British before becoming a modern cosmopolitan hub.',
    keyFacts: [
      'Commercial and financial capital of Kerala.',
      'Hosts the Cochin Shipyard, Southern Naval Command, and Kochi InfoPark.',
      'Home to the historic enclave of Fort Kochi and Jew Town.',
      'Cochin Port is one of the largest natural harbors in India.'
    ]
  },
  {
    id: 'dist-08',
    name: 'Thrissur',
    slug: 'thrissur',
    description:
      'Kerala\'s cultural capital — home to the spectacular Thrissur Pooram festival, Athirappilly Falls, Guruvayur Temple, and the Sahitya Akademi (Academy of Letters).',
    destinationCount: 3,
    image: '/api/placeholder/800/600',
    hq: 'Thrissur',
    established: '1 November 1956',
    area: '3,032 sq km',
    population: 'Approx. 3.2 million',
    coordinates: { lat: 10.5276, lng: 76.2144 },
    nearestAirport: 'Cochin International Airport (COK) - 50 km',
    historicalSummary: 'Historically ruled by the Cochin Royal Family, Thrissur (Trichur) rose to cultural prominence under the reign of Sakthan Thampuran in the late 18th century. He remodeled the city, cleared surrounding forests, and established the Thrissur Pooram festival, cementing its place as Kerala\'s cultural heart.',
    keyFacts: [
      'Cultural Capital of Kerala, housing Kerala Sangeetha Nataka Akademi and Sahitya Akademi.',
      'Famous for the Vadakkunnathan Temple and the grand Thrissur Pooram festival.',
      'Hosts Athirappilly and Vazhachal waterfalls, Kerala\'s largest falls.',
      'Major center for gold jewelry manufacturing and banking.'
    ]
  },
  {
    id: 'dist-09',
    name: 'Palakkad',
    slug: 'palakkad',
    description:
      'The granary of Kerala — Palakkad Gap, Nelliyampathy hills, Silent Valley\'s primeval forests, Malampuzha Dam gardens, and rich agrarian heritage.',
    destinationCount: 3,
    image: '/api/placeholder/800/600',
    hq: 'Palakkad',
    established: '1 January 1957',
    area: '4,480 sq km',
    population: 'Approx. 2.8 million',
    coordinates: { lat: 10.7867, lng: 76.6547 },
    nearestAirport: 'Coimbatore International Airport (CJB) - 60 km',
    historicalSummary: 'Known as the gateway to Kerala due to the Palakkad Gap in the Western Ghats. Historically ruled by the Palakkad Rajas, it was later occupied by Hyder Ali and Tipu Sultan of Mysore, who built the Palakkad Fort in 1766, which subsequently fell to the British.',
    keyFacts: [
      'Granary of Kerala due to its extensive paddy cultivation.',
      'Features the Palakkad Gap, a 30-km natural break in the Western Ghats mountain range.',
      'Home to Silent Valley National Park, a primeval rainforest ecosystem.',
      'Rich in Carnatic music tradition and temple art forms.'
    ]
  },
  {
    id: 'dist-10',
    name: 'Malappuram',
    slug: 'malappuram',
    description:
      'A district steeped in Mappila heritage — Nilambur teak forests, Kadalundi bird sanctuary, historic mosques, and the ancient martial art of Kalaripayattu.',
    destinationCount: 2,
    image: '/api/placeholder/800/600',
    hq: 'Malappuram',
    established: '16 June 1969',
    area: '3,554 sq km',
    population: 'Approx. 4.1 million',
    coordinates: { lat: 11.0720, lng: 76.0740 },
    nearestAirport: 'Calicut International Airport (CCJ) - 25 km',
    historicalSummary: 'Malappuram was historically a military headquarters for the Zamorins of Calicut and later for the British. It was the epicenter of the Malabar Rebellion (Moplah Riots) of 1921. It was carved out as a separate district in 1969 to promote regional development.',
    keyFacts: [
      'Most populous district in Kerala.',
      'Known for the Nilambur Teak Forests, home to the world\'s oldest teak plantation (Conolly\'s Plot).',
      'Major center of Mappila songs, Islamic learning, and football culture.',
      'Hosts Kottakkal Arya Vaidya Sala, a globally renowned Ayurvedic center.'
    ]
  },
  {
    id: 'dist-11',
    name: 'Kozhikode',
    slug: 'kozhikode',
    description:
      'The City of Spices where Vasco da Gama first landed in 1498 — Kappad Beach, Kozhikode halwa, Beypore boatbuilding, and the literary heritage of Thakazhi and Vaikom Muhammad Basheer.',
    destinationCount: 3,
    image: '/api/placeholder/800/600',
    hq: 'Kozhikode',
    established: '1 January 1957',
    area: '2,344 sq km',
    population: 'Approx. 3.1 million',
    coordinates: { lat: 11.2588, lng: 75.7804 },
    nearestAirport: 'Calicut International Airport (CCJ) - 28 km',
    historicalSummary: 'Kozhikode (Calicut) was the capital of the powerful Zamorins (Samudiris) of Calicut. In 1498, Portuguese explorer Vasco da Gama landed at Kappad Beach near Calicut, opening the sea route from Europe to India and changing global trade history forever.',
    keyFacts: [
      'Known as the \'City of Spices\' and recognized by UNESCO as India\'s first \'City of Literature\'.',
      'Famous for Beypore Uru (traditional wooden dhow/boat building).',
      'Celebrated for Malabar cuisine, especially Kozhikodan Biryani and Halwa.',
      'Main port of trade for Arabian, Chinese, and European merchants.'
    ]
  },
  {
    id: 'dist-12',
    name: 'Wayanad',
    slug: 'wayanad',
    description:
      'A misty highland district of ancient caves, dense rainforests, tribal settlements, Chembra Peak, and UNESCO-listed Western Ghats biodiversity.',
    destinationCount: 4,
    image: '/api/placeholder/800/600',
    hq: 'Kalpetta',
    established: '1 November 1980',
    area: '2,131 sq km',
    population: 'Approx. 817,000',
    coordinates: { lat: 11.6050, lng: 76.0830 },
    nearestAirport: 'Calicut International Airport (CCJ) - 100 km',
    historicalSummary: 'Wayanad is dotted with Neolithic archaeological remnants. It was ruled by the Pazhassi Rajas of Kottayam dynasty. King Pazhassi Raja led an iconic guerrilla campaign against the British East India Company from the safety of Wayanad\'s dense forests before his death in 1805.',
    keyFacts: [
      'Only district in Kerala that borders both Karnataka and Tamil Nadu.',
      'Home to the highest concentration of tribal population in Kerala.',
      'Hosts Edakkal Caves, showcasing rock carvings from the Neolithic era.',
      'Major producer of spices, tea, coffee, and aromatic rice like Gandhakasala.'
    ]
  },
  {
    id: 'dist-13',
    name: 'Kannur',
    slug: 'kannur',
    description:
      'The land of looms and lore — Theyyam rituals, St. Angelo Fort, Payyambalam Beach, handloom weaving, and the Malabar freedom movement\'s legacy.',
    destinationCount: 3,
    image: '/api/placeholder/800/600',
    hq: 'Kannur',
    established: '1 January 1957',
    area: '2,966 sq km',
    population: 'Approx. 2.5 million',
    coordinates: { lat: 11.8745, lng: 75.3704 },
    nearestAirport: 'Kannur International Airport (CNN) - 25 km',
    historicalSummary: 'Historically known as Cannanore, Kannur was an ancient port city ruled by the Kolathiri Rajas. It was the only Muslim Sultanate in Kerala, the Arakkal Kingdom, who ruled nearby islands. St. Angelo Fort was built here in 1505 by the Portuguese explorer Francisco de Almeida.',
    keyFacts: [
      'Known as the \'Land of Looms and Lore\' (famous for handlooms and Theyyam rituals).',
      'Home to Muzhappilangad Beach, Asia\'s longest drive-in beach.',
      'St. Angelo Fort and the Arakkal Palace reflect its diverse colonial history.',
      'Major center for theyyam performances, which are sacred ritual dances.'
    ]
  },
  {
    id: 'dist-14',
    name: 'Kasaragod',
    slug: 'kasaragod',
    description:
      'Kerala\'s northernmost frontier — Bekal Fort, Valiyaparamba backwaters, Ananthapura Lake Temple (the only lake temple in India), and the land of seven languages.',
    destinationCount: 2,
    image: '/api/placeholder/800/600',
    hq: 'Kasaragod',
    established: '24 May 1984',
    area: '1,992 sq km',
    population: 'Approx. 1.3 million',
    coordinates: { lat: 12.5102, lng: 74.9852 },
    nearestAirport: 'Mangalore International Airport (IXE) - 55 km',
    historicalSummary: 'Kasaragod was historically under the Kolathiri Rajas and later the Vijayanagara Empire. In the 17th century, the Keladi Nayakas built several forts in the region, including the Bekal Fort. It was later administered by Mysore rulers and then the British.',
    keyFacts: [
      'Northernmost district of Kerala, bordering Karnataka.',
      'Known as the \'Land of Seven Languages\' (Sapthabhasha Sangamabhoomi).',
      'Home to Bekal Fort, the largest and best-preserved fort in Kerala.',
      'Hosts the Ananthapura Lake Temple, the only lake temple in Kerala, historically guarded by a vegetarian crocodile.'
    ]
  },
];

// ── Seasons (3) ─────────────────────────────────────────────

export const seasons: Season[] = [
  {
    id: 'season-01',
    name: 'Monsoon Season',
    slug: 'monsoon',
    months: 'June – September',
    description:
      'Kerala transforms into a lush green paradise during the monsoon. Two monsoons — the southwest (Edavappathi) and northeast — drench the land, filling waterfalls to their thundering peak and turning the Western Ghats into a verdant spectacle. This is Ayurveda\'s golden season, when humidity opens the body\'s pores for maximum absorption of herbal treatments. Off-season rates make luxury resorts surprisingly accessible.',
    weather: 'Heavy to moderate rainfall, overcast skies, intermittent sunshine',
    temperature: '22°C – 30°C',
    activities: [
      'Ayurvedic Panchakarma treatments',
      'Waterfall chasing (Athirappilly, Meenmutty)',
      'Monsoon trekking in Wayanad',
      'Rain-drenched photography',
      'Kathakali and Theyyam performances',
      'Monsoon cuisine festivals',
    ],
    destinations: ['munnar', 'wayanad', 'athirappilly', 'thekkady', 'vagamon'],
    packingSuggestions: [
      'Sturdy, windproof umbrella and high-quality raincoat or poncho.',
      'Quick-dry, synthetic clothing rather than heavy denims.',
      'Waterproof backpack covers and Ziploc bags for protecting phones and passports.',
      'Waterproof footwear with non-slip rubber soles (aquashoes or trekking sandals).',
      'Leech-guard socks if planning any nature walks.'
    ],
    travelGuidelines: [
      'Check daily weather and landslide warnings before traveling to high-altitude areas like Munnar and Wayanad.',
      'Avoid swimming in sea beaches or rivers as currents are extremely treacherous during the monsoon.',
      'Keep buffer days in your itinerary, as heavy rains can lead to temporary road closures.',
      'Avail Ayurvedic treatments only from government-accredited (Green Leaf/Olive Leaf) wellness centers.'
    ]
  },
  {
    id: 'season-02',
    name: 'Winter Season',
    slug: 'winter',
    months: 'October – February',
    description:
      'The peak tourist season brings clear blue skies, pleasantly cool temperatures in the highlands, and the ideal conditions for backwater cruises and beach holidays. Migratory birds arrive at Kumarakom and Thattekad sanctuaries. The festival calendar peaks with Onam (if in October), Christmas in Fort Kochi, and New Year celebrations on Kovalam Beach. This is the perfect window to experience every facet of Kerala.',
    weather: 'Clear skies, mild and pleasant, occasional light showers',
    temperature: '18°C – 33°C',
    activities: [
      'Houseboat cruises in Alleppey & Kumarakom',
      'Beach holidays at Kovalam & Varkala',
      'Wildlife safaris in Thekkady & Gavi',
      'Birdwatching at Kumarakom Bird Sanctuary',
      'Hill station stays in Munnar & Wayanad',
      'Festival celebrations (Christmas, New Year)',
    ],
    destinations: ['alleppey', 'kumarakom', 'kovalam', 'varkala', 'munnar', 'kochi'],
    packingSuggestions: [
      'Light woolen layers, fleece, or cardigans for early mornings and nights in hill stations.',
      'Comfortable cotton clothing for coastal and plains exploration during daytime.',
      'Swimwear, sunglasses, and high-quality sunblock for the beaches.',
      'Binoculars and zoom lens cameras for birdwatching and wildlife safaris.',
      'Hand sanitizers, light walking shoes.'
    ],
    travelGuidelines: [
      'Book houseboats, flights, and resorts at least 3-4 months in advance as this is the peak peak-season.',
      'Expect larger crowds at popular heritage spots like Fort Kochi and Kovalam Beach.',
      'Plan wildlife safaris early in the morning for the best chances of animal sightings.'
    ]
  },
  {
    id: 'season-03',
    name: 'Summer Season',
    slug: 'summer',
    months: 'March – May',
    description:
      'While the lowlands warm up, Kerala\'s hill stations — Munnar, Wayanad, Vagamon, and Ponmudi — offer a refreshing escape with temperatures staying well below 25°C. Summer is the best time for trekking, with clear trails and excellent visibility from mountain summits. The famous Thrissur Pooram festival (April/May) draws massive crowds with its spectacular elephant processions and fireworks. Beaches are quieter, and homestay deals abound.',
    weather: 'Warm and humid in lowlands, cool and pleasant in highlands',
    temperature: '25°C – 36°C (lowlands) / 12°C – 25°C (highlands)',
    activities: [
      'Hill station retreats',
      'Trekking in Chembra Peak & Ponmudi',
      'Thrissur Pooram festival',
      'Waterfall visits (reduced flow but accessible)',
      'Spice plantation tours in Thekkady',
      'Summer camp adventures for families',
    ],
    destinations: ['munnar', 'wayanad', 'vagamon', 'ponmudi', 'nelliyampathy', 'chembra-peak'],
    packingSuggestions: [
      'Extremely light, breathable linen or cotton garments to cope with humidity.',
      'Wide-brimmed sun hats, sunglasses, and strong UV-protective sunscreen.',
      'Electrolyte packets (ORS) and a reusable insulated water bottle.',
      'Comfortable hiking sandals and lightweight sneakers.',
      'Light cotton sheets or towels.'
    ],
    travelGuidelines: [
      'Stay hydrated; drink coconut water (Elaneer) and lime water frequently.',
      'Avoid outdoor activities during peak sun hours (12 PM to 3 PM) in coastal areas.',
      'Excellent time for budget travelers as luxury resorts offer heavy discounts.',
      'Book Thrissur Pooram tickets and accommodation well in advance if visiting in April/May.'
    ]
  },
];

// ── Experiences (8) ─────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: 'exp-01',
    name: 'Backwater Cruises',
    slug: 'backwater-cruises',
    icon: '🚤',
    description:
      'Drift through Kerala\'s enchanting network of palm-fringed canals, tranquil lagoons, and shimmering lakes aboard traditional kettuvallams (houseboats) fitted with modern amenities. Wake to misty sunrises over Vembanad Lake, savour freshly cooked Kerala cuisine on deck, and watch village life unfold along the banks.',
    image: '/api/placeholder/800/600',
    destinations: ['alleppey', 'kumarakom', 'poovar', 'bekal'],
  },
  {
    id: 'exp-02',
    name: 'Hill Station Retreats',
    slug: 'hill-station-retreats',
    icon: '⛰️',
    description:
      'Escape to mist-wrapped peaks, rolling tea plantations, and cool pine forests in Kerala\'s Western Ghat highlands. From the world-famous tea gardens of Munnar to the secret meadows of Vagamon, these elevated havens offer rejuvenation, adventure, and spectacular vistas that stretch to the horizon.',
    image: '/api/placeholder/800/600',
    destinations: ['munnar', 'wayanad', 'vagamon', 'ponmudi', 'nelliyampathy'],
  },
  {
    id: 'exp-03',
    name: 'Beach Holidays',
    slug: 'beach-holidays',
    icon: '🏖️',
    description:
      'Kerala\'s 580 km coastline presents an extraordinary diversity of beach experiences — from the cliff-perched bohemian vibe of Varkala to the serene fishing-village charm of Marari and the resort-studded crescents of Kovalam. Swim, surf, snorkel, or simply recline under a palm and let the Arabian Sea serenade you.',
    image: '/api/placeholder/800/600',
    destinations: ['kovalam', 'varkala', 'marari', 'bekal', 'poovar'],
  },
  {
    id: 'exp-04',
    name: 'Wildlife Safari',
    slug: 'wildlife-safari',
    icon: '🐘',
    description:
      'Venture deep into some of India\'s most biodiverse forests. Watch elephants bathe at the edge of Periyar Lake, track lion-tailed macaques through Silent Valley\'s ancient canopy, and spot the endangered Nilgiri tahr on Eravikulam\'s misty slopes. Kerala\'s wildlife sanctuaries are living corridors of conservation.',
    image: '/api/placeholder/800/600',
    destinations: ['thekkady', 'eravikulam', 'gavi', 'silent-valley', 'wayanad'],
  },
  {
    id: 'exp-05',
    name: 'Ayurveda & Wellness',
    slug: 'ayurveda-wellness',
    icon: '🧘',
    description:
      'Kerala is the birthplace of Ayurveda, the world\'s oldest holistic healing system. Immerse yourself in Panchakarma detox programmes, therapeutic oil massages (Abhyanga, Shirodhara), yoga retreats overlooking the ocean, and herbal cuisine designed to balance your doshas. The monsoon season is considered the ideal time for treatments.',
    image: '/api/placeholder/800/600',
    destinations: ['kovalam', 'varkala', 'kumarakom', 'marari', 'alleppey'],
  },
  {
    id: 'exp-06',
    name: 'Adventure Sports',
    slug: 'adventure-sports',
    icon: '🪂',
    description:
      'From paragliding over Vagamon\'s rolling meadows to bamboo rafting through Periyar\'s forests, Kerala offers a thrilling array of adventure activities. Trek to the heart-shaped lake on Chembra Peak, abseil down Athirappilly\'s canyon walls, kayak through mangrove tunnels in Poovar, or mountain-bike along Munnar\'s tea-trail switchbacks.',
    image: '/api/placeholder/800/600',
    destinations: ['vagamon', 'chembra-peak', 'wayanad', 'thenmala', 'athirappilly'],
  },
  {
    id: 'exp-07',
    name: 'Cultural Heritage',
    slug: 'cultural-heritage',
    icon: '🏛️',
    description:
      'Kerala\'s cultural tapestry is woven from centuries of global trade and spiritual tradition. Watch Kathakali performers transform into mythological characters with elaborate costumes and expressive mudras, witness the hypnotic fire rituals of Theyyam, explore Fort Kochi\'s colonial mosaic, and discover ancient synagogues, mosques, and churches standing side by side.',
    image: '/api/placeholder/800/600',
    destinations: ['kochi', 'bekal', 'alleppey', 'thekkady'],
  },
  {
    id: 'exp-08',
    name: 'Food & Spice Tours',
    slug: 'food-spice-tours',
    icon: '🌶️',
    description:
      'Kerala is the Spice Coast that once drew traders from Rome, Arabia, and China. Walk through cardamom, pepper, cinnamon, and vanilla plantations in Thekkady and Wayanad. Learn to cook traditional Malabar biryani, savour appam and stew at heritage homestays, taste toddy straight from the palm, and discover why Kerala\'s cuisine is one of the most nuanced in all of India.',
    image: '/api/placeholder/800/600',
    destinations: ['thekkady', 'wayanad', 'kochi', 'munnar', 'nelliyampathy'],
  },
];

// ── Testimonials (6) ────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    id: 'test-01',
    name: 'Sophia Laurent',
    avatar: 'https://ui-avatars.com/api/?name=Sophia+Laurent&background=random',
    location: 'Paris, France',
    rating: 5,
    text: 'Our houseboat cruise through Alleppey was the most magical experience of our honeymoon. Gliding through palm-fringed canals while feasting on fresh karimeen — it felt like a dream. The crew prepared an incredible candlelit dinner on deck under the stars. I\'ve travelled extensively, but Kerala has captured a piece of my heart forever.',
    tripType: 'Honeymoon',
    date: '2025-12-15',
  },
  {
    id: 'test-02',
    name: 'James O\'Brien',
    avatar: 'https://ui-avatars.com/api/?name=James+OBrien&background=random',
    location: 'Melbourne, Australia',
    rating: 5,
    text: 'Munnar exceeded every expectation. We stayed at a heritage bungalow overlooking endless tea gardens, trekked through Eravikulam spotting Nilgiri tahr, and ended each day with cardamom-infused chai watching the sunset paint the hills gold. The TravelWithUs itinerary was flawless — every detail was perfectly planned.',
    tripType: 'Adventure',
    date: '2026-01-22',
  },
  {
    id: 'test-03',
    name: 'Priya Venkatesh',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Venkatesh&background=random',
    location: 'Bangalore, India',
    rating: 4,
    text: 'The 14-day Ayurveda Panchakarma programme in Kovalam genuinely transformed my health. After years of chronic back pain, the combination of Abhyanga massages, Kizhi treatments, and yoga sessions gave me relief I hadn\'t thought possible. The doctor was incredibly knowledgeable, and the food — oh, the sattvic cuisine was divine!',
    tripType: 'Wellness Retreat',
    date: '2026-03-08',
  },
  {
    id: 'test-04',
    name: 'Michael Chen',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=random',
    location: 'Singapore',
    rating: 5,
    text: 'We took our kids (ages 8 and 11) to Thekkady and Athirappilly. The bamboo rafting on Periyar Lake where we saw a herd of wild elephants was unforgettable — my daughter still talks about it every day. Athirappilly Falls was absolutely thunderous during the tail end of monsoon season. Best family trip we\'ve ever had.',
    tripType: 'Family Holiday',
    date: '2025-10-05',
  },
  {
    id: 'test-05',
    name: 'Amara Okafor',
    avatar: 'https://ui-avatars.com/api/?name=Amara+Okafor&background=random',
    location: 'Lagos, Nigeria',
    rating: 5,
    text: 'Wayanad\'s Edakkal Caves were a revelation — Neolithic petroglyphs in a tropical mountain setting! The trek to Chembra Peak and the heart-shaped lake was challenging but absolutely worth it. Our tribal village homestay was the highlight, learning about indigenous medicinal plants and sharing meals cooked over a wood fire.',
    tripType: 'Cultural Explorer',
    date: '2026-02-14',
  },
  {
    id: 'test-06',
    name: 'Elena Vasquez',
    avatar: 'https://ui-avatars.com/api/?name=Elena+Vasquez&background=random',
    location: 'Barcelona, Spain',
    rating: 5,
    text: 'I came to Varkala for a week-long yoga retreat and ended up staying a month. The cliff-top view of the Arabian Sea at sunset is something I\'ll carry with me forever. The local Ayurvedic doctor helped me design a daily routine that I still follow back home. Kerala doesn\'t just give you a holiday — it gives you a new perspective on life.',
    tripType: 'Solo Travel',
    date: '2026-04-20',
  },
];

// ── Blog Posts (4) ──────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-01',
    title: '10 Hidden Gems in Kerala That Most Tourists Never Discover',
    slug: '10-hidden-gems-kerala',
    excerpt:
      'Beyond the well-trodden trails of Munnar and Alleppey lie secret destinations that will redefine your idea of Kerala. From Gavi\'s exclusive night safaris to Nelliyampathy\'s phantom rocks, here are 10 hidden gems that deserve a spot on your Kerala bucket list.',
    image: '/api/placeholder/800/600',
    author: 'Arjun Menon',
    date: '2026-05-12',
    readTime: '8 min read',
    category: 'Travel Guide',
  },
  {
    id: 'blog-02',
    title: 'The Ultimate Kerala Monsoon Guide: Why Rainy Season Is the Best Season',
    slug: 'ultimate-kerala-monsoon-guide',
    excerpt:
      'Most tourists avoid Kerala during the monsoon — and that\'s exactly why you shouldn\'t. Discover why June to September is the best time for Ayurveda treatments, waterfall chasing, and experiencing Kerala\'s dramatic green transformation at a fraction of peak-season prices.',
    image: '/api/placeholder/800/600',
    author: 'Lakshmi Nair',
    date: '2026-06-01',
    readTime: '6 min read',
    category: 'Seasonal',
  },
  {
    id: 'blog-03',
    title: 'A Food Lover\'s Road Trip Through Kerala\'s Spice Coast',
    slug: 'food-lovers-road-trip-spice-coast',
    excerpt:
      'From the fiery Malabar biryani of Kozhikode to the toddy-shop fish fry of Alleppey and the cardamom-laced tea of Munnar, we drove 800 km through Kerala tasting our way from north to south. Here\'s our definitive food lover\'s itinerary with all the stops, dishes, and insider tips.',
    image: '/api/placeholder/800/600',
    author: 'Rahul Krishnan',
    date: '2026-04-18',
    readTime: '10 min read',
    category: 'Food & Culture',
  },
  {
    id: 'blog-04',
    title: 'Planning Your First Kerala Houseboat Experience: Everything You Need to Know',
    slug: 'first-kerala-houseboat-experience-guide',
    excerpt:
      'Choosing the right houseboat, picking the best route, understanding pricing tiers (standard vs. premium vs. luxury), and knowing when to book — this comprehensive guide covers every question first-timers have about the iconic Kerala houseboat cruise.',
    image: '/api/placeholder/800/600',
    author: 'Deepa Mohan',
    date: '2026-03-25',
    readTime: '7 min read',
    category: 'How-To',
  },
];

// ── Packing Recommendations ──────────────────────────────────

export const packingRecommendations: PackingRecommendation[] = [
  {
    region: 'Highlands',
    season: 'All Seasons',
    generalGuidelines: [
      'Layering is key in the highlands as temperature shifts dramatically between daytime sun and night mist.',
      'Always pack rain protection regardless of the season since localized mountain showers are common.',
      'Protect against insect bites in forested or plantation areas with long-sleeved clothes.'
    ],
    items: [
      { item: 'Fleece jacket or warm sweater', category: 'Clothing', necessity: 'Essential', notes: 'Especially for Munnar, Wayanad, and Vagamon where night temperatures dip to 10°C.' },
      { item: 'Sturdy trekking boots or trail shoes', category: 'Footwear', necessity: 'Essential', notes: 'With good grip for loose gravel, damp soil, and steep plantation trails.' },
      { item: 'Moisture-wicking active wear', category: 'Clothing', necessity: 'Recommended', notes: 'Keeps you dry and comfortable during uphill climbs.' },
      { item: 'Leech protection socks', category: 'Clothing', necessity: 'Recommended', notes: 'Highly recommended for deep forest trekking during or post-monsoon.' },
      { item: 'Insect repellent spray/cream', category: 'Personal Care', necessity: 'Essential', notes: 'Protects against mosquitoes and forest bugs.' },
      { item: 'Motion sickness tablets', category: 'Medical', necessity: 'Recommended', notes: 'Very useful for negotiating multiple hairpin bends on mountain ghat roads.' },
      { item: 'Insulated reusable water bottle', category: 'Gear', necessity: 'Essential', notes: 'Keeps water cold or hot tea warm during long outdoor treks.' }
    ]
  },
  {
    region: 'Coastline & Backwaters',
    season: 'All Seasons',
    generalGuidelines: [
      'Loose-fitting, natural fiber garments are your best defense against coastal humidity.',
      'Sun safety is crucial; the tropical sun reflects intensely off water and white sand.',
      'Be respectful of local sensibilities by using cover-ups when away from the main resort beach areas.'
    ],
    items: [
      { item: 'Light cotton or linen shirts/trousers', category: 'Clothing', necessity: 'Essential', notes: 'Breathable fabric to manage high tropical humidity.' },
      { item: 'Swimwear and rash guards', category: 'Clothing', necessity: 'Essential', notes: 'For beach swimming, water sports, and pool lounging.' },
      { item: 'Broad-spectrum UV sunscreen (SPF 50+)', category: 'Personal Care', necessity: 'Essential', notes: 'Preferably reef-safe to prevent environmental damage.' },
      { item: 'Polarized sunglasses', category: 'Gear', necessity: 'Recommended', notes: 'Reduces intense water glare during backwater and beach activities.' },
      { item: 'Wide-brimmed sun hat', category: 'Clothing', necessity: 'Recommended', notes: 'Shields face and neck from midday heat.' },
      { item: 'Water-resistant sandals/flip-flops', category: 'Footwear', necessity: 'Essential', notes: 'Easy to remove when boarding houseboats or canoes.' },
      { item: 'Waterproof dry bag', category: 'Gear', necessity: 'Recommended', notes: 'Protects cameras, phones, and wallets from water splashes during boat rides.' }
    ]
  },
  {
    region: 'Wildlife & Forest',
    season: 'All Seasons',
    generalGuidelines: [
      'Avoid bright colors that can startle or attract animals; blend into the environment.',
      'Cover your skin fully to prevent scratches from dense brush and bites from forest insects.',
      'Silence is golden: carry gear that doesn\'t make rustling noises when moving.'
    ],
    items: [
      { item: 'Earth-toned clothing (khaki, olive, brown)', category: 'Clothing', necessity: 'Essential', notes: 'Helps you blend into the natural surroundings on safaris.' },
      { item: 'Ankle-length hiking trousers', category: 'Clothing', necessity: 'Essential', notes: 'Protects against forest thorns, nettles, and insects.' },
      { item: 'High-power binoculars', category: 'Gear', necessity: 'Recommended', notes: 'Crucial for viewing birds, elephants, and canopy-dwelling primates.' },
      { item: 'Compact LED flashlight/headlamp', category: 'Gear', necessity: 'Essential', notes: 'Required for night safaris and early morning trails.' },
      { item: 'Antiseptic wipes and cream', category: 'Medical', necessity: 'Recommended', notes: 'For quick cleaning of minor cuts or insect bites.' },
      { item: 'Camera with telephoto lens', category: 'Gear', necessity: 'Optional', notes: 'Great for documenting bird species and distant mammals.' }
    ]
  },
  {
    region: 'All Kerala',
    season: 'Monsoon',
    generalGuidelines: [
      'Waterproofing everything is the main priority during the heavy downpours.',
      'Synthetic, quick-drying fabrics are much easier to manage than thick denim or cotton.',
      'Check local alerts daily for rainfall or wind updates.'
    ],
    items: [
      { item: 'Heavy-duty windproof umbrella', category: 'Gear', necessity: 'Essential', notes: 'Standard umbrellas can fold in strong coastal monsoon gusts.' },
      { item: 'Breathable waterproof raincoat or poncho', category: 'Clothing', necessity: 'Essential', notes: 'Keeps hands free for photography or hiking.' },
      { item: 'Quick-dry synthetic clothing', category: 'Clothing', necessity: 'Essential', notes: 'Polyester or nylon fabrics that dry quickly in high humidity.' },
      { item: 'Silica gel packs', category: 'Gear', necessity: 'Recommended', notes: 'Keep inside camera bags and passport pouches to absorb moisture.' },
      { item: 'Waterproof phone pouch', category: 'Gear', necessity: 'Essential', notes: 'Enables taking photos in rain without damaging the screen.' },
      { item: 'Anti-fungal dusting powder', category: 'Medical', necessity: 'Recommended', notes: 'Helps keep feet dry and prevents infections from wearing wet shoes.' }
    ]
  }
];
