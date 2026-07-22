import { createClient } from '@supabase/supabase-js';

/**
 * Environment dəyişənlərini təmizlə.
 * Vercel-ə kopyalayanda tez-tez sonda boşluq, newline və ya slash düşür.
 * Bu, "Invalid path specified in request URL" xətasına səbəb olur.
 */
function clean(value) {
  if (!value) return value;
  return value.trim();
}

/**
 * Supabase URL-ini normallaşdır - yalnız protokol + host saxla,
 * sonundakı slash-ları və artıq path-ları sil.
 */
function normalizeUrl(url) {
  const cleaned = clean(url);
  if (!cleaned) return cleaned;
  try {
    const u = new URL(cleaned);
    return `${u.protocol}//${u.host}`; // path, trailing slash, query silinir
  } catch (e) {
    // URL parse olunmursa, ən azı trailing slash-ları sil
    return cleaned.replace(/\/+$/, '');
  }
}

const supabaseUrl = normalizeUrl(process.env.SUPABASE_URL);
const supabaseKey = clean(process.env.SUPABASE_KEY);
const supabaseServiceKey = clean(process.env.SUPABASE_SERVICE_KEY);

// Konfiqurasiya yoxlaması (Vercel loglarında görünəcək)
if (!supabaseUrl) {
  console.error('⚠️ SUPABASE_URL environment variable təyin edilməyib!');
} else {
  console.log('Supabase URL (normalized):', supabaseUrl);
}
if (!supabaseServiceKey) {
  console.error('⚠️ SUPABASE_SERVICE_KEY təyin edilməyib! Bot düzgün işləməyəcək. Vercel-də bu dəyişəni əlavə edin.');
}

// Public client (adi əməliyyatlar üçün)
export const supabase = createClient(supabaseUrl, supabaseKey || supabaseServiceKey);

// Service client (admin əməliyyatları - RLS bypass edir)
// Əgər service key yoxdursa, anon key-ə fallback edir
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || supabaseKey
);
