
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Search, Filter, Eye, Edit, Truck, Clock } from 'lucide-react';
import { medicationOrderService, type MedicationOrder } from '@/services/MedicationOrderService';
import { format } from 'date-fns';
import OrderStatusModal from './OrderStatusModal';

const OrderManagement = () => {
  const [orders, setOrders] = useState<MedicationOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<MedicationOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orderTypeFilter, setOrderTypeFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<MedicationOrder | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter, orderTypeFilter]);

  const loadOrders = async () => {
    try {
      const data = await medicationOrderService.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.delivery_address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (orderTypeFilter !== 'all') {
      // For now, treating all as pharmacy orders. In future, we can add order_type field
      filtered = filtered.filter(order => true);
    }

    setFilteredOrders(filtered);
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

  const handleStatusUpdate = (order: MedicationOrder) => {
    setSelectedOrder(order);
    setShowStatusModal(true);
  };

  const handleStatusUpdated = () => {
    setShowStatusModal(false);
    setSelectedOrder(null);
    loadOrders();
  };

  const getOrdersByStatus = (status: string) => {
    return filteredOrders.filter(order => order.status === status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  const OrderTable = ({ orders: tableOrders }: { orders: MedicationOrder[] }) => (
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
        {tableOrders.map((order) => (
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
                  onClick={() => handleStatusUpdate(order)}
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Order Management</h2>
          <p className="text-gray-600">Manage pharmacy and lab test orders</p>
        </div>
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-teal-600" />
          <span className="font-semibold">{orders.length} Total Orders</span>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={orderTypeFilter} onValueChange={setOrderTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pharmacy">Pharmacy Orders</SelectItem>
                <SelectItem value="lab">Lab Test Orders</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Showing {filteredOrders.length} of {orders.length} orders
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Management Tabs */}
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
              {filteredOrders.length > 0 ? (
                <OrderTable orders={filteredOrders} />
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
                  <OrderTable orders={getOrdersByStatus(status)} />
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No {status} orders</h3>
                    <p className="text-gray-600">No orders with {status} status found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {selectedOrder && (
        <OrderStatusModal
          isOpen={showStatusModal}
          onClose={() => setShowStatusModal(false)}
          order={selectedOrder}
          onStatusUpdated={handleStatusUpdated}
        />
      )}
    </div>
  );
};

export default OrderManagement;
