
import { supabase } from '@/integrations/supabase/client';

class OrderStatusService {
  async addStatusHistory(orderId: string, status: string, message?: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('order_status_history')
      .insert([{
        order_id: orderId,
        status,
        status_message: message,
        updated_by: user?.id
      }]);

    if (error) {
      console.error('Error adding status history:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, status: string, message?: string): Promise<void> {
    const { error } = await supabase
      .from('medication_orders')
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
      .from('medication_orders')
      .update(updateData)
      .eq('id', orderId);

    if (error) throw error;

    const message = paymentStatus === 'paid' ? 'Payment confirmed' : `Payment status updated to ${paymentStatus}`;
    await this.addStatusHistory(orderId, paymentStatus === 'paid' ? 'confirmed' : 'pending', message);
  }
}

export const orderStatusService = new OrderStatusService();
