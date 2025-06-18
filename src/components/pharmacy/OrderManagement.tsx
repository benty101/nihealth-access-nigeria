
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';
import { medicationOrderService, type MedicationOrder } from '@/services/MedicationOrderService';
import { format } from 'date-fns';
import OrderDetailsModal from './OrderDetailsModal';

const OrderManagement = () => {
  const [orders, setOrders] = useState<MedicationOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<MedicationOrder | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await medicationOrderService.getUserOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'processing':
        return <Package className="h-4 w-4 text-orange-500" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

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

  const filterOrdersByStatus = (status: string) => {
    if (status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };

  const OrderCard = ({ order }: { order: MedicationOrder }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg">Order #{order.order_number}</h3>
            <p className="text-sm text-gray-600">
              {format(new Date(order.created_at), 'MMM dd, yyyy HH:mm')}
            </p>
            {order.pharmacies && (
              <p className="text-sm text-gray-600">
                From: {order.pharmacies.name}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              {getStatusIcon(order.status)}
              <Badge className={getStatusColor(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <p className="font-bold text-lg">₦{order.total_amount.toLocaleString()}</p>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-sm font-medium mb-1">Items:</p>
          <div className="text-sm text-gray-600">
            {order.medication_order_items?.slice(0, 2).map((item, index) => (
              <div key={index}>
                {item.medications?.name} × {item.quantity}
              </div>
            ))}
            {order.medication_order_items && order.medication_order_items.length > 2 && (
              <div className="text-gray-500">
                +{order.medication_order_items.length - 2} more items
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <p>Delivery: {order.delivery_method}</p>
            {order.tracking_number && (
              <p>Tracking: {order.tracking_number}</p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedOrder(order);
              setShowDetailsModal(true);
            }}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Orders</h2>
        <div className="text-sm text-gray-600">
          {orders.length} total orders
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                <p className="text-gray-600">Start shopping to see your orders here</p>
              </CardContent>
            </Card>
          ) : (
            <div>
              {orders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </TabsContent>

        {['pending', 'confirmed', 'processing', 'shipped', 'delivered'].map(status => (
          <TabsContent key={status} value={status} className="mt-6">
            {filterOrdersByStatus(status).map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
            {filterOrdersByStatus(status).length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No {status} orders</h3>
                  <p className="text-gray-600">No orders with {status} status found</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {selectedOrder && (
        <OrderDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default OrderManagement;
