import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { 
  Dna, 
  Brain, 
  TrendingUp, 
  Heart, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Info,
  Microscope,
  Shield,
  Sparkles,
  Download,
  Share,
  Calendar,
  Target,
  ChevronRight
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import PageLayout from '@/components/layout/PageLayout';

interface GenomicInsight {
  id: string;
  type: 'risk_assessment' | 'pharmacogenomics' | 'carrier_status' | 'trait' | 'ancestry';
  gene: string;
  variant: string;
  significance: 'pathogenic' | 'likely_pathogenic' | 'uncertain' | 'benign' | 'likely_benign';
  condition: string;
  risk_level: 'high' | 'moderate' | 'low';
  description: string;
  recommendations: string[];
  clinical_actionable: boolean;
}

interface HealthInsight {
  id: string;
  category: 'genomic' | 'lifestyle' | 'preventive' | 'medication' | 'risk';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  data_source: string;
  generated_at: string;
  recommendations: string[];
}

interface GenomicTestResult {
  id: string;
  test_type: 'whole_genome' | 'exome' | 'targeted_panel' | 'pharmacogenomics';
  status: 'completed' | 'processing' | 'failed' | 'pending';
  lab_partner: string;
  collection_date: string;
  results_date?: string;
  raw_data_available: boolean;
  nabda_processed: boolean;
}

const HealthInsights = () => {
  const [genomicInsights, setGenomicInsights] = useState<GenomicInsight[]>([]);
  const [healthInsights, setHealthInsights] = useState<HealthInsight[]>([]);
  const [genomicTests, setGenomicTests] = useState<GenomicTestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  useEffect(() => {
    loadHealthData();
  }, []);

  const loadHealthData = async () => {
    setIsLoading(true);
    try {
      // Load existing health timeline events and biobank samples
      const { data: timelineEvents } = await supabase
        .from('health_timeline_events')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      const { data: biobankSamples } = await supabase
        .from('biobank_samples')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      const { data: homeTestKits } = await supabase
        .from('home_test_kits')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .eq('kit_type', 'genomics');

      // Generate insights from available data
      generateInsights(timelineEvents || [], biobankSamples || [], homeTestKits || []);
    } catch (error) {
      console.error('Error loading health data:', error);
      toast({
        title: "Error",
        description: "Failed to load health insights data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateInsights = (timelineEvents: any[], biobankSamples: any[], genomicTests: any[]) => {
    // Convert genomic tests to proper format
    const formattedGenomicTests: GenomicTestResult[] = genomicTests.map(test => ({
      id: test.id,
      test_type: 'targeted_panel',
      status: test.status === 'completed' ? 'completed' : test.status,
      lab_partner: 'MeddyPal Genomics Lab',
      collection_date: test.created_at,
      results_date: test.results_available ? test.updated_at : undefined,
      raw_data_available: test.results_available,
      nabda_processed: test.results_available
    }));

    setGenomicTests(formattedGenomicTests);

    // Generate sample genomic insights (would come from actual genomic analysis)
    const sampleGenomicInsights: GenomicInsight[] = [
      {
        id: '1',
        type: 'risk_assessment',
        gene: 'BRCA1',
        variant: 'c.68_69delAG',
        significance: 'pathogenic',
        condition: 'Hereditary Breast and Ovarian Cancer',
        risk_level: 'high',
        description: 'Pathogenic variant in BRCA1 significantly increases breast and ovarian cancer risk',
        recommendations: [
          'Enhanced screening starting at age 25',
          'Consider prophylactic measures',
          'Genetic counseling for family members',
          'Regular follow-up with oncology'
        ],
        clinical_actionable: true
      },
      {
        id: '2',
        type: 'pharmacogenomics',
        gene: 'CYP2D6',
        variant: '*4/*4',
        significance: 'pathogenic',
        condition: 'Poor Metabolizer Status',
        risk_level: 'moderate',
        description: 'Reduced metabolism of medications processed by CYP2D6',
        recommendations: [
          'Avoid standard doses of codeine, tramadol',
          'Consider alternative pain medications',
          'Inform all healthcare providers',
          'Pharmacist consultation for new medications'
        ],
        clinical_actionable: true
      },
      {
        id: '3',
        type: 'carrier_status',
        gene: 'HBB',
        variant: 'HbS',
        significance: 'pathogenic',
        condition: 'Sickle Cell Carrier',
        risk_level: 'low',
        description: 'Carrier for sickle cell disease (sickle cell trait)',
        recommendations: [
          'Genetic counseling before having children',
          'Partner screening recommended',
          'Stay hydrated during intense exercise',
          'Inform healthcare providers'
        ],
        clinical_actionable: true
      }
    ];

    // Generate health insights from timeline and genomic data
    const sampleHealthInsights: HealthInsight[] = [
      {
        id: '1',
        category: 'genomic',
        title: 'High Cancer Risk Detected',
        description: 'Your genomic analysis shows increased breast cancer risk. Early screening is recommended.',
        priority: 'high',
        actionable: true,
        data_source: 'NABDA Genomics Processing',
        generated_at: new Date().toISOString(),
        recommendations: [
          'Schedule mammography screening',
          'Consult with genetic counselor',
          'Consider preventive measures'
        ]
      },
      {
        id: '2',
        category: 'medication',
        title: 'Medication Sensitivity Alert',
        description: 'Your genetic profile shows sensitivity to certain pain medications.',
        priority: 'high',
        actionable: true,
        data_source: 'Pharmacogenomics Analysis',
        generated_at: new Date().toISOString(),
        recommendations: [
          'Update medical alert card',
          'Inform all prescribing physicians',
          'Consider medication alternatives'
        ]
      },
      {
        id: '3',
        category: 'preventive',
        title: 'Personalized Prevention Plan',
        description: 'Based on your genetic and lifestyle data, here\'s your tailored prevention strategy.',
        priority: 'medium',
        actionable: true,
        data_source: 'AI Analysis Engine',
        generated_at: new Date().toISOString(),
        recommendations: [
          'Increase cardiovascular exercise',
          'Mediterranean diet recommended',
          'Annual comprehensive screening'
        ]
      }
    ];

    setGenomicInsights(sampleGenomicInsights);
    setHealthInsights(sampleHealthInsights);
  };

  const orderGenomicKit = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      // Generate a unique order number
      const orderNumber = `KIT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

      const { error } = await supabase
        .from('home_test_kits')
        .insert({
          user_id: user.user.id,
          kit_type: 'genomics',
          kit_name: 'MeddyPal Comprehensive Genomic Analysis',
          order_number: orderNumber,
          price: 45000, // ₦45,000 subsidized by NABDA
          shipping_address: 'To be updated', // Would get from user profile
          collection_instructions: 'Saliva collection kit with detailed instructions',
          status: 'ordered'
        });

      if (error) throw error;

      toast({
        title: "Genomic Kit Ordered",
        description: "Your genomic testing kit will be shipped within 2-3 business days. Results processed through NABDA partnership.",
      });

      // Reload data
      loadHealthData();
    } catch (error) {
      console.error('Error ordering genomic kit:', error);
      toast({
        title: "Error",
        description: "Failed to order genomic kit",
        variant: "destructive"
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'moderate': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="Health Insights">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Health Insights">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Health Insights</h1>
              <p className="text-muted-foreground">
                AI-powered analysis combining genomic data, health records, and lifestyle factors
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share Report
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Dna className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Genomic Tests</p>
                    <p className="text-2xl font-bold">{genomicTests.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">High Priority</p>
                    <p className="text-2xl font-bold">
                      {healthInsights.filter(i => i.priority === 'high').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Actionable</p>
                    <p className="text-2xl font-bold">
                      {healthInsights.filter(i => i.actionable).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">AI Insights</p>
                    <p className="text-2xl font-bold">{healthInsights.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="genomic">Genomic Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="data">Data Sources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Priority Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Priority Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {healthInsights
                    .filter(insight => insight.priority === 'high')
                    .map(insight => (
                      <div key={insight.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-red-600" />
                              <h4 className="font-medium">{insight.title}</h4>
                              <Badge variant={getPriorityColor(insight.priority)}>
                                {insight.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{insight.description}</p>
                            <p className="text-xs text-muted-foreground">
                              Source: {insight.data_source}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Recommended Actions:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {insight.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 mt-0.5 text-green-600" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Genomic Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dna className="w-5 h-5" />
                  Genomic Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {genomicTests.length === 0 ? (
                  <div className="text-center space-y-4 py-8">
                    <Microscope className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">No Genomic Data Available</h3>
                      <p className="text-sm text-muted-foreground">
                        Order a genomic testing kit to unlock personalized insights
                      </p>
                    </div>
                    <Button onClick={orderGenomicKit} className="mt-4">
                      <Dna className="w-4 h-4 mr-2" />
                      Order Genomic Kit (₦45,000)
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Subsidized through NABDA partnership • Results in 2-3 weeks
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {genomicInsights.slice(0, 3).map(insight => (
                      <div key={insight.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              <h4 className="font-medium">{insight.condition}</h4>
                              <Badge className={getRiskColor(insight.risk_level)}>
                                {insight.risk_level} risk
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {insight.gene} • {insight.variant}
                            </p>
                            <p className="text-sm">{insight.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="genomic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dna className="w-5 h-5" />
                  Detailed Genomic Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {genomicInsights.map(insight => (
                      <div key={insight.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{insight.condition}</h4>
                              <Badge className={getRiskColor(insight.risk_level)}>
                                {insight.risk_level} risk
                              </Badge>
                              {insight.clinical_actionable && (
                                <Badge variant="outline">Clinically Actionable</Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p><strong>Gene:</strong> {insight.gene}</p>
                              <p><strong>Variant:</strong> {insight.variant}</p>
                              <p><strong>Classification:</strong> {insight.significance}</p>
                            </div>
                            <p className="text-sm">{insight.description}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Clinical Recommendations:</p>
                          <ul className="text-sm space-y-1">
                            {insight.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 mt-0.5 text-green-600" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {['immediate', 'short_term', 'long_term'].map(timeframe => (
                    <div key={timeframe} className="space-y-3">
                      <h3 className="font-medium capitalize">{timeframe.replace('_', ' ')} Actions</h3>
                      <div className="grid gap-3">
                        {healthInsights
                          .filter(insight => insight.actionable)
                          .slice(0, 3)
                          .map(insight => (
                            <div key={`${timeframe}-${insight.id}`} className="p-3 border rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium">{insight.title}</span>
                              </div>
                              <ul className="text-sm space-y-1">
                                {insight.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <CheckCircle className="w-3 h-3 mt-0.5 text-green-600" />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Data Sources & Processing Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">NABDA Genomics Partnership</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Genomic data processed through Nigeria's National Biotechnology Development Agency for oversight, funding accessibility, and national health policy data aggregation
                      </p>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Regulatory compliant • Population health insights fed back to NABDA</span>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">MeddyPal Lab Network</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Laboratory tests and genomic sequencing processed through certified partner labs in our e-commerce ecosystem
                      </p>
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{genomicTests.length} tests completed • Lab partners provide processing services</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Nduka AI Analysis Engine</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        AI synthesizes genomic, clinical, and lifestyle data to provide personalized health insights and preventive recommendations
                      </p>
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-purple-600" />
                        <span className="text-sm">Real-time insights generation • Continuous learning from population data</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
                      <h4 className="font-medium mb-2">Data Flow Pipeline</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>1. <strong>Genomic Kit Order</strong> → Lab processing through MeddyPal network</p>
                        <p>2. <strong>NABDA Processing</strong> → Quality control and regulatory oversight</p>
                        <p>3. <strong>Results Integration</strong> → Combined with health timeline and lifestyle data</p>
                        <p>4. <strong>AI Synthesis</strong> → Nduka generates personalized insights</p>
                        <p>5. <strong>Actionable Recommendations</strong> → Delivered through Health Insights dashboard</p>
                        <p>6. <strong>Population Data</strong> → Anonymized aggregation fed back to NABDA for national health policies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default HealthInsights;