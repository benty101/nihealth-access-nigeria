
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WorldClassFeatures from '@/components/WorldClassFeatures';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <WorldClassFeatures />
    </div>
  );
};

export default Index;
