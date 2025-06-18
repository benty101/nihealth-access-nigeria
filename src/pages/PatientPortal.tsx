
import React from 'react';
import Navbar from '@/components/Navbar';
import PatientPortal from '@/components/patient/PatientPortal';

const PatientPortalPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PatientPortal />
    </div>
  );
};

export default PatientPortalPage;
