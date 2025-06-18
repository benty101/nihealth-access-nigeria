
-- Let's check what states we currently have and their counts
SELECT state, COUNT(*) as count 
FROM public.hospitals 
WHERE is_active = true 
GROUP BY state 
ORDER BY count DESC;

-- Check total count
SELECT COUNT(*) as total_hospitals FROM public.hospitals WHERE is_active = true;

-- Check if Bayelsa, Akwa Ibom, Abia, Edo already exist
SELECT state, COUNT(*) as count 
FROM public.hospitals 
WHERE state IN ('Bayelsa', 'Akwa Ibom', 'Abia', 'Edo', 'Plateau', 'Kwara', 'Taraba', 'Adamawa', 'Gombe', 'Bauchi')
AND is_active = true
GROUP BY state;

-- Let's see what license numbers already exist for these states
SELECT license_number, name, state 
FROM public.hospitals 
WHERE license_number LIKE 'BY%' OR license_number LIKE 'AK%' OR license_number LIKE 'AB%' OR license_number LIKE 'ED%'
ORDER BY license_number;
