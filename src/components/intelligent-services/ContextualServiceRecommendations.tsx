import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Calendar, 
  TestTube, 
  Pill, 
  Heart,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react';
import { HealthIntelligenceEngine } from '@/core/HealthIntelligenceEngine';
import { PersonalizationService } from '@/services/PersonalizationService';
import { Link } from 'react-router-dom';

interface ContextualServiceProps {
  healthContext?: any;
  conversationTriggers?: string[];
}

const ContextualServiceRecommendations: React.FC<ContextualServiceProps> = ({ 
  healthContext, 
  conversationTriggers = [] 
}) => {
  const [healthEngine] = useState(() => HealthIntelligenceEngine.getInstance());
  const [contextualServices, setContextualServices] = useState<any[]>([]);
  const [urgentRecommendations, setUrgentRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateContextualRecommendations();
  }, [healthContext, conversationTriggers]);

  const generateContextualRecommendations = async () => {
    setIsLoading(true);
    try {
      const onboardingData = PersonalizationService.getOnboardingData();
      const services = healthEngine.getContextualServices();
      
      // Prioritize insurance if not covered
      let urgent = [];
      if (!onboardingData?.hasInsurance) {
        urgent.push({
          id: 'urgent_insurance',
          title: '⚠️ Critical: Get Health Insurance',
          description: 'You\'re unprotected! Medical emergencies cost ₦500k-₦2M+. Get covered now.',
          action: '/insurance',
          actionLabel: 'Get Protected Now',
          priority: 'critical',
          estimatedCost: 'From ₦8,000/year',
          urgencyScore: 10,
          icon: Shield,
          bgClass: 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200',
          buttonClass: 'bg-red-500 hover:bg-red-600 text-white'
        });
      }

      // Smart contextual services based on conversation and health profile
      let contextual = services.slice(0, 4).map(service => ({
        id: service.id,
        title: service.label,
        description: service.description,
        action: getServiceRoute(service.service_type),
        actionLabel: 'Book Now',
        priority: service.priority > 3 ? 'high' : 'medium',
        estimatedCost: service.estimated_cost,
        estimatedTime: service.estimated_time,
        icon: getServiceIcon(service.service_type),
        bgClass: getServiceBgClass(service.service_type),
        buttonClass: 'bg-primary hover:bg-primary/90 text-primary-foreground'
      }));

      // Add AI-powered recommendations based on intelligence level
      if (healthContext?.intelligence_level > 50) {
        contextual.unshift({
          id: 'ai_health_insights',
          title: '🧠 AI-Powered Health Insights',
          description: 'Get personalized health predictions and risk assessments powered by advanced AI.',
          action: '/health-insights',
          actionLabel: 'View Insights',
          priority: 'high',
          estimatedCost: 'Free Premium Feature',
          estimatedTime: 'Immediate access',
          icon: Brain,
          bgClass: 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200',
          buttonClass: 'bg-purple-500 hover:bg-purple-600 text-white'
        });
      }

      setUrgentRecommendations(urgent);
      setContextualServices(contextual);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getServiceRoute = (serviceType: string) => {
    switch (serviceType) {
      case 'appointment': return '/appointments';
      case 'lab_test': return '/labs';
      case 'pharmacy': return '/pharmacy';
      case 'insurance': return '/insurance';
      case 'emergency': return '/emergency';
      default: return '/dashboard';
    }
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'appointment': return Calendar;
      case 'lab_test': return TestTube;
      case 'pharmacy': return Pill;
      case 'insurance': return Shield;
      case 'emergency': return Heart;
      default: return Sparkles;
    }
  };

  const getServiceBgClass = (serviceType: string) => {
    switch (serviceType) {
      case 'appointment': return 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200';
      case 'lab_test': return 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200';
      case 'pharmacy': return 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200';
      case 'insurance': return 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200';
      case 'emergency': return 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200';
      default: return 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-20 bg-gray-200 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Urgent Recommendations */}
      {urgentRecommendations.length > 0 && (
        <Card className="border-2 border-red-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              Urgent Action Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {urgentRecommendations.map((rec) => (
              <div key={rec.id} className={`p-4 rounded-lg border-2 ${rec.bgClass}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                      <rec.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-red-800">{rec.title}</h4>
                      <p className="text-sm text-red-700">{rec.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-red-100 text-red-800 border-red-300">
                    Priority
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-red-600">
                    <span className="font-medium">Starting from:</span> {rec.estimatedCost}
                  </div>
                  <Link to={rec.action}>
                    <Button className={rec.buttonClass} size="sm">
                      <Zap className="w-4 h-4 mr-2" />
                      {rec.actionLabel}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Contextual Services */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Smart Recommendations
            <Badge variant="outline" className="ml-auto">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {contextualServices.slice(0, 3).map((service) => (
            <div key={service.id} className={`p-3 rounded-lg border ${service.bgClass}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/80 rounded-lg flex items-center justify-center">
                    <service.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{service.title}</h4>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </div>
                </div>
                <Badge 
                  className={
                    service.priority === 'high' 
                      ? 'bg-orange-100 text-orange-800' 
                      : 'bg-blue-100 text-blue-800'
                  }
                >
                  {service.priority}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  {service.estimatedCost && <span>Cost: {service.estimatedCost}</span>}
                  {service.estimatedTime && <span className="ml-3">Time: {service.estimatedTime}</span>}
                </div>
                <Link to={service.action}>
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    {service.actionLabel}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
          
          {/* Intelligence Progress */}
          <div className="mt-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-emerald-800">Health Intelligence Level</span>
              <span className="text-sm text-emerald-600">{healthContext?.intelligence_level || 0}%</span>
            </div>
            <Progress value={healthContext?.intelligence_level || 0} className="h-2 mb-2" />
            <p className="text-xs text-emerald-700">
              Complete your health profile to unlock more personalized recommendations!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContextualServiceRecommendations;