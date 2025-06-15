
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WorldClassFeatures from '@/components/WorldClassFeatures';
import TrustIndicators from '@/components/TrustIndicators';
import TestimonialsSection from '@/components/TestimonialsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="animate-fade-in">
        <Hero />
      </div>
      <div className="animate-fade-in animation-delay-200">
        <TrustIndicators />
      </div>
      <div className="animate-fade-in animation-delay-400">
        <WorldClassFeatures />
      </div>
      <div className="animate-fade-in animation-delay-600">
        <TestimonialsSection />
      </div>
    </div>
  );
};

export default Index;
