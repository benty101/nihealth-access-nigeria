
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import OrderTable from './OrderTable';
import type { MedicationOrder } from '@/services/MedicationOrderService';

interface OrderTabsProps {
  orders: MedicationOrder[];
  onStatusUpdate: (order: MedicationOrder) => void;
}

const OrderTabs = ({ orders, onStatusUpdate }: OrderTabsProps) => {
  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status);
  };

  const EmptyState = ({ status }: { status: string }) => (
    <div className="text-center py-8">
      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">No {status} orders</h3>
      <p className="text-gray-600">No orders with {status} status found</p>
    </div>
  );

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="all">All Orders</TabsTrigger>
        <TabsTrigger value="pending">Pending ({getOrdersByStatus('pending').length})</TabsTrigger>
        <TabsTrigger value="confirmed">Confirmed ({getOrdersByStatus('confirmed').length})</TabsTrigger>
        <TabsTrigger value="processing">Processing ({getOrdersByStatus('processing').length})</TabsTrigger>
        <TabsTrigger value="shipped">Shipped ({getOrdersByStatus('shipped').length})</TabsTrigger>
        <TabsTrigger value="delivered">Delivered ({getOrdersByStatus('delivered').length})</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <OrderTable orders={orders} onStatusUpdate={onStatusUpdate} />
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No orders found</h3>
                <p className="text-gray-600">No orders match your current filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {['pending', 'confirmed', 'processing', 'shipped', 'delivered'].map((status) => (
        <TabsContent key={status} value={status} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">{status} Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {getOrdersByStatus(status).length > 0 ? (
                <OrderTable orders={getOrdersByStatus(status)} onStatusUpdate={onStatusUpdate} />
              ) : (
                <EmptyState status={status} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default OrderTabs;
