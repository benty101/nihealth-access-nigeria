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

    // Generate comprehensive genomic insights focused on maternal and child health
    const sampleGenomicInsights: GenomicInsight[] = [
      {
        id: '1',
        type: 'risk_assessment',
        gene: 'MTHFR',
        variant: 'c.677C>T (A222V)',
        significance: 'pathogenic',
        condition: 'Neural Tube Defect Risk & Pregnancy Complications',
        risk_level: 'high',
        description: 'Reduced folate metabolism increases risk of neural tube defects and pregnancy complications including preeclampsia and recurrent miscarriage',
        recommendations: [
          'High-dose folic acid supplementation (5mg daily) before conception',
          'Enhanced prenatal monitoring for neural tube defects',
          'Regular homocysteine level monitoring during pregnancy',
          'Genetic counseling for future pregnancies',
          'Consider methylfolate supplementation instead of folic acid'
        ],
        clinical_actionable: true
      },
      {
        id: '2',
        type: 'pharmacogenomics',
        gene: 'CYP2D6',
        variant: '*1/*4 (Intermediate Metabolizer)',
        significance: 'likely_pathogenic',
        condition: 'Postpartum Depression & Pain Management',
        risk_level: 'moderate',
        description: 'Intermediate metabolizer status affects antidepressant efficacy and pain medication during childbirth and postpartum period',
        recommendations: [
          'Alternative antidepressants for postpartum depression (avoid sertraline standard doses)',
          'Modified pain management protocol during labor',
          'Monitor for inadequate analgesia with codeine-based medications',
          'Consider non-CYP2D6 metabolized alternatives',
          'Inform anesthesiologist before delivery'
        ],
        clinical_actionable: true
      },
      {
        id: '3',
        type: 'carrier_status',
        gene: 'HBB',
        variant: 'HbS Carrier (Sickle Cell Trait)',
        significance: 'pathogenic',
        condition: 'Sickle Cell Disease Risk for Offspring',
        risk_level: 'moderate',
        description: 'Carrier status for sickle cell disease with implications for child health if partner is also a carrier',
        recommendations: [
          'Mandatory partner screening before conception',
          'Genetic counseling for family planning decisions',
          'Prenatal diagnosis options if partner is carrier/affected',
          'Newborn screening interpretation guidance',
          'Extended family screening recommendations'
        ],
        clinical_actionable: true
      },
      {
        id: '4',
        type: 'risk_assessment',
        gene: 'GJB2',
        variant: 'c.35delG',
        significance: 'pathogenic',
        condition: 'Congenital Hearing Loss Risk',
        risk_level: 'high',
        description: 'High risk for congenital hearing loss in offspring, especially with consanguineous marriage patterns common in Nigeria',
        recommendations: [
          'Partner genetic screening mandatory',
          'Enhanced newborn hearing screening protocol',
          'Early intervention planning if child affected',
          'Genetic counseling for extended family',
          'Consider assisted reproductive options if both parents carriers'
        ],
        clinical_actionable: true
      },
      {
        id: '5',
        type: 'risk_assessment',
        gene: 'G6PD',
        variant: 'c.563C>T (Mediterranean variant)',
        significance: 'pathogenic',
        condition: 'G6PD Deficiency & Medication Safety',
        risk_level: 'high',
        description: 'X-linked G6PD deficiency common in Nigerian populations, affects medication safety and malaria treatment options',
        recommendations: [
          'Avoid oxidative stress-inducing medications (primaquine, sulfonamides)',
          'Alternative antimalarial protocols during pregnancy',
          'Newborn screening and monitoring for hemolytic anemia',
          'Dietary restrictions (avoid fava beans)',
          'Medical alert identification for child if affected'
        ],
        clinical_actionable: true
      },
      {
        id: '6',
        type: 'pharmacogenomics',
        gene: 'DPYD',
        variant: 'c.1905+1G>A',
        significance: 'pathogenic',
        condition: '5-Fluorouracil Toxicity Risk',
        risk_level: 'high',
        description: 'Complete DPD deficiency leading to severe, potentially fatal toxicity with 5-fluorouracil-based cancer treatments',
        recommendations: [
          'Absolute contraindication to 5-fluorouracil and capecitabine',
          'Alternative cancer treatment protocols if needed',
          'Inform all healthcare providers and maintain medical alert',
          'Family screening for DPD deficiency',
          'Consider pharmacogenomic testing before any cancer treatment'
        ],
        clinical_actionable: true
      }
    ];

    // Generate comprehensive health insights focused on maternal and child health
    const sampleHealthInsights: HealthInsight[] = [
      {
        id: '1',
        category: 'genomic',
        title: 'Critical Pregnancy Planning Alert',
        description: 'Your MTHFR variant significantly increases neural tube defect risk. Immediate folic acid supplementation recommended before conception.',
        priority: 'high',
        actionable: true,
        data_source: 'NABDA-Powered Genomic Analysis',
        generated_at: new Date().toISOString(),
        recommendations: [
          'Start high-dose folic acid (5mg) immediately',
          'Schedule preconception counseling within 2 weeks',
          'Partner screening for folate metabolism variants',
          'Nutritional assessment and diet optimization',
          'Consider methylfolate vs standard folic acid supplementation'
        ]
      },
      {
        id: '2',
        category: 'medication',
        title: 'Personalized Pain Management Protocol',
        description: 'Your CYP2D6 status requires modified pain management during labor and postpartum depression treatment protocols.',
        priority: 'high',
        actionable: true,
        data_source: 'NABDA Pharmacogenomics Pipeline',
        generated_at: new Date().toISOString(),
        recommendations: [
          'Create personalized birth plan with anesthesiologist',
          'Avoid codeine-based postpartum pain medications',
          'Modified antidepressant dosing if postpartum depression develops',
          'Share pharmacogenomic card with delivery team',
          'Consider non-pharmacological pain management techniques'
        ]
      },
      {
        id: '3',
        category: 'risk',
        title: 'Child Health Risk Assessment',
        description: 'Combined carrier status for multiple conditions requires comprehensive partner screening and enhanced newborn monitoring.',
        priority: 'high',
        actionable: true,
        data_source: 'NABDA Population Genomics Database',
        generated_at: new Date().toISOString(),
        recommendations: [
          'Mandatory partner genetic screening panel',
          'Enhanced newborn screening protocol',
          'Genetic counseling for family planning',
          'Consider preimplantation genetic diagnosis options',
          'Extended family cascade screening'
        ]
      },
      {
        id: '4',
        category: 'preventive',
        title: 'Malaria Prevention Strategy',
        description: 'G6PD deficiency requires modified antimalarial protocols and medication avoidance strategies for you and potential children.',
        priority: 'high',
        actionable: true,
        data_source: 'NABDA Tropical Disease Genomics',
        generated_at: new Date().toISOString(),
        recommendations: [
          'Use alternative antimalarials (avoid primaquine)',
          'Enhanced mosquito prevention measures',
          'Medical alert bracelet for emergency situations',
          'Child screening protocol if pregnancy occurs',
          'Coordination with infectious disease specialists'
        ]
      },
      {
        id: '5',
        category: 'lifestyle',
        title: 'Optimized Maternal Nutrition Plan',
        description: 'Your genetic variants affect nutrient metabolism. Personalized supplementation protocol designed for optimal pregnancy outcomes.',
        priority: 'medium',
        actionable: true,
        data_source: 'AI-Powered Nutrigenomics Analysis',
        generated_at: new Date().toISOString(),
        recommendations: [
          'Methylfolate 5mg daily (vs standard folic acid)',
          'Enhanced B-vitamin complex supplementation',
          'Iron absorption optimization strategies',
          'Personalized dietary guidelines based on genetic markers',
          'Regular nutrient level monitoring during pregnancy'
        ]
      },
      {
        id: '6',
        category: 'genomic',
        title: 'Future Cancer Risk Management',
        description: 'Early detection protocol established based on genetic risk factors, optimized for post-reproductive life stage.',
        priority: 'medium',
        actionable: true,
        data_source: 'NABDA Oncogenomics Pipeline',
        generated_at: new Date().toISOString(),
        recommendations: [
          'Enhanced breast/ovarian screening starting age 30',
          'Annual risk assessment updates',
          'Family history documentation for children',
          'Preventive surgery consultation at appropriate age',
          'Lifestyle modifications to reduce penetrance'
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
          kit_name: 'NABDA-Powered Maternal & Child Health Genomic Panel',
          order_number: orderNumber,
          price: 25000, // ₦25,000 heavily subsidized by NABDA for maternal health initiative
          shipping_address: 'To be updated', // Would get from user profile
          collection_instructions: 'Saliva collection kit with detailed instructions',
          status: 'ordered'
        });

      if (error) throw error;

      toast({
        title: "NABDA Genomic Kit Ordered",
        description: "Your maternal & child health genomic panel will be shipped within 24 hours. Results processed through NABDA's national genomics infrastructure.",
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
                    NABDA-powered genomic analysis for maternal and child health optimization
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Powered by NABDA • National Genomics Infrastructure</span>
                  </div>
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
                      <h3 className="font-medium">Unlock Your Maternal & Child Health Insights</h3>
                      <p className="text-sm text-muted-foreground">
                        Get personalized genomic insights for pregnancy planning, medication safety, and child health optimization
                      </p>
                    </div>
                    <Button onClick={orderGenomicKit} className="mt-4 bg-green-600 hover:bg-green-700">
                      <Dna className="w-4 h-4 mr-2" />
                      Order NABDA Genomic Kit (₦25,000)
                    </Button>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        🇳🇬 Powered by NABDA • National Biotechnology Development Agency
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ✓ 85% subsidized for maternal health initiative • Results in 10-14 days
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ✓ Covers 150+ maternal & child health genetic markers
                      </p>
                    </div>
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