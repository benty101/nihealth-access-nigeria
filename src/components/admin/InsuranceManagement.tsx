
import React, { useState, useEffect } from 'react';
import { FileText, Plus, Search, Edit, Trash2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { adminService, type InsurancePlan } from '@/services/AdminService';
import { useToast } from '@/hooks/use-toast';

interface InsuranceManagementProps {
  onStatsChange?: () => Promise<void>;
}

const InsuranceManagement = ({ onStatsChange }: InsuranceManagementProps) => {
  const [plans, setPlans] = useState<InsurancePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getAllInsurancePlans();
      setPlans(data || []);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to load insurance plans: ${errorMessage}`);
      toast({
        title: "Error",
        description: "Failed to load insurance plans. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePlanStatus = async (id: string, currentStatus: boolean) => {
    try {
      await adminService.updateInsurancePlan(id, { is_active: !currentStatus });
      await loadPlans();
      
      if (onStatsChange) {
        await onStatsChange();
      }
      
      toast({
        title: "Success",
        description: `Insurance plan ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      });
    } catch (error) {
      console.error('Error updating insurance plan status:', error);
      toast({
        title: "Error",
        description: "Failed to update insurance plan status",
        variant: "destructive"
      });
    }
  };

  const filteredPlans = plans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.plan_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  if (error) {
    return (
      <Card>
        <CardContent className="py-16">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="flex justify-center mt-4">
            <Button onClick={loadPlans} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Insurance Management
            </CardTitle>
            <CardDescription>
              Manage insurance plans and coverage options
            </CardDescription>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Plan
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search insurance plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
           <Badge variant="secondary">
              {filteredPlans.length} found
            </Badge>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <p className="text-sm text-gray-600">{plan.provider}</p>
                    <p className="text-xs text-gray-500">{plan.plan_type}</p>
                  </div>
                  <Badge className={plan.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {plan.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Coverage:</span>
                    <span className="text-gray-600">₦{plan.coverage_amount?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Annual Premium:</span>
                    <span className="text-gray-600">₦{plan.premium_annual?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Monthly Premium:</span>
                    <span className="text-gray-600">₦{plan.premium_monthly?.toLocaleString() || 'N/A'}</span>
                  </div>
                </div>

                {plan.features && plan.features.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Features:</p>
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

                <div className="flex items-center gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant={plan.is_active ? "destructive" : "default"}
                    size="sm"
                    onClick={() => togglePlanStatus(plan.id, plan.is_active)}
                  >
                    {plan.is_active ? (
                      <>
                        <Trash2 className="h-3 w-3 mr-1" />
                        Deactivate
                      </>
                    ) : (
                      'Activate'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
             {searchTerm ? 'No insurance plans found matching your criteria' : 'No insurance plans available'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsuranceManagement;
