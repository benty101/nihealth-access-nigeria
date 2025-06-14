
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WorldClassFeatures from '@/components/WorldClassFeatures';
import LandingPage from '@/components/LandingPage';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <WorldClassFeatures />
      <LandingPage />
    </div>
  );
};

export default Index;
