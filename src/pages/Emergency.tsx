
import React from 'react';
import Navbar from '@/components/Navbar';
import EmergencyServices from '@/components/emergency/EmergencyServices';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Emergency = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <EmergencyServices />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Emergency;
