
-- First, let's check the current state and see if our new hospitals are there
SELECT state, COUNT(*) as count 
FROM public.hospitals 
WHERE is_active = true 
GROUP BY state 
ORDER BY count DESC;

-- Check total count
SELECT COUNT(*) as total_hospitals FROM public.hospitals WHERE is_active = true;

-- Let's see if any of our new states exist
SELECT DISTINCT state FROM public.hospitals WHERE state IN ('Bayelsa', 'Akwa Ibom', 'Abia', 'Edo', 'Plateau', 'Kwara');

-- Check for any recent hospitals (from our migration)
SELECT name, state, created_at 
FROM public.hospitals 
WHERE created_at > '2024-01-01' 
ORDER BY created_at DESC 
LIMIT 10;
