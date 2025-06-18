
import { supabase } from '@/integrations/supabase/client';

export interface LabTestOrder {
  id: string;
  user_id: string;
  order_number: string;
  lab_id?: string;
  status: string;
  total_amount: number;
  collection_method: string;
  collection_address?: string;
  collection_phone: string;
  collection_date?: string;
  collection_time?: string;
  patient_name: string;
  patient_age?: number;
  patient_gender?: string;
  special_instructions?: string;
  payment_method?: string;
  payment_status?: string;
  results_uploaded?: boolean;
  results_url?: string;
  created_at: string;
  updated_at: string;
  labs?: any;
  lab_test_order_items?: any[];
  lab_test_order_status_history?: any[];
}

export interface LabTestOrderItem {
  id?: string;
  order_id: string;
  lab_test_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  lab_tests?: any;
}

export interface CreateLabTestOrderRequest {
  lab_id?: string;
  collection_method: string;
  collection_address?: string;
  collection_phone: string;
  collection_date?: string;
  collection_time?: string;
  patient_name: string;
  patient_age?: number;
  patient_gender?: string;
  special_instructions?: string;
  payment_method?: string;
  items: Omit<LabTestOrderItem, 'id' | 'order_id'>[];
}

class LabTestOrderService {
  async createOrder(orderData: CreateLabTestOrderRequest): Promise<string> {
    console.log('LabTestOrderService: Creating new lab test order...');
    
    // Calculate total amount
    const totalAmount = orderData.items.reduce((sum, item) => sum + item.total_price, 0);
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Create the order
    const insertData: any = {
      collection_method: orderData.collection_method,
      collection_address: orderData.collection_address,
      collection_phone: orderData.collection_phone,
      collection_date: orderData.collection_date,
      collection_time: orderData.collection_time,
      patient_name: orderData.patient_name,
      patient_age: orderData.patient_age,
      patient_gender: orderData.patient_gender,
      special_instructions: orderData.special_instructions,
      payment_method: orderData.payment_method || 'cash_on_delivery',
      total_amount: totalAmount,
      user_id: user.id,
      status: 'pending',
      payment_status: orderData.payment_method === 'online' ? 'pending' : 'pending'
    };

    // Only add lab_id if it exists
    if (orderData.lab_id) {
      insertData.lab_id = orderData.lab_id;
    }

    const { data: order, error: orderError } = await supabase
      .from('lab_test_orders')
      .insert(insertData)
      .select()
      .single();

    if (orderError) {
      console.error('Error creating lab test order:', orderError);
      throw orderError;
    }

    // Create order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      lab_test_id: item.lab_test_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.total_price
    }));

    const { error: itemsError } = await supabase
      .from('lab_test_order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating lab test order items:', itemsError);
      throw itemsError;
    }

    // Add initial status history
    await this.addStatusHistory(order.id, 'pending', 'Lab test order placed successfully');

    console.log('Lab test order created successfully:', order.order_number);
    return order.id;
  }

  async getUserOrders(): Promise<LabTestOrder[]> {
    console.log('LabTestOrderService: Fetching user lab test orders...');
    
    const { data, error } = await supabase
      .from('lab_test_orders')
      .select(`
        *,
        labs(name),
        lab_test_order_items(
          *,
          lab_tests(name, category)
        ),
        lab_test_order_status_history(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching lab test orders:', error);
      throw error;
    }

    return data || [];
  }

  async getAllOrders(): Promise<LabTestOrder[]> {
    console.log('LabTestOrderService: Fetching all lab test orders (admin)...');
    
    const { data, error } = await supabase
      .from('lab_test_orders')
      .select(`
        *,
        labs(name),
        lab_test_order_items(
          *,
          lab_tests(name, category)
        ),
        lab_test_order_status_history(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all lab test orders:', error);
      throw error;
    }

    return data || [];
  }

  async getOrderById(orderId: string): Promise<LabTestOrder | null> {
    const { data, error } = await supabase
      .from('lab_test_orders')
      .select(`
        *,
        labs(*),
        lab_test_order_items(
          *,
          lab_tests(*)
        ),
        lab_test_order_status_history(*)
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      console.error('Error fetching lab test order:', error);
      return null;
    }

    return data;
  }

  async updateOrderStatus(orderId: string, status: string, message?: string): Promise<void> {
    const { error } = await supabase
      .from('lab_test_orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) throw error;

    await this.addStatusHistory(orderId, status, message);
  }

  async updatePaymentStatus(orderId: string, paymentStatus: string, paymentMethod?: string): Promise<void> {
    const updateData: any = { 
      payment_status: paymentStatus,
      updated_at: new Date().toISOString()
    };
    
    if (paymentMethod) {
      updateData.payment_method = paymentMethod;
    }

    const { error } = await supabase
      .from('lab_test_orders')
      .update(updateData)
      .eq('id', orderId);

    if (error) throw error;

    const message = paymentStatus === 'paid' ? 'Payment confirmed' : `Payment status updated to ${paymentStatus}`;
    await this.addStatusHistory(orderId, paymentStatus === 'paid' ? 'confirmed' : 'pending', message);
  }

  async addStatusHistory(orderId: string, status: string, message?: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('lab_test_order_status_history')
      .insert([{
        order_id: orderId,
        status,
        status_message: message,
        updated_by: user?.id
      }]);

    if (error) {
      console.error('Error adding lab test order status history:', error);
      throw error;
    }
  }

  async uploadResults(orderId: string, resultsUrl: string): Promise<void> {
    const { error } = await supabase
      .from('lab_test_orders')
      .update({ 
        results_uploaded: true,
        results_url: resultsUrl,
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId);

    if (error) throw error;

    await this.addStatusHistory(orderId, 'completed', 'Test results uploaded and available');
  }
}

export const labTestOrderService = new LabTestOrderService();
