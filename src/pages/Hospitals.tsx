
import React from 'react';
import StandardPageLayout from '@/components/layout/StandardPageLayout';
import BackButton from '@/components/navigation/BackButton';
import HospitalDirectory from '@/components/HospitalDirectory';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Hospitals = () => {
  return (
    <StandardPageLayout 
      title="Hospital Directory"
      subtitle="Find and connect with hospitals and healthcare facilities across Nigeria"
      backgroundVariant="gradient"
    >
      <div className="mb-6">
        <BackButton />
      </div>
      
      <HospitalDirectory />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </StandardPageLayout>
  );
};

export default Hospitals;
