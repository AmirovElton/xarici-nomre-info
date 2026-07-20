// ===== XariciNomreAz Data Layer =====
// localStorage ile isleyir.

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

const STOCK_STATUS = {
    AVAILABLE: { key: 'available', label: 'Stokda var', color: 'green' },
    LOW: { key: 'low', label: 'Az qalib', color: 'orange' },
    SOON: { key: 'soon', label: 'Yaxin zamanda', color: 'blue' },
    UNAVAILABLE: { key: 'unavailable', label: 'Muveqqeti movud deyil', color: 'gray' },
    STOPPED: { key: 'stopped', label: 'Satis dayandirilb', color: 'red' }
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


const DEFAULT_SETTINGS = {
    whatsappNumber: '994402821222',
    instagram: 'xaricinomreazz',
    telegram: '',
    email: '',
    workingHours: '09:00 - 23:00',
    defaultMessage: 'Salam, XariciNomreAz saytindan gelirem. Xarici nomre haqqinda melumat almaq isteyirem.'
};

const DEFAULT_PLATFORMS = [
    { id: 1, name: 'WhatsApp', icon: 'whatsapp', active: true, order: 1 },
    { id: 2, name: 'Telegram', icon: 'telegram', active: true, order: 2 },
    { id: 3, name: 'Diger', icon: 'other', active: true, order: 3 }
];


const DEFAULT_COUNTRIES = [
    { id: 1, name: 'Turkiye', code: '+90', flag: '\u{1F1F9}\u{1F1F7}', platformId: 1, stock: 12, status: 'available', quality: 'Premium', price: 15, showPrice: true, note: 'En populyar secim', active: true },
    { id: 2, name: 'ABS', code: '+1', flag: '\u{1F1FA}\u{1F1F8}', platformId: 1, stock: 5, status: 'available', quality: 'VIP', price: 25, showPrice: true, note: 'Uzunmuddatli istifade', active: true },
    { id: 3, name: 'Boyuk Britaniya', code: '+44', flag: '\u{1F1EC}\u{1F1E7}', platformId: 1, stock: 3, status: 'low', quality: 'Premium', price: 20, showPrice: true, note: '', active: true },
    { id: 4, name: 'Rusiya', code: '+7', flag: '\u{1F1F7}\u{1F1FA}', platformId: 1, stock: 8, status: 'available', quality: 'Standard', price: 10, showPrice: true, note: '', active: true },
    { id: 5, name: 'Almaniya', code: '+49', flag: '\u{1F1E9}\u{1F1EA}', platformId: 1, stock: 0, status: 'soon', quality: 'Premium', price: 22, showPrice: false, note: 'Tezlikle stoka gelecek', active: true },
    { id: 6, name: 'Filippin', code: '+63', flag: '\u{1F1F5}\u{1F1ED}', platformId: 1, stock: 0, status: 'unavailable', quality: 'Standard', price: 8, showPrice: false, note: '', active: true },
    { id: 7, name: 'Turkiye', code: '+90', flag: '\u{1F1F9}\u{1F1F7}', platformId: 2, stock: 15, status: 'available', quality: 'Premium', price: 12, showPrice: true, note: '', active: true },
    { id: 8, name: 'ABS', code: '+1', flag: '\u{1F1FA}\u{1F1F8}', platformId: 2, stock: 4, status: 'low', quality: 'Premium', price: 18, showPrice: true, note: '', active: true },
    { id: 9, name: 'Boyuk Britaniya', code: '+44', flag: '\u{1F1EC}\u{1F1E7}', platformId: 2, stock: 7, status: 'available', quality: 'Standard', price: 14, showPrice: true, note: '', active: true },
    { id: 10, name: 'Rusiya', code: '+7', flag: '\u{1F1F7}\u{1F1FA}', platformId: 2, stock: 0, status: 'stopped', quality: 'Standard', price: 0, showPrice: false, note: 'Satis muveqqeti dayandirilb', active: true },
    { id: 11, name: 'Turkiye', code: '+90', flag: '\u{1F1F9}\u{1F1F7}', platformId: 3, stock: 6, status: 'available', quality: 'Standard', price: 10, showPrice: true, note: '', active: true },
    { id: 12, name: 'ABS', code: '+1', flag: '\u{1F1FA}\u{1F1F8}', platformId: 3, stock: 2, status: 'low', quality: 'Premium', price: 20, showPrice: true, note: '', active: true },
    { id: 13, name: 'Hindistan', code: '+91', flag: '\u{1F1EE}\u{1F1F3}', platformId: 3, stock: 9, status: 'available', quality: 'Standard', price: 8, showPrice: true, note: '', active: true }
];


const DEFAULT_REVIEWS = [
    { id: 1, name: 'Ali M.', platform: 'WhatsApp', country: 'Turkiye', text: 'Cox suretli xidmet! 5 deqiqe icinde nomreni aldim. Tesekkurler!', rating: 5, date: '2025-12-15', status: 'approved', featured: true, active: true },
    { id: 2, name: 'Aysel K.', platform: 'WhatsApp', country: 'ABS', text: 'WhatsApp ucun ABS nomresi aldim. Problemsiz isleyir, tovsiye edirem.', rating: 5, date: '2025-12-10', status: 'approved', featured: false, active: true },
    { id: 3, name: 'Murad H.', platform: 'Telegram', country: '', text: 'Qiymetler munasibdir ve destek cox yaxsidir. Her sualima cavab verdiler.', rating: 4, date: '2025-12-08', status: 'approved', featured: false, active: true },
    { id: 4, name: 'Leman R.', platform: 'Telegram', country: 'Boyuk Britaniya', text: 'Telegram ucun nomre aldim. Hec bir problem olmadi. Minnetdaram!', rating: 5, date: '2025-11-28', status: 'approved', featured: true, active: true }
];

const DEFAULT_FAQS = [
    { id: 1, question: 'Xarici virtual nomre nedir?', answer: 'Xarici virtual nomre fiziki SIM kartin istifadecinin cihazinda olmadigi, lakin mueyyen platformalarda qeydiyyat, SMS tesdiqi ve ya hesab istifadesi ucun teqdim edilen xarici olke nomresidir.', active: true },
    { id: 2, question: 'Nomreni nece deqiqeye elde edirem?', answer: 'Stokda olan nomreler odenish tesdiqinden sonra adeten 5-15 deqiqe erzinde teqdim edilir.', active: true },
    { id: 3, question: 'Nomre hansi platformalarda isleyir?', answer: 'Her nomre konkret platforma ucun nezerde tutulub. WhatsApp, Telegram ve diger platformalar ucun ayri nomreler movcuddur.', active: true },
    { id: 4, question: 'Kod gelmese ne bas verir?', answer: 'Nadir hallarda kod gecike biler. Bizimle elaqe saxlayin, problemi hell edeceyik ve ya alternativ teklif edeceyik.', active: true },
    { id: 5, question: 'Nomre daimidirmi?', answer: 'Istifade muddeti nomrenin novune, platformaya ve istifade qaydasina gore deyishir. Hec bir nomre ucun muddetsiz zemanet verilmir.', active: true },
    { id: 6, question: 'Hesab bloklana bilermi?', answer: 'Beli, platformanin daxili yoxlamalari neticesinde blok mumkundur. Spam, kutlevi reklam ve qayda pozuntulari blok riskini artirir.', active: true },
    { id: 7, question: 'Hansi olke daha stabildir?', answer: 'Turkiye ve ABS nomreleri en stabil secimler arasindadir. Premium keyfiyyetli nomreler daha uzunmuddatli olur.', active: true },
    { id: 8, question: 'Odenish nece edilir?', answer: 'Odenish bank karti, balans kocurmesi ve ya diger usullarla mumkundur. Deqiq melumat WhatsApp-dan teqdim olunur.', active: true }
];


const DEFAULT_ABOUT_ITEMS = [
    { id: 1, title: 'Xarici virtual nomre nedir?', content: 'Xarici virtual nomre fiziki SIM kartin istifadecinin cihazinda olmadigi, lakin mueyyen platformalarda qeydiyyat, SMS tesdiqi ve ya hesab istifadesi ucun teqdim edilen xarici olke nomresidir.\n\nNomrenin novunden ve xidmet sertlerinden asili olaraq:\n* SMS kodu qebul edile biler\n* Yeni hesab yaradila biler\n* Hazir hesab teqdim edile biler', active: true },
    { id: 2, title: 'Nomre ne ucun istifade olunur?', content: '* Xarici olke nomresi ile hesab yaratmaq\n* Is ve sexsi hesablari ayirmaq\n* Ferqli olkeye uygun profil yaratmaq\n* Sexsi esas nomreni paylashmamaq\n* Biznes ve musteri elaqesi ucun elave hesab istifade etmek', active: true },
    { id: 3, title: 'Nomre ne qeder muddet istifade olunur?', content: 'Istifade muddeti konkret mehsula, platformaya, olkeye ve istifade qaydasina gore deyishe biler.\n\nHec bir nomre ucun muddetsiz ve ya tam zemanetli istifade vedi verilmir.\n\n* Birdefelik nomre yalniz kod almaq ucun ola biler\n* Bezi nomreler mueyyen muddet ucun istifade edile biler\n* Premium secimler uzunmuddatli istifade ucun daha uygun ola biler', active: true },
    { id: 4, title: 'Hesab niye bloklana biler?', content: 'Asagidaki hallar blok riskini artira biler:\n\n* Qisa muddatda cox sayda mesaj gondermek\n* Tanimadiginiz sexslere ardicil yazmaq\n* Kutlevi reklam gondermek\n* Coxlu qrupa birden daxil olmaq\n* Eyni cihazda heddinden artiq hesab idare etmek\n* Tez-tez cihaz deyishmek\n* IP unvanini davaml deyishmek', active: true }
];

const DEFAULT_PROCESS_STEPS = [
    { id: 1, title: 'Musteri elaqe saxlayir', description: 'XariciNomreAz-in resmi WhatsApp hesabina yazirsinis ve nomrenin hansi platforma ucun lazim oldugunu bildirirsiniz.' },
    { id: 2, title: 'Platforma secilir', description: 'WhatsApp, Telegram ve ya diger platformalardan birini secirsinis.' },
    { id: 3, title: 'Olke ve stok yoxlanilir', description: 'Secilen platformaya uygun stokda olan olkeler teqdim edilir.' },
    { id: 4, title: 'Qiymet ve sertler bildirilir', description: 'Qiymet, nomrenin novu, tehlukesizlik qaydalari bildiriilir.' },
    { id: 5, title: 'Odenish edilir', description: 'Resmi odenish melumatlari gonderilir. Odenish etdikden sonra tesdiq melumatin teqdim edirsinis.' },
    { id: 6, title: 'Nomre teqdim edilir', description: 'Odenish tesdiqldikden sonra nomre, hesab, girish melumatlari ve istifade telimatii teqdim edilir.' }
];


const DEFAULT_SAFETY_RULES = {
    donts: [
        'Cox sayda sexse mesaj gondermek',
        'Kutlevi zeng etmek',
        'Coxlu qrupa daxil olmaq',
        'Tanimadiginiz sexsleri ardicil elave etmek',
        'Eyni metni cox sayda sexse gondermek',
        'Reklam ve spam mesajlari gondermek',
        'Profil melumatlarini defalerle deyishmek',
        'Tez-tez cihaz deyishmek',
        'VPN ve IP unvanini davaml deyishmek',
        'Hesabi basqa sexslerle paylasmaq'
    ],
    dos: [
        'Profil sheklini elave etmek',
        'Ad ve qisa melumat bolmesini doldurmaq',
        'Hec kime yazmamaq (ilk 24 saat)',
        'Platformanin xidmet sertlerine emel etmek',
        'Eyni cihazdan istifade etmek',
        'Hesabi normal insan davranisina uygun istifade etmek'
    ]
};

const DEFAULT_WA_GUIDE = [
    { id: 1, title: 'Ikili dogrulamani aktiv etmek', content: '1. WhatsApp tetbiqini acin\n2. Ayarlar bolmesine kecin\n3. Hesab bolmesini acin\n4. Iki addimli dogrulama secimine daxil olun\n5. Aktiv et duymesine toxunun\n6. 6 reqemli PIN yaradin\n7. Sexsi e-poct unvaninizi elave edin' },
    { id: 2, title: 'E-poct elave etmek', content: '1. WhatsApp Ayarlar bolmesine kecin\n2. Hesab bolmesini acin\n3. Iki addimli dogrulama bolmesine daxil olun\n4. E-poct elave et secimini secin\n5. Sexsi e-poct unvaninizi yazin\n6. Tesdiq prosesini tamamlayin' },
    { id: 3, title: 'Bagli cihazlari yoxlamaq', content: '1. WhatsApp Ayarlar bolmesine kecin\n2. Bagli cihazlar bolmesini acin\n3. Aktiv cihazlari yoxlayin\n4. Tanimadiginiz cihaz varsa cixish edin' },
    { id: 4, title: 'WhatsApp-da edilmemeli olanlar', content: '* Kutlevi mesaj gondermek\n* Tanimadiginiz sexslere reklam yazmaq\n* Eyni metni ardicil gondermek\n* Coxlu qrupa qisa muddatda qosulmaq\n* Subheli ucuncu teref proqramlarindan istifade etmek' }
];

const DEFAULT_TG_GUIDE = [
    { id: 1, title: 'Ikili dogrulamani aktiv etmek', content: '1. Telegram tetbiqini acin\n2. Ayarlar bolmesine kecin\n3. Mexfilik ve tehlukesizlik bolmesini acin\n4. Iki addimli dogrulama secimini secin\n5. Guclu parol yaradin\n6. Sexsi berpa e-poctunuzu elave edin' },
    { id: 2, title: 'Aktiv sessiyalari yoxlamaq', content: '1. Ayarlar bolmesine kecin\n2. Cihazlar bolmesini acin\n3. Aktiv sessiyalari yoxlayin\n4. Tanimadiginiz cihazlardan cixish edin' },
    { id: 3, title: 'Ilk gunlerde edilmemeli olanlar', content: '* Eyni anda coxlu qrupa qosulmaq\n* Tanimadiginiz sexslere ardicil mesaj yazmaq\n* Kutlevi reklam gondermek\n* Subheli botlardan istifade etmek\n* Hesabi tez-tez ferqli cihazlarda acmaq' }
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

    getSettings() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.settings) || '{}'); }
    updateSettings(data) { const s = this.getSettings(); Object.assign(s, data); localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(s)); }

    getPlatforms() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.platforms) || '[]').filter(p => p.active).sort((a,b) => a.order - b.order); }
    getAllPlatforms() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.platforms) || '[]'); }
    addPlatform(p) { const all = this.getAllPlatforms(); p.id = Date.now(); p.active = true; p.order = all.length + 1; all.push(p); localStorage.setItem(STORAGE_KEYS.platforms, JSON.stringify(all)); return p; }
    updatePlatform(id, data) { const all = this.getAllPlatforms(); const i = all.findIndex(p => p.id === id); if (i !== -1) { all[i] = {...all[i], ...data}; localStorage.setItem(STORAGE_KEYS.platforms, JSON.stringify(all)); } }
    deletePlatform(id) { this.updatePlatform(id, { active: false }); }

    getCountries(platformId = null) { let c = JSON.parse(localStorage.getItem(STORAGE_KEYS.countries) || '[]').filter(x => x.active); if (platformId) c = c.filter(x => x.platformId === platformId); return c; }
    getAllCountries() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.countries) || '[]'); }
    addCountry(c) { const all = this.getAllCountries(); c.id = Date.now(); c.active = true; all.push(c); localStorage.setItem(STORAGE_KEYS.countries, JSON.stringify(all)); return c; }
    updateCountry(id, data) { const all = this.getAllCountries(); const i = all.findIndex(c => c.id === id); if (i !== -1) { all[i] = {...all[i], ...data}; localStorage.setItem(STORAGE_KEYS.countries, JSON.stringify(all)); } }
    deleteCountry(id) { this.updateCountry(id, { active: false }); }


    getApprovedReviews() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.reviews) || '[]').filter(r => r.active && r.status === 'approved'); }
    getFeaturedReviews() { return this.getApprovedReviews().filter(r => r.featured); }
    getAllReviews() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.reviews) || '[]').filter(r => r.active); }
    addReview(r) { const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.reviews) || '[]'); r.id = Date.now(); r.active = true; r.status = REVIEW_STATUS.PENDING; r.featured = false; r.date = new Date().toISOString().split('T')[0]; all.push(r); localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(all)); return r; }
    updateReview(id, data) { const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.reviews) || '[]'); const i = all.findIndex(r => r.id === id); if (i !== -1) { all[i] = {...all[i], ...data}; localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(all)); } }
    deleteReview(id) { this.updateReview(id, { active: false, status: REVIEW_STATUS.DELETED }); }

    getFaqs() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.faqs) || '[]').filter(f => f.active); }
    getAllFaqs() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.faqs) || '[]'); }
    addFaq(f) { const all = this.getAllFaqs(); f.id = Date.now(); f.active = true; all.push(f); localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(all)); return f; }
    updateFaq(id, data) { const all = this.getAllFaqs(); const i = all.findIndex(f => f.id === id); if (i !== -1) { all[i] = {...all[i], ...data}; localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(all)); } }
    deleteFaq(id) { this.updateFaq(id, { active: false }); }

    getAboutItems() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.aboutItems) || '[]').filter(a => a.active); }
    getProcessSteps() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.processSteps) || '[]'); }
    getSafetyRules() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.safetyRules) || '{}'); }
    getWhatsAppGuide() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.whatsappGuide) || '[]'); }
    getTelegramGuide() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.telegramGuide) || '[]'); }

    getWhatsAppUrl(message = null) {
        const settings = this.getSettings();
        const msg = message || settings.defaultMessage;
        return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    }

    getCountryWhatsAppUrl(platformName, countryName) {
        const msg = `Salam, ${platformName} ucun ${countryName} nomresi elde etmek isteyirem.`;
        return this.getWhatsAppUrl(msg);
    }

    getStockNotifyUrl(platformName, countryName) {
        const msg = `Salam, ${platformName} ${countryName} nomresi stoka geldikde melumat almaq isteyirem.`;
        return this.getWhatsAppUrl(msg);
    }

    resetData() {
        Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
        this.initializeData();
    }
}

const dataManager = new DataManager();
