-- Part 3: Fix remaining RLS policies (without recreating user_role enum)

-- Fix any remaining tables that might need policy updates

-- Check if we need to fix any other tables that might have been missed
-- Let's also fix any policies for tables that might exist but weren't covered

-- Fix insurance_purchases policies (if exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'insurance_purchases' AND table_schema = 'public') THEN
        DROP POLICY IF EXISTS "Users can create their own insurance purchases" ON public.insurance_purchases;
        DROP POLICY IF EXISTS "Users can update their own insurance purchases" ON public.insurance_purchases;
        DROP POLICY IF EXISTS "Users can view their own insurance purchases" ON public.insurance_purchases;

        CREATE POLICY "Authenticated users can create their own insurance purchases" 
        ON public.insurance_purchases FOR INSERT 
        TO authenticated 
        WITH CHECK (auth.uid() = user_id);

        CREATE POLICY "Authenticated users can update their own insurance purchases" 
        ON public.insurance_purchases FOR UPDATE 
        TO authenticated 
        USING (auth.uid() = user_id);

        CREATE POLICY "Authenticated users can view their own insurance purchases" 
        ON public.insurance_purchases FOR SELECT 
        TO authenticated 
        USING (auth.uid() = user_id);
    END IF;
END
$$;

-- Fix medical_records policies (if exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'medical_records' AND table_schema = 'public') THEN
        DROP POLICY IF EXISTS "Admins can update medical records" ON public.medical_records;
        DROP POLICY IF EXISTS "Admins can view all medical records" ON public.medical_records;
        DROP POLICY IF EXISTS "Patients can update their own records" ON public.medical_records;
        DROP POLICY IF EXISTS "Patients can view their own records" ON public.medical_records;
        DROP POLICY IF EXISTS "Users can delete their own medical records" ON public.medical_records;
        DROP POLICY IF EXISTS "Users can update their own medical records" ON public.medical_records;
        DROP POLICY IF EXISTS "Users can view their own medical records" ON public.medical_records;

        CREATE POLICY "Authenticated users can view their own medical records" 
        ON public.medical_records FOR SELECT 
        TO authenticated 
        USING (auth.uid() = user_id);

        CREATE POLICY "Authenticated users can update their own medical records" 
        ON public.medical_records FOR UPDATE 
        TO authenticated 
        USING (auth.uid() = user_id);

        CREATE POLICY "Authenticated users can delete their own medical records" 
        ON public.medical_records FOR DELETE 
        TO authenticated 
        USING (auth.uid() = user_id);

        CREATE POLICY "Authenticated admins can view all medical records" 
        ON public.medical_records FOR SELECT 
        TO authenticated 
        USING (is_super_admin(auth.uid()));

        CREATE POLICY "Authenticated admins can update medical records" 
        ON public.medical_records FOR UPDATE 
        TO authenticated 
        USING (is_super_admin(auth.uid()));
    END IF;
END
$$;

-- Fix notifications policies (if exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'notifications' AND table_schema = 'public') THEN
        DROP POLICY IF EXISTS "Admins can manage all notifications" ON public.notifications;
        DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;
        DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;

        CREATE POLICY "Authenticated users can view their own notifications" 
        ON public.notifications FOR SELECT 
        TO authenticated 
        USING (auth.uid() = user_id);

        CREATE POLICY "Authenticated users can update their own notifications" 
        ON public.notifications FOR UPDATE 
        TO authenticated 
        USING (auth.uid() = user_id);

        CREATE POLICY "Authenticated admins can manage all notifications" 
        ON public.notifications FOR ALL 
        TO authenticated 
        USING (is_super_admin(auth.uid()));
    END IF;
END
$$;

-- Fix patient_records policies (if exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'patient_records' AND table_schema = 'public') THEN
        DROP POLICY IF EXISTS "Hospital staff can manage patient records" ON public.patient_records;
        DROP POLICY IF EXISTS "Patients can view their own records" ON public.patient_records;

        CREATE POLICY "Authenticated patients can view their own records" 
        ON public.patient_records FOR SELECT 
        TO authenticated 
        USING (auth.uid() = user_id);

        CREATE POLICY "Authenticated hospital staff can manage patient records" 
        ON public.patient_records FOR ALL 
        TO authenticated 
        USING (is_super_admin(auth.uid()) OR (EXISTS ( SELECT 1 FROM hospital_staff WHERE ((hospital_staff.user_id = auth.uid()) AND (hospital_staff.is_active = true)))));
    END IF;
END
$$;

-- Fix pharmacies policies (if exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'pharmacies' AND table_schema = 'public') THEN
        DROP POLICY IF EXISTS "Admins have full access to pharmacies" ON public.pharmacies;
        DROP POLICY IF EXISTS "Authenticated users can view active pharmacies" ON public.pharmacies;

        CREATE POLICY "Authenticated users can view active pharmacies" 
        ON public.pharmacies FOR SELECT 
        TO authenticated 
        USING (is_active = true);

        CREATE POLICY "Authenticated super admins have full access to pharmacies" 
        ON public.pharmacies FOR ALL 
        TO authenticated 
        USING (is_super_admin(auth.uid()))
        WITH CHECK (is_super_admin(auth.uid()));
    END IF;
END
$$;

-- Fix hospital_staff policies (if exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'hospital_staff' AND table_schema = 'public') THEN
        DROP POLICY IF EXISTS "Hospital staff can view their assignments" ON public.hospital_staff;
        DROP POLICY IF EXISTS "Super admins can manage hospital staff" ON public.hospital_staff;

        CREATE POLICY "Authenticated hospital staff can view their assignments" 
        ON public.hospital_staff FOR SELECT 
        TO authenticated 
        USING (auth.uid() = user_id);

        CREATE POLICY "Authenticated super admins can manage hospital staff" 
        ON public.hospital_staff FOR ALL 
        TO authenticated 
        USING (is_super_admin(auth.uid()));
    END IF;
END
$$;