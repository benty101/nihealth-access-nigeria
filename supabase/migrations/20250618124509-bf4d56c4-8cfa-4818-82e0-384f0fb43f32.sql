
-- Insert comprehensive Nigerian medications (Part 1 of 3)
INSERT INTO public.medications (
  name, category, price, description, brand, pack_size, prescription_required, 
  in_stock, rating, active_ingredient, dosage, manufacturer, therapeutic_class, 
  indication, generic_name, strength, route_of_administration, warnings
) VALUES

-- Pain Relief & Anti-inflammatory
('Paracetamol Tablets', 'Pain Relief', 800, 'Fast-acting pain and fever relief', 'Emzor', '10 tablets', false, true, 4.5, 'Paracetamol', '500mg', 'Emzor Pharmaceuticals', 'Analgesic', 'Pain, fever', 'Acetaminophen', '500mg', 'Oral', ARRAY['Do not exceed 8 tablets in 24 hours']),
('Paracetamol Extra', 'Pain Relief', 1200, 'Extra strength pain relief', 'GSK', '20 tablets', false, true, 4.6, 'Paracetamol', '1000mg', 'GSK Nigeria', 'Analgesic', 'Severe pain, fever', 'Acetaminophen', '1000mg', 'Oral', ARRAY['Maximum 6 tablets daily']),
('Ibuprofen Tablets', 'Pain Relief', 1500, 'Anti-inflammatory pain relief', 'Pfizer', '20 tablets', false, true, 4.4, 'Ibuprofen', '400mg', 'Pfizer Nigeria', 'NSAID', 'Pain, inflammation', 'Ibuprofen', '400mg', 'Oral', ARRAY['Take with food']),
('Diclofenac Sodium', 'Pain Relief', 2800, 'Powerful anti-inflammatory', 'Novartis', '20 tablets', true, true, 4.5, 'Diclofenac Sodium', '50mg', 'Novartis Nigeria', 'NSAID', 'Arthritis, joint pain', 'Diclofenac', '50mg', 'Oral', ARRAY['Monitor liver function']),
('Aspirin Low Dose', 'Cardiovascular', 1800, 'Heart protection therapy', 'Bayer', '30 tablets', false, true, 4.3, 'Acetylsalicylic Acid', '75mg', 'Bayer Nigeria', 'Antiplatelet', 'Heart attack prevention', 'Aspirin', '75mg', 'Oral', ARRAY['Risk of bleeding']),
('Celebrex', 'Pain Relief', 8500, 'COX-2 selective inhibitor', 'Pfizer', '30 capsules', true, true, 4.2, 'Celecoxib', '200mg', 'Pfizer', 'COX-2 Inhibitor', 'Arthritis pain', 'Celecoxib', '200mg', 'Oral', ARRAY['Cardiovascular risks']),
('Tramadol', 'Pain Relief', 4500, 'Moderate to severe pain relief', 'Teva', '20 tablets', true, true, 4.1, 'Tramadol HCl', '50mg', 'Teva Pharmaceuticals', 'Opioid Analgesic', 'Moderate pain', 'Tramadol', '50mg', 'Oral', ARRAY['Risk of dependence']),
('Feldene', 'Pain Relief', 3200, 'Long-acting anti-inflammatory', 'Pfizer', '20 capsules', true, true, 4.0, 'Piroxicam', '20mg', 'Pfizer', 'NSAID', 'Arthritis', 'Piroxicam', '20mg', 'Oral', ARRAY['GI bleeding risk']),
('Voltaren Gel', 'Pain Relief', 4800, 'Topical anti-inflammatory gel', 'Novartis', '100g tube', false, true, 4.4, 'Diclofenac Diethylamine', '1%', 'Novartis', 'Topical NSAID', 'Joint pain', 'Diclofenac', '1%', 'Topical', ARRAY['External use only']),
('Brufen Syrup', 'Pain Relief', 2200, 'Liquid ibuprofen for children', 'Abbott', '100ml', false, true, 4.3, 'Ibuprofen', '100mg/5ml', 'Abbott Nigeria', 'NSAID', 'Pediatric pain, fever', 'Ibuprofen', '20mg/ml', 'Oral', ARRAY['Weight-based dosing']),

-- Antibiotics
('Amoxicillin Capsules', 'Antibiotics', 2800, 'Broad-spectrum penicillin antibiotic', 'GSK', '21 capsules', true, true, 4.6, 'Amoxicillin', '500mg', 'GSK Nigeria', 'Penicillin', 'Bacterial infections', 'Amoxicillin', '500mg', 'Oral', ARRAY['Complete full course']),
('Augmentin', 'Antibiotics', 4500, 'Amoxicillin with clavulanic acid', 'GSK', '14 tablets', true, true, 4.7, 'Amoxicillin/Clavulanate', '625mg', 'GSK Nigeria', 'Penicillin Combination', 'Resistant bacterial infections', 'Co-amoxiclav', '625mg', 'Oral', ARRAY['Take with food']),
('Azithromycin', 'Antibiotics', 3800, 'Macrolide antibiotic', 'Pfizer', '6 tablets', true, true, 4.5, 'Azithromycin', '250mg', 'Pfizer Nigeria', 'Macrolide', 'Respiratory infections', 'Azithromycin', '250mg', 'Oral', ARRAY['Once daily dosing']),
('Ciprofloxacin', 'Antibiotics', 4200, 'Fluoroquinolone antibiotic', 'Bayer', '14 tablets', true, true, 4.4, 'Ciprofloxacin', '500mg', 'Bayer Nigeria', 'Fluoroquinolone', 'UTI, bacterial infections', 'Ciprofloxacin', '500mg', 'Oral', ARRAY['Avoid dairy products']),
('Doxycycline', 'Antibiotics', 3500, 'Tetracycline antibiotic', 'Pfizer', '28 capsules', true, true, 4.3, 'Doxycycline', '100mg', 'Pfizer', 'Tetracycline', 'Malaria prophylaxis, infections', 'Doxycycline', '100mg', 'Oral', ARRAY['Photosensitivity risk']),
('Ceftriaxone Injection', 'Antibiotics', 8500, 'Third-generation cephalosporin', 'Roche', '1 vial', true, true, 4.8, 'Ceftriaxone', '1g', 'Roche Nigeria', 'Cephalosporin', 'Severe bacterial infections', 'Ceftriaxone', '1g', 'Injection', ARRAY['Hospital use only']),
('Metronidazole', 'Antibiotics', 2500, 'Antiprotozoal and antibacterial', 'Sanofi', '21 tablets', true, true, 4.2, 'Metronidazole', '400mg', 'Sanofi Nigeria', 'Nitroimidazole', 'Anaerobic infections', 'Metronidazole', '400mg', 'Oral', ARRAY['Avoid alcohol']),
('Clindamycin', 'Antibiotics', 5200, 'Lincosamide antibiotic', 'Pfizer', '16 capsules', true, true, 4.1, 'Clindamycin', '300mg', 'Pfizer', 'Lincosamide', 'Bone and joint infections', 'Clindamycin', '300mg', 'Oral', ARRAY['C. difficile risk']),
('Erythromycin', 'Antibiotics', 3200, 'Macrolide antibiotic', 'Abbott', '28 tablets', true, true, 4.0, 'Erythromycin', '250mg', 'Abbott', 'Macrolide', 'Respiratory infections', 'Erythromycin', '250mg', 'Oral', ARRAY['Take on empty stomach']),
('Levofloxacin', 'Antibiotics', 6800, 'Advanced fluoroquinolone', 'Sanofi', '10 tablets', true, true, 4.6, 'Levofloxacin', '500mg', 'Sanofi', 'Fluoroquinolone', 'Respiratory tract infections', 'Levofloxacin', '500mg', 'Oral', ARRAY['Tendon rupture risk']),

-- Cardiovascular
('Lisinopril', 'Cardiovascular', 4500, 'ACE inhibitor for hypertension', 'Merck', '28 tablets', true, true, 4.5, 'Lisinopril', '10mg', 'Merck Nigeria', 'ACE Inhibitor', 'Hypertension', 'Lisinopril', '10mg', 'Oral', ARRAY['Monitor potassium levels']),
('Amlodipine', 'Cardiovascular', 3800, 'Calcium channel blocker', 'Pfizer', '30 tablets', true, true, 4.4, 'Amlodipine', '5mg', 'Pfizer Nigeria', 'Calcium Channel Blocker', 'Hypertension', 'Amlodipine', '5mg', 'Oral', ARRAY['Ankle swelling possible']),
('Atenolol', 'Cardiovascular', 2800, 'Beta-blocker for heart conditions', 'AstraZeneca', '28 tablets', true, true, 4.3, 'Atenolol', '50mg', 'AstraZeneca Nigeria', 'Beta Blocker', 'Hypertension, angina', 'Atenolol', '50mg', 'Oral', ARRAY['Do not stop abruptly']),
('Simvastatin', 'Cardiovascular', 5500, 'Statin for cholesterol', 'Merck', '30 tablets', true, true, 4.6, 'Simvastatin', '20mg', 'Merck Nigeria', 'Statin', 'High cholesterol', 'Simvastatin', '20mg', 'Oral', ARRAY['Take at bedtime']),
('Losartan', 'Cardiovascular', 4200, 'ARB for blood pressure', 'Merck', '28 tablets', true, true, 4.4, 'Losartan', '50mg', 'Merck', 'ARB', 'Hypertension', 'Losartan', '50mg', 'Oral', ARRAY['Monitor kidney function']),
('Furosemide', 'Cardiovascular', 1800, 'Loop diuretic', 'Sanofi', '28 tablets', true, true, 4.2, 'Furosemide', '40mg', 'Sanofi Nigeria', 'Loop Diuretic', 'Heart failure, edema', 'Furosemide', '40mg', 'Oral', ARRAY['Monitor electrolytes']),
('Digoxin', 'Cardiovascular', 2500, 'Cardiac glycoside', 'GSK', '28 tablets', true, true, 4.1, 'Digoxin', '0.25mg', 'GSK', 'Cardiac Glycoside', 'Heart failure, atrial fibrillation', 'Digoxin', '0.25mg', 'Oral', ARRAY['Narrow therapeutic window']),
('Clopidogrel', 'Cardiovascular', 8500, 'Antiplatelet agent', 'Sanofi', '28 tablets', true, true, 4.7, 'Clopidogrel', '75mg', 'Sanofi', 'Antiplatelet', 'Stroke prevention', 'Clopidogrel', '75mg', 'Oral', ARRAY['Bleeding risk']),
('Atorvastatin', 'Cardiovascular', 6200, 'High-intensity statin', 'Pfizer', '30 tablets', true, true, 4.5, 'Atorvastatin', '20mg', 'Pfizer', 'Statin', 'High cholesterol', 'Atorvastatin', '20mg', 'Oral', ARRAY['Muscle pain monitoring']),
('Hydrochlorothiazide', 'Cardiovascular', 2200, 'Thiazide diuretic', 'Merck', '30 tablets', true, true, 4.0, 'HCTZ', '25mg', 'Merck', 'Thiazide Diuretic', 'Hypertension', 'Hydrochlorothiazide', '25mg', 'Oral', ARRAY['Sun sensitivity']),

-- Diabetes Management
('Metformin', 'Diabetes', 3500, 'First-line diabetes treatment', 'Merck', '60 tablets', true, true, 4.7, 'Metformin HCl', '500mg', 'Merck Nigeria', 'Biguanide', 'Type 2 diabetes', 'Metformin', '500mg', 'Oral', ARRAY['Take with meals']),
('Glibenclamide', 'Diabetes', 2800, 'Sulfonylurea for blood sugar', 'Sanofi', '28 tablets', true, true, 4.3, 'Glibenclamide', '5mg', 'Sanofi Nigeria', 'Sulfonylurea', 'Type 2 diabetes', 'Glyburide', '5mg', 'Oral', ARRAY['Hypoglycemia risk']),
('Gliclazide MR', 'Diabetes', 4200, 'Modified release diabetes drug', 'Servier', '30 tablets', true, true, 4.4, 'Gliclazide', '60mg', 'Servier Nigeria', 'Sulfonylurea', 'Type 2 diabetes', 'Gliclazide', '60mg', 'Oral', ARRAY['Once daily with breakfast']),
('Insulin Glargine', 'Diabetes', 12500, 'Long-acting insulin', 'Sanofi', '1 pen', true, true, 4.8, 'Insulin Glargine', '100 units/ml', 'Sanofi', 'Long-acting Insulin', 'Diabetes mellitus', 'Insulin Glargine', '100 units/ml', 'Injection', ARRAY['Rotate injection sites']),
('Insulin Lispro', 'Diabetes', 11800, 'Rapid-acting insulin', 'Eli Lilly', '1 pen', true, true, 4.7, 'Insulin Lispro', '100 units/ml', 'Eli Lilly', 'Rapid-acting Insulin', 'Meal-time insulin', 'Insulin Lispro', '100 units/ml', 'Injection', ARRAY['Inject before meals']),
('Pioglitazone', 'Diabetes', 6500, 'Thiazolidinedione', 'Takeda', '28 tablets', true, true, 4.2, 'Pioglitazone', '30mg', 'Takeda', 'Thiazolidinedione', 'Type 2 diabetes', 'Pioglitazone', '30mg', 'Oral', ARRAY['Heart failure risk']),
('Sitagliptin', 'Diabetes', 8200, 'DPP-4 inhibitor', 'Merck', '28 tablets', true, true, 4.5, 'Sitagliptin', '100mg', 'Merck', 'DPP-4 Inhibitor', 'Type 2 diabetes', 'Sitagliptin', '100mg', 'Oral', ARRAY['Pancreatitis risk']),
('Empagliflozin', 'Diabetes', 15500, 'SGLT2 inhibitor', 'Boehringer Ingelheim', '30 tablets', true, true, 4.6, 'Empagliflozin', '10mg', 'Boehringer Ingelheim', 'SGLT2 Inhibitor', 'Type 2 diabetes', 'Empagliflozin', '10mg', 'Oral', ARRAY['Genital infections risk']),
('Acarbose', 'Diabetes', 5800, 'Alpha-glucosidase inhibitor', 'Bayer', '30 tablets', true, true, 4.1, 'Acarbose', '50mg', 'Bayer', 'Alpha-glucosidase Inhibitor', 'Post-meal glucose control', 'Acarbose', '50mg', 'Oral', ARRAY['Take with first bite of meal']),
('Repaglinide', 'Diabetes', 7200, 'Meglitinide', 'Novo Nordisk', '30 tablets', true, true, 4.3, 'Repaglinide', '1mg', 'Novo Nordisk', 'Meglitinide', 'Type 2 diabetes', 'Repaglinide', '1mg', 'Oral', ARRAY['Take before meals']);
