
-- Add more detailed medication categories and expand existing medications table
ALTER TABLE public.medications 
ADD COLUMN IF NOT EXISTS manufacturer TEXT,
ADD COLUMN IF NOT EXISTS batch_number TEXT,
ADD COLUMN IF NOT EXISTS expiry_date DATE,
ADD COLUMN IF NOT EXISTS therapeutic_class TEXT,
ADD COLUMN IF NOT EXISTS drug_interactions TEXT[],
ADD COLUMN IF NOT EXISTS pregnancy_category TEXT,
ADD COLUMN IF NOT EXISTS age_restrictions TEXT,
ADD COLUMN IF NOT EXISTS requires_cold_storage BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS generic_name TEXT,
ADD COLUMN IF NOT EXISTS strength TEXT,
ADD COLUMN IF NOT EXISTS route_of_administration TEXT,
ADD COLUMN IF NOT EXISTS prescription_notes TEXT,
ADD COLUMN IF NOT EXISTS indication TEXT,
ADD COLUMN IF NOT EXISTS warnings TEXT[];

-- Create comprehensive orders table
CREATE TABLE public.medication_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  order_number TEXT UNIQUE NOT NULL,
  pharmacy_id UUID REFERENCES public.pharmacies(id),
  status TEXT NOT NULL DEFAULT 'pending',
  total_amount NUMERIC NOT NULL DEFAULT 0,
  delivery_address TEXT NOT NULL,
  delivery_phone TEXT NOT NULL,
  delivery_method TEXT DEFAULT 'standard',
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  prescription_uploaded BOOLEAN DEFAULT false,
  prescription_url TEXT,
  special_instructions TEXT,
  estimated_delivery_date DATE,
  actual_delivery_date DATE,
  tracking_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create order items table
CREATE TABLE public.medication_order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.medication_orders(id) ON DELETE CASCADE NOT NULL,
  medication_id UUID REFERENCES public.medications(id) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC NOT NULL,
  total_price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create medication reminders table
CREATE TABLE public.medication_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  medication_id UUID REFERENCES public.medications(id),
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  time_of_day TIME[],
  start_date DATE NOT NULL,
  end_date DATE,
  reminder_enabled BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create order status history table
CREATE TABLE public.order_status_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.medication_orders(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL,
  status_message TEXT,
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create prescription uploads table
CREATE TABLE public.prescription_uploads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  order_id UUID REFERENCES public.medication_orders(id),
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  doctor_name TEXT,
  doctor_license TEXT,
  prescription_date DATE,
  status TEXT DEFAULT 'pending_review',
  pharmacist_notes TEXT,
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.medication_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescription_uploads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for orders
CREATE POLICY "Users can view their own orders" ON public.medication_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own orders" ON public.medication_orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own orders" ON public.medication_orders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all orders" ON public.medication_orders FOR ALL USING (public.is_super_admin(auth.uid()));

-- Create RLS policies for order items
CREATE POLICY "Users can view their own order items" ON public.medication_order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.medication_orders WHERE id = order_id AND user_id = auth.uid())
);
CREATE POLICY "Users can create order items for their orders" ON public.medication_order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.medication_orders WHERE id = order_id AND user_id = auth.uid())
);
CREATE POLICY "Admins can manage all order items" ON public.medication_order_items FOR ALL USING (public.is_super_admin(auth.uid()));

-- Create RLS policies for reminders
CREATE POLICY "Users can manage their own reminders" ON public.medication_reminders FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for order status history
CREATE POLICY "Users can view order status for their orders" ON public.order_status_history FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.medication_orders WHERE id = order_id AND user_id = auth.uid())
);
CREATE POLICY "Admins can manage order status" ON public.order_status_history FOR ALL USING (public.is_super_admin(auth.uid()));

-- Create RLS policies for prescription uploads
CREATE POLICY "Users can manage their own prescriptions" ON public.prescription_uploads FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all prescriptions" ON public.prescription_uploads FOR ALL USING (public.is_super_admin(auth.uid()));

-- Create function to generate order numbers
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  order_num TEXT;
BEGIN
  order_num := 'ORD-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
               LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  
  WHILE EXISTS (SELECT 1 FROM public.medication_orders WHERE order_number = order_num) LOOP
    order_num := 'ORD-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                 LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  END LOOP;
  
  RETURN order_num;
END;
$$;

-- Create trigger to auto-generate order numbers
CREATE OR REPLACE FUNCTION public.handle_order_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := public.generate_order_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_order_number
  BEFORE INSERT ON public.medication_orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_order_number();

-- Insert comprehensive medication data for Nigerian pharmacy
INSERT INTO public.medications (name, category, price, description, brand, pack_size, prescription_required, in_stock, rating, active_ingredient, dosage, manufacturer, therapeutic_class, indication, generic_name, strength, route_of_administration) VALUES
-- Pain Relief & Anti-inflammatory
('Paracetamol Extra', 'Pain Relief', 1500, 'Extra strength paracetamol for severe pain and fever', 'Panadol', '24 tablets', false, true, 4.8, 'Paracetamol', '1000mg', 'GSK', 'Analgesic/Antipyretic', 'Pain relief, fever reduction', 'Acetaminophen', '1000mg', 'Oral'),
('Ibuprofen Plus', 'Pain Relief', 2200, 'Anti-inflammatory pain relief with faster action', 'Brufen', '30 tablets', false, true, 4.7, 'Ibuprofen', '400mg', 'Abbott', 'NSAID', 'Pain, inflammation, fever', 'Ibuprofen', '400mg', 'Oral'),
('Diclofenac Sodium', 'Pain Relief', 3500, 'Powerful anti-inflammatory for joint pain', 'Voltaren', '20 tablets', true, true, 4.6, 'Diclofenac Sodium', '50mg', 'Novartis', 'NSAID', 'Arthritis, joint pain', 'Diclofenac', '50mg', 'Oral'),
('Aspirin Cardio', 'Cardiovascular', 2800, 'Low-dose aspirin for heart protection', 'Cardiprin', '30 tablets', false, true, 4.5, 'Acetylsalicylic Acid', '75mg', 'Bayer', 'Antiplatelet', 'Heart attack prevention', 'Aspirin', '75mg', 'Oral'),

-- Antibiotics
('Amoxicillin', 'Antibiotics', 3200, 'Broad-spectrum antibiotic for bacterial infections', 'Amoxil', '21 capsules', true, true, 4.7, 'Amoxicillin', '500mg', 'GSK', 'Penicillin Antibiotic', 'Bacterial infections', 'Amoxicillin', '500mg', 'Oral'),
('Azithromycin', 'Antibiotics', 4500, 'Macrolide antibiotic for respiratory infections', 'Zithromax', '6 tablets', true, true, 4.6, 'Azithromycin', '250mg', 'Pfizer', 'Macrolide Antibiotic', 'Respiratory infections', 'Azithromycin', '250mg', 'Oral'),
('Ciprofloxacin', 'Antibiotics', 5200, 'Fluoroquinolone for urinary tract infections', 'Cipro', '14 tablets', true, true, 4.5, 'Ciprofloxacin', '500mg', 'Bayer', 'Fluoroquinolone', 'UTI, bacterial infections', 'Ciprofloxacin', '500mg', 'Oral'),
('Metronidazole', 'Antibiotics', 2800, 'Antibiotic for anaerobic bacterial infections', 'Flagyl', '21 tablets', true, true, 4.4, 'Metronidazole', '400mg', 'Sanofi', 'Nitroimidazole', 'Anaerobic infections', 'Metronidazole', '400mg', 'Oral'),

-- Cardiovascular
('Lisinopril', 'Cardiovascular', 4800, 'ACE inhibitor for high blood pressure', 'Prinivil', '28 tablets', true, true, 4.6, 'Lisinopril', '10mg', 'Merck', 'ACE Inhibitor', 'Hypertension, heart failure', 'Lisinopril', '10mg', 'Oral'),
('Amlodipine', 'Cardiovascular', 3600, 'Calcium channel blocker for hypertension', 'Norvasc', '30 tablets', true, true, 4.5, 'Amlodipine', '5mg', 'Pfizer', 'Calcium Channel Blocker', 'High blood pressure', 'Amlodipine', '5mg', 'Oral'),
('Atenolol', 'Cardiovascular', 3200, 'Beta-blocker for heart conditions', 'Tenormin', '28 tablets', true, true, 4.4, 'Atenolol', '50mg', 'AstraZeneca', 'Beta Blocker', 'Hypertension, angina', 'Atenolol', '50mg', 'Oral'),
('Simvastatin', 'Cardiovascular', 5500, 'Statin for cholesterol management', 'Zocor', '30 tablets', true, true, 4.6, 'Simvastatin', '20mg', 'Merck', 'Statin', 'High cholesterol', 'Simvastatin', '20mg', 'Oral'),

-- Diabetes
('Metformin', 'Diabetes', 3800, 'First-line treatment for type 2 diabetes', 'Glucophage', '60 tablets', true, true, 4.7, 'Metformin HCl', '500mg', 'Merck', 'Biguanide', 'Type 2 diabetes', 'Metformin', '500mg', 'Oral'),
('Glibenclamide', 'Diabetes', 2500, 'Sulfonylurea for blood sugar control', 'Daonil', '28 tablets', true, true, 4.3, 'Glibenclamide', '5mg', 'Sanofi', 'Sulfonylurea', 'Type 2 diabetes', 'Glyburide', '5mg', 'Oral'),
('Insulin Glargine', 'Diabetes', 8500, 'Long-acting insulin for diabetes management', 'Lantus', '1 pen', true, true, 4.8, 'Insulin Glargine', '100 units/ml', 'Sanofi', 'Long-acting Insulin', 'Diabetes mellitus', 'Insulin Glargine', '100 units/ml', 'Injection'),
('Gliclazide', 'Diabetes', 3200, 'Modified-release diabetes medication', 'Diamicron', '30 tablets', true, true, 4.4, 'Gliclazide', '60mg', 'Servier', 'Sulfonylurea', 'Type 2 diabetes', 'Gliclazide', '60mg', 'Oral'),

-- Sexual Health
('Sildenafil', 'Sexual Health', 12000, 'Treatment for erectile dysfunction', 'Viagra', '4 tablets', true, true, 4.7, 'Sildenafil Citrate', '100mg', 'Pfizer', 'PDE5 Inhibitor', 'Erectile dysfunction', 'Sildenafil', '100mg', 'Oral'),
('Tadalafil', 'Sexual Health', 15000, 'Long-lasting ED treatment', 'Cialis', '4 tablets', true, true, 4.8, 'Tadalafil', '20mg', 'Eli Lilly', 'PDE5 Inhibitor', 'Erectile dysfunction', 'Tadalafil', '20mg', 'Oral'),
('Clotrimazole Pessary', 'Sexual Health', 2800, 'Antifungal for vaginal yeast infections', 'Canesten', '6 pessaries', false, true, 4.5, 'Clotrimazole', '500mg', 'Bayer', 'Antifungal', 'Vaginal thrush', 'Clotrimazole', '500mg', 'Vaginal'),

-- Respiratory
('Salbutamol Inhaler', 'Respiratory', 4500, 'Quick-relief inhaler for asthma', 'Ventolin', '1 inhaler', true, true, 4.8, 'Salbutamol', '100mcg/dose', 'GSK', 'Beta2 Agonist', 'Asthma, COPD', 'Albuterol', '100mcg/dose', 'Inhalation'),
('Beclomethasone Inhaler', 'Respiratory', 6200, 'Steroid inhaler for asthma control', 'Qvar', '1 inhaler', true, true, 4.6, 'Beclomethasone', '250mcg/dose', 'Teva', 'Corticosteroid', 'Asthma prevention', 'Beclomethasone', '250mcg/dose', 'Inhalation'),
('Montelukast', 'Respiratory', 5800, 'Asthma and allergy medication', 'Singulair', '28 tablets', true, true, 4.5, 'Montelukast', '10mg', 'Merck', 'Leukotriene Antagonist', 'Asthma, allergies', 'Montelukast', '10mg', 'Oral'),

-- Gastrointestinal
('Omeprazole', 'Gastrointestinal', 3500, 'Proton pump inhibitor for acid reflux', 'Losec', '28 capsules', false, true, 4.6, 'Omeprazole', '20mg', 'AstraZeneca', 'PPI', 'GERD, peptic ulcers', 'Omeprazole', '20mg', 'Oral'),
('Loperamide', 'Gastrointestinal', 1800, 'Anti-diarrheal medication', 'Imodium', '12 capsules', false, true, 4.4, 'Loperamide HCl', '2mg', 'Johnson & Johnson', 'Antidiarrheal', 'Acute diarrhea', 'Loperamide', '2mg', 'Oral'),
('Oral Rehydration Salts', 'Gastrointestinal', 850, 'ORS for dehydration treatment', 'ORS', '10 sachets', false, true, 4.7, 'Sodium Chloride, Glucose', 'Various', 'WHO', 'Electrolyte Replenisher', 'Dehydration', 'ORS', 'Various', 'Oral'),

-- Mental Health
('Fluoxetine', 'Mental Health', 4200, 'SSRI antidepressant', 'Prozac', '28 capsules', true, true, 4.3, 'Fluoxetine HCl', '20mg', 'Eli Lilly', 'SSRI', 'Depression, anxiety', 'Fluoxetine', '20mg', 'Oral'),
('Sertraline', 'Mental Health', 4800, 'SSRI for depression and anxiety', 'Zoloft', '30 tablets', true, true, 4.4, 'Sertraline HCl', '50mg', 'Pfizer', 'SSRI', 'Depression, panic disorder', 'Sertraline', '50mg', 'Oral'),
('Lorazepam', 'Mental Health', 3500, 'Benzodiazepine for anxiety', 'Ativan', '30 tablets', true, true, 4.2, 'Lorazepam', '1mg', 'Pfizer', 'Benzodiazepine', 'Anxiety disorders', 'Lorazepam', '1mg', 'Oral'),

-- Supplements & Vitamins
('Multivitamin Complex', 'Supplements', 4500, 'Complete daily vitamin supplement', 'Centrum', '60 tablets', false, true, 4.6, 'Multiple Vitamins', 'Various', 'Pfizer', 'Vitamin Supplement', 'Nutritional support', 'Multivitamin', 'Various', 'Oral'),
('Vitamin D3', 'Supplements', 3200, 'High-potency vitamin D supplement', 'Vigantol', '30 tablets', false, true, 4.5, 'Cholecalciferol', '1000 IU', 'Merck', 'Vitamin Supplement', 'Bone health', 'Vitamin D3', '1000 IU', 'Oral'),
('Calcium + Magnesium', 'Supplements', 3800, 'Bone health supplement', 'Caltrate', '60 tablets', false, true, 4.4, 'Calcium Carbonate, Magnesium', '600mg/400mg', 'Pfizer', 'Mineral Supplement', 'Bone strength', 'Calcium/Magnesium', '600mg/400mg', 'Oral'),
('Omega-3 Fish Oil', 'Supplements', 5500, 'EPA/DHA for heart and brain health', 'Seven Seas', '60 capsules', false, true, 4.7, 'EPA/DHA', '1000mg', 'Seven Seas', 'Omega-3 Supplement', 'Cardiovascular health', 'Fish Oil', '1000mg', 'Oral'),

-- Injections & Vaccines
('Hepatitis B Vaccine', 'Vaccines', 8500, 'Protection against Hepatitis B', 'Engerix-B', '1 vial', true, true, 4.8, 'HBsAg', '20mcg/ml', 'GSK', 'Vaccine', 'Hepatitis B prevention', 'HBV Vaccine', '20mcg/ml', 'Injection'),
('Tetanus Toxoid', 'Vaccines', 2500, 'Tetanus prevention vaccine', 'TT', '1 vial', true, true, 4.6, 'Tetanus Toxoid', '0.5ml', 'Serum Institute', 'Vaccine', 'Tetanus prevention', 'Tetanus Toxoid', '0.5ml', 'Injection'),
('Vitamin B12 Injection', 'Injections', 3500, 'High-dose B12 for deficiency', 'Neurobion', '3 ampoules', true, true, 4.5, 'Cyanocobalamin', '1000mcg/ml', 'Merck', 'Vitamin Injection', 'B12 deficiency', 'Cyanocobalamin', '1000mcg/ml', 'Injection'),

-- Eye Care
('Chloramphenicol Eye Drops', 'Eye Care', 1800, 'Antibiotic eye drops for infections', 'Chlorsig', '10ml', true, true, 4.4, 'Chloramphenicol', '0.5%', 'Pfizer', 'Antibiotic', 'Eye infections', 'Chloramphenicol', '0.5%', 'Topical'),
('Artificial Tears', 'Eye Care', 2200, 'Lubricating eye drops for dry eyes', 'Systane', '15ml', false, true, 4.6, 'Polyethylene Glycol', '0.4%', 'Alcon', 'Lubricant', 'Dry eyes', 'Artificial Tears', '0.4%', 'Topical'),

-- Dermatology
('Hydrocortisone Cream', 'Dermatology', 2500, 'Topical steroid for skin inflammation', 'Dermacort', '30g tube', false, true, 4.3, 'Hydrocortisone', '1%', 'GSK', 'Topical Corticosteroid', 'Eczema, dermatitis', 'Hydrocortisone', '1%', 'Topical'),
('Antifungal Cream', 'Dermatology', 3200, 'Treatment for fungal skin infections', 'Lamisil', '30g tube', false, true, 4.5, 'Terbinafine', '1%', 'Novartis', 'Antifungal', 'Fungal infections', 'Terbinafine', '1%', 'Topical'),

-- Women's Health
('Folic Acid', 'Women''s Health', 1500, 'Essential for pregnancy and fertility', 'Folacin', '30 tablets', false, true, 4.7, 'Folic Acid', '5mg', 'Various', 'Vitamin', 'Pregnancy support', 'Folic Acid', '5mg', 'Oral'),
('Iron + Vitamin C', 'Women''s Health', 2800, 'Iron supplement with enhanced absorption', 'Feroglobin', '30 capsules', false, true, 4.4, 'Ferrous Fumarate, Vitamin C', '305mg/70mg', 'Vitabiotics', 'Iron Supplement', 'Iron deficiency anemia', 'Iron/Vitamin C', '305mg/70mg', 'Oral'),
('Emergency Contraceptive', 'Women''s Health', 3500, 'Morning-after pill', 'Postinor-2', '2 tablets', false, true, 4.2, 'Levonorgestrel', '1.5mg', 'Gedeon Richter', 'Emergency Contraceptive', 'Emergency contraception', 'Levonorgestrel', '1.5mg', 'Oral')

ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_medication_orders_user_id ON public.medication_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_medication_orders_status ON public.medication_orders(status);
CREATE INDEX IF NOT EXISTS idx_medication_orders_pharmacy_id ON public.medication_orders(pharmacy_id);
CREATE INDEX IF NOT EXISTS idx_medication_order_items_order_id ON public.medication_order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_medication_reminders_user_id ON public.medication_reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON public.order_status_history(order_id);
CREATE INDEX IF NOT EXISTS idx_prescription_uploads_user_id ON public.prescription_uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_medications_category ON public.medications(category);
CREATE INDEX IF NOT EXISTS idx_medications_therapeutic_class ON public.medications(therapeutic_class);
CREATE INDEX IF NOT EXISTS idx_medications_prescription_required ON public.medications(prescription_required);
