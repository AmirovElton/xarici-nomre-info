import { supabaseAdmin } from './supabase.js';

/**
 * İstifadəçi məlumatlarını al və ya yarat
 */
export async function getOrCreateUser(telegramUser) {
  const { id, first_name, last_name, username } = telegramUser;

  // Əvvəlcə mövcud istifadəçini axtar
  const { data: existing } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('telegram_id', id)
    .single();

  if (existing) {
    // Adı yenilə (dəyişmiş ola bilər)
    await supabaseAdmin
      .from('users')
      .update({
        first_name,
        last_name,
        username,
        updated_at: new Date().toISOString(),
      })
      .eq('telegram_id', id);

    return existing;
  }

  // Yeni istifadəçi yarat
  const { data: newUser } = await supabaseAdmin
    .from('users')
    .insert({
      telegram_id: id,
      first_name,
      last_name,
      username,
    })
    .select()
    .single();

  return newUser;
}

/**
 * İstifadəçinin son mesaj ID-sini yenilə
 */
export async function updateUserMessageId(telegramId, messageId) {
  await supabaseAdmin
    .from('users')
    .update({ last_message_id: messageId })
    .eq('telegram_id', telegramId);
}

/**
 * İstifadəçinin son mesaj ID-sini al
 */
export async function getUserMessageId(telegramId) {
  const { data } = await supabaseAdmin
    .from('users')
    .select('last_message_id')
    .eq('telegram_id', telegramId)
    .single();

  return data?.last_message_id || null;
}

/**
 * İstifadəçi state-ni yenilə (review flow üçün)
 */
export async function updateUserState(telegramId, state) {
  await supabaseAdmin
    .from('users')
    .update({ state, updated_at: new Date().toISOString() })
    .eq('telegram_id', telegramId);
}

/**
 * İstifadəçi state-ni al
 */
export async function getUserState(telegramId) {
  const { data } = await supabaseAdmin
    .from('users')
    .select('state')
    .eq('telegram_id', telegramId)
    .single();

  return data?.state || 'idle';
}
