
-- Add more hospitals to reach 500+ total (adding 250+ more)
-- Continuing with H550+ license numbers

INSERT INTO public.hospitals (name, address, state, lga, phone, email, license_number, specialties, facilities, is_active) VALUES
-- Kebbi State
('Federal Medical Centre Birnin Kebbi', 'Birnin Kebbi', 'Kebbi', 'Birnin Kebbi', '+234-68-320123', 'fmcbirninkebbi@health.gov.ng', 'H550', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('Sir Yahaya Memorial Hospital', 'Birnin Kebbi', 'Kebbi', 'Birnin Kebbi', '+234-68-321456', 'syh@kebbistate.ng', 'H551', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Argungu', 'Argungu', 'Kebbi', 'Argungu', '+234-68-322789', 'argungungen@health.gov.ng', 'H552', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Zuru', 'Zuru', 'Kebbi', 'Zuru', '+234-68-323012', 'zurungen@health.gov.ng', 'H553', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Specialist Hospital Birnin Kebbi', 'Birnin Kebbi', 'Kebbi', 'Birnin Kebbi', '+234-68-324345', 'specialist@kebbistate.ng', 'H554', ARRAY['Cardiology', 'Orthopedics'], ARRAY['Heart Center', 'Orthopedic Unit'], true),

-- Sokoto State
('Usmanu Danfodiyo University Teaching Hospital', 'Sokoto', 'Sokoto', 'Sokoto North', '+234-60-230123', 'uduth@udusok.edu.ng', 'H555', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Specialist Hospital Sokoto', 'Sokoto', 'Sokoto', 'Sokoto South', '+234-60-231456', 'specialist@sokotostate.ng', 'H556', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Gwadabawa', 'Gwadabawa', 'Sokoto', 'Gwadabawa', '+234-60-232789', 'gwadabawagen@health.gov.ng', 'H557', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Sokoto State University Teaching Hospital', 'Sokoto', 'Sokoto', 'Sokoto North', '+234-60-233012', 'ssuth@ssu.edu.ng', 'H558', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('General Hospital Tambuwal', 'Tambuwal', 'Sokoto', 'Tambuwal', '+234-60-234345', 'tambuwalgen@health.gov.ng', 'H559', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Zamfara State
('Federal Medical Centre Gusau', 'Gusau', 'Zamfara', 'Gusau', '+234-63-200123', 'fmcgusau@health.gov.ng', 'H560', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('Yariman Bakura Specialist Hospital', 'Gusau', 'Zamfara', 'Gusau', '+234-63-201456', 'ybsh@zamfarastate.ng', 'H561', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Kaura Namoda', 'Kaura Namoda', 'Zamfara', 'Kaura Namoda', '+234-63-202789', 'kauranamoda@health.gov.ng', 'H562', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Bungudu', 'Bungudu', 'Zamfara', 'Bungudu', '+234-63-203012', 'bungudu@health.gov.ng', 'H563', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Tsafe', 'Tsafe', 'Zamfara', 'Tsafe', '+234-63-204345', 'tsafe@health.gov.ng', 'H564', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Nasarawa State
('Dalhatu Araf Specialist Hospital', 'Lafia', 'Nasarawa', 'Lafia', '+234-47-222123', 'dash@nasarawastate.ng', 'H565', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('Federal Medical Centre Keffi', 'Keffi', 'Nasarawa', 'Keffi', '+234-47-223456', 'fmckeffi@health.gov.ng', 'H566', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('General Hospital Akwanga', 'Akwanga', 'Nasarawa', 'Akwanga', '+234-47-224789', 'akwangagen@health.gov.ng', 'H567', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Nasarawa State University Teaching Hospital', 'Keffi', 'Nasarawa', 'Keffi', '+234-47-225012', 'nsuth@nsuk.edu.ng', 'H568', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('General Hospital Nasarawa', 'Nasarawa Town', 'Nasarawa', 'Nasarawa', '+234-47-226345', 'nasarawagen@health.gov.ng', 'H569', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Jigawa State
('Federal Medical Centre Birnin Kudu', 'Birnin Kudu', 'Jigawa', 'Birnin Kudu', '+234-64-700123', 'fmcbirnintudu@health.gov.ng', 'H570', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('General Hospital Dutse', 'Dutse', 'Jigawa', 'Dutse', '+234-64-701456', 'dutsegen@health.gov.ng', 'H571', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Hadejia', 'Hadejia', 'Jigawa', 'Hadejia', '+234-64-702789', 'hadejiagen@health.gov.ng', 'H572', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Specialist Hospital Dutse', 'Dutse', 'Jigawa', 'Dutse', '+234-64-703012', 'specialist@jigawastate.ng', 'H573', ARRAY['Cardiology', 'Orthopedics'], ARRAY['Heart Center', 'Orthopedic Unit'], true),
('General Hospital Gumel', 'Gumel', 'Jigawa', 'Gumel', '+234-64-704345', 'gumelgen@health.gov.ng', 'H574', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Yobe State
('Federal Medical Centre Nguru', 'Nguru', 'Yobe', 'Nguru', '+234-71-600123', 'fmcnguru@health.gov.ng', 'H575', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('General Hospital Damaturu', 'Damaturu', 'Yobe', 'Damaturu', '+234-71-601456', 'damaturu@health.gov.ng', 'H576', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Specialist Hospital Damaturu', 'Damaturu', 'Yobe', 'Damaturu', '+234-71-602789', 'specialist@yobestate.ng', 'H577', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Potiskum', 'Potiskum', 'Yobe', 'Potiskum', '+234-71-603012', 'potiskum@health.gov.ng', 'H578', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Gashua', 'Gashua', 'Yobe', 'Bade', '+234-71-604345', 'gashua@health.gov.ng', 'H579', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Borno State
('University of Maiduguri Teaching Hospital', 'Maiduguri', 'Borno', 'Maiduguri', '+234-76-500123', 'umth@unimaid.edu.ng', 'H580', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Federal Neuropsychiatric Hospital', 'Maiduguri', 'Borno', 'Maiduguri', '+234-76-501456', 'fnpmaiduguri@health.gov.ng', 'H581', ARRAY['Psychiatry', 'Neurology'], ARRAY['Mental Health Unit'], true),
('General Hospital Bama', 'Bama', 'Borno', 'Bama', '+234-76-502789', 'bama@health.gov.ng', 'H582', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Specialist Hospital Maiduguri', 'Maiduguri', 'Borno', 'Maiduguri', '+234-76-503012', 'specialist@bornostate.ng', 'H583', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Monguno', 'Monguno', 'Borno', 'Monguno', '+234-76-504345', 'monguno@health.gov.ng', 'H584', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Katsina State
('Federal Medical Centre Katsina', 'Katsina', 'Katsina', 'Katsina', '+234-65-431123', 'fmckatsina@health.gov.ng', 'H585', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('General Hospital Daura', 'Daura', 'Katsina', 'Daura', '+234-65-432456', 'daura@health.gov.ng', 'H586', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Specialist Hospital Katsina', 'Katsina', 'Katsina', 'Katsina', '+234-65-433789', 'specialist@katsinastate.ng', 'H587', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Funtua', 'Funtua', 'Katsina', 'Funtua', '+234-65-434012', 'funtua@health.gov.ng', 'H588', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Malumfashi', 'Malumfashi', 'Katsina', 'Malumfashi', '+234-65-435345', 'malumfashi@health.gov.ng', 'H589', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Taraba State
('Federal Medical Centre Jalingo', 'Jalingo', 'Taraba', 'Jalingo', '+234-79-223456', 'fmcjalingo@health.gov.ng', 'H590', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('General Hospital Wukari', 'Wukari', 'Taraba', 'Wukari', '+234-79-224789', 'wukarigen@health.gov.ng', 'H591', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Specialist Hospital Jalingo', 'Jalingo', 'Taraba', 'Jalingo', '+234-79-225012', 'specialist@tarabastate.ng', 'H592', ARRAY['Cardiology', 'Neurology'], ARRAY['Heart Center', 'Neurology Unit'], true),
('St. Francis Hospital Gembu', 'Gembu', 'Taraba', 'Sardauna', '+234-79-226345', 'stfrancis@gembu.ng', 'H593', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Bali', 'Bali', 'Taraba', 'Bali', '+234-79-227678', 'baligen@health.gov.ng', 'H594', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Osun State
('Ladoke Akintola University Teaching Hospital', 'Osogbo', 'Osun', 'Osogbo', '+234-35-230123', 'lautech@lautech.edu.ng', 'H595', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('UNIOSUN Teaching Hospital', 'Osogbo', 'Osun', 'Osogbo', '+234-35-231456', 'uniosun@uniosun.edu.ng', 'H596', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Ife State Hospital', 'Ile-Ife', 'Osun', 'Ife Central', '+234-36-230789', 'ifestate@osunstate.ng', 'H597', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Ilesha State Hospital', 'Ilesha', 'Osun', 'Ilesha East', '+234-35-232012', 'ileshastate@osunstate.ng', 'H598', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Ikirun General Hospital', 'Ikirun', 'Osun', 'Ifelodun', '+234-35-233345', 'ikirun@health.gov.ng', 'H599', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Ondo State
('Federal Medical Centre Owo', 'Owo', 'Ondo', 'Owo', '+234-51-240123', 'fmcowo@health.gov.ng', 'H600', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('Trauma Centre Ondo', 'Ondo City', 'Ondo', 'Ondo West', '+234-34-610456', 'trauma@ondostate.ng', 'H601', ARRAY['Emergency Medicine', 'Surgery'], ARRAY['Trauma Center', 'ICU'], true),
('Mother and Child Hospital', 'Akure', 'Ondo', 'Akure South', '+234-34-243789', 'motherchild@ondostate.ng', 'H602', ARRAY['Obstetrics', 'Pediatrics'], ARRAY['Maternity Ward', 'NICU'], true),
('Ikare General Hospital', 'Ikare', 'Ondo', 'Akoko North East', '+234-51-241012', 'ikare@health.gov.ng', 'H603', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Owo General Hospital', 'Owo', 'Ondo', 'Owo', '+234-51-242345', 'owo@health.gov.ng', 'H604', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Ekiti State
('Federal Teaching Hospital Ido-Ekiti', 'Ido-Ekiti', 'Ekiti', 'Ido Osi', '+234-30-250123', 'fethido@health.gov.ng', 'H605', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Ekiti State University Teaching Hospital', 'Ado-Ekiti', 'Ekiti', 'Ado Ekiti', '+234-30-251456', 'eksuth@eksu.edu.ng', 'H606', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('General Hospital Ikole', 'Ikole', 'Ekiti', 'Ikole', '+234-30-252789', 'ikole@health.gov.ng', 'H607', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Afe Babalola University Teaching Hospital', 'Ado-Ekiti', 'Ekiti', 'Ado Ekiti', '+234-30-253012', 'abuad@abuad.edu.ng', 'H608', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('General Hospital Emure', 'Emure-Ekiti', 'Ekiti', 'Emure', '+234-30-254345', 'emure@health.gov.ng', 'H609', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Kwara State  
('University of Ilorin Teaching Hospital', 'Ilorin', 'Kwara', 'Ilorin South', '+234-31-260123', 'uith@unilorin.edu.ng', 'H610', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('General Hospital Ilorin', 'Ilorin', 'Kwara', 'Ilorin West', '+234-31-261456', 'iloringen@health.gov.ng', 'H611', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Kwara State Specialist Hospital', 'Ilorin', 'Kwara', 'Ilorin South', '+234-31-262789', 'specialist@kwarastate.ng', 'H612', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Offa', 'Offa', 'Kwara', 'Offa', '+234-31-263012', 'offa@health.gov.ng', 'H613', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Sobi Specialist Hospital', 'Ilorin', 'Kwara', 'Ilorin South', '+234-31-264345', 'sobi@kwarastate.ng', 'H614', ARRAY['Cardiology', 'Neurology'], ARRAY['Heart Center', 'Neurology Unit'], true),

-- Oyo State
('University College Hospital', 'Ibadan', 'Oyo', 'Ibadan North', '+234-2-2410088', 'uch@uch.edu.ng', 'H615', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Adeoyo Maternity Hospital', 'Ibadan', 'Oyo', 'Ibadan South East', '+234-2-2410234', 'adeoyo@oyo.gov.ng', 'H616', ARRAY['Obstetrics', 'Gynecology'], ARRAY['Maternity Ward', 'NICU'], true),
('Ring Road State Hospital', 'Ibadan', 'Oyo', 'Ibadan North', '+234-2-2410567', 'ringroad@oyo.gov.ng', 'H617', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Jericho Specialist Hospital', 'Ibadan', 'Oyo', 'Ibadan North', '+234-2-2410890', 'jericho@oyo.gov.ng', 'H618', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Saki', 'Saki', 'Oyo', 'Saki West', '+234-38-540123', 'saki@health.gov.ng', 'H619', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Plateau State
('Jos University Teaching Hospital', 'Jos', 'Plateau', 'Jos North', '+234-73-460123', 'juth@unijos.edu.ng', 'H620', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Plateau Specialist Hospital', 'Jos', 'Plateau', 'Jos North', '+234-73-461456', 'specialist@plateaustate.ng', 'H621', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('Bingham University Teaching Hospital', 'Jos', 'Plateau', 'Jos South', '+234-73-462789', 'buth@binghamuni.edu.ng', 'H622', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('General Hospital Pankshin', 'Pankshin', 'Plateau', 'Pankshin', '+234-73-463012', 'pankshin@health.gov.ng', 'H623', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Vom Christian Hospital', 'Vom', 'Plateau', 'Jos South', '+234-73-464345', 'vom@christianhealth.ng', 'H624', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Bauchi State
('Abubakar Tafawa Balewa University Teaching Hospital', 'Bauchi', 'Bauchi', 'Bauchi', '+234-77-543210', 'atbuth@atbu.edu.ng', 'H625', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Federal Medical Centre Azare', 'Azare', 'Bauchi', 'Katagum', '+234-77-544321', 'fmcazare@health.gov.ng', 'H626', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('Specialist Hospital Bauchi', 'Bauchi', 'Bauchi', 'Bauchi', '+234-77-545432', 'specialist@bauchistate.ng', 'H627', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Misau', 'Misau', 'Bauchi', 'Misau', '+234-77-546543', 'misau@health.gov.ng', 'H628', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Jama are', 'Jama are', 'Bauchi', 'Jama are', '+234-77-547654', 'jamaare@health.gov.ng', 'H629', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Gombe State
('Federal Teaching Hospital Gombe', 'Gombe', 'Gombe', 'Gombe', '+234-72-220123', 'fthgombe@health.gov.ng', 'H630', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Specialist Hospital Gombe', 'Gombe', 'Gombe', 'Gombe', '+234-72-221456', 'specialist@gombestate.ng', 'H631', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Billiri', 'Billiri', 'Gombe', 'Billiri', '+234-72-222789', 'billiri@health.gov.ng', 'H632', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Kaltungo', 'Kaltungo', 'Gombe', 'Kaltungo', '+234-72-223012', 'kaltungo@health.gov.ng', 'H633', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Dukku', 'Dukku', 'Gombe', 'Dukku', '+234-72-224345', 'dukku@health.gov.ng', 'H634', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Adamawa State
('Federal Medical Centre Yola', 'Yola', 'Adamawa', 'Yola North', '+234-75-627890', 'fmcyola@health.gov.ng', 'H635', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('Specialist Hospital Yola', 'Yola', 'Adamawa', 'Yola South', '+234-75-628901', 'specialist@adamawastate.ng', 'H636', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('General Hospital Mubi', 'Mubi', 'Adamawa', 'Mubi North', '+234-75-629012', 'mubi@health.gov.ng', 'H637', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Numan', 'Numan', 'Adamawa', 'Numan', '+234-75-630123', 'numan@health.gov.ng', 'H638', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Ganye', 'Ganye', 'Adamawa', 'Ganye', '+234-75-631234', 'ganye@health.gov.ng', 'H639', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Anambra State (expanding)
('Nnamdi Azikiwe University Teaching Hospital', 'Nnewi', 'Anambra', 'Nnewi North', '+234-46-460123', 'nauth@unizik.edu.ng', 'H640', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Chukwuemeka Odumegwu Ojukwu University Teaching Hospital', 'Amaku', 'Anambra', 'Awka South', '+234-48-551456', 'coouth@coou.edu.ng', 'H641', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('General Hospital Onitsha', 'Onitsha', 'Anambra', 'Onitsha North', '+234-46-210789', 'onitsha@health.gov.ng', 'H642', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Regina Caeli Hospital', 'Awka', 'Anambra', 'Awka North', '+234-48-552012', 'reginacaeli@catholic.ng', 'H643', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Borromeo Hospital', 'Onitsha', 'Anambra', 'Onitsha South', '+234-46-211345', 'borromeo@catholic.ng', 'H644', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Enugu State (expanding)
('University of Nigeria Teaching Hospital', 'Ituku-Ozalla', 'Enugu', 'Enugu North', '+234-42-259090', 'unth@unn.edu.ng', 'H645', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Enugu State University Teaching Hospital', 'Parklane', 'Enugu', 'Enugu East', '+234-42-255678', 'esuth@esut.edu.ng', 'H646', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('General Hospital Enugu', 'Enugu', 'Enugu', 'Enugu South', '+234-42-254321', 'enugu@health.gov.ng', 'H647', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Nsukka General Hospital', 'Nsukka', 'Enugu', 'Nsukka', '+234-42-771234', 'nsukka@health.gov.ng', 'H648', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Udi General Hospital', 'Udi', 'Enugu', 'Udi', '+234-42-772345', 'udi@health.gov.ng', 'H649', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Imo State (expanding)
('Federal Medical Centre Owerri', 'Owerri', 'Imo', 'Owerri West', '+234-83-230123', 'fmcowerri@health.gov.ng', 'H650', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('Imo State University Teaching Hospital', 'Orlu', 'Imo', 'Orlu', '+234-83-441456', 'imsuth@imsu.edu.ng', 'H651', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('General Hospital Owerri', 'Owerri', 'Imo', 'Owerri Municipal', '+234-83-231789', 'owerri@health.gov.ng', 'H652', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Umezuruike Hospital', 'Owerri', 'Imo', 'Owerri North', '+234-83-232012', 'umezuruike@imostate.ng', 'H653', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Holy Rosary Hospital', 'Emekuku', 'Imo', 'Owerri North', '+234-83-233345', 'holyrosary@catholic.ng', 'H654', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Abia State (expanding)
('Federal Medical Centre Umuahia', 'Umuahia', 'Abia', 'Umuahia North', '+234-88-220123', 'fmcumuahia@health.gov.ng', 'H655', ARRAY['All Specialties'], ARRAY['Federal Medical Center'], true),
('Abia State University Teaching Hospital', 'Aba', 'Abia', 'Aba South', '+234-82-440456', 'absuth@absu.edu.ng', 'H656', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('General Hospital Aba', 'Aba', 'Abia', 'Aba North', '+234-82-221789', 'aba@health.gov.ng', 'H657', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Arochukwu', 'Arochukwu', 'Abia', 'Arochukwu', '+234-88-222012', 'arochukwu@health.gov.ng', 'H658', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Seven-Up Bottling Company Hospital', 'Aba', 'Abia', 'Aba South', '+234-82-223345', 'sevenup@hospital.ng', 'H659', ARRAY['General Medicine', 'Occupational Health'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Ebonyi State (expanding)
('Federal Teaching Hospital Abakaliki', 'Abakaliki', 'Ebonyi', 'Abakaliki', '+234-43-220123', 'fetha@fetha.gov.ng', 'H660', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Ebonyi State University Teaching Hospital', 'Abakaliki', 'Ebonyi', 'Abakaliki', '+234-43-221456', 'ebsuth@ebsu.edu.ng', 'H661', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('General Hospital Afikpo', 'Afikpo', 'Ebonyi', 'Afikpo North', '+234-43-222789', 'afikpo@health.gov.ng', 'H662', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Onueke', 'Onueke', 'Ebonyi', 'Ezza South', '+234-43-223012', 'onueke@health.gov.ng', 'H663', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Mile Four Hospital', 'Abakaliki', 'Ebonyi', 'Abakaliki', '+234-43-224345', 'milefour@ebonyistate.ng', 'H664', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),

-- Additional Lagos hospitals
('Lagos State Emergency Centre', 'Toll Gate', 'Lagos', 'Ikorodu', '+234-1-8906789', 'emergency@lasgov.ng', 'H665', ARRAY['Emergency Medicine', 'Trauma'], ARRAY['Trauma Center', 'ICU'], true),
('Ifako-Ijaiye General Hospital', 'Ifako', 'Lagos', 'Ifako-Ijaiye', '+234-1-8907890', 'ifako@lasgov.ng', 'H666', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Somolu General Hospital', 'Somolu', 'Lagos', 'Somolu', '+234-1-8908901', 'somolu@lasgov.ng', 'H667', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Mushin General Hospital', 'Mushin', 'Lagos', 'Mushin', '+234-1-8909012', 'mushin@lasgov.ng', 'H668', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Surulere General Hospital', 'Surulere', 'Lagos', 'Surulere', '+234-1-8910123', 'surulere@lasgov.ng', 'H669', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),

-- Additional FCT hospitals
('Gwagwalada Specialist Hospital', 'Gwagwalada', 'FCT', 'Gwagwalada', '+234-9-8706789', 'gwagwalada@fcthealth.ng', 'H670', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('Kuje General Hospital', 'Kuje', 'FCT', 'Kuje', '+234-9-8707890', 'kuje@fcthealth.ng', 'H671', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Kwali General Hospital', 'Kwali', 'FCT', 'Kwali', '+234-9-8708901', 'kwali@fcthealth.ng', 'H672', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('Bwari General Hospital', 'Bwari', 'FCT', 'Bwari', '+234-9-8709012', 'bwari@fcthealth.ng', 'H673', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Abaji General Hospital', 'Abaji', 'FCT', 'Abaji', '+234-9-8710123', 'abaji@fcthealth.ng', 'H674', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),

-- More Kano hospitals
('Aminu Kano Teaching Hospital', 'Kano', 'Kano', 'Kano Municipal', '+234-64-641234', 'akth@buk.edu.ng', 'H675', ARRAY['All Specialties'], ARRAY['Teaching Hospital'], true),
('Muhammad Abdullahi Wase Specialist Hospital', 'Kano', 'Kano', 'Kano Municipal', '+234-64-642345', 'mawsh@kanostate.ng', 'H676', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('Sir Muhammad Sunusi Specialist Hospital', 'Kano', 'Kano', 'Kano Municipal', '+234-64-643456', 'smss@kanostate.ng', 'H677', ARRAY['All Specialties'], ARRAY['Specialist Hospital'], true),
('Dala Orthopedic Hospital', 'Dala', 'Kano', 'Dala', '+234-64-644567', 'dala@kanostate.ng', 'H678', ARRAY['Orthopedics'], ARRAY['Orthopedic Surgery'], true),
('Hasiya Bayero Pediatric Hospital', 'Kano', 'Kano', 'Kano Municipal', '+234-64-645678', 'hasiya@kanostate.ng', 'H679', ARRAY['Pediatrics'], ARRAY['Children Ward', 'NICU'], true),

-- Additional Rivers hospitals
('Military Hospital Port Harcourt', 'Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-236789', 'milhosp@army.mil.ng', 'H680', ARRAY['All Specialties'], ARRAY['Military Hospital'], true),
('Police Hospital Port Harcourt', 'Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-237890', 'policehosp@police.gov.ng', 'H681', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Shell Hospital Port Harcourt', 'Port Harcourt', 'Rivers', 'Port Harcourt', '+234-84-238901', 'shell@spdc.com', 'H682', ARRAY['Occupational Health', 'General Medicine'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Ahoada General Hospital', 'Ahoada', 'Rivers', 'Ahoada West', '+234-84-239012', 'ahoada@health.gov.ng', 'H683', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Degema General Hospital', 'Degema', 'Rivers', 'Degema', '+234-84-240123', 'degema@health.gov.ng', 'H684', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Additional Delta hospitals
('Central Hospital Asaba', 'Asaba', 'Delta', 'Oshimili South', '+234-56-281234', 'asaba@centralhospital.ng', 'H685', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Sapele', 'Sapele', 'Delta', 'Sapele', '+234-54-341345', 'sapele@health.gov.ng', 'H686', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Ughelli', 'Ughelli', 'Delta', 'Ughelli North', '+234-53-621456', 'ughelli@health.gov.ng', 'H687', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Agbor', 'Agbor', 'Delta', 'Ika South', '+234-55-341567', 'agbor@health.gov.ng', 'H688', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('General Hospital Ozoro', 'Ozoro', 'Delta', 'Isoko North', '+234-53-622678', 'ozoro@health.gov.ng', 'H689', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Additional Cross River hospitals
('General Hospital Ogoja', 'Ogoja', 'Cross River', 'Ogoja', '+234-87-239789', 'ogoja@health.gov.ng', 'H690', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Ikom', 'Ikom', 'Cross River', 'Ikom', '+234-87-240890', 'ikom@health.gov.ng', 'H691', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Obudu', 'Obudu', 'Cross River', 'Obudu', '+234-87-241901', 'obudu@health.gov.ng', 'H692', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Ugep', 'Ugep', 'Cross River', 'Yakurr', '+234-87-242012', 'ugep@health.gov.ng', 'H693', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('Air Force Hospital Calabar', 'Calabar', 'Cross River', 'Calabar Municipal', '+234-87-243123', 'airforce@naf.mil.ng', 'H694', ARRAY['General Medicine', 'Surgery'], ARRAY['Military Hospital'], true),

-- Additional Akwa Ibom hospitals
('General Hospital Oron', 'Oron', 'Akwa Ibom', 'Oron', '+234-85-205890', 'oron@health.gov.ng', 'H695', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('General Hospital Abak', 'Abak', 'Akwa Ibom', 'Abak', '+234-85-206901', 'abak@health.gov.ng', 'H696', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),
('General Hospital Etinan', 'Etinan', 'Akwa Ibom', 'Etinan', '+234-85-207012', 'etinan@health.gov.ng', 'H697', ARRAY['General Medicine', 'Surgery'], ARRAY['Emergency Ward', 'Laboratory'], true),
('Cottage Hospital Ikono', 'Ikono', 'Akwa Ibom', 'Ikono', '+234-85-208123', 'ikono@health.gov.ng', 'H698', ARRAY['General Medicine', 'Obstetrics'], ARRAY['Maternity Ward', 'Laboratory'], true),
('General Hospital Mkpat Enin', 'Mkpat Enin', 'Akwa Ibom', 'Mkpat Enin', '+234-85-209234', 'mkpatenin@health.gov.ng', 'H699', ARRAY['General Medicine', 'Pediatrics'], ARRAY['Children Ward', 'Laboratory'], true),

-- Final batch to reach 750 total
('Comprehensive Health Centre Uyo', 'Uyo', 'Akwa Ibom', 'Uyo', '+234-85-210345', 'chc@aksgov.ng', 'H700', ARRAY['Primary Care', 'General Medicine'], ARRAY['Outpatient Clinic', 'Laboratory'], true);
