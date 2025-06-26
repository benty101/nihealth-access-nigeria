
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Share, 
  MapPin, 
  Shield, 
  Dna, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  Eye
} from 'lucide-react';
import { molecularDiagnosticsService, type MolecularDiagnosticOrder } from '@/services/MolecularDiagnosticsService';

interface MolecularDiagnosticResultsProps {
  orderId: string;
}

const MolecularDiagnosticResults = ({ orderId }: MolecularDiagnosticResultsProps) => {
  const [order, setOrder] = useState<MolecularDiagnosticOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrderResults();
  }, [orderId]);

  const loadOrderResults = async () => {
    try {
      // In a real implementation, this would fetch the order with results
      // For now, using mock data
      setOrder({
        id: orderId,
        user_id: 'user-id',
        order_number: `MDP-2024-${Math.random().toString(36).substr(2, 6)}`,
        tests: [],
        sample_tracking: {} as any,
        total_amount: 45000,
        status: 'completed',
        collection_method: 'home_collection',
        privacy_consent: {
          data_sharing: true,
          research_participation: true,
          geo_tagging_consent: true
        },
        results: {
          file_url: '/mock-results.pdf',
          summary: 'Comprehensive genomic analysis completed successfully.',
          clinical_significance: 'Several actionable mutations identified with treatment implications.',
          recommendations: [
            'Consider targeted therapy based on identified mutations',
            'Regular monitoring recommended',
            'Genetic counseling advised for family members'
          ],
          geo_tag: {
            region: 'Lagos-Southwest',
            timestamp: new Date().toISOString()
          }
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error loading order results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadResults = () => {
    if (order?.results?.file_url) {
      // In a real implementation, this would download the actual file
      console.log('Downloading results:', order.results.file_url);
    }
  };

  const handleShareWithProvider = () => {
    // Integration with EMR system
    console.log('Sharing results with healthcare provider');
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </CardContent>
      </Card>
    );
  }

  if (!order?.results) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Results not yet available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Dna className="h-5 w-5 text-green-600" />
                Molecular Diagnostic Results
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Order: {order.order_number} • Completed: {new Date(order.updated_at).toLocaleDateString()}
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Complete
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Results</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Sharing</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Results Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Executive Summary</h3>
                  <p className="text-blue-800">{order.results.summary}</p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Clinical Significance
                  </h3>
                  <p className="text-orange-800">{order.results.clinical_significance}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Tests Performed</h3>
                    <div className="text-sm text-gray-600">
                      {order.tests.length} molecular diagnostic tests
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Processing Time</h3>
                    <div className="text-sm text-gray-600">
                      {Math.ceil((new Date(order.updated_at).getTime() - new Date(order.created_at).getTime()) / (1000 * 60 * 60 * 24))} days
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Detailed Laboratory Report</CardTitle>
                <Button onClick={handleDownloadResults} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-700 mb-2">Complete Laboratory Report</h3>
                <p className="text-gray-600 mb-4">
                  Your detailed molecular diagnostic report is available for download
                </p>
                <div className="flex justify-center gap-2">
                  <Button onClick={handleDownloadResults} variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Report
                  </Button>
                  <Button onClick={handleDownloadResults}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Clinical Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.results.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-purple-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-gray-900">{recommendation}</p>
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Next Steps</h3>
                  <p className="text-blue-800 text-sm mb-3">
                    Discuss these results with your healthcare provider to develop a personalized treatment plan.
                  </p>
                  <Button 
                    onClick={handleShareWithProvider}
                    className="bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share with Healthcare Provider
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Data Sharing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Data Sharing</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.privacy_consent.data_sharing ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Research Participation</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.privacy_consent.research_participation ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Geo-tagging</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.privacy_consent.geo_tagging_consent ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>

                {order.results.geo_tag && order.privacy_consent.geo_tagging_consent && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Disease Surveillance Contribution
                    </h3>
                    <p className="text-green-800 text-sm mb-2">
                      Your anonymized data has been contributed to regional disease surveillance efforts.
                    </p>
                    <div className="text-xs text-green-700">
                      Region: {order.results.geo_tag.region} • 
                      Submitted: {new Date(order.results.geo_tag.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                )}

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Data Security</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• All data encrypted in transit and at rest</li>
                    <li>• HIPAA compliant storage and processing</li>
                    <li>• Access limited to authorized healthcare professionals</li>
                    <li>• Anonymized data used for population health insights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MolecularDiagnosticResults;
