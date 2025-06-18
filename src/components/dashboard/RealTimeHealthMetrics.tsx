
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Activity, TrendingUp, Plus, AlertCircle, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface HealthMetric {
  type: string;
  value: string;
  lastUpdated: string;
  status: 'current' | 'outdated' | 'missing';
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
      const { data: profile } = await supabase
        .from('profiles')
        .select('blood_group, genotype, date_of_birth, updated_at')
        .eq('id', user.id)
        .single();

      const metricsData: HealthMetric[] = [];

      // Blood Group
      if (profile?.blood_group) {
        metricsData.push({
          type: 'Blood Group',
          value: profile.blood_group,
          lastUpdated: profile.updated_at || 'Unknown',
          status: 'current'
        });
      } else {
        metricsData.push({
          type: 'Blood Group',
          value: 'Not provided',
          lastUpdated: 'Never',
          status: 'missing'
        });
      }

      // Genotype
      if (profile?.genotype) {
        metricsData.push({
          type: 'Genotype',
          value: profile.genotype,
          lastUpdated: profile.updated_at || 'Unknown',
          status: 'current'
        });
      } else {
        metricsData.push({
          type: 'Genotype',
          value: 'Not provided',
          lastUpdated: 'Never',
          status: 'missing'
        });
      }

      // Age (calculated from date_of_birth)
      if (profile?.date_of_birth) {
        const age = new Date().getFullYear() - new Date(profile.date_of_birth).getFullYear();
        metricsData.push({
          type: 'Age',
          value: `${age} years`,
          lastUpdated: profile.updated_at || 'Unknown',
          status: 'current'
        });
      } else {
        metricsData.push({
          type: 'Age',
          value: 'Not provided',
          lastUpdated: 'Never',
          status: 'missing'
        });
      }

      setMetrics(metricsData);
    } catch (error) {
      console.error('Error loading health metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMetrics = () => {
    navigate('/profile');
    toast({
      title: "Complete Health Profile",
      description: "Add your health information to get personalized recommendations",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'text-green-600';
      case 'outdated': return 'text-yellow-600';
      case 'missing': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-800';
      case 'outdated': return 'bg-yellow-100 text-yellow-800';
      case 'missing': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const missingMetrics = metrics.filter(m => m.status === 'missing').length;

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
        <div>
          <h3 className="text-lg font-semibold">Your Health Profile</h3>
          {missingMetrics > 0 && (
            <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="h-4 w-4" />
              {missingMetrics} metric{missingMetrics > 1 ? 's' : ''} missing
            </p>
          )}
        </div>
        {missingMetrics > 0 && (
          <Button onClick={handleAddMetrics} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Complete Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className={`border-l-4 ${
            metric.status === 'current' ? 'border-l-green-500' :
            metric.status === 'outdated' ? 'border-l-yellow-500' : 'border-l-red-500'
          }`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.type}</CardTitle>
              {metric.type === 'Blood Group' && <Heart className="h-4 w-4 text-red-500" />}
              {metric.type === 'Genotype' && <Activity className="h-4 w-4 text-blue-500" />}
              {metric.type === 'Age' && <Calendar className="h-4 w-4 text-green-500" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2 flex items-center gap-2">
                <span className={getStatusColor(metric.status)}>{metric.value}</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge className={`text-xs ${getStatusBadge(metric.status)}`}>
                  {metric.status === 'missing' ? 'Add this' : 
                   metric.status === 'outdated' ? 'Update needed' : 'Current'}
                </Badge>
                {metric.status !== 'missing' && (
                  <p className="text-xs text-muted-foreground">
                    Updated: {new Date(metric.lastUpdated).toLocaleDateString()}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {missingMetrics > 0 && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <h4 className="font-medium text-orange-900">Complete Your Health Profile</h4>
                <p className="text-sm text-orange-700 mt-1">
                  Adding your health information helps us provide personalized recommendations and better care.
                </p>
              </div>
              <Button onClick={handleAddMetrics} size="sm">
                Add Health Info
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RealTimeHealthMetrics;
