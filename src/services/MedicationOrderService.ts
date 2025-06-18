
import { supabase } from '@/integrations/supabase/client';

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
  special_instructions?: string;
  items: Omit<OrderItem, 'id' | 'order_id'>[];
}

class MedicationOrderService {
  async createOrder(orderData: CreateOrderRequest): Promise<string> {
    console.log('MedicationOrderService: Creating new order...');
    
    // Calculate total amount
    const totalAmount = orderData.items.reduce((sum, item) => sum + item.total_price, 0);
    
    // Create the order
    const { data: order, error: orderError } = await supabase
      .from('medication_orders')
      .insert([{
        pharmacy_id: orderData.pharmacy_id,
        delivery_address: orderData.delivery_address,
        delivery_phone: orderData.delivery_phone,
        delivery_method: orderData.delivery_method || 'standard',
        special_instructions: orderData.special_instructions,
        total_amount: totalAmount,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }])
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
    await this.addStatusHistory(order.id, 'pending', 'Order placed successfully');

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

  async updateOrderStatus(orderId: string, status: string, message?: string): Promise<void> {
    const { error } = await supabase
      .from('medication_orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) throw error;

    await this.addStatusHistory(orderId, status, message);
  }

  async addStatusHistory(orderId: string, status: string, message?: string): Promise<void> {
    const { error } = await supabase
      .from('order_status_history')
      .insert([{
        order_id: orderId,
        status,
        status_message: message,
        updated_by: (await supabase.auth.getUser()).data.user?.id
      }]);

    if (error) {
      console.error('Error adding status history:', error);
      throw error;
    }
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
}

export const medicationOrderService = new MedicationOrderService();
