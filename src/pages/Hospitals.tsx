
import React from 'react';
import Navbar from '@/components/Navbar';
import HospitalDirectory from '@/components/HospitalDirectory';
import EmergencyContactCard from '@/components/dashboard/EmergencyContactCard';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Hospitals = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HospitalDirectory />
      
      {/* Emergency Contact Section at Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-md mx-auto">
          <EmergencyContactCard />
        </div>
      </div>
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Hospitals;
