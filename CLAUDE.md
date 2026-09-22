# ABS Corporate Services — Marketing Site

A single-page marketing website for **ABS Corporate Services**, a UAE-based corporate
services provider (business setup, PRO/government services, accounting & tax,
compliance, visa/HR support). Static site — no build step, no framework, no
backend. Open `index.html` directly or serve the folder with any static file
server.

> This file exists so the next session (human or Claude) has full context on
> what's been built, why it's structured this way, and what's left to do. Keep
> it updated as the site evolves — treat it like a running design/dev log.

## Stack

- Plain **HTML5** (`index.html`), **CSS3** (`style.css`), vanilla **JS** (`script.js`).
- **GSAP 3.12.5** + **ScrollTrigger** (via jsDelivr CDN) for scroll-based reveal
  animations, parallax, and count-up effects.
- **Lenis** (via jsDelivr CDN) for smooth/inertial scrolling.
- Google Fonts: `DM Sans` (display), `Manrope` (body/sans), `Playfair Display`
  (serif accent, used inside `<em>` for the editorial italic-headline look).
- Images: sourced from **Unsplash** (`images.unsplash.com/photo-<id>?...`),
  hot-linked via the CDN's on-the-fly resize params (`w`, `q`, `fit=crop`,
  `auto=format`). No local image assets except `abslogo.png` (the brand mark).

## File map

- `index.html` — all markup, single page, anchor-linked sections (`#about`,
  `#services`, `#why-abs`, `#insights`, `#contact`, etc.) for the nav.
- `style.css` — single stylesheet, custom-property design tokens at the top of
  `:root`, then section-by-section rules roughly in document order. Media
  queries at the bottom (`900px` and `650px` breakpoints) rather than
  interleaved, to keep the desktop cascade easy to scan.
- `script.js` — header scroll state, mobile menu toggle, GSAP hero intro
  timeline, scroll-triggered reveals (`.reveal-up` / `.reveal-image`), Lenis
  smooth-scroll wiring, magnetic buttons, custom cursor, service-row image
  previews, and count-up stats. Falls back gracefully (reveals snap to
  visible, no animation) if GSAP/ScrollTrigger fail to load.
- `abslogo.png` — brand logo used in the header.

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
7. **By the numbers** — *new* parallax stats band (see Enhancements) between
   Why ABS and the UAE section.
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
- **"By the numbers" stats band** — new section with a fixed/parallax
  background image (Dubai skyline), dark overlay, and four count-up stats
  (businesses established, government approvals, years of combined
  experience, client rating) that animate when scrolled into view.
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

## Known placeholders / TODO before real launch

- **Contact details are placeholders**: `hello@abscorporate.com` and
  `+971 00 000 0000` in both the contact section and footer need to be
  replaced with the real inbox/phone number.
- **Copy/logo**: verify `abslogo.png` is the final approved logo file: check with client if wants to change with real logo.
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
- Gold is an accent, not a fill — use it for numerals, underlines, small
  marks, and count-up figures; don't paint large areas with it.
- Prefer Unsplash CDN URLs (`images.unsplash.com/photo-<id>?auto=format&fit=crop&w=<n>&q=85`)
  for placeholder imagery, matching the resize params already used elsewhere,
  and verify the URL returns `200` before wiring it in (a dead Unsplash ID
  silently renders a broken image).
