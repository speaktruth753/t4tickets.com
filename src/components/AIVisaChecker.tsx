import React, { useState } from 'react';
import {
  FileCheck2,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  Clock,
  Phone,
  HelpCircle,
  Loader2,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export const AIVisaChecker: React.FC = () => {
  const [nationality, setNationality] = useState('Pakistani');
  const [destinationCountry, setDestinationCountry] = useState('Saudi Arabia');
  const [visaType, setVisaType] = useState('Work / Employment Visa (GCC)');
  const [isLoading, setIsLoading] = useState(false);
  const [guide, setGuide] = useState<any | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGuide(null);

    try {
      const res = await fetch('/api/gemini/visa-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nationality, destinationCountry, visaType })
      });
      const data = await res.json();
      if (data.guide) {
        setGuide(data.guide);
      }
    } catch (err) {
      console.error('Visa guide error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Muhammad Aamir Aziz (T4 Tickets),\nI need assistance with ${visaType} for ${destinationCountry} (Nationality: ${nationality}).\nPlease send me document submission instructions and service charges.`
    );
    window.open(`https://wa.me/966502674930?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-[#071A3D] rounded-2xl border-2 border-[#C29427]/40 shadow-xl p-5 sm:p-7 text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C29427]/20 border border-[#C29427]/50 text-[#F5D061] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Visa &amp; GCC Medical Advisor</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
            Instant Visa Requirements &amp; Wafid / Gamca Medical Check
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Check the latest requirements, biometric rules, medical slip booking, and embassy protocols.
          </p>
        </div>

        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shrink-0 shadow-md transition-all hover:scale-105"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Consult Agent (+966 50 267 4930)</span>
        </button>
      </div>

      {/* Selector Form */}
      <form onSubmit={handleCheck} className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-5">
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-1">Passport Nationality</label>
          <input
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="w-full bg-white/5 border border-white/15 focus:border-[#C29427] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            placeholder="e.g. Pakistani, Indian, Bangladeshi"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 mb-1">Destination Country</label>
          <select
            value={destinationCountry}
            onChange={(e) => setDestinationCountry(e.target.value)}
            className="w-full bg-white/5 border border-white/15 focus:border-[#C29427] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
          >
            <option value="Saudi Arabia" className="bg-[#071A3D]">Saudi Arabia</option>
            <option value="United Arab Emirates (Dubai)" className="bg-[#071A3D]">UAE (Dubai)</option>
            <option value="Qatar" className="bg-[#071A3D]">Qatar</option>
            <option value="Oman" className="bg-[#071A3D]">Oman</option>
            <option value="Bahrain" className="bg-[#071A3D]">Bahrain</option>
            <option value="United Kingdom" className="bg-[#071A3D]">United Kingdom</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 mb-1">Visa Category</label>
          <select
            value={visaType}
            onChange={(e) => setVisaType(e.target.value)}
            className="w-full bg-white/5 border border-white/15 focus:border-[#C29427] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
          >
            <option value="Work / Employment Visa (GCC)" className="bg-[#071A3D]">Work / Employment Visa (GCC)</option>
            <option value="Tourist & Visit Visa" className="bg-[#071A3D]">Tourist &amp; Visit Visa</option>
            <option value="VIP Umrah Visa" className="bg-[#071A3D]">VIP Umrah Visa</option>
            <option value="Family Visit Visa" className="bg-[#071A3D]">Family Visit Visa</option>
            <option value="GCC Medical Slip Appointment" className="bg-[#071A3D]">GCC Medical Slip (Gamca/Wafid)</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 rounded-xl bg-[#C29427] hover:bg-[#D4A338] text-[#051433] font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Checking...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verify with AI</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Guide Presentation */}
      {guide && (
        <div className="mt-6 p-4 sm:p-5 rounded-xl bg-[#051433] border border-[#C29427]/30 space-y-4 animate-in fade-in text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
            <div>
              <span className="text-[#F5D061] font-bold text-sm">
                {guide.destination} • {guide.visaCategory}
              </span>
              <p className="text-gray-300 text-[11px] mt-0.5">{guide.overview}</p>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#F5D061]" />
                <span>{guide.processingTime}</span>
              </span>
              <span className="font-bold text-white">{guide.estimatedFees}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-bold text-white block mb-2">Required Document Checklist:</span>
              <ul className="space-y-1 text-gray-300 text-[11px]">
                {guide.documentChecklist?.map((doc: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C29427] shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              {guide.gccMedicalRequired && (
                <div className="p-3 rounded-lg bg-[#DC2626]/15 border border-[#DC2626]/30 text-[11px]">
                  <span className="font-bold text-red-300 flex items-center gap-1 mb-1">
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>GCC Medical (Gamca / Wafid) Notice</span>
                  </span>
                  <p className="text-gray-200">{guide.gccMedicalDetails}</p>
                </div>
              )}

              {guide.keyAdvice && (
                <div className="p-3 rounded-lg bg-[#0A2458] border border-white/10 text-[11px]">
                  <span className="font-bold text-[#F5D061] block mb-1">Key Advice for Approval:</span>
                  <p className="text-gray-300">{guide.keyAdvice}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
