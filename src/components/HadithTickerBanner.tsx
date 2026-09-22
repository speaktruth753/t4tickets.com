import React, { useState, useMemo } from 'react';
import { AHADITH_DATABASE, HadithRecord, TOTAL_AHADITH_COUNT } from '../data/ahadithData';
import { trackGAEvent } from '../utils/analytics';

export const HadithTickerBanner: React.FC = () => {
  const [startIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sliding window of 30 Hadiths from 1,000 database for clean wide continuous marquee
  const windowHadiths = useMemo(() => {
    const list: HadithRecord[] = [];
    const count = 30;
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

  const handleCopyHadith = (hadith: HadithRecord) => {
    const textToCopy = `عربی: ${hadith.arabic}\n\nترجمہ: ${hadith.urdu}\n\n[حوالہ: ${hadith.source} - ${hadith.category}]\nٹی فور ٹکٹس اینڈ ٹریول سروسز (محمد عامر عزیز)`;
    navigator.clipboard.writeText(textToCopy);
    setToastMessage(`حدیث مبارکہ کاپی ہو گئی`);
    trackGAEvent('copy_hadith', { hadith_id: hadith.id, category: hadith.category });
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  return (
    <div
      id="hadith-ticker-banner"
      className="relative w-full bg-gradient-to-r from-[#06142E] via-[#0F2A5C] to-[#06142E] text-white border-b border-[#D4AF37]/50 shadow-md select-none z-40 h-10 sm:h-11 flex items-center overflow-hidden"
      title="احادیث نبویہ ﷺ و دعائے حصن المسلم - ٹکر روکنے کے لیے ماؤس اوپر رکھیں، کاپی کرنے کے لیے کلک کریں"
    >
      {/* Toast Notification when a Hadith is clicked/copied */}
      {toastMessage && (
        <div
          dir="rtl"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 px-3 py-1 bg-[#0A2540]/95 border border-[#D4AF37] rounded-full text-[#FDE047] text-xs font-urdu shadow-xl backdrop-blur-xs flex items-center gap-1.5 animate-fade-in pointer-events-none"
        >
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Full-Width Continuous Horizontal Ticker (بائیں سے دائیں، مکمل کشادہ جگہ) */}
      <div
        className="w-full h-full overflow-hidden relative flex items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`animate-hadith-ticker-ltr ${isPaused ? 'paused' : ''} flex items-center`}
          style={{ animationDuration: '850s' }}
        >
          {tickerItems.map((hadith, index) => {
            return (
              <div
                key={`${hadith.id}-${index}`}
                onClick={() => handleCopyHadith(hadith)}
                className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-6 cursor-pointer group hover:bg-white/10 transition-colors h-full py-1 shrink-0"
                title="حدیث مبارکہ کاپی کرنے کے لیے کلک کریں (Click to Copy)"
              >
                {/* Hadith Number Tag */}
                <span className="shrink-0 px-1.5 py-0.5 rounded bg-black/50 border border-[#D4AF37]/40 text-[#FDE047] font-mono text-[10px] sm:text-[11px] font-semibold">
                  #{hadith.id}
                </span>

                {/* 1. ARABIC TEXT: Dedicated font-arabic, golden text with full tashkeel */}
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
                  className="font-nastaliq text-slate-100 font-medium text-[13px] sm:text-[14px] leading-relaxed shrink-0 group-hover:text-white transition-colors"
                  dir="rtl"
                >
                  {hadith.urdu}
                </span>

                {/* Hadith Source / Reference */}
                <span
                  className="text-[11px] bg-[#071836] border border-[#3B82F6]/30 text-sky-200 px-2 py-0.5 rounded-full shrink-0 shadow-xs"
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

        {/* Soft edge gradient fades for seamless edge entrance and exit */}
        <div
          className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none z-10 bg-gradient-to-l from-[#06142E] to-transparent"
        />
        <div
          className="absolute top-0 left-0 bottom-0 w-8 pointer-events-none z-10 bg-gradient-to-r from-[#06142E] to-transparent"
        />
      </div>
    </div>
  );
};
