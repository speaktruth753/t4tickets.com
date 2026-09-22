import React from 'react';
import {
  MoonStar,
  Star,
  Clock,
  Building,
  Check,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { CurrencyCode, UmrahPackage } from '../types';
import { UMRAH_PACKAGES } from '../data/travelData';
import { formatCurrency } from '../utils/formatters';
import { useLanguage } from '../context/LanguageContext';

interface UmrahPackagesProps {
  currency: CurrencyCode;
  onBookUmrah: (pkg: UmrahPackage) => void;
}

export const UmrahPackages: React.FC<UmrahPackagesProps> = ({ currency, onBookUmrah }) => {
  const { t, language } = useLanguage();
  const fontClass = language === 'UR' ? 'font-nastaliq' : language === 'AR' ? 'font-arabic' : 'font-sans';

  return (
    <section id="umrah-section" className="py-20 bg-[#071A3D] text-white relative overflow-hidden">
      {/* Background Decorative Gold Accents and Subtle Geometric Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D62828]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <MoonStar className="w-3.5 h-3.5 text-amber-400" />
            <span className={fontClass}>{language === 'UR' ? 'روحانی سفر برائے عمرہ' : language === 'AR' ? 'رحلات العمرة المباركة' : 'Blessed Spiritual Journeys'}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white ${fontClass}`}>
            {t.umrahTitle}
          </h2>
          <p className={`mt-3 text-sm sm:text-base text-gray-300 ${fontClass}`}>
            {t.umrahSubtitle}
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {UMRAH_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-[#0D2C63]/80 backdrop-blur-md rounded-3xl border border-amber-400/30 hover:border-amber-400 shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
            >
              {/* Gold Top Accent Line */}
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500" />

              <div>
                {/* Image & Featured Badge */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2C63] via-black/40 to-transparent" />

                  {pkg.featuredBadge && (
                    <div className={`absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-[#071A3D] font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg ${fontClass}`}>
                      {language === 'UR'
                        ? (pkg.id === 'umrah-vip-clock' ? 'انتہائی معتبر و معیاری' : pkg.id === 'umrah-deluxe-swiss' ? 'فیملی چوائس' : 'بہترین قیمت')
                        : language === 'AR'
                        ? (pkg.id === 'umrah-vip-clock' ? 'الأكثر تميزاً وفخامة' : pkg.id === 'umrah-deluxe-swiss' ? 'خيار العائلات' : 'الأفضل قيمة')
                        : pkg.featuredBadge}
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <div className={`flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-amber-300 ${fontClass}`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {language === 'UR'
                          ? (pkg.id === 'umrah-vip-clock' ? '10 دن / 9 راتیں' : pkg.id === 'umrah-deluxe-swiss' ? '8 دن / 7 راتیں' : '14 دن / 13 راتیں')
                          : language === 'AR'
                          ? (pkg.id === 'umrah-vip-clock' ? '10 أيام / 9 ليالٍ' : pkg.id === 'umrah-deluxe-swiss' ? '8 أيام / 7 ليالٍ' : '14 يوماً / 13 ليلة')
                          : pkg.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(pkg.hotelRating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-black text-white font-heading mb-3 group-hover:text-amber-300 transition-colors ${fontClass}`}>
                    {language === 'UR'
                      ? (pkg.id === 'umrah-vip-clock' ? 'وی آئی پی پلاٹینم حرم ویو عمرہ پیکج'
                        : pkg.id === 'umrah-deluxe-swiss' ? 'ڈیلکس فیملی حرم کمفرٹ پیکج'
                        : 'اکانومی ایکسٹینڈڈ رمضان و شوال پیکج')
                      : language === 'AR'
                      ? (pkg.id === 'umrah-vip-clock' ? 'باقة العمرة البلاتينية إطلالة الحرم VIP'
                        : pkg.id === 'umrah-deluxe-swiss' ? 'باقة العمرة العائلية ديلوكس القريبة'
                        : 'باقة العمرة الاقتصادية المميزة')
                      : pkg.title}
                  </h3>

                  {/* Hotels Distance Info */}
                  <div className={`space-y-2.5 mb-5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs ${fontClass}`}>
                    <div>
                      <span className="text-amber-300 font-bold block">
                        {language === 'UR' ? `مکہ مکرمہ (${pkg.nightsMakkah} راتیں)` : language === 'AR' ? `مكة المكرمة (${pkg.nightsMakkah} ليالٍ)` : `Makkah (${pkg.nightsMakkah} Nights)`}
                      </span>
                      <div className="text-gray-200 font-medium">{pkg.makkahHotel}</div>
                      <div className="text-[11px] text-gray-400">
                        {language === 'UR' ? 'حرم شریف کے بالکل متصل اور سامنے' : language === 'AR' ? 'مباشرة أمام ساحات الحرم المكي' : pkg.makkahHotelDistance}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-amber-300 font-bold block">
                        {language === 'UR' ? `مدینہ منورہ (${pkg.nightsMadinah} راتیں)` : language === 'AR' ? `المدينة المنورة (${pkg.nightsMadinah} ليالٍ)` : `Madinah (${pkg.nightsMadinah} Nights)`}
                      </span>
                      <div className="text-gray-200 font-medium">{pkg.madinahHotel}</div>
                      <div className="text-[11px] text-gray-400">
                        {language === 'UR' ? 'مسجد نبوی شریف کے مرکزی گیٹ پر' : language === 'AR' ? 'خطوات يسيرة إلى المسجد النبوي الشريف' : pkg.madinahHotelDistance}
                      </div>
                    </div>
                  </div>

                  {/* Inclusions Check List */}
                  <div className={`space-y-2 ${fontClass}`}>
                    <div className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                      {language === 'UR' ? 'پیکج کی سہولیات:' : language === 'AR' ? 'مميزات الباقة المشمولة:' : 'Package Inclusions:'}
                    </div>
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-200">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>
                          {language === 'UR'
                            ? (i === 0 ? 'سعودیہ یا پی آئی اے کی واپسی پروازیں'
                              : i === 1 ? '5 ستارہ فندق میں ناشتے سمیت قیام'
                              : i === 2 ? 'نجی ایئرکنڈیشنڈ لگژری گاڑی میں ٹرانسپورٹ'
                              : i === 3 ? 'مقدس مقامات (زیارات) کی باقاعدہ رہنمائی'
                              : i === 4 ? 'نسک ایپ کے ذریعے روضہ شریف پرمٹ'
                              : 'ایئرپورٹ پر 5 لیٹر آبِ زم زم کا تحفہ')
                            : language === 'AR'
                            ? (i === 0 ? 'تذاكر طيران ذهاب وعودة مجدولة'
                              : i === 1 ? 'إقامة فندقية فاخرة 5 نجوم شاملة الإفطار'
                              : i === 2 ? 'مواصلات خاصة بسيارات حديثة ومكيفة'
                              : i === 3 ? 'جولات مزارات دينية بصحبة مرشد متخصص'
                              : i === 4 ? 'تنسيق تصاريح نسك للعمرة والروضة الشريفة'
                              : 'هدية ماء زمزم 5 لتر لكل معتمر بالمطار')
                            : inc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & CTA Button */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      {language === 'UR' ? 'شروع قیمت' : language === 'AR' ? 'تبدأ من' : 'Starting From'}
                    </span>
                    <span className="text-2xl font-black text-amber-400 font-heading">
                      {formatCurrency(pkg.priceUSD, currency)}
                    </span>
                    <span className={`text-[11px] text-gray-300 block ${fontClass}`}>
                      {t.perPerson}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onBookUmrah(pkg)}
                      className={`px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-[#071A3D] font-black text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all ${fontClass}`}
                    >
                      <span>{language === 'UR' ? 'بکنگ کروائیں' : language === 'AR' ? 'احجز الآن' : 'Reserve'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </button>
                    <a
                      href={`https://wa.me/966502674930?text=${encodeURIComponent(`Assalam u Alaikum Muhammad Aamir Aziz, I want to book the Umrah package: ${pkg.title} (${pkg.duration}) starting from ${pkg.priceUSD} USD.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      title="Instant WhatsApp Booking with Muhammad Aamir Aziz"
                      className="p-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-colors flex items-center justify-center shadow-xs"
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
    </section>
  );
};
