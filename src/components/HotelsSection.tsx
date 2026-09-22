import React from 'react';
import { Building2, Star, MapPin, Check, Wifi, Sparkles, ArrowRight } from 'lucide-react';
import { CurrencyCode, HotelItem } from '../types';
import { HOTELS } from '../data/travelData';
import { formatCurrency } from '../utils/formatters';
import { useLanguage } from '../context/LanguageContext';

interface HotelsSectionProps {
  currency: CurrencyCode;
  onBookHotel: (hotel: HotelItem) => void;
}

export const HotelsSection: React.FC<HotelsSectionProps> = ({ currency, onBookHotel }) => {
  const { language } = useLanguage();
  const fontClass = language === 'UR' ? 'font-nastaliq' : language === 'AR' ? 'font-arabic' : 'font-sans';

  const getLocalizedTag = (tag: string) => {
    if (language === 'AR') {
      const map: Record<string, string> = {
        'Haram Front': 'إطلالة مباشرة على الحرم',
        'Clock Tower': 'برج الساعة الملكي',
        'Burj Al Arab View': 'إطلالة برج العرب',
        'Bosphorus View': 'إطلالة البوسفور'
      };
      return map[tag] || tag;
    }
    if (language === 'UR') {
      const map: Record<string, string> = {
        'Haram Front': 'حرم کے بالکل سامنے',
        'Clock Tower': 'کلاک ٹاور مکہ',
        'Burj Al Arab View': 'برج العرب ویو',
        'Bosphorus View': 'باسفورس ویو'
      };
      return map[tag] || tag;
    }
    return tag;
  };

  const getLocalizedAmenity = (amenity: string) => {
    if (language === 'AR') {
      const map: Record<string, string> = {
        'Free WiFi': 'واي فاي مجاني',
        'Breakfast Included': 'شامل الإفطار',
        'Haram View': 'إطلالة على الحرم',
        'Private Beach': 'شاطئ خاص',
        'Infinity Pool': 'مسبح لامتناهي',
        'Butler Service': 'خدمة المساعد الشخصي',
        'Spa': 'سبا ونادي صحي',
        'Historical': 'موقع تاريخي',
        'Near Metro': 'قريب من المترو'
      };
      return map[amenity] || amenity;
    }
    if (language === 'UR') {
      const map: Record<string, string> = {
        'Free WiFi': 'مفت وائی فائی',
        'Breakfast Included': 'ناشتہ شامل',
        'Haram View': 'حرم ویو',
        'Private Beach': 'نجی ساحل',
        'Infinity Pool': 'انفینٹی پول',
        'Butler Service': 'بٹلر سروس',
        'Spa': 'اسپا و ہیلتھ کلب',
        'Historical': 'تاریخی مقام',
        'Near Metro': 'میٹرو کے قریب'
      };
      return map[amenity] || amenity;
    }
    return amenity;
  };

  return (
    <section id="hotels-section" className={`py-20 bg-white ${fontClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071A3D]/5 text-[#071A3D] text-xs font-bold uppercase tracking-wider mb-3 ${fontClass}`}>
              <Building2 className="w-3.5 h-3.5 text-[#E53935]" />
              <span>
                {language === 'UR'
                  ? '5-اسٹار پرتعیش قیام و ہوٹلز'
                  : language === 'AR'
                  ? 'إقامات فندقية 5 نجوم فاخرة'
                  : '5-Star Luxury Accommodations'}
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-black text-[#071A3D] font-heading tracking-tight ${fontClass}`}>
              {language === 'UR'
                ? 'مکہ، مدینہ اور عالمی معیاری ہوٹلز و ریزورٹس'
                : language === 'AR'
                ? 'فنادق ومنتجعات عالمية مختارة بعناية'
                : 'Curated World-Class Hotels & Resorts'}
            </h2>
            <p className={`mt-2 text-sm text-gray-500 ${fontClass}`}>
              {language === 'UR'
                ? 'تصدیق شدہ مسافروں کے جائزوں، خصوصی اپ گریڈز اور لچکدار چیک آؤٹ کے ساتھ شاندار قیام۔'
                : language === 'AR'
                ? 'أرقى الفنادق المطلة على الحرمين الشريفين وأشهر العواصم العالمية مع ضمان أفضل الأسعار.'
                : 'Handpicked luxury properties offering verified guest reviews, complimentary upgrades, and flexible checkout.'}
            </p>
          </div>
        </div>

        {/* 4 Cards Luxury Hotel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOTELS.map((hotel) => (
            <div
              key={hotel.id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Hotel Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className={`absolute top-3 left-3 bg-[#071A3D]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg ${fontClass}`}>
                    {getLocalizedTag(hotel.tag)}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1 font-extrabold bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{hotel.rating}</span>
                      <span className="text-[10px] text-gray-300 font-normal">({hotel.reviewsCount})</span>
                    </div>
                    <div className="text-[11px] text-gray-200 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E53935]" />
                      <span>{hotel.city}</span>
                    </div>
                  </div>
                </div>

                {/* Hotel Body */}
                <div className="p-5">
                  <h3 className="font-extrabold text-base text-[#071A3D] font-heading group-hover:text-[#E53935] transition-colors line-clamp-1">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{hotel.city}, {hotel.country}</p>

                  {/* Amenities */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {hotel.amenities.slice(0, 3).map((amenity, i) => (
                      <span
                        key={i}
                        className={`text-[10px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded ${fontClass}`}
                      >
                        {getLocalizedAmenity(amenity)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Book CTA */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-400 line-through">
                      {formatCurrency(hotel.originalPriceUSD, currency)}
                    </div>
                    <div className={`text-lg font-black text-[#071A3D] ${fontClass}`}>
                      {formatCurrency(hotel.pricePerNightUSD, currency)}
                      <span className={`text-[11px] font-normal text-gray-500 ${fontClass}`}>
                        {language === 'UR' ? ' / فی رات' : language === 'AR' ? ' / ليلة' : ' / night'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onBookHotel(hotel)}
                    className={`px-4 py-2 rounded-xl bg-[#071A3D] hover:bg-[#E53935] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer ${fontClass}`}
                  >
                    {language === 'UR' ? 'کمرہ بک کریں' : language === 'AR' ? 'احجز الغرفة' : 'Book Room'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
