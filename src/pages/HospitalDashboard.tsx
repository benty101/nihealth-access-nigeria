
import React from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import HospitalDashboard from '@/components/hospital/HospitalDashboard';

const HospitalDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContextualNavbar />
      <div className="container mx-auto px-4 py-8">
        <HospitalDashboard />
      </div>
    </div>
  );
};

export default HospitalDashboardPage;
