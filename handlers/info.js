import { sendOrEdit, inlineKeyboard } from '../lib/telegram.js';

/**
 * Məlumat Al - Əsas menyu
 */
export async function handleInfo(chatId, messageId) {
  const text = `ℹ️ <b>Məlumat Mərkəzi</b>

━━━━━━━━━━━━━━━━━━━━
📚 <b>XariciNömrəAz</b> — Bilgi Bazası
━━━━━━━━━━━━━━━━━━━━

Aşağıdakı bölmələrdən birini seçərək virtual nömrələr haqqında ətraflı məlumat əldə edin:`;

  const keyboard = inlineKeyboard([
    [{ text: '❓ Virtual nömrə nədir?', callback_data: 'info_what' }],
    [{ text: '⚙️ Proses necədir?', callback_data: 'info_process' }],
    [{ text: '⏰ İlk 24 Saat', callback_data: 'info_first24' }],
    [{ text: '📅 İstifadə müddəti', callback_data: 'info_duration' }],
    [{ text: '📖 Necə istifadə etməli?', callback_data: 'info_howto' }],
    [{ text: '🔒 Təhlükəsizlik', callback_data: 'info_security' }],
    [{ text: '📋 Təlimat', callback_data: 'info_guide' }],
    [{ text: '💬 FAQ', callback_data: 'info_faq' }],
    [{ text: '🔙 Ana Menyu', callback_data: 'home' }],
  ]);

  await sendOrEdit(chatId, messageId, text, keyboard);
}

/**
 * Məlumat Alt-menyuları
 */
export async function handleInfoSubmenu(chatId, messageId, data) {
  const section = data.replace('info_', '');
  const content = INFO_CONTENT[section];

  if (!content) return;

  const keyboard = inlineKeyboard([
    [{ text: '🔙 Geri', callback_data: 'info' }],
    [{ text: '🏠 Ana Menyu', callback_data: 'home' }],
  ]);

  await sendOrEdit(chatId, messageId, content, keyboard);
}

/**
 * Bütün məlumat bölmələrinin mətnləri
 */
const INFO_CONTENT = {
  what: `❓ <b>Virtual Nömrə Nədir?</b>

━━━━━━━━━━━━━━━━━━━━

Virtual nömrə — fiziki SIM kart olmadan istifadə edilə bilən telefon nömrəsidir. Bu nömrələr real operatorlara məxsusdur və tamamilə qanuni şəkildə təqdim olunur.

<b>🔹 Əsas xüsusiyyətlər:</b>

• Real telefon nömrəsidir (fiziki SIM kartı yoxdur)
• SMS qəbul edə bilir
• WhatsApp, Telegram və digər platformalarda qeydiyyat üçün istifadə olunur
• Müxtəlif ölkələrin nömrələri mövcuddur
• Başqa bir ölkənin nömrəsini öz telefonunuzda istifadə edə bilərsiniz

<b>🔹 Niyə lazımdır?</b>

• Əsas nömrənizi gizli saxlamaq üçün
• Xarici platformalarda qeydiyyatdan keçmək üçün
• Biznes məqsədləri üçün əlavə nömrə
• Məxfilik və təhlükəsizlik üçün
• Bir neçə hesab yaratmaq üçün (platformaların qaydalarına uyğun)

<b>🔹 Necə işləyir?</b>

Siz nömrəni aldıqdan sonra, həmin nömrəyə gələn SMS-ləri birbaşa öz telefonunuzda görə bilərsiniz. Heç bir əlavə cihaz və ya SIM kart lazım deyil.`,

  process: `⚙️ <b>Proses Necədir?</b>

━━━━━━━━━━━━━━━━━━━━

Nömrə almaq prosesi çox sadə və sürətlidir:

<b>📋 Addım-addım:</b>

<b>1️⃣ Platforma seçin</b>
WhatsApp, Telegram və ya digər platformalardan birini seçin.

<b>2️⃣ Ölkə seçin</b>
İstədiyiniz ölkənin nömrəsini seçin (Türkiyə, ABŞ, Almaniya və s.)

<b>3️⃣ Ödəniş edin</b>
Qiyməti öyrənin və ödəniş üsulunu razılaşdırın.

<b>4️⃣ Nömrəni alın</b>
Ödəniş təsdiqləndikdən sonra nömrə dərhal sizə təqdim edilir.

<b>5️⃣ Aktivasiya</b>
Nömrəni platformada qeydiyyat üçün istifadə edin, SMS kodu gələcək.

<b>⏱ Vaxt:</b>
Bütün proses adətən 5-15 dəqiqə ərzində tamamlanır.

<b>💳 Ödəniş üsulları:</b>
• Kart-karta köçürmə
• Nağd (görüş ilə)
• Digər razılaşdırılmış üsullar`,

  first24: `⏰ <b>İlk 24 Saat — Vacib Məlumat</b>

━━━━━━━━━━━━━━━━━━━━

Nömrəni aldıqdan sonra ilk 24 saat çox vacibdir. Bu müddətdə aşağıdakılara diqqət edin:

<b>⚠️ İlk 24 saatda nə etməli:</b>

✅ Nömrəni dərhal platformada qeydiyyatdan keçirin
✅ Doğrulama SMS-ini gözləyin (adətən 1-5 dəqiqə)
✅ Hesabı tam qurun (profil şəkli, ad və s.)
✅ İlk mesajınızı göndərin (hesab aktiv saxlamaq üçün)
✅ Yedək kod/email bağlayın

<b>❌ İlk 24 saatda nə ETMƏMƏLİ:</b>

❌ Çoxlu sayda qrup yaratmaq və ya qoşulmaq
❌ Tanımadığınız nömrələrə kütləvi mesaj göndərmək
❌ Spam xarakterli hərəkətlər etmək
❌ Nömrəni tez-tez çıxarıb-daxil etmək
❌ VPN istifadə etmək (bəzi hallarda problem yarada bilər)

<b>💡 Tövsiyə:</b>

İlk 24 saatda hesabı "normal istifadəçi" kimi istifadə edin. Platformalar yeni hesabları yaxından izləyir, ona görə təbii davranış çox vacibdir.

<b>🔄 Əgər problem yaranarsa:</b>
Dərhal bizimlə əlaqə saxlayın — pulsuz dəyişdirmə və ya geri qaytarma mümkündür (şərtlərə uyğun).`,

  duration: `📅 <b>İstifadə Müddəti</b>

━━━━━━━━━━━━━━━━━━━━

Virtual nömrələrin istifadə müddəti platforma və nömrə növündən asılı olaraq dəyişir:

<b>📱 WhatsApp nömrələri:</b>
• İstifadə müddəti: Daimi (düzgün istifadə ilə)
• Nömrə sizə məxsusdur
• Aktiv saxlamaq üçün ayda ən az 1 dəfə istifadə edin

<b>✈️ Telegram nömrələri:</b>
• İstifadə müddəti: Daimi
• Telegram hesabı aktiv olduğu müddətdə nömrə sizindir
• 6 aydan artıq istifadə edilməzsə Telegram hesabı silə bilər

<b>📱 Digər platformalar:</b>
• Müddət platformadan asılıdır
• Birdəfəlik doğrulama: Yalnız SMS alınana qədər
• Daimi nömrə: Uzunmüddətli istifadə

<b>⚠️ Vacib qeydlər:</b>

• Nömrə bloklanmaya səbəb olan hərəkətlər etməyin
• Əgər nömrə platformadan bloklanarsa, bu bizim xidmət keyfiyyəti ilə əlaqədar deyil
• Qaydaları pozmayın: spam, saxta hesab və s.
• Müntəzəm istifadə nömrənin aktiv qalmasını təmin edir

<b>🔄 Nömrə yenilənməsi:</b>
Əgər nömrə ilə problem yaranarsa, şərtlərə uyğun olaraq yeni nömrə ilə dəyişdirmə mümkündür.`,

  howto: `📖 <b>Necə İstifadə Etməli?</b>

━━━━━━━━━━━━━━━━━━━━

Virtual nömrəni istifadə etmək çox asandır. Platformaya görə addımlar:

<b>💬 WhatsApp üçün:</b>

1. WhatsApp-ı telefonunuzda açın
2. Yeni hesab yaratmaq seçin
3. Bizim verdiyimiz nömrəni daxil edin
4. SMS doğrulama kodunu bizdən alın
5. Kodu daxil edin — hesab hazırdır!

<b>✈️ Telegram üçün:</b>

1. Telegram tətbiqini açın
2. "Start Messaging" seçin
3. Nömrəni ölkə kodu ilə daxil edin
4. SMS/zəng ilə gələn kodu daxil edin
5. Hesabınız aktivdir!

<b>📱 Digər platformalar:</b>

1. Platformanın qeydiyyat səhifəsinə keçin
2. Telefon nömrəsi xanasına nömrəni yazın
3. "Kod göndər" düyməsini basın
4. Gələn doğrulama kodunu bizdən alın
5. Kodu daxil edib hesabı aktivləşdirin

<b>💡 Vacib məsləhətlər:</b>

• Nömrəni ölkə kodu ilə birlikdə daxil edin (məs: +90...)
• Kod gəlməsə 2-3 dəqiqə gözləyin
• Kod gəlmədiyi halda "Yenidən göndər" seçimini istifadə edin
• Problem yaranarsa dərhal bizimlə əlaqə saxlayın`,

  security: `🔒 <b>Təhlükəsizlik</b>

━━━━━━━━━━━━━━━━━━━━

Təhlükəsizlik bizim üçün prioritetdir. Virtual nömrələrin təhlükəsizliyi haqqında bilməli olduğunuz hər şey:

<b>🛡 Bizim tərəfdən təminatlar:</b>

✅ Nömrə yalnız sizə verilir — başqası ilə paylaşılmır
✅ SMS kodları yalnız sizə ötürülür
✅ Şəxsi məlumatlarınız qorunur
✅ Ödəniş məlumatları saxlanmır
✅ Bütün əməliyyatlar şifrələnmiş kanallarda aparılır

<b>🔐 Sizin tərəfdən tövsiyələr:</b>

• İki faktorlu doğrulama (2FA) aktivləşdirin
• Güclü parol istifadə edin
• Hesabınıza email bağlayın
• Nömrəni başqaları ilə paylaşmayın
• Şübhəli linklərə klikləməyin
• Hesab məlumatlarınızı heç kimə verməyin

<b>⚠️ Risklərin minimuma endirilməsi:</b>

• Nömrə ilə yalnız 1 hesab yaradın
• Platformaların qaydalarını oxuyun və əməl edin
• Spam və kütləvi mesajlaşmadan uzaq durun
• VPN istifadə edərkən diqqətli olun
• Hesabda şübhəli aktivlik görsəniz dərhal bizə yazın

<b>🚫 Biz heç vaxt:</b>

• Sizin kodunuzu başqasına vermirik
• Hesab məlumatlarınızı tələb etmirik
• Nömrəni geri almırıq (ödəniş edildikdən sonra)
• Spam məqsədli nömrə satmırıq`,

  guide: `📋 <b>Təlimat — Tam Bələdçi</b>

━━━━━━━━━━━━━━━━━━━━

Bu təlimat sizə nömrə alma prosesinin əvvəlindən sonuna qədər bələdçilik edəcək:

<b>📌 BAŞLAMAZDAN ƏVVƏL:</b>

1. Hansı platforma üçün nömrə istədiyinizi müəyyən edin
2. Hansı ölkə nömrəsi istədiyinizi seçin
3. Ödəniş üsulunu hazırlayın

<b>📌 SİFARİŞ PROSESİ:</b>

1. Bizə WhatsApp-dan yazın
2. Platforma və ölkəni bildirin
3. Stok və qiymət təsdiq ediləcək
4. Ödənişi həyata keçirin
5. Nömrə və ilk kod təqdim ediləcək

<b>📌 AKTİVASİYA:</b>

1. Platformanı açın
2. Qeydiyyat bölməsinə keçin
3. Nömrəni daxil edin (ölkə kodu ilə)
4. "Kod göndər" basın
5. Kodu bizdən alın və daxil edin
6. Profili tamamlayın

<b>📌 AKTİVASİYADAN SONRA:</b>

1. Profil şəklini əlavə edin
2. Adınızı yazın
3. Email/yedək nömrə bağlayın
4. 2FA aktivləşdirin
5. İlk 24 saatda normal istifadə edin

<b>📌 UZUNMÜDDƏTLI İSTİFADƏ:</b>

• Hesabı aktiv saxlayın (ayda ən az 1 dəfə)
• Qaydaları pozacaq hərəkətlərdən qaçın
• Problem olsa dərhal bizimlə əlaqə saxlayın
• Yedək kodlarınızı qeyd edin`,

  faq: `💬 <b>Tez-tez Verilən Suallar (FAQ)</b>

━━━━━━━━━━━━━━━━━━━━

<b>❓ Nömrə nə qədər müddətə mənimdir?</b>
Daimi olaraq sizindir. Düzgün istifadə etdiyiniz müddətdə nömrə sizdə qalır.

<b>❓ SMS kodunu necə alacam?</b>
Nömrəni aldıqdan sonra SMS kodları bizim tərəfdən sizə ötürüləcək. Proses çox sürətlidir.

<b>❓ Nömrə bloklanarsa nə olacaq?</b>
Əgər nömrə sizin təqsirinizdən kənar səbəblərlə bloklanarsa, şərtlərə uyğun olaraq dəyişdirmə mümkündür.

<b>❓ Hansı ödəniş üsulları var?</b>
Kart-karta köçürmə, nağd ödəmə və digər razılaşdırılmış üsullar mövcuddur.

<b>❓ Nömrəni bir neçə platformada istifadə edə bilərəm?</b>
Hər nömrə bir platforma üçün nəzərdə tutulub. Fərqli platformalar üçün ayrı nömrə almalısınız.

<b>❓ Geri qaytarma mümkündür?</b>
Nömrə işləmədikdə və ya aktivasiya uğursuz olduqda — bəli. Aktivasiya edildikdən sonra — xeyr.

<b>❓ Nə qədər vaxt ərzində nömrəni alacam?</b>
Ödəniş təsdiqləndikdən sonra 5-15 dəqiqə ərzində.

<b>❓ Stokda nömrə yoxdursa?</b>
Gözləmə siyahısına əlavə oluna bilərsiniz, stok yeniləndikdə xəbər veriləcək.

<b>❓ Eyni nömrəni başqası ala bilər?</b>
Xeyr! Hər nömrə yalnız bir müştəriyə satılır.

<b>❓ Dəstək saatları necədir?</b>
Biz 7/24 əlçatanam. WhatsApp-dan istənilən vaxt yaza bilərsiniz.`,
};
