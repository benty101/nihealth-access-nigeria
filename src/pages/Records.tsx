
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import BackButton from '@/components/navigation/BackButton';
import HealthRecords from '@/components/HealthRecords';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Records = () => {
  return (
    <PageLayout 
      title="My Health Records Vault"
      subtitle="Securely store, organize, and share your medical documents"
    >
      <div className="mb-6">
        <BackButton />
      </div>
      
      <HealthRecords />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </PageLayout>
  );
};

export default Records;
