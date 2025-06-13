
import React from 'react';
import Navbar from '@/components/Navbar';
import HealthRecords from '@/components/HealthRecords';

const Records = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HealthRecords />
    </div>
  );
};

export default Records;
