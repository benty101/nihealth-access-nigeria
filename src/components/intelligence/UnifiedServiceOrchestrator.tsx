import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  TestTube, 
  Pill, 
  Stethoscope,
  Brain,
  ShoppingCart,
  Clock,
  CheckCircle,
  ArrowRight,
  Zap,
  Building2
} from 'lucide-react';

interface UnifiedServiceOrchestratorProps {
  onboardingData: any;
  intelligenceLevel: number;
}

interface ServiceRecommendation {
  id: string;
  type: 'appointment' | 'lab' | 'medication' | 'telemedicine' | 'insurance';
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  aiConfidence: number;
  estimatedCost: string;
  timeframe: string;
  provider?: string;
  nextSteps: string[];
}

export const UnifiedServiceOrchestrator: React.FC<UnifiedServiceOrchestratorProps> = ({
  onboardingData,
  intelligenceLevel
}) => {
  const [recommendations, setRecommendations] = useState<ServiceRecommendation[]>([]);
  const [activeService, setActiveService] = useState('smart_recommendations');
  const [orchestrationMode, setOrchestrationMode] = useState<'reactive' | 'predictive' | 'preventive'>('reactive');

  useEffect(() => {
    generateIntelligentRecommendations();
  }, [onboardingData, intelligenceLevel, orchestrationMode]);

  const generateIntelligentRecommendations = () => {
    // AI-powered service orchestration based on user data and intelligence level
    const smartRecommendations: ServiceRecommendation[] = [];

    // High-priority health maintenance (always recommended)
    smartRecommendations.push({
      id: 'annual_checkup',
      type: 'appointment',
      title: 'Annual Health Assessment',
      description: 'Comprehensive health review with preventive care focus',
      urgency: 'medium',
      aiConfidence: 95,
      estimatedCost: '₦15,000 - ₦25,000',
      timeframe: 'Next 30 days',
      provider: 'UCTH / Lagos University Teaching Hospital',
      nextSteps: ['Book appointment', 'Prepare health summary', 'Update insurance']
    });

    // Intelligence-based recommendations
    if (intelligenceLevel > 50) {
      smartRecommendations.push({
        id: 'predictive_labs',
        type: 'lab',
        title: 'Predictive Health Panel',
        description: 'AI-recommended tests based on your health patterns',
        urgency: 'low',
        aiConfidence: 87,
        estimatedCost: '₦8,000 - ₦12,000',
        timeframe: 'Next 60 days',
        provider: 'Synlab Nigeria / Clina-Lancet',
        nextSteps: ['Review test list', 'Schedule collection', 'Fast for 12 hours']
      });
    }

    // Medication optimization (if applicable)
    if (onboardingData?.healthConditions?.length > 0) {
      smartRecommendations.push({
        id: 'medication_review',
        type: 'medication',
        title: 'Medication Optimization',
        description: 'AI-powered review of current medications for efficiency',
        urgency: 'medium',
        aiConfidence: 92,
        estimatedCost: '₦2,000 - ₦5,000',
        timeframe: 'This week',
        provider: 'MedPlus / HealthPlus Pharmacy',
        nextSteps: ['Gather current medications', 'Consult pharmacist', 'Update regimen']
      });
    }

    // Telemedicine for convenience
    smartRecommendations.push({
      id: 'teleconsult',
      type: 'telemedicine',
      title: 'Virtual Health Check-in',
      description: 'Quick consultation with certified doctor via video',
      urgency: 'low',
      aiConfidence: 78,
      estimatedCost: '₦3,000 - ₦8,000',
      timeframe: 'Today',
      provider: 'Telemedicine Nigeria / MyMedicines',
      nextSteps: ['Choose time slot', 'Prepare questions', 'Test video connection']
    });

    // Insurance optimization
    smartRecommendations.push({
      id: 'insurance_upgrade',
      type: 'insurance',
      title: 'Health Insurance Review',
      description: 'Optimize coverage based on your health profile',
      urgency: 'low',
      aiConfidence: 65,
      estimatedCost: 'Variable',
      timeframe: 'Next quarter',
      provider: 'NHIS / Private Insurance Partners',
      nextSteps: ['Compare plans', 'Review benefits', 'Update coverage']
    });

    setRecommendations(smartRecommendations);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar className="w-5 h-5" />;
      case 'lab': return <TestTube className="w-5 h-5" />;
      case 'medication': return <Pill className="w-5 h-5" />;
      case 'telemedicine': return <Stethoscope className="w-5 h-5" />;
      case 'insurance': return <Building2 className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const handleServiceAction = (serviceId: string, action: string) => {
    console.log(`Executing ${action} for service ${serviceId}`);
    // This would integrate with actual booking/service systems
  };

  return (
    <div className="space-y-4">
      {/* Orchestration Header */}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4 text-primary" />
            Intelligent Service Orchestration
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              AI {intelligenceLevel}%
            </Badge>
            <select 
              value={orchestrationMode}
              onChange={(e) => setOrchestrationMode(e.target.value as any)}
              className="text-xs border rounded px-2 py-1"
            >
              <option value="reactive">Reactive</option>
              <option value="predictive">Predictive</option>
              <option value="preventive">Preventive</option>
            </select>
          </div>
        </div>
      </CardHeader>

      {/* Service Orchestration Tabs */}
      <Tabs value={activeService} onValueChange={setActiveService} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="smart_recommendations" className="text-xs">
            <Brain className="w-3 h-3 mr-1" />
            Smart Rec
          </TabsTrigger>
          <TabsTrigger value="quick_actions" className="text-xs">
            <Zap className="w-3 h-3 mr-1" />
            Quick Book
          </TabsTrigger>
          <TabsTrigger value="service_status" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            Status
          </TabsTrigger>
        </TabsList>

        {/* Smart Recommendations */}
        <TabsContent value="smart_recommendations" className="space-y-3 mt-4">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                    {getServiceIcon(rec.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-sm">{rec.title}</h4>
                      <Badge className={getUrgencyColor(rec.urgency)}>
                        {rec.urgency}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-3">{rec.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div>
                        <span className="font-medium">Cost: </span>
                        <span>{rec.estimatedCost}</span>
                      </div>
                      <div>
                        <span className="font-medium">Timeline: </span>
                        <span>{rec.timeframe}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Provider: </span>
                        <span>{rec.provider}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">AI Confidence:</span>
                        <Progress value={rec.aiConfidence} className="w-16 h-1" />
                        <span className="text-xs font-medium">{rec.aiConfidence}%</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleServiceAction(rec.id, 'book')}
                        className="text-xs"
                      >
                        Book Now
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleServiceAction(rec.id, 'details')}
                        className="text-xs"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Quick Actions */}
        <TabsContent value="quick_actions" className="space-y-3 mt-4">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Calendar className="w-6 h-6 mb-1" />
              <span className="text-xs">Book Appointment</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <TestTube className="w-6 h-6 mb-1" />
              <span className="text-xs">Order Lab Tests</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Pill className="w-6 h-6 mb-1" />
              <span className="text-xs">Find Medication</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Stethoscope className="w-6 h-6 mb-1" />
              <span className="text-xs">Teleconsultation</span>
            </Button>
          </div>
        </TabsContent>

        {/* Service Status */}
        <TabsContent value="service_status" className="space-y-3 mt-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Lab Results Ready</p>
                  <p className="text-xs text-muted-foreground">Blood panel from last week</p>
                </div>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Appointment Pending</p>
                  <p className="text-xs text-muted-foreground">Dr. Adebayo - Tomorrow 2:00 PM</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Medication Order</p>
                  <p className="text-xs text-muted-foreground">Lisinopril 10mg - In transit</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Track</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};