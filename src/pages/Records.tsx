
import React from 'react';
import Navbar from '@/components/Navbar';
import HealthRecords from '@/components/HealthRecords';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Records = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HealthRecords />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Records;
