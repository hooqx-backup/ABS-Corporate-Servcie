# ABS Corporate Services — Marketing Site

A marketing website for **ABS Corporate Services**, a UAE-based corporate
services provider (business setup, PRO/government services, accounting & tax,
compliance, visa/HR support, and more — see `services.html` for the full
12-division breakdown). Static site — no build step, no framework, no
backend. Two pages: `index.html` (the main one-page site, anchor-linked
sections) and `services.html` (a dedicated services listing page). Open
either directly or serve the folder with any static file server.

> This file exists so the next session (human or Claude) has full context on
> what's been built, why it's structured this way, and what's left to do. Keep
> it updated as the site evolves — treat it like a running design/dev log.

## Stack

- Plain **HTML5** (`index.html`), **CSS3** (`style.css`), vanilla **JS** (`script.js`).
- **GSAP 3.12.5** + **ScrollTrigger** (via jsDelivr CDN) for scroll-based reveal
  animations and parallax.
- **Lenis** (via jsDelivr CDN) for smooth/inertial scrolling.
- Google Fonts: `DM Sans` (display), `Manrope` (body/sans), `Playfair Display`
  (serif accent, used inside `<em>` for the editorial italic-headline look).
- Images: sourced from **Unsplash** (`images.unsplash.com/photo-<id>?...`),
  hot-linked via the CDN's on-the-fly resize params (`w`, `q`, `fit=crop`,
  `auto=format`). No local image assets except `abslogo.png` (the brand mark).

## File map

- `index.html` — the main page: anchor-linked sections (`#about`, `#why-abs`,
  `#insights`, `#contact`, etc.) for the nav. Its own homepage "Services"
  section (`#services`, 6 rows) is a summary/teaser — `services.html` is the
  full listing and is what the nav's "Services" link and "View all services"
  actually point to.
- `services.html` — dedicated services page, all 12 divisions from the
  client's service table as image cards. See "Services page" further down
  for the full breakdown.
- `style.css` — single stylesheet, custom-property design tokens at the top of
  `:root`, then section-by-section rules roughly in document order. Media
  queries at the bottom (`900px` and `650px` breakpoints) rather than
  interleaved, to keep the desktop cascade easy to scan.
- `script.js` — header scroll state, mobile menu toggle, GSAP hero intro
  timeline, scroll-triggered reveals (`.reveal-up` / `.reveal-image`), Lenis
  smooth-scroll wiring, magnetic buttons, custom cursor, and service-row
  image previews. Falls back gracefully (reveals snap to visible, no
  animation) if GSAP/ScrollTrigger fail to load.
- `abslogo.png` — dark/full-color brand logo, used in the header (always on a
  light background there, scrolled or not).
- `abs-logo-white.png` — white/gold variant of the same lockup, as supplied.
  **Not referenced directly in the page** — see `abs-logo-white-trimmed.png`.
- `abs-logo-white-trimmed.png` — the file actually used anywhere the logo
  sits on a dark background (footer, contact-section marker, Why ABS
  watermark). The supplied white PNG has a lot of baked-in transparent
  padding, asymmetric top vs bottom (~30% empty space above the mark,
  ~21% below), which threw off vertical alignment against adjacent text
  (e.g. the footer logo sat visibly lower than the "Company/Services/Get in
  touch" column headings even though their bounding boxes were top-aligned).
  This file is a tight alpha-channel crop of the original with a small
  uniform pad added back — same content, no baked-in dead space. If a
  replacement logo file is supplied later, re-crop it the same way (or ask
  for a pre-trimmed export) rather than wiring the raw file in directly.

## Design language

Editorial / premium-agency aesthetic (think a boutique consultancy site, not a
generic SaaS template):

- **Palette**: charcoal/ink near-black, warm paper off-white background, a
  single gold accent (`--gold` / `--gold-light`) used sparingly for numerals,
  underlines, and small marks — never as a large fill.
- **Type**: large, tight-tracking display headlines (`DM Sans`) mixed with
  italic serif (`Playfair Display`) for the second clause of each headline
  (e.g. *"Build your business. **We'll handle the rest.**"*) — this
  serif/sans mix is the site's signature typographic move and should be kept
  consistent in any new headline.
- **Layout**: most sections use `.section-grid`, a two-column grid where the
  left rail (`minmax(180px, 18%)`) holds a small numbered label
  (`01 About`, `02 Services`, …) and the right column holds the content. This
  numbered-label pattern is the section rhythm — new sections should follow
  it.
- **Motion**: everything enters on scroll via fade-up/slide-in
  (`.reveal-up`, `.reveal-image`), driven by GSAP ScrollTrigger, `once: true`
  (no replay on scroll-back). Hero has its own entrance timeline on load.
- Fully responsive down to mobile (hamburger menu, stacked grids); breakpoints
  at 900px and 650px.

## Section inventory (in document order)

1. **Header** — fixed, logo + nav + CTA, condenses/adds a blurred background
   on scroll (`.scrolled` class toggled by `script.js`).
2. **Hero** — headline, intro, two CTAs, large Dubai skyline image with a
   gold corner frame and an "ABS 01/04" stamp motif.
3. **Intro strip** (`#about`) — one-line positioning + category chips
   (Business setup / Corporate support / Compliance / Administration).
4. **Journey** — 4-step numbered track (Establish → Operate → Comply → Grow).
5. **Services** (`#services`) — 6-row list (Business setup, PRO & government
   services, Accounting & tax, Corporate compliance, Visa & HR support,
   Corporate support), each linking to `#contact`. Rows now reveal a
   floating image preview near the cursor on hover (see Enhancements).
6. **Why ABS** (`#why-abs`) — dark section, 4 principles (Clarity, Precision,
   Continuity, Local understanding) in a 2×2 grid.
7. **The ABS standard** — parallax band (see Enhancements) between Why ABS
   and the UAE section. Deliberately text-only — four short value words
   (Structured, Transparent, Responsive, Committed) with a one-line
   description each, **no numbers or stats of any kind** (see the "No
   invented numbers" note below for why).
8. **UAE / Insights** (`#insights`) — image + copy on the local-market
   perspective.
9. **Testimonial** — *new* quote block with portrait (see Enhancements).
10. **Audience** — 4-row list of who ABS supports (Entrepreneurs,
    International investors, Established businesses, Growing companies).
11. **Process** — 4-step "How we work" track with a connecting line that
    draws in on scroll.
12. **Contact** (`#contact`) — dark CTA band with `mailto:` buttons and a
    decorative skewed line pattern (`.contact-architecture`).
13. **Footer** — brand blurb, sitemap columns, contact links, legal line.

## Enhancements added in this pass (dynamic/premium pass)

Requested: more visual richness (additional imagery), more sophisticated
animation, and more "alive" interaction. What was added:

- **Lenis smooth scrolling** — replaces native scroll with eased inertial
  scroll, wired into GSAP's ticker so ScrollTrigger stays in sync.
- **Custom cursor** — a small dot + trailing ring that scales/inverts over
  links, buttons, and service rows.
- **Magnetic buttons** — primary buttons and the header CTA pull slightly
  toward the cursor within a radius, using `gsap.quickTo`.
- **Service-row hover image previews** — each service row carries a
  `data-preview-image`; on hover a floating thumbnail follows the cursor,
  giving the service list an editorial, magazine-style feel instead of being
  plain text rows.
- **"The ABS standard" band** — new section with a fixed/parallax background
  image (Dubai skyline, later swapped to an office photo), dark overlay, and
  four short value statements. (This section originally shipped with
  invented numeric stats — see "No invented numbers" further down for why
  that was wrong and was replaced.)
- **Testimonial section** — new quote block with client portrait, gold
  quotation mark, and a fade/scale-in reveal.
- **Hero + insights image parallax** — hero and UAE section images now drift
  slightly on scroll (`yPercent` scrub via ScrollTrigger) instead of sitting
  static, for depth.
- **Split-word hero headline reveal** — hero `<h1>` words are wrapped and
  staggered in on load rather than fading as one block.
- **Grain/noise overlay** — a subtle full-page noise texture (inline SVG
  data-URI, low opacity) layered over the paper background for a
  print/editorial finish rather than flat digital color.
- Additional Unsplash imagery pulled in for the new sections (stats band,
  testimonial portrait, service preview thumbnails) — all licensed
  free-to-use stock photography via Unsplash's CDN, matching the existing
  hero/insights image treatment (desaturated, cropped, `object-fit: cover`).

## Follow-up pass: white logo + more imagery

The site initially had several long text-only sections (About, Why ABS,
Journey, Audience) that read as sparse/blank, and the dark sections had no
brand mark. Addressed with:

- **`abs-logo-white.png` used everywhere the background is dark**: footer
  (`.footer-logo`, replacing the old text-based lockup), the contact
  section's `.contact-marker` (replacing plain "ABS" text), and as a large,
  low-opacity (`opacity: .06`, `filter: brightness(0) invert(1)`) watermark
  in the bottom-right of the Why ABS section for texture.
- **Why ABS** now has a real photographic background (`.why-bg`, parallax +
  dark gradient overlay `.why-overlay`) instead of flat charcoal — same
  pattern as the stats band. Tuned twice already: the original overlay/filter
  (`saturate(.4) brightness(.6)` image + up to `.94` opacity overlay) was too
  heavy — the photo read as barely-there texture rather than a visible
  image; lightened to `saturate(.7) brightness(.9)` / overlay max `.82`,
  which then read as slightly too bright. Current values:
  **`saturate(.65) brightness(.78)`** on the image, overlay
  `rgba(15,15,15,.88) → .75 → .52` (left → middle → right). If this needs
  tuning again, check contrast on the *right* side of the section first —
  the overlay is deliberately lighter there (`.52` vs `.88` on the left) to
  let more of the image show through behind the principle cards, so it's the
  first place legibility would break if pushed brighter.
- **About / intro-strip** restructured from a single text block into a
  two-column split (`.intro-text` + `.intro-media`), with a supporting photo
  and a small location tag, mirroring the hero/insights image treatment.
- **Journey** heading row gained a small thumbnail (`.journey-heading-media`)
  next to its supporting paragraph, instead of being pure text.
- **Audience rows** now carry `data-preview-image` and reuse the exact same
  floating cursor-preview mechanism built for the services list (the JS
  selector for it is `.service-row[data-preview-image], .audience-row[data-preview-image]`)
  — one person-oriented photo per audience type (entrepreneurs, investors,
  established businesses, growing companies).

When adding more sections later: if a section is mostly text, default to
giving it a supporting image (inline split, background band, or hover
preview) rather than leaving it flat — that was the direct cause of the
"site looks blank" feedback that prompted this pass.

## Bug fix: hover-preview image got stuck on scroll

The service/audience row hover-preview (floating thumbnail that follows the
cursor) could get stuck on screen after the user scrolled the page without
moving the mouse — e.g. scrolling past the services/audience list with the
cursor stationary. Root cause: browsers only fire `mouseleave` on actual
pointer movement, not when the hovered element scrolls out from under a
still cursor, so the row's own `mouseleave` listener never ran.

Fix in `script.js`: on every scroll tick (native `scroll` + Lenis's own
`scroll` event), re-check what element is really under the **last known
cursor position** via `document.elementFromPoint(lastMouseX, lastMouseY)`,
and show/hide the preview based on that ground truth rather than trusting
accumulated enter/leave events. Both the show and hide tweens set
`overwrite: 'auto'` explicitly (GSAP's default, spelled out for clarity) so
whichever opacity/scale call happens last always wins outright — without it,
a burst of enter/leave events firing in a tight loop during a scroll
(Chromium does recompute `:hover` state as content moves under a stationary
cursor) could leave a fade-in tween "winning" a race against a fade-out
tween issued first, leaving the preview stuck visible even though the hide
logic had technically run.

**Gotcha hit while building this**: using `overwrite: true` (not `'auto'`)
looked like the same fix but silently broke cursor-following — `true` kills
*every* other tween on the target element, not just ones sharing the same
properties, so it was also killing the independent `movePX`/`movePY`
position tweens every time `showPreview`/`hidePreview` fired, freezing the
preview box in place instead of following the mouse. `'auto'` only kills
tweens on the same properties (opacity/scale here), leaving the x/y position
tweens alone. If this preview mechanism is extended later, keep
`overwrite: 'auto'` — never `true` — anywhere the target also has other,
unrelated tweens running on it (like a position follow).

The preview is also offset **40px below** the cursor (`movePY(e.clientY + 40)`
in the row's `mousemove` handler) rather than centered directly on it, so it
doesn't sit on top of the pointer or overlap text immediately above the row.

## Per-section entrance animations (each section has its own signature move)

The site originally used one blanket entrance for everything: `.reveal-up`
elements faded up, `.reveal-image` elements faded in from the right. Every
section now has its own distinct treatment instead, so scrolling down reads
as a sequence of deliberate moments rather than the same effect on repeat.
All of this lives in the "Per-section entrance animations" block in
`script.js`, in page order:

- **Section labels** (the small `01 / 02 / ...` numbered tags) share one
  subtle slide-in-from-left across every section — intentional, since it's a
  recurring UI element, not "the section's content."
- **About**: text staggers in line by line; the photo wipes open top-down
  via an animated `clip-path` (`inset(0 0 100% 0)` → `inset(0 0 0% 0)`).
- **Journey**: the thumbnail pops in with a slight spin (`back.out` scale +
  rotate); the four steps rise in a left-to-right stagger.
- **Services**: each row wipes open left-to-right like a line being typed,
  via `clip-path` (`inset(0 100% 0 0)` → `inset(0 0% 0 0)`).
- **Why ABS**: the background photo settles in from a deeper zoom (scale
  1.32 → 1.15, animated on the `<img>` itself, not the `.why-bg` wrapper —
  see the gotcha below); the four principle cards pop in with `back.out`.
- **The ABS standard band**: same zoom-settle treatment on its own
  background image; the four value cards pop in with a bounce
  (`back.out`). (Class names — `.stats-section`, `.stat`, etc. — are
  unchanged from when this section held numeric stats; see "No invented
  numbers" below.)
- **Insights (UAE)**: the image wipes open **right-to-left** — the mirror
  direction of the Services wipe — so the two `clip-path` reveals on the
  page read as a deliberate pair rather than a repeated effect.
- **Testimonial**: the quote mark still bounces in (`back.out`); the quote
  text now also pulls into focus from a blur (`filter: blur(9px)` → `blur(0)`),
  a "camera focus" effect used nowhere else on the page.
- **Audience**: rows zigzag in, alternating left/right by index, distinct
  from the Services list directly above it.
- **Process**: the connecting line still draws first; the four steps now
  scale in (`back.out`) staggered just behind it, as if snapping into place
  along the line as it's drawn.
- **Contact**: the decorative diagonal lines draw themselves in via animated
  `scaleX` (echoing the process line earlier on the page — GSAP correctly
  layers this on top of the existing CSS `skewX(-16deg)`, see the console
  output of `getComputedStyle(...).transform` if verifying — it'll show a
  skew component preserved alongside the animated scale); the CTA content
  rises with a heavier, slower `power4.out` ease as the page's final,
  most deliberate move.

Anything with `.reveal-up`/`.reveal-image` not explicitly covered by one of
the blocks above still falls through to a safe default fade (tracked via a
`handled` Set in `script.js`, checked at the very bottom) — so extending a
section without touching the JS never leaves an element permanently stuck
invisible.

**Gotcha hit while building this**: for `.why-bg` and `.stats-bg`, don't
target the *wrapper* element with the zoom-settle scale animation — it's
also the parallax scrub target (`data-parallax`, animates `yPercent` on
scroll), and the wrapper has no CSS transform of its own. The actual `<img>`
child already carries a fixed `transform: scale(1.15)` in CSS (for parallax
headroom, so the scrubbed image never shows an edge). Animating scale on the
wrapper would stack on top of the image's own fixed scale and compound into
an unintentionally larger zoom. Animate the `<img>` itself instead — GSAP
then owns and animates that element's existing scale directly, ending at the
same 1.15 the design already intended, with no compounding.

All of the above only *add* properties (`clipPath`, `scale`, `rotate`,
`filter`) alongside the existing `.reveal-up`/`.reveal-image` baseline
opacity/transform — they don't introduce new CSS default-hidden states. That
matters for the no-JS fallback at the top of `script.js`: it only ever needs
to reset `opacity`/`transform` on `.reveal-up`/`.reveal-image`/`.line-inner`,
because nothing here is hidden by CSS by default — GSAP sets the "from"
state (including the hidden clip-path/blur/scale) itself at runtime via
`fromTo()`'s `immediateRender`. If GSAP fails to load, these properties were
simply never set, so the element just renders in its natural, fully visible
state. Keep new section animations following this same pattern (extend via
`gsap.fromTo()`, never a new CSS class with a default hidden clip-path or
filter) so a failed CDN load never leaves content invisible.

## Contact section background image

The final CTA band (`.contact-section`, directly above the footer on both
pages) was flat `background: var(--charcoal)` — added a photo background on
request, using the same `.why-bg`/`.why-overlay` pattern as Why ABS and the
values band: a `.contact-bg` wrapper (`data-parallax`, picked up
automatically by the existing `[data-parallax]` scroll-scrub loop — no JS
wiring needed for that part) holding the `<img>`, plus a `.contact-overlay`
dark gradient scrim, plus the same one-time "zoom settle" entrance
(`scale: 1.3 → 1.15`) applied to the other two photo-backed dark sections.
Tuned a little darker than Why ABS (`saturate(.55) brightness(.6)` on the
image, overlay `rgba(17,17,17,.9) → .8 → .62`) since this section carries
the site's primary CTA buttons and needs the strongest text/button contrast
of any dark section.

Each page uses a **different photo** for variety rather than repeating one
image site-wide: `index.html` uses a high-five/celebratory shot (fits "Ready
to build what's next?"), `services.html` uses a calm, empty modern boardroom
(fits "Not sure which service you need?" — a "ready when you are" mood).

**Stacking-order gotcha**: `.contact-marker` (the small ABS mark + page
number) and `.contact-architecture` (the decorative diagonal gold lines)
were both pre-existing elements with **no explicit `z-index`**, which was
fine when they only had to sit on a flat CSS `background` color. The moment
`.contact-bg`/`.contact-overlay` were added as new *positioned* sibling
elements, both would have painted *behind* the new overlay by default
(`.contact-marker` because it was plain static-flow content, which paints
below any positioned layer regardless of DOM order; `.contact-architecture`
because its `z-index: auto` put it in the same paint step as `.contact-bg`,
ordered by DOM order, and the explicit `.contact-overlay` at `z-index: 1`
paints after — i.e. on top of — that whole step). Fixed by adding
`position: relative; z-index: 2;` to `.contact-marker` (it had no
`position` rule at all before) and `z-index: 2;` to `.contact-architecture`
(already `position: absolute`, just missing the `z-index`) — matching
`.contact-content`'s existing `z-index: 2`. Caught by checking the rendered
screenshot for the gold lines specifically (they'd have been invisible,
muted under the overlay, otherwise) rather than assuming the existing
CSS would "just work" once new positioned layers were introduced under it.

## Bug fix: grid animations firing too early + too fast to see

Two related complaints from the user after the per-section animations and
the services grid shipped:

1. **"Some sections appear so fast I can't see the transition."** Most
   entrance durations were in the 0.6–0.85s range with tight stagger gaps
   (0.1–0.12s between grid items) — too quick to actually perceive,
   especially with Lenis smooth-scroll carrying the user past the trigger
   point at speed. **Fix**: increased durations roughly 25–40% across every
   entrance in `script.js` (labels 0.6→0.85s, text stagger 0.8→1s, image
   wipes 1.1→1.4s, background zoom-settles 1.6→1.9s, the final contact rise
   1.1→1.4s, etc.) and widened grid stagger gaps (0.1→0.13–0.18s depending
   on the section) so each item's entrance is individually visible rather
   than a near-simultaneous blur.

2. **"In the service card section, when I enter the section all cards'
   animations happen, but when I scroll again there are cards but no
   animation can be seen."** This was a real structural bug, not just a
   speed issue. `.svc-grid` (and, less severely, `.journey-track`,
   `.principles-grid`, `.stats-grid`, `.process-track`) used **one shared
   `ScrollTrigger`** on the container, so the *entire* stagger sequence
   fired the instant the container's top edge crossed the trigger threshold
   — for the 12-card, 4-row services grid, that meant the whole animation
   (including row 4) completed within about a second of row 1 appearing,
   long before the user had actually scrolled down far enough to see row 4.
   By the time they got there, those cards were already sitting at their
   final settled state (opacity 1, no transform) — correctly rendered, but
   with no animation visibly happening *at the moment the user could see
   them*, which reads exactly like "no animation."

   **Fix**: replaced the single-trigger-per-grid pattern with
   **`ScrollTrigger.batch()`** via a new `batchReveal(selector, fromVars,
   toVars, { start, stagger })` helper in `script.js`. `batch()` fires
   separately for each group of elements as *they* individually cross the
   trigger threshold, so a tall grid animates progressively as the user
   scrolls through it — row 4 only starts animating when row 4 actually
   scrolls into view, not when row 1 did. Applied to `.journey-step`,
   `.principle`, `.stat`, `.process-step`, and `.svc-card`. Verified in a
   real browser, not by eyeballing a screenshot (screenshot timing is too
   easy to get lucky/unlucky with): scrolled to show only row 1, confirmed
   row 4's cards were still at `opacity: 0`; then scrolled further and
   watched a card's opacity read a partial value (`0.63`) mid-transition
   before settling at `1` — proof the batch fires exactly when the row
   actually comes into view, not before.

   If a future grid/list section has more than ~4 items or could plausibly
   be taller than one viewport (which, on a phone, is almost any 3+ row
   grid), use `batchReveal(...)` rather than a single shared
   `scrollTrigger` on the container — the single-trigger pattern only reads
   correctly on a desktop viewport tall enough to fit the whole grid, which
   is exactly the assumption that broke here.

## Services page (`services.html`)

Built from the client's own division table (12 divisions, each with a list
of included services) — this is a separate page, not a homepage section,
because the content (12 image cards, each with a sub-service list) is too
much to fit in the homepage's existing 6-row `#services` summary.

**Structure** (reuses the homepage's design system throughout — same
`style.css`/`script.js`, same header/footer markup, same `.hero`,
`.intro-strip`, `.process`, and `.contact-section` classes/styles):

1. **Hero** — identical structure/classes to the homepage hero (so it gets
   the same line-reveal headline timeline for free), different copy/image,
   stamp reads "01/12" instead of "01/04".
2. **Marquee** (`.svc-marquee`) — a continuously auto-scrolling strip of all
   12 division names on a dark band, pure CSS (`@keyframes svc-marquee`,
   `translateX(0) → translateX(-50%)` on a track containing the list
   duplicated twice for a seamless loop). The band itself also fades/rises
   in once on scroll (`script.js`, targets `.svc-marquee` — a different
   element/property from the track's own infinite-loop animation, so the two
   don't conflict) before settling into the continuous loop. Respects
   `prefers-reduced-motion` (the loop is disabled; the one-time entrance
   still plays since GSAP/ScrollTrigger already gate everything on
   `reducedMotion` globally).
3. **Overview** — reuses `.intro-strip`/`.intro-content` (text + image
   split) to frame why 12 divisions exist under one roof.
4. **Services grid** (`#svc-grid`) — the main content: 12 `.svc-card`
   elements in a responsive grid (3 columns desktop, 2 tablet, 1 mobile),
   each with its own **3D flip-up entrance** (`rotateX: -35 → 0` with
   `transformPerspective`, grid-aware stagger) — a distinct animation *type*
   from anything else on the site, which otherwise only uses 2D fade/slide/
   scale/clip-path/blur. Reserved for this page's centerpiece content so it
   doesn't feel like a re-skinned homepage section. Each card is a full
   `<a href="#contact">` linking to this page's own contact section, and
   also carries a matching `id` (`#business-setup`, `#pro-services`, etc.)
   so other pages/sections can deep-link to a specific division — the
   homepage footer's Services column does exactly this.
5. **Process** — the exact same 4-step "How it works" track as the
   homepage, copy tweaked slightly ("The same considered process, whichever
   division your business needs first").
6. **Contact** — the homepage's `.contact-section` markup duplicated here
   (not linked back to `index.html#contact`) so the page is self-contained;
   headline/copy changed to "Not sure which service you need?".

**The 12 division → image mapping** (all Unsplash, verified both by HTTP
status *and* by actually looking at each photo before committing — several
initial ID guesses were wrong, e.g. an ID assumed to be a passport turned out
to be a bus at night, one assumed to be a house-keys/real-estate shot for
"Corporate Structuring" was swapped for an actual blueprint/architectural
drawing, which reads far better for that division):

| Division | Image content |
|---|---|
| Business Setup | Glass office building, looking up |
| PRO Services | Hand signing a document |
| Visa & Immigration | Aircraft at an airport terminal |
| Tax & Accounting | Calculator + tax forms on a desk |
| Corporate Compliance | Courthouse / government building facade |
| Banking Services | Card payment at a counter |
| HR Services | Team working together at desks |
| Corporate Structuring | Architect's blueprint / structural drawing |
| IP Services | Laptop showing a creative/brand design board |
| Business Support | Modern office reception lounge |
| Market Entry | Sticky-note strategy/planning board |
| Corporate Administration | Team meeting reviewing documents |

**Cross-page navigation wiring** — since `services.html` is a real second
page, not an anchor, several links across the site had to change:
`index.html`'s nav ("Services"), its "View all services" link, and its
footer's Services column all now point to `services.html` (the footer links
go to specific `#division-id` anchors). `services.html`'s own header nav
links `Home`/`About`/`Why ABS` back to `index.html`/`index.html#about` etc.
(cross-page anchors), while `Contact` stays a same-page `#contact` anchor
since this page has its own contact section. The header nav gets a small
`.active` class (new CSS: `.desktop-nav a.active, .mobile-menu a.active {
color: var(--gold); }`) on whichever page's own nav link, set statically in
each page's markup (no JS needed since each page knows which page it is).

**Nav is `Home · About · Services · Why ABS · Contact`** on both pages
(added on request; `Home` links to `#top` on `index.html` and plain
`index.html` from `services.html`). The `Insights` link was removed from
the nav on request too — the `#insights` section itself still exists on
`index.html` (item 8 in the section inventory above) and is still reachable
by scrolling or direct anchor, it's just no longer in the header nav. The
homepage footer's "Insights" link (Company column) was left as-is since
only the *navbar* link was asked to go — if Insights should be fully
unreachable from navigation, that footer link still needs removing too.

**Bug hit while building this — inline transform blocking CSS `:hover`**:
`.svc-card` needed both a GSAP transform entrance (originally scale/fade,
now the 3D flip described above — the bug and fix apply the same way either
way, since both animate the `transform` property) *and* a CSS `:hover`
lift (`translateY(-7px)`). Both tried to control the same
`transform` property, and the entrance tween's leftover inline style (GSAP
sets `transform` directly on the element and normally leaves it there after
the tween finishes) permanently outranked the external stylesheet's
`:hover` rule — inline styles always beat stylesheet rules regardless of
specificity or `:hover` state, so the lift silently never applied. Fixed
two ways together:
1. The entrance tween now includes `clearProps: 'transform'`, which strips
   GSAP's inline transform once the tween completes, handing the property
   back to CSS.
2. That alone wasn't enough — with the inline style gone, the plain
   `.reveal-up` utility class's own permanent `transform: translateY(25px)`
   (needed as the *initial* hidden state, but not meant to persist) would
   reassert itself at rest. Added `.svc-card.reveal-up { transform: none; }`
   (two classes = higher specificity than plain `.reveal-up`, so it wins
   regardless of source order) plus `.svc-card.reveal-up:hover { transform:
   translateY(-7px); }` (higher specificity still, so hover always wins over
   the resting override). Both new rules are placed directly after
   `.reveal-up`'s own definition in `style.css` with a comment explaining
   why. If any other element ever needs a GSAP entrance *and* a CSS-driven
   hover transform, this is the pattern to reuse — verified by checking the
   actual computed `transform` at rest, on hover, and after mouse-leave in a
   real browser, not just by eyeballing a screenshot (a static screenshot
   would not have revealed the "hover never fires" bug at all).

**Adding a 13th division later**: copy one `.svc-card` block, give it a new
`id`, swap the image URL (verify it resolves *and* actually shows the right
subject before committing — see the mapping table above for how easily an
ID can be right-shaped but wrong-content), update `.svc-marquee-track`'s
name list (both copies, for the seamless loop), and optionally add a footer
deep-link if it's one of the "headline" divisions featured there.

## No invented numbers

The "By the numbers" section originally shipped with fabricated statistics
(150+ businesses established, 25+ government approvals/month, 10+ years
experience, 98% retention) invented as placeholder copy to fill the layout.
The user caught this directly ("where did u get these numbers") and asked
for numbers to be removed entirely, not just corrected.

This was a bad default: unlike an obviously-fake email address or phone
number, a specific stat like "98% client renewal rate" reads as a real,
verifiable claim — exactly the kind of thing that could get published by
accident and misrepresent the business. Flagging it in this file's TODO list
wasn't enough; it should never have been invented as numeric placeholder
content in the first place.

**Fixed** by replacing the four numeric stat cards with four short
qualitative value statements (Structured / Transparent / Responsive /
Committed, each with a one-line description) — same visual rhythm (bold gold
word, short description below), same section, no numbers anywhere. The
count-up animation code was removed from `script.js` entirely (there's
nothing left to count). Class names in the markup/CSS (`.stats-section`,
`.stats-grid`, `.stat`) were left as-is to minimize churn — only
`.stat-number` (sized and styled for 2–3 digit numbers) was renamed to
`.stat-word` and resized for longer text (`font-size: clamp(21px, 1.7vw,
26px)` instead of `clamp(38px, 4vw, 58px)`).

**Going forward**: never fill a stats/numbers-shaped section with invented
figures, even as an obvious-looking placeholder. If real numbers aren't
available, use text (as done here), a qualitative statement, or leave a
clearly-marked TODO in the markup itself (e.g. an HTML comment) rather than
a number that reads as real.

## Known placeholders / TODO before real launch

- **Contact details are placeholders**: `hello@abscorporate.com` and
  `+971 00 000 0000` in both the contact section and footer need to be
  replaced with the real inbox/phone number.
- **Copy/logo**: both logo variants (`abslogo.png` dark, `abs-logo-white.png`
  light) are now in place and wired up; still worth a final client
  sign-off pass on the exact files before launch.
- **Images are stock/Unsplash**, not real photography of the business, team,
  or office — swap for licensed/owned photography before production launch.
- **No backend/form**: CTAs are `mailto:` links, not a real contact form —
  fine for a placeholder site, but likely wants a proper form + submission
  handling (or a third-party form service) before launch.
- **No analytics** wired up yet (GA4/Plausible/etc.) — add before launch if
  traffic tracking is wanted.
- **No favicon** — only the header logo image exists; add a `favicon.ico`/
  `apple-touch-icon` before launch.
- **Not yet a git repo** — this folder has no `.git`. Run `git init`, add a
  `.gitignore` if needed, and commit before pushing to a remote.
- **SEO**: only a basic `<meta name="description">` exists — no Open Graph /
  Twitter card tags, no `sitemap.xml`/`robots.txt`, no structured data
  (LocalBusiness schema would suit a UAE corporate-services provider).

## Conventions to follow when extending this site

- Keep the numbered-label + two-column `.section-grid` pattern for new
  top-level sections.
- Keep the serif-italic-in-headline convention (`<em>` around the second
  clause of `h1`/`h2` text) for any new headline.
- New scroll-reveal elements should just get the `.reveal-up` or
  `.reveal-image` class — `script.js` already wires up ScrollTrigger for any
  element with those classes, no per-section JS needed.
- Gold is an accent, not a fill — use it for numerals, underlines, and small
  marks; don't paint large areas with it.
- **Never invent numeric claims** (stats, percentages, counts) as placeholder
  copy — see "No invented numbers" below. Use qualitative text instead, and
  flag it as a placeholder in this file if real numbers aren't available yet.
- **No em dashes (—) in site copy** — removed on request from both pages'
  visible text and the services meta description. Rewrite with a comma,
  colon, period (splitting into two sentences), or "and"/"or" depending on
  what reads best in context, rather than reaching for one in new copy. The
  two decorative `.section-label` placeholders that used to hold a bare "—"
  in place of a section number (testimonial on `index.html`, "Overview" on
  `services.html`) now use "•" instead — keep that as the placeholder mark
  for any future unnumbered section label, not a dash of any kind.
- Prefer Unsplash CDN URLs (`images.unsplash.com/photo-<id>?auto=format&fit=crop&w=<n>&q=85`)
  for placeholder imagery, matching the resize params already used elsewhere,
  and verify the URL returns `200` before wiring it in (a dead Unsplash ID
  silently renders a broken image).
