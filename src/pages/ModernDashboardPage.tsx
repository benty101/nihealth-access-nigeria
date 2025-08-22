import React from 'react';
import ModernAppLayout from '@/components/layout/ModernAppLayout';
import ModernDashboard from '@/components/modern/ModernDashboard';

const ModernDashboardPage = () => {
  return (
    <ModernAppLayout>
      <ModernDashboard />
    </ModernAppLayout>
  );
};

export default ModernDashboardPage;