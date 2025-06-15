
-- First, let's ensure we have proper RLS policies without recursion issues

-- Drop all problematic policies that might cause recursion
DROP POLICY IF EXISTS "Super admins can manage pharmacies" ON public.pharmacies;
DROP POLICY IF EXISTS "Super admins can read all pharmacy data" ON public.pharmacies;
DROP POLICY IF EXISTS "Super admins can manage labs" ON public.labs;  
DROP POLICY IF EXISTS "Super admins can read all lab data" ON public.labs;
DROP POLICY IF EXISTS "Super admins can manage telemedicine providers" ON public.telemedicine_providers;
DROP POLICY IF EXISTS "Super admins can read all telemedicine data" ON public.telemedicine_providers;

-- Create a simple function to check if current user is super admin without recursion
CREATE OR REPLACE FUNCTION public.is_current_user_super_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND email = 'kosyezenekwe@gmail.com'
  );
$$;

-- Enable RLS on all tables
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telemedicine_providers ENABLE ROW LEVEL SECURITY;

-- Create simple, non-recursive policies for pharmacies
CREATE POLICY "Super admin full access to pharmacies" 
  ON public.pharmacies 
  FOR ALL 
  USING (public.is_current_user_super_admin())
  WITH CHECK (public.is_current_user_super_admin());

-- Create simple, non-recursive policies for labs
CREATE POLICY "Super admin full access to labs" 
  ON public.labs 
  FOR ALL 
  USING (public.is_current_user_super_admin())
  WITH CHECK (public.is_current_user_super_admin());

-- Create simple, non-recursive policies for telemedicine providers
CREATE POLICY "Super admin full access to telemedicine" 
  ON public.telemedicine_providers 
  FOR ALL 
  USING (public.is_current_user_super_admin())
  WITH CHECK (public.is_current_user_super_admin());

-- Also ensure hospitals and insurance_plans have proper policies
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admin full access to hospitals" 
  ON public.hospitals 
  FOR ALL 
  USING (public.is_current_user_super_admin())
  WITH CHECK (public.is_current_user_super_admin());

CREATE POLICY "Super admin full access to insurance_plans" 
  ON public.insurance_plans 
  FOR ALL 
  USING (public.is_current_user_super_admin())
  WITH CHECK (public.is_current_user_super_admin());

-- Add some sample data to ensure tables aren't empty
INSERT INTO public.pharmacies (name, address, state, lga, phone, email, license_number, is_active) VALUES
('MedPlus Pharmacy', '123 Lagos Street', 'Lagos', 'Lagos Island', '+234-801-234-5678', 'info@medplus.com', 'PH-001-2024', true),
('HealthCare Pharmacy', '456 Abuja Road', 'FCT', 'Abuja Municipal', '+234-802-345-6789', 'contact@healthcare.com', 'PH-002-2024', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.labs (name, address, state, lga, phone, email, license_number, is_active) VALUES
('Pathcare Laboratory', '789 Victoria Island', 'Lagos', 'Lagos Island', '+234-803-456-7890', 'info@pathcare.com', 'LAB-001-2024', true),
('Medical Diagnostics', '321 Garki District', 'FCT', 'Abuja Municipal', '+234-804-567-8901', 'contact@meddiag.com', 'LAB-002-2024', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.telemedicine_providers (name, specialization, license_number, phone, email, consultation_fee, experience_years, rating, is_active) VALUES
('Dr. Adebayo Ogundimu', 'General Practice', 'MD-001-2024', '+234-805-678-9012', 'dr.ogundimu@telemedicine.com', 5000, 10, 4.8, true),
('Dr. Fatima Hassan', 'Pediatrics', 'MD-002-2024', '+234-806-789-0123', 'dr.hassan@telemedicine.com', 6000, 8, 4.9, true)
ON CONFLICT DO NOTHING;
