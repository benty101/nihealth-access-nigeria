
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useHealthMetrics } from '@/hooks/useHealthMetrics';
import HealthMetricsEmptyState from './health-metrics/HealthMetricsEmptyState';
import HealthMetricsContent from './health-metrics/HealthMetricsContent';

const RealTimeHealthMetrics = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { metrics, loading, getLatestMetricValue } = useHealthMetrics();

  const handleAddMetric = () => {
    navigate('/profile');
    toast({
      title: "Add Health Metrics",
      description: "Complete your health profile to track your vital signs",
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-600" />
            Health Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasAnyMetrics = metrics.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-600" />
            Health Metrics
          </div>
          <Button size="sm" variant="outline" onClick={handleAddMetric}>
            <Plus className="h-4 w-4 mr-1" />
            Add Metrics
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasAnyMetrics ? (
          <HealthMetricsEmptyState onAddMetric={handleAddMetric} />
        ) : (
          <HealthMetricsContent 
            metrics={metrics} 
            getLatestMetricValue={getLatestMetricValue} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeHealthMetrics;
