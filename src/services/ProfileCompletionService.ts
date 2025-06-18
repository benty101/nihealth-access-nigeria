
import { supabase } from '@/integrations/supabase/client';

export interface ProfileCompletionStatus {
  overallProgress: number;
  missingFields: string[];
  categories: {
    basicInfo: { completed: boolean; missing: string[] };
    healthData: { completed: boolean; missing: string[] };
    emergencyContact: { completed: boolean; missing: string[] };
    pregnancyInfo: { completed: boolean; missing: string[] };
    medicalHistory: { completed: boolean; missing: string[] };
    insurance: { completed: boolean; missing: string[] };
  };
}

export interface ProfileReminder {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
  link: string;
}

export const ProfileCompletionService = {
  async getProfileCompletionStatus(userId: string): Promise<ProfileCompletionStatus> {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!profile) {
      return {
        overallProgress: 0,
        missingFields: [],
        categories: {
          basicInfo: { completed: false, missing: ['all basic information'] },
          healthData: { completed: false, missing: ['all health data'] },
          emergencyContact: { completed: false, missing: ['emergency contact'] },
          pregnancyInfo: { completed: false, missing: [] },
          medicalHistory: { completed: false, missing: ['medical history'] },
          insurance: { completed: false, missing: ['insurance information'] }
        }
      };
    }

    const basicInfoFields = ['full_name', 'phone_number', 'date_of_birth', 'gender', 'state_of_residence', 'lga', 'address'];
    const healthDataFields = ['blood_group', 'genotype'];
    const emergencyFields = ['emergency_contact_name', 'emergency_contact_phone'];
    const pregnancyFields = profile.is_pregnant ? ['due_date'] : [];
    const medicalFields = ['allergies', 'chronic_conditions'];
    const insuranceFields = ['insurance_provider', 'insurance_number'];

    const checkFields = (fields: string[]) => {
      const missing = fields.filter(field => !profile[field] || (Array.isArray(profile[field]) && profile[field].length === 0));
      return { completed: missing.length === 0, missing };
    };

    const categories = {
      basicInfo: checkFields(basicInfoFields),
      healthData: checkFields(healthDataFields),
      emergencyContact: checkFields(emergencyFields),
      pregnancyInfo: checkFields(pregnancyFields),
      medicalHistory: checkFields(medicalFields),
      insurance: checkFields(insuranceFields)
    };

    const totalFields = basicInfoFields.length + healthDataFields.length + emergencyFields.length + 
                       pregnancyFields.length + medicalFields.length + insuranceFields.length;
    const completedFields = totalFields - Object.values(categories).reduce((acc, cat) => acc + cat.missing.length, 0);
    const overallProgress = Math.round((completedFields / totalFields) * 100);

    const allMissingFields = Object.values(categories).flatMap(cat => cat.missing);

    return {
      overallProgress,
      missingFields: allMissingFields,
      categories
    };
  },

  async getProfileReminders(userId: string): Promise<ProfileReminder[]> {
    const status = await this.getProfileCompletionStatus(userId);
    const reminders: ProfileReminder[] = [];

    if (!status.categories.basicInfo.completed) {
      reminders.push({
        id: 'basic-info',
        category: 'Profile Setup',
        title: 'Complete Basic Information',
        description: 'Add your personal details to get personalized health recommendations',
        priority: 'high',
        action: 'Complete Now',
        link: '/profile'
      });
    }

    if (!status.categories.emergencyContact.completed) {
      reminders.push({
        id: 'emergency-contact',
        category: 'Safety',
        title: 'Add Emergency Contact',
        description: 'Add someone we can contact in case of emergency',
        priority: 'high',
        action: 'Add Contact',
        link: '/profile'
      });
    }

    if (!status.categories.healthData.completed) {
      reminders.push({
        id: 'health-data',
        category: 'Health Profile',
        title: 'Add Health Metrics',
        description: 'Add your blood group, genotype, and other vital health information',
        priority: 'medium',
        action: 'Add Health Data',
        link: '/profile'
      });
    }

    if (!status.categories.medicalHistory.completed) {
      reminders.push({
        id: 'medical-history',
        category: 'Medical History',
        title: 'Update Medical History',
        description: 'Add information about allergies and chronic conditions',
        priority: 'medium',
        action: 'Update History',
        link: '/profile'
      });
    }

    if (!status.categories.insurance.completed) {
      reminders.push({
        id: 'insurance',
        category: 'Insurance',
        title: 'Add Insurance Information',
        description: 'Link your health insurance for easier claims processing',
        priority: 'low',
        action: 'Add Insurance',
        link: '/profile'
      });
    }

    return reminders;
  }
};
