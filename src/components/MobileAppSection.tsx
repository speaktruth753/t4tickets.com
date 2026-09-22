import React from 'react';
import {
  Smartphone,
  QrCode,
  CheckCircle2,
  Bell,
  Ticket,
  Lock,
  ArrowRight,
  Plane,
  Apple
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const MobileAppSection: React.FC = () => {
  const { language } = useLanguage();
  const fontClass = language === 'UR' ? 'font-nastaliq' : language === 'AR' ? 'font-arabic' : 'font-sans';

  const appFeatures = [
    {
      title:
        language === 'UR'
          ? 'فوری بکنگ اور تاریخوں کی تبدیلی'
          : language === 'AR'
          ? 'حجز وتعديل فوري للتذاكر'
          : 'Instant Booking & Rebooking',
      desc:
        language === 'UR'
          ? 'محفوظ مسافر پروفائل کے ساتھ صرف 3 کلکس میں پروموشنل فلائٹس اور ہوٹل لاک کریں۔'
          : language === 'AR'
          ? 'تأكيد فوري للرحلات وحجوزات الفنادق خلال ثوانٍ مع حفظ بيانات المسافرين.'
          : 'Lock promotional flight and hotel fares in 3 taps with saved passenger profiles.',
      icon: Ticket
    },
    {
      title:
        language === 'UR'
          ? 'ریئل ٹائم گیٹ اور تاخیر الرٹس'
          : language === 'AR'
          ? 'تنبيهات فورية للبوابات ومواعيد الإقلاع'
          : 'Real-time Gate & Delay Alerts',
      desc:
        language === 'UR'
          ? 'ٹرمینل میں تبدیلی کے لائیو نوٹیفکیشنز، بورڈنگ الرٹس اور سامان بیلٹ کی اپ ڈیٹس۔'
          : language === 'AR'
          ? 'إشعارات حية لتغيير بوابات الصعود، مواعيد الإقلاع وتتبع حقائب السفر.'
          : 'Live terminal change notifications, push alerts for boarding, and baggage carousels.',
      icon: Bell
    },
    {
      title:
        language === 'UR'
          ? 'موبائل چیک ان اور آف لائن بورڈنگ پاس'
          : language === 'AR'
          ? 'إصدار بطاقة صعود الطائرة بدون إنترنت'
          : 'Mobile Check-in & Offline Boarding Pass',
      desc:
        language === 'UR'
          ? 'ایپل والیٹ یا گوگل والیٹ میں بورڈنگ پاس محفوظ کریں بغیر کاغذ کے سفر کریں۔'
          : language === 'AR'
          ? 'أضف بطاقة الصعود مباشرة إلى Apple Wallet أو Google Wallet لسهولة المرور.'
          : 'Add boarding passes directly to Apple Wallet or Google Wallet for paperless security screening.',
      icon: Plane
    },
    {
      title:
        language === 'UR'
          ? 'بایومیٹرک محفوظ ادائیگیاں'
          : language === 'AR'
          ? 'دفع إلكتروني آمن ببصمة الوجه والإصبع'
          : 'Biometric Secure Payments',
      desc:
        language === 'UR'
          ? 'ٹچ آئی ڈی اور فیس آئی ڈی کے ساتھ مدیٰ، ایپل پے اور کریڈٹ کارڈز کی سپورٹ۔'
          : language === 'AR'
          ? 'خيارات دفع متعددة وآمنة عبر مدى، Apple Pay، والبطاقات الائتمانية الدولية.'
          : 'Touch ID / Face ID one-click payments supporting Mada, Apple Pay, and international cards.',
      icon: Lock
    }
  ];

  return (
    <section id="app-section" className={`py-20 bg-white relative overflow-hidden ${fontClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#071A3D] via-[#0D2C63] to-[#071A3D] rounded-3xl text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Light Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E53935]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/15 ${fontClass}`}>
                <Smartphone className="w-4 h-4 text-[#E53935]" />
                <span>
                  {language === 'UR'
                    ? 'جدید ترین سفری موبائل سروسز'
                    : language === 'AR'
                    ? 'تطبيق السفر الذكي الأحدث عالمياً'
                    : 'Next-Gen Travel Mobility'}
                </span>
              </div>

              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-tight ${fontClass}`}>
                {language === 'UR'
                  ? 'آپ کے تمام عالمی اسفار اب آپ کے ہاتھ میں'
                  : language === 'AR'
                  ? 'رحلتك حول العالم بلمسة واحدة في راحة يدك'
                  : 'Your Entire World Journey in the Palm of Your Hand'}
              </h2>

              <p className={`text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl ${fontClass}`}>
                {language === 'UR'
                  ? 'ٹی فور ٹکٹس کی آفیشل موبائل ایپلی کیشن اینڈرائیڈ اور آئی فون کے لیے۔ اپنی بکنگز مینیج کریں، پروازوں کی تازہ اپ ڈیٹس لیں اور خصوصی ڈسکاؤنٹس حاصل کریں۔'
                  : language === 'AR'
                  ? 'حمل تطبيق تي فور للتذاكر والسياحة المعتمد لأجهزة iOS و Android. تحكم بحجوزاتك، واستلم تنبيهات بوابات السفر، واستفد من خصومات التطبيق الحصرية.'
                  : 'Download the official T4TICKETS mobile application for iOS and Android. Manage bookings, receive live gate changes, and access exclusive in-app airline discounts.'}
              </p>

              {/* 4 Feature Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {appFeatures.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 ${fontClass}`}>
                      <div className="w-8 h-8 rounded-lg bg-[#E53935]/20 text-[#E53935] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`text-xs font-bold text-white ${fontClass}`}>{feat.title}</div>
                        <div className={`text-[11px] text-gray-300 mt-0.5 ${fontClass}`}>{feat.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Download Buttons & QR Code */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                {/* Apple Store Button */}
                <button
                  type="button"
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white text-[#071A3D] hover:bg-gray-100 transition-all shadow-md font-sans cursor-pointer"
                >
                  <Apple className="w-7 h-7 fill-current" />
                  <div className="text-left">
                    <div className="text-[10px] font-semibold uppercase leading-none text-gray-500">
                      Download on the
                    </div>
                    <div className="text-sm font-extrabold font-heading leading-tight">App Store</div>
                  </div>
                </button>

                {/* Google Play Button */}
                <button
                  type="button"
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shadow-md font-sans cursor-pointer"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 0 1-.22-.92V2.734c0-.34.08-.65.22-.92zm11.242 11.245l2.42 2.42-12.78 7.378 10.36-9.798zm2.42-2.42l-2.42 2.42L4.49 3.26l12.78 7.379zm1.06 1.06l3.32 1.916c.86.497.86 1.306 0 1.803l-3.32 1.916-2.15-2.15 2.15-2.15z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] font-semibold uppercase leading-none text-gray-300">
                      Get it on
                    </div>
                    <div className="text-sm font-extrabold font-heading leading-tight">Google Play</div>
                  </div>
                </button>

                {/* QR Code Placeholder */}
                <div className={`flex items-center gap-3 p-2 px-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md ${fontClass}`}>
                  <div className="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-[#071A3D]" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-white leading-tight">
                      {language === 'UR' ? 'اسکین کریں' : language === 'AR' ? 'امسح للتحميل' : 'Scan to Install'}
                    </div>
                    <div className="text-[10px] text-gray-300">iOS &amp; Android</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Realistic Phone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-72 rounded-[40px] p-3 bg-black border-4 border-gray-700 shadow-2xl shadow-black/80">
                {/* Speaker & Camera Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30" />

                {/* Inside Screen */}
                <div className={`bg-[#071A3D] rounded-[32px] overflow-hidden p-4 pt-8 text-white relative h-[480px] flex flex-col justify-between ${fontClass}`}>
                  <div>
                    {/* App Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded bg-[#E53935] flex items-center justify-center">
                          <Plane className="w-3.5 h-3.5 transform -rotate-45" />
                        </div>
                        <span className="font-black text-xs">T4Tickets</span>
                      </div>
                      <span className={`text-[9px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full ${fontClass}`}>
                        {language === 'UR' ? 'لائیو فیڈ' : language === 'AR' ? 'تحديث مباشر' : 'Live Flight Feed'}
                      </span>
                    </div>

                    {/* Boarding Pass Preview in App */}
                    <div className={`mt-4 bg-white/10 rounded-2xl p-3 border border-white/15 ${fontClass}`}>
                      <div className="flex items-center justify-between text-[10px] text-gray-300 mb-1">
                        <span>{language === 'UR' ? 'بورڈنگ 45 منٹ میں' : language === 'AR' ? 'الصعود خلال 45 دقيقة' : 'Boarding in 45 min'}</span>
                        <span className="text-[#E53935] font-bold">{language === 'UR' ? 'گیٹ 14B' : language === 'AR' ? 'بوابة 14B' : 'Gate 14B'}</span>
                      </div>
                      <div className="flex items-center justify-between text-base font-black">
                        <span>RUH</span>
                        <Plane className="w-4 h-4 text-[#E53935]" />
                        <span>LHR</span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1">Flight SV 107 • Seat 12A</div>
                    </div>

                    {/* Quick Booking Options inside App */}
                    <div className="mt-4 space-y-2">
                      <div className={`text-[11px] font-bold text-gray-300 ${fontClass}`}>
                        {language === 'UR' ? 'فوری سروسز' : language === 'AR' ? 'خدمات سريعة' : 'Quick Services'}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10">
                          <Plane className="w-4 h-4 text-[#E53935] mx-auto mb-1" />
                          <span className={`text-[10px] font-semibold block ${fontClass}`}>
                            {language === 'UR' ? 'فلائٹ بکنگ' : language === 'AR' ? 'حجز طيران' : 'Book Flights'}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10">
                          <Ticket className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                          <span className={`text-[10px] font-semibold block ${fontClass}`}>
                            {language === 'UR' ? 'وی آئی پی عمرہ' : language === 'AR' ? 'عمرة VIP' : 'VIP Umrah'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* App Bottom Navigation bar */}
                  <div className={`bg-black/40 backdrop-blur-md rounded-xl p-2 flex items-center justify-around text-gray-400 text-[10px] ${fontClass}`}>
                    <span className="text-[#E53935] font-bold">
                      {language === 'UR' ? 'ہوم' : language === 'AR' ? 'الرئيسية' : 'Home'}
                    </span>
                    <span>{language === 'UR' ? 'سفر' : language === 'AR' ? 'رحلاتي' : 'My Trips'}</span>
                    <span>{language === 'UR' ? 'آفرز' : language === 'AR' ? 'العروض' : 'Deals'}</span>
                    <span>{language === 'UR' ? 'پروفائل' : language === 'AR' ? 'حسابي' : 'Profile'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
