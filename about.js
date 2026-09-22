document.addEventListener('DOMContentLoaded', () => {
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* script.js already handles header/menu/cursor/magnetic buttons, the hero
     line-reveal timeline, generic .reveal-up/.reveal-image scroll reveals and
     [data-parallax] drift — all reused as-is on this page. Everything below is
     specific to the About page's own sections and stays inert (CSS never hides
     these elements by default) if GSAP fails to load or motion is reduced. */
  if (!hasGsap || reducedMotion) return;

  /* ---------- Hero image clip-path reveal + eyebrow line draw ---------- */
  const heroImageWrap = document.querySelector('#about-hero .hero-image-wrap');
  if (heroImageWrap) {
    gsap.set(heroImageWrap, { clipPath: 'inset(0% 0% 100% 0%)' });
    gsap.to(heroImageWrap, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut', delay: .2 });
  }
  const eyebrowLine = document.querySelector('#about-hero .eyebrow-line');
  if (eyebrowLine) {
    gsap.set(eyebrowLine, { scaleX: 0, transformOrigin: 'left center' });
    gsap.to(eyebrowLine, { scaleX: 1, duration: .9, ease: 'power3.out', delay: .1 });
  }

  /* ---------- Photographic "settle-in": every revealed image eases down from a
     slight zoom as it enters, instead of just appearing — a quiet, editorial
     touch rather than the fade/slide alone. Hero is handled separately above. */
  gsap.utils.toArray('.reveal-image img').forEach((img) => {
    const container = img.closest('.reveal-image');
    if (!container || container.classList.contains('hero-visual')) return;
    gsap.fromTo(img, { scale: 1.08 }, {
      scale: 1, duration: 1.6, ease: 'power2.out',
      scrollTrigger: { trigger: container, start: 'top 88%', once: true }
    });
  });

  /* ---------- 03 The ABS difference — smooth accordion (progressive enhancement
     over the native <details> disclosure, which still works without JS/GSAP) ---------- */
  const diffList = document.querySelector('.diff-list');
  if (diffList) {
    diffList.closest('section').classList.add('js-enhanced-accordion');
    diffList.querySelectorAll('.diff-item').forEach((item) => {
      const summary = item.querySelector('summary');
      const body = item.querySelector('.diff-body');
      if (!summary || !body) return;
      summary.addEventListener('click', (e) => {
        e.preventDefault();
        if (item.hasAttribute('open')) {
          gsap.set(body, { height: body.scrollHeight });
          gsap.to(body, {
            height: 0, opacity: 0, duration: .4, ease: 'power2.inOut',
            onComplete: () => { item.removeAttribute('open'); gsap.set(body, { clearProps: 'height,opacity' }); }
          });
        } else {
          item.setAttribute('open', '');
          const targetHeight = body.scrollHeight;
          gsap.fromTo(body, { height: 0, opacity: 0 }, {
            height: targetHeight, opacity: 1, duration: .5, ease: 'power2.out',
            onComplete: () => gsap.set(body, { clearProps: 'height' })
          });
        }
      });
    });
  }

  /* ---------- 07 Values — gold accent line draws in as each row arrives ---------- */
  gsap.utils.toArray('.value-row').forEach((row) => {
    ScrollTrigger.create({
      trigger: row, start: 'top 85%', once: true,
      onEnter: () => row.classList.add('is-in')
    });
  });

  /* ---------- 04 Lifecycle — connecting line draws as the track scrolls into view ---------- */
  const lifecycleTrack = document.querySelector('.lifecycle-track');
  if (lifecycleTrack) {
    const line = lifecycleTrack.querySelector('.lifecycle-line');
    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
    gsap.to(line, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: lifecycleTrack, start: 'top 75%', end: 'bottom 68%', scrub: .6 }
    });
  }

  /* ---------- 08 The ABS standard — cinematic line-reveal headline + slow ambient drift ---------- */
  const standardSection = document.querySelector('.standard-section');
  if (standardSection) {
    const lines = standardSection.querySelectorAll('.line-inner');
    if (lines.length) {
      gsap.from(lines, {
        yPercent: 115, duration: 1.1, stagger: .12, ease: 'power4.out',
        scrollTrigger: { trigger: standardSection, start: 'top 68%', once: true }
      });
    }
    gsap.to('.standard-lines', { backgroundPositionX: '+=260px', duration: 42, ease: 'none', repeat: -1 });
  }

  /* ---------- 09 Long term — connecting line draws left to right ---------- */
  const longtermTrack = document.querySelector('.longterm-track');
  if (longtermTrack) {
    const line = longtermTrack.querySelector('.longterm-line');
    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
    gsap.to(line, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: longtermTrack, start: 'top 80%', end: 'bottom 62%', scrub: .6 }
    });
  }

  /* ---------- 02 Experience numbers — a touch of extra emphasis on reveal ---------- */
  gsap.utils.toArray('.exp-item').forEach((item) => {
    const num = item.querySelector('.exp-number');
    if (!num) return;
    gsap.from(num, {
      scrollTrigger: { trigger: item, start: 'top 88%', once: true },
      y: 22, opacity: 0, duration: .8, ease: 'power3.out'
    });
  });
});
