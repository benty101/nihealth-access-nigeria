
import React from 'react';

interface MeddyPalLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const MeddyPalLogo = ({ size = 'md', showText = true, className = '' }: MeddyPalLogoProps) => {
  const sizeConfig = {
    sm: { icon: 'h-8 w-8', text: 'text-lg', tagline: 'text-xs', container: 'space-x-2' },
    md: { icon: 'h-10 w-10', text: 'text-xl', tagline: 'text-sm', container: 'space-x-3' },
    lg: { icon: 'h-12 w-12', text: 'text-2xl', tagline: 'text-sm', container: 'space-x-3' },
    xl: { icon: 'h-14 w-14', text: 'text-3xl', tagline: 'text-base', container: 'space-x-4' }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center ${config.container} ${className}`}>
      {/* Logo Icon - Heart in Square with better heart shape */}
      <div className={`${config.icon} relative`}>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
          {/* Better Heart Shape using SVG */}
          <svg 
            className="w-6 h-6 text-white" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>
      
      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${config.text} font-bold text-teal-600 leading-tight`}>
            MeddyPal
          </span>
          <span className={`${config.tagline} text-teal-500 leading-tight -mt-0.5`}>
            Your Health Companion
          </span>
        </div>
      )}
    </div>
  );
};

export default MeddyPalLogo;
