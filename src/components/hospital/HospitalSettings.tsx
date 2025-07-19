import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Building2, Phone, Mail, MapPin, Save, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface HospitalSettingsProps {
  hospitalId: string;
}

interface Hospital {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  license_number?: string;
  state?: string;
  lga?: string;
  specialties?: string[];
  facilities?: string[];
  is_active: boolean;
}

const HospitalSettings = ({ hospitalId }: HospitalSettingsProps) => {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newFacility, setNewFacility] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadHospitalData();
  }, [hospitalId]);

  const loadHospitalData = async () => {
    try {
      const { data, error } = await supabase
        .from('hospitals')
        .select('*')
        .eq('id', hospitalId)
        .single();

      if (error) throw error;
      setHospital(data);
    } catch (error) {
      console.error('Error loading hospital data:', error);
      toast({
        title: "Error",
        description: "Failed to load hospital settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!hospital) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from('hospitals')
        .update({
          name: hospital.name,
          address: hospital.address,
          phone: hospital.phone,
          email: hospital.email,
          license_number: hospital.license_number,
          state: hospital.state,
          lga: hospital.lga,
          specialties: hospital.specialties,
          facilities: hospital.facilities
        })
        .eq('id', hospitalId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hospital settings updated successfully",
      });
    } catch (error) {
      console.error('Error updating hospital:', error);
      toast({
        title: "Error",
        description: "Failed to update hospital settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addSpecialty = () => {
    if (!newSpecialty.trim() || !hospital) return;
    
    const updatedSpecialties = [...(hospital.specialties || []), newSpecialty.trim()];
    setHospital({ ...hospital, specialties: updatedSpecialties });
    setNewSpecialty('');
  };

  const removeSpecialty = (index: number) => {
    if (!hospital) return;
    
    const updatedSpecialties = hospital.specialties?.filter((_, i) => i !== index) || [];
    setHospital({ ...hospital, specialties: updatedSpecialties });
  };

  const addFacility = () => {
    if (!newFacility.trim() || !hospital) return;
    
    const updatedFacilities = [...(hospital.facilities || []), newFacility.trim()];
    setHospital({ ...hospital, facilities: updatedFacilities });
    setNewFacility('');
  };

  const removeFacility = (index: number) => {
    if (!hospital) return;
    
    const updatedFacilities = hospital.facilities?.filter((_, i) => i !== index) || [];
    setHospital({ ...hospital, facilities: updatedFacilities });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Hospital not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Hospital Settings</h2>
          <p className="text-muted-foreground">Manage your facility information and configuration</p>
        </div>
        
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Hospital Name</Label>
              <Input
                id="name"
                value={hospital.name}
                onChange={(e) => setHospital({ ...hospital, name: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="license">License Number</Label>
              <Input
                id="license"
                value={hospital.license_number || ''}
                onChange={(e) => setHospital({ ...hospital, license_number: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={hospital.state || ''}
                onChange={(e) => setHospital({ ...hospital, state: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="lga">LGA</Label>
              <Input
                id="lga"
                value={hospital.lga || ''}
                onChange={(e) => setHospital({ ...hospital, lga: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={hospital.phone || ''}
                onChange={(e) => setHospital({ ...hospital, phone: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={hospital.email || ''}
                onChange={(e) => setHospital({ ...hospital, email: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={hospital.address || ''}
                onChange={(e) => setHospital({ ...hospital, address: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Specialties */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Specialties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add specialty (e.g., Cardiology, Neurology)"
              value={newSpecialty}
              onChange={(e) => setNewSpecialty(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSpecialty()}
            />
            <Button onClick={addSpecialty} disabled={!newSpecialty.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {hospital.specialties?.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {specialty}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeSpecialty(index)}
                />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card>
        <CardHeader>
          <CardTitle>Hospital Facilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add facility (e.g., ICU, Emergency Room, Laboratory)"
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addFacility()}
            />
            <Button onClick={addFacility} disabled={!newFacility.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {hospital.facilities?.map((facility, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                {facility}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeFacility(index)}
                />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HospitalSettings;