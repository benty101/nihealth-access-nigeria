
import React from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import ModernBrokerDashboard from '@/components/broker/ModernBrokerDashboard';

const BrokerDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <ContextualNavbar />
      <ModernBrokerDashboard />
    </div>
  );
};

export default BrokerDashboard;
