
import React from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import DiagnosticBooking from '@/components/diagnostics/DiagnosticBooking';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Diagnostics = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContextualNavbar />
      <DiagnosticBooking />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Diagnostics;
