
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface HealthMetric {
  id: string;
  metric_type: string;
  value: number;
  unit: string;
  recorded_at: string;
}

export const useHealthMetrics = () => {
  const { user } = useAuth();
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
      // Get health data from the profile with the new height and weight columns
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('height, weight, updated_at')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      // Convert profile data to health metrics format
      const profileMetrics: HealthMetric[] = [];
      
      if (profile?.height) {
        profileMetrics.push({
          id: 'height',
          metric_type: 'height',
          value: profile.height,
          unit: 'cm',
          recorded_at: profile.updated_at || new Date().toISOString()
        });
      }

      if (profile?.weight) {
        profileMetrics.push({
          id: 'weight',
          metric_type: 'weight',
          value: profile.weight,
          unit: 'kg',
          recorded_at: profile.updated_at || new Date().toISOString()
        });
      }

      setMetrics(profileMetrics);
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

  return {
    metrics,
    loading,
    getLatestMetricValue,
    loadHealthMetrics
  };
};
