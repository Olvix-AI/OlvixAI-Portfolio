# OlvixAI — Site Architecture & Home Page Copy

Draft v2. This pass **decides the section list from scratch** based on
[OlvixAI-Offering.md](OlvixAI-Offering.md), rather than fitting OlvixAI into the template's
sections. The v0 template is a source of *design*, not structure.

Companion docs:
- **[Portfolio-Copy.md](Portfolio-Copy.md)** — `/portfolio` index + a page per case study
- **[Contact-Copy.md](Contact-Copy.md)** — `/contact`, the quote request page

**No code changed yet.**

---

## What OlvixAI is, and what that means for the page

A four-person **services business**. It sells two things — building AI products from
scratch, and putting AI into software that already exists — to funded startups and existing
SaaS companies, leaning US/EU. Nobody signs up. Nobody self-serves. Every deal starts with
a conversation and ends in a quote.

That single fact invalidates most of the template's structure. The template is a **product**
landing page: it sells a platform you sign up for, priced in tiers, consumed through an
SDK, with uptime SLAs and compliance badges. An agency page has a different job:

| A product page must… | An agency page must… |
|---|---|
| Explain the product | Explain what you'll do *for me* |
| Show pricing tiers | Get me to describe my project |
| Prove the platform is reliable | Prove *these specific people* can build it |
| Convert to signup | Convert to a conversation |
| Handle "which plan?" | Handle "can I afford this / how long / who owns it" |

So: pricing is gone, the SDK section is gone, the fake telemetry is gone. In their place go
the three things an agency page can't do without — **the two services stated plainly**, **the
work**, and **objection handling** (FAQ + ownership + a real contact page).

### Site map

```
/                        Home — 9 content sections, below
/portfolio                    The work                 → Portfolio-Copy.md
/portfolio/powerup            ┐
/portfolio/trading-operations │
/portfolio/agentic-decks      │ one [slug] template,
/portfolio/epochslab          │ six projects
/portfolio/hrxpert            │
/portfolio/kairosai           ┘
/contact                      Get a quote              → Contact-Copy.md

Later, if worth it:
/about                   The team, at length
/services/new-builds     ┐ SEO landing pages, if you start
/services/ai-integration ┘ running ads or ranking for terms
```

---

## Section plan

### Home page, in order

| # | Section | Job it does | Design source |
|---|---|---|---|
| 1 | Navigation | Route, and one CTA | `navigation.tsx` |
| 2 | Hero | What we do, in one breath + proof | `hero-section.tsx` |
| 3 | **Services** | The two offers, stated plainly | **NEW** — `services-section.tsx` |
| 4 | From demo to production | The actual differentiator | `infrastructure-section.tsx` |
| 5 | Selected work | Proof these people can build | `testimonials-section.tsx` |
| 6 | Four engineers, every layer | Breadth without subcontractors | `features-section.tsx` |
| 7 | How we work | De-risk the engagement | `how-it-works-section.tsx` |
| 8 | Capabilities & stack | Answer "can you do X?" | `integrations-section.tsx` |
| 9 | What you own | Kill the ownership/security objection | `security-section.tsx` |
| 10 | **FAQ** | Kill everything else, incl. price | **NEW** — `faq-section.tsx` |
| 11 | CTA | Send them to `/contact` | `cta-section.tsx` |
| 12 | Footer | — | `footer-section.tsx` |

Nine content sections. The order is a sales argument, not a feature list: **what we do → why
us → proof → who we are → how it goes → can you do my thing → what I keep → what it costs →
talk to us.**

### Removed, and why

| Removed | Why | Where that need goes instead |
|---|---|---|
| `pricing-section.tsx` | A services business has no rate card. Publishing "$29/mo" tiers for custom engineering work is nonsense, and publishing three "Custom" columns is worse — it's a page that answers nothing. | FAQ: "How much does this cost?" + the **budget field on `/contact`**. That combination answers the question *and* qualifies the lead, which a pricing table can't do. |
| `developers-section.tsx` | There is no SDK, no npm package, no docs site, no GitHub org. Every word in it would be invented. | The stack section (8) already signals technical credibility, honestly. |
| `metrics-section.tsx` | A green `Live` dot and a ticking clock over four counters implies live telemetry from a fleet you don't run. And studio-scale numbers — 4 engineers, 4 projects — are too small to carry an 8xl animated counter. | Its `AnimatedCounter` is genuinely good: move it to the **case-study Results tables**, where real measured numbers live. |
| Testimonials, as testimonials | There are none on record. HRXpert's case study says so explicitly; PowerUp and KairosAI captured none. | Same component, repurposed as **Selected work** (5). Template for a real quote kept in that section for when PowerUp Global gives you one. |

### Added

| Added | Why it's non-negotiable |
|---|---|
| **`services-section.tsx`** | The offering doc's whole first half is "we do two things." The template has no section that states an offer. This is the most important section on the page and it has to be built. |
| **`faq-section.tsx`** | For a services buyer, the FAQ *is* the pricing page, the process page and the risk assessment. It's also the highest-value SEO block on the site. `components/ui/accordion` is already in the repo and unused. |
| **`/contact`** | Every CTA on the site needs somewhere to land. See [Contact-Copy.md](Contact-Copy.md). |
| **`/portfolio` + 4 pages** | Four case studies is a real portfolio and it's the single strongest asset OlvixAI has. It doesn't fit on a landing page. See [Portfolio-Copy.md](Portfolio-Copy.md). |

### Visual rhythm

The template alternates inverted bands (`bg-foreground text-background`). With the new
order, put inverted treatment on **§4 (From demo to production)** — the wedge deserves the
emphasis and it breaks up the run of light sections early — and keep **§7 (How we work)**
inverted as it already is. The CTA's dark card closes the page. Everything else stays on
`--background`. Three dark moments across a long page is the right count; more and the
monochrome palette stops reading as restraint.

---

## Two things that need your call before this ships

**1. The security section's certification badges have to come down.** The template ships
`SOC 2`, `ISO 27001`, `HIPAA`, `GDPR`, `CCPA` chips and a "SOC 2 Type II — independently
audited" card. Those are audited certifications a four-person studio doesn't hold, and
procurement teams verify them. §9 is rewritten around ownership and practices you can
actually demonstrate — which sells better to this buyer anyway. Same problem, smaller, in
the infrastructure section's "17 data centers / 99.99% uptime SLA" — rewritten in §4.

**2. Two of the six case studies are client work.** PowerUp and Trading Operations are
real commercial engagements. Agentic Decks is production work a team member did inside
their employer's product, EpochsLab is OlvixAI's own product and still in development, and
HRXpert and KairosAI are academic capstones built to production standard. Every mention
carries its true label. Don't quietly drop those labels to make the portfolio look more
commercial — a prospect who finds out later discounts the entire site, and the work is
strong enough to stand up labelled honestly.

**3. The portfolio now demonstrates an audience the site doesn't claim.**
`OlvixAI-Offering.md` says the buyers are funded startups building an AI product and SaaS
companies adding AI to one. Trading Operations is neither: it's an established
import/export trading business whose operations ran on spreadsheets. That's arguably the
most commercially interesting segment in the portfolio — there are far more of those
companies than there are funded AI startups — but the Services section (§3) doesn't
mention them, so the site's best proof point sits outside its stated market. Broadening
the closing line of §3 is a one-sentence change; whether to reposition is a business call,
so it's flagged rather than done.

---

## Voice

Plain, technical, unhurried. The design is already confident; the copy shouldn't shout over
it.

- **Say the boring true thing.** "We also do the DevOps" beats "unleash the power of AI."
- **Banned:** cutting-edge, revolutionary, seamless, unlock, empower, supercharge,
  game-changing, next-generation, bespoke, passionate, "we're not just an agency."
- **Numbers over adjectives.** `0.895 agreement with a human recruiter` is worth ten
  sentences about accuracy.
- **The wedge is repeated, never explained.** Anyone can demo. Almost nobody makes it hold
  up at 3am. Sections 2, 4, 6, 7 and 9 each hit it from a different side.
- **Write to one reader:** a technical founder or a CTO who has been burned by an agency
  before. They are scanning for evasion. Every vague sentence costs you.
- Sentence case everywhere except mono eyebrows. Serif headings stay two lines, second line
  dimmed — that's the established pattern; don't break it.

---

## Global

### `app/layout.tsx` — metadata

```
title:       OlvixAI — AI products, built end to end
description: We build AI-powered products from scratch, and add AI into software that
             already exists. Design, frontend, mobile, backend, agents — and the
             infrastructure that keeps it running once real users arrive.
```

Per-page titles (needed once there's more than one route):
```
/            OlvixAI — AI products, built end to end
/portfolio   Work — OlvixAI
/portfolio/… PowerUp — OlvixAI     (etc.)
/contact     Get a quote — OlvixAI
```

### Brand

| Slot | Value |
|---|---|
| Wordmark | `OlvixAI` |
| Superscript beside wordmark (currently `TM`) | `.io` — reads as the domain and doubles as a claim you can keep. Use `TM` only if the mark is registered. |
| Domain | olvix.io |
| Contact email | `hello@olvix.io` (assumed — confirm) |

### Anchor IDs

Section renames mean new IDs. These have to change together in `navigation.tsx`,
`footer-section.tsx` and the section components:

```
#services   #work   #how-we-work   #stack   #ownership   #faq
```

---

# 1 · Navigation — `navigation.tsx`

```js
const navLinks = [
  { name: "Services",     href: "#services" },
  { name: "Work",         href: "/portfolio" },
  { name: "How we work",  href: "#how-we-work" },
  { name: "FAQ",          href: "#faq" },
];
```

| Element | Current | New |
|---|---|---|
| Logo | Optimus | **OlvixAI** |
| Text link | Sign in | *(remove)* |
| Primary button | Start creating | **Get a quote** → `/contact` |
| Mobile: outline button | Sign in | **See our work** → `/portfolio` |
| Mobile: filled button | Start creating | **Get a quote** → `/contact` |

> **"Sign in" has to go.** It implies a product with accounts. There isn't one — it's a dead
> end in the first two seconds, and for an agency it actively misleads about what you're
> selling.
>
> ⚠ **Needs a code change:** `/portfolio` and `/contact` are routes, not anchors. The nav
> assumes `#` hrefs; real links need `next/link` and to skip the smooth-scroll handler. And
> on `/portfolio` or `/contact`, the `#` links must become `/#services` so they route home
> first.

---

# 2 · Hero — `hero-section.tsx`

**Eyebrow**
```
An AI product studio
```

**Headline** — line 1 static, line 2 is the rotating word slot
```
Line 1:  We build AI
Line 2:  that {word}.

const words = ["ships", "scales", "works", "lasts"];
```
> Reads as *We build AI that ships. / that scales. / that works. / that lasts.* All single
> words, so the per-character `animate-char-in` and the underline highlight behind the word
> keep working untouched. And the wedge is in the headline: the interesting claim isn't that
> you build AI, it's that it lasts.

**Sub-copy**
```
Two things. We build AI-powered products from scratch, and we add AI into software that
already exists. Design, frontend, mobile, backend, the agent logic itself — and the
infrastructure that keeps all of it standing when real users show up.
```

**CTAs**
```
Primary:    Get a quote     → /contact   (keeps the ArrowRight)
Secondary:  See our work    → /portfolio
```

**Stats marquee** — replaces the Netflix / Stripe / Linear / Notion block, which is
fabricated social proof on a site whose entire pitch is that it doesn't oversell. All four
below come from the case studies in `docs/`:

```js
{ value: "0.895",  label: "agreement with a human recruiter", company: "HRXPERT" },
{ value: "<320ms", label: "P95 API latency at 4x load",       company: "HRXPERT" },
{ value: "2",      label: "app stores, shipped and live",     company: "POWERUP" },
{ value: "8 mo",   label: "web rebuild plus native app",      company: "POWERUP" },
```

---

# 3 · Services — NEW `services-section.tsx`

**The most important section on the page, and the template has nothing for it.** The
offering doc is built on "we do two things"; the page has to say both, say who each is for,
and say what's included — because a prospect self-identifies here or leaves.

**Build notes.** Two columns on `lg`, stacked on mobile. Borrow from `features-section.tsx`:
the numbered mono label, the `border border-foreground/10` card, the `IntersectionObserver`
reveal with a `${i * 100}ms` stagger, and **reuse the existing `DeployVisual` and `AIVisual`
SVGs** — they're already written and abstract enough to carry this. Container
`max-w-[1400px] mx-auto px-6 lg:px-12`, `py-24 lg:py-32`, `id="services"`.

**Eyebrow** `What we do`

**Heading**
```
Two things.
Both of them all the way. ← dimmed line
```

## Card 01

```
number:   01
title:    New builds
for:      Founders and funded startups with an AI product to build
visual:   deploy

lead:
You have an idea for an AI-powered product — an app, a tool, a platform. We take it from
idea to a working product to a live, production-ready launch. One team for the whole
distance, so there's no week three where design is done and nobody can build it.

includes:
  Product design and UI/UX
  Frontend — web and mobile
  Backend, and the AI and agent logic itself
  Production setup — hosting, infrastructure, monitoring, security

outcome:  Idea → working product → live.
cta:      Get a quote  → /contact
```

## Card 02

```
number:   02
title:    AI into what you already have
for:      SaaS and software companies with a product and no AI in it — or a weak first attempt
visual:   ai

lead:
You already have a working website, app or SaaS. We add the AI into it — chatbots, agents,
automation, the smart features your roadmap has been carrying for a year — built into the
product you've got, not on top of a rebuild of it.

includes:
  AI agents and assistants inside your existing product
  Chat and voice interfaces
  Automation of the workflows your team does by hand
  Model selection, prompting and evaluation — and the cost work that keeps it affordable

outcome:  Shipped inside what you already run.
cta:      Talk to us  → /contact
```

**Closing line, below both cards**
```
We work with funded startups building an AI product, and with software companies adding AI
to one that already earns money. Local and international — most of our work leans US and EU.
```

> That last line is doing real work: it tells an enterprise procurement lead they're in the
> wrong place, and tells a Series A founder in Berlin they're in the right one. Qualifying
> out is worth as much as qualifying in when four people have to deliver everything sold.

---

# 4 · From demo to production — `infrastructure-section.tsx`

**Recommend inverting this section** (`bg-foreground text-background`, `background/NN`
opacities). It's the wedge — the one claim no competitor of this size can copy — and it
should be the first thing that breaks the page's visual rhythm.

The template's version claims 17 data centers, 6 continents and a 99.99% uptime SLA.
OlvixAI owns no data centers, and an SLA is a contract you'd have to honour. Repointed to
the clouds you genuinely ship to, which is the more useful thing anyway.

**Eyebrow** `Why us`

**Heading**
```
A demo is easy.
Production is the job. ← dimmed line
```

**Body**
```
Most small AI teams can build something impressive. Far fewer can make it reliable, secure
and stable once real users show up — because that work is a different discipline, and it's
usually somebody else's problem.

We do both. The AI and product work, and the DevOps and infrastructure that makes it hold,
under one team. No handoff, no second vendor, and no gap where the thing that breaks lives.
```

**Three stats** — replaces "17 / 99.99% / <50ms"
```
3        Clouds in production
2        App stores shipped
0        Critical vulnerabilities   ← OWASP ZAP, HRXpert
```

**The right-hand panel.** ⚠ **Needs a code change**: relabel the three columns from
`city / region / latency` to `platform / role / project`. The row layout and the
auto-cycling highlight work unchanged.

Panel label: `Edge Network` → **`Where we deploy`**

```js
{ city: "AWS",              region: "EC2 · Lambda · S3",   latency: "HRXpert" },
{ city: "Azure",            region: "Vision + OpenAI",     latency: "PowerUp" },
{ city: "Vercel",           region: "Web front ends",      latency: "KairosAI" },
{ city: "Kubernetes",       region: "Blue/green rollouts", latency: "Decks" },
{ city: "GitHub Actions",   region: "CI/CD on push",       latency: "All" },
{ city: "App Store · Play", region: "Release pipelines",   latency: "PowerUp" },
```

---

# 5 · Selected work — `testimonials-section.tsx`

Repurposed as a teaser for `/portfolio`. The existing fields map cleanly: `quote` → the
project's one-line pitch, `author` → project name, `role` → engagement type, `company` →
domain, `metric` → headline result.

> **As built, this section reads from `lib/projects.ts` rather than a local array.** Each
> project carries a `teaser: { pitch, engagement, domain, metric }`, and the name, slug
> and href come from the project itself. The literal objects below are the original spec
> and are kept for the wording; the shipped data lives in `lib/projects.ts`, which is
> where edits go.
>
> Two consequences of that, both intentional: the section now rotates through **all six**
> projects (`01 / 06`, six dots) and picks up any project added or pulled with no edit
> here; and it can never link to a slug that has stopped existing. If six rotations feels
> long at 5s each, the fix is a `featured` flag on `Project`, not a second hardcoded list.

**⚠ Needs a code change (small):**
- The blockquote wraps text in literal `"` marks — remove them.
- Label above: `What people say` → **`Selected work`**
- The author block links to `/portfolio/<slug>`.
- Add a `View all work →` link to `/portfolio` beside the dots.
- `Key Result` above the metric can stay verbatim.
- `id="work"`.

```js
{
  quote: "A B2B wellness platform rebuilt for the web, extended to iOS and Android, and
    taught to read a blood pressure monitor through the phone camera.",
  author: "PowerUp",
  role: "Client engagement",
  company: "Health-tech",
  metric: "Live on both app stores",
  href: "/portfolio/powerup",
},
{
  quote: "An agent that writes a real PowerPoint deck from a conversation, then edits any
    deck you upload without ever corrupting the file.",
  author: "Agentic Decks",
  role: "Production feature",
  company: "Enterprise AI",
  metric: "Live in production",
  href: "/portfolio/agentic-decks",
},
{
  quote: "Recruitment automation that scores a resume, runs a live voice interview and
    grades a developer's GitHub — inside one applicant tracking system.",
  author: "HRXpert",
  role: "In-house build",
  company: "HR-tech",
  metric: "0.895 agreement with a human recruiter",
  href: "/portfolio/hrxpert",
},
{
  quote: "A job-search platform that structures your resume, scrapes and ranks live
    listings against it, and fills in the application forms for you.",
  author: "KairosAI",
  role: "In-house build",
  company: "Career tools",
  metric: "Three pillars, one candidate profile",
  href: "/portfolio/kairosai",
},
```

**Marquee** — currently invented company names. Replace with capabilities, which is true
and does the same visual job:
```js
["Voice AI", "AI agents", "Computer vision", "RAG", "React Native", "Microservices",
 "MCP tool servers", "LangGraph", "DevOps", "Browser extensions"]
```
Marquee label: `Trusted by forward-thinking teams` → **`What we build with`**

**When a real quote lands**, drop it in with this shape. One real testimonial outperforms
everything else in this section, so PowerUp Global is worth an email today:
```js
{
  quote: "<verbatim, signed off by them>",
  author: "<name>",
  role: "<title>",
  company: "PowerUp Global",
  metric: "<the number they'd point at>",
},
```

---

# 6 · Four engineers, every layer — `features-section.tsx`

The template's 4-card grid with animated SVGs, repointed from platform features to **the
four layers OlvixAI covers**. This is the second half of the offering doc's differentiator
— "no need to hire separately for each layer" — and it doubles as the team section, which is
why there isn't a separate one.

**Eyebrow** `The team`

**Heading**
```
Four engineers.
Every layer. ← dimmed line
```

```js
{
  number: "01",
  title: "Product & design",
  description: "UI/UX from scratch, or a redesign of something people already bounce off.
    On PowerUp that meant rebuilding a long assessment around the fact that nobody
    finishes it in one sitting.",
  visual: "collab",
},
{
  number: "02",
  title: "Web & mobile",
  description: "Next.js on the web, React Native and Expo on mobile — one codebase to both
    stores, including the native health, camera and notification work that only exists on
    a phone.",
  visual: "deploy",
},
{
  number: "03",
  title: "Backend & agent logic",
  description: "NestJS and FastAPI, microservices with async workers, and the agent layer
    itself: tool design, orchestration, evaluation. The part most teams treat as a prompt
    and we treat as a system.",
  visual: "ai",
},
{
  number: "04",
  title: "Cloud & DevOps",
  description: "AWS, Azure, Vercel, Kubernetes. Containers, CI/CD on push, monitoring,
    access control, load testing, and both app store release pipelines.",
  visual: "security",
},
```

**Closing line below the grid**
```
Nobody gets handed to a subcontractor at a layer boundary, because there isn't one.
```

> Card order maps `collab → deploy → ai → security` so the padlock lands on infrastructure
> and the orbit visual lands on the AI card. Pure data change; the SVGs are untouched.

---

# 7 · How we work — `how-it-works-section.tsx`

Stays inverted. This is the risk-reduction section: the reader has been burned by an agency
before and is looking for the words "you'll see it working every week."

**Eyebrow** `How we work` · **Heading**
```
Three steps.
No surprises. ← dimmed line
```

```js
{
  number: "I",
  title: "Scope it properly",
  description: "A short paid discovery. We come back with what we'd build, what it costs,
    what we'd cut, and what we think is risky. You own that document either way — including
    if you take it to someone else.",
},
{
  number: "II",
  title: "Build it in the open",
  description: "Weekly demos against a real environment, not screenshots. You have commit
    access to your own repo from day one. Nothing is a black box you get handed at the end.",
},
{
  number: "III",
  title: "Ship it and keep it up",
  description: "We deploy it, instrument it, load-test it and hand over the keys —
    infrastructure included. Stay on retainer or don't; the product runs either way.",
},
```

**The `code` field.** Each step renders a monospace panel with a per-character reveal.
There's no SDK to show, so use it for the artefact each step actually produces — same visual
weight, honest content:

```js
// Step I
code: `scope/olvix-discovery.md

  ├─ problem            defined
  ├─ architecture       drafted
  ├─ risks              5 flagged
  ├─ timeline           11 weeks
  └─ fixed price        signed`,

// Step II
code: `week 04 — demo build

  ✓ auth + RBAC
  ✓ agent loop, 2 tools
  ⧗ voice pipeline
  ○ billing

  staging.yourapp.com`,

// Step III
code: `$ olvix ship --prod

  docker build         ok
  migrations           ok
  smoke tests    24/24 ok
  handover              →

  live. keys are yours.`,
```

**⚠ Needs a code change:** the panel chrome is hardcoded to `workflow.ts`. Make it dynamic
per step (`scope.md`, `week-04.log`, `ship.sh`) or replace it with the step title.

Also: `id="how-it-works"` → **`id="how-we-work"`** to match the nav.

---

# 8 · Capabilities & stack — `integrations-section.tsx`

Answers the question a technical buyer actually has: *have you done the specific thing I
need?* The section has two marquees — forward and reverse — currently rendering the same
array twice. **Use row 1 for capabilities and row 2 for stack.** That's a better section and
it's a five-line change.

**⚠ Needs a code change:** split the single `integrations` array into `capabilities` and
`stack`, and point the reverse marquee at the second one.

**Eyebrow** `Capabilities` · **Heading**
```
The tools we
actually use.
```

**Sub-copy**
```
Not a logo wall. Everything on this page is in something we've already shipped.
```

**Row 1 — capabilities**
```js
{ name: "AI agents",        category: "Tools, orchestration, evals" },
{ name: "Voice AI",         category: "Real-time, WebRTC" },
{ name: "Computer vision",  category: "Purpose-trained models" },
{ name: "RAG",              category: "Grounded on your documents" },
{ name: "Chat interfaces",  category: "Streamed, in-product" },
{ name: "Workflow automation", category: "Async, event-driven" },
{ name: "Document AI",      category: "Parse, generate, edit" },
{ name: "Browser extensions", category: "Act on any page" },
```

**Row 2 — stack**
```js
{ name: "OpenAI",       category: "GPT · Whisper · TTS" },
{ name: "Azure OpenAI", category: "Enterprise inference" },
{ name: "LangGraph",    category: "Agent orchestration" },
{ name: "MCP",          category: "Tool servers" },
{ name: "Next.js",      category: "Web frontend" },
{ name: "React Native", category: "iOS + Android" },
{ name: "FastAPI",      category: "AI services" },
{ name: "NestJS",       category: "Transactional backend" },
{ name: "PostgreSQL",   category: "Supabase · Neon" },
{ name: "MongoDB",      category: "Document store" },
{ name: "RabbitMQ",     category: "Async workers" },
{ name: "Kubernetes",   category: "Docker · CI/CD" },
```

`id="stack"`.

---

# 9 · What you own — `security-section.tsx`

**Rewritten to remove the certification claims** (see the note near the top) and repointed
at the objection this buyer actually has. It isn't "are you SOC 2 compliant" — it's *if this
goes wrong, or we stop working together, what am I left holding?* For a small studio selling
to a company betting a roadmap on you, that's the objection that kills deals.

**Eyebrow** `Ownership & security`

**Heading**
```
You own it.
All of it. ← dimmed line
```

**Body**
```
You're hiring a team, not renting a platform. Your repository, your cloud accounts, your
data, your models. We're not going to wave a compliance badge at you either — we'll show
you the auth model and the scan results from something we've already shipped, and build
yours to the same standard from the first commit.
```

**Feature cards** — icons unchanged (`FileCheck`, `Shield`, `Lock`, `Eye`):

```js
{
  icon: FileCheck,
  title: "Your repo, your accounts",
  description: "Commit access from day one, infrastructure in accounts you own, and a
    documented handover at the end. If you stop working with us, nothing stops working.",
},
{
  icon: Shield,
  title: "Security is a build step",
  description: "OWASP ZAP against every release, RS256-signed JWTs, role-based access
    enforced server-side, secrets in a vault and never in the repo. HRXpert shipped with
    zero high- or critical-severity findings.",
},
{
  icon: Lock,
  title: "Under NDA from the first call",
  description: "We sign before you describe the idea, not after. Nothing goes in our
    portfolio without your written sign-off.",
},
{
  icon: Eye,
  title: "AI that shows its work",
  description: "Every model output carries its reasoning and a human keeps the override.
    On PowerUp, nothing the vision model reads gets saved until the user confirms it.",
},
```

**Chips** — `certifications` becomes practices. Same array, same rendering:
```js
const certifications = ["OWASP ZAP", "RS256 JWT", "RBAC", "Least privilege",
                        "Secrets management", "Human in the loop", "NDA on request"];
```
> ⚠ Rename the const to `practices` when you touch the file, so nobody reads it later as a
> list of certifications and puts the badges back.

`id="ownership"`.

---

# 10 · FAQ — NEW `faq-section.tsx`

**This section replaces the pricing page.** For a services buyer the FAQ carries the price
question, the timeline question and the risk assessment — and unlike a pricing table it can
answer "it depends" honestly and still be useful. It's also the best SEO block on the site:
these are the literal phrases people search.

**Build notes.** Use `components/ui/accordion` — already in the repo, unused, and
new-york-styled to match. Two-column layout on `lg`: eyebrow + heading pinned left, the
accordion on the right (same split as the security section). Mono question labels, serif
nothing — questions are body text. `id="faq"`, container and rhythm as every other section.
First item open by default (`defaultValue="item-1"`) so the section doesn't read as a wall
of closed rows.

**Eyebrow** `Questions`

**Heading**
```
The things
everyone asks. ← dimmed line
```

```
Q: How much does this cost?
A: There's no rate card, because there's no standard project. What we do have is a
   consistent shape: a short paid discovery, then a fixed price for the build, then monthly
   if you want us to stay. You'll have a real number after one call and a written scope —
   not a range that moves once we start. Tell us what you're building and roughly what
   you've set aside, and we'll tell you straight away whether it's the right fit.

Q: How long does it take?
A: Most first launches land between two and four months. For scale: PowerUp was about eight
   months for a full web rebuild plus a native app on both stores; HRXpert was eight months
   for a microservices platform with real-time voice AI. Adding AI features into a product
   that already exists is usually weeks, not months. The discovery gives you a date, not an
   estimate.

Q: Do we own the code?
A: Yes. All of it, including the AI work, the prompts, the infrastructure definitions and
   any model we train for you. Your repository and your cloud accounts from day one.

Q: Can you work with our existing team and codebase?
A: That's half of what we do. On PowerUp the client's own developer owned the backend API —
   we owned the web front end, the mobile app, the vision model and DevOps, and specified
   the backend changes we needed rather than taking it over. Clean boundaries are what made
   two engineers enough to ship all of that in eight months.

Q: What happens after launch?
A: Thirty days of support is included in every build. After that, a monthly retainer if you
   want us on call, or nothing at all — we hand over the keys and documentation either way,
   and the product runs without us. A handover you can't act on isn't a handover.

Q: Which AI models do you use?
A: Whichever fits the task and the budget. We've shipped on OpenAI and on Azure OpenAI, and
   we pick per call rather than per project — a cheap model for extraction and a strong one
   for judgement is usually the difference between a feature that's affordable and one
   that isn't. Where a general model is the wrong tool, we train one: PowerUp's device
   reader is a purpose-trained vision model, not an OCR API.

Q: Do you sign NDAs?
A: Yes, before you describe the idea rather than after. And nothing appears in our portfolio
   without your written sign-off.

Q: We're not in your timezone. Does that work?
A: Most of our work leans US and EU. We run async by default — written updates, recorded
   demos, decisions in writing — with a few hours of deliberate overlap each day for the
   conversations that need to be live.

Q: We only need part of this. Is that a problem?
A: No. Some engagements are only the AI layer inside someone else's product, some are only
   the infrastructure work under a build somebody else did. Tell us where the gap is.
```

> Nine items. If that's long, the first six carry the weight — the last three can move to
> `/contact`. Don't cut "How much does this cost?" to avoid the question; that's the one
> people open the section for, and answering it with a process instead of a number is what
> makes the rest of the page credible.

---

# 11 · CTA — `cta-section.tsx`

**Heading**
```
Tell us what
you're building.
```

**Body**
```
Send us the idea, or the product you want AI in. We'll come back with what it takes, what
it costs, and whether we're the right team for it — usually within two working days.
```

**Buttons**
```
Primary:    Get a quote    → /contact
Secondary:  See our work   → /portfolio
```

**Fine print** — replaces "No credit card required"
```
Free 30-minute call. NDA on request. No sales team — you'll talk to the engineers.
```

> "No sales team" is worth the words. Every prospect reading this has been passed to an
> account manager by an agency before, and it's the cheapest genuine differentiator a
> four-person studio has.

---

# 12 · Footer — `footer-section.tsx`

**Wordmark** `OlvixAI` · superscript `.io`

**Tagline**
```
AI products, built end to end. Four engineers covering AI, web, mobile and cloud — idea to
production, one team.
```

```js
const footerLinks = {
  Services: [
    { name: "New builds",       href: "/#services" },
    { name: "AI integration",   href: "/#services" },
    { name: "How we work",      href: "/#how-we-work" },
    { name: "Capabilities",     href: "/#stack" },
  ],
  Work: [
    { name: "All work",         href: "/portfolio" },
    { name: "PowerUp",          href: "/portfolio/powerup" },
    { name: "Agentic Decks",    href: "/portfolio/agentic-decks" },
    { name: "HRXpert",          href: "/portfolio/hrxpert" },
    { name: "KairosAI",         href: "/portfolio/kairosai" },
  ],
  Company: [
    { name: "Get a quote",      href: "/contact" },
    { name: "FAQ",              href: "/#faq" },
    { name: "hello@olvix.io",   href: "mailto:hello@olvix.io" },
  ],
  Legal: [
    { name: "Privacy",          href: "#" },
    { name: "Terms",            href: "#" },
    { name: "Ownership",        href: "/#ownership" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "#" },
  { name: "GitHub",   href: "#" },
  { name: "X",        href: "#" },
];
```

> - Anchors are prefixed `/` so they work from `/portfolio` and `/contact`, not just home.
> - `Careers` and its `Hiring` badge are dropped — keep them only if you're actually hiring.
>   A hiring badge on a four-person studio that isn't is a small lie a candidate will find
>   out about, and the component's `badge` support is worth saving for when it's true.
> - The `Work` column has five items where others have three or four. The grid handles it;
>   if it looks uneven, drop `All work` and link the column heading instead.

**Bottom bar**
```
Left:   © 2026 OlvixAI. All rights reserved.
Right:  Taking on new projects   ← green dot stays; honest and useful. Flip to
                                    "Booked through <month>" when you are.
```

---

# Build summary

## `app/page.tsx` — new section order

```tsx
<Navigation />
<HeroSection />
<ServicesSection />          {/* NEW */}
<ProductionSection />        {/* was InfrastructureSection */}
<WorkSection />              {/* was TestimonialsSection */}
<TeamSection />              {/* was FeaturesSection */}
<HowWeWorkSection />         {/* was HowItWorksSection */}
<StackSection />             {/* was IntegrationsSection */}
<OwnershipSection />         {/* was SecuritySection */}
<FaqSection />               {/* NEW */}
<CtaSection />
<FooterSection />
```

Renaming files is optional but worth it — `security-section.tsx` containing ownership copy
will confuse whoever opens it in six months. If you rename, update `app/page.tsx` and the
anchor IDs in one pass.

## Effort

| Work | Sections |
|---|---|
| **Copy only** — edit the `const` arrays | 2, 6, 7, 11, 12 |
| **Copy + small code change** | 1 (routes in nav), 4 (column labels, invert), 5 (drop quote marks, add links), 8 (split the two marquees), 9 (rename const) |
| **New component** | 3 (`services-section.tsx`), 10 (`faq-section.tsx`) |
| **New route** | `/contact`, `/portfolio`, `/portfolio/[slug]` |
| **Delete** | `pricing-section.tsx`, `developers-section.tsx`, `metrics-section.tsx` |

Nothing here touches the design system: no new tokens, no new fonts, no `tailwind.config.js`.
Both new sections are assembled from patterns already in the repo — the numbered bordered
card, the mono eyebrow, the two-column split, the `IntersectionObserver` reveal with a
staggered `transitionDelay` — plus one unused shadcn primitive.

> Before deleting `metrics-section.tsx`, lift `AnimatedCounter` out of it. It's the best
> component in the repo and the case-study Results tables have real numbers to put in it.
> Note the hydration guidance in `CLAUDE.md` if you move the live clock anywhere.

## Open items for you

| # | Item | Blocks |
|---|---|---|
| 1 | **Contact form backend** — nothing in this repo can receive a submission. Options in [Contact-Copy.md](Contact-Copy.md). | `/contact`, and therefore every CTA on the site |
| 2 | **`hello@olvix.io`** — confirm the real address | Footer, contact page |
| 3 | **Security badges sign-off** (§9) — confirm the certification chips come down | §9 |
| 4 | **Case-study labelling** — confirm publishing HRXpert and KairosAI as in-house builds | §5, portfolio |
| 5 | **NDA check on Agentic Decks** — it's an employer's production feature | §5, portfolio |
| 6 | **A real quote from PowerUp Global** — worth an email today | §5 |
| 7 | **Availability line** in the footer — taking work, or booked? | §12 |
