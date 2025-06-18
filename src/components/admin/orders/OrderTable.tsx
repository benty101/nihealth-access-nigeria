
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Package, Truck, Eye, Edit } from 'lucide-react';
import { format } from 'date-fns';
import type { MedicationOrder } from '@/services/MedicationOrderService';

interface OrderTableProps {
  orders: MedicationOrder[];
  onStatusUpdate: (order: MedicationOrder) => void;
}

const OrderTable = ({ orders, onStatusUpdate }: OrderTableProps) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
      case 'confirmed':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
      case 'delivered':
        return <Truck className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order #</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tracking</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.order_number}</TableCell>
            <TableCell>
              {format(new Date(order.created_at), 'MMM dd, yyyy')}
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">Customer</div>
                <div className="text-sm text-gray-500">{order.delivery_phone}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                {order.medication_order_items?.length || 0} items
              </div>
            </TableCell>
            <TableCell className="font-medium">
              ₦{order.total_amount.toLocaleString()}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {getStatusIcon(order.status)}
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </TableCell>
            <TableCell>
              {order.tracking_number ? (
                <div className="text-sm">
                  <div className="font-medium">{order.tracking_number}</div>
                  {order.estimated_delivery_date && (
                    <div className="text-gray-500">
                      Est: {format(new Date(order.estimated_delivery_date), 'MMM dd')}
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-gray-400">No tracking</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-3 w-3" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onStatusUpdate(order)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
