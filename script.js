// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form — POST (application/x-www-form-urlencoded) to /api/contact; nginx proxies to Python on loopback.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const statusEl = document.getElementById('contactFormStatus');
    const submitBtn = document.getElementById('contactFormSubmit');
    const contactApiPath = contactForm.getAttribute('data-contact-api') || '/api/contact';

    function setStatus(msg, kind) {
        if (!statusEl) return;
        statusEl.hidden = !msg;
        statusEl.textContent = msg || '';
        statusEl.classList.remove('form-status--ok', 'form-status--err');
        if (kind) statusEl.classList.add(kind === 'ok' ? 'form-status--ok' : 'form-status--err');
    }

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const params = new URLSearchParams(new FormData(contactForm));

        if (submitBtn) submitBtn.disabled = true;
        setStatus('Sending…', '');

        try {
            const res = await fetch(contactApiPath, {
                method: 'POST',
                body: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/json'
                },
                credentials: 'same-origin'
            });
            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                data = {};
            }

            if (res.ok && data.ok) {
                setStatus(data.message || 'Thank you — we received your message.', 'ok');
                contactForm.reset();
            } else if (res.status === 404) {
                setStatus('Contact form is not configured on this server yet.', 'err');
            } else {
                setStatus(data.error || `Could not send (${res.status}).`, 'err');
            }
        } catch {
            setStatus('Could not send. Check your connection and try again.', 'err');
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.problem-card, .platform-card, .solutions-card, .blog-post, .insight-item, .principle-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active state to nav links on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('is-open');
        navToggle.classList.toggle('is-open');
    });

    // Close menu when a nav link is clicked (useful on mobile)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('is-open');
            navToggle.classList.remove('is-open');
        });
    });
}

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color);
        font-weight: 600;
    }
`;
document.head.appendChild(style);
