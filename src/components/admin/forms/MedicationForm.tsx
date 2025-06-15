
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { adminService, type Medication, type CreateMedicationRequest } from '@/services/AdminService';
import { useToast } from '@/hooks/use-toast';

const medicationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0, 'Price must be positive'),
  description: z.string().optional(),
  brand: z.string().optional(),
  pack_size: z.string().optional(),
  dosage: z.string().optional(),
  active_ingredient: z.string().optional(),
  storage_instructions: z.string().optional(),
  prescription_required: z.boolean(),
  in_stock: z.boolean(),
  is_active: z.boolean(),
});

type MedicationFormData = z.infer<typeof medicationSchema>;

interface MedicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  medication?: Medication;
  onSuccess: () => void;
}

const MedicationForm = ({ isOpen, onClose, medication, onSuccess }: MedicationFormProps) => {
  const { toast } = useToast();
  const isEditing = !!medication;
  
  const form = useForm<MedicationFormData>({
    resolver: zodResolver(medicationSchema),
    defaultValues: medication ? {
      name: medication.name,
      category: medication.category,
      price: medication.price,
      description: medication.description || '',
      brand: medication.brand || '',
      pack_size: medication.pack_size || '',
      dosage: medication.dosage || '',
      active_ingredient: medication.active_ingredient || '',
      storage_instructions: medication.storage_instructions || '',
      prescription_required: medication.prescription_required,
      in_stock: medication.in_stock,
      is_active: medication.is_active,
    } : {
      name: '',
      category: '',
      price: 0,
      description: '',
      brand: '',
      pack_size: '',
      dosage: '',
      active_ingredient: '',
      storage_instructions: '',
      prescription_required: false,
      in_stock: true,
      is_active: true,
    }
  });

  const onSubmit = async (data: MedicationFormData) => {
    try {
      if (isEditing) {
        await adminService.updateMedication(medication.id, data);
        toast({
          title: "Success",
          description: "Medication updated successfully",
        });
      } else {
        const createData: CreateMedicationRequest = {
          name: data.name,
          category: data.category,
          price: data.price,
          description: data.description,
          brand: data.brand,
          pack_size: data.pack_size,
          dosage: data.dosage,
          active_ingredient: data.active_ingredient,
          storage_instructions: data.storage_instructions,
          prescription_required: data.prescription_required,
          in_stock: data.in_stock,
          is_active: data.is_active,
        };
        await adminService.createMedication(createData);
        toast({
          title: "Success", 
          description: "Medication created successfully",
        });
      }
      onSuccess();
      onClose();
      form.reset();
    } catch (error) {
      console.error('Error saving medication:', error);
      toast({
        title: "Error",
        description: "Failed to save medication",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Medication' : 'Add New Medication'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                {...form.register('name')}
                placeholder="e.g., Paracetamol 500mg"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select onValueChange={(value) => form.setValue('category', value)} defaultValue={form.getValues('category')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pain Relief">Pain Relief</SelectItem>
                  <SelectItem value="Antibiotics">Antibiotics</SelectItem>
                  <SelectItem value="Cardiovascular">Cardiovascular</SelectItem>
                  <SelectItem value="Diabetes">Diabetes</SelectItem>
                  <SelectItem value="Supplements">Supplements</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (₦) *</Label>
              <Input
                id="price"
                type="number"
                {...form.register('price', { valueAsNumber: true })}
                placeholder="0.00"
              />
            </div>
            
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                {...form.register('brand')}
                placeholder="e.g., GSK, Pfizer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pack_size">Pack Size</Label>
              <Input
                id="pack_size"
                {...form.register('pack_size')}
                placeholder="e.g., 20 tablets"
              />
            </div>
            
            <div>
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                {...form.register('dosage')}
                placeholder="e.g., 500mg"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register('description')}
              placeholder="Describe the medication..."
            />
          </div>

          <div>
            <Label htmlFor="active_ingredient">Active Ingredient</Label>
            <Input
              id="active_ingredient"
              {...form.register('active_ingredient')}
              placeholder="e.g., Acetaminophen"
            />
          </div>

          <div>
            <Label htmlFor="storage_instructions">Storage Instructions</Label>
            <Textarea
              id="storage_instructions"
              {...form.register('storage_instructions')}
              placeholder="Storage requirements..."
            />
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="prescription_required"
                checked={form.watch('prescription_required')}
                onCheckedChange={(checked) => form.setValue('prescription_required', checked)}
              />
              <Label htmlFor="prescription_required">Prescription Required</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="in_stock"
                checked={form.watch('in_stock')}
                onCheckedChange={(checked) => form.setValue('in_stock', checked)}
              />
              <Label htmlFor="in_stock">In Stock</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={form.watch('is_active')}
                onCheckedChange={(checked) => form.setValue('is_active', checked)}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
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

export default MedicationForm;
