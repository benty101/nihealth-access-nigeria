
import React, { useState, useEffect } from 'react';
import { FileText, Plus, Edit, Trash2, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { adminService, type InsurancePlan } from '@/services/AdminService';
import { useToast } from '@/hooks/use-toast';

const InsuranceManagement = () => {
  const [plans, setPlans] = useState<InsurancePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<InsurancePlan | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    plan_type: '',
    premium_monthly: '',
    premium_annual: '',
    coverage_amount: '',
    features: '',
    terms: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const plansData = await adminService.getAllInsurancePlans();
      setPlans(plansData);
    } catch (error) {
      console.error('Error loading insurance plans:', error);
      toast({
        title: "Error",
        description: "Failed to load insurance plans",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      provider: '',
      plan_type: '',
      premium_monthly: '',
      premium_annual: '',
      coverage_amount: '',
      features: '',
      terms: ''
    });
    setEditingPlan(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const planData = {
        ...formData,
        premium_monthly: formData.premium_monthly ? parseFloat(formData.premium_monthly) : undefined,
        premium_annual: formData.premium_annual ? parseFloat(formData.premium_annual) : undefined,
        coverage_amount: formData.coverage_amount ? parseFloat(formData.coverage_amount) : undefined,
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
        is_active: true
      };

      if (editingPlan) {
        await adminService.updateInsurancePlan(editingPlan.id, planData);
        toast({
          title: "Success",
          description: "Insurance plan updated successfully"
        });
      } else {
        await adminService.createInsurancePlan(planData);
        toast({
          title: "Success",
          description: "Insurance plan created successfully"
        });
      }

      await loadPlans();
      setIsCreateModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving insurance plan:', error);
      toast({
        title: "Error",
        description: "Failed to save insurance plan",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (plan: InsurancePlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      provider: plan.provider,
      plan_type: plan.plan_type,
      premium_monthly: plan.premium_monthly?.toString() || '',
      premium_annual: plan.premium_annual?.toString() || '',
      coverage_amount: plan.coverage_amount?.toString() || '',
      features: plan.features?.join(', ') || '',
      terms: plan.terms || ''
    });
    setIsCreateModalOpen(true);
  };

  const handleDelete = async (planId: string) => {
    if (!confirm('Are you sure you want to deactivate this insurance plan?')) return;

    try {
      await adminService.deleteInsurancePlan(planId);
      await loadPlans();
      toast({
        title: "Success",
        description: "Insurance plan deactivated successfully"
      });
    } catch (error) {
      console.error('Error deleting insurance plan:', error);
      toast({
        title: "Error",
        description: "Failed to deactivate insurance plan",
        variant: "destructive"
      });
    }
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A';
    return `₦${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading insurance plans...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Insurance Plan Management
            </CardTitle>
            <CardDescription>
              Manage insurance plans available on the platform
            </CardDescription>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={(open) => {
            setIsCreateModalOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPlan ? 'Edit Insurance Plan' : 'Add New Insurance Plan'}
                </DialogTitle>
                <DialogDescription>
                  {editingPlan ? 'Update insurance plan details' : 'Enter the details for the new insurance plan'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Plan Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="provider">Provider *</Label>
                    <Input
                      id="provider"
                      value={formData.provider}
                      onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="plan_type">Plan Type *</Label>
                  <Select value={formData.plan_type} onValueChange={(value) => setFormData({ ...formData, plan_type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="hmo">HMO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="premium_monthly">Monthly Premium (₦)</Label>
                    <Input
                      id="premium_monthly"
                      type="number"
                      step="0.01"
                      value={formData.premium_monthly}
                      onChange={(e) => setFormData({ ...formData, premium_monthly: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="premium_annual">Annual Premium (₦)</Label>
                    <Input
                      id="premium_annual"
                      type="number"
                      step="0.01"
                      value={formData.premium_annual}
                      onChange={(e) => setFormData({ ...formData, premium_annual: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="coverage_amount">Coverage Amount (₦)</Label>
                    <Input
                      id="coverage_amount"
                      type="number"
                      step="0.01"
                      value={formData.coverage_amount}
                      onChange={(e) => setFormData({ ...formData, coverage_amount: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="features">Features (comma separated)</Label>
                  <Input
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="Outpatient Care, Emergency Services, Prescription Coverage"
                  />
                </div>

                <div>
                  <Label htmlFor="terms">Terms & Conditions</Label>
                  <Textarea
                    id="terms"
                    value={formData.terms}
                    onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                    placeholder="Terms and conditions for this insurance plan"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingPlan ? 'Update Plan' : 'Create Plan'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className="relative">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-600">{plan.provider}</p>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(plan)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(plan.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="capitalize">
                      {plan.plan_type}
                    </Badge>
                    <Badge variant={plan.is_active ? "default" : "secondary"}>
                      {plan.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Monthly:</span>
                      <span className="font-medium">{formatCurrency(plan.premium_monthly)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Annual:</span>
                      <span className="font-medium">{formatCurrency(plan.premium_annual)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Coverage:</span>
                      <span className="font-medium">{formatCurrency(plan.coverage_amount)}</span>
                    </div>
                  </div>

                  {plan.features && plan.features.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {plan.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {plan.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{plan.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {plans.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No insurance plans found</p>
            <p className="text-sm text-gray-500">Add your first insurance plan to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsuranceManagement;
