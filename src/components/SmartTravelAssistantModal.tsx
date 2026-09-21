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
  const [activeTab, setActiveTab] = useState<'chat' | 'planner'>(initialTab);

  // --- Chat Tab State ---
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: 'السلام علیکم ورحمة الله وبركاته! Welcome to T4 TICKETS & TRAVEL SERVICES.\n\nI am your dedicated Smart Travel Consultant. I can help you find cheapest flight routes, compare airline fares (Saudia, PIA, Qatar, Emirates, AirSial, flydubai), guide you on VIP Umrah packages, visit visas, and GCC medical appointments.\n\nHow may I assist your journey today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
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
        'I am ready to assist you. Please contact Muhammad Aamir Aziz directly on WhatsApp: +966 50 267 4930.';

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
          text: 'For instant ticket booking, discounted flight quotes, and Umrah arrangements, please contact Muhammad Aamir Aziz directly on WhatsApp: +966 50 267 4930.',
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
          specialNotes
        })
      });

      const data = await res.json();
      if (data.itinerary && typeof data.itinerary === 'object') {
        setItinerary(data.itinerary);
      } else {
        setPlannerError('Could not generate itinerary. Please try again or reach out on WhatsApp.');
      }
    } catch {
      setPlannerError('Service is momentarily busy. Please contact Muhammad Aamir Aziz on WhatsApp: +966 50 267 4930.');
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
                <h3 className="font-extrabold text-white text-sm sm:text-base tracking-wide">
                  T4 Travel Assistant
                </h3>
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              </div>
              <p className="text-[11px] text-gray-300">
                Managed by Muhammad Aamir Aziz • IATA Accredited
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/966502674930?text=Assalam%20u%20Alaikum%20Muhammad%20Aamir%20Aziz,%20I%20need%20travel%20assistance."
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Desk</span>
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-[#B8860B] to-[#F7D070] text-[#051433] shadow'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Travel Consultation</span>
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'planner'
                  ? 'bg-gradient-to-r from-[#B8860B] to-[#F7D070] text-[#051433] shadow'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Trip &amp; Umrah Planner</span>
            </button>
          </div>

          <div className="text-[11px] text-gray-400 hidden sm:block">
            {activeTab === 'chat' ? 'Ask any flight, visa, or Umrah question' : 'Generate complete day-by-day plan'}
          </div>
        </div>

        {/* TAB 1: Live Chat Consultation */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col min-h-0 bg-[#07193C]">
            {/* Quick Inquiry Prompts Bar */}
            <div className="px-4 py-2 bg-[#051433]/70 border-b border-white/5 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-2 shrink-0">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#F7D070]" /> Quick Ask:
              </span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#F7D070]/20 hover:text-[#F7D070] text-gray-300 border border-white/10 text-[11px] transition-colors"
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
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-[#005BA6] text-white rounded-br-none'
                        : 'bg-[#0A224F] text-gray-100 border border-[#C29427]/30 rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>

                    <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-gray-400 pt-1.5 border-t border-white/10">
                      <span>{msg.timestamp}</span>
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
                            <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
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
                  <div className="bg-[#0A224F] border border-[#C29427]/30 rounded-2xl rounded-bl-none p-3 flex items-center gap-2 text-xs text-gray-300">
                    <Loader2 className="w-4 h-4 animate-spin text-[#F7D070]" />
                    <span>Consulting airline fares &amp; travel guidelines...</span>
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
                  placeholder="Ask about cheap flights, Umrah packages, visas, or airlines..."
                  className="flex-1 bg-white/10 text-white placeholder-gray-400 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-white/15 focus:outline-none focus:border-[#F7D070] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isChatLoading}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#F7D070] text-[#051433] font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
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
              <h4 className="text-sm font-extrabold text-[#F7D070] mb-1 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Custom Itinerary &amp; Budget Planner
              </h4>
              <p className="text-xs text-gray-300">
                Provide your travel details below to generate a tailored schedule with recommended hotels, transport, and estimated budget.
              </p>
            </div>

            <form onSubmit={handleGenerateItinerary} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Trip Category
                  </label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-full bg-white/10 text-white text-xs rounded-xl px-3 py-2 border border-white/15 focus:outline-none focus:border-[#F7D070]"
                  >
                    <option value="VIP Umrah (Makkah & Madinah)" className="bg-[#071A3D]">VIP Umrah (Makkah &amp; Madinah)</option>
                    <option value="Saudi Domestic & Tourist Trip" className="bg-[#071A3D]">Saudi Domestic &amp; Tourist Trip</option>
                    <option value="Dubai / UAE Holiday Tour" className="bg-[#071A3D]">Dubai / UAE Holiday Tour</option>
                    <option value="Pakistan Family Vacation" className="bg-[#071A3D]">Pakistan Family Vacation</option>
                    <option value="Qatar / GCC Business Travel" className="bg-[#071A3D]">Qatar / GCC Business Travel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Departure City / Airport
                  </label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. Lahore (LHE), Islamabad (ISB), Riyadh (RUH)"
                    className="w-full bg-white/10 text-white text-xs rounded-xl px-3 py-2 border border-white/15 focus:outline-none focus:border-[#F7D070]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Destination
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Jeddah / Makkah & Madinah"
                    className="w-full bg-white/10 text-white text-xs rounded-xl px-3 py-2 border border-white/15 focus:outline-none focus:border-[#F7D070]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Duration (Days)
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
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Travelers
                    </label>
                    <input
                      type="text"
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      placeholder="e.g. 2 Adults, 1 Child"
                      className="w-full bg-white/10 text-white text-xs rounded-xl px-3 py-2 border border-white/15 focus:outline-none focus:border-[#F7D070]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Budget Preference
                  </label>
                  <select
                    value={budgetLevel}
                    onChange={(e) => setBudgetLevel(e.target.value)}
                    className="w-full bg-white/10 text-white text-xs rounded-xl px-3 py-2 border border-white/15 focus:outline-none focus:border-[#F7D070]"
                  >
                    <option value="5-Star VIP Luxury" className="bg-[#071A3D]">5-Star VIP Luxury (Closest to Haram)</option>
                    <option value="4-Star Comfort" className="bg-[#071A3D]">4-Star Comfort (Walking distance)</option>
                    <option value="Economy & Budget-Friendly" className="bg-[#071A3D]">Economy &amp; Budget-Friendly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Special Preferences / Hotels
                  </label>
                  <input
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="e.g. Clock Tower view, private GMC, Ziyarat tours"
                    className="w-full bg-white/10 text-white text-xs rounded-xl px-3 py-2 border border-white/15 focus:outline-none focus:border-[#F7D070]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isPlanLoading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#F7D070] text-[#051433] font-bold text-xs sm:text-sm flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow"
                >
                  {isPlanLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Custom Schedule...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Itinerary Plan</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {plannerError && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center justify-between">
                <span>{plannerError}</span>
                <a
                  href="https://wa.me/966502674930"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline ml-2"
                >
                  WhatsApp Muhammad Aamir Aziz
                </a>
              </div>
            )}

            {/* Generated Itinerary Output */}
            {itinerary && (
              <div className="bg-[#051433] rounded-2xl border border-[#C29427]/40 p-4 sm:p-5 text-white space-y-4 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <h4 className="text-base font-extrabold text-[#F7D070]">
                      {itinerary.title || `${tripType} Plan`}
                    </h4>
                    <p className="text-xs text-gray-300 mt-0.5">
                      {origin} ➔ {destination} • {durationDays} Days • {travelers}
                    </p>
                  </div>
                  {itinerary.estimatedTotalCost && (
                    <div className="px-3 py-1.5 rounded-xl bg-[#C29427]/20 border border-[#C29427]/40 text-right">
                      <div className="text-[10px] text-gray-300">Estimated Budget</div>
                      <div className="text-sm font-black text-[#F7D070]">
                        {itinerary.estimatedTotalCost}
                      </div>
                    </div>
                  )}
                </div>

                {itinerary.summary && (
                  <p className="text-xs text-gray-200 leading-relaxed bg-white/5 p-3 rounded-xl">
                    {itinerary.summary}
                  </p>
                )}

                {/* Day by Day breakdown */}
                {Array.isArray(itinerary.dailySchedule) && (
                  <div className="space-y-2.5">
                    <h5 className="text-xs font-bold text-[#F7D070] uppercase tracking-wider">
                      Schedule Details:
                    </h5>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {itinerary.dailySchedule.map((day: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs flex gap-3"
                        >
                          <span className="font-bold text-[#F7D070] whitespace-nowrap">
                            Day {day.day || idx + 1}:
                          </span>
                          <div>
                            <div className="font-semibold text-white">{day.title || day.activity}</div>
                            {day.description && (
                              <div className="text-gray-300 text-[11px] mt-0.5">{day.description}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* WhatsApp Action Button */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
                  <span className="text-xs text-gray-400">
                    Ready to book this package or negotiate group discount?
                  </span>
                  <button
                    onClick={handleWhatsAppBooking}
                    className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-extrabold flex items-center gap-2 shadow"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Send Itinerary to WhatsApp Desk</span>
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
