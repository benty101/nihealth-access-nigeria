
-- Phase 1: Critical RLS Policy Fixes (Fixed version)

-- Enable RLS on hospital_staff table if not already enabled
ALTER TABLE public.hospital_staff ENABLE ROW LEVEL SECURITY;

-- 1. Clean up and recreate hospital_staff policies
DROP POLICY IF EXISTS "Super admins can manage hospital staff" ON public.hospital_staff;
DROP POLICY IF EXISTS "Hospital staff can view their assignments" ON public.hospital_staff;

CREATE POLICY "Super admins can manage hospital staff" ON public.hospital_staff
  FOR ALL USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Hospital staff can view their assignments" ON public.hospital_staff
  FOR SELECT USING (user_id = auth.uid());

-- 2. Clean up duplicate RLS policies on profiles table
DROP POLICY IF EXISTS "Hospital admins can view patient profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create a single comprehensive policy for hospital admins and super admins
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    public.has_role(auth.uid(), 'hospital_admin') OR 
    public.has_role(auth.uid(), 'super_admin')
  );

-- 3. Clean up duplicate RLS policies on medical_records table  
DROP POLICY IF EXISTS "Hospital admins can view and manage records" ON public.medical_records;
DROP POLICY IF EXISTS "Admins can view all medical records" ON public.medical_records;
DROP POLICY IF EXISTS "Admins can manage medical records" ON public.medical_records;
DROP POLICY IF EXISTS "Admins can update medical records" ON public.medical_records;

-- Create specific policies for medical records
CREATE POLICY "Admins can view all medical records" ON public.medical_records
  FOR SELECT USING (
    public.has_role(auth.uid(), 'hospital_admin') OR 
    public.has_role(auth.uid(), 'super_admin')
  );

CREATE POLICY "Admins can manage medical records" ON public.medical_records
  FOR INSERT WITH CHECK (
    public.has_role(auth.uid(), 'hospital_admin') OR 
    public.has_role(auth.uid(), 'super_admin')
  );

CREATE POLICY "Admins can update medical records" ON public.medical_records
  FOR UPDATE USING (
    public.has_role(auth.uid(), 'hospital_admin') OR 
    public.has_role(auth.uid(), 'super_admin')
  );

-- 4. Fix dangerous super admin signup - restrict role assignment
DROP POLICY IF EXISTS "Super admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Restrict super admin role creation" ON public.user_roles;

-- Only allow existing super admins to assign super admin roles
CREATE POLICY "Super admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'super_admin'));

-- Prevent unauthorized super admin role creation
CREATE POLICY "Restrict super admin role creation" ON public.user_roles
  FOR INSERT WITH CHECK (
    role != 'super_admin' OR public.has_role(auth.uid(), 'super_admin')
  );
