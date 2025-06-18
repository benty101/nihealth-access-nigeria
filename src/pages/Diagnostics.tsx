
import React from 'react';
import Navbar from '@/components/Navbar';
import DiagnosticBooking from '@/components/diagnostics/DiagnosticBooking';
import FloatingEmergencyButton from '@/components/dashboard/FloatingEmergencyButton';

const Diagnostics = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <DiagnosticBooking />
      
      {/* Floating Emergency Button */}
      <FloatingEmergencyButton />
    </div>
  );
};

export default Diagnostics;
