
-- Create medications table for pharmacy listings
CREATE TABLE public.medications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  brand TEXT,
  pack_size TEXT,
  prescription_required BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  rating NUMERIC DEFAULT 0.0,
  pharmacy_id UUID REFERENCES public.pharmacies(id),
  active_ingredient TEXT,
  dosage TEXT,
  side_effects TEXT[],
  contraindications TEXT[],
  storage_instructions TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create lab tests table for lab listings
CREATE TABLE public.lab_tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  lab_id UUID REFERENCES public.labs(id),
  sample_type TEXT,
  preparation_required TEXT,
  turnaround_time TEXT,
  normal_range TEXT,
  test_code TEXT,
  is_fasting_required BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;

-- Create policies for medications
CREATE POLICY "Super admin full access to medications" 
  ON public.medications 
  FOR ALL 
  USING (public.is_current_user_super_admin())
  WITH CHECK (public.is_current_user_super_admin());

-- Create policies for lab tests
CREATE POLICY "Super admin full access to lab_tests" 
  ON public.lab_tests 
  FOR ALL 
  USING (public.is_current_user_super_admin())
  WITH CHECK (public.is_current_user_super_admin());

-- Add some sample medications data
INSERT INTO public.medications (name, category, price, description, brand, pack_size, prescription_required, in_stock, rating) VALUES
('Paracetamol 500mg', 'Pain Relief', 1200, 'Effective pain and fever relief', 'GSK', '20 tablets', false, true, 4.8),
('Ibuprofen 400mg', 'Pain Relief', 1800, 'Anti-inflammatory pain relief', 'Pfizer', '30 tablets', false, true, 4.7),
('Amoxicillin 250mg', 'Antibiotics', 2800, 'Broad-spectrum antibiotic', 'GSK', '21 capsules', true, true, 4.6),
('Lisinopril 10mg', 'Cardiovascular', 4200, 'ACE inhibitor for hypertension', 'Merck', '28 tablets', true, false, 4.6),
('Metformin 500mg', 'Diabetes', 3200, 'Type 2 diabetes medication', 'Merck', '28 tablets', true, true, 4.6),
('Vitamin C 1000mg', 'Supplements', 3500, 'Immune system support', 'Nature''s Bounty', '60 tablets', false, true, 4.5)
ON CONFLICT DO NOTHING;

-- Add some sample lab tests data
INSERT INTO public.lab_tests (name, category, price, description, sample_type, preparation_required, turnaround_time, normal_range, test_code, is_fasting_required) VALUES
('Complete Blood Count (CBC)', 'Hematology', 3500, 'Comprehensive blood analysis', 'Blood', 'No special preparation required', '24 hours', 'Various ranges', 'CBC001', false),
('Lipid Profile', 'Chemistry', 4200, 'Cholesterol and triglycerides analysis', 'Blood', 'Fasting required', '24 hours', 'TC: <200 mg/dL', 'LIP001', true),
('Liver Function Test', 'Chemistry', 5000, 'Assess liver health and function', 'Blood', 'Fasting preferred', '24 hours', 'ALT: 7-40 U/L', 'LFT001', true),
('Thyroid Function Test', 'Endocrinology', 4800, 'TSH, T3, T4 levels', 'Blood', 'Morning sample preferred', '48 hours', 'TSH: 0.4-4.0 mIU/L', 'TFT001', false),
('HbA1c', 'Diabetes', 3800, 'Average blood sugar over 3 months', 'Blood', 'No fasting required', '24 hours', '<5.7%', 'HBA001', false),
('Urine Analysis', 'Clinical Pathology', 2500, 'Comprehensive urine examination', 'Urine', 'Clean catch midstream', '4 hours', 'Various parameters', 'URN001', false)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX idx_medications_category ON public.medications(category);
CREATE INDEX idx_medications_pharmacy_id ON public.medications(pharmacy_id);
CREATE INDEX idx_lab_tests_category ON public.lab_tests(category);
CREATE INDEX idx_lab_tests_lab_id ON public.lab_tests(lab_id);
