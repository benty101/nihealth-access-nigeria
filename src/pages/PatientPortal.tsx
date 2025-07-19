
import React from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import PatientPortal from '@/components/patient/PatientPortal';

const PatientPortalPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContextualNavbar />
      <PatientPortal />
    </div>
  );
};

export default PatientPortalPage;
