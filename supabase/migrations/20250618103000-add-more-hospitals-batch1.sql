
-- Add more hospitals to reach 500+ total, using unique license numbers
-- Adding hospitals to states with fewer entries and new states

INSERT INTO public.hospitals (name, address, state, lga, phone, email, license_number, specialties, facilities, is_active) VALUES
-- Rivers State (Port Harcourt area)
('Port Harcourt Medical Center', 'Plot 15, Aba Road', 'Rivers', 'Port Harcourt', '+234-84-230567', 'info@phmcenter.ng', 'RV001', ARRAY['Cardiology', 'Neurology', 'Surgery'], ARRAY['ICU', 'Emergency Ward', 'Laboratory'], true),
('Garden City Hospital', 'Old GRA, Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-234890', 'care@gardencity.ng', 'RV002', ARRAY['Pediatrics', 'Obstetrics'], ARRAY['Maternity Ward', 'NICU'], true),
('Trans-Amadi Hospital', 'Trans-Amadi Industrial Layout', 'Rivers', 'Port Harcourt', '+234-84-235123', 'admin@transamadi.ng', 'RV003', ARRAY['General Medicine', 'Surgery'], ARRAY['Operating Theater', 'Laboratory'], true),
('Braithwaite Memorial Hospital', 'Braithwaite Street, Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-232456', 'info@bmhph.ng', 'RV004', ARRAY['Internal Medicine', 'Emergency'], ARRAY['Emergency Ward', 'ICU'], true),
('University of Port Harcourt Teaching Hospital', 'Choba Campus', 'Rivers', 'Port Harcourt', '+234-84-817234', 'upth@uniport.edu.ng', 'RV005', ARRAY['All Specialties'], ARRAY['Teaching Hospital', 'Research Center'], true),

-- Delta State
('Delta State University Teaching Hospital', 'Oghara', 'Delta', 'Ethiope West', '+234-54-600123', 'delsu@delsuth.ng', 'DT001', ARRAY['All Specialties'], ARRAY['Teaching Hospital', 'Research'], true),
('Central Hospital Warri', 'Warri Township', 'Delta', 'Warri South', '+234-53-250789', 'warri@centralhospital.ng', 'DT002', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Sacred Heart Hospital Abbi', 'Abbi Town', 'Delta', 'Udu', '+234-53-251456', 'abbi@sacredheart.ng', 'DT003', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Lily Hospital Warri', 'Effurun-Sapele Road', 'Delta', 'Uvwie', '+234-53-252789', 'warri@lilyhospitals.ng', 'DT004', ARRAY['Oncology', 'Cardiology'], ARRAY['Cancer Center', 'ICU'], true),
('Federal Medical Centre Asaba', 'Asaba', 'Delta', 'Oshimili South', '+234-56-280123', 'fmcasaba@health.gov.ng', 'DT005', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),

-- Cross River State
('University of Calabar Teaching Hospital', 'Calabar', 'Cross River', 'Calabar Municipal', '+234-87-234567', 'ucth@unical.edu.ng', 'CR001', ARRAY['All Specialties'], ARRAY['Teaching Hospital', 'Research'], true),
('General Hospital Calabar', 'Calabar', 'Cross River', 'Calabar Municipal', '+234-87-235890', 'genhospcal@health.gov.ng', 'CR002', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Navy Hospital Calabar', 'Naval Base Calabar', 'Cross River', 'Calabar Municipal', '+234-87-236123', 'navyhospcal@navy.mil.ng', 'CR003', ARRAY['General Medicine', 'Surgery'], ARRAY['Military Hospital'], true),
('St. Joseph Hospital Calabar', 'Calabar South', 'Cross River', 'Calabar South', '+234-87-237456', 'stjoseph@catholic.ng', 'CR004', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Mercy Hospital Calabar', 'Watt Market Road', 'Cross River', 'Calabar Municipal', '+234-87-238789', 'mercy@mercyhospital.ng', 'CR005', ARRAY['Pediatrics', 'General Medicine'], ARRAY['Children Ward', 'Laboratory'], true),

-- Akwa Ibom State (expanding)
('Ibom Specialist Hospital', 'Uyo', 'Akwa Ibom', 'Uyo', '+234-85-200567', 'ibomspec@aksgov.ng', 'AK006', ARRAY['Cardiology', 'Neurosurgery'], ARRAY['Heart Center', 'Neurosurgery Unit'], true),
('St. Luke Hospital Anua', 'Anua, Uyo', 'Akwa Ibom', 'Uyo', '+234-85-201890', 'stluke@anua.ng', 'AK007', ARRAY['General Medicine', 'Surgery'], ARRAY['Operating Theater', 'Laboratory'], true),
('Cottage Hospital Ikot Ekpene', 'Ikot Ekpene', 'Akwa Ibom', 'Ikot Ekpene', '+234-85-202123', 'cottage@ikotekpene.ng', 'AK008', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Emmanuel Hospital Eket', 'Eket', 'Akwa Ibom', 'Eket', '+234-85-203456', 'emmanuel@eket.ng', 'AK009', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Meridian Hospital Uyo', 'Aka Road, Uyo', 'Akwa Ibom', 'Uyo', '+234-85-204789', 'meridian@uyo.ng', 'AK010', ARRAY['Oncology', 'Radiology'], ARRAY['Cancer Center', 'Imaging'], true),

-- Benue State
('Benue State University Teaching Hospital', 'Makurdi', 'Benue', 'Makurdi', '+234-44-533123', 'bsuth@bsum.edu.ng', 'BN001', ARRAY['All Specialties'], ARRAY['Teaching Hospital', 'Research'], true),
('Federal Medical Centre Makurdi', 'Makurdi', 'Benue', 'Makurdi', '+234-44-534456', 'fmcmakurdi@health.gov.ng', 'BN002', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('General Hospital Gboko', 'Gboko', 'Benue', 'Gboko', '+234-44-535789', 'gbokogen@health.gov.ng', 'BN003', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('St. Theresa Hospital Makurdi', 'High Level, Makurdi', 'Benue', 'Makurdi', '+234-44-536012', 'sttheresa@catholic.ng', 'BN004', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Benue State Specialist Hospital', 'Makurdi', 'Benue', 'Makurdi', '+234-44-537345', 'specialist@benuestate.ng', 'BN005', ARRAY['Cardiology', 'Orthopedics'], ARRAY['Heart Center', 'Orthopedic Unit'], true),

-- Taraba State (expanding)
('Federal Medical Centre Jalingo', 'Jalingo', 'Taraba', 'Jalingo', '+234-79-223456', 'fmcjalingo@health.gov.ng', 'TR006', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('General Hospital Wukari', 'Wukari', 'Taraba', 'Wukari', '+234-79-224789', 'wukarigen@health.gov.ng', 'TR007', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Specialist Hospital Jalingo', 'Jalingo', 'Taraba', 'Jalingo', '+234-79-225012', 'specialist@tarabastate.ng', 'TR008', ARRAY['Cardiology', 'Neurology'], ARRAY['Heart Center', 'Neurology Unit'], true),
('St. Francis Hospital Gembu', 'Gembu', 'Taraba', 'Sardauna', '+234-79-226345', 'stfrancis@gembu.ng', 'TR009', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Bali', 'Bali', 'Taraba', 'Bali', '+234-79-227678', 'baligen@health.gov.ng', 'TR010', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true);
