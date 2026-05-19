// Navigation: scroll shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Hamburger
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

burger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
});

mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
    });
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// FAQ accordion
document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq__item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq__item.open').forEach(el => {
            const ans = el.querySelector('.faq__answer');
            ans.style.maxHeight = ans.scrollHeight + 'px';
            requestAnimationFrame(() => { ans.style.maxHeight = '0'; });
            el.classList.remove('open');
            el.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
            const ans = item.querySelector('.faq__answer');
            ans.style.maxHeight = ans.scrollHeight + 'px';
        }
    });
});

// Honeypot guard
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', e => {
        if (form.querySelector('[name="website"]').value) {
            e.preventDefault();
        }
    });
}

// Back to top
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Testimonials read-more
document.querySelectorAll('.testi-card__readmore').forEach(btn => {
    btn.addEventListener('click', function () {
        const p = document.getElementById(this.getAttribute('aria-controls'));
        const expanded = this.getAttribute('aria-expanded') === 'true';
        p.classList.toggle('testi-card__text--clamped', expanded);
        this.setAttribute('aria-expanded', !expanded);
        this.textContent = expanded ? 'Číst více' : 'Zobrazit méně';
    });
});
