
-- First, let's see the exact current state of the database
SELECT COUNT(*) as total_active_hospitals FROM public.hospitals WHERE is_active = true;

-- Check which states we have and their counts
SELECT state, COUNT(*) as hospital_count 
FROM public.hospitals 
WHERE is_active = true 
GROUP BY state 
ORDER BY hospital_count DESC;

-- Check if there are any duplicate license numbers causing conflicts
SELECT license_number, COUNT(*) as count
FROM public.hospitals 
WHERE license_number IS NOT NULL
GROUP BY license_number
HAVING COUNT(*) > 1;

-- Check for any hospitals that might be inactive
SELECT is_active, COUNT(*) as count
FROM public.hospitals
GROUP BY is_active;
