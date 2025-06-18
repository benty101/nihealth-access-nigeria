
-- Continue adding more hospitals - Focus on northern states

INSERT INTO public.hospitals (name, address, state, lga, phone, email, license_number, specialties, facilities, is_active) VALUES
-- Jigawa State
('Federal Medical Centre Birnin Kudu', 'Birnin Kudu', 'Jigawa', 'Birnin Kudu', '+234-64-700123', 'fmcbirnintudu@health.gov.ng', 'JG001', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('General Hospital Dutse', 'Dutse', 'Jigawa', 'Dutse', '+234-64-701456', 'dutsegen@health.gov.ng', 'JG002', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Hadejia', 'Hadejia', 'Jigawa', 'Hadejia', '+234-64-702789', 'hadejiagen@health.gov.ng', 'JG003', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Specialist Hospital Dutse', 'Dutse', 'Jigawa', 'Dutse', '+234-64-703012', 'specialist@jigawastate.ng', 'JG004', ARRAY['Cardiology', 'Orthopedics'], ARRAY['Heart Center', 'Orthopedic Unit'], true),
('General Hospital Gumel', 'Gumel', 'Jigawa', 'Gumel', '+234-64-704345', 'gumelgen@health.gov.ng', 'JG005', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Yobe State
('Federal Medical Centre Nguru', 'Nguru', 'Yobe', 'Nguru', '+234-71-600123', 'fmcnguru@health.gov.ng', 'YB001', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('General Hospital Damaturu', 'Damaturu', 'Yobe', 'Damaturu', '+234-71-601456', 'damaturu@health.gov.ng', 'YB002', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Specialist Hospital Damaturu', 'Damaturu', 'Yobe', 'Damaturu', '+234-71-602789', 'specialist@yobestate.ng', 'YB003', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Potiskum', 'Potiskum', 'Yobe', 'Potiskum', '+234-71-603012', 'potiskum@health.gov.ng', 'YB004', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Gashua', 'Gashua', 'Yobe', 'Bade', '+234-71-604345', 'gashua@health.gov.ng', 'YB005', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Borno State (expanding)
('University of Maiduguri Teaching Hospital', 'Maiduguri', 'Borno', 'Maiduguri', '+234-76-500123', 'umth@unimaid.edu.ng', 'BO006', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Federal Neuropsychiatric Hospital', 'Maiduguri', 'Borno', 'Maiduguri', '+234-76-501456', 'fnpmaiduguri@health.gov.ng', 'BO007', ARRAY['Psychiatry', 'Neurology'], ARRAY['Mental Health Unit'], true),
('General Hospital Bama', 'Bama', 'Borno', 'Bama', '+234-76-502789', 'bama@health.gov.ng', 'BO008', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Specialist Hospital Maiduguri', 'Maiduguri', 'Borno', 'Maiduguri', '+234-76-503012', 'specialist@bornostate.ng', 'BO009', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Monguno', 'Monguno', 'Borno', 'Monguno', '+234-76-504345', 'monguno@health.gov.ng', 'BO010', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Katsina State (expanding)
('Federal Medical Centre Katsina', 'Katsina', 'Katsina', 'Katsina', '+234-65-431123', 'fmckatsina@health.gov.ng', 'KT006', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('General Hospital Daura', 'Daura', 'Katsina', 'Daura', '+234-65-432456', 'daura@health.gov.ng', 'KT007', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Specialist Hospital Katsina', 'Katsina', 'Katsina', 'Katsina', '+234-65-433789', 'specialist@katsinastate.ng', 'KT008', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Funtua', 'Funtua', 'Katsina', 'Funtua', '+234-65-434012', 'funtua@health.gov.ng', 'KT009', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Malumfashi', 'Malumfashi', 'Katsina', 'Malumfashi', '+234-65-435345', 'malumfashi@health.gov.ng', 'KT010', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Kaduna State (expanding)
('National Eye Centre', 'Kaduna', 'Kaduna', 'Kaduna North', '+234-62-240123', 'nec@eyecentre.gov.ng', 'KD011', ARRAY['Ophthalmology'], ARRAY['Eye Surgery Center'], true),
('44 Nigerian Army Reference Hospital', 'Kaduna', 'Kaduna', 'Kaduna North', '+234-62-241456', '44narh@army.mil.ng', 'KD012', ARRAY['All Specialties'], ARRAY['Military Hospital'], true),
('St. Gerard Catholic Hospital', 'Kakuri, Kaduna', 'Kaduna', 'Kaduna South', '+234-62-242789', 'stgerard@catholic.ng', 'KD013', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('General Hospital Kafanchan', 'Kafanchan', 'Kaduna', 'Jema a', '+234-62-243012', 'kafanchan@health.gov.ng', 'KD014', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Yusuf Dantsoho Memorial Hospital', 'Tudun Wada, Kaduna', 'Kaduna', 'Kaduna North', '+234-62-244345', 'ydmh@kaduna.ng', 'KD015', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true);
