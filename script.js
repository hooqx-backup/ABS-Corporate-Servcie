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
    const previewSelector = '.service-row[data-preview-image], .audience-row[data-preview-image]';
    const movePX = gsap.quickTo(preview, 'x', { duration: .35, ease: 'power3' });
    const movePY = gsap.quickTo(preview, 'y', { duration: .35, ease: 'power3' });
    // overwrite: 'auto' (GSAP's default, stated explicitly here) guarantees
    // whichever opacity/scale call happens last wins outright — no race
    // between a fade-in and fade-out tween landing in an unexpected order
    // (which is what scroll-triggered hover recomputes can cause: several
    // enter/leave events firing in a burst as rows sweep past a stationary
    // cursor during a single scroll jump). It only kills tweens sharing the
    // SAME properties (opacity/scale) — unlike `overwrite: true`, which would
    // also kill the unrelated x/y position tweens driven by movePX/movePY
    // below, freezing the preview in place instead of following the cursor.
    const showPreview = (row) => {
      previewImg.src = row.getAttribute('data-preview-image');
      gsap.to(preview, { opacity: 1, scale: 1, duration: .4, ease: 'power3.out', overwrite: 'auto' });
    };
    const hidePreview = (fast) => {
      gsap.to(preview, { opacity: 0, scale: .85, duration: fast ? .15 : .3, ease: 'power3.in', overwrite: 'auto' });
    };
    document.querySelectorAll(previewSelector).forEach((row) => {
      row.addEventListener('mouseenter', () => showPreview(row));
      row.addEventListener('mousemove', (e) => { movePX(e.clientX); movePY(e.clientY + 40); });
      row.addEventListener('mouseleave', () => hidePreview(false));
    });
    // A row scrolling out from under a stationary cursor doesn't reliably fire
    // mouseleave (browsers only fire it on actual pointer movement, not on
    // content moving underneath a still cursor) — so on every scroll tick,
    // check what's really under the last known cursor position and force the
    // preview to match ground truth, rather than trusting accumulated enter/
    // leave events.
    let lastMouseX = -1;
    let lastMouseY = -1;
    window.addEventListener('mousemove', (e) => { lastMouseX = e.clientX; lastMouseY = e.clientY; }, { passive: true });
    const recheckOnScroll = () => {
      if (lastMouseX < 0) return;
      const el = document.elementFromPoint(lastMouseX, lastMouseY);
      const row = el && el.closest(previewSelector);
      if (row) showPreview(row); else hidePreview(true);
    };
    window.addEventListener('scroll', recheckOnScroll, { passive: true });
    if (lenis) lenis.on('scroll', recheckOnScroll);
  }

  /* ---------- Hero intro timeline (line-reveal headline) ---------- */
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-copy .eyebrow', { y: 18, opacity: 0, duration: .65 })
    .from('.hero-copy h1 .line-inner', { yPercent: 115, duration: 1, stagger: .13, ease: 'power4.out' }, '-=.3')
    .from('.hero-copy .hero-intro, .hero-copy .hero-actions', { y: 20, opacity: 0, duration: .6, stagger: .08 }, '-=.55')
    .from('.hero-footnote', { opacity: 0, duration: .5 }, '-=.2')
    .to('.hero-visual', { x: 0, opacity: 1, duration: 1.1 }, '-=.9');

  /* ---------- Per-section entrance animations ----------
     Every section gets its own distinct entrance treatment instead of one
     blanket fade-up, so scrolling through the page reads as a sequence of
     deliberate moments rather than the same effect repeating. Elements
     handled here are tracked in `handled` so the default fallback at the
     bottom only ever catches genuinely unstyled leftovers. */
  const handled = new Set();
  const markHandled = (list) => (Array.isArray(list) || list instanceof NodeList ? [...list] : [list]).forEach((el) => el && handled.add(el));

  // Batched grid entrance helper: unlike a single ScrollTrigger on the whole
  // container (which fires the entire stagger the moment the container's
  // top edge crosses the threshold — for a grid taller than one viewport,
  // that means rows near the bottom finish animating long before the user
  // actually scrolls down to see them, so they just look static/already-
  // there), ScrollTrigger.batch fires separately for each group of items as
  // THEY individually cross the threshold — so animation is visible no
  // matter how far down the grid the user has scrolled to.
  const batchReveal = (selector, fromVars, toVars, { start = 'top 88%', stagger = .12 } = {}) => {
    const items = gsap.utils.toArray(selector);
    if (!items.length) return items;
    ScrollTrigger.batch(selector, {
      start,
      once: true,
      onEnter: (batch) => gsap.fromTo(batch, fromVars, { ...toVars, stagger }),
    });
    return items;
  };

  // Section labels: a small shared slide-in-from-left tic — consistent across
  // sections on purpose, since it's a recurring UI element, not "the content".
  const labels = gsap.utils.toArray('.section-label');
  labels.forEach((el) => {
    gsap.fromTo(el, { x: -18 }, {
      x: 0, y: 0, opacity: 1, duration: .85, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true }
    });
  });
  markHandled(labels);

  // About: text stagger + image wipes open top-down.
  const introTextEls = gsap.utils.toArray('.intro-text .reveal-up');
  if (introTextEls.length) {
    gsap.to(introTextEls, {
      y: 0, opacity: 1, duration: 1, stagger: .16, ease: 'power3.out',
      scrollTrigger: { trigger: '.intro-text', start: 'top 85%', once: true }
    });
    markHandled(introTextEls);
  }
  const introMedia = document.querySelector('.intro-media');
  if (introMedia) {
    gsap.fromTo(introMedia, { clipPath: 'inset(0 0 100% 0)' }, {
      clipPath: 'inset(0 0 0% 0)', opacity: 1, x: 0, duration: 1.4, ease: 'power3.out',
      scrollTrigger: { trigger: introMedia, start: 'top 85%', once: true }
    });
    markHandled(introMedia);
  }

  // Journey: thumbnail pops in with a slight spin, steps rise in a cascade
  // (batched — the track is only 4 items across one row on desktop, but on
  // narrow/short viewports it can wrap to where the last row isn't visible
  // yet when the first row's trigger fires, so batching keeps it correct
  // everywhere rather than only on wide desktop viewports).
  const journeyThumb = document.querySelector('.journey-heading-media img');
  if (journeyThumb) {
    gsap.fromTo(journeyThumb, { scale: .7, rotate: -8, opacity: 0 }, {
      scale: 1, rotate: 0, opacity: 1, duration: 1, ease: 'back.out(1.6)',
      scrollTrigger: { trigger: journeyThumb, start: 'top 90%', once: true }
    });
  }
  markHandled(batchReveal('.journey-step',
    { y: 25, opacity: 0 },
    { y: 0, opacity: 1, duration: .9, ease: 'power3.out' },
    { start: 'top 88%', stagger: .15 }
  ));

  // Services: each row wipes open left-to-right, like a line being typed in.
  const serviceRows = gsap.utils.toArray('.service-row');
  serviceRows.forEach((row, i) => {
    gsap.fromTo(row, { clipPath: 'inset(0 100% 0 0)' }, {
      clipPath: 'inset(0 0% 0 0)', y: 0, opacity: 1, duration: 1, delay: i * .06, ease: 'power3.out',
      scrollTrigger: { trigger: row, start: 'top 92%', once: true }
    });
  });
  markHandled(serviceRows);

  // Why ABS: background settles from a deeper zoom, principle cards pop in
  // (batched, same reasoning as Journey above).
  // Animates the <img> itself (not the .why-bg wrapper, which is the
  // separate scroll-scrubbed parallax target) so this one-time settle and
  // the continuous parallax scrub don't compound into a double scale.
  const whyBgImg = document.querySelector('.why-bg img');
  if (whyBgImg) {
    gsap.fromTo(whyBgImg, { scale: 1.32 }, {
      scale: 1.15, duration: 1.9, ease: 'power2.out',
      scrollTrigger: { trigger: '.why-section', start: 'top 75%', once: true }
    });
  }
  const whyHeading = document.querySelector('.why-heading');
  if (whyHeading) {
    gsap.to(whyHeading, {
      y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: whyHeading, start: 'top 85%', once: true }
    });
    markHandled(whyHeading);
  }
  markHandled(batchReveal('.principle',
    { scale: .85, opacity: 0 },
    { scale: 1, y: 0, opacity: 1, duration: .9, ease: 'back.out(1.5)' },
    { start: 'top 85%', stagger: .14 }
  ));

  // Values band ("The ABS standard"): background settles from a zoom,
  // cards pop in with a bounce (batched).
  const statsBgImg = document.querySelector('.stats-bg img');
  if (statsBgImg) {
    gsap.fromTo(statsBgImg, { scale: 1.28 }, {
      scale: 1.15, duration: 1.9, ease: 'power2.out',
      scrollTrigger: { trigger: '.stats-section', start: 'top 80%', once: true }
    });
  }
  markHandled(batchReveal('.stat',
    { scale: .7, opacity: 0 },
    { scale: 1, y: 0, opacity: 1, duration: .85, ease: 'back.out(1.4)' },
    { start: 'top 85%', stagger: .13 }
  ));

  // Insights: image wipes open right-to-left (opposite direction from the
  // services list) so the two wipe-reveals in the page read as a pair, not
  // a repeat; copy rises as usual.
  const uaeImage = document.querySelector('.uae-image');
  if (uaeImage) {
    gsap.fromTo(uaeImage, { clipPath: 'inset(0 0 0 100%)' }, {
      clipPath: 'inset(0 0 0 0%)', opacity: 1, x: 0, duration: 1.4, ease: 'power3.out',
      scrollTrigger: { trigger: uaeImage, start: 'top 85%', once: true }
    });
    markHandled(uaeImage);
  }

  // Testimonial: quote mark bounces in, quote text pulls into focus from a
  // blur (a "camera focus" effect used nowhere else on the page), person pops.
  if (document.querySelector('.testimonial-section')) {
    gsap.from('.testimonial-mark', {
      scrollTrigger: { trigger: '.testimonial-section', start: 'top 80%', once: true },
      scale: .6, opacity: 0, duration: 1, ease: 'back.out(1.7)'
    });
    const quote = document.querySelector('.testimonial-quote');
    if (quote) {
      gsap.fromTo(quote, { filter: 'blur(9px)', opacity: 0 }, {
        filter: 'blur(0px)', opacity: 1, duration: 1.4, ease: 'power2.out',
        scrollTrigger: { trigger: quote, start: 'top 82%', once: true }
      });
    }
    gsap.from('.testimonial-person', {
      scrollTrigger: { trigger: '.testimonial-section', start: 'top 70%', once: true },
      y: 16, opacity: 0, duration: .9, delay: .15
    });
  }

  // Audience: rows zigzag in, alternating left/right, instead of all rising
  // the same way — distinct from the services list directly above it.
  const audienceRows = gsap.utils.toArray('.audience-row');
  audienceRows.forEach((row, i) => {
    gsap.fromTo(row, { x: i % 2 === 0 ? -40 : 40 }, {
      x: 0, y: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: row, start: 'top 92%', once: true }
    });
  });
  markHandled(audienceRows);

  // Process: the connecting line draws first, steps snap into place just
  // behind it, as if being placed along the line as it's drawn (batched).
  gsap.from('.process-line', {
    scrollTrigger: { trigger: '.process-track', start: 'top 78%', once: true },
    scaleX: 0, duration: 1.7, ease: 'power2.inOut'
  });
  markHandled(batchReveal('.process-step',
    { scale: .6, opacity: 0 },
    { scale: 1, y: 0, opacity: 1, duration: .8, delay: .3, ease: 'back.out(1.7)' },
    { start: 'top 78%', stagger: .18 }
  ));

  // Services page only: the marquee band fades/rises into view once, before
  // its own continuous CSS scroll-loop (svc-marquee-track's @keyframes,
  // unaffected — this targets the outer band, a different element/property).
  const svcMarquee = document.querySelector('.svc-marquee');
  if (svcMarquee) {
    gsap.fromTo(svcMarquee, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: svcMarquee, start: 'top 92%', once: true }
    });
  }

  // Services grid cards: a 3D flip-up reveal (rotateX, with perspective) —
  // a distinct *type* of motion from anything else on the site (which is
  // otherwise all 2D fade/slide/scale/clip-path/blur), reserved for this
  // page's centerpiece content. Batched (see batchReveal above) — this grid
  // is 12 cards across 4 rows, far taller than one viewport, so a single
  // shared trigger on the container would fire the whole stagger the moment
  // row 1 appears and finish well before the user scrolls down to row 4,
  // making later rows look like they never animated at all.
  // clearProps: 'transform' strips the inline transform GSAP leaves behind
  // once each card's entrance finishes — without it, that inline style
  // (higher specificity than any stylesheet rule) would permanently block
  // the CSS `.svc-card:hover` lift, since an inline transform always wins
  // over an external rule regardless of :hover state. Clearing it hands the
  // property back to CSS for hover (see the paired `.svc-card.reveal-up`
  // rules in style.css, placed right after `.reveal-up`'s own definition).
  markHandled(batchReveal('.svc-card',
    { rotateX: -35, y: 30, opacity: 0, transformPerspective: 900, transformOrigin: '50% 100%' },
    { rotateX: 0, y: 0, opacity: 1, duration: 1, ease: 'power3.out', clearProps: 'transform' },
    { start: 'top 90%', stagger: .12 }
  ));

  // Contact: background photo settles from a deeper zoom (same treatment as
  // Why ABS / the values band — animates the <img>, not the .contact-bg
  // wrapper, which is the separate scroll-scrubbed parallax target); the
  // decorative diagonal lines draw themselves in, echoing the process line
  // earlier on the page; the CTA content rises with more weight (slower,
  // heavier ease) as the page's final, most deliberate move.
  const contactBgImg = document.querySelector('.contact-bg img');
  if (contactBgImg) {
    gsap.fromTo(contactBgImg, { scale: 1.3 }, {
      scale: 1.15, duration: 1.9, ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-section', start: 'top 80%', once: true }
    });
  }
  const contactArchitecture = document.querySelector('.contact-architecture');
  if (contactArchitecture) {
    gsap.fromTo(contactArchitecture, { opacity: 0, scaleX: 0 }, {
      opacity: .32, scaleX: 1, duration: 1.7, ease: 'power2.inOut', transformOrigin: 'right center',
      scrollTrigger: { trigger: '.contact-section', start: 'top 75%', once: true }
    });
  }
  const contactContent = document.querySelector('.contact-content');
  if (contactContent) {
    gsap.fromTo(contactContent, { y: 40 }, {
      y: 0, opacity: 1, duration: 1.4, ease: 'power4.out',
      scrollTrigger: { trigger: contactContent, start: 'top 85%', once: true }
    });
    markHandled(contactContent);
  }

  // Default fallback: anything with .reveal-up / .reveal-image not covered
  // by a section-specific treatment above still gets a safe basic reveal.
  gsap.utils.toArray('.reveal-up').forEach((element) => {
    if (handled.has(element)) return;
    gsap.to(element, {
      scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      y: 0, opacity: 1, duration: .95, ease: 'power3.out'
    });
  });

  gsap.utils.toArray('.reveal-image').forEach((element) => {
    if (handled.has(element) || element.classList.contains('hero-visual')) return;
    gsap.to(element, {
      scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      x: 0, opacity: 1, duration: 1.2, ease: 'power3.out'
    });
  });

  /* ---------- Parallax on flagged images ---------- */
  if (!reducedMotion) {
    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      gsap.fromTo(el, { yPercent: -6 }, {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }
});
