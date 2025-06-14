
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Smartphone, Building, Wallet, Phone } from 'lucide-react';

interface PaymentMethodsProps {
  selectedPlan?: any;
  onPaymentInitiate: (method: string, details: any) => void;
}

const PaymentMethods = ({ selectedPlan, onPaymentInitiate }: PaymentMethodsProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ussdCode, setUssdCode] = useState('');

  const paymentMethods = [
    {
      id: 'card',
      name: 'Debit/Credit Card',
      icon: CreditCard,
      description: 'Pay with your Visa, Mastercard, or Verve card',
      popular: true
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: Building,
      description: 'Direct bank transfer or online banking',
      popular: false
    },
    {
      id: 'mobile_money',
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'Pay with your mobile wallet',
      popular: true
    },
    {
      id: 'ussd',
      name: 'USSD Banking',
      icon: Phone,
      description: 'Pay using your bank\'s USSD code',
      popular: true
    },
    {
      id: 'paystack',
      name: 'Paystack',
      icon: Wallet,
      description: 'Secure payment via Paystack',
      popular: false
    }
  ];

  const mobileMoneyProviders = [
    { name: 'MTN Mobile Money', code: '*737#' },
    { name: 'Airtel Money', code: '*432#' },
    { name: 'Glo Mobile Money', code: '*777#' },
    { name: '9mobile QuickTeller', code: '*322#' }
  ];

  const ussdCodes = [
    { bank: 'GTBank', code: '*737#' },
    { bank: 'First Bank', code: '*894#' },
    { bank: 'Access Bank', code: '*901#' },
    { bank: 'Zenith Bank', code: '*966#' },
    { bank: 'UBA', code: '*919#' },
    { bank: 'Fidelity Bank', code: '*770#' },
    { bank: 'Sterling Bank', code: '*822#' },
    { bank: 'Union Bank', code: '*826#' }
  ];

  const handlePayment = () => {
    const paymentDetails = {
      method: selectedMethod,
      phoneNumber: phoneNumber,
      ussdCode: ussdCode,
      amount: selectedPlan?.monthlyPremium || '₦0'
    };
    onPaymentInitiate(selectedMethod, paymentDetails);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Payment Method</CardTitle>
        <p className="text-sm text-gray-600">
          Multiple payment options available for your convenience
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all relative ${
                  selectedMethod === method.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                {method.popular && (
                  <Badge className="absolute -top-2 right-2 bg-emerald-600 text-xs">
                    Popular
                  </Badge>
                )}
                <div className="flex items-start space-x-3">
                  <Icon className="h-6 w-6 text-teal-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Money Details */}
        {selectedMethod === 'mobile_money' && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium">Mobile Money Details</h4>
            <Input
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              {mobileMoneyProviders.map((provider) => (
                <div key={provider.name} className="text-sm p-2 bg-white rounded border">
                  <div className="font-medium">{provider.name}</div>
                  <div className="text-gray-600">{provider.code}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* USSD Banking Details */}
        {selectedMethod === 'ussd' && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium">USSD Banking</h4>
            <Input
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Select value={ussdCode} onValueChange={setUssdCode}>
              <SelectTrigger>
                <SelectValue placeholder="Select your bank" />
              </SelectTrigger>
              <SelectContent>
                {ussdCodes.map((bank) => (
                  <SelectItem key={bank.bank} value={bank.code}>
                    {bank.bank} - {bank.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Payment Summary */}
        {selectedPlan && (
          <div className="p-4 bg-teal-50 rounded-lg">
            <h4 className="font-medium mb-2">Payment Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Plan:</span>
                <span>{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Premium:</span>
                <span className="font-semibold">{selectedPlan.monthlyPremium}</span>
              </div>
              <div className="flex justify-between border-t pt-1 font-semibold">
                <span>Total:</span>
                <span>{selectedPlan.monthlyPremium}</span>
              </div>
            </div>
          </div>
        )}

        {/* Payment Button */}
        <Button 
          className="w-full bg-teal-600 hover:bg-teal-700"
          disabled={!selectedMethod}
          onClick={handlePayment}
        >
          {selectedMethod === 'ussd' || selectedMethod === 'mobile_money' 
            ? 'Generate Payment Code' 
            : 'Proceed to Payment'
          }
        </Button>

        {/* Payment Instructions */}
        {(selectedMethod === 'ussd' || selectedMethod === 'mobile_money') && (
          <div className="text-sm text-gray-600 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <strong>Next Steps:</strong> After clicking "Generate Payment Code", you'll receive instructions 
            to complete your payment using your selected method.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
