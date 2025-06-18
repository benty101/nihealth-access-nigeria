
-- Fix the infinite recursion issue in user_roles RLS policies
-- The current policies are causing recursion when trying to check user roles

-- Drop the problematic existing policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Restrict super admin role creation" ON public.user_roles;

-- Create simple, non-recursive policies that use auth.uid() directly
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Allow super admins to view all roles using email check to avoid recursion
CREATE POLICY "Super admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND email = 'kosyezenekwe@gmail.com'
  )
);

-- Allow super admins to manage all roles
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

-- Allow users to insert their own role during signup (but not super_admin)
CREATE POLICY "Users can create their basic roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id AND 
  (role != 'super_admin' OR EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = auth.uid() 
    AND email = 'kosyezenekwe@gmail.com'
  ))
);

-- Update the get_user_role function to be more robust and avoid recursion
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
RETURNS user_role
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  -- Check super admin first by email to avoid RLS recursion
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

-- Create a function to safely check if user is hospital admin for a specific hospital
CREATE OR REPLACE FUNCTION public.is_hospital_admin_for(_user_id uuid, _hospital_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
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
