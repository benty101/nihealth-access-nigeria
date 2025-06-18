
import { supabase } from '@/integrations/supabase/client';
import { orderStatusService } from './orders/OrderStatusService';
import { paymentService } from './orders/PaymentService';

export interface MedicationOrder {
  id: string;
  user_id: string;
  order_number: string;
  pharmacy_id?: string;
  status: string;
  total_amount: number;
  delivery_address: string;
  delivery_phone: string;
  delivery_method?: string;
  payment_method?: string;
  payment_status?: string;
  prescription_uploaded?: boolean;
  prescription_url?: string;
  special_instructions?: string;
  estimated_delivery_date?: string;
  actual_delivery_date?: string;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
  pharmacies?: any;
  medication_order_items?: any[];
  order_status_history?: any[];
}

export interface OrderItem {
  id?: string;
  order_id: string;
  medication_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  medications?: any;
}

export interface CreateOrderRequest {
  pharmacy_id?: string;
  delivery_address: string;
  delivery_phone: string;
  delivery_method?: string;
  payment_method?: string;
  special_instructions?: string;
  items: Omit<OrderItem, 'id' | 'order_id'>[];
}

class MedicationOrderService {
  async createOrder(orderData: CreateOrderRequest): Promise<string> {
    console.log('MedicationOrderService: Creating new order...');
    
    // Calculate total amount
    const totalAmount = orderData.items.reduce((sum, item) => sum + item.total_price, 0);
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Create the order with proper type casting
    const insertData: any = {
      delivery_address: orderData.delivery_address,
      delivery_phone: orderData.delivery_phone,
      delivery_method: orderData.delivery_method || 'standard',
      payment_method: orderData.payment_method || 'cash_on_delivery',
      special_instructions: orderData.special_instructions,
      total_amount: totalAmount,
      user_id: user.id,
      status: 'pending',
      payment_status: orderData.payment_method === 'online' ? 'pending' : 'pending'
    };

    // Only add pharmacy_id if it exists
    if (orderData.pharmacy_id) {
      insertData.pharmacy_id = orderData.pharmacy_id;
    }

    const { data: order, error: orderError } = await supabase
      .from('medication_orders')
      .insert(insertData)
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw orderError;
    }

    // Create order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      medication_id: item.medication_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.total_price
    }));

    const { error: itemsError } = await supabase
      .from('medication_order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      throw itemsError;
    }

    // Add initial status history
    await orderStatusService.addStatusHistory(order.id, 'pending', 'Order placed successfully');

    console.log('Order created successfully:', order.order_number);
    return order.id;
  }

  async getUserOrders(): Promise<MedicationOrder[]> {
    console.log('MedicationOrderService: Fetching user orders...');
    
    const { data, error } = await supabase
      .from('medication_orders')
      .select(`
        *,
        pharmacies(name),
        medication_order_items(
          *,
          medications(name, brand)
        ),
        order_status_history(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }

    return data || [];
  }

  async getOrderById(orderId: string): Promise<MedicationOrder | null> {
    const { data, error } = await supabase
      .from('medication_orders')
      .select(`
        *,
        pharmacies(*),
        medication_order_items(
          *,
          medications(*)
        ),
        order_status_history(*)
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      return null;
    }

    return data;
  }

  async getAllOrders(): Promise<MedicationOrder[]> {
    console.log('MedicationOrderService: Fetching all orders (admin)...');
    
    const { data, error } = await supabase
      .from('medication_orders')
      .select(`
        *,
        pharmacies(name),
        medication_order_items(
          *,
          medications(name, brand)
        ),
        order_status_history(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }

    return data || [];
  }

  // Delegate to specialized services
  async updateOrderStatus(orderId: string, status: string, message?: string): Promise<void> {
    return orderStatusService.updateOrderStatus(orderId, status, message);
  }

  async updateOrderPaymentStatus(orderId: string, paymentStatus: string, paymentMethod?: string): Promise<void> {
    return orderStatusService.updatePaymentStatus(orderId, paymentStatus, paymentMethod);
  }

  async addStatusHistory(orderId: string, status: string, message?: string): Promise<void> {
    return orderStatusService.addStatusHistory(orderId, status, message);
  }

  async initiatePayment(orderId: string, paymentMethod: string): Promise<{ success: boolean; paymentUrl?: string; error?: string }> {
    const result = await paymentService.initiatePayment(orderId, paymentMethod);
    if (result.success) {
      await this.updateOrderPaymentStatus(orderId, 'processing', paymentMethod);
    }
    return result;
  }

  async verifyPayment(orderId: string, paymentReference: string): Promise<{ success: boolean; error?: string }> {
    const result = await paymentService.verifyPayment(orderId, paymentReference);
    if (result.success) {
      await this.updateOrderPaymentStatus(orderId, 'paid');
    }
    return result;
  }
}

export const medicationOrderService = new MedicationOrderService();
