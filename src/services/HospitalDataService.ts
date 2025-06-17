
import { supabase } from '@/integrations/supabase/client';

export interface Hospital {
  id: string;
  name: string;
  address: string | null;
  state: string | null;
  lga: string | null;
  phone: string | null;
  email: string | null;
  license_number: string | null;
  specialties: string[] | null;
  facilities: string[] | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface HospitalFilters {
  state?: string;
  lga?: string;
  specialty?: string;
  searchQuery?: string;
}

class HospitalDataService {
  async getHospitals(filters: HospitalFilters = {}, page = 1, limit = 12): Promise<{
    hospitals: Hospital[];
    totalCount: number;
    hasMore: boolean;
  }> {
    console.log('HospitalDataService: Fetching hospitals with filters:', filters, 'Page:', page);
    
    let query = supabase
      .from('hospitals')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('name', { ascending: true });

    // Apply filters
    if (filters.state) {
      query = query.eq('state', filters.state);
    }
    
    if (filters.lga) {
      query = query.eq('lga', filters.lga);
    }
    
    if (filters.specialty && filters.specialty !== 'All') {
      query = query.contains('specialties', [filters.specialty]);
    }
    
    if (filters.searchQuery) {
      query = query.or(`name.ilike.%${filters.searchQuery}%,address.ilike.%${filters.searchQuery}%`);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('HospitalDataService: Error fetching hospitals:', error);
      throw new Error(`Failed to fetch hospitals: ${error.message}`);
    }

    const totalCount = count || 0;
    const hasMore = from + limit < totalCount;

    console.log('HospitalDataService: Successfully fetched hospitals:', {
      hospitalsCount: data?.length || 0,
      totalCount,
      hasMore,
      currentPage: page
    });

    return {
      hospitals: data || [],
      totalCount,
      hasMore
    };
  }

  async getHospitalStates(): Promise<string[]> {
    console.log('HospitalDataService: Fetching unique states...');
    
    const { data, error } = await supabase
      .from('hospitals')
      .select('state')
      .eq('is_active', true)
      .not('state', 'is', null);

    if (error) {
      console.error('HospitalDataService: Error fetching states:', error);
      throw new Error(`Failed to fetch states: ${error.message}`);
    }

    const uniqueStates = [...new Set((data || []).map(item => item.state))].filter(Boolean) as string[];
    console.log('HospitalDataService: Unique states fetched:', uniqueStates);
    
    return uniqueStates.sort();
  }

  async getHospitalLGAs(state?: string): Promise<string[]> {
    console.log('HospitalDataService: Fetching LGAs for state:', state);
    
    let query = supabase
      .from('hospitals')
      .select('lga')
      .eq('is_active', true)
      .not('lga', 'is', null);

    if (state) {
      query = query.eq('state', state);
    }

    const { data, error } = await query;

    if (error) {
      console.error('HospitalDataService: Error fetching LGAs:', error);
      throw new Error(`Failed to fetch LGAs: ${error.message}`);
    }

    const uniqueLGAs = [...new Set((data || []).map(item => item.lga))].filter(Boolean) as string[];
    console.log('HospitalDataService: Unique LGAs fetched:', uniqueLGAs);
    
    return uniqueLGAs.sort();
  }

  async getHospitalSpecialties(): Promise<string[]> {
    console.log('HospitalDataService: Fetching unique specialties...');
    
    const { data, error } = await supabase
      .from('hospitals')
      .select('specialties')
      .eq('is_active', true)
      .not('specialties', 'is', null);

    if (error) {
      console.error('HospitalDataService: Error fetching specialties:', error);
      throw new Error(`Failed to fetch specialties: ${error.message}`);
    }

    // Flatten the array of arrays and get unique values
    const allSpecialties = (data || [])
      .flatMap(item => item.specialties || [])
      .filter(Boolean);
    
    const uniqueSpecialties = [...new Set(allSpecialties)].sort();
    console.log('HospitalDataService: Unique specialties fetched:', uniqueSpecialties);
    
    return uniqueSpecialties;
  }

  async getHospitalById(id: string): Promise<Hospital | null> {
    console.log('HospitalDataService: Fetching hospital by ID:', id);
    
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('HospitalDataService: Hospital not found:', id);
        return null;
      }
      console.error('HospitalDataService: Error fetching hospital:', error);
      throw new Error(`Failed to fetch hospital: ${error.message}`);
    }

    console.log('HospitalDataService: Hospital fetched successfully:', data?.name);
    return data;
  }

  async getHospitalStats(): Promise<{
    totalHospitals: number;
    stateCount: number;
    specialtyCount: number;
  }> {
    console.log('HospitalDataService: Fetching fresh hospital statistics...');
    
    // Force fresh count with no cache
    const { count: hospitalCount, error: countError } = await supabase
      .from('hospitals')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true);

    if (countError) {
      console.error('HospitalDataService: Error fetching hospital count:', countError);
      throw new Error(`Failed to fetch hospital statistics: ${countError.message}`);
    }

    const [statesResult, specialtiesResult] = await Promise.all([
      this.getHospitalStates(),
      this.getHospitalSpecialties()
    ]);

    const stats = {
      totalHospitals: hospitalCount || 0,
      stateCount: statesResult.length,
      specialtyCount: specialtiesResult.length
    };

    console.log('HospitalDataService: Fresh hospital statistics:', stats);
    return stats;
  }
}

export const hospitalDataService = new HospitalDataService();
