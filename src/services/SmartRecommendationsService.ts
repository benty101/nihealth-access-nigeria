
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
import { OnboardingData } from '@/types/personalization';

export interface SmartRecommendation {
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

export class SmartRecommendationsService {
  static getLocationHospitals() {
    return {
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
  }

  static getPregnancyRecommendations(userLocation: string, hospitals: any[]): SmartRecommendation[] {
    const maternityHospital = hospitals.find(h => h.specialty.includes('Maternity')) || hospitals[0];
    
    return [
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
    ];
  }

  static getMotherRecommendations(userLocation: string, hospitals: any[]): SmartRecommendation[] {
    const pediatricHospital = hospitals.find(h => h.specialty.includes('Family') || h.specialty.includes('General')) || hospitals[0];
    
    return [
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
    ];
  }

  static getElderlyRecommendations(userLocation: string, hospitals: any[]): SmartRecommendation[] {
    const specialistHospital = hospitals.find(h => h.specialty.includes('Specialist') || h.specialty.includes('Teaching')) || hospitals[0];
    
    return [
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
    ];
  }

  static getGeneralRecommendations(userLocation: string, hospitals: any[]): SmartRecommendation[] {
    const generalHospital = hospitals[0];
    
    return [
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
    ];
  }

  static getCommonRecommendations(userLocation: string): SmartRecommendation[] {
    return [
      {
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
      },
      {
        id: 'telemedicine',
        type: 'service',
        title: 'Virtual Doctor Consultation',
        description: `Connect with licensed doctors from anywhere in ${userLocation}`,
        reason: 'Convenient and accessible healthcare',
        action: 'Start Consultation',
        icon: Users,
        priority: 5,
        rating: 4.5
      }
    ];
  }

  static getSmartRecommendations(onboardingData: OnboardingData | null): SmartRecommendation[] {
    const recommendations: SmartRecommendation[] = [];
    const userLocation = onboardingData?.location || 'Nigeria';
    
    const locationHospitals = this.getLocationHospitals();
    const hospitals = locationHospitals[userLocation as keyof typeof locationHospitals] || [
      { name: `General Hospital ${userLocation}`, specialty: 'General Care', rating: 4.5, distance: '2.0km' }
    ];

    if (onboardingData?.lifeStage === 'pregnant') {
      recommendations.push(...this.getPregnancyRecommendations(userLocation, hospitals));
    } else if (onboardingData?.lifeStage === 'mother') {
      recommendations.push(...this.getMotherRecommendations(userLocation, hospitals));
    } else if (onboardingData?.lifeStage === 'elderly') {
      recommendations.push(...this.getElderlyRecommendations(userLocation, hospitals));
    } else {
      recommendations.push(...this.getGeneralRecommendations(userLocation, hospitals));
    }

    recommendations.push(...this.getCommonRecommendations(userLocation));

    return recommendations.sort((a, b) => a.priority - b.priority).slice(0, 4);
  }
}
