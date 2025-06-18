
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface Hospital {
  id: string;
  name: string;
  address?: string;
  state?: string;
  lga?: string;
  phone?: string;
  email?: string;
  license_number?: string;
  facilities?: string[];
  specialties?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HospitalSubscriptionCallback {
  onInsert?: (hospital: Hospital) => void;
  onUpdate?: (hospital: Hospital) => void;
  onDelete?: (hospital: Hospital) => void;
}

class HospitalService {
  private realtimeChannel: RealtimeChannel | null = null;

  async getAllHospitals(): Promise<Hospital[]> {
    console.log('Fetching active hospitals...');
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching hospitals:', error);
      throw error;
    }

    console.log('Active Hospitals loaded:', data?.length || 0);
    return data || [];
  }

  async getHospitalById(id: string): Promise<Hospital | null> {
    console.log('Fetching hospital by ID:', id);
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching hospital:', error);
      throw error;
    }

    return data;
  }

  async createHospital(hospital: Omit<Hospital, 'id' | 'created_at' | 'updated_at'>): Promise<Hospital> {
    console.log('Creating hospital:', hospital);
    const { data, error } = await supabase
      .from('hospitals')
      .insert(hospital)
      .select()
      .single();

    if (error) {
      console.error('Error creating hospital:', error);
      throw error;
    }

    console.log('Hospital created:', data);
    return data;
  }

  async updateHospital(id: string, updates: Partial<Hospital>): Promise<void> {
    console.log('Updating hospital:', id, updates);
    const { error } = await supabase
      .from('hospitals')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating hospital:', error);
      throw error;
    }

    console.log('Hospital updated successfully');
  }

  async deleteHospital(id: string): Promise<void> {
    console.log('Deactivating hospital:', id);
    const { error } = await supabase
      .from('hospitals')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deactivating hospital:', error);
      throw error;
    }

    console.log('Hospital deactivated successfully');
  }

  // Realtime functionality
  subscribeToHospitalChanges(callbacks: HospitalSubscriptionCallback): () => void {
    console.log('Setting up realtime subscription for hospitals');
    
    this.realtimeChannel = supabase
      .channel('hospitals-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'hospitals'
        },
        (payload) => {
          console.log('Hospital inserted:', payload.new);
          if (callbacks.onInsert) {
            callbacks.onInsert(payload.new as Hospital);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'hospitals'
        },
        (payload) => {
          console.log('Hospital updated:', payload.new);
          if (callbacks.onUpdate) {
            callbacks.onUpdate(payload.new as Hospital);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'hospitals'
        },
        (payload) => {
          console.log('Hospital deleted:', payload.old);
          if (callbacks.onDelete) {
            callbacks.onDelete(payload.old as Hospital);
          }
        }
      )
      .subscribe();

    // Return unsubscribe function
    return () => {
      if (this.realtimeChannel) {
        supabase.removeChannel(this.realtimeChannel);
        this.realtimeChannel = null;
      }
    };
  }

  unsubscribeFromHospitalChanges(): void {
    if (this.realtimeChannel) {
      supabase.removeChannel(this.realtimeChannel);
      this.realtimeChannel = null;
    }
  }

  // Search functionality
  async searchHospitals(query: string, filters?: {
    state?: string;
    lga?: string;
    specialty?: string;
  }): Promise<Hospital[]> {
    console.log('Searching hospitals:', query, filters);
    
    let queryBuilder = supabase
      .from('hospitals')
      .select('*')
      .eq('is_active', true);

    if (query) {
      queryBuilder = queryBuilder.or(`name.ilike.%${query}%,address.ilike.%${query}%`);
    }

    if (filters?.state) {
      queryBuilder = queryBuilder.eq('state', filters.state);
    }

    if (filters?.lga) {
      queryBuilder = queryBuilder.eq('lga', filters.lga);
    }

    if (filters?.specialty) {
      queryBuilder = queryBuilder.contains('specialties', [filters.specialty]);
    }

    const { data, error } = await queryBuilder.order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching hospitals:', error);
      throw error;
    }

    return data || [];
  }

  // Statistics
  async getHospitalStats(): Promise<{
    total: number;
    active: number;
    byState: Record<string, number>;
    bySpecialty: Record<string, number>;
  }> {
    const { data, error } = await supabase
      .from('hospitals')
      .select('is_active, state, specialties');

    if (error) {
      console.error('Error fetching hospital stats:', error);
      throw error;
    }

    const stats = {
      total: data.length,
      active: data.filter(h => h.is_active).length,
      byState: {} as Record<string, number>,
      bySpecialty: {} as Record<string, number>
    };

    data.forEach(hospital => {
      // Count by state
      if (hospital.state) {
        stats.byState[hospital.state] = (stats.byState[hospital.state] || 0) + 1;
      }

      // Count by specialty
      if (hospital.specialties && Array.isArray(hospital.specialties)) {
        hospital.specialties.forEach(specialty => {
          stats.bySpecialty[specialty] = (stats.bySpecialty[specialty] || 0) + 1;
        });
      }
    });

    return stats;
  }
}

export const hospitalService = new HospitalService();
