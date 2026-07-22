import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Public client (for normal operations)
export const supabase = createClient(supabaseUrl, supabaseKey);

// Service client (for admin operations - bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
