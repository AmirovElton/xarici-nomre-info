import { answerCallbackQuery, sendMessage, deleteMessage, sendOrEdit, inlineKeyboard } from '../lib/telegram.js';
import { getOrCreateUser, updateUserMessageId, getUserMessageId, updateUserState, getUserState } from '../lib/userState.js';
import { handleStart } from '../handlers/start.js';
import { handleInfo, handleInfoSubmenu } from '../handlers/info.js';
import { handleNumbers, handlePlatform, handleCountry, handleCountryPage } from '../handlers/numbers.js';
import { handleReviews, handleReviewPage, handleReviewAdd, handleReviewRating, handleReviewText } from '../handlers/reviews.js';
import { handleAdmin, handleAdminCallback } from '../handlers/admin.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'Bot is running' });
  }

  try {
    const update = req.body;

    // Callback query (düymə basıldı)
    if (update.callback_query) {
      await handleCallbackQuery(update.callback_query);
      return res.status(200).send('OK');
    }

    // Normal mesaj
    if (update.message) {
      await handleMessage(update.message);
      return res.status(200).send('OK');
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(200).send('OK'); // Telegram-a həmişə 200 qaytarırıq
  }
}

/**
 * Normal mesajları idarə et
 */
async function handleMessage(message) {
  const chatId = message.chat.id;
  const text = message.text;
  const user = message.from;

  if (!text) return;

  // /start komandası
  if (text === '/start') {
    await getOrCreateUser(user);
    // Əvvəlki mesajı sil (əgər varsa)
    const oldMsgId = await getUserMessageId(chatId);
    if (oldMsgId) {
      await deleteMessage(chatId, oldMsgId);
    }
    // İstifadəçinin göndərdiyi /start mesajını da sil
    await deleteMessage(chatId, message.message_id);
    await handleStart(chatId, user);
    return;
  }

  // /admin komandası
  if (text === '/admin') {
    const adminId = process.env.ADMIN_CHAT_ID;
    if (String(chatId) === String(adminId)) {
      await handleAdmin(chatId);
    }
    return;
  }

  // İstifadəçi state yoxla (rəy yazma prosesindədirsə)
  const state = await getUserState(chatId);
  if (state === 'awaiting_review') {
    // İstifadəçinin mesajını sil (təmiz saxla)
    await deleteMessage(chatId, message.message_id);
    await handleReviewText(chatId, user, text);
    return;
  }

  // Digər mesajları sil (bot təmiz qalmalıdır)
  await deleteMessage(chatId, message.message_id);
}

/**
 * Callback query-ləri idarə et (düymə basıldıqda)
 */
async function handleCallbackQuery(query) {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const data = query.data;
  const user = query.from;

  // Loading göstəricisini söndür
  await answerCallbackQuery(query.id);

  // Route callback data
  if (data === 'start' || data === 'home') {
    await handleStart(chatId, user, messageId);
    return;
  }

  // Məlumat bölməsi
  if (data === 'info') {
    await handleInfo(chatId, messageId);
    return;
  }
  if (data.startsWith('info_')) {
    await handleInfoSubmenu(chatId, messageId, data);
    return;
  }

  // Nömrələr bölməsi
  if (data === 'numbers') {
    await handleNumbers(chatId, messageId);
    return;
  }
  if (data.startsWith('platform_')) {
    const platformId = data.split('_')[1];
    await handlePlatform(chatId, messageId, platformId);
    return;
  }
  if (data.startsWith('country_')) {
    const countryId = data.split('_')[1];
    await handleCountry(chatId, messageId, countryId);
    return;
  }
  if (data.startsWith('page_')) {
    // page_platformId_pageNum
    const parts = data.split('_');
    const platformId = parts[1];
    const page = parseInt(parts[2]);
    await handleCountryPage(chatId, messageId, platformId, page);
    return;
  }

  // Rəylər bölməsi
  if (data === 'reviews') {
    await handleReviews(chatId, messageId, 1);
    return;
  }
  if (data.startsWith('reviews_page_')) {
    const page = parseInt(data.split('_')[2]);
    await handleReviews(chatId, messageId, page);
    return;
  }
  if (data === 'review_add') {
    await handleReviewAdd(chatId, messageId);
    return;
  }
  if (data.startsWith('rating_')) {
    const rating = parseInt(data.split('_')[1]);
    await handleReviewRating(chatId, messageId, user, rating);
    return;
  }

  // Admin bölməsi
  if (data.startsWith('admin_')) {
    const adminId = process.env.ADMIN_CHAT_ID;
    if (String(chatId) === String(adminId)) {
      await handleAdminCallback(chatId, messageId, data);
    }
    return;
  }

  // Noop (tanınmayan callback)
  if (data === 'noop') {
    return;
  }
}
