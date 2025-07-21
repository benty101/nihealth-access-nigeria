import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Target,
  Activity,
  Bell
} from 'lucide-react';

interface PreventiveInsightsProps {
  onboardingData: any;
}

export const PreventiveInsights: React.FC<PreventiveInsightsProps> = ({ onboardingData }) => {
  const [preventiveActions, setPreventiveActions] = useState([]);
  const [healthScore, setHealthScore] = useState(0);
  const [upcomingCare, setUpcomingCare] = useState([]);

  useEffect(() => {
    // Mock preventive care data
    setPreventiveActions([
      {
        id: '1',
        title: 'Annual Physical Exam',
        status: 'due',
        dueDate: '2025-08-15',
        priority: 'high',
        category: 'screening',
        description: 'Comprehensive health assessment due',
        completed: false
      },
      {
        id: '2',
        title: 'Blood Pressure Check',
        status: 'overdue',
        dueDate: '2025-07-01',
        priority: 'high',
        category: 'monitoring',
        description: 'Regular BP monitoring for hypertension',
        completed: false
      },
      {
        id: '3',
        title: 'Cholesterol Screening',
        status: 'completed',
        dueDate: '2025-06-15',
        priority: 'medium',
        category: 'screening',
        description: 'Lipid panel results reviewed',
        completed: true
      },
      {
        id: '4',
        title: 'Flu Vaccination',
        status: 'upcoming',
        dueDate: '2025-09-01',
        priority: 'medium',
        category: 'immunization',
        description: 'Annual influenza vaccine',
        completed: false
      }
    ]);

    setUpcomingCare([
      {
        title: 'Mammogram Screening',
        dueDate: '2025-12-01',
        reason: 'Age-appropriate screening'
      },
      {
        title: 'Colonoscopy',
        dueDate: '2026-03-15',
        reason: 'Routine screening at age 45+'
      }
    ]);

    // Calculate health score based on completed preventive actions
    const completed = preventiveActions.filter(action => action.completed).length;
    const total = preventiveActions.length;
    setHealthScore(total > 0 ? Math.round((completed / total) * 100) : 75);
  }, [preventiveActions]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'due': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'due': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'upcoming': return <Calendar className="w-4 h-4 text-blue-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <div className="space-y-4">
      {/* Preventive Health Score */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-primary" />
            Preventive Health Score
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">{healthScore}%</div>
            <p className="text-xs text-muted-foreground">Prevention compliance</p>
          </div>
          <Progress value={healthScore} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Keep up the good work!</span>
            <span className="font-medium">Target: 85%</span>
          </div>
        </CardContent>
      </Card>

      {/* Current Preventive Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Target className="w-4 h-4 text-primary" />
            Action Items
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {preventiveActions
            .filter(action => !action.completed)
            .sort((a, b) => {
              const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
              return priorityOrder[b.priority] - priorityOrder[a.priority];
            })
            .slice(0, 4)
            .map((action) => (
              <div key={action.id} className={`p-3 rounded-lg border-l-4 bg-card ${getPriorityColor(action.priority)}`}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getStatusIcon(action.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium">{action.title}</h4>
                      <Badge className={getStatusColor(action.status)}>
                        {action.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{action.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Due: {new Date(action.dueDate).toLocaleDateString()}
                      </span>
                      <Button variant="outline" size="sm" className="text-xs">
                        Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          
          {preventiveActions.filter(action => !action.completed).length === 0 && (
            <div className="text-center py-4">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-600">All caught up!</p>
              <p className="text-xs text-muted-foreground">Your preventive care is up to date</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Preventive Care */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            Future Care Planning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingCare.map((care, index) => (
            <div key={index} className="p-3 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium">{care.title}</h4>
                <span className="text-xs text-muted-foreground">
                  {new Date(care.dueDate).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{care.reason}</p>
              <Button variant="outline" size="sm" className="mt-2 text-xs">
                <Bell className="w-3 h-3 mr-1" />
                Set Reminder
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <Shield className="w-6 h-6 text-green-600 mx-auto" />
            <h4 className="text-sm font-semibold">Stay Protected</h4>
            <p className="text-xs text-muted-foreground">
              Book your preventive care appointments
            </p>
            <Button size="sm" className="w-full">
              <Calendar className="w-3 h-3 mr-1" />
              Schedule Preventive Care
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};