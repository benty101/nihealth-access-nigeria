
-- Create user profiles table with Nigerian-specific fields
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone_number TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  state_of_residence TEXT,
  lga TEXT, -- Local Government Area
  address TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  is_pregnant BOOLEAN DEFAULT FALSE,
  due_date DATE,
  blood_group TEXT,
  genotype TEXT,
  allergies TEXT[],
  chronic_conditions TEXT[],
  insurance_provider TEXT,
  insurance_number TEXT,
  preferred_language TEXT DEFAULT 'english',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create medical records table
CREATE TABLE public.medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  record_type TEXT NOT NULL CHECK (record_type IN ('lab_result', 'prescription', 'imaging', 'consultation', 'vaccination', 'insurance_document', 'other')),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  file_size INTEGER,
  mime_type TEXT,
  healthcare_provider TEXT,
  doctor_name TEXT,
  date_created DATE NOT NULL,
  tags TEXT[],
  is_shared BOOLEAN DEFAULT FALSE,
  shared_with TEXT[], -- Array of user IDs or healthcare provider IDs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on medical records
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;

-- Create policies for medical records
CREATE POLICY "Users can view their own medical records"
  ON public.medical_records
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own medical records"
  ON public.medical_records
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own medical records"
  ON public.medical_records
  FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own medical records"
  ON public.medical_records
  FOR DELETE
  USING (user_id = auth.uid());

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone_number)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'phone', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  new.updated_at = NOW();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_medical_records_updated_at
  BEFORE UPDATE ON public.medical_records
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
