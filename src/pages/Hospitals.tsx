
import React from 'react';
import Navbar from '@/components/Navbar';
import HospitalDirectory from '@/components/HospitalDirectory';

const Hospitals = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HospitalDirectory />
    </div>
  );
};

export default Hospitals;
