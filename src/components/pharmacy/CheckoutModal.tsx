
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Truck, MapPin, Phone } from 'lucide-react';
import { medicationOrderService, type CreateOrderRequest } from '@/services/MedicationOrderService';
import { useToast } from '@/hooks/use-toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  onOrderSuccess: (orderId: string) => void;
}

const CheckoutModal = ({ isOpen, onClose, cartItems, onOrderSuccess }: CheckoutModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    delivery_address: '',
    delivery_phone: '',
    delivery_method: 'standard',
    payment_method: 'cash_on_delivery',
    special_instructions: '',
    pharmacy_id: ''
  });

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const deliveryMethods = [
    { value: 'standard', label: 'Standard Delivery (3-5 days)', fee: 2000 },
    { value: 'express', label: 'Express Delivery (1-2 days)', fee: 5000 },
    { value: 'same_day', label: 'Same Day Delivery', fee: 8000 }
  ];

  const paymentMethods = [
    { value: 'cash_on_delivery', label: 'Cash on Delivery', icon: '💵' },
    { value: 'paystack', label: 'Pay with Card (Paystack)', icon: '💳' },
    { value: 'flutterwave', label: 'Pay with Flutterwave', icon: '🏦' },
    { value: 'bank_transfer', label: 'Bank Transfer', icon: '🏛️' }
  ];

  const selectedDeliveryMethod = deliveryMethods.find(m => m.value === formData.delivery_method);
  const deliveryFee = selectedDeliveryMethod?.fee || 0;
  const grandTotal = totalAmount + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData: CreateOrderRequest = {
        pharmacy_id: formData.pharmacy_id || undefined,
        delivery_address: formData.delivery_address,
        delivery_phone: formData.delivery_phone,
        delivery_method: formData.delivery_method,
        payment_method: formData.payment_method,
        special_instructions: formData.special_instructions,
        items: cartItems.map(item => ({
          medication_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity
        }))
      };

      const orderId = await medicationOrderService.createOrder(orderData);

      // Handle payment processing
      if (formData.payment_method !== 'cash_on_delivery') {
        const paymentResult = await medicationOrderService.initiatePayment(orderId, formData.payment_method);
        
        if (paymentResult.success && paymentResult.paymentUrl) {
          // Redirect to payment gateway
          window.open(paymentResult.paymentUrl, '_blank');
          toast({
            title: "Order Created",
            description: "Redirecting to payment gateway...",
          });
        } else {
          throw new Error(paymentResult.error || 'Payment initiation failed');
        }
      } else {
        toast({
          title: "Order Created Successfully",
          description: `Order #${orderId} has been placed. You'll pay on delivery.`,
        });
      }

      onOrderSuccess(orderId);
      onClose();
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Checkout - Step 1: Delivery Information</DialogTitle>
          </DialogHeader>

          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="delivery_address">
                <MapPin className="h-4 w-4 inline mr-2" />
                Delivery Address *
              </Label>
              <Textarea
                id="delivery_address"
                value={formData.delivery_address}
                onChange={(e) => setFormData(prev => ({ ...prev, delivery_address: e.target.value }))}
                placeholder="Enter your full delivery address..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="delivery_phone">
                <Phone className="h-4 w-4 inline mr-2" />
                Delivery Phone *
              </Label>
              <Input
                id="delivery_phone"
                value={formData.delivery_phone}
                onChange={(e) => setFormData(prev => ({ ...prev, delivery_phone: e.target.value }))}
                placeholder="Enter phone number for delivery"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>
                <Truck className="h-4 w-4 inline mr-2" />
                Delivery Method
              </Label>
              <RadioGroup
                value={formData.delivery_method}
                onValueChange={(value) => setFormData(prev => ({ ...prev, delivery_method: value }))}
              >
                {deliveryMethods.map((method) => (
                  <div key={method.value} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value={method.value} id={method.value} />
                    <Label htmlFor={method.value} className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>{method.label}</span>
                        <span className="font-semibold">₦{method.fee.toLocaleString()}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="special_instructions">Special Instructions</Label>
              <Textarea
                id="special_instructions"
                value={formData.special_instructions}
                onChange={(e) => setFormData(prev => ({ ...prev, special_instructions: e.target.value }))}
                placeholder="Any special delivery instructions..."
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                Continue to Payment
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Checkout - Step 2: Payment & Review</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <div>
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₦{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <Label className="text-base font-semibold">
              <CreditCard className="h-4 w-4 inline mr-2" />
              Payment Method
            </Label>
            <RadioGroup
              value={formData.payment_method}
              onValueChange={(value) => setFormData(prev => ({ ...prev, payment_method: value }))}
              className="mt-3"
            >
              {paymentMethods.map((method) => (
                <div key={method.value} className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value={method.value} id={method.value} />
                  <Label htmlFor={method.value} className="flex items-center gap-2 cursor-pointer">
                    <span>{method.icon}</span>
                    <span>{method.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between space-x-2">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-teal-600 hover:bg-teal-700 flex-1"
              >
                {loading ? 'Processing...' : `Place Order - ₦${grandTotal.toLocaleString()}`}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
