
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Search, Stethoscope } from 'lucide-react';
import { hospitalManagementService, type HospitalDoctor } from '@/services/HospitalManagementService';
import { adminService, type TelemedicineProvider } from '@/services/AdminService';
import { useToast } from '@/hooks/use-toast';

interface DoctorManagementProps {
  hospitalId: string;
  onStatsUpdate: () => void;
}

const DoctorManagement = ({ hospitalId, onStatsUpdate }: DoctorManagementProps) => {
  const [hospitalDoctors, setHospitalDoctors] = useState<HospitalDoctor[]>([]);
  const [availableDoctors, setAvailableDoctors] = useState<TelemedicineProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [department, setDepartment] = useState('');
  const [employmentType, setEmploymentType] = useState('full_time');
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, [hospitalId]);

  const loadData = async () => {
    try {
      const [doctors, allProviders] = await Promise.all([
        hospitalManagementService.getHospitalDoctors(hospitalId),
        adminService.getAllTelemedicineProviders()
      ]);
      
      setHospitalDoctors(doctors);
      setAvailableDoctors(allProviders.filter(provider => provider.is_active));
    } catch (error) {
      console.error('Error loading doctor data:', error);
      toast({
        title: "Error",
        description: "Failed to load doctor data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async () => {
    if (!selectedDoctor) {
      toast({
        title: "Error",
        description: "Please select a doctor",
        variant: "destructive",
      });
      return;
    }

    try {
      await hospitalManagementService.addDoctorToHospital(
        hospitalId,
        selectedDoctor,
        department || undefined,
        employmentType
      );
      
      toast({
        title: "Success",
        description: "Doctor added to hospital successfully",
      });
      
      setSelectedDoctor('');
      setDepartment('');
      setEmploymentType('full_time');
      loadData();
      onStatsUpdate();
    } catch (error) {
      console.error('Error adding doctor:', error);
      toast({
        title: "Error",
        description: "Failed to add doctor to hospital",
        variant: "destructive",
      });
    }
  };

  const handleRemoveDoctor = async (hospitalDoctorId: string) => {
    try {
      await hospitalManagementService.removeDoctorFromHospital(hospitalDoctorId);
      
      toast({
        title: "Success",
        description: "Doctor removed from hospital",
      });
      
      loadData();
      onStatsUpdate();
    } catch (error) {
      console.error('Error removing doctor:', error);
      toast({
        title: "Error",
        description: "Failed to remove doctor",
        variant: "destructive",
      });
    }
  };

  const filteredDoctors = hospitalDoctors.filter(doctor =>
    doctor.telemedicine_providers?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvailableDoctorsForSelection = () => {
    const assignedDoctorIds = hospitalDoctors.map(hd => hd.doctor_id);
    return availableDoctors.filter(doctor => !assignedDoctorIds.includes(doctor.id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add Doctor Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add Doctor to Hospital
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Select Doctor" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableDoctorsForSelection().map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Department (optional)"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />

            <Select value={employmentType} onValueChange={setEmploymentType}>
              <SelectTrigger>
                <SelectValue placeholder="Employment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full_time">Full Time</SelectItem>
                <SelectItem value="part_time">Part Time</SelectItem>
                <SelectItem value="consultant">Consultant</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleAddDoctor} className="bg-teal-600 hover:bg-teal-700">
              Add Doctor
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Hospital Doctors ({hospitalDoctors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredDoctors.length === 0 ? (
              <div className="text-center py-8">
                <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No doctors found</h3>
                <p className="text-gray-600">Add doctors to your hospital to get started</p>
              </div>
            ) : (
              filteredDoctors.map((hospitalDoctor) => (
                <Card key={hospitalDoctor.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-teal-100 p-2 rounded-full">
                        <Stethoscope className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {hospitalDoctor.telemedicine_providers?.name || 'Unknown Doctor'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {hospitalDoctor.telemedicine_providers?.specialization}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{hospitalDoctor.position}</Badge>
                          <Badge variant="outline">{hospitalDoctor.employment_type.replace('_', ' ')}</Badge>
                          {hospitalDoctor.department && (
                            <Badge variant="outline">{hospitalDoctor.department}</Badge>
                          )}
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          <p>License: {hospitalDoctor.telemedicine_providers?.license_number}</p>
                          <p>Consultation Fee: ₦{hospitalDoctor.telemedicine_providers?.consultation_fee?.toLocaleString()}</p>
                          <p>Joined: {new Date(hospitalDoctor.joined_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={hospitalDoctor.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {hospitalDoctor.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveDoctor(hospitalDoctor.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorManagement;
