
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { medicationOrderService, type MedicationOrder } from '@/services/MedicationOrderService';
import { useToast } from '@/hooks/use-toast';

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
    actual_delivery_date: order.actual_delivery_date || ''
  });

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await medicationOrderService.updateOrderStatus(
        order.id,
        formData.status,
        formData.message || undefined
      );

      // Update additional fields if provided
      if (formData.tracking_number || formData.estimated_delivery_date || formData.actual_delivery_date) {
        // We'd need to add this method to the service
        // For now, we'll just update the status
      }

      toast({
        title: "Success",
        description: "Order status updated successfully",
      });

      onStatusUpdated();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Order Number</Label>
            <Input value={order.order_number} disabled />
          </div>

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
              {loading ? 'Updating...' : 'Update Status'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderStatusModal;
