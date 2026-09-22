import React, { useState, useEffect } from 'react';
import {
  Plane,
  Menu,
  X,
  FileCheck2,
  MoonStar,
  Sparkles,
  HelpCircle,
  Flame
} from 'lucide-react';
import { CurrencyCode, LanguageCode } from '../types';
import { T4Logo, LogoColorTheme } from './T4Logo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { HadithTickerBanner } from './HadithTickerBanner';

interface HeaderProps {
  currentCurrency?: CurrencyCode;
  onCurrencyChange?: (curr: CurrencyCode) => void;
  currentLanguage?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
  brandColor?: LogoColorTheme;
  onBrandColorChange?: (color: LogoColorTheme) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onNavigate: (sectionId: string) => void;
  onOpenInquiry?: (subject: string) => void;
  onOpenAssistant?: (tab?: 'chat' | 'planner') => void;
}

export const Header: React.FC<HeaderProps> = ({
  brandColor = 'gold',
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero-section', label: 'Flights', icon: Plane },
    { id: 'special-offers-countdown', label: 'Flash Offers', icon: Flame, badge: 'HOT' },
    { id: 'umrah-section', label: 'Umrah Packages', icon: MoonStar, badge: 'VIP' },
    { id: 'services-section', label: 'Visas & Medical', icon: FileCheck2 },
    { id: 'deals-section', label: 'Top Deals', icon: Sparkles },
    { id: 'faq-section', label: 'Support & FAQ', icon: HelpCircle },
  ];

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#071A3D]/95 backdrop-blur-md shadow-lg shadow-black/25 border-b border-white/10'
            : 'bg-[#071A3D] border-b border-white/10'
        }`}
      >
        {/* Animated Islamic Hadith & Hisn al-Muslim Ticker (1,000 Ahadith in Nastaliq) */}
        <HadithTickerBanner />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <div className="flex items-center justify-between">
            {/* Left: Brand Identity with 3D Rendered Logo */}
            <div
              id="brand-logo"
              className="flex items-center gap-3 cursor-pointer group select-none"
              onClick={() => onNavigate('hero-section')}
            >
              <div
                id="header-t4tickets-logo-container"
                className="flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                title="T4 TICKETS Official 3D Logo"
              >
                <T4Logo
                  id="header-t4tickets-logo"
                  size="responsive"
                  colorTheme={brandColor}
                  alt="T4 TICKETS Official Logo"
                  showStatusIndicator={false}
                />
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-heading leading-tight">
                  T4{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE082] via-[#F5D061] to-[#DFB15B]">
                    TICKETS
                  </span>
                </span>
                <span className="text-[11px] text-gray-300 font-semibold tracking-wider uppercase">
                  AND TRAVEL SERVICES
                </span>
              </div>
            </div>

            {/* Center: Clean Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => onNavigate(item.id)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                  >
                    <Icon className="w-4 h-4 text-[#F5D061]" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#E53935] text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right: ONLY DIRECT WHATSAPP CONTACT BUTTON */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                id="header-direct-whatsapp-btn"
                href="https://wa.me/966502674930?text=Assalam%20u%20Alaikum%20Muhammad%20Aamir%20Aziz%2C%20I%20want%20to%20book%20a%20ticket%20or%20visa"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all duration-150 group"
                title="Direct WhatsApp Contact - Muhammad Aamir Aziz (+966 50 267 4930)"
              >
                <WhatsAppIcon className="w-4 sm:w-5 h-4 sm:h-5 fill-current shrink-0" />
                <span className="hidden sm:inline font-bold">WhatsApp Contact</span>
                <span className="sm:hidden font-bold">WhatsApp</span>
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Simplified Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#071A3D] text-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div
                  id="mobile-drawer-brand"
                  className="flex items-center gap-2.5 cursor-pointer"
                  onClick={() => {
                    onNavigate('hero-section');
                    setMobileMenuOpen(false);
                  }}
                >
                  <T4Logo
                    id="mobile-drawer-t4tickets-logo"
                    size="sm"
                    colorTheme={brandColor}
                    alt="T4 TICKETS Logo"
                    showStatusIndicator={false}
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-black font-heading tracking-tight leading-tight">
                      T4 <span className="text-[#F5D061]">TICKETS</span>
                    </span>
                    <span className="text-[10px] text-gray-300 font-semibold tracking-wide">
                      TRAVEL SERVICES
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 text-gray-300 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Direct WhatsApp Contact Button Inside Mobile Menu */}
              <div className="mt-5">
                <a
                  href="https://wa.me/966502674930?text=Assalam%20u%20Alaikum%20Muhammad%20Aamir%20Aziz%2C%20I%20want%20to%20book%20a%20ticket"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-lg shadow-[#25D366]/30 transition-transform active:scale-95"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                  <span>Direct WhatsApp Contact</span>
                </a>
              </div>

              {/* Clean Navigation Items */}
              <div className="mt-6 flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        onNavigate(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between px-3.5 py-3 rounded-xl hover:bg-white/10 text-sm font-semibold text-gray-200 hover:text-white transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-[#F5D061]" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-[#E53935] text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct WhatsApp Contact Info */}
            <div className="pt-6 border-t border-white/10 text-center space-y-2">
              <p className="text-xs text-gray-300 font-medium">Chief Executive: <span className="font-bold text-[#F5D061]">محمد عامر عزیز</span></p>
              <div className="flex flex-col gap-1.5 text-xs font-mono">
                <a
                  href="https://wa.me/966502674930"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 text-[#4ADE80] hover:text-[#25D366] transition-colors"
                >
                  <span className="text-gray-400 font-sans">KSA:</span>
                  <span dir="ltr" className="font-bold">+966 50 267 4930</span>
                </a>
                <a
                  href="https://wa.me/923017355753"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 text-[#4ADE80] hover:text-[#25D366] transition-colors"
                >
                  <span className="text-gray-400 font-sans">PK:</span>
                  <span dir="ltr" className="font-bold">+92 301 7355753</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
