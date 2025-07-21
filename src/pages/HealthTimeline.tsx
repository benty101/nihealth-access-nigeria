import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { HealthTimelineHub } from '@/components/health-timeline/HealthTimelineHub';
import { IntelligencePanel } from '@/components/intelligence/IntelligencePanel';
import { CommunityHealthPanel } from '@/components/community/CommunityHealthPanel';
import { PreventiveInsights } from '@/components/preventive/PreventiveInsights';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalizationService } from '@/services/PersonalizationService';
import { Activity, Brain, Users, Shield, TrendingUp } from 'lucide-react';

const HealthTimeline = () => {
  const [onboardingData, setOnboardingData] = useState(null);
  const [activeView, setActiveView] = useState('timeline');

  useEffect(() => {
    const data = PersonalizationService.getOnboardingData();
    setOnboardingData(data);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-lg p-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Health Journey
          </h1>
          <p className="text-muted-foreground">
            A comprehensive view of your health story - past, present, and future
          </p>
        </div>

        {/* Main Timeline Hub */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Primary Timeline - Takes center stage */}
          <div className="xl:col-span-3">
            <Card className="h-[800px] p-0 overflow-hidden">
              <HealthTimelineHub onboardingData={onboardingData} />
            </Card>
          </div>

          {/* Intelligence & Community Panel */}
          <div className="xl:col-span-1 space-y-6">
            <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="timeline" className="text-xs">
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
              </TabsList>

              <TabsContent value="timeline" className="space-y-4">
                <PreventiveInsights onboardingData={onboardingData} />
              </TabsContent>

              <TabsContent value="intelligence" className="space-y-4">
                <IntelligencePanel onboardingData={onboardingData} />
              </TabsContent>

              <TabsContent value="community" className="space-y-4">
                <CommunityHealthPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Preventive Care</p>
                <p className="text-xs text-muted-foreground">Stay ahead</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Book Service</p>
                <p className="text-xs text-muted-foreground">Quick booking</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Brain className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-sm">AI Insights</p>
                <p className="text-xs text-muted-foreground">Get smart advice</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Health Trends</p>
                <p className="text-xs text-muted-foreground">Track progress</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default HealthTimeline;