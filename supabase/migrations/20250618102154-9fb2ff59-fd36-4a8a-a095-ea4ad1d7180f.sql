
-- Check the actual total count in the database now
SELECT COUNT(*) as total_count FROM public.hospitals WHERE is_active = true;

-- Check what license numbers already exist for these states
SELECT license_number, name, state 
FROM public.hospitals 
WHERE state IN ('Adamawa', 'Gombe', 'Bauchi') 
ORDER BY license_number;

-- Check the highest license numbers for each state prefix to determine next available numbers
SELECT 
  SUBSTRING(license_number, 1, 2) as prefix,
  MAX(CAST(SUBSTRING(license_number, 3) AS INTEGER)) as max_number
FROM public.hospitals 
WHERE license_number ~ '^(AD|GM|BC)[0-9]+$'
GROUP BY SUBSTRING(license_number, 1, 2)
ORDER BY prefix;
