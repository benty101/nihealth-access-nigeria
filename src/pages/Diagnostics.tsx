
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import DiagnosticBooking from '@/components/diagnostics/DiagnosticBooking';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';
import BackButton from '@/components/navigation/BackButton';

const Diagnostics = () => {
  return (
    <PageLayout 
      title="Diagnostic Services" 
      subtitle="Book lab tests and diagnostic services with ease"
    >
      <div className="mb-6">
        <BackButton />
      </div>
      
      <DiagnosticBooking />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </PageLayout>
  );
};

export default Diagnostics;
