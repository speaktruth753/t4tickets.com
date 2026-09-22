import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Pause,
  Play,
  Copy,
  Check,
  Shuffle,
  Gauge,
  ArrowLeftRight,
  Palette
} from 'lucide-react';
import { AHADITH_DATABASE, HadithRecord, TOTAL_AHADITH_COUNT } from '../data/ahadithData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { trackGAEvent } from '../utils/analytics';

// Curated elegant color themes for the Hadith ribbon
type ThemeKey = 'royalNavy' | 'emeraldJewel' | 'regalMaroon';

interface ThemeConfig {
  name: string;
  nameUrdu: string;
  bgGradient: string;
  borderClass: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  edgeGradientFrom: string;
  urduTextColor: string;
  sourceBadge: string;
}

const THEMES: Record<ThemeKey, ThemeConfig> = {
  royalNavy: {
    name: 'Royal Sapphire Navy',
    nameUrdu: 'شاہی نیوی و سنہری',
    bgGradient: 'bg-gradient-to-r from-[#06142E] via-[#0F2A5C] to-[#06142E]',
    borderClass: 'border-[#D4AF37]/50',
    badgeBg: 'bg-[#081B3E]/95',
    badgeBorder: 'border-[#D4AF37]/40',
    badgeText: 'text-[#FDE047]',
    edgeGradientFrom: '#06142E',
    urduTextColor: 'text-slate-100',
    sourceBadge: 'bg-[#071836] border-[#3B82F6]/30 text-sky-200'
  },
  emeraldJewel: {
    name: 'Imperial Emerald Jewel',
    nameUrdu: 'زمردی مخمل و سنہری',
    bgGradient: 'bg-gradient-to-r from-[#042417] via-[#09482F] to-[#042417]',
    borderClass: 'border-[#D4AF37]/50',
    badgeBg: 'bg-[#042417]/95',
    badgeBorder: 'border-[#D4AF37]/40',
    badgeText: 'text-[#FDE047]',
    edgeGradientFrom: '#042417',
    urduTextColor: 'text-emerald-50',
    sourceBadge: 'bg-[#031C12] border-emerald-500/30 text-emerald-200'
  },
  regalMaroon: {
    name: 'Regal Velvet Maroon',
    nameUrdu: 'شاہی عنابی و سنہری',
    bgGradient: 'bg-gradient-to-r from-[#240613] via-[#481127] to-[#240613]',
    borderClass: 'border-[#D4AF37]/50',
    badgeBg: 'bg-[#240613]/95',
    badgeBorder: 'border-[#D4AF37]/40',
    badgeText: 'text-[#FDE047]',
    edgeGradientFrom: '#240613',
    urduTextColor: 'text-rose-50',
    sourceBadge: 'bg-[#1C050F] border-rose-500/30 text-rose-200'
  }
};

type SpeedMode = 'ultraSlow' | 'slow' | 'medium';

const SPEED_CONFIG: Record<SpeedMode, { durationSec: number; labelUrdu: string }> = {
  ultraSlow: { durationSec: 850, labelUrdu: 'انتہائی آہستہ' }, // Default "بالکل کم سپیڈ"
  slow: { durationSec: 600, labelUrdu: 'آہستہ' },
  medium: { durationSec: 400, labelUrdu: 'معتدل' }
};

export const HadithTickerBanner: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Direction: 'ltr' = Left-to-Right (بائیں سے دائیں, requested by user), 'rtl' = Right-to-Left
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  // Speed Mode: defaults to 'ultraSlow' (بالکل کم رفتار)
  const [speedMode, setSpeedMode] = useState<SpeedMode>('ultraSlow');

  // Color Theme: defaults to stunning 'royalNavy' (شاہی نیوی و سنہری)
  const [currentThemeKey, setCurrentThemeKey] = useState<ThemeKey>('royalNavy');
  const currentTheme = THEMES[currentThemeKey];

  // Sliding window of 25 Hadiths from 1,000 database
  const windowHadiths = useMemo(() => {
    const list: HadithRecord[] = [];
    const count = 25;
    for (let i = 0; i < count; i++) {
      const idx = (startIndex + i) % TOTAL_AHADITH_COUNT;
      list.push(AHADITH_DATABASE[idx]);
    }
    return list;
  }, [startIndex]);

  // Duplicate for seamless 0 -> -50% continuous looping
  const tickerItems = useMemo(() => {
    return [...windowHadiths, ...windowHadiths];
  }, [windowHadiths]);

  // Active Hadith for quick copy/WhatsApp share
  const activeHadith: HadithRecord = windowHadiths[0] || AHADITH_DATABASE[0];

  const handleCopyHadith = (hadith: HadithRecord) => {
    const textToCopy = `عربی: ${hadith.arabic}\n\nترجمہ: ${hadith.urdu}\n\n[حوالہ: ${hadith.source} - ${hadith.category}]\nٹی فور ٹکٹس اینڈ ٹریول سروسز (محمد عامر عزیز)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(hadith.id);
    setToastMessage(`حدیث نمبر #${hadith.id} کاپی ہو گئی`);
    trackGAEvent('copy_hadith', { hadith_id: hadith.id, category: hadith.category });
    setTimeout(() => {
      setCopiedId(null);
      setToastMessage(null);
    }, 2500);
  };

  const handleShareWhatsApp = (hadith: HadithRecord) => {
    const shareText = `*حدیث مبارکہ / حصن المسلم:*\n\n${hadith.arabic}\n\n*ترجمہ:*\n${hadith.urdu}\n\n📖 *حوالہ:* ${hadith.source}\n🏷️ *موضوع:* ${hadith.category}\n\n_ٹی فور ٹکٹس اینڈ ٹریول سروسز | زیرِ نگرانی: محمد عامر عزیز_\n_https://wa.me/966502674930_`;
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noreferrer');
    trackGAEvent('share_hadith_whatsapp', { hadith_id: hadith.id });
  };

  const handleShuffleBatch = () => {
    const randomIndex = Math.floor(Math.random() * TOTAL_AHADITH_COUNT);
    setStartIndex(randomIndex);
    setToastMessage(`احادیث ذخیرہ: حدیث #${randomIndex + 1} سے تسلسل شروع`);
    setTimeout(() => setToastMessage(null), 2500);
    trackGAEvent('shuffle_hadith_stream', { startIndex: randomIndex });
  };

  // Toggle speed between Ultra Slow, Slow, and Medium
  const handleToggleSpeed = () => {
    const modes: SpeedMode[] = ['ultraSlow', 'slow', 'medium'];
    const nextIdx = (modes.indexOf(speedMode) + 1) % modes.length;
    const nextMode = modes[nextIdx];
    setSpeedMode(nextMode);
    setToastMessage(`رفتار: ${SPEED_CONFIG[nextMode].labelUrdu}`);
    setTimeout(() => setToastMessage(null), 2200);
  };

  // Toggle direction between Left-to-Right and Right-to-Left
  const handleToggleDirection = () => {
    const nextDir = direction === 'ltr' ? 'rtl' : 'ltr';
    setDirection(nextDir);
    setToastMessage(nextDir === 'ltr' ? 'سمت: بائیں سے دائیں (Left to Right)' : 'سمت: دائیں سے بائیں (Right to Left)');
    setTimeout(() => setToastMessage(null), 2200);
  };

  // Cycle through luxury color themes
  const handleCycleTheme = () => {
    const themes: ThemeKey[] = ['royalNavy', 'emeraldJewel', 'regalMaroon'];
    const nextIdx = (themes.indexOf(currentThemeKey) + 1) % themes.length;
    const nextTheme = themes[nextIdx];
    setCurrentThemeKey(nextTheme);
    setToastMessage(`تھیم رنگ: ${THEMES[nextTheme].nameUrdu}`);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const animationClass = direction === 'ltr' ? 'animate-hadith-ticker-ltr' : 'animate-hadith-ticker-rtl';
  const durationSec = SPEED_CONFIG[speedMode].durationSec;

  return (
    <div
      id="hadith-ticker-banner"
      className={`relative w-full ${currentTheme.bgGradient} text-white border-b ${currentTheme.borderClass} shadow-md select-none z-40 h-10 sm:h-11 flex items-center overflow-hidden transition-colors duration-500`}
      title="ذخیرہ 1000 احادیث نبویہ ﷺ و دعائے حصن المسلم - ٹکر کو روکنے کے لیے ماؤس اوپر رکھیں"
    >
      {/* Right Pinned Stationary Badge: Hadith Title & 1000 Counter */}
      <div
        dir="rtl"
        className={`shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3.5 h-full ${currentTheme.badgeBg} border-l ${currentTheme.badgeBorder} z-20 shadow-lg`}
      >
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FDE047] text-[11px] sm:text-xs font-bold whitespace-nowrap shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-[#E6C65B] animate-pulse" />
          <span className="font-urdu tracking-wide">احادیث مبارکہ</span>
          <span className="text-[10px] bg-black/60 px-1.5 py-0.2 rounded-full font-mono text-amber-200 border border-amber-400/30">
            1000
          </span>
        </div>
      </div>

      {/* Main Continuous Lengthwise Horizontal Ticker ("لمبائی میں لمبا ہو اور چلتا جائے") */}
      <div
        className="flex-1 overflow-hidden relative h-full flex items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`${animationClass} ${isPaused ? 'paused' : ''} flex items-center`}
          style={{ animationDuration: `${durationSec}s` }}
        >
          {tickerItems.map((hadith, index) => {
            return (
              <div
                key={`${hadith.id}-${index}`}
                onClick={() => handleCopyHadith(hadith)}
                className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-6 cursor-pointer group hover:bg-white/10 transition-colors h-full py-1"
                title="کاپی کرنے کے لیے کلک کریں (Click to Copy)"
              >
                {/* Hadith Number Tag */}
                <span className="shrink-0 px-1.5 py-0.5 rounded bg-black/50 border border-[#D4AF37]/40 text-[#FDE047] font-mono text-[10px] sm:text-[11px] font-semibold">
                  #{hadith.id}
                </span>

                {/* 1. ARABIC TEXT: Dedicated font-arabic, golden text with tashkeel */}
                <span
                  className="font-arabic text-[#FDE047] font-bold text-[16px] sm:text-[18px] tracking-wide shrink-0 drop-shadow-md group-hover:text-amber-200 transition-colors"
                  dir="rtl"
                >
                  {hadith.arabic}
                </span>

                {/* Ornamental Gold Separator */}
                <span className="text-[#E6C65B] text-xs opacity-80 shrink-0 select-none">
                  ◈
                </span>

                {/* 2. URDU TRANSLATION: Dedicated font-nastaliq, crisp pearl-white typography */}
                <span
                  className={`font-nastaliq ${currentTheme.urduTextColor} font-medium text-[13px] sm:text-[14px] leading-relaxed shrink-0 group-hover:text-white transition-colors`}
                  dir="rtl"
                >
                  {hadith.urdu}
                </span>

                {/* Hadith Source / Reference */}
                <span
                  className={`text-[11px] ${currentTheme.sourceBadge} px-2 py-0.5 rounded-full shrink-0 shadow-xs`}
                  dir="rtl"
                >
                  ({hadith.source})
                </span>

                {/* Trailing Gold Divider */}
                <span className="text-[#D4AF37]/50 text-sm select-none mr-2">
                  ✦
                </span>
              </div>
            );
          })}
        </div>

        {/* Soft edge gradient fades matching theme background */}
        <div
          className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none z-10"
          style={{ background: `linear-gradient(to left, ${currentTheme.edgeGradientFrom}, transparent)` }}
        />
        <div
          className="absolute top-0 left-0 bottom-0 w-8 pointer-events-none z-10"
          style={{ background: `linear-gradient(to right, ${currentTheme.edgeGradientFrom}, transparent)` }}
        />
      </div>

      {/* Left Pinned Stationary Action Controls */}
      <div
        dir="ltr"
        className={`shrink-0 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 h-full ${currentTheme.badgeBg} border-r ${currentTheme.badgeBorder} z-20 shadow-lg`}
      >
        {/* Toast feedback when action performed */}
        {toastMessage && (
          <div
            dir="rtl"
            className="hidden md:flex items-center gap-1 px-2 py-0.5 bg-[#0A2540] border border-[#D4AF37]/60 rounded text-amber-200 text-[11px] font-urdu shadow-md"
          >
            <Check className="w-3 h-3 text-[#25D366]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 1. Speed Controller Pill ("سپیڈ اس کی کنٹرول کرو اور سپیڈ اس کی کم کرو، بالکل کم") */}
        <button
          onClick={handleToggleSpeed}
          className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded bg-black/40 hover:bg-black/60 text-amber-300 hover:text-white border border-[#D4AF37]/35 text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer active:scale-95"
          title={`رفتار تبدیل کریں (موجودہ: ${SPEED_CONFIG[speedMode].labelUrdu}) - کلک کریں`}
        >
          <Gauge className="w-3 h-3 text-[#FDE047]" />
          <span className="font-urdu hidden sm:inline">{SPEED_CONFIG[speedMode].labelUrdu}</span>
        </button>

        {/* 2. Direction Toggle ("لیفٹ سے رائٹ") */}
        <button
          onClick={handleToggleDirection}
          className="p-1 sm:px-1.5 py-0.5 rounded bg-black/40 hover:bg-black/60 text-amber-200 hover:text-white border border-[#D4AF37]/35 text-[10px] font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-0.5"
          title={direction === 'ltr' ? 'سمت: بائیں سے دائیں (Left to Right) - کلک کر کے دائیں سے بائیں کریں' : 'سمت: دائیں سے بائیں (Right to Left) - کلک کر کے بائیں سے دائیں کریں'}
          aria-label="Toggle Direction"
        >
          <ArrowLeftRight className="w-3 h-3 text-[#E6C65B]" />
          <span className="hidden lg:inline text-[9px] font-mono">{direction.toUpperCase()}</span>
        </button>

        {/* 3. Color Theme Switcher ("پیچھے والا بیک گراؤنڈ ہے نا اس کو کوئی اور خوبصورت سا کلر دو") */}
        <button
          onClick={handleCycleTheme}
          className="p-1 rounded text-amber-200 hover:text-white hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
          title={`پس منظر رنگ تبدیل کریں (موجودہ: ${currentTheme.nameUrdu})`}
          aria-label="Change Background Theme"
        >
          <Palette className="w-3.5 h-3.5 text-[#FDE047]" />
        </button>

        {/* 4. Pause / Play Toggle */}
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          className="p-1 rounded text-amber-200 hover:text-white hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
          title={isPaused ? 'ٹکر چلائیں (Play Ticker)' : 'ٹکر روکیں (Pause Ticker)'}
          aria-label="Toggle Ticker Pause"
        >
          {isPaused ? (
            <Play className="w-3.5 h-3.5 text-[#FDE047]" />
          ) : (
            <Pause className="w-3.5 h-3.5" />
          )}
        </button>

        {/* 5. Shuffle Batch from 1,000 Hadiths */}
        <button
          onClick={handleShuffleBatch}
          className="p-1 rounded text-amber-200 hover:text-white hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
          title="1000 احادیث سے نیا تسلسل منتخب کریں (Randomize Hadith)"
          aria-label="Explore Random Hadith"
        >
          <Shuffle className="w-3.5 h-3.5 text-[#D4AF37]" />
        </button>

        {/* 6. Copy Active Hadith */}
        <button
          onClick={() => handleCopyHadith(activeHadith)}
          className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-100 text-[11px] font-semibold transition-all cursor-pointer border border-white/15"
          title="حدیث مبارکہ کاپی کریں"
        >
          {copiedId === activeHadith.id ? (
            <>
              <Check className="w-3 h-3 text-[#25D366]" />
              <span className="text-[#25D366] text-[10px] hidden sm:inline">کاپی ہو گئی</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span className="hidden sm:inline text-[10px]">کاپی</span>
            </>
          )}
        </button>

        {/* 7. WhatsApp Share */}
        <button
          onClick={() => handleShareWhatsApp(activeHadith)}
          className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-[11px] font-bold border border-[#25D366]/40 transition-all cursor-pointer"
          title="واٹس ایپ پر شیئر کریں"
        >
          <WhatsAppIcon className="w-3 h-3 fill-current" />
          <span className="hidden lg:inline text-[10px]">شیئر</span>
        </button>
      </div>
    </div>
  );
};
