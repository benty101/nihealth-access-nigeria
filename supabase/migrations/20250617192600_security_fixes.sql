
-- Critical Security Fixes - RLS Policy Cleanup and Standardization
-- This migration addresses the security vulnerabilities identified in the security review

-- 1. CLEAN UP CONFLICTING AND OVERLY PERMISSIVE POLICIES

-- Drop all existing conflicting policies on hospitals table
DROP POLICY IF EXISTS "Super Admins can manage hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Anyone can view hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Super admin full access to hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Admins have full access to hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Public can read hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Public can view active hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Super admins can manage all hospitals" ON public.hospitals;

-- Drop all existing conflicting policies on pharmacies table
DROP POLICY IF EXISTS "Super Admins can manage pharmacies" ON public.pharmacies;
DROP POLICY IF EXISTS "Anyone can view pharmacies" ON public.pharmacies;
DROP POLICY IF EXISTS "Super admin full access to pharmacies" ON public.pharmacies;
DROP POLICY IF EXISTS "Admins have full access to pharmacies" ON public.pharmacies;
DROP POLICY IF EXISTS "Public can read pharmacies" ON public.pharmacies;

-- Drop all existing conflicting policies on labs table
DROP POLICY IF EXISTS "Super Admins can manage labs" ON public.labs;
DROP POLICY IF EXISTS "Anyone can view labs" ON public.labs;
DROP POLICY IF EXISTS "Super admin full access to labs" ON public.labs;
DROP POLICY IF EXISTS "Admins have full access to labs" ON public.labs;
DROP POLICY IF EXISTS "Public can read labs" ON public.labs;

-- Drop all existing conflicting policies on medications table
DROP POLICY IF EXISTS "Super Admins can manage medications" ON public.medications;
DROP POLICY IF EXISTS "Anyone can view medications" ON public.medications;
DROP POLICY IF EXISTS "Admins have full access to medications" ON public.medications;
DROP POLICY IF EXISTS "Public can read medications" ON public.medications;
DROP POLICY IF EXISTS "Super admin full access to medications" ON public.medications;
DROP POLICY IF EXISTS "Public can view active medications" ON public.medications;
DROP POLICY IF EXISTS "Super admins can manage all medications" ON public.medications;

-- Drop all existing conflicting policies on lab_tests table
DROP POLICY IF EXISTS "Super Admins can manage lab_tests" ON public.lab_tests;
DROP POLICY IF EXISTS "Anyone can view lab_tests" ON public.lab_tests;
DROP POLICY IF EXISTS "Admins have full access to lab_tests" ON public.lab_tests;
DROP POLICY IF EXISTS "Public can read lab_tests" ON public.lab_tests;
DROP POLICY IF EXISTS "Super admin full access to lab_tests" ON public.lab_tests;

-- Drop all existing conflicting policies on insurance_plans table
DROP POLICY IF EXISTS "Super Admins can manage insurance_plans" ON public.insurance_plans;
DROP POLICY IF EXISTS "Anyone can view insurance_plans" ON public.insurance_plans;
DROP POLICY IF EXISTS "Super admin full access to insurance_plans" ON public.insurance_plans;
DROP POLICY IF EXISTS "Admins have full access to insurance_plans" ON public.insurance_plans;
DROP POLICY IF EXISTS "Public can read insurance_plans" ON public.insurance_plans;

-- Drop all existing conflicting policies on telemedicine_providers table
DROP POLICY IF EXISTS "Super Admins can manage telemedicine_providers" ON public.telemedicine_providers;
DROP POLICY IF EXISTS "Anyone can view telemedicine_providers" ON public.telemedicine_providers;
DROP POLICY IF EXISTS "Super admin full access to telemedicine" ON public.telemedicine_providers;
DROP POLICY IF EXISTS "Admins have full access to telemedicine_providers" ON public.telemedicine_providers;
DROP POLICY IF EXISTS "Public can read telemedicine_providers" ON public.telemedicine_providers;

-- 2. CREATE SECURE, NON-RECURSIVE HELPER FUNCTION
CREATE OR REPLACE FUNCTION public.check_user_role(user_id uuid, required_role text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = $1 AND ur.role = $2
  );
$$;

-- 3. IMPLEMENT SECURE RLS POLICIES FOR ALL TABLES

-- Hospitals: Limited public read access for search, admin management
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view basic hospital info"
ON public.hospitals
FOR SELECT
USING (is_active = true);

CREATE POLICY "Super admins can manage hospitals"
ON public.hospitals
FOR ALL
USING (public.check_user_role(auth.uid(), 'super_admin'))
WITH CHECK (public.check_user_role(auth.uid(), 'super_admin'));

-- Pharmacies: Limited public read access for search, admin management
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view basic pharmacy info"
ON public.pharmacies
FOR SELECT
USING (is_active = true);

CREATE POLICY "Super admins can manage pharmacies"
ON public.pharmacies
FOR ALL
USING (public.check_user_role(auth.uid(), 'super_admin'))
WITH CHECK (public.check_user_role(auth.uid(), 'super_admin'));

-- Labs: Limited public read access for search, admin management
ALTER TABLE public.labs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view basic lab info"
ON public.labs
FOR SELECT
USING (is_active = true);

CREATE POLICY "Super admins can manage labs"
ON public.labs
FOR ALL
USING (public.check_user_role(auth.uid(), 'super_admin'))
WITH CHECK (public.check_user_role(auth.uid(), 'super_admin'));

-- Medications: Limited public read access for pharmacy listings
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view available medications"
ON public.medications
FOR SELECT
USING (is_active = true AND in_stock = true);

CREATE POLICY "Super admins can manage medications"
ON public.medications
FOR ALL
USING (public.check_user_role(auth.uid(), 'super_admin'))
WITH CHECK (public.check_user_role(auth.uid(), 'super_admin'));

-- Lab Tests: Limited public read access for lab services
ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view available lab tests"
ON public.lab_tests
FOR SELECT
USING (is_active = true);

CREATE POLICY "Super admins can manage lab tests"
ON public.lab_tests
FOR ALL
USING (public.check_user_role(auth.uid(), 'super_admin'))
WITH CHECK (public.check_user_role(auth.uid(), 'super_admin'));

-- Insurance Plans: Limited public read access for comparison
ALTER TABLE public.insurance_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active insurance plans"
ON public.insurance_plans
FOR SELECT
USING (is_active = true);

CREATE POLICY "Super admins can manage insurance plans"
ON public.insurance_plans
FOR ALL
USING (public.check_user_role(auth.uid(), 'super_admin'))
WITH CHECK (public.check_user_role(auth.uid(), 'super_admin'));

-- Telemedicine Providers: Limited public read access for booking
ALTER TABLE public.telemedicine_providers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view available telemedicine providers"
ON public.telemedicine_providers
FOR SELECT
USING (is_active = true);

CREATE POLICY "Super admins can manage telemedicine providers"
ON public.telemedicine_providers
FOR ALL
USING (public.check_user_role(auth.uid(), 'super_admin'))
WITH CHECK (public.check_user_role(auth.uid(), 'super_admin'));

-- 4. SECURE PROFILES TABLE
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Hospital admins can view patient profiles" ON public.profiles;

-- Users can only access their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Admins can view all profiles (for patient management)
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (
  public.check_user_role(auth.uid(), 'super_admin') OR 
  public.check_user_role(auth.uid(), 'hospital_admin')
);

-- 5. SECURE MEDICAL RECORDS TABLE
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;

-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Users can view their own medical records" ON public.medical_records;
DROP POLICY IF EXISTS "Admins can view all medical records" ON public.medical_records;
DROP POLICY IF EXISTS "Admins can manage medical records" ON public.medical_records;
DROP POLICY IF EXISTS "Admins can update medical records" ON public.medical_records;

-- Users can only access their own medical records
CREATE POLICY "Users can view own medical records"
ON public.medical_records
FOR SELECT
USING (auth.uid() = user_id);

-- Healthcare providers can view and manage records
CREATE POLICY "Healthcare providers can manage medical records"
ON public.medical_records
FOR ALL
USING (
  public.check_user_role(auth.uid(), 'super_admin') OR 
  public.check_user_role(auth.uid(), 'hospital_admin')
)
WITH CHECK (
  public.check_user_role(auth.uid(), 'super_admin') OR 
  public.check_user_role(auth.uid(), 'hospital_admin')
);

-- 6. SECURE USER ROLES TABLE
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Super admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Restrict super admin role creation" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can manage all roles" ON public.user_roles;

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Only super admins can manage roles
CREATE POLICY "Super admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.check_user_role(auth.uid(), 'super_admin'))
WITH CHECK (public.check_user_role(auth.uid(), 'super_admin'));

-- 7. SECURE HOSPITAL STAFF TABLE
ALTER TABLE public.hospital_staff ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Super admins can manage hospital staff" ON public.hospital_staff;
DROP POLICY IF EXISTS "Hospital staff can view their assignments" ON public.hospital_staff;

-- Staff can view their own assignments
CREATE POLICY "Staff can view own assignments"
ON public.hospital_staff
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can manage hospital staff
CREATE POLICY "Admins can manage hospital staff"
ON public.hospital_staff
FOR ALL
USING (
  public.check_user_role(auth.uid(), 'super_admin') OR 
  public.check_user_role(auth.uid(), 'hospital_admin')
)
WITH CHECK (
  public.check_user_role(auth.uid(), 'super_admin') OR 
  public.check_user_role(auth.uid(), 'hospital_admin')
);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Update the system stats function to use the new secure approach
CREATE OR REPLACE FUNCTION public.get_system_stats_for_admin()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stats json;
BEGIN
  -- Security Check: Only super admins can execute this function
  IF NOT public.check_user_role(auth.uid(), 'super_admin') THEN
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
