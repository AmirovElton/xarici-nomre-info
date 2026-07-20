// ===== Reviews Controller =====

let selectedRating = 0;
let reviewCooldown = false;

function loadReviewsPage() {
    loadReviewForm();
    loadApprovedReviews();
}

function loadReviewForm() {
    const platformSelect = document.getElementById('review-platform');
    if (platformSelect) {
        const platforms = dataManager.getPlatforms();
        platformSelect.innerHTML = '<option value="">Secin...</option>' +
            platforms.map(p => `<option value="${p.name}">${p.name}</option>`).join('');
    }
    setupStarRating();
    const lastReview = localStorage.getItem('xn_last_review_time');
    if (lastReview) {
        const elapsed = Date.now() - parseInt(lastReview);
        if (elapsed < 300000) { reviewCooldown = true; }
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
        container.addEventListener('mouseleave', () => { updateStarDisplay(); });
    }
}

function highlightStars(count) {
    const stars = document.querySelectorAll('#star-rating .star');
    stars.forEach((star, i) => {
        if (i < count) {
            star.classList.add('active');
            star.querySelector('svg').style.fill = '#fbbf24';
            star.querySelector('svg').style.stroke = '#fbbf24';
        } else {
            star.classList.remove('active');
            star.querySelector('svg').style.fill = 'none';
            star.querySelector('svg').style.stroke = '';
        }
    });
}

function updateStarDisplay() { highlightStars(selectedRating); }


function submitReview(event) {
    event.preventDefault();
    if (reviewCooldown) {
        alert('Qisa muddatda cox sayda rey gondere bilmezsiniz. Bir az gozleyin.');
        return;
    }
    const name = document.getElementById('review-name').value.trim();
    const platform = document.getElementById('review-platform').value;
    const country = document.getElementById('review-country').value.trim();
    const text = document.getElementById('review-text').value.trim();
    const privacy = document.getElementById('review-privacy').checked;

    if (!name || !platform || !text || selectedRating === 0) {
        alert('Butun mecburi saheleri doldurun ve qiymetlendirme secin.');
        return;
    }
    if (!privacy) {
        alert('Mexfilik raziligin qebul etmelisiniz.');
        return;
    }
    if (containsProhibitedContent(text) || containsProhibitedContent(name)) {
        alert('Reyinizdde qadagan olunmush mezmun ashkarlandi.');
        return;
    }

    const review = {
        name: sanitizeText(name),
        platform: platform,
        country: sanitizeText(country),
        text: sanitizeText(text),
        rating: selectedRating
    };
    dataManager.addReview(review);
    localStorage.setItem('xn_last_review_time', Date.now().toString());
    reviewCooldown = true;

    document.getElementById('review-form').style.display = 'none';
    document.getElementById('review-success').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('review-form').reset();
        selectedRating = 0;
        updateStarDisplay();
    }, 500);
}

function containsProhibitedContent(text) {
    if (!text) return false;
    const lower = text.toLowerCase();
    if (/(\+?\d{10,}|\d{3}[-.\s]\d{3}[-.\s]\d{4})/.test(text)) return true;
    if (/(https?:\/\/|www\.|\.com|\.net|\.org|\.az)/i.test(text)) return true;
    const blocked = ['spam', 'hack', 'scam'];
    if (blocked.some(w => lower.includes(w))) return true;
    return false;
}

function sanitizeText(text) {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function loadApprovedReviews() {
    const reviews = dataManager.getApprovedReviews();
    const container = document.getElementById('reviews-list');
    if (!container) return;
    if (reviews.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Hele rey yayimlanmayib</p></div>';
        return;
    }
    container.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-card-header">
                <div class="review-avatar">${review.name.charAt(0).toUpperCase()}</div>
                <div class="review-meta">
                    <h4>${review.name}</h4>
                    <span>${review.platform}${review.country ? ' / ' + review.country : ''} / ${formatDate(review.date)}</span>
                </div>
                <div class="review-stars">${getStarsSvg(review.rating)}</div>
            </div>
            <p class="review-text">${review.text}</p>
            ${review.featured ? '<span class="review-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Secilmish rey</span>' : ''}
        </div>
    `).join('');
}

function getStarsSvg(rating) {
    let html = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
        } else {
            html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a6577" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
        }
    }
    return html;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = ['Yan','Fev','Mar','Apr','May','Iyn','Iyl','Avq','Sen','Okt','Noy','Dek'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
