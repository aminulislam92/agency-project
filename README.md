# Silicon — Digital Agency Website

A responsive React implementation of the **Silicon** digital-agency Figma design: 9 pages,
light/dark theme, a typed API layer with RTK Query, and a mock backend (MSW) that can be
swapped for a real Express/MongoDB API without touching components.

| Page            | Route             |
| --------------- | ----------------- |
| Home            | `/`               |
| Services        | `/services`       |
| Service Details | `/services/:slug` |
| Portfolio       | `/portfolio`      |
| About           | `/about`          |
| Blog            | `/blog`           |
| Blog Details    | `/blog/:slug`     |
| Contact         | `/contact`        |
| 404             | any other URL     |

## Tech stack

- **Vite 8 + React 19 + TypeScript** (strict)
- **Tailwind CSS v4** — CSS-first config; every design token lives in `@theme` in `src/index.css`
- **Redux Toolkit + RTK Query** — one `api` slice with injected endpoints
- **React Router 8** — data router with lazy-loaded routes
- **react-hook-form + zod** — all forms
- **Motion** — scroll reveals and small transitions (respects `prefers-reduced-motion`)
- **Swiper** — client logos, testimonials, "What We Offer" (mobile), related articles
- **MSW 3** — mock REST API in development
- **react-icons (Boxicons)**, **@fontsource-variable/manrope** (self-hosted)
- **ESLint** (typescript-eslint strict, type-checked) + **Prettier** (+ Tailwind plugin)
- **Playwright** — end-to-end tests and screenshot tooling

## Getting started

Requires **Node 20+** (developed on Node 24).

```bash
npm install
```

```bash
cp .env.example .env
```

```bash
npm run dev
```

Open http://localhost:5173. In development the mock API (MSW) is enabled by default, so
every page works without a backend.

## Scripts

| Script                 | What it does                                                                  |
| ---------------------- | ----------------------------------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                                                     |
| `npm run build`        | Type-check (`tsc -b`) and build to `dist/`                                    |
| `npm run preview`      | Serve the production build locally                                            |
| `npm run lint`         | ESLint (no `any`, strict type-checked rules)                                  |
| `npm run typecheck`    | TypeScript project build without emitting                                     |
| `npm run format`       | Prettier write (sorts Tailwind classes)                                       |
| `npm run format:check` | Prettier check (CI)                                                           |
| `npm run test:e2e`     | Playwright tests (desktop 1920px + mobile); starts the dev server             |
| `npm run images`       | Re-generate optimized WebP images from `design-reference/`                    |
| `npm run screenshot`   | Full-page screenshots: `npm run screenshot -- /about about --widths=1920,375` |
| `npm run compare`      | Side-by-side design vs build images in `screenshots/compare/`                 |

First-time Playwright setup: `npx playwright install chromium`.

## Environment variables

See `.env.example`.

| Variable          | Default | Description                                                                                           |
| ----------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `VITE_API_URL`    | `/api`  | Base URL for every API request (no trailing slash needed)                                             |
| `VITE_ENABLE_MSW` | —       | Dev: mocks are **on** unless `false`. Production build: mocks are **off** unless `true` (static demo) |

## Project structure

```
src/
  app/                store.ts, hooks.ts (typed useAppDispatch / useAppSelector)
  services/           api.ts (createApi + baseUrl) and injected endpoints:
                      projectsApi, postsApi, servicesApi, companyApi
  mocks/              MSW: browser.ts, handlers.ts, data/* (typed mock data)
  features/theme/     themeSlice (light/dark, localStorage, prefers-color-scheme), ThemeSync
  components/
    ui/               Button, IconButton, Badge, Input, Textarea, Select, Checkbox, Toggle,
                      Accordion, Tabs, Pagination, Breadcrumb, SectionHeading, Container,
                      Logo, Avatar, Rating, Skeleton, ErrorState
    layout/           Navbar (+ ServicesDropdown, MobileMenu, ThemeToggle), Footer,
                      RootLayout, ScrollToTop, RouteError, PageLoader
    shared/           BlogCard, ProjectCard/ProjectTile, ServiceCard, TeamCard,
                      TestimonialSlider, ClientsCarousel, Awards, FeaturesRow, GradientCTA,
                      NewsletterForm, ContactForm, PageHeader, SocialLinks, VideoModal,
                      ProjectLightbox, Reveal, CountUp, logos (SVG client/award marks)
    decor/            StripedSphere, GradientLines, ConcentricLines, Rays (SVG/CSS art)
  pages/<Page>/       index.tsx + sections/*.tsx (one component per design section)
  lib/                cn (tailwind-merge), config, errors, format, slug, zodResolver
  types/              shared domain types — the API contract
  assets/images/      optimized WebP images (generated by `npm run images`)
scripts/              optimize-images, screenshot, compare
tests/                Playwright specs
design-reference/     Figma exports: DESIGN_SPEC.md, full-page PNGs, raw images
```

## Design tokens

All values from `design-reference/DESIGN_SPEC.md` are defined once in `src/index.css`:

- **Colours:** `primary`, `gray-100…900`, `success`/`danger`/`warning`/`info`, plus semantic
  colours (`surface`, `card`, `heading`, `body`, `muted`, `border`, …) that switch in dark mode.
  The default Tailwind palette is removed, so only design colours can be used.
- **Type scale:** `text-display-1/2`, `text-h1…h6`, `text-lead`, `text-body-xl/l/m/s/xs`, `text-nav`
- **Shadows:** `shadow-card`, `shadow-brand`, `shadow-secondary`, `shadow-md`
- **Utilities:** `bg-brand-gradient`, `text-gradient`, `bg-hero`

Dark mode uses the `dark` class on `<html>` (`@custom-variant dark`). It is toggled from the
navbar, saved to `localStorage`, and follows the OS setting until the visitor chooses.

If you add a token, also add it to `src/lib/cn.ts` so `tailwind-merge` resolves overrides
correctly.

## Connecting a real backend (Express / MongoDB)

Components only talk to RTK Query hooks; the URLs below are the whole contract.

1. Implement the endpoints below (the request/response types are in `src/types/index.ts`).
2. Point the app at your server and turn mocks off:

   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_ENABLE_MSW=false
   ```

   Either enable CORS for the dev origin, or keep `VITE_API_URL=/api` and add a proxy to
   `vite.config.ts`:

   ```ts
   server: { proxy: { '/api': 'http://localhost:5000' } }
   ```

3. Restart `npm run dev`.

### Endpoints

| Method | Path                    | Query / body                                                   | Response                     |
| ------ | ----------------------- | -------------------------------------------------------------- | ---------------------------- |
| GET    | `/projects`             | `category?`, `page?`, `pageSize?`, `featured?=true`            | `Paginated<Project>`         |
| GET    | `/posts`                | `category?`, `search?`, `page?`, `pageSize?`, `featured?=true` | `Paginated<PostSummary>`     |
| GET    | `/posts/:slug`          | —                                                              | `Post` (404 if missing)      |
| GET    | `/posts/:slug/related`  | —                                                              | `PostSummary[]`              |
| GET    | `/posts/:slug/comments` | —                                                              | `Comment[]`                  |
| POST   | `/posts/:slug/comments` | `{ name, email, text, parentId?, replyTo? }`                   | `Comment` (201)              |
| GET    | `/services`             | —                                                              | `Service[]`                  |
| GET    | `/services/:slug`       | —                                                              | `Service` (404 if missing)   |
| GET    | `/team`                 | —                                                              | `TeamMember[]`               |
| GET    | `/testimonials`         | —                                                              | `Testimonial[]`              |
| GET    | `/clients`              | —                                                              | `Client[]`                   |
| GET    | `/awards`               | —                                                              | `Award[]`                    |
| POST   | `/contact`              | `{ name, email, message, service?, phone? }`                   | `{ success, message }` (201) |
| POST   | `/newsletter`           | `{ email, topics? }`                                           | `{ success, message }` (201) |

Notes:

- `Paginated<T>` is `{ items, page, pageSize, total, totalPages }`; `page` is 1-based.
- `category` is the display name (`"Web Design"`, `"Tips & Advice"`); the UI keeps URL-friendly
  slugs in the address bar and maps them back.
- Errors: return a non-2xx status with `{ "message": "…" }`. That message is shown in the UI.
- Comments support one level of nesting: `parentId` is the thread root, `replyTo` the name
  shown as an @mention.
- Image fields (`image`, `avatar`, `photo`, …) are URLs. The mocks use bundled assets; a
  backend would return CDN or upload URLs.
- `src/mocks/handlers.ts` is a working reference implementation of all of the above.

## Deployment

`npm run build` outputs a static SPA in `dist/`. Configure your host to rewrite unknown paths
to `index.html` (Netlify `_redirects`: `/* /index.html 200`; Vercel rewrites; nginx
`try_files $uri /index.html`).

For a backend-less demo deploy, build with `VITE_ENABLE_MSW=true`; the service worker
(`mockServiceWorker.js`) is emitted to `dist/` automatically.

## Testing

```bash
npm run test:e2e
```

Playwright runs every spec on a 1920px desktop and a Pixel 7 profile. The specs cover
navigation (sticky navbar, keyboard-accessible Services dropdown, mobile drawer, theme
persistence, 404), each page's data rendering, filters, pagination and URL state, and every
form (validation and successful submission against the mock API).

## Accessibility

- Semantic landmarks, a skip link, one `h1` per page, and alt text for meaningful images
- Visible focus rings; the dropdown, accordion, tabs, sliders and dialogs work from the keyboard
  (arrow keys, Home/End, Escape, focus trapping/restoration)
- Icon-only buttons have accessible names; live regions announce form results
- Motion is reduced when the OS asks for it

## Differences from the design

These were chosen on purpose:

- **Navbar** is the same on every page. Some designs show "Testimonials / Sign in / Sign up";
  the spec's version (Portfolio + "Contact us") is used everywhere.
- **Blog** toolbar follows the PNG (layout toggle, category select, search) instead of the
  spec's Home/Articles/Podcasts tabs.
- **Vector artwork** that only exists as vectors in Figma (logo, hero sphere, line shapes,
  client/award logos, Clutch badge, dashboard and Task Master mockups, 404 robot) was
  recreated in SVG/CSS by eye. Exporting the originals as SVG from Figma into the components
  would make them exact.
- **About** team: the design had photos for only 2 of the 8 people; the rest use portraits
  from `design-reference/assets/images/misc`.
- **Share buttons:** Google+ no longer exists, so a "Copy link" button replaces it.
- Breadcrumbs show the real service or post title instead of "Single Service" or "Single Post".
- The copyright line reads "© <current year>. All rights reserved by Md. Aminul Islam" with a link
  to the author (name and URL in `src/lib/config.ts`).
