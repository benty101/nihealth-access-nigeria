
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Package, MapPin, Phone, Calendar, Truck } from 'lucide-react';
import { format } from 'date-fns';
import type { MedicationOrder } from '@/services/MedicationOrderService';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: MedicationOrder;
}

const OrderDetailsModal = ({ isOpen, onClose, order }: OrderDetailsModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-orange-100 text-orange-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order #{order.order_number}</span>
            <Badge className={getStatusColor(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Order Information</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Order Date:</strong> {format(new Date(order.created_at), 'MMM dd, yyyy HH:mm')}</p>
                <p><strong>Payment Status:</strong> {order.payment_status || 'Pending'}</p>
                <p><strong>Delivery Method:</strong> {order.delivery_method || 'Standard'}</p>
                {order.tracking_number && (
                  <p><strong>Tracking:</strong> {order.tracking_number}</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Pharmacy</h3>
              <div className="text-sm">
                {order.pharmacies ? (
                  <p>{order.pharmacies.name}</p>
                ) : (
                  <p className="text-gray-500">Multiple pharmacies</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Delivery Information */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Delivery Information
            </h3>
            <div className="space-y-1 text-sm">
              <p><strong>Address:</strong> {order.delivery_address}</p>
              <p><strong>Phone:</strong> {order.delivery_phone}</p>
              {order.estimated_delivery_date && (
                <p><strong>Estimated Delivery:</strong> {format(new Date(order.estimated_delivery_date), 'MMM dd, yyyy')}</p>
              )}
              {order.actual_delivery_date && (
                <p><strong>Delivered On:</strong> {format(new Date(order.actual_delivery_date), 'MMM dd, yyyy')}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Package className="h-4 w-4" />
              Order Items
            </h3>
            <div className="space-y-3">
              {order.medication_order_items?.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.medications?.name}</h4>
                    {item.medications?.brand && (
                      <p className="text-sm text-gray-600">Brand: {item.medications.brand}</p>
                    )}
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₦{item.total_price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">₦{item.unit_price.toLocaleString()} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Special Instructions */}
          {order.special_instructions && (
            <>
              <div>
                <h3 className="font-semibold mb-2">Special Instructions</h3>
                <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                  {order.special_instructions}
                </p>
              </div>
              <Separator />
            </>
          )}

          {/* Order Status History */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Order Timeline
            </h3>
            <div className="space-y-2">
              {order.order_status_history?.map((history, index) => (
                <div key={index} className="flex items-center gap-3 p-2">
                  <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {history.status.charAt(0).toUpperCase() + history.status.slice(1)}
                    </p>
                    {history.status_message && (
                      <p className="text-xs text-gray-600">{history.status_message}</p>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {format(new Date(history.created_at), 'MMM dd, HH:mm')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Amount:</span>
            <span>₦{order.total_amount.toLocaleString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
