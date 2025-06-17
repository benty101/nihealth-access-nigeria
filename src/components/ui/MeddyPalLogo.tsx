
import React from 'react';

interface MeddyPalLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const MeddyPalLogo = ({ size = 'md', showText = true, className = '' }: MeddyPalLogoProps) => {
  const sizeConfig = {
    sm: { icon: 'h-6 w-6', text: 'text-lg', container: 'space-x-2' },
    md: { icon: 'h-8 w-8', text: 'text-xl', container: 'space-x-2' },
    lg: { icon: 'h-10 w-10', text: 'text-2xl', container: 'space-x-3' },
    xl: { icon: 'h-12 w-12', text: 'text-3xl', container: 'space-x-3' }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center ${config.container} ${className}`}>
      {/* Logo Icon - Medical Cross */}
      <div className={`${config.icon} relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
          <div className="relative">
            {/* Medical Cross - Vertical bar */}
            <div className="absolute w-1.5 h-5 bg-white rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            {/* Medical Cross - Horizontal bar */}
            <div className="absolute w-5 h-1.5 bg-white rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </div>
      
      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${config.text} font-bold text-blue-700`}>
            MeddyPal
          </span>
          {size === 'lg' || size === 'xl' ? (
            <span className="text-xs text-gray-600 -mt-1">Your Health Companion</span>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default MeddyPalLogo;
