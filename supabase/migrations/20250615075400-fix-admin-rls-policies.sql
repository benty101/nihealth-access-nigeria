
-- Fix RLS policies to ensure super admins can access all data for management purposes

-- Update pharmacy policies
DROP POLICY IF EXISTS "Super admins can manage pharmacies" ON public.pharmacies;
CREATE POLICY "Super admins can manage pharmacies" 
  ON public.pharmacies 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Update lab policies
DROP POLICY IF EXISTS "Super admins can manage labs" ON public.labs;
CREATE POLICY "Super admins can manage labs" 
  ON public.labs 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Update telemedicine provider policies
DROP POLICY IF EXISTS "Super admins can manage telemedicine providers" ON public.telemedicine_providers;
CREATE POLICY "Super admins can manage telemedicine providers" 
  ON public.telemedicine_providers 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Ensure super admins can also read count data
CREATE POLICY IF NOT EXISTS "Super admins can read all pharmacy data" 
  ON public.pharmacies 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY IF NOT EXISTS "Super admins can read all lab data" 
  ON public.labs 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY IF NOT EXISTS "Super admins can read all telemedicine data" 
  ON public.telemedicine_providers 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );
