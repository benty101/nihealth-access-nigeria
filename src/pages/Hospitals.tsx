
import React from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import HospitalDirectory from '@/components/HospitalDirectory';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Hospitals = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContextualNavbar />
      <HospitalDirectory />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Hospitals;
