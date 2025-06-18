
import React from 'react';
import Navbar from '@/components/Navbar';
import MaternalResourceCenter from '@/components/MaternalResourceCenter';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Resources = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <MaternalResourceCenter />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Resources;
