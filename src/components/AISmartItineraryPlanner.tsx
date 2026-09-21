import React, { useState } from 'react';
import {
  Sparkles,
  Plane,
  Building2,
  Calendar,
  Users,
  DollarSign,
  Send,
  X,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  Loader2,
  HelpCircle,
  FileText
} from 'lucide-react';
import { CurrencyCode } from '../types';

interface AISmartItineraryPlannerProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency?: CurrencyCode;
}

export const AISmartItineraryPlanner: React.FC<AISmartItineraryPlannerProps> = ({
  isOpen,
  onClose,
  currentCurrency = 'SAR'
}) => {
  const [tripType, setTripType] = useState('VIP Umrah (Makkah & Madinah)');
  const [origin, setOrigin] = useState('Lahore (LHE)');
  const [destination, setDestination] = useState('Jeddah / Makkah & Madinah (JED)');
  const [durationDays, setDurationDays] = useState(14);
  const [travelers, setTravelers] = useState('2 Adults');
  const [budgetLevel, setBudgetLevel] = useState('5-Star VIP Luxury');
  const [specialNotes, setSpecialNotes] = useState('Swissotel or Clock Tower view in Makkah, 5-star near Prophet Mosque in Madinah, private GMC transport');
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setItinerary(null);

    try {
      const res = await fetch('/api/gemini/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripType,
          origin,
          destination,
          durationDays,
          travelers,
          budgetLevel,
          currency: currentCurrency,
          specialNotes
        })
      });

      const data = await res.json();
      if (data.itinerary && typeof data.itinerary === 'object') {
        setItinerary(data.itinerary);
      } else {
        setErrorMsg('Could not parse AI itinerary response. Please try again or WhatsApp our agents directly.');
      }
    } catch (err: any) {
      console.error('Failed to generate itinerary:', err);
      setErrorMsg('Failed to generate AI plan. Please reach out to Muhammad Aamir Aziz on WhatsApp: +966 50 267 4930.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppBooking = () => {
    if (!itinerary) return;
    const text = encodeURIComponent(
      `Hello Muhammad Aamir Aziz (T4 Tickets),\nI used your AI Trip Planner to create this itinerary:\n` +
      `📌 *${itinerary.title || tripType}*\n` +
      `✈️ Route: ${origin} ➔ ${destination}\n` +
      `📅 Duration: ${durationDays} Days | Travelers: ${travelers}\n` +
      `💰 Target Budget: ${budgetLevel} (${currentCurrency})\n` +
      `🏨 Special Preference: ${specialNotes}\n\n` +
      `Please verify availability and send me final booking invoice!`
    );
    window.open(`https://wa.me/966502674930?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#071A3D] rounded-2xl border-2 border-[#C29427]/70 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#051433] via-[#0A2458] to-[#051433] border-b border-[#C29427]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#B8860B] to-[#F7D070] flex items-center justify-center shadow-lg shadow-[#B8860B]/30">
              <Sparkles className="w-5 h-5 text-[#051433]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white font-heading">
                  AI Custom Trip &amp; Umrah Planner
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#C29427]/20 border border-[#C29427]/50 text-[10px] font-bold text-[#F5D061]">
                  Powered by Gemini
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Instant personalized travel itineraries with flights, hotels, and budget estimates
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Form */}
          <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Trip Type */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1">
                Travel Category
              </label>
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-[#C29427] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
              >
                <option value="VIP Umrah (Makkah & Madinah)" className="bg-[#071A3D]">🕋 VIP Umrah (Makkah &amp; Madinah)</option>
                <option value="Economy Umrah Package" className="bg-[#071A3D]">🕋 Economy Umrah Package</option>
                <option value="International Holiday / Vacation" className="bg-[#071A3D]">🏖️ International Vacation (Dubai / Turkey)</option>
                <option value="Work / Business Visit" className="bg-[#071A3D]">💼 Work / Business Visit (Saudi Arabia / GCC)</option>
                <option value="Family Group Tour" className="bg-[#071A3D]">👥 Family Group Tour</option>
              </select>
            </div>

            {/* Departure */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1">
                Departure City
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Lahore, Islamabad, Karachi, Riyadh"
                className="w-full bg-white/5 border border-white/15 focus:border-[#C29427] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Destination */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1">
                Destination City
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Jeddah / Makkah & Madinah"
                className="w-full bg-white/5 border border-white/15 focus:border-[#C29427] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1">
                Duration (Days): <span className="text-[#F5D061]">{durationDays} Days</span>
              </label>
              <input
                type="range"
                min="3"
                max="30"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full accent-[#C29427]"
              />
            </div>

            {/* Travelers */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1">
                Travelers
              </label>
              <input
                type="text"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                placeholder="e.g. 2 Adults, 2 Children"
                className="w-full bg-white/5 border border-white/15 focus:border-[#C29427] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Comfort Level */}
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1">
                Hotel &amp; Class Level
              </label>
              <select
                value={budgetLevel}
                onChange={(e) => setBudgetLevel(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-[#C29427] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
              >
                <option value="5-Star VIP Luxury (Clock Tower / Front Haram)" className="bg-[#071A3D]">5-Star VIP Luxury</option>
                <option value="4-Star Premium Comfort" className="bg-[#071A3D]">4-Star Premium</option>
                <option value="3-Star Standard Value" className="bg-[#071A3D]">3-Star Standard</option>
                <option value="Budget-Friendly Economy" className="bg-[#071A3D]">Budget Economy</option>
              </select>
            </div>

            {/* Special Notes (Full Width) */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-gray-200 mb-1">
                Special Preferences &amp; Requests
              </label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="e.g. Hotel walking distance to Haram, direct flight on Saudia/PIA, wheelchair assistance, private GMC"
                className="w-full bg-white/5 border border-white/15 focus:border-[#C29427] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Generate Button */}
            <div className="md:col-span-3 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#F7D070] text-[#051433] font-black text-sm shadow-lg shadow-[#B8860B]/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Routes &amp; Crafting Custom Itinerary...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Custom Travel Plan</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error display */}
          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Generated Plan Presentation */}
          {itinerary && (
            <div className="space-y-6 pt-4 border-t border-white/10 animate-in fade-in">
              {/* Title & Summary */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0A2458] to-[#071F4A] border border-[#C29427]/40">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F5D061]">
                  Personalized AI Curated Package
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white mt-1 font-heading">
                  {itinerary.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-200 mt-2 leading-relaxed">
                  {itinerary.summary}
                </p>

                {/* WhatsApp Action */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                  <div className="text-xs text-[#F5D061] font-bold">
                    Official Booking Desk: Muhammad Aamir Aziz (+966 50 267 4930)
                  </div>
                  <button
                    onClick={handleWhatsAppBooking}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs sm:text-sm transition-all shadow-lg hover:scale-105"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Inquire &amp; Book this Plan via WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Airline & Route Recommendation */}
              {itinerary.airlineRecommendation && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-[#F5D061] flex items-center gap-1.5 mb-2">
                    <Plane className="w-4 h-4" />
                    <span>Airline &amp; Flight Connection Strategy</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-gray-400 block text-[11px]">Recommended Carriers:</span>
                      <span className="text-white font-bold">
                        {itinerary.airlineRecommendation.preferredAirlines?.join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[11px]">Route Overview:</span>
                      <span className="text-white font-medium">
                        {itinerary.airlineRecommendation.routeSummary}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[11px]">Baggage Guideline:</span>
                      <span className="text-gray-300">
                        {itinerary.airlineRecommendation.baggageTips}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Recommended Accommodations */}
              {itinerary.hotelRecommendations && (
                <div>
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-[#F5D061] flex items-center gap-1.5 mb-3">
                    <Building2 className="w-4 h-4" />
                    <span>Curated Hotel Stays</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {itinerary.hotelRecommendations.map((hotel: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#0A2458]/70 border border-white/10 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white font-heading">
                              {hotel.hotelName}
                            </span>
                            <span className="text-[11px] font-bold text-[#F5D061]">
                              ★ {hotel.rating || 5}
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-300 block mt-0.5">
                            📍 {hotel.city} • {hotel.distance}
                          </span>
                        </div>
                        {hotel.approxPricePerNight && (
                          <div className="mt-2 text-[11px] text-gray-400">
                            Est: <span className="text-white font-bold">{hotel.approxPricePerNight}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Daily Schedule */}
              {itinerary.dailySchedule && (
                <div>
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-[#F5D061] flex items-center gap-1.5 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>Day-by-Day Journey Schedule</span>
                  </h5>
                  <div className="space-y-2.5">
                    {itinerary.dailySchedule.map((day: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row gap-2 sm:gap-4 items-start text-xs"
                      >
                        <div className="px-2.5 py-1 rounded-md bg-[#C29427]/20 border border-[#C29427]/40 text-[#F5D061] font-black text-xs shrink-0">
                          Day {day.day}
                        </div>
                        <div className="flex-1">
                          <span className="font-bold text-white text-xs block mb-1">
                            {day.title}
                          </span>
                          <ul className="list-disc list-inside text-gray-300 space-y-0.5 text-[11px]">
                            {day.activities?.map((act: string, aIdx: number) => (
                              <li key={aIdx}>{act}</li>
                            ))}
                          </ul>
                          {day.prayerOrZiyaratHighlight && (
                            <div className="mt-1 text-[11px] text-[#F5D061] font-medium">
                              ✨ Highlight: {day.prayerOrZiyaratHighlight}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Estimated Budget & Essential Tips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {itinerary.estimatedBudget && (
                  <div className="p-4 rounded-xl bg-[#051433] border border-[#C29427]/30 text-xs">
                    <span className="text-xs font-bold text-[#F5D061] block mb-2">
                      💰 Estimated Cost Breakdown ({currentCurrency})
                    </span>
                    <div className="space-y-1 text-gray-300 text-[11px]">
                      <div className="flex justify-between">
                        <span>Flights:</span>
                        <span className="text-white font-bold">{itinerary.estimatedBudget.flights}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hotels:</span>
                        <span className="text-white font-bold">{itinerary.estimatedBudget.accommodation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Visas &amp; Ground Transport:</span>
                        <span className="text-white font-bold">{itinerary.estimatedBudget.transportAndVisas}</span>
                      </div>
                      <div className="pt-2 border-t border-white/10 flex justify-between text-xs font-black text-[#F5D061]">
                        <span>Total Estimate:</span>
                        <span>{itinerary.estimatedBudget.totalEstimated}</span>
                      </div>
                    </div>
                  </div>
                )}

                {itinerary.travelTips && (
                  <div className="p-4 rounded-xl bg-[#051433] border border-[#C29427]/30 text-xs">
                    <span className="text-xs font-bold text-[#F5D061] block mb-2">
                      📋 Essential Travel Tips &amp; Regulations
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-[11px]">
                      {itinerary.travelTips.map((tip: string, idx: number) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
