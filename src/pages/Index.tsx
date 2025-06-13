
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HealthDashboard from '@/components/HealthDashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HealthDashboard />
    </div>
  );
};

export default Index;
