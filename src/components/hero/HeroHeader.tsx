
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Baby, Search } from 'lucide-react';

interface HeroHeaderProps {
  onGetStarted: () => void;
  onExploreServices: () => void;
}

const HeroHeader = ({ onGetStarted, onExploreServices }: HeroHeaderProps) => {
  return (
    <div className="bg-gradient-to-br from-teal-50 via-white to-emerald-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 text-sm font-medium mb-8 shadow-sm animate-fade-in hover:shadow-md transition-all duration-300">
            <Shield className="h-4 w-4 mr-2" />
            🇳🇬 In Partnership with Ministry of Science and Technology
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in animation-delay-200">
            Your Complete{' '}
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent hover:from-emerald-600 hover:to-teal-600 transition-all duration-500">
              Maternal & Child Health
            </span>{' '}
            Companion
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-400">
            Comprehensive healthcare for mothers and children - find specialized hospitals, 
            compare maternal insurance, book antenatal appointments, access child vaccinations, 
            and manage family health records securely.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in animation-delay-600">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
            >
              <Baby className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onExploreServices}
              className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 transform hover:border-teal-700"
            >
              <Search className="mr-2 h-5 w-5" />
              Explore Services
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600 animate-fade-in animation-delay-800">
            <div className="flex items-center hover:text-teal-600 transition-colors duration-300">
              <Shield className="h-5 w-5 text-teal-500 mr-2 hover:scale-110 transition-transform duration-300" />
              500+ Care Centers
            </div>
            <div className="flex items-center hover:text-teal-600 transition-colors duration-300">
              <Shield className="h-5 w-5 text-teal-500 mr-2 hover:scale-110 transition-transform duration-300" />
              Government Approved
            </div>
            <div className="flex items-center hover:text-teal-600 transition-colors duration-300">
              <Shield className="h-5 w-5 text-teal-500 mr-2 hover:scale-110 transition-transform duration-300" />
              15,000+ Mothers & Children
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
