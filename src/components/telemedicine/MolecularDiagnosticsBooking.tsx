
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  TestTube, 
  Dna, 
  MapPin, 
  Clock, 
  Shield, 
  AlertTriangle,
  CheckCircle2,
  Thermometer
} from 'lucide-react';
import { molecularDiagnosticsService, type MolecularDiagnosticTest } from '@/services/MolecularDiagnosticsService';
import { useToast } from '@/hooks/use-toast';

interface MolecularDiagnosticsBookingProps {
  consultationId?: string;
  onBookingComplete?: (orderId: string) => void;
}

const MolecularDiagnosticsBooking = ({ consultationId, onBookingComplete }: MolecularDiagnosticsBookingProps) => {
  const [availableTests, setAvailableTests] = useState<MolecularDiagnosticTest[]>([]);
  const [selectedTests, setSelectedTests] = useState<Set<string>>(new Set());
  const [collectionMethod, setCollectionMethod] = useState<'home_collection' | 'lab_visit' | 'clinic_referral'>('home_collection');
  const [collectionAddress, setCollectionAddress] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState({
    data_sharing: false,
    research_participation: false,
    geo_tagging_consent: false
  });
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAvailableTests();
  }, []);

  const loadAvailableTests = async () => {
    try {
      const tests = await molecularDiagnosticsService.getAvailableTests();
      setAvailableTests(tests);
    } catch (error) {
      console.error('Error loading molecular diagnostic tests:', error);
      toast({
        title: "Error",
        description: "Failed to load available tests",
        variant: "destructive"
      });
    }
  };

  const toggleTestSelection = (testId: string) => {
    const newSelection = new Set(selectedTests);
    if (newSelection.has(testId)) {
      newSelection.delete(testId);
    } else {
      newSelection.add(testId);
    }
    setSelectedTests(newSelection);
  };

  const getSelectedTestsData = () => {
    return availableTests.filter(test => selectedTests.has(test.id));
  };

  const getTotalAmount = () => {
    return getSelectedTestsData().reduce((total, test) => total + test.price, 0);
  };

  const handleBooking = async () => {
    if (selectedTests.size === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one molecular diagnostic test",
        variant: "destructive"
      });
      return;
    }

    if (collectionMethod === 'home_collection' && !collectionAddress.trim()) {
      toast({
        title: "Address Required",
        description: "Please provide a collection address for home collection",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const selectedTestsData = getSelectedTestsData();
      
      const orderId = await molecularDiagnosticsService.createOrder({
        user_id: 'current-user-id', // This would come from auth context
        consultation_id: consultationId,
        tests: selectedTestsData,
        sample_tracking: {
          id: '',
          sample_id: '',
          order_id: '',
          collection_date: new Date().toISOString(),
          collection_location: collectionMethod === 'home_collection' ? {
            address: collectionAddress
          } : undefined,
          lab_partner_id: 'primary-lab-partner',
          status: 'collected',
          chain_of_custody: []
        },
        total_amount: getTotalAmount(),
        status: 'sample_requested',
        collection_method: collectionMethod,
        privacy_consent: privacyConsent
      });

      toast({
        title: "Booking Successful",
        description: "Your molecular diagnostic tests have been ordered. Sample collection will be arranged."
      });

      onBookingComplete?.(orderId);
    } catch (error) {
      console.error('Error booking molecular diagnostics:', error);
      toast({
        title: "Booking Failed",
        description: "Failed to book molecular diagnostic tests. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'genomics': return <Dna className="h-4 w-4" />;
      case 'biomarkers': return <TestTube className="h-4 w-4" />;
      default: return <TestTube className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'genomics': return 'bg-purple-100 text-purple-800';
      case 'proteomics': return 'bg-blue-100 text-blue-800';
      case 'metabolomics': return 'bg-green-100 text-green-800';
      case 'biomarkers': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dna className="h-5 w-5 text-purple-600" />
            Molecular Diagnostics
          </CardTitle>
          <p className="text-sm text-gray-600">
            Advanced biotech testing for personalized medicine and precision healthcare
          </p>
        </CardHeader>
      </Card>

      {/* Available Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Available Molecular Diagnostic Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableTests.map((test) => (
              <div 
                key={test.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedTests.has(test.id) 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleTestSelection(test.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Checkbox 
                        checked={selectedTests.has(test.id)}
                        onChange={() => {}}
                      />
                      <div>
                        <h3 className="font-semibold">{test.test_name}</h3>
                        <p className="text-sm text-gray-600">{test.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(test.category)}
                        <Badge className={getCategoryColor(test.category)}>
                          {test.category}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <TestTube className="h-4 w-4" />
                        <span>{test.sample_type}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{test.processing_time}</span>
                      </div>
                      
                      {test.requires_special_handling && (
                        <div className="flex items-center gap-1">
                          <Thermometer className="h-4 w-4" />
                          <span>Special handling</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-semibold text-purple-600">
                      ₦{test.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {test.test_code}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedTests.size > 0 && (
        <>
          {/* Collection Method */}
          <Card>
            <CardHeader>
              <CardTitle>Sample Collection Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={collectionMethod} onValueChange={(value: any) => setCollectionMethod(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home_collection">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Home Collection
                    </div>
                  </SelectItem>
                  <SelectItem value="lab_visit">
                    <div className="flex items-center gap-2">
                      <TestTube className="h-4 w-4" />
                      Lab Visit
                    </div>
                  </SelectItem>
                  <SelectItem value="clinic_referral">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Clinic Referral
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {collectionMethod === 'home_collection' && (
                <div className="space-y-2">
                  <Label htmlFor="collection-address">Collection Address</Label>
                  <Textarea
                    id="collection-address"
                    placeholder="Enter your complete address for sample collection..."
                    value={collectionAddress}
                    onChange={(e) => setCollectionAddress(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Privacy & Consent */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Data Consent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="data-sharing"
                    checked={privacyConsent.data_sharing}
                    onCheckedChange={(checked) => 
                      setPrivacyConsent(prev => ({ ...prev, data_sharing: !!checked }))
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="data-sharing" className="text-sm font-medium">
                      Allow secure data sharing with healthcare providers
                    </Label>
                    <p className="text-xs text-gray-600">
                      Your results can be shared with your healthcare team for better care coordination
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="research-participation"
                    checked={privacyConsent.research_participation}
                    onCheckedChange={(checked) => 
                      setPrivacyConsent(prev => ({ ...prev, research_participation: !!checked }))
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="research-participation" className="text-sm font-medium">
                      Participate in anonymized research studies
                    </Label>
                    <p className="text-xs text-gray-600">
                      Help advance medical research with your anonymized data
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="geo-tagging"
                    checked={privacyConsent.geo_tagging_consent}
                    onCheckedChange={(checked) => 
                      setPrivacyConsent(prev => ({ ...prev, geo_tagging_consent: !!checked }))
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="geo-tagging" className="text-sm font-medium">
                      Allow anonymized geo-tagging for disease surveillance
                    </Label>
                    <p className="text-xs text-gray-600">
                      Support public health monitoring with anonymized location data
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Special Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Any special instructions or medical conditions we should be aware of..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getSelectedTestsData().map((test) => (
                  <div key={test.id} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{test.test_name}</div>
                      <div className="text-sm text-gray-600">{test.test_code}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₦{test.price.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total Amount</span>
                  <span className="text-purple-600">₦{getTotalAmount().toLocaleString()}</span>
                </div>
              </div>

              <Button 
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
                onClick={handleBooking}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Book Molecular Diagnostic Tests'}
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default MolecularDiagnosticsBooking;
