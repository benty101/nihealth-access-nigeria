
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Shield, 
  MapPin, 
  Star,
  TrendingUp,
  Users,
  Stethoscope,
  Baby,
  AlertCircle
} from 'lucide-react';
import { OnboardingData } from '@/services/PersonalizationService';

interface SmartRecommendationsProps {
  onboardingData: OnboardingData | null;
}

interface SmartRecommendation {
  id: string;
  type: 'insurance' | 'hospital' | 'service' | 'emergency';
  title: string;
  description: string;
  reason: string;
  action: string;
  icon: any;
  priority: number;
  location?: string;
  rating?: number;
  distance?: string;
}

const SmartRecommendations = ({ onboardingData }: SmartRecommendationsProps) => {
  const getSmartRecommendations = (): SmartRecommendation[] => {
    const recommendations: SmartRecommendation[] = [];
    const userLocation = onboardingData?.location || 'Nigeria';

    // Location-specific hospital recommendations
    const locationHospitals: { [key: string]: any[] } = {
      'Lagos': [
        { name: 'Lagos University Teaching Hospital', specialty: 'General & Maternity', rating: 4.8, distance: '2.5km' },
        { name: 'National Hospital Lagos', specialty: 'Specialized Care', rating: 4.7, distance: '3.2km' },
        { name: 'Gbagada General Hospital', specialty: 'Emergency Care', rating: 4.5, distance: '4.1km' }
      ],
      'Abuja': [
        { name: 'University of Abuja Teaching Hospital', specialty: 'General & Specialist', rating: 4.9, distance: '1.8km' },
        { name: 'National Hospital Abuja', specialty: 'Tertiary Care', rating: 4.8, distance: '2.3km' },
        { name: 'Garki Hospital', specialty: 'Family Medicine', rating: 4.6, distance: '3.5km' }
      ],
      'Kano': [
        { name: 'Aminu Kano Teaching Hospital', specialty: 'Teaching & Research', rating: 4.7, distance: '2.1km' },
        { name: 'Murtala Mohammed Specialist Hospital', specialty: 'Specialist Care', rating: 4.6, distance: '3.0km' }
      ],
      'Rivers': [
        { name: 'University of Port Harcourt Teaching Hospital', specialty: 'Teaching Hospital', rating: 4.8, distance: '2.7km' },
        { name: 'Braithwaite Memorial Hospital', specialty: 'General Hospital', rating: 4.5, distance: '1.9km' }
      ]
    };

    const hospitals = locationHospitals[userLocation] || [
      { name: `General Hospital ${userLocation}`, specialty: 'General Care', rating: 4.5, distance: '2.0km' }
    ];

    if (onboardingData?.lifeStage === 'pregnant') {
      // Pregnancy-specific recommendations
      const maternityHospital = hospitals.find(h => h.specialty.includes('Maternity')) || hospitals[0];
      
      recommendations.push(
        {
          id: 'maternal_care',
          type: 'hospital',
          title: `${maternityHospital.name}`,
          description: `Top-rated maternity services in ${userLocation} - ${maternityHospital.specialty}`,
          reason: 'Specialized maternal care for your pregnancy',
          action: 'Book Appointment',
          icon: Baby,
          priority: 1,
          location: userLocation,
          rating: maternityHospital.rating,
          distance: maternityHospital.distance
        },
        {
          id: 'pregnancy_insurance',
          type: 'insurance',
          title: 'Maternal Health Insurance',
          description: `Comprehensive pregnancy coverage available in ${userLocation}`,
          reason: 'Based on your pregnancy status',
          action: 'Compare Plans',
          icon: Shield,
          priority: 2,
          rating: 4.8
        },
        {
          id: 'antenatal_classes',
          type: 'service',
          title: `Antenatal Classes in ${userLocation}`,
          description: 'Prepare for childbirth with expert guidance',
          reason: 'Essential pregnancy preparation',
          action: 'Enroll Now',
          icon: Users,
          priority: 3,
          rating: 4.7
        }
      );
    } else if (onboardingData?.lifeStage === 'mother') {
      // Mother-specific recommendations
      const pediatricHospital = hospitals.find(h => h.specialty.includes('Family') || h.specialty.includes('General')) || hospitals[0];
      
      recommendations.push(
        {
          id: 'pediatric_care',
          type: 'hospital',
          title: `${pediatricHospital.name}`,
          description: `Family and pediatric services in ${userLocation}`,
          reason: 'Child healthcare and family medicine',
          action: 'Find Pediatricians',
          icon: Heart,
          priority: 1,
          location: userLocation,
          rating: pediatricHospital.rating,
          distance: pediatricHospital.distance
        },
        {
          id: 'family_insurance',
          type: 'insurance',
          title: 'Family Health Plan',
          description: `Comprehensive coverage for your family in ${userLocation}`,
          reason: 'Protect your family\'s health',
          action: 'Get Quote',
          icon: Shield,
          priority: 2,
          rating: 4.6
        }
      );
    } else if (onboardingData?.lifeStage === 'elderly') {
      // Elderly-specific recommendations
      const specialistHospital = hospitals.find(h => h.specialty.includes('Specialist') || h.specialty.includes('Teaching')) || hospitals[0];
      
      recommendations.push(
        {
          id: 'geriatric_care',
          type: 'hospital',
          title: `${specialistHospital.name}`,
          description: `Senior care specialists and chronic disease management in ${userLocation}`,
          reason: 'Specialized care for seniors',
          action: 'Book Consultation',
          icon: Stethoscope,
          priority: 1,
          location: userLocation,
          rating: specialistHospital.rating,
          distance: specialistHospital.distance
        },
        {
          id: 'chronic_care_plan',
          type: 'insurance',
          title: 'Senior Health Plan',
          description: `Chronic condition coverage and medication support in ${userLocation}`,
          reason: 'Comprehensive senior care',
          action: 'Learn More',
          icon: Shield,
          priority: 2,
          rating: 4.7
        }
      );
    } else {
      // General recommendations
      const generalHospital = hospitals[0];
      
      recommendations.push(
        {
          id: 'general_hospital',
          type: 'hospital',
          title: `${generalHospital.name}`,
          description: `Quality healthcare services in ${userLocation}`,
          reason: 'Nearest quality healthcare facility',
          action: 'View Services',
          icon: Stethoscope,
          priority: 1,
          location: userLocation,
          rating: generalHospital.rating,
          distance: generalHospital.distance
        }
      );
    }

    // Always add emergency services for the user's location
    recommendations.push({
      id: 'emergency_services',
      type: 'emergency',
      title: `Emergency Services in ${userLocation}`,
      description: `24/7 emergency care and ambulance services in your area`,
      reason: 'Essential emergency preparedness',
      action: 'View Details',
      icon: AlertCircle,
      priority: 4,
      location: userLocation,
      rating: 4.8
    });

    // Add telemedicine as a modern option
    recommendations.push({
      id: 'telemedicine',
      type: 'service',
      title: 'Virtual Doctor Consultation',
      description: `Connect with licensed doctors from anywhere in ${userLocation}`,
      reason: 'Convenient and accessible healthcare',
      action: 'Start Consultation',
      icon: Users,
      priority: 5,
      rating: 4.5
    });

    return recommendations.sort((a, b) => a.priority - b.priority).slice(0, 4);
  };

  const recommendations = getSmartRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
          Smart Recommendations for {onboardingData?.location}
        </CardTitle>
        <p className="text-sm text-gray-600">
          Personalized healthcare options based on your profile and location
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    rec.type === 'emergency' ? 'bg-red-100' : 
                    rec.type === 'hospital' ? 'bg-blue-100' :
                    rec.type === 'insurance' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    <rec.icon className={`h-5 w-5 ${
                      rec.type === 'emergency' ? 'text-red-600' :
                      rec.type === 'hospital' ? 'text-blue-600' :
                      rec.type === 'insurance' ? 'text-green-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                      {rec.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">{rec.rating}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                    <div className="flex items-center space-x-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {rec.reason}
                      </Badge>
                      {rec.distance && (
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {rec.distance}
                        </Badge>
                      )}
                      {rec.location && (
                        <Badge variant="outline" className="text-xs">
                          {rec.location}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className={
                    rec.type === 'emergency' ? 'border-red-200 text-red-700 hover:bg-red-50' :
                    rec.priority === 1 ? 'border-teal-200 text-teal-700 hover:bg-teal-50' : ''
                  }
                >
                  {rec.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartRecommendations;
