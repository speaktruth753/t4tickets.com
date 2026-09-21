export type CurrencyCode = 'SAR' | 'USD' | 'EUR' | 'GBP' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromUSD: number; // 1 USD = rate
  name: string;
}

export type LanguageCode = 'EN' | 'AR';

export type TripType = 'roundTrip' | 'oneWay' | 'multiCity';

export type CabinClass = 'economy' | 'premiumEconomy' | 'business' | 'first';

export interface Airport {
  code: string;
  city: string;
  name: string;
  country: string;
}

export interface FlightSegment {
  from: Airport;
  to: Airport;
  date: string;
}

export interface FlightSearchQuery {
  tripType: TripType;
  from: Airport;
  to: Airport;
  departureDate: string;
  returnDate: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: CabinClass;
  directFlightsOnly: boolean;
  flexibleDates: boolean;
  multiCitySegments?: FlightSegment[];
}

export interface FlightOption {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  logoColor: string;
  from: Airport;
  to: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopoverCity?: string;
  priceUSD: number;
  cabinClass: CabinClass;
  seatsLeft: number;
  aircraft: string;
  baggage: string;
  refundable: boolean;
}

export interface ExclusiveDeal {
  id: string;
  destination: string;
  city: string;
  country: string;
  routeCode: string;
  originCode: string;
  priceUSD: number;
  originalPriceUSD: number;
  discountPercentage: number;
  airline: string;
  airlineCode: string;
  image: string;
  tag: string;
  category: 'Middle East' | 'Europe' | 'Asia';
}

export interface PopularDestination {
  id: string;
  city: string;
  country: string;
  airportCode: string;
  description: string;
  image: string;
  startingPriceUSD: number;
  bestTimeToVisit: string;
  temperature: string;
  highlights: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  titleAr?: string;
  subtitle: string;
  description: string;
  iconName: string;
  features: string[];
  ctaText: string;
}

export interface UmrahPackage {
  id: string;
  title: string;
  duration: string;
  nightsMakkah: number;
  nightsMadinah: number;
  makkahHotel: string;
  makkahHotelDistance: string;
  madinahHotel: string;
  madinahHotelDistance: string;
  hotelRating: number;
  inclusions: string[];
  priceUSD: number;
  featuredBadge?: string;
  image: string;
}

export interface HotelItem {
  id: string;
  name: string;
  city: string;
  country: string;
  image: string;
  rating: number;
  reviewsCount: number;
  pricePerNightUSD: number;
  originalPriceUSD: number;
  amenities: string[];
  tag: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  cityCountry: string;
  avatar: string;
  rating: number;
  tripType: string;
  route: string;
  review: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Travel Tips' | 'Visa Updates' | 'Destination Guides' | 'Airline News';
  readTime: string;
  date: string;
  image: string;
  excerpt: string;
  author: string;
}
