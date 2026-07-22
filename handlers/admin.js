import { sendOrEdit, sendMessage, inlineKeyboard, deleteMessage } from '../lib/telegram.js';
import { supabaseAdmin } from '../lib/supabase.js';
import { updateUserMessageId, updateUserState, getUserState } from '../lib/userState.js';

const ADMIN_CHAT_ID = () => process.env.ADMIN_CHAT_ID;

/**
 * Admin panel - Əsas menyu
 */
export async function handleAdmin(chatId) {
  const text = `🔐 <b>Admin Panel</b>

━━━━━━━━━━━━━━━━━━━━
⚙️ <b>XariciNömrəAz</b> — İdarəetmə
━━━━━━━━━━━━━━━━━━━━

Aşağıdakı əməliyyatlardan birini seçin:`;

  const keyboard = inlineKeyboard([
    [{ text: '📱 Platformalar', callback_data: 'adm_platforms' }],
    [{ text: '🌍 Ölkələr / Stok', callback_data: 'adm_countries' }],
    [{ text: '📝 Gözləyən Rəylər', callback_data: 'adm_pending' }],
    [{ text: '📊 Statistika', callback_data: 'adm_stats' }],
    [{ text: '🏠 Ana Menyu', callback_data: 'home' }],
  ]);

  const result = await sendMessage(chatId, text, { reply_markup: keyboard });
  if (result.ok) {
    await updateUserMessageId(chatId, result.result.message_id);
  }
}



/**
 * Admin callback router
 */
export async function handleAdminCallback(chatId, messageId, data) {
  // Əsas panel
  if (data === 'adm_panel') return await showAdminPanel(chatId, messageId);

  // Platformalar
  if (data === 'adm_platforms') return await showPlatforms(chatId, messageId);
  if (data === 'adm_add_platform') return await promptAddPlatform(chatId, messageId);
  if (data.startsWith('adm_toggleplat_')) return await togglePlatform(chatId, messageId, data.split('_')[2]);
  if (data.startsWith('adm_delplat_')) return await deletePlatform(chatId, messageId, data.split('_')[2]);

  // Ölkələr
  if (data === 'adm_countries') return await showCountryPlatforms(chatId, messageId);
  if (data.startsWith('adm_clist_')) return await showCountries(chatId, messageId, data.split('_')[2]);
  if (data.startsWith('adm_addcountry_')) return await promptAddCountry(chatId, messageId, data.split('_')[2]);
  if (data.startsWith('adm_editstock_')) return await promptEditStock(chatId, messageId, data.split('_')[2]);
  if (data.startsWith('adm_editprice_')) return await promptEditPrice(chatId, messageId, data.split('_')[2]);
  if (data.startsWith('adm_delcountry_')) return await deleteCountry(chatId, messageId, data.split('_')[2]);
  if (data.startsWith('adm_countrydetail_')) return await showCountryDetail(chatId, messageId, data.split('_')[2]);

  // Rəylər
  if (data === 'adm_pending') return await showPendingReviews(chatId, messageId);
  if (data.startsWith('adm_approve_')) return await approveReview(chatId, messageId, data.split('_')[2]);
  if (data.startsWith('adm_reject_')) return await rejectReview(chatId, messageId, data.split('_')[2]);

  // Statistika
  if (data === 'adm_stats') return await showStats(chatId, messageId);

  return false;
}



/**
 * Admin mesajlarını idarə et (state əsaslı)
 */
export async function handleAdminMessage(chatId, user, text) {
  const state = await getUserState(chatId);

  if (state === 'adm_adding_platform') {
    return await saveNewPlatform(chatId, text);
  }
  if (state && state.startsWith('adm_adding_country_')) {
    const platformId = state.split('_')[3];
    return await saveNewCountry(chatId, text, platformId);
  }
  if (state && state.startsWith('adm_editing_stock_')) {
    const countryId = state.split('_')[3];
    return await saveStock(chatId, text, countryId);
  }
  if (state && state.startsWith('adm_editing_price_')) {
    const countryId = state.split('_')[3];
    return await savePrice(chatId, text, countryId);
  }

  return false; // Admin mesajı deyil
}



// ═══════════════════════════════════════════
// ADMIN PANEL
// ═══════════════════════════════════════════

async function showAdminPanel(chatId, messageId) {
  const text = `🔐 <b>Admin Panel</b>

━━━━━━━━━━━━━━━━━━━━
⚙️ <b>XariciNömrəAz</b> — İdarəetmə
━━━━━━━━━━━━━━━━━━━━

Aşağıdakı əməliyyatlardan birini seçin:`;

  const keyboard = inlineKeyboard([
    [{ text: '📱 Platformalar', callback_data: 'adm_platforms' }],
    [{ text: '🌍 Ölkələr / Stok', callback_data: 'adm_countries' }],
    [{ text: '📝 Gözləyən Rəylər', callback_data: 'adm_pending' }],
    [{ text: '📊 Statistika', callback_data: 'adm_stats' }],
    [{ text: '🏠 Ana Menyu', callback_data: 'home' }],
  ]);

  await sendOrEdit(chatId, messageId, text, keyboard);
}

// ═══════════════════════════════════════════
// PLATFORMALAR
// ═══════════════════════════════════════════

async function showPlatforms(chatId, messageId) {
  const { data: platforms } = await supabaseAdmin
    .from('platforms')
    .select('*')
    .order('sort_order');

  let text = `📱 <b>Platformalar İdarəetməsi</b>

━━━━━━━━━━━━━━━━━━━━

`;

  const buttons = [];

  if (platforms && platforms.length > 0) {
    platforms.forEach((p, i) => {
      const status = p.is_active ? '🟢' : '🔴';
      text += `${i + 1}. ${p.emoji} ${p.name} ${status}\n`;
      buttons.push([
        { text: `${status} ${p.name}`, callback_data: `adm_toggleplat_${p.id}` },
        { text: `🗑`, callback_data: `adm_delplat_${p.id}` },
      ]);
    });
  } else {
    text += `Heç bir platforma yoxdur.`;
  }

  buttons.push([{ text: '➕ Yeni Platforma', callback_data: 'adm_add_platform' }]);
  buttons.push([{ text: '🔙 Admin Panel', callback_data: 'adm_panel' }]);

  await sendOrEdit(chatId, messageId, text, inlineKeyboard(buttons));
}



async function promptAddPlatform(chatId, messageId) {
  await updateUserState(chatId, 'adm_adding_platform');

  const text = `➕ <b>Yeni Platforma Əlavə Et</b>

━━━━━━━━━━━━━━━━━━━━

Platforma məlumatlarını bu formatda göndərin:

<code>Ad | Emoji | Təsvir</code>

<b>Nümunə:</b>
<code>Instagram | 📸 | Instagram üçün virtual nömrələr</code>

⏳ Mesajınızı gözləyirəm...`;

  const keyboard = inlineKeyboard([
    [{ text: '❌ Ləğv et', callback_data: 'adm_platforms' }],
  ]);

  await sendOrEdit(chatId, messageId, text, keyboard);
}

async function saveNewPlatform(chatId, text) {
  await updateUserState(chatId, 'idle');

  const parts = text.split('|').map(s => s.trim());
  const name = parts[0] || '';
  const emoji = parts[1] || '📱';
  const description = parts[2] || '';

  if (!name) {
    await sendMessage(chatId, '❌ Platforma adı boş ola bilməz. Yenidən cəhd edin.');
    return true;
  }

  // Ən yüksək sort_order-i tap
  const { data: last } = await supabaseAdmin
    .from('platforms')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .single();

  const sortOrder = (last?.sort_order || 0) + 1;

  await supabaseAdmin.from('platforms').insert({
    name, emoji, description, is_active: true, sort_order: sortOrder,
  });

  const msg = await sendMessage(chatId, `✅ <b>${emoji} ${name}</b> platforması əlavə edildi!

🔙 Admin panelə qayıtmaq üçün /admin yazın.`);

  return true;
}

async function togglePlatform(chatId, messageId, platformId) {
  const { data: platform } = await supabaseAdmin
    .from('platforms')
    .select('is_active')
    .eq('id', platformId)
    .single();

  if (platform) {
    await supabaseAdmin
      .from('platforms')
      .update({ is_active: !platform.is_active })
      .eq('id', platformId);
  }

  await showPlatforms(chatId, messageId);
}

async function deletePlatform(chatId, messageId, platformId) {
  await supabaseAdmin.from('platforms').delete().eq('id', platformId);
  await showPlatforms(chatId, messageId);
}



// ═══════════════════════════════════════════
// ÖLKƏLƏR / STOK
// ═══════════════════════════════════════════

async function showCountryPlatforms(chatId, messageId) {
  const { data: platforms } = await supabaseAdmin
    .from('platforms')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  const text = `🌍 <b>Ölkə / Stok İdarəetməsi</b>

━━━━━━━━━━━━━━━━━━━━

Hansı platformanın ölkələrini idarə etmək istəyirsiniz?`;

  const buttons = (platforms || []).map(p => [
    { text: `${p.emoji} ${p.name}`, callback_data: `adm_clist_${p.id}` },
  ]);

  buttons.push([{ text: '🔙 Admin Panel', callback_data: 'adm_panel' }]);

  await sendOrEdit(chatId, messageId, text, inlineKeyboard(buttons));
}

async function showCountries(chatId, messageId, platformId) {
  const { data: platform } = await supabaseAdmin
    .from('platforms')
    .select('*')
    .eq('id', platformId)
    .single();

  const { data: countries } = await supabaseAdmin
    .from('countries')
    .select('*')
    .eq('platform_id', platformId)
    .order('sort_order');

  let text = `🌍 <b>${platform?.emoji || ''} ${platform?.name || ''} — Ölkələr</b>

━━━━━━━━━━━━━━━━━━━━

`;

  const buttons = [];

  if (countries && countries.length > 0) {
    countries.forEach((c) => {
      const stock = c.stock > 0 ? `🟢 ${c.stock}` : '🔴 0';
      text += `${c.flag} ${c.name} — ${c.price} AZN — Stok: ${stock}\n`;
      buttons.push([
        { text: `${c.flag} ${c.name}`, callback_data: `adm_countrydetail_${c.id}` },
      ]);
    });
  } else {
    text += `Bu platformada hələ ölkə yoxdur.`;
  }

  buttons.push([{ text: '➕ Yeni Ölkə', callback_data: `adm_addcountry_${platformId}` }]);
  buttons.push([{ text: '🔙 Platformalar', callback_data: 'adm_countries' }]);
  buttons.push([{ text: '🔙 Admin Panel', callback_data: 'adm_panel' }]);

  await sendOrEdit(chatId, messageId, text, inlineKeyboard(buttons));
}



async function showCountryDetail(chatId, messageId, countryId) {
  const { data: country } = await supabaseAdmin
    .from('countries')
    .select('*, platforms(name, emoji)')
    .eq('id', countryId)
    .single();

  if (!country) return;

  const status = country.is_active ? '🟢 Aktiv' : '🔴 Deaktiv';

  const text = `${country.flag} <b>${country.name}</b> — Ətraflı

━━━━━━━━━━━━━━━━━━━━

📱 <b>Platforma:</b> ${country.platforms.emoji} ${country.platforms.name}
📞 <b>Ölkə kodu:</b> ${country.country_code}
⭐ <b>Keyfiyyət:</b> ${country.quality}
📊 <b>Uğur faizi:</b> ${country.success_rate}%
📦 <b>Stok:</b> ${country.stock} ədəd
💰 <b>Qiymət:</b> ${country.price} ${country.currency}
🔘 <b>Status:</b> ${status}

Aşağıdan əməliyyat seçin:`;

  const keyboard = inlineKeyboard([
    [
      { text: '📦 Stok dəyiş', callback_data: `adm_editstock_${countryId}` },
      { text: '💰 Qiymət dəyiş', callback_data: `adm_editprice_${countryId}` },
    ],
    [{ text: '🗑 Sil', callback_data: `adm_delcountry_${countryId}` }],
    [{ text: '🔙 Ölkələr', callback_data: `adm_clist_${country.platform_id}` }],
    [{ text: '🔙 Admin Panel', callback_data: 'adm_panel' }],
  ]);

  await sendOrEdit(chatId, messageId, text, keyboard);
}

async function promptAddCountry(chatId, messageId, platformId) {
  await updateUserState(chatId, `adm_adding_country_${platformId}`);

  const text = `➕ <b>Yeni Ölkə Əlavə Et</b>

━━━━━━━━━━━━━━━━━━━━

Bu formatda göndərin:

<code>Ad | Bayraq | Ölkə kodu | Keyfiyyət | Uğur% | Stok | Qiymət</code>

<b>Nümunə:</b>
<code>Türkiyə | 🇹🇷 | +90 | Yüksək | 97 | 25 | 5.00</code>

💡 <b>Keyfiyyət:</b> Yüksək, Orta, Aşağı
⏳ Mesajınızı gözləyirəm...`;

  const keyboard = inlineKeyboard([
    [{ text: '❌ Ləğv et', callback_data: `adm_clist_${platformId}` }],
  ]);

  await sendOrEdit(chatId, messageId, text, keyboard);
}



async function saveNewCountry(chatId, text, platformId) {
  await updateUserState(chatId, 'idle');

  const parts = text.split('|').map(s => s.trim());

  if (parts.length < 7) {
    await sendMessage(chatId, `❌ Format yanlışdır! 7 hissə olmalıdır.

<code>Ad | Bayraq | Ölkə kodu | Keyfiyyət | Uğur% | Stok | Qiymət</code>

Yenidən cəhd etmək üçün /admin yazın.`);
    return true;
  }

  const [name, flag, countryCode, quality, successRate, stock, price] = parts;

  // Ən yüksək sort_order-i tap
  const { data: last } = await supabaseAdmin
    .from('countries')
    .select('sort_order')
    .eq('platform_id', platformId)
    .order('sort_order', { ascending: false })
    .limit(1)
    .single();

  const sortOrder = (last?.sort_order || 0) + 1;

  await supabaseAdmin.from('countries').insert({
    platform_id: parseInt(platformId),
    name,
    flag: flag || '🏳️',
    country_code: countryCode || '',
    quality: quality || 'Yüksək',
    success_rate: parseInt(successRate) || 95,
    stock: parseInt(stock) || 0,
    price: parseFloat(price) || 0,
    currency: 'AZN',
    is_active: true,
    sort_order: sortOrder,
  });

  await sendMessage(chatId, `✅ <b>${flag} ${name}</b> ölkəsi əlavə edildi!

📞 Kod: ${countryCode}
📦 Stok: ${stock}
💰 Qiymət: ${price} AZN

🔙 /admin yazaraq admin panelə qayıdın.`);

  return true;
}

async function promptEditStock(chatId, messageId, countryId) {
  await updateUserState(chatId, `adm_editing_stock_${countryId}`);

  const { data: country } = await supabaseAdmin
    .from('countries')
    .select('name, flag, stock')
    .eq('id', countryId)
    .single();

  const text = `📦 <b>Stok Dəyişdir</b>

━━━━━━━━━━━━━━━━━━━━

${country?.flag} <b>${country?.name}</b>
Hazırkı stok: <b>${country?.stock}</b> ədəd

Yeni stok sayını yazın (sadəcə rəqəm):`;

  const keyboard = inlineKeyboard([
    [{ text: '❌ Ləğv et', callback_data: `adm_countrydetail_${countryId}` }],
  ]);

  await sendOrEdit(chatId, messageId, text, keyboard);
}



async function saveStock(chatId, text, countryId) {
  await updateUserState(chatId, 'idle');

  const stock = parseInt(text.trim());

  if (isNaN(stock) || stock < 0) {
    await sendMessage(chatId, '❌ Düzgün rəqəm daxil edin! Yenidən /admin yazın.');
    return true;
  }

  await supabaseAdmin
    .from('countries')
    .update({ stock })
    .eq('id', countryId);

  const { data: country } = await supabaseAdmin
    .from('countries')
    .select('name, flag')
    .eq('id', countryId)
    .single();

  await sendMessage(chatId, `✅ ${country?.flag} <b>${country?.name}</b> stoku yeniləndi!

📦 Yeni stok: <b>${stock}</b> ədəd

🔙 /admin yazaraq admin panelə qayıdın.`);

  return true;
}

async function promptEditPrice(chatId, messageId, countryId) {
  await updateUserState(chatId, `adm_editing_price_${countryId}`);

  const { data: country } = await supabaseAdmin
    .from('countries')
    .select('name, flag, price, currency')
    .eq('id', countryId)
    .single();

  const text = `💰 <b>Qiymət Dəyişdir</b>

━━━━━━━━━━━━━━━━━━━━

${country?.flag} <b>${country?.name}</b>
Hazırkı qiymət: <b>${country?.price} ${country?.currency}</b>

Yeni qiyməti yazın (məs: 5.50):`;

  const keyboard = inlineKeyboard([
    [{ text: '❌ Ləğv et', callback_data: `adm_countrydetail_${countryId}` }],
  ]);

  await sendOrEdit(chatId, messageId, text, keyboard);
}

async function savePrice(chatId, text, countryId) {
  await updateUserState(chatId, 'idle');

  const price = parseFloat(text.trim().replace(',', '.'));

  if (isNaN(price) || price < 0) {
    await sendMessage(chatId, '❌ Düzgün qiymət daxil edin! Yenidən /admin yazın.');
    return true;
  }

  await supabaseAdmin
    .from('countries')
    .update({ price })
    .eq('id', countryId);

  const { data: country } = await supabaseAdmin
    .from('countries')
    .select('name, flag, currency')
    .eq('id', countryId)
    .single();

  await sendMessage(chatId, `✅ ${country?.flag} <b>${country?.name}</b> qiyməti yeniləndi!

💰 Yeni qiymət: <b>${price} ${country?.currency}</b>

🔙 /admin yazaraq admin panelə qayıdın.`);

  return true;
}

async function deleteCountry(chatId, messageId, countryId) {
  const { data: country } = await supabaseAdmin
    .from('countries')
    .select('name, flag, platform_id')
    .eq('id', countryId)
    .single();

  await supabaseAdmin.from('countries').delete().eq('id', countryId);

  if (country) {
    await showCountries(chatId, messageId, country.platform_id);
  } else {
    await showCountryPlatforms(chatId, messageId);
  }
}



// ═══════════════════════════════════════════
// RƏYLƏR
// ═══════════════════════════════════════════

async function showPendingReviews(chatId, messageId) {
  const { data: reviews } = await supabaseAdmin
    .from('reviews')
    .select('*')
    .eq('is_approved', false)
    .not('rating', 'is', null)
    .order('created_at', { ascending: false })
    .limit(5);

  if (!reviews || reviews.length === 0) {
    const text = `📝 <b>Gözləyən Rəylər</b>

━━━━━━━━━━━━━━━━━━━━

✅ Gözləyən rəy yoxdur!`;

    const keyboard = inlineKeyboard([
      [{ text: '🔙 Admin Panel', callback_data: 'adm_panel' }],
    ]);

    await sendOrEdit(chatId, messageId, text, keyboard);
    return;
  }

  let text = `📝 <b>Gözləyən Rəylər (${reviews.length})</b>

━━━━━━━━━━━━━━━━━━━━

`;

  const buttons = [];

  reviews.forEach((review, i) => {
    const name = review.first_name
      ? `${review.first_name}${review.last_name ? ' ' + review.last_name : ''}`
      : 'Anonim';
    const stars = '⭐'.repeat(review.rating || 0);

    text += `<b>${i + 1}. ${name}</b> ${stars}\n`;
    text += `💬 ${review.text}\n\n`;

    buttons.push([
      { text: `✅ ${i + 1} Təsdiq`, callback_data: `adm_approve_${review.id}` },
      { text: `❌ ${i + 1} İmtina`, callback_data: `adm_reject_${review.id}` },
    ]);
  });

  buttons.push([{ text: '🔙 Admin Panel', callback_data: 'adm_panel' }]);

  await sendOrEdit(chatId, messageId, text, inlineKeyboard(buttons));
}

async function approveReview(chatId, messageId, reviewId) {
  await supabaseAdmin
    .from('reviews')
    .update({ is_approved: true })
    .eq('id', reviewId);

  await showPendingReviews(chatId, messageId);
}

async function rejectReview(chatId, messageId, reviewId) {
  await supabaseAdmin
    .from('reviews')
    .delete()
    .eq('id', reviewId);

  await showPendingReviews(chatId, messageId);
}



// ═══════════════════════════════════════════
// STATİSTİKA
// ═══════════════════════════════════════════

async function showStats(chatId, messageId) {
  const { count: userCount } = await supabaseAdmin
    .from('users')
    .select('*', { count: 'exact', head: true });

  const { count: totalReviews } = await supabaseAdmin
    .from('reviews')
    .select('*', { count: 'exact', head: true });

  const { count: pendingReviews } = await supabaseAdmin
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .eq('is_approved', false);

  const { count: platformCount } = await supabaseAdmin
    .from('platforms')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  const { count: countryCount } = await supabaseAdmin
    .from('countries')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  const { data: stockData } = await supabaseAdmin
    .from('countries')
    .select('stock')
    .eq('is_active', true);

  const totalStock = stockData?.reduce((sum, c) => sum + (c.stock || 0), 0) || 0;

  const text = `📊 <b>Statistika</b>

━━━━━━━━━━━━━━━━━━━━

👥 <b>İstifadəçilər:</b> ${userCount || 0}

⭐ <b>Rəylər:</b>
   • Ümumi: ${totalReviews || 0}
   • Gözləyən: ${pendingReviews || 0}

📱 <b>Platformalar:</b> ${platformCount || 0}
🌍 <b>Ölkələr:</b> ${countryCount || 0}
📦 <b>Ümumi stok:</b> ${totalStock} ədəd`;

  const keyboard = inlineKeyboard([
    [{ text: '🔙 Admin Panel', callback_data: 'adm_panel' }],
  ]);

  await sendOrEdit(chatId, messageId, text, keyboard);
}
