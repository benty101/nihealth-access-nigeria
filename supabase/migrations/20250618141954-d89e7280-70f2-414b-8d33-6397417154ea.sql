
-- Create lab_test_orders table
CREATE TABLE public.lab_test_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  order_number TEXT NOT NULL UNIQUE,
  lab_id UUID REFERENCES public.labs(id),
  status TEXT NOT NULL DEFAULT 'pending',
  total_amount NUMERIC NOT NULL DEFAULT 0,
  collection_method TEXT NOT NULL DEFAULT 'lab_visit', -- 'lab_visit' or 'home_collection'
  collection_address TEXT,
  collection_phone TEXT NOT NULL,
  collection_date DATE,
  collection_time TIME,
  patient_name TEXT NOT NULL,
  patient_age INTEGER,
  patient_gender TEXT,
  special_instructions TEXT,
  payment_method TEXT DEFAULT 'cash_on_delivery',
  payment_status TEXT DEFAULT 'pending',
  results_uploaded BOOLEAN DEFAULT FALSE,
  results_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create lab_test_order_items table
CREATE TABLE public.lab_test_order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.lab_test_orders(id) ON DELETE CASCADE,
  lab_test_id UUID NOT NULL REFERENCES public.lab_tests(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL,
  total_price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create lab_test_order_status_history table
CREATE TABLE public.lab_test_order_status_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.lab_test_orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  status_message TEXT,
  updated_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create function to generate lab test order numbers
CREATE OR REPLACE FUNCTION public.generate_lab_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  order_num TEXT;
BEGIN
  order_num := 'LAB-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
               LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  
  WHILE EXISTS (SELECT 1 FROM public.lab_test_orders WHERE order_number = order_num) LOOP
    order_num := 'LAB-' || EXTRACT(YEAR FROM now())::TEXT || '-' || 
                 LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
  END LOOP;
  
  RETURN order_num;
END;
$$;

-- Create trigger for lab test order numbers
CREATE OR REPLACE FUNCTION public.handle_lab_order_number()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := public.generate_lab_order_number();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_lab_order_number
  BEFORE INSERT ON public.lab_test_orders
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_lab_order_number();

-- Create trigger for updated_at
CREATE TRIGGER set_lab_order_updated_at
  BEFORE UPDATE ON public.lab_test_orders
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS on lab test order tables
ALTER TABLE public.lab_test_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_test_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_test_order_status_history ENABLE ROW LEVEL SECURITY;

-- RLS policies for lab_test_orders
CREATE POLICY "Users can view their own lab orders" 
  ON public.lab_test_orders 
  FOR SELECT 
  USING (auth.uid() = user_id OR public.is_super_admin(auth.uid()));

CREATE POLICY "Users can create their own lab orders" 
  ON public.lab_test_orders 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update lab orders" 
  ON public.lab_test_orders 
  FOR UPDATE 
  USING (public.is_super_admin(auth.uid()));

CREATE POLICY "Admins can delete lab orders" 
  ON public.lab_test_orders 
  FOR DELETE 
  USING (public.is_super_admin(auth.uid()));

-- RLS policies for lab_test_order_items
CREATE POLICY "Users can view their lab order items" 
  ON public.lab_test_order_items 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.lab_test_orders 
    WHERE id = order_id AND (user_id = auth.uid() OR public.is_super_admin(auth.uid()))
  ));

CREATE POLICY "Users can create lab order items" 
  ON public.lab_test_order_items 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.lab_test_orders 
    WHERE id = order_id AND user_id = auth.uid()
  ));

CREATE POLICY "Admins can update lab order items" 
  ON public.lab_test_order_items 
  FOR UPDATE 
  USING (public.is_super_admin(auth.uid()));

CREATE POLICY "Admins can delete lab order items" 
  ON public.lab_test_order_items 
  FOR DELETE 
  USING (public.is_super_admin(auth.uid()));

-- RLS policies for lab_test_order_status_history
CREATE POLICY "Users can view lab order status history" 
  ON public.lab_test_order_status_history 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.lab_test_orders 
    WHERE id = order_id AND (user_id = auth.uid() OR public.is_super_admin(auth.uid()))
  ));

CREATE POLICY "Admins can manage lab order status history" 
  ON public.lab_test_order_status_history 
  FOR ALL 
  USING (public.is_super_admin(auth.uid()));
