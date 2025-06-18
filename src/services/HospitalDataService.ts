
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
    console.log('HospitalDataService: Starting getHospitals with filters:', filters, 'page:', page, 'limit:', limit);
    
    // First, let's get the total count without filters to debug
    const { count: totalCountCheck, error: countError } = await supabase
      .from('hospitals')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);
    
    console.log('HospitalDataService: Total active hospitals in database:', totalCountCheck);
    if (countError) {
      console.error('HospitalDataService: Error getting total count:', countError);
    }

    let query = supabase
      .from('hospitals')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('name', { ascending: true });

    // Apply filters
    if (filters.state) {
      console.log('HospitalDataService: Applying state filter:', filters.state);
      query = query.eq('state', filters.state);
    }
    
    if (filters.lga) {
      console.log('HospitalDataService: Applying LGA filter:', filters.lga);
      query = query.eq('lga', filters.lga);
    }
    
    if (filters.specialty && filters.specialty !== 'All') {
      console.log('HospitalDataService: Applying specialty filter:', filters.specialty);
      query = query.contains('specialties', [filters.specialty]);
    }
    
    if (filters.searchQuery) {
      console.log('HospitalDataService: Applying search query:', filters.searchQuery);
      query = query.or(`name.ilike.%${filters.searchQuery}%,address.ilike.%${filters.searchQuery}%`);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    console.log('HospitalDataService: Applying pagination from:', from, 'to:', to);
    query = query.range(from, to);

    const { data, error, count } = await query;

    console.log('HospitalDataService: Query result:', {
      dataLength: data?.length || 0,
      count: count,
      error: error
    });

    if (error) {
      console.error('HospitalDataService: Query error:', error);
      throw new Error(`Failed to fetch hospitals: ${error.message}`);
    }

    const totalCount = count || 0;
    const hasMore = from + limit < totalCount;

    console.log('HospitalDataService: Final result:', {
      hospitals: data?.length || 0,
      totalCount,
      hasMore,
      actualData: data?.slice(0, 3)?.map(h => ({ id: h.id, name: h.name })) // Just first 3 for debugging
    });

    return {
      hospitals: data || [],
      totalCount,
      hasMore
    };
  }

  async getHospitalStates(): Promise<string[]> {
    const { data, error } = await supabase
      .from('hospitals')
      .select('state')
      .eq('is_active', true)
      .not('state', 'is', null);

    if (error) {
      throw new Error(`Failed to fetch states: ${error.message}`);
    }

    const uniqueStates = [...new Set((data || []).map(item => item.state))].filter(Boolean) as string[];
    return uniqueStates.sort();
  }

  async getHospitalLGAs(state?: string): Promise<string[]> {
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
      throw new Error(`Failed to fetch LGAs: ${error.message}`);
    }

    const uniqueLGAs = [...new Set((data || []).map(item => item.lga))].filter(Boolean) as string[];
    return uniqueLGAs.sort();
  }

  async getHospitalSpecialties(): Promise<string[]> {
    const { data, error } = await supabase
      .from('hospitals')
      .select('specialties')
      .eq('is_active', true)
      .not('specialties', 'is', null);

    if (error) {
      throw new Error(`Failed to fetch specialties: ${error.message}`);
    }

    const allSpecialties = (data || [])
      .flatMap(item => item.specialties || [])
      .filter(Boolean);
    
    const uniqueSpecialties = [...new Set(allSpecialties)].sort();
    return uniqueSpecialties;
  }

  async getHospitalById(id: string): Promise<Hospital | null> {
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch hospital: ${error.message}`);
    }

    return data;
  }

  async getHospitalStats(): Promise<{
    totalHospitals: number;
    stateCount: number;
    specialtyCount: number;
  }> {
    const { count: hospitalCount, error: countError } = await supabase
      .from('hospitals')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true);

    if (countError) {
      throw new Error(`Failed to fetch hospital statistics: ${countError.message}`);
    }

    const [statesResult, specialtiesResult] = await Promise.all([
      this.getHospitalStates(),
      this.getHospitalSpecialties()
    ]);

    return {
      totalHospitals: hospitalCount || 0,
      stateCount: statesResult.length,
      specialtyCount: specialtiesResult.length
    };
  }
}

export const hospitalDataService = new HospitalDataService();
