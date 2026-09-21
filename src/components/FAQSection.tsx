import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  MessageSquare,
  Sparkles,
  Plane,
  MoonStar,
  FileCheck,
  CreditCard,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export interface FAQItem {
  id: string;
  category: 'flights' | 'umrah' | 'visas' | 'medical' | 'general';
  question: string;
  answer: string;
  keyPoints?: string[];
  recommendedAction?: {
    label: string;
    whatsappMessage: string;
  };
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'flights',
    question: 'How do I get the cheapest airline tickets with T4 TICKETS?',
    answer: 'T4 TICKETS compares real-time IATA fares across Saudia, PIA, Emirates, Qatar Airways, Flynas, Flyadeal, and Gulf Air to offer up to 35% discounted group and corporate rates. You can search instantly on our platform or contact our 24/7 WhatsApp desk for unadvertised wholesale seat allocations.',
    keyPoints: [
      'IATA Accredited Agency with direct airline GDS connectivity',
      'Flexible date comparisons (±3 days) to lock the lowest fare',
      'Free baggage allowance advice (PIA 40kg, Saudia 2x 23kg, Emirates 30kg)'
    ],
    recommendedAction: {
      label: 'Request Lowest Fare on WhatsApp',
      whatsappMessage: 'Hello Muhammad Aamir Aziz (T4 Tickets), I want to find the cheapest ticket for my route.'
    }
  },
  {
    id: 'faq-2',
    category: 'umrah',
    question: 'What is included in the T4 TICKETS VIP Umrah Packages?',
    answer: 'Our VIP and Economy Umrah Packages are all-inclusive: confirmed direct flights, verified 5-star or 3-star hotel accommodations close to the Holy Kaaba in Makkah and the Prophet’s Mosque in Madinah, private GMC or high-speed Haramain bullet train transfers, electronic Umrah Nusuk visa issuance, and 24/7 ground assistance.',
    keyPoints: [
      'Hotels within 0-250 meters walking distance to Haram',
      'Personalized Ziyarat tours in Makkah and Madinah with certified guides',
      'Flexible packages for individuals, families, and corporate groups'
    ],
    recommendedAction: {
      label: 'Customize Umrah Package',
      whatsappMessage: 'Assalam u Alaikum Muhammad Aamir Aziz, I would like to inquire about customized Umrah packages.'
    }
  },
  {
    id: 'faq-3',
    category: 'visas',
    question: 'How fast can T4 TICKETS process Saudi Visit & Tourist Visas?',
    answer: 'T4 TICKETS processes Saudi electronic tourist visas (e-Visa), multiple-entry family visit visas, commercial business visas, and transit visas with rapid turnarounds—often within 24 to 48 hours for eligible nationalities, complete with mandatory medical insurance.',
    keyPoints: [
      'Authorized visa service provider for GCC, Pakistan, and worldwide travellers',
      'Assistance with documentation, insurance, and embassy attestations',
      'Instant tracking and WhatsApp updates throughout application'
    ],
    recommendedAction: {
      label: 'Check Visa Eligibility',
      whatsappMessage: 'Hello, I want to check my visa eligibility and processing time with T4 Tickets.'
    }
  },
  {
    id: 'faq-4',
    category: 'medical',
    question: 'What is the Wafid (GAMCA) GCC Medical Test service?',
    answer: 'The Wafid (formerly GAMCA) medical examination is compulsory for employment and long-term residence visas across Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, and Oman. T4 TICKETS generates official Wafid medical appointment slips within 15 minutes, assigns accredited diagnostic centers in your city, and provides full pre-departure guidance.',
    keyPoints: [
      'Instant generation of official Wafid appointment slip',
      'Guidance on required documents, passport validity, and vaccination certificates',
      'Assistance in major cities across Pakistan, India, and other departure hubs'
    ],
    recommendedAction: {
      label: 'Book Wafid Medical Slip',
      whatsappMessage: 'Hello Muhammad Aamir Aziz, I need an official Wafid GAMCA medical appointment slip.'
    }
  },
  {
    id: 'faq-5',
    category: 'general',
    question: 'Who is Muhammad Aamir Aziz and how can I contact T4 TICKETS directly?',
    answer: 'Muhammad Aamir Aziz is the principal executive and authorized travel specialist behind T4 TICKETS AND TRAVEL SERVICES. Clients can contact him directly via Saudi WhatsApp (+966 50 267 4930), Pakistan WhatsApp (+92 301 7355753), or email (T4tickets@gmail.com) for prompt quotes, ticket reissuances, and emergency flight support 24/7.',
    keyPoints: [
      'KSA Line: +966 50 267 4930 (Calls & WhatsApp)',
      'Pakistan Line: +92 301 7355753 (Calls & WhatsApp)',
      'Direct email: T4tickets@gmail.com with guaranteed response under 30 minutes'
    ],
    recommendedAction: {
      label: 'Chat Directly on WhatsApp',
      whatsappMessage: 'Hello Muhammad Aamir Aziz, I am contacting you directly from T4Tickets.com.'
    }
  },
  {
    id: 'faq-6',
    category: 'flights',
    question: 'What are the baggage allowances on popular airlines from Saudi Arabia to Pakistan?',
    answer: 'Baggage rules vary by airline and ticket class: PIA generally provides 40 kg (2 pieces of 20 kg or 1 piece of 30 kg + 10 kg depending on route), Saudia provides 2 pieces of 23 kg each (total 46 kg) in Economy, and budget carriers like Flynas and Flyadeal offer tier-based 20 kg or 30 kg checked bags. T4 TICKETS always confirms exact baggage allowances prior to ticket issuance.',
    keyPoints: [
      'Checked baggage allowances clearly marked on every T4 electronic itinerary',
      'Assistance with pre-purchasing extra kilograms at discounted agent rates',
      'Free Zamzam water allowance (5 Liters) on return Umrah journeys'
    ],
    recommendedAction: {
      label: 'Verify Flight Baggage Allowance',
      whatsappMessage: 'Hello, please confirm the baggage allowance and fare for my flight booking.'
    }
  }
];

export const FAQSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'flights' | 'umrah' | 'visas' | 'medical' | 'general'>('all');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        (faq.keyPoints && faq.keyPoints.some((p) => p.toLowerCase().includes(query)));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="faq-section"
      className="py-16 bg-white border-t border-gray-100 relative overflow-hidden"
      aria-labelledby="faq-main-heading"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-50/50 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E53935]/10 text-[#E53935] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Answer Engine Optimization &amp; Client Knowledge Base</span>
          </div>
          <h2
            id="faq-main-heading"
            className="text-2xl sm:text-4xl font-black text-[#071A3D] font-heading tracking-tight"
          >
            Frequently Asked Questions &amp; Travel Guide
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
            Instant, factual answers about cheap flight tickets, Umrah VIP packages, visit visas, Wafid medical tests, and direct contact with Muhammad Aamir Aziz.
          </p>

          {/* Instant Search Bar */}
          <div className="mt-6 relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="faq-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flights, Umrah, visas, Wafid medical, or baggage rules..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#E53935] focus:bg-white transition-all shadow-sm"
              aria-label="Search frequently asked questions"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Questions', icon: Sparkles },
              { id: 'flights', label: 'Flights & Baggage', icon: Plane },
              { id: 'umrah', label: 'VIP Umrah', icon: MoonStar },
              { id: 'visas', label: 'Visas & Entry', icon: FileCheck },
              { id: 'medical', label: 'Wafid GCC Medical', icon: CheckCircle2 },
              { id: 'general', label: 'Contact & Muhammad Aamir Aziz', icon: PhoneCall }
            ].map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#071A3D] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto" role="region" aria-label="FAQ Accordion">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
              <HelpCircle className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-700">No matching answers found</p>
              <p className="text-xs text-gray-500 mt-1">
                Have a specific question? Ask our AI Travel Assistant or chat directly on WhatsApp.
              </p>
              <a
                href="https://wa.me/966502674930?text=Hello%20Muhammad%20Aamir%20Aziz,%20I%20have%20a%20question"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow hover:bg-[#20ba59] transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Ask Muhammad Aamir Aziz on WhatsApp</span>
              </a>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <article
                  key={faq.id}
                  id={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#E53935]/40 shadow-lg shadow-gray-100'
                      : 'bg-gray-50/70 border-gray-200 hover:bg-white hover:border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935]"
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-answer`}
                  >
                    <span className="font-extrabold text-sm sm:text-base text-[#071A3D] leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-[#E53935] text-white rotate-180' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`${faq.id}-answer`}
                      className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4"
                    >
                      <p className="text-gray-700 font-medium">{faq.answer}</p>

                      {faq.keyPoints && faq.keyPoints.length > 0 && (
                        <div className="mt-3.5 bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                            Quick Facts &amp; Requirements:
                          </span>
                          <ul className="space-y-1.5">
                            {faq.keyPoints.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {faq.recommendedAction && (
                        <div className="mt-4 flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-gray-100">
                          <span className="text-[11px] text-gray-400">
                            Need personalized assistance with this?
                          </span>
                          <a
                            href={`https://wa.me/966502674930?text=${encodeURIComponent(faq.recommendedAction.whatsappMessage)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-bold text-xs hover:bg-[#20ba59] transition-all shadow-sm"
                          >
                            <MessageSquare className="w-3.5 h-3.5 fill-current" />
                            <span>{faq.recommendedAction.label}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>

        {/* Quick Contact Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-[#071A3D] via-[#0A2458] to-[#071A3D] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E53935] flex items-center justify-center shrink-0 shadow-lg">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black font-heading leading-tight">
                Direct Travel Desk with Muhammad Aamir Aziz
              </h4>
              <p className="text-xs text-gray-300 mt-0.5">
                Urgent ticket bookings, Umrah visa processing, and 24/7 client dispatch.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="tel:+966502674930"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2"
            >
              <span>Call KSA: +966 50 267 4930</span>
            </a>
            <a
              href="https://wa.me/966502674930?text=Hello%20Muhammad%20Aamir%20Aziz,%20I%20need%20urgent%20flight%20or%20Umrah%20booking"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Booking Desk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
