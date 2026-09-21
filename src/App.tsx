import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LogoColorTheme } from './components/T4Logo';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { CheckCircle2 } from 'lucide-react';

// Dynamic imports (Code-splitting for non-essential below-the-fold sections)
const FeaturedServices = lazy(() =>
  import('./components/FeaturedServices').then((m) => ({ default: m.FeaturedServices }))
);
const ExclusiveDeals = lazy(() =>
  import('./components/ExclusiveDeals').then((m) => ({ default: m.ExclusiveDeals }))
);
const UmrahPackages = lazy(() =>
  import('./components/UmrahPackages').then((m) => ({ default: m.UmrahPackages }))
);
const WhyChooseUs = lazy(() =>
  import('./components/WhyChooseUs').then((m) => ({ default: m.WhyChooseUs }))
);
const FAQSection = lazy(() =>
  import('./components/FAQSection').then((m) => ({ default: m.FAQSection }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);

// Dynamic imports for heavy interactive modals (Only fetched on-demand)
const FlightSearchResultsModal = lazy(() =>
  import('./components/FlightSearchResultsModal').then((m) => ({
    default: m.FlightSearchResultsModal
  }))
);
const AuthModal = lazy(() =>
  import('./components/AuthModal').then((m) => ({ default: m.AuthModal }))
);
const InquiryModal = lazy(() =>
  import('./components/InquiryModal').then((m) => ({ default: m.InquiryModal }))
);
const SmartTravelAssistantModal = lazy(() =>
  import('./components/SmartTravelAssistantModal').then((m) => ({
    default: m.SmartTravelAssistantModal
  }))
);

import {
  CurrencyCode,
  LanguageCode,
  FlightSearchQuery,
  FlightOption,
  ExclusiveDeal,
  UmrahPackage
} from './types';
import { AIRPORTS, MOCK_FLIGHT_RESULTS } from './data/travelData';

// Lightweight skeleton placeholder for below-the-fold deferred sections
const SectionSkeleton = () => (
  <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-200/80 rounded-md w-48 mx-auto" />
      <div className="h-4 bg-gray-200/60 rounded-md w-72 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="h-48 bg-gray-200/50 rounded-2xl" />
        <div className="h-48 bg-gray-200/50 rounded-2xl" />
        <div className="h-48 bg-gray-200/50 rounded-2xl" />
      </div>
    </div>
  </div>
);

export default function App() {
  const [currency, setCurrency] = useState<CurrencyCode>('SAR');
  const [language, setLanguage] = useState<LanguageCode>('EN');
  const [brandColor, setBrandColor] = useState<LogoColorTheme>('gold');

  // Modals state
  const [flightModalOpen, setFlightModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySubject, setInquirySubject] = useState('Flight & Travel Inquiry');

  // Unified Smart Travel Assistant state
  const [assistantModalOpen, setAssistantModalOpen] = useState(false);
  const [assistantInitialTab, setAssistantInitialTab] = useState<'chat' | 'planner'>('chat');

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

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchFlights = (query: FlightSearchQuery) => {
    setSearchQuery(query);

    const tripTypeLabel =
      query.tripType === 'roundTrip'
        ? 'Round Trip (دو طرفہ)'
        : query.tripType === 'oneWay'
        ? 'One Way (ایک طرفہ)'
        : 'Multi City';

    const cabinLabel =
      query.cabinClass === 'economy'
        ? 'Economy Class'
        : query.cabinClass === 'business'
        ? 'Business Class'
        : 'First Class';

    const travelersText = `${query.passengers.adults} Adult(s)${
      query.passengers.children > 0 ? `, ${query.passengers.children} Child(ren)` : ''
    }${query.passengers.infants > 0 ? `, ${query.passengers.infants} Infant(s)` : ''}`;

    const textLines = [
      '✈️ *New Flight Inquiry - T4 TICKETS & TRAVEL SERVICES*',
      '',
      'Assalam-o-Alaikum Muhammad Aamir Aziz,',
      'I want to inquire about flight tickets & lowest fares for the following dates:',
      '',
      `🛫 *From:* ${query.from.city} (${query.from.code}) - ${query.from.country}`,
      `🛬 *To:* ${query.to.city} (${query.to.code}) - ${query.to.country}`,
      `🔄 *Trip Type:* ${tripTypeLabel}`,
      `📅 *Departure Date:* ${query.departureDate}`,
      ...(query.tripType !== 'oneWay' && query.returnDate
        ? [`🔙 *Return Date:* ${query.returnDate}`]
        : []),
      `👥 *Travelers:* ${travelersText}`,
      `💺 *Cabin Class:* ${cabinLabel}`,
      `⚡ *Direct Flights Only:* ${query.directFlightsOnly ? 'Yes' : 'Any Airline'}`,
      ...(query.flexibleDates ? ['📆 *Dates:* Flexible (±3 Days)'] : []),
      '',
      'Please check and send the best available airline fares and ticket options. Thank you!'
    ];

    const message = textLines.join('\n');
    const whatsappUrl = `https://wa.me/966502674930?text=${encodeURIComponent(message)}`;

    showToast('✈️ فلائٹ کی تمام تفصیلات اور تاریخیں براہِ راست واٹس ایپ پر ارسال کی جا رہی ہیں...');

    // Open WhatsApp directly with the complete flight inquiry
    window.open(whatsappUrl, '_blank');
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

  // ESC key listener to close active modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFlightModalOpen(false);
        setAuthModalOpen(false);
        setInquiryModalOpen(false);
        setAssistantModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
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
        onOpenAssistant={(tab) => {
          setAssistantInitialTab(tab || 'chat');
          setAssistantModalOpen(true);
        }}
      />

      {/* Main Content Sections - Fast, Light, and Clean */}
      <main className="flex-1">
        {/* HERO SECTION with Flight Search Engine & Instant Fast Routes */}
        <HeroSection onSearchFlights={handleSearchFlights} />

        {/* Deferred Below-The-Fold Sections Loaded via Code-Splitting */}
        <Suspense fallback={<SectionSkeleton />}>
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
        </Suspense>
      </main>

      {/* FOOTER */}
      <Suspense fallback={<div className="h-40 bg-[#071A3D]" />}>
        <Footer
          onNavigate={handleNavigate}
          onOpenInquiry={handleOpenInquiry}
          onOpenAssistant={() => {
            setAssistantInitialTab('chat');
            setAssistantModalOpen(true);
          }}
          brandColor={brandColor}
        />
      </Suspense>

      {/* Direct WhatsApp Contact - Only WhatsApp Icon */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
        <a
          id="floating-whatsapp-direct-btn"
          href="https://wa.me/966502674930?text=Assalam%20u%20Alaikum%20Muhammad%20Aamir%20Aziz%2C%20I%20want%20to%20book%20a%20ticket%20or%20visa"
          target="_blank"
          rel="noreferrer"
          className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl shadow-[#25D366]/50 hover:scale-110 active:scale-95 transition-all duration-200 group"
          title="Direct WhatsApp Contact - Muhammad Aamir Aziz (+966 50 267 4930)"
          aria-label="Direct WhatsApp Contact"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
          <WhatsAppIcon className="w-8 h-8 sm:w-9 sm:h-9 fill-current relative z-10" />
        </a>
      </div>

      {/* INTERACTIVE MODALS - Loaded On-Demand via Dynamic Imports */}
      {flightModalOpen && (
        <Suspense fallback={null}>
          <FlightSearchResultsModal
            isOpen={flightModalOpen}
            onClose={() => setFlightModalOpen(false)}
            searchQuery={searchQuery}
            currency={currency}
            flightResults={currentFlightResults}
          />
        </Suspense>
      )}

      {authModalOpen && (
        <Suspense fallback={null}>
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            initialMode={authMode}
            onLoginSuccess={handleLoginSuccess}
          />
        </Suspense>
      )}

      {inquiryModalOpen && (
        <Suspense fallback={null}>
          <InquiryModal
            isOpen={inquiryModalOpen}
            onClose={() => setInquiryModalOpen(false)}
            serviceTitle={inquirySubject}
          />
        </Suspense>
      )}

      {/* Unified Travel Assistant Modal */}
      {assistantModalOpen && (
        <Suspense fallback={null}>
          <SmartTravelAssistantModal
            isOpen={assistantModalOpen}
            onClose={() => setAssistantModalOpen(false)}
            currentCurrency={currency}
            initialTab={assistantInitialTab}
          />
        </Suspense>
      )}
    </div>
  );
}
