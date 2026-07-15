-- XariciNomrəAz Database Schema
-- Run this SQL in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- SITE SETTINGS
-- =====================
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT NOT NULL DEFAULT 'XariciNomrəAz',
  slogan TEXT DEFAULT 'Xarici nömrələr haqqında doğru məlumat, düzgün seçim və təhlükəsiz istifadə.',
  hero_title TEXT DEFAULT 'Xarici virtual nömrələr haqqında bilməli olduğunuz hər şey',
  hero_subtitle TEXT DEFAULT 'Platformanıza uyğun ölkələri, aktual stok vəziyyətini, istifadə qaydalarını və təhlükəsizlik tövsiyələrini sifarişdən əvvəl öyrənin.',
  whatsapp_number TEXT NOT NULL DEFAULT '994501234567',
  instagram_url TEXT,
  telegram_url TEXT,
  email TEXT,
  working_hours TEXT DEFAULT '09:00 - 22:00',
  footer_text TEXT DEFAULT '© 2026 XariciNomrəAz. Bütün hüquqlar qorunur.',
  warning_text TEXT DEFAULT 'Bu sayt məlumatlandırma xarakterlidir. Sifariş və ödəniş yalnız XariciNomrəAz-ın rəsmi WhatsApp əlaqəsi vasitəsilə həyata keçirilir.',
  privacy_policy TEXT,
  terms_conditions TEXT,
  default_whatsapp_message TEXT DEFAULT 'Salam, XariciNomrəAz saytından gəlirəm. Xarici nömrə haqqında məlumat almaq istəyirəm.',
  primary_color TEXT DEFAULT '#6366f1',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (id) VALUES (uuid_generate_v4());

-- =====================
-- PLATFORMS
-- =====================
CREATE TABLE platforms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  icon TEXT DEFAULT 'smartphone',
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default platforms
INSERT INTO platforms (name, icon, description, sort_order) VALUES
  ('WhatsApp', 'message-circle', 'WhatsApp mesajlaşma platforması üçün virtual nömrələr', 1),
  ('Telegram', 'send', 'Telegram platforması üçün virtual nömrələr', 2),
  ('Digər platformalar', 'globe', 'Digər sosial şəbəkə və xidmətlər üçün nömrələr', 3);

-- =====================
-- COUNTRIES
-- =====================
CREATE TABLE countries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform_id UUID REFERENCES platforms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  flag TEXT NOT NULL DEFAULT '🏳️',
  country_code TEXT NOT NULL,
  stock_count INTEGER DEFAULT 0,
  stock_status TEXT DEFAULT 'out_of_stock' CHECK (stock_status IN ('in_stock', 'low_stock', 'out_of_stock', 'coming_soon', 'temporarily_unavailable', 'sales_stopped')),
  price DECIMAL(10,2),
  show_price BOOLEAN DEFAULT false,
  number_type TEXT,
  quality_level TEXT DEFAULT 'Standart',
  stability_level TEXT,
  is_premium BOOLEAN DEFAULT false,
  is_popular BOOLEAN DEFAULT false,
  recommended_use TEXT,
  short_description TEXT,
  detailed_description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample countries
INSERT INTO countries (platform_id, name, flag, country_code, stock_count, stock_status, price, show_price, quality_level, stability_level, is_premium, is_popular, recommended_use, short_description) VALUES
  ((SELECT id FROM platforms WHERE name = 'WhatsApp'), 'Türkiyə', '🇹🇷', '+90', 5, 'in_stock', 15, true, 'Standart', 'Orta', false, true, 'Şəxsi və biznes istifadəsi', 'Yeni hesab yaradılması üçün uyğun seçimdir.'),
  ((SELECT id FROM platforms WHERE name = 'WhatsApp'), 'Böyük Britaniya', '🇬🇧', '+44', 3, 'in_stock', 35, true, 'Premium', 'Yüksək', true, true, 'Uzunmüddətli şəxsi və biznes istifadəsi', 'Müştərilər tərəfindən uzunmüddətli istifadə üçün daha çox üstünlük verilən seçimdir.'),
  ((SELECT id FROM platforms WHERE name = 'WhatsApp'), 'ABŞ', '🇺🇸', '+1', 2, 'low_stock', 30, true, 'Premium', 'Yüksək', true, true, 'Biznes və şəxsi istifadə', 'Premium keyfiyyətli, stabil seçim.'),
  ((SELECT id FROM platforms WHERE name = 'WhatsApp'), 'Filippin', '🇵🇭', '+63', 0, 'out_of_stock', NULL, false, 'Standart', NULL, false, false, NULL, 'Yaxın zamanda əlavə ediləcək.'),
  ((SELECT id FROM platforms WHERE name = 'WhatsApp'), 'Hindistan', '🇮🇳', '+91', 4, 'in_stock', 12, true, 'Standart', 'Orta', false, false, 'Birdəfəlik və qısamüddətli istifadə', 'Qısa müddətli istifadə üçün əlverişli seçimdir.'),
  ((SELECT id FROM platforms WHERE name = 'Telegram'), 'Türkiyə', '🇹🇷', '+90', 3, 'in_stock', 10, true, 'Standart', 'Orta', false, true, 'Yeni hesab yaratmaq', 'Telegram üçün uyğun seçim.'),
  ((SELECT id FROM platforms WHERE name = 'Telegram'), 'Böyük Britaniya', '🇬🇧', '+44', 2, 'in_stock', 25, true, 'Premium', 'Yüksək', true, false, 'Uzunmüddətli istifadə', 'Premium və stabil Telegram nömrəsi.'),
  ((SELECT id FROM platforms WHERE name = 'Telegram'), 'Rusiya', '🇷🇺', '+7', 6, 'in_stock', 8, true, 'Standart', 'Orta', false, true, 'Şəxsi istifadə', 'Geniş stokda olan əlverişli seçim.');

-- =====================
-- REVIEWS
-- =====================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  platform TEXT NOT NULL,
  country TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam', 'deleted')),
  is_featured BOOLEAN DEFAULT false,
  show_on_home BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample reviews
INSERT INTO reviews (name, platform, country, rating, message, status, is_featured, show_on_home) VALUES
  ('Elvin M.', 'WhatsApp', 'Türkiyə', 5, 'Çox sürətli xidmət. Nömrəni 5 dəqiqə ərzində aldım. Təlimatlar çox aydın idi.', 'approved', true, true),
  ('Aysel K.', 'WhatsApp', 'Böyük Britaniya', 5, 'Premium nömrə aldım, 3 aydır heç bir problem olmadan istifadə edirəm. Tövsiyə edirəm.', 'approved', true, true),
  ('Rəşad N.', 'Telegram', 'Türkiyə', 4, 'Telegram üçün nömrə aldım. Xidmət keyfiyyətli idi, təşəkkür edirəm.', 'approved', false, true);

-- =====================
-- FAQ
-- =====================
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default FAQs
INSERT INTO faqs (question, answer, sort_order) VALUES
  ('Xarici virtual nömrə nədir?', 'Xarici virtual nömrə fiziki SIM kartın istifadəçinin cihazında olmadığı, lakin müəyyən platformalarda qeydiyyat, SMS təsdiqi və ya hesab istifadəsi üçün təqdim edilən xarici ölkə nömrəsidir.', 1),
  ('Nömrəni neçə dəqiqəyə əldə edirəm?', 'Ödəniş təsdiqləndikdən sonra nömrə adətən 5-15 dəqiqə ərzində təqdim edilir. Bəzi hallarda bu müddət bir qədər dəyişə bilər.', 2),
  ('Nömrə hansı platformalarda işləyir?', 'Hər nömrə konkret platforma üçün təqdim edilir. WhatsApp, Telegram və digər platformalar üçün ayrıca nömrələr mövcuddur.', 3),
  ('Kod gəlməsə nə baş verir?', 'Əgər SMS kodu müəyyən müddət ərzində gəlməzsə, XariciNomrəAz ilə əlaqə saxlayın. Şərtlərə uyğun olaraq alternativ həll təklif ediləcək.', 4),
  ('Nömrə daimidirmi?', 'Bu, nömrənin növünə görə dəyişir. Birdəfəlik nömrələr yalnız kod almaq üçündür, uzunmüddətli nömrələr isə daha uzun müddət istifadə edilə bilər.', 5),
  ('Hesab bloklana bilərmi?', 'Hər bir platforma öz qaydalarına malikdir. Spam, kütləvi mesaj və qayda pozuntusu blok riskini artırır. Təlimatlarımıza əməl etdikdə risk minimuma endirilir.', 6),
  ('Hansı ölkə daha stabildir?', 'Premium kateqoriyasındakı ölkələr (Böyük Britaniya, ABŞ və s.) daha stabil hesab olunur. Amma heç bir nömrə üçün 100% zəmanət verilmir.', 7),
  ('İki addımlı doğrulama nə vaxt aktiv edilməlidir?', 'Hesabı aldıqdan dərhal sonra iki addımlı doğrulamanı aktiv etməniz tövsiyə olunur. Bu, hesabınızın təhlükəsizliyi üçün vacibdir.', 8),
  ('VPN istifadə etmək olar?', 'Bəzi platformalar VPN istifadəsini şübhəli hesab edə bilər. Mümkün olduqda sabit internet bağlantısından istifadə edin.', 9),
  ('Ödəniş necə edilir?', 'Ödəniş WhatsApp vasitəsilə razılaşdırılır. Satıcı ödəniş məlumatlarını əlaqə zamanı təqdim edir.', 10),
  ('Geri qaytarma və dəyişdirmə şərtləri necədir?', 'Geri qaytarma şərtləri məhsulun növünə görə dəyişir. Ətraflı məlumat üçün WhatsApp vasitəsilə əlaqə saxlayın.', 11),
  ('Stoklar nə qədər tez yenilənir?', 'Stok məlumatları mütəmadi olaraq yenilənir. Son yenilənmə tarixi hər ölkə kartında göstərilir.', 12);

-- =====================
-- INFO ARTICLES
-- =====================
CREATE TABLE info_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ADMIN ACTIVITIES
-- =====================
CREATE TABLE admin_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  details TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================

-- Public read access for platforms
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active platforms" ON platforms FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage platforms" ON platforms FOR ALL USING (auth.role() = 'authenticated');

-- Public read access for countries
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active countries" ON countries FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage countries" ON countries FOR ALL USING (auth.role() = 'authenticated');

-- Public can read approved reviews, submit new reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read approved reviews" ON reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Public can submit reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage reviews" ON reviews FOR ALL USING (auth.role() = 'authenticated');

-- Public can read active FAQs
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active FAQs" ON faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage FAQs" ON faqs FOR ALL USING (auth.role() = 'authenticated');

-- Public can read active info articles
ALTER TABLE info_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active articles" ON info_articles FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage articles" ON info_articles FOR ALL USING (auth.role() = 'authenticated');

-- Public can read site settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Only admins can see activities
ALTER TABLE admin_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage activities" ON admin_activities FOR ALL USING (auth.role() = 'authenticated');

-- =====================
-- FUNCTIONS
-- =====================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
CREATE TRIGGER update_platforms_updated_at BEFORE UPDATE ON platforms FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_countries_updated_at BEFORE UPDATE ON countries FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_info_articles_updated_at BEFORE UPDATE ON info_articles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-update last_updated on countries when stock changes
CREATE OR REPLACE FUNCTION update_country_last_updated()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.stock_count != NEW.stock_count OR OLD.stock_status != NEW.stock_status THEN
    NEW.last_updated = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_country_stock_timestamp BEFORE UPDATE ON countries FOR EACH ROW EXECUTE FUNCTION update_country_last_updated();
