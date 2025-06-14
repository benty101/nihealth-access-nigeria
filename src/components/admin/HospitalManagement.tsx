import React, { useState, useEffect } from 'react';
import { Building2, Plus, MapPin, Phone, Mail, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { hospitalService, type Hospital } from '@/services/HospitalService';
import { useToast } from '@/hooks/use-toast';

const HospitalManagement = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    license_number: '',
    state: '',
    lga: '',
    specialties: '',
    facilities: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {
    try {
      const hospitalsData = await hospitalService.getAllHospitals();
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

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      license_number: '',
      state: '',
      lga: '',
      specialties: '',
      facilities: ''
    });
    setEditingHospital(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const hospitalData = {
        ...formData,
        specialties: formData.specialties.split(',').map(s => s.trim()).filter(Boolean),
        facilities: formData.facilities.split(',').map(f => f.trim()).filter(Boolean),
        is_active: true
      };

      if (editingHospital) {
        await hospitalService.updateHospital(editingHospital.id, hospitalData);
        toast({
          title: "Success",
          description: "Hospital updated successfully"
        });
      } else {
        await hospitalService.createHospital(hospitalData);
        toast({
          title: "Success",
          description: "Hospital created successfully"
        });
      }

      await loadHospitals();
      setIsCreateModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving hospital:', error);
      toast({
        title: "Error",
        description: "Failed to save hospital",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (hospital: Hospital) => {
    setEditingHospital(hospital);
    setFormData({
      name: hospital.name,
      address: hospital.address || '',
      phone: hospital.phone || '',
      email: hospital.email || '',
      license_number: hospital.license_number || '',
      state: hospital.state || '',
      lga: hospital.lga || '',
      specialties: hospital.specialties?.join(', ') || '',
      facilities: hospital.facilities?.join(', ') || ''
    });
    setIsCreateModalOpen(true);
  };

  const handleDelete = async (hospitalId: string) => {
    if (!confirm('Are you sure you want to deactivate this hospital?')) return;

    try {
      await hospitalService.deleteHospital(hospitalId);
      await loadHospitals();
      toast({
        title: "Success",
        description: "Hospital deactivated successfully"
      });
    } catch (error) {
      console.error('Error deleting hospital:', error);
      toast({
        title: "Error",
        description: "Failed to deactivate hospital",
        variant: "destructive"
      });
    }
  };

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
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Hospital Management
            </CardTitle>
            <CardDescription>
              Manage hospitals and healthcare facilities in the platform
            </CardDescription>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={(open) => {
            setIsCreateModalOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Hospital
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingHospital ? 'Edit Hospital' : 'Add New Hospital'}
                </DialogTitle>
                <DialogDescription>
                  {editingHospital ? 'Update hospital information' : 'Enter the details for the new hospital'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Hospital Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="license_number">License Number</Label>
                    <Input
                      id="license_number"
                      value={formData.license_number}
                      onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lga">LGA</Label>
                    <Input
                      id="lga"
                      value={formData.lga}
                      onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="specialties">Specialties (comma separated)</Label>
                  <Input
                    id="specialties"
                    value={formData.specialties}
                    onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                    placeholder="Cardiology, Neurology, Pediatrics"
                  />
                </div>

                <div>
                  <Label htmlFor="facilities">Facilities (comma separated)</Label>
                  <Input
                    id="facilities"
                    value={formData.facilities}
                    onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
                    placeholder="ICU, Emergency Room, Laboratory"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingHospital ? 'Update Hospital' : 'Create Hospital'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <Card key={hospital.id} className="relative">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {hospital.name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      {hospital.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{hospital.address}</span>
                        </div>
                      )}
                      {hospital.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{hospital.phone}</span>
                        </div>
                      )}
                      {hospital.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{hospital.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={hospital.is_active ? "default" : "secondary"}>
                      {hospital.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(hospital)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(hospital.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {hospital.specialties && hospital.specialties.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {hospital.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {hospital.facilities && hospital.facilities.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Facilities:</p>
                    <div className="flex flex-wrap gap-1">
                      {hospital.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {hospitals.length === 0 && (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No hospitals found</p>
            <p className="text-sm text-gray-500">Add your first hospital to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HospitalManagement;
