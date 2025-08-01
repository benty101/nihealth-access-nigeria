
import React from 'react';
import StandardPageLayout from '@/components/layout/StandardPageLayout';
import ModernResourceCenter from '@/components/resources/ModernResourceCenter';

const Resources = () => {
  return (
    <StandardPageLayout
      title="Health Resources & Education"
      subtitle="Access trusted health information, educational content, and wellness resources"
      backgroundVariant="gradient"
      showBreadcrumbs={false}
      showHelp={true}
      showEmergencyButton={true}
    >
      <ModernResourceCenter />
    </StandardPageLayout>
  );
};

export default Resources;
