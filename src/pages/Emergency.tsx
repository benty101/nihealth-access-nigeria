
import React from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import EmergencyServices from '@/components/emergency/EmergencyServices';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Emergency = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContextualNavbar />
      <EmergencyServices />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Emergency;
