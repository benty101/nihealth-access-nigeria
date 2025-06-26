
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MLAnalytics from '@/components/analytics/MLAnalytics';

const MLAnalyticsPage = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <MLAnalytics />
      </div>
    </div>
  );
};

export default MLAnalyticsPage;
