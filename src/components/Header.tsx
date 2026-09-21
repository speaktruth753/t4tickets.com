import React, { useState, useEffect, useRef } from 'react';
import {
  Plane,
  Globe,
  Phone,
  Menu,
  X,
  ChevronDown,
  User,
  ShieldCheck,
  Building2,
  Palmtree,
  FileCheck2,
  MoonStar,
  Sparkles,
  HelpCircle,
  Briefcase,
  Bot
} from 'lucide-react';
import { CurrencyCode, LanguageCode } from '../types';
import { CURRENCIES } from '../data/travelData';
import { T4OfficialBanner } from './T4OfficialBanner';
import { T4Logo, LogoColorTheme } from './T4Logo';

interface HeaderProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  brandColor?: LogoColorTheme;
  onBrandColorChange?: (color: LogoColorTheme) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onNavigate: (sectionId: string) => void;
  onOpenInquiry: (subject: string) => void;
  onOpenAIAssistant?: () => void;
  onOpenAIPlanner?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onCurrencyChange,
  currentLanguage,
  onLanguageChange,
  brandColor = 'red',
  onBrandColorChange,
  onOpenAuth,
  onNavigate,
  onOpenInquiry,
  onOpenAIAssistant,
  onOpenAIPlanner
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const currencyRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (currencyRef.current && !currencyRef.current.contains(target)) {
        setCurrencyDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'hero-section', label: 'Flights', icon: Plane },
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
            ? 'bg-[#071A3D]/95 backdrop-blur-md shadow-md shadow-black/20 border-b border-white/10'
            : 'bg-[#071A3D] border-b border-white/10'
        }`}
      >
        {/* Simple & Fast Top Utility Strip */}
        <div className="w-full bg-[#051329] border-b border-white/10 text-white/90 text-xs py-1 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-2 truncate">
              <span className="px-1.5 py-0.2 rounded bg-[#E53935] text-white font-bold text-[10px] tracking-wide">
                IATA CERTIFIED
              </span>
              <span className="text-gray-300 hidden sm:inline">T4 TICKETS &amp; TRAVEL SERVICES</span>
              <span className="text-[#F5D061] font-serif font-bold">سستی ترین ٹکٹ ، بہترین سروس</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-gray-400 hidden md:inline">Chief Executive: <strong className="text-white font-medium">محمد عامر عزیز</strong></span>
              <a
                href="https://wa.me/966502674930?text=Assalam%20u%20Alaikum%20Muhammad%20Aamir%20Aziz%2C%20I%20want%20to%20book%20a%20ticket%20or%20visa"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#4ADE80] font-mono font-bold hover:underline"
              >
                <Phone className="w-3 h-3" />
                <span>+966 50 267 4930</span>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5">
          <div className="flex items-center justify-between">
            {/* Left: Brand Identity with Designated T4TICKETS Company Logo Placeholder */}
            <div
              id="brand-logo"
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
              onClick={() => onNavigate('hero-section')}
            >
              {/* Designated Logo Placeholder Area */}
              <div
                id="header-t4tickets-logo-container"
                className="flex items-center justify-center shrink-0"
                title="T4 TICKETS Official Company Logo"
              >
                <T4Logo
                  id="header-t4tickets-logo"
                  size="responsive"
                  colorTheme={brandColor}
                  alt="T4 TICKETS AND TRAVEL SERVICES Official Logo"
                  showStatusIndicator={true}
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-black tracking-tight text-white font-heading leading-tight">
                    T4 <span className="text-[#E53935]">TICKETS</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-gray-300 font-semibold tracking-wide">
                    TRAVEL SERVICES
                  </span>
                  <span className="text-[10px] font-serif hidden sm:inline text-[#FF8080]">
                    • محمد عامر عزیز
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => onNavigate(item.id)}
                    className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-colors group whitespace-nowrap"
                  >
                    <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#F5D061] transition-colors" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#E53935] text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* AI Trip Planner Nav Link */}
              {onOpenAIPlanner && (
                <button
                  onClick={onOpenAIPlanner}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#F5D061] bg-[#C29427]/15 hover:bg-[#C29427]/25 border border-[#C29427]/40 transition-all hover:scale-105 whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Planner</span>
                </button>
              )}
            </nav>

            {/* Right: Selectors, AI Trigger & Auth */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* AI Assistant Button */}
              {onOpenAIAssistant && (
                <button
                  onClick={onOpenAIAssistant}
                  className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-bold transition-all"
                  title="Ask T4 Travel AI Assistant"
                >
                  <Bot className="w-3.5 h-3.5 text-[#F5D061]" />
                  <span className="hidden sm:inline">AI Advisor</span>
                </button>
              )}

              {/* Currency Selector */}
              <div ref={currencyRef} className="relative">
                <button
                  id="currency-selector-btn"
                  onClick={() => {
                    setCurrencyDropdownOpen(!currencyDropdownOpen);
                    setLangDropdownOpen(false);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs sm:text-sm font-semibold text-white border border-white/15 transition-colors"
                >
                  <span>{currentCurrency}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
                </button>

                {currencyDropdownOpen && (
                  <div
                    id="currency-dropdown"
                    className="absolute right-0 mt-2 w-44 rounded-xl bg-[#071A3D] border border-white/15 shadow-2xl p-1 z-50 backdrop-blur-xl"
                  >
                    {(Object.keys(CURRENCIES) as CurrencyCode[]).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          onCurrencyChange(curr);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                          currentCurrency === curr
                            ? 'bg-[#C29427] text-[#051433] font-bold'
                            : 'text-gray-200 hover:bg-white/10'
                        }`}
                      >
                        <span className="font-semibold">{curr}</span>
                        <span className="text-[11px] opacity-80">{CURRENCIES[curr].name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Language Selector */}
              <div ref={langRef} className="relative hidden sm:block">
                <button
                  id="language-selector-btn"
                  onClick={() => {
                    setLangDropdownOpen(!langDropdownOpen);
                    setCurrencyDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs sm:text-sm font-medium text-white border border-white/15 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-gray-300" />
                  <span>{currentLanguage === 'EN' ? 'English' : 'العربية'}</span>
                  <ChevronDown className="w-3 h-3 text-gray-300" />
                </button>

                {langDropdownOpen && (
                  <div
                    id="lang-dropdown"
                    className="absolute right-0 mt-2 w-32 rounded-xl bg-[#071A3D] border border-white/15 shadow-2xl p-1 z-50 backdrop-blur-xl"
                  >
                    <button
                      onClick={() => {
                        onLanguageChange('EN');
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        currentLanguage === 'EN' ? 'bg-[#C29427] text-[#051433] font-bold' : 'text-gray-200 hover:bg-white/10'
                      }`}
                    >
                      <span>English</span>
                      <span className="text-[10px]">EN</span>
                    </button>
                    <button
                      onClick={() => {
                        onLanguageChange('AR');
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        currentLanguage === 'AR' ? 'bg-[#C29427] text-[#051433] font-bold' : 'text-gray-200 hover:bg-white/10'
                      }`}
                    >
                      <span>العربية</span>
                      <span className="text-[10px]">AR</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Auth Buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  id="header-login-btn"
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Sign In
                </button>
                <button
                  id="header-register-btn"
                  onClick={() => onOpenAuth('register')}
                  className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#D62828] to-[#E53935] hover:brightness-110 shadow-md shadow-[#D62828]/25 transition-all"
                >
                  Register
                </button>
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay & Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#071A3D] text-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div
                  id="mobile-drawer-brand"
                  className="flex items-center gap-2.5 cursor-pointer"
                  onClick={() => {
                    onNavigate('hero-section');
                    setMobileMenuOpen(false);
                  }}
                >
                  <div
                    id="mobile-drawer-t4tickets-logo-container"
                    className="flex items-center justify-center shrink-0"
                  >
                    <T4Logo
                      id="mobile-drawer-t4tickets-logo"
                      size="sm"
                      colorTheme={brandColor}
                      alt="T4 TICKETS Company Logo"
                      showStatusIndicator={false}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-black font-heading tracking-tight leading-tight">
                      T4 <span className={brandColor === 'gold' ? 'text-[#F5D061]' : brandColor === 'royal' ? 'text-[#60A5FA]' : 'text-[#E53935]'}>TICKETS</span>
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

              {/* Mobile Color Theme Switcher */}
              {onBrandColorChange && (
                <div className="mt-3 p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-300">Accent Color:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onBrandColorChange('red')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 ${
                        brandColor === 'red' ? 'bg-[#E53935] text-white shadow' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white inline-block" />
                      Red
                    </button>
                    <button
                      onClick={() => onBrandColorChange('gold')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 ${
                        brandColor === 'gold' ? 'bg-[#C29427] text-white shadow' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white inline-block" />
                      Gold
                    </button>
                    <button
                      onClick={() => onBrandColorChange('royal')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 ${
                        brandColor === 'royal' ? 'bg-[#2563EB] text-white shadow' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white inline-block" />
                      Blue
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile Quick Contacts */}
              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  <a href="tel:+966502674930" className="text-xs font-semibold text-white hover:text-green-400">
                    +966 50 267 4930
                  </a>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                  24/7 Live
                </span>
              </div>

              {/* Navigation Items */}
              <div className="mt-6 flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        onNavigate(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/10 text-sm font-medium text-gray-200 hover:text-white transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-[#E53935]" />
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

            {/* Mobile Footer Area with Auth */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl border border-white/20 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D62828] to-[#E53935] text-sm font-bold text-white shadow-md"
                >
                  Register
                </button>
              </div>

              <div className="text-center">
                <p className="text-[11px] text-gray-400">
                  Branches: Bariq • Al Majardah • Muhayil Asir • Abha
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
