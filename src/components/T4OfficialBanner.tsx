import React, { useState } from 'react';
import {
  Plane,
  Phone,
  Mail,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Award,
  Maximize2,
  X,
  FileCheck2,
  Building2,
  Stethoscope,
  Users,
  Briefcase
} from 'lucide-react';

interface T4OfficialBannerProps {
  variant?: 'header' | 'footer' | 'standalone';
  onSelectService?: (serviceName: string) => void;
  onOpenInquiry?: (subject: string) => void;
}

export const T4OfficialBanner: React.FC<T4OfficialBannerProps> = ({
  variant = 'standalone',
  onSelectService,
  onOpenInquiry
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('/Gemini_Generated_Image_50d23e50d23e50d2.jpg');

  const services = [
    { name: 'Airline Tickets', urdu: 'فضائی ٹکٹیں', icon: Plane, color: '#D62828' },
    { name: 'Visit Visas', urdu: 'سیاحتی ویزا', icon: FileCheck2, color: '#0A2458' },
    { name: 'Umrah Packages', urdu: 'عمرہ پیکجز', icon: Building2, color: '#C29427' },
    { name: 'Travel Insurance', urdu: 'ٹریول انشورنس', icon: ShieldCheck, color: '#16A34A' },
    { name: 'Work Visas', urdu: 'ورک ویزا', icon: Briefcase, color: '#0891B2' },
    { name: 'GCC Medical Appointment', urdu: 'جی سی سی میڈیکل', icon: Stethoscope, color: '#DC2626' },
    { name: 'Group Tickets', urdu: 'گروپ بکنگ', icon: Users, color: '#7C3AED' },
  ];

  const airlinePartners = [
    { name: 'PIA', color: 'text-emerald-800' },
    { name: 'Saudia', color: 'text-sky-950' },
    { name: 'AirSial', color: 'text-emerald-700' },
    { name: 'Air Arabia', color: 'text-rose-600' },
    { name: 'Qatar Airways', color: 'text-amber-950' },
    { name: 'Fly Jinnah', color: 'text-rose-600' },
    { name: 'Emirates', color: 'text-red-700' },
    { name: 'flyadeal', color: 'text-purple-800' },
    { name: 'airblue', color: 'text-blue-700' },
    { name: 'flydubai', color: 'text-orange-600' },
    { name: 'flynas', color: 'text-teal-700' },
    { name: 'SereneAir', color: 'text-cyan-800' },
  ];

  // Header compact adjustment view
  if (variant === 'header') {
    return (
      <div className="w-full bg-gradient-to-r from-[#051433] via-[#0A2458] to-[#051433] text-white border-b border-[#C29427]/40 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Slogan in Urdu & English */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-[#C29427]/20 border border-[#C29427]/50 text-[#F5D061] text-[10px] font-bold uppercase tracking-wider">
              IATA Verified
            </span>
            <span className="font-semibold text-white/90 hidden sm:inline text-xs">
              T4 TICKETS &amp; TRAVEL SERVICES:
            </span>
            <span className="text-[#F5D061] font-bold text-xs font-serif tracking-wide">
              سستی ترین ٹکٹ ، بہترین سروس ، ہر سفر بے فکر
            </span>
          </div>

          {/* Quick Direct WhatsApp & Manager Hotline */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="hidden md:flex items-center gap-1.5 text-gray-300">
              <span className="text-[11px] text-gray-400">Chief Executive:</span>
              <span className="text-white font-medium text-xs">محمد عامر عزیز</span>
            </div>

            {/* WhatsApp KSA */}
            <a
              href="https://wa.me/966502674930?text=Hello%20Muhammad%20Aamir%20Aziz%20(T4%20Tickets)%2C%20I%20want%20to%20book%20a%20ticket%20or%20visa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-[#4ADE80] font-mono text-[11px] font-bold transition-colors"
              title="WhatsApp Saudi Arabia (+966 50 267 4930)"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span dir="ltr">+966 50 267 4930</span>
            </a>

            {/* WhatsApp PK */}
            <a
              href="https://wa.me/923017355753?text=Hello%20T4%20Tickets%2C%20I%20want%20to%20inquire%20about%20flights"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-[11px] transition-colors"
              title="WhatsApp Pakistan (+92 301 7355753)"
            >
              <Phone className="w-3 h-3 text-[#F5D061]" />
              <span dir="ltr">+92 301 7355753</span>
            </a>

            {/* Button to view official full banner */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#C29427] hover:bg-[#D4A338] text-[#051433] text-[11px] font-extrabold shadow-sm transition-all hover:scale-105"
            >
              <Sparkles className="w-3 h-3" />
              <span>Official Banner</span>
            </button>
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full bg-[#051433] rounded-2xl border-2 border-[#C29427] shadow-2xl p-4 sm:p-6 overflow-hidden">
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#F5D061]">
                  Official Certified Identity
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                  T4 TICKETS AND TRAVELS SERVICES
                </h3>
                <p className="text-sm text-gray-300 font-serif">
                  سستی ترین ٹکٹ ، بہترین سروس ، ہر سفر بے فکر • محمد عامر عزیز
                </p>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#C29427]/40 shadow-2xl bg-black">
                <img
                  src={imgSrc}
                  onError={() => setImgSrc('/t4_official_banner.svg')}
                  alt="T4 Tickets & Travel Services Official Banner"
                  className="w-full h-auto object-contain max-h-[65vh] mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Fast action links inside lightbox */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-300">
                  <Award className="w-4 h-4 text-[#F5D061]" />
                  <span>IATA Accredited &amp; Saudi Tourism Registered</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/966502674930?text=Hello%20Muhammad%20Aamir%20Aziz%2C%20I%20saw%20your%20official%20banner%20and%20want%20to%20book"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold transition-colors"
                  >
                    <span>Book via WhatsApp</span>{' '}
                    <span dir="ltr" style={{ direction: 'ltr', unicodeBidi: 'isolate' }} className="font-mono font-bold inline-block">
                      {'\u200E'}(+966 50 267 4930){'\u200E'}
                    </span>
                  </a>
                  <a
                    href="mailto:T4tickets@gmail.com"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#F5D061]" />
                    <span>T4tickets@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Full Rich Banner for Footer or Standalone Sections
  return (
    <div className="w-full my-8">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#051433] via-[#0A2458] to-[#040E26] border-2 border-[#C29427]/50 shadow-2xl">
        {/* Top Gold Ribbon Accent */}
        <div className="h-2 w-full bg-gradient-to-r from-[#B8860B] via-[#F7D070] to-[#B8860B]" />

        {/* Banner Graphic Showcase */}
        <div className="relative group overflow-hidden bg-black/40">
          <img
            src={imgSrc}
            onError={() => setImgSrc('/t4_official_banner.svg')}
            alt="T4 Tickets & Travel Services Official Master Banner"
            className="w-full h-auto object-cover max-h-[440px] sm:max-h-[500px] transition-transform duration-500 group-hover:scale-[1.01]"
            referrerPolicy="no-referrer"
          />

          {/* Top-Right Expand Button */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20 transition-all shadow-lg"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#F5D061]" />
            <span>Enlarge Banner</span>
          </button>
        </div>

        {/* Gallery of Services Strip (from the Banner) */}
        <div className="p-6 sm:p-8 bg-[#051433]/90 backdrop-blur-md border-t border-[#C29427]/30">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C29427]/20 border border-[#C29427]/50 text-[#F5D061] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gallery of Services</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
              Comprehensive Travel &amp; Ticketing Solutions
            </h3>
            <p className="text-sm text-gray-300 max-w-xl mx-auto mt-1">
              Select any service below to instantly check rates, requirements, and book through our certified travel desk.
            </p>
          </div>

          {/* 7 Services Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <button
                  key={srv.name}
                  onClick={() => {
                    if (onSelectService) onSelectService(srv.name);
                    if (onOpenInquiry) onOpenInquiry(`Inquiry: ${srv.name}`);
                  }}
                  className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-white/5 hover:bg-[#C29427]/20 border border-[#C29427]/30 hover:border-[#F5D061] transition-all duration-200 group text-center hover:scale-105"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 shadow-md transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${srv.color}25`, border: `1px solid ${srv.color}60` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: srv.color === '#0A2458' ? '#60A5FA' : srv.color }} />
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-[#F5D061] transition-colors leading-tight">
                    {srv.name}
                  </span>
                  <span className="text-[10px] text-[#F5D061] font-serif mt-0.5">
                    {srv.urdu}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Airline Partners Strip */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-center mb-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F5D061]">
                Our Global Airline Partners
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {airlinePartners.map((airline) => (
                <div
                  key={airline.name}
                  className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-gray-900 font-extrabold text-xs tracking-tight shadow-sm border border-[#C29427]/40 flex items-center gap-1.5 transition-transform hover:scale-105"
                >
                  <Plane className="w-3 h-3 text-[#D62828]" />
                  <span>{airline.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Direct CTA Bar */}
          <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-[#071F4A] via-[#0D3070] to-[#071F4A] border border-[#C29427]/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-[#C29427]/20 border border-[#F5D061] flex items-center justify-center shrink-0">
                <span className="text-lg font-black text-[#F5D061]">T4</span>
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2 justify-center md:justify-start">
                  <span>Contact Manager: Muhammad Aamir Aziz</span>
                  <span className="text-xs text-[#F5D061] font-serif">(محمد عامر عزیز)</span>
                </div>
                <div className="text-xs text-gray-300">
                  Email: <span className="font-mono text-white">T4tickets@gmail.com</span> • Branches: Bariq, Al Majardah, Muhayil Asir, Abha
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/966502674930?text=Hello%20Muhammad%20Aamir%20Aziz%2C%20I%20want%20to%20book%20via%20WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#25D366]/30 transition-all hover:scale-105"
              >
                <span>BOOK NOW VIA WHATSAPP (KSA)</span>
              </a>

              <a
                href="https://wa.me/923017355753?text=Hello%20T4%20Tickets%2C%20I%20want%20to%20inquire%20about%20flights"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all"
              >
                <span>WhatsApp PK: <span dir="ltr" className="font-mono inline-block">+92 301 7355753</span></span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Tagline Strip */}
        <div className="py-2.5 bg-[#030B1A] text-center border-t border-[#C29427]/30 text-xs text-[#F5D061] font-bold tracking-wider flex items-center justify-center gap-4 flex-wrap">
          <span>🛡️ TRUSTED TRAVEL PARTNER</span>
          <span>•</span>
          <span>🌐 WORLDWIDE DESTINATIONS</span>
          <span>•</span>
          <span>🕒 24/7 CUSTOMER SUPPORT</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full bg-[#051433] rounded-2xl border-2 border-[#C29427] shadow-2xl p-4 sm:p-6 overflow-hidden">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F5D061]">
                Official Verified Business Master Artwork
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                T4 TICKETS AND TRAVELS SERVICES
              </h3>
              <p className="text-sm text-gray-300 font-serif">
                سستی ترین ٹکٹ ، بہترین سروس ، ہر سفر بے فکر • محمد عامر عزیز
              </p>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#C29427]/40 shadow-2xl bg-black">
              <img
                src={imgSrc}
                onError={() => setImgSrc('/t4_official_banner.svg')}
                alt="T4 Tickets Full Master Banner"
                className="w-full h-auto object-contain max-h-[70vh] mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-gray-300 flex items-center gap-1.5 flex-wrap">
                <span>Contact:</span>
                <span dir="ltr" className="text-[#F5D061] font-mono font-bold inline-block">+966 50 267 4930</span>
                <span>/</span>
                <span dir="ltr" className="text-[#F5D061] font-mono font-bold inline-block">+92 301 7355753</span>
              </div>
              <a
                href="https://wa.me/966502674930?text=Hello%20Muhammad%20Aamir%20Aziz%2C%20I%20want%20to%20book%20tickets%20or%20Umrah%20package"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold transition-all"
              >
                Open WhatsApp Direct Chat
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
