import {
  CurrencyCode,
  CurrencyConfig,
  Airport,
  ExclusiveDeal,
  PopularDestination,
  ServiceItem,
  UmrahPackage,
  HotelItem,
  TestimonialItem,
  BlogPost,
  FlightOption
} from '../types';
import { ALL_WORLD_AIRPORTS, IATA_REGION_OPTIONS } from './airportsData';

export { ALL_WORLD_AIRPORTS, IATA_REGION_OPTIONS };

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  SAR: {
    code: 'SAR',
    symbol: 'SAR',
    rateFromUSD: 3.75,
    name: 'Saudi Riyal (ر.س)'
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rateFromUSD: 1.0,
    name: 'US Dollar ($)'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rateFromUSD: 0.92,
    name: 'Euro (€)'
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rateFromUSD: 0.78,
    name: 'British Pound (£)'
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    rateFromUSD: 3.67,
    name: 'UAE Dirham (د.إ)'
  }
};

export const AIRPORTS: Airport[] = ALL_WORLD_AIRPORTS;

export const SERVICES: ServiceItem[] = [
  {
    id: 'flights',
    title: 'Flight Booking',
    titleAr: 'حجوزات الطيران',
    subtitle: 'Direct & Codeshare Global Flights',
    description: 'Instant ticketing across 300+ accredited international airlines with special negotiated fares, flexible date changes, and 24/7 rebooking support.',
    iconName: 'Plane',
    features: ['Real-time seat availability', 'Complimentary baggage upgrade', 'Instant e-ticket generation', '24/7 disruption assistance'],
    ctaText: 'Find Flights'
  },
  {
    id: 'hotels',
    title: 'Hotel Reservations',
    titleAr: 'حجوزات الفنادق',
    subtitle: 'Over 850,000 Verified Properties',
    description: 'From 5-star luxury beachfront resorts to executive city suites. Enjoy confirmed room allocations, free cancellation options, and exclusive amenities.',
    iconName: 'Building2',
    features: ['Best rate guarantee', 'Pay at hotel options', 'Exclusive member discounts', 'Verified guest reviews'],
    ctaText: 'Explore Hotels'
  },
  {
    id: 'holidays',
    title: 'Holiday Packages',
    titleAr: 'الباقات السياحية',
    subtitle: 'Custom Tailored Global Escapes',
    description: 'All-inclusive curated vacations combining flights, private luxury transfers, handpicked boutique stays, and VIP sightseeing excursions.',
    iconName: 'Palmtree',
    features: ['Curated itineraries', 'Private English/Arabic guides', 'Flexible payment plans', 'Bespoke honeymoon tours'],
    ctaText: 'View Packages'
  },
  {
    id: 'visa',
    title: 'Visa Assistance',
    titleAr: 'خدمات التأشيرات',
    subtitle: 'Fast-Track Official Embassy Processing',
    description: 'Expert documentation, appointment scheduling, and rapid visa application handling for Schengen, UK, USA, Canada, Japan, and GCC eVisa.',
    iconName: 'FileCheck2',
    features: ['99.4% approval success rate', 'Document pre-screening', 'Expedited biometric appointments', 'End-to-end tracking'],
    ctaText: 'Apply for Visa'
  },
  {
    id: 'umrah',
    title: 'Umrah & Religious Travel',
    titleAr: 'باقات العمرة والزيارة',
    subtitle: 'Blessed Journeys with Haram Views',
    description: 'Authorized pilgrim packages featuring walking-distance luxury hotels in Makkah & Madinah, private GMC Yukon transfers, and Nusuk permit assistance.',
    iconName: 'MoonStar',
    features: ['Footsteps from the Holy Haram', 'Private VIP ground fleet', 'Guided Ziyarah historical tours', 'Nusuk permit support'],
    ctaText: 'Umrah Packages'
  },
  {
    id: 'corporate',
    title: 'Corporate Travel',
    titleAr: 'سفر الشركات والأعمال',
    subtitle: 'Enterprise Travel Management',
    description: 'Dedicated corporate account managers, consolidated monthly invoicing, flexible corporate airline corporate rates, and 24/7 executive desk.',
    iconName: 'Briefcase',
    features: ['Custom travel policy enforcement', 'Consolidated monthly billing', 'Dedicated account manager', 'Duty of care travel tracking'],
    ctaText: 'Corporate Desk'
  }
];

export const EXCLUSIVE_DEALS: ExclusiveDeal[] = [
  {
    id: 'deal-dubai',
    destination: 'Dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    routeCode: 'RUH → DXB',
    originCode: 'RUH',
    priceUSD: 189,
    originalPriceUSD: 290,
    discountPercentage: 35,
    airline: 'Saudia & Flydubai',
    airlineCode: 'SV / FZ',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    tag: 'Weekend Special',
    category: 'Middle East'
  },
  {
    id: 'deal-istanbul',
    destination: 'Istanbul',
    city: 'Istanbul',
    country: 'Turkey',
    routeCode: 'JED → IST',
    originCode: 'JED',
    priceUSD: 245,
    originalPriceUSD: 360,
    discountPercentage: 32,
    airline: 'Turkish Airlines',
    airlineCode: 'TK',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
    tag: 'Most Popular',
    category: 'Europe'
  },
  {
    id: 'deal-london',
    destination: 'London',
    city: 'London',
    country: 'United Kingdom',
    routeCode: 'RUH → LHR',
    originCode: 'RUH',
    priceUSD: 460,
    originalPriceUSD: 690,
    discountPercentage: 33,
    airline: 'British Airways',
    airlineCode: 'BA',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    tag: 'Limited Seats',
    category: 'Europe'
  },
  {
    id: 'deal-kuala-lumpur',
    destination: 'Kuala Lumpur',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    routeCode: 'JED → KUL',
    originCode: 'JED',
    priceUSD: 395,
    originalPriceUSD: 570,
    discountPercentage: 30,
    airline: 'Malaysia Airlines',
    airlineCode: 'MH',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    tag: 'Family Favorite',
    category: 'Asia'
  },
  {
    id: 'deal-bangkok',
    destination: 'Bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    routeCode: 'RUH → BKK',
    originCode: 'RUH',
    priceUSD: 420,
    originalPriceUSD: 610,
    discountPercentage: 31,
    airline: 'Saudia & Thai Airways',
    airlineCode: 'SV / TG',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
    tag: 'Tropical Season',
    category: 'Asia'
  },
  {
    id: 'deal-doha',
    destination: 'Doha',
    city: 'Doha',
    country: 'Qatar',
    routeCode: 'AHB → DOH',
    originCode: 'AHB',
    priceUSD: 165,
    originalPriceUSD: 240,
    discountPercentage: 31,
    airline: 'Qatar Airways',
    airlineCode: 'QR',
    image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
    tag: 'Direct Route',
    category: 'Middle East'
  },
  {
    id: 'deal-paris',
    destination: 'Paris',
    city: 'Paris',
    country: 'France',
    routeCode: 'RUH → CDG',
    originCode: 'RUH',
    priceUSD: 485,
    originalPriceUSD: 720,
    discountPercentage: 33,
    airline: 'Air France',
    airlineCode: 'AF',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    tag: 'Romantic City',
    category: 'Europe'
  },
  {
    id: 'deal-riyadh',
    destination: 'Riyadh',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    routeCode: 'DXB → RUH',
    originCode: 'DXB',
    priceUSD: 155,
    originalPriceUSD: 230,
    discountPercentage: 32,
    airline: 'Saudia / Flynas',
    airlineCode: 'SV / XY',
    image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=800&q=80',
    tag: 'Business Hub',
    category: 'Middle East'
  }
];

export const POPULAR_DESTINATIONS: PopularDestination[] = [
  {
    id: 'dest-dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    airportCode: 'DXB',
    description: 'Iconic skyline, luxury shopping, desert safari safaris, and legendary world-class hospitality.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    startingPriceUSD: 189,
    bestTimeToVisit: 'Nov - Apr',
    temperature: '26°C',
    highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Desert Dunes']
  },
  {
    id: 'dest-istanbul',
    city: 'Istanbul',
    country: 'Turkey',
    airportCode: 'IST',
    description: 'The historic bridge where continents meet, crowned with ancient mosques and the azure Bosphorus.',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
    startingPriceUSD: 245,
    bestTimeToVisit: 'Apr - Jun',
    temperature: '21°C',
    highlights: ['Hagia Sophia', 'Bosphorus Cruise', 'Grand Bazaar', 'Galata Tower']
  },
  {
    id: 'dest-london',
    city: 'London',
    country: 'United Kingdom',
    airportCode: 'LHR',
    description: 'Royal palaces, West End theaters, picturesque parks, and timeless British architectural grandeur.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    startingPriceUSD: 460,
    bestTimeToVisit: 'May - Sep',
    temperature: '19°C',
    highlights: ['Big Ben & Westminster', 'Hyde Park', 'Tower Bridge', 'Covent Garden']
  },
  {
    id: 'dest-kuala-lumpur',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    airportCode: 'KUL',
    description: 'A vibrant Asian metropolis blending towering twin landmarks, lush gardens, and rich culinary delights.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    startingPriceUSD: 395,
    bestTimeToVisit: 'Year-Round',
    temperature: '29°C',
    highlights: ['Petronas Towers', 'Batu Caves', 'Bukit Bintang', 'Genting Highlands']
  },
  {
    id: 'dest-paris',
    city: 'Paris',
    country: 'France',
    airportCode: 'CDG',
    description: 'The City of Light, celebrated for world-renowned fashion, romantic boulevards, and haute cuisine.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    startingPriceUSD: 485,
    bestTimeToVisit: 'Apr - Oct',
    temperature: '22°C',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Champs-Élysées', 'Seine River Cruise']
  },
  {
    id: 'dest-bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    airportCode: 'BKK',
    description: 'Exotic golden temples, floating markets, rooftop panoramas, and celebrated Thai hospitality.',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
    startingPriceUSD: 420,
    bestTimeToVisit: 'Nov - Feb',
    temperature: '28°C',
    highlights: ['Grand Palace', 'Wat Arun', 'Chao Phraya River', 'Siam Paragon']
  }
];

export const UMRAH_PACKAGES: UmrahPackage[] = [
  {
    id: 'umrah-vip-clock',
    title: 'VIP Platinum Haram View Package',
    duration: '10 Days / 9 Nights',
    nightsMakkah: 5,
    nightsMadinah: 4,
    makkahHotel: 'Fairmont Makkah Clock Royal Tower',
    makkahHotelDistance: 'Zero distance (direct courtyard access)',
    madinahHotel: 'Dar Al Taqwa Hotel Madinah',
    madinahHotelDistance: 'Footsteps to Prophet\'s Mosque (Ladies Gate)',
    hotelRating: 5,
    inclusions: [
      'Round-trip scheduled flights on Saudia',
      'VIP Haram Kaaba view suites with breakfast buffet',
      'Private luxury GMC Yukon chauffeured transfers',
      'Dedicated Saudi licensed religious guide (Ziyarah)',
      'Official Nusuk Umrah permit & Rawdah booking support',
      'Zamzam 5L water gift per pilgrim at airport'
    ],
    priceUSD: 1450,
    featuredBadge: 'Most Prestigious',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'umrah-deluxe-swiss',
    title: 'Deluxe Family Haram Comfort Package',
    duration: '8 Days / 7 Nights',
    nightsMakkah: 4,
    nightsMadinah: 3,
    makkahHotel: 'Swissôtel Al Maqam Makkah',
    makkahHotelDistance: 'Direct elevator into Haram Piazza',
    madinahHotel: 'The Oberoi Madinah',
    madinahHotelDistance: '50m from Prophet’s Mosque',
    hotelRating: 5,
    inclusions: [
      'Direct airline flights with 2x23kg baggage allowance',
      'Interconnecting family suites with daily buffet',
      'Private Mercedes Sprinter executive transfers',
      'Full-day historical Ziyarah in Makkah & Madinah',
      '24/7 bilingual ground coordinator throughout the trip',
      'Fast-track medical & travel insurance included'
    ],
    priceUSD: 980,
    featuredBadge: 'Family Choice',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'umrah-spiritual-economy',
    title: 'Premium Classic Spiritual Journey',
    duration: '7 Days / 6 Nights',
    nightsMakkah: 4,
    nightsMadinah: 2,
    makkahHotel: 'Mövenpick Hotel & Residences Hajar Tower',
    makkahHotelDistance: 'Clock Tower Complex, 1 min walk',
    madinahHotel: 'Anwar Al Madinah Mövenpick',
    madinahHotelDistance: 'Adjacent to Northern Haram courtyard',
    hotelRating: 5,
    inclusions: [
      'Confirmed airline tickets with flexible change policy',
      'Comfortable 5-star standard room with breakfast',
      'Air-conditioned VIP express coach between Holy Cities',
      'Official Umrah electronic visa issuance',
      'Experienced group scholar guidance'
    ],
    priceUSD: 720,
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80'
  }
];

export const HOTELS: HotelItem[] = [
  {
    id: 'hotel-ritz-riyadh',
    name: 'The Ritz-Carlton, Riyadh',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 1420,
    pricePerNightUSD: 380,
    originalPriceUSD: 520,
    amenities: ['Palatial Gardens', 'Indoor Heated Pool', 'Fine Dining', 'Free High-speed Wi-Fi', 'Airport Limousine'],
    tag: 'Royal Luxury'
  },
  {
    id: 'hotel-burj-dubai',
    name: 'Jumeirah Al Naseem, Madinat Jumeirah',
    city: 'Dubai',
    country: 'United Arab Emirates',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    rating: 4.95,
    reviewsCount: 2180,
    pricePerNightUSD: 490,
    originalPriceUSD: 680,
    amenities: ['Private Beach Access', 'Wild Wadi Waterpark Access', 'Michelin-starred dining', 'Full Spa'],
    tag: 'Beachfront Icon'
  },
  {
    id: 'hotel-savoy-london',
    name: 'The Savoy, Strand',
    city: 'London',
    country: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    rating: 4.88,
    reviewsCount: 3100,
    pricePerNightUSD: 560,
    originalPriceUSD: 780,
    amenities: ['Thames River Views', 'Gordon Ramsay Grill', 'Butler Service', 'Historic Cocktail Bar'],
    tag: 'Heritage Legend'
  },
  {
    id: 'hotel-mandarin-bangkok',
    name: 'Mandarin Oriental, Bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    rating: 4.92,
    reviewsCount: 1980,
    pricePerNightUSD: 390,
    originalPriceUSD: 540,
    amenities: ['Chao Phraya Riverfront', 'Award-Winning Spa', 'Private Boat Shuttles', 'French Gastronomy'],
    tag: 'River Oasis'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Eng. Khalid Al-Shehri',
    cityCountry: 'Abha, Saudi Arabia',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    tripType: 'Family Vacation',
    route: 'Abha to London via Riyadh',
    review: 'T4TICKETS handled our family flight to Heathrow seamlessly. The ticket price was cheaper than booking directly on airline apps, and their customer support in Asir answered our WhatsApp queries within 2 minutes!',
    date: 'March 2026'
  },
  {
    id: 'test-2',
    name: 'Dr. Tariq Mansoor',
    cityCountry: 'Jeddah, Saudi Arabia',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    tripType: 'VIP Umrah Package',
    route: 'Makkah Clock Tower & Madinah Taqwa',
    review: 'We booked the VIP Platinum Umrah package for my elderly parents. The private GMC transfer from Jeddah airport directly to the Fairmont was punctual, and the Nusuk permit assistance made the prayer access effortless. Truly top-tier.',
    date: 'February 2026'
  },
  {
    id: 'test-3',
    name: 'Sarah Jenkins',
    cityCountry: 'Manchester, UK',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    tripType: 'Holiday & Visa',
    route: 'London to Dubai & Saudi Tourism',
    review: 'The Saudi eVisa and multi-city flights arranged by T4TICKETS were issued in under 24 hours. Flawless flight connections and the best customer support team I have dealt with internationally.',
    date: 'January 2026'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Saudi Arabia & Schengen Visa Updates 2026: Fast-Track Rules for Travelers',
    category: 'Visa Updates',
    readTime: '4 min read',
    date: 'Sep 15, 2026',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Comprehensive breakdown of recent bilateral visa waiver protocols, digital biometric stamping, and multi-entry tourist guidelines.',
    author: 'T4 Visa Specialist Team'
  },
  {
    id: 'blog-2',
    title: 'How to Choose Between Direct and Transit Flights: Maximizing Comfort & Miles',
    category: 'Travel Tips',
    readTime: '5 min read',
    date: 'Sep 10, 2026',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Airline loyalty perks, optimal layover times in Hamad and Dubai International, and insider tips for smooth transit experiences.',
    author: 'Capt. Faisal Al-Omari'
  },
  {
    id: 'blog-3',
    title: 'The Essential 2026 Umrah Preparation Guide: Nusuk Permits, Packing & Sacred Etiquette',
    category: 'Destination Guides',
    readTime: '6 min read',
    date: 'Sep 02, 2026',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Everything you need to ensure a peaceful spiritual pilgrimage: timings for Rawdah Mubarak, hotel proximity tips, and Ihram checklists.',
    author: 'Religious Affairs Advisory'
  }
];

export const STATS = [
  { number: 500000, suffix: '+', label: 'Happy Travelers', desc: 'Booked and flown across all continents' },
  { number: 150, suffix: '+', label: 'Countries Covered', desc: 'Worldwide visa and flight connections' },
  { number: 300, suffix: '+', label: 'Airline Partners', desc: 'IATA-certified carrier ticketing' },
  { number: 15, suffix: '+', label: 'Years Experience', desc: 'Pioneering Saudi and international travel' }
];

export const MOCK_FLIGHT_RESULTS: FlightOption[] = [
  {
    id: 'FL-SV-104',
    airline: 'Saudia',
    airlineCode: 'SV',
    flightNumber: 'SV 104',
    logoColor: '#006C35',
    from: AIRPORTS[0], // RUH
    to: AIRPORTS[5], // DXB
    departureTime: '08:30',
    arrivalTime: '11:20',
    duration: '1h 50m',
    stops: 0,
    priceUSD: 189,
    cabinClass: 'economy',
    seatsLeft: 4,
    aircraft: 'Boeing 787-9 Dreamliner',
    baggage: '1x 23kg Checked + 7kg Cabin',
    refundable: true
  },
  {
    id: 'FL-EK-816',
    airline: 'Emirates',
    airlineCode: 'EK',
    flightNumber: 'EK 816',
    logoColor: '#D71921',
    from: AIRPORTS[0],
    to: AIRPORTS[5],
    departureTime: '11:15',
    arrivalTime: '14:05',
    duration: '1h 50m',
    stops: 0,
    priceUSD: 215,
    cabinClass: 'economy',
    seatsLeft: 7,
    aircraft: 'Airbus A380-800',
    baggage: '1x 30kg Checked + 7kg Cabin',
    refundable: true
  },
  {
    id: 'FL-QR-1165',
    airline: 'Qatar Airways',
    airlineCode: 'QR',
    flightNumber: 'QR 1165',
    logoColor: '#5C0632',
    from: AIRPORTS[0],
    to: AIRPORTS[5],
    departureTime: '15:40',
    arrivalTime: '19:55',
    duration: '3h 15m',
    stops: 1,
    stopoverCity: 'Doha (DOH)',
    priceUSD: 172,
    cabinClass: 'economy',
    seatsLeft: 3,
    aircraft: 'Airbus A350-900',
    baggage: '1x 25kg Checked + 7kg Cabin',
    refundable: false
  },
  {
    id: 'FL-FZ-842',
    airline: 'Flydubai',
    airlineCode: 'FZ',
    flightNumber: 'FZ 842',
    logoColor: '#FF6B00',
    from: AIRPORTS[0],
    to: AIRPORTS[5],
    departureTime: '18:50',
    arrivalTime: '21:40',
    duration: '1h 50m',
    stops: 0,
    priceUSD: 158,
    cabinClass: 'economy',
    seatsLeft: 9,
    aircraft: 'Boeing 737 MAX 8',
    baggage: '1x 20kg Checked + 7kg Cabin',
    refundable: false
  }
];
