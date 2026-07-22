import { sendOrEdit, inlineKeyboard } from '../lib/telegram.js';
import { updateUserMessageId } from '../lib/userState.js';

/**
 * /start komandası - Xoş gəldin mesajı
 * Müştərinin adını göstərir, marka adını qeyd edir, və əsas düymələri təqdim edir
 */
export async function handleStart(chatId, user, messageId = null) {
  const firstName = user.first_name || '';
  const lastName = user.last_name || '';
  const fullName = `${firstName}${lastName ? ' ' + lastName : ''}`.trim();

  const text = `🎉 <b>Xoş gəldiniz, ${fullName}!</b>

━━━━━━━━━━━━━━━━━━━━
📱 <b>XariciNömrəAz</b> — Virtual Nömrə Xidməti
━━━━━━━━━━━━━━━━━━━━

Biz sizə keyfiyyətli və etibarlı xarici virtual nömrələr təqdim edirik.

🔹 WhatsApp, Telegram və digər platformalar üçün nömrələr
🔹 Yüksək uğur faizi
🔹 Sürətli aktivasiya
🔹 7/24 dəstək

Aşağıdakı bölmələrdən birini seçərək başlayın:`;

  const keyboard = inlineKeyboard([
    [{ text: '📱 Nömrələrə bax', callback_data: 'numbers' }],
    [{ text: 'ℹ️ Məlumat Al', callback_data: 'info' }],
    [{ text: '⭐ Rəylər', callback_data: 'reviews' }],
  ]);

  const newMsgId = await sendOrEdit(chatId, messageId, text, keyboard);
  if (newMsgId) {
    await updateUserMessageId(chatId, newMsgId);
  }
}
