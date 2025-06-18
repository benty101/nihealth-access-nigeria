
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Baby } from 'lucide-react';

interface HeroHeaderProps {
  onGetStarted: () => void;
  onExploreServices: () => void;
}

const HeroHeader = ({ onGetStarted, onExploreServices }: HeroHeaderProps) => {
  return (
    <div className="relative bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 to-emerald-600/5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-sm border border-teal-200 text-teal-800 text-sm font-medium mb-8 animate-fade-in">
            <Shield className="h-4 w-4 mr-2" />
            🇳🇬 Ministry of Health Approved • Trusted by 25,000+ Nigerian Mothers
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in animation-delay-200">
            Your Digital 
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent block">
              Maternal Health
            </span>
            Companion
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed animate-fade-in animation-delay-400">
            From pregnancy to parenthood, access Nigeria's most comprehensive maternal and child health platform. 
            <span className="text-teal-600 font-semibold"> Expert care, when you need it, where you are.</span>
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 animate-fade-in animation-delay-500">
            <div className="flex items-center space-x-2 text-gray-700">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="font-medium">24/7 Maternal Support</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Baby className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Child Development Tracking</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="font-medium">Certified Healthcare Providers</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-600">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="maternal-button text-white px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
            >
              <Heart className="mr-2 h-5 w-5" />
              Start Your Maternal Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onExploreServices}
              className="px-12 py-4 text-lg rounded-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50 transition-all duration-300"
            >
              Explore Our Services
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 animate-fade-in animation-delay-800">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>500+ Maternal Health Specialists</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>200+ Partner Health Facilities</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>99.2% Mother Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full opacity-10 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-10 animate-float animation-delay-300"></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 animate-float animation-delay-600"></div>
    </div>
  );
};

export default HeroHeader;
