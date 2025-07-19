-- Comprehensive security fixes for Supabase linter warnings

-- 1. Fix search_path for all functions (25 functions need this fix)
-- These functions need SET search_path = '' for security

ALTER FUNCTION public.generate_kit_order_number() SET search_path = '';
ALTER FUNCTION public.handle_kit_order_number() SET search_path = '';
ALTER FUNCTION public.generate_sample_id() SET search_path = '';
ALTER FUNCTION public.handle_sample_id() SET search_path = '';
ALTER FUNCTION public.can_manage_roles(uuid) SET search_path = '';
ALTER FUNCTION public.handle_insurance_purchase() SET search_path = '';
ALTER FUNCTION public.handle_consultation_number() SET search_path = '';
ALTER FUNCTION public.get_user_role(uuid) SET search_path = '';
ALTER FUNCTION public.handle_lab_order_number() SET search_path = '';
ALTER FUNCTION public.handle_new_user() SET search_path = '';
ALTER FUNCTION public.handle_order_number() SET search_path = '';
ALTER FUNCTION public.handle_new_user_role() SET search_path = '';
ALTER FUNCTION public.handle_updated_at() SET search_path = '';
ALTER FUNCTION public.handle_patient_record_number() SET search_path = '';
ALTER FUNCTION public.has_role(uuid, user_role) SET search_path = '';
ALTER FUNCTION public.is_current_user_super_admin() SET search_path = '';
ALTER FUNCTION public.is_hospital_admin_for(uuid, uuid) SET search_path = '';
ALTER FUNCTION public.get_current_user_role() SET search_path = '';
ALTER FUNCTION public.generate_patient_record_number() SET search_path = '';
ALTER FUNCTION public.generate_policy_number() SET search_path = '';
ALTER FUNCTION public.generate_lab_order_number() SET search_path = '';
ALTER FUNCTION public.generate_consultation_number() SET search_path = '';
ALTER FUNCTION public.generate_order_number() SET search_path = '';
ALTER FUNCTION public.get_system_stats_for_admin() SET search_path = '';
ALTER FUNCTION public.is_super_admin(uuid) SET search_path = '';

-- 2. Fix policies that allow anonymous access by restricting to authenticated users only
-- Remove public access policies and ensure all policies require authentication

-- First drop all problematic public/anonymous access policies
DROP POLICY IF EXISTS "Public can read hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Public can view active hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Everyone can view active hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Public can read insurance_plans" ON public.insurance_plans;
DROP POLICY IF EXISTS "Everyone can view active insurance plans" ON public.insurance_plans;
DROP POLICY IF EXISTS "Public can read labs" ON public.labs;
DROP POLICY IF EXISTS "Anyone can view active labs" ON public.labs;
DROP POLICY IF EXISTS "Public can read lab_tests" ON public.lab_tests;
DROP POLICY IF EXISTS "Public can read medications" ON public.medications;
DROP POLICY IF EXISTS "Public can view active medications" ON public.medications;
DROP POLICY IF EXISTS "Public can read pharmacies" ON public.pharmacies;
DROP POLICY IF EXISTS "Anyone can view active pharmacies" ON public.pharmacies;
DROP POLICY IF EXISTS "Public can read telemedicine_providers" ON public.telemedicine_providers;
DROP POLICY IF EXISTS "Anyone can view active telemedicine providers" ON public.telemedicine_providers;
DROP POLICY IF EXISTS "Everyone can view doctor availability" ON public.doctor_availability;
DROP POLICY IF EXISTS "Everyone can view active hospital doctors" ON public.hospital_doctors;

-- Create authenticated-only policies for essential public data
CREATE POLICY "Authenticated users can view active hospitals"
ON public.hospitals FOR SELECT
TO authenticated
USING (is_active = true);

CREATE POLICY "Authenticated users can view active insurance plans"
ON public.insurance_plans FOR SELECT
TO authenticated  
USING (is_active = true);

CREATE POLICY "Authenticated users can view active labs"
ON public.labs FOR SELECT
TO authenticated
USING (is_active = true);

CREATE POLICY "Authenticated users can view active lab tests"
ON public.lab_tests FOR SELECT
TO authenticated
USING (is_active = true);

CREATE POLICY "Authenticated users can view active medications"
ON public.medications FOR SELECT
TO authenticated
USING (is_active = true);

CREATE POLICY "Authenticated users can view active pharmacies"
ON public.pharmacies FOR SELECT
TO authenticated
USING (is_active = true);

CREATE POLICY "Authenticated users can view active telemedicine providers"
ON public.telemedicine_providers FOR SELECT
TO authenticated
USING (is_active = true);

CREATE POLICY "Authenticated users can view doctor availability"
ON public.doctor_availability FOR SELECT
TO authenticated
USING (is_available = true);

CREATE POLICY "Authenticated users can view active hospital doctors"
ON public.hospital_doctors FOR SELECT
TO authenticated
USING (is_active = true);

-- 3. Create security audit log for tracking security events
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  user_id uuid,
  event_data jsonb DEFAULT '{}',
  ip_address text,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on security audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only super admins can view audit logs
CREATE POLICY "Super admins can view audit logs"
ON public.security_audit_log FOR SELECT
TO authenticated
USING (is_super_admin(auth.uid()));

-- Create function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type text,
  user_id uuid DEFAULT auth.uid(),
  details jsonb DEFAULT '{}'
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.security_audit_log (event_type, user_id, event_data)
  VALUES (event_type, user_id, details);
END;
$$;