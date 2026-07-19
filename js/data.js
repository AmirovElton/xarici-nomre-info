// ===== Data Layer =====
// Bu fayl localStorage ilə işləyir. Sonradan Supabase-ə keçiriləcək.

const STORAGE_KEYS = {
    platforms: 'xn_platforms',
    countries: 'xn_countries',
    reviews: 'xn_reviews',
    faqs: 'xn_faqs',
    settings: 'xn_settings'
};

// Default data (ilk dəfə açılanda yüklənəcək)
const DEFAULT_PLATFORMS = [
    { id: 1, name: 'WhatsApp', icon: '💬', active: true },
    { id: 2, name: 'Telegram', icon: '✈️', active: true },
    { id: 3, name: 'Instagram', icon: '📷', active: true },
    { id: 4, name: 'TikTok', icon: '🎵', active: true },
    { id: 5, name: 'Signal', icon: '🔒', active: true }
];

const DEFAULT_COUNTRIES = [
    { id: 1, name: 'Türkiyə', code: '+90', flag: '🇹🇷', price: 5, platformId: 1, active: true },
    { id: 2, name: 'ABŞ', code: '+1', flag: '🇺🇸', price: 8, platformId: 1, active: true },
    { id: 3, name: 'Böyük Britaniya', code: '+44', flag: '🇬🇧', price: 7, platformId: 1, active: true },
    { id: 4, name: 'Rusiya', code: '+7', flag: '🇷🇺', price: 4, platformId: 1, active: true },
    { id: 5, name: 'Almaniya', code: '+49', flag: '🇩🇪', price: 7, platformId: 1, active: true },
    { id: 6, name: 'Türkiyə', code: '+90', flag: '🇹🇷', price: 4, platformId: 2, active: true },
    { id: 7, name: 'ABŞ', code: '+1', flag: '🇺🇸', price: 6, platformId: 2, active: true },
    { id: 8, name: 'Böyük Britaniya', code: '+44', flag: '🇬🇧', price: 6, platformId: 2, active: true },
    { id: 9, name: 'Türkiyə', code: '+90', flag: '🇹🇷', price: 5, platformId: 3, active: true },
    { id: 10, name: 'ABŞ', code: '+1', flag: '🇺🇸', price: 9, platformId: 3, active: true },
    { id: 11, name: 'Türkiyə', code: '+90', flag: '🇹🇷', price: 4, platformId: 4, active: true },
    { id: 12, name: 'ABŞ', code: '+1', flag: '🇺🇸', price: 7, platformId: 4, active: true },
    { id: 13, name: 'Türkiyə', code: '+90', flag: '🇹🇷', price: 6, platformId: 5, active: true },
    { id: 14, name: 'Almaniya', code: '+49', flag: '🇩🇪', price: 8, platformId: 5, active: true }
];

const DEFAULT_REVIEWS = [
    { id: 1, name: 'Əli M.', text: 'Çox sürətli xidmət! 5 dəqiqə içində nömrəni aldım. Təşəkkürlər!', rating: 5, date: '2024-12-15', active: true },
    { id: 2, name: 'Aysel K.', text: 'WhatsApp üçün Türkiyə nömrəsi aldım. Problemsiz işləyir, tövsiyə edirəm.', rating: 5, date: '2024-12-10', active: true },
    { id: 3, name: 'Murad H.', text: 'Qiymətlər münasibdir və dəstək çox yaxşıdır. Hər sualıma cavab verdilər.', rating: 4, date: '2024-12-08', active: true },
    { id: 4, name: 'Ləman R.', text: 'Telegram üçün ABŞ nömrəsi aldım. Heç bir problem olmadı. Minnətdaram!', rating: 5, date: '2024-11-28', active: true }
];

const DEFAULT_FAQS = [
    { id: 1, question: 'Nömrələr nə qədər müddətə aktivdir?', answer: 'Nömrələr aktivləşdirildikdən sonra uzunmüddətli istifadə üçün nəzərdə tutulub. Dəqiq müddət nömrə növünə görə dəyişir.', active: true },
    { id: 2, question: 'Ödəniş necə həyata keçirilir?', answer: 'Ödəniş bank kartı, balans köçürməsi və ya digər üsullarla mümkündür. WhatsApp vasitəsilə bizimlə əlaqə saxlayın.', active: true },
    { id: 3, question: 'Nömrə işləməsə nə edim?', answer: 'Əgər nömrə ilə bağlı problem yaşasanız, dərhal bizimlə əlaqə saxlayın. Biz problemi həll edəcəyik və ya yeni nömrə təqdim edəcəyik.', active: true },
    { id: 4, question: 'Bir neçə nömrə ala bilərəm?', answer: 'Bəli, istədiyiniz qədər nömrə ala bilərsiniz. Hər platform və ölkə üçün ayrı-ayrı nömrələr mövcuddur.', active: true },
    { id: 5, question: 'Məlumatlarım təhlükəsizdirmi?', answer: 'Bəli, biz müştərilərimizin məxfiliyinə hörmətlə yanaşırıq. Heç bir şəxsi məlumat üçüncü tərəflərlə paylaşılmır.', active: true }
];

// ===== Data Manager =====
class DataManager {
    constructor() {
        this.initializeData();
    }

    initializeData() {
        if (!localStorage.getItem(STORAGE_KEYS.platforms)) {
            localStorage.setItem(STORAGE_KEYS.platforms, JSON.stringify(DEFAULT_PLATFORMS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.countries)) {
            localStorage.setItem(STORAGE_KEYS.countries, JSON.stringify(DEFAULT_COUNTRIES));
        }
        if (!localStorage.getItem(STORAGE_KEYS.reviews)) {
            localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(DEFAULT_REVIEWS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.faqs)) {
            localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(DEFAULT_FAQS));
        }
    }

    // Platforms
    getPlatforms() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.platforms) || '[]').filter(p => p.active);
    }

    getAllPlatforms() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.platforms) || '[]');
    }

    addPlatform(platform) {
        const platforms = this.getAllPlatforms();
        platform.id = Date.now();
        platform.active = true;
        platforms.push(platform);
        localStorage.setItem(STORAGE_KEYS.platforms, JSON.stringify(platforms));
        return platform;
    }

    updatePlatform(id, data) {
        const platforms = this.getAllPlatforms();
        const index = platforms.findIndex(p => p.id === id);
        if (index !== -1) {
            platforms[index] = { ...platforms[index], ...data };
            localStorage.setItem(STORAGE_KEYS.platforms, JSON.stringify(platforms));
        }
    }

    deletePlatform(id) {
        const platforms = this.getAllPlatforms();
        const index = platforms.findIndex(p => p.id === id);
        if (index !== -1) {
            platforms[index].active = false;
            localStorage.setItem(STORAGE_KEYS.platforms, JSON.stringify(platforms));
        }
    }

    // Countries
    getCountries(platformId = null) {
        let countries = JSON.parse(localStorage.getItem(STORAGE_KEYS.countries) || '[]').filter(c => c.active);
        if (platformId) {
            countries = countries.filter(c => c.platformId === platformId);
        }
        return countries;
    }

    getAllCountries() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.countries) || '[]');
    }

    addCountry(country) {
        const countries = this.getAllCountries();
        country.id = Date.now();
        country.active = true;
        countries.push(country);
        localStorage.setItem(STORAGE_KEYS.countries, JSON.stringify(countries));
        return country;
    }

    updateCountry(id, data) {
        const countries = this.getAllCountries();
        const index = countries.findIndex(c => c.id === id);
        if (index !== -1) {
            countries[index] = { ...countries[index], ...data };
            localStorage.setItem(STORAGE_KEYS.countries, JSON.stringify(countries));
        }
    }

    deleteCountry(id) {
        const countries = this.getAllCountries();
        const index = countries.findIndex(c => c.id === id);
        if (index !== -1) {
            countries[index].active = false;
            localStorage.setItem(STORAGE_KEYS.countries, JSON.stringify(countries));
        }
    }

    // Reviews
    getReviews() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.reviews) || '[]').filter(r => r.active);
    }

    getAllReviews() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.reviews) || '[]');
    }

    addReview(review) {
        const reviews = this.getAllReviews();
        review.id = Date.now();
        review.active = true;
        review.date = new Date().toISOString().split('T')[0];
        reviews.push(review);
        localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(reviews));
        return review;
    }

    updateReview(id, data) {
        const reviews = this.getAllReviews();
        const index = reviews.findIndex(r => r.id === id);
        if (index !== -1) {
            reviews[index] = { ...reviews[index], ...data };
            localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(reviews));
        }
    }

    deleteReview(id) {
        const reviews = this.getAllReviews();
        const index = reviews.findIndex(r => r.id === id);
        if (index !== -1) {
            reviews[index].active = false;
            localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(reviews));
        }
    }

    // FAQs
    getFaqs() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.faqs) || '[]').filter(f => f.active);
    }

    getAllFaqs() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.faqs) || '[]');
    }

    addFaq(faq) {
        const faqs = this.getAllFaqs();
        faq.id = Date.now();
        faq.active = true;
        faqs.push(faq);
        localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(faqs));
        return faq;
    }

    updateFaq(id, data) {
        const faqs = this.getAllFaqs();
        const index = faqs.findIndex(f => f.id === id);
        if (index !== -1) {
            faqs[index] = { ...faqs[index], ...data };
            localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(faqs));
        }
    }

    deleteFaq(id) {
        const faqs = this.getAllFaqs();
        const index = faqs.findIndex(f => f.id === id);
        if (index !== -1) {
            faqs[index].active = false;
            localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(faqs));
        }
    }

    // Reset all data
    resetData() {
        localStorage.setItem(STORAGE_KEYS.platforms, JSON.stringify(DEFAULT_PLATFORMS));
        localStorage.setItem(STORAGE_KEYS.countries, JSON.stringify(DEFAULT_COUNTRIES));
        localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(DEFAULT_REVIEWS));
        localStorage.setItem(STORAGE_KEYS.faqs, JSON.stringify(DEFAULT_FAQS));
    }
}

// Global instance
const dataManager = new DataManager();
