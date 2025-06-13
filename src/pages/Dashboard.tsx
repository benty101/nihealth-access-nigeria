
import React from 'react';
import Navbar from '@/components/Navbar';
import HealthDashboard from '@/components/HealthDashboard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HealthDashboard />
    </div>
  );
};

export default Dashboard;
