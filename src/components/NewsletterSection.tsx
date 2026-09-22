import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Plane, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const NewsletterSection: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const fontClass = language === 'UR' ? 'font-nastaliq' : language === 'AR' ? 'font-arabic' : 'font-sans';
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section id="newsletter-section" className={`py-16 bg-white relative overflow-hidden ${fontClass}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#071A3D] via-[#0D2C63] to-[#071A3D] p-8 sm:p-14 text-white overflow-hidden shadow-2xl border border-white/10">
          {/* Subtle Animated Flight Route Graphic in Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M -50,150 Q 250,20 600,120 T 1200,60"
                fill="none"
                stroke="#E53935"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>
            <div className="absolute top-10 right-20 text-[#E53935]">
              <Plane className="w-8 h-8 transform rotate-45" />
            </div>
          </div>

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/15 mb-4 ${fontClass}`}>
              <Sparkles className="w-3.5 h-3.5 text-[#E53935]" />
              <span>
                {language === 'UR'
                  ? 'خصوصی فلائٹ آفرز الرٹ'
                  : language === 'AR'
                  ? 'تنبيهات العروض الحصرية والخصومات'
                  : 'Private Fare Alerts'}
              </span>
            </div>

            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight ${fontClass}`}>
              {language === 'UR'
                ? 'سب سے سستی فلائٹس اور آفرز سب سے پہلے حاصل کریں'
                : language === 'AR'
                ? 'احصل على أقوى عروض وتخفيضات الطيران قبل الجميع'
                : 'Get Exclusive Travel Deals Before Anyone Else'}
            </h2>

            <p className={`mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed ${fontClass}`}>
              {language === 'UR'
                ? 'فلیش ایئر فیئرز، چھٹیوں کے ڈسکاؤنٹس اور عمرہ ترجیحی بکنگ کی تازہ ترین تفصیلات براہ راست موصول کریں۔'
                : language === 'AR'
                ? 'اشترك ليصلك أحدث العروض السرية، تخفيضات تذاكر الطيران، وباقات العمرة الاقتصادية والفاخرة مباشرة.'
                : 'Subscribe to secret flash airfares, holiday discounts, and Umrah priority booking windows sent directly to your inbox.'}
            </p>

            {/* Form */}
            {subscribed ? (
              <div className={`mt-8 p-4 rounded-2xl bg-[#16A34A]/20 border border-[#16A34A]/40 flex items-center justify-center gap-3 text-white text-sm font-bold ${fontClass}`}>
                <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                <span>
                  {language === 'UR'
                    ? 'شکریہ! آپ ٹی فور ٹکٹس کے خصوصی فلیش فیئرز کے لیے سبسکرائب ہو چکے ہیں۔'
                    : language === 'AR'
                    ? 'شكراً لك! تم اشتراكك بنجاح في نشرة عروض وخصومات تي فور للتذاكر والسياحة.'
                    : 'Thank you! You are now subscribed to T4Tickets exclusive flash fares.'}
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto"
              >
                <div className="w-full relative flex items-center">
                  <Mail className={`w-5 h-5 text-gray-400 absolute ${isRTL ? 'right-4' : 'left-4'} pointer-events-none`} />
                  <input
                    type="email"
                    required
                    placeholder={
                      language === 'UR'
                        ? 'اپنا ای میل درج کریں (مثال: user@example.com)'
                        : language === 'AR'
                        ? 'أدخل بريدك الإلكتروني (مثال: user@example.com)'
                        : 'Enter your email (e.g. t4tickets@gmail.com)'
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-[#071A3D] text-xs sm:text-sm font-semibold outline-none border border-white/20 focus:border-white transition-all placeholder:text-gray-400 ${fontClass}`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#D62828] to-[#E53935] hover:brightness-110 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-[#D62828]/40 whitespace-nowrap transition-all duration-200 cursor-pointer ${fontClass}`}
                >
                  <span>{language === 'UR' ? 'سبسکرائب کریں' : language === 'AR' ? 'اشترك الآن' : 'Subscribe'}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </form>
            )}

            <div className={`mt-4 text-[11px] text-gray-400 ${fontClass}`}>
              {language === 'UR'
                ? 'کوئی غیر متعلقہ پیغامات نہیں • باضابطہ ای میل: T4tickets@gmail.com • کسی بھی وقت ان سبسکرائب کریں۔'
                : language === 'AR'
                ? 'لا نرسل رسائل مزعجة إطلاقاً • الاستفسارات الرسمية: T4tickets@gmail.com • يمكنك إلغاء الاشتراك بأي وقت.'
                : 'No spam. Official inquiries: t4tickets@gmail.com • Unsubscribe anytime.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
