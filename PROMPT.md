You are building a production-quality, pixel-accurate marketing website for a digital agency called "Silicon" from a Figma design. Work inside the current folder.

## Source of truth (read these first, before writing any code)

1. `design-reference/DESIGN_SPEC.md` — exact design tokens (fonts, colors, shadows, radii, spacing), component specs, and a section-by-section breakdown of every page. Every value there was extracted from the Figma file; use them exactly.
2. `design-reference/*.png` — full-page 1920px screenshots of all 9 pages. Open each one and study it before building that page. Match layout, spacing, alignment, and hierarchy as closely as possible.
3. `design-reference/assets/images/` — the real images from the design, named `<page>--<section>--<kind>-<WxH>`. Use them; don't use placeholders for anything that exists here.
4. `Digital Agency.fig` is the original file (binary, for reference only; you don't need to parse it).

## Tech stack (use the latest stable versions — check with `npm view <pkg> version` before installing; do not pin old majors from memory)

- Vite + React + TypeScript (`npm create vite@latest . -- --template react-ts`), strict mode on
- Tailwind CSS v4 via `@tailwindcss/vite` with CSS-first config: define ALL design tokens from DESIGN_SPEC.md in `@theme` inside `src/index.css` (colors, `--font-sans: "Manrope"`, font sizes with line-heights for display-1/2, h1–h6, body-lead/xl/l/m/s/xs, shadows, radii). No hard-coded hex values in components — only tokens.
- Redux Toolkit + RTK Query (`@reduxjs/toolkit`, `react-redux`)
- React Router (latest, `react-router`) with lazy-loaded routes
- `react-icons` (Boxicons set `react-icons/bi` — the design uses Boxicons)
- `react-hook-form` + `zod` for forms
- `motion` (Framer Motion) for subtle scroll-reveal / hover animations
- `swiper` for the client-logo, testimonial, "What We Offer" and related-articles sliders
- MSW (`msw`) for mock API in development
- ESLint + Prettier (with `prettier-plugin-tailwindcss`)
- Font: Manrope (400/600/700/800) via `@fontsource-variable/manrope` (self-hosted). Do not load Poppins.

## Architecture

```
src/
  app/            store.ts, hooks.ts (typed useAppDispatch/useAppSelector)
  services/       api.ts (createApi base, baseUrl from import.meta.env.VITE_API_URL) + injected endpoint files
  mocks/          MSW handlers + typed JSON data (projects, posts, services, team, testimonials, clients, awards, comments)
  features/theme/ themeSlice.ts (light/dark, persisted to localStorage, respects prefers-color-scheme)
  components/ui/  Button, Badge, Input, Textarea, Checkbox, Toggle, Accordion, Pagination, IconButton, SectionHeading, Container, Breadcrumb, Logo (inline SVG)
  components/layout/ Navbar, Footer, RootLayout, ScrollToTop
  components/shared/ BlogCard (horizontal + vertical), ProjectCard, ServiceCard, TestimonialSlider, ClientsCarousel, Awards, FeaturesRow, GradientCTA, NewsletterForm, TeamCard
  pages/          Home, Services, ServiceDetails, Portfolio, About, Blog, BlogDetails, Contact, NotFound (each page split into section components under pages/<Page>/sections/)
  types/          shared TS interfaces
```

## RTK Query

Create one `api` slice with `tagTypes` and these endpoints (typed, with loading skeletons and error states in the UI):

- queries: `getProjects({category, page})`, `getPosts({category, page, search})`, `getPostBySlug`, `getRelatedPosts`, `getComments(postSlug)`, `getServices`, `getServiceBySlug`, `getTeam`, `getTestimonials`, `getClients`
- mutations: `sendContactMessage`, `subscribeNewsletter`, `addComment` (invalidates the post's comments)
  MSW serves these from `src/mocks` in dev, so I can later point `VITE_API_URL` at my own Express/MongoDB (MERN) backend without changing components. Add `.env.example`.

## Routes

`/` Home · `/services` · `/services/:slug` · `/portfolio` · `/about` · `/blog` · `/blog/:slug` · `/contact` · `*` 404.
Navbar "Services" has a dropdown listing the 6 services. Active link uses primary color.

## Design rules

- Container: 1296px content width (`max-w-[1296px] mx-auto px-4 md:px-6`), 24px grid gutter, ~96–112px vertical section spacing on desktop.
- Reproduce the decorative visuals in code: hero radial background + blurred glare, gradient striped sphere (SVG with the brand gradient), thin gradient rounded line shapes, gradient CTA box with white concentric line shapes, gradient text on the highlighted hero word.
- Light/Dark toggle in the navbar must actually work (Tailwind `dark:` variant via `@custom-variant dark (&:where(.dark, .dark *))`); dark palette is in DESIGN_SPEC.md §2.
- Fully responsive: design is 1920 desktop; make sensible tablet (768) and mobile (375) layouts — hamburger menu with slide-in drawer, stacked grids, scaled-down type (see spec).
- Navbar: sticky, becomes white/blurred with shadow after scrolling.
- Hover/focus states on every interactive element; accessible (semantic HTML, alt text, aria labels on icon buttons, keyboard-navigable accordion/tabs/dropdown, visible focus rings, color contrast AA).
- Images: lazy-load, explicit width/height, compress the 6.5 MB blog-card image (convert large images to WebP).
- SEO: per-page `<title>`/meta description (React 19 native `<title>`/`<meta>` in components).

## Working process

1. Read DESIGN_SPEC.md and view all PNGs. Then show me a short plan (folder structure, token list, component list) and wait for my OK.
2. Scaffold the project, install packages, set up Tailwind tokens, fonts, store, router, MSW, layout (Navbar + Footer). Run the dev server and confirm it works.
3. Build the shared UI components, then pages in this order: Home → Services → Service Details → Portfolio → About → Blog → Blog Details → Contact → 404.
4. After each page: run `npm run build` and `npm run lint` (fix all errors and TS errors — no `any`), then take a screenshot of the page at 1920px width (use Playwright) and compare it side-by-side with the matching PNG in `design-reference/`. Fix spacing, font sizes, colors and alignment differences before moving on. Also check 375px width.
5. Finish with a README (setup, scripts, env vars, folder structure, how to connect a real backend).

Commit to git after each completed page with a clear message.
