import { supabase } from "@/integrations/supabase/client";

export interface UserConsent {
  id: string;
  user_id: string;
  consent_type: string;
  consent_given: boolean;
  consent_date: string;
  consent_version: string;
  withdrawal_date?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface ConsentType {
  type: string;
  title: string;
  description: string;
  required: boolean;
  version: string;
}

export class ConsentService {
  static getConsentTypes(): ConsentType[] {
    return [
      {
        type: 'research',
        title: 'Research Participation',
        description: 'Allow your de-identified health data to be used for medical research to improve healthcare for all Nigerians',
        required: false,
        version: '1.0'
      },
      {
        type: 'biobanking',
        title: 'Biobanking Consent',
        description: 'Store your biological samples in our NABDA-certified biobank for future research and analysis',
        required: false,
        version: '1.0'
      },
      {
        type: 'data_sharing',
        title: 'Data Sharing',
        description: 'Share anonymized health data with healthcare providers and researchers to improve care quality',
        required: false,
        version: '1.0'
      },
      {
        type: 'genomic_analysis',
        title: 'Genomic Analysis',
        description: 'Allow advanced genetic analysis of your samples for personalized health insights',
        required: false,
        version: '1.0'
      },
      {
        type: 'family_sharing',
        title: 'Family Health Sharing',
        description: 'Share relevant genetic information with family members for their health benefit',
        required: false,
        version: '1.0'
      }
    ];
  }

  static async getUserConsents(userId: string): Promise<UserConsent[]> {
    const { data, error } = await supabase
      .from('user_consents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async updateConsent(
    userId: string, 
    consentType: string, 
    consentGiven: boolean, 
    version: string = '1.0'
  ): Promise<UserConsent> {
    // First check if consent already exists
    const { data: existing } = await supabase
      .from('user_consents')
      .select('*')
      .eq('user_id', userId)
      .eq('consent_type', consentType)
      .single();

    if (existing) {
      // Update existing consent
      const updateData: any = {
        consent_given: consentGiven,
        consent_version: version
      };

      if (consentGiven) {
        updateData.consent_date = new Date().toISOString();
        updateData.withdrawal_date = null;
      } else {
        updateData.withdrawal_date = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('user_consents')
        .update(updateData)
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Create new consent
      const { data, error } = await supabase
        .from('user_consents')
        .insert({
          user_id: userId,
          consent_type: consentType,
          consent_given: consentGiven,
          consent_date: new Date().toISOString(),
          consent_version: version
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }

  static async withdrawConsent(userId: string, consentType: string): Promise<UserConsent> {
    return this.updateConsent(userId, consentType, false);
  }

  static async giveConsent(userId: string, consentType: string): Promise<UserConsent> {
    return this.updateConsent(userId, consentType, true);
  }

  static async getConsentStatus(userId: string, consentType: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('user_consents')
      .select('consent_given')
      .eq('user_id', userId)
      .eq('consent_type', consentType)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return false; // No consent record found
      throw error;
    }

    return data?.consent_given || false;
  }

  static async hasRequiredConsents(userId: string): Promise<boolean> {
    const requiredConsents = this.getConsentTypes().filter(c => c.required);
    
    for (const consent of requiredConsents) {
      const hasConsent = await this.getConsentStatus(userId, consent.type);
      if (!hasConsent) return false;
    }
    
    return true;
  }
}