import React from 'react';
import {
  Plane,
  Building2,
  Palmtree,
  FileCheck2,
  MoonStar,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { SERVICES } from '../data/travelData';
import { useLanguage } from '../context/LanguageContext';

interface FeaturedServicesProps {
  onServiceSelect: (serviceId: string, title: string) => void;
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({ onServiceSelect }) => {
  const { language, t } = useLanguage();
  const fontClass = language === 'UR' ? 'font-nastaliq' : language === 'AR' ? 'font-arabic' : 'font-sans';

  const badgeText =
    language === 'UR'
      ? 'جامع سفری سہولیات اور سروسز'
      : language === 'AR'
      ? 'خدمات سفر وسياحة متكاملة ومعتمدة'
      : 'Comprehensive Travel Solutions';

  const headingText = t.servicesTitle || 'Featured Travel Services';
  const subtitleText = t.servicesSubtitle || 'From individual flight bookings to VIP pilgrim journeys and corporate logistics, experience world-class reliability with T4TICKETS.';

  const getServiceData = (service: typeof SERVICES[0]) => {
    if (language === 'AR') {
      const arMap: Record<string, { title: string; subtitle: string; desc: string; cta: string; features: string[] }> = {
        flights: {
          title: 'حجوزات وإصدار التذاكر',
          subtitle: 'أفضل أسعار الطيران حول العالم',
          desc: 'إصدار فوري لجميع خطوط الطيران المعتمدة عالمياً عبر أنظمة أماديوس وسيبر مع تعديل فوري وأوزان إضافية مجانية.',
          cta: 'حجز تذكرة طيران',
          features: ['أسعار خاصة للخطوط السعودية وناس وأديل', 'تعديل واسترجاع فوري للتذاكر', 'إصدار تأكيد الحجز خلال 5 دقائق', 'متابعة الرحلات والتغييرات 24/7']
        },
        hotels: {
          title: 'حجوزات الفنادق العالمية',
          subtitle: 'فنادق مكة، المدينة وأرقى العواصم',
          desc: 'حجوزات مؤكدة في فنادق 4 و 5 نجوم المطلة على الحرمين الشريفين مع خيارات إفطار وضمان أفضل سعر رسمي.',
          cta: 'استعراض الفنادق',
          features: ['ضمان أفضل سعر رسمي مباشر', 'خيارات دفع مرنة وميسرة', 'خصومات حصرية لعملاء الوكالة', 'فنادق مطلة على ساحات الحرم']
        },
        holidays: {
          title: 'الباقات والبرامج السياحية',
          subtitle: 'رحلات عائلية وسياحية مخصصة',
          desc: 'برامج سياحية متكاملة تشمل الطيران، الفنادق، المواصلات الخاصة والجولات السياحية في أجمل وجهات العالم.',
          cta: 'عرض البرامج السياحية',
          features: ['جداول سياحية مصممة خصيصاً', 'مرشدون سياحيون عرب ومحليون', 'خطط دفع وسداد مرنة', 'باقات شهر العسل والعائلات']
        },
        visa: {
          title: 'خدمات التأشيرات وفحص وافد',
          subtitle: 'إنجاز رسمي وسريع بكل موثوقية',
          desc: 'تخليص ومتابعة تأشيرات الزيارة، السياحة، الشنغن، وحجز مواعيد فحص العمالة الوافدة (جامكا / وافد) لدول الخليج.',
          cta: 'تقديم طلب التأشيرة',
          features: ['معدل قبول واعتماد رسمي فائق 99.4%', 'مراجعة وتدقيق المستندات مسبقاً', 'مواعيد فحص وافد معتمدة وسريعة', 'متابعة مباشرة عبر الواتساب']
        },
        umrah: {
          title: 'باقات العمرة والزيارة VIP',
          subtitle: 'رحلات إيمانية فاخرة ومباركة',
          desc: 'باقات عمرة شاملة الإقامة بأبراج الحرم، النقل بسيارات VIP خاصة (جي إم سي يوكن)، تصاريح نسك، والمزارات الشريفة.',
          cta: 'حجز باقة العمرة',
          features: ['خطوات معدودة من ساحة الحرم المكي', 'أسطول سيارات حديث وفاخر VIP', 'جولات المزارات الدينية التاريخية', 'دعم كامل واستخراج تأشيرات وتصاريح']
        },
        corporate: {
          title: 'خدمات سفر الشركات ورجال الأعمال',
          subtitle: 'إدارة متكاملة لسفريات المؤسسات',
          desc: 'خدمات مخصصة لقطاع الأعمال تشمل مدير حساب خاص، فواتير موحدة، وأسعار تعاقدية تفضيلية على مدار العام.',
          cta: 'قسم سفر الشركات',
          features: ['تطبيق سياسات سفر الشركات بدقة', 'فواتير وتقارير شهرية موحدة', 'مدير حساب مباشر مخصص للشركة', 'خدمة مسؤولة على مدار الساعة']
        }
      };

      return arMap[service.id] || {
        title: service.titleAr || service.title,
        subtitle: service.subtitle,
        desc: service.description,
        cta: service.ctaText,
        features: service.features
      };
    }

    if (language === 'UR') {
      const urMap: Record<string, { title: string; subtitle: string; desc: string; cta: string; features: string[] }> = {
        flights: {
          title: 'ایئر لائن ٹکٹس کی بکنگ',
          subtitle: 'سستے ترین عالمی و ملکی کرائے',
          desc: 'سعودیہ، پی آئی اے، فلائی ناس، امارات اور ایئر سیال کے رعایتی کرائے، فوری ای ٹکٹ اور واٹس ایپ پر 24 گھنٹے مدد۔',
          cta: 'فلائٹ بک کریں',
          features: ['سعودیہ اور پی آئی اے کے خصوصی کرائے', 'فوری تاریخ کی تبدیلی و ریفنڈ', 'صرف 5 منٹ میں ای ٹکٹ کا اجراء', '24 گھنٹے فلائٹ اپڈیٹس و مانیٹرنگ']
        },
        hotels: {
          title: 'ہوٹل بکنگ سروس',
          subtitle: 'مکہ، مدینہ اور عالمی لگژری ہوٹل',
          desc: 'حرم کے بالکل سامنے فائیو اسٹار ہوٹلز اور دنیا کے بڑے شہروں میں مناسب ترین نرخوں پر پرسکون رہائش۔',
          cta: 'ہوٹلز دیکھیں',
          features: ['بہترین ریٹ کی باضابطہ گارنٹی', 'آسان اور محفوظ ادائیگی', 'کسٹمرز کے لیے خصوصی ڈسکاؤنٹ', 'حرم پاک کے متصل ہوٹلز']
        },
        holidays: {
          title: 'ہالیڈے و ٹور پیکجز',
          subtitle: 'دنیا بھر کی دلکش سیر و تفریح',
          desc: 'بیک وقت فلائٹس، نجی ٹرانسپورٹ، ہوٹل رہائش اور سیرو سیاحت پر مشتمل مکمل فیملی ہالیڈے پیکجز۔',
          cta: 'ٹور پیکجز دیکھیں',
          features: ['من پسند ٹریول شیڈول', 'اردو و انگریزی گائیڈز', 'آسان قسطوں اور ادائیگیاں', 'فیملی و ہنی مون اسپیشل']
        },
        visa: {
          title: 'ویزہ و وافد میڈیکل سروس',
          subtitle: 'فوری اور باضابطہ ویزہ پروسیسنگ',
          desc: 'سعودی فیملی وزٹ ویزہ، ٹورسٹ ویزہ، شینگن، یو کے اور گلف ممالک کے لیے وافد (GAMCA) میڈیکل سلپ کا فوری حصول۔',
          cta: 'ویزہ اپلائی کریں',
          features: ['99.4 فیصد باضابطہ منظوری کا تناسب', 'کاغذات و دستاویزات کی پیشگی جانچ', 'تیز ترین میڈیکل اپائنٹمنٹ سلپ', 'مکمل رہنمائی بذریعہ واٹس ایپ']
        },
        umrah: {
          title: 'وی آئی پی عمرہ و زیارات',
          subtitle: 'حرم ویو ہوٹل اور لگژری ٹرانسپورٹ',
          desc: 'مکہ و مدینہ کے فائیو اسٹار ہوٹلز، نجی جی ایم سی ٹرانسپورٹ، نسک پرمٹ اور تاریخی زیارات کے مکمل انتظامات۔',
          cta: 'عمرہ پیکج بک کریں',
          features: ['حرم پاک سے چند قدم کے فاصلے پر', 'نجی وی آئی پی گاڑیوں کا بیڑا', 'مقدس مقامات کی تفصیلی زیارات', 'سعودی الیکٹرانک عمرہ ویزہ پروسیسنگ']
        },
        corporate: {
          title: 'کارپوریٹ و بزنس ٹریول',
          subtitle: 'کمپنیوں کے لیے خصوصی سفری سہولیات',
          desc: 'ملازمین و ایگزیکٹوز کے لیے بزنس ٹورز، ماہانہ انوائسنگ، فلائٹ کنٹریکٹس اور 24 گھنٹے ڈیڈیکیٹڈ ڈیسک۔',
          cta: 'کارپوریٹ ڈیسک',
          features: ['کمپنی کی سفری پالیسی پر عملدرآمد', 'ماہانہ بلنگ اور شفاف اکاؤنٹس', 'ڈیڈیکیٹڈ اکاؤنٹ مینیجر', '24 گھنٹے ہنگامی سفری مدد']
        }
      };

      return urMap[service.id] || {
        title: service.title,
        subtitle: service.subtitle,
        desc: service.description,
        cta: service.ctaText,
        features: service.features
      };
    }

    return {
      title: service.title,
      subtitle: service.subtitle,
      desc: service.description,
      cta: service.ctaText,
      features: service.features
    };
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane':
        return <Plane className="w-6 h-6 text-[#E53935]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#E53935]" />;
      case 'Palmtree':
        return <Palmtree className="w-6 h-6 text-[#E53935]" />;
      case 'FileCheck2':
        return <FileCheck2 className="w-6 h-6 text-[#E53935]" />;
      case 'MoonStar':
        return <MoonStar className="w-6 h-6 text-[#E53935]" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-[#E53935]" />;
      default:
        return <Plane className="w-6 h-6 text-[#E53935]" />;
    }
  };

  return (
    <section id="services-section" className="py-20 bg-[#F7F8FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071A3D]/5 text-[#071A3D] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E53935]" />
            <span className={fontClass}>{badgeText}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black text-[#071A3D] font-heading tracking-tight ${fontClass}`}>
            {headingText}
          </h2>
          <p className={`mt-3 text-sm sm:text-base text-[#6B7280] ${fontClass}`}>
            {subtitleText}
          </p>
        </div>

        {/* 6 Premium Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => {
            const data = getServiceData(service);

            return (
              <div
                key={service.id}
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Subtle top accent highlight on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E53935] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Icon & Arabic Title Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                      {getServiceIcon(service.iconName)}
                    </div>
                    {service.titleAr && language === 'EN' && (
                      <span className="text-xs font-bold text-gray-400 font-arabic tracking-wide">
                        {service.titleAr}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-xl font-bold text-[#071A3D] font-heading group-hover:text-[#E53935] transition-colors ${fontClass}`}>
                    {data.title}
                  </h3>
                  <p className={`text-xs font-bold text-[#D62828] mt-1 ${fontClass}`}>{data.subtitle}</p>
                  <p className={`text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed ${fontClass}`}>
                    {data.desc}
                  </p>

                  {/* Features List */}
                  <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                    {data.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                        <span className={fontClass}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Inquiry & WhatsApp */}
                <div className="mt-6 pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onServiceSelect(service.id, data.title)}
                    className={`flex-1 py-2.5 px-3 rounded-xl border border-gray-200 group-hover:border-[#071A3D] group-hover:bg-[#071A3D] group-hover:text-white text-xs font-bold text-[#071A3D] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${fontClass}`}
                  >
                    <span>{data.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <a
                    href={`https://wa.me/966502674930?text=${encodeURIComponent(`Assalam u Alaikum Muhammad Aamir Aziz, I need urgent booking or rates for ${data.title} (${data.subtitle}).`)}`}
                    target="_blank"
                    rel="noreferrer"
                    title={`Instant WhatsApp Booking with Muhammad Aamir Aziz for ${data.title}`}
                    className="p-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-colors flex items-center justify-center shrink-0 shadow-2xs"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
