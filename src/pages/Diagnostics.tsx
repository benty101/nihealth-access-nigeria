
import React from 'react';
import Navbar from '@/components/Navbar';
import DiagnosticBooking from '@/components/diagnostics/DiagnosticBooking';

const Diagnostics = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <DiagnosticBooking />
    </div>
  );
};

export default Diagnostics;
