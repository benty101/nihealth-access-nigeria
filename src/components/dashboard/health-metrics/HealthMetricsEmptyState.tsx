
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Plus, TrendingUp } from 'lucide-react';
import PremiumFeaturePromo from '../PremiumFeaturePromo';

interface HealthMetricsEmptyStateProps {
  onAddMetric: () => void;
}

const HealthMetricsEmptyState = ({ onAddMetric }: HealthMetricsEmptyStateProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center py-6">
        <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="font-medium text-gray-900 mb-2">No Health Metrics Yet</h3>
        <p className="text-sm text-gray-600 mb-4">
          Start tracking your vital signs to monitor your health progress
        </p>
        <Button onClick={onAddMetric} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Your First Metric
        </Button>
      </div>
      
      <div className="border-t pt-4">
        <PremiumFeaturePromo
          feature="Advanced Health Tracking"
          description="Get automated health monitoring, trend analysis, and personalized health insights with our premium fitness tracker integration."
          icon={TrendingUp}
          compact={true}
        />
      </div>
    </div>
  );
};

export default HealthMetricsEmptyState;
