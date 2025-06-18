
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { medicationOrderService, type MedicationOrder } from '@/services/MedicationOrderService';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: MedicationOrder;
  onStatusUpdated: () => void;
}

const OrderStatusModal = ({ isOpen, onClose, order, onStatusUpdated }: OrderStatusModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    status: order.status,
    message: '',
    tracking_number: order.tracking_number || '',
    estimated_delivery_date: order.estimated_delivery_date || '',
    actual_delivery_date: order.actual_delivery_date || '',
    payment_status: order.payment_status || 'pending'
  });

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const paymentStatusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'paid', label: 'Paid' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update order status
      await medicationOrderService.updateOrderStatus(
        order.id,
        formData.status,
        formData.message || undefined
      );

      // Update additional fields using direct Supabase call
      const updateData: any = {};
      
      if (formData.tracking_number !== order.tracking_number) {
        updateData.tracking_number = formData.tracking_number;
      }
      
      if (formData.estimated_delivery_date !== order.estimated_delivery_date) {
        updateData.estimated_delivery_date = formData.estimated_delivery_date;
      }
      
      if (formData.actual_delivery_date !== order.actual_delivery_date) {
        updateData.actual_delivery_date = formData.actual_delivery_date;
      }
      
      if (formData.payment_status !== order.payment_status) {
        updateData.payment_status = formData.payment_status;
      }

      if (Object.keys(updateData).length > 0) {
        updateData.updated_at = new Date().toISOString();
        
        const { error } = await supabase
          .from('medication_orders')
          .update(updateData)
          .eq('id', order.id);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Order updated successfully",
      });

      onStatusUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: "Error",
        description: "Failed to update order",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Order - #{order.order_number}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment_status">Payment Status</Label>
            <Select value={formData.payment_status} onValueChange={(value) => setFormData(prev => ({ ...prev, payment_status: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                {paymentStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Status Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Optional message for the customer..."
            />
          </div>

          {(formData.status === 'shipped' || formData.status === 'delivered') && (
            <div className="space-y-2">
              <Label htmlFor="tracking_number">Tracking Number</Label>
              <Input
                id="tracking_number"
                value={formData.tracking_number}
                onChange={(e) => setFormData(prev => ({ ...prev, tracking_number: e.target.value }))}
                placeholder="Enter tracking number"
              />
            </div>
          )}

          {formData.status === 'shipped' && (
            <div className="space-y-2">
              <Label htmlFor="estimated_delivery_date">Estimated Delivery Date</Label>
              <Input
                id="estimated_delivery_date"
                type="date"
                value={formData.estimated_delivery_date}
                onChange={(e) => setFormData(prev => ({ ...prev, estimated_delivery_date: e.target.value }))}
              />
            </div>
          )}

          {formData.status === 'delivered' && (
            <div className="space-y-2">
              <Label htmlFor="actual_delivery_date">Actual Delivery Date</Label>
              <Input
                id="actual_delivery_date"
                type="date"
                value={formData.actual_delivery_date}
                onChange={(e) => setFormData(prev => ({ ...prev, actual_delivery_date: e.target.value }))}
              />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700">
              {loading ? 'Updating...' : 'Update Order'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderStatusModal;
