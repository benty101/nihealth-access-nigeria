
import { useQuery } from '@tanstack/react-query';
import { pharmacyService } from '@/services/PharmacyService';
import type { Pharmacy } from '@/services/AdminService';

interface UsePharmaciesOptions {
  admin?: boolean; // If set, fetch all (admin); else only active
}

export function usePharmacies(options: UsePharmaciesOptions = {}) {
  const { admin } = options;
  return useQuery<Pharmacy[], Error>({
    queryKey: [admin ? "pharmacies-admin" : "pharmacies"],
    queryFn: () =>
      admin
        ? pharmacyService.getAllPharmacies()
        : pharmacyService.getActivePharmacies(),
  });
}
