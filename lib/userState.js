import { supabaseAdmin } from './supabase.js';

/**
 * İstifadəçi məlumatlarını al və ya yarat
 */
export async function getOrCreateUser(telegramUser) {
  const { id, first_name, last_name, username } = telegramUser;

  // Əvvəlcə mövcud istifadəçini axtar
  const { data: existing, error: selectError } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('telegram_id', id)
    .maybeSingle();

  if (selectError) {
    console.error('getOrCreateUser select error:', selectError.message);
  }

  if (existing) {
    // Adı yenilə (dəyişmiş ola bilər) - yalnız ad sahələri
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ first_name, last_name, username })
      .eq('telegram_id', id);

    if (updateError) {
      console.error('getOrCreateUser update error:', updateError.message);
    }
    return existing;
  }

  // Yeni istifadəçi yarat
  const { data: newUser, error: insertError } = await supabaseAdmin
    .from('users')
    .insert({
      telegram_id: id,
      first_name,
      last_name,
      username,
    })
    .select()
    .single();

  if (insertError) {
    console.error('getOrCreateUser insert error:', insertError.message);
  }

  return newUser;
}

/**
 * İstifadəçinin son mesaj ID-sini yenilə
 */
export async function updateUserMessageId(telegramId, messageId) {
  const { error } = await supabaseAdmin
    .from('users')
    .update({ last_message_id: messageId })
    .eq('telegram_id', telegramId);

  if (error) {
    console.error('updateUserMessageId error:', error.message);
  }
}

/**
 * İstifadəçinin son mesaj ID-sini al
 */
export async function getUserMessageId(telegramId) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('last_message_id')
    .eq('telegram_id', telegramId)
    .maybeSingle();

  if (error) {
    console.error('getUserMessageId error:', error.message);
  }

  return data?.last_message_id || null;
}

/**
 * İstifadəçi state-ni yenilə (review flow üçün)
 * ÖNƏMLİ: Yalnız `state` sütununu yeniləyirik ki, digər sütun problemləri
 * bu kritik əməliyyatı bloklamasın.
 */
export async function updateUserState(telegramId, state) {
  const { error } = await supabaseAdmin
    .from('users')
    .update({ state })
    .eq('telegram_id', telegramId);

  if (error) {
    console.error(`updateUserState error (state=${state}):`, error.message);
  }
}

/**
 * İstifadəçi state-ni al
 */
export async function getUserState(telegramId) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('state')
    .eq('telegram_id', telegramId)
    .maybeSingle();

  if (error) {
    console.error('getUserState error:', error.message);
  }

  return data?.state || 'idle';
}
