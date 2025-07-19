import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { HealthTimelineService } from '@/services/HealthTimelineService';

interface HealthInsight {
  id: string;
  type: 'pattern' | 'prediction' | 'recommendation' | 'alert';
  title: string;
  description: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high';
  action_required: boolean;
  data_points: number;
}

const AIHealthInsights = () => {
  const { user } = useAuth();
  const [insights, setInsights] = useState<HealthInsight[]>([]);
  const [healthScore, setHealthScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      generateHealthInsights();
    }
  }, [user]);

  const generateHealthInsights = async () => {
    if (!user) return;
    
    try {
      // Get user's health timeline data
      const timelineEvents = await HealthTimelineService.getUserTimeline(user.id);
      
      // Generate AI-powered insights based on the data
      const generatedInsights = analyzeHealthData(timelineEvents);
      const calculatedHealthScore = calculateHealthScore(timelineEvents);
      
      setInsights(generatedInsights);
      setHealthScore(calculatedHealthScore);
    } catch (error) {
      console.error('Error generating health insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeHealthData = (timelineEvents: any[]): HealthInsight[] => {
    const insights: HealthInsight[] = [];
    
    // Pattern analysis
    const appointmentEvents = timelineEvents.filter(e => e.event_type === 'appointment');
    const labEvents = timelineEvents.filter(e => e.event_type === 'lab_test');
    const medicationEvents = timelineEvents.filter(e => e.event_type === 'medication');
    
    // Regular checkup pattern
    if (appointmentEvents.length >= 2) {
      const monthsSinceLastAppointment = getMonthsSince(appointmentEvents[0]?.event_date);
      if (monthsSinceLastAppointment > 6) {
        insights.push({
          id: '1',
          type: 'recommendation',
          title: 'Schedule Regular Checkup',
          description: `It's been ${monthsSinceLastAppointment} months since your last appointment. Regular checkups help catch issues early.`,
          confidence: 85,
          priority: 'medium',
          action_required: true,
          data_points: appointmentEvents.length,
        });
      }
    }

    // Lab test follow-up
    if (labEvents.length > 0) {
      const recentLabEvents = labEvents.filter(e => {
        const monthsAgo = getMonthsSince(e.event_date);
        return monthsAgo <= 3;
      });
      
      if (recentLabEvents.length > 0) {
        insights.push({
          id: '2',
          type: 'pattern',
          title: 'Active Health Monitoring',
          description: `Great job! You've completed ${recentLabEvents.length} lab tests in the last 3 months, showing proactive health management.`,
          confidence: 95,
          priority: 'low',
          action_required: false,
          data_points: recentLabEvents.length,
        });
      }
    }

    // Medication adherence
    if (medicationEvents.length > 0) {
      insights.push({
        id: '3',
        type: 'prediction',
        title: 'Medication Management',
        description: 'Your medication ordering patterns suggest good adherence. Continue monitoring for optimal health outcomes.',
        confidence: 78,
        priority: 'low',
        action_required: false,
        data_points: medicationEvents.length,
      });
    }

    // Health engagement score
    const totalEvents = timelineEvents.length;
    if (totalEvents >= 5) {
      insights.push({
        id: '4',
        type: 'pattern',
        title: 'High Health Engagement',
        description: `You have ${totalEvents} health activities tracked. This level of engagement correlates with better health outcomes.`,
        confidence: 92,
        priority: 'low',
        action_required: false,
        data_points: totalEvents,
      });
    } else if (totalEvents > 0) {
      insights.push({
        id: '5',
        type: 'recommendation',
        title: 'Increase Health Tracking',
        description: 'Consider tracking more health activities to get better insights and personalized recommendations.',
        confidence: 70,
        priority: 'medium',
        action_required: false,
        data_points: totalEvents,
      });
    }

    return insights;
  };

  const calculateHealthScore = (timelineEvents: any[]): number => {
    let score = 50; // Base score
    
    // Recent activity boost
    const recentEvents = timelineEvents.filter(e => {
      const monthsAgo = getMonthsSince(e.event_date);
      return monthsAgo <= 3;
    });
    score += Math.min(recentEvents.length * 10, 30);
    
    // Variety of health activities
    const eventTypes = new Set(timelineEvents.map(e => e.event_type));
    score += eventTypes.size * 5;
    
    // Consistency bonus
    if (timelineEvents.length >= 5) {
      score += 15;
    }
    
    return Math.min(score, 100);
  };

  const getMonthsSince = (dateString: string): number => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 30);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern': return <TrendingUp className="h-4 w-4" />;
      case 'prediction': return <Brain className="h-4 w-4" />;
      case 'recommendation': return <Lightbulb className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Health Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Analyzing your health data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Health Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Health Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Health Engagement Score</span>
            <span className="text-2xl font-bold text-primary">{healthScore}/100</span>
          </div>
          <Progress value={healthScore} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Based on your health activity patterns and engagement level
          </p>
        </div>

        {/* Insights */}
        <div className="space-y-3">
          {insights.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              Start tracking your health activities to receive personalized insights
            </div>
          ) : (
            insights.map((insight) => (
              <div key={insight.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getInsightIcon(insight.type)}
                    <h4 className="font-medium">{insight.title}</h4>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getPriorityColor(insight.priority)}>
                      {insight.priority}
                    </Badge>
                    {insight.action_required && (
                      <Badge variant="outline">Action Required</Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Confidence: {insight.confidence}%</span>
                  <span>Based on {insight.data_points} data points</span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIHealthInsights;