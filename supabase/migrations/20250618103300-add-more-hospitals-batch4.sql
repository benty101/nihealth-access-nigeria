
-- Final batch to reach 500+ hospitals - Adding more to existing states and new smaller states

INSERT INTO public.hospitals (name, address, state, lga, phone, email, license_number, specialties, facilities, is_active) VALUES
-- Expanding Lagos (more hospitals)
('Lagos Island Maternity Hospital', 'Lagos Island', 'Lagos', 'Lagos Island', '+234-1-8901234', 'maternity@lasgov.ng', 'LA026', ARRAY['Obstetrics', 'Gynecology'], ARRAY['Maternity Ward', 'NICU'], true),
('Mainland Hospital Yaba', 'Yaba', 'Lagos', 'Lagos Mainland', '+234-1-8902345', 'mainland@lasgov.ng', 'LA027', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'ICU'], true),
('Harvey Road Health Centre', 'Yaba', 'Lagos', 'Lagos Mainland', '+234-1-8903456', 'harvey@lasgov.ng', 'LA028', ARRAY['Primary Care'], ARRAY['Outpatient Clinic'], true),
('Isolo General Hospital', 'Isolo', 'Lagos', 'Isolo', '+234-1-8904567', 'isolo@lasgov.ng', 'LA029', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Gbagada General Hospital', 'Gbagada', 'Lagos', 'Kosofe', '+234-1-8905678', 'gbagada@lasgov.ng', 'LA030', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Expanding Kano (more hospitals)  
('Murtala Muhammad Specialist Hospital', 'Kano', 'Kano', 'Kano Municipal', '+234-64-636789', 'mmsh@kanostate.ng', 'KN016', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('Infectious Disease Hospital', 'Kano', 'Kano', 'Kano Municipal', '+234-64-637890', 'infectious@kanostate.ng', 'KN017', ARRAY['Infectious Diseases'], ARRAY['Isolation Ward'], true),
('Wudil General Hospital', 'Wudil', 'Kano', 'Wudil', '+234-64-638901', 'wudil@health.gov.ng', 'KN018', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Gwarzo General Hospital', 'Gwarzo', 'Kano', 'Gwarzo', '+234-64-639012', 'gwarzo@health.gov.ng', 'KN019', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Rano General Hospital', 'Rano', 'Kano', 'Rano', '+234-64-640123', 'rano@health.gov.ng', 'KN020', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Expanding Ogun State (more hospitals)
('Gateway Polytechnic Medical Centre', 'Saapade', 'Ogun', 'Remo North', '+234-39-710123', 'gatewaypoly@medcentre.ng', 'OG016', ARRAY['General Medicine'], ARRAY['Outpatient Clinic'], true),
('Olabisi Onabanjo University Teaching Hospital', 'Sagamu', 'Ogun', 'Sagamu', '+234-37-640456', 'oouth@oouagoiwoye.edu.ng', 'OG017', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Ijebu-Ode General Hospital', 'Ijebu-Ode', 'Ogun', 'Ijebu-Ode', '+234-37-432789', 'ijebuode@health.gov.ng', 'OG018', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Sagamu State Hospital', 'Sagamu', 'Ogun', 'Sagamu', '+234-37-641012', 'sagamu@ogunstate.ng', 'OG019', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Abeokuta South Medical Centre', 'Abeokuta', 'Ogun', 'Abeokuta South', '+234-39-711345', 'abesouth@ogunstate.ng', 'OG020', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Expanding Abuja FCT (more hospitals)
('National Orthopedic Hospital', 'Dala, Abuja', 'FCT', 'Gwagwalada', '+234-9-8701234', 'noh@health.gov.ng', 'FC011', ARRAY['Orthopedics'], ARRAY['Orthopedic Surgery'], true),
('Wuse General Hospital', 'Wuse', 'FCT', 'Municipal', '+234-9-8702345', 'wuse@fcthealth.ng', 'FC012', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Garki Hospital', 'Garki', 'FCT', 'Municipal', '+234-9-8703456', 'garki@fcthealth.ng', 'FC013', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Kubwa General Hospital', 'Kubwa', 'FCT', 'Bwari', '+234-9-8704567', 'kubwa@fcthealth.ng', 'FC014', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Nyanya General Hospital', 'Nyanya', 'FCT', 'Municipal', '+234-9-8705678', 'nyanya@fcthealth.ng', 'FC015', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),

-- Expanding Osun State
('Ladoke Akintola University Teaching Hospital', 'Osogbo', 'Osun', 'Osogbo', '+234-35-230123', 'lautech@lautech.edu.ng', 'OS006', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('UNIOSUN Teaching Hospital', 'Osogbo', 'Osun', 'Osogbo', '+234-35-231456', 'uniosun@uniosun.edu.ng', 'OS007', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Ife State Hospital', 'Ile-Ife', 'Osun', 'Ife Central', '+234-36-230789', 'ifestate@osunstate.ng', 'OS008', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Ilesha State Hospital', 'Ilesha', 'Osun', 'Ilesha East', '+234-35-232012', 'ileshastate@osunstate.ng', 'OS009', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Ikirun General Hospital', 'Ikirun', 'Osun', 'Ifelodun', '+234-35-233345', 'ikirun@health.gov.ng', 'OS010', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Expanding Ondo State  
('Federal Medical Centre Owo', 'Owo', 'Ondo', 'Owo', '+234-51-240123', 'fmcowo@health.gov.ng', 'ON006', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('Trauma Centre Ondo', 'Ondo City', 'Ondo', 'Ondo West', '+234-34-610456', 'trauma@ondostate.ng', 'ON007', ARRAY['Emergency Medicine', 'Surgery'], ARRAY['Trauma Center', 'ICU'], true),
('Mother and Child Hospital', 'Akure', 'Ondo', 'Akure South', '+234-34-243789', 'motherchild@ondostate.ng', 'ON008', ARRAY['Obstetrics', 'Pediatrics'], ARRAY['Maternity Ward', 'NICU'], true),
('Ikare General Hospital', 'Ikare', 'Ondo', 'Akoko North East', '+234-51-241012', 'ikare@health.gov.ng', 'ON009', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Owo General Hospital', 'Owo', 'Ondo', 'Owo', '+234-51-242345', 'owo@health.gov.ng', 'ON010', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true);
