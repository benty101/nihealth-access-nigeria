
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { pharmacyService, type Pharmacy, type CreatePharmacyRequest } from '@/services/PharmacyService';
import { useToast } from '@/hooks/use-toast';

const pharmacySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  license_number: z.string().optional(),
  state: z.string().optional(),
  lga: z.string().optional(),
  is_active: z.boolean(),
});

type PharmacyFormData = z.infer<typeof pharmacySchema>;

interface PharmacyFormProps {
  isOpen: boolean;
  onClose: () => void;
  pharmacy?: Pharmacy;
  onSuccess: () => void;
}

const PharmacyForm = ({ isOpen, onClose, pharmacy, onSuccess }: PharmacyFormProps) => {
  const { toast } = useToast();
  const isEditing = !!pharmacy;
  
  const form = useForm<PharmacyFormData>({
    resolver: zodResolver(pharmacySchema),
    defaultValues: pharmacy ? {
      name: pharmacy.name,
      address: pharmacy.address || '',
      phone: pharmacy.phone || '',
      email: pharmacy.email || '',
      license_number: pharmacy.license_number || '',
      state: pharmacy.state || '',
      lga: pharmacy.lga || '',
      is_active: pharmacy.is_active,
    } : {
      name: '',
      address: '',
      phone: '',
      email: '',
      license_number: '',
      state: '',
      lga: '',
      is_active: true,
    }
  });

  const onSubmit = async (data: PharmacyFormData) => {
    try {
      if (isEditing) {
        await pharmacyService.updatePharmacy(pharmacy.id, data);
        toast({
          title: "Success",
          description: "Pharmacy updated successfully",
        });
      } else {
        const createData: CreatePharmacyRequest = {
          name: data.name,
          address: data.address,
          phone: data.phone,
          email: data.email,
          license_number: data.license_number,
          state: data.state,
          lga: data.lga,
          is_active: data.is_active,
        };
        await pharmacyService.createPharmacy(createData);
        toast({
          title: "Success", 
          description: "Pharmacy created successfully",
        });
      }
      onSuccess();
      onClose();
      form.reset();
    } catch (error) {
      console.error('Error saving pharmacy:', error);
      toast({
        title: "Error",
        description: "Failed to save pharmacy",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Pharmacy' : 'Add New Pharmacy'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Pharmacy Name *</Label>
              <Input
                id="name"
                {...form.register('name')}
                placeholder="e.g., MedPlus Pharmacy"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="license_number">License Number</Label>
              <Input
                id="license_number"
                {...form.register('license_number')}
                placeholder="e.g., PCN123456"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              {...form.register('address')}
              placeholder="Full pharmacy address..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                {...form.register('state')}
                placeholder="e.g., Lagos"
              />
            </div>
            
            <div>
              <Label htmlFor="lga">LGA</Label>
              <Input
                id="lga"
                {...form.register('lga')}
                placeholder="e.g., Ikeja"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...form.register('phone')}
                placeholder="e.g., +234 123 456 7890"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register('email')}
                placeholder="e.g., info@pharmacy.com"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={form.watch('is_active')}
              onCheckedChange={(checked) => form.setValue('is_active', checked)}
            />
            <Label htmlFor="is_active">Active</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PharmacyForm;
