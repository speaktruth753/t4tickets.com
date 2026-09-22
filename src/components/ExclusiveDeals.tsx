import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plane,
  Tag,
  ArrowRight,
  Sparkles,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { CurrencyCode, ExclusiveDeal } from '../types';
import { EXCLUSIVE_DEALS } from '../data/travelData';
import { formatCurrency } from '../utils/formatters';
import { useLanguage } from '../context/LanguageContext';

interface ExclusiveDealsProps {
  currency: CurrencyCode;
  onBookDeal: (deal: ExclusiveDeal) => void;
}

export const ExclusiveDeals: React.FC<ExclusiveDealsProps> = ({ currency, onBookDeal }) => {
  const { language, t } = useLanguage();
  const fontClass = language === 'UR' ? 'font-nastaliq' : language === 'AR' ? 'font-arabic' : 'font-sans';

  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Middle East' | 'Europe' | 'Asia'>('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredDeals = EXCLUSIVE_DEALS.filter((deal) =>
    selectedCategory === 'All' ? true : deal.category === selectedCategory
  );

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const badgeText =
    language === 'UR'
      ? 'محدود مدت کے موسمی رعایتی کرائے'
      : language === 'AR'
      ? 'عروض موسمية حصرية لفترة محدودة'
      : 'Limited Time Seasonal Offers';

  const headingText = t.flashDealsTitle || 'Exclusive Flight Deals';
  const subtitleText = t.flashDealsSubtitle || 'Special negotiated airfares to high-demand global destinations. Valid for travel through 2026.';

  const categoryLabels: Record<string, string> = {
    All: language === 'UR' ? 'تمام' : language === 'AR' ? 'الكل' : 'All',
    'Middle East': language === 'UR' ? 'مشرق وسطیٰ' : language === 'AR' ? 'الشرق الأوسط' : 'Middle East',
    Europe: language === 'UR' ? 'یورپ' : language === 'AR' ? 'أوروبا' : 'Europe',
    Asia: language === 'UR' ? 'ایشیا' : language === 'AR' ? 'آسيا' : 'Asia'
  };

  const getDestinationName = (dest: string) => {
    if (language === 'AR') {
      const arMap: Record<string, string> = {
        Dubai: 'دبي',
        Istanbul: 'إسطنبول',
        London: 'لندن',
        'Kuala Lumpur': 'كوالالمبور',
        Bangkok: 'بانكوك',
        Doha: 'الدوحة',
        Paris: 'باريس',
        Riyadh: 'الرياض'
      };
      return arMap[dest] || dest;
    }
    if (language === 'UR') {
      const urMap: Record<string, string> = {
        Dubai: 'دبئی',
        Istanbul: 'استنبول',
        London: 'لندن',
        'Kuala Lumpur': 'کوالالمپور',
        Bangkok: 'بینکاک',
        Doha: 'دوحہ',
        Paris: 'پیرس',
        Riyadh: 'ریاض'
      };
      return urMap[dest] || dest;
    }
    return dest;
  };

  const getCountryName = (country: string) => {
    if (language === 'AR') {
      const arMap: Record<string, string> = {
        'United Arab Emirates': 'الإمارات العربية المتحدة',
        Turkey: 'تركيا',
        'United Kingdom': 'المملكة المتحدة',
        Malaysia: 'ماليزيا',
        Thailand: 'تايلاند',
        Qatar: 'قطر',
        France: 'فرنسا',
        'Saudi Arabia': 'المملكة العربية السعودية'
      };
      return arMap[country] || country;
    }
    if (language === 'UR') {
      const urMap: Record<string, string> = {
        'United Arab Emirates': 'متحدہ عرب امارات',
        Turkey: 'ترکی',
        'United Kingdom': 'برطانیہ',
        Malaysia: 'ملائشیا',
        Thailand: 'تھائی لینڈ',
        Qatar: 'قطر',
        France: 'فرانس',
        'Saudi Arabia': 'سعودی عرب'
      };
      return urMap[country] || country;
    }
    return country;
  };

  const partnerLabel = language === 'UR' ? 'ایئر لائن' : language === 'AR' ? 'شركة الطيران' : 'Partner Carrier';
  const travelWindowLabel = language === 'UR' ? 'سفری مدت' : language === 'AR' ? 'فترة السفر' : 'Travel Window';
  const baggageLabel = language === 'UR' ? 'سامان' : language === 'AR' ? 'الأمتعة' : 'Baggage';
  const baggageVal = language === 'UR' ? 'مفت شامل (23 کلو)' : language === 'AR' ? 'شامل مجاناً (23 كجم)' : 'Included (23kg)';
  const bookLabel = language === 'UR' ? 'ڈیل بک کریں' : language === 'AR' ? 'حجز العرض' : 'Book Deal';
  const fromLabel = language === 'UR' ? 'شروع قیمت' : language === 'AR' ? 'من' : 'From';

  return (
    <section id="deals-section" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#D62828] text-xs font-bold uppercase tracking-wider mb-3">
              <Tag className="w-3.5 h-3.5 text-[#E53935]" />
              <span className={fontClass}>{badgeText}</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-black text-[#071A3D] font-heading tracking-tight ${fontClass}`}>
              {headingText}
            </h2>
            <p className={`mt-2 text-sm text-gray-500 ${fontClass}`}>
              {subtitleText}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category Tabs */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-bold">
              {(['All', 'Middle East', 'Europe', 'Asia'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${fontClass} ${
                    selectedCategory === cat
                      ? 'bg-[#071A3D] text-white shadow-sm'
                      : 'text-gray-600 hover:text-[#071A3D]'
                  }`}
                >
                  {categoryLabels[cat] || cat}
                </button>
              ))}
            </div>

            {/* Carousel Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-xl border border-gray-200 hover:border-[#071A3D] hover:bg-gray-50 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-xl bg-[#071A3D] hover:bg-[#0D2C63] text-white flex items-center justify-center transition-colors shadow-md shadow-[#071A3D]/20 cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Grid / Slider Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {filteredDeals.map((deal) => {
            const localizedDest = getDestinationName(deal.destination);
            const localizedCountry = getCountryName(deal.country);

            return (
              <div
                key={deal.id}
                className="min-w-[280px] sm:min-w-[320px] lg:min-w-[340px] max-w-[360px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 snap-start flex flex-col justify-between overflow-hidden group"
              >
                {/* Image & Discount Badge */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={localizedDest}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-[#E53935] text-white text-[11px] font-black tracking-wide shadow-md">
                      -{deal.discountPercentage}% OFF
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold ${fontClass}`}>
                      {deal.tag}
                    </span>
                  </div>

                  {/* Destination & Country at Bottom of Image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className={`text-xl font-black text-white font-heading tracking-tight drop-shadow-sm ${fontClass}`}>
                        {localizedDest}
                      </h3>
                      <p className={`text-xs text-gray-200 font-medium ${fontClass}`}>{localizedCountry}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-bold text-white">
                      <Plane className="w-3 h-3 text-[#E53935]" />
                      <span>{deal.routeCode}</span>
                    </div>
                  </div>
                </div>

                {/* Deal Details & Pricing */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`text-gray-500 ${fontClass}`}>{partnerLabel}</span>
                      <span className="font-bold text-[#071A3D]">{deal.airline}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`text-gray-500 ${fontClass}`}>{travelWindowLabel}</span>
                      <span className="font-semibold text-gray-700">2026 - 2027</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`text-gray-500 ${fontClass}`}>{baggageLabel}</span>
                      <span className={`font-semibold text-[#16A34A] ${fontClass}`}>{baggageVal}</span>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className={`text-[10px] text-gray-400 uppercase font-semibold line-through ${fontClass}`}>
                        {fromLabel} {formatCurrency(deal.originalPriceUSD, currency)}
                      </div>
                      <div className="text-xl font-black text-[#E53935] leading-none">
                        {formatCurrency(deal.priceUSD, currency)}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onBookDeal(deal)}
                        className={`px-3.5 py-2 rounded-xl bg-[#071A3D] hover:bg-[#D62828] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${fontClass}`}
                      >
                        <span>{bookLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </button>
                      <a
                        href={`https://wa.me/966502674930?text=${encodeURIComponent(`Assalam u Alaikum Muhammad Aamir Aziz, I want to book the deal for ${deal.destination} (${deal.routeCode}) with ${deal.airline}.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        title="Instant WhatsApp Booking with Muhammad Aamir Aziz"
                        className="p-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-colors flex items-center justify-center shadow-2xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
