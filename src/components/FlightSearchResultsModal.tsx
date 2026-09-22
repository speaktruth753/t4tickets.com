import React, { useState, useEffect } from 'react';
import {
  X,
  Plane,
  Clock,
  Luggage,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Filter,
  Sparkles,
  User,
  Mail,
  Phone,
  CreditCard,
  Download,
  Printer,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CurrencyCode, FlightOption, FlightSearchQuery } from '../types';
import { formatCurrency } from '../utils/formatters';
import { useLanguage } from '../context/LanguageContext';

interface FlightSearchResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: FlightSearchQuery;
  currency: CurrencyCode;
  flightResults: FlightOption[];
}

export const FlightSearchResultsModal: React.FC<FlightSearchResultsModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  currency,
  flightResults
}) => {
  const { language, isRTL } = useLanguage();
  const fontClass = language === 'UR' ? 'font-nastaliq' : language === 'AR' ? 'font-arabic' : 'font-sans';

  const [selectedFlight, setSelectedFlight] = useState<FlightOption | null>(null);
  const [bookingStep, setBookingStep] = useState<'results' | 'passengerForm' | 'ticketConfirmed'>('results');
  const [filterStops, setFilterStops] = useState<'all' | 'direct'>('all');
  const [filterAirline, setFilterAirline] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');

  // Passenger Form State
  const [passengerName, setPassengerName] = useState('Mohammed Al-Ghamdi');
  const [passengerEmail, setPassengerEmail] = useState('m.alghamdi@gmail.com');
  const [passengerPhone, setPassengerPhone] = useState('+966 50 123 4567');
  const [passengerPassport, setPassengerPassport] = useState('A19845209');
  const [pnrCode, setPnrCode] = useState('T4-SV8921');

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const uniqueAirlines = Array.from(new Set(flightResults.map((f) => f.airline)));

  const filteredResults = flightResults
    .filter((f) => (filterStops === 'direct' ? f.stops === 0 : true))
    .filter((f) => (filterAirline === 'all' ? true : f.airline.toLowerCase() === filterAirline.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price') return a.priceUSD - b.priceUSD;
      return a.duration.localeCompare(b.duration);
    });

  const getWhatsAppFlightLink = (flight: FlightOption) => {
    const text = `Assalam u Alaikum Muhammad Aamir Aziz (T4 Tickets),\nI would like to book flight ${flight.airline} (${flight.flightNumber}):\n• Route: ${searchQuery.from.city} (${searchQuery.from.code}) ➔ ${searchQuery.to.city} (${searchQuery.to.code})\n• Date: ${searchQuery.departureDate}\n• Timing: Departure ${flight.departureTime} - Arrival ${flight.arrivalTime}\n• Quoted Fare: ${formatCurrency(flight.priceUSD, currency)}\n• Baggage: ${flight.baggage}\nPlease confirm seat availability and payment instructions.`;
    return `https://wa.me/966502674930?text=${encodeURIComponent(text)}`;
  };

  const handleSelectFlight = (flight: FlightOption) => {
    setSelectedFlight(flight);
    setBookingStep('passengerForm');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomPnr = 'T4-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setPnrCode(randomPnr);
    setBookingStep('ticketConfirmed');

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore if confetti blocked
    }
  };

  const handleReset = () => {
    setBookingStep('results');
    setSelectedFlight(null);
  };

  return (
    <div
      id="flight-search-results-modal"
      className={`fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 ${fontClass}`}
    >
      <div className="relative w-full max-w-4xl bg-[#F7F8FA] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200 my-8">
        {/* Header Bar */}
        <div className="bg-[#071A3D] text-white p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D62828] to-[#E53935] flex items-center justify-center">
              <Plane className="w-5 h-5 text-white transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black font-heading tracking-tight">
                  {searchQuery.from.city} ({searchQuery.from.code})
                </h3>
                <ArrowRight className={`w-4 h-4 text-[#E53935] ${isRTL ? 'rotate-180' : ''}`} />
                <h3 className="text-lg sm:text-xl font-black font-heading tracking-tight">
                  {searchQuery.to.city} ({searchQuery.to.code})
                </h3>
              </div>
              <p className={`text-xs text-gray-300 ${fontClass}`}>
                {searchQuery.departureDate} • {searchQuery.passengers.adults} {language === 'UR' ? 'مسافر' : language === 'AR' ? 'مسافرين' : 'Adult(s)'} •{' '}
                <span className="capitalize">{searchQuery.cabinClass}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Flight Results List */}
        {bookingStep === 'results' && (
          <div className="p-4 sm:p-6 space-y-4">
            {/* Filter Bar */}
            <div className="bg-white p-3 rounded-xl border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#071A3D]" />
                <span className="font-bold text-gray-700">
                  {language === 'UR' ? 'فلٹرز:' : language === 'AR' ? 'تصفية الرحلات:' : 'Filter Flights:'}
                </span>
                <button
                  onClick={() => setFilterStops('all')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    filterStops === 'all' ? 'bg-[#071A3D] text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {language === 'UR' ? `تمام پروازیں (${flightResults.length})` : language === 'AR' ? `جميع الرحلات (${flightResults.length})` : `All Flights (${flightResults.length})`}
                </button>
                <button
                  onClick={() => setFilterStops('direct')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    filterStops === 'direct' ? 'bg-[#071A3D] text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {language === 'UR' ? 'صرف براہ راست (ڈائریکٹ)' : language === 'AR' ? 'رحلات مباشرة فقط' : 'Direct Only'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">
                  {language === 'UR' ? 'ترتیب:' : language === 'AR' ? 'ترتيب حسب:' : 'Sort By:'}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'price' | 'duration')}
                  className="bg-gray-100 border-none font-bold text-gray-800 rounded-lg px-2 py-1 outline-none cursor-pointer"
                >
                  <option value="price">{language === 'UR' ? 'کم ترین قیمت' : language === 'AR' ? 'الأقل سعراً' : 'Lowest Price'}</option>
                  <option value="duration">{language === 'UR' ? 'تیز ترین سفر' : language === 'AR' ? 'الأسرع وقتاً' : 'Fastest Route'}</option>
                </select>
              </div>

              {/* Quick Airline Filter Chips */}
              <div className="w-full flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-gray-100 scrollbar-none">
                <span className="text-[11px] font-bold text-gray-500 shrink-0">
                  {language === 'UR' ? 'ایئر لائن:' : language === 'AR' ? 'شركة الطيران:' : 'Airline:'}
                </span>
                <button
                  onClick={() => setFilterAirline('all')}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    filterAirline === 'all'
                      ? 'bg-[#E53935] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {language === 'UR' ? `سب (${flightResults.length})` : language === 'AR' ? `الكل (${flightResults.length})` : `All (${flightResults.length})`}
                </button>
                {uniqueAirlines.map((airline) => (
                  <button
                    key={airline}
                    onClick={() => setFilterAirline(airline)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                      filterAirline.toLowerCase() === airline.toLowerCase()
                        ? 'bg-[#E53935] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {airline}
                  </button>
                ))}
              </div>
            </div>

            {/* Flight Cards List */}
            <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
              {filteredResults.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-[#071A3D]/40"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Airline & Aircraft info */}
                    <div className="flex items-center gap-3 min-w-[170px]">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white text-xs shadow-sm"
                        style={{ backgroundColor: flight.logoColor }}
                      >
                        {flight.airlineCode}
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-[#071A3D]">{flight.airline}</div>
                        <div className="text-[11px] text-gray-500">{flight.flightNumber} • {flight.aircraft}</div>
                      </div>
                    </div>

                    {/* Flight Timing & Stops */}
                    <div className="flex items-center gap-4 sm:gap-8 flex-1 justify-center">
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <div className="text-lg font-extrabold text-[#071A3D]">{flight.departureTime}</div>
                        <div className="text-xs font-semibold text-gray-600">{searchQuery.from.code}</div>
                        <div className="text-[10px] text-gray-400">{searchQuery.from.city}</div>
                      </div>

                      <div className="flex flex-col items-center flex-1 max-w-[180px]">
                        <span className="text-[11px] font-semibold text-gray-500 mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {flight.duration}
                        </span>
                        <div className="relative w-full flex items-center">
                          <div className="w-2 h-2 rounded-full bg-[#071A3D]" />
                          <div className="h-[2px] w-full bg-gray-300 relative">
                            <Plane className={`w-3.5 h-3.5 text-[#E53935] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isRTL ? 'rotate-180' : ''}`} />
                          </div>
                          <div className="w-2 h-2 rounded-full bg-[#E53935]" />
                        </div>
                        <span
                          className={`text-[10px] font-bold mt-1 ${
                            flight.stops === 0 ? 'text-[#16A34A]' : 'text-amber-600'
                          }`}
                        >
                          {flight.stops === 0
                            ? language === 'UR'
                              ? 'براہ راست (نان اسٹاپ)'
                              : language === 'AR'
                              ? 'مباشر (بدون توقف)'
                              : 'Non-Stop Direct'
                            : language === 'UR'
                            ? `1 اسٹاپ (${flight.stopoverCity})`
                            : language === 'AR'
                            ? `توقف 1 (${flight.stopoverCity})`
                            : `1 Stop (${flight.stopoverCity})`}
                        </span>
                      </div>

                      <div className={isRTL ? 'text-left' : 'text-right'}>
                        <div className="text-lg font-extrabold text-[#071A3D]">{flight.arrivalTime}</div>
                        <div className="text-xs font-semibold text-gray-600">{searchQuery.to.code}</div>
                        <div className="text-[10px] text-gray-400">{searchQuery.to.city}</div>
                      </div>
                    </div>

                    {/* Baggage & Booking CTA */}
                    <div className={`flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 ${isRTL ? 'sm:border-r sm:pr-6' : 'sm:border-l sm:pl-6'} border-gray-100 pt-3 sm:pt-0 gap-2 min-w-[150px]`}>
                      <div className={`text-left ${isRTL ? 'sm:text-left' : 'sm:text-right'}`}>
                        <div className="text-xs text-gray-400">
                          {language === 'UR' ? 'کل کرایہ فی مسافر' : language === 'AR' ? 'السعر الإجمالي للشخص' : 'Total per traveler'}
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-[#E53935]">
                          {formatCurrency(flight.priceUSD, currency)}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                          <Luggage className="w-3 h-3 text-gray-400" />
                          <span>{flight.baggage}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSelectFlight(flight)}
                          className={`px-4 py-2 rounded-xl bg-gradient-to-r from-[#D62828] to-[#E53935] hover:brightness-110 text-white font-bold text-xs shadow-md shadow-[#D62828]/25 flex items-center gap-1.5 transition-all cursor-pointer ${fontClass}`}
                        >
                          <span>{language === 'UR' ? 'منتخب کریں' : language === 'AR' ? 'اختيار' : 'Select'}</span>
                          <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                        </button>
                        <a
                          href={getWhatsAppFlightLink(flight)}
                          target="_blank"
                          rel="noreferrer"
                          title="Instant WhatsApp Booking with Muhammad Aamir Aziz"
                          className="p-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-colors flex items-center justify-center shadow-xs"
                        >
                          <MessageSquare className="w-4 h-4 fill-current" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Passenger Details Form */}
        {bookingStep === 'passengerForm' && selectedFlight && (
          <div className={`p-4 sm:p-6 ${fontClass}`}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <div>
                <span className="text-xs font-bold text-[#E53935] uppercase tracking-wider">
                  {language === 'UR' ? 'مرحلہ 2 از 2' : language === 'AR' ? 'الخطوة 2 من 2' : 'Step 2 of 2'}
                </span>
                <h4 className="text-lg font-extrabold text-[#071A3D]">
                  {language === 'UR'
                    ? 'مسافر کی بنیادی معلومات اور رابطہ'
                    : language === 'AR'
                    ? 'بيانات المسافر الرئيسي ومعلومات الاتصال'
                    : 'Lead Passenger & Contact Information'}
                </h4>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-gray-500 hover:text-gray-800 underline font-semibold cursor-pointer"
              >
                {language === 'UR' ? 'فلائٹ تبدیل کریں' : language === 'AR' ? 'تغيير الرحلة' : 'Change Flight'}
              </button>
            </div>

            {/* Selected Flight Summary Strip */}
            <div className="bg-[#071A3D]/5 rounded-xl p-3.5 mb-5 flex flex-wrap items-center justify-between gap-3 text-xs border border-[#071A3D]/10">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#071A3D]">{selectedFlight.airline}</span>
                <span className="text-gray-400">•</span>
                <span>{selectedFlight.flightNumber}</span>
                <span className="text-gray-400">•</span>
                <span>
                  {selectedFlight.from.city} → {selectedFlight.to.city}
                </span>
              </div>
              <div className="font-bold text-[#E53935] text-sm">
                {formatCurrency(selectedFlight.priceUSD, currency)} ({language === 'UR' ? 'تمام ٹیکسز شامل ہیں' : language === 'AR' ? 'شامل كافة الضرائب' : 'All Taxes Included'})
              </div>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {language === 'UR'
                      ? 'مکمل نام (پاسپورٹ / شناختی کارڈ کے مطابق) *'
                      : language === 'AR'
                      ? 'الاسم الكامل (كما في جواز السفر / الهوية) *'
                      : 'Full Name (As shown in Passport / ID) *'}
                  </label>
                  <div className="flex items-center p-2.5 rounded-xl bg-white border border-gray-300">
                    <User className={`w-4 h-4 text-gray-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <input
                      type="text"
                      required
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      className={`w-full text-xs font-semibold text-[#071A3D] outline-none ${fontClass}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {language === 'UR'
                      ? 'پاسپورٹ نمبر / قومی شناختی نمبر *'
                      : language === 'AR'
                      ? 'رقم الجواز / رقم الهوية الوطنية *'
                      : 'Passport Number / National ID *'}
                  </label>
                  <div className="flex items-center p-2.5 rounded-xl bg-white border border-gray-300">
                    <ShieldCheck className={`w-4 h-4 text-gray-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <input
                      type="text"
                      required
                      value={passengerPassport}
                      onChange={(e) => setPassengerPassport(e.target.value)}
                      className="w-full text-xs font-semibold text-[#071A3D] outline-none font-mono uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {language === 'UR' ? 'ای میل برائے ای-ٹکٹ *' : language === 'AR' ? 'البريد الإلكتروني لإرسال التذكرة *' : 'Email Address for e-Ticket *'}
                  </label>
                  <div className="flex items-center p-2.5 rounded-xl bg-white border border-gray-300">
                    <Mail className={`w-4 h-4 text-gray-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <input
                      type="email"
                      required
                      value={passengerEmail}
                      onChange={(e) => setPassengerEmail(e.target.value)}
                      className="w-full text-xs font-semibold text-[#071A3D] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {language === 'UR' ? 'موبائل نمبر (واٹس ایپ) *' : language === 'AR' ? 'رقم الجوال (واتساب) *' : 'Mobile Contact (WhatsApp) *'}
                  </label>
                  <div className="flex items-center p-2.5 rounded-xl bg-white border border-gray-300">
                    <Phone className={`w-4 h-4 text-gray-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <input
                      type="tel"
                      required
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      className="w-full text-xs font-semibold text-[#071A3D] outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Preview */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 mt-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#071A3D]">
                    <CreditCard className="w-4 h-4 text-[#16A34A]" />
                    <span>
                      {language === 'UR'
                        ? 'طریقہ ادائیگی: باضابطہ ایجنسی ٹکٹنگ (مدیٰ / ویزا / ماسٹر کارڈ)'
                        : language === 'AR'
                        ? 'طريقة السداد: إصدار فوري معتمد (مدى / فيزا / ماستركارد)'
                        : 'Payment Method: Instant Agency Ticketing (Mada / Visa / Mastercard)'}
                    </span>
                  </div>
                  <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded">
                    {language === 'UR' ? 'محفوظ گیٹ وے' : language === 'AR' ? 'بوابة آمنة وموثقة' : 'Verified Gateway'}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  {language === 'UR'
                    ? 'فوری الیکٹرانک ٹکٹ جاری کیا جائے گا اور ایاٹا کے منظور شدہ بکنگ کوڈ کے تحت سسٹم میں محفوظ ہوگا۔'
                    : language === 'AR'
                    ? 'سيتم إصدار التذكرة الإلكترونية وتأكيد الحجز فوراً عبر أنظمة الحجز العالمية المعتمدة إياتا.'
                    : 'Instant electronic ticket confirmation will be generated and issued under IATA accredited booking code.'}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {language === 'UR' ? 'واپس' : language === 'AR' ? 'رجوع' : 'Back'}
                </button>
                <button
                  type="submit"
                  className={`px-8 py-3 rounded-xl bg-gradient-to-r from-[#D62828] to-[#E53935] hover:brightness-110 text-white font-extrabold text-sm shadow-lg shadow-[#D62828]/30 flex items-center gap-2 cursor-pointer ${fontClass}`}
                >
                  <span>{language === 'UR' ? 'بکنگ مکمل کریں اور ٹکٹ جاری کریں' : language === 'AR' ? 'إتمام الحجز وإصدار التذكرة' : 'Complete Booking & Issue Ticket'}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: Confirmed e-Ticket / Boarding Pass */}
        {bookingStep === 'ticketConfirmed' && selectedFlight && (
          <div className={`p-4 sm:p-8 ${fontClass}`}>
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-green-100 text-[#16A34A] flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-[#071A3D] font-heading">
                {language === 'UR'
                  ? 'مبارک ہو! بکنگ تصدیق شدہ اور ای-ٹکٹ جاری ہو گیا'
                  : language === 'AR'
                  ? 'تم تأكيد الحجز وإصدار التذكرة الإلكترونية بنجاح!'
                  : 'Booking Confirmed & e-Ticket Issued!'}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {language === 'UR'
                  ? `آپ کی پرواز ${selectedFlight.airline} کے سسٹم میں محفوظ ہو چکی ہے۔ ایک کاپی ${passengerEmail} پر بھیج دی گئی ہے۔`
                  : language === 'AR'
                  ? `تم تسجيل بيانات رحلتك بنجاح لدى ${selectedFlight.airline}، وأرسلت نسخة إلى ${passengerEmail}.`
                  : `Your flight itinerary has been registered with ${selectedFlight.airline}. A copy has been dispatched to ${passengerEmail}.`}
              </p>
            </div>

            {/* Aviation Boarding Pass Card */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden relative">
              {/* Top Banner */}
              <div className="bg-[#071A3D] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[#E53935] flex items-center justify-center text-white font-black text-xs">
                    T4
                  </div>
                  <span className="font-extrabold text-sm tracking-wider">
                    {language === 'UR' ? 'ٹی فور ٹکٹس بورڈنگ پاس' : language === 'AR' ? 'بطاقة صعود الطائرة - تي فور' : 'T4TICKETS BOARDING PASS'}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-300">
                    {language === 'UR' ? 'بکنگ ریفرنس (پی این آر)' : language === 'AR' ? 'رقم الحجز المرجعي (PNR)' : 'BOOKING REFERENCE (PNR)'}
                  </div>
                  <div className="text-sm font-mono font-black text-[#E53935] tracking-widest">{pnrCode}</div>
                </div>
              </div>

              {/* Pass Details */}
              <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">
                    {language === 'UR' ? 'مسافر' : language === 'AR' ? 'المسافر' : 'Passenger'}
                  </span>
                  <span className="font-extrabold text-gray-900">{passengerName}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">
                    {language === 'UR' ? 'فلائٹ / ایئرلائن' : language === 'AR' ? 'الرحلة / الناقل' : 'Flight / Carrier'}
                  </span>
                  <span className="font-extrabold text-gray-900">{selectedFlight.flightNumber}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">
                    {language === 'UR' ? 'کلاس' : language === 'AR' ? 'الدرجة' : 'Class'}
                  </span>
                  <span className="font-extrabold text-gray-900 capitalize">{selectedFlight.cabinClass}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">
                    {language === 'UR' ? 'سامان کی حد' : language === 'AR' ? 'الوزن المسموح' : 'Baggage Allowance'}
                  </span>
                  <span className="font-extrabold text-gray-900">{selectedFlight.baggage}</span>
                </div>

                <div className="col-span-2 sm:col-span-2 pt-3 border-t border-gray-100">
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">
                    {language === 'UR' ? 'کہاں سے' : language === 'AR' ? 'من' : 'From'}
                  </span>
                  <span className="text-lg font-black text-[#071A3D]">{selectedFlight.from.city} ({selectedFlight.from.code})</span>
                  <p className="text-[11px] text-gray-500">{selectedFlight.departureTime} • {searchQuery.departureDate}</p>
                </div>

                <div className="col-span-2 sm:col-span-2 pt-3 border-t border-gray-100">
                  <span className="text-gray-400 text-[10px] uppercase font-bold block">
                    {language === 'UR' ? 'کہاں تک' : language === 'AR' ? 'إلى' : 'To'}
                  </span>
                  <span className="text-lg font-black text-[#071A3D]">{selectedFlight.to.city} ({selectedFlight.to.code})</span>
                  <p className="text-[11px] text-gray-500">{selectedFlight.arrivalTime} • Arrival</p>
                </div>
              </div>

              {/* Barcode Simulation */}
              <div className="bg-gray-50 p-4 border-t border-dashed border-gray-300 flex items-center justify-between">
                <div className="font-mono text-[10px] text-gray-500 tracking-widest truncate">
                  ||||| | |||| |||||| || |||||||| | |||| ||||| ||| |||||| | |||
                </div>
                <div className="text-[11px] font-bold text-gray-600">
                  {language === 'UR' ? 'الیکٹرانک ای-ٹکٹ • ایاٹا منظور شدہ' : language === 'AR' ? 'تذكرة إلكترونية رسمية • معتمدة من إياتا' : 'Electronic Ticket • IATA Authorized'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-[#071A3D] flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{language === 'UR' ? 'ٹکٹ پرنٹ کریں' : language === 'AR' ? 'طباعة التذكرة' : 'Print Ticket'}</span>
              </button>
              <a
                href={`https://wa.me/966502674930?text=${encodeURIComponent(
                  `Assalam u Alaikum Muhammad Aamir Aziz (T4 Tickets),\nI have generated my flight reservation:\n• PNR Reference: ${pnrCode}\n• Passenger: ${passengerName}\n• Flight: ${selectedFlight.flightNumber} (${selectedFlight.airline})\n• Route: ${selectedFlight.from.city} (${selectedFlight.from.code}) ➔ ${selectedFlight.to.city} (${selectedFlight.to.code})\n• Fare: ${formatCurrency(selectedFlight.priceUSD, currency)}\nPlease confirm my official PDF e-ticket issuance.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-[#25D366]/20 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{language === 'UR' ? 'واٹس ایپ پر حاصل کریں' : language === 'AR' ? 'استلام عبر الواتساب' : 'Receive via WhatsApp'}</span>
              </a>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#071A3D] hover:bg-[#0D2C63] text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
              >
                {language === 'UR' ? 'مکمل ہوا اور واپس جائیں' : language === 'AR' ? 'تم والعودة للموقع' : 'Done & Return to Site'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
