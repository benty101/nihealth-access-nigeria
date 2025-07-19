
-- Create biobank samples table for NABDA partnership
CREATE TABLE public.biobank_samples (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  sample_id TEXT NOT NULL UNIQUE,
  sample_type TEXT NOT NULL, -- blood, saliva, tissue, etc.
  collection_date TIMESTAMP WITH TIME ZONE NOT NULL,
  collection_method TEXT NOT NULL, -- home_kit, clinic, hospital
  storage_location TEXT,
  storage_temperature TEXT,
  consent_research BOOLEAN DEFAULT false,
  consent_biobanking BOOLEAN DEFAULT false,
  consent_data_sharing BOOLEAN DEFAULT false,
  processing_status TEXT DEFAULT 'collected', -- collected, processing, analyzed, stored
  lab_id UUID REFERENCES labs(id),
  chain_of_custody JSONB DEFAULT '[]'::jsonb,
  quality_metrics JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create consent management table
CREATE TABLE public.user_consents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  consent_type TEXT NOT NULL, -- research, biobanking, data_sharing, marketing
  consent_given BOOLEAN NOT NULL,
  consent_date TIMESTAMP WITH TIME ZONE NOT NULL,
  consent_version TEXT NOT NULL,
  withdrawal_date TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create health timeline events table
CREATE TABLE public.health_timeline_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  event_type TEXT NOT NULL, -- lab_test, medication, consultation, hospital_visit, genomic_test
  event_title TEXT NOT NULL,
  event_description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  related_id UUID, -- references to orders, consultations, etc.
  related_table TEXT, -- which table the related_id refers to
  metadata JSONB DEFAULT '{}'::jsonb,
  is_milestone BOOLEAN DEFAULT false,
  privacy_level TEXT DEFAULT 'private', -- private, family, research
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create home test kits table
CREATE TABLE public.home_test_kits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  kit_type TEXT NOT NULL, -- genomic, blood_panel, hormone, etc.
  kit_name TEXT NOT NULL,
  order_number TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'ordered', -- ordered, shipped, delivered, sample_collected, processing, completed
  shipping_address TEXT NOT NULL,
  tracking_number TEXT,
  lab_id UUID REFERENCES labs(id),
  results_url TEXT,
  results_available BOOLEAN DEFAULT false,
  collection_instructions TEXT,
  return_shipping_label TEXT,
  price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create family health records table
CREATE TABLE public.family_health_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  family_member_name TEXT NOT NULL,
  relationship TEXT NOT NULL, -- mother, father, sibling, child, etc.
  birth_date DATE,
  gender TEXT,
  medical_conditions TEXT[],
  genetic_conditions TEXT[],
  medications TEXT[],
  allergies TEXT[],
  cause_of_death TEXT,
  age_at_death INTEGER,
  consent_to_share BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies for biobank samples
ALTER TABLE public.biobank_samples ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own biobank samples"
ON public.biobank_samples FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all biobank samples"
ON public.biobank_samples FOR ALL
USING (is_super_admin(auth.uid()));

-- Add RLS policies for user consents
ALTER TABLE public.user_consents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own consents"
ON public.user_consents FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all consents"
ON public.user_consents FOR SELECT
USING (is_super_admin(auth.uid()));

-- Add RLS policies for health timeline events
ALTER TABLE public.health_timeline_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own timeline events"
ON public.health_timeline_events FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all timeline events"
ON public.health_timeline_events FOR SELECT
USING (is_super_admin(auth.uid()));

-- Add RLS policies for home test kits
ALTER TABLE public.home_test_kits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own test kits"
ON public.home_test_kits FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all test kits"
ON public.home_test_kits FOR ALL
USING (is_super_admin(auth.uid()));

-- Add RLS policies for family health records
ALTER TABLE public.family_health_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own family records"
ON public.family_health_records FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create function to generate kit order numbers
CREATE OR REPLACE FUNCTION public.generate_kit_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  order_num TEXT;
BEGIN
  order_num := 'KIT-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
               LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  
  WHILE EXISTS (SELECT 1 FROM public.home_test_kits WHERE order_number = order_num) LOOP
    order_num := 'KIT-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                 LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  END LOOP;
  
  RETURN order_num;
END;
$$;

-- Create trigger for auto-generating kit order numbers
CREATE OR REPLACE FUNCTION public.handle_kit_order_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := public.generate_kit_order_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_kit_order_number
  BEFORE INSERT ON public.home_test_kits
  FOR EACH ROW EXECUTE FUNCTION public.handle_kit_order_number();

-- Create trigger for auto-generating sample IDs
CREATE OR REPLACE FUNCTION public.generate_sample_id()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  sample_id TEXT;
BEGIN
  sample_id := 'BIO-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
               LPAD(FLOOR(RANDOM() * 10000000)::TEXT, 7, '0');
  
  WHILE EXISTS (SELECT 1 FROM public.biobank_samples WHERE sample_id = sample_id) LOOP
    sample_id := 'BIO-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                 LPAD(FLOOR(RANDOM() * 10000000)::TEXT, 7, '0');
  END LOOP;
  
  RETURN sample_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_sample_id()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.sample_id IS NULL OR NEW.sample_id = '' THEN
    NEW.sample_id := public.generate_sample_id();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_sample_id
  BEFORE INSERT ON public.biobank_samples
  FOR EACH ROW EXECUTE FUNCTION public.handle_sample_id();

-- Add updated_at triggers
CREATE TRIGGER trigger_biobank_samples_updated_at
  BEFORE UPDATE ON public.biobank_samples
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_user_consents_updated_at
  BEFORE UPDATE ON public.user_consents
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_home_test_kits_updated_at
  BEFORE UPDATE ON public.home_test_kits
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_family_health_records_updated_at
  BEFORE UPDATE ON public.family_health_records
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
