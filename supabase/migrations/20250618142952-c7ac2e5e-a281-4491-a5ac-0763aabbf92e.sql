
-- Create hospital_doctors table to link doctors to hospitals
CREATE TABLE public.hospital_doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID REFERENCES public.hospitals(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.telemedicine_providers(id) ON DELETE CASCADE NOT NULL,
  department TEXT,
  position TEXT DEFAULT 'doctor',
  employment_type TEXT DEFAULT 'full_time', -- 'full_time', 'part_time', 'consultant'
  is_active BOOLEAN DEFAULT true,
  joined_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(hospital_id, doctor_id)
);

-- Create consultations table to track telemedicine sessions
CREATE TABLE public.consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_number TEXT UNIQUE NOT NULL,
  patient_id UUID NOT NULL, -- references auth.users
  doctor_id UUID REFERENCES public.telemedicine_providers(id) NOT NULL,
  hospital_id UUID REFERENCES public.hospitals(id),
  consultation_type TEXT NOT NULL DEFAULT 'video', -- 'video', 'voice', 'chat'
  status TEXT NOT NULL DEFAULT 'scheduled', -- 'scheduled', 'in_progress', 'completed', 'cancelled'
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  consultation_fee NUMERIC NOT NULL,
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'refunded'
  chief_complaint TEXT,
  symptoms TEXT,
  diagnosis TEXT,
  treatment_plan TEXT,
  prescription_notes TEXT,
  follow_up_required BOOLEAN DEFAULT false,
  follow_up_date DATE,
  consultation_notes TEXT,
  patient_satisfaction_rating INTEGER CHECK (patient_satisfaction_rating >= 1 AND patient_satisfaction_rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create doctor_availability table for scheduling
CREATE TABLE public.doctor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES public.telemedicine_providers(id) ON DELETE CASCADE NOT NULL,
  hospital_id UUID REFERENCES public.hospitals(id),
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  max_patients_per_slot INTEGER DEFAULT 1,
  slot_duration_minutes INTEGER DEFAULT 30,
  break_start_time TIME,
  break_end_time TIME,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create patient_records table for hospital patient management
CREATE TABLE public.patient_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL, -- references auth.users
  hospital_id UUID REFERENCES public.hospitals(id) NOT NULL,
  record_number TEXT UNIQUE NOT NULL,
  admission_date DATE,
  discharge_date DATE,
  attending_doctor_id UUID REFERENCES public.telemedicine_providers(id),
  department TEXT,
  room_number TEXT,
  bed_number TEXT,
  admission_type TEXT, -- 'emergency', 'planned', 'outpatient'
  chief_complaint TEXT,
  medical_history TEXT,
  current_medications TEXT,
  allergies TEXT,
  vital_signs JSONB,
  diagnosis TEXT,
  treatment_plan TEXT,
  discharge_summary TEXT,
  follow_up_instructions TEXT,
  status TEXT DEFAULT 'active', -- 'active', 'discharged', 'transferred'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create function to generate consultation numbers
CREATE OR REPLACE FUNCTION public.generate_consultation_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  consult_num TEXT;
BEGIN
  consult_num := 'CON-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                 LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  
  WHILE EXISTS (SELECT 1 FROM public.consultations WHERE consultation_number = consult_num) LOOP
    consult_num := 'CON-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                   LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  END LOOP;
  
  RETURN consult_num;
END;
$$;

-- Create function to generate patient record numbers
CREATE OR REPLACE FUNCTION public.generate_patient_record_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  record_num TEXT;
BEGIN
  record_num := 'PAT-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  
  WHILE EXISTS (SELECT 1 FROM public.patient_records WHERE record_number = record_num) LOOP
    record_num := 'PAT-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                  LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  END LOOP;
  
  RETURN record_num;
END;
$$;

-- Create triggers for auto-generating numbers
CREATE OR REPLACE FUNCTION public.handle_consultation_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.consultation_number IS NULL OR NEW.consultation_number = '' THEN
    NEW.consultation_number := public.generate_consultation_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_patient_record_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.record_number IS NULL OR NEW.record_number = '' THEN
    NEW.record_number := public.generate_patient_record_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_consultation_number
  BEFORE INSERT ON public.consultations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_consultation_number();

CREATE TRIGGER set_patient_record_number
  BEFORE INSERT ON public.patient_records
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_patient_record_number();

-- Add updated_at triggers
CREATE TRIGGER hospital_doctors_updated_at
  BEFORE UPDATE ON public.hospital_doctors
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER consultations_updated_at
  BEFORE UPDATE ON public.consultations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER doctor_availability_updated_at
  BEFORE UPDATE ON public.doctor_availability
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER patient_records_updated_at
  BEFORE UPDATE ON public.patient_records
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS on all new tables
ALTER TABLE public.hospital_doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_records ENABLE ROW LEVEL SECURITY;

-- RLS policies for hospital_doctors
CREATE POLICY "Hospital admins can manage their doctors" 
  ON public.hospital_doctors 
  FOR ALL 
  USING (
    public.is_super_admin(auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.hospital_staff 
      WHERE user_id = auth.uid() AND hospital_id = hospital_doctors.hospital_id AND is_active = true
    )
  );

CREATE POLICY "Everyone can view active hospital doctors" 
  ON public.hospital_doctors 
  FOR SELECT 
  USING (is_active = true);

-- RLS policies for consultations
CREATE POLICY "Patients can view their own consultations" 
  ON public.consultations 
  FOR SELECT 
  USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can view their consultations" 
  ON public.consultations 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.telemedicine_providers 
      WHERE id = doctor_id
    )
  );

CREATE POLICY "Hospital staff can view hospital consultations" 
  ON public.consultations 
  FOR SELECT 
  USING (
    public.is_super_admin(auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.hospital_staff 
      WHERE user_id = auth.uid() AND hospital_id = consultations.hospital_id AND is_active = true
    )
  );

CREATE POLICY "Patients can create consultations" 
  ON public.consultations 
  FOR INSERT 
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Doctors and hospital staff can update consultations" 
  ON public.consultations 
  FOR UPDATE 
  USING (
    public.is_super_admin(auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.hospital_staff 
      WHERE user_id = auth.uid() AND hospital_id = consultations.hospital_id AND is_active = true
    )
  );

-- RLS policies for doctor_availability
CREATE POLICY "Everyone can view doctor availability" 
  ON public.doctor_availability 
  FOR SELECT 
  USING (is_available = true);

CREATE POLICY "Hospital staff can manage doctor availability" 
  ON public.doctor_availability 
  FOR ALL 
  USING (
    public.is_super_admin(auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.hospital_staff 
      WHERE user_id = auth.uid() AND hospital_id = doctor_availability.hospital_id AND is_active = true
    )
  );

-- RLS policies for patient_records
CREATE POLICY "Patients can view their own records" 
  ON public.patient_records 
  FOR SELECT 
  USING (auth.uid() = patient_id);

CREATE POLICY "Hospital staff can manage patient records" 
  ON public.patient_records 
  FOR ALL 
  USING (
    public.is_super_admin(auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.hospital_staff 
      WHERE user_id = auth.uid() AND hospital_id = patient_records.hospital_id AND is_active = true
    )
  );
