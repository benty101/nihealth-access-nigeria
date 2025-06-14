
-- Create pharmacy table for admin management
CREATE TABLE public.pharmacies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  state TEXT,
  lga TEXT,
  phone TEXT,
  email TEXT,
  license_number TEXT,
  specialties TEXT[], -- Array of specialties like "pediatric", "general", etc.
  services TEXT[], -- Array of services like "prescription_filling", "consultation", etc.
  operating_hours JSONB, -- Store operating hours as JSON
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create labs table for admin management
CREATE TABLE public.labs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  state TEXT,
  lga TEXT,
  phone TEXT,
  email TEXT,
  license_number TEXT,
  test_types TEXT[], -- Array of test types like "blood_test", "urine_test", etc.
  equipment TEXT[], -- Array of available equipment
  certifications TEXT[], -- Array of certifications
  operating_hours JSONB, -- Store operating hours as JSON
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create telemedicine_providers table
CREATE TABLE public.telemedicine_providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialization TEXT,
  license_number TEXT,
  phone TEXT,
  email TEXT,
  consultation_fee NUMERIC,
  available_hours JSONB, -- Store availability as JSON
  languages TEXT[], -- Languages spoken
  experience_years INTEGER,
  rating DECIMAL(2,1) DEFAULT 0.0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies for pharmacies
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active pharmacies" 
  ON public.pharmacies 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Super admins can manage pharmacies" 
  ON public.pharmacies 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  ));

-- Add RLS policies for labs
ALTER TABLE public.labs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active labs" 
  ON public.labs 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Super admins can manage labs" 
  ON public.labs 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  ));

-- Add RLS policies for telemedicine providers
ALTER TABLE public.telemedicine_providers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active telemedicine providers" 
  ON public.telemedicine_providers 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Super admins can manage telemedicine providers" 
  ON public.telemedicine_providers 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  ));

-- Add triggers for updated_at
CREATE TRIGGER handle_updated_at_pharmacies
  BEFORE UPDATE ON public.pharmacies
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_labs
  BEFORE UPDATE ON public.labs
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_telemedicine_providers
  BEFORE UPDATE ON public.telemedicine_providers
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
