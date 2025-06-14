
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { User, Heart, Calendar, Bell, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { profileSchema, nigerianStates } from '@/lib/validation';
import { sanitizeErrorMessage, secureLog, maskEmail } from '@/lib/security';

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
        // Ensure gender is properly typed
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
      profileSchema.parse(data);
      setValidationErrors({});
      return true;
    } catch (error: any) {
      const errors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        if (err.path?.[0]) {
          errors[err.path[0]] = err.message;
        }
      });
      setValidationErrors(errors);
      return false;
    }
  };

  const calculateWeeksPregnant = (dueDate: string) => {
    if (!dueDate) return 0;
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.max(0, 40 - diffWeeks);
  };

  const handleSave = async () => {
    if (!user) return;

    // Validate the profile data
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
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    setProfile(prev => ({ ...prev, [field]: value }));
    updateActivity();
  };

  const weeksPregnant = calculateWeeksPregnant(profile.due_date || '');

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
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={profile.full_name || ''}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                placeholder="Enter your full name"
                className={validationErrors.full_name ? 'border-red-500' : ''}
                maxLength={100}
              />
              {validationErrors.full_name && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.full_name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone_number"
                  value={profile.phone_number || ''}
                  onChange={(e) => handleInputChange('phone_number', e.target.value)}
                  placeholder="e.g. 08012345678 or +2348012345678"
                  className={`pl-10 ${validationErrors.phone_number ? 'border-red-500' : ''}`}
                  maxLength={14}
                />
              </div>
              {validationErrors.phone_number && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.phone_number}</p>
              )}
            </div>
            <div>
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                type="date"
                value={profile.date_of_birth || ''}
                onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                className={validationErrors.date_of_birth ? 'border-red-500' : ''}
                max={new Date().toISOString().split('T')[0]}
              />
              {validationErrors.date_of_birth && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.date_of_birth}</p>
              )}
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={profile.gender} 
                onValueChange={(value) => handleInputChange('gender', value as 'male' | 'female' | 'other')}
              >
                <SelectTrigger className={validationErrors.gender ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {validationErrors.gender && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.gender}</p>
              )}
            </div>
          </div>

          {/* Location Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="state_of_residence">State of Residence</Label>
              <Select 
                value={profile.state_of_residence} 
                onValueChange={(value) => handleInputChange('state_of_residence', value)}
              >
                <SelectTrigger className={validationErrors.state_of_residence ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {nigerianStates.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.state_of_residence && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.state_of_residence}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lga">Local Government Area (LGA)</Label>
              <Input
                id="lga"
                value={profile.lga || ''}
                onChange={(e) => handleInputChange('lga', e.target.value)}
                placeholder="Enter your LGA"
                className={validationErrors.lga ? 'border-red-500' : ''}
                maxLength={100}
              />
              {validationErrors.lga && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.lga}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  value={profile.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your full address"
                  className={`pl-10 ${validationErrors.address ? 'border-red-500' : ''}`}
                  maxLength={500}
                />
              </div>
              {validationErrors.address && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.address}</p>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergency_contact_name">Contact Name</Label>
                <Input
                  id="emergency_contact_name"
                  value={profile.emergency_contact_name || ''}
                  onChange={(e) => handleInputChange('emergency_contact_name', e.target.value)}
                  placeholder="Emergency contact full name"
                  className={validationErrors.emergency_contact_name ? 'border-red-500' : ''}
                  maxLength={100}
                />
                {validationErrors.emergency_contact_name && (
                  <p className="text-sm text-red-600 mt-1">{validationErrors.emergency_contact_name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="emergency_contact_phone">Contact Phone</Label>
                <Input
                  id="emergency_contact_phone"
                  value={profile.emergency_contact_phone || ''}
                  onChange={(e) => handleInputChange('emergency_contact_phone', e.target.value)}
                  placeholder="Emergency contact phone number"
                  className={validationErrors.emergency_contact_phone ? 'border-red-500' : ''}
                  maxLength={14}
                />
                {validationErrors.emergency_contact_phone && (
                  <p className="text-sm text-red-600 mt-1">{validationErrors.emergency_contact_phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pregnancy Information */}
          <div className="border-t pt-4">
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="is_pregnant"
                checked={profile.is_pregnant || false}
                onChange={(e) => handleInputChange('is_pregnant', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="is_pregnant" className="flex items-center">
                <Heart className="mr-2 h-4 w-4 text-pink-500" />
                I am currently pregnant
              </Label>
            </div>

            {profile.is_pregnant && (
              <div className="bg-pink-50 p-4 rounded-lg space-y-4">
                <div>
                  <Label htmlFor="due_date">Expected Due Date</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={profile.due_date || ''}
                    onChange={(e) => handleInputChange('due_date', e.target.value)}
                    className={validationErrors.due_date ? 'border-red-500' : ''}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {validationErrors.due_date && (
                    <p className="text-sm text-red-600 mt-1">{validationErrors.due_date}</p>
                  )}
                </div>

                {profile.due_date && weeksPregnant > 0 && (
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-pink-100 text-pink-800">
                      {weeksPregnant} weeks pregnant
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800">
                      Trimester {weeksPregnant <= 12 ? '1' : weeksPregnant <= 26 ? '2' : '3'}
                    </Badge>
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-600">
                  <Bell className="mr-2 h-4 w-4" />
                  You'll receive personalized pregnancy tips and appointment reminders
                </div>
              </div>
            )}
          </div>

          {/* Medical Information */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Medical Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="blood_group">Blood Group</Label>
                <Select 
                  value={profile.blood_group} 
                  onValueChange={(value) => handleInputChange('blood_group', value)}
                >
                  <SelectTrigger className={validationErrors.blood_group ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.blood_group && (
                  <p className="text-sm text-red-600 mt-1">{validationErrors.blood_group}</p>
                )}
              </div>
              <div>
                <Label htmlFor="genotype">Genotype</Label>
                <Select 
                  value={profile.genotype} 
                  onValueChange={(value) => handleInputChange('genotype', value)}
                >
                  <SelectTrigger className={validationErrors.genotype ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select genotype" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AA">AA</SelectItem>
                    <SelectItem value="AS">AS</SelectItem>
                    <SelectItem value="AC">AC</SelectItem>
                    <SelectItem value="SS">SS</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="CC">CC</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.genotype && (
                  <p className="text-sm text-red-600 mt-1">{validationErrors.genotype}</p>
                )}
              </div>
            </div>
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full bg-teal-600 hover:bg-teal-700"
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
