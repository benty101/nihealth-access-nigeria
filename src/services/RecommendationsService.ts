
import { 
  Baby,
  Shield,
  Pill,
  Users,
  Heart,
  Stethoscope,
  Activity,
  AlertCircle
} from 'lucide-react';
import { OnboardingData, Recommendation } from '@/types/personalization';

export class RecommendationsService {
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
}
