
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Users } from 'lucide-react';

interface CallToActionProps {
  onGetStarted: () => void;
}

const CallToAction = ({ onGetStarted }: CallToActionProps) => {
  return (
    <div className="py-20 bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-emerald-600/20 animate-pulse"></div>
      
      <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Government Partnership Badge */}
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8 animate-fade-in">
          <Shield className="h-4 w-4 mr-2" />
          🇳🇬 Official Partner: Ministry of Health & Ministry of Science and Innovation
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in animation-delay-200">
          Join Nigeria's Leading
          <span className="block text-teal-100">Maternal Health Revolution</span>
        </h2>
        
        <p className="text-xl text-teal-100 mb-8 max-w-4xl mx-auto animate-fade-in animation-delay-300">
          Backed by government partnerships and trusted by thousands of Nigerian mothers, 
          MeddyPal is transforming maternal and child healthcare across the nation.
        </p>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-in animation-delay-400">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">25,000+</div>
            <div className="text-teal-100">Mothers Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-teal-100">Healthcare Specialists</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">99.2%</div>
            <div className="text-teal-100">Satisfaction Rate</div>
          </div>
        </div>

        <Button 
          size="lg" 
          onClick={onGetStarted}
          className="bg-white text-teal-600 hover:bg-gray-50 px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform animate-fade-in animation-delay-500"
        >
          <Heart className="mr-2 h-5 w-5" />
          Begin Your Maternal Health Journey Today
        </Button>

        <p className="text-teal-200 text-sm mt-6 animate-fade-in animation-delay-600">
          Free to start • No credit card required • Immediate access to maternal health resources
        </p>
      </div>
    </div>
  );
};

export default CallToAction;
