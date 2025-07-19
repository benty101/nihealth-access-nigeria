-- Part 2: Continue fixing RLS policies and create missing user_role enum

-- First, create the missing user_role enum
CREATE TYPE public.user_role AS ENUM ('patient', 'doctor', 'hospital_admin', 'super_admin', 'broker');

-- Fix lab_test_order_status_history policies
DROP POLICY IF EXISTS "Admins can manage lab order status history" ON public.lab_test_order_status_history;
DROP POLICY IF EXISTS "Users can view lab order status history" ON public.lab_test_order_status_history;

CREATE POLICY "Authenticated admins can manage lab order status history" 
ON public.lab_test_order_status_history FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()));

CREATE POLICY "Authenticated users can view lab order status history" 
ON public.lab_test_order_status_history FOR SELECT 
TO authenticated 
USING (EXISTS ( SELECT 1 FROM lab_test_orders WHERE ((lab_test_orders.id = lab_test_order_status_history.order_id) AND ((lab_test_orders.user_id = auth.uid()) OR is_super_admin(auth.uid())))));

-- Fix lab_test_orders policies
DROP POLICY IF EXISTS "Admins can delete lab orders" ON public.lab_test_orders;
DROP POLICY IF EXISTS "Admins can update lab orders" ON public.lab_test_orders;
DROP POLICY IF EXISTS "Users can create their own lab orders" ON public.lab_test_orders;
DROP POLICY IF EXISTS "Users can view their own lab orders" ON public.lab_test_orders;

CREATE POLICY "Authenticated users can create their own lab orders" 
ON public.lab_test_orders FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can view their own lab orders" 
ON public.lab_test_orders FOR SELECT 
TO authenticated 
USING ((auth.uid() = user_id) OR is_super_admin(auth.uid()));

CREATE POLICY "Authenticated admins can update lab orders" 
ON public.lab_test_orders FOR UPDATE 
TO authenticated 
USING (is_super_admin(auth.uid()));

CREATE POLICY "Authenticated admins can delete lab orders" 
ON public.lab_test_orders FOR DELETE 
TO authenticated 
USING (is_super_admin(auth.uid()));

-- Fix lab_tests policies
DROP POLICY IF EXISTS "Admins have full access to lab_tests" ON public.lab_tests;
DROP POLICY IF EXISTS "Authenticated users can view active lab tests" ON public.lab_tests;
DROP POLICY IF EXISTS "Super admin full access to lab_tests" ON public.lab_tests;

CREATE POLICY "Authenticated users can view active lab tests" 
ON public.lab_tests FOR SELECT 
TO authenticated 
USING (is_active = true);

CREATE POLICY "Authenticated super admins have full access to lab_tests" 
ON public.lab_tests FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()))
WITH CHECK (is_super_admin(auth.uid()));

-- Fix labs policies
DROP POLICY IF EXISTS "Admins have full access to labs" ON public.labs;
DROP POLICY IF EXISTS "Authenticated users can view active labs" ON public.labs;

CREATE POLICY "Authenticated users can view active labs" 
ON public.labs FOR SELECT 
TO authenticated 
USING (is_active = true);

CREATE POLICY "Authenticated super admins have full access to labs" 
ON public.labs FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()))
WITH CHECK (is_super_admin(auth.uid()));

-- Fix medication_order_items policies
DROP POLICY IF EXISTS "Admins can manage all order items" ON public.medication_order_items;
DROP POLICY IF EXISTS "Users can create order items for their orders" ON public.medication_order_items;
DROP POLICY IF EXISTS "Users can view their own order items" ON public.medication_order_items;

CREATE POLICY "Authenticated users can create order items for their orders" 
ON public.medication_order_items FOR INSERT 
TO authenticated 
WITH CHECK (EXISTS ( SELECT 1 FROM medication_orders WHERE ((medication_orders.id = medication_order_items.order_id) AND (medication_orders.user_id = auth.uid()))));

CREATE POLICY "Authenticated users can view their own order items" 
ON public.medication_order_items FOR SELECT 
TO authenticated 
USING (EXISTS ( SELECT 1 FROM medication_orders WHERE ((medication_orders.id = medication_order_items.order_id) AND (medication_orders.user_id = auth.uid()))));

CREATE POLICY "Authenticated admins can manage all order items" 
ON public.medication_order_items FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()));

-- Fix medication_orders policies
DROP POLICY IF EXISTS "Admins can manage all orders" ON public.medication_orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON public.medication_orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON public.medication_orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.medication_orders;

CREATE POLICY "Authenticated users can create their own orders" 
ON public.medication_orders FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can view their own orders" 
ON public.medication_orders FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own orders" 
ON public.medication_orders FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated admins can manage all orders" 
ON public.medication_orders FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()));

-- Fix medication_reminders policies
DROP POLICY IF EXISTS "Users can manage their own reminders" ON public.medication_reminders;

CREATE POLICY "Authenticated users can manage their own reminders" 
ON public.medication_reminders FOR ALL 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Fix medications policies
DROP POLICY IF EXISTS "Admins have full access to medications" ON public.medications;
DROP POLICY IF EXISTS "Authenticated users can view active medications" ON public.medications;
DROP POLICY IF EXISTS "Super admin full access to medications" ON public.medications;
DROP POLICY IF EXISTS "Super admins can manage all medications" ON public.medications;

CREATE POLICY "Authenticated users can view active medications" 
ON public.medications FOR SELECT 
TO authenticated 
USING (is_active = true);

CREATE POLICY "Authenticated super admins can manage all medications" 
ON public.medications FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()))
WITH CHECK (is_super_admin(auth.uid()));

-- Fix order_status_history policies
DROP POLICY IF EXISTS "Admins can manage order status" ON public.order_status_history;
DROP POLICY IF EXISTS "Users can view order status for their orders" ON public.order_status_history;

CREATE POLICY "Authenticated users can view order status for their orders" 
ON public.order_status_history FOR SELECT 
TO authenticated 
USING (EXISTS ( SELECT 1 FROM medication_orders WHERE ((medication_orders.id = order_status_history.order_id) AND (medication_orders.user_id = auth.uid()))));

CREATE POLICY "Authenticated admins can manage order status" 
ON public.order_status_history FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()));

-- Fix prescription_uploads policies
DROP POLICY IF EXISTS "Admins can manage all prescriptions" ON public.prescription_uploads;
DROP POLICY IF EXISTS "Users can manage their own prescriptions" ON public.prescription_uploads;

CREATE POLICY "Authenticated users can manage their own prescriptions" 
ON public.prescription_uploads FOR ALL 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated admins can manage all prescriptions" 
ON public.prescription_uploads FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()));

-- Fix profiles policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Authenticated users can insert their own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Authenticated users can view their own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Authenticated users can update their own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Authenticated admins can view all profiles" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (has_role(auth.uid(), 'hospital_admin'::user_role) OR has_role(auth.uid(), 'super_admin'::user_role));

-- Fix security_audit_log policies
DROP POLICY IF EXISTS "Super admins can view audit logs" ON public.security_audit_log;

CREATE POLICY "Authenticated super admins can view audit logs" 
ON public.security_audit_log FOR SELECT 
TO authenticated 
USING (is_super_admin(auth.uid()));

-- Fix telemedicine_providers policies
DROP POLICY IF EXISTS "Admins have full access to telemedicine_providers" ON public.telemedicine_providers;
DROP POLICY IF EXISTS "Authenticated users can view active telemedicine providers" ON public.telemedicine_providers;

CREATE POLICY "Authenticated users can view active telemedicine providers" 
ON public.telemedicine_providers FOR SELECT 
TO authenticated 
USING (is_active = true);

CREATE POLICY "Authenticated super admins have full access to telemedicine_providers" 
ON public.telemedicine_providers FOR ALL 
TO authenticated 
USING (is_super_admin(auth.uid()))
WITH CHECK (is_super_admin(auth.uid()));

-- Fix user_consents policies
DROP POLICY IF EXISTS "Admins can view all consents" ON public.user_consents;
DROP POLICY IF EXISTS "Users can manage their own consents" ON public.user_consents;

CREATE POLICY "Authenticated users can manage their own consents" 
ON public.user_consents FOR ALL 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated admins can view all consents" 
ON public.user_consents FOR SELECT 
TO authenticated 
USING (is_super_admin(auth.uid()));

-- Fix user_roles policies (keeping some of the existing ones that are good)
DROP POLICY IF EXISTS "Allow super admin role creation during signup" ON public.user_roles;
DROP POLICY IF EXISTS "Enable delete for users on their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.user_roles;
DROP POLICY IF EXISTS "Enable read access for users to their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Enable update for users on their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can manage all user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can create their basic roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can insert their own roles during signup" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

CREATE POLICY "Authenticated users can view their own roles" 
ON public.user_roles FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert their own roles during signup" 
ON public.user_roles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated super admins can manage all user roles" 
ON public.user_roles FOR ALL 
TO authenticated 
USING (EXISTS ( SELECT 1 FROM auth.users WHERE ((users.id = auth.uid()) AND ((users.email)::text = 'kosyezenekwe@gmail.com'::text))))
WITH CHECK (EXISTS ( SELECT 1 FROM auth.users WHERE ((users.id = auth.uid()) AND ((users.email)::text = 'kosyezenekwe@gmail.com'::text))));

-- Continue with any remaining tables that have policies...