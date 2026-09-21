import React from 'react';
import {
  Plane,
  Building2,
  Palmtree,
  FileCheck2,
  MoonStar,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { SERVICES } from '../data/travelData';

interface FeaturedServicesProps {
  onServiceSelect: (serviceId: string, title: string) => void;
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({ onServiceSelect }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane':
        return <Plane className="w-6 h-6 text-[#E53935]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#E53935]" />;
      case 'Palmtree':
        return <Palmtree className="w-6 h-6 text-[#E53935]" />;
      case 'FileCheck2':
        return <FileCheck2 className="w-6 h-6 text-[#E53935]" />;
      case 'MoonStar':
        return <MoonStar className="w-6 h-6 text-[#E53935]" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-[#E53935]" />;
      default:
        return <Plane className="w-6 h-6 text-[#E53935]" />;
    }
  };

  return (
    <section id="services-section" className="py-20 bg-[#F7F8FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071A3D]/5 text-[#071A3D] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E53935]" />
            <span>Comprehensive Travel Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#071A3D] font-heading tracking-tight">
            Featured Travel Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B7280]">
            From individual flight bookings to VIP pilgrim journeys and corporate logistics, experience world-class reliability with T4TICKETS.
          </p>
        </div>

        {/* 6 Premium Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle top accent highlight on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E53935] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Icon & Arabic Title Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.iconName)}
                  </div>
                  {service.titleAr && (
                    <span className="text-xs font-bold text-gray-400 font-sans tracking-wide">
                      {service.titleAr}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#071A3D] font-heading group-hover:text-[#E53935] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-bold text-[#D62828] mt-1">{service.subtitle}</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Inquiry & WhatsApp */}
              <div className="mt-6 pt-2 flex items-center gap-2">
                <button
                  onClick={() => onServiceSelect(service.id, service.title)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-gray-200 group-hover:border-[#071A3D] group-hover:bg-[#071A3D] group-hover:text-white text-xs font-bold text-[#071A3D] flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={`https://wa.me/966502674930?text=${encodeURIComponent(`Assalam u Alaikum Muhammad Aamir Aziz, I need urgent booking or rates for ${service.title} (${service.subtitle}).`)}`}
                  target="_blank"
                  rel="noreferrer"
                  title={`Instant WhatsApp Booking with Muhammad Aamir Aziz for ${service.title}`}
                  className="p-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-colors flex items-center justify-center shrink-0 shadow-2xs"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
