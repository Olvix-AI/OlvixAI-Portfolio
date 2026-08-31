# OlvixAI — Contact Page

`/contact` · Draft v1. Companion to **[Homepage-Copy.md](Homepage-Copy.md)** and
**[Portfolio-Copy.md](Portfolio-Copy.md)**.

**No code changed yet.**

---

## What this page is for

Every CTA on the site lands here. It is the only conversion point OlvixAI has — there is no
signup, no trial, no pricing table to browse. So this page carries the whole close.

It has two jobs, in this order:

1. **Get them to describe the project.** A one-line "get in touch" form gets you "hi, can we
   talk?" and burns a week of back-and-forth. A form with the right five questions gets you
   enough to quote from, or enough to decline fast.
2. **Replace the pricing page.** The home page FAQ answers *how* pricing works; the budget
   field here is where the number actually gets exchanged. That's the honest way for a
   services business to handle price: not published, not hidden, asked.

The design job is the opposite of most contact pages: it should look like the rest of the
site, not like a form. Same container, same mono labels, same serif heading, sharp inputs
(`--radius` is `0.25rem`) with a `rounded-full` submit.

---

## Layout

Two columns on `lg`, stacked on mobile. Container `max-w-[1400px] mx-auto px-6 lg:px-12`,
`py-32 lg:py-40` to clear the fixed nav.

```
┌─────────────────────────────┬──────────────────────────────┐
│ Eyebrow                     │                              │
│ Serif heading               │   The form                   │
│ Sub-copy                    │   (single column, generous   │
│                             │    vertical rhythm)          │
│ ── What happens next (3)    │                              │
│                             │                              │
│ ── Other ways to reach us   │                              │
│                             │   [ Send it ]                │
│ ── Reassurance chips        │                              │
└─────────────────────────────┴──────────────────────────────┘
```

Left column is sticky on `lg` (`lg:sticky lg:top-32`) so the reassurance copy stays beside
the form while they scroll it. Consider `<AnimatedWave />` at low opacity behind the left
column — it's already written, already used in the footer, and fills the space without
inventing a new visual.

**Primitives available and unused in `components/ui/`:** `form`, `input`, `textarea`,
`select`, `radio-group`, `checkbox`, `label`, `field`, `sonner`. Use them rather than
hand-rolling inputs — they're new-york-styled and already match.

---

## Copy — left column

**Eyebrow** `Contact`

**Heading**
```
Tell us what
you're building. ← dimmed line
```

**Sub-copy**
```
The more you put in the box, the more useful our first reply is. A paragraph is plenty —
we'd rather read what you're actually trying to do than a filled-in brief template.
```

### What happens next

Mono numerals, three rows, same treatment as the `I / II / III` steps on the home page.

```
01   You send this
     We read it ourselves. No sales team, no qualification call with someone who
     can't answer technical questions.

02   We reply within two working days
     Either with questions, or with a straight answer that we're not the right team
     for it. You'll know quickly either way.

03   A 30-minute call, then a written scope
     Free, no pitch deck. You come out of it with what we'd build, what it costs, and
     what we think is risky — in writing, and yours to keep.
```

> Point 03 is the strongest thing on the page. "Yours to keep, including if you take it to
> someone else" is a claim almost no agency makes, and it converts because it removes the
> risk of the first commitment entirely.

### Other ways to reach us

```
Email        hello@olvix.io
LinkedIn     /company/olvix
Book a call  <Calendly or Cal.com link>
```

> Publish the email address as a real `mailto:` link. A contact page with only a form reads
> as a company that doesn't want to be contacted, and some buyers — the senior ones — will
> only ever email.

### Reassurance chips

Reuse the chip styling from the ownership section (`border border-foreground/10`, mono, small).

```
NDA on request  ·  You own everything we build  ·  No sales team  ·  Reply in 2 working days
```

---

## Copy — the form

Field labels in mono, uppercase-ish tracking like the section eyebrows. Placeholders do real
work here — they're where you show what a good answer looks like.

### 1 · Name *
```
label:        Your name
placeholder:  —
type:         text, required
```

### 2 · Work email *
```
label:        Work email
placeholder:  you@company.com
type:         email, required
```

### 3 · Company or product
```
label:        Company or product
placeholder:  Name, and a URL if it's live
type:         text, optional
```

### 4 · What do you need? *
```
label:        What do you need?
type:         radio-group, required

  ○  A new AI product built from scratch
  ○  AI added into a product we already have
  ○  Help with something already half-built
  ○  Not sure yet — that's fine
```

> The third option isn't in the offering doc, but it's the single most common real inbound
> for a studio like this: someone has a demo, or an agency that stalled, and needs it
> finished and made production-ready. That's exactly the wedge — worth catching by name.

### 5 · What are you trying to build? *
```
label:        What are you trying to build?
placeholder:  What it does, who it's for, and what's already in place. If there's a
              deadline driving it, say so.
type:         textarea, required, ~6 rows
```

### 6 · Timeline
```
label:        Timeline
type:         select, optional

  As soon as possible
  1–3 months
  3–6 months
  Later this year
  Just exploring
```

### 7 · Budget
```
label:        Budget
helper:       So we can tell you straight away whether it's a fit. "Not sure yet" is a
              real answer.
type:         select, optional

  Not sure yet
  Under $10k
  $10k – $25k
  $25k – $50k
  $50k – $100k
  $100k+
```

> **This field is the pricing page.** Two notes on making it work rather than backfire:
> keep it optional and put "Not sure yet" first, so it reads as calibration rather than a
> gate — a founder who doesn't know the number yet is still a good lead. And the helper text
> has to explain *why* you're asking, or it reads as "how much can we charge you."
>
> Set the band boundaries to your real floor. If you won't take a project under $15k, the
> lowest band should say so — the field's whole value is filtering before anyone spends a
> call.

### 8 · How did you find us?
```
label:        How did you find us?
placeholder:  Referral, search, LinkedIn…
type:         text, optional
```

### Consent line

Not a checkbox — a line of small muted text under the button. A checkbox adds friction for
no legal gain on a plain contact form; the disclosure is what matters.

```
We'll only use this to reply to you. Nothing else, no list, no sharing.
```

> If you start doing any marketing email, this becomes a real opt-in checkbox (unticked by
> default) and you'll need a privacy policy at `/privacy` — the footer already links to one
> that doesn't exist yet. Worth writing before you run ads into this page from the EU.

### Submit
```
button:      Send it
             (bg-foreground text-background, rounded-full, h-14, with the ArrowRight)
pending:     Sending…
sub-line:    Or email hello@olvix.io directly.
```

---

## States

**Success** — replace the form in place rather than navigating away.
```
Heading:  Got it.
Body:     We've read it — or we will within a few hours. Either way you'll have a reply
          within two working days, from one of the four of us.
Link:     While you wait: see what we've built →  /portfolio
```

**Validation error** (inline, per field)
```
Your name         → We need something to call you.
Work email        → That doesn't look like an email address.
What do you need  → Pick the closest one — we'll figure out the rest on the call.
What you're building → A sentence is enough to start.
```

**Submit failure** — the one everyone forgets to write, and the one that loses the lead.
```
Heading:  That didn't send.
Body:     Something on our end. Email hello@olvix.io and we'll pick it up from there —
          your message is worth more to us than our form is.
```

> Never lose the content on a failed submit. Keep the values in state and, ideally, mirror
> the message into `localStorage` so a refresh doesn't wipe a paragraph someone spent five
> minutes on.

---

## Bottom of page

**Three FAQ items**, pulled verbatim from the home page FAQ (§10 of
[Homepage-Copy.md](Homepage-Copy.md)) — the price, timeline and ownership answers — using the
same `accordion` component. Then:

```
More questions →  /#faq
```

Then reuse `<CtaSection />`? **No.** A CTA section on the contact page is a dead end.
Close with the footer.

---

## ⚠ Implementation — this page needs a backend

Nothing in this repo can receive a form submission. There are no API routes, no server
actions, no mail service, no env vars. This is the one item on the whole site that isn't
just components. Three options, cheapest first:

**1 · Third-party form service** — Formspree, Basin, Web3Forms.
Point the `<form>` at their endpoint, done in an afternoon, no backend and no secrets in the
repo. Free tiers are enough for inbound this size. Downside: submissions live in someone
else's dashboard and the free tiers brand the confirmation email.
*Recommended for launch* — it gets the site live, and swapping it out later is a one-file
change.

**2 · Next.js route handler + a transactional email API** — Resend or Postmark.
`app/api/contact/route.ts`, validate with `zod`, send to `hello@olvix.io`. ~50 lines. You own
the flow, submissions arrive as real email, no third-party branding. Needs one env var
(`RESEND_API_KEY`) and a verified sending domain — which means DNS records on olvix.io.
*Worth doing within the first month.*

**3 · Calendly / Cal.com embed instead of a form.**
Skips the form entirely and books the call directly. Higher intent per submission, far fewer
submissions — and it loses the budget and description fields, which are the reason this page
exists. *Best as an addition to the form, not a replacement.* Put it under "Other ways to
reach us."

**Whichever you pick, add these three:**

- **Spam protection.** A public contact form with a textarea gets bot traffic within days. A
  honeypot field is the free 90% solution; Cloudflare Turnstile is the real one and is free.
- **Server-side validation.** Client-side validation is a UX affordance, not a control. If
  you go with option 2, validate in the route handler too.
- **A copy to yourselves.** Route submissions to a shared inbox, not one person's. A lead
  sitting in an unread personal inbox for a week is the most expensive bug on this site.

**Also worth wiring:** `sonner` (already in `components/ui/`) for the submit toast, and a
`loading` state on the button so nobody double-submits.

---

## Metadata

```
title:       Get a quote — OlvixAI
description: Tell us what you're building. We'll come back within two working days with
             what it takes, what it costs, and whether we're the right team for it.
```

`robots`: indexable. This page should rank for "hire AI development team" style queries, and
the FAQ items at the bottom help with that.

---

## Open items

| # | Item | Blocks |
|---|---|---|
| 1 | Pick a form backend (option 1, 2 or 3 above) | The page functioning at all |
| 2 | Confirm `hello@olvix.io`, and that it goes to a shared inbox | The page, the footer |
| 3 | Set the real budget bands — what's your floor? | Field 7 |
| 4 | Calendly / Cal.com link, if you want one | "Other ways to reach us" |
| 5 | LinkedIn company URL | "Other ways to reach us", footer |
| 6 | A privacy policy at `/privacy` | The footer link, and EU traffic |
