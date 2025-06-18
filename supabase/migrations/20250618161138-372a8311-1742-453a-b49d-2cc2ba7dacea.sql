
-- Add height and weight columns to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN height numeric,
ADD COLUMN weight numeric;
