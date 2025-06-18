
import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { adminService, type InsurancePlan } from '@/services/AdminService';
import { insuranceDataPopulator } from '@/services/InsuranceDataPopulator';
import { useToast } from '@/hooks/use-toast';
import InsurancePlansHeader from './InsurancePlansHeader';
import InsurancePlansGrid from './InsurancePlansGrid';
import InsuranceEmptyState from './InsuranceEmptyState';

interface InsurancePlansTabProps {
  onStatsChange?: () => Promise<void>;
}

const InsurancePlansTab = ({ onStatsChange }: InsurancePlansTabProps) => {
  const [plans, setPlans] = useState<InsurancePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
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

  const syncInsuranceData = async () => {
    try {
      setSyncing(true);
      await insuranceDataPopulator.syncInsuranceData();
      await loadPlans();
      
      if (onStatsChange) {
        await onStatsChange();
      }
      
      toast({
        title: "Success",
        description: "Insurance data synchronized successfully"
      });
    } catch (error) {
      console.error('Error syncing insurance data:', error);
      toast({
        title: "Error",
        description: "Failed to sync insurance data",
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
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

  if (loading && !syncing) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading insurance plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <InsurancePlansHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filteredCount={filteredPlans.length}
        syncing={syncing}
        onSync={syncInsuranceData}
      />

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {filteredPlans.length > 0 ? (
        <InsurancePlansGrid
          plans={filteredPlans}
          onToggleStatus={togglePlanStatus}
        />
      ) : (
        <InsuranceEmptyState
          searchTerm={searchTerm}
          syncing={syncing}
          onSync={syncInsuranceData}
        />
      )}
    </div>
  );
};

export default InsurancePlansTab;
