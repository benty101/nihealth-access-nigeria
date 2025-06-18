
-- Check existing license numbers to avoid duplicates
SELECT license_number, name, state 
FROM public.hospitals 
WHERE license_number LIKE 'AD%' OR license_number LIKE 'GM%' OR license_number LIKE 'BC%'
ORDER BY license_number;

-- Let's also check the total count to see how many we have
SELECT COUNT(*) as total_count FROM public.hospitals WHERE is_active = true;

-- Check by state to see what we already have
SELECT state, COUNT(*) as count 
FROM public.hospitals 
WHERE state IN ('Adamawa', 'Gombe', 'Bauchi') 
AND is_active = true
GROUP BY state;
