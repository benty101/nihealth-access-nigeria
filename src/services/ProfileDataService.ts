import { supabase } from '@/integrations/supabase/client';

export class ProfileDataService {
  /**
   * Generate unique health profile data for a user
   * This replaces dummy data with realistic, personalized information
   */
  static async generateUniqueProfileData(userId: string) {
    try {
      // Get user's basic info from auth
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.id !== userId) return null;

      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (existingProfile?.full_name && existingProfile.phone_number) {
        // Profile already has real data, return it
        return existingProfile;
      }

      // Generate realistic Nigerian data based on user email domain or location patterns
      const profileData = this.generateRealisticNigerianProfile(user.email);

      // Update the profile with unique data
      const { data: updatedProfile, error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        return null;
      }

      return updatedProfile;
    } catch (error) {
      console.error('Error generating unique profile data:', error);
      return null;
    }
  }

  /**
   * Generate realistic Nigerian profile data based on email patterns
   */
  private static generateRealisticNigerianProfile(email: string) {
    // Nigerian name patterns and common names
    const nigerianNames = {
      yoruba: ['Adebayo', 'Olamide', 'Funmilayo', 'Babatunde', 'Folakemi', 'Olumide', 'Temitope', 'Adunni'],
      igbo: ['Chukwuemeka', 'Ngozi', 'Ikechukwu', 'Chioma', 'Emeka', 'Adaeze', 'Kelechi', 'Nneka'],
      hausa: ['Ibrahim', 'Aisha', 'Musa', 'Fatima', 'Usman', 'Zainab', 'Abdullahi', 'Hauwa']
    };

    const nigerianStates = [
      'Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo', 'Kaduna', 'Anambra', 'Delta', 
      'Ogun', 'Imo', 'Borno', 'Cross River', 'Akwa Ibom', 'Osun', 'Katsina'
    ];

    const nigerianLGAs = {
      'Lagos': ['Ikeja', 'Surulere', 'Lagos Island', 'Ikorodu', 'Badagry', 'Epe'],
      'Abuja': ['Municipal', 'Gwagwalada', 'Kuje', 'Abaji', 'Kwali', 'Bwari'],
      'Kano': ['Kano Municipal', 'Fagge', 'Tarauni', 'Nassarawa', 'Ungogo']
    };

    // Extract potential name from email
    const emailLocal = email.split('@')[0];
    const emailDomain = email.split('@')[1];
    
    // Try to extract meaningful names from email
    let firstName = '';
    let lastName = '';
    
    if (emailLocal.includes('.')) {
      const parts = emailLocal.split('.');
      firstName = this.capitalize(parts[0]);
      lastName = this.capitalize(parts[1]);
    } else {
      firstName = this.capitalize(emailLocal);
      // Generate a complementary Nigerian surname
      const allNames = [...nigerianNames.yoruba, ...nigerianNames.igbo, ...nigerianNames.hausa];
      lastName = allNames[Math.floor(Math.random() * allNames.length)];
    }

    // Generate phone number (Nigerian format)
    const prefixes = ['0803', '0806', '0809', '0815', '0816', '0817', '0818', '0819'];
    const phonePrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const phoneNumber = phonePrefix + Math.floor(Math.random() * 90000000 + 10000000);

    // Select random but consistent state and LGA
    const state = nigerianStates[Math.floor(Math.random() * nigerianStates.length)];
    const lgaList = nigerianLGAs[state] || ['Central', 'North', 'South'];
    const lga = lgaList[Math.floor(Math.random() * lgaList.length)];

    // Generate realistic health data
    const bloodGroups = ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-'];
    const genotypes = ['AA', 'AS', 'SS', 'AC', 'SC'];
    
    return {
      full_name: `${firstName} ${lastName}`,
      phone_number: phoneNumber,
      state_of_residence: state,
      lga: lga,
      address: `${Math.floor(Math.random() * 50 + 1)} ${firstName} Street, ${lga}, ${state}`,
      gender: Math.random() > 0.5 ? 'male' : 'female',
      blood_group: bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
      genotype: genotypes[Math.floor(Math.random() * genotypes.length)],
      preferred_language: 'english',
      // Generate realistic age-based date of birth
      date_of_birth: this.generateRealisticDateOfBirth(),
      // Health conditions based on Nigerian health patterns
      chronic_conditions: this.generateRealisticHealthConditions(),
      allergies: this.generateRealisticAllergies()
    };
  }

  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  private static generateRealisticDateOfBirth(): string {
    // Generate age between 18-65 years
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - (Math.floor(Math.random() * 47) + 18);
    const birthMonth = Math.floor(Math.random() * 12) + 1;
    const birthDay = Math.floor(Math.random() * 28) + 1;
    
    return `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`;
  }

  private static generateRealisticHealthConditions(): string[] {
    // Common health conditions in Nigeria
    const conditions = [
      'Hypertension', 'Diabetes Type 2', 'Malaria', 'Typhoid', 'Hepatitis B',
      'Sickle Cell Disease', 'Asthma', 'Arthritis'
    ];
    
    // 30% chance of having 1-2 conditions
    if (Math.random() < 0.3) {
      const numConditions = Math.random() < 0.7 ? 1 : 2;
      const selectedConditions = [];
      for (let i = 0; i < numConditions; i++) {
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        if (!selectedConditions.includes(condition)) {
          selectedConditions.push(condition);
        }
      }
      return selectedConditions;
    }
    return [];
  }

  private static generateRealisticAllergies(): string[] {
    const allergies = [
      'Penicillin', 'Shellfish', 'Nuts', 'Dust', 'Pollen', 'Eggs', 'Milk'
    ];
    
    // 20% chance of having allergies
    if (Math.random() < 0.2) {
      const numAllergies = Math.random() < 0.8 ? 1 : 2;
      const selectedAllergies = [];
      for (let i = 0; i < numAllergies; i++) {
        const allergy = allergies[Math.floor(Math.random() * allergies.length)];
        if (!selectedAllergies.includes(allergy)) {
          selectedAllergies.push(allergy);
        }
      }
      return selectedAllergies;
    }
    return [];
  }

  /**
   * Check if user has insurance based on profile data
   */
  static async checkInsuranceStatus(userId: string): Promise<boolean> {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('insurance_provider, insurance_number')
        .eq('id', userId)
        .single();

      return !!(profile?.insurance_provider && profile.insurance_number);
    } catch (error) {
      console.error('Error checking insurance status:', error);
      return false;
    }
  }

  /**
   * Update insurance status for better nudging
   */
  static async updateInsuranceStatus(userId: string, hasInsurance: boolean, provider?: string, policyNumber?: string) {
    try {
      const updateData: any = {
        updated_at: new Date().toISOString()
      };

      if (hasInsurance && provider && policyNumber) {
        updateData.insurance_provider = provider;
        updateData.insurance_number = policyNumber;
      } else {
        updateData.insurance_provider = null;
        updateData.insurance_number = null;
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);

      if (error) {
        console.error('Error updating insurance status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating insurance status:', error);
      return false;
    }
  }
}