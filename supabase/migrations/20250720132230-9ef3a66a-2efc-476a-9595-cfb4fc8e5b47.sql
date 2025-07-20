-- Create the user_role enum type if it doesn't exist
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'hospital_admin', 'super_admin', 'broker');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update the user_roles table to use the enum if not already
DO $$ BEGIN
    ALTER TABLE user_roles ALTER COLUMN role SET DATA TYPE user_role USING role::user_role;
EXCEPTION
    WHEN OTHERS THEN 
        -- If conversion fails, let's check the current state
        RAISE NOTICE 'Could not convert role column to enum type. Current state preserved.';
END $$;