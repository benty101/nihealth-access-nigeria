
import React from 'react';
import Navbar from '@/components/Navbar';
import TelemedicineConsultation from '@/components/telemedicine/TelemedicineConsultation';

const Telemedicine = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <TelemedicineConsultation />
    </div>
  );
};

export default Telemedicine;
