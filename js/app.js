// ===== App Controller =====

const WHATSAPP_NUMBER = '994402821222';
let currentPlatform = null;

// ===== Navigation =====
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.classList.add('page-enter');
        setTimeout(() => targetPage.classList.remove('page-enter'), 300);
    }

    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    const activeNav = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    // Load page data
    switch(page) {
        case 'home':
            loadHomeStats();
            break;
        case 'info':
            loadFAQs();
            break;
        case 'numbers':
            loadPlatforms();
            break;
        case 'reviews':
            loadReviews();
            break;
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Home Page =====
function loadHomeStats() {
    const platforms = dataManager.getPlatforms();
    const countries = dataManager.getCountries();
    
    animateNumber('stat-platforms', platforms.length);
    
    // Count unique countries
    const uniqueCountries = [...new Set(countries.map(c => c.name))];
    animateNumber('stat-countries', uniqueCountries.length);
}

function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element || element.textContent.includes('+')) return;
    
    let current = 0;
    const increment = Math.ceil(target / 20);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current;
    }, 50);
}

// ===== FAQ =====
function loadFAQs() {
    const faqs = dataManager.getFaqs();
    const container = document.getElementById('faq-list');
    
    if (faqs.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Hələ sual əlavə olunmayıb</p></div>';
        return;
    }

    container.innerHTML = faqs.map(faq => `
        <div class="faq-item" onclick="toggleFaq(this)">
            <div class="faq-question">
                <span>${faq.question}</span>
                <svg class="faq-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                </svg>
            </div>
            <div class="faq-answer">
                <p>${faq.answer}</p>
            </div>
        </div>
    `).join('');
}

function toggleFaq(element) {
    element.classList.toggle('active');
}

// ===== Numbers Page =====
function loadPlatforms() {
    const platforms = dataManager.getPlatforms();
    const tabsContainer = document.getElementById('platforms-tabs');

    if (platforms.length === 0) {
        tabsContainer.innerHTML = '';
        document.getElementById('countries-list').innerHTML = '<div class="empty-state"><p>Hələ platform əlavə olunmayıb</p></div>';
        return;
    }

    tabsContainer.innerHTML = platforms.map((platform, index) => `
        <button class="platform-tab ${index === 0 ? 'active' : ''}" 
                data-platform-id="${platform.id}"
                onclick="selectPlatform(${platform.id}, this)">
            ${platform.icon} ${platform.name}
        </button>
    `).join('');

    // Load first platform's countries
    if (!currentPlatform) {
        currentPlatform = platforms[0].id;
    }
    loadCountries(currentPlatform);
}

function selectPlatform(platformId, element) {
    currentPlatform = platformId;
    
    // Update active tab
    document.querySelectorAll('.platform-tab').forEach(tab => tab.classList.remove('active'));
    element.classList.add('active');
    
    // Load countries
    loadCountries(platformId);
    
    // Clear search
    document.getElementById('search-input').value = '';
}

function loadCountries(platformId) {
    const countries = dataManager.getCountries(platformId);
    const container = document.getElementById('countries-list');
    const platform = dataManager.getPlatforms().find(p => p.id === platformId);
    const platformName = platform ? platform.name : '';

    if (countries.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Bu platform üçün ölkə əlavə olunmayıb</p></div>';
        return;
    }

    container.innerHTML = countries.map(country => `
        <div class="country-card scale-in" data-country-name="${country.name.toLowerCase()}">
            <div class="country-info">
                <span class="country-flag">${country.flag}</span>
                <div class="country-details">
                    <h4>${country.name}</h4>
                    <span>${country.code}</span>
                </div>
            </div>
            <div class="country-action">
                <span class="country-price">${country.price} AZN</span>
                <button class="get-button ripple" onclick="getNumber('${platformName}', '${country.name}', '${country.code}')">
                    Əldə Et
                </button>
            </div>
        </div>
    `).join('');
}

function filterCountries() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.country-card');

    cards.forEach(card => {
        const name = card.getAttribute('data-country-name');
        if (name.includes(query)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== WhatsApp Integration =====
function getNumber(platform, country, code) {
    const message = encodeURIComponent(`Salam! ${platform} üçün ${country} (${code}) nömrəsi əldə etmək istəyirəm.`);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, '_blank');
}

// ===== Reviews =====
function loadReviews() {
    const reviews = dataManager.getReviews();
    const container = document.getElementById('reviews-list');

    if (reviews.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Hələ rəy əlavə olunmayıb</p></div>';
        return;
    }

    container.innerHTML = reviews.map(review => `
        <div class="review-card fade-in-up">
            <div class="review-header">
                <div class="review-avatar">${review.name.charAt(0)}</div>
                <div class="review-meta">
                    <h4>${review.name}</h4>
                    <span>${formatDate(review.date)}</span>
                </div>
                <div class="review-stars">${getStars(review.rating)}</div>
            </div>
            <p class="review-text">${review.text}</p>
        </div>
    `).join('');
}

function getStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn', 'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', () => {
    loadHomeStats();
    loadFAQs();
});
