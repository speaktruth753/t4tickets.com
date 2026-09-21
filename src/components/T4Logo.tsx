import React, { useState } from 'react';

export type LogoColorTheme = 'red' | 'gold' | 'royal';

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
  colorTheme = 'red',
  showStatusIndicator = true,
  className = '',
  imageClassName = '',
  logoSrc,
  alt = 'T4 TICKETS Company Logo',
  caption
}) => {
  const [hasError, setHasError] = useState(false);

  // Resolved logo source based on color theme if not explicitly overridden
  const resolvedLogoSrc = logoSrc || (colorTheme === 'gold' ? '/t4_logo_gold.svg' : '/t4_logo_red.svg');

  // Responsive sizing classes
  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
    responsive: 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14'
  }[size];

  // Theme-specific styles
  const themeStyles = {
    red: {
      outerGlow: 'bg-gradient-to-tr from-[#991B1B] via-[#EF4444] to-[#DC2626] shadow-md shadow-[#DC2626]/30 group-hover:shadow-[#EF4444]/60',
      innerBorder: 'border-[#EF4444]/50',
      radialShine: 'from-[#EF4444]/25 to-transparent',
      textGradient: 'from-white via-[#FEE2E2] to-[#EF4444]',
      subTextColor: 'text-[#EF4444]'
    },
    gold: {
      outerGlow: 'bg-gradient-to-tr from-[#B8860B] via-[#F7D070] to-[#8D6B18] shadow-md shadow-[#B8860B]/25 group-hover:shadow-[#F5D061]/50',
      innerBorder: 'border-[#F5D061]/50',
      radialShine: 'from-[#C29427]/20 to-transparent',
      textGradient: 'from-[#FFF5C0] via-[#E5BA54] to-[#B8860B]',
      subTextColor: 'text-[#F5D061]'
    },
    royal: {
      outerGlow: 'bg-gradient-to-tr from-[#1D4ED8] via-[#60A5FA] to-[#2563EB] shadow-md shadow-[#2563EB]/30 group-hover:shadow-[#60A5FA]/60',
      innerBorder: 'border-[#60A5FA]/50',
      radialShine: 'from-[#3B82F6]/25 to-transparent',
      textGradient: 'from-white via-[#DBEAFE] to-[#60A5FA]',
      subTextColor: 'text-[#60A5FA]'
    }
  }[colorTheme];

  return (
    <div
      id={`${id}-container`}
      className={`relative inline-flex items-center justify-center shrink-0 select-none group ${className}`}
      title="T4 TICKETS AND TRAVEL SERVICES Official Logo"
    >
      {/* Outer Glow & Metallic Border Ring */}
      <div
        className={`relative ${sizeClasses} p-0.5 rounded-2xl ${themeStyles.outerGlow} transition-all duration-300 flex items-center justify-center overflow-hidden`}
      >
        {/* Inner Container Backdrop with Dark Navy */}
        <div className={`w-full h-full rounded-[14px] bg-[#071A3D] flex items-center justify-center relative overflow-hidden border ${themeStyles.innerBorder} p-1`}>
          {/* Subtle radial shine */}
          <div className={`absolute inset-0 bg-radial ${themeStyles.radialShine} pointer-events-none`} />

          {/* Designated Logo Image */}
          {!hasError ? (
            <img
              id={id}
              src={resolvedLogoSrc}
              alt={alt}
              referrerPolicy="no-referrer"
              onError={() => setHasError(true)}
              className={`w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105 ${imageClassName}`}
            />
          ) : (
            /* Fallback Vector Emblem if external asset is missing */
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
              <span className={`text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-b ${themeStyles.textGradient} font-serif leading-none`}>
                T4
              </span>
              <span className={`text-[7px] font-extrabold ${themeStyles.subTextColor} tracking-tighter uppercase`}>
                TICKETS
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Verified / Certified Status Indicator dot */}
      {showStatusIndicator && (
        <span
          className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center"
          title="Certified Official Agency Logo"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16A34A] border-2 border-[#071A3D]" />
        </span>
      )}

      {/* Optional Caption */}
      {caption && (
        <span className="sr-only">{caption}</span>
      )}
    </div>
  );
};
