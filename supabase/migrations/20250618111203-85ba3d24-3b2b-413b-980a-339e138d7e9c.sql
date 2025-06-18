
-- Create insurance purchases table to track user insurance enrollments
CREATE TABLE public.insurance_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  plan_id UUID REFERENCES public.insurance_plans NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'expired', 'cancelled')),
  purchase_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  premium_amount NUMERIC NOT NULL,
  payment_frequency TEXT NOT NULL DEFAULT 'monthly' CHECK (payment_frequency IN ('monthly', 'quarterly', 'annually')),
  policy_number TEXT UNIQUE,
  beneficiaries JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create insurance API configurations table for external integrations
CREATE TABLE public.insurance_api_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_name TEXT NOT NULL,
  api_endpoint TEXT NOT NULL,
  api_key_reference TEXT, -- Reference to Supabase secrets
  config_data JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  last_sync TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create insurance claims table for future claims management
CREATE TABLE public.insurance_claims (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  purchase_id UUID REFERENCES public.insurance_purchases NOT NULL,
  claim_number TEXT UNIQUE NOT NULL,
  claim_type TEXT NOT NULL,
  claim_amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected', 'paid')),
  description TEXT,
  supporting_documents JSONB DEFAULT '[]'::jsonb,
  hospital_id UUID REFERENCES public.hospitals,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for insurance purchases
ALTER TABLE public.insurance_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own insurance purchases" ON public.insurance_purchases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own insurance purchases" ON public.insurance_purchases
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own insurance purchases" ON public.insurance_purchases
  FOR UPDATE USING (auth.uid() = user_id);

-- Add RLS policies for insurance claims
ALTER TABLE public.insurance_claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own insurance claims" ON public.insurance_claims
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own insurance claims" ON public.insurance_claims
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own insurance claims" ON public.insurance_claims
  FOR UPDATE USING (auth.uid() = user_id);

-- Add RLS policies for insurance API configs (admin only)
ALTER TABLE public.insurance_api_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins can manage API configs" ON public.insurance_api_configs
  FOR ALL USING (public.is_super_admin(auth.uid()));

-- Add updated_at triggers
CREATE TRIGGER update_insurance_purchases_updated_at
  BEFORE UPDATE ON public.insurance_purchases
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER update_insurance_api_configs_updated_at
  BEFORE UPDATE ON public.insurance_api_configs
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER update_insurance_claims_updated_at
  BEFORE UPDATE ON public.insurance_claims
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Add some indexes for better performance
CREATE INDEX idx_insurance_purchases_user_id ON public.insurance_purchases(user_id);
CREATE INDEX idx_insurance_purchases_plan_id ON public.insurance_purchases(plan_id);
CREATE INDEX idx_insurance_purchases_status ON public.insurance_purchases(status);
CREATE INDEX idx_insurance_claims_user_id ON public.insurance_claims(user_id);
CREATE INDEX idx_insurance_claims_purchase_id ON public.insurance_claims(purchase_id);

-- Function to generate policy numbers
CREATE OR REPLACE FUNCTION public.generate_policy_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  policy_num TEXT;
BEGIN
  -- Generate a policy number in format: POL-YYYY-XXXXXXXX
  policy_num := 'POL-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                LPAD(FLOOR(RANDOM() * 100000000)::TEXT, 8, '0');
  
  -- Ensure uniqueness
  WHILE EXISTS (SELECT 1 FROM public.insurance_purchases WHERE policy_number = policy_num) LOOP
    policy_num := 'POL-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                  LPAD(FLOOR(RANDOM() * 100000000)::TEXT, 8, '0');
  END LOOP;
  
  RETURN policy_num;
END;
$$;

-- Add trigger to auto-generate policy numbers
CREATE OR REPLACE FUNCTION public.handle_insurance_purchase()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.policy_number IS NULL THEN
    NEW.policy_number := public.generate_policy_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER generate_policy_number_trigger
  BEFORE INSERT ON public.insurance_purchases
  FOR EACH ROW EXECUTE PROCEDURE public.handle_insurance_purchase();
