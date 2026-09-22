document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  const coarsePointer = window.matchMedia('(pointer: coarse), (hover: none)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('is-open');
    mobileMenu.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('is-open');
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  if (!hasGsap) {
    document.querySelectorAll('.reveal-up, .reveal-image, .line-inner').forEach((element) => {
      element.style.opacity = '1';
      element.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Lenis smooth scroll, synced with GSAP's ticker ---------- */
  let lenis;
  if (!reducedMotion && window.Lenis) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Custom cursor ---------- */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  if (cursorDot && cursorRing && !coarsePointer && !reducedMotion) {
    document.body.classList.add('has-custom-cursor');
    const moveDot = gsap.quickTo(cursorDot, 'x', { duration: .12, ease: 'power3' });
    const moveDotY = gsap.quickTo(cursorDot, 'y', { duration: .12, ease: 'power3' });
    const moveRing = gsap.quickTo(cursorRing, 'x', { duration: .35, ease: 'power3' });
    const moveRingY = gsap.quickTo(cursorRing, 'y', { duration: .35, ease: 'power3' });
    window.addEventListener('mousemove', (e) => {
      moveDot(e.clientX); moveDotY(e.clientY);
      moveRing(e.clientX); moveRingY(e.clientY);
    });
    document.querySelectorAll('a, button, .service-row').forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('is-active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-active'));
    });
    document.addEventListener('mouseleave', () => { cursorDot.classList.add('is-hidden'); cursorRing.classList.add('is-hidden'); });
    document.addEventListener('mouseenter', () => { cursorDot.classList.remove('is-hidden'); cursorRing.classList.remove('is-hidden'); });
  }

  /* ---------- Magnetic buttons ---------- */
  if (!coarsePointer && !reducedMotion) {
    document.querySelectorAll('.button, .header-cta').forEach((el) => {
      const moveX = gsap.quickTo(el, 'x', { duration: .5, ease: 'power3' });
      const moveY = gsap.quickTo(el, 'y', { duration: .5, ease: 'power3' });
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        moveX((e.clientX - rect.left - rect.width / 2) * .35);
        moveY((e.clientY - rect.top - rect.height / 2) * .35);
      });
      el.addEventListener('mouseleave', () => { moveX(0); moveY(0); });
    });
  }

  /* ---------- Service-row floating image preview ---------- */
  const preview = document.querySelector('.service-preview');
  if (preview && !coarsePointer) {
    const previewImg = preview.querySelector('img');
    const movePX = gsap.quickTo(preview, 'x', { duration: .35, ease: 'power3' });
    const movePY = gsap.quickTo(preview, 'y', { duration: .35, ease: 'power3' });
    document.querySelectorAll('.service-row[data-preview-image]').forEach((row) => {
      row.addEventListener('mouseenter', () => {
        previewImg.src = row.getAttribute('data-preview-image');
        gsap.to(preview, { opacity: 1, scale: 1, duration: .4, ease: 'power3.out' });
      });
      row.addEventListener('mousemove', (e) => { movePX(e.clientX); movePY(e.clientY); });
      row.addEventListener('mouseleave', () => {
        gsap.to(preview, { opacity: 0, scale: .85, duration: .3, ease: 'power3.in' });
      });
    });
  }

  /* ---------- Hero intro timeline (line-reveal headline) ---------- */
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-copy .eyebrow', { y: 18, opacity: 0, duration: .65 })
    .from('.hero-copy h1 .line-inner', { yPercent: 115, duration: 1, stagger: .13, ease: 'power4.out' }, '-=.3')
    .from('.hero-copy .hero-intro, .hero-copy .hero-actions', { y: 20, opacity: 0, duration: .6, stagger: .08 }, '-=.55')
    .from('.hero-footnote', { opacity: 0, duration: .5 }, '-=.2')
    .to('.hero-visual', { x: 0, opacity: 1, duration: 1.1 }, '-=.9');

  gsap.utils.toArray('.reveal-up').forEach((element) => {
    gsap.to(element, {
      scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      y: 0, opacity: 1, duration: .75, ease: 'power3.out'
    });
  });

  gsap.utils.toArray('.reveal-image').forEach((element) => {
    if (element.classList.contains('hero-visual')) return;
    gsap.to(element, {
      scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      x: 0, opacity: 1, duration: 1, ease: 'power3.out'
    });
  });

  gsap.from('.process-line', {
    scrollTrigger: { trigger: '.process-track', start: 'top 78%', once: true },
    scaleX: 0, duration: 1.5, ease: 'power2.inOut'
  });

  /* ---------- Testimonial: quote mark + person pop in ---------- */
  if (document.querySelector('.testimonial-section')) {
    gsap.from('.testimonial-mark', {
      scrollTrigger: { trigger: '.testimonial-section', start: 'top 80%', once: true },
      scale: .6, opacity: 0, duration: .8, ease: 'back.out(1.7)'
    });
    gsap.from('.testimonial-person', {
      scrollTrigger: { trigger: '.testimonial-section', start: 'top 70%', once: true },
      y: 16, opacity: 0, duration: .7, delay: .15
    });
  }

  /* ---------- Parallax on flagged images ---------- */
  if (!reducedMotion) {
    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      gsap.fromTo(el, { yPercent: -6 }, {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }

  /* ---------- Count-up stats ---------- */
  gsap.utils.toArray('.stat-number').forEach((el) => {
    const target = parseFloat(el.getAttribute('data-count-to'));
    const suffix = el.getAttribute('data-suffix') || '';
    const counter = { value: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => gsap.to(counter, {
        value: target, duration: 1.8, ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.round(counter.value) + suffix; }
      })
    });
  });
});
