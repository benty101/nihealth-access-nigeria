
import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { medicationOrderService, type MedicationOrder } from '@/services/MedicationOrderService';
import OrderFilters from './orders/OrderFilters';
import OrderTabs from './orders/OrderTabs';
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

  const handleStatusUpdate = (order: MedicationOrder) => {
    setSelectedOrder(order);
    setShowStatusModal(true);
  };

  const handleStatusUpdated = () => {
    setShowStatusModal(false);
    setSelectedOrder(null);
    loadOrders();
  };

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
        <div>
          <h2 className="text-2xl font-bold">Order Management</h2>
          <p className="text-gray-600">Manage pharmacy and lab test orders</p>
        </div>
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-teal-600" />
          <span className="font-semibold">{orders.length} Total Orders</span>
        </div>
      </div>

      <OrderFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        orderTypeFilter={orderTypeFilter}
        filteredCount={filteredOrders.length}
        totalCount={orders.length}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
        onOrderTypeChange={setOrderTypeFilter}
      />

      <OrderTabs orders={filteredOrders} onStatusUpdate={handleStatusUpdate} />

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
