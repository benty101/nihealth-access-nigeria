
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
import { labTestService, type LabTest, type CreateLabTestRequest } from '@/services/LabTestService';
import { useToast } from '@/hooks/use-toast';

const labTestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0, 'Price must be positive'),
  description: z.string().optional(),
  sample_type: z.string().optional(),
  preparation_required: z.string().optional(),
  turnaround_time: z.string().optional(),
  normal_range: z.string().optional(),
  test_code: z.string().optional(),
  is_fasting_required: z.boolean(),
  is_active: z.boolean(),
});

type LabTestFormData = z.infer<typeof labTestSchema>;

interface LabTestFormProps {
  isOpen: boolean;
  onClose: () => void;
  labTest?: LabTest;
  onSuccess: () => void;
}

const LabTestForm = ({ isOpen, onClose, labTest, onSuccess }: LabTestFormProps) => {
  const { toast } = useToast();
  const isEditing = !!labTest;
  
  const form = useForm<LabTestFormData>({
    resolver: zodResolver(labTestSchema),
    defaultValues: labTest ? {
      name: labTest.name,
      category: labTest.category,
      price: labTest.price,
      description: labTest.description || '',
      sample_type: labTest.sample_type || '',
      preparation_required: labTest.preparation_required || '',
      turnaround_time: labTest.turnaround_time || '',
      normal_range: labTest.normal_range || '',
      test_code: labTest.test_code || '',
      is_fasting_required: labTest.is_fasting_required,
      is_active: labTest.is_active,
    } : {
      name: '',
      category: '',
      price: 0,
      description: '',
      sample_type: '',
      preparation_required: '',
      turnaround_time: '',
      normal_range: '',
      test_code: '',
      is_fasting_required: false,
      is_active: true,
    }
  });

  const onSubmit = async (data: LabTestFormData) => {
    try {
      if (isEditing) {
        await labTestService.updateLabTest(labTest.id, data);
        toast({
          title: "Success",
          description: "Lab test updated successfully",
        });
      } else {
        const createData: CreateLabTestRequest = {
          name: data.name,
          category: data.category,
          price: data.price,
          description: data.description,
          sample_type: data.sample_type,
          preparation_required: data.preparation_required,
          turnaround_time: data.turnaround_time,
          normal_range: data.normal_range,
          test_code: data.test_code,
          is_fasting_required: data.is_fasting_required,
          is_active: data.is_active,
        };
        await labTestService.createLabTest(createData);
        toast({
          title: "Success", 
          description: "Lab test created successfully",
        });
      }
      onSuccess();
      onClose();
      form.reset();
    } catch (error) {
      console.error('Error saving lab test:', error);
      toast({
        title: "Error",
        description: "Failed to save lab test",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Lab Test' : 'Add New Lab Test'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Test Name *</Label>
              <Input
                id="name"
                {...form.register('name')}
                placeholder="e.g., Complete Blood Count"
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
                  <SelectItem value="Hematology">Hematology</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                  <SelectItem value="Diabetes">Diabetes</SelectItem>
                  <SelectItem value="Clinical Pathology">Clinical Pathology</SelectItem>
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
              <Label htmlFor="test_code">Test Code</Label>
              <Input
                id="test_code"
                {...form.register('test_code')}
                placeholder="e.g., CBC001"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sample_type">Sample Type</Label>
              <Input
                id="sample_type"
                {...form.register('sample_type')}
                placeholder="e.g., Blood, Urine"
              />
            </div>
            
            <div>
              <Label htmlFor="turnaround_time">Turnaround Time</Label>
              <Input
                id="turnaround_time"
                {...form.register('turnaround_time')}
                placeholder="e.g., 24 hours"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register('description')}
              placeholder="Describe the lab test..."
            />
          </div>

          <div>
            <Label htmlFor="preparation_required">Preparation Required</Label>
            <Textarea
              id="preparation_required"
              {...form.register('preparation_required')}
              placeholder="Any special preparation needed..."
            />
          </div>

          <div>
            <Label htmlFor="normal_range">Normal Range</Label>
            <Input
              id="normal_range"
              {...form.register('normal_range')}
              placeholder="e.g., 4.5-11.0 x10³/µL"
            />
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="is_fasting_required"
                checked={form.watch('is_fasting_required')}
                onCheckedChange={(checked) => form.setValue('is_fasting_required', checked)}
              />
              <Label htmlFor="is_fasting_required">Fasting Required</Label>
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

export default LabTestForm;
