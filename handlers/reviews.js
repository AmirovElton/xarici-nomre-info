import { sendOrEdit, inlineKeyboard, sendMessage, deleteMessage } from '../lib/telegram.js';
import { supabase, supabaseAdmin } from '../lib/supabase.js';
import { updateUserState, updateUserMessageId } from '../lib/userState.js';

const REVIEWS_PER_PAGE = 5;

/**
 * Rəylər bölməsi - Rəyləri göstər (səhifələnmiş)
 */
export async function handleReviews(chatId, messageId, page = 1) {
  // State-i sıfırla
  await updateUserState(chatId, 'idle');

  // Təsdiqlənmiş rəyləri al
  const { data: reviews, count } = await supabaseAdmin
    .from('reviews')
    .select('*', { count: 'exact' })
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .range((page - 1) * REVIEWS_PER_PAGE, page * REVIEWS_PER_PAGE - 1);

  const totalPages = Math.ceil((count || 0) / REVIEWS_PER_PAGE);

  let text = `⭐ <b>Müştəri Rəyləri</b>

━━━━━━━━━━━━━━━━━━━━
📝 <b>XariciNömrəAz</b> — Rəylər
━━━━━━━━━━━━━━━━━━━━

`;

  if (!reviews || reviews.length === 0) {
    text += `Hələ heç bir rəy yoxdur. İlk rəyi siz yazın! 🎉`;
  } else {
    reviews.forEach((review, index) => {
      const name = review.first_name
        ? `${review.first_name}${review.last_name ? ' ' + review.last_name : ''}`
        : 'Anonim';
      const stars = '⭐'.repeat(review.rating || 5);
      const date = new Date(review.created_at).toLocaleDateString('az-AZ');

      text += `👤 <b>${name}</b> ${stars}\n`;
      text += `💬 ${review.text}\n`;
      text += `📅 ${date}\n`;
      if (index < reviews.length - 1) {
        text += `\n┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n\n`;
      }
    });

    if (count > 0) {
      text += `\n\n━━━━━━━━━━━━━━━━━━━━\n📊 Ümumi: ${count} rəy`;
    }
  }

  // Butonlar
  const buttons = [];

  // Səhifə naviqasiyası
  const navButtons = [];
  if (page > 1) {
    navButtons.push({
      text: '◀️ Əvvəlki',
      callback_data: `reviews_page_${page - 1}`,
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
      callback_data: `reviews_page_${page + 1}`,
    });
  }
  if (navButtons.length > 0) {
    buttons.push(navButtons);
  }

  // Rəy əlavə et butonu
  buttons.push([{ text: '✍️ Rəy əlavə et', callback_data: 'review_add' }]);
  buttons.push([{ text: '🏠 Ana Menyu', callback_data: 'home' }]);

  const keyboard = inlineKeyboard(buttons);
  await sendOrEdit(chatId, messageId, text, keyboard);
}

/**
 * Rəy əlavə et - İstifadəçidən rəy mətni istə
 */
export async function handleReviewAdd(chatId, messageId) {
  // İstifadəçi state-ni dəyiş
  await updateUserState(chatId, 'awaiting_review');

  const text = `✍️ <b>Rəy Əlavə Et</b>

━━━━━━━━━━━━━━━━━━━━

Zəhmət olmasa rəyinizi mesaj olaraq yazıb göndərin.

💡 <b>Məsləhət:</b> Xidmətimizdən razı qaldığınız nöqtələri, nömrənin keyfiyyətini və ümumi təcrübənizi qeyd edin.

⏳ Rəyinizi gözləyirik...

<i>(Ləğv etmək üçün aşağıdakı düyməni basın)</i>`;

  const keyboard = inlineKeyboard([
    [{ text: '❌ Ləğv et', callback_data: 'reviews' }],
  ]);

  await sendOrEdit(chatId, messageId, text, keyboard);
}

/**
 * İstifadəçi rəy mətnini göndərdi - ulduz seçimini göstər
 */
export async function handleReviewText(chatId, user, reviewText) {
  // State-i dəyiş - rating gözlə
  await updateUserState(chatId, 'awaiting_rating');

  // Rəy mətnini müvəqqəti saxla (rating seçildikdən sonra tamamlanacaq)
  // Rəyi bazaya dərhal yaz (rating olmadan), sonra yeniləyəcik
  const { data: review } = await supabaseAdmin
    .from('reviews')
    .insert({
      user_id: chatId,
      first_name: user.first_name || null,
      last_name: user.last_name || null,
      username: user.username || null,
      text: reviewText,
      rating: null,
      is_approved: false,
    })
    .select()
    .single();

  const text = `⭐ <b>Ulduz Reytinqi Seçin</b>

━━━━━━━━━━━━━━━━━━━━

Rəyiniz qəbul edildi! İndi xidmətimizi 1-dən 5-ə qədər qiymətləndirin:

💬 <i>"${reviewText.length > 100 ? reviewText.substring(0, 100) + '...' : reviewText}"</i>

Aşağıdan ulduz sayını seçin:`;

  const keyboard = inlineKeyboard([
    [
      { text: '⭐ 1', callback_data: `rating_1` },
      { text: '⭐ 2', callback_data: `rating_2` },
      { text: '⭐ 3', callback_data: `rating_3` },
      { text: '⭐ 4', callback_data: `rating_4` },
      { text: '⭐ 5', callback_data: `rating_5` },
    ],
  ]);

  // Köhnə mesajı yenilə
  const { data: userData } = await supabase
    .from('users')
    .select('last_message_id')
    .eq('telegram_id', chatId)
    .single();

  const msgId = userData?.last_message_id;
  const newMsgId = await sendOrEdit(chatId, msgId, text, keyboard);
  if (newMsgId) {
    await updateUserMessageId(chatId, newMsgId);
  }
}

/**
 * İstifadəçi ulduz seçdi - rəyi tamamla
 */
export async function handleReviewRating(chatId, messageId, user, rating) {
  // Son yazılan rəyi (rating-i null olan) yenilə
  const { data: pendingReview } = await supabaseAdmin
    .from('reviews')
    .select('*')
    .eq('user_id', chatId)
    .is('rating', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (pendingReview) {
    await supabaseAdmin
      .from('reviews')
      .update({ rating })
      .eq('id', pendingReview.id);
  }

  // State-i sıfırla
  await updateUserState(chatId, 'idle');

  // Adminə bildiriş göndər
  const adminChatId = process.env.ADMIN_CHAT_ID;
  if (adminChatId) {
    const name = user.first_name
      ? `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}`
      : 'Anonim';
    const stars = '⭐'.repeat(rating);

    await sendMessage(adminChatId, `🆕 <b>Yeni Rəy Gözləyir!</b>

👤 ${name} ${user.username ? `(@${user.username})` : ''}
${stars} (${rating}/5)
💬 ${pendingReview?.text || 'Mətn tapılmadı'}

Rəyi təsdiq etmək üçün admin paneldən istifadə edin.`);
  }

  // İstifadəçiyə təşəkkür mesajı
  const text = `✅ <b>Rəyiniz Qəbul Edildi!</b>

━━━━━━━━━━━━━━━━━━━━

Təşəkkürlər! Rəyiniz admin tərəfindən yoxlanıldıqdan sonra digər müştərilərə göstəriləcək.

⭐ Verdiyiniz qiymət: ${'⭐'.repeat(rating)} (${rating}/5)

Rəyiniz üçün minnətdarıq! 🙏`;

  const keyboard = inlineKeyboard([
    [{ text: '⭐ Rəylərə bax', callback_data: 'reviews' }],
    [{ text: '🏠 Ana Menyu', callback_data: 'home' }],
  ]);

  await sendOrEdit(chatId, messageId, text, keyboard);
}
