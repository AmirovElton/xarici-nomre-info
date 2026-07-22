import { sendOrEdit, inlineKeyboard } from '../lib/telegram.js';
import { supabaseAdmin } from '../lib/supabase.js';

const COUNTRIES_PER_PAGE = 5;
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '994501234567';

/**
 * Nömrələrə bax - Əsas menyu (platformalar)
 */
export async function handleNumbers(chatId, messageId) {
  // Platformaları bazadan al
  const { data: platforms } = await supabaseAdmin
    .from('platforms')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  const text = `📱 <b>Nömrələrə Bax</b>

━━━━━━━━━━━━━━━━━━━━
🌍 <b>XariciNömrəAz</b> — Mövcud Nömrələr
━━━━━━━━━━━━━━━━━━━━

Aşağıdan platforma seçin və mövcud ölkələrə baxın.
Hər nömrə haqqında ətraflı məlumat əldə edə bilərsiniz.`;

  const buttons = platforms.map((p) => [
    { text: `${p.emoji} ${p.name}`, callback_data: `platform_${p.id}` },
  ]);

  buttons.push([{ text: '🔙 Ana Menyu', callback_data: 'home' }]);

  const keyboard = inlineKeyboard(buttons);
  await sendOrEdit(chatId, messageId, text, keyboard);
}

/**
 * Platforma seçildikdə - ölkələri göstər (səhifələnmiş)
 */
export async function handlePlatform(chatId, messageId, platformId) {
  await handleCountryPage(chatId, messageId, platformId, 1);
}

/**
 * Ölkə səhifəsi (pagination ilə)
 */
export async function handleCountryPage(chatId, messageId, platformId, page) {
  // Platformanı al
  const { data: platform } = await supabaseAdmin
    .from('platforms')
    .select('*')
    .eq('id', platformId)
    .single();

  if (!platform) return;

  // Ölkələri al
  const { data: countries, count } = await supabaseAdmin
    .from('countries')
    .select('*', { count: 'exact' })
    .eq('platform_id', platformId)
    .eq('is_active', true)
    .order('sort_order')
    .range((page - 1) * COUNTRIES_PER_PAGE, page * COUNTRIES_PER_PAGE - 1);

  const totalPages = Math.ceil((count || 0) / COUNTRIES_PER_PAGE);

  let text = `${platform.emoji} <b>${platform.name} — Mövcud Ölkələr</b>

━━━━━━━━━━━━━━━━━━━━

`;

  if (platform.description) {
    text += `${platform.description}\n\n`;
  }

  text += `Aşağıdan ölkə seçin və ətraflı məlumat əldə edin:`;

  if (count === 0) {
    text += `\n\n⚠️ Hal-hazırda bu platforma üçün stokda nömrə yoxdur.`;
  }

  // Ölkə butonları
  const buttons = [];

  if (countries && countries.length > 0) {
    countries.forEach((country) => {
      const stockEmoji = country.stock > 0 ? '🟢' : '🔴';
      buttons.push([
        {
          text: `${country.flag} ${country.name} — ${country.price} ${country.currency} ${stockEmoji}`,
          callback_data: `country_${country.id}`,
        },
      ]);
    });
  }

  // Səhifə naviqasiyası
  const navButtons = [];
  if (page > 1) {
    navButtons.push({
      text: '◀️ Əvvəlki',
      callback_data: `page_${platformId}_${page - 1}`,
    });
  }
  if (totalPages > 1) {
    navButtons.push({
      text: `📄 ${page}/${totalPages}`,
      callback_data: 'noop',
    });
  }
  if (page < totalPages) {
    navButtons.push({
      text: 'Növbəti ▶️',
      callback_data: `page_${platformId}_${page + 1}`,
    });
  }
  if (navButtons.length > 0) {
    buttons.push(navButtons);
  }

  // Geri butonları
  buttons.push([{ text: '🔙 Platformalar', callback_data: 'numbers' }]);
  buttons.push([{ text: '🏠 Ana Menyu', callback_data: 'home' }]);

  const keyboard = inlineKeyboard(buttons);
  await sendOrEdit(chatId, messageId, text, keyboard);
}

/**
 * Ölkə seçildikdə - ətraflı məlumat + WhatsApp keçid
 */
export async function handleCountry(chatId, messageId, countryId) {
  // Ölkəni al (platform məlumatı ilə)
  const { data: country } = await supabaseAdmin
    .from('countries')
    .select('*, platforms(id, name, emoji)')
    .eq('id', countryId)
    .single();

  if (!country) return;

  const stockStatus = country.stock > 0
    ? `🟢 Stokda var (${country.stock} ədəd)`
    : '🔴 Stokda yoxdur';

  const qualityStars = getQualityStars(country.quality);

  let text = `${country.flag} <b>${country.name} — ${country.platforms.emoji} ${country.platforms.name}</b>

━━━━━━━━━━━━━━━━━━━━

📞 <b>Ölkə kodu:</b> ${country.country_code}
⭐ <b>Keyfiyyət:</b> ${qualityStars} ${country.quality}
📊 <b>Uğur faizi:</b> ${country.success_rate}%
📦 <b>Stok:</b> ${stockStatus}
💰 <b>Qiymət:</b> ${country.price} ${country.currency}`;

  if (country.description) {
    text += `\n📝 <b>Qeyd:</b> ${country.description}`;
  }

  text += `

━━━━━━━━━━━━━━━━━━━━
✅ Sifariş vermək üçün aşağıdakı düyməni basın:`;

  // WhatsApp-a yönləndirmə linki
  const orderMessage = encodeURIComponent(
    `Salam! ${country.platforms.name} üçün ${country.flag} ${country.name} (${country.country_code}) nömrəsi istəyirəm.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${orderMessage}`;

  const buttons = [
    [{ text: '💬 WhatsApp-dan Sifariş Ver', url: whatsappUrl }],
    [{ text: '🔙 Ölkələr', callback_data: `platform_${country.platforms.id}` }],
    [{ text: '🏠 Ana Menyu', callback_data: 'home' }],
  ];

  const keyboard = inlineKeyboard(buttons);
  await sendOrEdit(chatId, messageId, text, keyboard);
}

/**
 * Keyfiyyətə görə ulduz göstər
 */
function getQualityStars(quality) {
  switch (quality) {
    case 'Yüksək':
      return '⭐⭐⭐⭐⭐';
    case 'Orta':
      return '⭐⭐⭐';
    case 'Aşağı':
      return '⭐⭐';
    default:
      return '⭐⭐⭐⭐';
  }
}
