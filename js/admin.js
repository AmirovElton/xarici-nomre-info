// ===== Admin Panel Controller =====
let currentModalType = null;
let editingId = null;
let currentReviewFilter = 'all';

// ===== TAB SWITCHING =====
function switchAdminTab(tab, el) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`admin-${tab}`).classList.add('active');
    if (el) el.classList.add('active');

    switch(tab) {
        case 'countries': loadCountryFilter(); loadAdminCountries(); break;
        case 'platforms': loadAdminPlatforms(); break;
        case 'reviews': loadAdminReviews(); break;
        case 'faqs': loadAdminFaqs(); break;
        case 'settings': loadSettings(); break;
    }
}

// ===== COUNTRIES =====
function loadCountryFilter() {
    const platforms = dataManager.getPlatforms();
    const select = document.getElementById('admin-country-filter');
    if (!select) return;
    select.innerHTML = '<option value="">Bütün platformalar</option>' +
        platforms.map(p => `<option value="${p.id}">${p.icon} ${p.name}</option>`).join('');
}

function loadAdminCountries() {
    const filterVal = document.getElementById('admin-country-filter')?.value;
    let countries = dataManager.getAllCountries().filter(c => c.active);
    if (filterVal) countries = countries.filter(c => c.platformId === parseInt(filterVal));
    const platforms = dataManager.getAllPlatforms();
    const container = document.getElementById('admin-countries-list');

    if (countries.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Ölkə yoxdur</p></div>';
        return;
    }

    container.innerHTML = countries.map(c => {
        const pl = platforms.find(p => p.id === c.platformId);
        const statusLabel = getStatusLabel(c.status);
        return `
        <div class="admin-item">
            <div class="admin-item-row">
                <div class="admin-item-info">
                    <span class="admin-item-icon">${c.flag}</span>
                    <div class="admin-item-details">
                        <h4>${c.name} (${c.code})</h4>
                        <span>${pl ? pl.name : '?'} • ${c.quality} • Stok: ${c.stock} • ${statusLabel} ${c.showPrice ? '• ' + c.price + ' AZN' : '• Qiymət gizli'}</span>
                    </div>
                </div>
                <div class="admin-item-actions">
                    <button class="action-btn btn-edit" onclick="editCountry(${c.id})">Redaktə</button>
                    <button class="action-btn btn-delete" onclick="deleteCountry(${c.id})">Sil</button>
                </div>
            </div>
        </div>`;
    }).join('');
}

function getStatusLabel(status) {
    const map = { available: 'Stokda', low: 'Az', soon: 'Tezliklə', unavailable: 'Yoxdur', stopped: 'Dayandırılıb' };
    return map[status] || status;
}


function showCountryModal(id = null) {
    currentModalType = 'country';
    editingId = id;
    const platforms = dataManager.getPlatforms();
    document.getElementById('modal-title').textContent = id ? 'Ölkəni redaktə et' : 'Ölkə əlavə et';
    document.getElementById('modal-body').innerHTML = `
        <div class="form-group"><label>Platform</label>
            <select id="f-country-platform">${platforms.map(p => `<option value="${p.id}">${p.icon} ${p.name}</option>`).join('')}</select>
        </div>
        <div class="form-group"><label>Ölkə adı</label><input type="text" id="f-country-name" placeholder="Türkiyə"></div>
        <div class="form-group"><label>Ölkə kodu</label><input type="text" id="f-country-code" placeholder="+90"></div>
        <div class="form-group"><label>Bayraq (emoji)</label><input type="text" id="f-country-flag" placeholder="🇹🇷"></div>
        <div class="form-group"><label>Stok sayı</label><input type="number" id="f-country-stock" min="0" placeholder="0"></div>
        <div class="form-group"><label>Status</label>
            <select id="f-country-status">
                <option value="available">Stokda var</option>
                <option value="low">Az qalıb</option>
                <option value="soon">Yaxın zamanda</option>
                <option value="unavailable">Müvəqqəti mövcud deyil</option>
                <option value="stopped">Satış dayandırılıb</option>
            </select>
        </div>
        <div class="form-group"><label>Keyfiyyət</label>
            <select id="f-country-quality">
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
            </select>
        </div>
        <div class="form-group"><label>Qiymət (AZN)</label><input type="number" id="f-country-price" min="0" placeholder="10"></div>
        <div class="form-group">
            <div class="checkbox-row"><input type="checkbox" id="f-country-showprice" checked><label for="f-country-showprice">Qiyməti göstər</label></div>
        </div>
        <div class="form-group"><label>Əlavə qeyd</label><input type="text" id="f-country-note" placeholder="İxtiyari"></div>
    `;

    if (id) {
        const c = dataManager.getAllCountries().find(x => x.id === id);
        if (c) {
            document.getElementById('f-country-platform').value = c.platformId;
            document.getElementById('f-country-name').value = c.name;
            document.getElementById('f-country-code').value = c.code;
            document.getElementById('f-country-flag').value = c.flag;
            document.getElementById('f-country-stock').value = c.stock;
            document.getElementById('f-country-status').value = c.status;
            document.getElementById('f-country-quality').value = c.quality;
            document.getElementById('f-country-price').value = c.price;
            document.getElementById('f-country-showprice').checked = c.showPrice;
            document.getElementById('f-country-note').value = c.note || '';
        }
    }
    showModal();
}

function editCountry(id) { showCountryModal(id); }
function deleteCountry(id) { if (confirm('Silmək istəyirsiniz?')) { dataManager.deleteCountry(id); loadAdminCountries(); } }

// ===== PLATFORMS =====
function loadAdminPlatforms() {
    const platforms = dataManager.getAllPlatforms().filter(p => p.active);
    const container = document.getElementById('admin-platforms-list');
    container.innerHTML = platforms.map(p => `
        <div class="admin-item">
            <div class="admin-item-row">
                <div class="admin-item-info">
                    <span class="admin-item-icon">${p.icon}</span>
                    <div class="admin-item-details"><h4>${p.name}</h4><span>Sıra: ${p.order}</span></div>
                </div>
                <div class="admin-item-actions">
                    <button class="action-btn btn-edit" onclick="editPlatform(${p.id})">Redaktə</button>
                    <button class="action-btn btn-delete" onclick="deletePlatform(${p.id})">Sil</button>
                </div>
            </div>
        </div>
    `).join('');
}

function showPlatformModal(id = null) {
    currentModalType = 'platform'; editingId = id;
    document.getElementById('modal-title').textContent = id ? 'Redaktə et' : 'Platform əlavə et';
    document.getElementById('modal-body').innerHTML = `
        <div class="form-group"><label>Platform adı</label><input type="text" id="f-platform-name" placeholder="WhatsApp"></div>
        <div class="form-group"><label>İkon (emoji)</label><input type="text" id="f-platform-icon" placeholder="💬"></div>
    `;
    if (id) {
        const p = dataManager.getAllPlatforms().find(x => x.id === id);
        if (p) { document.getElementById('f-platform-name').value = p.name; document.getElementById('f-platform-icon').value = p.icon; }
    }
    showModal();
}
function editPlatform(id) { showPlatformModal(id); }
function deletePlatform(id) { if (confirm('Silmək?')) { dataManager.deletePlatform(id); loadAdminPlatforms(); } }


// ===== REVIEWS =====
function loadAdminReviews() {
    let reviews = dataManager.getAllReviews();
    if (currentReviewFilter !== 'all') {
        reviews = reviews.filter(r => r.status === currentReviewFilter);
    }
    const container = document.getElementById('admin-reviews-list');

    if (reviews.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Rəy yoxdur</p></div>';
        return;
    }

    container.innerHTML = reviews.map(r => {
        const tagClass = `tag-${r.status}`;
        const statusLabel = { pending: 'Gözləyir', approved: 'Təsdiqlənib', rejected: 'Rədd', spam: 'Spam' }[r.status] || r.status;
        return `
        <div class="admin-item">
            <div class="admin-item-row">
                <div class="admin-item-info">
                    <div class="admin-item-details">
                        <h4>${r.name} ${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)} <span class="status-tag ${tagClass}">${statusLabel}</span>${r.featured ? ' ⭐' : ''}</h4>
                        <span>${r.platform}${r.country ? ' • ' + r.country : ''} • ${r.date}</span>
                    </div>
                </div>
                <div class="admin-item-actions">
                    ${r.status !== 'approved' ? `<button class="action-btn btn-approve" onclick="approveReview(${r.id})">✓</button>` : ''}
                    ${r.status !== 'rejected' ? `<button class="action-btn btn-reject" onclick="rejectReview(${r.id})">✕</button>` : ''}
                    <button class="action-btn btn-feature" onclick="toggleFeatured(${r.id})">${r.featured ? '☆' : '⭐'}</button>
                    <button class="action-btn btn-delete" onclick="deleteReview(${r.id})">🗑</button>
                </div>
            </div>
            <p style="font-size:0.75rem;color:var(--text-secondary);margin-top:6px;line-height:1.4;">${r.text}</p>
        </div>`;
    }).join('');
}

function filterReviews(status, el) {
    currentReviewFilter = status;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (el) el.classList.add('active');
    loadAdminReviews();
}

function approveReview(id) { dataManager.updateReview(id, { status: 'approved' }); loadAdminReviews(); }
function rejectReview(id) { dataManager.updateReview(id, { status: 'rejected' }); loadAdminReviews(); }
function toggleFeatured(id) {
    const reviews = dataManager.getAllReviews();
    const r = reviews.find(x => x.id === id);
    if (r) { dataManager.updateReview(id, { featured: !r.featured }); loadAdminReviews(); }
}
function deleteReview(id) { if (confirm('Silmək?')) { dataManager.deleteReview(id); loadAdminReviews(); } }

// ===== FAQS =====
function loadAdminFaqs() {
    const faqs = dataManager.getAllFaqs().filter(f => f.active);
    const container = document.getElementById('admin-faqs-list');
    if (faqs.length === 0) { container.innerHTML = '<div class="empty-state"><p>FAQ yoxdur</p></div>'; return; }

    container.innerHTML = faqs.map(f => `
        <div class="admin-item">
            <div class="admin-item-row">
                <div class="admin-item-info">
                    <div class="admin-item-details">
                        <h4>${f.question}</h4>
                        <span>${f.answer.substring(0, 60)}...</span>
                    </div>
                </div>
                <div class="admin-item-actions">
                    <button class="action-btn btn-edit" onclick="editFaq(${f.id})">Redaktə</button>
                    <button class="action-btn btn-delete" onclick="deleteFaq(${f.id})">Sil</button>
                </div>
            </div>
        </div>
    `).join('');
}

function showFaqModal(id = null) {
    currentModalType = 'faq'; editingId = id;
    document.getElementById('modal-title').textContent = id ? 'Redaktə et' : 'Sual əlavə et';
    document.getElementById('modal-body').innerHTML = `
        <div class="form-group"><label>Sual</label><input type="text" id="f-faq-question" placeholder="Sual..."></div>
        <div class="form-group"><label>Cavab</label><textarea id="f-faq-answer" rows="4" placeholder="Cavab..."></textarea></div>
    `;
    if (id) {
        const f = dataManager.getAllFaqs().find(x => x.id === id);
        if (f) { document.getElementById('f-faq-question').value = f.question; document.getElementById('f-faq-answer').value = f.answer; }
    }
    showModal();
}
function editFaq(id) { showFaqModal(id); }
function deleteFaq(id) { if (confirm('Silmək?')) { dataManager.deleteFaq(id); loadAdminFaqs(); } }


// ===== SETTINGS =====
function loadSettings() {
    const s = dataManager.getSettings();
    document.getElementById('set-whatsapp').value = s.whatsappNumber || '';
    document.getElementById('set-instagram').value = s.instagram || '';
    document.getElementById('set-telegram').value = s.telegram || '';
    document.getElementById('set-email').value = s.email || '';
    document.getElementById('set-hours').value = s.workingHours || '';
    document.getElementById('set-message').value = s.defaultMessage || '';
}

function saveSettings(event) {
    event.preventDefault();
    dataManager.updateSettings({
        whatsappNumber: document.getElementById('set-whatsapp').value.trim(),
        instagram: document.getElementById('set-instagram').value.trim(),
        telegram: document.getElementById('set-telegram').value.trim(),
        email: document.getElementById('set-email').value.trim(),
        workingHours: document.getElementById('set-hours').value.trim(),
        defaultMessage: document.getElementById('set-message').value.trim()
    });
    alert('Ayarlar yadda saxlanıldı!');
}

function confirmReset() {
    if (confirm('DİQQƏT! Bütün məlumatlar silinəcək. Davam?')) {
        dataManager.resetData();
        loadAdminCountries(); loadCountryFilter();
        alert('Sıfırlandı!');
    }
}

// ===== MODAL =====
function showModal() { document.getElementById('modal-overlay').classList.add('active'); }
function hideModal() { document.getElementById('modal-overlay').classList.remove('active'); currentModalType = null; editingId = null; }
function closeModal(e) { if (e.target === e.currentTarget) hideModal(); }

function saveModal() {
    switch(currentModalType) {
        case 'country': saveCountry(); break;
        case 'platform': savePlatform(); break;
        case 'faq': saveFaq(); break;
    }
}

function saveCountry() {
    const data = {
        platformId: parseInt(document.getElementById('f-country-platform').value),
        name: document.getElementById('f-country-name').value.trim(),
        code: document.getElementById('f-country-code').value.trim(),
        flag: document.getElementById('f-country-flag').value.trim(),
        stock: parseInt(document.getElementById('f-country-stock').value) || 0,
        status: document.getElementById('f-country-status').value,
        quality: document.getElementById('f-country-quality').value,
        price: parseInt(document.getElementById('f-country-price').value) || 0,
        showPrice: document.getElementById('f-country-showprice').checked,
        note: document.getElementById('f-country-note').value.trim()
    };
    if (!data.name || !data.code || !data.flag) { alert('Məcburi sahələri doldurun!'); return; }
    if (editingId) dataManager.updateCountry(editingId, data);
    else dataManager.addCountry(data);
    hideModal(); loadAdminCountries();
}

function savePlatform() {
    const data = {
        name: document.getElementById('f-platform-name').value.trim(),
        icon: document.getElementById('f-platform-icon').value.trim()
    };
    if (!data.name || !data.icon) { alert('Doldurun!'); return; }
    if (editingId) dataManager.updatePlatform(editingId, data);
    else dataManager.addPlatform(data);
    hideModal(); loadAdminPlatforms();
}

function saveFaq() {
    const data = {
        question: document.getElementById('f-faq-question').value.trim(),
        answer: document.getElementById('f-faq-answer').value.trim()
    };
    if (!data.question || !data.answer) { alert('Doldurun!'); return; }
    if (editingId) dataManager.updateFaq(editingId, data);
    else dataManager.addFaq(data);
    hideModal(); loadAdminFaqs();
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    loadCountryFilter();
    loadAdminCountries();
});
