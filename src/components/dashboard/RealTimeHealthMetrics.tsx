
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Activity, Scale, Ruler, Thermometer, Plus, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import PremiumFeaturePromo from './PremiumFeaturePromo';

interface HealthMetric {
  id: string;
  metric_type: string;
  value: number;
  unit: string;
  recorded_at: string;
}

const RealTimeHealthMetrics = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadHealthMetrics();
    }
  }, [user]);

  const loadHealthMetrics = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('health_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setMetrics(data || []);
    } catch (error) {
      console.error('Error loading health metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLatestMetricValue = (type: string) => {
    const metric = metrics.find(m => m.metric_type === type);
    return metric ? `${metric.value} ${metric.unit}` : null;
  };

  const getMetricIcon = (type: string) => {
    switch (type) {
      case 'weight': return Scale;
      case 'height': return Ruler;
      case 'blood_pressure': return Heart;
      case 'heart_rate': return Activity;
      case 'temperature': return Thermometer;
      default: return Heart;
    }
  };

  const basicMetrics = [
    { type: 'weight', label: 'Weight', unit: 'kg', icon: Scale },
    { type: 'height', label: 'Height', unit: 'cm', icon: Ruler },
    { type: 'blood_pressure', label: 'Blood Pressure', unit: 'mmHg', icon: Heart },
    { type: 'heart_rate', label: 'Heart Rate', unit: 'bpm', icon: Activity },
  ];

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
          <div className="space-y-4">
            <div className="text-center py-6">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">No Health Metrics Yet</h3>
              <p className="text-sm text-gray-600 mb-4">
                Start tracking your vital signs to monitor your health progress
              </p>
              <Button onClick={handleAddMetric} className="w-full">
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
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {basicMetrics.map((metric) => {
                const IconComponent = metric.icon;
                const value = getLatestMetricValue(metric.type);
                
                return (
                  <div key={metric.type} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                    </div>
                    {value ? (
                      <div className="text-lg font-semibold text-gray-900">{value}</div>
                    ) : (
                      <div className="text-sm text-gray-500">Not recorded</div>
                    )}
                  </div>
                );
              })}
            </div>

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
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeHealthMetrics;
