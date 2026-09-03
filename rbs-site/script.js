// header state on scroll + progress ring
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progress.style.width = pct + '%';
  });

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

  // subtle tilt on emblem following pointer
  const emblem = document.getElementById('emblem');
  const heroSection = document.getElementById('hero');
  heroSection.addEventListener('mousemove', (e) => {
    const r = heroSection.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    emblem.style.transform = `rotateY(${px * 14}deg) rotateX(${-py * 14}deg)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    emblem.style.transform = 'rotateY(0) rotateX(0)';
  });

  // parallax on emblem wrap with scroll
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      document.querySelector('.emblem-wrap').style.transform = `translateY(${y * 0.12}px)`;
    }
  });

  // respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    document.getElementById('hero').classList.add('loaded');
  }
