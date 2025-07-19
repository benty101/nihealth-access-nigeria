
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { profileSchema } from '@/lib/validation';
import { sanitizeErrorMessage, secureLog, maskEmail } from '@/lib/security';
import BasicInformation from './profile/BasicInformation';
import LocationInformation from './profile/LocationInformation';
import EmergencyContact from './profile/EmergencyContact';
import PregnancyInformation from './profile/PregnancyInformation';
import MedicalInformation from './profile/MedicalInformation';

interface Profile {
  id: string;
  full_name: string;
  phone_number: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  state_of_residence: string;
  lga: string;
  address: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  is_pregnant: boolean;
  due_date: string;
  blood_group: string;
  genotype: string;
  allergies: string[];
  chronic_conditions: string[];
  insurance_provider: string;
  insurance_number: string;
  preferred_language: string;
}

const UserProfile = () => {
  const { user, updateActivity } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [profile, setProfile] = useState<Partial<Profile>>({
    full_name: '',
    phone_number: '',
    date_of_birth: '',
    gender: 'female',
    state_of_residence: '',
    lga: '',
    address: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    is_pregnant: false,
    due_date: '',
    blood_group: '',
    genotype: '',
    allergies: [],
    chronic_conditions: [],
    insurance_provider: '',
    insurance_number: '',
    preferred_language: 'english',
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      updateActivity();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        secureLog('Profile fetch error', { 
          userId: user?.id,
          errorCode: error.code 
        });
        return;
      }

      if (data) {
        const profileData = {
          ...data,
          gender: data.gender as 'male' | 'female' | 'other' || 'female',
          allergies: data.allergies || [],
          chronic_conditions: data.chronic_conditions || []
        };
        setProfile(profileData);
        secureLog('Profile loaded successfully', { userId: user?.id });
      }
    } catch (error) {
      secureLog('Profile fetch network error', { userId: user?.id });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (data: any): boolean => {
    try {
      // Debug: Log the data being validated
      console.log('Validating profile data:', data);
      
      profileSchema.parse(data);
      setValidationErrors({});
      console.log('Validation passed!');
      return true;
    } catch (error: any) {
      const errors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        if (err.path?.[0]) {
          errors[err.path[0]] = err.message;
        }
      });
      
      // Debug: Log validation errors
      console.log('Validation errors:', errors);
      console.log('Full validation error:', error);
      
      setValidationErrors(errors);
      return false;
    }
  };

  const handleSave = async () => {
    if (!user) return;

    if (!validateForm(profile)) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form before saving.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    updateActivity();

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profile,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        throw error;
      }

      secureLog('Profile updated successfully', { userId: user.id });
      
      toast({
        title: "Profile updated successfully!",
        description: "Your health profile has been saved.",
      });
    } catch (error) {
      secureLog('Profile update error', { 
        userId: user.id,
        errorType: 'update_failed'
      });
      
      toast({
        title: "Error updating profile",
        description: sanitizeErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    setProfile(prev => ({ ...prev, [field]: value }));
    updateActivity();
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              My Health Profile
            </div>
            {user?.email && (
              <div className="text-sm text-gray-500">
                {maskEmail(user.email)}
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <BasicInformation
            profile={profile}
            validationErrors={validationErrors}
            onInputChange={handleInputChange}
          />

          <LocationInformation
            profile={profile}
            validationErrors={validationErrors}
            onInputChange={handleInputChange}
          />

          <EmergencyContact
            profile={profile}
            validationErrors={validationErrors}
            onInputChange={handleInputChange}
          />

          <PregnancyInformation
            profile={profile}
            validationErrors={validationErrors}
            onInputChange={handleInputChange}
          />

          <MedicalInformation
            profile={profile}
            validationErrors={validationErrors}
            onInputChange={handleInputChange}
          />

          <Button 
            onClick={handleSave} 
            className="w-full"
            disabled={saving}
          >
            {saving ? 'Saving Profile...' : 'Update Profile'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
