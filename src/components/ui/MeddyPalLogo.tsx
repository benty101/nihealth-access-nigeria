
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
      {/* Logo Icon - Heart in Square */}
      <div className={`${config.icon} relative`}>
        <div className="absolute inset-0 bg-teal-500 rounded-md flex items-center justify-center">
          {/* Heart Shape */}
          <div className="relative">
            <div className="w-5 h-5 relative">
              {/* Heart using CSS shapes */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                <div className="w-3 h-3 bg-white transform rotate-45 relative">
                  <div className="w-3 h-3 bg-white rounded-full absolute -left-1.5 top-0"></div>
                  <div className="w-3 h-3 bg-white rounded-full absolute left-0 -top-1.5"></div>
                </div>
              </div>
            </div>
          </div>
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
