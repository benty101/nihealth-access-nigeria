import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dna, 
  Shield, 
  Heart, 
  Brain, 
  Users, 
  FileText,
  Clock,
  MapPin,
  Phone,
  CheckCircle,
  ArrowRight,
  Info
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GenomicsOnboardingFlowProps {
  onComplete: (data: GenomicsConsentData) => void;
  onSkip: () => void;
}

export interface GenomicsConsentData {
  personalizedHealthInsights: boolean;
  pharmacogenomics: boolean;
  carrierScreening: boolean;
  familyPlanning: boolean;
  researchParticipation: boolean;
  dataSharing: boolean;
  kitDelivery: {
    address: string;
    phone: string;
    preferredTime: string;
  };
  healthProfile: {
    currentConditions: string[];
    familyHistory: string[];
    medications: string;
    concerns: string;
  };
}

const GenomicsOnboardingFlow = ({ onComplete, onSkip }: GenomicsOnboardingFlowProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [consentData, setConsentData] = useState<GenomicsConsentData>({
    personalizedHealthInsights: true,
    pharmacogenomics: true,
    carrierScreening: false,
    familyPlanning: false,
    researchParticipation: false,
    dataSharing: false,
    kitDelivery: {
      address: '',
      phone: '',
      preferredTime: 'morning'
    },
    healthProfile: {
      currentConditions: [],
      familyHistory: [],
      medications: '',
      concerns: ''
    }
  });

  const handleConsentChange = (field: keyof Omit<GenomicsConsentData, 'kitDelivery' | 'healthProfile'>, value: boolean) => {
    setConsentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeliveryChange = (field: keyof GenomicsConsentData['kitDelivery'], value: string) => {
    setConsentData(prev => ({
      ...prev,
      kitDelivery: {
        ...prev.kitDelivery,
        [field]: value
      }
    }));
  };

  const handleHealthProfileChange = (field: keyof GenomicsConsentData['healthProfile'], value: string | string[]) => {
    setConsentData(prev => ({
      ...prev,
      healthProfile: {
        ...prev.healthProfile,
        [field]: value
      }
    }));
  };

  const handleConditionToggle = (condition: string) => {
    const currentConditions = consentData.healthProfile.currentConditions;
    const updated = currentConditions.includes(condition)
      ? currentConditions.filter(c => c !== condition)
      : [...currentConditions, condition];
    
    handleHealthProfileChange('currentConditions', updated);
  };

  const handleComplete = () => {
    if (!consentData.kitDelivery.address || !consentData.kitDelivery.phone) {
      toast({
        title: "Missing Information",
        description: "Please provide delivery address and phone number.",
        variant: "destructive"
      });
      return;
    }

    onComplete(consentData);
    toast({
      title: "DNA Kit Ordered Successfully!",
      description: "Your free genomics kit will be delivered within 3-5 business days.",
    });
  };

  const renderStep1 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Dna className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Unlock Your Health DNA
        </CardTitle>
        <p className="text-gray-600">
          Get personalized health insights with your free government-sponsored genomics analysis
        </p>
        <Badge className="bg-green-100 text-green-800 mx-auto w-fit">
          <CheckCircle className="w-3 h-3 mr-1" />
          100% Free • Government Sponsored
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <Heart className="w-6 h-6 text-purple-600 mb-2" />
            <h4 className="font-semibold text-purple-900 mb-1">Health Insights</h4>
            <p className="text-sm text-purple-700">
              Discover your genetic predispositions and get personalized health recommendations
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <Brain className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-semibold text-blue-900 mb-1">Smart Medicine</h4>
            <p className="text-sm text-blue-700">
              Learn how your body responds to medications for safer, more effective treatment
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <h4 className="font-semibold text-green-900 mb-1">Family Planning</h4>
            <p className="text-sm text-green-700">
              Understand carrier status and hereditary conditions for informed family decisions
            </p>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <Shield className="w-6 h-6 text-orange-600 mb-2" />
            <h4 className="font-semibold text-orange-900 mb-1">Prevention Focus</h4>
            <p className="text-sm text-orange-700">
              Get early warnings and prevention strategies based on your genetic profile
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-gray-900 mb-1">How it works</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• We'll send you a free saliva collection kit</li>
                <li>• Collect your sample at home and send it back</li>
                <li>• Receive detailed health insights in 2-3 weeks</li>
                <li>• Use insights to optimize your health journey</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={() => setStep(2)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            Get My Free DNA Kit
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" onClick={onSkip}>
            Maybe Later
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-600" />
          Choose Your Health Insights
        </CardTitle>
        <p className="text-gray-600">
          Select which genetic insights you'd like to receive
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <Checkbox 
              checked={consentData.personalizedHealthInsights}
              onCheckedChange={(checked) => handleConsentChange('personalizedHealthInsights', checked as boolean)}
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Personalized Health Insights</h4>
              <p className="text-sm text-gray-600">
                Disease risk assessments and personalized prevention recommendations
              </p>
              <Badge className="bg-green-100 text-green-800 mt-1">Recommended</Badge>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <Checkbox 
              checked={consentData.pharmacogenomics}
              onCheckedChange={(checked) => handleConsentChange('pharmacogenomics', checked as boolean)}
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Medication Response Analysis</h4>
              <p className="text-sm text-gray-600">
                How your body processes medications for personalized dosing and safety
              </p>
              <Badge className="bg-blue-100 text-blue-800 mt-1">Most Popular</Badge>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <Checkbox 
              checked={consentData.carrierScreening}
              onCheckedChange={(checked) => handleConsentChange('carrierScreening', checked as boolean)}
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Carrier Screening</h4>
              <p className="text-sm text-gray-600">
                Check if you carry genetic variants that could affect your children
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <Checkbox 
              checked={consentData.familyPlanning}
              onCheckedChange={(checked) => handleConsentChange('familyPlanning', checked as boolean)}
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Family Planning Insights</h4>
              <p className="text-sm text-gray-600">
                Comprehensive genetic counseling for family planning decisions
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h5 className="font-medium text-yellow-900 mb-2">Optional Contributions</h5>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Checkbox 
                checked={consentData.researchParticipation}
                onCheckedChange={(checked) => handleConsentChange('researchParticipation', checked as boolean)}
              />
              <div className="flex-1">
                <h6 className="text-sm font-medium text-yellow-900">Research Participation</h6>
                <p className="text-xs text-yellow-700">
                  Help advance Nigerian healthcare research (data anonymized)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox 
                checked={consentData.dataSharing}
                onCheckedChange={(checked) => handleConsentChange('dataSharing', checked as boolean)}
              />
              <div className="flex-1">
                <h6 className="text-sm font-medium text-yellow-900">Population Health Data</h6>
                <p className="text-xs text-yellow-700">
                  Contribute to national health surveillance (completely anonymous)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => setStep(1)} variant="outline">
            Back
          </Button>
          <Button 
            onClick={() => setStep(3)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-purple-600" />
          Kit Delivery Information
        </CardTitle>
        <p className="text-gray-600">
          Where should we send your free DNA collection kit?
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Delivery Address *</Label>
            <Textarea
              id="address"
              placeholder="Enter your complete address including street, city, and state"
              value={consentData.kitDelivery.address}
              onChange={(e) => handleDeliveryChange('address', e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={consentData.kitDelivery.phone}
              onChange={(e) => handleDeliveryChange('phone', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Preferred Delivery Time</Label>
            <RadioGroup 
              value={consentData.kitDelivery.preferredTime}
              onValueChange={(value) => handleDeliveryChange('preferredTime', value)}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="morning" id="morning" />
                <Label htmlFor="morning">Morning (9 AM - 12 PM)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="afternoon" id="afternoon" />
                <Label htmlFor="afternoon">Afternoon (12 PM - 5 PM)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="evening" id="evening" />
                <Label htmlFor="evening">Evening (5 PM - 8 PM)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="anytime" id="anytime" />
                <Label htmlFor="anytime">Anytime</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-900 mb-1">Delivery Timeline</h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Kit delivery: 3-5 business days</li>
                <li>• Sample processing: 2-3 weeks after we receive your kit</li>
                <li>• Results available: In your MeddyPal dashboard</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => setStep(2)} variant="outline">
            Back
          </Button>
          <Button 
            onClick={() => setStep(4)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => {
    const commonConditions = [
      'Diabetes', 'High Blood Pressure', 'Heart Disease', 'Asthma', 
      'Arthritis', 'Depression', 'Anxiety', 'Cancer', 'Kidney Disease', 'None'
    ];

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-600" />
            Health Profile (Optional)
          </CardTitle>
          <p className="text-gray-600">
            Help us provide more personalized insights by sharing your health background
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-3 block">
              Current Health Conditions
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {commonConditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox 
                    checked={consentData.healthProfile.currentConditions.includes(condition)}
                    onCheckedChange={() => handleConditionToggle(condition)}
                  />
                  <Label className="text-sm">{condition}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="medications">Current Medications</Label>
            <Textarea
              id="medications"
              placeholder="List any medications you're currently taking (optional)"
              value={consentData.healthProfile.medications}
              onChange={(e) => handleHealthProfileChange('medications', e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="concerns">Health Concerns or Goals</Label>
            <Textarea
              id="concerns"
              placeholder="Any specific health concerns or wellness goals? (optional)"
              value={consentData.healthProfile.concerns}
              onChange={(e) => handleHealthProfileChange('concerns', e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-green-900 mb-1">Privacy & Security</h5>
                <p className="text-sm text-green-700">
                  All health information is encrypted and protected according to government healthcare standards. 
                  You can update or delete this information anytime in your profile.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setStep(3)} variant="outline">
              Back
            </Button>
            <Button 
              onClick={handleComplete}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Order My Free DNA Kit
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const steps = [renderStep1, renderStep2, renderStep3, renderStep4];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNum === step 
                    ? 'bg-purple-600 text-white' 
                    : stepNum < step 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum < step ? <CheckCircle className="w-4 h-4" /> : stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-8 h-1 ${stepNum < step ? 'bg-green-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {steps[step - 1]()}
      </div>
    </div>
  );
};

export default GenomicsOnboardingFlow;