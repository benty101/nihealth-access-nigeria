-- Create user_role enum type first
CREATE TYPE user_role AS ENUM ('super_admin', 'hospital_admin', 'patient', 'broker');