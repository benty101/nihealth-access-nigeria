
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, Phone, MessageSquare, Calendar, Star, Clock, Dna, TestTube } from 'lucide-react';
import TelemedicineConsultation from './TelemedicineConsultation';
import MolecularDiagnosticsBooking from './MolecularDiagnosticsBooking';
import SampleTracker from './SampleTracker';

interface EnhancedTelemedicineConsultationProps {
  consultationId?: string;
}

const EnhancedTelemedicineConsultation = ({ consultationId }: EnhancedTelemedicineConsultationProps) => {
  const [activeTab, setActiveTab] = useState('consultation');
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [currentSampleId, setCurrentSampleId] = useState<string | null>(null);

  const handleMolecularDiagnosticBooking = (orderId: string) => {
    setCurrentOrderId(orderId);
    // In a real implementation, you would get the sample ID from the order
    setCurrentSampleId(`MDP-${Date.now()}-sample`);
    setActiveTab('tracking');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Enhanced Telemedicine Platform</h1>
        <p className="text-gray-600">Complete healthcare consultation with advanced molecular diagnostics</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="consultation" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Consultation
          </TabsTrigger>
          <TabsTrigger value="molecular-diagnostics" className="flex items-center gap-2">
            <Dna className="h-4 w-4" />
            Molecular Diagnostics
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2" disabled={!currentSampleId}>
            <TestTube className="h-4 w-4" />
            Sample Tracking
          </TabsTrigger>
        </TabsList>

        <TabsContent value="consultation" className="mt-6">
          <TelemedicineConsultation />
          
          {/* Integration Notice */}
          <Card className="mt-6 border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Dna className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Advanced Molecular Diagnostics Available
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Enhance your consultation with precision biotech testing. Our molecular diagnostic panel 
                    can provide detailed insights for personalized treatment plans.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab('molecular-diagnostics')}
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <TestTube className="h-4 w-4 mr-2" />
                    Explore Molecular Tests
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="molecular-diagnostics" className="mt-6">
          <MolecularDiagnosticsBooking
            consultationId={consultationId}
            onBookingComplete={handleMolecularDiagnosticBooking}
          />
        </TabsContent>

        <TabsContent value="tracking" className="mt-6">
          {currentSampleId && currentOrderId ? (
            <SampleTracker 
              sampleId={currentSampleId}
              orderId={currentOrderId}
            />
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No samples to track. Book a molecular diagnostic test first.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setActiveTab('molecular-diagnostics')}
                >
                  Book Molecular Test
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedTelemedicineConsultation;
