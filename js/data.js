// ===== XariciNomreAz Data Layer =====
// localStorage ilə işləyir. Sonradan Supabase-ə keçiriləcək.

const STORAGE_KEYS = {
    platforms: 'xn_platforms',
    countries: 'xn_countries',
    reviews: 'xn_reviews',
    faqs: 'xn_faqs',
    settings: 'xn_settings',
    aboutItems: 'xn_about',
    processSteps: 'xn_process',
    safetyRules: 'xn_safety',
    whatsappGuide: 'xn_wa_guide',
    telegramGuide: 'xn_tg_guide'
};

// ===== STATUS CONSTANTS =====
const STOCK_STATUS = {
    AVAILABLE: { key: 'available', label: 'Stokda var', color: 'green' },
    LOW: { key: 'low', label: 'Az qalıb', color: 'orange' },
    SOON: { key: 'soon', label: 'Yaxın zamanda', color: 'blue' },
    UNAVAILABLE: { key: 'unavailable', label: 'Müvəqqəti mövcud deyil', color: 'gray' },
    STOPPED: { key: 'stopped', label: 'Satış dayandırılıb', color: 'red' }
};

const REVIEW_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    SPAM: 'spam',
    DELETED: 'deleted'
};

const QUALITY_LEVELS = {
    STANDARD: 'Standard',
    PREMIUM: 'Premium',
    VIP: 'VIP'
};


// ===== DEFAULT DATA =====
const DEFAULT_SETTINGS = {
    whatsappNumber: '994402821222',
    instagram: 'xaricinomreazz',
    telegram: '',
    email: '',
    workingHours: '09:00 - 23:00',
    defaultMessage: 'Salam, XariciNomrəAz saytından gəlirəm. Xarici nömrə haqqında məlumat almaq istəyirəm.'
};

const DEFAULT_PLATFORMS = [
    { id: 1, name: 'WhatsApp', icon: '💬', active: true, order: 1 },
    { id: 2, name: 'Telegram', icon: '✈️', active: true, order: 2 },
    { id: 3, name: 'Instagram', icon: '📷', active: true, order: 3 },
    { id: 4, name: 'TikTok', icon: '🎵', active: true, order: 4 },
    { id: 5, name: 'Digər platformalar', icon: '📱', active: true, order: 5 }
];

const DEFAULT_COUNTRIES = [
    { id: 1, name: 'Türkiyə', code: '+90', flag: '🇹🇷', platformId: 1, stock: 12, status: 'available', quality: 'Premium', price: 15, showPrice: true, note: 'Ən populyar seçim', active: true },
    { id: 2, name: 'ABŞ', code: '+1', flag: '🇺🇸', platformId: 1, stock: 5, status: 'available', quality: 'VIP', price: 25, showPrice: true, note: 'Uzunmüddətli istifadə', active: true },
    { id: 3, name: 'Böyük Britaniya', code: '+44', flag: '🇬🇧', platformId: 1, stock: 3, status: 'low', quality: 'Premium', price: 20, showPrice: true, note: '', active: true },
    { id: 4, name: 'Rusiya', code: '+7', flag: '🇷🇺', platformId: 1, stock: 8, status: 'available', quality: 'Standard', price: 10, showPrice: true, note: '', active: true },
    { id: 5, name: 'Almaniya', code: '+49', flag: '🇩🇪', platformId: 1, stock: 0, status: 'soon', quality: 'Premium', price: 22, showPrice: false, note: 'Tezliklə stoka gələcək', active: true },
    { id: 6, name: 'Filippin', code: '+63', flag: '🇵🇭', platformId: 1, stock: 0, status: 'unavailable', quality: 'Standard', price: 8, showPrice: false, note: '', active: true },
    { id: 7, name: 'Türkiyə', code: '+90', flag: '🇹🇷', platformId: 2, stock: 15, status: 'available', quality: 'Premium', price: 12, showPrice: true, note: '', active: true },
    { id: 8, name: 'ABŞ', code: '+1', flag: '🇺🇸', platformId: 2, stock: 4, status: 'low', quality: 'Premium', price: 18, showPrice: true, note: '', active: true },
    { id: 9, name: 'Böyük Britaniya', code: '+44', flag: '🇬🇧', platformId: 2, stock: 7, status: 'available', quality: 'Standard', price: 14, showPrice: true, note: '', active: true },
    { id: 10, name: 'Rusiya', code: '+7', flag: '🇷🇺', platformId: 2, stock: 0, status: 'stopped', quality: 'Standard', price: 0, showPrice: false, note: 'Satış müvəqqəti dayandırılıb', active: true },
    { id: 11, name: 'Türkiyə', code: '+90', flag: '🇹🇷', platformId: 3, stock: 6, status: 'available', quality: 'Standard', price: 10, showPrice: true, note: '', active: true },
    { id: 12, name: 'ABŞ', code: '+1', flag: '🇺🇸', platformId: 3, stock: 2, status: 'low', quality: 'Premium', price: 20, showPrice: true, note: '', active: true },
    { id: 13, name: 'Türkiyə', code: '+90', flag: '🇹🇷', platformId: 4, stock: 9, status: 'available', quality: 'Standard', price: 8, showPrice: true, note: '', active: true },
    { id: 14, name: 'ABŞ', code: '+1', flag: '🇺🇸', platformId: 4, stock: 0, status: 'soon', quality: 'Premium', price: 15, showPrice: false, note: '', active: true }
];


const DEFAULT_REVIEWS = [
    { id: 1, name: 'Əli M.', platform: 'WhatsApp', country: 'Türkiyə', text: 'Çox sürətli xidmət! 5 dəqiqə içində nömrəni aldım. Təşəkkürlər!', rating: 5, date: '2025-12-15', status: 'approved', featured: true, active: true },
    { id: 2, name: 'Aysel K.', platform: 'WhatsApp', country: 'ABŞ', text: 'WhatsApp üçün ABŞ nömrəsi aldım. Problemsiz işləyir, tövsiyə edirəm.', rating: 5, date: '2025-12-10', status: 'approved', featured: false, active: true },
    { id: 3, name: 'Murad H.', platform: 'Telegram', country: '', text: 'Qiymətlər münasibdir və dəstək çox yaxşıdır. Hər sualıma cavab verdilər.', rating: 4, date: '2025-12-08', status: 'approved', featured: false, active: true },
    { id: 4, name: 'Ləman R.', platform: 'Telegram', country: 'Böyük Britaniya', text: 'Telegram üçün nömrə aldım. Heç bir problem olmadı. Minnətdaram!', rating: 5, date: '2025-11-28', status: 'approved', featured: true, active: true }
];

const DEFAULT_FAQS = [
    { id: 1, question: 'Xarici virtual nömrə nədir?', answer: 'Xarici virtual nömrə fiziki SIM kartın istifadəçinin cihazında olmadığı, lakin müəyyən platformalarda qeydiyyat, SMS təsdiqi və ya hesab istifadəsi üçün təqdim edilən xarici ölkə nömrəsidir.', active: true },
    { id: 2, question: 'Nömrəni neçə dəqiqəyə əldə edirəm?', answer: 'Stokda olan nömrələr ödəniş təsdiqindən sonra adətən 5-15 dəqiqə ərzində təqdim edilir.', active: true },
    { id: 3, question: 'Nömrə hansı platformalarda işləyir?', answer: 'Hər nömrə konkret platforma üçün nəzərdə tutulub. WhatsApp, Telegram, Instagram, TikTok və digər platformalar üçün ayrı nömrələr mövcuddur.', active: true },
    { id: 4, question: 'Kod gəlməsə nə baş verir?', answer: 'Nadir hallarda kod gecikə bilər. Bizimlə əlaqə saxlayın, problemi həll edəcəyik və ya alternativ təklif edəcəyik.', active: true },
    { id: 5, question: 'Nömrə daimidirmi?', answer: 'İstifadə müddəti nömrənin növünə, platformaya və istifadə qaydasına görə dəyişir. Heç bir nömrə üçün müddətsiz zəmanət verilmir.', active: true },
    { id: 6, question: 'Nömrəni uzunmüddətli istifadə etmək mümkündürmü?', answer: 'Premium və VIP seçimlər uzunmüddətli istifadə üçün daha uyğundur. Hesabın ömrü istifadəçinin davranışından da asılıdır.', active: true },
    { id: 7, question: 'Hesab bloklana bilərmi?', answer: 'Bəli, platformanın daxili yoxlamaları nəticəsində blok mümkündür. Spam, kütləvi reklam və qayda pozuntusu blok riskini artırır. 100% bloklanmama zəmanəti verilmir.', active: true },
    { id: 8, question: 'Hansı ölkə daha stabildir?', answer: 'Türkiyə və ABŞ nömrələri ən stabil seçimlər arasındadır. Premium keyfiyyətli nömrələr daha uzunmüddətli olur.', active: true },
    { id: 9, question: 'İki addımlı doğrulama nə vaxt aktiv edilməlidir?', answer: 'Hesabı aldıqdan dərhal sonra, ilk 24 saat ərzində iki addımlı doğrulamanı aktiv etməlisiniz.', active: true },
    { id: 10, question: 'VPN istifadə etmək olar?', answer: 'Davamlı VPN və IP dəyişikliyi blok riskini artıra bilər. Mümkün qədər sabit internet bağlantısı tövsiyə olunur.', active: true },
    { id: 11, question: 'Geri qaytarma və dəyişdirmə şərtləri necədir?', answer: 'Nömrə işləməzsə dəyişdirmə və ya geri qaytarma şərtləri tətbiq oluna bilər. Dəqiq şərtlər üçün WhatsApp-dan əlaqə saxlayın.', active: true },
    { id: 12, question: 'Stoklar nə qədər tez yenilənir?', answer: 'Stoklar gündəlik olaraq yenilənir. Saytdakı stok məlumatları aktual vəziyyəti əks etdirir.', active: true },
    { id: 13, question: 'Qiymətlər niyə dəyişir?', answer: 'Qiymətlər ölkəyə, platforma tələbinə və stok vəziyyətinə görə dəyişə bilər.', active: true },
    { id: 14, question: 'Ödəniş necə edilir?', answer: 'Ödəniş bank kartı, balans köçürməsi və ya digər üsullarla mümkündür. Dəqiq məlumat WhatsApp-dan təqdim olunur.', active: true },
    { id: 15, question: 'Hansı platformalar dəstəklənir?', answer: 'WhatsApp, Telegram, Instagram, TikTok və digər platformalar dəstəklənir. Yeni platformalar əlavə oluna bilər.', active: true }
];


const DEFAULT_ABOUT_ITEMS = [
    { id: 1, title: 'Xarici virtual nömrə nədir?', content: 'Xarici virtual nömrə fiziki SIM kartın istifadəçinin cihazında olmadığı, lakin müəyyən platformalarda qeydiyyat, SMS təsdiqi və ya hesab istifadəsi üçün təqdim edilən xarici ölkə nömrəsidir.\n\nNömrənin növündən və xidmət şərtlərindən asılı olaraq:\n• SMS kodu qəbul edilə bilər\n• Yeni hesab yaradıla bilər\n• Hazır hesab təqdim edilə bilər', active: true },
    { id: 2, title: 'Nömrə nə üçün istifadə olunur?', content: '• Xarici ölkə nömrəsi ilə hesab yaratmaq\n• İş və şəxsi hesabları ayırmaq\n• Fərqli ölkəyə uyğun profil yaratmaq\n• Şəxsi əsas nömrəni paylaşmamaq\n• Biznes və müştəri əlaqəsi üçün əlavə hesab istifadə etmək\n• Müxtəlif platformalarda əlavə profil yaratmaq\n\n⚠️ Nömrələrin qanunsuz fəaliyyət, dələduzluq, spam, icazəsiz reklam və platforma qaydalarını pozmaq üçün istifadəsi qadağandır.', active: true },
    { id: 3, title: 'Nömrə nə qədər müddət istifadə olunur?', content: 'İstifadə müddəti konkret məhsula, platformaya, ölkəyə və istifadə qaydasına görə dəyişə bilər.\n\nHeç bir nömrə üçün müddətsiz və ya tam zəmanətli istifadə vədi verilmir.\n\n• Birdəfəlik nömrə yalnız kod almaq üçün ola bilər\n• Bəzi nömrələr müəyyən müddət üçün istifadə edilə bilər\n• Premium seçimlər uzunmüddətli istifadə üçün daha uyğun ola bilər\n• Hesabın ömrü istifadəçinin fəaliyyətindən də asılıdır', active: true },
    { id: 4, title: 'Nömrə məxfidirmi?', content: 'Müştərinin sifariş məlumatları üçüncü şəxslərlə paylaşılmır.\n\nAncaq virtual nömrələrin texniki xüsusiyyətlərinə görə bütün nömrələr şəxsi fiziki SIM kartla eyni təhlükəsizlik səviyyəsinə malik olmaya bilər.\n\nHesabı aldıqdan sonra:\n• İki addımlı doğrulamanı aktiv edin\n• Şəxsi e-poçt ünvanınızı əlavə edin\n• Aktiv cihazları yoxlayın\n• Tanımadığınız sessiyalardan çıxın\n• Şifrələri heç kimlə paylaşmayın', active: true },
    { id: 5, title: 'Hesab niyə bloklana bilər?', content: 'Aşağıdakı hallar blok riskini artıra bilər:\n\n• Qısa müddətdə çox sayda mesaj göndərmək\n• Tanımadığınız şəxslərə ardıcıl yazmaq\n• Kütləvi reklam göndərmək\n• Çoxlu qrupa birdən daxil olmaq\n• Eyni cihazda həddindən artıq hesab idarə etmək\n• Tez-tez cihaz dəyişmək\n• IP ünvanını davamlı dəyişmək\n• Şübhəli VPN və proxy istifadəsi\n• Avtomatlaşdırılmış mesaj proqramlarından istifadə\n• Platformanın qaydalarını pozmaq\n\n⚠️ Heç bir nömrə və ya hesab üçün 100% bloklanmama zəmanəti verilmir.', active: true }
];

const DEFAULT_PROCESS_STEPS = [
    { id: 1, title: 'Müştəri əlaqə saxlayır', description: 'XariciNomrəAz-ın rəsmi WhatsApp hesabına yazırsınız və nömrənin hansı platforma üçün lazım olduğunu bildirirsiniz.' },
    { id: 2, title: 'Platforma seçilir', description: 'WhatsApp, Telegram və ya digər platformalardan birini seçirsiniz.' },
    { id: 3, title: 'Ölkə və stok yoxlanılır', description: 'Seçilən platformaya uyğun stokda olan ölkələr təqdim edilir. Siz uyğun ölkəni seçirsiniz.' },
    { id: 4, title: 'Qiymət və şərtlər bildirilir', description: 'Qiymət, nömrənin növü, təhlükəsizlik qaydaları, zəmanət və dəyişdirmə şərtləri əvvəlcədən bildirilir.' },
    { id: 5, title: 'Ödəniş edilir', description: 'Rəsmi ödəniş məlumatları göndərilir. Ödəniş etdikdən sonra təsdiq məlumatını təqdim edirsiniz.' },
    { id: 6, title: 'Nömrə və ya hesab təqdim edilir', description: 'Ödəniş təsdiqləndikdən sonra nömrə, hesab, giriş məlumatları və istifadə təlimatı təqdim edilir.' },
    { id: 7, title: 'İlkin təhlükəsizlik mərhələsi', description: 'Hesabı aldıqdan sonra ilk saatlarda təqdim edilən təlimata uyğun davranmalısınız.' },
    { id: 8, title: 'Normal istifadəyə başlanılır', description: 'Tövsiyə olunan ilkin müddətdən sonra hesab normal istifadə edilə bilər. Spam və qayda pozuntusu yenə də edilməməlidir.' }
];


const DEFAULT_SAFETY_RULES = {
    donts: [
        'Çox sayda şəxsə mesaj göndərmək',
        'Kütləvi zəng etmək',
        'Çoxlu qrupa daxil olmaq',
        'Tanımadığınız şəxsləri ardıcıl əlavə etmək',
        'Eyni mətni çox sayda şəxsə göndərmək',
        'Reklam və spam mesajları göndərmək',
        'Profil məlumatlarını dəfələrlə dəyişmək',
        'Tez-tez cihaz dəyişmək',
        'VPN və IP ünvanını davamlı dəyişmək',
        'Hesabı başqa şəxslərlə paylaşmaq',
        'Avtomatlaşdırılmış proqramlardan istifadə etmək',
        'Çox sayda kanal və qrupa sürətlə qoşulmaq'
    ],
    dos: [
        'Profil şəklini əlavə etmək',
        'Ad və qısa məlumat bölməsini doldurmaq',
        'Heç kimə yazmamaq (ilk 24 saat)',
        'Platformanın xidmət şərtlərinə əməl etmək',
        'Eyni cihazdan istifadə etmək',
        'Hesabı normal insan davranışına uyğun istifadə etmək'
    ]
};

const DEFAULT_WA_GUIDE = [
    { id: 1, title: 'İkili doğrulamanı aktiv etmək', content: '1. WhatsApp tətbiqini açın\n2. Ayarlar bölməsinə keçin\n3. Hesab bölməsini açın\n4. İki addımlı doğrulama seçiminə daxil olun\n5. Aktiv et düyməsinə toxunun\n6. Yadda saxlayacağınız 6 rəqəmli PIN yaradın\n7. Şəxsi e-poçt ünvanınızı əlavə edin\n8. E-poçta göndərilən təsdiqi tamamlayın\n9. PIN və e-poçt məlumatlarını heç kimlə paylaşmayın' },
    { id: 2, title: 'E-poçt əlavə etmək və ya dəyişmək', content: '1. WhatsApp Ayarlar bölməsinə keçin\n2. Hesab bölməsini açın\n3. İki addımlı doğrulama bölməsinə daxil olun\n4. E-poçt əlavə et və ya dəyiş seçimini seçin\n5. Şəxsi e-poçt ünvanınızı yazın\n6. Təsdiq prosesini tamamlayın' },
    { id: 3, title: 'Bağlı cihazları yoxlamaq', content: '1. WhatsApp Ayarlar bölməsinə keçin\n2. Bağlı cihazlar bölməsini açın\n3. Aktiv cihazları yoxlayın\n4. Tanımadığınız cihaz varsa çıxış edin\n5. Hesabı yalnız şəxsi cihazınızda istifadə edin' },
    { id: 4, title: 'WhatsApp-da edilməməli olanlar', content: '• Kütləvi mesaj göndərmək\n• Tanımadığınız şəxslərə reklam yazmaq\n• Eyni mətni ardıcıl göndərmək\n• Çoxlu qrupa qısa müddətdə qoşulmaq\n• Şübhəli üçüncü tərəf WhatsApp proqramlarından istifadə etmək\n• Hesabı bir neçə şəxslə paylaşmaq' }
];

const DEFAULT_TG_GUIDE = [
    { id: 1, title: 'İkili doğrulamanı aktiv etmək', content: '1. Telegram tətbiqini açın\n2. Ayarlar bölməsinə keçin\n3. Məxfilik və təhlükəsizlik bölməsini açın\n4. İki addımlı doğrulama seçimini seçin\n5. Güclü parol yaradın\n6. Şəxsi bərpa e-poçtunuzu əlavə edin\n7. E-poçta gələn təsdiq kodunu daxil edin\n8. Parolu heç kimlə paylaşmayın' },
    { id: 2, title: 'Aktiv sessiyaları yoxlamaq', content: '1. Ayarlar bölməsinə keçin\n2. Cihazlar bölməsini açın\n3. Aktiv sessiyaları yoxlayın\n4. Tanımadığınız cihazlardan çıxış edin\n5. Lazım olduqda digər bütün sessiyaları sonlandırın' },
    { id: 3, title: 'İlk günlərdə edilməməli olanlar', content: '• Eyni anda çoxlu qrupa qoşulmaq\n• Tanımadığınız şəxslərə ardıcıl mesaj yazmaq\n• Kütləvi reklam göndərmək\n• Eyni mətni çox sayda şəxsə göndərmək\n• Şübhəli botlardan istifadə etmək\n• Qısa müddətdə çoxlu istifadəçi əlavə etmək\n• Hesabı tez-tez fərqli cihazlarda açmaq' }
];


// ===== DATA MANAGER CLASS =====
class DataManager {
    constructor() { this.initializeData(); }

    initializeData() {
        if (!localStorage.getItem(STORAGE_KEYS.settings)) localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(DEFAULT_SETTINGS));
        if (!localStorage.getItem(STORAGE_KEYS.platforms)) localStorage.setItem(STORAGE_KEYS.platforms, JSON.stringify(DEFAULT_PLATFORMS));
        if (!localStorage.getItem(STORAGE_KEYS.countries)) localStorage.setItem(STORAGE_KEYS.countries, JSON.stringify(DEFAULT_COUNTRIES));
        if (!localStorage.getItem(STORAGE_KEYS.reviews)) localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(DEFAULT_REVIEWS));
        if (!localStorage.getItem(STORAGE_KEYS.faqs)) localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(DEFAULT_FAQS));
        if (!localStorage.getItem(STORAGE_KEYS.aboutItems)) localStorage.setItem(STORAGE_KEYS.aboutItems, JSON.stringify(DEFAULT_ABOUT_ITEMS));
        if (!localStorage.getItem(STORAGE_KEYS.processSteps)) localStorage.setItem(STORAGE_KEYS.processSteps, JSON.stringify(DEFAULT_PROCESS_STEPS));
        if (!localStorage.getItem(STORAGE_KEYS.safetyRules)) localStorage.setItem(STORAGE_KEYS.safetyRules, JSON.stringify(DEFAULT_SAFETY_RULES));
        if (!localStorage.getItem(STORAGE_KEYS.whatsappGuide)) localStorage.setItem(STORAGE_KEYS.whatsappGuide, JSON.stringify(DEFAULT_WA_GUIDE));
        if (!localStorage.getItem(STORAGE_KEYS.telegramGuide)) localStorage.setItem(STORAGE_KEYS.telegramGuide, JSON.stringify(DEFAULT_TG_GUIDE));
    }

    // Settings
    getSettings() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.settings) || '{}'); }
    updateSettings(data) { const s = this.getSettings(); Object.assign(s, data); localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(s)); }

    // Platforms
    getPlatforms() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.platforms) || '[]').filter(p => p.active).sort((a,b) => a.order - b.order); }
    getAllPlatforms() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.platforms) || '[]'); }
    addPlatform(p) { const all = this.getAllPlatforms(); p.id = Date.now(); p.active = true; p.order = all.length + 1; all.push(p); localStorage.setItem(STORAGE_KEYS.platforms, JSON.stringify(all)); return p; }
    updatePlatform(id, data) { const all = this.getAllPlatforms(); const i = all.findIndex(p => p.id === id); if (i !== -1) { all[i] = {...all[i], ...data}; localStorage.setItem(STORAGE_KEYS.platforms, JSON.stringify(all)); } }
    deletePlatform(id) { this.updatePlatform(id, { active: false }); }

    // Countries
    getCountries(platformId = null) { let c = JSON.parse(localStorage.getItem(STORAGE_KEYS.countries) || '[]').filter(x => x.active); if (platformId) c = c.filter(x => x.platformId === platformId); return c; }
    getAllCountries() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.countries) || '[]'); }
    addCountry(c) { const all = this.getAllCountries(); c.id = Date.now(); c.active = true; all.push(c); localStorage.setItem(STORAGE_KEYS.countries, JSON.stringify(all)); return c; }
    updateCountry(id, data) { const all = this.getAllCountries(); const i = all.findIndex(c => c.id === id); if (i !== -1) { all[i] = {...all[i], ...data}; localStorage.setItem(STORAGE_KEYS.countries, JSON.stringify(all)); } }
    deleteCountry(id) { this.updateCountry(id, { active: false }); }

    // Reviews
    getApprovedReviews() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.reviews) || '[]').filter(r => r.active && r.status === 'approved'); }
    getFeaturedReviews() { return this.getApprovedReviews().filter(r => r.featured); }
    getAllReviews() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.reviews) || '[]').filter(r => r.active); }
    addReview(r) { const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.reviews) || '[]'); r.id = Date.now(); r.active = true; r.status = REVIEW_STATUS.PENDING; r.featured = false; r.date = new Date().toISOString().split('T')[0]; all.push(r); localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(all)); return r; }
    updateReview(id, data) { const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.reviews) || '[]'); const i = all.findIndex(r => r.id === id); if (i !== -1) { all[i] = {...all[i], ...data}; localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(all)); } }
    deleteReview(id) { this.updateReview(id, { active: false, status: REVIEW_STATUS.DELETED }); }

    // FAQs
    getFaqs() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.faqs) || '[]').filter(f => f.active); }
    getAllFaqs() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.faqs) || '[]'); }
    addFaq(f) { const all = this.getAllFaqs(); f.id = Date.now(); f.active = true; all.push(f); localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(all)); return f; }
    updateFaq(id, data) { const all = this.getAllFaqs(); const i = all.findIndex(f => f.id === id); if (i !== -1) { all[i] = {...all[i], ...data}; localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(all)); } }
    deleteFaq(id) { this.updateFaq(id, { active: false }); }

    // About items
    getAboutItems() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.aboutItems) || '[]').filter(a => a.active); }
    // Process steps
    getProcessSteps() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.processSteps) || '[]'); }
    // Safety rules
    getSafetyRules() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.safetyRules) || '{}'); }
    // WhatsApp guide
    getWhatsAppGuide() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.whatsappGuide) || '[]'); }
    // Telegram guide
    getTelegramGuide() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.telegramGuide) || '[]'); }

    // WhatsApp URL generator
    getWhatsAppUrl(message = null) {
        const settings = this.getSettings();
        const msg = message || settings.defaultMessage;
        return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    }

    getCountryWhatsAppUrl(platformName, countryName) {
        const msg = `Salam, ${platformName} üçün ${countryName} nömrəsi haqqında məlumat almaq istəyirəm.`;
        return this.getWhatsAppUrl(msg);
    }

    getStockNotifyUrl(platformName, countryName) {
        const msg = `Salam, ${platformName} ${countryName} nömrəsi stoka gəldikdə məlumat almaq istəyirəm.`;
        return this.getWhatsAppUrl(msg);
    }

    // Reset
    resetData() {
        Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
        this.initializeData();
    }
}

const dataManager = new DataManager();
