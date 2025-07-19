
import React from 'react';
import ContextualNavbar from '@/components/navbar/ContextualNavbar';
import ModernAdminDashboard from '@/components/admin/ModernAdminDashboard';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <ContextualNavbar />
      <ModernAdminDashboard />
    </div>
  );
};

export default AdminDashboard;
