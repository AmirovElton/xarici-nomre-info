import { supabaseAdmin } from '../lib/supabase.js';

/**
 * Diaqnostika endpoint - problemin dəqiq harada olduğunu göstərir.
 *
 * İstifadə:
 *   https://<your-app>.vercel.app/api/debug?key=<ADMIN_PASSWORD>
 *
 * Bu səhifə hər şeyi yoxlayır: env dəyişənləri, DB bağlantısı,
 * cədvəl sütunları, webhook vəziyyəti.
 */
export default async function handler(req, res) {
  // Sadə qorunma
  const key = req.query?.key;
  if (!process.env.ADMIN_PASSWORD || key !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({
      error: 'İcazəsiz. URL-ə ?key=<ADMIN_PASSWORD> əlavə edin.',
    });
  }

  const report = {
    timestamp: new Date().toISOString(),
    env: {},
    database: {},
    webhook: {},
    stateTest: {},
  };

  // ─── 1. Environment dəyişənləri ───
  const rawUrl = process.env.SUPABASE_URL || '';
  const urlHasTrailingSpace = rawUrl !== rawUrl.trim();
  const urlHasTrailingSlash = /\/+$/.test(rawUrl.trim());

  report.env = {
    BOT_TOKEN: process.env.BOT_TOKEN ? '✅ var' : '❌ YOXDUR',
    SUPABASE_URL: process.env.SUPABASE_URL ? '✅ var' : '❌ YOXDUR',
    SUPABASE_URL_problemi: urlHasTrailingSpace
      ? '❌ URL-də boşluq/newline var! (təmizlənir)'
      : urlHasTrailingSlash
        ? '⚠️ URL sonunda slash var (təmizlənir)'
        : '✅ təmizdir',
    SUPABASE_URL_uzunluq: `raw=${rawUrl.length}, trimmed=${rawUrl.trim().length}`,
    SUPABASE_KEY: process.env.SUPABASE_KEY ? '✅ var' : '❌ YOXDUR',
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? '✅ var' : '❌ YOXDUR (VACİB!)',
    ADMIN_CHAT_ID: process.env.ADMIN_CHAT_ID ? '✅ var' : '❌ YOXDUR',
    WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER ? '✅ var' : '⚠️ yoxdur (default istifadə olunur)',
  };

  // ─── 2. Database bağlantısı və cədvəllər ───
  try {
    // users cədvəli və sütunları
    const { data: usersData, error: usersErr } = await supabaseAdmin
      .from('users')
      .select('*')
      .limit(1);

    if (usersErr) {
      report.database.users = `❌ XƏTA: ${usersErr.message}`;
    } else {
      const columns = usersData && usersData.length > 0
        ? Object.keys(usersData[0])
        : [];
      report.database.users = {
        status: '✅ əlçatan',
        rowCount: usersData?.length ?? 0,
        columns: columns.length > 0 ? columns : '(cədvəl boşdur - sütunları göstərmək üçün ən azı 1 sətir lazımdır)',
        hasStateColumn: columns.length === 0 ? '?' : (columns.includes('state') ? '✅ VAR' : '❌ YOXDUR - migration.sql çalışdırın!'),
        hasLastMessageId: columns.length === 0 ? '?' : (columns.includes('last_message_id') ? '✅ VAR' : '❌ YOXDUR'),
      };
    }
  } catch (e) {
    report.database.users = `❌ İSTİSNA: ${e.message}`;
  }

  // state sütununu birbaşa yoxla
  try {
    const { error: stateColErr } = await supabaseAdmin
      .from('users')
      .select('state')
      .limit(1);
    report.database.stateColumnCheck = stateColErr
      ? `❌ 'state' sütunu problemi: ${stateColErr.message}`
      : "✅ 'state' sütunu mövcuddur";
  } catch (e) {
    report.database.stateColumnCheck = `❌ ${e.message}`;
  }

  // Digər cədvəllər
  for (const table of ['platforms', 'countries', 'reviews']) {
    try {
      const { count, error } = await supabaseAdmin
        .from(table)
        .select('*', { count: 'exact', head: true });
      report.database[table] = error
        ? `❌ ${error.message}`
        : `✅ əlçatan (${count ?? 0} sətir)`;
    } catch (e) {
      report.database[table] = `❌ ${e.message}`;
    }
  }

  // ─── 3. State yazma/oxuma testi ───
  const testId = 999999999; // test üçün saxta telegram_id
  try {
    // Test istifadəçi yarat/tap
    await supabaseAdmin
      .from('users')
      .upsert({ telegram_id: testId, first_name: 'DEBUG_TEST' }, { onConflict: 'telegram_id' });

    // State yaz
    const { error: writeErr } = await supabaseAdmin
      .from('users')
      .update({ state: 'awaiting_review' })
      .eq('telegram_id', testId);

    // State oxu
    const { data: readData, error: readErr } = await supabaseAdmin
      .from('users')
      .select('state')
      .eq('telegram_id', testId)
      .maybeSingle();

    if (writeErr) {
      report.stateTest.write = `❌ YAZMA XƏTASI: ${writeErr.message}`;
    } else {
      report.stateTest.write = '✅ state yazıldı';
    }

    if (readErr) {
      report.stateTest.read = `❌ OXUMA XƏTASI: ${readErr.message}`;
    } else {
      report.stateTest.read = readData?.state === 'awaiting_review'
        ? "✅ state düzgün oxundu ('awaiting_review')"
        : `❌ state yanlış: '${readData?.state}' (gözlənilən: 'awaiting_review')`;
    }

    report.stateTest.verdict = (!writeErr && readData?.state === 'awaiting_review')
      ? '✅✅✅ STATE SİSTEMİ İŞLƏYİR - problem başqa yerdədir'
      : '❌❌❌ STATE SİSTEMİ SINIQ - bu, botun mətnə cavab verməməsinin səbəbidir';

    // Təmizlə
    await supabaseAdmin.from('users').delete().eq('telegram_id', testId);
  } catch (e) {
    report.stateTest.error = `❌ İSTİSNA: ${e.message}`;
  }

  // ─── 4. Telegram Webhook vəziyyəti ───
  try {
    if (process.env.BOT_TOKEN) {
      const wh = await fetch(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getWebhookInfo`
      );
      const whData = await wh.json();
      if (whData.ok) {
        report.webhook = {
          url: whData.result.url || '❌ WEBHOOK TƏYİN EDİLMƏYİB!',
          pending_updates: whData.result.pending_update_count,
          last_error: whData.result.last_error_message || '✅ xəta yoxdur',
          last_error_date: whData.result.last_error_date
            ? new Date(whData.result.last_error_date * 1000).toISOString()
            : null,
        };
      } else {
        report.webhook = `❌ Telegram API xətası: ${JSON.stringify(whData)}`;
      }
    }
  } catch (e) {
    report.webhook = `❌ ${e.message}`;
  }

  res.status(200).json(report);
}
