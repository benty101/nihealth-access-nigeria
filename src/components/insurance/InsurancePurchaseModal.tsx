
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, CreditCard, Shield, Users } from 'lucide-react';
import { format, addYears } from 'date-fns';
import { cn } from '@/lib/utils';
import { insurancePurchaseService } from '@/services/InsurancePurchaseService';
import { useToast } from '@/hooks/use-toast';

interface InsurancePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: any;
  onPurchaseComplete: () => void;
}

const InsurancePurchaseModal = ({ isOpen, onClose, plan, onPurchaseComplete }: InsurancePurchaseModalProps) => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [paymentFrequency, setPaymentFrequency] = useState<'monthly' | 'quarterly' | 'annually'>('monthly');
  const [beneficiaries, setBeneficiaries] = useState([{ name: '', relationship: '', dateOfBirth: '' }]);
  const { toast } = useToast();

  const handleAddBeneficiary = () => {
    setBeneficiaries([...beneficiaries, { name: '', relationship: '', dateOfBirth: '' }]);
  };

  const handleBeneficiaryChange = (index: number, field: string, value: string) => {
    const updated = [...beneficiaries];
    updated[index] = { ...updated[index], [field]: value };
    setBeneficiaries(updated);
  };

  const calculatePremium = () => {
    if (!plan) return 0;
    const baseMonthly = parseInt(plan.monthlyPremium?.replace(/[₦,]/g, '') || '0');
    
    switch (paymentFrequency) {
      case 'quarterly':
        return baseMonthly * 3 * 0.95; // 5% discount for quarterly
      case 'annually':
        return baseMonthly * 12 * 0.85; // 15% discount for annual
      default:
        return baseMonthly;
    }
  };

  const handlePurchase = async () => {
    if (!startDate || !plan) return;

    setLoading(true);
    try {
      const endDate = addYears(startDate, 1);
      
      await insurancePurchaseService.createPurchase({
        plan_id: plan.id,
        start_date: format(startDate, 'yyyy-MM-dd'),
        end_date: format(endDate, 'yyyy-MM-dd'),
        premium_amount: calculatePremium(),
        payment_frequency: paymentFrequency,
        beneficiaries: beneficiaries.filter(b => b.name.trim())
      });

      toast({
        title: 'Insurance Purchase Successful!',
        description: 'Your insurance policy has been created. You will receive your policy documents via email.',
      });

      onPurchaseComplete();
      onClose();
    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: 'Purchase Failed',
        description: 'There was an error processing your purchase. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!plan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-teal-600" />
            Purchase Insurance Plan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Plan Summary */}
          <div className="bg-teal-50 p-4 rounded-lg border">
            <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Provider:</span>
                <span className="ml-2 font-medium">{plan.provider}</span>
              </div>
              <div>
                <span className="text-gray-600">Coverage:</span>
                <span className="ml-2 font-medium">{plan.coverage}</span>
              </div>
              <div>
                <span className="text-gray-600">Type:</span>
                <span className="ml-2 font-medium">{plan.type}</span>
              </div>
              <div>
                <span className="text-gray-600">Monthly Premium:</span>
                <span className="ml-2 font-medium">{plan.monthlyPremium}</span>
              </div>
            </div>
          </div>

          {/* Coverage Start Date */}
          <div className="space-y-2">
            <Label>Coverage Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Select start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Payment Frequency */}
          <div className="space-y-2">
            <Label>Payment Frequency</Label>
            <Select value={paymentFrequency} onValueChange={(value: any) => setPaymentFrequency(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly (5% discount)</SelectItem>
                <SelectItem value="annually">Annually (15% discount)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Premium Calculation */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Premium ({paymentFrequency}):</span>
              <span className="text-xl font-bold text-teal-600">
                ₦{calculatePremium().toLocaleString()}
              </span>
            </div>
          </div>

          {/* Beneficiaries */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <Label>Beneficiaries</Label>
            </div>
            {beneficiaries.map((beneficiary, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 p-3 border rounded-lg">
                <Input
                  placeholder="Full Name"
                  value={beneficiary.name}
                  onChange={(e) => handleBeneficiaryChange(index, 'name', e.target.value)}
                />
                <Input
                  placeholder="Relationship"
                  value={beneficiary.relationship}
                  onChange={(e) => handleBeneficiaryChange(index, 'relationship', e.target.value)}
                />
                <Input
                  type="date"
                  placeholder="Date of Birth"
                  value={beneficiary.dateOfBirth}
                  onChange={(e) => handleBeneficiaryChange(index, 'dateOfBirth', e.target.value)}
                />
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddBeneficiary} className="w-full">
              Add Beneficiary
            </Button>
          </div>

          {/* Purchase Button */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handlePurchase} 
              disabled={!startDate || loading}
              className="flex-1 bg-teal-600 hover:bg-teal-700"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              {loading ? 'Processing...' : 'Purchase Plan'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InsurancePurchaseModal;
