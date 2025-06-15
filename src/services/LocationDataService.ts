
import { LocationContent } from '@/types/personalization';

export class LocationDataService {
  static getLocationSpecificContent(location: string): LocationContent {
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
    const specialists: { [key: string]: string[] } = {
      'Lagos': ['Cardiology', 'Oncology', 'Neurology', 'Obstetrics'],
      'Abuja': ['Internal Medicine', 'Pediatrics', 'Surgery', 'Dermatology'],
      'Kano': ['Family Medicine', 'Pediatrics', 'Internal Medicine'],
      default: ['General Practice', 'Pediatrics', 'Internal Medicine']
    };
    
    return specialists[location] || specialists.default;
  }
}
