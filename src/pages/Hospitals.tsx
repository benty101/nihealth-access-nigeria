
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import BackButton from '@/components/navigation/BackButton';
import HospitalDirectory from '@/components/HospitalDirectory';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Hospitals = () => {
  return (
    <PageLayout 
      title="Hospital Directory"
      subtitle="Find and connect with hospitals and healthcare facilities across Nigeria"
    >
      <div className="mb-6">
        <BackButton />
      </div>
      
      <HospitalDirectory />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </PageLayout>
  );
};

export default Hospitals;
