-- Critical Security Fixes Migration
-- Create user_role enum type (ignore error if it already exists)
DO $$ 
BEGIN
    CREATE TYPE user_role AS ENUM ('super_admin', 'hospital_admin', 'patient', 'broker');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Fix all database functions to have secure search_path
CREATE OR REPLACE FUNCTION public.generate_kit_order_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  order_num TEXT;
BEGIN
  order_num := 'KIT-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
               LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  
  WHILE EXISTS (SELECT 1 FROM public.home_test_kits WHERE order_number = order_num) LOOP
    order_num := 'KIT-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                 LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  END LOOP;
  
  RETURN order_num;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_kit_order_number()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := public.generate_kit_order_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_sample_id()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  sample_id TEXT;
BEGIN
  sample_id := 'BIO-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
               LPAD(FLOOR(RANDOM() * 10000000)::TEXT, 7, '0');
  
  WHILE EXISTS (SELECT 1 FROM public.biobank_samples WHERE sample_id = sample_id) LOOP
    sample_id := 'BIO-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                 LPAD(FLOOR(RANDOM() * 10000000)::TEXT, 7, '0');
  END LOOP;
  
  RETURN sample_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_sample_id()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.sample_id IS NULL OR NEW.sample_id = '' THEN
    NEW.sample_id := public.generate_sample_id();
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.can_manage_roles(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT public.is_super_admin(_user_id);
$$;

CREATE OR REPLACE FUNCTION public.handle_insurance_purchase()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.policy_number IS NULL THEN
    NEW.policy_number := public.generate_policy_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_consultation_number()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.consultation_number IS NULL OR NEW.consultation_number = '' THEN
    NEW.consultation_number := public.generate_consultation_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
RETURNS user_role
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT CASE 
    WHEN EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = _user_id 
      AND email = 'kosyezenekwe@gmail.com'
    ) THEN 'super_admin'::user_role
    ELSE COALESCE(
      (SELECT role FROM public.user_roles WHERE user_id = _user_id LIMIT 1),
      'patient'::user_role
    )
  END;
$$;

CREATE OR REPLACE FUNCTION public.handle_lab_order_number()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := public.generate_lab_order_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone_number)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'phone', '')
  );
  RETURN new;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_order_number()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := public.generate_order_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'patient');
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_patient_record_number()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.record_number IS NULL OR NEW.record_number = '' THEN
    NEW.record_number := public.generate_patient_record_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role user_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_current_user_super_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND email = 'kosyezenekwe@gmail.com'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_hospital_admin_for(_user_id uuid, _hospital_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.hospital_staff 
    WHERE user_id = _user_id 
    AND hospital_id = _hospital_id 
    AND is_active = true
  ) OR EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = _user_id 
    AND email = 'kosyezenekwe@gmail.com'
  );
$$;

CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT public.get_user_role(auth.uid())::text;
$$;

CREATE OR REPLACE FUNCTION public.generate_patient_record_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  record_num TEXT;
BEGIN
  record_num := 'PAT-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  
  WHILE EXISTS (SELECT 1 FROM public.patient_records WHERE record_number = record_num) LOOP
    record_num := 'PAT-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                  LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  END LOOP;
  
  RETURN record_num;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_policy_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  policy_num TEXT;
BEGIN
  policy_num := 'POL-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                LPAD(FLOOR(RANDOM() * 100000000)::TEXT, 8, '0');
  
  WHILE EXISTS (SELECT 1 FROM public.insurance_purchases WHERE policy_number = policy_num) LOOP
    policy_num := 'POL-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                  LPAD(FLOOR(RANDOM() * 100000000)::TEXT, 8, '0');
  END LOOP;
  
  RETURN policy_num;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_lab_order_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  order_num TEXT;
BEGIN
  order_num := 'LAB-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
               LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  
  WHILE EXISTS (SELECT 1 FROM public.lab_test_orders WHERE order_number = order_num) LOOP
    order_num := 'LAB-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                 LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  END LOOP;
  
  RETURN order_num;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_consultation_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  consult_num TEXT;
BEGIN
  consult_num := 'CON-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                 LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  
  WHILE EXISTS (SELECT 1 FROM public.consultations WHERE consultation_number = consult_num) LOOP
    consult_num := 'CON-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                   LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  END LOOP;
  
  RETURN consult_num;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  order_num TEXT;
BEGIN
  order_num := 'ORD-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
               LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  
  WHILE EXISTS (SELECT 1 FROM public.medication_orders WHERE order_number = order_num) LOOP
    order_num := 'ORD-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                 LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  END LOOP;
  
  RETURN order_num;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_system_stats_for_admin()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  stats json;
BEGIN
  IF NOT public.is_super_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Permission denied: You must be a super admin to access system statistics.';
  END IF;

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

CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = _user_id 
    AND email = 'kosyezenekwe@gmail.com'
  ) OR EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = _user_id 
    AND role = 'super_admin'
  );
$$;

-- Clean up redundant RLS policies on user_roles table
DROP POLICY IF EXISTS "Allow super admin role creation during signup" ON public.user_roles;
DROP POLICY IF EXISTS "Enable delete for users on their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.user_roles;
DROP POLICY IF EXISTS "Enable read access for users to their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Enable update for users on their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can manage all user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can insert their own roles during signup" ON public.user_roles;

-- Create clean, secure RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create basic roles during signup"
ON public.user_roles
FOR INSERT
WITH CHECK (
  auth.uid() = user_id AND 
  role != 'super_admin'
);

CREATE POLICY "Super admins can manage all roles"
ON public.user_roles
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND email = 'kosyezenekwe@gmail.com'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND email = 'kosyezenekwe@gmail.com'
  )
);

-- Create security audit logging table and functions
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  user_id uuid NOT NULL,
  details jsonb DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins can view audit logs"
ON public.security_audit_log
FOR ALL
USING (public.is_super_admin(auth.uid()));

CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type text,
  user_id uuid,
  details jsonb DEFAULT '{}'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    event_type,
    user_id,
    details,
    created_at
  ) VALUES (
    event_type,
    user_id,
    details,
    now()
  );
END;
$$;