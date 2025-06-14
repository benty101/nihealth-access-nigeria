
-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('super_admin', 'hospital_admin', 'patient');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL DEFAULT 'patient',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create hospitals table
CREATE TABLE public.hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  license_number TEXT UNIQUE,
  state TEXT,
  lga TEXT,
  specialties TEXT[],
  facilities TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create hospital_staff table to link hospital admins to hospitals
CREATE TABLE public.hospital_staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  hospital_id UUID REFERENCES public.hospitals(id) ON DELETE CASCADE NOT NULL,
  position TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, hospital_id)
);

-- Create insurance_plans table for admin to manage
CREATE TABLE public.insurance_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  plan_type TEXT NOT NULL,
  premium_monthly DECIMAL(10,2),
  premium_annual DECIMAL(10,2),
  coverage_amount DECIMAL(12,2),
  features TEXT[],
  terms TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospital_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_plans ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS user_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Super admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for hospitals
CREATE POLICY "Everyone can view active hospitals" ON public.hospitals
  FOR SELECT USING (is_active = true);

CREATE POLICY "Super admins can manage hospitals" ON public.hospitals
  FOR ALL USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Hospital admins can view their hospitals" ON public.hospitals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.hospital_staff 
      WHERE hospital_staff.user_id = auth.uid() 
      AND hospital_staff.hospital_id = hospitals.id 
      AND hospital_staff.is_active = true
    )
  );

-- RLS Policies for hospital_staff
CREATE POLICY "Super admins can manage hospital staff" ON public.hospital_staff
  FOR ALL USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Hospital staff can view their assignments" ON public.hospital_staff
  FOR SELECT USING (user_id = auth.uid());

-- RLS Policies for insurance_plans
CREATE POLICY "Everyone can view active insurance plans" ON public.insurance_plans
  FOR SELECT USING (is_active = true);

CREATE POLICY "Super admins can manage insurance plans" ON public.insurance_plans
  FOR ALL USING (public.has_role(auth.uid(), 'super_admin'));

-- Update medical_records RLS policies
DROP POLICY IF EXISTS "Users can view their own records" ON public.medical_records;
DROP POLICY IF EXISTS "Users can manage their own records" ON public.medical_records;

CREATE POLICY "Patients can view their own records" ON public.medical_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Patients can create their own records" ON public.medical_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Patients can update their own records" ON public.medical_records
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Hospital admins can view and manage records" ON public.medical_records
  FOR ALL USING (
    public.has_role(auth.uid(), 'hospital_admin') OR 
    public.has_role(auth.uid(), 'super_admin')
  );

-- Update profiles RLS policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Hospital admins can view patient profiles" ON public.profiles
  FOR SELECT USING (
    public.has_role(auth.uid(), 'hospital_admin') OR 
    public.has_role(auth.uid(), 'super_admin')
  );

-- Trigger to automatically assign 'patient' role to new users
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'patient');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add updated_at triggers
CREATE TRIGGER hospitals_updated_at
  BEFORE UPDATE ON public.hospitals
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER insurance_plans_updated_at
  BEFORE UPDATE ON public.insurance_plans
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER user_roles_updated_at
  BEFORE UPDATE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
