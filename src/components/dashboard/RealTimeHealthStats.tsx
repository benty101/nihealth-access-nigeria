
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Activity, TrendingUp, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserHealthService, HealthMetric } from '@/services/UserHealthService';
import { useToast } from '@/hooks/use-toast';

const RealTimeHealthStats = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [healthScore, setHealthScore] = useState<number>(75);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadHealthData();
    }
  }, [user]);

  const loadHealthData = async () => {
    if (!user) return;

    try {
      const [metrics, score] = await Promise.all([
        UserHealthService.getUserHealthMetrics(user.id),
        UserHealthService.getHealthScore(user.id)
      ]);

      setHealthMetrics(metrics);
      setHealthScore(score);
    } catch (error) {
      console.error('Error loading health data:', error);
      toast({
        title: "Error",
        description: "Failed to load health data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getLatestMetric = (type: string) => {
    return healthMetrics.find(metric => metric.metric_type === type);
  };

  const addSampleData = async () => {
    if (!user) return;

    try {
      await UserHealthService.addHealthMetric({
        metric_type: 'blood_pressure_systolic',
        value: 120,
        unit: 'mmHg'
      });

      await UserHealthService.addHealthMetric({
        metric_type: 'heart_rate',
        value: 72,
        unit: 'bpm'
      });

      await UserHealthService.addHealthMetric({
        metric_type: 'weight',
        value: 70,
        unit: 'kg'
      });

      await loadHealthData();
      toast({
        title: "Success",
        description: "Sample health data added"
      });
    } catch (error) {
      console.error('Error adding sample data:', error);
      toast({
        title: "Error",
        description: "Failed to add sample data",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Health Stats</h3>
        {healthMetrics.length === 0 && (
          <Button onClick={addSampleData} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Sample Data
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthScore}/100</div>
            <p className="text-xs text-muted-foreground">
              {healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Good' : 'Needs attention'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getLatestMetric('heart_rate')?.value || '--'} 
              {getLatestMetric('heart_rate') && ' bpm'}
            </div>
            <p className="text-xs text-muted-foreground">
              {getLatestMetric('heart_rate') ? 'Latest reading' : 'No data available'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {getLatestMetric('blood_pressure_systolic')?.value || '--'}/
              {getLatestMetric('blood_pressure_diastolic')?.value || '--'}
            </div>
            <p className="text-xs text-muted-foreground">
              {getLatestMetric('blood_pressure_systolic') ? 'Latest reading' : 'No data available'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeHealthStats;
