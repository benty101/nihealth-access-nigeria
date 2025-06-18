
import React from 'react';
import Navbar from '@/components/Navbar';
import HospitalDirectory from '@/components/HospitalDirectory';
import HealthReminders from '@/components/dashboard/HealthReminders';

const Hospitals = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HospitalDirectory />
      
      {/* Health Reminders Section at Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-md mx-auto">
          <HealthReminders />
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
