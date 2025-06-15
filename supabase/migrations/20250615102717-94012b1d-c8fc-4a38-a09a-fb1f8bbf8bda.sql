
-- Enable RLS and define policies for the hospitals table
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view active hospitals (for public-facing pages)
CREATE POLICY "Public can view active hospitals"
ON public.hospitals
FOR SELECT
USING (is_active = true);

-- Allow super admins to perform any action on any hospital
CREATE POLICY "Super admins can manage all hospitals"
ON public.hospitals
FOR ALL
USING (public.is_super_admin(auth.uid()))
WITH CHECK (public.is_super_admin(auth.uid()));


-- Enable RLS and define policies for the medications table
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view active medications (for public-facing pages)
CREATE POLICY "Public can view active medications"
ON public.medications
FOR SELECT
USING (is_active = true);

-- Allow super admins to perform any action on any medication
CREATE POLICY "Super admins can manage all medications"
ON public.medications
FOR ALL
USING (public.is_super_admin(auth.uid()))
WITH CHECK (public.is_super_admin(auth.uid()));
