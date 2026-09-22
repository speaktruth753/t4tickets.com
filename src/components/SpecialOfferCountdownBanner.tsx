import React, { useState, useEffect } from 'react';
import {
  Clock,
  Flame,
  Sparkles,
  Tag,
  Copy,
  Check,
  Plane,
  ArrowRight,
  ShieldCheck,
  Users,
  Percent,
  ChevronRight,
  Award
} from 'lucide-react';
import { CurrencyCode } from '../types';
import { formatCurrency } from '../utils/formatters';
import { WhatsAppIcon } from './WhatsAppIcon';
import { trackGAEvent } from '../utils/analytics';
import { useLanguage } from '../context/LanguageContext';

interface SpecialOffer {
  id: string;
  tag: string;
  badge: string;
  title: string;
  urduTitle: string;
  description: string;
  imageUrl: string;
  originalPriceUSD: number;
  discountedPriceUSD: number;
  promoCode: string;
  quotaClaimedPercent: number;
  remainingSlots: number;
  features: string[];
  recommendedAirlineOrHotel: string;
}

const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'umrah-special',
    tag: 'Exclusive VIP Umrah',
    badge: 'SAVE $601 (2,250 SAR)',
    title: '15-Day VIP 5-Star Umrah Luxury Package',
    urduTitle: '15 روزہ وی آئی پی فائیو اسٹار عمرہ اسپیشل آفر',
    description:
      'Experience the pinnacle of spiritual tranquility with 5-Star Swissôtel Makkah (facing Haram) and Pullman Zamzam Madinah, complete with private GMC VIP airport transfers, full holy Ziyarat, and complimentary Saudi Umrah visa issuance.',
    imageUrl:
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80',
    originalPriceUSD: 2100,
    discountedPriceUSD: 1499,
    promoCode: 'UMRAH40VIP',
    quotaClaimedPercent: 88,
    remainingSlots: 3,
    features: [
      '5-Star Luxury Hotels directly on Haram courtyards',
      'Private luxury GMC / HiAce airport & Ziyarat transport',
      'Free Saudi electronic Umrah visa processing',
      '24/7 dedicated support by Muhammad Aamir Aziz'
    ],
    recommendedAirlineOrHotel: 'Swissôtel Makkah & Pullman Madinah'
  },
  {
    id: 'flights-flash',
    tag: 'Flight Flash Sale',
    badge: 'EXTRA 35% OFF',
    title: 'Gulf & Worldwide Express Flight Deals',
    urduTitle: 'سعودیہ، گلف اور پاکستان فلائٹس پر 35 فیصد خصوصی رعایت',
    description:
      'Exclusive flash fares on premium carriers including Saudia, Emirates, Qatar Airways, and PIA. Valid for Riyadh & Jeddah departures to Dubai, Lahore, Islamabad, Cairo, London, and Dhaka.',
    imageUrl:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    originalPriceUSD: 580,
    discountedPriceUSD: 375,
    promoCode: 'T4FLY35',
    quotaClaimedPercent: 92,
    remainingSlots: 5,
    features: [
      'Confirmed PNR with generous 2x 23kg checked baggage',
      'Free flexible date change within promotional window',
      'Saudia, Emirates, PIA, Flynas & Airblue all supported',
      'Instant e-ticket delivery directly on WhatsApp'
    ],
    recommendedAirlineOrHotel: 'Saudia & Emirates Airlines'
  },
  {
    id: 'visa-medical-special',
    tag: 'Visa & Wafid Combo',
    badge: 'EXPRESS 24H SERVICE',
    title: 'Fast-Track Saudi Visit Visa & Wafid Medical',
    urduTitle: 'فاسٹ ٹریک فیملی وزٹ ویزا اور وافد میڈیکل رجسٹریشن',
    description:
      'Guaranteed fast-track processing for Saudi family visit visas, tourist visas, and instant Wafid (GAMCA) medical appointment slips. Managed personally with 100% compliance verification.',
    imageUrl:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    originalPriceUSD: 190,
    discountedPriceUSD: 119,
    promoCode: 'VISAFAST24',
    quotaClaimedPercent: 81,
    remainingSlots: 7,
    features: [
      'Expedited 24 to 48 hours official visa issuance',
      'Official Wafid GCC medical slip generated instantly',
      'Full documentation review to eliminate rejection risks',
      'Priority hotline direct to Muhammad Aamir Aziz'
    ],
    recommendedAirlineOrHotel: 'Official Enjaz & Wafid GCC Portal'
  }
];

interface SpecialOfferCountdownBannerProps {
  currency: CurrencyCode;
  onOpenInquiry?: (subject: string) => void;
}

export const SpecialOfferCountdownBanner: React.FC<SpecialOfferCountdownBannerProps> = ({
  currency,
  onOpenInquiry
}) => {
  const { t, language, isRTL } = useLanguage();
  const fontClass = language === 'UR' ? 'font-nastaliq' : language === 'AR' ? 'font-arabic' : 'font-sans';
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // 48-hour cyclical countdown calculated dynamically to always create authentic urgency
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 45
  });

  useEffect(() => {
    // Dynamic countdown target set to 2 days, 14 hours from current visit session
    const targetKey = 't4_promo_countdown_target';
    let targetTime = Number(sessionStorage.getItem(targetKey));
    if (!targetTime || targetTime < Date.now()) {
      targetTime = Date.now() + (2 * 24 * 3600 + 14 * 3600 + 36 * 60 + 45) * 1000;
      sessionStorage.setItem(targetKey, targetTime.toString());
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const distance = Math.max(0, targetTime - now);

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const activeOffer = SPECIAL_OFFERS[activeOfferIndex];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    trackGAEvent('copy_promo_code', {
      promo_code: code,
      offer_id: activeOffer.id,
      offer_title: activeOffer.title
    });
    setTimeout(() => {
      setCopiedCode(null);
    }, 3000);
  };

  const handleWhatsAppBooking = () => {
    const formattedPrice = formatCurrency(activeOffer.discountedPriceUSD, currency);
    const message = `Assalam u Alaikum Muhammad Aamir Aziz (T4 Tickets),\n\nI want to claim the Special Offer: *${activeOffer.title}*\n• Promo Code: *${activeOffer.promoCode}*\n• Discounted Price: *${formattedPrice}*\n\nPlease confirm availability and booking procedure.`;

    trackGAEvent('claim_special_offer_whatsapp', {
      offer_id: activeOffer.id,
      offer_title: activeOffer.title,
      promo_code: activeOffer.promoCode,
      price_usd: activeOffer.discountedPriceUSD
    });

    const url = `https://wa.me/966502674930?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noreferrer');
  };

  const handleInquireOnline = () => {
    if (onOpenInquiry) {
      onOpenInquiry(`Special Offer: ${activeOffer.title} (Promo: ${activeOffer.promoCode})`);
    }
  };

  return (
    <section id="special-offers-countdown" className="relative py-12 md:py-16 overflow-hidden bg-[#0A192F] text-white">
      {/* Decorative ambient lighting and grid overlay */}
      <div className="absolute inset-0 bg-radial from-[#1E3A8A]/30 via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E53935]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block: Urgency Banner Title & Live Countdown */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#E53935]/20 to-[#D4AF37]/20 border border-[#E53935]/40 text-[#F7D070] text-xs font-bold uppercase tracking-wider mb-3 shadow-inner ${fontClass}`}>
              <Flame className="w-4 h-4 text-[#E53935] animate-pulse" />
              <span>{language === 'UR' ? 'محدود مدت کے خصوصی موسمی آفرز' : language === 'AR' ? 'عروض موسمية حصرية لفترة محدودة' : 'Limited Time Seasonal Promotion'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E53935] animate-ping" />
            </div>
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-2 flex-wrap ${fontClass}`}>
              <span>{language === 'UR' ? 'خصوصی فلیش ڈیلز اور لائیو کاؤنٹ ڈاؤن' : language === 'AR' ? 'عروض فلاش الحصرية والعد التنازلي' : 'Exclusive Flash Deals & Countdown'}</span>
              <Sparkles className="w-6 h-6 text-[#D4AF37] animate-spin-slow shrink-0" />
            </h2>
            <p className={`text-gray-300 text-sm sm:text-base mt-1 max-w-2xl ${fontClass}`}>
              {language === 'UR'
                ? 'وقت ختم ہونے سے پہلے سستی ترین ایئر لائن ٹکٹس، 5 ستارہ عمرہ پیکجز اور فوری ویزا بک کروائیں۔'
                : language === 'AR'
                ? 'سارع بحجز تذاكر الطيران المخفضة وباقات العمرة 5 نجوم وتأشيرات الزيارة السريعة قبل انتهاء الوقت.'
                : 'Lock in heavily subsidized airline tickets, 5-Star Umrah packages, and express visas before the timer expires.'}
            </p>
          </div>

          {/* Animated Countdown Timer Component */}
          <div className={`flex flex-col items-start lg:items-end gap-2 bg-white/5 border border-white/15 p-4 rounded-2xl backdrop-blur-md shadow-2xl ${fontClass}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-[#F7D070] uppercase tracking-wider">
              <Clock className="w-4 h-4 animate-spin text-[#E53935]" style={{ animationDuration: '6s' }} />
              <span>{language === 'UR' ? 'آفر ختم ہونے میں باقی وقت:' : language === 'AR' ? 'ينتهي العرض الخاص خلال:' : 'Special Offer Expires In:'}</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 text-center">
              {/* Days */}
              <div className="flex flex-col items-center">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 border border-white/20 shadow-lg flex items-center justify-center font-mono font-black text-xl sm:text-2xl text-white">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <span className={`text-[10px] sm:text-xs font-semibold uppercase text-gray-400 mt-1 ${fontClass}`}>
                  {language === 'UR' ? 'دن' : language === 'AR' ? 'يوم' : 'Days'}
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-500 self-start mt-3">:</span>

              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 border border-white/20 shadow-lg flex items-center justify-center font-mono font-black text-xl sm:text-2xl text-[#F7D070]">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className={`text-[10px] sm:text-xs font-semibold uppercase text-gray-400 mt-1 ${fontClass}`}>
                  {language === 'UR' ? 'گھنٹے' : language === 'AR' ? 'ساعة' : 'Hours'}
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-500 self-start mt-3">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 border border-white/20 shadow-lg flex items-center justify-center font-mono font-black text-xl sm:text-2xl text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className={`text-[10px] sm:text-xs font-semibold uppercase text-gray-400 mt-1 ${fontClass}`}>
                  {language === 'UR' ? 'منٹ' : language === 'AR' ? 'دقيقة' : 'Mins'}
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-500 self-start mt-3">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-gradient-to-b from-[#E53935]/80 to-[#B71C1C] border border-[#E53935] shadow-lg flex items-center justify-center font-mono font-black text-xl sm:text-2xl text-white animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <span className={`text-[10px] sm:text-xs font-semibold uppercase text-gray-400 mt-1 ${fontClass}`}>
                  {language === 'UR' ? 'سیکنڈ' : language === 'AR' ? 'ثانية' : 'Secs'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher for Offers */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SPECIAL_OFFERS.map((offer, idx) => {
            const isActive = idx === activeOfferIndex;
            return (
              <button
                key={offer.id}
                onClick={() => {
                  setActiveOfferIndex(idx);
                  trackGAEvent('switch_special_offer_tab', {
                    offer_id: offer.id,
                    offer_title: offer.title
                  });
                }}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border cursor-pointer ${fontClass} ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E53935] to-[#D4AF37] text-white border-transparent shadow-lg shadow-[#E53935]/25 scale-102'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10 hover:border-white/20'
                }`}
              >
                <span>
                  {language === 'UR'
                    ? (offer.id === 'umrah-special' ? 'خصوصی وی آئی پی عمرہ' : offer.id === 'flights-flash' ? 'فلائٹ فلیش سیل' : 'ویزا و وافد کومبو')
                    : language === 'AR'
                    ? (offer.id === 'umrah-special' ? 'عمرة VIP حصرية' : offer.id === 'flights-flash' ? 'تخفيضات الطيران الفورية' : 'باقة التأشيرة وفحص وافد')
                    : offer.tag}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${fontClass} ${
                    isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-[#F7D070]'
                  }`}
                >
                  {language === 'UR'
                    ? (offer.id === 'umrah-special' ? 'بچت 2,250 ریال' : offer.id === 'flights-flash' ? '35% خصوصی رعایت' : 'فوری 24 گھنٹے میں')
                    : language === 'AR'
                    ? (offer.id === 'umrah-special' ? 'وفر 2,250 ريال' : offer.id === 'flights-flash' ? 'خصم إضافي 35%' : 'خدمة فورية 24 ساعة')
                    : offer.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Offer Showcase Card with Image & Animated Highlights */}
        <div className="mt-6 rounded-3xl bg-gradient-to-br from-gray-900/90 via-gray-900 to-[#0A192F] border border-white/15 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: Image Banner with Overlay Badges */}
            <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[340px] lg:min-h-full overflow-hidden group">
              <img
                src={activeOffer.imageUrl}
                alt={activeOffer.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Gradient Scrims for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-900/80 hidden lg:block" />

              {/* Floating Top Left Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full bg-[#E53935] text-white text-xs font-black shadow-lg flex items-center gap-1.5 tracking-wider uppercase">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  {activeOffer.badge}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#F7D070] text-xs font-bold">
                  {activeOffer.recommendedAirlineOrHotel}
                </span>
              </div>

              {/* Bottom Image Overlay Details */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15">
                <div className={`flex items-center justify-between gap-3 text-xs ${fontClass}`}>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#F7D070]" />
                    <span className="font-semibold text-gray-200">
                      {language === 'UR' ? 'حاصل شدہ سیٹیں: ' : language === 'AR' ? 'المقاعد المحجوزة: ' : 'Seats Claimed: '}
                      <strong className="text-white">{activeOffer.quotaClaimedPercent}%</strong>
                    </span>
                  </div>
                  <span className="text-[#E53935] font-bold">
                    {language === 'UR' ? `صرف ${activeOffer.remainingSlots} سیٹیں باقی!` : language === 'AR' ? `متبقي ${activeOffer.remainingSlots} مقاعد فقط!` : `Only ${activeOffer.remainingSlots} Slots Left!`}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-2 w-full h-2 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E53935] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${activeOffer.quotaClaimedPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Offer Details, Features, Pricing & Direct Action */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Regional/Arabic Context Subtitle */}
                {language !== 'EN' && (
                  <p dir="rtl" className={`text-sm font-semibold text-[#F7D070] mb-1 ${fontClass}`}>
                    {language === 'UR'
                      ? activeOffer.urduTitle
                      : (activeOffer.id === 'umrah-special'
                        ? 'باقة العمرة الفاخرة 15 يوماً - فنادق 5 نجوم مطلة على الحرم'
                        : activeOffer.id === 'flights-flash'
                        ? 'خصم فوري 35% على رحلات السعودية والخليج وجميع الوجهات'
                        : 'خدمة سريعة لتأشيرات الزيارة وحجز مواعيد فحص وافد')}
                  </p>
                )}

                {/* Offer Title */}
                <h3 className={`text-xl sm:text-2xl font-black text-white leading-snug ${fontClass}`}>
                  {language === 'UR'
                    ? activeOffer.urduTitle
                    : language === 'AR'
                    ? (activeOffer.id === 'umrah-special'
                      ? 'باقة العمرة الفاخرة VIP 5 نجوم لمدة 15 يوماً'
                      : activeOffer.id === 'flights-flash'
                      ? 'عروض وتخفيضات رحلات الخليج ومختلف الوجهات'
                      : 'إصدار سريع لتأشيرة الزيارة وحجز فحص وافد الطبي')
                    : activeOffer.title}
                </h3>

                <p className={`mt-2.5 text-gray-300 text-xs sm:text-sm leading-relaxed ${fontClass}`}>
                  {language === 'UR'
                    ? (activeOffer.id === 'umrah-special'
                      ? 'سوئس ہوٹل مکہ کلاک ٹاور اور پولمین زمزم مدینہ کے ساتھ مکمل 5 ستارہ روحانی سفر، نجی ٹرانسپورٹ، زیارات اور نسک سپورٹ۔'
                      : activeOffer.id === 'flights-flash'
                      ? 'سعودیہ، امارات، قطر ایئرویز اور پی آئی اے پر خصوصی رعایت۔ ریاض و جدہ سے لاہور، اسلام آباد، کراچی، دبئی اور قاہرہ۔'
                      : 'سعودی فیملی وزٹ ویزا، سیاحتی ویزا اور وافد (گامکا) میڈیکل اپائنٹمنٹ سلپ کی فوری اور باضابطہ فراہمی۔')
                    : language === 'AR'
                    ? (activeOffer.id === 'umrah-special'
                      ? 'تمتع بأعلى درجات الراحة الروحانية في فندق سويس أوتيل مكة وبرج الساعة وبولمان زمزم المدينة مع مواصلات خاصة VIP وتصاريح نسك.'
                      : activeOffer.id === 'flights-flash'
                      ? 'أسعار طيران حصرية مخفضة على الخطوط السعودية وطيران الإمارات والقطرية، مع وزن أمتعة 2×23 كغ وتعديل مرن.'
                      : 'إنجاز سريع ومضمون لتأشيرات الزيارة العائلية والسياحية وحجز مواعيد فحص وافد الطبي (جامكا) بكل موثوقية.')
                    : activeOffer.description}
                </p>

                {/* Feature Bullet Points */}
                <div className={`mt-5 space-y-2.5 ${fontClass}`}>
                  {activeOffer.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                      <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                      <span>
                        {language === 'UR'
                          ? (activeOffer.id === 'umrah-special'
                            ? (fIdx === 0 ? 'حرم مکی اور مدینہ منورہ کے مرکزی صحن میں 5 ستارہ ہوٹل'
                              : fIdx === 1 ? 'نجی پرتعیش جی ایم سی / ہائی ایس ایئرپورٹ اور زیارات ٹرانسپورٹ'
                              : fIdx === 2 ? 'سعودی الیکٹرانک عمرہ ویزا کی مکمل سہولت'
                              : 'محمد عامر عزیز کی زیرِ نگرانی 24 گھنٹے مکمل رہنمائی')
                            : activeOffer.id === 'flights-flash'
                            ? (fIdx === 0 ? 'مصدقہ پی این آر اور 2x 23 کلو گرام بیگیج الاؤنس'
                              : fIdx === 1 ? 'موسمی آفر کے تحت تاریخ کی مفت تبدیلی کی سہولت'
                              : fIdx === 2 ? 'سعودیہ، امارات، پی آئی اے اور فلائی ناس ٹکٹس دستیاب'
                              : 'واٹس ایپ پر فوری ای ٹکٹ کی براہ راست ترسیل')
                            : (fIdx === 0 ? '24 سے 48 گھنٹوں میں فوری اور مصدقہ ویزا اجرا'
                              : fIdx === 1 ? 'باضابطہ وافد (گامکا) میڈیکل سلپ کا فوری اجرا'
                              : fIdx === 2 ? 'ویزے کے مسترد ہونے سے بچاؤ کے لیے مکمل کاغذات کی جانچ'
                              : 'منیجر محمد عامر عزیز سے براہ راست ترجیحی رابطہ'))
                          : language === 'AR'
                          ? (activeOffer.id === 'umrah-special'
                            ? (fIdx === 0 ? 'فنادق فاخرة 5 نجوم مباشرة أمام ساحات الحرمين الشريفين'
                              : fIdx === 1 ? 'مواصلات خاصة VIP بسيارات جمس يوكن وسيارات حديثة'
                              : fIdx === 2 ? 'إصدار تأشيرة العمرة وتصاريح نسك المعتمدة'
                              : 'متابعة شخصية ودعم مستمر من المدير محمد عامر عزيز')
                            : activeOffer.id === 'flights-flash'
                            ? (fIdx === 0 ? 'حجز مؤكد مع وزن أمتعة 2×23 كغ للمسافرين'
                              : fIdx === 1 ? 'مرونة في تعديل مواعيد السفر ضمن فترة العرض'
                              : fIdx === 2 ? 'السعودية، طيران الإمارات، القطرية وطيران ناس'
                              : 'استلام التذكرة الإلكترونية فوراً عبر الواتساب')
                            : (fIdx === 0 ? 'إصدار سريع لتأشيرة الزيارة خلال 24 - 48 ساعة'
                              : fIdx === 1 ? 'حجز موعد فحص وافد الطبي المعتمد فورياً'
                              : fIdx === 2 ? 'مراجعة وتدقيق المستندات لضمان قبول المعاملة'
                              : 'خط تواصل مباشر مع المدير العام محمد عامر عزيز'))
                          : feat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code Box */}
                <div className={`mt-6 p-3.5 rounded-xl bg-white/5 border border-dashed border-[#D4AF37]/50 flex items-center justify-between gap-3 ${fontClass}`}>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#F7D070]" />
                    <div className="text-xs">
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                        {language === 'UR' ? 'خصوصی پرومو کوڈ' : language === 'AR' ? 'رمز الخصم الخاص' : 'Special Promo Code'}
                      </span>
                      <span className="font-mono font-black text-base text-[#F7D070] tracking-wider">
                        {activeOffer.promoCode}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyCode(activeOffer.promoCode)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Copy Promo Code"
                  >
                    {copiedCode === activeOffer.promoCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#25D366]" />
                        <span className="text-[#25D366]">{language === 'UR' ? 'کاپی ہوگیا!' : language === 'AR' ? 'تم النسخ!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{language === 'UR' ? 'کوڈ کاپی کریں' : language === 'AR' ? 'نسخ الرمز' : 'Copy Code'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Bottom Price & Call to Actions */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <div>
                    <span className={`text-xs text-gray-400 block ${fontClass}`}>
                      {language === 'UR' ? 'رعایتی پیکج کی قیمت' : language === 'AR' ? 'سعر الباقة بعد الخصم' : 'Promotional Package Price'}
                    </span>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                        {formatCurrency(activeOffer.discountedPriceUSD, currency)}
                      </span>
                      <span className="text-sm sm:text-base text-gray-400 line-through font-mono">
                        {formatCurrency(activeOffer.originalPriceUSD, currency)}
                      </span>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full bg-[#16A34A]/20 border border-[#16A34A]/40 text-[#25D366] text-xs font-bold ${fontClass}`}>
                    {language === 'UR' ? 'باضابطہ گارنٹی' : language === 'AR' ? 'ضمان رسمي 100%' : 'Official Guarantee'}
                  </span>
                </div>

                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${fontClass}`}>
                  {/* Primary: Direct WhatsApp Booking */}
                  <button
                    onClick={handleWhatsAppBooking}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
                    <span>{language === 'UR' ? 'واٹس ایپ پر آفر حاصل کریں' : language === 'AR' ? 'احجز العرض عبر واتساب' : 'Claim on WhatsApp'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>

                  {/* Secondary: Inquire Online */}
                  <button
                    onClick={handleInquireOnline}
                    className="w-full py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 transition-all cursor-pointer"
                  >
                    <span>{language === 'UR' ? 'آن لائن معلومات و بکنگ' : language === 'AR' ? 'استفسار وتخصيص الباقة' : 'Inquire / Customize'}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300 rtl:rotate-180" />
                  </button>
                </div>

                {/* Subtext info */}
                <p className={`mt-3 text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5 ${fontClass}`}>
                  <Award className="w-3.5 h-3.5 text-[#F7D070]" />
                  <span>
                    {language === 'UR'
                      ? 'انتظام و نگرانی: محمد عامر عزیز • 24/7 خصوصی کسٹمر سپورٹ (+966 50 267 4930)'
                      : language === 'AR'
                      ? 'إشراف المدير العام: محمد عامر عزيز • خدمة متواصلة على مدار الساعة (+966 50 267 4930)'
                      : 'Managed by Muhammad Aamir Aziz • 24/7 Dedicated Support (+966 50 267 4930)'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
