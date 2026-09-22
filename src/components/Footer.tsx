import React from 'react';
import {
  Plane,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  CreditCard,
  ExternalLink,
  ChevronRight,
  Heart,
  Sparkles,
  Bot
} from 'lucide-react';
import { T4OfficialBanner } from './T4OfficialBanner';
import { T4Logo, LogoColorTheme } from './T4Logo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenInquiry: (subject: string) => void;
  onOpenAssistant?: () => void;
  brandColor?: LogoColorTheme;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenInquiry,
  onOpenAssistant,
  brandColor = 'red'
}) => {
  const { t, language } = useLanguage();
  const fontClass = language === 'UR' ? 'font-nastaliq' : language === 'AR' ? 'font-arabic' : 'font-sans';
  const topBorderClass = brandColor === 'gold'
    ? 'border-[#C29427]/40'
    : brandColor === 'royal'
    ? 'border-blue-500/40'
    : 'border-[#E53935]/40';

  return (
    <footer id="main-footer" className={`bg-[#051433] text-white pt-10 pb-12 border-t-2 ${topBorderClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand & 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col (Spans 2 on lg) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Designated Company Logo & Branding Header */}
            <div
              id="footer-brand-header"
              className="flex items-center gap-3 sm:gap-4 select-none"
            >
              {/* Designated Logo Placeholder Area */}
              <div
                id="footer-t4tickets-logo-container"
                className="flex items-center justify-center shrink-0"
                title="T4 TICKETS Official Registered Logo"
              >
                <T4Logo
                  id="footer-t4tickets-logo"
                  size="lg"
                  colorTheme={brandColor}
                  alt="T4 TICKETS AND TRAVEL SERVICES Official Logo"
                  showStatusIndicator={true}
                  className="hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white leading-tight">
                  T4{' '}
                  <span
                    className={
                      brandColor === 'gold'
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#FFE082] via-[#F5D061] to-[#DFB15B]'
                        : brandColor === 'royal'
                        ? 'text-[#60A5FA]'
                        : brandColor === 'emerald'
                        ? 'text-[#4ADE80]'
                        : 'text-[#E53935]'
                    }
                  >
                    TICKETS
                  </span>
                </span>
                <span className="text-[11px] text-gray-300 font-semibold tracking-wide uppercase">
                  AND TRAVELS SERVICES
                </span>
                <span
                  className={`text-xs font-serif mt-0.5 ${
                    brandColor === 'gold'
                      ? 'text-[#F5D061]'
                      : brandColor === 'royal'
                      ? 'text-blue-300'
                      : brandColor === 'emerald'
                      ? 'text-[#86EFAC]'
                      : 'text-[#FF8080]'
                  }`}
                >
                  محمد عامر عزیز • سستی ترین ٹکٹ ، بہترین سروس
                </span>
              </div>
            </div>

            <p className={`text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm ${fontClass}`}>
              {t.footerDesc}
            </p>

            {/* Designated Logo Specification & Brand Badge */}
            <div
              id="t4tickets-logo-spec-placeholder"
              className={`p-3 rounded-xl bg-white/5 border ${
                brandColor === 'gold'
                  ? 'border-[#C29427]/30'
                  : brandColor === 'royal'
                  ? 'border-blue-500/30'
                  : brandColor === 'emerald'
                  ? 'border-emerald-500/30'
                  : 'border-[#E53935]/30'
              } flex items-center justify-between gap-3 text-xs max-w-sm`}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse shrink-0" />
                <div className="text-[11px] text-gray-300">
                  <span className="font-bold text-white block">Official 3D Company Emblem</span>
                  <span className="text-[10px] text-gray-400">T4 TICKETS • 3D Rendered Luxury Edition</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded ${
                brandColor === 'gold'
                  ? 'bg-[#C29427]/20 text-[#F5D061] border border-[#C29427]/40'
                  : brandColor === 'royal'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : brandColor === 'emerald'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-[#E53935]/20 text-[#FF6B6B] border border-[#E53935]/40'
              } text-[10px] font-bold shrink-0`}>
                3D Gold Edition
              </span>
            </div>

            {/* Travel Assistant Button */}
            {onOpenAssistant && (
              <button
                onClick={() => onOpenAssistant()}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-medium transition-colors"
              >
                <Bot className="w-3.5 h-3.5 text-[#F5D061]" />
                <span>Travel Assistant</span>
              </button>
            )}

            {/* License & Accreditation Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-[#C29427]/30 text-xs text-gray-300">
                <Award className="w-4 h-4 text-[#F5D061]" />
                <span className="font-bold text-white">IATA Accredited Agency</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-[#C29427]/30 text-xs text-gray-300">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                <span className="font-bold text-white">Saudi Tourism Registered</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className={`text-sm font-extrabold uppercase tracking-wider font-heading text-[#F5D061] ${fontClass}`}>
              {language === 'UR' ? 'اہم لنکس' : language === 'AR' ? 'روابط سريعة' : 'Quick Navigation'}
            </h4>
            <ul className={`space-y-2 text-xs text-gray-300 ${fontClass}`}>
              <li>
                <button
                  onClick={() => onNavigate('hero-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'UR' ? 'فلائٹ بکنگ سرچ' : language === 'AR' ? 'محرك حجز الطيران' : 'Flight Booking Engine'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('umrah-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'UR' ? 'وی آئی پی عمرہ پیکجز' : language === 'AR' ? 'باقات العمرة VIP' : 'VIP Umrah Packages'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'UR' ? 'ویزا و وافد میڈیکل ڈیسک' : language === 'AR' ? 'قسم التأشيرات وفحص وافد' : 'Visa & GCC Medical Desk'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('deals-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'UR' ? 'رعایتی پروازیں' : language === 'AR' ? 'عروض الطيران المميزة' : 'Special Flight Deals'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('why-us-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'UR' ? 'ہمیں کیوں منتخب کریں' : language === 'AR' ? 'لماذا تختار تي فور' : 'Why Book With T4 Tickets'}
                </button>
              </li>
            </ul>
          </div>

          {/* Services from Banner */}
          <div className="space-y-3">
            <h4 className={`text-sm font-extrabold uppercase tracking-wider font-heading text-[#F5D061] ${fontClass}`}>
              {language === 'UR' ? 'ہماری خدمات' : language === 'AR' ? 'خدماتنا المعتمدة' : 'Services Offered'}
            </h4>
            <ul className={`space-y-2 text-xs text-gray-300 ${fontClass}`}>
              <li>
                <button
                  onClick={() => onOpenInquiry('Airline Tickets (Domestic & International)')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ✈️ {language === 'UR' ? 'تمام ایئر لائنز کی ٹکٹنگ' : language === 'AR' ? 'تذاكر طيران لجميع الوجهات' : 'Airline Tickets (12+ Carriers)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInquiry('Visit Visas Inquiry')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  🛂 {language === 'UR' ? 'سعودی وزٹ و سیاحتی ویزا' : language === 'AR' ? 'تأشيرات الزيارة والسياحة' : 'Visit Visas (Saudi, UAE, UK)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInquiry('VIP Umrah Packages')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  🕋 {language === 'UR' ? 'وی آئی پی فائیو اسٹار عمرہ' : language === 'AR' ? 'عمرة VIP مكة والمدينة' : 'VIP Umrah (Makkah & Madinah)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInquiry('GCC Medical Appointment (Gamca/Wafid)')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  🩺 {language === 'UR' ? 'وافد گامکا میڈیکل اپائنٹمنٹ' : language === 'AR' ? 'حجز فحص وافد الطبي (جامكا)' : 'GCC Medical Appointment'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInquiry('Travel Insurance & Work Visas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  🛡️ {language === 'UR' ? 'ٹریول انشورنس و ورک ویزا' : language === 'AR' ? 'تأمين السفر وتأشيرات العمل' : 'Travel Insurance & Work Visas'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information & Branches from Banner */}
          <div className="space-y-3">
            <h4 className={`text-sm font-extrabold uppercase tracking-wider font-heading text-[#F5D061] ${fontClass}`}>
              {language === 'UR' ? 'براہ راست رابطہ اور دفاتر' : language === 'AR' ? 'التواصل المباشر والفروع' : 'Direct Contact & Desks'}
            </h4>
            <div className={`space-y-2.5 text-xs text-gray-300 ${fontClass}`}>
              <div className="text-xs font-bold text-white">
                {language === 'UR' ? 'منیجر: محمد عامر عزیز' : language === 'AR' ? 'المدير العام: محمد عامر عزيز' : 'Manager: Muhammad Aamir Aziz'}
                <span className={`block text-[#F5D061] text-sm ${language === 'UR' ? 'font-nastaliq' : 'font-arabic'}`}>محمد عامر عزیز</span>
              </div>

              {/* Saudi Arabia WhatsApp */}
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0 fill-current" />
                <a
                  href="https://wa.me/966502674930?text=Assalam%20u%20Alaikum%20Muhammad%20Aamir%20Aziz%2C%20I%20want%20to%20book%20travel%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-bold text-white hover:text-[#25D366] transition-colors flex items-center gap-1.5 flex-wrap"
                >
                  <span dir="ltr" className="inline-block">+966 50 267 4930</span>
                  <span className="text-gray-400 font-sans text-[11px]">(WhatsApp KSA)</span>
                </a>
              </div>

              {/* Pakistan WhatsApp */}
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0 fill-current" />
                <a
                  href="https://wa.me/923017355753?text=Assalam%20u%20Alaikum%20T4%20Tickets%2C%20I%20want%20to%20inquire%20about%20flights"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-bold text-white hover:text-[#25D366] transition-colors flex items-center gap-1.5 flex-wrap"
                >
                  <span dir="ltr" className="inline-block">+92 301 7355753</span>
                  <span className="text-gray-400 font-sans text-[11px]">(WhatsApp PK)</span>
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F5D061] shrink-0" />
                <a
                  href="mailto:T4tickets@gmail.com"
                  className="text-white hover:text-[#F5D061] transition-colors font-mono"
                >
                  T4tickets@gmail.com
                </a>
              </div>

              {/* Saudi Branches */}
              <div className="flex items-start gap-2 pt-1 border-t border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#F5D061] shrink-0 mt-0.5" />
                <div className="text-gray-300 leading-relaxed">
                  <div className="font-bold text-white mb-0.5">
                    {language === 'UR' ? 'سعودی عرب کی شاخیں:' : language === 'AR' ? 'فروع المملكة العربية السعودية:' : 'Saudi Arabia Branches:'}
                  </div>
                  <div className={`text-xs text-[#F5D061] ${language === 'UR' ? 'font-nastaliq' : 'font-arabic'}`}>
                    بارق • المجاردة • محايل عسير • أبها
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    (Bariq, Al Majardah, Muhayil Asir, Abha)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Payment Methods & Security */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10">
          {/* Payment Methods */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-400">
            <span className="font-bold text-[#F5D061] text-xs">Payment Desks:</span>
            {['MADA', 'VISA', 'MASTERCARD', 'APPLE PAY', 'BANK TRANSFER', 'STC PAY'].map((method) => (
              <span
                key={method}
                className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-extrabold text-white/90"
              >
                {method}
              </span>
            ))}
          </div>

          {/* Security Guarantee */}
          <div className="flex items-center gap-4 text-xs text-gray-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>PCI-DSS Secured Booking</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#F5D061]" />
              <span>100% Guaranteed Issuance</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Slogan */}
        <div className={`pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 ${fontClass}`}>
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-white">T4 TICKETS AND TRAVELS SERVICES</strong>. {t.footerRights}
          </div>
          <div className={`text-xs text-[#F5D061] font-bold ${fontClass}`}>
            {t.footerSlogan}
          </div>
        </div>
      </div>
    </footer>
  );
};
