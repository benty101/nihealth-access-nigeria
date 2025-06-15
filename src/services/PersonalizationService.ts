
import { 
  Heart, 
  Calendar, 
  FileText, 
  Shield, 
  Stethoscope, 
  Pill, 
  TestTube, 
  MapPin, 
  Clock, 
  Bell,
  TrendingUp,
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  Baby,
  User,
  Activity,
  Target,
  Zap
} from 'lucide-react';

export interface OnboardingData {
  lifeStage: string;
  healthGoals: string[];
  location: string;
}

export interface QuickAction {
  icon: any;
  title: string;
  description: string;
  color: string;
  hoverColor: string;
}

export interface Recommendation {
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  icon: any;
}

export interface PersonalizedInsight {
  title: string;
  description: string;
  value: string;
  trend?: 'up' | 'down' | 'stable';
  color: string;
  icon: any;
}

export class PersonalizationService {
  static getOnboardingData(): OnboardingData | null {
    const storedData = localStorage.getItem('userOnboardingData');
    return storedData ? JSON.parse(storedData) : null;
  }

  static getPersonalizedQuickActions(onboardingData: OnboardingData | null): QuickAction[] {
    const baseActions: QuickAction[] = [
      {
        icon: Calendar,
        title: 'Book Appointment',
        description: 'Schedule with doctors',
        color: 'bg-blue-500',
        hoverColor: 'hover:bg-blue-600'
      },
      {
        icon: Pill,
        title: 'Order Medicine',
        description: 'Pharmacy delivery',
        color: 'bg-green-500',
        hoverColor: 'hover:bg-green-600'
      },
      {
        icon: TestTube,
        title: 'Book Lab Test',
        description: 'Diagnostic services',
        color: 'bg-orange-500',
        hoverColor: 'hover:bg-orange-600'
      },
      {
        icon: Stethoscope,
        title: `Find Hospital in ${onboardingData?.location || 'Your Area'}`,
        description: 'Nearby facilities',
        color: 'bg-purple-500',
        hoverColor: 'hover:bg-purple-600'
      }
    ];

    if (onboardingData?.lifeStage === 'pregnant') {
      return [
        {
          icon: Baby,
          title: 'Antenatal Care',
          description: 'Track pregnancy milestones',
          color: 'bg-pink-500',
          hoverColor: 'hover:bg-pink-600'
        },
        {
          icon: Calendar,
          title: `Find Maternity Hospitals in ${onboardingData.location}`,
          description: 'Book antenatal appointments',
          color: 'bg-blue-500',
          hoverColor: 'hover:bg-blue-600'
        },
        ...baseActions.slice(1, 3)
      ];
    }

    if (onboardingData?.lifeStage === 'mother') {
      return [
        {
          icon: Heart,
          title: 'Family Health',
          description: 'Manage family records',
          color: 'bg-rose-500',
          hoverColor: 'hover:bg-rose-600'
        },
        {
          icon: Shield,
          title: `Pediatric Care in ${onboardingData.location}`,
          description: 'Child health services',
          color: 'bg-indigo-500',
          hoverColor: 'hover:bg-indigo-600'
        },
        ...baseActions.slice(1, 4)
      ];
    }

    if (onboardingData?.lifeStage === 'elderly') {
      return [
        {
          icon: Shield,
          title: 'Chronic Care',
          description: 'Medication management',
          color: 'bg-indigo-500',
          hoverColor: 'hover:bg-indigo-600'
        },
        {
          icon: Heart,
          title: `Specialist Care in ${onboardingData.location}`,
          description: 'Senior health services',
          color: 'bg-red-500',
          hoverColor: 'hover:bg-red-600'
        },
        ...baseActions
      ];
    }

    return baseActions;
  }

  static getPersonalizedRecommendations(onboardingData: OnboardingData | null): Recommendation[] {
    if (!onboardingData) return [];

    const recommendations: Recommendation[] = [];
    const location = onboardingData.location;

    if (onboardingData.lifeStage === 'pregnant') {
      recommendations.push(
        {
          title: `Antenatal Care in ${location}`,
          description: `Find the best maternity hospitals and doctors in ${location} for your pregnancy journey`,
          action: 'Find Care',
          priority: 'high',
          icon: Baby
        },
        {
          title: 'Pregnancy Insurance Plans',
          description: `Compare maternal health insurance options available in ${location}`,
          action: 'Compare Plans',
          priority: 'high',
          icon: Shield
        },
        {
          title: 'Prenatal Vitamins',
          description: `Order essential pregnancy supplements from pharmacies in ${location}`,
          action: 'Order Now',
          priority: 'medium',
          icon: Pill
        }
      );
    }

    if (onboardingData.lifeStage === 'mother') {
      recommendations.push(
        {
          title: `Child Vaccination in ${location}`,
          description: `Upcoming immunization schedules for children - find pediatric clinics in ${location}`,
          action: 'Schedule',
          priority: 'high',
          icon: Shield
        },
        {
          title: `Family Health Screening in ${location}`,
          description: `Annual checkups and preventive care for your family available in ${location}`,
          action: 'Book',
          priority: 'medium',
          icon: Users
        },
        {
          title: 'Family Insurance Coverage',
          description: `Comprehensive health plans for families in ${location}`,
          action: 'Explore',
          priority: 'medium',
          icon: Heart
        }
      );
    }

    if (onboardingData.lifeStage === 'elderly') {
      recommendations.push(
        {
          title: `Senior Care Specialists in ${location}`,
          description: `Connect with geriatric specialists and chronic care providers in ${location}`,
          action: 'Find Doctors',
          priority: 'high',
          icon: Stethoscope
        },
        {
          title: 'Medication Delivery',
          description: `Set up regular medication delivery from pharmacies in ${location}`,
          action: 'Setup',
          priority: 'high',
          icon: Pill
        },
        {
          title: 'Health Monitoring',
          description: `Book regular health checkups and diagnostic tests in ${location}`,
          action: 'Schedule',
          priority: 'medium',
          icon: Activity
        }
      );
    }

    // Add location-specific general recommendations
    recommendations.push({
      title: `Emergency Services in ${location}`,
      description: `Know your nearest emergency facilities and contact numbers in ${location}`,
      action: 'View',
      priority: 'medium',
      icon: AlertCircle
    });

    return recommendations;
  }

  static getPersonalizedGreeting(onboardingData: OnboardingData | null): string {
    if (!onboardingData) return "Welcome back! Here's your health overview.";

    const location = onboardingData.location;
    const greetings = {
      pregnant: `Welcome back! Here's your pregnancy care overview for ${location}.`,
      mother: `Welcome back! Here's your family's health overview in ${location}.`,
      elderly: `Welcome back! Here's your personalized health management for ${location}.`,
      general: `Welcome back! Here's your health overview for ${location}.`
    };

    return greetings[onboardingData.lifeStage as keyof typeof greetings] || greetings.general;
  }

  static getPersonalizedInsights(onboardingData: OnboardingData | null): PersonalizedInsight[] {
    if (!onboardingData) return [];

    const insights: PersonalizedInsight[] = [];
    const location = onboardingData.location;

    // Common insights based on location
    insights.push({
      title: `Healthcare Access in ${location}`,
      description: 'Quality facilities near you',
      value: '12+ hospitals',
      trend: 'stable',
      color: 'text-blue-600',
      icon: MapPin
    });

    if (onboardingData.lifeStage === 'pregnant') {
      insights.push(
        {
          title: 'Pregnancy Progress',
          description: 'Trimester milestones',
          value: '2nd Trimester',
          trend: 'up',
          color: 'text-pink-600',
          icon: Baby
        },
        {
          title: 'Next Appointment',
          description: 'Upcoming checkup',
          value: 'In 5 days',
          color: 'text-orange-600',
          icon: Calendar
        }
      );
    }

    if (onboardingData.lifeStage === 'mother') {
      insights.push(
        {
          title: 'Family Health Score',
          description: 'Overall family wellness',
          value: '92%',
          trend: 'up',
          color: 'text-green-600',
          icon: Heart
        },
        {
          title: 'Vaccination Status',
          description: 'Children immunizations',
          value: 'Up to date',
          color: 'text-blue-600',
          icon: Shield
        }
      );
    }

    if (onboardingData.lifeStage === 'elderly') {
      insights.push(
        {
          title: 'Health Monitoring',
          description: 'Regular checkup streak',
          value: '6 months',
          trend: 'up',
          color: 'text-green-600',
          icon: Activity
        },
        {
          title: 'Medication Adherence',
          description: 'On-time medication',
          value: '95%',
          trend: 'stable',
          color: 'text-blue-600',
          icon: Pill
        }
      );
    }

    // Add health goals progress
    if (onboardingData.healthGoals.length > 0) {
      insights.push({
        title: 'Health Goals',
        description: 'Progress towards objectives',
        value: `${onboardingData.healthGoals.length} active`,
        trend: 'up',
        color: 'text-purple-600',
        icon: Target
      });
    }

    return insights;
  }

  static getLocationSpecificContent(location: string) {
    // This could be expanded to provide location-specific health information
    return {
      emergencyNumber: location === 'Lagos' ? '199' : '112',
      commonHealthConcerns: this.getLocationHealthConcerns(location),
      nearbySpecialists: this.getNearbySpecialists(location)
    };
  }

  private static getLocationHealthConcerns(location: string): string[] {
    const concerns: { [key: string]: string[] } = {
      'Lagos': ['Air pollution', 'Traffic stress', 'Water quality'],
      'Abuja': ['Dust allergies', 'Heat stress', 'Malaria prevention'],
      'Kano': ['Dust storms', 'Meningitis prevention', 'Heat-related illness'],
      'Rivers': ['Oil pollution', 'Respiratory issues', 'Water contamination'],
      default: ['Malaria prevention', 'Water quality', 'Preventive care']
    };
    
    return concerns[location] || concerns.default;
  }

  private static getNearbySpecialists(location: string): string[] {
    // This would typically come from a database
    const specialists: { [key: string]: string[] } = {
      'Lagos': ['Cardiology', 'Oncology', 'Neurology', 'Obstetrics'],
      'Abuja': ['Internal Medicine', 'Pediatrics', 'Surgery', 'Dermatology'],
      'Kano': ['Family Medicine', 'Pediatrics', 'Internal Medicine'],
      default: ['General Practice', 'Pediatrics', 'Internal Medicine']
    };
    
    return specialists[location] || specialists.default;
  }
}
