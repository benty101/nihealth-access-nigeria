
-- Let's check the actual count in the database
SELECT COUNT(*) as total_count FROM public.hospitals WHERE is_active = true;

-- Check if there are any duplicate license numbers or other issues
SELECT COUNT(DISTINCT name) as unique_names, COUNT(*) as total_records 
FROM public.hospitals WHERE is_active = true;

-- Let's see the distribution by state to understand what happened
SELECT state, COUNT(*) as count 
FROM public.hospitals WHERE is_active = true 
GROUP BY state 
ORDER BY count DESC;

-- Check if there are any hospitals that might not be active
SELECT is_active, COUNT(*) as count 
FROM public.hospitals 
GROUP BY is_active;
