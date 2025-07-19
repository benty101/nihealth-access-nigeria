
import React from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import HealthRecords from '@/components/HealthRecords';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Records = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContextualNavbar />
      <HealthRecords />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Records;
