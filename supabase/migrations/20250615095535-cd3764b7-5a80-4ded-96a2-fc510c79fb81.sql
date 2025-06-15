
-- Enable Row Level Security and add policies for the 'hospitals' table
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super Admins can manage hospitals" ON public.hospitals FOR ALL USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Anyone can view hospitals" ON public.hospitals FOR SELECT USING (true);

-- Enable Row Level Security and add policies for the 'pharmacies' table
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super Admins can manage pharmacies" ON public.pharmacies FOR ALL USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Anyone can view pharmacies" ON public.pharmacies FOR SELECT USING (true);

-- Enable Row Level Security and add policies for the 'labs' table
ALTER TABLE public.labs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super Admins can manage labs" ON public.labs FOR ALL USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Anyone can view labs" ON public.labs FOR SELECT USING (true);

-- Enable Row Level Security and add policies for the 'medications' table
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super Admins can manage medications" ON public.medications FOR ALL USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Anyone can view medications" ON public.medications FOR SELECT USING (true);

-- Enable Row Level Security and add policies for the 'lab_tests' table
ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super Admins can manage lab_tests" ON public.lab_tests FOR ALL USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Anyone can view lab_tests" ON public.lab_tests FOR SELECT USING (true);

-- Enable Row Level Security and add policies for the 'insurance_plans' table
ALTER TABLE public.insurance_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super Admins can manage insurance_plans" ON public.insurance_plans FOR ALL USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Anyone can view insurance_plans" ON public.insurance_plans FOR SELECT USING (true);

-- Enable Row Level Security and add policies for the 'telemedicine_providers' table
ALTER TABLE public.telemedicine_providers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super Admins can manage telemedicine_providers" ON public.telemedicine_providers FOR ALL USING (public.is_super_admin(auth.uid())) WITH CHECK (public.is_super_admin(auth.uid()));
CREATE POLICY "Anyone can view telemedicine_providers" ON public.telemedicine_providers FOR SELECT USING (true);
