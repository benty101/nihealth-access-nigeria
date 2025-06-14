
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
      <Hero />
      <TrustIndicators />
      <WorldClassFeatures />
      <TestimonialsSection />
    </div>
  );
};

export default Index;
