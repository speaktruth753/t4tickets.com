import React, { useState, useEffect, useMemo } from 'react';
import {
  Lock,
  X,
  Gauge,
  Palette,
  ArrowLeftRight,
  RotateCcw,
  Check,
  ShieldCheck,
  Type
} from 'lucide-react';
import { AHADITH_DATABASE, HadithRecord, TOTAL_AHADITH_COUNT } from '../data/ahadithData';
import { trackGAEvent } from '../utils/analytics';

// Storage keys for preserving Admin settings
const STORAGE_KEY_THEME = 't4_ticker_theme';
const STORAGE_KEY_SPEED = 't4_ticker_speed';
const STORAGE_KEY_DIRECTION = 't4_ticker_direction';
const STORAGE_KEY_FONT_SIZE = 't4_ticker_font_size';

export type TickerThemeKey = 'royalNavy' | 'emeraldJewel' | 'regalMaroon' | 'midnightOnyx' | 'deepAmethyst';

interface TickerThemeConfig {
  name: string;
  nameUrdu: string;
  bgGradient: string;
  borderClass: string;
  badgeBg: string;
  edgeGradientFrom: string;
  urduTextColor: string;
  sourceBadge: string;
  previewColor: string;
}

export const TICKER_THEMES: Record<TickerThemeKey, TickerThemeConfig> = {
  royalNavy: {
    name: 'Royal Sapphire Navy',
    nameUrdu: 'شاہی نیوی و سنہری',
    bgGradient: 'bg-gradient-to-r from-[#06142E] via-[#0F2A5C] to-[#06142E]',
    borderClass: 'border-[#D4AF37]/50',
    badgeBg: 'bg-[#081B3E]/95',
    edgeGradientFrom: '#06142E',
    urduTextColor: 'text-slate-100',
    sourceBadge: 'bg-[#071836] border-[#3B82F6]/30 text-sky-200',
    previewColor: '#0F2A5C'
  },
  emeraldJewel: {
    name: 'Imperial Emerald Jewel',
    nameUrdu: 'زمردی مخمل و سنہری',
    bgGradient: 'bg-gradient-to-r from-[#032317] via-[#08452D] to-[#032317]',
    borderClass: 'border-[#D4AF37]/50',
    badgeBg: 'bg-[#032317]/95',
    edgeGradientFrom: '#032317',
    urduTextColor: 'text-emerald-50',
    sourceBadge: 'bg-[#021A11] border-emerald-500/30 text-emerald-200',
    previewColor: '#08452D'
  },
  regalMaroon: {
    name: 'Regal Velvet Maroon',
    nameUrdu: 'شاہی عنابی و سنہری',
    bgGradient: 'bg-gradient-to-r from-[#240613] via-[#481127] to-[#240613]',
    borderClass: 'border-[#D4AF37]/50',
    badgeBg: 'bg-[#240613]/95',
    edgeGradientFrom: '#240613',
    urduTextColor: 'text-rose-50',
    sourceBadge: 'bg-[#1C050F] border-rose-500/30 text-rose-200',
    previewColor: '#481127'
  },
  midnightOnyx: {
    name: 'Midnight Onyx & Gold',
    nameUrdu: 'سیاہ عقیق و سنہری',
    bgGradient: 'bg-gradient-to-r from-[#0a0a0a] via-[#1a1815] to-[#0a0a0a]',
    borderClass: 'border-[#D4AF37]/60',
    badgeBg: 'bg-black/95',
    edgeGradientFrom: '#0a0a0a',
    urduTextColor: 'text-amber-50',
    sourceBadge: 'bg-[#14120f] border-amber-500/30 text-amber-200',
    previewColor: '#1a1815'
  },
  deepAmethyst: {
    name: 'Deep Amethyst Purple',
    nameUrdu: 'شاہی یاقوتی و سنہری',
    bgGradient: 'bg-gradient-to-r from-[#170a2c] via-[#2f1654] to-[#170a2c]',
    borderClass: 'border-[#D4AF37]/50',
    badgeBg: 'bg-[#170a2c]/95',
    edgeGradientFrom: '#170a2c',
    urduTextColor: 'text-purple-50',
    sourceBadge: 'bg-[#120722] border-purple-500/30 text-purple-200',
    previewColor: '#2f1654'
  }
};

export type TickerSpeedMode = 'ultraSlow' | 'verySlow' | 'slow' | 'medium';

export const SPEED_PRESETS: Record<TickerSpeedMode, { durationSec: number; labelUrdu: string; labelEn: string }> = {
  ultraSlow: { durationSec: 950, labelUrdu: 'انتہائی پرسکون (بہت کم)', labelEn: 'Ultra Slow' },
  verySlow: { durationSec: 750, labelUrdu: 'آہستہ اور واضح', labelEn: 'Very Slow' },
  slow: { durationSec: 550, labelUrdu: 'معتدل آہستہ', labelEn: 'Slow' },
  medium: { durationSec: 380, labelUrdu: 'درمیانی رفتار', labelEn: 'Medium' }
};

export type FontSizeOption = 'normal' | 'large' | 'extraLarge';

export const FONT_SIZE_CONFIG: Record<FontSizeOption, { arabicClass: string; urduClass: string; labelUrdu: string }> = {
  normal: {
    arabicClass: 'text-[17px] sm:text-[19px]',
    urduClass: 'text-[14px] sm:text-[15px]',
    labelUrdu: 'نارمل'
  },
  large: {
    arabicClass: 'text-[20px] sm:text-[23px]', // Enlarged default
    urduClass: 'text-[16px] sm:text-[17px]',
    labelUrdu: 'بڑا (تجویز کردہ)'
  },
  extraLarge: {
    arabicClass: 'text-[23px] sm:text-[26px]',
    urduClass: 'text-[18px] sm:text-[19px]',
    labelUrdu: 'انتہائی بڑا'
  }
};

export const HadithTickerBanner: React.FC = () => {
  const [startIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings State (Loaded from localStorage or defaults)
  const [themeKey, setThemeKey] = useState<TickerThemeKey>(() => {
    return (localStorage.getItem(STORAGE_KEY_THEME) as TickerThemeKey) || 'royalNavy';
  });

  const [speedMode, setSpeedMode] = useState<TickerSpeedMode>(() => {
    return (localStorage.getItem(STORAGE_KEY_SPEED) as TickerSpeedMode) || 'ultraSlow';
  });

  const [direction, setDirection] = useState<'ltr' | 'rtl'>(() => {
    return (localStorage.getItem(STORAGE_KEY_DIRECTION) as 'ltr' | 'rtl') || 'ltr';
  });

  const [fontSize, setFontSize] = useState<FontSizeOption>(() => {
    return (localStorage.getItem(STORAGE_KEY_FONT_SIZE) as FontSizeOption) || 'large';
  });

  // Admin Modal / Panel Visibility State
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Persist settings
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_THEME, themeKey);
  }, [themeKey]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SPEED, speedMode);
  }, [speedMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DIRECTION, direction);
  }, [direction]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FONT_SIZE, fontSize);
  }, [fontSize]);

  // Window of Hadiths from 1,000 DB
  const windowHadiths = useMemo(() => {
    const list: HadithRecord[] = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      const idx = (startIndex + i) % TOTAL_AHADITH_COUNT;
      list.push(AHADITH_DATABASE[idx]);
    }
    return list;
  }, [startIndex]);

  const tickerItems = useMemo(() => {
    return [...windowHadiths, ...windowHadiths];
  }, [windowHadiths]);

  const handleCopyHadith = (hadith: HadithRecord) => {
    const textToCopy = `عربی: ${hadith.arabic}\n\nترجمہ: ${hadith.urdu}\n\n[حوالہ: ${hadith.source} - ${hadith.category}]\nٹی فور ٹکٹس اینڈ ٹریول سروسز (محمد عامر عزیز)`;
    navigator.clipboard.writeText(textToCopy);
    setToastMessage(`حدیث مبارکہ کاپی ہو گئی`);
    trackGAEvent('copy_hadith', { hadith_id: hadith.id, category: hadith.category });
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 786 or 1234 or aamir
    const normalized = adminPinInput.trim().toLowerCase();
    if (normalized === '786' || normalized === '1234' || normalized === 'aamir' || normalized === '') {
      setPinUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const activeTheme = TICKER_THEMES[themeKey] || TICKER_THEMES.royalNavy;
  const currentSpeed = SPEED_PRESETS[speedMode] || SPEED_PRESETS.ultraSlow;
  const currentFont = FONT_SIZE_CONFIG[fontSize] || FONT_SIZE_CONFIG.large;
  const animationClass = direction === 'ltr' ? 'animate-hadith-ticker-ltr' : 'animate-hadith-ticker-rtl';

  return (
    <>
      {/* Hadith Ribbon Bar - Clean, Edge-to-Edge with enlarged typography */}
      <div
        id="hadith-ticker-banner"
        dir="ltr"
        onDoubleClick={() => setAdminModalOpen(true)}
        className={`relative w-full ${activeTheme.bgGradient} text-white border-b ${activeTheme.borderClass} shadow-md select-none z-40 h-11 sm:h-12 flex items-center overflow-hidden transition-colors duration-500`}
        title="احادیث نبویہ ﷺ و دعائے حصن المسلم - ٹکر روکنے کے لیے ماؤس اوپر رکھیں، کاپی کے لیے کلک کریں (ایڈمن کے لیے ڈبل کلک کریں)"
      >
        {/* Toast Feedback */}
        {toastMessage && (
          <div
            dir="rtl"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 px-3 py-1 bg-[#0A2540]/95 border border-[#D4AF37] rounded-full text-[#FDE047] text-xs font-urdu shadow-xl backdrop-blur-xs flex items-center gap-1.5 animate-fade-in pointer-events-none"
          >
            <span>✓</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Secret / Discreet Admin Gear Trigger (فقط ایڈمن کے لیے نظر نہ آنے والا یا انتہائی غیر محسوس بٹن) */}
        <button
          onClick={() => setAdminModalOpen(true)}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-30 opacity-0 hover:opacity-80 transition-opacity p-1 rounded-full text-amber-300 hover:text-white bg-black/40 text-[10px] cursor-pointer"
          title="ایڈمن سیٹنگز پینل (خفیہ ایڈمن کنٹرول)"
          aria-label="Open Admin Settings"
        >
          <Lock className="w-2.5 h-2.5" />
        </button>

        {/* Main Continuous Marquee Track */}
        <div
          dir="ltr"
          className="w-full h-full overflow-hidden relative flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`${animationClass} ${isPaused ? 'paused' : ''} flex items-center`}
            style={{ animationDuration: `${currentSpeed.durationSec}s` }}
          >
            {tickerItems.map((hadith, index) => {
              return (
                <div
                  key={`${hadith.id}-${index}`}
                  onClick={() => handleCopyHadith(hadith)}
                  className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-6 cursor-pointer group hover:bg-white/10 transition-colors h-full py-1 shrink-0"
                  title="حدیث مبارکہ کاپی کرنے کے لیے کلک کریں (Click to Copy)"
                >
                  {/* Hadith Serial Tag */}
                  <span className="shrink-0 px-1.5 py-0.5 rounded bg-black/50 border border-[#D4AF37]/40 text-[#FDE047] font-mono text-[10px] sm:text-[11px] font-semibold">
                    #{hadith.id}
                  </span>

                  {/* 1. ARABIC TEXT: Large, Clear, Golden Typography with full tashkeel */}
                  <span
                    className={`font-arabic text-[#FDE047] font-bold ${currentFont.arabicClass} tracking-wide shrink-0 drop-shadow-md group-hover:text-amber-200 transition-all`}
                    dir="rtl"
                  >
                    {hadith.arabic}
                  </span>

                  {/* Ornamental Gold Separator */}
                  <span className="text-[#E6C65B] text-xs opacity-80 shrink-0 select-none">
                    ◈
                  </span>

                  {/* 2. URDU TRANSLATION: Large, Clear, Pure Nastaliq Typography */}
                  <span
                    className={`font-nastaliq ${activeTheme.urduTextColor} font-medium ${currentFont.urduClass} leading-relaxed shrink-0 group-hover:text-white transition-all`}
                    dir="rtl"
                  >
                    {hadith.urdu}
                  </span>

                  {/* Hadith Source / Reference */}
                  <span
                    className={`text-[11px] sm:text-xs ${activeTheme.sourceBadge} px-2 py-0.5 rounded-full shrink-0 shadow-xs`}
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

          {/* Seamless Edge Gradient Fades */}
          <div
            className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none z-10"
            style={{ background: `linear-gradient(to left, ${activeTheme.edgeGradientFrom}, transparent)` }}
          />
          <div
            className="absolute top-0 left-0 bottom-0 w-8 pointer-events-none z-10"
            style={{ background: `linear-gradient(to right, ${activeTheme.edgeGradientFrom}, transparent)` }}
          />
        </div>
      </div>

      {/* ADMIN CONTROL MODAL - Only accessible to you (Password/PIN protected or instant) */}
      {adminModalOpen && (
        <div
          dir="rtl"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
          onClick={() => setAdminModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-[#071836] border-2 border-[#D4AF37] rounded-2xl shadow-2xl p-5 sm:p-6 text-white overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#D4AF37]/20 text-[#FDE047] border border-[#D4AF37]/40">
                  <ShieldCheck className="w-5 h-5 text-[#FDE047]" />
                </div>
                <div>
                  <h3 className="font-urdu font-bold text-lg text-[#FDE047]">
                    ایڈمن پینل: احادیث ٹکر سیٹنگز
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    یہ ترتیبات صرف آپ (ایڈمن) کے لیے ہیں، عام کسٹمر کو نظر نہیں آئیں گی۔
                  </p>
                </div>
              </div>

              <button
                onClick={() => setAdminModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Unlocking Form if not yet verified */}
            {!pinUnlocked ? (
              <form onSubmit={handleUnlockAdmin} className="py-4 space-y-4">
                <div className="text-center space-y-1">
                  <Lock className="w-8 h-8 text-[#D4AF37] mx-auto animate-bounce" />
                  <p className="font-urdu text-sm text-gray-200">
                    ایڈمن توثیق کے لیے پن درج کریں (یا سیدھا "انلاک" دبائیں):
                  </p>
                  <p className="text-[11px] text-gray-400 font-mono">
                    (پہلے سے محفوظ ڈیفالٹ پن: 786 یا خالی چھوڑ کر انٹر کریں)
                  </p>
                </div>

                <div className="max-w-xs mx-auto space-y-2">
                  <input
                    type="password"
                    value={adminPinInput}
                    onChange={(e) => setAdminPinInput(e.target.value)}
                    placeholder="درج کریں: 786"
                    className="w-full text-center px-4 py-2.5 rounded-xl bg-black/50 border border-[#D4AF37]/50 text-white font-mono text-lg focus:outline-none focus:border-[#FDE047]"
                    autoFocus
                  />
                  {pinError && (
                    <p className="text-xs text-rose-400 text-center font-urdu">
                      غلط پن کوڈ، براہ کرم 786 درج کریں۔
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#E6C65B] hover:to-[#C29427] text-black font-urdu font-bold text-sm shadow-lg transition-transform active:scale-95 cursor-pointer"
                  >
                    سیٹنگز انلاک کریں
                  </button>
                </div>
              </form>
            ) : (
              /* Unlocked Settings Content */
              <div className="space-y-5 font-urdu">
                {/* 1. FONT SIZE SELECTOR */}
                <div className="space-y-2 bg-black/30 p-3.5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-xs text-[#FDE047] font-bold">
                    <div className="flex items-center gap-1.5">
                      <Type className="w-4 h-4 text-[#FDE047]" />
                      <span>احادیث کا فونٹ سائز (تحریر کا سائز)</span>
                    </div>
                    <span className="text-gray-300 font-normal">
                      موجودہ: {FONT_SIZE_CONFIG[fontSize].labelUrdu}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(FONT_SIZE_CONFIG) as FontSizeOption[]).map((key) => {
                      const cfg = FONT_SIZE_CONFIG[key];
                      const isSelected = fontSize === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setFontSize(key)}
                          className={`py-2 px-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-[#D4AF37] text-black border-[#FDE047] shadow-md scale-102'
                              : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {cfg.labelUrdu}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. SPEED SELECTOR */}
                <div className="space-y-2 bg-black/30 p-3.5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-xs text-[#FDE047] font-bold">
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-[#FDE047]" />
                      <span>چلنے کی رفتار (Speed Controller)</span>
                    </div>
                    <span className="text-gray-300 font-normal">
                      موجودہ: {SPEED_PRESETS[speedMode].labelUrdu}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(SPEED_PRESETS) as TickerSpeedMode[]).map((key) => {
                      const sp = SPEED_PRESETS[key];
                      const isSelected = speedMode === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setSpeedMode(key)}
                          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all border cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#D4AF37] text-black border-[#FDE047] shadow-md'
                              : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <span>{sp.labelUrdu}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. COLOR THEME SELECTOR */}
                <div className="space-y-2 bg-black/30 p-3.5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-xs text-[#FDE047] font-bold">
                    <div className="flex items-center gap-1.5">
                      <Palette className="w-4 h-4 text-[#FDE047]" />
                      <span>بیک گراؤنڈ تھیم کلر (Background Palette)</span>
                    </div>
                    <span className="text-gray-300 font-normal">
                      {activeTheme.nameUrdu}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(Object.keys(TICKER_THEMES) as TickerThemeKey[]).map((key) => {
                      const thm = TICKER_THEMES[key];
                      const isSelected = themeKey === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setThemeKey(key)}
                          className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-[#FDE047] bg-white/15 shadow-md ring-1 ring-[#D4AF37]'
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-4 h-4 rounded-full border border-white/40 shrink-0"
                              style={{ backgroundColor: thm.previewColor }}
                            />
                            <span className="text-xs font-medium text-gray-200">
                              {thm.nameUrdu}
                            </span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#FDE047]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. DIRECTION TOGGLE */}
                <div className="bg-black/30 p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowLeftRight className="w-4 h-4 text-[#FDE047]" />
                    <div>
                      <div className="text-xs font-bold text-[#FDE047]">حرکت کی سمت (Direction)</div>
                      <div className="text-[11px] text-gray-400">
                        {direction === 'ltr' ? 'بائیں سے دائیں (Left to Right)' : 'دائیں سے بائیں (Right to Left)'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-white/10">
                    <button
                      onClick={() => setDirection('ltr')}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                        direction === 'ltr' ? 'bg-[#D4AF37] text-black' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      بائیں سے دائیں (LTR)
                    </button>
                    <button
                      onClick={() => setDirection('rtl')}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                        direction === 'rtl' ? 'bg-[#D4AF37] text-black' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      دائیں سے بائیں (RTL)
                    </button>
                  </div>
                </div>

                {/* Reset to defaults & Done */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setThemeKey('royalNavy');
                      setSpeedMode('ultraSlow');
                      setDirection('ltr');
                      setFontSize('large');
                    }}
                    className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>ڈیفالٹ پر بحال کریں</span>
                  </button>

                  <button
                    onClick={() => setAdminModalOpen(false)}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-black font-bold text-xs hover:from-[#E6C65B] shadow-md transition-transform active:scale-95 cursor-pointer"
                  >
                    مکمل اور محفوظ کریں
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
