const BOT_TOKEN = process.env.BOT_TOKEN;
const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

/**
 * Telegram API-yə sorğu göndər
 */
async function callApi(method, body) {
  const res = await fetch(`${API_BASE}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) {
    console.error(`Telegram API error [${method}]:`, data);
  }
  return data;
}

/**
 * Yeni mesaj göndər
 */
export async function sendMessage(chatId, text, options = {}) {
  const body = {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    ...options,
  };
  return callApi('sendMessage', body);
}

/**
 * Mövcud mesajı redaktə et (əsas mexanizm - mesajlar edit olunur)
 */
export async function editMessage(chatId, messageId, text, options = {}) {
  const body = {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: 'HTML',
    ...options,
  };
  return callApi('editMessageText', body);
}

/**
 * Mesajı sil
 */
export async function deleteMessage(chatId, messageId) {
  return callApi('deleteMessage', {
    chat_id: chatId,
    message_id: messageId,
  });
}

/**
 * Callback query-yə cavab ver (loading göstəricisini söndürür)
 */
export async function answerCallbackQuery(callbackQueryId, text = '') {
  return callApi('answerCallbackQuery', {
    callback_query_id: callbackQueryId,
    text,
  });
}

/**
 * Mesaj göndər və ya edit et (əsas helper)
 * Əgər messageId varsa edit edir, yoxdursa yeni göndərir
 * Hər zaman yeni mesaj ID-sini qaytarır
 */
export async function sendOrEdit(chatId, messageId, text, replyMarkup = null) {
  const options = {};
  if (replyMarkup) {
    options.reply_markup = replyMarkup;
  }

  if (messageId) {
    // Mövcud mesajı edit et
    const result = await editMessage(chatId, messageId, text, options);
    if (result.ok) {
      return result.result.message_id;
    }
    // Edit uğursuz olsa, köhnəni sil və yenisini göndər
    await deleteMessage(chatId, messageId);
  }

  // Yeni mesaj göndər
  const result = await sendMessage(chatId, text, options);
  if (result.ok) {
    return result.result.message_id;
  }
  return null;
}

/**
 * İnline keyboard yaratmaq üçün helper
 * buttons: [[{text, callback_data}], [{text, url}]]
 */
export function inlineKeyboard(buttons) {
  return {
    inline_keyboard: buttons,
  };
}
