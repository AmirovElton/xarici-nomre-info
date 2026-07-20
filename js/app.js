// ===== XariciNomreAz App Controller =====

let currentPlatform = null;

// ===== SVG ICONS =====
const PLATFORM_ICONS = {
    whatsapp: '<svg width="28" height="28" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>',
    telegram: '<svg width="28" height="28" viewBox="0 0 24 24" fill="#2AABEE"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>',
    other: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>'
};

// ===== NAVIGATION =====
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`page-${page}`);
    if (target) {
        target.classList.add('active');
        target.classList.add('page-enter');
        setTimeout(() => target.classList.remove('page-enter'), 250);
    }
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (activeNav) activeNav.classList.add('active');

    switch(page) {
        case 'home': loadHome(); break;
        case 'numbers': loadNumbers(); break;
        case 'info': loadInfo(); break;
        case 'reviews': loadReviewsPage(); break;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ===== HOME PAGE =====
function loadHome() {
    updateWhatsAppLinks();
}

// ===== NUMBERS PAGE =====
function loadNumbers() {
    loadPlatformCards();
}

function loadPlatformCards() {
    const platforms = dataManager.getPlatforms();
    const container = document.getElementById('platform-cards');
    if (!container) return;

    const descriptions = {
        1: 'WhatsApp ucun xarici nomreler',
        2: 'Telegram ucun xarici nomreler',
        3: 'Instagram, TikTok ve s.'
    };

    container.innerHTML = platforms.map(p => {
        const iconClass = p.id === 1 ? 'whatsapp' : p.id === 2 ? 'telegram' : 'other';
        const iconKey = p.id === 1 ? 'whatsapp' : p.id === 2 ? 'telegram' : 'other';
        const isActive = currentPlatform === p.id ? 'active' : '';
        return `
        <div class="platform-card ${isActive}" onclick="selectPlatform(${p.id})">
            <div class="platform-card-icon ${iconClass}">
                ${PLATFORM_ICONS[iconKey]}
            </div>
            <div class="platform-card-info">
                <h3>${p.name}</h3>
                <p>${descriptions[p.id] || ''}</p>
            </div>
        </div>`;
    }).join('');
}

function selectPlatform(platformId) {
    currentPlatform = platformId;
    // Update active state
    document.querySelectorAll('.platform-card').forEach(c => c.classList.remove('active'));
    event.currentTarget.classList.add('active');
    // Show search
    const searchContainer = document.getElementById('search-container');
    if (searchContainer) searchContainer.classList.remove('hidden');
    // Load countries
    loadCountries(platformId);
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
}


function loadCountries(platformId) {
    const countries = dataManager.getCountries(platformId);
    const container = document.getElementById('countries-list');
    const platform = dataManager.getPlatforms().find(p => p.id === platformId);
    const platformName = platform ? platform.name : '';

    if (countries.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Bu platform ucun olke elave olunmayib</p></div>';
        return;
    }

    container.innerHTML = countries.map(country => {
        const statusInfo = getStatusInfo(country.status);
        const priceText = country.showPrice ? `${country.price} AZN` : '---';
        const orderUrl = dataManager.getCountryWhatsAppUrl(platformName, country.name);

        return `
        <div class="country-card scale-in" data-country-name="${country.name.toLowerCase()}" onclick="toggleCountryDetails(this)">
            <div class="country-card-header">
                <div class="country-card-left">
                    <span class="country-flag">${country.flag}</span>
                    <div class="country-name-code">
                        <h4>${country.name}</h4>
                        <span>${country.code}</span>
                    </div>
                </div>
                <div class="country-card-right">
                    <span class="country-price">${priceText}</span>
                    <div class="country-info-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                </div>
            </div>
            <div class="country-details-panel">
                <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span class="status-badge status-${statusInfo.color}"><span class="dot dot-pulse"></span>${statusInfo.label}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Keyfiyyet</span>
                    <span class="detail-value">${country.quality}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Stok</span>
                    <span class="detail-value">${country.stock > 0 ? country.stock + ' eded' : 'Yoxdur'}</span>
                </div>
                ${country.note ? `<div class="detail-row"><span class="detail-label">Qeyd</span><span class="detail-value">${country.note}</span></div>` : ''}
                ${(country.status === 'available' || country.status === 'low') ? `<a href="${orderUrl}" target="_blank" class="country-order-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>WhatsApp ile sifarish et</a>` : ''}
            </div>
        </div>`;
    }).join('');
}

function toggleCountryDetails(card) {
    card.classList.toggle('expanded');
}

function getStatusInfo(status) {
    switch(status) {
        case 'available': return { label: 'Stokda var', color: 'green' };
        case 'low': return { label: 'Az qalib', color: 'orange' };
        case 'soon': return { label: 'Yaxin zamanda', color: 'blue' };
        case 'unavailable': return { label: 'Muveqqeti yoxdur', color: 'gray' };
        case 'stopped': return { label: 'Dayandirilb', color: 'red' };
        default: return { label: 'Namelum', color: 'gray' };
    }
}

function filterCountries() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    document.querySelectorAll('.country-card').forEach(card => {
        const name = card.getAttribute('data-country-name');
        card.style.display = name.includes(query) ? '' : 'none';
    });
}


// ===== INFO PAGE =====
function loadInfo() {
    loadAboutSection();
    loadProcessSteps();
    loadSafetyRules();
    loadWhatsAppGuide();
    loadTelegramGuide();
    loadFaqSection();
}

function openInfoSection(sectionId) {
    // Hide grid, show content
    const grid = document.getElementById('info-grid');
    const content = document.getElementById('info-section-content');
    if (grid) grid.classList.add('hidden');
    if (content) content.classList.remove('hidden');

    // Hide all sections, show selected
    document.querySelectorAll('#info-section-content .info-section').forEach(s => s.classList.add('hidden'));
    const section = document.getElementById(`info-${sectionId}`);
    if (section) section.classList.remove('hidden');
}

function backToInfoGrid() {
    const grid = document.getElementById('info-grid');
    const content = document.getElementById('info-section-content');
    if (grid) grid.classList.remove('hidden');
    if (content) content.classList.add('hidden');
}

function loadAboutSection() {
    const items = dataManager.getAboutItems();
    const container = document.getElementById('about-accordion');
    if (!container) return;
    container.innerHTML = items.map(item => createAccordionItem(item.title, item.content)).join('');
}

function loadProcessSteps() {
    const steps = dataManager.getProcessSteps();
    const container = document.getElementById('process-steps');
    if (!container) return;
    container.innerHTML = steps.map(step => `
        <div class="step-card">
            <div class="step-number">${step.id}</div>
            <div class="step-content">
                <h3>${step.title}</h3>
                <p>${step.description}</p>
            </div>
        </div>
    `).join('');
}

function loadSafetyRules() {
    const rules = dataManager.getSafetyRules();
    const dontsContainer = document.getElementById('safety-donts');
    const dosContainer = document.getElementById('safety-dos');
    if (!dontsContainer || !dosContainer) return;

    dontsContainer.innerHTML = `
        <h4>Ilk 24 saat EDILMEMELI olanlar:</h4>
        <ul>${(rules.donts || []).map(d => `<li>${d}</li>`).join('')}</ul>
    `;
    dosContainer.innerHTML = `
        <h4>Ilk 24 saat TOVSIYE olunanlar:</h4>
        <ul>${(rules.dos || []).map(d => `<li>${d}</li>`).join('')}</ul>
    `;
}

function loadWhatsAppGuide() {
    const guide = dataManager.getWhatsAppGuide();
    const container = document.getElementById('wa-guide-accordion');
    if (!container) return;
    container.innerHTML = guide.map(item => createAccordionItem(item.title, item.content)).join('');
}

function loadTelegramGuide() {
    const guide = dataManager.getTelegramGuide();
    const container = document.getElementById('tg-guide-accordion');
    if (!container) return;
    container.innerHTML = guide.map(item => createAccordionItem(item.title, item.content)).join('');
}

function loadFaqSection() {
    const faqs = dataManager.getFaqs();
    const container = document.getElementById('faq-list');
    if (!container) return;
    if (faqs.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Hele sual elave olunmayib</p></div>';
        return;
    }
    container.innerHTML = faqs.map(faq => createAccordionItem(faq.question, faq.answer)).join('');
}


// ===== ACCORDION HELPER =====
function createAccordionItem(title, content) {
    const htmlContent = formatContent(content);
    return `
        <div class="accordion-item">
            <div class="accordion-header" onclick="toggleAccordion(this)">
                <span>${title}</span>
                <svg class="accordion-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div class="accordion-body">
                ${htmlContent}
            </div>
        </div>
    `;
}

function formatContent(text) {
    if (!text) return '';
    const lines = text.split('\n').filter(l => l.trim());
    let html = '';
    let inList = false;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('*') && !trimmed.startsWith('**')) {
            if (!inList) { html += '<ul>'; inList = true; }
            html += `<li>${trimmed.substring(1).trim()}</li>`;
        } else if (/^\d+\./.test(trimmed)) {
            if (!inList) { html += '<ul>'; inList = true; }
            html += `<li>${trimmed.replace(/^\d+\.\s*/, '')}</li>`;
        } else {
            if (inList) { html += '</ul>'; inList = false; }
            html += `<p>${trimmed}</p>`;
        }
    });
    if (inList) html += '</ul>';
    return html;
}

function toggleAccordion(header) {
    const item = header.parentElement;
    item.classList.toggle('active');
}

// ===== REVIEW FORM TOGGLE =====
function toggleReviewForm() {
    const toggle = document.getElementById('add-review-toggle');
    const wrapper = document.getElementById('review-form-wrapper');
    if (toggle && wrapper) {
        toggle.classList.toggle('open');
        wrapper.classList.toggle('open');
    }
}

// ===== WHATSAPP LINKS =====
function updateWhatsAppLinks() {
    const defaultUrl = dataManager.getWhatsAppUrl();
    const heroBtn = document.getElementById('hero-whatsapp-btn');
    if (heroBtn) heroBtn.href = defaultUrl;
    const navBtn = document.getElementById('nav-whatsapp-btn');
    if (navBtn) navBtn.href = defaultUrl;
    const floatBtn = document.getElementById('whatsapp-float');
    if (floatBtn) floatBtn.href = defaultUrl;
}

// ===== FOOTER =====
function loadFooter() {
    const settings = dataManager.getSettings();
    const container = document.getElementById('footer-contacts');
    if (!container) return;
    let html = '';
    if (settings.whatsappNumber) {
        html += `<a href="https://wa.me/${settings.whatsappNumber}" target="_blank" class="footer-contact-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> WhatsApp</a>`;
    }
    if (settings.instagram) {
        html += `<a href="https://instagram.com/${settings.instagram}" target="_blank" class="footer-contact-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/></svg> @${settings.instagram}</a>`;
    }
    if (settings.workingHours) {
        html += `<span class="footer-contact-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${settings.workingHours}</span>`;
    }
    container.innerHTML = html;
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadHome();
    loadInfo();
    loadFooter();
    updateWhatsAppLinks();
});
