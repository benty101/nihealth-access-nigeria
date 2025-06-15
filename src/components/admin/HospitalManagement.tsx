
import React, { useState, useEffect } from 'react';
import { Building2, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { adminService, type Hospital } from '@/services/AdminService';
import { useToast } from '@/hooks/use-toast';

interface HospitalManagementProps {
  onStatsChange?: () => Promise<void>;
}

const HospitalManagement = ({ onStatsChange }: HospitalManagementProps) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {
    try {
      const hospitalsData = await adminService.getAllHospitals();
      setHospitals(hospitalsData);
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

  const toggleHospitalStatus = async (id: string, currentStatus: boolean) => {
    try {
      await adminService.updateHospital(id, { is_active: !currentStatus });
      await loadHospitals();
      
      // Trigger stats refresh if callback provided
      if (onStatsChange) {
        await onStatsChange();
      }
      
      toast({
        title: "Success",
        description: `Hospital ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      });
    } catch (error) {
      console.error('Error updating hospital status:', error);
      toast({
        title: "Error",
        description: "Failed to update hospital status",
        variant: "destructive"
      });
    }
  };

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (hospital.state || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (hospital.lga || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading hospitals...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Hospital Management
            </CardTitle>
            <CardDescription>
              Manage hospital listings and medical services across the platform
            </CardDescription>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Hospital
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Hospitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{hospital.name}</CardTitle>
                    <p className="text-sm text-gray-600">{hospital.address}</p>
                    <p className="text-xs text-gray-500">{hospital.state}, {hospital.lga}</p>
                  </div>
                  <Badge className={hospital.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {hospital.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">License:</span>
                    <span className="text-gray-600">{hospital.license_number || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Phone:</span>
                    <span className="text-gray-600">{hospital.phone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Email:</span>
                    <span className="text-gray-600">{hospital.email || 'N/A'}</span>
                  </div>
                </div>

                {hospital.specialties && hospital.specialties.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {hospital.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {hospital.specialties.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{hospital.specialties.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant={hospital.is_active ? "destructive" : "default"}
                    size="sm"
                    onClick={() => toggleHospitalStatus(hospital.id, hospital.is_active)}
                  >
                    {hospital.is_active ? (
                      <>
                        <Trash2 className="h-3 w-3 mr-1" />
                        Deactivate
                      </>
                    ) : (
                      'Activate'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No hospitals found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HospitalManagement;
