import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { adminService } from '@/services/AdminService';

interface TelemedicineProviderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const TelemedicineProviderForm = ({ open, onOpenChange, onSuccess }: TelemedicineProviderFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    license_number: '',
    phone: '',
    email: '',
    consultation_fee: '',
    experience_years: '',
    languages: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const providerData = {
        name: formData.name,
        specialization: formData.specialization || null,
        license_number: formData.license_number || null,
        phone: formData.phone || null,
        email: formData.email || null,
        consultation_fee: formData.consultation_fee ? parseFloat(formData.consultation_fee) : null,
        experience_years: formData.experience_years ? parseInt(formData.experience_years) : null,
        languages: formData.languages ? formData.languages.split(',').map(lang => lang.trim()) : null,
        is_active: true,
      };

      await adminService.createTelemedicineProvider(providerData);
      
      toast({
        title: "Success",
        description: "Telemedicine provider added successfully"
      });

      // Reset form
      setFormData({
        name: '',
        specialization: '',
        license_number: '',
        phone: '',
        email: '',
        consultation_fee: '',
        experience_years: '',
        languages: '',
      });

      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error('Error creating provider:', error);
      toast({
        title: "Error",
        description: "Failed to add telemedicine provider",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Telemedicine Provider</DialogTitle>
          <DialogDescription>
            Add a new healthcare provider for telemedicine consultations.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Dr. John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                value={formData.specialization}
                onChange={(e) => handleInputChange('specialization', e.target.value)}
                placeholder="General Practice"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="license_number">License Number</Label>
              <Input
                id="license_number"
                value={formData.license_number}
                onChange={(e) => handleInputChange('license_number', e.target.value)}
                placeholder="MD-001-2024"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consultation_fee">Consultation Fee (₦)</Label>
              <Input
                id="consultation_fee"
                type="number"
                value={formData.consultation_fee}
                onChange={(e) => handleInputChange('consultation_fee', e.target.value)}
                placeholder="5000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+234 800 000 0000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience_years">Years of Experience</Label>
              <Input
                id="experience_years"
                type="number"
                value={formData.experience_years}
                onChange={(e) => handleInputChange('experience_years', e.target.value)}
                placeholder="10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="doctor@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="languages">Languages (comma-separated)</Label>
            <Input
              id="languages"
              value={formData.languages}
              onChange={(e) => handleInputChange('languages', e.target.value)}
              placeholder="English, Hausa, Yoruba"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700">
              {loading ? 'Adding...' : 'Add Provider'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TelemedicineProviderForm;