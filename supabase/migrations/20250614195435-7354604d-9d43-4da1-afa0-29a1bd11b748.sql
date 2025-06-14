
-- Delete all user roles first (due to foreign key constraints)
DELETE FROM public.user_roles;

-- Delete all profiles
DELETE FROM public.profiles;

-- Delete all medical records
DELETE FROM public.medical_records;

-- Delete any other user-related data
DELETE FROM public.hospital_staff;

-- Note: We cannot directly delete from auth.users table as it's managed by Supabase
-- But deleting the related data above will clean up most user data

-- Reset the super admin creation flag in case it was stored
-- (This will allow the super admin to be recreated)
