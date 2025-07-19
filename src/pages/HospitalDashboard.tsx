
import React from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import ModernHospitalDashboard from '@/components/hospital/ModernHospitalDashboard';

const HospitalDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <ContextualNavbar />
      <ModernHospitalDashboard />
    </div>
  );
};

export default HospitalDashboardPage;
