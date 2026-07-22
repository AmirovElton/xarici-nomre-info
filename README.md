# 📱 XariciNömrəAz — Telegram Bot

Virtual nömrə satışı üçün məlumat və sifariş botu. Vercel (Serverless) + Supabase (Database) + Telegram Bot API ilə qurulub.

## 🎯 Xüsusiyyətlər

- ✅ **Xoş gəldin mesajı** — İstifadəçi adı ilə şəxsi qarşılama
- ✅ **Məlumat bölməsi** — Virtual nömrə haqqında 8 ətraflı bölmə
- ✅ **Nömrələrə baxış** — Platformalar → Ölkələr → Ətraflı məlumat (səhifələnmiş)
- ✅ **WhatsApp yönləndirmə** — Hazır mesajla sifariş düyməsi
- ✅ **Rəy sistemi** — Ulduz reytinqi + mətn + admin təsdiqi
- ✅ **Admin panel** — Bot daxilində rəy idarəetməsi və statistika
- ✅ **Admin API** — REST API ilə platform/ölkə/rəy idarəetməsi
- ✅ **Mesaj edit sistemi** — Bütün naviqasiya mesaj edit ilə (təmiz chat)

## 📐 Arxitektura

```
Telegram → Webhook → Vercel Serverless → Supabase PostgreSQL
```

## 🚀 Qurulma

### 1. Telegram Bot yaradın

1. [@BotFather](https://t.me/BotFather)-ə yazın
2. `/newbot` göndərin
3. Bot adını və username-ini seçin
4. **Bot Token**-i kopyalayın

### 2. Supabase bazasını qurun

1. [supabase.com](https://supabase.com) → Yeni layihə yaradın
2. **SQL Editor**-ə keçin
3. `database/schema.sql` faylının içindəki SQL kodunu yapışdırıb **Run** edin
4. **Settings → API** bölməsindən URL və açarları kopyalayın:
   - `SUPABASE_URL` — Project URL
   - `SUPABASE_KEY` — anon/public key
   - `SUPABASE_SERVICE_KEY` — service_role key

### 3. Vercel-ə deploy edin

1. [vercel.com](https://vercel.com) → GitHub repo-nu import edin
2. **Environment Variables** əlavə edin:

| Dəyişən | Təsvir |
|---------|--------|
| `BOT_TOKEN` | Telegram Bot Token |
| `SUPABASE_URL` | Supabase Project URL |
| `SUPABASE_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_KEY` | Supabase service role key |
| `ADMIN_CHAT_ID` | Admin Telegram chat ID |
| `ADMIN_PASSWORD` | Admin API üçün parol |
| `WHATSAPP_NUMBER` | WhatsApp nömrəniz (994XXXXXXXXX) |

3. Deploy edin

### 4. Webhook qoşun

Deploy-dan sonra bu URL-ə birdəfəlik GET sorğusu göndərin:

```
https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<your-app>.vercel.app/api/webhook
```

## 📁 Layihə Strukturu

```
├── api/
│   ├── webhook.js              ← Əsas bot webhook handler
│   └── admin/
│       ├── platforms.js        ← Platforma CRUD API
│       ├── countries.js        ← Ölkə CRUD API
│       └── reviews.js          ← Rəy idarəetmə API
├── handlers/
│   ├── start.js                ← /start komandası
│   ├── info.js                 ← Məlumat bölməsi
│   ├── numbers.js              ← Nömrələr bölməsi
│   ├── reviews.js              ← Rəylər bölməsi
│   └── admin.js                ← Admin bot paneli
├── lib/
│   ├── telegram.js             ← Telegram API helpers
│   ├── supabase.js             ← Supabase client
│   ├── userState.js            ← İstifadəçi state idarəetməsi
│   └── auth.js                 ← Admin autentifikasiya
├── database/
│   └── schema.sql              ← Database schema + default data
├── package.json
├── vercel.json
├── .env.example
└── .gitignore
```

## 🤖 Bot Komandaları

| Komanda | Təsvir |
|---------|--------|
| `/start` | Botu başlat / Ana menyuya qayıt |
| `/admin` | Admin panel (yalnız admin) |

## 🔐 Admin API İstifadəsi

Bütün admin API sorğuları `Authorization: Bearer <ADMIN_PASSWORD>` header-i tələb edir.

### Platformalar

```bash
# Siyahı
curl -H "Authorization: Bearer YOUR_PASSWORD" \
  https://your-app.vercel.app/api/admin/platforms

# Yeni platforma
curl -X POST -H "Authorization: Bearer YOUR_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"name":"Instagram","emoji":"📸","description":"Instagram üçün"}' \
  https://your-app.vercel.app/api/admin/platforms
```

### Ölkələr

```bash
# Siyahı (platformaya görə)
curl -H "Authorization: Bearer YOUR_PASSWORD" \
  "https://your-app.vercel.app/api/admin/countries?platform_id=1"

# Yeni ölkə
curl -X POST -H "Authorization: Bearer YOUR_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"platform_id":1,"name":"Fransa","flag":"🇫🇷","country_code":"+33","price":8.00,"stock":10}' \
  https://your-app.vercel.app/api/admin/countries

# Stok yenilə
curl -X PUT -H "Authorization: Bearer YOUR_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"id":1,"stock":50,"price":5.50}' \
  https://your-app.vercel.app/api/admin/countries
```

### Rəylər

```bash
# Gözləyən rəylər
curl -H "Authorization: Bearer YOUR_PASSWORD" \
  "https://your-app.vercel.app/api/admin/reviews?status=pending"

# Rəy təsdiq et
curl -X PUT -H "Authorization: Bearer YOUR_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"id":1,"is_approved":true}' \
  https://your-app.vercel.app/api/admin/reviews

# Rəy sil
curl -X DELETE -H "Authorization: Bearer YOUR_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"id":1}' \
  https://your-app.vercel.app/api/admin/reviews
```

## 💡 Admin Chat ID-ni Necə Tapmaq

1. [@userinfobot](https://t.me/userinfobot)-a yazın
2. O sizin Telegram ID-nizi göstərəcək
3. Bu ID-ni `ADMIN_CHAT_ID` olaraq istifadə edin

## 📝 Qeydlər

- Vercel Free Tier kifayətdir (ayda 100K sorğu)
- Supabase Free Tier kifayətdir (500MB database)
- Bot 7/24 işləyir (serverless)
- GitHub-a push etdikdə avtomatik deploy olunur
- Stok və qiymət dəyişiklikləri dərhal bot-da əks olunur



## 🔧 Problemlərin Həlli (Troubleshooting)

### ❌ Bot mətn mesajlarına cavab vermir (rəy, admin input)

Bu ən çox rast gəlinən problemdir. Səbəbi: `users` cədvəlində `state` sütunu yoxdur.

**Həll:**
1. Supabase → SQL Editor aç
2. `database/migration.sql` faylının içindəkiləri çalışdır
3. Bu, çatışmayan sütunları (`state`, `last_message_id`, `updated_at`) təhlükəsiz əlavə edir (məlumatı silmir)

### ❌ Bot ümumiyyətlə cavab vermir

1. **Environment Variables yoxla** — Vercel-də bu 3-ü mütləq olmalıdır:
   - `BOT_TOKEN`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY` ← **ən vacib!** Bu olmadan state işləməz
2. **Webhook yoxla:**
   ```
   https://api.telegram.org/bot<TOKEN>/getWebhookInfo
   ```
   `url` düzgün olmalıdır və `last_error_message` boş olmalıdır

### 🔍 Diaqnostika (Vercel Logs)

Bot artıq hər addımı loglayır. Vercel → Layihə → **Logs** bölməsində:
- `Incoming update:` — gələn mesajlar
- `handleMessage: state=...` — istifadəçi state-i
- `updateUserState error:` — əgər state yazıla bilmirsə (sütun problemi)
- `SUPABASE_SERVICE_KEY təyin edilməyib` — env dəyişən problemi

Bu loglar problemin dəqiq harada olduğunu göstərəcək.
