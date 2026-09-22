import React, { useEffect, useState } from 'react';
import {
  ShieldCheck,
  Award,
  Headphones,
  RefreshCw,
  Globe2,
  Users2,
  CheckCircle2,
  Plane,
  Building,
  Sparkles
} from 'lucide-react';
import { STATS } from '../data/travelData';
import { useLanguage } from '../context/LanguageContext';

export const WhyChooseUs: React.FC = () => {
  const { language, t } = useLanguage();
  const fontClass = language === 'UR' ? 'font-nastaliq' : language === 'AR' ? 'font-arabic' : 'font-sans';

  const [counterValues, setCounterValues] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const duration = 2000;
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounterValues(
        STATS.map((stat) => Math.floor(stat.number * ease))
      );

      if (step >= steps) {
        clearInterval(timer);
        setCounterValues(STATS.map((s) => s.number));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const getStatsLabels = (idx: number) => {
    if (language === 'AR') {
      const arStats = [
        { label: 'تذكرة صادرة بنجاح', desc: 'عبر الخطوط العالمية' },
        { label: 'معتمر بخدمة VIP', desc: 'فنادق الحرمين الشريفين' },
        { label: 'نسبة رضا العملاء', desc: 'مراجعات وتقييمات إيجابية' },
        { label: 'دعم مباشر 24/7', desc: 'خدمة العملاء والواتساب' }
      ];
      return arStats[idx] || STATS[idx];
    }
    if (language === 'UR') {
      const urStats = [
        { label: 'کامیاب ای ٹکٹس جاری', desc: 'تمام عالمی ایئر لائنز' },
        { label: 'وی آئی پی معتمرین', desc: 'فائیو اسٹار ہوٹل و ٹرانسپورٹ' },
        { label: 'کسٹمر اطمینان کا تناسب', desc: 'مصدقہ تعریفی جائزے' },
        { label: '24 گھنٹے لائیو سروس', desc: 'واٹس ایپ و کال سپورٹ' }
      ];
      return urStats[idx] || STATS[idx];
    }
    return STATS[idx];
  };

  const getBenefits = () => {
    if (language === 'AR') {
      return [
        {
          title: 'ضمان أفضل الأسعار',
          desc: 'حجوزات مباشرة من أنظمة الطيران العالمية (GDS) دون أي رسوم إضافية مخفية وبأقل التكاليف.',
          icon: Award
        },
        {
          title: 'نظام حجز إلكتروني آمن',
          desc: 'حماية وتشفير متكامل لجميع معاملات بطاقات مدى، فيزا والماستركارد مع أمان البيانات.',
          icon: ShieldCheck
        },
        {
          title: 'خدمة عملاء على مدار 24/7',
          desc: 'فريق متخصص باللغتين العربية والإنجليزية لخدمتكم فوراً عبر +966 50 267 4930 و +92 301 7355753.',
          icon: Headphones
        },
        {
          title: 'خيارات سفر مرنة وميسرة',
          desc: 'مرونة في تعديل مواعيد الرحلات، إعادة الإصدار، ومعالجة الاسترجاع لدى مكاتب الطيران مباشرة.',
          icon: RefreshCw
        },
        {
          title: 'شبكة خطوط طيران عالمية',
          desc: 'اتفاقيات إصدار تذاكر مع أكثر من 300 شركة طيران دولية ومحلية لجميع الوجهات العالمية.',
          icon: Globe2
        },
        {
          title: 'خبراء سفر معتمدون',
          desc: 'مقرنا في المملكة العربية السعودية مع مكاتب ودعم محلي في بارق، المجاردة، محايل عسير، وأبها.',
          icon: Users2
        }
      ];
    }

    if (language === 'UR') {
      return [
        {
          title: 'بہترین اور سستے ریٹ کی گارنٹی',
          desc: 'ڈائریکٹ ایئر لائن ہول سیل جی ڈی ایس سسٹمز کے ذریعے بغیر کسی پوشیدہ چارجز کے سب سے کم کرائے۔',
          icon: Award
        },
        {
          title: 'محفوظ ترین بکنگ نظام',
          desc: 'بین الاقوامی حفاظتی معیارات کے ساتھ بینک کارڈز، ایزی پیسہ اور مادا ٹرانزیکشنز کا تحفظ۔',
          icon: ShieldCheck
        },
        {
          title: '24 گھنٹے کسٹمر کیئر سپورٹ',
          desc: 'اردو، عربی اور انگریزی بولنے والے ٹریول ایکسپرٹس محمد عامر عزیز کے زیر انتظام 24 گھنٹے دستیاب۔',
          icon: Headphones
        },
        {
          title: 'لچکدار سفری سہولیات',
          desc: 'تاریخ کی فوری تبدیلی، روٹ اپڈیٹ اور باضابطہ ریفنڈز کی بر وقت اور آسان فراہمی۔',
          icon: RefreshCw
        },
        {
          title: 'عالمی ایئر لائن نیٹ ورک',
          desc: 'دنیا کی 300 سے زائد نامور ایئر لائنز کے ساتھ براہ راست ٹکٹنگ کنٹریکٹس اور معاہدے۔',
          icon: Globe2
        },
        {
          title: 'قابلِ اعتماد ٹریول ایکسپرٹس',
          desc: 'سعودی عرب (بارق، المجاردہ، محايل عسير، ابہا) اور پاکستان میں طویل سالہ تجربہ کار ٹیم۔',
          icon: Users2
        }
      ];
    }

    return [
      {
        title: 'Best Price Guarantee',
        desc: 'Direct GDS wholesale airline contracting delivers competitive fares without concealed booking fees.',
        icon: Award
      },
      {
        title: 'Secure Booking System',
        desc: 'PCI-DSS certified payment architecture safeguarding cards, Mada transactions, and personal credentials.',
        icon: ShieldCheck
      },
      {
        title: '24/7 Customer Support',
        desc: 'Multilingual round-the-clock Arabic & English travel specialists reachable via +966 50 267 4930 (KSA) and +92 301 7355753 (PK).',
        icon: Headphones
      },
      {
        title: 'Flexible Travel Options',
        desc: 'Quick date changes, voluntary rerouting, and expedited refunds processed directly with carrier desks.',
        icon: RefreshCw
      },
      {
        title: 'Global Airline Network',
        desc: 'Ticketing agreements with 300+ major national and international legacy carriers worldwide.',
        icon: Globe2
      },
      {
        title: 'Trusted Travel Experts',
        desc: 'Headquartered in the Kingdom with dedicated regional service desks in Bariq, Al Majardah, Muhayil Asir, and Abha.',
        icon: Users2
      }
    ];
  };

  const benefits = getBenefits();

  const badgeText = language === 'UR' ? 'ٹی فور کے امتیازی فوائد' : language === 'AR' ? 'مزايا تي فور الحصرية' : 'The T4 Advantage';
  const headingText = t.whyUsTitle || 'Why Discerning Travelers Choose T4Tickets';
  const subtitleText = t.whyUsSubtitle || 'Operating with enterprise transparency, airline-grade ticketing technology, and rooted local expertise throughout Saudi Arabia and abroad.';

  const authBadgeTitle = language === 'UR' ? 'مصدقہ و باضابطہ ایجنسی' : language === 'AR' ? 'وكالة معتمدة ومرخصة' : 'Authorized Agency';
  const authBadgeSub = language === 'UR' ? 'آئیٹا اور سعودی ٹورازم سے تصدیق شدہ' : language === 'AR' ? 'شهادة الأياتا وهيئة السياحة السعودية' : 'IATA & Saudi Tourism Certified';

  const gdsBadgeTitle = language === 'UR' ? 'براہ راست ایئر لائن GDS' : language === 'AR' ? 'ربط مباشر بأنظمة الطيران' : 'Direct Airline GDS';
  const gdsBadgeSub = language === 'UR' ? 'فوری اور تیز ترین ای ٹکٹنگ' : language === 'AR' ? 'إصدار تذاكر إلكتروني فوري' : 'Fast-Track e-Ticketing';

  return (
    <section id="why-us-section" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Counter Badges Bar */}
        <div className="mb-20 bg-gradient-to-r from-[#071A3D] via-[#0D2C63] to-[#071A3D] rounded-3xl p-8 sm:p-10 shadow-xl text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-white/10">
            {STATS.map((stat, idx) => {
              const localizedStat = getStatsLabels(idx);

              return (
                <div key={idx} className="text-center pt-4 sm:pt-0 sm:px-4">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#E53935] tracking-tight">
                    {counterValues[idx].toLocaleString()}
                    <span className="text-white">{stat.suffix}</span>
                  </div>
                  <div className={`text-sm sm:text-base font-extrabold text-white mt-1 ${fontClass}`}>
                    {localizedStat.label}
                  </div>
                  <div className={`text-xs text-gray-300 mt-0.5 ${fontClass}`}>
                    {localizedStat.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: High Quality Travel Industry Illustration & Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=75"
                alt="International Aviation Airport Concourse"
                loading="lazy"
                decoding="async"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/80 via-transparent to-transparent" />

              {/* Floating Verified Badge */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-white/40 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className={`text-xs font-black text-[#071A3D] ${fontClass}`}>{authBadgeTitle}</div>
                  <div className={`text-[10px] text-gray-500 ${fontClass}`}>{authBadgeSub}</div>
                </div>
              </div>

              {/* Floating Route Badge */}
              <div className="absolute bottom-6 right-6 bg-[#071A3D]/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-white/20 text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E53935] flex items-center justify-center text-white">
                  <Plane className="w-5 h-5 transform -rotate-45" />
                </div>
                <div>
                  <div className={`text-xs font-black ${fontClass}`}>{gdsBadgeTitle}</div>
                  <div className={`text-[10px] text-gray-300 ${fontClass}`}>{gdsBadgeSub}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Benefits List */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#D62828] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E53935]" />
                <span className={fontClass}>{badgeText}</span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black text-[#071A3D] font-heading tracking-tight ${fontClass}`}>
                {headingText}
              </h2>
              <p className={`mt-2 text-sm text-gray-600 ${fontClass}`}>
                {subtitleText}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border border-gray-100 bg-[#F7F8FA] hover:bg-white hover:border-[#071A3D]/20 hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#E53935] mb-3 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className={`text-sm font-extrabold text-[#071A3D] font-heading ${fontClass}`}>{b.title}</h3>
                    <p className={`text-xs text-gray-500 mt-1 leading-relaxed ${fontClass}`}>{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
