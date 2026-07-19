// ===== Admin Panel Controller =====

let currentModalType = null;
let editingItemId = null;

// ===== Tab Switching =====
function switchAdminTab(tab) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    
    document.getElementById(`admin-${tab}`).classList.add('active');
    event.target.classList.add('active');

    // Load data
    switch(tab) {
        case 'platforms':
            loadAdminPlatforms();
            break;
        case 'countries':
            loadAdminCountries();
            loadCountryFilter();
            break;
        case 'reviews':
            loadAdminReviews();
            break;
        case 'faqs':
            loadAdminFaqs();
            break;
    }
}

// ===== Load Admin Data =====
function loadAdminPlatforms() {
    const platforms = dataManager.getAllPlatforms().filter(p => p.active);
    const container = document.getElementById('admin-platforms-list');

    if (platforms.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Heç bir platform yoxdur</p></div>';
        return;
    }

    container.innerHTML = platforms.map(platform => `
        <div class="admin-item">
            <div class="admin-item-info">
                <span class="admin-item-icon">${platform.icon}</span>
                <div class="admin-item-details">
                    <h4>${platform.name}</h4>
                    <span>ID: ${platform.id}</span>
                </div>
            </div>
            <div class="admin-item-actions">
                <button class="edit-btn" onclick="editItem('platform', ${platform.id})">Redaktə</button>
                <button class="delete-btn" onclick="deleteItem('platform', ${platform.id})">Sil</button>
            </div>
        </div>
    `).join('');
}

function loadAdminCountries() {
    const filterValue = document.getElementById('admin-country-filter')?.value;
    let countries = dataManager.getAllCountries().filter(c => c.active);
    
    if (filterValue) {
        countries = countries.filter(c => c.platformId === parseInt(filterValue));
    }

    const container = document.getElementById('admin-countries-list');
    const platforms = dataManager.getAllPlatforms();

    if (countries.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Heç bir ölkə yoxdur</p></div>';
        return;
    }

    container.innerHTML = countries.map(country => {
        const platform = platforms.find(p => p.id === country.platformId);
        return `
            <div class="admin-item">
                <div class="admin-item-info">
                    <span class="admin-item-icon">${country.flag}</span>
                    <div class="admin-item-details">
                        <h4>${country.name} (${country.code})</h4>
                        <span>${platform ? platform.name : 'N/A'} • ${country.price} AZN</span>
                    </div>
                </div>
                <div class="admin-item-actions">
                    <button class="edit-btn" onclick="editItem('country', ${country.id})">Redaktə</button>
                    <button class="delete-btn" onclick="deleteItem('country', ${country.id})">Sil</button>
                </div>
            </div>
        `;
    }).join('');
}

function loadCountryFilter() {
    const platforms = dataManager.getPlatforms();
    const select = document.getElementById('admin-country-filter');
    
    select.innerHTML = '<option value="">Bütün platformalar</option>' + 
        platforms.map(p => `<option value="${p.id}">${p.icon} ${p.name}</option>`).join('');
}

function loadAdminReviews() {
    const reviews = dataManager.getAllReviews().filter(r => r.active);
    const container = document.getElementById('admin-reviews-list');

    if (reviews.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Heç bir rəy yoxdur</p></div>';
        return;
    }

    container.innerHTML = reviews.map(review => `
        <div class="admin-item">
            <div class="admin-item-info">
                <span class="admin-item-icon">⭐</span>
                <div class="admin-item-details">
                    <h4>${review.name}</h4>
                    <span>${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)} • ${review.date}</span>
                </div>
            </div>
            <div class="admin-item-actions">
                <button class="edit-btn" onclick="editItem('review', ${review.id})">Redaktə</button>
                <button class="delete-btn" onclick="deleteItem('review', ${review.id})">Sil</button>
            </div>
        </div>
    `).join('');
}

function loadAdminFaqs() {
    const faqs = dataManager.getAllFaqs().filter(f => f.active);
    const container = document.getElementById('admin-faqs-list');

    if (faqs.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Heç bir sual yoxdur</p></div>';
        return;
    }

    container.innerHTML = faqs.map(faq => `
        <div class="admin-item">
            <div class="admin-item-info">
                <span class="admin-item-icon">❓</span>
                <div class="admin-item-details">
                    <h4>${faq.question}</h4>
                    <span>${faq.answer.substring(0, 50)}...</span>
                </div>
            </div>
            <div class="admin-item-actions">
                <button class="edit-btn" onclick="editItem('faq', ${faq.id})">Redaktə</button>
                <button class="delete-btn" onclick="deleteItem('faq', ${faq.id})">Sil</button>
            </div>
        </div>
    `).join('');
}

// ===== Modal Functions =====
function showModal(type) {
    currentModalType = type;
    editingItemId = null;
    
    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    switch(type) {
        case 'platform':
            title.textContent = 'Platform Əlavə Et';
            body.innerHTML = `
                <div class="form-group">
                    <label>Platform adı</label>
                    <input type="text" id="form-platform-name" placeholder="Məs: WhatsApp">
                </div>
                <div class="form-group">
                    <label>İkon (emoji)</label>
                    <input type="text" id="form-platform-icon" placeholder="Məs: 💬">
                </div>
            `;
            break;

        case 'country':
            const platforms = dataManager.getPlatforms();
            title.textContent = 'Ölkə Əlavə Et';
            body.innerHTML = `
                <div class="form-group">
                    <label>Platform</label>
                    <select id="form-country-platform">
                        ${platforms.map(p => `<option value="${p.id}">${p.icon} ${p.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Ölkə adı</label>
                    <input type="text" id="form-country-name" placeholder="Məs: Türkiyə">
                </div>
                <div class="form-group">
                    <label>Ölkə kodu</label>
                    <input type="text" id="form-country-code" placeholder="Məs: +90">
                </div>
                <div class="form-group">
                    <label>Bayraq (emoji)</label>
                    <input type="text" id="form-country-flag" placeholder="Məs: 🇹🇷">
                </div>
                <div class="form-group">
                    <label>Qiymət (AZN)</label>
                    <input type="number" id="form-country-price" placeholder="Məs: 5" min="1">
                </div>
            `;
            break;

        case 'review':
            title.textContent = 'Rəy Əlavə Et';
            body.innerHTML = `
                <div class="form-group">
                    <label>Müştəri adı</label>
                    <input type="text" id="form-review-name" placeholder="Məs: Əli M.">
                </div>
                <div class="form-group">
                    <label>Rəy mətni</label>
                    <textarea id="form-review-text" placeholder="Müştəri rəyi..."></textarea>
                </div>
                <div class="form-group">
                    <label>Reytinq (1-5)</label>
                    <select id="form-review-rating">
                        <option value="5">★★★★★ (5)</option>
                        <option value="4">★★★★☆ (4)</option>
                        <option value="3">★★★☆☆ (3)</option>
                        <option value="2">★★☆☆☆ (2)</option>
                        <option value="1">★☆☆☆☆ (1)</option>
                    </select>
                </div>
            `;
            break;

        case 'faq':
            title.textContent = 'Sual Əlavə Et';
            body.innerHTML = `
                <div class="form-group">
                    <label>Sual</label>
                    <input type="text" id="form-faq-question" placeholder="Sualı yazın...">
                </div>
                <div class="form-group">
                    <label>Cavab</label>
                    <textarea id="form-faq-answer" placeholder="Cavabı yazın..."></textarea>
                </div>
            `;
            break;
    }

    overlay.classList.add('active');
}

function editItem(type, id) {
    currentModalType = type;
    editingItemId = id;
    
    showModal(type);
    document.getElementById('modal-title').textContent = 'Redaktə Et';

    // Fill form with existing data
    switch(type) {
        case 'platform':
            const platform = dataManager.getAllPlatforms().find(p => p.id === id);
            if (platform) {
                document.getElementById('form-platform-name').value = platform.name;
                document.getElementById('form-platform-icon').value = platform.icon;
            }
            break;

        case 'country':
            const country = dataManager.getAllCountries().find(c => c.id === id);
            if (country) {
                document.getElementById('form-country-platform').value = country.platformId;
                document.getElementById('form-country-name').value = country.name;
                document.getElementById('form-country-code').value = country.code;
                document.getElementById('form-country-flag').value = country.flag;
                document.getElementById('form-country-price').value = country.price;
            }
            break;

        case 'review':
            const review = dataManager.getAllReviews().find(r => r.id === id);
            if (review) {
                document.getElementById('form-review-name').value = review.name;
                document.getElementById('form-review-text').value = review.text;
                document.getElementById('form-review-rating').value = review.rating;
            }
            break;

        case 'faq':
            const faq = dataManager.getAllFaqs().find(f => f.id === id);
            if (faq) {
                document.getElementById('form-faq-question').value = faq.question;
                document.getElementById('form-faq-answer').value = faq.answer;
            }
            break;
    }
}

function saveModal() {
    switch(currentModalType) {
        case 'platform':
            const platformData = {
                name: document.getElementById('form-platform-name').value.trim(),
                icon: document.getElementById('form-platform-icon').value.trim()
            };
            if (!platformData.name || !platformData.icon) {
                alert('Bütün sahələri doldurun!');
                return;
            }
            if (editingItemId) {
                dataManager.updatePlatform(editingItemId, platformData);
            } else {
                dataManager.addPlatform(platformData);
            }
            loadAdminPlatforms();
            break;

        case 'country':
            const countryData = {
                platformId: parseInt(document.getElementById('form-country-platform').value),
                name: document.getElementById('form-country-name').value.trim(),
                code: document.getElementById('form-country-code').value.trim(),
                flag: document.getElementById('form-country-flag').value.trim(),
                price: parseInt(document.getElementById('form-country-price').value)
            };
            if (!countryData.name || !countryData.code || !countryData.flag || !countryData.price) {
                alert('Bütün sahələri doldurun!');
                return;
            }
            if (editingItemId) {
                dataManager.updateCountry(editingItemId, countryData);
            } else {
                dataManager.addCountry(countryData);
            }
            loadAdminCountries();
            break;

        case 'review':
            const reviewData = {
                name: document.getElementById('form-review-name').value.trim(),
                text: document.getElementById('form-review-text').value.trim(),
                rating: parseInt(document.getElementById('form-review-rating').value)
            };
            if (!reviewData.name || !reviewData.text) {
                alert('Bütün sahələri doldurun!');
                return;
            }
            if (editingItemId) {
                dataManager.updateReview(editingItemId, reviewData);
            } else {
                dataManager.addReview(reviewData);
            }
            loadAdminReviews();
            break;

        case 'faq':
            const faqData = {
                question: document.getElementById('form-faq-question').value.trim(),
                answer: document.getElementById('form-faq-answer').value.trim()
            };
            if (!faqData.question || !faqData.answer) {
                alert('Bütün sahələri doldurun!');
                return;
            }
            if (editingItemId) {
                dataManager.updateFaq(editingItemId, faqData);
            } else {
                dataManager.addFaq(faqData);
            }
            loadAdminFaqs();
            break;
    }

    hideModal();
}

function deleteItem(type, id) {
    if (!confirm('Silmək istədiyinizə əminsiniz?')) return;

    switch(type) {
        case 'platform':
            dataManager.deletePlatform(id);
            loadAdminPlatforms();
            break;
        case 'country':
            dataManager.deleteCountry(id);
            loadAdminCountries();
            break;
        case 'review':
            dataManager.deleteReview(id);
            loadAdminReviews();
            break;
        case 'faq':
            dataManager.deleteFaq(id);
            loadAdminFaqs();
            break;
    }
}

function hideModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    currentModalType = null;
    editingItemId = null;
}

function closeModal(event) {
    if (event.target === event.currentTarget) {
        hideModal();
    }
}

function confirmReset() {
    if (confirm('DİQQƏT! Bütün məlumatlar silinəcək və varsayılan məlumatlara sıfırlanacaq. Davam etmək istəyirsiniz?')) {
        dataManager.resetData();
        loadAdminPlatforms();
        alert('Məlumatlar sıfırlandı!');
    }
}

// ===== Initialize Admin =====
document.addEventListener('DOMContentLoaded', () => {
    loadAdminPlatforms();
});
