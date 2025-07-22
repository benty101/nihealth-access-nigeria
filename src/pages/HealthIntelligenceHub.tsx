import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { HealthTimelineHub } from '@/components/health-timeline/HealthTimelineHub';
import { IntelligencePanel } from '@/components/intelligence/IntelligencePanel';
import { CommunityHealthPanel } from '@/components/community/CommunityHealthPanel';
import { PreventiveInsights } from '@/components/preventive/PreventiveInsights';
import { UnifiedServiceOrchestrator } from '@/components/intelligence/UnifiedServiceOrchestrator';
import { HealthIntelligenceChat } from '@/components/intelligence/HealthIntelligenceChat';
import { GovernmentIntegrationPanel } from '@/components/government/GovernmentIntegrationPanel';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalizationService } from '@/services/PersonalizationService';
import { 
  Activity, 
  Brain, 
  Users, 
  Shield, 
  TrendingUp, 
  MessageSquare,
  Building2,
  Sparkles
} from 'lucide-react';

/**
 * HEALTH INTELLIGENCE HUB - The Core Experience
 * 
 * This is the revolutionary new primary interface that replaces traditional dashboard.
 * It embodies the "Health Intelligence OS" concept from our white paper:
 * 
 * 1. Timeline-First Architecture: Your health story is the center
 * 2. Ambient Intelligence: AI learns from every interaction
 * 3. Service Orchestration: All services intelligently connected
 * 4. Government Integration: NABDA partnership visible and functional
 * 5. Community Health: Family/population health insights
 * 6. Commercial Integration: Services naturally embedded in workflow
 */
const HealthIntelligenceHub = () => {
  const [onboardingData, setOnboardingData] = useState(null);
  const [activeIntelligenceMode, setActiveIntelligenceMode] = useState('overview');
  const [intelligenceLevel, setIntelligenceLevel] = useState(25);

  useEffect(() => {
    const data = PersonalizationService.getOnboardingData();
    setOnboardingData(data);
    
    // Calculate intelligence level based on data completeness
    if (data) {
      const completeness = calculateDataCompleteness(data);
      setIntelligenceLevel(completeness);
    }
  }, []);

  const calculateDataCompleteness = (data: any) => {
    if (!data) return 25;
    
    let score = 25; // Base score for having onboarding data
    
    // Add points for different data types
    if (data.personalInfo) score += 15;
    if (data.healthConditions && data.healthConditions.length > 0) score += 20;
    if (data.familyHistory) score += 15;
    if (data.lifestyle) score += 10;
    if (data.goals && data.goals.length > 0) score += 15;
    
    return Math.min(score, 100);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Intelligent Header - Contextual and Dynamic */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-primary" />
                Your Health Intelligence
              </h1>
              <p className="text-muted-foreground">
                AI-powered insights • Real-time intelligence • Predictive care • Government-backed
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{intelligenceLevel}%</div>
              <p className="text-xs text-muted-foreground">Intelligence Level</p>
            </div>
          </div>
        </div>

        {/* Core Intelligence Grid - The Revolutionary Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* PRIMARY: Health Timeline & Intelligence Chat - The Center of Everything */}
          <div className="xl:col-span-8 space-y-6">
            
            {/* Conversational AI Interface - Primary Interaction Method */}
            <Card className="h-[300px] p-0 overflow-hidden border-primary/20">
              <HealthIntelligenceChat 
                onboardingData={onboardingData}
                intelligenceLevel={intelligenceLevel}
              />
            </Card>

            {/* Unified Service Orchestrator - Smart Service Integration */}
            <Card className="p-0 overflow-hidden">
              <UnifiedServiceOrchestrator 
                onboardingData={onboardingData}
                intelligenceLevel={intelligenceLevel}
              />
            </Card>

            {/* Health Timeline Hub - The Complete Story */}
            <Card className="h-[500px] p-0 overflow-hidden">
              <HealthTimelineHub onboardingData={onboardingData} />
            </Card>
          </div>

          {/* SECONDARY: Intelligence & Community Panels */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* Intelligent Mode Selector */}
            <Tabs value={activeIntelligenceMode} onValueChange={setActiveIntelligenceMode} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="text-xs">
                  <Activity className="w-3 h-3 mr-1" />
                  Live
                </TabsTrigger>
                <TabsTrigger value="intelligence" className="text-xs">
                  <Brain className="w-3 h-3 mr-1" />
                  AI
                </TabsTrigger>
                <TabsTrigger value="community" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  Family
                </TabsTrigger>
                <TabsTrigger value="government" className="text-xs">
                  <Building2 className="w-3 h-3 mr-1" />
                  Gov
                </TabsTrigger>
              </TabsList>

              {/* Live/Preventive View */}
              <TabsContent value="overview" className="space-y-4">
                <PreventiveInsights onboardingData={onboardingData} />
              </TabsContent>

              {/* AI Intelligence View */}
              <TabsContent value="intelligence" className="space-y-4">
                <IntelligencePanel onboardingData={onboardingData} />
              </TabsContent>

              {/* Community/Family View */}
              <TabsContent value="community" className="space-y-4">
                <CommunityHealthPanel />
              </TabsContent>

              {/* Government Integration View */}
              <TabsContent value="government" className="space-y-4">
                <GovernmentIntegrationPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Intelligent Quick Actions - Context-Aware */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/30 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Preventive</p>
                <p className="text-xs text-muted-foreground">Stay ahead</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/30 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Services</p>
                <p className="text-xs text-muted-foreground">Book now</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/30 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Brain className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-sm">AI Insights</p>
                <p className="text-xs text-muted-foreground">Get smart</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/30 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Trends</p>
                <p className="text-xs text-muted-foreground">Track progress</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/30 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <Building2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-sm">NABDA</p>
                <p className="text-xs text-muted-foreground">Gov services</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/30 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <Users className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Family</p>
                <p className="text-xs text-muted-foreground">Share health</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default HealthIntelligenceHub;