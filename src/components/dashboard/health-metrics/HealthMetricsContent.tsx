
import React from 'react';
import { Activity, TrendingUp } from 'lucide-react';
import HealthMetricsGrid from './HealthMetricsGrid';
import PremiumFeaturePromo from '../PremiumFeaturePromo';

interface HealthMetric {
  id: string;
  metric_type: string;
  value: number;
  unit: string;
  recorded_at: string;
}

interface HealthMetricsContentProps {
  metrics: HealthMetric[];
  getLatestMetricValue: (type: string) => string | null;
}

const HealthMetricsContent = ({ metrics, getLatestMetricValue }: HealthMetricsContentProps) => {
  return (
    <div className="space-y-4">
      <HealthMetricsGrid getLatestMetricValue={getLatestMetricValue} />

      {metrics.length > 0 && (
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <div className="flex items-center text-green-800 mb-1">
            <Activity className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Latest Reading</span>
          </div>
          <p className="text-xs text-green-700">
            Last updated: {new Date(metrics[0].recorded_at).toLocaleDateString()}
          </p>
        </div>
      )}

      <div className="border-t pt-4">
        <PremiumFeaturePromo
          feature="Smart Health Analytics"
          description="Unlock advanced health trend analysis, goal setting, and personalized coaching with Premium."
          icon={TrendingUp}
          compact={true}
        />
      </div>
    </div>
  );
};

export default HealthMetricsContent;
