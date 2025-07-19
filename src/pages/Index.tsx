
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import Hero from '@/components/Hero';
import WorldClassFeatures from '@/components/WorldClassFeatures';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <ContextualNavbar />
      <Hero />
      <WorldClassFeatures />
    </div>
  );
};

export default Index;
