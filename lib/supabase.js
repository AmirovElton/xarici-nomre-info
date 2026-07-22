import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Konfiqurasiya yoxlaması (Vercel loglarında görünəcək)
if (!supabaseUrl) {
  console.error('⚠️ SUPABASE_URL environment variable təyin edilməyib!');
}
if (!supabaseServiceKey) {
  console.error('⚠️ SUPABASE_SERVICE_KEY təyin edilməyib! Bot düzgün işləməyəcək. Vercel-də bu dəyişəni əlavə edin.');
}

// Public client (adi əməliyyatlar üçün)
export const supabase = createClient(supabaseUrl, supabaseKey || supabaseServiceKey);

// Service client (admin əməliyyatları - RLS bypass edir)
// Əgər service key yoxdursa, anon key-ə fallback edir (amma RLS problemi ola bilər)
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseKey
);
