import React, { useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/travelData';
import { useLanguage } from '../context/LanguageContext';

export const TestimonialsSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const fontClass = language === 'UR' ? 'font-nastaliq' : language === 'AR' ? 'font-arabic' : 'font-sans';
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[activeIndex];

  const getLocalizedTripType = (tripType: string) => {
    if (language === 'AR') {
      const map: Record<string, string> = {
        'Family Vacation': 'عطلة عائلية',
        'VIP Umrah Journey': 'رحلة عمرة VIP',
        'Business Class': 'درجة رجال الأعمال',
        'Direct Flight': 'رحلة مباشرة',
        'Work Visa Travel': 'سفر تأشيرة عمل'
      };
      return map[tripType] || tripType;
    }
    if (language === 'UR') {
      const map: Record<string, string> = {
        'Family Vacation': 'خاندانی تعطیلات',
        'VIP Umrah Journey': 'وی آئی پی عمرہ سفر',
        'Business Class': 'بزنس کلاس',
        'Direct Flight': 'براہ راست پرواز',
        'Work Visa Travel': 'ورک ویزا سفر'
      };
      return map[tripType] || tripType;
    }
    return tripType;
  };

  return (
    <section id="testimonials-section" className={`py-20 bg-[#F7F8FA] relative overflow-hidden ${fontClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071A3D]/5 text-[#071A3D] text-xs font-bold uppercase tracking-wider mb-3 ${fontClass}`}>
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>
              {language === 'UR'
                ? 'مسافروں کے تاثرات و تجربات'
                : language === 'AR'
                ? 'آراء وتجارب المسافرين المعتمدة'
                : 'Passenger Experiences'}
            </span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black text-[#071A3D] font-heading tracking-tight ${fontClass}`}>
            {language === 'UR'
              ? '500,000 سے زائد مطمئن مسافروں کا اعتماد'
              : language === 'AR'
              ? 'موثوق من أكثر من 500,000 مسافر حول العالم'
              : 'Loved by Over 500,000 Travelers'}
          </h2>
          <p className={`mt-2 text-sm text-gray-600 ${fontClass}`}>
            {language === 'UR'
              ? 'خاندانوں، تجارتی اداروں اور زائرین عمرہ کی جانب سے ٹی فور ٹکٹس کی سروسز پر حقیقی آراء۔'
              : language === 'AR'
              ? 'اقرأ تجارب حقيقية لعائلات، رجال أعمال ومعتمرين اختاروا تي فور للتذاكر والسياحة.'
              : 'Read real feedback from families, corporate executives, and pilgrims who trusted T4Tickets.'}
          </p>
        </div>

        {/* Carousel Showcase */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl">
            <Quote className={`w-12 h-12 text-[#E53935]/15 absolute top-8 ${isRTL ? 'right-8' : 'left-8'} -z-0`} />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Avatar & Route */}
              <div className="flex flex-col items-center text-center shrink-0">
                <div className="relative">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-[#071A3D]/10 shadow-md"
                  />
                  <div className={`absolute -bottom-1 ${isRTL ? '-left-1' : '-right-1'} bg-[#16A34A] text-white p-1 rounded-full border-2 border-white`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h4 className={`font-extrabold text-base text-[#071A3D] mt-3 ${fontClass}`}>{current.name}</h4>
                <p className={`text-xs text-gray-500 ${fontClass}`}>{current.cityCountry}</p>
                <span className={`mt-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-100 ${fontClass}`}>
                  {getLocalizedTripType(current.tripType)}
                </span>
              </div>

              {/* Review Content */}
              <div className={`flex-1 text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
                {/* Rating Stars */}
                <div className={`flex items-center justify-center ${isRTL ? 'md:justify-start' : 'md:justify-start'} gap-1 text-amber-400 mb-3`}>
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <blockquote className={`text-base sm:text-lg font-medium text-gray-800 italic leading-relaxed ${fontClass}`}>
                  "{current.review}"
                </blockquote>

                <div className={`mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 ${fontClass}`}>
                  <span>
                    {language === 'UR' ? 'روٹ / پرواز: ' : language === 'AR' ? 'خط السير: ' : 'Itinerary: '}
                    <strong className="text-[#071A3D] font-mono">{current.route}</strong>
                  </span>
                  <span>{current.date}</span>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === i ? 'w-6 bg-[#E53935]' : 'w-2 bg-gray-200 hover:bg-gray-300'
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={isRTL ? next : prev}
                  className="w-9 h-9 rounded-xl border border-gray-200 hover:border-[#071A3D] flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
                <button
                  onClick={isRTL ? prev : next}
                  className="w-9 h-9 rounded-xl bg-[#071A3D] hover:bg-[#0D2C63] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
