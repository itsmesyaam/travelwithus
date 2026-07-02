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
  coordinates: { lat: number; lng: number };
  isHiddenGem: boolean;
  isTrending: boolean;
  priceRange: 'budget' | 'mid-range' | 'luxury';
}

export interface District {
  id: string;
  name: string;
  slug: string;
  description: string;
  destinationCount: number;
  image: string;
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
    nearestAirport: 'Cochin International Airport (110 km)',
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
    coordinates: { lat: 10.0889, lng: 77.0595 },
    isHiddenGem: false,
    isTrending: true,
    priceRange: 'mid-range',
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
    nearestAirport: 'Cochin International Airport (75 km)',
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
    coordinates: { lat: 9.4981, lng: 76.3388 },
    isHiddenGem: false,
    isTrending: true,
    priceRange: 'luxury',
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
    nearestAirport: 'Calicut International Airport (100 km)',
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
    coordinates: { lat: 11.6854, lng: 76.132 },
    isHiddenGem: false,
    isTrending: true,
    priceRange: 'mid-range',
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
    nearestAirport: 'Trivandrum International Airport (15 km)',
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
    coordinates: { lat: 8.3988, lng: 76.9782 },
    isHiddenGem: false,
    isTrending: false,
    priceRange: 'mid-range',
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
    nearestAirport: 'Trivandrum International Airport (42 km)',
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
    coordinates: { lat: 8.7333, lng: 76.7167 },
    isHiddenGem: false,
    isTrending: true,
    priceRange: 'budget',
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
    nearestAirport: 'Cochin International Airport (30 km)',
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
    coordinates: { lat: 9.9312, lng: 76.2673 },
    isHiddenGem: false,
    isTrending: false,
    priceRange: 'mid-range',
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
    nearestAirport: 'Madurai Airport (136 km)',
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
    coordinates: { lat: 9.6003, lng: 77.1747 },
    isHiddenGem: false,
    isTrending: false,
    priceRange: 'mid-range',
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
    nearestAirport: 'Cochin International Airport (85 km)',
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
    coordinates: { lat: 9.5921, lng: 76.4307 },
    isHiddenGem: false,
    isTrending: false,
    priceRange: 'luxury',
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
    nearestAirport: 'Cochin International Airport (55 km)',
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
    coordinates: { lat: 10.2855, lng: 76.57 },
    isHiddenGem: false,
    isTrending: true,
    priceRange: 'budget',
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
    nearestAirport: 'Mangalore International Airport (50 km)',
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
    coordinates: { lat: 12.3928, lng: 75.0337 },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'luxury',
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
    nearestAirport: 'Cochin International Airport (80 km)',
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
    coordinates: { lat: 9.5942, lng: 76.2889 },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'luxury',
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
    nearestAirport: 'Cochin International Airport (100 km)',
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
    coordinates: { lat: 9.6862, lng: 76.9064 },
    isHiddenGem: true,
    isTrending: true,
    priceRange: 'budget',
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
    nearestAirport: 'Trivandrum International Airport (61 km)',
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
    coordinates: { lat: 8.7576, lng: 77.1154 },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'budget',
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
    nearestAirport: 'Coimbatore Airport (80 km)',
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
    coordinates: { lat: 10.5274, lng: 76.6854 },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'budget',
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
    nearestAirport: 'Cochin International Airport (175 km)',
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
    coordinates: { lat: 9.4064, lng: 77.1408 },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'mid-range',
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
    nearestAirport: 'Trivandrum International Airport (72 km)',
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
    coordinates: { lat: 8.9591, lng: 77.0641 },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'budget',
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
    nearestAirport: 'Trivandrum International Airport (30 km)',
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
    coordinates: { lat: 8.3131, lng: 77.0671 },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'luxury',
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
    nearestAirport: 'Calicut International Airport (95 km)',
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
    coordinates: { lat: 11.5973, lng: 76.0808 },
    isHiddenGem: false,
    isTrending: true,
    priceRange: 'budget',
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
    nearestAirport: 'Cochin International Airport (120 km)',
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
    coordinates: { lat: 10.1723, lng: 77.0611 },
    isHiddenGem: false,
    isTrending: false,
    priceRange: 'budget',
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
    nearestAirport: 'Coimbatore Airport (80 km)',
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
    coordinates: { lat: 11.0833, lng: 76.4333 },
    isHiddenGem: true,
    isTrending: false,
    priceRange: 'budget',
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
  },
  {
    id: 'dist-02',
    name: 'Kollam',
    slug: 'kollam',
    description:
      'The gateway to Kerala\'s backwaters, Kollam offers Ashtamudi Lake cruises, the historic cashew industry, Thenmala eco-tourism, and Jatayu Earth\'s Centre — the world\'s largest bird sculpture.',
    destinationCount: 3,
    image: '/api/placeholder/800/600',
  },
  {
    id: 'dist-03',
    name: 'Pathanamthitta',
    slug: 'pathanamthitta',
    description:
      'The pilgrimage capital of Kerala, home to the famed Sabarimala Ayyappa Temple, the eco-tourism haven of Gavi, and Periyar Tiger Reserve\'s western reaches.',
    destinationCount: 2,
    image: '/api/placeholder/800/600',
  },
  {
    id: 'dist-04',
    name: 'Alappuzha',
    slug: 'alappuzha',
    description:
      'The "Venice of the East" — legendary houseboat cruises, the Nehru Trophy Boat Race, serene Marari Beach, and the vast Vembanad backwater network.',
    destinationCount: 4,
    image: '/api/placeholder/800/600',
  },
  {
    id: 'dist-05',
    name: 'Kottayam',
    slug: 'kottayam',
    description:
      'Kerala\'s land of letters and latex — Kumarakom bird sanctuary, rubber plantations, ancient churches, and the eastern gateway to the Vembanad backwaters.',
    destinationCount: 2,
    image: '/api/placeholder/800/600',
  },
  {
    id: 'dist-06',
    name: 'Idukki',
    slug: 'idukki',
    description:
      'Kerala\'s spice garden and highland wonderland — Munnar tea estates, Thekkady wildlife, Vagamon meadows, and the iconic double-curvature arch dam.',
    destinationCount: 5,
    image: '/api/placeholder/800/600',
  },
  {
    id: 'dist-07',
    name: 'Ernakulam',
    slug: 'ernakulam',
    description:
      'The commercial capital housing cosmopolitan Kochi — Fort Kochi heritage, Chinese fishing nets, Lulu Mall (India\'s largest), and the Kochi-Muziris Biennale.',
    destinationCount: 3,
    image: '/api/placeholder/800/600',
  },
  {
    id: 'dist-08',
    name: 'Thrissur',
    slug: 'thrissur',
    description:
      'Kerala\'s cultural capital — home to the spectacular Thrissur Pooram festival, Athirappilly Falls, Guruvayur Temple, and the Sahitya Akademi (Academy of Letters).',
    destinationCount: 3,
    image: '/api/placeholder/800/600',
  },
  {
    id: 'dist-09',
    name: 'Palakkad',
    slug: 'palakkad',
    description:
      'The granary of Kerala — Palakkad Gap, Nelliyampathy hills, Silent Valley\'s primeval forests, Malampuzha Dam gardens, and rich agrarian heritage.',
    destinationCount: 3,
    image: '/api/placeholder/800/600',
  },
  {
    id: 'dist-10',
    name: 'Malappuram',
    slug: 'malappuram',
    description:
      'A district steeped in Mappila heritage — Nilambur teak forests, Kadalundi bird sanctuary, historic mosques, and the ancient martial art of Kalaripayattu.',
    destinationCount: 2,
    image: '/api/placeholder/800/600',
  },
  {
    id: 'dist-11',
    name: 'Kozhikode',
    slug: 'kozhikode',
    description:
      'The City of Spices where Vasco da Gama first landed in 1498 — Kappad Beach, Kozhikode halwa, Beypore boatbuilding, and the literary heritage of Thakazhi and Vaikom Muhammad Basheer.',
    destinationCount: 3,
    image: '/api/placeholder/800/600',
  },
  {
    id: 'dist-12',
    name: 'Wayanad',
    slug: 'wayanad',
    description:
      'A misty highland district of ancient caves, dense rainforests, tribal settlements, Chembra Peak, and UNESCO-listed Western Ghats biodiversity.',
    destinationCount: 4,
    image: '/api/placeholder/800/600',
  },
  {
    id: 'dist-13',
    name: 'Kannur',
    slug: 'kannur',
    description:
      'The land of looms and lore — Theyyam rituals, St. Angelo Fort, Payyambalam Beach, handloom weaving, and the Malabar freedom movement\'s legacy.',
    destinationCount: 3,
    image: '/api/placeholder/800/600',
  },
  {
    id: 'dist-14',
    name: 'Kasaragod',
    slug: 'kasaragod',
    description:
      'Kerala\'s northernmost frontier — Bekal Fort, Valiyaparamba backwaters, Ananthapura Lake Temple (the only lake temple in India), and the land of seven languages.',
    destinationCount: 2,
    image: '/api/placeholder/800/600',
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
