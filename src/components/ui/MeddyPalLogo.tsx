
import React from 'react';
import { Heart, Shield } from 'lucide-react';

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
      {/* Logo Icon */}
      <div className={`${config.icon} relative`}>
        {/* Medical Cross Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-lg flex items-center justify-center">
          <div className="w-full h-full relative flex items-center justify-center">
            {/* Medical Cross */}
            <div className="absolute w-1 h-4 bg-white rounded-full"></div>
            <div className="absolute w-4 h-1 bg-white rounded-full"></div>
            {/* Small Heart */}
            <Heart className="absolute top-0 right-0 h-2 w-2 text-pink-300 fill-current transform translate-x-0.5 -translate-y-0.5" />
          </div>
        </div>
      </div>
      
      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${config.text} font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent`}>
            MeddyPal
          </span>
          {size === 'lg' || size === 'xl' ? (
            <span className="text-xs text-gray-500 -mt-1">Your Health Companion</span>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default MeddyPalLogo;
