
import React from 'react';
import Navbar from '@/components/Navbar';
import ResourceCenter from '@/components/ResourceCenter';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Resources = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ResourceCenter />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Resources;
