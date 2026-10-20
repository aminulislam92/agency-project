# Digital Agency ("Silicon") — Design Spec

Extracted directly from `Digital Agency.fig` (all values are exact Figma values unless marked *derived*).
Design canvas: 1920px desktop frames. Visual references: `design-reference/*.png` (one full-page PNG per page).

---

## 1. Typography

Only **Manrope** is used on the website pages (Google Fonts, weights 400 / 600 / 700 / 800).
(Poppins appears only on an internal component canvas — do NOT load it.)

| Token | Font | Size | Line-height | Use |
|---|---|---|---|---|
| Display / D1 | Manrope 800 | 80px | 1.3 | Largest hero titles |
| Display / D2 | Manrope 800 | 72px | 1.3 | Home hero "We Transform Your Ideas into Reality" |
| Heading / H1 | Manrope 800 | 40px | 1.3 | Section titles ("Featured Projects", "Our Competencies") |
| Heading / H2 | Manrope 800 | 32px | 1.3 | |
| Heading / H3 | Manrope 800 | 28px | 1.3 | |
| Heading / H4 | Manrope 800 | 24px | 1.4 | Feature titles |
| Heading / H5 | Manrope 800 | 20px | 1.4 | Card titles (blog card title) |
| Heading / H6 | Manrope 800 | 16px | 1.4 | Small headings |
| Body / Lead | Manrope 400 | 24px | 1.6 | Lead paragraphs (CTA subtitle) |
| Body / XL | Manrope 400 | 20px | 1.6 | |
| Body / L | Manrope 400 | 18px | 1.6 | Section subtitles |
| Body / M | Manrope 400 | 16px | 1.6 | Default body |
| Body / S | Manrope 400 | 14px | 1.6 | Card text, dates, inputs |
| Body / XS | Manrope 400 | 12px | 1.6 | Copyright, captions |
| navigation | Manrope 600 | 16px | 1.6 | Navbar + footer links |

Letter-spacing: 0 everywhere. Heading word highlight (e.g. "Transform") uses the brand gradient as text fill (`bg-clip-text`).

Responsive scale (*derived* — Figma has desktop only): D2 72 → 48 (md) → 40 (mobile); H1 40 → 32 → 28.

---

## 2. Colors

### Brand
| Token | Hex |
|---|---|
| primary (Brand/Primary) | `#6366F1` |
| primary-12 (badge bg) | `#6366F1` @ 12% opacity |
| primary-35 | `#6366F1` @ 35% opacity |
| **Brand Gradient** | `linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #D946EF 100%)` |

### Grays
| Token | Hex | Typical use |
|---|---|---|
| gray-100 | `#F3F6FF` | Section backgrounds (Competencies box, Blog section) |
| gray-200 | `#EFF2FC` | Subtle fills |
| gray-300 | `#E2E5F1` | Dividers / borders |
| gray-400 | `#D4D7E5` | Input borders |
| gray-500 | `#B4B7C9` | Placeholders |
| gray-600 | `#9397AD` | Muted text, dates, section subtitles |
| gray-700 | `#565973` | Body text |
| gray-800 | `#33354D` | Nav links, card titles |
| gray-900 | `#0B0F19` | Headings, dark-mode background |
| white | `#FFFFFF` | |

### System
| Token | Hex |
|---|---|
| success | `#22C55E` |
| error / danger | `#EF4444` |
| warning (rating stars) | `#FFBA08` |
| info | `#4C82F7` |

### Dark mode (*derived* — the design has a Light/Dark toggle but only light screens)
- page bg `#0B0F19`, card bg `rgba(255,255,255,0.04)`, borders `rgba(255,255,255,0.14)`
- headings `#FFFFFF`, body text `#9397AD`, nav links `rgba(255,255,255,0.8)`
- primary and gradient unchanged.

---

## 3. Effects / shadows

| Token | CSS |
|---|---|
| shadow-sm (cards, accordion panels) | `0 2px 6.4px -1px rgba(19,16,34,.03), 0 4.4px 12px -1px rgba(19,16,34,.06)` |
| shadow-brand (primary button) | `0 8px 18px -8px rgba(99,102,241,.9)` |
| shadow-secondary-btn | `0 8px 18px -8px rgba(19,16,34,.15)` |
| shadow-md | `0 12px 16px 0 rgba(0,0,0,.04)` |
| glass (navbar on scroll, *derived from background-blur 30*) | `backdrop-filter: blur(30px)` + white/80% bg |

Social-icon hover shadows use the same pattern in the brand's colour: `0 8px 18px -8px <color>/.9`.

---

## 4. Radius & spacing

- Radius: **4px** (small btn, badge), **6px** (input, footer btn), **8px** (default: buttons, cards, images, sections), **12px** (toggle), **16px**, **40px/full** (round icon buttons, avatars).
- Container: **1296px** content width (centered on 1920 → 312px side gutters). Use `max-w-[1296px] mx-auto px-4 md:px-6`.
- Grid gutter: 24px. Vertical section spacing: ~96–112px desktop (`py-24`/`py-28`), ~64px mobile.
- Navbar height: 76px.
- Footer height: ~497px, white background.

---

## 5. Components

| Component | Spec |
|---|---|
| **Button – primary (lg)** | h 52, padding 13/32, radius 8, bg `#6366F1`, white text Manrope 600 16, `shadow-brand`. Hover: slightly darker (`#4F46E5`*) |
| **Button – primary (md)** | h 44, padding 11/28, radius 6, text 14 |
| **Button – primary (sm)** | h 36, padding 9/20, radius 4, text 14 (navbar "Contact us") |
| **Button – outline** | h 52, padding 13/32, radius 8, 1px border `#6366F1`, text `#6366F1`, transparent bg. Hover: fill primary, white text |
| **Button – white** | white bg, primary text, radius 8 (on gradient CTA) |
| **Round icon button** | 44×44, white, radius full, shadow-sm, chevron icon 24 ("Discover more", sliders) |
| **Badge** | h 22, padding 0/8, radius 4, bg primary @12%, text primary 12–14 semibold ("Digital", "Design", "Tips & Advice") |
| **Input** | h 44, radius 6, border 1px `#D4D7E5`, bg white, text 14, placeholder `#B4B7C9`, optional left/right icon 20px (envelope). Focus: border primary + ring primary/20 |
| **Toggle (Light/Dark)** | 46×24 track radius 12 bg primary, 20px white knob; labels "Light" / "Dark" 16 semibold `#565973` |
| **Accordion panel** | white, radius 8, shadow-sm, padding 16/24, gap 24; title 16 ExtraBold; chevron in 24px round button (active = filled primary w/ white icon). Open panel shows 200×200 image + paragraph |
| **Blog card (horizontal)** | 746×240, white, radius 8, shadow-sm; image 306 wide left; bookmark round button top-right of image (36px); badge + date row; title H5 `#33354D`; divider `#E2E5F1`; author row (48px avatar, name 16 bold, role 14 muted) |
| **Blog card (vertical)** | 387×540; image 300h on top; same content stack |
| **Testimonial card** | white, radius 8, shadow-sm, padding 64/48/48/48; 52×52 primary square with white quote icon overlapping top-left; 5 stars `#FFBA08`; numbered pagination (36px squares, active = primary) |
| **Client logo tile** | 1px border `#E2E5F1`, radius 8, grayscale logos, hover → full color; carousel with prev/next round buttons |
| **Feature item** | centered icon (gradient/primary, ~40px) + H4 title + Body/S muted text, 3 columns separated by vertical 1px dividers |
| **Gradient CTA box** | 1296×406, radius 8, Brand Gradient bg, decorative white concentric rounded-line shapes (low opacity) on left + radial white glow; subtitle Lead white/70%, email H1 white underlined, white button |
| **Pagination** | 36px squares, radius 4–8, active bg primary white text, inactive gray-100 bg |

Icons: all icons are **Boxicons** (`bx-envelope`, `bx-search`, `bx-play`, `bx-check-square`, `bx-list-ul`, `bx-grid-alt`, `bx-home-alt`, `bx-chevrons-right`, `bx-log-in`, `bx-share-alt`, `bx-like`, `bx-comment`, `bx-phone-call`, `bx-map`, `bx-bell`, `bx-rocket`, `bx-time-five`, `bx-check`, `bx-plus-circle`, `bx-minus-circle`, `bxl-facebook`, `bxl-instagram`, `bxl-twitter`, `bxl-linkedin`, `bxl-youtube`, `bxl-dribbble`, `bxl-google-plus`). Use `react-icons/bi`.

Logo: "Si" in a hexagon with the Brand Gradient fill + wordmark "Silicon" (Manrope 800, 20px, gray-900). 122×44. Recreate as an inline SVG component.

---

## 6. Pages & sections (top → bottom)

All pages share **Navbar** (logo · Services▾ / Portfolio / About / Blog / Contact · Light/Dark toggle · "Contact us" small button) and **Footer** (logo + text + newsletter input with "Subscribe" button | Home/About/Services/Portfolio/Blog + Terms/Privacy | Facebook/Linkedin/Twitter/Instagram | Contact Us + email | copyright row). Inner pages start with a **breadcrumb** (bx-home-alt "Homepage" › current) at y≈116.

### Home — `design-reference/Home Page (B).png` (route `/`)
1. **Hero** (990px tall): soft radial bg (`#6387F1`/10% → `#DA46EF`/5%), white + primary blurred glare ellipses, gradient striped sphere graphic (636×636) on the right, thin gradient rounded-corner line shapes at right edge. Left: play-button pill "Digital Agency Promo" → D2 title with "Transform" in gradient text → primary lg button "Work with us" + 16px paragraph → round "Discover more" button scrolling to next section.
2. **Features**: 3 columns — Creative Solutions / Award Winning / Team of Professionals.
3. **Featured Projects**: H1 + subtitle, masonry-style grid (416×856 tall left, 416×416 ×2 top, 856×416 wide bottom), "Explore all" button.
4. **Our Competencies**: gray-100 box radius 8, centered H1 + subtitle, 856px accordion (Digital Marketing, Web Development [open], Application Development, Strategy, Digital Advertising).
5. **Trusted by Awesome Clients**: title left, prev/next right, 6 logo tiles carousel.
6. **What They Say About Us**: testimonial card (808 wide) + photo (416×360) with company logo and name/role; numbered pagination 1–4.
7. **Our Creative Atmosphere**: title with small decorative arrows doodle, 1296×560 image radius 8.
8. **Awards**: "Award-winning designs featured by" + 4 award logos with captions.
9. **Latest From Our Blog**: full-width gray-100 bg, 1 vertical card + 2 horizontal cards, outline "More blog posts" button.
10. **Contact CTA**: gradient box overlapping the end of the blog bg — "Want to work with us? Let's talk" / email / "Contact us".
11. Footer.

### Services — `Services {A}.png` (`/services`)
Breadcrumb + "Services Page" H1 + subtitle; 6 service cards in a 3×2 grid (Custom Software Development, Software Integration, Mobile App Development, Business Analytics, Software Testing, Project Management — icon, title, text, link to details); "What Our Clients Say" testimonial slider; "Why Choose Us?" (4 checklist items: Build a functional prototype in 24 hrs / Create an MVP within two weeks / Kickstart software development / Get 24/7 tech & business support); "Get in Touch" contact form (left: Contact Info phone/email/address; right: form + "I agree to the Terms & Conditions" checkbox); footer.

### Service Details — `Service Details (A).png` (`/services/:slug`)
Hero (breadcrumb Homepage › Services Page › Single Service, title "Custom Software Development", text, image); "What We Offer" (4 items: Success Guarantee, Innovative Solutions, Professional Team, On Time Service — horizontal scroll/slider of cards); "How We Work?" 4 numbered steps (Identifying the problem → Conducting a research → Creating low-fidelity prototypes → Building an MVP version); "Trusted by Leading Companies" logos; two image/text content blocks (app mockup UI screenshot + "Product development with the best experience" with check list); full-width CTA "Ready to get started? Launch Your Project with Us"; footer.

### Portfolio — `Portfolio  (B).png` (`/portfolio`)
Breadcrumb + "Grid View" H1; filter tabs (All Works, Web Design, Graphic Design, Branding, UI / UX, Motion Design); grid of project cards with alternating widths 746/526 × 420 (image radius 8, title + category tags under it); numbered pagination; banner "Ready to get started? Take Your Business to the Next Level" with 382px illustration; footer.

### About — `About (A).png` (`/about`)
Header: breadcrumb, "About Silicon" title + paragraph, stats (2,480 Remote Sales Experts · 1,200 Requests per Week · 760 New Clients per Month), "REVIEWED ON" Clutch-style rating with "49 reviews"; Features (3 cols); Video section (1296×600 image with centered play button → opens modal); Awards; "What Our Clients Say About Silicon" testimonial; Team grid (8 people, 306×320 photos, name + role, social icons on hover); gradient Contact CTA; "We Have Social Networks" (6 social tiles: Facebook, Instagram, Twitter, Linkedin, YouTube, Dribbble with handles); footer.

### Blog — `Blog  (A).png` (`/blog`)
Breadcrumb + "Grid View no Sidebar" title; category tabs (Home / Articles / Podcasts / About) + search; grid of blog cards; numbered pagination; "Don't Want to Miss Anything? Sign up for Newsletters" subscribe block with checkboxes (Daily Newsletter, Event Updates, Advertising Updates, Startups Weekly, Week in Review, Podcasts), email input, terms checkbox; footer.

### Blog Details — `Blog Details (B).png` (`/blog/:slug`)
Header 1920×700 cover image with dark overlay, breadcrumb (Homepage › Blog › Single Post), title "This Long-Awaited Technology May Finally Change the World", author/date/likes/comments/shares row; 2-column body: Post (966px: paragraphs, H3 "Paragraph Title", image 966×500, blockquote with author Jane Cooper, PROS/CONS lists) + sticky Sidebar (234px: author, "5 min read", like/share buttons, "Enjoy this post? Join our newsletter" form); Comments (4 comments with nested replies + "Leave a Comment" form with "Save my name..." checkbox); "Related Articles" slider; footer.

### Contact — `Contact (A).png` (`/contact`)
Hero 664px: breadcrumb, "Want to work with us?" / "Let's talk!" title, email + phone cards, contact form; footer.

### 404 — `404 Error (A).png` (`*`)
Full-screen: large illustration/number, "Error 404", "The page you are looking for was moved, removed or might never existed.", "Go to homepage" button; copyright.

---

## 7. Assets

Extracted raster images: `design-reference/assets/images/` named `<page>--<section>--<kind>-<WxH>.<ext>`
(e.g. `home-page--projects--image-416x856.jpg`). Extra images that live inside components are in `assets/images/misc/`.
⚠ `blog-card--image--image-387x300.jpg` is 6.5 MB — compress/convert to WebP before use.

Vector graphics (hero sphere, line shapes, logo, client & award logos, feature icons) are not raster images in the file; recreate them as SVG / CSS, or export them as SVG from Figma into `src/assets/svg/`.
