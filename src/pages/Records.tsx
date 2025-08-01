
import React from 'react';
import StandardPageLayout from '@/components/layout/StandardPageLayout';
import BackButton from '@/components/navigation/BackButton';
import HealthRecords from '@/components/HealthRecords';

const Records = () => {
  return (
    <StandardPageLayout 
      title="My Health Records Vault"
      subtitle="Securely store, organize, and share your medical documents"
      backgroundVariant="gradient"
      showEmergencyButton={true}
    >
      <div className="mb-6">
        <BackButton />
      </div>
      
      <HealthRecords />
    </StandardPageLayout>
  );
};

export default Records;
