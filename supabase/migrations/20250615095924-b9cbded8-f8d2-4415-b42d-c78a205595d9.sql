
CREATE OR REPLACE FUNCTION public.get_system_stats_for_admin()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stats json;
BEGIN
  -- Security Check: Only super admins can execute this function
  IF NOT public.is_super_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Permission denied: You must be a super admin to access system statistics.';
  END IF;

  -- Aggregate statistics from all relevant tables
  SELECT json_build_object(
    'totalHospitals', (SELECT COUNT(*) FROM public.hospitals),
    'activeHospitals', (SELECT COUNT(*) FROM public.hospitals WHERE is_active = true),
    'totalPharmacies', (SELECT COUNT(*) FROM public.pharmacies),
    'activePharmacies', (SELECT COUNT(*) FROM public.pharmacies WHERE is_active = true),
    'totalLabs', (SELECT COUNT(*) FROM public.labs),
    'activeLabs', (SELECT COUNT(*) FROM public.labs WHERE is_active = true),
    'totalInsurancePlans', (SELECT COUNT(*) FROM public.insurance_plans),
    'activeInsurancePlans', (SELECT COUNT(*) FROM public.insurance_plans WHERE is_active = true),
    'totalTelemedicineProviders', (SELECT COUNT(*) FROM public.telemedicine_providers),
    'activeTelemedicineProviders', (SELECT COUNT(*) FROM public.telemedicine_providers WHERE is_active = true),
    'totalMedications', (SELECT COUNT(*) FROM public.medications),
    'activeMedications', (SELECT COUNT(*) FROM public.medications WHERE is_active = true),
    'totalLabTests', (SELECT COUNT(*) FROM public.lab_tests),
    'activeLabTests', (SELECT COUNT(*) FROM public.lab_tests WHERE is_active = true)
  ) INTO stats;

  RETURN stats;
END;
$$;
