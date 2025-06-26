
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play,
  Square,
  Database,
  BookOpen,
  Shield,
  BarChart3,
  Cpu,
  Memory,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import { mlAnalyticsService, type MLEnvironment, type Dataset, type MLTemplate } from '@/services/MLAnalyticsService';
import MLEnvironmentManager from './MLEnvironmentManager';
import DatasetCurator from './DatasetCurator';
import MLTemplateLibrary from './MLTemplateLibrary';
import EthicalGuidelinesPanel from './EthicalGuidelinesPanel';
import UsageAnalytics from './UsageAnalytics';

const MLAnalytics = () => {
  const [activeTab, setActiveTab] = useState('environment');
  const [environments, setEnvironments] = useState<MLEnvironment[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [templates, setTemplates] = useState<MLTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [usageStats, setUsageStats] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [envs, data, temps, stats] = await Promise.all([
        mlAnalyticsService.getEnvironments(),
        mlAnalyticsService.getCuratedDatasets(),
        mlAnalyticsService.getMLTemplates(),
        mlAnalyticsService.getUsageStats('current-user')
      ]);

      setEnvironments(envs);
      setDatasets(data);
      setTemplates(temps);
      setUsageStats(stats);
    } catch (error) {
      console.error('Failed to load ML analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ML Analytics Environment</h1>
          <p className="text-gray-600 mt-1">Sandboxed machine learning environment for healthcare analytics</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-gray-600">Ethical Score</div>
            <div className="flex items-center gap-2">
              <Progress value={usageStats?.ethical_score || 0} className="w-20" />
              <span className="text-sm font-medium">{usageStats?.ethical_score || 0}%</span>
            </div>
          </div>
          
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Lightbulb className="h-4 w-4 mr-2" />
            New Analysis
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Play className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Active Environments</p>
                <p className="text-2xl font-bold">
                  {environments.filter(env => env.status === 'running').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Database className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Datasets Available</p>
                <p className="text-2xl font-bold">{datasets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">ML Templates</p>
                <p className="text-2xl font-bold">{templates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Models Trained</p>
                <p className="text-2xl font-bold">{usageStats?.models_trained || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ethical Compliance Alert */}
      {usageStats?.ethical_score < 80 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            Your ethical compliance score is below 80%. Please review the ethical guidelines 
            and complete required checkpoints before proceeding with model training.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="environment" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            Environment
          </TabsTrigger>
          <TabsTrigger value="datasets" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Datasets
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="ethics" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Ethics
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="environment" className="mt-6">
          <MLEnvironmentManager 
            environments={environments}
            onEnvironmentChange={loadData}
          />
        </TabsContent>

        <TabsContent value="datasets" className="mt-6">
          <DatasetCurator 
            datasets={datasets}
            onDatasetChange={loadData}
          />
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <MLTemplateLibrary 
            templates={templates}
            datasets={datasets}
          />
        </TabsContent>

        <TabsContent value="ethics" className="mt-6">
          <EthicalGuidelinesPanel />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <UsageAnalytics usageStats={usageStats} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MLAnalytics;
