// ── THEME ────────────────────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initTheme = savedTheme || (prefersDark ? 'dark' : 'light');

html.setAttribute('data-theme', initTheme);
themeToggle.checked = initTheme === 'dark';

themeToggle.addEventListener('change', () => {
    const theme = themeToggle.checked ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// ── LANGUAGE ────────────────────────────────────────────────────
const langToggle = document.getElementById('language-toggle');
const langText = document.getElementById('lang-text');
let currentLang = localStorage.getItem('lang') || 'pt';

applyLang(currentLang);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    localStorage.setItem('lang', currentLang);
    applyLang(currentLang);
});

function applyLang(lang) {
    langText.textContent = lang === 'pt' ? 'EN' : 'PT';

    document.querySelectorAll('[data-pt]').forEach(el => {
        el.textContent = el.getAttribute(lang === 'pt' ? 'data-pt' : 'data-en');
    });
}

// ── MENU MOBILE ───────────────────────────────────────────────
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
});

// ── SKILL BARS (IntersectionObserver) ───────────────────
const fills = document.querySelectorAll('.skill-fill');
const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.width + '%';
            skillObs.unobserve(e.target);
        }
    });
}, { threshold: 0.2 });

fills.forEach(f => skillObs.observe(f));