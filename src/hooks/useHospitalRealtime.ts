
import { useState, useEffect } from 'react';
import { hospitalService, type Hospital } from '@/services/HospitalService';
import { useToast } from '@/hooks/use-toast';

export const useHospitalRealtime = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadHospitals();
    
    const unsubscribe = hospitalService.subscribeToHospitalChanges({
      onInsert: (hospital) => {
        setHospitals(prev => [hospital, ...prev]);
        toast({
          title: "Hospital Added",
          description: `${hospital.name} has been added.`,
        });
      },
      onUpdate: (hospital) => {
        setHospitals(prev => prev.map(h => h.id === hospital.id ? hospital : h));
        toast({
          title: "Hospital Updated",
          description: `${hospital.name} has been updated.`,
        });
      },
      onDelete: (hospital) => {
        setHospitals(prev => prev.filter(h => h.id !== hospital.id));
        toast({
          title: "Hospital Removed",
          description: `${hospital.name} has been removed.`,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [toast]);

  const loadHospitals = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await hospitalService.getAllHospitals();
      setHospitals(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load hospitals';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createHospital = async (hospital: Omit<Hospital, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      await hospitalService.createHospital(hospital);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create hospital';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  const updateHospital = async (id: string, updates: Partial<Hospital>) => {
    try {
      await hospitalService.updateHospital(id, updates);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update hospital';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  const deleteHospital = async (id: string) => {
    try {
      await hospitalService.deleteHospital(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete hospital';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  const searchHospitals = async (query: string, filters?: {
    state?: string;
    lga?: string;
    specialty?: string;
  }) => {
    try {
      const results = await hospitalService.searchHospitals(query, filters);
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search hospitals';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      throw err;
    }
  };

  return {
    hospitals,
    loading,
    error,
    createHospital,
    updateHospital,
    deleteHospital,
    searchHospitals,
    refreshHospitals: loadHospitals
  };
};
