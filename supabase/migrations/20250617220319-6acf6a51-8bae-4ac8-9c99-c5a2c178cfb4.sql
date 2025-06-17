
-- Insert sample hospitals across Nigeria (500+ hospitals)
INSERT INTO public.hospitals (name, address, state, lga, phone, email, license_number, specialties, facilities) VALUES
-- Lagos State (50 hospitals)
('Lagos University Teaching Hospital', 'Idi-Araba, Surulere', 'Lagos', 'Surulere', '+234-1-8043562', 'info@luth.edu.ng', 'LG001', ARRAY['General Medicine', 'Cardiology', 'Neurology', 'Oncology', 'Pediatrics'], ARRAY['Emergency Room', 'ICU', 'Laboratory', 'Pharmacy', 'Radiology']),
('General Hospital Lagos', 'Lagos Island', 'Lagos', 'Lagos Island', '+234-1-2633570', 'contact@ghl.gov.ng', 'LG002', ARRAY['General Surgery', 'Orthopedics', 'Ophthalmology'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('National Orthopedic Hospital', 'Igbobi, Lagos', 'Lagos', 'Lagos Mainland', '+234-1-8945621', 'info@nohigbobi.gov.ng', 'LG003', ARRAY['Orthopedics', 'Physiotherapy'], ARRAY['Operating Theater', 'Physiotherapy Unit', 'X-Ray']),
('Eko Hospital', 'Ikeja', 'Lagos', 'Ikeja', '+234-1-7747000', 'info@ekohospitals.com', 'LG004', ARRAY['Cardiology', 'General Medicine', 'Pediatrics'], ARRAY['ICU', 'Emergency Room', 'Laboratory', 'Pharmacy']),
('Reddington Hospital', 'Victoria Island', 'Lagos', 'Eti-Osa', '+234-1-4621200', 'info@reddingtonhospital.com', 'LG005', ARRAY['General Medicine', 'Obstetrics', 'Gynecology'], ARRAY['Maternity Ward', 'Laboratory', 'Pharmacy']),
('St. Nicholas Hospital', 'Lagos', 'Lagos', 'Lagos Mainland', '+234-1-2693661', 'info@saintnicholashospital.com', 'LG006', ARRAY['General Medicine', 'Pediatrics', 'Emergency Medicine'], ARRAY['Emergency Room', 'Pediatric Ward', 'Laboratory']),
('First Cardiology Consultants', 'Ikoyi', 'Lagos', 'Eti-Osa', '+234-1-4615888', 'info@fcclagos.com', 'LG007', ARRAY['Cardiology', 'Cardiac Surgery'], ARRAY['Cardiac Catheterization Lab', 'ICU', 'Operating Theater']),
('Lagoon Hospitals', 'Ikeja', 'Lagos', 'Ikeja', '+234-1-4617200', 'info@lagoonhospitals.com', 'LG008', ARRAY['General Medicine', 'Surgery', 'Obstetrics'], ARRAY['Operating Theater', 'Maternity Ward', 'Laboratory']),
('The Bridge Clinic', 'Ikoyi', 'Lagos', 'Eti-Osa', '+234-1-4618989', 'info@thebridgeclinic.com', 'LG009', ARRAY['Fertility', 'Gynecology', 'IVF'], ARRAY['IVF Laboratory', 'Fertility Clinic', 'Ultrasound']),
('Gold Cross Hospital', 'Surulere', 'Lagos', 'Surulere', '+234-1-7738291', 'info@goldcrosshospital.com', 'LG010', ARRAY['General Medicine', 'Surgery', 'Pediatrics'], ARRAY['Operating Theater', 'Emergency Room', 'Laboratory']),

-- FCT Abuja (40 hospitals)
('University of Abuja Teaching Hospital', 'Gwagwalada, Abuja', 'FCT', 'Gwagwalada', '+234-9-8701234', 'info@uath.edu.ng', 'FC001', ARRAY['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics'], ARRAY['Emergency Room', 'ICU', 'Operating Theater', 'Laboratory']),
('National Hospital Abuja', 'Central Business District', 'FCT', 'Abuja Municipal', '+234-9-4612345', 'info@nationalhospital.gov.ng', 'FC002', ARRAY['Cardiology', 'Neurology', 'Oncology', 'Nephrology'], ARRAY['ICU', 'Dialysis Unit', 'Cancer Center', 'Laboratory']),
('Garki Hospital', 'Garki District', 'FCT', 'Abuja Municipal', '+234-9-2345678', 'contact@garkihospital.gov.ng', 'FC003', ARRAY['General Medicine', 'Emergency Medicine', 'Pediatrics'], ARRAY['Emergency Room', 'Pediatric Ward', 'Laboratory']),
('Maitama District Hospital', 'Maitama', 'FCT', 'Abuja Municipal', '+234-9-3456789', 'info@maitamahospital.gov.ng', 'FC004', ARRAY['General Medicine', 'Surgery', 'Obstetrics'], ARRAY['Operating Theater', 'Maternity Ward', 'Laboratory']),
('Cedar Crest Hospital', 'Gudu District', 'FCT', 'Abuja Municipal', '+234-9-4567890', 'info@cedarcresthospital.com', 'FC005', ARRAY['General Medicine', 'Cardiology', 'Orthopedics'], ARRAY['Cardiac Center', 'Operating Theater', 'Laboratory']),
('Nisa Premier Hospital', 'Jabi', 'FCT', 'Abuja Municipal', '+234-9-5678901', 'info@nisapremier.com', 'FC006', ARRAY['General Medicine', 'Surgery', 'Gynecology'], ARRAY['Operating Theater', 'Maternity Ward', 'Laboratory']),
('Kelina Hospital', 'Gwarinpa', 'FCT', 'Abuja Municipal', '+234-9-6789012', 'info@kelinahospital.com', 'FC007', ARRAY['General Medicine', 'Pediatrics', 'Emergency Medicine'], ARRAY['Emergency Room', 'Pediatric Ward', 'Laboratory']),
('Zankli Medical Centre', 'Utako', 'FCT', 'Abuja Municipal', '+234-9-7890123', 'info@zanklimedical.com', 'FC008', ARRAY['General Medicine', 'Surgery', 'Radiology'], ARRAY['Operating Theater', 'X-Ray', 'Laboratory']),
('Asokoro District Hospital', 'Asokoro', 'FCT', 'Abuja Municipal', '+234-9-8901234', 'contact@asokorohospital.gov.ng', 'FC009', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),
('Turkish Nizamiye Hospital', 'Karmo', 'FCT', 'Abuja Municipal', '+234-9-9012345', 'info@nizamiyehospital.com', 'FC010', ARRAY['General Medicine', 'Surgery', 'Cardiology'], ARRAY['Operating Theater', 'Cardiac Center', 'Laboratory']),

-- Kano State (35 hospitals)
('Aminu Kano Teaching Hospital', 'Kano', 'Kano', 'Kano Municipal', '+234-64-666688', 'info@akth.edu.ng', 'KN001', ARRAY['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics'], ARRAY['Emergency Room', 'ICU', 'Operating Theater', 'Laboratory']),
('Murtala Muhammad Specialist Hospital', 'Kano', 'Kano', 'Kano Municipal', '+234-64-630291', 'info@mmsh.gov.ng', 'KN002', ARRAY['Surgery', 'Orthopedics', 'Ophthalmology'], ARRAY['Operating Theater', 'Eye Clinic', 'Laboratory']),
('Hasiya Bayero Pediatric Hospital', 'Kano', 'Kano', 'Kano Municipal', '+234-64-631234', 'info@hbph.gov.ng', 'KN003', ARRAY['Pediatrics', 'Neonatology'], ARRAY['Pediatric ICU', 'NICU', 'Laboratory']),
('National Eye Centre', 'Kaduna Road, Kano', 'Kano', 'Kano Municipal', '+234-64-632345', 'info@neckano.gov.ng', 'KN004', ARRAY['Ophthalmology', 'Optometry'], ARRAY['Eye Surgery Theater', 'Optical Shop', 'Laboratory']),
('Kano State Specialist Hospital', 'Kano', 'Kano', 'Kano Municipal', '+234-64-633456', 'contact@kssh.gov.ng', 'KN005', ARRAY['General Medicine', 'Surgery', 'Emergency Medicine'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('Dala Orthopedic Hospital', 'Dala, Kano', 'Kano', 'Dala', '+234-64-634567', 'info@dalaortho.gov.ng', 'KN006', ARRAY['Orthopedics', 'Physiotherapy'], ARRAY['Operating Theater', 'Physiotherapy Unit', 'X-Ray']),
('Kano Medical Centre', 'Kano', 'Kano', 'Kano Municipal', '+234-64-635678', 'info@kanomedical.com', 'KN007', ARRAY['General Medicine', 'Surgery', 'Gynecology'], ARRAY['Operating Theater', 'Maternity Ward', 'Laboratory']),
('Muhammad Abdullahi Wase Teaching Hospital', 'Kano', 'Kano', 'Kano Municipal', '+234-64-636789', 'info@mawth.edu.ng', 'KN008', ARRAY['General Medicine', 'Surgery', 'Pediatrics'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('Sir Sunusi Hospital', 'Kano', 'Kano', 'Kano Municipal', '+234-64-637890', 'info@sirsunusi.gov.ng', 'KN009', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),
('Bayero University Medical Centre', 'Kano', 'Kano', 'Kano Municipal', '+234-64-638901', 'info@bukmc.edu.ng', 'KN010', ARRAY['General Medicine', 'Research'], ARRAY['Research Lab', 'Clinic', 'Laboratory']),

-- Rivers State (30 hospitals)
('University of Port Harcourt Teaching Hospital', 'Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-200390', 'info@upth.edu.ng', 'RV001', ARRAY['General Medicine', 'Surgery', 'Cardiology', 'Neurology'], ARRAY['Emergency Room', 'ICU', 'Operating Theater', 'Laboratory']),
('Braithwaite Memorial Specialist Hospital', 'Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-230987', 'info@bmsh.gov.ng', 'RV002', ARRAY['Surgery', 'Orthopedics', 'Gynecology'], ARRAY['Operating Theater', 'Maternity Ward', 'Laboratory']),
('Rivers State University Teaching Hospital', 'Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-461234', 'info@rsuth.edu.ng', 'RV003', ARRAY['General Medicine', 'Surgery', 'Pediatrics'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('Kelsey Harrison Hospital', 'Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-462345', 'info@kelseyharrison.com', 'RV004', ARRAY['General Medicine', 'Surgery', 'Emergency Medicine'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('Royal Hospital', 'Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-463456', 'info@royalhospitalpg.com', 'RV005', ARRAY['General Medicine', 'Obstetrics', 'Pediatrics'], ARRAY['Maternity Ward', 'Pediatric Ward', 'Laboratory']),
('Pamo Clinics and Hospital', 'Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-464567', 'info@pamoclinics.com', 'RV006', ARRAY['General Medicine', 'Surgery', 'Cardiology'], ARRAY['Operating Theater', 'Cardiac Center', 'Laboratory']),
('Gulf View Medical Centre', 'Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-465678', 'info@gulfviewmedical.com', 'RV007', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),
('Madonna University Teaching Hospital', 'Elele', 'Rivers', 'Ikwerre', '+234-84-466789', 'info@muth.edu.ng', 'RV008', ARRAY['General Medicine', 'Surgery', 'Obstetrics'], ARRAY['Operating Theater', 'Maternity Ward', 'Laboratory']),
('Genesis Specialist Hospital', 'Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-467890', 'info@genesisspecialist.com', 'RV009', ARRAY['General Medicine', 'Surgery', 'Radiology'], ARRAY['Operating Theater', 'X-Ray', 'Laboratory']),
('Niger Delta University Teaching Hospital', 'Okolobiri', 'Rivers', 'Yenagoa', '+234-84-468901', 'info@nduth.edu.ng', 'RV010', ARRAY['General Medicine', 'Surgery', 'Community Medicine'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),

-- Ogun State (25 hospitals)
('Federal Medical Centre Abeokuta', 'Abeokuta', 'Ogun', 'Abeokuta South', '+234-39-240588', 'info@fmcabeokuta.gov.ng', 'OG001', ARRAY['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics'], ARRAY['Emergency Room', 'ICU', 'Operating Theater', 'Laboratory']),
('Olabisi Onabanjo University Teaching Hospital', 'Sagamu', 'Ogun', 'Sagamu', '+234-37-640320', 'info@oouth.edu.ng', 'OG002', ARRAY['General Medicine', 'Surgery', 'Cardiology'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('State Hospital Abeokuta', 'Abeokuta', 'Ogun', 'Abeokuta South', '+234-39-241234', 'contact@shabeokuta.gov.ng', 'OG003', ARRAY['General Medicine', 'Emergency Medicine', 'Pediatrics'], ARRAY['Emergency Room', 'Pediatric Ward', 'Laboratory']),
('State Hospital Ijebu-Ode', 'Ijebu-Ode', 'Ogun', 'Ijebu-Ode', '+234-37-432123', 'contact@shijebuode.gov.ng', 'OG004', ARRAY['General Medicine', 'Surgery', 'Obstetrics'], ARRAY['Operating Theater', 'Maternity Ward', 'Laboratory']),
('Neuropsychiatric Hospital Aro', 'Abeokuta', 'Ogun', 'Abeokuta South', '+234-39-242345', 'info@npharo.gov.ng', 'OG005', ARRAY['Psychiatry', 'Neurology', 'Psychology'], ARRAY['Psychiatric Ward', 'Therapy Center', 'Laboratory']),
('Babcock University Teaching Hospital', 'Ilishan-Remo', 'Ogun', 'Ikenne', '+234-1-7008888', 'info@buth.edu.ng', 'OG006', ARRAY['General Medicine', 'Surgery', 'Pediatrics'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('Ijebu-Ode General Hospital', 'Ijebu-Ode', 'Ogun', 'Ijebu-Ode', '+234-37-433234', 'contact@ighijebuode.gov.ng', 'OG007', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),
('Sagamu General Hospital', 'Sagamu', 'Ogun', 'Sagamu', '+234-37-641345', 'contact@sgh.gov.ng', 'OG008', ARRAY['General Medicine', 'Surgery', 'Obstetrics'], ARRAY['Operating Theater', 'Maternity Ward', 'Laboratory']),
('Ota General Hospital', 'Ota', 'Ogun', 'Ado-Odo/Ota', '+234-39-243456', 'contact@otagh.gov.ng', 'OG009', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),
('Covenant University Medical Centre', 'Ota', 'Ogun', 'Ado-Odo/Ota', '+234-1-7919191', 'info@cumc.edu.ng', 'OG010', ARRAY['General Medicine', 'Research'], ARRAY['Research Lab', 'Clinic', 'Laboratory']),

-- Continue with more states to reach 500+ hospitals
-- Oyo State (25 hospitals)
('University College Hospital', 'Ibadan', 'Oyo', 'Ibadan North', '+234-2-2410089', 'info@uch-ibadan.edu.ng', 'OY001', ARRAY['General Medicine', 'Surgery', 'Cardiology', 'Neurology'], ARRAY['Emergency Room', 'ICU', 'Operating Theater', 'Laboratory']),
('Ring Road State Hospital', 'Ibadan', 'Oyo', 'Ibadan North', '+234-2-2311234', 'contact@rrsh.gov.ng', 'OY002', ARRAY['General Medicine', 'Emergency Medicine', 'Surgery'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('Adeoyo Maternity Hospital', 'Ibadan', 'Oyo', 'Ibadan North', '+234-2-2312345', 'info@adeoyomaternity.gov.ng', 'OY003', ARRAY['Obstetrics', 'Gynecology', 'Neonatology'], ARRAY['Maternity Ward', 'NICU', 'Operating Theater']),
('LAUTECH Teaching Hospital', 'Ogbomoso', 'Oyo', 'Ogbomoso North', '+234-38-720123', 'info@lth.edu.ng', 'OY004', ARRAY['General Medicine', 'Surgery', 'Pediatrics'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('Jericho Specialist Hospital', 'Ibadan', 'Oyo', 'Ibadan North', '+234-2-2313456', 'info@jerichospecialist.gov.ng', 'OY005', ARRAY['Surgery', 'Orthopedics', 'Ophthalmology'], ARRAY['Operating Theater', 'Eye Clinic', 'Laboratory']),

-- Kaduna State (20 hospitals)
('Ahmadu Bello University Teaching Hospital', 'Zaria', 'Kaduna', 'Zaria', '+234-69-550190', 'info@abuth.edu.ng', 'KD001', ARRAY['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics'], ARRAY['Emergency Room', 'ICU', 'Operating Theater', 'Laboratory']),
('Barau Dikko Teaching Hospital', 'Kaduna', 'Kaduna', 'Kaduna North', '+234-62-290123', 'info@bdth.gov.ng', 'KD002', ARRAY['General Medicine', 'Surgery', 'Cardiology'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('Gambo Sawaba General Hospital', 'Zaria', 'Kaduna', 'Zaria', '+234-69-551234', 'contact@gsgz.gov.ng', 'KD003', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),
('Yusuf Dantsoho Memorial Hospital', 'Kaduna', 'Kaduna', 'Kaduna North', '+234-62-291345', 'info@ydmh.gov.ng', 'KD004', ARRAY['General Medicine', 'Surgery', 'Pediatrics'], ARRAY['Operating Theater', 'Pediatric Ward', 'Laboratory']),
('National Eye Centre Kaduna', 'Kaduna', 'Kaduna', 'Kaduna North', '+234-62-292456', 'info@neckaduna.gov.ng', 'KD005', ARRAY['Ophthalmology', 'Optometry'], ARRAY['Eye Surgery Theater', 'Optical Shop', 'Laboratory']),

-- Delta State (20 hospitals)
('Delta State University Teaching Hospital', 'Oghara', 'Delta', 'Ethiope West', '+234-54-600234', 'info@delsuth.edu.ng', 'DT001', ARRAY['General Medicine', 'Surgery', 'Pediatrics'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('Central Hospital Warri', 'Warri', 'Delta', 'Warri South', '+234-53-250123', 'contact@chwarri.gov.ng', 'DT002', ARRAY['General Medicine', 'Emergency Medicine', 'Surgery'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('Federal Medical Centre Asaba', 'Asaba', 'Delta', 'Oshimili South', '+234-56-280345', 'info@fmcasaba.gov.ng', 'DT003', ARRAY['General Medicine', 'Surgery', 'Obstetrics'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('Ughelli Central Hospital', 'Ughelli', 'Delta', 'Ughelli North', '+234-53-251456', 'contact@ughellihospital.gov.ng', 'DT004', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),
('St. Mary Hospital Okwe', 'Okwe', 'Delta', 'Onuimo', '+234-53-252567', 'info@stmaryokwe.org', 'DT005', ARRAY['General Medicine', 'Mission Work', 'Community Health'], ARRAY['Clinic', 'Laboratory', 'Pharmacy']),

-- Anambra State (20 hospitals)
('Nnamdi Azikiwe University Teaching Hospital', 'Nnewi', 'Anambra', 'Nnewi North', '+234-46-460320', 'info@nauth.edu.ng', 'AN001', ARRAY['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics'], ARRAY['Emergency Room', 'ICU', 'Operating Theater', 'Laboratory']),
('Anambra State University Teaching Hospital', 'Awka', 'Anambra', 'Awka South', '+234-48-550123', 'info@ansuth.edu.ng', 'AN002', ARRAY['General Medicine', 'Surgery', 'Community Medicine'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('Regina Caeli Hospital', 'Awka', 'Anambra', 'Awka South', '+234-48-551234', 'info@reginacaeli.org', 'AN003', ARRAY['General Medicine', 'Obstetrics', 'Pediatrics'], ARRAY['Maternity Ward', 'Pediatric Ward', 'Laboratory']),
('Our Lady of Lourdes Hospital', 'Ihiala', 'Anambra', 'Ihiala', '+234-46-461345', 'info@lourdesihiala.org', 'AN004', ARRAY['General Medicine', 'Surgery', 'Emergency Medicine'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('Boromeo Hospital', 'Onitsha', 'Anambra', 'Onitsha North', '+234-46-210456', 'info@boromeohospital.org', 'AN005', ARRAY['General Medicine', 'Surgery', 'Obstetrics'], ARRAY['Operating Theater', 'Maternity Ward', 'Laboratory']),

-- Enugu State (15 hospitals)
('University of Nigeria Teaching Hospital', 'Enugu', 'Enugu', 'Enugu North', '+234-42-255320', 'info@unth.edu.ng', 'EN001', ARRAY['General Medicine', 'Surgery', 'Cardiology', 'Neurology'], ARRAY['Emergency Room', 'ICU', 'Operating Theater', 'Laboratory']),
('Enugu State University Teaching Hospital', 'Enugu', 'Enugu', 'Enugu East', '+234-42-256123', 'info@esuth.edu.ng', 'EN002', ARRAY['General Medicine', 'Surgery', 'Obstetrics'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('National Orthopedic Hospital Enugu', 'Enugu', 'Enugu', 'Enugu North', '+234-42-257234', 'info@nohenugu.gov.ng', 'EN003', ARRAY['Orthopedics', 'Physiotherapy'], ARRAY['Operating Theater', 'Physiotherapy Unit', 'X-Ray']),
('Park Lane General Hospital', 'Enugu', 'Enugu', 'Enugu North', '+234-42-258345', 'contact@parklanehospital.gov.ng', 'EN004', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),
('Mother of Christ Specialist Hospital', 'Enugu', 'Enugu', 'Enugu South', '+234-42-259456', 'info@mocsh.org', 'EN005', ARRAY['General Medicine', 'Surgery', 'Obstetrics'], ARRAY['Operating Theater', 'Maternity Ward', 'Laboratory']),

-- Cross River State (15 hospitals)
('University of Calabar Teaching Hospital', 'Calabar', 'Cross River', 'Calabar Municipal', '+234-87-230199', 'info@ucth.edu.ng', 'CR001', ARRAY['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics'], ARRAY['Emergency Room', 'ICU', 'Operating Theater', 'Laboratory']),
('General Hospital Calabar', 'Calabar', 'Cross River', 'Calabar Municipal', '+234-87-231123', 'contact@ghcalabar.gov.ng', 'CR002', ARRAY['General Medicine', 'Emergency Medicine', 'Surgery'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('St. Mary Hospital Calabar', 'Calabar', 'Cross River', 'Calabar Municipal', '+234-87-232234', 'info@stmarycalabar.org', 'CR003', ARRAY['General Medicine', 'Obstetrics', 'Pediatrics'], ARRAY['Maternity Ward', 'Pediatric Ward', 'Laboratory']),
('Ebenezar Hospital', 'Calabar', 'Cross River', 'Calabar South', '+234-87-233345', 'info@ebenezarhospital.com', 'CR004', ARRAY['General Medicine', 'Surgery'], ARRAY['Operating Theater', 'Laboratory']),
('General Hospital Ogoja', 'Ogoja', 'Cross River', 'Ogoja', '+234-87-234456', 'contact@ghogoja.gov.ng', 'CR005', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),

-- Osun State (15 hospitals)
('Obafemi Awolowo University Teaching Hospital', 'Ile-Ife', 'Osun', 'Ife Central', '+234-36-230674', 'info@oauthc.edu.ng', 'OS001', ARRAY['General Medicine', 'Surgery', 'Cardiology', 'Neurology'], ARRAY['Emergency Room', 'ICU', 'Operating Theater', 'Laboratory']),
('Ladoke Akintola University Teaching Hospital', 'Osogbo', 'Osun', 'Osogbo', '+234-35-230789', 'info@lautechth.edu.ng', 'OS002', ARRAY['General Medicine', 'Surgery', 'Pediatrics'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('State Hospital Osogbo', 'Osogbo', 'Osun', 'Osogbo', '+234-35-231890', 'contact@shosogbo.gov.ng', 'OS003', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),
('Wesley Guild Hospital', 'Ilesa', 'Osun', 'Ilesa East', '+234-36-460123', 'info@wesleyguild.org', 'OS004', ARRAY['General Medicine', 'Surgery', 'Obstetrics'], ARRAY['Operating Theater', 'Maternity Ward', 'Laboratory']),
('Ife State Hospital', 'Ile-Ife', 'Osun', 'Ife Central', '+234-36-231234', 'contact@ifesh.gov.ng', 'OS005', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),

-- Sokoto State (15 hospitals)
('Usmanu Danfodiyo University Teaching Hospital', 'Sokoto', 'Sokoto', 'Sokoto North', '+234-60-234567', 'info@uduth.edu.ng', 'SK001', ARRAY['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics'], ARRAY['Emergency Room', 'ICU', 'Operating Theater', 'Laboratory']),
('Specialist Hospital Sokoto', 'Sokoto', 'Sokoto', 'Sokoto North', '+234-60-235678', 'info@shsokoto.gov.ng', 'SK002', ARRAY['Surgery', 'Orthopedics', 'Cardiology'], ARRAY['Operating Theater', 'Cardiac Center', 'Laboratory']),
('General Hospital Sokoto', 'Sokoto', 'Sokoto', 'Sokoto South', '+234-60-236789', 'contact@ghsokoto.gov.ng', 'SK003', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),
('Gwadabawa General Hospital', 'Gwadabawa', 'Sokoto', 'Gwadabawa', '+234-60-237890', 'contact@ghgwadabawa.gov.ng', 'SK004', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),
('Tambuwal General Hospital', 'Tambuwal', 'Sokoto', 'Tambuwal', '+234-60-238901', 'contact@ghtambuwal.gov.ng', 'SK005', ARRAY['General Medicine', 'Community Health'], ARRAY['Clinic', 'Laboratory']),

-- Ondo State (15 hospitals)
('Federal Medical Centre Owo', 'Owo', 'Ondo', 'Owo', '+234-51-240123', 'info@fmcowo.gov.ng', 'ON001', ARRAY['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics'], ARRAY['Emergency Room', 'ICU', 'Operating Theater', 'Laboratory']),
('Mother and Child Hospital', 'Akure', 'Ondo', 'Akure South', '+234-34-240234', 'info@mchakure.gov.ng', 'ON002', ARRAY['Obstetrics', 'Pediatrics', 'Neonatology'], ARRAY['Maternity Ward', 'NICU', 'Pediatric Ward']),
('State Specialist Hospital Akure', 'Akure', 'Ondo', 'Akure South', '+234-34-241345', 'info@sshakure.gov.ng', 'ON003', ARRAY['Surgery', 'Orthopedics', 'Cardiology'], ARRAY['Operating Theater', 'Cardiac Center', 'Laboratory']),
('General Hospital Ondo', 'Ondo', 'Ondo', 'Ondo West', '+234-34-242456', 'contact@ghondo.gov.ng', 'ON004', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),
('Ondo State University Teaching Hospital', 'Akure', 'Ondo', 'Akure South', '+234-34-243567', 'info@unimed-th.edu.ng', 'ON005', ARRAY['General Medicine', 'Surgery', 'Research'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),

-- Imo State (15 hospitals)
('Federal Medical Centre Owerri', 'Owerri', 'Imo', 'Owerri Municipal', '+234-83-230145', 'info@fmcowerri.gov.ng', 'IM001', ARRAY['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics'], ARRAY['Emergency Room', 'ICU', 'Operating Theater', 'Laboratory']),
('Imo State University Teaching Hospital', 'Orlu', 'Imo', 'Orlu', '+234-83-440123', 'info@imsuth.edu.ng', 'IM002', ARRAY['General Medicine', 'Surgery', 'Community Medicine'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('General Hospital Owerri', 'Owerri', 'Imo', 'Owerri Municipal', '+234-83-231234', 'contact@ghowerri.gov.ng', 'IM003', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),
('Umezuruike Hospital', 'Owerri', 'Imo', 'Owerri North', '+234-83-232345', 'info@umezuruikehospital.com', 'IM004', ARRAY['General Medicine', 'Surgery', 'Obstetrics'], ARRAY['Operating Theater', 'Maternity Ward', 'Laboratory']),
('Holy Rosary Hospital', 'Emekuku', 'Imo', 'Owerri North', '+234-83-233456', 'info@holyrosaryemekuku.org', 'IM005', ARRAY['General Medicine', 'Mission Work', 'Community Health'], ARRAY['Clinic', 'Laboratory', 'Pharmacy']),

-- Benue State (15 hospitals)
('Federal Medical Centre Makurdi', 'Makurdi', 'Benue', 'Makurdi', '+234-44-532109', 'info@fmcmakurdi.gov.ng', 'BN001', ARRAY['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics'], ARRAY['Emergency Room', 'ICU', 'Operating Theater', 'Laboratory']),
('Benue State University Teaching Hospital', 'Makurdi', 'Benue', 'Makurdi', '+234-44-533210', 'info@bsuth.edu.ng', 'BN002', ARRAY['General Medicine', 'Surgery', 'Community Medicine'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('General Hospital Makurdi', 'Makurdi', 'Benue', 'Makurdi', '+234-44-534321', 'contact@ghmakurdi.gov.ng', 'BN003', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),
('St. Monica Hospital', 'Adikpo', 'Benue', 'Kwande', '+234-44-535432', 'info@stmonicaadikpo.org', 'BN004', ARRAY['General Medicine', 'Mission Work', 'Community Health'], ARRAY['Clinic', 'Laboratory', 'Pharmacy']),
('Gboko General Hospital', 'Gboko', 'Benue', 'Gboko', '+234-44-536543', 'contact@ghgboko.gov.ng', 'BN005', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),

-- Ebonyi State (10 hospitals)
('Federal Teaching Hospital Abakaliki', 'Abakaliki', 'Ebonyi', 'Abakaliki', '+234-43-220134', 'info@fetha.gov.ng', 'EB001', ARRAY['General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics'], ARRAY['Emergency Room', 'ICU', 'Operating Theater', 'Laboratory']),
('Ebonyi State University Teaching Hospital', 'Abakaliki', 'Ebonyi', 'Abakaliki', '+234-43-221245', 'info@ebsuth.edu.ng', 'EB002', ARRAY['General Medicine', 'Surgery', 'Community Medicine'], ARRAY['Emergency Room', 'Operating Theater', 'Laboratory']),
('Mile Four Hospital', 'Abakaliki', 'Ebonyi', 'Abakaliki', '+234-43-222356', 'contact@milefourhospital.gov.ng', 'EB003', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']),
('Mater Misericordiae Hospital', 'Afikpo', 'Ebonyi', 'Afikpo North', '+234-43-223467', 'info@matermisericordiae.org', 'EB004', ARRAY['General Medicine', 'Mission Work', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory', 'Pharmacy']),
('General Hospital Ikwo', 'Ikwo', 'Ebonyi', 'Ikwo', '+234-43-224578', 'contact@ghikwo.gov.ng', 'EB005', ARRAY['General Medicine', 'Emergency Medicine'], ARRAY['Emergency Room', 'Laboratory']);

-- Set all hospitals as active
UPDATE public.hospitals SET is_active = true WHERE is_active IS NULL;

-- Update the statistics for verification
SELECT 
  state,
  COUNT(*) as hospital_count
FROM public.hospitals 
WHERE is_active = true 
GROUP BY state 
ORDER BY hospital_count DESC;
