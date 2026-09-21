import React, { useState } from 'react';
import { Maximize2, Download, Share2, Check, MessageSquare, Phone, Mail, X } from 'lucide-react';

export const VisitingCardBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const ksaWhatsApp = '966502674930';
  const pkWhatsApp = '923017355753';
  const email = 'T4tickets@gmail.com';

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('+966 50 267 4930');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Muhammad Aamir Aziz - T4 Tickets & Travel Services',
          text: 'Official Visiting Card & Contacts of T4 Tickets and Travels Services (Muhammad Aamir Aziz)',
          url: window.location.href,
        });
      } catch {
        // Share cancelled or unavailable
      }
    } else {
      handleCopyNumber();
    }
  };

  return (
    <>
      {/* FULL GRAPHICS VISITING CARD SECTION - Directly Under Header */}
      <section id="visiting-card" className="w-full bg-[#051433] py-4 sm:py-6 px-3 sm:px-6 border-b border-[#D4AF37]/30">
        <div className="max-w-6xl mx-auto">
          {/* Card Container with Gold Framing */}
          <div className="relative bg-[#07193C] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 border-[#D4AF37]/80 group">
            {/* Full Graphics SVG Visiting Card */}
            <div className="relative w-full aspect-[1600/680] max-h-[580px] bg-[#07193C] select-none">
              <img
                src="/t4_official_banner.svg"
                alt="Muhammad Aamir Aziz - T4 Tickets & Travels Services Official Visiting Card"
                className="w-full h-full object-contain block pointer-events-none"
                loading="eager"
              />

              {/* Interactive Clickable Hotspots overlay matching the Visiting Card visual elements */}
              <div className="absolute inset-0 z-10 pointer-events-auto">
                {/* 1. WhatsApp KSA Pill (left side ~3.1% to 20.6% width, ~45% to 52% height) */}
                <a
                  href={`https://wa.me/${ksaWhatsApp}?text=${encodeURIComponent(
                    'Assalam u Alaikum Muhammad Aamir Aziz, I am contacting you directly from your T4 Tickets visiting card.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Chat on WhatsApp KSA (+966 50 267 4930)"
                  className="absolute left-[3.1%] top-[45.5%] w-[17.5%] h-[6.5%] rounded-full cursor-pointer hover:ring-2 hover:ring-[#25D366] hover:bg-[#25D366]/15 transition-all"
                />

                {/* 2. WhatsApp PK Pill (left side ~3.1% to 20.6% width, ~54.4% to 60.5% height) */}
                <a
                  href={`https://wa.me/${pkWhatsApp}?text=${encodeURIComponent(
                    'Assalam u Alaikum Muhammad Aamir Aziz, I am contacting you directly from your T4 Tickets visiting card.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Chat on WhatsApp PK (+92 301 7355753)"
                  className="absolute left-[3.1%] top-[54.4%] w-[17.5%] h-[6.5%] rounded-full cursor-pointer hover:ring-2 hover:ring-[#25D366] hover:bg-[#25D366]/15 transition-all"
                />

                {/* 3. Email Pill (left side ~3.1% to 20.6% width, ~63.2% to 69.4% height) */}
                <a
                  href={`mailto:${email}?subject=${encodeURIComponent(
                    'Inquiry via T4 Tickets Visiting Card - Muhammad Aamir Aziz'
                  )}`}
                  title="Send Email to T4tickets@gmail.com"
                  className="absolute left-[3.1%] top-[63.2%] w-[17.5%] h-[6.5%] rounded-full cursor-pointer hover:ring-2 hover:ring-[#D4AF37] hover:bg-[#D4AF37]/15 transition-all"
                />

                {/* 4. Book Now Via WhatsApp Badge (right side ~72.5% to 92.5% width, ~62.5% to 75% height) */}
                <a
                  href={`https://wa.me/${ksaWhatsApp}?text=${encodeURIComponent(
                    'Assalam u Alaikum Muhammad Aamir Aziz, I want to BOOK NOW with T4 Tickets & Travel Services.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Book Now via WhatsApp"
                  className="absolute left-[72.5%] top-[62.5%] w-[19%] h-[12.5%] rounded-2xl cursor-pointer hover:ring-2 hover:ring-[#25D366] hover:bg-[#25D366]/15 transition-all"
                />
              </div>

              {/* Floating Quick Tool Controls */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-[#051433]/85 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-[#D4AF37]/40 shadow-lg text-white">
                <button
                  onClick={() => setIsZoomed(true)}
                  title="Full View / Zoom Card"
                  className="p-1.5 hover:bg-white/15 rounded-lg transition-colors text-[#F7D070]"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <a
                  href="/actual_visiting_card.jpg"
                  download="Muhammad_Aamir_Aziz_T4_Tickets_Visiting_Card.jpg"
                  title="Download High-Res JPG"
                  className="p-1.5 hover:bg-white/15 rounded-lg transition-colors text-white"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  onClick={handleShare}
                  title="Share Visiting Card"
                  className="p-1.5 hover:bg-white/15 rounded-lg transition-colors text-white"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Contact & Information Strip */}
            <div className="bg-[#051433] px-4 py-3 border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                <span className="font-extrabold text-[#F7D070] text-sm">محمد عامر عزیز</span>
                <span className="text-gray-400">|</span>
                <span className="font-bold text-gray-200">Muhammad Aamir Aziz</span>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <span className="text-gray-300 hidden sm:inline">Chief Executive • T4 Tickets &amp; Travels</span>
              </div>

              <div className="flex items-center flex-wrap gap-2">
                <a
                  href={`https://wa.me/${ksaWhatsApp}?text=${encodeURIComponent(
                    'Assalam u Alaikum Muhammad Aamir Aziz (T4 Tickets), I would like to book tickets / visas.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold flex items-center gap-1.5 shadow-md transition-all text-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp KSA</span>{' '}
                  <span dir="ltr" style={{ direction: 'ltr', unicodeBidi: 'isolate' }} className="font-mono inline-block font-bold">
                    {'\u200E'}(+966 50 267 4930){'\u200E'}
                  </span>
                </a>

                <a
                  href={`https://wa.me/${pkWhatsApp}?text=${encodeURIComponent(
                    'Assalam u Alaikum Muhammad Aamir Aziz (T4 Tickets), I would like to book tickets / visas.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F7D070] font-bold flex items-center gap-1.5 border border-[#D4AF37]/40 transition-all text-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp PK</span>{' '}
                  <span dir="ltr" style={{ direction: 'ltr', unicodeBidi: 'isolate' }} className="font-mono inline-block font-bold">
                    {'\u200E'}(+92 301 7355753){'\u200E'}
                  </span>
                </a>

                <button
                  onClick={handleCopyNumber}
                  className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white font-semibold flex items-center gap-1 border border-white/10 transition-colors text-xs"
                  title="Copy Primary Phone Number (+966 50 267 4930)"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#25D366]" /> : null}
                  <span>{copied ? 'Copied!' : 'Copy KSA (+966)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox / High Resolution Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-6xl w-full bg-[#07193C] rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-700 px-2 text-white">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#F7D070]">T4 TICKETS &amp; TRAVELS SERVICES</span>
                <span className="text-xs text-gray-400">• Official Visiting Card</span>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <img
              src="/t4_official_banner.svg"
              alt="T4 Tickets Full Visiting Card"
              className="w-full h-auto object-contain max-h-[80vh] mx-auto rounded-xl select-none"
            />

            <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-300 px-2">
              <div>
                Chief Executive: <strong className="text-white">Muhammad Aamir Aziz (محمد عامر عزیز)</strong>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/actual_visiting_card.jpg"
                  download="Muhammad_Aamir_Aziz_T4_Tickets_Visiting_Card.jpg"
                  className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#e5ba54] text-[#071A3D] font-extrabold flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download High-Res JPG</span>
                </a>
                <a
                  href={`https://wa.me/${ksaWhatsApp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold flex items-center gap-1.5 shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Direct WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
