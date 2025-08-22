import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, HealthMetricCard } from '@/components/ui/enhanced/Card';
import { Button } from '@/components/ui/enhanced/Button';
import { 
  Activity, 
  Heart, 
  Calendar,
  TrendingUp,
  Bell,
  Plus,
  ArrowRight,
  Sparkles,
  Brain,
  Shield,
  Clock,
  Users,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HealthMetric {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  trend: 'up' | 'down' | 'stable';
  status: 'excellent' | 'good' | 'fair' | 'poor';
  lastUpdated: string;
}

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  urgent?: boolean;
  badge?: string;
}

interface HealthInsight {
  id: string;
  type: 'recommendation' | 'alert' | 'achievement' | 'reminder';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  actionLabel?: string;
  actionPath?: string;
  priority: 'high' | 'medium' | 'low';
}

const ModernDashboard: React.FC = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [healthMetrics] = useState<HealthMetric[]>([
    {
      id: 'heart-rate',
      label: 'Heart Rate',
      value: 72,
      unit: 'bpm',
      trend: 'stable',
      status: 'good',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'blood-pressure',
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      trend: 'stable',
      status: 'excellent',
      lastUpdated: '1 day ago'
    },
    {
      id: 'steps',
      label: 'Daily Steps',
      value: '8,429',
      unit: 'steps',
      trend: 'up',
      status: 'good',
      lastUpdated: 'Just now'
    },
    {
      id: 'sleep',
      label: 'Sleep Quality',
      value: 85,
      unit: '%',
      trend: 'up',
      status: 'good',
      lastUpdated: 'Last night'
    }
  ]);

  const [quickActions] = useState<QuickAction[]>([
    {
      id: 'book-appointment',
      label: 'Book Appointment',
      description: 'Schedule with healthcare providers',
      icon: Calendar,
      path: '/appointments',
      badge: '3 available'
    },
    {
      id: 'ai-symptom-check',
      label: 'AI Symptom Checker',
      description: 'Quick health assessment',
      icon: Brain,
      path: '/ai-assistant',
      badge: 'Smart'
    },
    {
      id: 'emergency',
      label: 'Emergency SOS',
      description: 'Immediate medical help',
      icon: Zap,
      path: '/emergency',
      urgent: true
    },
    {
      id: 'medication',
      label: 'Medications',
      description: 'View and refill prescriptions',
      icon: Shield,
      path: '/pharmacy',
      badge: '2 due'
    },
    {
      id: 'telemedicine',
      label: 'Video Consultation',
      description: 'Connect with doctors online',
      icon: Activity,
      path: '/telemedicine',
      badge: '24/7'
    },
    {
      id: 'health-records',
      label: 'Health Records',
      description: 'Access medical history',
      icon: Heart,
      path: '/records'
    }
  ]);

  const [healthInsights] = useState<HealthInsight[]>([
    {
      id: 'checkup-reminder',
      type: 'reminder',
      title: 'Annual Checkup Due',
      description: 'Your last checkup was 11 months ago',
      icon: Calendar,
      actionLabel: 'Schedule Now',
      actionPath: '/appointments',
      priority: 'high'
    },
    {
      id: 'activity-achievement',
      type: 'achievement',
      title: 'Step Goal Achieved!',
      description: 'You\'ve reached your daily step goal for 7 days straight',
      icon: TrendingUp,
      priority: 'medium'
    },
    {
      id: 'medication-reminder',
      type: 'alert',
      title: 'Prescription Refill Needed',
      description: 'Your blood pressure medication will run out in 3 days',
      icon: Shield,
      actionLabel: 'Refill Now',
      actionPath: '/pharmacy',
      priority: 'high'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getInsightColor = (type: HealthInsight['type'], priority: HealthInsight['priority']) => {
    if (priority === 'high') return 'border-red-200 bg-red-50';
    if (type === 'achievement') return 'border-green-200 bg-green-50';
    if (type === 'alert') return 'border-yellow-200 bg-yellow-50';
    return 'border-blue-200 bg-blue-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      {/* Header Section */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-200/50">
        <div className="container-wide py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                {getGreeting()}, {user?.email?.split('@')[0] || 'there'}!
              </h1>
              <p className="text-neutral-600">
                Your health dashboard • {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </Button>
              <Button 
                leftIcon={<Sparkles className="h-4 w-4" />}
                className="shadow-lg"
              >
                AI Health Insights
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide py-8 space-y-8">
        {/* Health Metrics Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Health Metrics</h2>
              <p className="text-sm text-neutral-600">Real-time overview of your vital signs</p>
            </div>
            <Button variant="outline" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Add Metric
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthMetrics.map((metric) => (
              <HealthMetricCard
                key={metric.id}
                metric={metric.label}
                value={metric.value}
                unit={metric.unit}
                trend={metric.trend}
                status={metric.status}
                className="animate-fade-in hover:scale-105 transition-transform duration-200"
              >
                <div className="mt-3 pt-3 border-t border-neutral-200/50">
                  <p className="text-xs text-neutral-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Updated {metric.lastUpdated}
                  </p>
                </div>
              </HealthMetricCard>
            ))}
          </div>
        </section>

        {/* Health Insights */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Health Insights</h2>
              <p className="text-sm text-neutral-600">Personalized recommendations and alerts</p>
            </div>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {healthInsights.map((insight) => (
              <Card
                key={insight.id}
                variant="interactive"
                className={cn(
                  'animate-fade-in',
                  getInsightColor(insight.type, insight.priority)
                )}
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <insight.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{insight.title}</CardTitle>
                      <p className="text-sm text-neutral-600 mt-1">{insight.description}</p>
                    </div>
                  </div>
                </CardHeader>
                {insight.actionLabel && (
                  <CardContent>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      fullWidth
                      className="mt-2"
                    >
                      {insight.actionLabel}
                    </Button>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Quick Actions</h2>
              <p className="text-sm text-neutral-600">Common healthcare tasks and services</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action) => (
              <Card
                key={action.id}
                variant="interactive"
                className={cn(
                  'animate-fade-in cursor-pointer group',
                  action.urgent && 'ring-2 ring-red-200 bg-gradient-to-br from-red-50 to-red-100/50'
                )}
                size="sm"
              >
                <CardContent className="text-center space-y-3">
                  <div className={cn(
                    'w-12 h-12 mx-auto rounded-xl flex items-center justify-center shadow-sm',
                    action.urgent 
                      ? 'bg-gradient-to-br from-red-500 to-red-600' 
                      : 'bg-gradient-to-br from-primary-500 to-primary-600 group-hover:from-primary-600 group-hover:to-primary-700'
                  )}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-medium text-sm text-neutral-900 leading-tight">
                      {action.label}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-tight">
                      {action.description}
                    </p>
                    {action.badge && (
                      <span className={cn(
                        'inline-block px-2 py-0.5 text-xs rounded-full',
                        action.urgent
                          ? 'bg-red-200 text-red-800'
                          : 'bg-primary-100 text-primary-800'
                      )}>
                        {action.badge}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section>
          <Card variant="gradient" className="animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary-600" />
                    Upcoming Appointments
                  </CardTitle>
                  <p className="text-sm text-neutral-600 mt-1">
                    Your scheduled healthcare visits
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Calendar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Dr. Sarah Johnson</p>
                      <p className="text-xs text-neutral-600">General Checkup</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Tomorrow</p>
                    <p className="text-xs text-neutral-600">2:30 PM</p>
                  </div>
                </div>
                
                <div className="text-center py-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    leftIcon={<Plus className="h-4 w-4" />}
                  >
                    Schedule New Appointment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default ModernDashboard;