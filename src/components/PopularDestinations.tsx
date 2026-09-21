import React from 'react';
import { Compass, ArrowRight, Sun, Thermometer, MapPin } from 'lucide-react';
import { CurrencyCode, PopularDestination } from '../types';
import { POPULAR_DESTINATIONS } from '../data/travelData';
import { formatCurrency } from '../utils/formatters';

interface PopularDestinationsProps {
  currency: CurrencyCode;
  onExploreDestination: (dest: PopularDestination) => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({
  currency,
  onExploreDestination
}) => {
  return (
    <section id="destinations-section" className="py-20 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071A3D]/5 text-[#071A3D] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#E53935]" />
            <span>Top Global Cities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071A3D] font-heading tracking-tight">
            Popular Worldwide Destinations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B7280]">
            Immerse yourself in cultural marvels, culinary capitals, and world-renowned architectural landmarks.
          </p>
        </div>

        {/* 6 Grid Cards with Hover Zoom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {POPULAR_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="group relative h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => onExploreDestination(dest)}
            >
              {/* Full Background Image with Zoom */}
              <img
                src={dest.image}
                alt={dest.city}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/95 via-[#071A3D]/40 to-transparent" />

              {/* Weather & Time Pill */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>{dest.temperature}</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
                  {dest.bestTimeToVisit}
                </span>
              </div>

              {/* Content Box at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#E53935]" />
                    {dest.country}
                  </span>
                  <span className="text-xs font-bold text-white bg-[#E53935] px-2 py-0.5 rounded">
                    From {formatCurrency(dest.startingPriceUSD, currency)}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white font-heading tracking-tight mb-2">
                  {dest.city} ({dest.airportCode})
                </h3>

                <p className="text-xs text-gray-200 line-clamp-2 mb-4 leading-relaxed">
                  {dest.description}
                </p>

                {/* Highlights Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {dest.highlights.slice(0, 3).map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/10 text-white/90 backdrop-blur-sm"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="w-full py-2.5 rounded-xl bg-white/15 hover:bg-white text-white hover:text-[#071A3D] text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-md"
                >
                  <span>Explore Flights to {dest.city}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
