-- Fix critical security issues
-- 1. Create the missing user_role enum type
CREATE TYPE public.user_role AS ENUM ('super_admin', 'hospital_admin', 'patient', 'broker');

-- 2. Create a more secure super admin check function that doesn't rely on hardcoded emails
CREATE OR REPLACE FUNCTION public.is_super_admin_secure(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
  -- Check if user has super_admin role in user_roles table
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = _user_id 
    AND role = 'super_admin'
  );
$$;

-- 3. Update the existing is_super_admin function to use the secure version
CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
  -- First check the secure role-based method
  SELECT CASE 
    WHEN public.is_super_admin_secure(_user_id) THEN true
    -- Fallback to email check for existing super admin (temporary)
    WHEN EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = _user_id 
      AND email = 'kosyezenekwe@gmail.com'
    ) THEN true
    ELSE false
  END;
$$;

-- 4. Update get_user_role function to handle the enum properly
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
RETURNS user_role
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
  -- Check super admin first to avoid RLS recursion
  SELECT CASE 
    WHEN public.is_super_admin(_user_id) THEN 'super_admin'::user_role
    ELSE COALESCE(
      (SELECT role FROM public.user_roles WHERE user_id = _user_id LIMIT 1),
      'patient'::user_role
    )
  END;
$$;

-- 5. Create secure role management function for super admins
CREATE OR REPLACE FUNCTION public.assign_super_admin_role(_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Only allow if called by existing super admin or during initial setup
  IF NOT (public.is_super_admin(auth.uid()) OR 
          (SELECT email FROM auth.users WHERE id = _user_id) = 'kosyezenekwe@gmail.com') THEN
    RAISE EXCEPTION 'Unauthorized: Only super admins can assign super admin roles';
  END IF;
  
  -- Insert or update the role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, 'super_admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  -- Log the security event
  PERFORM public.log_security_event(
    'super_admin_role_assigned',
    auth.uid(),
    jsonb_build_object('target_user_id', _user_id)
  );
  
  RETURN true;
END;
$$;

-- 6. Enhanced security audit logging
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type text, 
  user_id uuid DEFAULT auth.uid(), 
  details jsonb DEFAULT '{}'::jsonb,
  ip_addr text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    event_type, 
    user_id, 
    event_data,
    ip_address,
    user_agent
  )
  VALUES (
    event_type, 
    user_id, 
    details || jsonb_build_object(
      'timestamp', now(),
      'session_id', (SELECT current_setting('app.current_session_id', true))
    ),
    ip_addr,
    (SELECT current_setting('app.current_user_agent', true))
  );
END;
$$;

-- 7. Create function to validate role changes securely
CREATE OR REPLACE FUNCTION public.can_change_user_role(_user_id uuid, _new_role user_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
  SELECT CASE
    -- Super admins can change any role
    WHEN public.is_super_admin(auth.uid()) THEN true
    -- Hospital admins can only assign hospital_admin or patient roles
    WHEN public.has_role(auth.uid(), 'hospital_admin'::user_role) AND 
         _new_role IN ('hospital_admin', 'patient') THEN true
    -- Users can only change their own role to less privileged roles
    WHEN auth.uid() = _user_id AND 
         _new_role = 'patient'::user_role THEN true
    ELSE false
  END;
$$;

-- 8. Add trigger to log role changes
CREATE OR REPLACE FUNCTION public.log_role_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Log role changes for security audit
  PERFORM public.log_security_event(
    'user_role_changed',
    auth.uid(),
    jsonb_build_object(
      'target_user_id', COALESCE(NEW.user_id, OLD.user_id),
      'old_role', OLD.role,
      'new_role', NEW.role,
      'operation', TG_OP
    )
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS log_user_role_changes ON public.user_roles;
CREATE TRIGGER log_user_role_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.log_role_change();