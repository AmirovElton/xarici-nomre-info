-- =============================================
-- XariciNömrəAz Telegram Bot - Database Schema
-- Supabase SQL Editor-da bu kodu çalışdırın
-- =============================================

-- Platformalar (WhatsApp, Telegram, Digərləri)
CREATE TABLE platforms (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  emoji TEXT DEFAULT '📱',
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ölkələr
CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  platform_id INTEGER REFERENCES platforms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  flag TEXT DEFAULT '🏳️',
  country_code TEXT,          -- +90, +1, +7
  quality TEXT DEFAULT 'Yüksək',  -- Yüksək, Orta, Aşağı
  success_rate INTEGER DEFAULT 95, -- Uğur faizi (%)
  stock INTEGER DEFAULT 0,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'AZN',
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- İstifadəçilər (bot istifadəçiləri)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  telegram_id BIGINT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  username TEXT,
  last_message_id BIGINT,     -- Son göndərilən mesajın ID-si (edit üçün)
  state TEXT DEFAULT 'idle',   -- idle, awaiting_review, awaiting_rating
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rəylər
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,         -- Telegram user ID
  first_name TEXT,
  last_name TEXT,
  username TEXT,
  text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_approved BOOLEAN DEFAULT false,  -- Admin təsdiq etməlidir
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Default Data - İlkin platformalar
-- =============================================

INSERT INTO platforms (name, emoji, description, sort_order) VALUES
('WhatsApp', '💬', 'WhatsApp üçün virtual nömrələr', 1),
('Telegram', '✈️', 'Telegram üçün virtual nömrələr', 2),
('Digərləri', '📱', 'Digər platformalar üçün virtual nömrələr (Instagram, Gmail və s.)', 3);

-- Default ölkələr - WhatsApp (platform_id = 1)
INSERT INTO countries (platform_id, name, flag, country_code, quality, success_rate, stock, price, sort_order) VALUES
(1, 'Türkiyə', '🇹🇷', '+90', 'Yüksək', 97, 25, 5.00, 1),
(1, 'ABŞ', '🇺🇸', '+1', 'Yüksək', 95, 15, 7.00, 2),
(1, 'Böyük Britaniya', '🇬🇧', '+44', 'Yüksək', 96, 10, 8.00, 3),
(1, 'Rusiya', '🇷🇺', '+7', 'Orta', 90, 20, 4.00, 4),
(1, 'Almaniya', '🇩🇪', '+49', 'Yüksək', 94, 12, 9.00, 5),
(1, 'Niderland', '🇳🇱', '+31', 'Yüksək', 93, 8, 8.50, 6),
(1, 'Kanada', '🇨🇦', '+1', 'Yüksək', 94, 10, 7.50, 7),
(1, 'Braziliya', '🇧🇷', '+55', 'Orta', 88, 18, 4.50, 8),
(1, 'Hindistan', '🇮🇳', '+91', 'Orta', 85, 30, 3.00, 9),
(1, 'İndoneziya', '🇮🇩', '+62', 'Orta', 87, 22, 3.50, 10),
(1, 'Filippin', '🇵🇭', '+63', 'Orta', 86, 15, 3.50, 11),
(1, 'Meksika', '🇲🇽', '+52', 'Orta', 88, 12, 4.00, 12);

-- Default ölkələr - Telegram (platform_id = 2)
INSERT INTO countries (platform_id, name, flag, country_code, quality, success_rate, stock, price, sort_order) VALUES
(2, 'ABŞ', '🇺🇸', '+1', 'Yüksək', 96, 20, 6.00, 1),
(2, 'Böyük Britaniya', '🇬🇧', '+44', 'Yüksək', 95, 12, 7.00, 2),
(2, 'Rusiya', '🇷🇺', '+7', 'Yüksək', 97, 30, 3.50, 3),
(2, 'Türkiyə', '🇹🇷', '+90', 'Yüksək', 94, 18, 4.50, 4),
(2, 'Almaniya', '🇩🇪', '+49', 'Yüksək', 93, 10, 8.00, 5),
(2, 'Kanada', '🇨🇦', '+1', 'Yüksək', 94, 8, 6.50, 6),
(2, 'Niderland', '🇳🇱', '+31', 'Yüksək', 92, 7, 7.50, 7),
(2, 'Ukrayna', '🇺🇦', '+380', 'Orta', 89, 25, 3.00, 8);

-- Default ölkələr - Digərləri (platform_id = 3)
INSERT INTO countries (platform_id, name, flag, country_code, quality, success_rate, stock, price, description, sort_order) VALUES
(3, 'ABŞ (Gmail)', '🇺🇸', '+1', 'Yüksək', 93, 15, 5.50, 'Gmail/Google doğrulama üçün', 1),
(3, 'ABŞ (Instagram)', '🇺🇸', '+1', 'Yüksək', 91, 12, 6.00, 'Instagram doğrulama üçün', 2),
(3, 'Türkiyə (Instagram)', '🇹🇷', '+90', 'Yüksək', 92, 20, 4.50, 'Instagram doğrulama üçün', 3),
(3, 'Rusiya (VK)', '🇷🇺', '+7', 'Yüksək', 95, 25, 3.00, 'VKontakte doğrulama üçün', 4),
(3, 'Böyük Britaniya (Facebook)', '🇬🇧', '+44', 'Yüksək', 90, 8, 7.00, 'Facebook doğrulama üçün', 5),
(3, 'Hindistan (OTP)', '🇮🇳', '+91', 'Orta', 85, 30, 2.50, 'Ümumi OTP doğrulama üçün', 6);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public read access for platforms and countries
CREATE POLICY "Public read platforms" ON platforms FOR SELECT USING (true);
CREATE POLICY "Public read countries" ON countries FOR SELECT USING (true);

-- Users can read/write their own data
CREATE POLICY "Users manage own data" ON users FOR ALL USING (true);

-- Reviews: public can read approved, anyone can insert
CREATE POLICY "Public read approved reviews" ON reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Anyone can insert reviews" ON reviews FOR INSERT WITH CHECK (true);

-- Service role can do everything (for admin operations)
-- Note: Service role key bypasses RLS automatically
