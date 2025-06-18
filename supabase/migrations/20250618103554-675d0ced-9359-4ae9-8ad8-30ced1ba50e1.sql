
-- Add more hospitals with completely unique license numbers starting from 500
-- This ensures no conflicts with existing data

INSERT INTO public.hospitals (name, address, state, lga, phone, email, license_number, specialties, facilities, is_active) VALUES
-- Lagos State (using sequential numbers starting from 500)
('Lagos Island Maternity Hospital', 'Lagos Island', 'Lagos', 'Lagos Island', '+234-1-8901234', 'maternity@lasgov.ng', 'H500', ARRAY['Obstetrics', 'Gynecology'], ARRAY['Maternity Ward', 'NICU'], true),
('Mainland Hospital Yaba', 'Yaba', 'Lagos', 'Lagos Mainland', '+234-1-8902345', 'mainland@lasgov.ng', 'H501', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'ICU'], true),
('Harvey Road Health Centre', 'Yaba', 'Lagos', 'Lagos Mainland', '+234-1-8903456', 'harvey@lasgov.ng', 'H502', ARRAY['Primary Care'], ARRAY['Outpatient Clinic'], true),
('Isolo General Hospital', 'Isolo', 'Lagos', 'Isolo', '+234-1-8904567', 'isolo@lasgov.ng', 'H503', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Gbagada General Hospital', 'Gbagada', 'Lagos', 'Kosofe', '+234-1-8905678', 'gbagada@lasgov.ng', 'H504', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- FCT Abuja 
('National Orthopedic Hospital', 'Dala, Abuja', 'FCT', 'Gwagwalada', '+234-9-8701234', 'noh@health.gov.ng', 'H505', ARRAY['Orthopedics'], ARRAY['Orthopedic Surgery'], true),
('Wuse General Hospital', 'Wuse', 'FCT', 'Municipal', '+234-9-8702345', 'wuse@fcthealth.ng', 'H506', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Garki Hospital', 'Garki', 'FCT', 'Municipal', '+234-9-8703456', 'garki@fcthealth.ng', 'H507', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Kubwa General Hospital', 'Kubwa', 'FCT', 'Bwari', '+234-9-8704567', 'kubwa@fcthealth.ng', 'H508', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Nyanya General Hospital', 'Nyanya', 'FCT', 'Municipal', '+234-9-8705678', 'nyanya@fcthealth.ng', 'H509', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),

-- Kano State
('Murtala Muhammad Specialist Hospital', 'Kano', 'Kano', 'Kano Municipal', '+234-64-636789', 'mmsh@kanostate.ng', 'H510', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('Infectious Disease Hospital', 'Kano', 'Kano', 'Kano Municipal', '+234-64-637890', 'infectious@kanostate.ng', 'H511', ARRAY['Infectious Diseases'], ARRAY['Isolation Ward'], true),
('Wudil General Hospital', 'Wudil', 'Kano', 'Wudil', '+234-64-638901', 'wudil@health.gov.ng', 'H512', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Gwarzo General Hospital', 'Gwarzo', 'Kano', 'Gwarzo', '+234-64-639012', 'gwarzo@health.gov.ng', 'H513', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Rano General Hospital', 'Rano', 'Kano', 'Rano', '+234-64-640123', 'rano@health.gov.ng', 'H514', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Rivers State
('Port Harcourt Medical Center', 'Plot 15, Aba Road', 'Rivers', 'Port Harcourt', '+234-84-230567', 'info@phmcenter.ng', 'H515', ARRAY['Cardiology', 'Neurology', 'Surgery'], ARRAY['ICU', 'Emergency Ward', 'Laboratory'], true),
('Garden City Hospital', 'Old GRA, Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-234890', 'care@gardencity.ng', 'H516', ARRAY['Pediatrics', 'Obstetrics'], ARRAY['Maternity Ward', 'NICU'], true),
('Trans-Amadi Hospital', 'Trans-Amadi Industrial Layout', 'Rivers', 'Port Harcourt', '+234-84-235123', 'admin@transamadi.ng', 'H517', ARRAY['General Medicine', 'Surgery'], ARRAY['Operating Theater', 'Laboratory'], true),
('Braithwaite Memorial Hospital', 'Braithwaite Street, Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-232456', 'info@bmhph.ng', 'H518', ARRAY['Internal Medicine', 'Emergency'], ARRAY['Emergency Ward', 'ICU'], true),
('University of Port Harcourt Teaching Hospital', 'Choba Campus', 'Rivers', 'Port Harcourt', '+234-84-817234', 'upth@uniport.edu.ng', 'H519', ARRAY['All Specialties'], ARRAY['Teaching Hospital', 'Research Center'], true),

-- Ogun State
('Gateway Polytechnic Medical Centre', 'Saapade', 'Ogun', 'Remo North', '+234-39-710123', 'gatewaypoly@medcentre.ng', 'H520', ARRAY['General Medicine'], ARRAY['Outpatient Clinic'], true),
('Olabisi Onabanjo University Teaching Hospital', 'Sagamu', 'Ogun', 'Sagamu', '+234-37-640456', 'oouth@oouagoiwoye.edu.ng', 'H521', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Ijebu-Ode General Hospital', 'Ijebu-Ode', 'Ogun', 'Ijebu-Ode', '+234-37-432789', 'ijebuode@health.gov.ng', 'H522', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Sagamu State Hospital', 'Sagamu', 'Ogun', 'Sagamu', '+234-37-641012', 'sagamu@ogunstate.ng', 'H523', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Abeokuta South Medical Centre', 'Abeokuta', 'Ogun', 'Abeokuta South', '+234-39-711345', 'abesouth@ogunstate.ng', 'H524', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Delta State
('Delta State University Teaching Hospital', 'Oghara', 'Delta', 'Ethiope West', '+234-54-600123', 'delsu@delsuth.ng', 'H525', ARRAY['All Specialties'], ARRAY['Teaching Hospital', 'Research'], true),
('Central Hospital Warri', 'Warri Township', 'Delta', 'Warri South', '+234-53-250789', 'warri@centralhospital.ng', 'H526', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Sacred Heart Hospital Abbi', 'Abbi Town', 'Delta', 'Udu', '+234-53-251456', 'abbi@sacredheart.ng', 'H527', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Lily Hospital Warri', 'Effurun-Sapele Road', 'Delta', 'Uvwie', '+234-53-252789', 'warri@lilyhospitals.ng', 'H528', ARRAY['Oncology', 'Cardiology'], ARRAY['Cancer Center', 'ICU'], true),
('Federal Medical Centre Asaba', 'Asaba', 'Delta', 'Oshimili South', '+234-56-280123', 'fmcasaba@health.gov.ng', 'H529', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),

-- Cross River State
('University of Calabar Teaching Hospital', 'Calabar', 'Cross River', 'Calabar Municipal', '+234-87-234567', 'ucth@unical.edu.ng', 'H530', ARRAY['All Specialties'], ARRAY['Teaching Hospital', 'Research'], true),
('General Hospital Calabar', 'Calabar', 'Cross River', 'Calabar Municipal', '+234-87-235890', 'genhospcal@health.gov.ng', 'H531', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Navy Hospital Calabar', 'Naval Base Calabar', 'Cross River', 'Calabar Municipal', '+234-87-236123', 'navyhospcal@navy.mil.ng', 'H532', ARRAY['General Medicine', 'Surgery'], ARRAY['Military Hospital'], true),
('St. Joseph Hospital Calabar', 'Calabar South', 'Cross River', 'Calabar South', '+234-87-237456', 'stjoseph@catholic.ng', 'H533', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Mercy Hospital Calabar', 'Watt Market Road', 'Cross River', 'Calabar Municipal', '+234-87-238789', 'mercy@mercyhospital.ng', 'H534', ARRAY['Pediatrics', 'General Medicine'], ARRAY['Children Ward', 'Laboratory'], true),

-- Akwa Ibom State
('Ibom Specialist Hospital', 'Uyo', 'Akwa Ibom', 'Uyo', '+234-85-200567', 'ibomspec@aksgov.ng', 'H535', ARRAY['Cardiology', 'Neurosurgery'], ARRAY['Heart Center', 'Neurosurgery Unit'], true),
('St. Luke Hospital Anua', 'Anua, Uyo', 'Akwa Ibom', 'Uyo', '+234-85-201890', 'stluke@anua.ng', 'H536', ARRAY['General Medicine', 'Surgery'], ARRAY['Operating Theater', 'Laboratory'], true),
('Cottage Hospital Ikot Ekpene', 'Ikot Ekpene', 'Akwa Ibom', 'Ikot Ekpene', '+234-85-202123', 'cottage@ikotekpene.ng', 'H537', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Emmanuel Hospital Eket', 'Eket', 'Akwa Ibom', 'Eket', '+234-85-203456', 'emmanuel@eket.ng', 'H538', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Meridian Hospital Uyo', 'Aka Road, Uyo', 'Akwa Ibom', 'Uyo', '+234-85-204789', 'meridian@uyo.ng', 'H539', ARRAY['Oncology', 'Radiology'], ARRAY['Cancer Center', 'Imaging'], true),

-- Benue State
('Benue State University Teaching Hospital', 'Makurdi', 'Benue', 'Makurdi', '+234-44-533123', 'bsuth@bsum.edu.ng', 'H540', ARRAY['All Specialties'], ARRAY['Teaching Hospital', 'Research'], true),
('Federal Medical Centre Makurdi', 'Makurdi', 'Benue', 'Makurdi', '+234-44-534456', 'fmcmakurdi@health.gov.ng', 'H541', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('General Hospital Gboko', 'Gboko', 'Benue', 'Gboko', '+234-44-535789', 'gbokogen@health.gov.ng', 'H542', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('St. Theresa Hospital Makurdi', 'High Level, Makurdi', 'Benue', 'Makurdi', '+234-44-536012', 'sttheresa@catholic.ng', 'H543', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Benue State Specialist Hospital', 'Makurdi', 'Benue', 'Makurdi', '+234-44-537345', 'specialist@benuestate.ng', 'H544', ARRAY['Cardiology', 'Orthopedics'], ARRAY['Heart Center', 'Orthopedic Unit'], true),

-- Niger State
('Ibrahim Badamasi Babangida Specialist Hospital', 'Minna', 'Niger', 'Chanchaga', '+234-66-220123', 'ibbsh@nigerstate.ng', 'H545', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('Federal Medical Centre Bida', 'Bida', 'Niger', 'Bida', '+234-66-221456', 'fmcbida@health.gov.ng', 'H546', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('General Hospital Minna', 'Minna', 'Niger', 'Chanchaga', '+234-66-222789', 'minnegen@health.gov.ng', 'H547', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Kontagora', 'Kontagora', 'Niger', 'Kontagora', '+234-66-223012', 'kontagoragen@health.gov.ng', 'H548', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Suleja General Hospital', 'Suleja', 'Niger', 'Suleja', '+234-66-224345', 'sulejagen@health.gov.ng', 'H549', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true);
