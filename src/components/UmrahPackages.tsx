import React from 'react';
import {
  MoonStar,
  Star,
  Clock,
  Building,
  Check,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { CurrencyCode, UmrahPackage } from '../types';
import { UMRAH_PACKAGES } from '../data/travelData';
import { formatCurrency } from '../utils/formatters';

interface UmrahPackagesProps {
  currency: CurrencyCode;
  onBookUmrah: (pkg: UmrahPackage) => void;
}

export const UmrahPackages: React.FC<UmrahPackagesProps> = ({ currency, onBookUmrah }) => {
  return (
    <section id="umrah-section" className="py-20 bg-[#071A3D] text-white relative overflow-hidden">
      {/* Background Decorative Gold Accents and Subtle Geometric Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D62828]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <MoonStar className="w-3.5 h-3.5 text-amber-400" />
            <span>Blessed Spiritual Journeys</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
            VIP Umrah & Special Religious Packages
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-300">
            Sanctuary proximity guaranteed: 5-star properties overlooking the Holy Kaaba and Prophet’s Mosque, VIP chauffeured transfers, and dedicated Nusuk permit coordination.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {UMRAH_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-[#0D2C63]/80 backdrop-blur-md rounded-3xl border border-amber-400/30 hover:border-amber-400 shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
            >
              {/* Gold Top Accent Line */}
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500" />

              <div>
                {/* Image & Featured Badge */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2C63] via-black/40 to-transparent" />

                  {pkg.featuredBadge && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-[#071A3D] font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                      {pkg.featuredBadge}
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-amber-300">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pkg.duration}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(pkg.hotelRating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-white font-heading mb-3 group-hover:text-amber-300 transition-colors">
                    {pkg.title}
                  </h3>

                  {/* Hotels Distance Info */}
                  <div className="space-y-2.5 mb-5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
                    <div>
                      <span className="text-amber-300 font-bold block">Makkah ({pkg.nightsMakkah} Nights)</span>
                      <div className="text-gray-200 font-medium">{pkg.makkahHotel}</div>
                      <div className="text-[11px] text-gray-400">{pkg.makkahHotelDistance}</div>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-amber-300 font-bold block">Madinah ({pkg.nightsMadinah} Nights)</span>
                      <div className="text-gray-200 font-medium">{pkg.madinahHotel}</div>
                      <div className="text-[11px] text-gray-400">{pkg.madinahHotelDistance}</div>
                    </div>
                  </div>

                  {/* Inclusions Check List */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                      Package Inclusions:
                    </div>
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-200">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & CTA Button */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Starting From</span>
                    <span className="text-2xl font-black text-amber-400 font-heading">
                      {formatCurrency(pkg.priceUSD, currency)}
                    </span>
                    <span className="text-[11px] text-gray-300 block">per person / all-inclusive</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onBookUmrah(pkg)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-[#071A3D] font-black text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all"
                    >
                      <span>Reserve</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={`https://wa.me/966502674930?text=${encodeURIComponent(`Assalam u Alaikum Muhammad Aamir Aziz, I want to book the Umrah package: ${pkg.title} (${pkg.duration}) starting from ${pkg.priceUSD} USD.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      title="Instant WhatsApp Booking with Muhammad Aamir Aziz"
                      className="p-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-colors flex items-center justify-center shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
