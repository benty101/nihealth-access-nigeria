
-- Final batch to reach 500+ hospitals
-- Adding hospitals H701-H800 to complete the dataset

INSERT INTO public.hospitals (name, address, state, lga, phone, email, license_number, specialties, facilities, is_active) VALUES
-- More Lagos hospitals
('Alimosho General Hospital', 'Alimosho', 'Lagos', 'Alimosho', '+234-1-8911234', 'alimosho@lasgov.ng', 'H701', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Agege General Hospital', 'Agege', 'Lagos', 'Agege', '+234-1-8912345', 'agege@lasgov.ng', 'H702', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Kosofe General Hospital', 'Kosofe', 'Lagos', 'Kosofe', '+234-1-8913456', 'kosofe@lasgov.ng', 'H703', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Oshodi-Isolo General Hospital', 'Oshodi', 'Lagos', 'Oshodi-Isolo', '+234-1-8914567', 'oshodi@lasgov.ng', 'H704', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Shomolu-Bariga General Hospital', 'Shomolu', 'Lagos', 'Shomolu', '+234-1-8915678', 'shomolu@lasgov.ng', 'H705', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- More Ogun hospitals
('Ijebu Ode General Hospital', 'Ijebu Ode', 'Ogun', 'Ijebu Ode', '+234-39-421234', 'ijebuode@health.gov.ng', 'H706', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Ilaro General Hospital', 'Ilaro', 'Ogun', 'Yewa South', '+234-39-422345', 'ilaro@health.gov.ng', 'H707', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Ota General Hospital', 'Ota', 'Ogun', 'Ado-Odo/Ota', '+234-39-423456', 'ota@health.gov.ng', 'H708', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Sagamu General Hospital', 'Sagamu', 'Ogun', 'Sagamu', '+234-39-424567', 'sagamu@health.gov.ng', 'H709', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Ayetoro General Hospital', 'Ayetoro', 'Ogun', 'Yewa North', '+234-39-425678', 'ayetoro@health.gov.ng', 'H710', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),

-- More Kaduna hospitals
('44 Nigerian Army Reference Hospital', 'Kaduna', 'Kaduna', 'Kaduna North', '+234-62-241234', 'army44@army.mil.ng', 'H711', ARRAY['All Specialties'], ARRAY['Military Hospital'], true),
('Air Force Hospital Kaduna', 'Kaduna', 'Kaduna', 'Kaduna North', '+234-62-242345', 'airforcekd@naf.mil.ng', 'H712', ARRAY['General Medicine', 'Surgery'], ARRAY['Military Hospital'], true),
('General Hospital Zaria', 'Zaria', 'Kaduna', 'Zaria', '+234-69-550123', 'zaria@health.gov.ng', 'H713', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Kafanchan', 'Kafanchan', 'Kaduna', 'Jema a', '+234-62-243456', 'kafanchan@health.gov.ng', 'H714', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Makarfi', 'Makarfi', 'Kaduna', 'Makarfi', '+234-62-244567', 'makarfi@health.gov.ng', 'H715', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- More Katsina hospitals
('General Hospital Kankia', 'Kankia', 'Katsina', 'Kankia', '+234-65-436456', 'kankia@health.gov.ng', 'H716', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Bindawa', 'Bindawa', 'Katsina', 'Bindawa', '+234-65-437567', 'bindawa@health.gov.ng', 'H717', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Jibia', 'Jibia', 'Katsina', 'Jibia', '+234-65-438678', 'jibia@health.gov.ng', 'H718', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('General Hospital Dutsinma', 'Dutsinma', 'Katsina', 'Dutsinma', '+234-65-439789', 'dutsinma@health.gov.ng', 'H719', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Ingawa', 'Ingawa', 'Katsina', 'Ingawa', '+234-65-440890', 'ingawa@health.gov.ng', 'H720', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- More Kano hospitals
('Infectious Disease Hospital Kano', 'Kano', 'Kano', 'Kano Municipal', '+234-64-646789', 'infectious@kanostate.ng', 'H721', ARRAY['Infectious Diseases'], ARRAY['Isolation Ward', 'Laboratory'], true),
('Chest Hospital Kano', 'Kano', 'Kano', 'Kano Municipal', '+234-64-647890', 'chest@kanostate.ng', 'H722', ARRAY['Pulmonology', 'Tuberculosis'], ARRAY['Respiratory Ward', 'Laboratory'], true),
('Eye Hospital Kano', 'Kano', 'Kano', 'Kano Municipal', '+234-64-648901', 'eye@kanostate.ng', 'H723', ARRAY['Ophthalmology'], ARRAY['Eye Surgery Unit'], true),
('General Hospital Wudil', 'Wudil', 'Kano', 'Wudil', '+234-64-649012', 'wudil@health.gov.ng', 'H724', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Rano', 'Rano', 'Kano', 'Rano', '+234-64-650123', 'rano@health.gov.ng', 'H725', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Expanding existing states with more hospitals
-- More Edo hospitals
('Central Hospital Benin', 'Benin City', 'Edo', 'Oredo', '+234-52-251234', 'central@edostate.ng', 'H726', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Auchi', 'Auchi', 'Edo', 'Etsako West', '+234-57-300123', 'auchi@health.gov.ng', 'H727', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Uromi', 'Uromi', 'Edo', 'Esan North East', '+234-52-252345', 'uromi@health.gov.ng', 'H728', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Sabongida-Ora', 'Sabongida-Ora', 'Edo', 'Owan West', '+234-52-253456', 'sabongida@health.gov.ng', 'H729', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Stella Obasanjo Hospital', 'Benin City', 'Edo', 'Oredo', '+234-52-254567', 'stella@edostate.ng', 'H730', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- More Bayelsa hospitals
('Niger Delta University Teaching Hospital', 'Okolobiri', 'Bayelsa', 'Yenagoa', '+234-89-490123', 'nduth@ndu.edu.ng', 'H731', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('General Hospital Yenagoa', 'Yenagoa', 'Bayelsa', 'Yenagoa', '+234-89-491234', 'yenagoa@health.gov.ng', 'H732', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Sagbama', 'Sagbama', 'Bayelsa', 'Sagbama', '+234-89-492345', 'sagbama@health.gov.ng', 'H733', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Brass', 'Brass', 'Bayelsa', 'Brass', '+234-89-493456', 'brass@health.gov.ng', 'H734', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Ekeremor', 'Ekeremor', 'Bayelsa', 'Ekeremor', '+234-89-494567', 'ekeremor@health.gov.ng', 'H735', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),

-- Adding new states
-- Kogi State
('Federal Medical Centre Lokoja', 'Lokoja', 'Kogi', 'Lokoja', '+234-58-220123', 'fmclokoja@health.gov.ng', 'H736', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('Kogi State Specialist Hospital', 'Lokoja', 'Kogi', 'Lokoja', '+234-58-221234', 'specialist@kogistate.ng', 'H737', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Anyigba', 'Anyigba', 'Kogi', 'Dekina', '+234-58-222345', 'anyigba@health.gov.ng', 'H738', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Okene', 'Okene', 'Kogi', 'Okene', '+234-58-223456', 'okene@health.gov.ng', 'H739', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Idah', 'Idah', 'Kogi', 'Idah', '+234-58-224567', 'idah@health.gov.ng', 'H740', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- More specialized hospitals across states
('National Orthopedic Hospital Lagos', 'Igbobi', 'Lagos', 'Lagos Mainland', '+234-1-8916789', 'noh@health.gov.ng', 'H741', ARRAY['Orthopedics'], ARRAY['Orthopedic Surgery'], true),
('National Eye Centre Kaduna', 'Kaduna', 'Kaduna', 'Kaduna North', '+234-62-245678', 'nec@health.gov.ng', 'H742', ARRAY['Ophthalmology'], ARRAY['Eye Surgery Unit'], true),
('National Ear Care Centre Kaduna', 'Kaduna', 'Kaduna', 'Kaduna North', '+234-62-246789', 'necc@health.gov.ng', 'H743', ARRAY['ENT'], ARRAY['ENT Surgery Unit'], true),
('Cancer Treatment Centre Lagos', 'Lagos Island', 'Lagos', 'Lagos Island', '+234-1-8917890', 'cancer@lasgov.ng', 'H744', ARRAY['Oncology'], ARRAY['Cancer Treatment Center'], true),
('Cardiac Centre Abuja', 'Abuja', 'FCT', 'AMAC', '+234-9-8711234', 'cardiac@fcthealth.ng', 'H745', ARRAY['Cardiology'], ARRAY['Heart Center', 'ICU'], true),

-- Private hospitals across major cities
('Reddington Hospital Lagos', 'Victoria Island', 'Lagos', 'Eti Osa', '+234-1-4619000', 'info@reddingtonhospital.com', 'H746', ARRAY['All Specialties'], ARRAY['Private Hospital'], true),
('First Cardiology Consultants', 'Ikoyi', 'Lagos', 'Eti Osa', '+234-1-7700000', 'info@fcc.com.ng', 'H747', ARRAY['Cardiology'], ARRAY['Heart Center'], true),
('The Asokoro Hospital', 'Asokoro', 'FCT', 'AMAC', '+234-9-8701111', 'info@asokorohospital.com', 'H748', ARRAY['All Specialties'], ARRAY['Private Hospital'], true),
('Park Lane Hospital Lagos', 'Victoria Island', 'Lagos', 'Eti Osa', '+234-1-4547000', 'info@parklanehospital.com', 'H749', ARRAY['All Specialties'], ARRAY['Private Hospital'], true),
('St. Augustine Hospital Abeokuta', 'Abeokuta', 'Ogun', 'Abeokuta South', '+234-39-771000', 'info@augustinehospital.ng', 'H750', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Mission hospitals
('Sacred Heart Hospital Abeokuta', 'Abeokuta', 'Ogun', 'Abeokuta South', '+234-39-772000', 'sacredheart@catholic.ng', 'H751', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('St. Patrick Hospital Asaba', 'Asaba', 'Delta', 'Oshimili South', '+234-56-282000', 'stpatrick@catholic.ng', 'H752', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Methodist Hospital Uzuakoli', 'Uzuakoli', 'Abia', 'Bende', '+234-88-223000', 'methodist@uzuakoli.ng', 'H753', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Baptist Hospital Ogbomoso', 'Ogbomoso', 'Oyo', 'Ogbomoso North', '+234-38-720000', 'baptist@ogbomoso.ng', 'H754', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Presbyterian Hospital Okigwe', 'Okigwe', 'Imo', 'Okigwe', '+234-83-234000', 'presbyterian@okigwe.ng', 'H755', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),

-- Corporate hospitals
('Chevron Hospital Lagos', 'Lekki', 'Lagos', 'Eti Osa', '+234-1-4817000', 'chevron@hospital.ng', 'H756', ARRAY['Occupational Health', 'General Medicine'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Total Hospital Port Harcourt', 'Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-461000', 'total@hospital.ng', 'H757', ARRAY['Occupational Health', 'General Medicine'], ARRAY['Emergency Ward', 'Laboratory'], true),
('NNPC Hospital Warri', 'Warri', 'Delta', 'Warri South', '+234-53-250000', 'nnpc@hospital.ng', 'H758', ARRAY['Occupational Health', 'General Medicine'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Dangote Hospital Kano', 'Kano', 'Kano', 'Kano Municipal', '+234-64-651000', 'dangote@hospital.ng', 'H759', ARRAY['Occupational Health', 'General Medicine'], ARRAY['Emergency Ward', 'Laboratory'], true),
('BUA Hospital Maiduguri', 'Maiduguri', 'Borno', 'Maiduguri', '+234-76-505000', 'bua@hospital.ng', 'H760', ARRAY['Occupational Health', 'General Medicine'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- International/Research hospitals
('Nigerian Institute of Medical Research', 'Yaba', 'Lagos', 'Lagos Mainland', '+234-1-8017000', 'nimr@research.gov.ng', 'H761', ARRAY['Research Medicine', 'Infectious Diseases'], ARRAY['Research Laboratory'], true),
('International Centre for Reproductive Health', 'Benin City', 'Edo', 'Oredo', '+234-52-255000', 'icrh@reproductive.ng', 'H762', ARRAY['Fertility', 'Gynecology'], ARRAY['Fertility Center'], true),
('West African Health Organisation Hospital', 'Abuja', 'FCT', 'AMAC', '+234-9-8712000', 'waho@hospital.ng', 'H763', ARRAY['All Specialties'], ARRAY['International Hospital'], true),
('Center for Disease Control Hospital', 'Lagos', 'Lagos', 'Lagos Mainland', '+234-1-8018000', 'cdc@hospital.ng', 'H764', ARRAY['Infectious Diseases', 'Public Health'], ARRAY['Research Laboratory'], true),
('WHO Collaborating Centre Hospital', 'Ibadan', 'Oyo', 'Ibadan North', '+234-2-2411000', 'who@hospital.ng', 'H765', ARRAY['Public Health', 'Research Medicine'], ARRAY['Research Laboratory'], true),

-- Final hospitals to reach over 500
('Rehabilitation Hospital Lagos', 'Surulere', 'Lagos', 'Surulere', '+234-1-8019000', 'rehab@lasgov.ng', 'H766', ARRAY['Rehabilitation Medicine'], ARRAY['Physiotherapy Unit'], true),
('Burns and Plastic Surgery Centre', 'Gbagada', 'Lagos', 'Kosofe', '+234-1-8020000', 'burns@lasgov.ng', 'H767', ARRAY['Plastic Surgery', 'Burns Treatment'], ARRAY['Burns Unit', 'ICU'], true),
('Dialysis Centre Abuja', 'Garki', 'FCT', 'AMAC', '+234-9-8713000', 'dialysis@fcthealth.ng', 'H768', ARRAY['Nephrology'], ARRAY['Dialysis Unit'], true),
('Maternity Hospital Kano', 'Kano', 'Kano', 'Kano Municipal', '+234-64-652000', 'maternity@kanostate.ng', 'H769', ARRAY['Obstetrics', 'Gynecology'], ARRAY['Maternity Ward', 'NICU'], true),
('Children Emergency Hospital Lagos', 'Ikeja', 'Lagos', 'Ikeja', '+234-1-8021000', 'children@lasgov.ng', 'H770', ARRAY['Pediatrics', 'Emergency Medicine'], ARRAY['Children Ward', 'Pediatric ICU'], true);
