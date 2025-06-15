
import { useQuery } from '@tanstack/react-query';
import { medicationService } from '@/services/MedicationService';
import { adminService } from '@/services/AdminService';
import type { Medication } from '@/services/AdminService';

interface UseMedicationsOptions {
  pharmacyId?: string | null;
  admin?: boolean;
}

export function useMedications(options: UseMedicationsOptions = {}) {
  const { pharmacyId, admin } = options;

  return useQuery<Medication[], Error>({
    queryKey: [admin ? "medications-admin" : "medications", pharmacyId],
    // Admin gets all, else only active
    queryFn: () => {
      if (admin) {
        return adminService.getAllMedications();
      } else {
        // Use MedicationService, optionally filter by pharmacyId
        return medicationService
          .getActiveMedications()
          .then((meds) => pharmacyId ? meds.filter(m => m.pharmacy_id === pharmacyId) : meds);
      }
    },
  });
}
