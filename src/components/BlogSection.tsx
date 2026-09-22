import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X } from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/travelData';
import { useLanguage } from '../context/LanguageContext';

export const BlogSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const fontClass = language === 'UR' ? 'font-nastaliq' : language === 'AR' ? 'font-arabic' : 'font-sans';
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const getLocalizedCategory = (category: string) => {
    if (language === 'AR') {
      const map: Record<string, string> = {
        'Umrah Guidance': 'دليل العمرة',
        'Baggage Rules': 'لوائح الأمتعة',
        'Visa Policies': 'إجراءات التأشيرات'
      };
      return map[category] || category;
    }
    if (language === 'UR') {
      const map: Record<string, string> = {
        'Umrah Guidance': 'رہنمائے عمرہ',
        'Baggage Rules': 'سامان کے قواعد',
        'Visa Policies': 'ویزا پالیسیز'
      };
      return map[category] || category;
    }
    return category;
  };

  return (
    <section id="blog-section" className={`py-20 bg-[#F7F8FA] ${fontClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071A3D]/5 text-[#071A3D] text-xs font-bold uppercase tracking-wider mb-3 ${fontClass}`}>
              <BookOpen className="w-3.5 h-3.5 text-[#E53935]" />
              <span>
                {language === 'UR'
                  ? 'سفری رہنما و تازہ ترین معلومات'
                  : language === 'AR'
                  ? 'أدلة السفر ومعلومات الطيران'
                  : 'Travel Guides & Intelligence'}
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-black text-[#071A3D] font-heading tracking-tight ${fontClass}`}>
              {language === 'UR'
                ? 'ایوی ایشن کے تازہ رجحانات اور سفری ہدایات'
                : language === 'AR'
                ? 'آخر أخبار الطيران والتعليمات الملاحية'
                : 'Latest Industry Insights & Advisories'}
            </h2>
            <p className={`mt-2 text-sm text-gray-600 ${fontClass}`}>
              {language === 'UR'
                ? 'ایئرلائن پالیسیز، بین الاقوامی ویزا اپ ڈیٹس اور سفری آسانیوں سے باخبر رہیں۔'
                : language === 'AR'
                ? 'كن على اطلاع دائم بسياسات شركات الطيران الدولية، تحديثات التأشيرات ونصائح السفر.'
                : 'Stay ahead with verified airline policies, international visa updates, and insider tips from our travel coordinators.'}
            </p>
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} bg-[#071A3D]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-lg ${fontClass}`}>
                    {getLocalizedCategory(post.category)}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2.5">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className={`text-base sm:text-lg font-bold text-[#071A3D] font-heading group-hover:text-[#E53935] transition-colors leading-snug ${fontClass}`}>
                    {post.title}
                  </h3>

                  <p className={`mt-2.5 text-xs text-gray-600 leading-relaxed line-clamp-3 ${fontClass}`}>
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className={`text-[11px] text-gray-500 font-medium ${fontClass}`}>
                    {language === 'UR' ? `تحریر: ${post.author}` : language === 'AR' ? `بقلم: ${post.author}` : `By ${post.author}`}
                  </span>
                  <button
                    onClick={() => setActivePost(post)}
                    className={`text-xs font-bold text-[#071A3D] group-hover:text-[#E53935] flex items-center gap-1 transition-colors cursor-pointer ${fontClass}`}
                  >
                    <span>{language === 'UR' ? 'مکمل مضمون' : language === 'AR' ? 'قراءة الدليل' : 'Read Guide'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto ${fontClass}`}>
            <button
              onClick={() => setActivePost(null)}
              className={`absolute top-5 ${isRTL ? 'left-5' : 'right-5'} p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer`}
            >
              <X className="w-5 h-5" />
            </button>

            <span className={`px-3 py-1 rounded-lg bg-red-100 text-[#D62828] text-xs font-bold uppercase ${fontClass}`}>
              {getLocalizedCategory(activePost.category)}
            </span>

            <h3 className={`text-2xl font-black text-[#071A3D] font-heading mt-3 mb-2 ${fontClass}`}>
              {activePost.title}
            </h3>

            <div className="text-xs text-gray-400 mb-6 flex items-center gap-3">
              <span>{activePost.date}</span>
              <span>•</span>
              <span>{activePost.author}</span>
              <span>•</span>
              <span>{activePost.readTime}</span>
            </div>

            <div className="rounded-2xl overflow-hidden mb-6 h-60">
              <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" />
            </div>

            <div className={`space-y-4 text-sm text-gray-700 leading-relaxed ${fontClass}`}>
              <p className="font-semibold text-gray-900">{activePost.excerpt}</p>
              <p>
                {language === 'UR'
                  ? 'بین الاقوامی اسفار یا مبارک عمرہ سفر کے دوران درست دستاویزات اور بروقت منصوبہ بندی کامیابی کی ضامن ہے۔ ٹی فور ٹکٹس ہمہ وقت عالمی ایوی ایشن پالیسیز اور ویزا شرائط کی نگرانی کرتا ہے۔'
                  : language === 'AR'
                  ? 'عند التخطيط للسفر التجاري الدولي أو رحلات العمرة المباركة، فإن دقة المواعيد وصحة المستندات هما الأساس. تتابع تي فور للتذاكر والسياحة باستمرار تعليمات الطيران المدني وتحديثات التأشيرات في أكثر من 150 دولة.'
                  : 'When planning commercial international travel or sacred pilgrimages, timing and documentation accuracy are paramount. T4TICKETS continuously monitors global consular advisories, codeshare agreement adjustments, and health protocols across more than 150 nations.'}
              </p>
              <p>
                {language === 'UR'
                  ? 'ہماری خصوصی ٹریول ٹیمیں سول ایوی ایشن اور ایاٹا ہبز کے ساتھ براہ راست ہم آہنگی سے کام کرتی ہیں تاکہ آپ کے لیے بہترین نشستیں اور سہولیات یقینی بنائی جا سکیں۔'
                  : language === 'AR'
                  ? 'تقوم فرق السفر المتخصصة لدينا بالتنسيق المباشر مع الهيئة العامة للطيران المدني (GACA) ومراكز إياتا الدولية لضمان أفضل المقاعد وخيارات السفر لعملائنا الكرام.'
                  : 'Our specialized travel teams coordinate directly with the General Authority of Civil Aviation (GACA) and international IATA hubs to secure seat inventory and priority check-in rights for our clients.'}
              </p>
              <div className={`p-4 rounded-xl bg-[#F7F8FA] border border-gray-200 text-xs text-gray-600 ${fontClass}`}>
                <strong>
                  {language === 'UR'
                    ? 'کیا آپ کو ویزا مشاورت یا خصوصی بکنگ درکار ہے؟ '
                    : language === 'AR'
                    ? 'هل تحتاج استشارة تأشيرة أو تخطيط برنامج سفر؟ '
                    : 'Need custom visa advice or itinerary planning? '}
                </strong>
                {language === 'UR'
                  ? 'ہمارے دفاتر سے رابطہ کریں یا واٹس ایپ پر رابطہ کریں: 966502674930+'
                  : language === 'AR'
                  ? 'تواصل معنا مباشرة عبر الواتساب على الرقم: 966502674930+'
                  : 'Contact our travel desks or reach out via WhatsApp at +966 50 267 4930.'}
              </div>
            </div>

            <button
              onClick={() => setActivePost(null)}
              className={`mt-6 w-full py-3 rounded-xl bg-[#071A3D] text-white text-xs font-bold hover:bg-[#0D2C63] cursor-pointer ${fontClass}`}
            >
              {language === 'UR' ? 'آرٹیکل بند کریں' : language === 'AR' ? 'إغلاق المقال' : 'Close Article'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
