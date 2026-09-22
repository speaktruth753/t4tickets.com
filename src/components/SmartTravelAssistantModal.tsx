import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  User,
  X,
  Copy,
  Check,
  Plane,
  Building2,
  Calendar,
  Users,
  DollarSign,
  Loader2,
  Sparkles,
  MessageSquare,
  Compass,
  FileText,
  MapPin,
  Clock,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { CurrencyCode } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SmartTravelAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency?: CurrencyCode;
  initialTab?: 'chat' | 'planner';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const SmartTravelAssistantModal: React.FC<SmartTravelAssistantModalProps> = ({
  isOpen,
  onClose,
  currentCurrency = 'SAR',
  initialTab = 'chat'
}) => {
  const { language, isRTL } = useLanguage();
  const fontClass = language === 'UR' ? 'font-nastaliq' : language === 'AR' ? 'font-arabic' : 'font-sans';

  const [activeTab, setActiveTab] = useState<'chat' | 'planner'>(initialTab);

  const defaultWelcomeText =
    language === 'UR'
      ? 'السلام علیکم ورحمة الله وبركاته! ٹی فور ٹکٹس اینڈ ٹریول سروسز میں خوش آمدید۔\n\nمیں آپ کا اسمارٹ ٹریول کنسلٹنٹ ہوں۔ میں آپ کو سب سے سستی پروازیں تلاش کرنے، ایئر لائنز (سعودیہ، پی آئی اے، قطر ایئرویز، ایمریٹس، ایئر سیال، فلائی دبئی) کے کرایوں کا موازنہ کرنے، وی آئی پی عمرہ پیکجز، وزٹ ویزا اور جی سی سی وافد میڈیکل گائیڈنس فراہم کر سکتا ہوں۔\n\nآج میں آپ کے سفر کے لیے کیا خدمت انجام دے سکتا ہوں؟'
      : language === 'AR'
      ? 'السلام عليكم ورحمة الله وبركاته! مرحباً بكم في تي فور تيكتس للسياحة والسفر.\n\nأنا مساعد السفر الذكي الخاص بك. يمكنني مساعدتك في العثور على أرخص أسعار تذاكر الطيران، ومقارنة خطوط الطيران (الخطوط السعودية، القطرية، طيران الإمارات، فلاي دبي، بي آي إيه)، وحجوزات باقات العمرة الـ VIP، وتأشيرات الزيارة، ومواعيد الفحص الطبي للوافدين (وافد / جامكا).\n\nكيف يمكنني مساعدتك في رحلتك اليوم؟'
      : 'السلام علیکم ورحمة الله وبركاته! Welcome to T4 TICKETS & TRAVEL SERVICES.\n\nI am your dedicated Smart Travel Consultant. I can help you find cheapest flight routes, compare airline fares (Saudia, PIA, Qatar, Emirates, AirSial, flydubai), guide you on VIP Umrah packages, visit visas, and GCC medical appointments.\n\nHow may I assist your journey today?';

  // --- Chat Tab State ---
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: defaultWelcomeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts =
    language === 'UR'
      ? [
          '🕋 14 روزہ وی آئی پی عمرہ پیکج، بجٹ اور حرم کے قریب ہوٹلز',
          '✈️ لاہور / اسلام آباد سے جدہ / ریاض کے لیے سب سے سستی فلائٹ',
          '🛂 سعودی عرب کا 1 سالہ ملٹیپل انٹری وزٹ ویزا اور شرائط',
          '🩺 جی سی سی (وافد / گامکا) میڈیکل اپائنٹمنٹ بکنگ کا طریقہ',
          '💼 دبئی اور قطر کے چھٹیوں کے دورے کے لیے بہترین ایئر لائنز'
        ]
      : language === 'AR'
      ? [
          '🕋 باقات العمرة الـ VIP لمدة 14 يوماً مع فنادق مطلة على الحرم',
          '✈️ أرخص رحلات الطيران من لاهور / إسلام آباد إلى جدة / الرياض',
          '🛂 شروط وإجراءات تأشيرة الزيارة المتعددة للمملكة لمدة عام',
          '🩺 حجز موعد الفحص الطبي المعتمد لدول الخليج (وافد / جامكا)',
          '💼 أفضل عروض ورحلات دبي وقطر للعطلات العائلية'
        ]
      : [
          '🕋 14 Days VIP Umrah package budget & hotels near Haram',
          '✈️ Cheapest flight from Lahore / Islamabad to Jeddah / Riyadh',
          '🛂 Saudi 1-Year Multiple Entry Visit Visa requirements',
          '🩺 How to book GCC (Wafid / Gamca) medical appointment',
          '💼 Best airlines for Dubai & Qatar holiday trip'
        ];

  // --- Itinerary Planner Tab State ---
  const [tripType, setTripType] = useState('VIP Umrah (Makkah & Madinah)');
  const [origin, setOrigin] = useState('Lahore (LHE)');
  const [destination, setDestination] = useState('Jeddah / Makkah & Madinah (JED)');
  const [durationDays, setDurationDays] = useState(14);
  const [travelers, setTravelers] = useState('2 Adults');
  const [budgetLevel, setBudgetLevel] = useState('5-Star VIP Luxury');
  const [specialNotes, setSpecialNotes] = useState('Swissotel or Clock Tower view in Makkah, 5-star near Prophet Mosque in Madinah, private GMC transport');
  const [isPlanLoading, setIsPlanLoading] = useState(false);
  const [itinerary, setItinerary] = useState<any | null>(null);
  const [plannerError, setPlannerError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeTab]);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  // --- Send Chat Message ---
  const handleSendMessage = async (customPrompt?: string) => {
    const text = (customPrompt || inputText).trim();
    if (!text || isChatLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInputText('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language,
          conversationHistory: messages.map((m) => ({
            sender: m.sender === 'assistant' ? 'ai' : 'user',
            text: m.text
          }))
        })
      });

      const data = await res.json();
      const reply =
        data.reply ||
        data.fallback ||
        (language === 'UR'
          ? 'میں آپ کی رہنمائی کے لیے ہمہ وقت حاضر ہوں۔ فوری ٹکٹ اور پیکیج کے لیے محمد عامر عزیز سے براہ راست واٹس ایپ پر رابطہ فرمائیں: +966 50 267 4930'
          : language === 'AR'
          ? 'يسعدني تقديم الخدمة لك فوراً. لحجز التذاكر بأفضل الأسعار وباقات العمرة، تواصل مباشرة مع محمد عامر عزيز عبر الواتساب: 966502674930+'
          : 'I am ready to assist you. Please contact Muhammad Aamir Aziz directly on WhatsApp: +966 50 267 4930.');

      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text:
            language === 'UR'
              ? 'فوری ٹکٹ بکنگ، رعایتی کرایوں اور عمرہ کے انتظامات کے لیے براہِ کرم محمد عامر عزیز سے براہِ راست واٹس ایپ پر رابطہ کریں: +966 50 267 4930'
              : language === 'AR'
              ? 'للحصول على حجوزات تذاكر فورية وعروض أسعار خاصة وباقات العمرة، يرجى التواصل مع محمد عامر عزيز مباشرة عبر الواتساب: 966502674930+'
              : 'For instant ticket booking, discounted flight quotes, and Umrah arrangements, please contact Muhammad Aamir Aziz directly on WhatsApp: +966 50 267 4930.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportChatToWhatsApp = () => {
    const lastReply = [...messages].reverse().find((m) => m.sender === 'assistant')?.text || '';
    const lastUserQuery = [...messages].reverse().find((m) => m.sender === 'user')?.text || '';
    const text = encodeURIComponent(
      `Hello Muhammad Aamir Aziz (T4 Tickets),\nI was consulting your Smart Travel Assistant regarding: "${lastUserQuery}".\n\nDetails: ${lastReply.slice(0, 300)}...\n\nPlease provide your best available rates and book this for me.`
    );
    window.open(`https://wa.me/966502674930?text=${text}`, '_blank');
  };

  // --- Generate Itinerary ---
  const handleGenerateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlanLoading(true);
    setPlannerError(null);
    setItinerary(null);

    try {
      const res = await fetch('/api/gemini/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripType,
          origin,
          destination,
          durationDays,
          travelers,
          budgetLevel,
          currency: currentCurrency,
          specialNotes,
          language
        })
      });

      const data = await res.json();
      if (data.itinerary && typeof data.itinerary === 'object') {
        setItinerary(data.itinerary);
      } else {
        setPlannerError(
          language === 'UR'
            ? 'سفر کا شیڈول تیار نہیں ہو سکا۔ براہ کرم دوبارہ کوشش کریں یا واٹس ایپ پر رابطہ کریں۔'
            : language === 'AR'
            ? 'تعذر إنشاء الخطة التفصيلية حالياً. يرجى المحاولة مجدداً أو مراسلتنا عبر الواتساب.'
            : 'Could not generate itinerary. Please try again or reach out on WhatsApp.'
        );
      }
    } catch {
      setPlannerError(
        language === 'UR'
          ? 'سروس لمحاتی طور پر مصروف ہے۔ براہ کرم محمد عامر عزیز سے واٹس ایپ پر رابطہ کریں: +966 50 267 4930'
          : language === 'AR'
          ? 'الخدمة مشغولة مؤقتاً. يرجى التواصل مع محمد عامر عزيز عبر الواتساب: 966502674930+'
          : 'Service is momentarily busy. Please contact Muhammad Aamir Aziz on WhatsApp: +966 50 267 4930.'
      );
    } finally {
      setIsPlanLoading(false);
    }
  };

  const handleWhatsAppBooking = () => {
    if (!itinerary) return;
    const text = encodeURIComponent(
      `Hello Muhammad Aamir Aziz (T4 Tickets),\nI generated this custom travel plan on your website:\n` +
      `📌 *${itinerary.title || tripType}*\n` +
      `✈️ Route: ${origin} ➔ ${destination}\n` +
      `📅 Duration: ${durationDays} Days | Travelers: ${travelers}\n` +
      `💰 Budget Category: ${budgetLevel} (${currentCurrency})\n` +
      `🏨 Notes: ${specialNotes}\n\n` +
      `Please verify availability and send final quote!`
    );
    window.open(`https://wa.me/966502674930?text=${text}`, '_blank');
  };

  // Localized UI Labels
  const modalTitle =
    language === 'UR' ? 'ٹی فور اسمارٹ ٹریول اسسٹنٹ' : language === 'AR' ? 'مساعد السفر الذكي تي فور' : 'T4 Travel Assistant';
  const managedByText =
    language === 'UR'
      ? 'زیرِ انتظام محمد عامر عزیز • مصدقہ آئیٹا (IATA)'
      : language === 'AR'
      ? 'بإشراف محمد عامر عزيز • معتمد لدى أياتا (IATA)'
      : 'Managed by Muhammad Aamir Aziz • IATA Accredited';
  const whatsappDeskLabel =
    language === 'UR' ? 'واٹس ایپ ڈیسک' : language === 'AR' ? 'مكتب الواتساب' : 'WhatsApp Desk';
  const tabChatLabel =
    language === 'UR' ? 'سفری مشاورت' : language === 'AR' ? 'الاستشارات السياحية' : 'Travel Consultation';
  const tabPlannerLabel =
    language === 'UR' ? 'عمرہ و ٹور پلانر' : language === 'AR' ? 'مخطط الرحلات والعمرة' : 'Trip & Umrah Planner';
  const tabSubtextChat =
    language === 'UR'
      ? 'فلائٹس، ویزا یا عمرہ کے متعلق کوئی بھی سوال پوچھیں'
      : language === 'AR'
      ? 'اسأل عن أي رحلة طيران أو تأشيرة أو تفاصيل العمرة'
      : 'Ask any flight, visa, or Umrah question';
  const tabSubtextPlanner =
    language === 'UR'
      ? 'مکمل یومیہ شیڈول اور تخمینہ بجٹ بنائیں'
      : language === 'AR'
      ? 'إنشاء جدول يومي تفصيلي وتكلفة تقديرية'
      : 'Generate complete day-by-day plan';
  const quickAskLabel =
    language === 'UR' ? 'فوری سوالات:' : language === 'AR' ? 'استفسارات سريعة:' : 'Quick Ask:';
  const inputPlaceholder =
    language === 'UR'
      ? 'سستی فلائٹس، عمرہ پیکیج، ویزا یا ایئر لائن کے متعلق پوچھیں...'
      : language === 'AR'
      ? 'اسأل عن أرخص التذاكر، باقات العمرة، التأشيرات أو خطوط الطيران...'
      : 'Ask about cheap flights, Umrah packages, visas, or airlines...';
  const sendLabel =
    language === 'UR' ? 'ارسال کریں' : language === 'AR' ? 'إرسال' : 'Send';
  const consultingLabel =
    language === 'UR'
      ? 'ایئر لائن کرایوں اور سفری معلومات سے رہنمائی حاصل کی جا رہی ہے...'
      : language === 'AR'
      ? 'جاري استعراض أسعار الطيران والإرشادات السياحية...'
      : 'Consulting airline fares & travel guidelines...';
  const copyLabel =
    language === 'UR' ? 'کاپی' : language === 'AR' ? 'نسخ' : 'Copy';
  const copiedLabel =
    language === 'UR' ? 'کاپی ہو گیا' : language === 'AR' ? 'تم النسخ' : 'Copied';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-[#071A3D] rounded-2xl border-2 border-[#C29427]/60 shadow-2xl flex flex-col h-[90vh] max-h-[740px] overflow-hidden">
        {/* Unified Modal Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-[#051433] via-[#0A2458] to-[#051433] border-b border-[#C29427]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B8860B] to-[#F7D070] flex items-center justify-center text-[#051433] shadow">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-extrabold text-white text-sm sm:text-base tracking-wide ${fontClass}`}>
                  {modalTitle}
                </h3>
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              </div>
              <p className={`text-[11px] text-gray-300 ${fontClass}`}>
                {managedByText}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/966502674930?text=Assalam%20u%20Alaikum%20Muhammad%20Aamir%20Aziz,%20I%20need%20travel%20assistance."
              target="_blank"
              rel="noreferrer"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow ${fontClass}`}
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>{whatsappDeskLabel}</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="bg-[#051433] px-4 py-2 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${fontClass} ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-[#B8860B] to-[#F7D070] text-[#051433] shadow'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{tabChatLabel}</span>
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${fontClass} ${
                activeTab === 'planner'
                  ? 'bg-gradient-to-r from-[#B8860B] to-[#F7D070] text-[#051433] shadow'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{tabPlannerLabel}</span>
            </button>
          </div>

          <div className={`text-[11px] text-gray-400 hidden sm:block ${fontClass}`}>
            {activeTab === 'chat' ? tabSubtextChat : tabSubtextPlanner}
          </div>
        </div>

        {/* TAB 1: Live Chat Consultation */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col min-h-0 bg-[#07193C]">
            {/* Quick Inquiry Prompts Bar */}
            <div className="px-4 py-2 bg-[#051433]/70 border-b border-white/5 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-2 shrink-0">
              <span className={`text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1 shrink-0 ${fontClass}`}>
                <Sparkles className="w-3 h-3 text-[#F7D070]" /> {quickAskLabel}
              </span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className={`px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#F7D070]/20 hover:text-[#F7D070] text-gray-300 border border-white/10 text-[11px] transition-colors shrink-0 ${fontClass}`}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B8860B] to-[#F7D070] flex items-center justify-center text-[#051433] font-bold text-xs shrink-0 mt-0.5 shadow">
                      T4
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-md ${fontClass} ${
                      msg.sender === 'user'
                        ? 'bg-[#005BA6] text-white rounded-br-none rtl:rounded-br-2xl rtl:rounded-bl-none'
                        : 'bg-[#0A224F] text-gray-100 border border-[#C29427]/30 rounded-bl-none rtl:rounded-bl-2xl rtl:rounded-br-none'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>

                    <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-gray-400 pt-1.5 border-t border-white/10">
                      <span dir="ltr">{msg.timestamp}</span>
                      {msg.sender === 'assistant' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            className="hover:text-white flex items-center gap-1 transition-colors"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3 h-3 text-[#25D366]" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>{copiedId === msg.id ? copiedLabel : copyLabel}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5 border border-white/20">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isChatLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B8860B] to-[#F7D070] flex items-center justify-center text-[#051433] font-bold text-xs shrink-0 shadow">
                    T4
                  </div>
                  <div className={`bg-[#0A224F] border border-[#C29427]/30 rounded-2xl rounded-bl-none rtl:rounded-bl-2xl rtl:rounded-br-none p-3 flex items-center gap-2 text-xs text-gray-300 ${fontClass}`}>
                    <Loader2 className="w-4 h-4 animate-spin text-[#F7D070]" />
                    <span>{consultingLabel}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 bg-[#051433] border-t border-white/10 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={inputPlaceholder}
                  className={`flex-1 bg-white/10 text-white placeholder-gray-400 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/15 focus:outline-none focus:border-[#F7D070] transition-colors ${fontClass}`}
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isChatLoading}
                  className={`px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#F7D070] text-[#051433] font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow ${fontClass}`}
                >
                  <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                  <span className="hidden sm:inline">{sendLabel}</span>
                </button>
                <button
                  type="button"
                  onClick={exportChatToWhatsApp}
                  title="Forward inquiry to WhatsApp"
                  className="p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white transition-colors shadow"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: Trip & Umrah Itinerary Planner */}
        {activeTab === 'planner' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#07193C] space-y-6">
            <div className="bg-[#051433] p-4 rounded-xl border border-[#C29427]/30 text-white">
              <h4 className={`text-sm font-extrabold text-[#F7D070] mb-1 flex items-center gap-2 ${fontClass}`}>
                <Compass className="w-4 h-4" />
                {language === 'UR'
                  ? 'کسٹم سفری شیڈول اور بجٹ پلانر'
                  : language === 'AR'
                  ? 'مخطط الرحلات المخصصة وميزانية السفر'
                  : 'Custom Itinerary & Budget Planner'}
              </h4>
              <p className={`text-xs text-gray-300 leading-relaxed ${fontClass}`}>
                {language === 'UR'
                  ? 'اپنے سفر کی تفصیلات نیچے درج کریں تاکہ تجویز کردہ ہوٹلوں، ٹرانسپورٹ اور تخمینہ شدہ بجٹ کے ساتھ ایک مناسب یومیہ شیڈول تیار کیا جا سکے۔'
                  : language === 'AR'
                  ? 'أدخل تفاصيل رحلتك أدناه لإنشاء برنامج يومي مخصص مع الفنادق الموصى بها، والمواصلات، والتكلفة التقديرية.'
                  : 'Provide your travel details below to generate a tailored schedule with recommended hotels, transport, and estimated budget.'}
              </p>
            </div>

            <form onSubmit={handleGenerateItinerary} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold text-gray-300 mb-1 ${fontClass}`}>
                    {language === 'UR' ? 'سفر کا زمرہ / قسم' : language === 'AR' ? 'نوع الرحلة / الفئة' : 'Trip Category'}
                  </label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    className={`w-full bg-white/10 text-white text-xs rounded-xl px-3 py-2 border border-white/15 focus:outline-none focus:border-[#F7D070] ${fontClass}`}
                  >
                    <option value="VIP Umrah (Makkah & Madinah)" className="bg-[#071A3D]">
                      {language === 'UR' ? 'وی آئی پی عمرہ (مکہ مکرمہ اور مدینہ منورہ)' : language === 'AR' ? 'عمرة VIP (مكة المكرمة والمدينة المنورة)' : 'VIP Umrah (Makkah & Madinah)'}
                    </option>
                    <option value="Saudi Domestic & Tourist Trip" className="bg-[#071A3D]">
                      {language === 'UR' ? 'سعودی ڈومیسٹک و سیاحتی دورہ' : language === 'AR' ? 'رحلة سياحية داخلية بالمملكة' : 'Saudi Domestic & Tourist Trip'}
                    </option>
                    <option value="Dubai / UAE Holiday Tour" className="bg-[#071A3D]">
                      {language === 'UR' ? 'دبئی و امارات چھٹیوں کا ٹور' : language === 'AR' ? 'جولة سياحية في دبي والإمارات' : 'Dubai / UAE Holiday Tour'}
                    </option>
                    <option value="Pakistan Family Vacation" className="bg-[#071A3D]">
                      {language === 'UR' ? 'پاکستان فیملی تعطیلات' : language === 'AR' ? 'إجازة عائلية في باكستان' : 'Pakistan Family Vacation'}
                    </option>
                    <option value="Qatar / GCC Business Travel" className="bg-[#071A3D]">
                      {language === 'UR' ? 'قطر و خلیجی ممالک تجارتی سفر' : language === 'AR' ? 'رحلات أعمال قطر ودول الخليج' : 'Qatar / GCC Business Travel'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-semibold text-gray-300 mb-1 ${fontClass}`}>
                    {language === 'UR' ? 'روانگی کا شہر / ایئرپورٹ' : language === 'AR' ? 'مدينة / مطار المغادرة' : 'Departure City / Airport'}
                  </label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. Lahore (LHE), Islamabad (ISB), Riyadh (RUH)"
                    className={`w-full bg-white/10 text-white text-xs rounded-xl px-3 py-2 border border-white/15 focus:outline-none focus:border-[#F7D070] ${fontClass}`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold text-gray-300 mb-1 ${fontClass}`}>
                    {language === 'UR' ? 'منزلِ مقصود / آمد کا شہر' : language === 'AR' ? 'الوجهة / مدينة الوصول' : 'Destination'}
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Jeddah / Makkah & Madinah"
                    className={`w-full bg-white/10 text-white text-xs rounded-xl px-3 py-2 border border-white/15 focus:outline-none focus:border-[#F7D070] ${fontClass}`}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={`block text-xs font-semibold text-gray-300 mb-1 ${fontClass}`}>
                      {language === 'UR' ? 'مدت (دن)' : language === 'AR' ? 'المدة (أيام)' : 'Duration (Days)'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      className="w-full bg-white/10 text-white text-xs rounded-xl px-3 py-2 border border-white/15 focus:outline-none focus:border-[#F7D070]"
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold text-gray-300 mb-1 ${fontClass}`}>
                      {language === 'UR' ? 'مسافرین کی تعداد' : language === 'AR' ? 'عدد المسافرين' : 'Travelers'}
                    </label>
                    <input
                      type="text"
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      placeholder={language === 'UR' ? '2 بالغ، 1 بچہ' : language === 'AR' ? '2 بالغين، 1 طفل' : 'e.g. 2 Adults, 1 Child'}
                      className={`w-full bg-white/10 text-white text-xs rounded-xl px-3 py-2 border border-white/15 focus:outline-none focus:border-[#F7D070] ${fontClass}`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold text-gray-300 mb-1 ${fontClass}`}>
                    {language === 'UR' ? 'بجٹ و رہائش کا معیار' : language === 'AR' ? 'الميزانية وفئة الفندق' : 'Budget Preference'}
                  </label>
                  <select
                    value={budgetLevel}
                    onChange={(e) => setBudgetLevel(e.target.value)}
                    className={`w-full bg-white/10 text-white text-xs rounded-xl px-3 py-2 border border-white/15 focus:outline-none focus:border-[#F7D070] ${fontClass}`}
                  >
                    <option value="5-Star VIP Luxury" className="bg-[#071A3D]">
                      {language === 'UR' ? '5 ستارہ وی آئی پی لگژری (حرم کے بالکل سامنے)' : language === 'AR' ? '5 نجوم VIP فاخر (مباشر أمام الحرم)' : '5-Star VIP Luxury (Closest to Haram)'}
                    </option>
                    <option value="4-Star Comfort" className="bg-[#071A3D]">
                      {language === 'UR' ? '4 ستارہ معیاری آرام دہ (پیدل فاصلے پر)' : language === 'AR' ? '4 نجوم مريح (مسافة مشي قريبة)' : '4-Star Comfort (Walking distance)'}
                    </option>
                    <option value="Economy & Budget-Friendly" className="bg-[#071A3D]">
                      {language === 'UR' ? 'اکانومی اور مناسب بجٹ فرینڈلی' : language === 'AR' ? 'اقتصادي ومناسب التكلفة' : 'Economy & Budget-Friendly'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-semibold text-gray-300 mb-1 ${fontClass}`}>
                    {language === 'UR' ? 'خصوصی ترجیحات / مطلوبہ ہوٹلز' : language === 'AR' ? 'تفضيلات خاصة / فنادق مفضلة' : 'Special Preferences / Hotels'}
                  </label>
                  <input
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder={language === 'UR' ? 'مثلاً کلاک ٹاور ویو، نجی جی ایم سی کار، زیارات' : language === 'AR' ? 'مثال: إطلالة برج الساعة، سيارة GMC خاصة، مزارات' : 'e.g. Clock Tower view, private GMC, Ziyarat tours'}
                    className={`w-full bg-white/10 text-white text-xs rounded-xl px-3 py-2 border border-white/15 focus:outline-none focus:border-[#F7D070] ${fontClass}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isPlanLoading}
                  className={`px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#F7D070] text-[#051433] font-bold text-xs sm:text-sm flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow ${fontClass}`}
                >
                  {isPlanLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{language === 'UR' ? 'شیڈول تیار کیا جا رہا ہے...' : language === 'AR' ? 'جاري إعداد الخطة المخصصة...' : 'Generating Custom Schedule...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{language === 'UR' ? 'سفری شیڈول بنائیں' : language === 'AR' ? 'إنشاء خطة الرحلة' : 'Generate Itinerary Plan'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {plannerError && (
              <div className={`p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center justify-between ${fontClass}`}>
                <span>{plannerError}</span>
                <a
                  href="https://wa.me/966502674930"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline ml-2 rtl:ml-0 rtl:mr-2"
                >
                  {language === 'UR' ? 'محمد عامر عزیز سے رابطہ کریں' : language === 'AR' ? 'واتساب محمد عامر عزيز' : 'WhatsApp Muhammad Aamir Aziz'}
                </a>
              </div>
            )}

            {/* Generated Itinerary Output */}
            {itinerary && (
              <div className="bg-[#051433] rounded-2xl border border-[#C29427]/40 p-4 sm:p-5 text-white space-y-4 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <h4 className={`text-base font-extrabold text-[#F7D070] ${fontClass}`}>
                      {itinerary.title || `${tripType} Plan`}
                    </h4>
                    <p className={`text-xs text-gray-300 mt-0.5 ${fontClass}`}>
                      {origin} ➔ {destination} • {durationDays} {language === 'UR' ? 'دن' : language === 'AR' ? 'أيام' : 'Days'} • {travelers}
                    </p>
                  </div>
                  {itinerary.estimatedTotalCost && (
                    <div className="px-3 py-1.5 rounded-xl bg-[#C29427]/20 border border-[#C29427]/40 text-right rtl:text-left">
                      <div className={`text-[10px] text-gray-300 ${fontClass}`}>
                        {language === 'UR' ? 'تخمینہ شدہ بجٹ' : language === 'AR' ? 'الميزانية التقديرية' : 'Estimated Budget'}
                      </div>
                      <div className="text-sm font-black text-[#F7D070]" dir="ltr">
                        {itinerary.estimatedTotalCost}
                      </div>
                    </div>
                  )}
                </div>

                {itinerary.summary && (
                  <p className={`text-xs text-gray-200 leading-relaxed bg-white/5 p-3 rounded-xl ${fontClass}`}>
                    {itinerary.summary}
                  </p>
                )}

                {/* Day by Day breakdown */}
                {Array.isArray(itinerary.dailySchedule) && (
                  <div className="space-y-2.5">
                    <h5 className={`text-xs font-bold text-[#F7D070] uppercase tracking-wider ${fontClass}`}>
                      {language === 'UR' ? 'یومیہ تفاصیل:' : language === 'AR' ? 'تفاصيل الجدول اليومي:' : 'Schedule Details:'}
                    </h5>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {itinerary.dailySchedule.map((day: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs flex gap-3"
                        >
                          <span className={`font-bold text-[#F7D070] whitespace-nowrap ${fontClass}`}>
                            {language === 'UR' ? `دن ${day.day || idx + 1}:` : language === 'AR' ? `اليوم ${day.day || idx + 1}:` : `Day ${day.day || idx + 1}:`}
                          </span>
                          <div>
                            <div className={`font-semibold text-white ${fontClass}`}>{day.title || day.activity}</div>
                            {day.description && (
                              <div className={`text-gray-300 text-[11px] mt-0.5 ${fontClass}`}>{day.description}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* WhatsApp Action Button */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
                  <span className={`text-xs text-gray-400 ${fontClass}`}>
                    {language === 'UR'
                      ? 'کیا آپ یہ پیکج بک کروانا یا خصوصی ڈسکاؤنٹ حاصل کرنا چاہتے ہیں؟'
                      : language === 'AR'
                      ? 'هل ترغب في حجز هذه الباقة أو الحصول على خصم خاص للمجموعات؟'
                      : 'Ready to book this package or negotiate group discount?'}
                  </span>
                  <button
                    onClick={handleWhatsAppBooking}
                    className={`px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-extrabold flex items-center gap-2 shadow ${fontClass}`}
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>
                      {language === 'UR'
                        ? 'سفری شیڈول واٹس ایپ ڈیسک پر ارسال کریں'
                        : language === 'AR'
                        ? 'إرسال خطة الرحلة إلى مكتب الواتساب'
                        : 'Send Itinerary to WhatsApp Desk'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
