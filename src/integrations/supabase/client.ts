// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zjiuajfoimfmavezpmob.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqaXVhamZvaW1mbWF2ZXpwbW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTE4NzUsImV4cCI6MjA2NTQ4Nzg3NX0.E-ZonT-pGSg545O9N2cmblqb_pdYq_TdL5LPmiNRm44";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);