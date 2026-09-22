import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode } from '../types';

export interface Translations {
  // Navigation & Header
  navFlights: string;
  navFlashOffers: string;
  navUmrah: string;
  navVisasMedical: string;
  navTopDeals: string;
  navSupportFaq: string;
  navWhatsAppContact: string;

  // Hero Section
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroTitleLine2: string;
  heroSubtitle: string;

  // Search Engine
  tripRoundTrip: string;
  tripOneWay: string;
  tripMultiCity: string;
  labelFrom: string;
  labelTo: string;
  labelDeparture: string;
  labelReturn: string;
  labelTravelersCabin: string;
  btnSearchFlights: string;
  directFlightsOnly: string;
  flexibleDates: string;

  // Quick Routes
  popularRoutesTitle: string;

  // Flash Offers
  flashDealsTitle: string;
  flashDealsSubtitle: string;
  endsIn: string;
  bookOfferNow: string;

  // Umrah Section
  umrahTitle: string;
  umrahSubtitle: string;
  viewUmrahPackage: string;
  perPerson: string;
  vipBadge: string;
  allInclusive: string;

  // Services
  servicesTitle: string;
  servicesSubtitle: string;
  visaService: string;
  medicalService: string;
  hotelService: string;
  flightService: string;
  learnMore: string;

  // Why choose us
  whyUsTitle: string;
  whyUsSubtitle: string;

  // FAQ
  faqTitle: string;
  faqSubtitle: string;

  // Footer
  footerDesc: string;
  footerRights: string;
  footerSlogan: string;
  quickLinks: string;
  contactUs: string;
  officialLicense: string;

  // Common buttons & labels
  callNow: string;
  inquireNow: string;
  verifiedAgency: string;
  instantIssuance: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  EN: {
    navFlights: 'Flights',
    navFlashOffers: 'Flash Offers',
    navUmrah: 'Umrah Packages',
    navVisasMedical: 'Visas & Medical',
    navTopDeals: 'Top Deals',
    navSupportFaq: 'Support & FAQ',
    navWhatsAppContact: 'WhatsApp Contact',

    heroBadge: 'Authorized IATA Agency • Chief Executive: Muhammad Aamir Aziz',
    heroTitleLine1: 'Cheapest Airline Tickets,',
    heroTitleHighlight: 'VIP Umrah',
    heroTitleLine2: '& Visit Visas',
    heroSubtitle: 'Compare discounted fares across PIA, Saudia, Emirates, Flynas & AirSial with direct 24/7 WhatsApp e-ticket issuance.',

    tripRoundTrip: 'Round Trip',
    tripOneWay: 'One Way',
    tripMultiCity: 'Multi City',
    labelFrom: 'From / Origin',
    labelTo: 'To / Destination',
    labelDeparture: 'Departure Date',
    labelReturn: 'Return Date',
    labelTravelersCabin: 'Travelers & Cabin',
    btnSearchFlights: 'Search Cheapest Flights',
    directFlightsOnly: 'Direct Flights Only',
    flexibleDates: 'Flexible Dates (±3 Days)',

    popularRoutesTitle: 'Popular Express Direct Routes',

    flashDealsTitle: 'Flash Airline Offers & Special Discounts',
    flashDealsSubtitle: 'Limited-time special rates with free date change and extra baggage allowances.',
    endsIn: 'Special Offer Ends In:',
    bookOfferNow: 'Book Offer via WhatsApp',

    umrahTitle: 'VIP & Executive 5-Star Umrah Packages',
    umrahSubtitle: 'Experience spirituality with confirmed luxury Clock Tower hotels, Haramain high-speed train & VIP ground handling.',
    viewUmrahPackage: 'View Full Package Details',
    perPerson: 'Per Person',
    vipBadge: 'VIP 5-Star',
    allInclusive: 'All Inclusive (Flights + Hotels + Visa + Transport)',

    servicesTitle: 'Authorized Visas, Medical Slips & Travel Services',
    servicesSubtitle: 'Fast, verified, and certified governmental document clearance and worldwide travel assistance.',
    visaService: 'Saudi Visit & Tourist Visas',
    medicalService: 'Wafid (GAMCA) GCC Medical Slips',
    hotelService: 'Makkah & Madinah Luxury Hotels',
    flightService: 'Worldwide Ticket Issuance & Rescheduling',
    learnMore: 'Apply & Inquire Now',

    whyUsTitle: 'Why Choose T4 TICKETS & TRAVEL SERVICES?',
    whyUsSubtitle: 'Providing excellence, transparency, and cheapest guaranteed airfares with unmatched personal attention.',

    faqTitle: 'Frequently Asked Questions & Support',
    faqSubtitle: 'Everything you need to know about flight booking, Umrah reservations, visas, and medical tests.',

    footerDesc: 'Your certified international travel partner for cheapest airline tickets, VIP Umrah packages, fast visit & work visas, and GCC medical appointments.',
    footerRights: 'All rights reserved.',
    footerSlogan: 'Cheapest Tickets, Best Service, Carefree Journey Every Time',
    quickLinks: 'Quick Links',
    contactUs: 'Direct Contact & Office Desks',
    officialLicense: 'IATA & Saudi Tourism Certified Agency',

    callNow: 'Call / WhatsApp Now',
    inquireNow: 'Send Fast Inquiry',
    verifiedAgency: '100% Verified Travel Partner',
    instantIssuance: 'Instant E-Ticket Issuance'
  },
  AR: {
    navFlights: 'حجوزات الطيران',
    navFlashOffers: 'عروض حصرية',
    navUmrah: 'باقات العمرة',
    navVisasMedical: 'تأشيرات وفحص وافد',
    navTopDeals: 'أفضل العروض',
    navSupportFaq: 'المساعدة والأسئلة',
    navWhatsAppContact: 'تواصل عبر واتساب',

    heroBadge: 'وكالة معتمدة رسمياً • المدير التنفيذي: محمد عامر عزيز',
    heroTitleLine1: 'أرخص تذاكر الطيران،',
    heroTitleHighlight: 'باقات العمرة VIP',
    heroTitleLine2: 'والتأشيرات الفورية',
    heroSubtitle: 'قارن أسعار الخطوط السعودية، طيران ناس، أديل، الإماراتية والخطوط الباكستانية مع إصدار فوري عبر واتساب 24/7.',

    tripRoundTrip: 'ذهاب وعودة',
    tripOneWay: 'ذهاب فقط',
    tripMultiCity: 'وجهات متعددة',
    labelFrom: 'المغادرة من',
    labelTo: 'الوصول إلى',
    labelDeparture: 'تاريخ المغادرة',
    labelReturn: 'تاريخ العودة',
    labelTravelersCabin: 'المسافرون والدرجة',
    btnSearchFlights: 'بحث عن أرخص التذاكر',
    directFlightsOnly: 'رحلات مباشرة فقط',
    flexibleDates: 'تواريخ مرنة (±3 أيام)',

    popularRoutesTitle: 'أشهر الرحلات المباشرة الأكثر طلباً',

    flashDealsTitle: 'عروض الطيران الحصرية والخصومات السريعة',
    flashDealsSubtitle: 'أسعار مخفضة لفترة محدودة مع إمكانية تعديل التواريخ ووزن أمتعة إضافي مجاني.',
    endsIn: 'ينتهي العرض الخاص خلال:',
    bookOfferNow: 'حجز العرض عبر واتساب',

    umrahTitle: 'باقات العمرة الفاخرة VIP (5 نجوم)',
    umrahSubtitle: 'خدمات متكاملة تشمل فنادق أبراج البيت المطلة على الحرم، قطار الحرمين السريع، والتنقلات الخاصة.',
    viewUmrahPackage: 'عرض تفاصيل الباقة الكاملة',
    perPerson: 'لكل شخص',
    vipBadge: 'فاخر VIP',
    allInclusive: 'شامل بالكامل (تذاكر + فنادق + تأشيرة + مواصلات)',

    servicesTitle: 'التأشيرات، فحص وافد والخدمات السياحية',
    servicesSubtitle: 'إنجاز رسمي وسريع لجميع التأشيرات ومواعيد فحص العمالة الوافدة لدول الخليج بكل موثوقية.',
    visaService: 'تأشيرات الزيارة والسياحة السعودية',
    medicalService: 'مواعيد فحص وافد (جامكا) لدول الخليج',
    hotelService: 'حجوزات فنادق مكة والمدينة',
    flightService: 'إصدار وتعديل تذاكر الطيران حول العالم',
    learnMore: 'تقديم الطلب والاستفسار',

    whyUsTitle: 'لماذا يختار عملاؤنا تي فور للتذاكر والسياحة؟',
    whyUsSubtitle: 'خدمة راقية، مصداقية تامة، وضمان أفضل الأسعار مع رعاية مباشرة على مدار الساعة.',

    faqTitle: 'الأسئلة الشائعة ومركز الدعم',
    faqSubtitle: 'كل ما تود معرفته عن حجز التذاكر، رحلات العمرة، التأشيرات وفحوصات وافد.',

    footerDesc: 'شريكك المعتمد لحجز أرخص تذاكر الطيران، باقات العمرة الراقية، تأشيرات الزيارة وفحص العمالة الوافدة لدول الخليج.',
    footerRights: 'جميع الحقوق محفوظة.',
    footerSlogan: 'أرخص التذاكر ، أفضل الخدمات ، وسفر مريح ومطمئن',
    quickLinks: 'روابط سريعة',
    contactUs: 'التواصل المباشر ومكاتب الخدمة',
    officialLicense: 'وكالة مرخصة ومعتمدة للسياحة والسفر',

    callNow: 'اتصل / راسلنا عبر واتساب',
    inquireNow: 'إرسال استفسار فوري',
    verifiedAgency: 'وكالة سفر معتمدة 100%',
    instantIssuance: 'إصدار فوري للتذاكر الإلكترونية'
  },
  UR: {
    navFlights: 'پروازیں اور ٹکٹس',
    navFlashOffers: 'خصوصی آفرز',
    navUmrah: 'عمرہ پیکجز',
    navVisasMedical: 'ویزہ و میڈیکل',
    navTopDeals: 'بہترین ڈیلز',
    navSupportFaq: 'مدد و سوالات',
    navWhatsAppContact: 'واٹس ایپ رابطہ',

    heroBadge: 'مصدقہ آئیٹا ایجنسی • چیف ایگزیکٹو: محمد عامر عزیز',
    heroTitleLine1: 'سستی ترین ایئر لائن ٹکٹس،',
    heroTitleHighlight: 'وی آئی پی عمرہ',
    heroTitleLine2: 'اور وزٹ ویزے',
    heroSubtitle: 'سعودیہ، پی آئی اے، فلائی ناس، امارات اور ایئر سیال کے سستے کرایوں کا موازنہ اور 24 گھنٹے واٹس ایپ پر فوری ای ٹکٹ کا اجراء۔',

    tripRoundTrip: 'دو طرفہ (Round Trip)',
    tripOneWay: 'ایک طرفہ (One Way)',
    tripMultiCity: 'ملٹی سٹی (Multi City)',
    labelFrom: 'روانگی (کہاں سے)',
    labelTo: 'منزل (کہاں تک)',
    labelDeparture: 'روانگی کی تاریخ',
    labelReturn: 'واپسی کی تاریخ',
    labelTravelersCabin: 'مسافر و کلاس',
    btnSearchFlights: 'سستی ترین پرواز تلاش کریں',
    directFlightsOnly: 'صرف ڈائریکٹ پروازیں',
    flexibleDates: 'لچکدار تاریخیں (±3 دن)',

    popularRoutesTitle: 'مقبول ترین براہِ راست روٹس',

    flashDealsTitle: 'ایئر لائنز کی خصوصی آفرز اور فلیش ڈسکاؤنٹس',
    flashDealsSubtitle: 'محدود مدت کے لیے خصوصی رعایتی کرائے، تاریخ کی مفت تبدیلی اور اضافی سامان کی سہولت۔',
    endsIn: 'خصوصی پیشکش ختم ہونے میں وقت باقی:',
    bookOfferNow: 'واٹس ایپ پر آفر بک کریں',

    umrahTitle: 'وی آئی پی اور ایگزیکٹو 5 اسٹار عمرہ پیکجز',
    umrahSubtitle: 'کلاک ٹاور کے بہترین ہوٹلز، حرمین بلٹ ٹرین اور وی آئی پی ٹرانسپورٹ کے ساتھ مکمل روحانی سکون۔',
    viewUmrahPackage: 'پیکج کی مکمل تفصیلات دیکھیں',
    perPerson: 'فی مسافر',
    vipBadge: 'وی آئی پی 5 اسٹار',
    allInclusive: 'سب کچھ شامل (ٹکٹس + ہوٹل + ویزہ + ٹرانسپورٹ)',

    servicesTitle: 'مصدقہ ویزہ سروسز، وافد میڈیکل اور سفری سہولیات',
    servicesSubtitle: 'سعودی وزٹ ویزے اور گلف میڈیکل (وافد/جامکا) اپوائنٹمنٹ سلپ کا فوری اور قابلِ اعتماد اجرا۔',
    visaService: 'سعودی فیملی وزٹ اور ٹورسٹ ویزے',
    medicalService: 'وافد (GAMCA) گلف میڈیکل اپوائنٹمنٹ',
    hotelService: 'مکہ و مدینہ کے پرتعیش ہوٹلز',
    flightService: 'دنیا بھر کی ٹکٹوں کا اجرا اور ری شیڈولنگ',
    learnMore: 'درخواست دیں اور معلومات لیں',

    whyUsTitle: 'ٹی فور ٹکٹس اینڈ ٹریول سروسز کا انتخاب کیوں کریں؟',
    whyUsSubtitle: 'بے مثال خدمت، سچائی پر مبنی رہنمائی اور سستے ترین گارنٹی شدہ کرائے۔',

    faqTitle: 'اکثر پوچھے جانے والے سوالات و جوابات',
    faqSubtitle: 'ٹکٹ بکنگ، عمرہ پیکجز، ویزہ کے طریقہ کار اور میڈیکل ٹیسٹ کے بارے میں مکمل معلومات۔',

    footerDesc: 'سستی ترین ہوائی ٹکٹوں، وی آئی پی عمرہ پیکجز، وزٹ و ورک ویزوں اور گلف وافد میڈیکل کے لیے آپ کا بااعتماد سفری شراکت دار۔',
    footerRights: 'جملہ حقوق محفوظ ہیں۔',
    footerSlogan: 'سستی ترین ٹکٹ ، بہترین سروس ، ہر سفر بے فکر',
    quickLinks: 'فوری لنکس',
    contactUs: 'براہِ راست رابطہ اور دفتری ڈیسک',
    officialLicense: 'سعودی وزارتِ سیاحت اور آئیٹا سے منظور شدہ ایجنسی',

    callNow: 'کال یا واٹس ایپ کریں',
    inquireNow: 'فوری معلومات حاصل کریں',
    verifiedAgency: '100% مستند سفری ادارہ',
    instantIssuance: 'فوری ای ٹکٹ کا اجرا'
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  isRTL: boolean;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  children: React.ReactNode;
}> = ({ currentLanguage, onLanguageChange, children }) => {
  const language = currentLanguage || 'EN';
  const isRTL = language === 'AR' || language === 'UR';
  const dir: 'rtl' | 'ltr' = isRTL ? 'rtl' : 'ltr';

  // Synchronize document direction and lang attribute like Almosafer
  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
    document.documentElement.dir = dir;
    
    // Remove previous language classes
    document.documentElement.classList.remove('lang-ar', 'lang-ur', 'lang-en', 'rtl-mode');

    if (language === 'AR') {
      document.documentElement.classList.add('rtl-mode', 'lang-ar');
    } else if (language === 'UR') {
      document.documentElement.classList.add('rtl-mode', 'lang-ur');
    } else {
      document.documentElement.classList.add('lang-en');
    }
  }, [language, dir, isRTL]);

  const value = {
    language,
    setLanguage: onLanguageChange,
    t: TRANSLATIONS[language] || TRANSLATIONS.EN,
    isRTL,
    dir
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
