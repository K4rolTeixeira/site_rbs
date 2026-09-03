// header state on scroll + progress ring
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progress.style.width = pct + '%';
  });

  // mobile menu toggle
  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  function closeMenu() {
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  if (burger) {
    burger.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  }

  // hero mask reveal on load
  window.addEventListener('load', () => {
    document.getElementById('hero').classList.add('loaded');
  });

  // scroll reveal for sections
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.16 });
  revealEls.forEach(el => io.observe(el));

  // count-up stats
  const stats = document.querySelectorAll('.stat .num');
  let counted = false;
  const statIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !counted) {
        counted = true;
        stats.forEach(el => {
          const target = parseInt(el.textContent);
          const suffix = el.textContent.replace(/[0-9]/g, '');
          let cur = 0;
          const step = Math.max(1, Math.round(target / 40));
          const tick = () => {
            cur += step;
            if (cur >= target) { el.textContent = target + suffix; return; }
            el.textContent = cur + suffix;
            requestAnimationFrame(tick);
          };
          tick();
        });
      }
    });
  }, { threshold: 0.4 });
  if (document.querySelector('.stat-grid')) statIO.observe(document.querySelector('.stat-grid'));

  // hero background image is static (multi-layer gradient overlay keeps it legible)

  // respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    document.getElementById('hero').classList.add('loaded');
  }
