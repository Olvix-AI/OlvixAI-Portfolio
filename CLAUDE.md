# CLAUDE.md

## What this is

A **Next.js 16 (App Router) web app** — the marketing site for **OlvixAI** (olvix.io),
a four-person studio that builds AI products end-to-end and adds AI into software that
already exists.

It started as a v0-generated template, and the design still comes from there — but the
repurposing is done. **The copy is now real and approved.** Don't treat it as placeholder
any more: the source of truth for every string is in `docs/`, and changes should go
through those docs first.

- `docs/OlvixAI-Offering.md` — what the business actually sells
- `docs/Homepage-Copy.md` — site architecture + all home page copy, and *why* each
  section exists (including which template sections were deleted and what replaced them)
- `docs/Portfolio-Copy.md` — `/portfolio`, the six case studies, and their open flags
- `docs/Contact-Copy.md` — `/contact`

Two content rules that are deliberate, not accidental — don't "fix" them:
1. **No compliance certifications are claimed anywhere.** The template shipped SOC 2 /
   ISO 27001 / HIPAA / GDPR badges. OlvixAI holds none of them. The security section
   sells demonstrable practices instead.
2. **There are no testimonials, because none exist on record.** The rotating component
   that looks like a testimonial carousel is a *work* teaser. Don't populate it with
   invented quotes.

Of the six case studies, **two are commercial client work — PowerUp and Trading
Operations.** Agentic Decks is an employer's production feature, EpochsLab is OlvixAI's
own product (still in development), and HRXpert and KairosAI are academic capstones. Each
page carries its true `Type` label as `meta[0]` — that labelling is intentional and must
not be softened to make the portfolio look more commercial.

Two open flags on Trading Operations, both recorded in `docs/Portfolio-Copy.md` §F:
the page names the client (SMC Group), which the site's own ownership section promises not
to do without written sign-off; and the source case study's live URL is a raw IP over
plain HTTP, deliberately **not** published.

**This is web only. It is not React Native.** See "Unused dependencies" below.

## Commands

```bash
npm run dev     # dev server -> http://localhost:3000
npm run build   # production build
npm start       # serve production build
npm run lint    # eslint (note: eslint is NOT in devDependencies; this will fail as-is)
```

Install with `npm install --legacy-peer-deps`. Several Radix/React deps declare peer
ranges that predate React 19, so a plain `npm install` errors out. A `pnpm-lock.yaml`
is checked in from v0 but npm is what's being used here.

## Architecture

```
app/
  layout.tsx            # root layout: 3 Google fonts -> CSS vars, Vercel Analytics,
                        #   title.template so child routes get "X — OlvixAI"
  page.tsx              # the landing page: 11 sections in a deliberate order
  globals.css           # THE stylesheet — design tokens, @theme, custom utilities
  portfolio/
    page.tsx            # the work index
    [slug]/page.tsx     # one template, six case studies, generateStaticParams
  contact/page.tsx      # server shell -> <ContactSection /> + <ContactFaq />
components/
  landing/              # the landing page — one file per section
  portfolio/            # case-study primitives (hero, meta, stack/results tables,
                        #   decision block, gallery, counter)
  contact/              # contact section, the form, the mini-FAQ
  ui/                   # shadcn/ui (new-york). ~55 components; `button`, `accordion`
                        #   and the form primitives are used, the rest is scaffolding
  theme-provider.tsx    # next-themes wrapper — NOT wired into layout.tsx
lib/
  projects.ts           # ALL case-study content + the home page teaser copy
  utils.ts              # cn()
docs/                   # the copy source of truth — see "What this is"
```

`app/page.tsx` is a flat list of sections. To add/remove/reorder one, edit that file and
add a matching file in `components/landing/`.

**`lib/projects.ts` is the single source of truth for the six projects.** The index, the
six case-study pages, the home page "Selected work" teaser and the footer's Work column
all read from it. Deleting a project object removes it from all four — prev/next wraps
automatically, and the only manual follow-up is renumbering `number` on the remaining
projects. (This matters: publishing Agentic Decks is still pending an NDA check.) `card`
and `teaser` hold deliberately different copy for the index card and the home teaser
respectively.

It is also canonical for **page prose**. `docs/Portfolio-Copy.md` holds the full text for
PowerUp, Agentic Decks, HRXpert and KairosAI for historical reasons, but Trading
Operations and EpochsLab were authored directly in `lib/projects.ts`, and the doc records
only their reasoning and flags. Edit prose in `lib/projects.ts`; don't reintroduce a
second copy of it.

Path alias: `@/*` -> repo root (e.g. `@/components/ui/button`).

### Section names vs. filenames

Several landing components kept their template filenames but carry different content
now. Don't be misled by the filename:

| File | What it actually is | Anchor |
|---|---|---|
| `infrastructure-section.tsx` | "A demo is easy. Production is the job." (inverted) | — |
| `testimonials-section.tsx` | "Selected work" — a `/portfolio` teaser, **not** testimonials | `#work` |
| `features-section.tsx` | "Four engineers. Every layer." | `#features` |
| `integrations-section.tsx` | "Capabilities & stack" | `#stack` |
| `security-section.tsx` | "You own it. All of it." — ownership, not compliance | `#ownership` |

Renaming them is safe and welcome; it just needs `app/page.tsx` updated in the same pass.

## Design system

Defined entirely in `app/globals.css` via Tailwind v4's `@theme inline`. There is no
`tailwind.config.js` — do not create one; add tokens to the `@theme inline` block.

**Fonts** (loaded in `layout.tsx`, exposed as CSS vars):
- `font-sans` — Instrument Sans (body, default)
- `font-display` — Instrument Serif (all headings; a custom utility, not a Tailwind default)
- `font-mono` — JetBrains Mono (eyebrows, labels, code, stat captions)

**Color** — warm near-monochrome in oklch. There is no accent hue. The palette is
`--background` (off-white), `--foreground` (near-black), and `--muted-foreground`.
Contrast comes from `text-foreground/70`, `bg-foreground/10`, `border-foreground/10`
style opacity modifiers rather than distinct colors. Inverted sections flip to
`bg-foreground text-background` and use `background/NN` opacities. `--radius` is
`0.25rem` (sharp), but most interactive elements override to `rounded-full`.

**Custom utilities** in `globals.css`: `.font-display`, `.text-stroke` (outlined
headline text), `.marquee` / `.marquee-reverse`, `.noise-overlay` (film grain, applied
to `<main>`), `.animate-char-in` (per-letter blur-in), `.line-reveal`, `.hover-lift`,
`.letter-spin`, `.border-sketch`.

## Section conventions

Every file in `components/landing/` follows the same shape. Match it when adding new ones.

- `"use client"` at the top — all 16 are client components.
- Container: `max-w-[1400px] mx-auto px-6 lg:px-12`.
- Vertical rhythm: `py-24 lg:py-32`.
- Scroll reveal: local `IntersectionObserver` in a `useEffect`, toggling a boolean
  that drives `opacity-100 translate-y-0` vs `opacity-0 translate-y-4`. Staggering is
  done with inline `style={{ transitionDelay: \`${i * 100}ms\` }}`. There is no
  animation library — no Framer Motion.
- Section header pattern: a mono "eyebrow" (`<span className="w-8 h-px bg-foreground/30" />`
  + label) above an `font-display text-4xl lg:text-6xl` heading whose second line is
  dimmed to `text-muted-foreground`.
- Content lives in a `const` array at the top of the file (features, steps, plans,
  metrics, footerLinks). **This is where copy changes go.**
- Section anchor `id`s connect to `navLinks` in `navigation.tsx` and `footerLinks` in
  `footer-section.tsx` — update all three together when renaming a section.

## Known state / gotchas

- **Dark mode is not implemented.** `@custom-variant dark` is declared in
  `globals.css` but there is no `.dark` token block, `ThemeProvider` is never mounted
  in `layout.tsx`, and the canvas components hardcode `rgba(0, 0, 0, ...)`. Enabling
  dark mode is real work, not a toggle.
- **`styles/globals.css` is dead.** It's the stock shadcn palette, imported by nothing.
  `app/globals.css` is the live one. Don't edit the wrong file.
- **`next.config.mjs` sets `typescript.ignoreBuildErrors: true`** and
  `images.unoptimized: true`. Type errors will not fail the build — run
  `npx tsc --noEmit` yourself if you want them caught. As of the last check it passes
  clean, so keep it that way.
- `next build` rewrites `tsconfig.json` on first run (adds `.next/dev/types` to
  `include`) and generates `next-env.d.ts`. Both are expected; `next-env.d.ts` is
  gitignored.
- The `animated-*.tsx` components are hand-written 2D `<canvas>` ASCII art driven by
  `requestAnimationFrame`. They are not 3D and use no library.
- `how-it-works-section.tsx` is the only file using `<style jsx>`; everything else is
  Tailwind + `globals.css`.
- **The contact form does not send anything.** `submitContactForm()` at the top of
  `components/contact/contact-form.tsx` awaits a timer and resolves. Everything else —
  validation, the focusable error summary, all four states, the honeypot, the
  localStorage draft — is real. The `TODO(backend):` block above it has paste-ready
  bodies for both a Formspree endpoint and a `POST /api/contact` route handler. The
  contract to preserve: it resolves on success and **throws** on failure; the error
  state is driven by the throw. Server-side re-validation is still required (`zod` is
  already a dependency).
- Status dots use literal `bg-green-500` / `bg-green-400` — the only non-token colors
  in the design.
- **Reduced motion is honoured in two places and you need both.** `globals.css` has a
  `prefers-reduced-motion` block that flattens CSS animation and transition, but the
  `<canvas>` pieces run on `requestAnimationFrame`, which CSS can't reach — each of the
  three `animated-*.tsx` files checks `matchMedia` itself and stops rescheduling after
  one frame. Add the same guard to any new canvas work.
- `html` carries `scroll-padding-top: 6rem` so anchor jumps don't land the target, and
  its focus ring, underneath the fixed nav.
- Screenshot galleries render from a `screenshots: []` array in `lib/projects.ts` that
  is **intentionally empty for every project**. The assets in `docs/` contain real
  names, contact details and health data and need a manual scrub (plus WebP conversion,
  since `images.unoptimized: true`) before they go in `public/`.
- **Nothing nondeterministic may be rendered during SSR.** Two hydration mismatches
  were already fixed here and the same shapes will reintroduce them:
  - `metrics-section.tsx` — the live clock is mount-gated (`useState<Date | null>(null)`,
    set inside `useEffect`) and uses a module-level `Intl.DateTimeFormat` pinned to
    `en-US`. The server renders the `--:--:-- --` placeholder. Don't seed time/random
    state in `useState` initializers.
  - `features-section.tsx` — `AI_ORBIT_NODES` precomputes the orbit geometry once and
    rounds to 3dp. `Math.sin`/`Math.cos` aren't spec'd to be correctly rounded, so Node
    and the browser can differ in the last ULP; that is enough to fail hydration when
    the value lands in JSX. Round any trig that reaches markup.
  - Canvas work in `animated-*.tsx` is exempt — it runs inside `useEffect`, so it never
    renders on the server.

## Unused dependencies — do not be misled

`react-native`, `expo`, `expo-gl`, `expo-asset`, `expo-file-system`, `three`, and
`@react-three/fiber` are listed in `package.json` but **imported nowhere in the
codebase**. They are v0 artifacts. Their presence does not mean this project is
mobile or uses 3D. They are being kept for now by choice — leave them installed, but
don't build on them without asking.

Likewise most of `components/ui/` is unused scaffolding. Only `button` is imported by
the landing page. Treat the rest as an available library, not as active code.

## SEO tooling

Three MCP servers are declared in `.mcp.json` (project scope) for the olvix.io SEO work.
None are authenticated yet — approve them on first use, then run `/mcp` to sign in.

| Server | Endpoint | Auth | Cost |
|---|---|---|---|
| `exa` | `mcp.exa.ai/mcp` | OAuth | free tier |
| `ahrefs` | `api.ahrefs.com/mcp/mcp` | OAuth | paid Ahrefs plan (Lite+) |
| `semrush` | `mcp.semrush.com/v2/mcp` | OAuth | paid Semrush plan |

- **Ahrefs and Semrush overlap heavily** (keywords, competitors, backlinks, rankings).
  Keep whichever one there's a subscription for and delete the other from
  `.mcp.json`; running both is redundant tool surface.
- No crawl/scrape server is configured. Bright Data was removed and Nimble was
  deliberately never added; re-add one only if a task needs raw page fetching that
  Exa can't cover.
- The `searchfit-seo` plugin is enabled in `.claude/settings.json` (from the
  `knowledge-work-plugins` marketplace). It is skills + agents, not an MCP server —
  no key, no overlap with the three above. It operates on this codebase: audits,
  schema/JSON-LD generation, internal linking, keyword clustering, content briefs.

## Working here

- Preserve the design language: serif display headings, mono eyebrows, monochrome
  opacity-based contrast, generous whitespace, restrained scroll reveals.
- Copy changes belong in the `const` data arrays at the top of section files, plus
  `metadata` in `layout.tsx`.
- Prefer editing an existing section over adding a parallel one.
- Reuse `components/ui/` before hand-rolling a primitive.
