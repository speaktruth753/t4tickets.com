import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedServices } from './components/FeaturedServices';
import { ExclusiveDeals } from './components/ExclusiveDeals';
import { UmrahPackages } from './components/UmrahPackages';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { LogoColorTheme } from './components/T4Logo';
import { FlightSearchResultsModal } from './components/FlightSearchResultsModal';
import { AuthModal } from './components/AuthModal';
import { InquiryModal } from './components/InquiryModal';
import { AITravelAssistantModal } from './components/AITravelAssistantModal';
import { AISmartItineraryPlanner } from './components/AISmartItineraryPlanner';

import {
  CurrencyCode,
  LanguageCode,
  FlightSearchQuery,
  FlightOption,
  ExclusiveDeal,
  UmrahPackage
} from './types';
import { AIRPORTS, MOCK_FLIGHT_RESULTS } from './data/travelData';
import { CheckCircle2, Phone, MessageSquare, Bot, Sparkles, Wand2, ArrowUp } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState<CurrencyCode>('SAR');
  const [language, setLanguage] = useState<LanguageCode>('EN');
  const [brandColor, setBrandColor] = useState<LogoColorTheme>('red');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Modals state
  const [flightModalOpen, setFlightModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySubject, setInquirySubject] = useState('Flight & Travel Inquiry');

  // AI Features state
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [aiPlannerOpen, setAiPlannerOpen] = useState(false);

  // Logged-in user state
  const [userName, setUserName] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active flight search query
  const [searchQuery, setSearchQuery] = useState<FlightSearchQuery>({
    tripType: 'roundTrip',
    from: AIRPORTS[0], // RUH
    to: AIRPORTS[5], // DXB
    departureDate: '2026-10-15',
    returnDate: '2026-10-22',
    passengers: { adults: 1, children: 0, infants: 0 },
    cabinClass: 'economy',
    directFlightsOnly: false,
    flexibleDates: true
  });

  const [currentFlightResults, setCurrentFlightResults] = useState<FlightOption[]>(MOCK_FLIGHT_RESULTS);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchFlights = (query: FlightSearchQuery) => {
    setSearchQuery(query);

    // Dynamically adjust mock flight prices and airlines to reflect chosen airports
    const dynamicResults: FlightOption[] = [
      {
        id: 'FL-SV-104',
        airline: 'Saudia',
        airlineCode: 'SV',
        flightNumber: 'SV 104',
        logoColor: '#006C35',
        from: query.from,
        to: query.to,
        departureTime: '08:30',
        arrivalTime: '11:15',
        duration: '2h 45m',
        stops: 0,
        priceUSD: 189,
        cabinClass: query.cabinClass,
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
        from: query.from,
        to: query.to,
        departureTime: '12:45',
        arrivalTime: '15:35',
        duration: '2h 50m',
        stops: 0,
        priceUSD: 215,
        cabinClass: query.cabinClass,
        seatsLeft: 6,
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
        from: query.from,
        to: query.to,
        departureTime: '16:20',
        arrivalTime: '20:10',
        duration: '3h 50m',
        stops: 1,
        stopoverCity: 'Doha (DOH)',
        priceUSD: 172,
        cabinClass: query.cabinClass,
        seatsLeft: 3,
        aircraft: 'Airbus A350-900',
        baggage: '1x 25kg Checked + 7kg Cabin',
        refundable: false
      },
      {
        id: 'FL-XY-402',
        airline: 'Flynas',
        airlineCode: 'XY',
        flightNumber: 'XY 402',
        logoColor: '#00A651',
        from: query.from,
        to: query.to,
        departureTime: '20:00',
        arrivalTime: '22:40',
        duration: '2h 40m',
        stops: 0,
        priceUSD: 145,
        cabinClass: query.cabinClass,
        seatsLeft: 8,
        aircraft: 'Airbus A320neo',
        baggage: '1x 20kg Checked + 7kg Cabin',
        refundable: false
      }
    ];

    setCurrentFlightResults(dynamicResults);
    setFlightModalOpen(true);
  };

  const handleBookDeal = (deal: ExclusiveDeal) => {
    // Locate destination airport or fallback
    const targetAirport =
      AIRPORTS.find((a) => a.city.toLowerCase() === deal.city.toLowerCase()) || AIRPORTS[5];
    const originAirport =
      AIRPORTS.find((a) => a.code === deal.originCode) || AIRPORTS[0];

    const dealQuery: FlightSearchQuery = {
      ...searchQuery,
      from: originAirport,
      to: targetAirport,
      departureDate: '2026-11-10',
      returnDate: '2026-11-18'
    };

    handleSearchFlights(dealQuery);
  };

  const handleServiceSelect = (serviceId: string, title: string) => {
    if (serviceId === 'flights') {
      handleNavigate('hero-section');
    } else if (serviceId === 'hotels') {
      handleNavigate('hotels-section');
    } else if (serviceId === 'umrah') {
      handleNavigate('umrah-section');
    } else {
      setInquirySubject(title);
      setInquiryModalOpen(true);
    }
  };

  const handleBookUmrah = (pkg: UmrahPackage) => {
    setInquirySubject(`Umrah Reservation: ${pkg.title}`);
    setInquiryModalOpen(true);
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    showToast(`Welcome to T4TICKETS, ${name}!`);
  };

  const handleOpenInquiry = (subject: string) => {
    setInquirySubject(subject);
    setInquiryModalOpen(true);
  };

  // Performance & UX: Back to top and ESC listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFlightModalOpen(false);
        setAuthModalOpen(false);
        setInquiryModalOpen(false);
        setAiAssistantOpen(false);
        setAiPlannerOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#1B1B1B]">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071A3D] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Floating Action Buttons */}
      {/* Floating WhatsApp Desk (Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          href="https://wa.me/966502674930?text=Hello%20Muhammad%20Aamir%20Aziz%20(T4Tickets),%20I%20want%20to%20inquire%20about%20booking"
          target="_blank"
          rel="noreferrer"
          title="Direct WhatsApp Booking Desk"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-full shadow-xl shadow-green-600/30 hover:scale-105 transition-all text-xs font-bold"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <MessageSquare className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">WhatsApp (+966 50 267 4930)</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>

      {/* Floating AI Travel Copilot (Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setAiAssistantOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#B8860B] via-[#E5BA54] to-[#F7D070] text-[#051433] px-4 py-2.5 rounded-full shadow-xl shadow-[#B8860B]/40 hover:scale-105 transition-all text-xs font-black border border-white/40 group"
          title="Ask T4 AI Travel Advisor"
        >
          <div className="relative">
            <Bot className="w-4 h-4 text-[#051433]" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600" />
            </span>
          </div>
          <span>T4 AI Advisor</span>
          <Sparkles className="w-3.5 h-3.5 text-[#051433] group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 z-40 p-2.5 rounded-full bg-[#071A3D]/90 text-white hover:bg-[#E53935] shadow-xl border border-white/20 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group"
          title="Scroll back to top"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Header */}
      <Header
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        currentLanguage={language}
        onLanguageChange={setLanguage}
        brandColor={brandColor}
        onBrandColorChange={setBrandColor}
        onOpenAuth={handleOpenAuth}
        onNavigate={handleNavigate}
        onOpenInquiry={handleOpenInquiry}
        onOpenAIAssistant={() => setAiAssistantOpen(true)}
        onOpenAIPlanner={() => setAiPlannerOpen(true)}
      />

      {/* Main Content Sections - Fast, Light, and Clean */}
      <main className="flex-1">
        {/* HERO SECTION with Flight Search Engine & Instant Fast Routes */}
        <HeroSection onSearchFlights={handleSearchFlights} />

        {/* FEATURED SERVICES SECTION (Core travel services: Airline tickets, Umrah, Visas, Wafid GCC Medical) */}
        <FeaturedServices onServiceSelect={handleServiceSelect} />

        {/* EXCLUSIVE DEALS SECTION (Curated top flight deals) */}
        <ExclusiveDeals currency={currency} onBookDeal={handleBookDeal} />

        {/* UMRAH & SPECIAL PACKAGES SECTION (VIP 5-Star packages) */}
        <UmrahPackages currency={currency} onBookUmrah={handleBookUmrah} />

        {/* WHY CHOOSE US SECTION (Official IATA accreditation, best price guarantee) */}
        <WhyChooseUs />

        {/* FAQ & SEARCH ENGINE KNOWLEDGE SECTION */}
        <FAQSection />
      </main>

      {/* FOOTER */}
      <Footer
        onNavigate={handleNavigate}
        onOpenInquiry={handleOpenInquiry}
        onOpenAIAssistant={() => setAiAssistantOpen(true)}
        brandColor={brandColor}
      />

      {/* High-Converting Floating Customer Action Desk */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
        {/* Back to Top */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-[#071A3D] text-white shadow-lg border border-white/20 flex items-center justify-center hover:bg-[#E53935] hover:scale-110 active:scale-95 transition-all duration-200"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* WhatsApp Executive Hotline Badge & Button */}
        <a
          href="https://wa.me/966502674930?text=Assalam%20u%20Alaikum%20Muhammad%20Aamir%20Aziz%2C%20I%20want%20to%20book%20a%20ticket%20or%20Umrah%20package."
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-2xl shadow-xl shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all duration-200"
          title="Direct WhatsApp with Chief Executive Muhammad Aamir Aziz"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 fill-current" />
            <span className="w-2.5 h-2.5 rounded-full bg-white absolute -top-1 -right-1 animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-white absolute -top-1 -right-1" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-[11px] font-medium opacity-90 leading-tight">Instant WhatsApp Support</div>
            <div className="text-xs font-black leading-tight tracking-wide">Muhammad Aamir Aziz</div>
          </div>
        </a>
      </div>

      {/* INTERACTIVE MODALS */}
      <FlightSearchResultsModal
        isOpen={flightModalOpen}
        onClose={() => setFlightModalOpen(false)}
        searchQuery={searchQuery}
        currency={currency}
        flightResults={currentFlightResults}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        serviceTitle={inquirySubject}
      />

      {/* AI Modals */}
      <AITravelAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onOpenItineraryPlanner={() => {
          setAiAssistantOpen(false);
          setAiPlannerOpen(true);
        }}
        currentCurrency={currency}
      />

      <AISmartItineraryPlanner
        isOpen={aiPlannerOpen}
        onClose={() => setAiPlannerOpen(false)}
        currentCurrency={currency}
      />
    </div>
  );
}
