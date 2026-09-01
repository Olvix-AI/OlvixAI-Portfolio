# OlvixAI — Portfolio Copy

Draft v2. Companion to **[Homepage-Copy.md](Homepage-Copy.md)** (the site architecture and
home page) and **[Contact-Copy.md](Contact-Copy.md)** (`/contact`). This doc covers the
portfolio: one index page listing the work, and a full page for each project, sourced from
the four case studies in `docs/`.

**No code changed yet.**

## Why this is a separate section of the site

For a services business the portfolio isn't a nice-to-have — it's the only thing on the site
that proves the claim. Everything else is assertion. Four case studies with real numbers and
real decisions is the strongest asset OlvixAI has, and it does not fit in a landing-page
section: the home page carries a four-project teaser (§5 of
[Homepage-Copy.md](Homepage-Copy.md)) whose entire job is to get the click through to here.

These pages also do the work a pricing page normally does. A prospect deciding whether you're
worth $40k reads a case study, not a feature grid — specifically the "Decisions" blocks,
because that's where they find out whether you've solved their problem before.

---

## Routing

This is the first time the site has had more than one route — today `app/page.tsx` *is* the
whole site. Suggested structure, which keeps that intact:

```
app/
  page.tsx                        # the landing page — new section order in Homepage-Copy.md
  portfolio/
    page.tsx                      # the index — §A below
    [slug]/
      page.tsx                    # one template, four slugs — §B–§E
  contact/
    page.tsx                      # → Contact-Copy.md
  layout.tsx                      # unchanged: fonts, analytics, noise overlay

components/
  portfolio/
    project-hero.tsx
    project-meta.tsx              # the type/domain/timeframe/team strip
    project-section.tsx           # eyebrow + serif heading + prose, reused throughout
    stack-table.tsx
    decision-block.tsx
    results-table.tsx
    project-nav.tsx               # prev / next project
  landing/                        # unchanged
```

Four projects with near-identical structure means **one `[slug]` template driven by a data
file** (`lib/projects.ts`), not four hand-built pages. All the copy below is written to sit
in that data file.

Three things to settle before building:

- **`<Navigation />` and `<FooterSection />` need to work on a non-landing route.** Both are
  currently written for a single page: the nav smooth-scrolls to `#` anchors that don't exist
  on `/portfolio`. Prefix every home anchor with `/` (`/#services`, `/#faq`) so they route
  home and then scroll, and use `next/link` for the real routes.
- **The `noise-overlay` and `max-w-[1400px] mx-auto px-6 lg:px-12` container** should carry
  across so the portfolio feels like the same site. Case-study prose wants a narrower measure
  than the landing sections — `max-w-[720px]` inside the same outer container.
- **Lift `AnimatedCounter` out of `metrics-section.tsx` before deleting that file.** The home
  page drops the metrics section (see Homepage-Copy.md), but the counter is the best component
  in the repo and the Results tables below are full of real measured numbers that deserve it.
  Watch the hydration notes in `CLAUDE.md` if you move anything time-based with it.

### Slugs

Display order is strongest-first, and it is the array order in `lib/projects.ts`.

| # | Project | Slug | Type |
|---|---|---|---|
| 01 | PowerUp | `powerup` | Client engagement |
| 02 | Trading Operations | `trading-operations` | Client engagement — SMC Group |
| 03 | Agentic Decks | `agentic-decks` | Employer's production feature |
| 04 | EpochsLab | `epochslab` | Own product |
| 05 | HRXpert | `hrxpert` | In-house build — academic capstone |
| 06 | KairosAI | `kairosai` | In-house build — academic capstone |

### Where the copy lives — read this before editing

§B–§E below (PowerUp, Agentic Decks, HRXpert, KairosAI) carry their full copy in this
document, and it was transcribed into `lib/projects.ts` verbatim.

**§F and §G — Trading Operations and EpochsLab — were written directly into
`lib/projects.ts`** from `docs/Trading Operations Platform/CASE_STUDY.txt` and
`docs/epochslab/CASE_STUDY.txt`. Their sections below record the decisions, the framing
and the open flags, but not a second copy of the prose.

That is a deliberate change of convention. Holding ~4,000 words of page copy in two
places creates exactly the drift problem that the home page teaser already had before it
was pointed at `lib/projects.ts`. **`lib/projects.ts` is now canonical for project page
copy; this document is canonical for the reasoning, the ordering and the honesty checks.**
If you edit prose, edit it in `lib/projects.ts`.

### Before this ships — two honesty checks

**1. Label each project truthfully.** Only PowerUp is a commercial client engagement.
HRXpert and KairosAI are academic capstones built to production standard. Agentic Decks is
production work done by a team member inside their employer's product. Every page below
carries a `Type` line in its meta strip that says which — don't quietly drop it to make the
portfolio look more commercial. A prospect who discovers the difference later will discount
everything else on the site; one who reads it up front sees four projects and a team that
doesn't oversell.

**2. Agentic Decks may not be publishable at all.** It's a live commercial feature of
somebody's employer's product, and the case study doesn't name the company. Check the
employment agreement and any NDA before this goes on a public site. Written below without
naming the employer or the product, which is usually the acceptable form — but "usually"
isn't a legal opinion. If it can't be published, the portfolio still stands on three.

### Screenshots

`docs/` has real assets: 15 HRXpert screenshots, 4 PowerUp web, 6 PowerUp mobile, 2 KairosAI.
Nothing for Agentic Decks. Two notes:

- **Scrub every screenshot for real names, emails and health data** before publishing.
  The HRXpert set includes applicant and resume views; PowerUp is health data by definition.
- `next.config.mjs` sets `images.unoptimized: true`, so these ship at full weight. The
  HRXpert PNGs should be converted to WebP and resized before they go in a gallery.

---

# §A · Portfolio index — `/portfolio`

**Page title:** `Work — OlvixAI`
**Meta description:** `Six AI products — a B2B health platform live on both app stores, a
trading company's entire operation, an agent that writes and edits PowerPoint files. What
we built, how, and what we can prove.`

**Eyebrow** `Work`

**Heading**
```
Six products.
Every layer of each one. ← dimmed line
```

**Intro**
```
Two were built for paying clients, one is a live feature inside an employer's product, and
three we built ourselves. All six went past the demo — through the parts that are tedious
and unglamorous and are the actual reason software stays up. Each page below says what the
problem was, what we decided and why, and what we can prove.
```

> The split in that first sentence has to stay accurate as projects are added or pulled.
> Today: clients = PowerUp, Trading Operations. Employer's feature = Agentic Decks. Ours =
> EpochsLab, HRXpert, KairosAI.

**Filter chips** (optional; nice-to-have, not required for v1)
```
All · Client work · In-house · AI agents · Mobile · Computer vision
```

## Project cards

Ordered strongest-first. Each card: number, name, one-liner, three tags, headline metric,
`View case study →`.

---

**01 · PowerUp**
> `Client engagement` · `Health-tech` · `Web + iOS + Android`

```
A B2B workplace wellness platform, rebuilt on the web and extended to native mobile — with
a vision model we trained that reads blood pressure, glucose and heart rate straight off
the screen of a home health device, so nobody has to type a number in.
```
**Live on the App Store and Google Play** · 8 months · 2 OlvixAI engineers

---

**02 · Agentic Decks**
> `Production feature` · `Enterprise AI` · `Agents + document engine`

```
An AI agent that writes a complete, on-brand PowerPoint deck from a conversation — then
turns around and edits any deck you upload, including ones it never wrote, without ever
producing a file PowerPoint refuses to open.
```
**Live in public production** · Built across 2026 · Sole owner of the module

---

**03 · HRXpert**
> `In-house build` · `HR-tech` · `Voice AI + microservices`

```
Recruitment automation that scores a resume against the job, runs a live voice interview
with an AI that asks real follow-up questions, and grades a developer off their GitHub —
all inside one affordable applicant tracking system.
```
**0.895 agreement with a human recruiter** · 8 months · 3-person team

---

**04 · KairosAI**
> `In-house build` · `Career tools` · `Scraping + browser extension`

```
A job-search platform that turns your resume into structured data, collects and ranks live
listings against it, runs scored mock interviews, and fills in the application forms
through a browser extension that works on sites nobody wrote a rule for.
```
**Three pillars, one candidate profile** · 7 months · 3-person team

---

**Closing CTA** (reuse `cta-section.tsx`)
```
Heading:    Want yours
            in this list?
Body:       Tell us what you're trying to build. We'll come back with what it takes, what
            it costs, and whether we're the right team for it — usually within two working
            days.
Primary:    Get a quote     → /contact
Secondary:  How we work     → /#how-we-work
Fine print: Free 30-minute call. NDA on request.
```

---

# Case study page template

Every page below follows this shape. Build it once.

```
1. Hero          eyebrow (project type) · name · one-line summary
2. Meta strip    Type · Domain · Timeframe · Team · Status
3. The challenge prose, 2–3 paragraphs
4. Our role      what OlvixAI owned, and the boundary of what it didn't
5. What we built the substance — 3–5 named capabilities
6. Stack         table, by layer
7. Decisions     2–3 blocks: the obvious approach, why it fails, what we did
8. Results       table, or an honest "no metrics collected" statement
9. Screenshots   gallery, where assets exist
10. Next project prev/next, then one line to /contact
```

Section 7 is the one that earns the work. Everyone lists a stack; almost nobody explains a
decision. Keep those blocks — they're what makes the reader think *these people have done
this before.*

**Section 10 — end of page.** Prev/next between projects, then a single quiet line rather
than a full CTA block. Someone who has read 2,000 words of a case study doesn't need a
hard sell; they need a link.
```
Building something like this?  Get a quote →  /contact
```

---

# §B · PowerUp — `/portfolio/powerup`

**Page title:** `PowerUp — OlvixAI`
**Meta:** `A B2B wellness platform rebuilt for web and native mobile, with a purpose-trained
vision model that reads home health devices through the phone camera.`

## Hero

**Eyebrow** `Client engagement`

**Name** `PowerUp`

**One-liner**
```
A workplace wellness platform rebuilt on the web, extended to iOS and Android, and taught
to read a blood pressure monitor through the phone camera.
```

## Meta strip

| | |
|---|---|
| Type | Contract engagement — PowerUp Global |
| Domain | Health-tech · corporate wellness (B2B) |
| Timeframe | ~8 months, web and mobile |
| Team | 2 OlvixAI engineers, plus the client's in-house backend developer |
| Status | Live — app.powerupglobal.io, App Store and Google Play |

## The challenge

```
PowerUp sells to employers, not consumers. An organisation buys it so its people can
profile their own health across a nine-dimension wellness model — seventy-plus underlying
metrics — and so the organisation can see what absence, presenteeism and workplace
accidents are actually costing it.

That business model puts unusual weight on data quality. The product only works if a large
population of employees keeps feeding it accurate information, over months, without anyone
chasing them. Two things stood in the way.

The first was the existing web front end. It carried a long, demanding assessment, and the
employer buying the product didn't like it enough to put it in front of staff. For a
platform sold on organisation-wide rollout, that isn't cosmetic — a front end people bounce
off is a product that never accumulates the data it needs.

The second was that PowerUp had no mobile presence at all. Health data doesn't live on a
laptop. It lives on the phone, in Apple Health and Android Health Connect, and on the
wearables that write into them. And it lives, stubbornly, on a category of device with no
API of any kind: the blood pressure monitor on the kitchen counter, the glucose meter in
the drawer. Those readings are the ones the platform most wants and the ones nobody
reliably types in. Reading four digits off an LCD and retyping them is a small friction
repeated daily — which means it stops happening within a week.
```

## Our role

```
OlvixAI owned the entire client-facing surface of the product and the machine learning
behind the capture feature. Two engineers split four areas: a full redesign of the web
platform including flows that didn't previously exist; the mobile app designed and built
from scratch for both platforms; the vision model that reads home health devices, plus the
correction and retraining loop behind it; and DevOps — environment management for the web
platform and the release pipelines for both app stores.

The boundary is worth stating plainly. The platform API and the FastAPI service serving the
vision model were built and maintained by the client's in-house developer. Where the
redesign or the app needed a backend change, we specified it and it was implemented on
their side. We integrated against that backend rather than owning it.
```

## What we built

**The web platform** — the client's psychometric instrument left intact, everything around
it rebuilt.

- **Profile Insights** — the landing view for a completed profile: performance score,
  physical activity status, BMI, and rolled-up rings showing how many dimensions are green,
  amber and red.
- **Healthy Living Indicators** — all nine dimensions, readable two ways: a radar chart for
  shape and a bar chart for comparison, each clickable through to what it measures and why
  the score is what it is.
- **Health Status detail** — per-topic breakdowns across alcohol, BMI, activity, nutrition,
  stress, smoking, mental health, blood pressure, heart and stroke risk, and back problems.
  Plain-language context, current standing, target beside it.
- **Workplace Key Metrics** — the employer-facing half of the value proposition rendered for
  the individual: absence, presenteeism and accident figures plotted against the
  organisation's distribution, its average, and the user's target.
- **The assessment** — rebuilt around the reality that nobody finishes it in one sitting.
  Visible progress, section numbering, save-and-exit, and a resume path that returns you
  exactly where you stopped.

**The mobile app** — React Native and Expo, both stores from one codebase. Not a wrapper
around the web product; it exists to do what a phone can and a browser can't.

- **Native health sync** — steps, distance, active and resting calories read from Apple
  HealthKit and Android Health Connect, so anything the phone or wearable already records
  flows in without being re-entered.
- **Camera capture** — see below.
- **The profile on mobile** — the same nine-dimension assessment laid out for a phone, so
  seventy-plus insights can be worked through in short sittings.
- **Points and notifications** — a light gamification layer aimed squarely at the retention
  problem that makes or breaks a wellness rollout.

**AI capture from home health devices** — the part that attacks the data-quality problem
directly.

```
The user points the camera at a device with no connectivity of any kind — a blood pressure
monitor, a glucose meter, a heart rate readout — and takes a photo. A server-side vision
model we trained for this specific task extracts the values and returns them into the form,
already filled in. For a blood pressure monitor that's systolic, diastolic and pulse,
parsed out of one photograph of a seven-segment LCD.

Three reading types are supported. In every case the entry the user was going to make by
hand still gets made — the model just makes it first.
```

## Stack

| Layer | What we used |
|---|---|
| AI / ML | A vision model trained in-house for reading home health-device displays · server-side inference · a correction-driven retraining loop, retrained bimonthly on user-corrected readings |
| Frontend (web) | Next.js · React · Tailwind CSS |
| Mobile | React Native · Expo · Apple HealthKit and Android Health Connect · camera capture · in-app notifications · one codebase, both stores |
| Backend | FastAPI inference service on Azure, plus the core platform API — both owned by the client's developer |
| Infrastructure | Azure for inference · web deployment and environment management · App Store and Google Play release pipelines — owned by OlvixAI |

## Decisions

**The camera is an assist, never an authority**
```
A model reading a blood pressure monitor is reading a clinical number. Silently writing a
misread value into someone's health record is a far worse failure than not reading it at
all, because the user has no way of knowing it happened — and in a product an employer has
asked its staff to trust, one bad number that surfaces later costs more credibility than
the feature ever earned.

So extraction commits nothing. It pre-fills the form. The user sees the photo they just
took with the parsed values in editable fields beneath it, and nothing saves until they
confirm. Practically, that turns data entry into a glance-and-tap, which is the actual win.
The model isn't there to be autonomous. It's there to remove keystrokes.
```

**Every correction is a training example**
```
That confirmation step is also the most valuable thing in the system, and treating it as
merely a safety net would waste it. When a user edits a value the model got wrong, the edit
is a labelled example: a real photograph, taken by a real user, on real hardware, in real
lighting, paired with ground truth. No synthetic dataset gives you that distribution.

So corrections are captured and the model retrains on them bimonthly. It improves
specifically where its users struggle — the device models, screen types and lighting found
in the field, not the ones that happened to be in the original training set. The safety
mechanism and the improvement mechanism are the same mechanism.
```

**A purpose-trained model rather than a general OCR service**
```
The cheap route is a general-purpose OCR or vision API. We trained a model instead, because
this is a narrow, closed visual domain — segmented LCD digits in fixed positions on a small
set of consumer device layouts, photographed at arm's length. Narrow domains are where a
purpose-trained model beats a general one on both accuracy and cost per call. It also means
the model belongs to the client and improves on the client's own data, rather than the
feature's quality being pinned to whatever a third party ships next.
```

**Syncing health data on open, not in the background**
```
Background health sync is expensive in the two currencies that matter for a wellness app:
battery, and the permissions you have to ask for. Both platforms treat persistent
background access to health data as a serious grant — and an employee being asked by their
employer's app for always-on access to their health records is a conversation the product
doesn't need to have.

Sync-on-open gives the user current data every time they actually look, at no battery cost,
behind a permission prompt that's much easier to say yes to. The tradeoff — data fresh as
of last open rather than continuously — is invisible in a product whose interaction model
is already daily check-in rather than live monitoring.
```

## Results

```
No formal product metrics were tracked on this engagement, so there are no adoption,
retention or model-accuracy figures to report. What is real and checkable is what shipped.
```

| | |
|---|---|
| Product surfaces | Two — a fully redesigned B2B web platform, and a native mobile app for iOS and Android built from scratch |
| Mobile release | Published and live on the App Store and Google Play, from one React Native / Expo codebase |
| Reading types automated | Three — blood pressure, blood glucose, heart rate |
| Team | Two OlvixAI engineers across web, mobile, ML and DevOps |

> Stating plainly that no metrics were collected is better than inventing some. It also
> makes the numbers on the HRXpert page more believable.

## Screenshots

`docs/PowerUp/` (4 web) and `docs/PowerUp-App/` (6 mobile). **Scrub for real health data
before publishing** — the profile views show real readings.

---

# §C · Agentic Decks — `/portfolio/agentic-decks`

> ⚠ **Confirm you can publish this before building the page.** It's a live commercial
> feature of an employer's product. Written below without naming the employer or the
> product; check the NDA anyway.

**Page title:** `Agentic Decks — OlvixAI`
**Meta:** `An AI agent that writes complete PowerPoint decks from a conversation, and edits
any deck you upload without corrupting the file.`

## Hero

**Eyebrow** `Production feature`

**Name** `Agentic Decks`

**One-liner**
```
An AI agent that writes a complete, on-brand PowerPoint deck from a conversation — then
edits any deck you already have, including ones it never wrote.
```

## Meta strip

| | |
|---|---|
| Type | Production feature of a commercial AI platform |
| Domain | Enterprise AI · document automation |
| Timeframe | Built in stages across 2026; live in public production by August |
| Team | Part of a multi-engineer product team; sole designer and builder of this capability |
| Status | Live in production |

## The challenge

```
Building a deck is one of the most common and least enjoyable pieces of knowledge work
there is, and the options were both bad. Do it by hand and lose hours to layout. Ask a
general-purpose LLM and get a wall of bullet text that still has to be designed by a human
— output that doesn't survive contact with the real file format. Text overruns its box, the
visual language changes every slide, and what comes back is usually a web page or an image
rather than a genuine, editable PowerPoint file someone can take into a meeting.

The larger gap was on the other side. Almost every AI presentation tool abandons the user
the moment they already have a deck — and real work is rarely a blank canvas. It's last
quarter's board deck that needs restyling, a partner's file that has to move into the
company template, one slide somebody wants rebuilt around a different layout. Doing that by
hand is slide-by-slide manual labour. Doing it naively with an LLM means letting a model
rewrite a binary Office document, which is a fast route to a file the customer's PowerPoint
refuses to open.

Nothing on the market let a user upload their own deck and talk to it with any confidence
that the file would still work afterwards.
```

## Our role

```
Sole owner of the presentation capability inside a larger product team, end to end: the
agent architecture — multi-step deck generation, the conversational editor, and the intent
layer that decides when to build, when to edit and when to stop and ask a question; the
Python services, persistence, streamed progress and file delivery behind it; the document
engine for reading and safely modifying native PowerPoint files, and the agent-facing tool
surface exposing it; the design system and the renderer that converts a rendered design
into a real .pptx; and a variant of the whole feature for a compliance-constrained
environment where an entire class of third-party dependency wasn't permitted.

The surrounding chat product, its authentication, and infrastructure ownership were not
ours. We integrated into those.
```

## What we built

**Pillar A — Create a deck by talking**
```
The user just asks. The agent works out whether it has enough to go on and asks for what's
missing — how long, who for — instead of quietly guessing. A deck can be grounded on four
things: a topic, an uploaded PDF or Word document, the conversation the user has already
been having, or analysis produced elsewhere in the product.

From there it reads or researches the source, plans the entire deck before writing any of
it, and puts that plan through a review pass for narrative flow, balance and variety — so a
weak structure is caught while it's still cheap to fix. Only then are the slides written,
many at once, each assigned a real designed layout from a large template library rather
than poured into a generic bullet list. Imagery is sourced or generated to match. What
arrives is a genuine PowerPoint file the user can open and keep working in.

And it doesn't stop at delivery. The user keeps talking — "make slide three shorter", "swap
that image", "add a closing slide". The deck is edited in place, only the affected slides
are rebuilt, and the updated file comes straight back.
```

**Pillar B — Bring your own deck**

- **Precise editing** — wording, fonts, colours, sizes, bullets, tables, chart data,
  speaker notes, pictures, and deck-wide theme colours and fonts.
- **Layout intelligence** — align, distribute, arrange into a grid, place one shape relative
  to another, centre on the slide. The system quietly keeps shapes on the slide and off each
  other, and tells the agent when it has adjusted something so the agent can explain it.
- **Whole-slide redesign** — pick, or have the agent search for, a layout from a curated
  bank of professionally designed slides, and have an existing slide rebuilt into it. The
  user's own theme, colours and branding are kept; content is reflowed and pictures matched.
  The same path authors a brand-new slide from a one-line brief.
- **Deck migration** — stage a foreign deck alongside the user's own and move it across
  wholesale. Every slide gets a proposed layout in the user's template; the user reviews and
  edits that plan before anything is written; then the deck is rebuilt slide by slide on
  their branding, carrying tables, charts, images and speaker notes across.

```
Everything is versioned. Each change is a discrete recorded step, the history is visible,
any earlier point can be restored, and the original upload is never modified.

What makes this AI-powered rather than a set of buttons: every capability above is exposed
to the model as a tool, so the assistant plans and composes them itself. It decides which
layout suits a slide, how content should be redistributed into a new arrangement, what a
picture should show — and when to ask a clarifying question instead of acting on a guess.
```

## Stack

| Layer | What we used |
|---|---|
| AI / ML | GPT-class reasoning models on Azure OpenAI, tiered by task · LangGraph and LangChain for orchestration · an MCP tool server · schema-constrained structured output (Pydantic) · retrieval-augmented grounding over uploaded PDF/Word with vector search · CPU-only static embeddings for layout retrieval · stock-photo APIs and generative image models |
| Frontend | React · Next.js (App Router) · TypeScript · Tailwind CSS — a large library of slide designs authored as components · server-sent events for streamed progress and chat |
| Backend | Python · FastAPI · MongoDB · python-pptx and lxml working directly against the OOXML package · headless Chromium for layout measurement · Pydantic throughout |
| Infrastructure | Docker, one image with a Node sidecar · Kubernetes with multiple replicas and blue/green rollouts · Azure Blob Storage with short-lived signed URLs · Azure OpenAI · CI on push · structured logging with per-run tracing |

## Decisions

**Making an LLM safe to point at a binary document format**
```
The obvious design — let the model write the file — is the one that fails in production. An
Office document is a bundle of interdependent XML parts. A small mistake doesn't produce a
slightly wrong slide, it produces a file PowerPoint refuses to open. A user who sees that
once stops trusting the product entirely.

So the model never writes the file. It chooses from a closed vocabulary of typed, validated
operations, and a deterministic engine applies them. Everything a user could want — retype
a line, recolour a shape, move a picture, add a table row, swap a theme font, rebuild a
whole slide — is one of those operations.

The payoff compounds. Every edit is validated before it touches anything, and a batch
either fully applies or fully rolls back. The edit history is a recorded sequence, so undo
is exact rather than approximate. The original upload is never mutated. And an entire
failure class — the model emitted markup that corrupted the deck — simply doesn't exist. It
also made the engine unit-testable, which is why it carries a real test suite instead of
being verified by opening files and squinting at them.
```

**One source of truth for how a slide looks**
```
A deck has to look right in two places: in the product's own preview, and in PowerPoint on
somebody else's laptop. The tempting approach is two layout implementations, one per target
— and they drift within weeks.

Instead the design system is authored once, as web components, and the native file is
derived from what that design system actually rendered rather than laid out a second time
from scratch. Adding a new slide design became a front-end task rather than a two-sided
one, which is why the library grew to twenty-one visual families without fidelity falling
apart.

Two supporting rules made it hold. If the renderer is unavailable the build fails loudly
rather than silently shipping a bland, unstyled deck — a plausible-looking wrong output is
far worse than an honest error, because the user can't tell it went wrong. And length
budgets are advertised to the writer up front, so text is written to fit its box rather
than truncated after the fact.
```

## Results

| | |
|---|---|
| Status | Live in public production since August 2026 |
| Slide design families | 21, authored once and rendered to both preview and native file |
| Corrupted-file failure class | Eliminated by construction — the model never writes the file |
| Compliance variant | A full build of the feature for an environment where a whole class of third-party dependency was not permitted |

> Fill in throughput, cost-per-deck or usage numbers if the employer will let you publish
> them. Section 8.3 of the source case study covers the cost work; it's summarised out of
> the page above because the figures aren't in the doc.

---

# §D · HRXpert — `/portfolio/hrxpert`

**Page title:** `HRXpert — OlvixAI`
**Meta:** `AI recruitment automation: resume scoring, live voice interviewing over WebRTC,
and GitHub-based developer evaluation in one applicant tracking system.`

## Hero

**Eyebrow** `In-house build`

**Name** `HRXpert`

**One-liner**
```
Recruitment automation that scores a resume, runs a live voice interview, and grades a
developer's GitHub — inside one applicant tracking system a small company can afford.
```

## Meta strip

| | |
|---|---|
| Type | In-house build — academic capstone, built to production standard |
| Domain | HR-tech · recruitment automation |
| Timeframe | August 2025 – March 2026 |
| Team | 3 engineers, under academic supervision with industry advisory input |
| Status | Complete and validated; not publicly deployed |

## The challenge

```
Recruiters spend an average of 23 hours screening resumes per hire, and it takes roughly 44
days to fill a single role — a cost most small and medium enterprises simply can't absorb.
Enterprise recruitment tools price that segment out entirely, with base pricing north of
$25,000 a year, while cheaper alternatives cover fragments of the workflow: scheduling, or
a basic ATS, but not deep AI assessment.

On top of the cost problem, manual screening is inconsistent and prone to unconscious bias
— SHRM research links it to as much as a 30% reduction in workforce diversity.

There was no affordable, unified platform that could screen resumes, run structured
interviews and assess technical candidates end to end.
```

## What we built

A role-aware platform serving four user types — candidates, recruiters, admin-recruiters and
interviewers — through one interface.

- **AI resume scoring** — a candidate uploads a resume; the system extracts the text,
  compares it against the job description with a structured zero-shot prompt, and returns a
  0–10 fit score broken down across technical skill match, experience relevance, project
  quality and communication clarity. Scoring runs asynchronously, so it never blocks the
  candidate's submission.
- **Real-time AI voice interviewing** — a live, browser-based voice interview over WebRTC.
  The AI transcribes in real time with Whisper, asks adaptive follow-ups based on the
  resume and prior answers, and speaks back with text-to-speech — then produces a scored,
  human-readable transcript for the recruiter.
- **GitHub developer evaluation** — for technical roles, the platform pulls a candidate's
  public GitHub activity (languages, project complexity, contribution frequency) and
  generates a developer fit score against the job requirements.
- **A full ATS with RBAC** — job posting and lifecycle management, applicant pipeline
  tracking, automated notifications, interview scheduling with Google Calendar and Meet, and
  a billing layer — all gated by role-based access control enforced through RS256-signed JWTs.

```
The core design principle throughout: AI never makes the final call. Every AI output comes
with visible reasoning, and the recruiter keeps override authority at every stage — a
decision informed directly by research on candidate trust in automated hiring.
```

## Stack

| Layer | What we used |
|---|---|
| AI / ML | OpenAI for zero-shot resume scoring and conversational interviewing · Whisper for real-time speech-to-text · TTS for the interviewer's voice · structured zero-shot prompting at fixed low temperature for scoring consistency |
| Frontend | Next.js 14 (App Router, React Server Components) · React 18 · Tailwind CSS · native WebRTC |
| Backend | NestJS 10 (TypeScript) for core transactional services · FastAPI (Python 3.11) for async AI workers · MongoDB Atlas · Redis · RabbitMQ / CloudAMQP for event-driven processing |
| Infrastructure | AWS EC2, including a dedicated real-time interview instance · AWS Lambda · S3 with pre-signed URLs · Vercel · Docker with GitHub Actions CI/CD · RS256 JWT auth · Google OAuth 2.0 SSO |

## Decisions

**Decoupling AI latency from user-facing responsiveness**
```
LLM calls for resume scoring take 18 seconds and interview scoring up to 42 — unacceptable
if a candidate has to wait on that during submission. All AI-heavy work was routed through
RabbitMQ as asynchronous events, isolated in dedicated FastAPI workers with no shared state.

That kept synchronous, user-facing APIs under a 320ms P95 even while AI processing ran in
the background, and let the AI workers scale independently of the transactional core. It
was validated under stress testing at 4x target concurrent load — 200 simultaneous
submissions, zero message loss.
```

**Validating scoring quality against human judgment, not just functional correctness**
```
It isn't enough for an AI scorer to run. It has to agree with what a human recruiter would
decide. We ran a structured evaluation against an experienced HR professional across 73
resumes, computing Cohen's Kappa (0.895 — near-perfect agreement) and Matthews Correlation
Coefficient (0.90) rather than a simple accuracy number, which would have been misleading
given the class imbalance in shortlist and reject decisions.
```

**Proving the bias mitigation actually worked, rather than claiming it**
```
Rather than assert the system was unbiased because names and photos were stripped, we ran a
controlled anonymisation study: 111 resumes scored both with and without PII — names,
emails, GitHub and LinkedIn, location — using an identical prompt and rubric.

Scores matched within ±1 point on 90.1% of resumes, with near-zero average drift of +0.08
points, exceeding the 85% similarity target. That's evidence the pipeline evaluates
qualifications rather than demographic proxies, not just a design intention.
```

## Results

| Metric | Result |
|---|---|
| AI–human scoring agreement (Cohen's Kappa) | 0.895 — near-perfect |
| Bias-mitigation similarity rate | 90.1% (target ≥85%) |
| Average score drift from anonymisation | +0.08 points |
| Interview transcript accuracy | 92.3% (target ≥90%) |
| API P95 at 50 concurrent users | <320 ms (target <500 ms) |
| End-to-end resume scoring | ~18 seconds |
| End-to-end interview scoring | ~42 seconds |
| Test cases executed / pass rate | 420+ / 98%+, zero critical defects |
| Security scan (OWASP ZAP) | No high- or critical-severity vulnerabilities |
| Stress test | 200 simultaneous submissions (4x target load), zero message loss |

## Screenshots

`docs/HRXpert Screenshots/` — 15 images covering recruiter, admin, interviewer and candidate
dashboards, job creation, applicant tracking and the AI evaluation views.

**Scrub before publishing.** The applicant and resume views may contain real names and
contact details. Convert to WebP and resize while you're in there.

---

# §E · KairosAI — `/portfolio/kairosai`

**Page title:** `KairosAI — OlvixAI`
**Meta:** `A job-search platform that structures your resume, scrapes and ranks live
listings against it, and fills in application forms through a browser extension.`

## Hero

**Eyebrow** `In-house build`

**Name** `KairosAI`

**One-liner**
```
An end-to-end job-search platform — from "here is my CV" to "the application is submitted".
```

## Meta strip

| | |
|---|---|
| Type | In-house build — academic capstone, delivered as a working MVP |
| Domain | HR-tech · career tools and job-search automation |
| Timeframe | ~7 months |
| Team | 3 engineers, split by domain — each owning the database, service and front end for their slice |
| Status | MVP — feature-complete and demonstrable end to end; not commercially launched |

## The challenge

```
Applying for jobs is a volume problem disguised as a writing problem. A serious search means
a hundred-plus applications, and almost none of the work in them is interesting: retyping
the same employment history into a different form on every site, rewording the same resume
to match the vocabulary of each posting, and doing it across several job boards that have
no knowledge of one another.

Underneath that sits a filtering problem the candidate can't see. Most applications at any
scale are screened by an ATS before a person reads them, which means a well-qualified
candidate whose resume doesn't use the posting's vocabulary is rejected by a keyword match
rather than a judgement. Candidates are asked to optimise against a system whose rules are
never shown to them.

The tooling that exists solves one slice each. A resume builder doesn't know what jobs are
open. A job aggregator doesn't know whether you're a fit for what it's showing you, or
whether your resume will survive the filter. Interview practice needs another human, or
costs money, or both. So the candidate ends up as the integration layer between four tools,
doing the joining by hand — which is exactly the part that makes the process exhausting.
```

## Our role

```
The product was divided by domain: each of three people owned the data model, backend
service and front end for their own area, composed into one application.

Our slice covered the two halves at the front of the funnel — the resume pipeline
(ingesting an uploaded resume, extracting it into structured data, optimising it against a
target posting, running ATS keyword analysis, and classifying the candidate as junior, mid
or senior), and the job collection and matching engine (the scraping and normalisation
layer, and the hybrid matching system that scores listings against a candidate profile).

The mock-interview chatbot and the browser extension were owned by a teammate. Both are
described below, because the case for the product is that these pieces only matter as one
loop — the extension is only useful because the resume is already structured, and the
interview practice is only targeted because the matching engine decided which role the
candidate is preparing for.
```

## What we built

Three pillars sharing one candidate profile: understand the candidate, find and rank the
work, then actually get the applications out of the door.

**Pillar A — Resume intelligence**
```
The candidate uploads a resume and it stops being a document. It's parsed into structured
data — roles, dates, skills, projects, education — which is what makes everything
downstream possible, including the autofill.
```
- **Parsing and structuring** — an uploaded file from any template ends up the same shape as
  any other.
- **Optimisation and ATS keyword analysis** — the resume is compared against a target
  posting and rewritten to match the vocabulary the filter is looking for, with the keyword
  gaps surfaced to the candidate rather than silently patched.
- **Seniority classification** — junior, mid or senior, which becomes the primary filter on
  what gets recommended. Showing a junior candidate senior roles isn't a neutral failure; it
  wastes the applications they have the energy to make.

**Pillar B — Job collection and matching**
- **Collection** — job pages fetched and parsed as scheduled batch jobs, each board handled
  by its own extractor, everything normalised into a shared job record.
- **Hybrid matching** — a listing is scored three ways: semantic similarity between the
  structured resume and the posting, keyword matching against the terms the posting actually
  uses, and an LLM pass for the judgement call. The three signals combine into the
  recommendation.
- **Tracking** — a dashboard of what's been applied to, what stage it's at, and what's still
  open, so the candidate isn't managing a hundred applications out of their inbox.

**Pillar C — Interview practice and application automation**
- **Mock interviews** — a chatbot conducting practice interviews in text and voice, then
  scoring the candidate and giving feedback on the answers rather than just ending the
  conversation.
- **Autofill browser extension** — reads the application form on the page, matches its
  fields against the stored resume data, and injects the values. It works across a wide
  range of sites rather than a fixed list, and on selected sites carries the application
  through to submission.

## Stack

| Layer | What we used |
|---|---|
| AI / ML | GPT-4o mini across the whole product — parsing, optimisation, ATS analysis, classification, match scoring, autofill field matching, and interview conversation and feedback · embedding-based semantic similarity alongside keyword matching · speech in and out for voice interviews |
| Frontend | Next.js · React |
| Backend | Node.js · Express, split into per-domain services owned separately |
| Data | Supabase — PostgreSQL for application data, auth, and object storage for uploaded resumes |
| Scraping | Cheerio-based HTML parsing over scheduled collection jobs, per-board extractors normalising into one schema |
| Extension | Reads the rendered form, model-matches fields against the stored resume, injects values, submits on selected sites |
| Infrastructure | Vercel |

## Decisions

**Autofill by reading the page, not by maintaining selectors**
```
The conventional way to build a form-filling extension is a rule per site: a hand-written
map of CSS selectors to fields for each employer's form. That's straightforward, and it's
also why most autofill tools support a short list of sites and break constantly.
Application forms are built by thousands of companies on dozens of ATS products, every one
free to change its markup on any given day, and no small team keeps a selector table
current against that.

So the extension carries no selectors. It reads the form as rendered, and the model matches
the fields it finds against the structured resume — deciding that this input wants a phone
number and that textarea wants the current job description — before injecting values. The
consequence is that it generalises: it works on forms nobody wrote a rule for, including
forms that didn't exist when it was built. That's also the clearest payoff from Pillar A,
since matching a form field to a candidate is only tractable because the resume was turned
into structured data at upload.
```

**Hybrid matching rather than picking one technique**
```
Each of the three obvious strategies fails alone. Pure keyword matching is brittle and
misses every candidate who says "built REST services" where the posting says "API
development". Pure embedding similarity captures that equivalence but happily rates a
related-but-wrong role highly, because semantic closeness isn't the same as being a fit. An
LLM asked to judge every listing is the most accurate and by far the most expensive, and
doesn't scale across a full board of postings.

The system runs all three. Keeping keyword matching in the loop is the non-obvious part —
it isn't there because it's a good similarity metric, it's there because it models the
filter the candidate is actually up against. It's signal about whether the application will
survive, not merely whether the candidate is suitable.
```

**Scraping as scheduled collection rather than live fetching**
```
The naive design fetches listings when the user asks for recommendations. That makes the
user wait on someone else's server, makes the request rate look exactly like the traffic
pattern boards watch for, and re-fetches the same postings for every user who searches.

Collection instead runs as scheduled batch jobs writing into a normalised store, with
matching done against that store. The user's request touches the database and nothing else,
which is why recommendations are fast, and the collection rate is decoupled from how many
people happen to be searching.
```

**Consolidating two Postgres providers into one**
```
The project began with data split across Neon and Supabase. Both are PostgreSQL, which is
what made the split look harmless — and what made it a genuine drag. Auth and resume file
storage already lived in Supabase, so the split meant two connection stories, two sets of
credentials, two places to look when something was wrong, and a boundary to reason about
every time a query wanted to join across it. For a three-person team on a seven-month
timeline that's a tax paid continuously for no benefit.

Neon was dropped and everything moved onto Supabase. The lesson worth recording is that the
migration was cheap precisely because it was done early — the same decision deferred until
the schema was fully grown would have been a project rather than a change.
```

**One model tier across the whole product**
```
Every AI call runs on GPT-4o mini. A larger model would have improved the judgement-heavy
calls, particularly match scoring and interview feedback. On a project with no revenue and
a seven-month clock, running one cheap model everywhere is what let all three pillars get
built and demonstrated rather than two of them being built well. It's the right call for an
MVP, and the first thing worth revisiting if the product went further.
```

## Results

```
A completed project delivered as an MVP, not a launched product. No usage, accuracy or
revenue metrics were collected, so none are reported here.
```

| | |
|---|---|
| Scope delivered | Three integrated pillars — resume intelligence, job collection and matching, and interview practice with application automation — working end to end against one candidate profile |
| Commercial model | Three tiers designed into the product (Starter, Pro, Elite), separated by application volume and how much automation is unlocked. Never taken to market; no revenue |
| Extension coverage | Generalises to application forms with no per-site rule written |

## Screenshots

`docs/KairosAI/` — 2 images. Thin for a full page; worth capturing a few more from the
running MVP if it still runs, particularly the matching dashboard and the extension in
action on a real form.

---

# §F · Trading Operations — `/portfolio/trading-operations`

Source: `docs/Trading Operations Platform/CASE_STUDY.txt`. Full page copy is in
`lib/projects.ts` under slug `trading-operations`.

**Why this sits at 02, directly after PowerUp.** It is the *second genuine commercial
client engagement* in the portfolio, and it carries the hardest verified numbers of any
project here — 76/76 backend tests, 15/15 adversarial RBAC checks, and a complete
enquiry-to-paid lifecycle run live including partial receipts, two delivery challans, two
invoices, CRV gating and automatic close-out. Before this, the portfolio was one client
project and three things OlvixAI built for itself. It now reads as a studio with a client
track record.

**The four decision blocks**, which are the substance of the page:
1. *AI that never blocks the business* — the Anthropic → Groq → pre-filled manual form
   fallback ladder. The strongest single argument on the whole site for the "we do
   production, not demos" positioning, because it is a design that assumes the model is
   unavailable.
2. *Correctness on the paths that aren't the happy one* — partial receipts and payments as
   first-class flows, with backend guards; several of them written because live E2E
   testing found the gap.
3. *A modular monolith, not microservices* — chosen against the fashionable answer, with
   the reason stated.
4. *The extraction bug worth writing down* — the early version sent the LLM a storage key
   instead of the document and returned plausible output anyway. Kept deliberately: it is
   the most useful paragraph on the site for a technical buyer, because it shows the team
   knows the difference between "it returned something" and "it read the input".

## ⚠ Two things to settle before this page stays up

**1. Client naming needs sign-off.** The page names SMC Group in its `Type` row, because
the source case study does. But the site's own ownership section promises *"Nothing goes
in our portfolio without your written sign-off."* Publishing the client's name without
that sign-off contradicts a claim made three sections above it on the home page. Either
get it in writing, or change `meta[0]` to a neutral value — `Client project — import/export
trading group` — which loses nothing that matters to a prospect.

**2. The live URL is deliberately not published.** The source case study lists the live
product as a bare IP address over plain HTTP. Publishing that on a public marketing site
points the internet at a client's production operations system, so it is not in
`lib/projects.ts` and should not be added — and the address is redacted here too, because
this repo is public. It is in `docs/Trading Operations Platform/CASE_STUDY.txt`, which is
gitignored for the same reason. If a demo link is wanted, put a domain and TLS in front of
it first, behind auth.

---

# §G · EpochsLab — `/portfolio/epochslab`

Source: `docs/epochslab/CASE_STUDY.txt`. Full page copy is in `lib/projects.ts` under slug
`epochslab`.

**Why 04, behind Agentic Decks.** It is the most ambitious thing in the portfolio and the
only own product, but it is still in development with no production metrics, while Agentic
Decks is live in public production at a commercial company. Proof beats ambition in
ordering, so Decks goes first.

**Type is "Own product — startup build", and `Status` says "In development".** Both are
load-bearing. A platform page that reads like a shipped product but has no users is the
kind of thing a prospect discovers and then discounts everything else on the site for. The
results table says "Production metrics: None tracked, and none claimed" in as many words.

**The four decision blocks:**
1. *Pipelines that survive the wait* — MongoDB-checkpointed LangGraph state, interrupts on
   approval nodes, resume from stored state. The real problem: a restart mid-pipeline
   otherwise loses the expensive part.
2. *Train from scratch, fine-tune, or neither — decided per case* — why a default training
   strategy is what makes automated ML tools confidently wrong.
3. *Automation that stays inspectable* — every agent step written as notebook cells, so the
   pipeline leaves a readable trail. "A number without a method is not a result."
4. *Failed generated code is a state to handle, not an error to surface* — diagnose and
   retry, escalate only when repair does not converge.

**One positioning note.** EpochsLab is OlvixAI's own product, not client work. That is a
genuine strength — it demonstrates the team ships for itself at the same standard — but it
also means the portfolio's honest split is now two client projects, one employer feature,
one own product and two capstones. The index intro says exactly that.

---

# What's still needed

| Item | Blocks | Owner |
|---|---|---|
| NDA check on Agentic Decks | §C existing at all | You |
| Screenshot scrub — real names, health data | §B, §D publishing | You |
| More KairosAI screenshots | §E looking finished | You |
| A real quote from PowerUp Global | Every page, and home §5 | You |
| Cost/throughput figures for Agentic Decks | §C results table | You, if publishable |
| A form backend behind `/contact` | Every CTA on the site | You — see [Contact-Copy.md](Contact-Copy.md) |

## If you only build part of this

The four pages are not equal in value. In priority order:

1. **`/portfolio` index** — even with no detail pages, four honest project cards beat the
   template's invented testimonials. Cards can link to nothing at first.
2. **PowerUp** — the only commercial client engagement, and the only one that shipped to
   real users on two app stores. This is the page a prospect needs to see.
3. **HRXpert** — the numbers. Cohen's Kappa against a human recruiter, the bias study, the
   load test. Nothing else on the site proves rigour like this page does.
4. **Agentic Decks** — the most technically impressive, and the most likely to be blocked by
   an NDA. Don't let it hold up the other three.
5. **KairosAI** — strong decisions section, thinnest evidence and only two screenshots.
   Fine to ship last.
