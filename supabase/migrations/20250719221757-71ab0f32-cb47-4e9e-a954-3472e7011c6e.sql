-- CRITICAL SECURITY FIX: Remove anonymous access from all RLS policies
-- This migration updates all policies to require authentication

-- 1. Drop all existing permissive policies that allow anonymous access
-- and recreate them with proper authentication requirements

-- Fix biobank_samples policies
DROP POLICY IF EXISTS "Admins can manage all biobank samples" ON public.biobank_samples;
DROP POLICY IF EXISTS "Users can manage their own biobank samples" ON public.biobank_samples;

CREATE POLICY "Authenticated admins can manage all biobank samples" 
ON public.biobank_samples FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()));

CREATE POLICY "Authenticated users can manage their own biobank samples" 
ON public.biobank_samples FOR ALL 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Fix consultations policies
DROP POLICY IF EXISTS "Doctors and hospital staff can update consultations" ON public.consultations;
DROP POLICY IF EXISTS "Doctors can view their consultations" ON public.consultations;
DROP POLICY IF EXISTS "Hospital staff can view hospital consultations" ON public.consultations;
DROP POLICY IF EXISTS "Patients can create consultations" ON public.consultations;
DROP POLICY IF EXISTS "Patients can view their own consultations" ON public.consultations;

CREATE POLICY "Authenticated doctors and hospital staff can update consultations" 
ON public.consultations FOR UPDATE 
TO authenticated 
USING (is_super_admin(auth.uid()) OR (EXISTS ( SELECT 1 FROM hospital_staff WHERE ((hospital_staff.user_id = auth.uid()) AND (hospital_staff.hospital_id = consultations.hospital_id) AND (hospital_staff.is_active = true)))));

CREATE POLICY "Authenticated patients can create consultations" 
ON public.consultations FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Authenticated patients can view their own consultations" 
ON public.consultations FOR SELECT 
TO authenticated 
USING (auth.uid() = patient_id);

CREATE POLICY "Authenticated hospital staff can view hospital consultations" 
ON public.consultations FOR SELECT 
TO authenticated 
USING (is_super_admin(auth.uid()) OR (EXISTS ( SELECT 1 FROM hospital_staff WHERE ((hospital_staff.user_id = auth.uid()) AND (hospital_staff.hospital_id = consultations.hospital_id) AND (hospital_staff.is_active = true)))));

-- Fix doctor_availability policies
DROP POLICY IF EXISTS "Authenticated users can view doctor availability" ON public.doctor_availability;
DROP POLICY IF EXISTS "Hospital staff can manage doctor availability" ON public.doctor_availability;

CREATE POLICY "Authenticated users can view doctor availability" 
ON public.doctor_availability FOR SELECT 
TO authenticated 
USING (is_available = true);

CREATE POLICY "Authenticated hospital staff can manage doctor availability" 
ON public.doctor_availability FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()) OR (EXISTS ( SELECT 1 FROM hospital_staff WHERE ((hospital_staff.user_id = auth.uid()) AND (hospital_staff.hospital_id = doctor_availability.hospital_id) AND (hospital_staff.is_active = true)))));

-- Fix family_connections policies
DROP POLICY IF EXISTS "Users can manage their own family connections" ON public.family_connections;

CREATE POLICY "Authenticated users can manage their own family connections" 
ON public.family_connections FOR ALL 
TO authenticated 
USING ((auth.uid() = user_id) OR (auth.uid() = connected_user_id))
WITH CHECK ((auth.uid() = user_id) OR (auth.uid() = connected_user_id));

-- Fix family_health_records policies
DROP POLICY IF EXISTS "Users can manage their own family records" ON public.family_health_records;

CREATE POLICY "Authenticated users can manage their own family records" 
ON public.family_health_records FOR ALL 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Fix family_health_shares policies
DROP POLICY IF EXISTS "Users can manage their own health shares" ON public.family_health_shares;

CREATE POLICY "Authenticated users can manage their own health shares" 
ON public.family_health_shares FOR ALL 
TO authenticated 
USING ((auth.uid() = user_id) OR (auth.uid() = shared_with_user_id))
WITH CHECK ((auth.uid() = user_id) OR (auth.uid() = shared_with_user_id));

-- Fix health_timeline_events policies
DROP POLICY IF EXISTS "Admins can view all timeline events" ON public.health_timeline_events;
DROP POLICY IF EXISTS "Users can manage their own timeline events" ON public.health_timeline_events;

CREATE POLICY "Authenticated admins can view all timeline events" 
ON public.health_timeline_events FOR SELECT 
TO authenticated 
USING (is_super_admin(auth.uid()));

CREATE POLICY "Authenticated users can manage their own timeline events" 
ON public.health_timeline_events FOR ALL 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Fix home_test_kits policies
DROP POLICY IF EXISTS "Admins can manage all test kits" ON public.home_test_kits;
DROP POLICY IF EXISTS "Users can manage their own test kits" ON public.home_test_kits;

CREATE POLICY "Authenticated admins can manage all test kits" 
ON public.home_test_kits FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()));

CREATE POLICY "Authenticated users can manage their own test kits" 
ON public.home_test_kits FOR ALL 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Fix hospital_doctors policies
DROP POLICY IF EXISTS "Authenticated users can view active hospital doctors" ON public.hospital_doctors;
DROP POLICY IF EXISTS "Hospital admins can manage their doctors" ON public.hospital_doctors;

CREATE POLICY "Authenticated users can view active hospital doctors" 
ON public.hospital_doctors FOR SELECT 
TO authenticated 
USING (is_active = true);

CREATE POLICY "Authenticated hospital admins can manage their doctors" 
ON public.hospital_doctors FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()) OR (EXISTS ( SELECT 1 FROM hospital_staff WHERE ((hospital_staff.user_id = auth.uid()) AND (hospital_staff.hospital_id = hospital_doctors.hospital_id) AND (hospital_staff.is_active = true)))));

-- Fix hospitals policies
DROP POLICY IF EXISTS "Admins have full access to hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Authenticated users can view active hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Hospital admins can view their hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Super admins can manage all hospitals" ON public.hospitals;
DROP POLICY IF EXISTS "Super admins can manage hospitals" ON public.hospitals;

CREATE POLICY "Authenticated users can view active hospitals" 
ON public.hospitals FOR SELECT 
TO authenticated 
USING (is_active = true);

CREATE POLICY "Authenticated super admins can manage all hospitals" 
ON public.hospitals FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()))
WITH CHECK (is_super_admin(auth.uid()));

CREATE POLICY "Authenticated hospital admins can view their hospitals" 
ON public.hospitals FOR SELECT 
TO authenticated 
USING (EXISTS ( SELECT 1 FROM hospital_staff WHERE ((hospital_staff.user_id = auth.uid()) AND (hospital_staff.hospital_id = hospitals.id) AND (hospital_staff.is_active = true))));

-- Fix insurance_api_configs policies
DROP POLICY IF EXISTS "Super admins can manage API configs" ON public.insurance_api_configs;

CREATE POLICY "Authenticated super admins can manage API configs" 
ON public.insurance_api_configs FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()));

-- Fix insurance_claims policies
DROP POLICY IF EXISTS "Users can create their own insurance claims" ON public.insurance_claims;
DROP POLICY IF EXISTS "Users can update their own insurance claims" ON public.insurance_claims;
DROP POLICY IF EXISTS "Users can view their own insurance claims" ON public.insurance_claims;

CREATE POLICY "Authenticated users can create their own insurance claims" 
ON public.insurance_claims FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own insurance claims" 
ON public.insurance_claims FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can view their own insurance claims" 
ON public.insurance_claims FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Fix insurance_plans policies
DROP POLICY IF EXISTS "Admins have full access to insurance_plans" ON public.insurance_plans;
DROP POLICY IF EXISTS "Authenticated users can view active insurance plans" ON public.insurance_plans;
DROP POLICY IF EXISTS "Super admins can manage insurance plans" ON public.insurance_plans;

CREATE POLICY "Authenticated users can view active insurance plans" 
ON public.insurance_plans FOR SELECT 
TO authenticated 
USING (is_active = true);

CREATE POLICY "Authenticated super admins can manage insurance plans" 
ON public.insurance_plans FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()))
WITH CHECK (is_super_admin(auth.uid()));

-- Fix lab_test_order_items policies
DROP POLICY IF EXISTS "Admins can delete lab order items" ON public.lab_test_order_items;
DROP POLICY IF EXISTS "Admins can update lab order items" ON public.lab_test_order_items;
DROP POLICY IF EXISTS "Users can create lab order items" ON public.lab_test_order_items;
DROP POLICY IF EXISTS "Users can view their lab order items" ON public.lab_test_order_items;

CREATE POLICY "Authenticated users can create lab order items" 
ON public.lab_test_order_items FOR INSERT 
TO authenticated 
WITH CHECK (EXISTS ( SELECT 1 FROM lab_test_orders WHERE ((lab_test_orders.id = lab_test_order_items.order_id) AND (lab_test_orders.user_id = auth.uid()))));

CREATE POLICY "Authenticated users can view their lab order items" 
ON public.lab_test_order_items FOR SELECT 
TO authenticated 
USING (EXISTS ( SELECT 1 FROM lab_test_orders WHERE ((lab_test_orders.id = lab_test_order_items.order_id) AND ((lab_test_orders.user_id = auth.uid()) OR is_super_admin(auth.uid())))));

CREATE POLICY "Authenticated admins can update lab order items" 
ON public.lab_test_order_items FOR UPDATE 
TO authenticated 
USING (is_super_admin(auth.uid()));

CREATE POLICY "Authenticated admins can delete lab order items" 
ON public.lab_test_order_items FOR DELETE 
TO authenticated 
USING (is_super_admin(auth.uid()));

-- Continue with remaining tables in next part...