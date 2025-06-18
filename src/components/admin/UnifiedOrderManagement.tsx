
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Search, Filter, Eye, Edit, Truck, Clock, TestTube, Pill } from 'lucide-react';
import { medicationOrderService, type MedicationOrder } from '@/services/MedicationOrderService';
import { labTestOrderService, type LabTestOrder } from '@/services/LabTestOrderService';
import { format } from 'date-fns';
import OrderStatusModal from './OrderStatusModal';

interface UnifiedOrder {
  id: string;
  order_number: string;
  type: 'medication' | 'lab_test';
  status: string;
  total_amount: number;
  customer_info: string;
  customer_phone: string;
  items_count: number;
  created_at: string;
  tracking_number?: string;
  estimated_delivery_date?: string;
  collection_date?: string;
  collection_time?: string;
  original_order: MedicationOrder | LabTestOrder;
}

const UnifiedOrderManagement = () => {
  const [medicationOrders, setMedicationOrders] = useState<MedicationOrder[]>([]);
  const [labTestOrders, setLabTestOrders] = useState<LabTestOrder[]>([]);
  const [unifiedOrders, setUnifiedOrders] = useState<UnifiedOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<UnifiedOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<MedicationOrder | LabTestOrder | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    loadAllOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [unifiedOrders, searchTerm, statusFilter, typeFilter]);

  const loadAllOrders = async () => {
    try {
      const [medOrders, labOrders] = await Promise.all([
        medicationOrderService.getAllOrders(),
        labTestOrderService.getAllOrders()
      ]);
      
      setMedicationOrders(medOrders);
      setLabTestOrders(labOrders);
      
      // Combine orders into unified format
      const unified: UnifiedOrder[] = [
        ...medOrders.map(order => ({
          id: order.id,
          order_number: order.order_number,
          type: 'medication' as const,
          status: order.status,
          total_amount: order.total_amount,
          customer_info: 'Customer',
          customer_phone: order.delivery_phone,
          items_count: order.medication_order_items?.length || 0,
          created_at: order.created_at,
          tracking_number: order.tracking_number,
          estimated_delivery_date: order.estimated_delivery_date,
          original_order: order
        })),
        ...labOrders.map(order => ({
          id: order.id,
          order_number: order.order_number,
          type: 'lab_test' as const,
          status: order.status,
          total_amount: order.total_amount,
          customer_info: order.patient_name,
          customer_phone: order.collection_phone,
          items_count: order.lab_test_order_items?.length || 0,
          created_at: order.created_at,
          collection_date: order.collection_date,
          collection_time: order.collection_time,
          original_order: order
        }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      setUnifiedOrders(unified);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = unifiedOrders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_info.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_phone.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(order => order.type === typeFilter);
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
      case 'completed':
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
      case 'completed':
        return <Truck className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'medication' ? <Pill className="h-4 w-4" /> : <TestTube className="h-4 w-4" />;
  };

  const handleStatusUpdate = (order: UnifiedOrder) => {
    setSelectedOrder(order.original_order);
    setShowStatusModal(true);
  };

  const handleStatusUpdated = () => {
    setShowStatusModal(false);
    setSelectedOrder(null);
    loadAllOrders();
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

  const OrderTable = ({ orders: tableOrders }: { orders: UnifiedOrder[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order #</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableOrders.map((order) => (
          <TableRow key={`${order.type}-${order.id}`}>
            <TableCell className="font-medium">{order.order_number}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {getTypeIcon(order.type)}
                <Badge variant="outline">
                  {order.type === 'medication' ? 'Pharmacy' : 'Lab Test'}
                </Badge>
              </div>
            </TableCell>
            <TableCell>
              {format(new Date(order.created_at), 'MMM dd, yyyy')}
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{order.customer_info}</div>
                <div className="text-sm text-gray-500">{order.customer_phone}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                {order.items_count} items
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
              {order.type === 'medication' ? (
                order.tracking_number ? (
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
                )
              ) : (
                order.collection_date ? (
                  <div className="text-sm">
                    <div className="font-medium">
                      {format(new Date(order.collection_date), 'MMM dd, yyyy')}
                    </div>
                    {order.collection_time && (
                      <div className="text-gray-500">{order.collection_time}</div>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400">No collection date</span>
                )
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
          <p className="text-gray-600">Manage all pharmacy and lab test orders</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Pill className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">{medicationOrders.length} Pharmacy</span>
          </div>
          <div className="flex items-center gap-2">
            <TestTube className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">{labTestOrders.length} Lab Tests</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-teal-600" />
            <span className="font-semibold">{unifiedOrders.length} Total Orders</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="medication">Pharmacy Orders</SelectItem>
                <SelectItem value="lab_test">Lab Test Orders</SelectItem>
              </SelectContent>
            </Select>
            
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Showing {filteredOrders.length} of {unifiedOrders.length} orders
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Management Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending ({getOrdersByStatus('pending').length})</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed ({getOrdersByStatus('confirmed').length})</TabsTrigger>
          <TabsTrigger value="processing">Processing ({getOrdersByStatus('processing').length})</TabsTrigger>
          <TabsTrigger value="shipped">Shipped ({getOrdersByStatus('shipped').length})</TabsTrigger>
          <TabsTrigger value="delivered">Delivered ({getOrdersByStatus('delivered').length + getOrdersByStatus('completed').length})</TabsTrigger>
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
                {getOrdersByStatus(status).length > 0 || (status === 'delivered' && getOrdersByStatus('completed').length > 0) ? (
                  <OrderTable orders={status === 'delivered' ? [...getOrdersByStatus('delivered'), ...getOrdersByStatus('completed')] : getOrdersByStatus(status)} />
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
          order={selectedOrder as MedicationOrder}
          onStatusUpdated={handleStatusUpdated}
        />
      )}
    </div>
  );
};

export default UnifiedOrderManagement;
