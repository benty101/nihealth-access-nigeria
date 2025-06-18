
import React, { useState, useEffect } from 'react';
import { Building2, Search, Plus, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { hospitalService, type Hospital } from '@/services/HospitalService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const HospitalOnboarding = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(false);
  const [linking, setLinking] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadHospitals();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = hospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.lga?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHospitals(filtered);
    } else {
      setFilteredHospitals(hospitals);
    }
  }, [searchQuery, hospitals]);

  const loadHospitals = async () => {
    try {
      setLoading(true);
      const data = await hospitalService.getAllHospitals();
      setHospitals(data);
      setFilteredHospitals(data);
    } catch (error) {
      console.error('Error loading hospitals:', error);
      toast({
        title: "Error",
        description: "Failed to load hospitals",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const linkToHospital = async (hospital: Hospital) => {
    if (!user) return;

    try {
      setLinking(true);
      
      // Create hospital staff record
      const { error: staffError } = await supabase
        .from('hospital_staff')
        .insert({
          user_id: user.id,
          hospital_id: hospital.id,
          position: 'admin',
          is_active: true
        });

      if (staffError) {
        throw staffError;
      }

      // Update user role to hospital_admin
      const { error: roleError } = await supabase
        .from('user_roles')
        .upsert({
          user_id: user.id,
          role: 'hospital_admin'
        }, {
          onConflict: 'user_id'
        });

      if (roleError) {
        throw roleError;
      }

      toast({
        title: "Success!",
        description: `You have been linked to ${hospital.name} as an administrator.`
      });

      // Refresh the page to update role
      window.location.reload();

    } catch (error: any) {
      console.error('Error linking to hospital:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to link to hospital",
        variant: "destructive"
      });
    } finally {
      setLinking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hospitals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Hospital Onboarding
          </CardTitle>
          <p className="text-gray-600">
            Link your account to an existing hospital or request to add a new one
          </p>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertDescription>
              Search for your hospital below. If you can't find it, you can request to add it to our directory.
            </AlertDescription>
          </Alert>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search hospitals by name, state, or LGA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Hospital List */}
          <div className="space-y-4 mb-6">
            {filteredHospitals.slice(0, 10).map((hospital) => (
              <Card key={hospital.id} className="border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{hospital.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {hospital.address}
                        {hospital.lga && hospital.state && `, ${hospital.lga}, ${hospital.state}`}
                      </p>
                      {hospital.specialties && hospital.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {hospital.specialties.slice(0, 3).map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                          {hospital.specialties.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{hospital.specialties.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => linkToHospital(hospital)}
                      disabled={linking}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      {linking ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Link to This Hospital
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredHospitals.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No hospitals found matching your search</p>
              <Button
                onClick={() => setShowCreateForm(true)}
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Request to Add New Hospital
              </Button>
            </div>
          )}

          {!showCreateForm && (
            <div className="text-center pt-4 border-t">
              <p className="text-gray-600 mb-4">Don't see your hospital?</p>
              <Button
                onClick={() => setShowCreateForm(true)}
                variant="outline"
                className="border-teal-600 text-teal-600 hover:bg-teal-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Request to Add New Hospital
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Request New Hospital Listing</CardTitle>
            <p className="text-gray-600">
              Fill out this form to request adding your hospital to our directory
            </p>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                New hospital requests are reviewed by our team. You'll receive an email confirmation once approved and can then link your account.
              </AlertDescription>
            </Alert>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Please contact our support team at support@meddypal.com to request adding your hospital.
              </p>
              <Button
                onClick={() => setShowCreateForm(false)}
                variant="outline"
                className="mt-4"
              >
                Back to Search
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HospitalOnboarding;
