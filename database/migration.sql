-- =============================================
-- XariciNömrəAz - MIGRATION (Düzəliş)
-- =============================================
-- ƏGƏR bot mətn mesajlarına (rəy, admin input) cavab vermirsə,
-- bu o deməkdir ki, `users` cədvəlində `state` sütunu yoxdur.
--
-- Bu SQL-i Supabase SQL Editor-da çalışdırın.
-- Bu, MÖVCUD məlumatları SİLMİR — yalnız çatışmayan sütunları əlavə edir.
-- =============================================

-- users cədvəlinə çatışmayan sütunları əlavə et
ALTER TABLE users ADD COLUMN IF NOT EXISTS state TEXT DEFAULT 'idle';
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_message_id BIGINT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS username TEXT;

-- Mövcud sətirlərdə state NULL-dursa 'idle' et
UPDATE users SET state = 'idle' WHERE state IS NULL;

-- reviews cədvəlində çatışmayan sütunlar (ehtiyat üçün)
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS rating INTEGER;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT false;

-- Yoxlama: users cədvəlinin sütunlarını göstər
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;
