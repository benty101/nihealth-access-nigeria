
-- Continue adding more hospitals to reach 500+ total

INSERT INTO public.hospitals (name, address, state, lga, phone, email, license_number, specialties, facilities, is_active) VALUES
-- Nasarawa State
('Dalhatu Araf Specialist Hospital', 'Lafia', 'Nasarawa', 'Lafia', '+234-47-222123', 'dash@nasarawastate.ng', 'NS001', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('Federal Medical Centre Keffi', 'Keffi', 'Nasarawa', 'Keffi', '+234-47-223456', 'fmckeffi@health.gov.ng', 'NS002', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('General Hospital Akwanga', 'Akwanga', 'Nasarawa', 'Akwanga', '+234-47-224789', 'akwangagen@health.gov.ng', 'NS003', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Nasarawa State University Teaching Hospital', 'Keffi', 'Nasarawa', 'Keffi', '+234-47-225012', 'nsuth@nsuk.edu.ng', 'NS004', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('General Hospital Nasarawa', 'Nasarawa Town', 'Nasarawa', 'Nasarawa', '+234-47-226345', 'nasarawagen@health.gov.ng', 'NS005', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Niger State
('Ibrahim Badamasi Babangida Specialist Hospital', 'Minna', 'Niger', 'Chanchaga', '+234-66-220123', 'ibbsh@nigerstate.ng', 'NI001', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('Federal Medical Centre Bida', 'Bida', 'Niger', 'Bida', '+234-66-221456', 'fmcbida@health.gov.ng', 'NI002', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('General Hospital Minna', 'Minna', 'Niger', 'Chanchaga', '+234-66-222789', 'minnegen@health.gov.ng', 'NI003', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Kontagora', 'Kontagora', 'Niger', 'Kontagora', '+234-66-223012', 'kontagoragen@health.gov.ng', 'NI004', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Suleja General Hospital', 'Suleja', 'Niger', 'Suleja', '+234-66-224345', 'sulejagen@health.gov.ng', 'NI005', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Kebbi State
('Federal Medical Centre Birnin Kebbi', 'Birnin Kebbi', 'Kebbi', 'Birnin Kebbi', '+234-68-320123', 'fmcbirninkebbi@health.gov.ng', 'KB001', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('Sir Yahaya Memorial Hospital', 'Birnin Kebbi', 'Kebbi', 'Birnin Kebbi', '+234-68-321456', 'syh@kebbistate.ng', 'KB002', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Argungu', 'Argungu', 'Kebbi', 'Argungu', '+234-68-322789', 'argungungen@health.gov.ng', 'KB003', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Zuru', 'Zuru', 'Kebbi', 'Zuru', '+234-68-323012', 'zurungen@health.gov.ng', 'KB004', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Specialist Hospital Birnin Kebbi', 'Birnin Kebbi', 'Kebbi', 'Birnin Kebbi', '+234-68-324345', 'specialist@kebbistate.ng', 'KB005', ARRAY['Cardiology', 'Orthopedics'], ARRAY['Heart Center', 'Orthopedic Unit'], true),

-- Sokoto State
('Usmanu Danfodiyo University Teaching Hospital', 'Sokoto', 'Sokoto', 'Sokoto North', '+234-60-230123', 'uduth@udusok.edu.ng', 'SK001', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Specialist Hospital Sokoto', 'Sokoto', 'Sokoto', 'Sokoto South', '+234-60-231456', 'specialist@sokotostate.ng', 'SK002', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Gwadabawa', 'Gwadabawa', 'Sokoto', 'Gwadabawa', '+234-60-232789', 'gwadabawagen@health.gov.ng', 'SK003', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Sokoto State University Teaching Hospital', 'Sokoto', 'Sokoto', 'Sokoto North', '+234-60-233012', 'ssuth@ssu.edu.ng', 'SK004', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('General Hospital Tambuwal', 'Tambuwal', 'Sokoto', 'Tambuwal', '+234-60-234345', 'tambuwalgen@health.gov.ng', 'SK005', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Zamfara State
('Federal Medical Centre Gusau', 'Gusau', 'Zamfara', 'Gusau', '+234-63-200123', 'fmcgusau@health.gov.ng', 'ZM001', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('Yariman Bakura Specialist Hospital', 'Gusau', 'Zamfara', 'Gusau', '+234-63-201456', 'ybsh@zamfarastate.ng', 'ZM002', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Kaura Namoda', 'Kaura Namoda', 'Zamfara', 'Kaura Namoda', '+234-63-202789', 'kauranamoda@health.gov.ng', 'ZM003', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Bungudu', 'Bungudu', 'Zamfara', 'Bungudu', '+234-63-203012', 'bungudu@health.gov.ng', 'ZM004', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Tsafe', 'Tsafe', 'Zamfara', 'Tsafe', '+234-63-204345', 'tsafe@health.gov.ng', 'ZM005', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true);
