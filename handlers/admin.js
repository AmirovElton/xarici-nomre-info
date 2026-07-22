import { sendOrEdit, sendMessage, inlineKeyboard } from '../lib/telegram.js';
import { supabaseAdmin } from '../lib/supabase.js';
import { updateUserMessageId } from '../lib/userState.js';

/**
 * Admin panel - Bot daxilində admin əmrləri
 * Yalnız ADMIN_CHAT_ID olan istifadəçi görə bilər
 */
export async function handleAdmin(chatId) {
  const text = `🔐 <b>Admin Panel</b>

━━━━━━━━━━━━━━━━━━━━
⚙️ <b>XariciNömrəAz</b> — İdarəetmə
━━━━━━━━━━━━━━━━━━━━

Aşağıdakı əməliyyatlardan birini seçin:`;

  const keyboard = inlineKeyboard([
    [{ text: '📝 Gözləyən Rəylər', callback_data: 'admin_pending_reviews' }],
    [{ text: '📊 Statistika', callback_data: 'admin_stats' }],
    [{ text: '🏠 Ana Menyu', callback_data: 'home' }],
  ]);

  const result = await sendMessage(chatId, text, { reply_markup: keyboard });
  if (result.ok) {
    await updateUserMessageId(chatId, result.result.message_id);
  }
}

/**
 * Admin callback-ləri idarə et
 */
export async function handleAdminCallback(chatId, messageId, data) {
  if (data === 'admin_pending_reviews') {
    await showPendingReviews(chatId, messageId);
    return true;
  }

  if (data === 'admin_stats') {
    await showStats(chatId, messageId);
    return true;
  }

  if (data.startsWith('admin_approve_')) {
    const reviewId = data.split('_')[2];
    await approveReview(chatId, messageId, reviewId);
    return true;
  }

  if (data.startsWith('admin_reject_')) {
    const reviewId = data.split('_')[2];
    await rejectReview(chatId, messageId, reviewId);
    return true;
  }

  if (data === 'admin_panel') {
    await showAdminPanel(chatId, messageId);
    return true;
  }

  return false;
}

/**
 * Admin panel (edit versiyası - callback üçün)
 */
async function showAdminPanel(chatId, messageId) {
  const text = `🔐 <b>Admin Panel</b>

━━━━━━━━━━━━━━━━━━━━
⚙️ <b>XariciNömrəAz</b> — İdarəetmə
━━━━━━━━━━━━━━━━━━━━

Aşağıdakı əməliyyatlardan birini seçin:`;

  const keyboard = inlineKeyboard([
    [{ text: '📝 Gözləyən Rəylər', callback_data: 'admin_pending_reviews' }],
    [{ text: '📊 Statistika', callback_data: 'admin_stats' }],
    [{ text: '🏠 Ana Menyu', callback_data: 'home' }],
  ]);

  await sendOrEdit(chatId, messageId, text, keyboard);
}

/**
 * Gözləyən rəyləri göstər
 */
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

✅ Gözləyən rəy yoxdur! Bütün rəylər baxılıb.`;

    const keyboard = inlineKeyboard([
      [{ text: '🔙 Admin Panel', callback_data: 'admin_panel' }],
    ]);

    await sendOrEdit(chatId, messageId, text, keyboard);
    return;
  }

  let text = `📝 <b>Gözləyən Rəylər (${reviews.length})</b>

━━━━━━━━━━━━━━━━━━━━

`;

  const buttons = [];

  reviews.forEach((review, index) => {
    const name = review.first_name
      ? `${review.first_name}${review.last_name ? ' ' + review.last_name : ''}`
      : 'Anonim';
    const stars = '⭐'.repeat(review.rating || 0);
    const date = new Date(review.created_at).toLocaleDateString('az-AZ');

    text += `<b>${index + 1}. ${name}</b> ${stars}\n`;
    text += `💬 ${review.text}\n`;
    text += `📅 ${date}\n\n`;

    buttons.push([
      { text: `✅ ${index + 1} Təsdiq`, callback_data: `admin_approve_${review.id}` },
      { text: `❌ ${index + 1} İmtina`, callback_data: `admin_reject_${review.id}` },
    ]);
  });

  buttons.push([{ text: '🔙 Admin Panel', callback_data: 'admin_panel' }]);

  const keyboard = inlineKeyboard(buttons);
  await sendOrEdit(chatId, messageId, text, keyboard);
}

/**
 * Rəyi təsdiq et
 */
async function approveReview(chatId, messageId, reviewId) {
  await supabaseAdmin
    .from('reviews')
    .update({ is_approved: true })
    .eq('id', reviewId);

  // Yenilənmiş siyahını göstər
  await showPendingReviews(chatId, messageId);
}

/**
 * Rəyi imtina et (sil)
 */
async function rejectReview(chatId, messageId, reviewId) {
  await supabaseAdmin
    .from('reviews')
    .delete()
    .eq('id', reviewId);

  // Yenilənmiş siyahını göstər
  await showPendingReviews(chatId, messageId);
}

/**
 * Statistika göstər
 */
async function showStats(chatId, messageId) {
  // İstifadəçi sayı
  const { count: userCount } = await supabaseAdmin
    .from('users')
    .select('*', { count: 'exact', head: true });

  // Rəy sayları
  const { count: totalReviews } = await supabaseAdmin
    .from('reviews')
    .select('*', { count: 'exact', head: true });

  const { count: pendingReviews } = await supabaseAdmin
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .eq('is_approved', false);

  const { count: approvedReviews } = await supabaseAdmin
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .eq('is_approved', true);

  // Platform sayı
  const { count: platformCount } = await supabaseAdmin
    .from('platforms')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  // Ölkə sayı
  const { count: countryCount } = await supabaseAdmin
    .from('countries')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  // Ümumi stok
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
   • Təsdiqlənmiş: ${approvedReviews || 0}
   • Gözləyən: ${pendingReviews || 0}

📱 <b>Platformalar:</b> ${platformCount || 0}
🌍 <b>Ölkələr:</b> ${countryCount || 0}
📦 <b>Ümumi stok:</b> ${totalStock} ədəd`;

  const keyboard = inlineKeyboard([
    [{ text: '🔙 Admin Panel', callback_data: 'admin_panel' }],
  ]);

  await sendOrEdit(chatId, messageId, text, keyboard);
}
