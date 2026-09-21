import React, { useState } from 'react';

export type LogoColorTheme = 'gold' | 'royal' | 'emerald' | 'red';

interface T4LogoProps {
  id?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  variant?: 'circular' | 'badge' | 'box';
  colorTheme?: LogoColorTheme;
  showStatusIndicator?: boolean;
  className?: string;
  imageClassName?: string;
  logoSrc?: string;
  alt?: string;
  caption?: string;
}

export const T4Logo: React.FC<T4LogoProps> = ({
  id = 't4-company-logo',
  size = 'responsive',
  variant = 'circular',
  colorTheme = 'gold',
  showStatusIndicator = true,
  className = '',
  imageClassName = '',
  logoSrc,
  alt = 'T4 TICKETS Company Logo',
  caption
}) => {
  const [hasError, setHasError] = useState(false);

  // Resolved logo source based on color theme if not explicitly overridden
  const resolvedLogoSrc =
    logoSrc ||
    (colorTheme === 'gold'
      ? '/t4_logo_3d_render_gold.svg'
      : colorTheme === 'royal'
      ? '/t4_logo_3d_render_royal.svg'
      : colorTheme === 'emerald'
      ? '/t4_logo_3d_render_emerald.svg'
      : '/t4_logo_3d_render_ruby.svg');

  // Responsive sizing classes
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
    responsive: 'w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15'
  }[size];

  // 3D Theme-specific styles
  const themeStyles = {
    gold: {
      outerGlow:
        'bg-gradient-to-br from-[#FFFBEA] via-[#FCE184] via-35%-[#D8A232] via-65%-[#91650E] to-[#462E02] shadow-[0_12px_24px_-4px_rgba(0,0,0,0.85),0_4px_10px_rgba(184,134,11,0.35),inset_0_2px_3px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.8)] border border-[#FFF8DC]/70',
      innerBorder: 'border-[#F7D070]/70 ring-1 ring-[#FFEAA7]/50',
      radialShine: 'from-[#F5D061]/25 via-[#C29427]/10 to-transparent',
      textGradient: 'from-[#FFFFFF] via-[#FFE57F] via-50%-[#DFB15B] to-[#8D6B18]',
      subTextColor: 'text-[#F5D061]',
      ringColor: '#F5D061'
    },
    royal: {
      outerGlow:
        'bg-gradient-to-br from-[#E0F2FE] via-[#7DD3FC] via-35%-[#0284C7] via-65%-[#0369A1] to-[#082F49] shadow-[0_12px_24px_-4px_rgba(0,0,0,0.85),0_4px_10px_rgba(2,132,199,0.35),inset_0_2px_3px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.8)] border border-[#BAE6FD]/70',
      innerBorder: 'border-[#38BDF8]/70 ring-1 ring-[#BAE6FD]/50',
      radialShine: 'from-[#38BDF8]/25 via-[#0284C7]/10 to-transparent',
      textGradient: 'from-[#FFFFFF] via-[#BAE6FD] via-50%-[#38BDF8] to-[#0369A1]',
      subTextColor: 'text-[#60A5FA]',
      ringColor: '#60A5FA'
    },
    emerald: {
      outerGlow:
        'bg-gradient-to-br from-[#DCFCE7] via-[#86EFAC] via-35%-[#16A34A] via-65%-[#15803D] to-[#052E16] shadow-[0_12px_24px_-4px_rgba(0,0,0,0.85),0_4px_10px_rgba(22,163,74,0.35),inset_0_2px_3px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.8)] border border-[#86EFAC]/70',
      innerBorder: 'border-[#4ADE80]/70 ring-1 ring-[#BBF7D0]/50',
      radialShine: 'from-[#4ADE80]/25 via-[#16A34A]/10 to-transparent',
      textGradient: 'from-[#FFFFFF] via-[#BBF7D0] via-50%-[#4ADE80] to-[#15803D]',
      subTextColor: 'text-[#22C55E]',
      ringColor: '#4ADE80'
    },
    red: {
      outerGlow:
        'bg-gradient-to-br from-[#FEE2E2] via-[#FCA5A5] via-35%-[#EF4444] via-65%-[#B91C1C] to-[#450A0A] shadow-[0_12px_24px_-4px_rgba(0,0,0,0.85),0_4px_10px_rgba(239,68,68,0.35),inset_0_2px_3px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.8)] border border-[#FCA5A5]/70',
      innerBorder: 'border-[#EF4444]/70 ring-1 ring-[#FECACA]/50',
      radialShine: 'from-[#EF4444]/25 via-[#B91C1C]/10 to-transparent',
      textGradient: 'from-[#FFFFFF] via-[#FEE2E2] via-50%-[#EF4444] to-[#7F1D1D]',
      subTextColor: 'text-[#EF4444]',
      ringColor: '#EF4444'
    }
  }[colorTheme];

  return (
    <div
      id={`${id}-container`}
      className={`relative inline-flex items-center justify-center shrink-0 select-none group transition-transform duration-300 hover:scale-105 ${className}`}
      title="T4 TICKETS AND TRAVEL SERVICES 3D Official Logo"
    >
      {/* 3D Multi-Layered Metallic Outer Bezel */}
      <div
        className={`relative ${sizeClasses} p-[3px] rounded-full ${themeStyles.outerGlow} transition-all duration-300 flex items-center justify-center overflow-hidden`}
      >
        {/* Inner 3D Sunken Dial */}
        <div
          className={`w-full h-full rounded-full bg-[#05132B] flex items-center justify-center relative overflow-hidden border ${themeStyles.innerBorder} p-1 shadow-[inset_0_4px_8px_rgba(0,0,0,0.9),inset_0_-2px_4px_rgba(255,255,255,0.15)]`}
        >
          {/* 3D Glass Diagonal Sheen Highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none rounded-full" />
          <div className={`absolute inset-0 bg-radial ${themeStyles.radialShine} pointer-events-none`} />

          {/* 3D Logo SVG Artwork */}
          {!hasError ? (
            <img
              id={id}
              src={resolvedLogoSrc}
              alt={alt}
              referrerPolicy="no-referrer"
              onError={() => setHasError(true)}
              className={`w-full h-full object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)] drop-shadow-[0_1px_2px_rgba(255,255,255,0.2)] transition-transform duration-300 group-hover:scale-105 ${imageClassName}`}
            />
          ) : (
            /* Fallback 3D Vector Emblem */
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
              <span className={`text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-b ${themeStyles.textGradient} font-serif leading-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
                T4
              </span>
              <span className={`text-[8px] font-black ${themeStyles.subTextColor} tracking-widest uppercase mt-0.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}>
                TICKETS
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 3D Certified Indicator Badge */}
      {showStatusIndicator && (
        <span
          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          title="Certified Official Agency Emblem"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#16A34A] border-2 border-[#05132B] shadow-inner" />
        </span>
      )}

      {/* Optional Caption */}
      {caption && (
        <span className="sr-only">{caption}</span>
      )}
    </div>
  );
};
