import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LanguageCode } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSelector: React.FC<{
  variant?: 'header' | 'mobile' | 'footer';
}> = ({ variant = 'header' }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: {
    code: LanguageCode;
    label: string;
    nativeName: string;
    flag: string;
    fontClass: string;
  }[] = [
    { code: 'AR', label: 'العربية', nativeName: 'Arabic', flag: '🇸🇦', fontClass: 'font-arabic' },
    { code: 'UR', label: 'اردو', nativeName: 'Urdu', flag: '🇵🇰', fontClass: 'font-nastaliq' },
    { code: 'EN', label: 'English', nativeName: 'English (US)', flag: '🇬🇧', fontClass: 'font-sans' }
  ];

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className="w-full bg-white/5 rounded-2xl p-2.5 border border-white/10">
        <div className="flex items-center gap-2 px-2 pb-2 text-xs font-bold text-[#F5D061] border-b border-white/10">
          <Globe className="w-4 h-4 text-[#F5D061]" />
          <span>اختر اللغة / Select Language / زبان منتخب کریں</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 pt-2">
          {languages.map((item) => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                onClick={() => handleSelect(item.code)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#F5D061] text-[#071A3D] shadow-md font-black scale-102'
                    : 'bg-white/5 text-gray-200 hover:bg-white/10'
                }`}
              >
                <span className="text-base leading-none mb-1">{item.flag}</span>
                <span className={`${item.fontClass} tracking-wide`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Almosafer-style sleek pill button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs sm:text-sm font-semibold transition-all duration-150 backdrop-blur-xs shadow-xs hover:border-[#F5D061]/50 cursor-pointer"
        title="تغيير اللغة / Change Language / زبان تبدیل کریں"
        aria-expanded={isOpen}
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span className={`font-bold tracking-wide ${currentLang.fontClass}`}>{currentLang.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-300 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#F5D061]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          dir={language === 'AR' || language === 'UR' ? 'rtl' : 'ltr'}
          className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#071A3D] border border-[#F5D061]/40 shadow-2xl z-50 overflow-hidden animate-fade-in py-1 backdrop-blur-md"
        >
          <div className="px-3 py-2 text-[11px] font-bold text-gray-400 border-b border-white/10 flex items-center justify-between">
            <span>اختر اللغة</span>
            <Globe className="w-3.5 h-3.5 text-[#F5D061]" />
          </div>

          <div className="p-1 space-y-0.5">
            {languages.map((item) => {
              const isSelected = item.code === language;
              return (
                <button
                  key={item.code}
                  onClick={() => handleSelect(item.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#F5D061] text-[#071A3D] font-extrabold shadow-sm'
                      : 'text-gray-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.flag}</span>
                    <div className="flex flex-col text-start">
                      <span className={`leading-tight ${item.fontClass}`}>{item.label}</span>
                      <span
                        className={`text-[10px] ${
                          isSelected ? 'text-[#071A3D]/80 font-semibold' : 'text-gray-400'
                        }`}
                      >
                        {item.nativeName}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
