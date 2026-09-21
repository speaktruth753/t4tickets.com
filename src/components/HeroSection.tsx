import React, { useState, useEffect, useRef } from 'react';
import {
  Plane,
  ArrowRightLeft,
  Calendar,
  Users,
  ChevronDown,
  ShieldCheck,
  Headphones,
  CreditCard,
  Award,
  CheckCircle2,
  MapPin,
  Sparkles,
  Search,
  ArrowRight,
  X
} from 'lucide-react';
import { Airport, CabinClass, FlightSearchQuery, TripType } from '../types';
import { AIRPORTS } from '../data/travelData';
import { formatCabinClassName, formatPassengerCount } from '../utils/formatters';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroSectionProps {
  onSearchFlights: (query: FlightSearchQuery) => void;
  onSelectDealDestination?: (destination: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchFlights }) => {
  const [tripType, setTripType] = useState<TripType>('roundTrip');
  const [fromAirport, setFromAirport] = useState<Airport>(AIRPORTS[0]); // RUH Riyadh
  const [toAirport, setToAirport] = useState<Airport>(AIRPORTS[5]); // DXB Dubai
  const [departureDate, setDepartureDate] = useState<string>('2026-10-15');
  const [returnDate, setReturnDate] = useState<string>('2026-10-22');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabinClass, setCabinClass] = useState<CabinClass>('economy');
  const [directOnly, setDirectOnly] = useState(false);
  const [flexibleDates, setFlexibleDates] = useState(true);

  // Dropdown states
  const [fromPickerOpen, setFromPickerOpen] = useState(false);
  const [toPickerOpen, setToPickerOpen] = useState(false);
  const [travelersPickerOpen, setTravelersPickerOpen] = useState(false);
  const [fromSearchQuery, setFromSearchQuery] = useState('');
  const [toSearchQuery, setToSearchQuery] = useState('');

  // Refs for click outside
  const fromPickerRef = useRef<HTMLDivElement>(null);
  const toPickerRef = useRef<HTMLDivElement>(null);
  const travelersPickerRef = useRef<HTMLDivElement>(null);

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (fromPickerRef.current && !fromPickerRef.current.contains(target)) {
        setFromPickerOpen(false);
      }
      if (toPickerRef.current && !toPickerRef.current.contains(target)) {
        setToPickerOpen(false);
      }
      if (travelersPickerRef.current && !travelersPickerRef.current.contains(target)) {
        setTravelersPickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Swap origin and destination
  const handleSwapAirports = (e: React.MouseEvent) => {
    e.preventDefault();
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
  };

  const filteredFromAirports = AIRPORTS.filter(
    (a) =>
      a.city.toLowerCase().includes(fromSearchQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(fromSearchQuery.toLowerCase()) ||
      a.country.toLowerCase().includes(fromSearchQuery.toLowerCase())
  );

  const filteredToAirports = AIRPORTS.filter(
    (a) =>
      a.city.toLowerCase().includes(toSearchQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(toSearchQuery.toLowerCase()) ||
      a.country.toLowerCase().includes(toSearchQuery.toLowerCase())
  );

  const handleQuickRouteSelect = (fromCode: string, toCode: string) => {
    const fromA = AIRPORTS.find((a) => a.code === fromCode);
    const toA = AIRPORTS.find((a) => a.code === toCode);
    if (fromA && toA) {
      setFromAirport(fromA);
      setToAirport(toA);
      onSearchFlights({
        tripType: 'roundTrip',
        from: fromA,
        to: toA,
        departureDate,
        returnDate,
        passengers,
        cabinClass,
        directFlightsOnly: directOnly,
        flexibleDates: true
      });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchFlights({
      tripType,
      from: fromAirport,
      to: toAirport,
      departureDate,
      returnDate: tripType === 'oneWay' ? '' : returnDate,
      passengers,
      cabinClass,
      directFlightsOnly: directOnly,
      flexibleDates
    });
  };

  return (
    <section id="hero-section" className="relative pt-24 sm:pt-28 pb-10 sm:pb-14 bg-gradient-to-b from-[#071A3D] via-[#0A2458] to-[#071A3D] text-white">
      {/* Lightweight subtle ambient gradient (No heavy image or CPU-draining SVG loops) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Hero Header Typography - Clean & Fast */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-xs font-semibold mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span>Authorized IATA Agency • Chief Executive: محمد عامر عزیز</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-heading">
            Cheapest Airline Tickets, <br className="hidden sm:inline" />
            <span className="text-[#F5D061]">VIP Umrah</span> &amp; Visit Visas
          </h1>
          <p className="mt-2.5 text-xs sm:text-sm text-gray-300 font-normal leading-relaxed max-w-xl mx-auto">
            Compare discounted fares across PIA, Saudia, Emirates, Flynas &amp; AirSial with direct 24/7 WhatsApp e-ticket issuance.
          </p>
        </div>

        {/* Flight Search Engine Container */}
        <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-gray-100 text-[#1B1B1B]">
          {/* Trip Type Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
            <div className="flex items-center bg-gray-100 p-1 rounded-xl">
              {(['roundTrip', 'oneWay', 'multiCity'] as TripType[]).map((type) => {
                const label =
                  type === 'roundTrip' ? 'Round Trip' : type === 'oneWay' ? 'One Way' : 'Multi City';
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTripType(type)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                      tripType === type
                        ? 'bg-[#071A3D] text-white shadow-xs'
                        : 'text-gray-600 hover:text-[#071A3D]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Quick Cabin & Travelers Pill for Small Screens / Header */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1 bg-green-50 text-green-800 border border-green-200 px-2.5 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                Best Price Guarantee
              </span>
              <span className="hidden sm:inline-block text-gray-300">•</span>
              <span className="hidden sm:inline-block text-gray-600">Instant E-Ticket via WhatsApp</span>
            </div>
          </div>

          {/* ⚡ Instant Fast Routes Bar with Live Price Tags */}
          <div className="mt-3.5 pt-2 flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#E53935] shrink-0 bg-[#E53935]/10 px-2.5 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              <span>⚡ Fast Routes:</span>
            </div>
            {[
              { from: 'RUH', to: 'DXB', label: 'Riyadh ⇄ Dubai', price: '189 SAR' },
              { from: 'JED', to: 'LHE', label: 'Jeddah ⇄ Lahore', price: '280 SAR' },
              { from: 'RUH', to: 'ISB', label: 'Riyadh ⇄ Islamabad', price: '310 SAR' },
              { from: 'JED', to: 'CAI', label: 'Jeddah ⇄ Cairo', price: '195 SAR' },
              { from: 'DMM', to: 'KHI', label: 'Dammam ⇄ Karachi', price: '240 SAR' },
              { from: 'MED', to: 'IST', label: 'Madinah ⇄ Istanbul', price: '320 SAR' },
            ].map((route) => (
              <button
                key={`${route.from}-${route.to}`}
                type="button"
                onClick={() => handleQuickRouteSelect(route.from, route.to)}
                className="shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50 hover:bg-[#071A3D] hover:text-white text-gray-700 transition-all border border-gray-200 hover:border-[#071A3D] flex items-center gap-1.5 shadow-2xs group"
                title={`Instantly search flights: ${route.label}`}
              >
                <span>{route.label}</span>
                <span className="text-[10px] font-bold text-[#E53935] group-hover:text-[#F5D061]">{route.price}</span>
              </button>
            ))}
          </div>

          {/* Search Inputs Grid */}
          <form onSubmit={handleSearchSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 relative">
              {/* Flying From */}
              <div ref={fromPickerRef} className="md:col-span-3 relative">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Flying From
                </label>
                <div
                  id="search-from-field"
                  onClick={() => {
                    setFromPickerOpen(!fromPickerOpen);
                    setToPickerOpen(false);
                    setTravelersPickerOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 border cursor-pointer transition-colors ${
                    fromPickerOpen ? 'border-[#071A3D] ring-2 ring-[#071A3D]/10 bg-white' : 'border-gray-200 hover:border-[#071A3D]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Plane className="w-5 h-5 text-[#E53935] shrink-0" />
                    <div className="text-left truncate">
                      <div className="font-extrabold text-sm text-[#071A3D]">
                        {fromAirport.city} ({fromAirport.code})
                      </div>
                      <div className="text-[11px] text-gray-500 truncate">{fromAirport.name}</div>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${fromPickerOpen ? 'rotate-180 text-[#071A3D]' : ''}`} />
                </div>

                {/* From Airport Dropdown */}
                {fromPickerOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-50 max-h-64 overflow-y-auto">
                    <div className="p-2 border-b border-gray-100 flex items-center gap-2">
                      <Search className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="text"
                        placeholder="Search city, airport or code..."
                        value={fromSearchQuery}
                        onChange={(e) => setFromSearchQuery(e.target.value)}
                        className="w-full text-xs outline-none bg-transparent font-medium"
                        autoFocus
                      />
                      {fromSearchQuery && (
                        <button type="button" onClick={() => setFromSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    {filteredFromAirports.map((airport) => (
                      <div
                        key={airport.code}
                        onClick={() => {
                          setFromAirport(airport);
                          setFromPickerOpen(false);
                        }}
                        className={`flex items-center justify-between p-2.5 hover:bg-gray-100 rounded-lg cursor-pointer text-xs ${
                          fromAirport.code === airport.code ? 'bg-blue-50 font-bold' : ''
                        }`}
                      >
                        <div>
                          <span className="font-bold text-[#071A3D]">
                            {airport.city}, {airport.country}
                          </span>
                          <p className="text-[10px] text-gray-500">{airport.name}</p>
                        </div>
                        <span className="font-mono font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded">
                          {airport.code}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Swap Button */}
              <div className="hidden md:flex absolute left-[24.5%] top-[2.2rem] -translate-x-1/2 z-20">
                <button
                  type="button"
                  id="swap-airports-btn"
                  onClick={handleSwapAirports}
                  title="Swap origin and destination"
                  className="w-8 h-8 rounded-full bg-[#071A3D] text-white flex items-center justify-center hover:bg-[#E53935] transition-all duration-300 shadow-md transform hover:rotate-180 active:scale-95"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Flying To */}
              <div ref={toPickerRef} className="md:col-span-3 relative">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Flying To
                </label>
                <div
                  id="search-to-field"
                  onClick={() => {
                    setToPickerOpen(!toPickerOpen);
                    setFromPickerOpen(false);
                    setTravelersPickerOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 border cursor-pointer transition-colors ${
                    toPickerOpen ? 'border-[#071A3D] ring-2 ring-[#071A3D]/10 bg-white' : 'border-gray-200 hover:border-[#071A3D]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <MapPin className="w-5 h-5 text-[#071A3D] shrink-0" />
                    <div className="text-left truncate">
                      <div className="font-extrabold text-sm text-[#071A3D]">
                        {toAirport.city} ({toAirport.code})
                      </div>
                      <div className="text-[11px] text-gray-500 truncate">{toAirport.name}</div>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${toPickerOpen ? 'rotate-180 text-[#071A3D]' : ''}`} />
                </div>

                {/* To Airport Dropdown */}
                {toPickerOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-50 max-h-64 overflow-y-auto">
                    <div className="p-2 border-b border-gray-100 flex items-center gap-2">
                      <Search className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="text"
                        placeholder="Search destination city or code..."
                        value={toSearchQuery}
                        onChange={(e) => setToSearchQuery(e.target.value)}
                        className="w-full text-xs outline-none bg-transparent font-medium"
                        autoFocus
                      />
                      {toSearchQuery && (
                        <button type="button" onClick={() => setToSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    {filteredToAirports.map((airport) => (
                      <div
                        key={airport.code}
                        onClick={() => {
                          setToAirport(airport);
                          setToPickerOpen(false);
                        }}
                        className={`flex items-center justify-between p-2.5 hover:bg-gray-100 rounded-lg cursor-pointer text-xs ${
                          toAirport.code === airport.code ? 'bg-blue-50 font-bold' : ''
                        }`}
                      >
                        <div>
                          <span className="font-bold text-[#071A3D]">
                            {airport.city}, {airport.country}
                          </span>
                          <p className="text-[10px] text-gray-500">{airport.name}</p>
                        </div>
                        <span className="font-mono font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded">
                          {airport.code}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Departure & Return Dates */}
              <div className="md:col-span-3 grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Departure
                  </label>
                  <div className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-200 focus-within:border-[#071A3D]">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-[#071A3D] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Return
                  </label>
                  <div
                    className={`flex items-center p-3 rounded-xl border ${
                      tripType === 'oneWay'
                        ? 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed'
                        : 'bg-gray-50 border-gray-200 focus-within:border-[#071A3D]'
                    }`}
                  >
                    <Calendar className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      disabled={tripType === 'oneWay'}
                      className="w-full bg-transparent text-xs font-bold text-[#071A3D] outline-none disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Travelers & Cabin Class */}
              <div ref={travelersPickerRef} className="md:col-span-3 relative">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Travelers & Cabin
                </label>
                <div
                  id="search-passengers-field"
                  onClick={() => {
                    setTravelersPickerOpen(!travelersPickerOpen);
                    setFromPickerOpen(false);
                    setToPickerOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 border cursor-pointer transition-colors ${
                    travelersPickerOpen ? 'border-[#071A3D] ring-2 ring-[#071A3D]/10 bg-white' : 'border-gray-200 hover:border-[#071A3D]'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Users className="w-4 h-4 text-gray-500 shrink-0" />
                    <div className="truncate text-left">
                      <div className="font-bold text-xs text-[#071A3D]">
                        {formatPassengerCount(passengers)}
                      </div>
                      <div className="text-[11px] text-gray-500 truncate">
                        {formatCabinClassName(cabinClass)}
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${travelersPickerOpen ? 'rotate-180 text-[#071A3D]' : ''}`} />
                </div>

                {/* Travelers & Cabin Popover */}
                {travelersPickerOpen && (
                  <div className="absolute top-full right-0 w-72 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50">
                    <h4 className="font-bold text-xs text-gray-700 uppercase tracking-wider pb-2 border-b">
                      Select Travelers
                    </h4>

                    {/* Adults */}
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <div className="text-xs font-bold text-gray-800">Adults</div>
                        <div className="text-[10px] text-gray-500">Age 12+</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={passengers.adults <= 1}
                          onClick={() =>
                            setPassengers({ ...passengers, adults: Math.max(1, passengers.adults - 1) })
                          }
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-gray-700 disabled:opacity-40 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-xs">{passengers.adults}</span>
                        <button
                          type="button"
                          onClick={() => setPassengers({ ...passengers, adults: passengers.adults + 1 })}
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <div className="text-xs font-bold text-gray-800">Children</div>
                        <div className="text-[10px] text-gray-500">Age 2 - 11</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={passengers.children <= 0}
                          onClick={() =>
                            setPassengers({ ...passengers, children: Math.max(0, passengers.children - 1) })
                          }
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-gray-700 disabled:opacity-40 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-xs">{passengers.children}</span>
                        <button
                          type="button"
                          onClick={() => setPassengers({ ...passengers, children: passengers.children + 1 })}
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Cabin Class */}
                    <div className="mt-3">
                      <div className="text-xs font-bold text-gray-800 mb-1.5">Cabin Class</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {(['economy', 'premiumEconomy', 'business', 'first'] as CabinClass[]).map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setCabinClass(c)}
                            className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold text-center border transition-colors ${
                              cabinClass === c
                                ? 'bg-[#071A3D] text-white border-[#071A3D]'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            {formatCabinClassName(c)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setTravelersPickerOpen(false)}
                      className="mt-3 w-full py-2 rounded-lg bg-[#E53935] hover:bg-[#D62828] text-white text-xs font-bold transition-colors"
                    >
                      Apply Selection
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Row: Advanced Options & Large CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4">
              {/* Checkboxes */}
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={directOnly}
                    onChange={(e) => setDirectOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-[#E53935] focus:ring-[#E53935] accent-[#E53935]"
                  />
                  <span>Direct Flights Only</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={flexibleDates}
                    onChange={(e) => setFlexibleDates(e.target.checked)}
                    className="w-4 h-4 rounded text-[#E53935] focus:ring-[#E53935] accent-[#E53935]"
                  />
                  <span>Flexible Dates (±3 Days)</span>
                </label>
              </div>

              {/* Large Search Flights CTA Button - Direct WhatsApp Inquiry */}
              <button
                type="submit"
                id="search-flights-cta"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
                title="Send flight dates and route directly to WhatsApp (+966 50 267 4930)"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>Search &amp; Send to WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Helper note for direct WhatsApp inquiry */}
            <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shrink-0" />
              <span>
                آپ کی منتخب تاریخیں اور روٹ فوری طور پر واٹس ایپ پر محمد عامر عزیز صاحب (+966 50 267 4930) کو موصول ہو جائیں گے۔
              </span>
            </div>
          </form>
        </div>

        {/* Trust Indicators Bar Below Search */}
        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-white/90">
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-[#E53935]/20 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-[#E53935]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">IATA Certified</div>
              <div className="text-[10px] text-gray-300">Authorized Agency</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4 text-[#16A34A]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">0% Hidden Fees</div>
              <div className="text-[10px] text-gray-300">Direct Airline Pricing</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
              <Headphones className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">24/7 Desk</div>
              <div className="text-[10px] text-gray-300">+966 50 267 4930</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Fast E-Tickets</div>
              <div className="text-[10px] text-gray-300">WhatsApp Dispatch</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
