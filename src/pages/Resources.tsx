
import React from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import MaternalResourceCenter from '@/components/MaternalResourceCenter';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Resources = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContextualNavbar />
      <MaternalResourceCenter />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Resources;
