
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { PersonalizationService, OnboardingData } from '@/services/PersonalizationService';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface PersonalizedInsightsProps {
  onboardingData: OnboardingData | null;
}

interface RealTimeInsight {
  title: string;
  description: string;
  value: string;
  trend?: string;
  color: string;
  icon: any;
}

const PersonalizedInsights = ({ onboardingData }: PersonalizedInsightsProps) => {
  const { user } = useAuth();
  const [insights, setInsights] = useState<RealTimeInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadRealTimeInsights();
    }
  }, [user, onboardingData]);

  const loadRealTimeInsights = async () => {
    if (!user) return;

    try {
      // Get user profile data
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      const realTimeInsights: RealTimeInsight[] = [];

      // Profile completion insight
      const completionFields = [
        'full_name', 'phone_number', 'gender', 'date_of_birth', 
        'state_of_residence', 'address', 'height', 'weight'
      ];
      const completedFields = completionFields.filter(field => profile?.[field]);
      const completionPercentage = Math.round((completedFields.length / completionFields.length) * 100);

      realTimeInsights.push({
        title: 'Profile Completion',
        description: 'Complete your health profile',
        value: `${completionPercentage}%`,
        trend: completionPercentage >= 80 ? 'up' : completionPercentage >= 50 ? 'stable' : undefined,
        color: completionPercentage >= 80 ? 'text-green-600' : completionPercentage >= 50 ? 'text-yellow-600' : 'text-red-600',
        icon: TrendingUp
      });

      // BMI calculation if height and weight are available
      if (profile?.height && profile?.weight) {
        const heightInMeters = profile.height / 100;
        const bmi = profile.weight / (heightInMeters * heightInMeters);
        const bmiCategory = bmi < 18.5 ? 'Underweight' : 
                           bmi < 25 ? 'Normal' : 
                           bmi < 30 ? 'Overweight' : 'Obese';
        
        realTimeInsights.push({
          title: 'BMI Status',
          description: `Body Mass Index: ${bmiCategory}`,
          value: bmi.toFixed(1),
          trend: bmi >= 18.5 && bmi < 25 ? 'stable' : 'down',
          color: bmi >= 18.5 && bmi < 25 ? 'text-green-600' : 'text-orange-600',
          icon: TrendingUp
        });
      }

      // Health data completeness
      const healthFields = ['blood_group', 'genotype', 'allergies', 'chronic_conditions'];
      const completedHealthFields = healthFields.filter(field => {
        const value = profile?.[field];
        return value && (Array.isArray(value) ? value.length > 0 : value);
      });
      const healthCompleteness = Math.round((completedHealthFields.length / healthFields.length) * 100);

      realTimeInsights.push({
        title: 'Health Records',
        description: 'Medical information completeness',
        value: `${healthCompleteness}%`,
        trend: healthCompleteness >= 75 ? 'up' : 'stable',
        color: healthCompleteness >= 75 ? 'text-green-600' : 'text-blue-600',
        icon: TrendingUp
      });

      // Emergency contact status
      const hasEmergencyContact = profile?.emergency_contact_name && profile?.emergency_contact_phone;
      realTimeInsights.push({
        title: 'Emergency Contact',
        description: 'Emergency preparedness',
        value: hasEmergencyContact ? 'Complete' : 'Missing',
        trend: hasEmergencyContact ? 'up' : undefined,
        color: hasEmergencyContact ? 'text-green-600' : 'text-red-600',
        icon: TrendingUp
      });

      // Insurance status
      const hasInsurance = profile?.insurance_provider && profile?.insurance_number;
      realTimeInsights.push({
        title: 'Insurance Status',
        description: 'Health coverage',
        value: hasInsurance ? 'Active' : 'Not Set',
        trend: hasInsurance ? 'up' : undefined,
        color: hasInsurance ? 'text-green-600' : 'text-orange-600',
        icon: TrendingUp
      });

      // Location-based insight
      if (profile?.state_of_residence) {
        realTimeInsights.push({
          title: `Healthcare Access`,
          description: `Available in ${profile.state_of_residence}`,
          value: '15+ facilities',
          trend: 'stable',
          color: 'text-blue-600',
          icon: TrendingUp
        });
      }

      setInsights(realTimeInsights);
    } catch (error) {
      console.error('Error loading real-time insights:', error);
      // Fallback to static insights if there's an error
      const staticInsights = PersonalizationService.getPersonalizedInsights(onboardingData);
      setInsights(staticInsights);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            Your Health Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (insights.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
          Your Real-Time Health Insights
        </CardTitle>
        <p className="text-sm text-gray-600">
          Live insights based on your current health profile
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <insight.icon className={`h-5 w-5 ${insight.color}`} />
                  <h4 className="font-semibold text-gray-900 text-sm">{insight.title}</h4>
                </div>
                {getTrendIcon(insight.trend)}
              </div>
              <div className="space-y-1">
                <p className={`text-2xl font-bold ${insight.color}`}>{insight.value}</p>
                <p className="text-xs text-gray-600">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Complete your profile to unlock more personalized health insights and recommendations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedInsights;
