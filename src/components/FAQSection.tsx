import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  MessageSquare,
  Sparkles,
  Plane,
  MoonStar,
  FileCheck,
  CreditCard,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface FAQItem {
  id: string;
  category: 'flights' | 'umrah' | 'visas' | 'medical' | 'general';
  question: string;
  answer: string;
  keyPoints?: string[];
  recommendedAction?: {
    label: string;
    whatsappMessage: string;
  };
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'flights',
    question: 'How do I get the cheapest airline tickets with T4 TICKETS?',
    answer: 'T4 TICKETS compares real-time IATA fares across Saudia, PIA, Emirates, Qatar Airways, Flynas, Flyadeal, and Gulf Air to offer up to 35% discounted group and corporate rates. You can search instantly on our platform or contact our 24/7 WhatsApp desk for unadvertised wholesale seat allocations.',
    keyPoints: [
      'IATA Accredited Agency with direct airline GDS connectivity',
      'Flexible date comparisons (±3 days) to lock the lowest fare',
      'Free baggage allowance advice (PIA 40kg, Saudia 2x 23kg, Emirates 30kg)'
    ],
    recommendedAction: {
      label: 'Request Lowest Fare on WhatsApp',
      whatsappMessage: 'Hello Muhammad Aamir Aziz (T4 Tickets), I want to find the cheapest ticket for my route.'
    }
  },
  {
    id: 'faq-2',
    category: 'umrah',
    question: 'What is included in the T4 TICKETS VIP Umrah Packages?',
    answer: 'Our VIP and Economy Umrah Packages are all-inclusive: confirmed direct flights, verified 5-star or 3-star hotel accommodations close to the Holy Kaaba in Makkah and the Prophet’s Mosque in Madinah, private GMC or high-speed Haramain bullet train transfers, electronic Umrah Nusuk visa issuance, and 24/7 ground assistance.',
    keyPoints: [
      'Hotels within 0-250 meters walking distance to Haram',
      'Personalized Ziyarat tours in Makkah and Madinah with certified guides',
      'Flexible packages for individuals, families, and corporate groups'
    ],
    recommendedAction: {
      label: 'Customize Umrah Package',
      whatsappMessage: 'Assalam u Alaikum Muhammad Aamir Aziz, I would like to inquire about customized Umrah packages.'
    }
  },
  {
    id: 'faq-3',
    category: 'visas',
    question: 'How fast can T4 TICKETS process Saudi Visit & Tourist Visas?',
    answer: 'T4 TICKETS processes Saudi electronic tourist visas (e-Visa), multiple-entry family visit visas, commercial business visas, and transit visas with rapid turnarounds—often within 24 to 48 hours for eligible nationalities, complete with mandatory medical insurance.',
    keyPoints: [
      'Authorized visa service provider for GCC, Pakistan, and worldwide travellers',
      'Assistance with documentation, insurance, and embassy attestations',
      'Instant tracking and WhatsApp updates throughout application'
    ],
    recommendedAction: {
      label: 'Check Visa Eligibility',
      whatsappMessage: 'Hello, I want to check my visa eligibility and processing time with T4 Tickets.'
    }
  },
  {
    id: 'faq-4',
    category: 'medical',
    question: 'What is the Wafid (GAMCA) GCC Medical Test service?',
    answer: 'The Wafid (formerly GAMCA) medical examination is compulsory for employment and long-term residence visas across Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, and Oman. T4 TICKETS generates official Wafid medical appointment slips within 15 minutes, assigns accredited diagnostic centers in your city, and provides full pre-departure guidance.',
    keyPoints: [
      'Instant generation of official Wafid appointment slip',
      'Guidance on required documents, passport validity, and vaccination certificates',
      'Assistance in major cities across Pakistan, India, and other departure hubs'
    ],
    recommendedAction: {
      label: 'Book Wafid Medical Slip',
      whatsappMessage: 'Hello Muhammad Aamir Aziz, I need an official Wafid GAMCA medical appointment slip.'
    }
  },
  {
    id: 'faq-5',
    category: 'general',
    question: 'Who is Muhammad Aamir Aziz and how can I contact T4 TICKETS directly?',
    answer: 'Muhammad Aamir Aziz is the principal executive and authorized travel specialist behind T4 TICKETS AND TRAVEL SERVICES. Clients can contact him directly via Saudi WhatsApp (\u200E+966 50 267 4930\u200E), Pakistan WhatsApp (\u200E+92 301 7355753\u200E), or email (T4tickets@gmail.com) for prompt quotes, ticket reissuances, and emergency flight support 24/7.',
    keyPoints: [
      'KSA Line: +966 50 267 4930 (Calls & WhatsApp)',
      'Pakistan Line: +92 301 7355753 (Calls & WhatsApp)',
      'Direct email: T4tickets@gmail.com with guaranteed response under 30 minutes'
    ],
    recommendedAction: {
      label: 'Chat Directly on WhatsApp',
      whatsappMessage: 'Hello Muhammad Aamir Aziz, I am contacting you directly from T4Tickets.com.'
    }
  },
  {
    id: 'faq-6',
    category: 'flights',
    question: 'What are the baggage allowances on popular airlines from Saudi Arabia to Pakistan?',
    answer: 'Baggage rules vary by airline and ticket class: PIA generally provides 40 kg (2 pieces of 20 kg or 1 piece of 30 kg + 10 kg depending on route), Saudia provides 2 pieces of 23 kg each (total 46 kg) in Economy, and budget carriers like Flynas and Flyadeal offer tier-based 20 kg or 30 kg checked bags. T4 TICKETS always confirms exact baggage allowances prior to ticket issuance.',
    keyPoints: [
      'Checked baggage allowances clearly marked on every T4 electronic itinerary',
      'Assistance with pre-purchasing extra kilograms at discounted agent rates',
      'Free Zamzam water allowance (5 Liters) on return Umrah journeys'
    ],
    recommendedAction: {
      label: 'Verify Flight Baggage Allowance',
      whatsappMessage: 'Hello, please confirm the baggage allowance and fare for my flight booking.'
    }
  }
];

export const FAQSection: React.FC = () => {
  const { language } = useLanguage();
  const fontClass = language === 'UR' ? 'font-nastaliq' : language === 'AR' ? 'font-arabic' : 'font-sans';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'flights' | 'umrah' | 'visas' | 'medical' | 'general'>('all');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getLocalizedFAQs = (): FAQItem[] => {
    if (language === 'AR') {
      return [
        {
          id: 'faq-1',
          category: 'flights',
          question: 'كيف يمكنني الحصول على أرخص تذاكر الطيران مع تي فور تيكتس؟',
          answer: 'تقوم تي فور تيكتس بمقارنة أسعار الطيران اللحظية المعتمدة من منظمة (IATA) عبر الخطوط السعودية، والخطوط الباكستانية، وطيران الإمارات، والقطرية، وطيران ناس، وطيران أديل لتوفير خصومات تصل إلى 35% على أسعار المجموعات والشركات. يمكنك البحث مباشرة أو التواصل مع مكتبنا عبر الواتساب على مدار الساعة.',
          keyPoints: [
            'وكالة معتمدة من الإياتا مع ربط مباشر بأنظمة الحجز العالمية (GDS)',
            'مقارنة مرنة لتواريخ السفر (±3 أيام) لضمان الحصول على أقل سعر ممكن',
            'استشارات مجانية لأوزان الأمتعة وحقائب السفر'
          ],
          recommendedAction: {
            label: 'طلب أرخص سعر تذكرة عبر الواتساب',
            whatsappMessage: 'السلام عليكم محمد عامر عزيز (تي فور تيكتس)، أرغب في حجز تذكرة بأفضل سعر.'
          }
        },
        {
          id: 'faq-2',
          category: 'umrah',
          question: 'ما الذي تشمله باقات العمرة المميزة (VIP) من تي فور تيكتس؟',
          answer: 'تشمل باقات العمرة لدينا خدمات متكاملة: تذاكر طيران مؤكدة، حجوزات فندقية مصنفة 5 نجوم و3 نجوم على بعد خطوات من الحرم المكي الشريف والمسجد النبوي، تنقلات خاصة بسيارات جمس حديثة أو قطار الحرمين السريع، إصدار تأشيرة العمرة الإلكترونية، ومساعدة واستقبال ميداني على مدار 24 ساعة.',
          keyPoints: [
            'فنادق قريبة جداً من ساحات الحرمين الشريفين',
            'برامج زيارات دينية مخصصة في مكة المكرمة والمدينة المنورة مع مرشدين',
            'باقات مرنة تناسب الأفراد، والعائلات، ومجموعات الشركات'
          ],
          recommendedAction: {
            label: 'تصميم باقة عمرة خاصة',
            whatsappMessage: 'السلام عليكم محمد عامر عزيز، أود الاستفسار عن باقات العمرة المخصصة.'
          }
        },
        {
          id: 'faq-3',
          category: 'visas',
          question: 'ما هي سرعة إنجاز تأشيرات الزيارة والسياحة السعودية لدى تي فور؟',
          answer: 'تتولى تي فور تيكتس استخراج التأشيرات السياحية الإلكترونية، وتأشيرات الزيارة العائلية متعددة السفرات، وتأشيرات الأعمال والتأشيرات الترانزيت بسرعة فائقة وخلال 24 إلى 48 ساعة للجنسيات المؤهلة شاملة التأمين الطبي الإلزامي المعتمد.',
          keyPoints: [
            'مكتب خدمات تأشيرات معتمد لمواطني ومقيمي دول الخليج وباكستان ومختلف الدول',
            'مساعدة كاملة في تدقيق المستندات والتأمين الطبي وتصديقات السفارات',
            'متابعة لحظية وتحديثات عبر الواتساب حتى صدور التأشيرة'
          ],
          recommendedAction: {
            label: 'التحقق من أهلية التأشيرة',
            whatsappMessage: 'مرحباً، أود التأكد من شروط وإجراءات إصدار التأشيرة.'
          }
        },
        {
          id: 'faq-4',
          category: 'medical',
          question: 'ما هي خدمة حجز الفحص الطبي للوافدين (وافد / جامكا) لدول الخليج؟',
          answer: 'الفحص الطبي وافد (المعروف سابقاً بـ جامكا) إلزامي للراغبين في العمل والإقامة بدول مجلس التعاون الخليجي (السعودية، الإمارات، قطر، الكويت، البحرين، عمان). تصدر تي فور تيكتس مواعيد وافد الرسمية المعتمدة خلال 15 دقيقة فقط في المراكز الطبية المعتمدة في مدينتك مع التوجيه الشامل.',
          keyPoints: [
            'إصدار فوري لباركود وموعد وافد الطبي المعتمد',
            'توضيح شروط وصلاحية الجواز والتطعيمات المطلوبة',
            'دعم كامل لجميع المراكز المعتمدة في باكستان والهند وغيرها'
          ],
          recommendedAction: {
            label: 'حجز باركود فحص وافد الطبي',
            whatsappMessage: 'السلام عليكم محمد عامر عزيز، أحتاج لحجز موعد فحص وافد جامكا الطبي المعتمد.'
          }
        },
        {
          id: 'faq-5',
          category: 'general',
          question: 'من هو الأستاذ محمد عامر عزيز وكيف يمكن التواصل المباشر مع تي فور؟',
          answer: 'محمد عامر عزيز هو المدير التنفيذي والمستشار السياحي المعتمد لخدمات تي فور تيكتس والسياحة. يمكن للعملاء التواصل معه مباشرة عبر الواتساب السعودي (+966 50 267 4930)، أو الواتساب الباكستاني (+92 301 7355753)، أو البريد الإلكتروني للحصول على عروض الأسعار السريعة وخدمة الطيران الطارئة 24/7.',
          keyPoints: [
            'الرقم المباشر في السعودية: 966502674930+ (اتصال وواتساب)',
            'الرقم المباشر في باكستان: 923017355753+ (اتصال وواتساب)',
            'البريد الإلكتروني: T4tickets@gmail.com مع رد سريع خلال دقائق'
          ],
          recommendedAction: {
            label: 'محادثة مباشرة عبر الواتساب',
            whatsappMessage: 'السلام عليكم أستاذ محمد عامر عزيز، أتواصل معك بخصوص خدمات السفر.'
          }
        },
        {
          id: 'faq-6',
          category: 'flights',
          question: 'ما هي أوزان الأمتعة المسموحة على الرحلات بين السعودية وباكستان؟',
          answer: 'تختلف أوزان الأمتعة بحسب شركة الطيران ودرجة الحجز: الخطوط الباكستانية تمنح عادة 40 كجم، والخطوط السعودية تمنح قطعتين كل قطعة 23 كجم (إجمالي 46 كجم) في الدرجة السياحية، بينما توفر طيران ناس وأديل باقات 20 أو 30 كجم. تؤكد تي فور تيكتس الوزن الدقيق قبل إصدار أي تذكرة.',
          keyPoints: [
            'تحديد أوزان الأمتعة والحقائب بوضوح في تذكرة السفر الإلكترونية',
            'إمكانية شراء أوزان إضافية مسبقاً بأسعار مخفضة للوكلاء',
            'شحن مجاني لعبوة مياه زمزم (5 لتر) لرحلات العودة من العمرة'
          ],
          recommendedAction: {
            label: 'التأكد من وزن الأمتعة للرحلة',
            whatsappMessage: 'السلام عليكم، أرجو تأكيد وزن الأمتعة وسعر التذكرة لرحلتي.'
          }
        }
      ];
    }

    if (language === 'UR') {
      return [
        {
          id: 'faq-1',
          category: 'flights',
          question: 'ٹی فور ٹکٹس سے سستی ترین ایئر لائن ٹکٹ کیسے حاصل کی جا سکتی ہے؟',
          answer: 'ٹی فور ٹکٹس سعودی ایئر لائنز، پی آئی اے، ایمریٹس، قطر ایئرویز، فلائی ناس اور فلائی عدیل کے ریئل ٹائم آئیٹا ہول سیل کرایوں کا موازنہ کرتی ہے تاکہ آپ کو 35 فیصد تک سستے اور رعایتی ٹکٹس مل سکیں۔ آپ ویب سائٹ پر چیک کر سکتے ہیں یا محمد عامر عزیز کے واٹس ایپ پر 24 گھنٹے براہ راست رابطہ کر سکتے ہیں۔',
          keyPoints: [
            'آئیٹا رجسٹرڈ ایجنسی اور ایئر لائن جی ڈی ایس سسٹم سے ڈائریکٹ ربط',
            'سفری تاریخوں کا لچکدار موازنہ (±3 دن) تاکہ کم ترین کرایہ مل سکے',
            'مفت سامان اور بیگیج الاؤنس سے متعلق مکمل رہنمائی'
          ],
          recommendedAction: {
            label: 'واٹس ایپ پر سستے کرائے کی معلومات لیں',
            whatsappMessage: 'السلام علیکم محمد عامر عزیز (ٹی فور ٹکٹس)، مجھے اپنے سفر کے لیے سستی ترین ٹکٹ چاہیے ہے۔'
          }
        },
        {
          id: 'faq-2',
          category: 'umrah',
          question: 'ٹی فور ٹکٹس کے وی آئی پی عمرہ پیکجز میں کیا کیا شامل ہوتا ہے؟',
          answer: 'ہمارے وی آئی پی اور اکانومی عمرہ پیکجز مکمل طور پر آل انکلوسیو ہیں: تصدیق شدہ پروازیں، مکہ مکرمہ اور مدینہ منورہ میں حرم شریف کے بالکل قریب بہترین 5 اسٹار اور 3 اسٹار ہوٹل، نجی جی ایم سی یا حرمین بلٹ ٹرین ٹرانسپورٹ، نسک عمرہ ویزا، اور سعودی عرب میں 24 گھنٹے زمینی معاونت۔',
          keyPoints: [
            'حرم پاک سے چند قدم کے فاصلے پر فائیو اسٹار ہوٹلز',
            'مکہ مکرمہ اور مدینہ منورہ کے مقدس مقامات کی خصوصی زیارات',
            'انفرادی، فیملی اور تجارتی گروپس کے لیے حسبِ منشاء پیکجز'
          ],
          recommendedAction: {
            label: 'عمرہ پیکج کسٹمائز کروائیں',
            whatsappMessage: 'السلام علیکم محمد عامر عزیز، مجھے اپنی فیملی کے عمرہ پیکج کے بارے میں معلومات درکار ہیں۔'
          }
        },
        {
          id: 'faq-3',
          category: 'visas',
          question: 'سعودی وزٹ، فیملی اور ٹورسٹ ویزا پروسیسنگ میں کتنا وقت لگتا ہے؟',
          answer: 'ٹی فور ٹکٹس سعودی الیکٹرانک ٹورسٹ ویزا، ملٹیپل انٹری فیملی وزٹ ویزا، بزنس ویزا اور ٹرانزٹ ویزا کی فوری پروسیسنگ کرتی ہے، جو اہل افراد کے لیے 24 سے 48 گھنٹوں میں باضابطہ میڈیکل انشورنس کے ساتھ جاری ہو جاتی ہے۔',
          keyPoints: [
            'سعودی عرب، پاکستان اور خلیجی ممالک کے لیے مجاز ویزا سروسز',
            'دستاویزات، میڈیکل انشورنس اور تصدیق میں مکمل قانونی رہنمائی',
            'درخواست کی مکمل ٹریکنگ اور واٹس ایپ پر لمحہ بہ لمحہ آگاہی'
          ],
          recommendedAction: {
            label: 'ویزا اہلیت معلوم کریں',
            whatsappMessage: 'السلام علیکم، مجھے سعودی ویزا کے طریقہ کار اور فیس سے متعلق معلومات چاہیے۔'
          }
        },
        {
          id: 'faq-4',
          category: 'medical',
          question: 'وافد (گامکا GAMCA) میڈیکل ٹیسٹ سروس کیا ہے اور بارکوڈ کیسے ملتا ہے؟',
          answer: 'سعودی عرب اور دیگر خلیجی ممالک میں ورک ویزا اور اقامہ کے لیے وافد (سابقہ گامکا) میڈیکل ٹیسٹ لازمی ہوتا ہے۔ ٹی فور ٹکٹس صرف 15 منٹ میں آپ کے مطلوبہ شہر کے رجسٹرڈ میڈیکل سینٹر کا سرکاری وافد بارکوڈ اور اپائنٹمنٹ سلپ جاری کرتی ہے۔',
          keyPoints: [
            'سرکاری وافد اپائنٹمنٹ سلپ اور بارکوڈ کا فوری اجرا (صرف 15 منٹ)',
            'ضروری دستاویزات، پاسپورٹ اور ویکسینیشن کی مکمل رہنمائی',
            'پاکستان کے تمام بڑے شہروں (لاہور، اسلام آباد، کراچی، ملتان وغیرہ) میں معاونت'
          ],
          recommendedAction: {
            label: 'وافد میڈیکل سلپ حاصل کریں',
            whatsappMessage: 'السلام علیکم محمد عامر عزیز، مجھے وافد گامکا میڈیکل اپائنٹمنٹ سلپ بنوانی ہے۔'
          }
        },
        {
          id: 'faq-5',
          category: 'general',
          question: 'محمد عامر عزیز کون ہیں اور ٹی فور ٹکٹس سے براہ راست کیسے رابطہ کیا جائے؟',
          answer: 'محمد عامر عزیز ٹی فور ٹکٹس اینڈ ٹریول سروسز کے سربراہ اور رجسٹرڈ ٹریول کنسلٹنٹ ہیں۔ کسٹمرز ان سے براہ راست سعودی واٹس ایپ (+966 50 267 4930)، پاکستان واٹس ایپ (+92 301 7355753)، یا ای میل (T4tickets@gmail.com) پر کسی بھی وقت رابطہ کر سکتے ہیں۔',
          keyPoints: [
            'سعودی عرب کا نمبر: 966502674930+ (کال اور واٹس ایپ)',
            'پاکستان کا نمبر: 923017355753+ (کال اور واٹس ایپ)',
            'ای میل ایڈریس: T4tickets@gmail.com (30 منٹ میں جواب کی ضمانت)'
          ],
          recommendedAction: {
            label: 'محمد عامر عزیز سے واٹس ایپ پر بات کریں',
            whatsappMessage: 'السلام علیکم محمد عامر عزیز صاحب، میں ٹی فور ٹکٹس سے متعلق بات کرنا چاہتا ہوں۔'
          }
        },
        {
          id: 'faq-6',
          category: 'flights',
          question: 'سعودی عرب سے پاکستان کی پروازوں پر کتنا سامان (بیگیج) لے جانے کی اجازت ہے؟',
          answer: 'سامان کی حد ایئر لائن کے اصولوں پر منحصر ہے: پی آئی اے میں عموماً 40 کلو، سعودی ایئر لائنز میں 23 کلو کے 2 بیگز (کل 46 کلو)، اور فلائی ناس و فلائی عدیل میں 20 یا 30 کلو کی سہولت ہوتی ہے۔ ٹی فور ٹکٹس ہر بکنگ سے قبل درست بیگیج الاؤنس یقینی بناتی ہے۔',
          keyPoints: [
            'ہر ای ٹکٹ پر بیگیج کی مقدار واضح طور پر درج ہوتی ہے',
            'اضافی سامان (ایکسٹرا کے جی) رعایتی ایجنٹ ریٹ پر پہلے سے بک کروانے کی سہولت',
            'عمرہ زائرین کے لیے واپسی پر 5 لیٹر زمزم کا مفت الاؤنس'
          ],
          recommendedAction: {
            label: 'فلائٹ بیگیج کنفرم کریں',
            whatsappMessage: 'السلام علیکم، برائے مہربانی میری پرواز کے لیے سامان کا وزن اور کرایہ کنفرم کریں۔'
          }
        }
      ];
    }

    return FAQS_DATA;
  };

  const localizedFAQs = getLocalizedFAQs();

  const filteredFAQs = useMemo(() => {
    return localizedFAQs.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        (faq.keyPoints && faq.keyPoints.some((p) => p.toLowerCase().includes(query)));
      return matchesCategory && matchesSearch;
    });
  }, [localizedFAQs, activeCategory, searchQuery]);

  const badgeText =
    language === 'UR'
      ? 'کسٹمر معلوماتی گائیڈ اور اکثر پوچھے گئے سوالات'
      : language === 'AR'
      ? 'دليل المسافر وقاعدة الإجابات والمعلومات الشاملة'
      : 'Answer Engine Optimization & Client Knowledge Base';

  const headingText =
    language === 'UR'
      ? 'اکثر پوچھے جانے والے سوالات اور سفری رہنمائی'
      : language === 'AR'
      ? 'الأسئلة الشائعة ودليل السفر الشامل'
      : 'Frequently Asked Questions & Travel Guide';

  const subtitleText =
    language === 'UR'
      ? 'سستی ایئر لائن ٹکٹس، وی آئی پی عمرہ پیکجز، وزٹ ویزا، وافد میڈیکل، اور محمد عامر عزیز سے براہ راست رابطے کے مستند جوابات۔'
      : language === 'AR'
      ? 'إجابات دقيقة ومباشرة حول تذاكر الطيران المخفضة، باقات العمرة المميزة، تأشيرات الزيارة، فحص وافد الطبي، والتواصل المباشر مع محمد عامر عزيز.'
      : 'Instant, factual answers about cheap flight tickets, Umrah VIP packages, visit visas, Wafid medical tests, and direct contact with Muhammad Aamir Aziz.';

  const searchPlaceholder =
    language === 'UR'
      ? 'پروازیں، عمرہ، ویزا، وافد میڈیکل یا سامان کے قواعد تلاش کریں...'
      : language === 'AR'
      ? 'ابحث عن الرحلات، العمرة، التأشيرات، فحص وافد، أو الأمتعة...'
      : 'Search flights, Umrah, visas, Wafid medical, or baggage rules...';

  const clearLabel = language === 'UR' ? 'صاف کریں' : language === 'AR' ? 'مسح' : 'Clear';

  const categories = [
    {
      id: 'all',
      label: language === 'UR' ? 'تمام سوالات' : language === 'AR' ? 'جميع الأسئلة' : 'All Questions',
      icon: Sparkles
    },
    {
      id: 'flights',
      label: language === 'UR' ? 'پروازیں و سامان' : language === 'AR' ? 'الطيران والأمتعة' : 'Flights & Baggage',
      icon: Plane
    },
    {
      id: 'umrah',
      label: language === 'UR' ? 'وی آئی پی عمرہ' : language === 'AR' ? 'باقات العمرة VIP' : 'VIP Umrah',
      icon: MoonStar
    },
    {
      id: 'visas',
      label: language === 'UR' ? 'ویزے و داخلہ' : language === 'AR' ? 'التأشيرات والدخول' : 'Visas & Entry',
      icon: FileCheck
    },
    {
      id: 'medical',
      label: language === 'UR' ? 'وافد گامکا میڈیکل' : language === 'AR' ? 'فحص وافد الطبي' : 'Wafid GCC Medical',
      icon: CheckCircle2
    },
    {
      id: 'general',
      label: language === 'UR' ? 'رابطہ و محمد عامر عزیز' : language === 'AR' ? 'التواصل ومحمد عامر عزيز' : 'Contact & Muhammad Aamir Aziz',
      icon: PhoneCall
    }
  ];

  const quickFactsLabel = language === 'UR' ? 'اہم نکات و ضروری معلومات:' : language === 'AR' ? 'أبرز النقاط والشروط الأساسية:' : 'Quick Facts & Requirements:';
  const needAssistLabel = language === 'UR' ? 'کیا آپ کو اس بارے میں رہنمائی چاہیے؟' : language === 'AR' ? 'هل تحتاج إلى مساعدة مخصصة بخصوص هذا؟' : 'Need personalized assistance with this?';

  const directDeskTitle = language === 'UR' ? 'محمد عامر عزیز کے ساتھ براہ راست ٹریول ڈیسک' : language === 'AR' ? 'المكتب المباشر للسياحة مع محمد عامر عزيز' : 'Direct Travel Desk with Muhammad Aamir Aziz';
  const directDeskSubtitle = language === 'UR' ? 'فوری ایئر لائن ٹکٹنگ، عمرہ ویزا سروسز اور 24 گھنٹے کسٹمر سپورٹ۔' : language === 'AR' ? 'حجوزات طيران فورية، إصدار تأشيرات العمرة، ومتابعة متواصلة 24/7.' : 'Urgent ticket bookings, Umrah visa processing, and 24/7 client dispatch.';

  return (
    <section
      id="faq-section"
      className="py-16 bg-white border-t border-gray-100 relative overflow-hidden"
      aria-labelledby="faq-main-heading"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-50/50 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E53935]/10 text-[#E53935] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span className={fontClass}>{badgeText}</span>
          </div>
          <h2
            id="faq-main-heading"
            className={`text-2xl sm:text-4xl font-black text-[#071A3D] font-heading tracking-tight ${fontClass}`}
          >
            {headingText}
          </h2>
          <p className={`mt-2 text-sm sm:text-base text-gray-600 leading-relaxed ${fontClass}`}>
            {subtitleText}
          </p>

          {/* Instant Search Bar */}
          <div className="mt-6 relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="faq-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className={`w-full pl-12 pr-4 rtl:pl-4 rtl:pr-12 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[#E53935] focus:bg-white transition-all shadow-sm ${fontClass}`}
              aria-label="Search frequently asked questions"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-4 rtl:right-auto rtl:left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600 cursor-pointer ${fontClass}`}
              >
                {clearLabel}
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${fontClass} ${
                    isActive
                      ? 'bg-[#071A3D] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto" role="region" aria-label="FAQ Accordion">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
              <HelpCircle className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className={`text-sm font-bold text-gray-700 ${fontClass}`}>
                {language === 'UR' ? 'کوئی نتیجہ نہیں ملا' : language === 'AR' ? 'لم يتم العثور على نتائج مطابقة' : 'No matching answers found'}
              </p>
              <p className={`text-xs text-gray-500 mt-1 ${fontClass}`}>
                {language === 'UR'
                  ? 'کوئی خاص سوال ہے؟ واٹس ایپ پر براہ راست ہمارے ٹریول ایکسپرٹ سے بات کریں۔'
                  : language === 'AR'
                  ? 'هل لديك سؤال محدد؟ تحدث مباشرة مع خبرائنا عبر الواتساب.'
                  : 'Have a specific question? Chat directly with our travel experts on WhatsApp.'}
              </p>
              <a
                href="https://wa.me/966502674930?text=Hello%20Muhammad%20Aamir%20Aziz,%20I%20have%20a%20question"
                target="_blank"
                rel="noreferrer"
                className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow hover:bg-[#20ba59] transition-all cursor-pointer ${fontClass}`}
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>
                  {language === 'UR'
                    ? 'محمد عامر عزیز سے واٹس ایپ پر رابطہ کریں'
                    : language === 'AR'
                    ? 'تواصل مع محمد عامر عزيز عبر الواتساب'
                    : 'Ask Muhammad Aamir Aziz on WhatsApp'}
                </span>
              </a>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <article
                  key={faq.id}
                  id={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#E53935]/40 shadow-lg shadow-gray-100'
                      : 'bg-gray-50/70 border-gray-200 hover:bg-white hover:border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left rtl:text-right p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-answer`}
                  >
                    <span className={`font-extrabold text-sm sm:text-base text-[#071A3D] leading-snug ${fontClass}`}>
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-[#E53935] text-white rotate-180' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`${faq.id}-answer`}
                      className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4"
                    >
                      <p className={`text-gray-700 font-medium ${fontClass}`}>{faq.answer}</p>

                      {faq.keyPoints && faq.keyPoints.length > 0 && (
                        <div className="mt-3.5 bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <span className={`text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2 ${fontClass}`}>
                            {quickFactsLabel}
                          </span>
                          <ul className="space-y-1.5">
                            {faq.keyPoints.map((point, idx) => (
                              <li key={idx} className={`flex items-start gap-2 text-xs text-gray-700 ${fontClass}`}>
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {faq.recommendedAction && (
                        <div className="mt-4 flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-gray-100">
                          <span className={`text-[11px] text-gray-400 ${fontClass}`}>
                            {needAssistLabel}
                          </span>
                          <a
                            href={`https://wa.me/966502674930?text=${encodeURIComponent(faq.recommendedAction.whatsappMessage)}`}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-bold text-xs hover:bg-[#20ba59] transition-all shadow-sm ${fontClass}`}
                          >
                            <MessageSquare className="w-3.5 h-3.5 fill-current" />
                            <span>{faq.recommendedAction.label}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>

        {/* Quick Contact Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-[#071A3D] via-[#0A2458] to-[#071A3D] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E53935] flex items-center justify-center shrink-0 shadow-lg">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className={`text-base sm:text-lg font-black font-heading leading-tight ${fontClass}`}>
                {directDeskTitle}
              </h4>
              <p className={`text-xs text-gray-300 mt-0.5 ${fontClass}`}>
                {directDeskSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <a
              href="tel:+966502674930"
              className={`px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 ${fontClass}`}
            >
              <span>{language === 'UR' ? 'سعودیہ رابطہ:' : language === 'AR' ? 'هاتف السعودية:' : 'Call KSA:'}</span>
              <span dir="ltr" className="font-mono text-[#F5D061]">+966 50 267 4930</span>
            </a>
            <a
              href="tel:+923017355753"
              className={`px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1.5 ${fontClass}`}
            >
              <span>{language === 'UR' ? 'پاکستان رابطہ:' : language === 'AR' ? 'هاتف باكستان:' : 'Call PK:'}</span>
              <span dir="ltr" className="font-mono text-[#F5D061]">+92 301 7355753</span>
            </a>
            <a
              href="https://wa.me/966502674930?text=Hello%20Muhammad%20Aamir%20Aziz,%20I%20need%20urgent%20flight%20or%20Umrah%20booking"
              target="_blank"
              rel="noreferrer"
              className={`px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer ${fontClass}`}
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{language === 'UR' ? 'واٹس ایپ ڈیسک' : language === 'AR' ? 'مكتب الواتساب' : 'WhatsApp Desk'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
