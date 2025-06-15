
-- This script will reset and standardize Row Level Security (RLS) policies for all service tables.

-- Drop all existing, potentially conflicting policies for each table.
-- Hospitals
DROP POLICY IF EXISTS "Super Admins can manage hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Anyone can view hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Super admin full access to hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Admins have full access to hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Public can read hospitals" ON public.hospitals;

-- Pharmacies
DROP POLICY IF EXISTS "Super Admins can manage pharmacies" ON public.pharmacies;
DROP POLICY IF EXISTS "Anyone can view pharmacies" ON public.pharmacies;
DROP POLICY IF EXISTS "Super admin full access to pharmacies" ON public.pharmacies;
DROP POLICY IF EXISTS "Super admins can read all pharmacy data" ON public.pharmacies;
DROP POLICY IF EXISTS "Admins have full access to pharmacies" ON public.pharmacies;
DROP POLICY IF EXISTS "Public can read pharmacies" ON public.pharmacies;

-- Labs
DROP POLICY IF EXISTS "Super Admins can manage labs" ON public.labs;
DROP POLICY IF EXISTS "Anyone can view labs" ON public.labs;
DROP POLICY IF EXISTS "Super admin full access to labs" ON public.labs;
DROP POLICY IF EXISTS "Super admins can read all lab data" ON public.labs;
DROP POLICY IF EXISTS "Admins have full access to labs" ON public.labs;
DROP POLICY IF EXISTS "Public can read labs" ON public.labs;

-- Medications
DROP POLICY IF EXISTS "Super Admins can manage medications" ON public.medications;
DROP POLICY IF EXISTS "Anyone can view medications" ON public.medications;
DROP POLICY IF EXISTS "Admins have full access to medications" ON public.medications;
DROP POLICY IF EXISTS "Public can read medications" ON public.medications;

-- Lab Tests
DROP POLICY IF EXISTS "Super Admins can manage lab_tests" ON public.lab_tests;
DROP POLICY IF EXISTS "Anyone can view lab_tests" ON public.lab_tests;
DROP POLICY IF EXISTS "Admins have full access to lab_tests" ON public.lab_tests;
DROP POLICY IF EXISTS "Public can read lab_tests" ON public.lab_tests;

-- Insurance Plans
DROP POLICY IF EXISTS "Super Admins can manage insurance_plans" ON public.insurance_plans;
DROP POLICY IF EXISTS "Anyone can view insurance_plans" ON public.insurance_plans;
DROP POLICY IF EXISTS "Super admin full access to insurance_plans" ON public.insurance_plans;
DROP POLICY IF EXISTS "Admins have full access to insurance_plans" ON public.insurance_plans;
DROP POLICY IF EXISTS "Public can read insurance_plans" ON public.insurance_plans;

-- Telemedicine Providers
DROP POLICY IF EXISTS "Super Admins can manage telemedicine_providers" ON public.telemedicine_providers;
DROP POLICY IF EXISTS "Anyone can view telemedicine_providers" ON public.telemedicine_providers;
DROP POLICY IF EXISTS "Super admin full access to telemedicine" ON public.telemedicine_providers;
DROP POLICY IF EXISTS "Super admins can read all telemedicine data" ON public.telemedicine_providers;
DROP POLICY IF EXISTS "Admins have full access to telemedicine_providers" ON public.telemedicine_providers;
DROP POLICY IF EXISTS "Public can read telemedicine_providers" ON public.telemedicine_providers;


-- Apply new, standardized policies for each table.

-- Hospitals
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins have full access to hospitals" ON public.hospitals FOR ALL USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Public can read hospitals" ON public.hospitals FOR SELECT USING (true);

-- Pharmacies
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins have full access to pharmacies" ON public.pharmacies FOR ALL USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Public can read pharmacies" ON public.pharmacies FOR SELECT USING (true);

-- Labs
ALTER TABLE public.labs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins have full access to labs" ON public.labs FOR ALL USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Public can read labs" ON public.labs FOR SELECT USING (true);

-- Medications
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins have full access to medications" ON public.medications FOR ALL USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Public can read medications" ON public.medications FOR SELECT USING (true);

-- Lab Tests
ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins have full access to lab_tests" ON public.lab_tests FOR ALL USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Public can read lab_tests" ON public.lab_tests FOR SELECT USING (true);

-- Insurance Plans
ALTER TABLE public.insurance_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins have full access to insurance_plans" ON public.insurance_plans FOR ALL USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Public can read insurance_plans" ON public.insurance_plans FOR SELECT USING (true);

-- Telemedicine Providers
ALTER TABLE public.telemedicine_providers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins have full access to telemedicine_providers" ON public.telemedicine_providers FOR ALL USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Public can read telemedicine_providers" ON public.telemedicine_providers FOR SELECT USING (true);
