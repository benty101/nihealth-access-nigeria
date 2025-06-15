
import { QuickActionsService } from './QuickActionsService';
import { RecommendationsService } from './RecommendationsService';
import { InsightsService } from './InsightsService';
import { GreetingService } from './GreetingService';
import { LocationDataService } from './LocationDataService';

// Re-export types for backward compatibility
export type { 
  OnboardingData, 
  QuickAction, 
  Recommendation, 
  PersonalizedInsight 
} from '@/types/personalization';

export class PersonalizationService {
  static getOnboardingData() {
    const storedData = localStorage.getItem('userOnboardingData');
    return storedData ? JSON.parse(storedData) : null;
  }

  static getPersonalizedQuickActions(onboardingData: any) {
    return QuickActionsService.getPersonalizedQuickActions(onboardingData);
  }

  static getPersonalizedRecommendations(onboardingData: any) {
    return RecommendationsService.getPersonalizedRecommendations(onboardingData);
  }

  static getPersonalizedGreeting(onboardingData: any) {
    return GreetingService.getPersonalizedGreeting(onboardingData);
  }

  static getPersonalizedInsights(onboardingData: any) {
    return InsightsService.getPersonalizedInsights(onboardingData);
  }

  static getLocationSpecificContent(location: string) {
    return LocationDataService.getLocationSpecificContent(location);
  }
}
