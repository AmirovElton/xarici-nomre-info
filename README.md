# XariciNomrəAz

Xarici virtual nömrələr haqqında məlumatlandırıcı sayt.

## Texnologiyalar

- **Next.js 14** (App Router)
- **Tailwind CSS** (Glassmorphism dizayn)
- **Supabase** (PostgreSQL + Auth)
- **TypeScript**
- **Lucide React** (İkonlar)
- **Framer Motion** (Animasiyalar)

## Quraşdırma

```bash
npm install
cp .env.local.example .env.local
# .env.local faylına Supabase məlumatlarınızı daxil edin
npm run dev
```

## Supabase Setup

1. [supabase.com](https://supabase.com) hesab yaradın
2. Yeni layihə yaradın
3. SQL Editor-da `supabase/schema.sql` faylını işlədin
4. Project Settings > API > URL və anon key kopyalayın
5. `.env.local` faylına yapışdırın

## Deploy (Vercel)

1. [vercel.com](https://vercel.com) GitHub ilə giriş edin
2. "Import Project" > bu repo-nu seçin
3. Environment Variables əlavə edin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy edin!

## Sayt Strukturu

- `/` - Ana səhifə
- `/numbers` - Nömrələr (platforma seçimi, filtr, axtarış)
- `/guide` - Bələdçi (FAQ, təlimat, proses)
- `/premium` - Premium seçimlər
- `/reviews` - Müştəri rəyləri
- `/admin` - Admin panel (gizli)
