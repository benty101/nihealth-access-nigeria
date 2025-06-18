
import React from 'react';
import Navbar from '@/components/Navbar';
import HospitalDirectory from '@/components/HospitalDirectory';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Hospitals = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HospitalDirectory />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Hospitals;
