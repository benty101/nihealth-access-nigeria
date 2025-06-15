
import React from 'react';
import { Button } from '@/components/ui/button';
import { Baby } from 'lucide-react';

interface CallToActionProps {
  onGetStarted: () => void;
}

const CallToAction = ({ onGetStarted }: CallToActionProps) => {
  return (
    <div className="py-20 bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-emerald-600/20 animate-pulse"></div>
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
          Empowering Mothers and Children Across Nigeria
        </h2>
        <p className="text-xl text-teal-100 mb-8 animate-fade-in animation-delay-200">
          Join thousands of families who trust MeddyPal for comprehensive maternal and child healthcare
        </p>
        <Button 
          size="lg" 
          onClick={onGetStarted}
          className="bg-white text-teal-600 hover:bg-gray-50 px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform animate-fade-in animation-delay-400"
        >
          <Baby className="mr-2 h-5 w-5" />
          Start Your Family's Health Journey
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
