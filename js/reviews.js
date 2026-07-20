// ===== Reviews Controller =====

let selectedRating = 0;
let reviewCooldown = false;

// ===== LOAD REVIEWS PAGE =====
function loadReviewsPage() {
    loadReviewForm();
    loadApprovedReviews();
}

function loadReviewForm() {
    // Populate platform select
    const platformSelect = document.getElementById('review-platform');
    if (platformSelect) {
        const platforms = dataManager.getPlatforms();
        platformSelect.innerHTML = '<option value="">Seçin...</option>' +
            platforms.map(p => `<option value="${p.name}">${p.icon} ${p.name}</option>`).join('');
    }

    // Setup star rating
    setupStarRating();

    // Check cooldown
    const lastReview = localStorage.getItem('xn_last_review_time');
    if (lastReview) {
        const elapsed = Date.now() - parseInt(lastReview);
        if (elapsed < 300000) { // 5 min cooldown
            reviewCooldown = true;
        }
    }
}

function setupStarRating() {
    const stars = document.querySelectorAll('#star-rating .star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-value'));
            updateStarDisplay();
        });
        star.addEventListener('mouseenter', () => {
            const val = parseInt(star.getAttribute('data-value'));
            highlightStars(val);
        });
    });

    const container = document.getElementById('star-rating');
    if (container) {
        container.addEventListener('mouseleave', () => {
            updateStarDisplay();
        });
    }
}

function highlightStars(count) {
    const stars = document.querySelectorAll('#star-rating .star');
    stars.forEach((star, i) => {
        star.textContent = i < count ? '★' : '☆';
        star.classList.toggle('active', i < count);
    });
}

function updateStarDisplay() {
    highlightStars(selectedRating);
}


// ===== SUBMIT REVIEW =====
function submitReview(event) {
    event.preventDefault();

    // Cooldown check
    if (reviewCooldown) {
        alert('Qısa müddətdə çox sayda rəy göndərə bilməzsiniz. Zəhmət olmasa bir az gözləyin.');
        return;
    }

    const name = document.getElementById('review-name').value.trim();
    const platform = document.getElementById('review-platform').value;
    const country = document.getElementById('review-country').value.trim();
    const text = document.getElementById('review-text').value.trim();
    const privacy = document.getElementById('review-privacy').checked;

    // Validation
    if (!name || !platform || !text || selectedRating === 0) {
        alert('Zəhmət olmasa bütün məcburi sahələri doldurun və qiymətləndirmə seçin.');
        return;
    }
    if (!privacy) {
        alert('Məxfilik razılığını qəbul etməlisiniz.');
        return;
    }

    // Content filter
    if (containsProhibitedContent(text) || containsProhibitedContent(name)) {
        alert('Rəyinizdə qadağan olunmuş məzmun aşkarlandı. Zəhmət olmasa yenidən yazın.');
        return;
    }

    // Save review
    const review = {
        name: sanitizeText(name),
        platform: platform,
        country: sanitizeText(country),
        text: sanitizeText(text),
        rating: selectedRating
    };

    dataManager.addReview(review);

    // Set cooldown
    localStorage.setItem('xn_last_review_time', Date.now().toString());
    reviewCooldown = true;

    // Show success
    document.getElementById('review-form').style.display = 'none';
    document.getElementById('review-success').classList.remove('hidden');

    // Reset form
    setTimeout(() => {
        document.getElementById('review-form').reset();
        selectedRating = 0;
        updateStarDisplay();
    }, 500);
}

// ===== CONTENT FILTER =====
function containsProhibitedContent(text) {
    if (!text) return false;
    const lower = text.toLowerCase();

    // Phone number pattern
    if (/(\+?\d{10,}|\d{3}[-.\s]\d{3}[-.\s]\d{4})/.test(text)) return true;

    // URL pattern
    if (/(https?:\/\/|www\.|\.com|\.net|\.org|\.az)/i.test(text)) return true;

    // Common profanity (basic filter)
    const blocked = ['spam', 'hack', 'scam', 'fuck', 'shit'];
    if (blocked.some(w => lower.includes(w))) return true;

    return false;
}

function sanitizeText(text) {
    return text
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}


// ===== LOAD APPROVED REVIEWS =====
function loadApprovedReviews() {
    const reviews = dataManager.getApprovedReviews();
    const container = document.getElementById('reviews-list');
    if (!container) return;

    if (reviews.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Hələ rəy yayımlanmayıb</p></div>';
        return;
    }

    container.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-card-header">
                <div class="review-avatar">${review.name.charAt(0).toUpperCase()}</div>
                <div class="review-meta">
                    <h4>${review.name}</h4>
                    <span>${review.platform}${review.country ? ' • ' + review.country : ''} • ${formatDate(review.date)}</span>
                </div>
                <div class="review-stars">${getStars(review.rating)}</div>
            </div>
            <p class="review-text">${review.text}</p>
            ${review.featured ? '<span class="review-badge">⭐ Seçilmiş rəy</span>' : ''}
        </div>
    `).join('');
}

function getStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn', 'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
