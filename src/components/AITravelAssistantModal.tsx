import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  X,
  Phone,
  ArrowRight,
  Loader2,
  RefreshCw,
  Copy,
  Check,
  Building2,
  Plane,
  FileCheck2,
  Stethoscope
} from 'lucide-react';
import { CurrencyCode } from '../types';

interface AITravelAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenItineraryPlanner: () => void;
  currentCurrency?: CurrencyCode;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AITravelAssistantModal: React.FC<AITravelAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenItineraryPlanner
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: 'السلام علیکم ورحمة الله وبركاته! Welcome to T4 TICKETS & TRAVEL SERVICES AI Consultant.\n\nI am here to help you find the cheapest flights, plan your VIP Umrah package, guide on visit & work visas, and assist with GCC medical appointments.\n\nHow can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    '🕋 14 Days VIP Umrah package budget & hotels near Haram',
    '✈️ Cheapest flight from Lahore/Islamabad to Jeddah/Riyadh',
    '🛂 Saudi 1-Year Multiple Entry Visit Visa requirements',
    '🩺 How to book GCC (Gamca / Wafid) medical appointment',
    '💼 Best airlines for Dubai & Qatar holiday trip'
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (userTextToSend?: string) => {
    const text = (userTextToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!userTextToSend) setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.map((m) => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await res.json();
      const aiReply = data.reply || data.fallback || 'I am ready to help you book your journey. Please WhatsApp Muhammad Aamir Aziz at +966 50 267 4930.';

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error('AI chat failed:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: 'We are experiencing high demand on the AI service. For instant ticket issuance, best airline quotes (Saudia, PIA, Qatar, Emirates, AirSial), and Umrah arrangements, please contact Muhammad Aamir Aziz directly on WhatsApp: +966 50 267 4930.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportChatToWhatsApp = () => {
    const lastAiMsg = [...messages].reverse().find((m) => m.sender === 'ai')?.text || '';
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user')?.text || '';
    const text = encodeURIComponent(
      `Hello Muhammad Aamir Aziz (T4 Tickets),\nI was consulting your AI Travel Assistant regarding: "${lastUserMsg}".\n\nAI Recommendation: ${lastAiMsg.slice(0, 300)}...\n\nPlease provide your best available rates and book this for me.`
    );
    window.open(`https://wa.me/966502674930?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#071A3D] rounded-2xl border-2 border-[#C29427]/60 shadow-2xl flex flex-col h-[90vh] max-h-[720px] overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-[#051433] via-[#0A2458] to-[#051433] border-b border-[#C29427]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#B8860B] to-[#F7D070] flex items-center justify-center shadow-lg shadow-[#B8860B]/30">
              <Bot className="w-5 h-5 text-[#051433]" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border border-[#051433]" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white font-heading">
                  T4 Smart AI Travel Advisor
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#C29427]/20 border border-[#C29427]/50 text-[10px] font-bold text-[#F5D061]">
                  Gemini 3.8
                </span>
              </div>
              <p className="text-[11px] text-gray-300">
                Official consultant for T4 Tickets • Urdu &amp; English Supported
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenItineraryPlanner();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C29427]/20 hover:bg-[#C29427]/30 border border-[#C29427]/50 text-xs text-[#F5D061] font-bold transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trip Planner</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Urdu Slogan Banner */}
        <div className="bg-[#040D22] px-4 py-1.5 border-b border-white/5 flex items-center justify-between text-[11px]">
          <span className="text-[#F5D061] font-serif font-bold">
            سستی ترین ٹکٹ ، بہترین سروس ، ہر سفر بے فکر
          </span>
          <span className="text-gray-400">
            Manager: <strong className="text-white">Muhammad Aamir Aziz</strong>
          </span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#071A3D] to-[#051433]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#B8860B] to-[#F7D070] flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="w-4 h-4 text-[#051433]" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-md relative group ${
                  msg.sender === 'user'
                    ? 'bg-[#C29427] text-[#051433] font-medium rounded-tr-none'
                    : 'bg-[#0A2458] text-white border border-white/10 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                <div
                  className={`mt-2 flex items-center justify-between gap-2 text-[10px] ${
                    msg.sender === 'user' ? 'text-[#051433]/70' : 'text-gray-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'ai' && (
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        className="p-1 rounded hover:bg-white/10 text-gray-300 transition-colors"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-[#C29427]/20 border border-[#C29427] flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-[#F5D061]" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-xs text-gray-400">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#B8860B] to-[#F7D070] flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4 text-[#051433]" />
              </div>
              <div className="p-3 rounded-2xl bg-[#0A2458] border border-white/10 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#F5D061]" />
                <span>Searching flight fares and travel guidelines...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-[#051433] border-t border-white/10 overflow-x-auto flex items-center gap-2 no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              disabled={isLoading}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#C29427]/20 border border-white/10 hover:border-[#C29427] text-gray-300 hover:text-white text-[11px] transition-all whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar & Actions */}
        <div className="p-3 sm:p-4 bg-[#071A3D] border-t border-[#C29427]/30 flex flex-col gap-2.5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything (e.g. Best flight to Jeddah, 10 days Umrah hotel rates, visa)..."
              disabled={isLoading}
              className="flex-1 bg-white/5 border border-white/15 focus:border-[#C29427] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-[#C29427] hover:bg-[#D4A338] disabled:opacity-40 text-[#051433] font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shrink-0"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Direct WhatsApp Transfer Button */}
          <div className="flex items-center justify-between gap-2 pt-1 text-xs">
            <span className="text-gray-400 text-[11px]">
              Need to confirm rates with agent?
            </span>
            <button
              onClick={exportChatToWhatsApp}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Forward to WhatsApp (+966 50 267 4930)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
