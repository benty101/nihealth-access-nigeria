
-- Create policy to allow super admin role creation during signup (this is the key missing policy)
CREATE POLICY "Allow super admin role creation during signup" 
  ON public.user_roles 
  FOR INSERT 
  WITH CHECK (true);

-- Also create a policy for super admins to manage all user roles
CREATE POLICY "Super admins can manage all user roles" 
  ON public.user_roles 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  ));
