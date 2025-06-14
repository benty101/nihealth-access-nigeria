
import React from 'react';
import Navbar from '@/components/Navbar';
import EmergencyServices from '@/components/emergency/EmergencyServices';

const Emergency = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <EmergencyServices />
    </div>
  );
};

export default Emergency;
