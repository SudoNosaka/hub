// ============================================
// TOGGLE THÈME
// ============================================
const toggle = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
}

toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ============================================
// CARROUSEL
// ============================================
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const cards = document.querySelectorAll('.card');
const siteName = document.getElementById('site-name');

let currentIndex = 0;
const totalCards = cards.length;
const maxIndex = totalCards - 1;

function updateSiteName() {
    const newName = cards[currentIndex].getAttribute('data-name');
    siteName.textContent = newName;
}

function updateCarousel() {
    const card = cards[0];
    const gap = parseFloat(getComputedStyle(document.querySelector('.carousel-track')).gap) || 0;
    const cardWidth = card.offsetWidth + gap;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateSiteName();
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

window.addEventListener('resize', updateCarousel);

// Initialisation du nom au chargement
updateSiteName();