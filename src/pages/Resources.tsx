
import React from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import ModernResourceCenter from '@/components/resources/ModernResourceCenter';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <ContextualNavbar />
      <ModernResourceCenter />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Resources;
