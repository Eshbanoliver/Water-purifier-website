/* ========================================
   AQUATO - SHARED JAVASCRIPT (ALL PAGES)
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scrollTop');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    // === Header Scroll ===
    function handleScroll() {
        if (window.scrollY > 100) { header && header.classList.add('scrolled'); }
        else { header && header.classList.remove('scrolled'); }
        if (scrollTopBtn) {
            if (window.scrollY > 400) scrollTopBtn.classList.add('visible');
            else scrollTopBtn.classList.remove('visible');
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Scroll to top
    if (scrollTopBtn) scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // === Mobile Menu ===
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => { nav.classList.remove('open'); menuToggle.classList.remove('active'); });
        });
    }

    // === Counter Animation ===
    let countersAnimated = false;
    function animateCounters() {
        if (countersAnimated) return;
        const counters = document.querySelectorAll('[data-target]');
        if (!counters.length) return;
        const first = counters[0];
        const rect = first.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            countersAnimated = true;
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const start = performance.now();
                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    counter.textContent = Math.floor(eased * target);
                    if (progress < 1) requestAnimationFrame(update);
                    else counter.textContent = target;
                }
                requestAnimationFrame(update);
            });
        }
    }
    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // === Scroll Animations ===
    const animEls = document.querySelectorAll('.animate-on-scroll');
    function checkAnims() {
        animEls.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.85) el.classList.add('animated');
        });
    }
    window.addEventListener('scroll', checkAnims);
    checkAnims();

    // Add animate class to common elements
    document.querySelectorAll('.service-card, .about-stat-item, .team-card, .testimonial-card, .faq-item, .pricing-card, .expert-card, .blog-card').forEach((el, i) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${i * 0.05}s`;
    });
    setTimeout(checkAnims, 100);

    // === FAQ Accordion ===
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const answer = item.querySelector('.faq-answer');
            const inner = answer.querySelector('.faq-answer-inner');
            const isActive = item.classList.contains('active');
            // Close all
            document.querySelectorAll('.faq-item').forEach(fi => {
                fi.classList.remove('active');
                fi.querySelector('.faq-answer').style.maxHeight = '0';
            });
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = inner.scrollHeight + 'px';
            }
        });
    });

    // === Testimonial Dots ===
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', () => {
            document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });

    // === Form Submission ===
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                const origText = btn.textContent;
                btn.textContent = 'Sent Successfully!';
                btn.style.background = '#10b981';
                setTimeout(() => { btn.textContent = origText; btn.style.background = ''; form.reset(); }, 3000);
            }
        });
    });

    // === Parallax on Hero ===
    const heroBottle = document.querySelector('.hero-bottle');
    if (heroBottle) {
        window.addEventListener('scroll', () => {
            if (window.scrollY < window.innerHeight) {
                heroBottle.style.transform = `translateY(${window.scrollY * 0.15}px)`;
            }
        });
    }

    // === Typewriter on Hero ===
    const heroSub = document.querySelector('.hero-subtitle');
    if (heroSub) {
        const text = heroSub.textContent;
        heroSub.textContent = '';
        heroSub.style.borderRight = '2px solid var(--primary-light)';
        let i = 0;
        function typeWriter() {
            if (i < text.length) { heroSub.textContent += text.charAt(i); i++; setTimeout(typeWriter, 60); }
            else { heroSub.style.borderRight = 'none'; }
        }
        setTimeout(typeWriter, 500);
    }
});
