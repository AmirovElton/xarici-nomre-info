// ===== XariciNomreAz App Controller =====

let currentPlatform = null;

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

    // Load page content
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
    loadPlatformTabs();
}

function loadPlatformTabs() {
    const platforms = dataManager.getPlatforms();
    const container = document.getElementById('platforms-tabs');
    if (!container) return;

    if (platforms.length === 0) {
        container.innerHTML = '';
        document.getElementById('countries-list').innerHTML = '<div class="empty-state"><p>Hələ platform əlavə olunmayıb</p></div>';
        return;
    }

    container.innerHTML = platforms.map((p, i) => `
        <button class="platform-tab ${i === 0 ? 'active' : ''}" 
                data-platform-id="${p.id}"
                onclick="selectPlatform(${p.id}, this)">
            ${p.icon} ${p.name}
        </button>
    `).join('');

    if (!currentPlatform) currentPlatform = platforms[0].id;
    loadCountries(currentPlatform);
}

function selectPlatform(platformId, el) {
    currentPlatform = platformId;
    document.querySelectorAll('.platform-tab').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
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
        container.innerHTML = '<div class="empty-state"><p>Bu platform üçün ölkə əlavə olunmayıb</p></div>';
        return;
    }

    container.innerHTML = countries.map(country => {
        const statusInfo = getStatusInfo(country.status);
        const priceHtml = country.showPrice 
            ? `<span class="country-price">${country.price} AZN</span>`
            : `<span class="country-price hidden-price">Qiymət və mövcudluq üçün WhatsApp-dan məlumat alın.</span>`;
        
        const actionBtn = getActionButton(country, platformName);
        
        return `
        <div class="country-card scale-in" data-country-name="${country.name.toLowerCase()}">
            <div class="country-card-header">
                <div class="country-info">
                    <span class="country-flag">${country.flag}</span>
                    <div class="country-details">
                        <h4>${country.name}</h4>
                        <span>${country.code} • ${platformName}</span>
                    </div>
                </div>
            </div>
            <div class="country-card-meta">
                <span class="status-badge status-${statusInfo.color}">
                    <span class="dot dot-pulse"></span>
                    ${statusInfo.label}
                </span>
                ${country.stock > 0 ? `<span class="status-badge status-green">Stok: ${country.stock}</span>` : ''}
                <span class="quality-badge">${country.quality}</span>
            </div>
            ${country.note ? `<p class="country-note">${country.note}</p>` : ''}
            <div class="country-card-footer">
                ${priceHtml}
                ${actionBtn}
            </div>
        </div>`;
    }).join('');
}

function getStatusInfo(status) {
    switch(status) {
        case 'available': return { label: 'Stokda var', color: 'green' };
        case 'low': return { label: 'Az qalıb', color: 'orange' };
        case 'soon': return { label: 'Yaxın zamanda', color: 'blue' };
        case 'unavailable': return { label: 'Müvəqqəti mövcud deyil', color: 'gray' };
        case 'stopped': return { label: 'Satış dayandırılıb', color: 'red' };
        default: return { label: 'Naməlum', color: 'gray' };
    }
}

function getActionButton(country, platformName) {
    if (country.status === 'available' || country.status === 'low') {
        const url = dataManager.getCountryWhatsAppUrl(platformName, country.name);
        return `<a href="${url}" target="_blank" class="get-info-btn">Məlumat al</a>`;
    } else if (country.status === 'soon' || country.status === 'unavailable') {
        const url = dataManager.getStockNotifyUrl(platformName, country.name);
        return `<a href="${url}" target="_blank" class="stock-notify-btn">Stoka gələndə xəbər al</a>`;
    }
    return '';
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

function switchInfoTab(tabId, el) {
    document.querySelectorAll('.info-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.info-tab').forEach(t => t.classList.remove('active'));
    const section = document.getElementById(`info-${tabId}`);
    if (section) section.classList.add('active');
    if (el) el.classList.add('active');
}

function switchGuideTab(tabId, el) {
    document.querySelectorAll('.guide-content').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.guide-tab').forEach(t => t.classList.remove('active'));
    const section = document.getElementById(tabId);
    if (section) section.classList.add('active');
    if (el) el.classList.add('active');
}

// About accordion
function loadAboutSection() {
    const items = dataManager.getAboutItems();
    const container = document.getElementById('about-accordion');
    if (!container) return;
    container.innerHTML = items.map(item => createAccordionItem(item.title, item.content)).join('');
}

// Process steps
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

// Safety rules
function loadSafetyRules() {
    const rules = dataManager.getSafetyRules();
    const dontsContainer = document.getElementById('safety-donts');
    const dosContainer = document.getElementById('safety-dos');
    if (!dontsContainer || !dosContainer) return;

    dontsContainer.innerHTML = `
        <h4>❌ İlk 24 saat EDİLMƏMƏLİ olanlar:</h4>
        <ul>${(rules.donts || []).map(d => `<li>${d}</li>`).join('')}</ul>
    `;
    dosContainer.innerHTML = `
        <h4>✅ İlk 24 saat TÖVSİYƏ olunanlar:</h4>
        <ul>${(rules.dos || []).map(d => `<li>${d}</li>`).join('')}</ul>
    `;
}

// WhatsApp guide
function loadWhatsAppGuide() {
    const guide = dataManager.getWhatsAppGuide();
    const container = document.getElementById('wa-guide-accordion');
    const containerAndroid = document.getElementById('wa-guide-android-accordion');
    if (!container) return;
    // Same content for both (can be differentiated later)
    const html = guide.map(item => createAccordionItem(item.title, item.content)).join('');
    container.innerHTML = html;
    if (containerAndroid) containerAndroid.innerHTML = html;
}

// Telegram guide
function loadTelegramGuide() {
    const guide = dataManager.getTelegramGuide();
    const container = document.getElementById('tg-guide-accordion');
    if (!container) return;
    container.innerHTML = guide.map(item => createAccordionItem(item.title, item.content)).join('');
}

// FAQ
function loadFaqSection() {
    const faqs = dataManager.getFaqs();
    const container = document.getElementById('faq-list');
    if (!container) return;
    if (faqs.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Hələ sual əlavə olunmayıb</p></div>';
        return;
    }
    container.innerHTML = faqs.map(faq => createAccordionItem(faq.question, faq.answer)).join('');
}


// ===== ACCORDION HELPER =====
function createAccordionItem(title, content) {
    // Convert newlines and bullet points to HTML
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
    // Split by newlines
    const lines = text.split('\n').filter(l => l.trim());
    let html = '';
    let inList = false;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('•') || trimmed.startsWith('*')) {
            if (!inList) { html += '<ul>'; inList = true; }
            html += `<li>${trimmed.substring(1).trim()}</li>`;
        } else if (/^\d+\./.test(trimmed)) {
            if (!inList) { html += '<ul>'; inList = true; }
            html += `<li>${trimmed.replace(/^\d+\.\s*/, '')}</li>`;
        } else {
            if (inList) { html += '</ul>'; inList = false; }
            if (trimmed.startsWith('⚠️')) {
                html += `<p style="color: var(--status-orange); font-weight: 500; margin-top: 8px;">${trimmed}</p>`;
            } else {
                html += `<p>${trimmed}</p>`;
            }
        }
    });
    if (inList) html += '</ul>';
    return html;
}

function toggleAccordion(header) {
    const item = header.parentElement;
    item.classList.toggle('active');
}

// ===== WHATSAPP LINKS =====
function updateWhatsAppLinks() {
    const settings = dataManager.getSettings();
    const defaultUrl = dataManager.getWhatsAppUrl();

    // Hero WhatsApp button
    const heroBtn = document.getElementById('hero-whatsapp-btn');
    if (heroBtn) heroBtn.href = defaultUrl;

    // Nav WhatsApp button
    const navBtn = document.getElementById('nav-whatsapp-btn');
    if (navBtn) navBtn.href = defaultUrl;

    // Floating WhatsApp
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
        html += `<a href="https://wa.me/${settings.whatsappNumber}" target="_blank" class="footer-contact-item">💬 WhatsApp</a>`;
    }
    if (settings.instagram) {
        html += `<a href="https://instagram.com/${settings.instagram}" target="_blank" class="footer-contact-item">📷 @${settings.instagram}</a>`;
    }
    if (settings.telegram) {
        html += `<a href="https://t.me/${settings.telegram}" target="_blank" class="footer-contact-item">✈️ Telegram</a>`;
    }
    if (settings.email) {
        html += `<a href="mailto:${settings.email}" class="footer-contact-item">📧 ${settings.email}</a>`;
    }
    if (settings.workingHours) {
        html += `<span class="footer-contact-item">🕐 ${settings.workingHours}</span>`;
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
