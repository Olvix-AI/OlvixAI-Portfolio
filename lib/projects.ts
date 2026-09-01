/**
 * Portfolio data — the six OlvixAI case studies.
 *
 * All copy here is verbatim from `docs/Portfolio-Copy.md` (§A–§E). The pages in
 * `app/portfolio/` are one index plus one `[slug]` template driven entirely by this
 * file, so copy edits happen here and nowhere else.
 *
 * Two rules baked into the shape below, both from the copy doc's "honesty checks":
 *  1. Every project carries its true `Type` in `meta[0]` and repeats it as the hero
 *     eyebrow and the first card tag. It is not optional and must not be softened.
 *  2. `decisions` is the most valuable content on these pages. It is typed as full
 *     paragraphs, never bullets, and the template gives it its own visual treatment.
 */

/** One row of the Type / Domain / Timeframe / Team / Status strip under the hero. */
export interface MetaRow {
  label: string;
  value: string;
}

/** A single named capability inside a "What we built" group. */
export interface CapabilityItem {
  /** Bolded name, e.g. "Profile Insights". */
  title: string;
  /** The clause that follows the em dash in the copy doc. */
  body: string;
}

/**
 * A block of "What we built". Some groups are pure prose (PowerUp's AI capture,
 * Agentic Decks' Pillar A), some are pure lists, and Pillar B is prose-after-list —
 * hence separate `intro` and `outro` slots around `items`.
 */
export interface CapabilityGroup {
  /** e.g. "The mobile app", "Pillar B — Bring your own deck". Omit for a single unnamed group. */
  title?: string;
  /** The trailing clause on the group's own heading line. Rendered after an em dash. */
  lede?: string;
  /** Paragraphs before the item list. */
  intro?: string[];
  items?: CapabilityItem[];
  /** Paragraphs after the item list. */
  outro?: string[];
}

/**
 * One row of the stack table. The copy doc separates entries within a layer with
 * " · "; that separator is presentational, so it is stored pre-split and rendered
 * as a stacked list — much more readable than one long run-on cell.
 */
export interface StackRow {
  layer: string;
  items: string[];
}

/** A "Decisions" essay: the obvious approach, why it fails, what we did instead. */
export interface Decision {
  title: string;
  paragraphs: string[];
}

export interface ResultRow {
  label: string;
  value: string;
}

/** A figure worth animating in. Kept to one or two per page on purpose. */
export interface HeadlineFigure {
  value: number;
  prefix?: string;
  /** Anything non-integer lives here, e.g. ".3%" on 92 to render "92.3%". */
  suffix?: string;
  label: string;
}

export interface Results {
  /** Prose that qualifies the table — usually an honest "no metrics collected". */
  note?: string;
  /** One or two animated figures shown above the table. */
  headline?: HeadlineFigure[];
  /** Table header. Omitted where the copy doc's table has no header row. */
  columns?: [string, string];
  rows: ResultRow[];
}

export interface Screenshot {
  /** Path under /public. */
  src: string;
  alt: string;
  caption?: string;
}

/** The index card for a project — §A of the copy doc. */
export interface ProjectCard {
  /** Exactly three, matching the `>` line under each card heading in §A. */
  tags: [string, string, string];
  /** The one-paragraph pitch. */
  pitch: string;
  /** The bolded headline metric. */
  metric: string;
  /** The muted run-on after the metric, e.g. "8 months · 2 OlvixAI engineers". */
  detail: string;
}

/**
 * Short-form copy for the home page "Selected work" teaser (§5 of Homepage-Copy.md).
 *
 * Deliberately shorter and differently worded than `card` — the teaser renders at
 * display type in a rotating panel, the card renders as body text in a grid. Same
 * project, two contexts, two lengths. Only the copy is duplicated; `name` and `slug`
 * come from the project itself, so the home page can never link to a slug that has
 * stopped existing.
 */
export interface ProjectTeaser {
  /** The one-line pitch, rendered as the large serif line. */
  pitch: string;
  /** Engagement type, e.g. "Client engagement". */
  engagement: string;
  /** Domain, e.g. "Health-tech". */
  domain: string;
  /** The "Key Result" figure. */
  metric: string;
}

export interface Project {
  slug: string;
  /** Display order, zero-padded. Rendered in mono. */
  number: string;
  name: string;
  /** Home page teaser copy. See ProjectTeaser. */
  teaser: ProjectTeaser;
  /** The project's true type, doubling as the hero eyebrow. */
  eyebrow: string;
  oneLiner: string;
  /** <title> for the case-study page. */
  pageTitle: string;
  metaDescription: string;
  card: ProjectCard;
  meta: MetaRow[];
  challenge: string[];
  /** HRXpert has no "Our role" block in the copy doc; the section is skipped there. */
  role?: string[];
  built: {
    intro?: string;
    groups: CapabilityGroup[];
  };
  stack: StackRow[];
  decisions: Decision[];
  results: Results;
  /**
   * Intentionally empty for every project. See the TODO on each one: the assets in
   * `docs/` contain real names, contact details and health data and need a manual
   * scrub (and a WebP conversion) before they can be copied into `public/`.
   * The gallery renders nothing at all while this is empty.
   */
  screenshots: Screenshot[];
}

export const projects: Project[] = [
  // ───────────────────────────────────────────────────────────── §B · PowerUp ──
  {
    slug: "powerup",
    number: "01",
    name: "PowerUp",
    teaser: {
      pitch:
        "A B2B wellness platform rebuilt for the web, extended to iOS and Android, and taught to read a blood pressure monitor through the phone camera.",
      engagement: "Client engagement",
      domain: "Health-tech",
      metric: "Live on both app stores",
    },
    eyebrow: "Client engagement",
    oneLiner:
      "A workplace wellness platform rebuilt on the web, extended to iOS and Android, and taught to read a blood pressure monitor through the phone camera.",
    pageTitle: "PowerUp — OlvixAI",
    metaDescription:
      "A B2B wellness platform rebuilt for web and native mobile, with a purpose-trained vision model that reads home health devices through the phone camera.",
    card: {
      tags: ["Client engagement", "Health-tech", "Web + iOS + Android"],
      pitch:
        "A B2B workplace wellness platform, rebuilt on the web and extended to native mobile — with a vision model we trained that reads blood pressure, glucose and heart rate straight off the screen of a home health device, so nobody has to type a number in.",
      metric: "Live on the App Store and Google Play",
      detail: "8 months · 2 OlvixAI engineers",
    },
    meta: [
      { label: "Type", value: "Contract engagement — PowerUp Global" },
      { label: "Domain", value: "Health-tech · corporate wellness (B2B)" },
      { label: "Timeframe", value: "~8 months, web and mobile" },
      {
        label: "Team",
        value: "2 OlvixAI engineers, plus the client's in-house backend developer",
      },
      { label: "Status", value: "Live — app.powerupglobal.io, App Store and Google Play" },
    ],
    challenge: [
      "PowerUp sells to employers, not consumers. An organisation buys it so its people can profile their own health across a nine-dimension wellness model — seventy-plus underlying metrics — and so the organisation can see what absence, presenteeism and workplace accidents are actually costing it.",
      "That business model puts unusual weight on data quality. The product only works if a large population of employees keeps feeding it accurate information, over months, without anyone chasing them. Two things stood in the way.",
      "The first was the existing web front end. It carried a long, demanding assessment, and the employer buying the product didn't like it enough to put it in front of staff. For a platform sold on organisation-wide rollout, that isn't cosmetic — a front end people bounce off is a product that never accumulates the data it needs.",
      "The second was that PowerUp had no mobile presence at all. Health data doesn't live on a laptop. It lives on the phone, in Apple Health and Android Health Connect, and on the wearables that write into them. And it lives, stubbornly, on a category of device with no API of any kind: the blood pressure monitor on the kitchen counter, the glucose meter in the drawer. Those readings are the ones the platform most wants and the ones nobody reliably types in. Reading four digits off an LCD and retyping them is a small friction repeated daily — which means it stops happening within a week.",
    ],
    role: [
      "OlvixAI owned the entire client-facing surface of the product and the machine learning behind the capture feature. Two engineers split four areas: a full redesign of the web platform including flows that didn't previously exist; the mobile app designed and built from scratch for both platforms; the vision model that reads home health devices, plus the correction and retraining loop behind it; and DevOps — environment management for the web platform and the release pipelines for both app stores.",
      "The boundary is worth stating plainly. The platform API and the FastAPI service serving the vision model were built and maintained by the client's in-house developer. Where the redesign or the app needed a backend change, we specified it and it was implemented on their side. We integrated against that backend rather than owning it.",
    ],
    built: {
      groups: [
        {
          title: "The web platform",
          lede: "the client's psychometric instrument left intact, everything around it rebuilt.",
          items: [
            {
              title: "Profile Insights",
              body: "the landing view for a completed profile: performance score, physical activity status, BMI, and rolled-up rings showing how many dimensions are green, amber and red.",
            },
            {
              title: "Healthy Living Indicators",
              body: "all nine dimensions, readable two ways: a radar chart for shape and a bar chart for comparison, each clickable through to what it measures and why the score is what it is.",
            },
            {
              title: "Health Status detail",
              body: "per-topic breakdowns across alcohol, BMI, activity, nutrition, stress, smoking, mental health, blood pressure, heart and stroke risk, and back problems. Plain-language context, current standing, target beside it.",
            },
            {
              title: "Workplace Key Metrics",
              body: "the employer-facing half of the value proposition rendered for the individual: absence, presenteeism and accident figures plotted against the organisation's distribution, its average, and the user's target.",
            },
            {
              title: "The assessment",
              body: "rebuilt around the reality that nobody finishes it in one sitting. Visible progress, section numbering, save-and-exit, and a resume path that returns you exactly where you stopped.",
            },
          ],
        },
        {
          title: "The mobile app",
          lede: "React Native and Expo, both stores from one codebase. Not a wrapper around the web product; it exists to do what a phone can and a browser can't.",
          items: [
            {
              title: "Native health sync",
              body: "steps, distance, active and resting calories read from Apple HealthKit and Android Health Connect, so anything the phone or wearable already records flows in without being re-entered.",
            },
            { title: "Camera capture", body: "see below." },
            {
              title: "The profile on mobile",
              body: "the same nine-dimension assessment laid out for a phone, so seventy-plus insights can be worked through in short sittings.",
            },
            {
              title: "Points and notifications",
              body: "a light gamification layer aimed squarely at the retention problem that makes or breaks a wellness rollout.",
            },
          ],
        },
        {
          title: "AI capture from home health devices",
          lede: "the part that attacks the data-quality problem directly.",
          intro: [
            "The user points the camera at a device with no connectivity of any kind — a blood pressure monitor, a glucose meter, a heart rate readout — and takes a photo. A server-side vision model we trained for this specific task extracts the values and returns them into the form, already filled in. For a blood pressure monitor that's systolic, diastolic and pulse, parsed out of one photograph of a seven-segment LCD.",
            "Three reading types are supported. In every case the entry the user was going to make by hand still gets made — the model just makes it first.",
          ],
        },
      ],
    },
    stack: [
      {
        layer: "AI / ML",
        items: [
          "A vision model trained in-house for reading home health-device displays",
          "server-side inference",
          "a correction-driven retraining loop, retrained bimonthly on user-corrected readings",
        ],
      },
      { layer: "Frontend (web)", items: ["Next.js", "React", "Tailwind CSS"] },
      {
        layer: "Mobile",
        items: [
          "React Native",
          "Expo",
          "Apple HealthKit and Android Health Connect",
          "camera capture",
          "in-app notifications",
          "one codebase, both stores",
        ],
      },
      {
        layer: "Backend",
        items: [
          "FastAPI inference service on Azure, plus the core platform API — both owned by the client's developer",
        ],
      },
      {
        layer: "Infrastructure",
        items: [
          "Azure for inference",
          "web deployment and environment management",
          "App Store and Google Play release pipelines — owned by OlvixAI",
        ],
      },
    ],
    decisions: [
      {
        title: "The camera is an assist, never an authority",
        paragraphs: [
          "A model reading a blood pressure monitor is reading a clinical number. Silently writing a misread value into someone's health record is a far worse failure than not reading it at all, because the user has no way of knowing it happened — and in a product an employer has asked its staff to trust, one bad number that surfaces later costs more credibility than the feature ever earned.",
          "So extraction commits nothing. It pre-fills the form. The user sees the photo they just took with the parsed values in editable fields beneath it, and nothing saves until they confirm. Practically, that turns data entry into a glance-and-tap, which is the actual win. The model isn't there to be autonomous. It's there to remove keystrokes.",
        ],
      },
      {
        title: "Every correction is a training example",
        paragraphs: [
          "That confirmation step is also the most valuable thing in the system, and treating it as merely a safety net would waste it. When a user edits a value the model got wrong, the edit is a labelled example: a real photograph, taken by a real user, on real hardware, in real lighting, paired with ground truth. No synthetic dataset gives you that distribution.",
          "So corrections are captured and the model retrains on them bimonthly. It improves specifically where its users struggle — the device models, screen types and lighting found in the field, not the ones that happened to be in the original training set. The safety mechanism and the improvement mechanism are the same mechanism.",
        ],
      },
      {
        title: "A purpose-trained model rather than a general OCR service",
        paragraphs: [
          "The cheap route is a general-purpose OCR or vision API. We trained a model instead, because this is a narrow, closed visual domain — segmented LCD digits in fixed positions on a small set of consumer device layouts, photographed at arm's length. Narrow domains are where a purpose-trained model beats a general one on both accuracy and cost per call. It also means the model belongs to the client and improves on the client's own data, rather than the feature's quality being pinned to whatever a third party ships next.",
        ],
      },
      {
        title: "Syncing health data on open, not in the background",
        paragraphs: [
          "Background health sync is expensive in the two currencies that matter for a wellness app: battery, and the permissions you have to ask for. Both platforms treat persistent background access to health data as a serious grant — and an employee being asked by their employer's app for always-on access to their health records is a conversation the product doesn't need to have.",
          "Sync-on-open gives the user current data every time they actually look, at no battery cost, behind a permission prompt that's much easier to say yes to. The tradeoff — data fresh as of last open rather than continuously — is invisible in a product whose interaction model is already daily check-in rather than live monitoring.",
        ],
      },
    ],
    results: {
      note: "No formal product metrics were tracked on this engagement, so there are no adoption, retention or model-accuracy figures to report. What is real and checkable is what shipped.",
      headline: [
        { value: 2, label: "App stores shipped to" },
        { value: 3, label: "Reading types automated" },
      ],
      rows: [
        {
          label: "Product surfaces",
          value:
            "Two — a fully redesigned B2B web platform, and a native mobile app for iOS and Android built from scratch",
        },
        {
          label: "Mobile release",
          value:
            "Published and live on the App Store and Google Play, from one React Native / Expo codebase",
        },
        {
          label: "Reading types automated",
          value: "Three — blood pressure, blood glucose, heart rate",
        },
        { label: "Team", value: "Two OlvixAI engineers across web, mobile, ML and DevOps" },
      ],
    },
    // TODO: assets live in `docs/PowerUp/` (4 web) and `docs/PowerUp-App/` (6 mobile).
    // They show real health readings and must be scrubbed — and converted to WebP —
    // before being copied into `public/` and listed here.
    screenshots: [],
  },

  // ─────────────────────────────────────────────── §F · Trading Operations ──
  {
    slug: "trading-operations",
    number: "02",
    name: "Trading Operations",
    teaser: {
      pitch:
        "An import/export trading company's entire operation — enquiry to final payment, across three legal entities — with AI drafting the paperwork and staff approving every decision.",
      engagement: "Client engagement",
      domain: "B2B operations",
      metric: "Full lifecycle verified live",
    },
    eyebrow: "Client engagement",
    oneLiner:
      "An operations platform that runs an import/export trading business from customer enquiry to final payment, with AI drafting the repetitive paperwork and staff approving every decision.",
    pageTitle: "Trading Operations — OlvixAI",
    metaDescription:
      "An operations automation platform for an import/export trading company: an 18-step order lifecycle across three legal entities, with AI-assisted drafting and vendor quote extraction under human approval.",
    card: {
      tags: ["Client engagement", "B2B operations", "Web app + AI extraction"],
      pitch:
        "An import/export trading business ran on spreadsheets, email and a status sheet somebody updated by hand every day. We replaced it with a guided 18-step order lifecycle across three legal entities — RFQs, quote comparison, purchase orders, shipping documents, GST invoicing and payment reconciliation — with AI drafting the repetitive paperwork and pulling line items out of vendor quotes, and staff approving every decision.",
      metric: "Full enquiry-to-paid lifecycle verified live",
      detail: "Mid-2026 · 7-person ops team, 3 entities",
    },
    meta: [
      { label: "Type", value: "Client project — SMC Group" },
      {
        label: "Domain",
        value: "Import/export trading · industrial and defence buyers",
      },
      {
        label: "Timeframe",
        value: "Built and verified mid-2026; live end-to-end verification July 2026",
      },
      {
        label: "Team",
        value:
          "Delivered to a 7-person shared operations team running three import/export entities",
      },
      { label: "Status", value: "Verified live end to end" },
    ],
    challenge: [
      "SMC Group imports industrial and technical goods from international suppliers and resells them to industrial and defence customers. Every deal is operationally heavy: RFQs out to vendors, quote comparison across currencies, purchase orders, shipping documents, goods receipt, delivery challans, GST invoicing, payment reconciliation — routinely with partial shipments and partial payments landing against the same order.",
      "All of it ran on spreadsheets, email, and a status sheet somebody updated by hand every day. That meant slow handoffs between sales, procurement, warehouse and accounts, the same documents retyped for every deal, and nowhere to look to find out where an order actually stood.",
      "The multiplier was three companies sharing one team. The same seven people operate three legal entities, which turns every pricing decision, every document number and every cross-company lookup into somewhere an error can hide — and a manual process gives you no way to find it afterwards.",
    ],
    role: [
      "End-to-end delivery: requirements, architecture, backend, frontend, AI integration, testing and deployment documentation.",
      "That started with translating the client's real trading process and their actual document formats into a formal spec and capability matrix — the part that decides whether software like this fits the business, or the business has to bend around the software. From there: the modular monolith backend with capability-based RBAC and per-company data isolation, the React SPA carrying role-based dashboards and the order-detail workflow, the Claude integration for drafting and extraction, deterministic PDF generation and GST invoicing, and live end-to-end verification across all eighteen steps.",
    ],
    built: {
      groups: [
        {
          title: "The order lifecycle",
          lede: "one screen, eighteen steps, and only the next valid action visible.",
          items: [
            {
              title: "18-step order lifecycle",
              body: "enquiry through vendor sourcing, procurement, shipment, delivery, invoicing and payment, on a single order-detail screen. Each role sees only the action that is theirs and next: Sales, Purchase, Owner, Sales, Purchase, Warehouse, Accounts, then automatic reconciliation.",
            },
            {
              title: "Quote comparison",
              body: "vendors ranked by effective cost — price adjusted for payment terms — with a caution flag when the comparison crosses currencies, and an Owner approval gate before any procurement spend.",
            },
            {
              title: "Multi-company operations",
              body: "three entities running in isolation, a consolidated view for Owner and Admin, and gap-free sequential document numbering per company.",
            },
            {
              title: "Live status board",
              body: "replaces the manual daily-update sheet, refreshing roughly every thirty seconds.",
            },
            {
              title: "Receivables and reporting",
              body: "partial payments, CRV-gated payment release, aging tiers, and revenue, GST and margin reports exportable to PDF and Excel.",
            },
            {
              title: "Full audit trail",
              body: "every state change logged with who, what, when, and the before and after. Nothing is hard-deleted.",
            },
          ],
        },
        {
          title: "Where the AI sits",
          lede: "three touchpoints, all of them drafting rather than deciding.",
          intro: [
            "Claude writes vendor RFQ cover letters, extracts structured line items out of vendor quote documents with confidence flags on low-certainty fields, and drafts payment reminders. Nothing is sent or finalised without a person approving it.",
            "The numbers that matter are never model output. Vendor RFQ, Commercial Offer, customer and vendor purchase orders, GRN, Delivery Challan and the GST Sales Tax Invoice are all generated deterministically as PDFs from system data.",
          ],
          outro: [
            "The design principle, stated once and enforced everywhere: AI drafts, humans approve, and the backend is authoritative on money, GST and document numbers. Nothing financial is recomputed in the browser.",
          ],
        },
      ],
    },
    stack: [
      {
        layer: "AI / ML",
        items: [
          "Anthropic Claude (claude-sonnet-4-6)",
          "Groq fallback (openai/gpt-oss-120b)",
          "Pydantic v2 schema validation",
          "Structured JSON extraction",
          "ai_outputs audit logging",
        ],
      },
      {
        layer: "Frontend",
        items: [
          "Vite · React 18 · TypeScript",
          "React Query · Zustand · React Router · Axios",
          "Tailwind CSS · Recharts",
          "Vitest · Testing Library · MSW",
        ],
      },
      {
        layer: "Backend",
        items: [
          "Python 3.12 · FastAPI",
          "SQLAlchemy 2 (async) · Alembic",
          "PostgreSQL 16 · Redis 7",
          "JWT auth · bcrypt",
          "WeasyPrint (PDF) · openpyxl (Excel)",
        ],
      },
      {
        layer: "Infrastructure / DevOps",
        items: [
          "Docker Compose for local development",
          "Vercel (frontend)",
          "Container host with managed Postgres / Supabase",
          "S3-compatible object storage for PDFs",
          "GitHub Actions CI",
          "HMAC-signed file URLs",
        ],
      },
    ],
    decisions: [
      {
        title: "AI that never blocks the business",
        paragraphs: [
          "An operations platform cannot depend on a language model being available. If the LLM is down, the trading company still has to send RFQs — so a design where the workflow waits on an API is a design that stops the business for reasons the business cannot see or fix.",
          "All three AI touchpoints route through one call layer with a defined fallback ladder: try Anthropic, retry on Groq with JSON mode forced, and if both fail, degrade to a pre-filled manual form so the eighteen-step cycle continues. Every output is validated against a Pydantic schema before it reaches a user or a document, retrying up to three times. Token usage and confidence are logged for cost and quality tracking.",
          "The result is that the AI is a labour saving on a process that already works without it. That is the only version of this a business can actually run on.",
        ],
      },
      {
        title: "Correctness on the paths that aren't the happy one",
        paragraphs: [
          "Import/export trading is not linear, and a system that only models the clean path quietly produces wrong numbers. Partial receipts, partial payments, several delivery challans and several invoices against one order are normal here, not exceptional.",
          "They are all first-class flows, and the backend enforces the rules rather than trusting the interface: over-receipt is rejected, GST invoicing is blocked before delivery is confirmed, payment is blocked before CRV where the customer requires it, and vendor purchase orders are priced from the winning vendor quote rather than from the company's own selling price.",
          "Several of those guards exist because live end-to-end testing found the gap. That is the argument for running a real order through the whole cycle before handover rather than testing the steps in isolation.",
        ],
      },
      {
        title: "A modular monolith, not microservices",
        paragraphs: [
          "The requirement is roughly 100 to 150 concurrent users across three companies that constantly need consistent reads of shared reference data. Microservices would have bought independent scaling nobody needed and paid for it in distributed transactions across exactly the data where a trading business cannot tolerate drift.",
          "So: one PostgreSQL database with native ACID, one deployable, and company scoping enforced server-side through a company header plus capability RBAC rather than through separate services. Adversarial testing verified fifteen of fifteen isolation and RBAC scenarios — cross-company reads return 404, a forged company header returns 403, role-action mismatches return 403.",
        ],
      },
      {
        title: "The extraction bug worth writing down",
        paragraphs: [
          "An early version of quote extraction sent the model the document's storage key instead of the document. It returned plausible output — which is the failure mode that matters, because plausible output from a model that never saw the input is indistinguishable from working software until somebody checks a number against the source.",
          "The fix was to pass the document text into the prompt along with the enquiry line context, so part numbers have something to match against. Live verification then extracted two vendor quotes at 0.97 to 0.99 confidence, with correct EUR and PKR totals and lead times normalised — '6 weeks' resolved to 42 days.",
          "The lesson generalises past this project: with an LLM feature, 'it returned something' is not evidence that it read anything.",
        ],
      },
    ],
    results: {
      note: "The figures below come from the project's QA and end-to-end verification reports. No production usage metrics — orders processed, time saved, revenue impact — were tracked, so none are claimed.",
      headline: [
        { value: 76, suffix: "/76", label: "Backend tests passing" },
        { value: 15, suffix: "/15", label: "RBAC and adversarial checks passed" },
      ],
      columns: ["Check", "Result"],
      rows: [
        {
          label: "Full enquiry-to-paid lifecycle",
          value:
            "Completed live on hosted Supabase — including partial receipt, two delivery challans, two invoices, CRV gating, partial payments and automatic order close-out",
        },
        { label: "Backend tests", value: "76/76 pytest passing in-container" },
        {
          label: "Frontend tests",
          value: "6/6 Vitest passing; production build ~311 KB (~98 KB gzipped)",
        },
        {
          label: "Security",
          value: "15/15 RBAC and adversarial isolation checks passed live",
        },
        {
          label: "AI confidence",
          value: "RFQ draft 0.92; vendor quote extraction 0.97–0.99",
        },
        {
          label: "Audit trail",
          value:
            "73 audit rows visible in the consolidated Owner view for a single test order",
        },
        {
          label: "Design target, not measured in production",
          value:
            "RFQ generation under 5 minutes including human review, against roughly 45 minutes manual for a 30-line RFQ",
        },
      ],
    },
    // TODO: no screenshots supplied for this project. Anything added must be scrubbed
    // first — the order screens carry real customer, vendor and pricing data.
    screenshots: [],
  },

  // ─────────────────────────────────────────────────────── §C · Agentic Decks ──
  {
    slug: "agentic-decks",
    number: "03",
    name: "Agentic Decks",
    teaser: {
      pitch:
        "An agent that writes a real PowerPoint deck from a conversation, then edits any deck you upload without ever corrupting the file.",
      engagement: "Production feature",
      domain: "Enterprise AI",
      metric: "Live in production",
    },
    eyebrow: "Production feature",
    oneLiner:
      "An AI agent that writes a complete, on-brand PowerPoint deck from a conversation — then edits any deck you already have, including ones it never wrote.",
    pageTitle: "Agentic Decks — OlvixAI",
    metaDescription:
      "An AI agent that writes complete PowerPoint decks from a conversation, and edits any deck you upload without corrupting the file.",
    card: {
      tags: ["Production feature", "Enterprise AI", "Agents + document engine"],
      pitch:
        "An AI agent that writes a complete, on-brand PowerPoint deck from a conversation — then turns around and edits any deck you upload, including ones it never wrote, without ever producing a file PowerPoint refuses to open.",
      metric: "Live in public production",
      detail: "Built across 2026 · Sole owner of the module",
    },
    meta: [
      { label: "Type", value: "Production feature of a commercial AI platform" },
      { label: "Domain", value: "Enterprise AI · document automation" },
      { label: "Timeframe", value: "Built in stages across 2026; live in public production by August" },
      {
        label: "Team",
        value: "Part of a multi-engineer product team; sole designer and builder of this capability",
      },
      { label: "Status", value: "Live in production" },
    ],
    challenge: [
      "Building a deck is one of the most common and least enjoyable pieces of knowledge work there is, and the options were both bad. Do it by hand and lose hours to layout. Ask a general-purpose LLM and get a wall of bullet text that still has to be designed by a human — output that doesn't survive contact with the real file format. Text overruns its box, the visual language changes every slide, and what comes back is usually a web page or an image rather than a genuine, editable PowerPoint file someone can take into a meeting.",
      "The larger gap was on the other side. Almost every AI presentation tool abandons the user the moment they already have a deck — and real work is rarely a blank canvas. It's last quarter's board deck that needs restyling, a partner's file that has to move into the company template, one slide somebody wants rebuilt around a different layout. Doing that by hand is slide-by-slide manual labour. Doing it naively with an LLM means letting a model rewrite a binary Office document, which is a fast route to a file the customer's PowerPoint refuses to open.",
      "Nothing on the market let a user upload their own deck and talk to it with any confidence that the file would still work afterwards.",
    ],
    role: [
      "Sole owner of the presentation capability inside a larger product team, end to end: the agent architecture — multi-step deck generation, the conversational editor, and the intent layer that decides when to build, when to edit and when to stop and ask a question; the Python services, persistence, streamed progress and file delivery behind it; the document engine for reading and safely modifying native PowerPoint files, and the agent-facing tool surface exposing it; the design system and the renderer that converts a rendered design into a real .pptx; and a variant of the whole feature for a compliance-constrained environment where an entire class of third-party dependency wasn't permitted.",
      "The surrounding chat product, its authentication, and infrastructure ownership were not ours. We integrated into those.",
    ],
    built: {
      groups: [
        {
          title: "Pillar A — Create a deck by talking",
          intro: [
            "The user just asks. The agent works out whether it has enough to go on and asks for what's missing — how long, who for — instead of quietly guessing. A deck can be grounded on four things: a topic, an uploaded PDF or Word document, the conversation the user has already been having, or analysis produced elsewhere in the product.",
            "From there it reads or researches the source, plans the entire deck before writing any of it, and puts that plan through a review pass for narrative flow, balance and variety — so a weak structure is caught while it's still cheap to fix. Only then are the slides written, many at once, each assigned a real designed layout from a large template library rather than poured into a generic bullet list. Imagery is sourced or generated to match. What arrives is a genuine PowerPoint file the user can open and keep working in.",
            "And it doesn't stop at delivery. The user keeps talking — \"make slide three shorter\", \"swap that image\", \"add a closing slide\". The deck is edited in place, only the affected slides are rebuilt, and the updated file comes straight back.",
          ],
        },
        {
          title: "Pillar B — Bring your own deck",
          items: [
            {
              title: "Precise editing",
              body: "wording, fonts, colours, sizes, bullets, tables, chart data, speaker notes, pictures, and deck-wide theme colours and fonts.",
            },
            {
              title: "Layout intelligence",
              body: "align, distribute, arrange into a grid, place one shape relative to another, centre on the slide. The system quietly keeps shapes on the slide and off each other, and tells the agent when it has adjusted something so the agent can explain it.",
            },
            {
              title: "Whole-slide redesign",
              body: "pick, or have the agent search for, a layout from a curated bank of professionally designed slides, and have an existing slide rebuilt into it. The user's own theme, colours and branding are kept; content is reflowed and pictures matched. The same path authors a brand-new slide from a one-line brief.",
            },
            {
              title: "Deck migration",
              body: "stage a foreign deck alongside the user's own and move it across wholesale. Every slide gets a proposed layout in the user's template; the user reviews and edits that plan before anything is written; then the deck is rebuilt slide by slide on their branding, carrying tables, charts, images and speaker notes across.",
            },
          ],
          outro: [
            "Everything is versioned. Each change is a discrete recorded step, the history is visible, any earlier point can be restored, and the original upload is never modified.",
            "What makes this AI-powered rather than a set of buttons: every capability above is exposed to the model as a tool, so the assistant plans and composes them itself. It decides which layout suits a slide, how content should be redistributed into a new arrangement, what a picture should show — and when to ask a clarifying question instead of acting on a guess.",
          ],
        },
      ],
    },
    stack: [
      {
        layer: "AI / ML",
        items: [
          "GPT-class reasoning models on Azure OpenAI, tiered by task",
          "LangGraph and LangChain for orchestration",
          "an MCP tool server",
          "schema-constrained structured output (Pydantic)",
          "retrieval-augmented grounding over uploaded PDF/Word with vector search",
          "CPU-only static embeddings for layout retrieval",
          "stock-photo APIs and generative image models",
        ],
      },
      {
        layer: "Frontend",
        items: [
          "React",
          "Next.js (App Router)",
          "TypeScript",
          "Tailwind CSS — a large library of slide designs authored as components",
          "server-sent events for streamed progress and chat",
        ],
      },
      {
        layer: "Backend",
        items: [
          "Python",
          "FastAPI",
          "MongoDB",
          "python-pptx and lxml working directly against the OOXML package",
          "headless Chromium for layout measurement",
          "Pydantic throughout",
        ],
      },
      {
        layer: "Infrastructure",
        items: [
          "Docker, one image with a Node sidecar",
          "Kubernetes with multiple replicas and blue/green rollouts",
          "Azure Blob Storage with short-lived signed URLs",
          "Azure OpenAI",
          "CI on push",
          "structured logging with per-run tracing",
        ],
      },
    ],
    decisions: [
      {
        title: "Making an LLM safe to point at a binary document format",
        paragraphs: [
          "The obvious design — let the model write the file — is the one that fails in production. An Office document is a bundle of interdependent XML parts. A small mistake doesn't produce a slightly wrong slide, it produces a file PowerPoint refuses to open. A user who sees that once stops trusting the product entirely.",
          "So the model never writes the file. It chooses from a closed vocabulary of typed, validated operations, and a deterministic engine applies them. Everything a user could want — retype a line, recolour a shape, move a picture, add a table row, swap a theme font, rebuild a whole slide — is one of those operations.",
          "The payoff compounds. Every edit is validated before it touches anything, and a batch either fully applies or fully rolls back. The edit history is a recorded sequence, so undo is exact rather than approximate. The original upload is never mutated. And an entire failure class — the model emitted markup that corrupted the deck — simply doesn't exist. It also made the engine unit-testable, which is why it carries a real test suite instead of being verified by opening files and squinting at them.",
        ],
      },
      {
        title: "One source of truth for how a slide looks",
        paragraphs: [
          "A deck has to look right in two places: in the product's own preview, and in PowerPoint on somebody else's laptop. The tempting approach is two layout implementations, one per target — and they drift within weeks.",
          "Instead the design system is authored once, as web components, and the native file is derived from what that design system actually rendered rather than laid out a second time from scratch. Adding a new slide design became a front-end task rather than a two-sided one, which is why the library grew to twenty-one visual families without fidelity falling apart.",
          "Two supporting rules made it hold. If the renderer is unavailable the build fails loudly rather than silently shipping a bland, unstyled deck — a plausible-looking wrong output is far worse than an honest error, because the user can't tell it went wrong. And length budgets are advertised to the writer up front, so text is written to fit its box rather than truncated after the fact.",
        ],
      },
    ],
    results: {
      headline: [{ value: 21, label: "Slide design families" }],
      rows: [
        { label: "Status", value: "Live in public production since August 2026" },
        {
          label: "Slide design families",
          value: "21, authored once and rendered to both preview and native file",
        },
        {
          label: "Corrupted-file failure class",
          value: "Eliminated by construction — the model never writes the file",
        },
        {
          label: "Compliance variant",
          value:
            "A full build of the feature for an environment where a whole class of third-party dependency was not permitted",
        },
      ],
    },
    // TODO: no screenshots exist for this project, and any that were captured would
    // need clearance — it is a live commercial feature of an employer's product.
    screenshots: [],
  },

  // ─────────────────────────────────────────────────────────── §G · EpochsLab ──
  {
    slug: "epochslab",
    number: "04",
    name: "EpochsLab",
    teaser: {
      pitch:
        "Describe an ML goal in plain English and get back a trained, stored model — data found, code written, GPU job run, and the notebook is yours to export.",
      engagement: "Own product",
      domain: "MLOps",
      metric: "Plain English in, trained model out",
    },
    eyebrow: "Own product",
    oneLiner:
      "Describe an ML goal in plain English; get back a trained model, its artifacts, and a live notebook you can export.",
    pageTitle: "EpochsLab — OlvixAI",
    metaDescription:
      "An AI-powered ML automation platform: agents find the data, write the preprocessing and training code, run the job on cloud GPUs, and hand back a stored, exportable model.",
    card: {
      tags: ["Own product", "MLOps", "Multi-agent + GPU training"],
      pitch:
        "A platform where you describe the model you need in plain English and a team of agents does the pipeline — finds or ingests the data, profiles and cleans it, decides whether to train from scratch or fine-tune, runs the job on cloud GPUs, then stores the trained model and hands you the live notebook it wrote along the way.",
      metric: "Problem description to trained model",
      detail: "Late 2025 – 2026 · solo build",
    },
    meta: [
      { label: "Type", value: "Own product — startup build" },
      { label: "Domain", value: "Developer tools · MLOps" },
      { label: "Timeframe", value: "Late 2025 – 2026" },
      {
        label: "Team",
        value:
          "Solo — product vision, agent architecture, backend, frontend and system design",
      },
      { label: "Status", value: "In development" },
    ],
    challenge: [
      "Most people who need a trained model for a real problem are not blocked on ideas. They are blocked on the pipeline. Finding a usable dataset, cleaning it, choosing an architecture, deciding whether to train from scratch or fine-tune something that already exists, getting a GPU job to run, and saving the result in a form you can use later — every one of those is a specialist step, and together they are days of setup before you learn whether the idea was any good.",
      "The tools that exist mostly automate the modelling and leave the rest. AutoML will search architectures once you already have clean data and know what you are predicting. It will not go and find the dataset, and it will not tell you that fine-tuning a pretrained model is the better call for what you actually have.",
      "EpochsLab is built to close the whole gap: someone with basic ML knowledge should be able to go from a problem described in a sentence to a trained, stored model, without writing the pipeline by hand — and without the process being a black box they have to take on faith.",
    ],
    role: [
      "A solo build covering product vision, the agent architecture, backend, frontend and system design end to end.",
      "That means the LangGraph multi-agent graph — an orchestrator hub plus specialists for data, preprocessing, model selection, training and evaluation — the FastAPI backend with MongoDB and Redis, the Jupyter kernel execution engine, on-platform training against cloud GPU providers, model and artifact storage, and the React frontend carrying real-time monitoring, chat, approval UIs, the notebook and the file views. Plus the human-in-the-loop flow, credential encryption, auth and pipeline lifecycle underneath all of it.",
    ],
    built: {
      groups: [
        {
          title: "The workflow",
          lede: "describe the task, approve the decisions that matter, get a model.",
          intro: [
            "An orchestrator agent routes the pipeline — collect data, preprocess, select a model, train or fine-tune, evaluate, finish — and the user can steer it by chat at any point. Specialist agents run each stage and write real code into a live Jupyter notebook as they go.",
            "The pipeline pauses at approval gates on the dataset, the preprocessing plan, and the model and training strategy. Then the model is trained on the platform, locally or on cloud GPUs, and stored with its artifacts for reuse and one-click export.",
          ],
          items: [
            {
              title: "Natural-language project setup",
              body: "describe what you want to predict or classify; the platform takes it from there.",
            },
            {
              title: "Dataset discovery, or your own data",
              body: "search and rank datasets from Kaggle and Hugging Face, or upload your own CSV, JSON or Parquet.",
            },
            {
              title: "Preprocessing",
              body: "profile the data, propose a cleaning plan, then generate and run the code that carries it out.",
            },
            {
              title: "Model selection with an explicit mode",
              body: "recommend architectures suited to the task and choose the approach per case — train from scratch, fine-tune a pretrained model, or use a custom Hugging Face model.",
            },
            {
              title: "On-platform and cloud GPU training",
              body: "run the job inside EpochsLab with live progress, reaching for cloud GPU providers such as RunPod when the work is heavy enough to need one.",
            },
            {
              title: "Model storage and one-click export",
              body: "the trained model and its artifacts stay in project storage, downloadable as a package with the notebook, scripts and evaluation output.",
            },
            {
              title: "Live notebook and a post-run copilot",
              body: "every agent step becomes executable notebook cells you can inspect, and afterwards you can chat to run more code or add cells in the same kernel.",
            },
            {
              title: "Human-in-the-loop approvals",
              body: "approve, revise or reroute at each critical decision point.",
            },
            {
              title: "Evaluation",
              body: "metrics, visualisations and a readable report of how the model actually performed.",
            },
            {
              title: "Multi-LLM and encrypted credentials",
              body: "choose Azure OpenAI, Gemini or OpenAI per project; Kaggle and Hugging Face keys stored AES-encrypted.",
            },
          ],
          outro: [
            "The AI is load-bearing rather than decorative. It ranks datasets, generates the preprocessing and training code, recommends train-versus-fine-tune, diagnoses and retries its own failed code, and powers the copilot after the run. It is not a chat wrapper around a form.",
          ],
        },
      ],
    },
    stack: [
      {
        layer: "AI / ML",
        items: [
          "LangGraph for stateful multi-agent graphs",
          "Azure OpenAI · Gemini 2.5 Flash · OpenAI",
          "LLM code generation and repair",
          "Train-from-scratch and fine-tuning flows",
          "Jupyter (ipykernel) execution",
          "Kaggle and Hugging Face dataset and model APIs",
        ],
      },
      {
        layer: "Frontend",
        items: [
          "React 19 · TypeScript · Vite",
          "Tailwind CSS",
          "Zustand · TanStack Query",
          "WebSockets for live progress",
        ],
      },
      {
        layer: "Backend",
        items: [
          "Python 3.11+ · FastAPI",
          "Beanie / Motor (MongoDB)",
          "Redis",
          "JWT auth",
          "AES-encrypted credentials",
        ],
      },
      {
        layer: "Infrastructure / DevOps",
        items: [
          "Cloud GPU providers (RunPod and similar) for training jobs",
          "Platform storage for datasets, notebooks, trained models and artifacts",
          "MongoDB Atlas-ready",
          "Redis for rate limits, token blacklist and LLM cache",
        ],
      },
    ],
    decisions: [
      {
        title: "Pipelines that survive the wait",
        paragraphs: [
          "Approvals take as long as a person takes, and a training job can run for hours. A graph held in memory loses all of it on a restart — which on a long pipeline means losing precisely the expensive part.",
          "So the graph is checkpointed: LangGraph with MongoDB-backed state, an interrupt before every approval node, and a coordinator that resumes from stored state when the approval eventually arrives over WebSocket or REST. A restart mid-pipeline becomes an inconvenience rather than a lost run.",
        ],
      },
      {
        title: "Train from scratch, fine-tune, or neither — decided per case",
        paragraphs: [
          "Defaulting to one training strategy is what makes automated ML tools produce bad models confidently. A small dataset fine-tuned onto a pretrained backbone will beat the same data thrown at a fresh architecture, and the reverse holds when the task is genuinely unlike anything pretrained.",
          "Model selection weighs dataset size, task type and stated intent, then recommends candidates with the mode attached — from scratch, fine-tune, or a specific custom model. The mode is part of the recommendation the user approves, not a hidden default they never see.",
        ],
      },
      {
        title: "Automation that stays inspectable",
        paragraphs: [
          "The fastest way to make an automated ML platform untrustworthy is to hand back a model with no account of how it was produced. A number without a method is not a result, and a user who cannot check the work cannot defend it to anyone else.",
          "Every specialist writes its own cells into a live notebook, so the pipeline leaves a readable trail of the actual code that ran. The orchestrator routes with guardrails rather than pure model discretion, and approvals support continue, revise or reroute. The user can always see what was done, and change it.",
        ],
      },
      {
        title: "Failed generated code is a state to handle, not an error to surface",
        paragraphs: [
          "LLM-generated code fails often enough that treating every failure as a dead end would make the product unusable. Most of those failures are also shallow — a wrong column name, a missing import, a shape mismatch — and a human would fix them without thinking.",
          "So a failure is fed back with its traceback for diagnosis and retry, and only escalates to the user when repair does not converge. That is the difference between a pipeline that finishes and one that stops halfway with a stack trace.",
        ],
      },
    ],
    results: {
      note: "EpochsLab is an own product still in development. No production metrics — users, revenue, latency — are published, so none are claimed here. What follows is what the platform does end to end.",
      rows: [
        {
          label: "Path covered",
          value:
            "Describe the problem, find or upload data, preprocess, select a model, train or fine-tune, store the model, evaluate, export",
        },
        {
          label: "Training strategy",
          value:
            "Chosen per case — from scratch, fine-tune a pretrained model, or a custom Hugging Face model",
        },
        {
          label: "Compute",
          value:
            "On-platform training, with cloud GPU providers such as RunPod for heavier jobs",
        },
        {
          label: "Transparency",
          value:
            "Every agent step written as executable notebook cells, with human approval gates at dataset, preprocessing and model selection",
        },
        { label: "Production metrics", value: "None tracked, and none claimed" },
      ],
    },
    // TODO: no screenshots supplied for this project.
    screenshots: [],
  },

  // ──────────────────────────────────────────────────────────── §D · HRXpert ──
  {
    slug: "hrxpert",
    number: "05",
    name: "HRXpert",
    teaser: {
      pitch:
        "Recruitment automation that scores a resume, runs a live voice interview and grades a developer's GitHub — inside one applicant tracking system.",
      engagement: "In-house build",
      domain: "HR-tech",
      metric: "0.895 agreement with a human recruiter",
    },
    eyebrow: "In-house build",
    oneLiner:
      "Recruitment automation that scores a resume, runs a live voice interview, and grades a developer's GitHub — inside one applicant tracking system a small company can afford.",
    pageTitle: "HRXpert — OlvixAI",
    metaDescription:
      "AI recruitment automation: resume scoring, live voice interviewing over WebRTC, and GitHub-based developer evaluation in one applicant tracking system.",
    card: {
      tags: ["In-house build", "HR-tech", "Voice AI + microservices"],
      pitch:
        "Recruitment automation that scores a resume against the job, runs a live voice interview with an AI that asks real follow-up questions, and grades a developer off their GitHub — all inside one affordable applicant tracking system.",
      metric: "0.895 agreement with a human recruiter",
      detail: "8 months · 3-person team",
    },
    meta: [
      { label: "Type", value: "In-house build — academic capstone, built to production standard" },
      { label: "Domain", value: "HR-tech · recruitment automation" },
      { label: "Timeframe", value: "August 2025 – March 2026" },
      { label: "Team", value: "3 engineers, under academic supervision with industry advisory input" },
      { label: "Status", value: "Complete and validated; not publicly deployed" },
    ],
    challenge: [
      "Recruiters spend an average of 23 hours screening resumes per hire, and it takes roughly 44 days to fill a single role — a cost most small and medium enterprises simply can't absorb. Enterprise recruitment tools price that segment out entirely, with base pricing north of $25,000 a year, while cheaper alternatives cover fragments of the workflow: scheduling, or a basic ATS, but not deep AI assessment.",
      "On top of the cost problem, manual screening is inconsistent and prone to unconscious bias — SHRM research links it to as much as a 30% reduction in workforce diversity.",
      "There was no affordable, unified platform that could screen resumes, run structured interviews and assess technical candidates end to end.",
    ],
    built: {
      intro:
        "A role-aware platform serving four user types — candidates, recruiters, admin-recruiters and interviewers — through one interface.",
      groups: [
        {
          items: [
            {
              title: "AI resume scoring",
              body: "a candidate uploads a resume; the system extracts the text, compares it against the job description with a structured zero-shot prompt, and returns a 0–10 fit score broken down across technical skill match, experience relevance, project quality and communication clarity. Scoring runs asynchronously, so it never blocks the candidate's submission.",
            },
            {
              title: "Real-time AI voice interviewing",
              body: "a live, browser-based voice interview over WebRTC. The AI transcribes in real time with Whisper, asks adaptive follow-ups based on the resume and prior answers, and speaks back with text-to-speech — then produces a scored, human-readable transcript for the recruiter.",
            },
            {
              title: "GitHub developer evaluation",
              body: "for technical roles, the platform pulls a candidate's public GitHub activity (languages, project complexity, contribution frequency) and generates a developer fit score against the job requirements.",
            },
            {
              title: "A full ATS with RBAC",
              body: "job posting and lifecycle management, applicant pipeline tracking, automated notifications, interview scheduling with Google Calendar and Meet, and a billing layer — all gated by role-based access control enforced through RS256-signed JWTs.",
            },
          ],
          outro: [
            "The core design principle throughout: AI never makes the final call. Every AI output comes with visible reasoning, and the recruiter keeps override authority at every stage — a decision informed directly by research on candidate trust in automated hiring.",
          ],
        },
      ],
    },
    stack: [
      {
        layer: "AI / ML",
        items: [
          "OpenAI for zero-shot resume scoring and conversational interviewing",
          "Whisper for real-time speech-to-text",
          "TTS for the interviewer's voice",
          "structured zero-shot prompting at fixed low temperature for scoring consistency",
        ],
      },
      {
        layer: "Frontend",
        items: [
          "Next.js 14 (App Router, React Server Components)",
          "React 18",
          "Tailwind CSS",
          "native WebRTC",
        ],
      },
      {
        layer: "Backend",
        items: [
          "NestJS 10 (TypeScript) for core transactional services",
          "FastAPI (Python 3.11) for async AI workers",
          "MongoDB Atlas",
          "Redis",
          "RabbitMQ / CloudAMQP for event-driven processing",
        ],
      },
      {
        layer: "Infrastructure",
        items: [
          "AWS EC2, including a dedicated real-time interview instance",
          "AWS Lambda",
          "S3 with pre-signed URLs",
          "Vercel",
          "Docker with GitHub Actions CI/CD",
          "RS256 JWT auth",
          "Google OAuth 2.0 SSO",
        ],
      },
    ],
    decisions: [
      {
        title: "Decoupling AI latency from user-facing responsiveness",
        paragraphs: [
          "LLM calls for resume scoring take 18 seconds and interview scoring up to 42 — unacceptable if a candidate has to wait on that during submission. All AI-heavy work was routed through RabbitMQ as asynchronous events, isolated in dedicated FastAPI workers with no shared state.",
          "That kept synchronous, user-facing APIs under a 320ms P95 even while AI processing ran in the background, and let the AI workers scale independently of the transactional core. It was validated under stress testing at 4x target concurrent load — 200 simultaneous submissions, zero message loss.",
        ],
      },
      {
        title: "Validating scoring quality against human judgment, not just functional correctness",
        paragraphs: [
          "It isn't enough for an AI scorer to run. It has to agree with what a human recruiter would decide. We ran a structured evaluation against an experienced HR professional across 73 resumes, computing Cohen's Kappa (0.895 — near-perfect agreement) and Matthews Correlation Coefficient (0.90) rather than a simple accuracy number, which would have been misleading given the class imbalance in shortlist and reject decisions.",
        ],
      },
      {
        title: "Proving the bias mitigation actually worked, rather than claiming it",
        paragraphs: [
          "Rather than assert the system was unbiased because names and photos were stripped, we ran a controlled anonymisation study: 111 resumes scored both with and without PII — names, emails, GitHub and LinkedIn, location — using an identical prompt and rubric.",
          "Scores matched within ±1 point on 90.1% of resumes, with near-zero average drift of +0.08 points, exceeding the 85% similarity target. That's evidence the pipeline evaluates qualifications rather than demographic proxies, not just a design intention.",
        ],
      },
    ],
    results: {
      headline: [
        { value: 420, suffix: "+", label: "Test cases executed, 98%+ pass rate" },
        { value: 92, suffix: ".3%", label: "Interview transcript accuracy" },
      ],
      columns: ["Metric", "Result"],
      rows: [
        { label: "AI–human scoring agreement (Cohen's Kappa)", value: "0.895 — near-perfect" },
        { label: "Bias-mitigation similarity rate", value: "90.1% (target ≥85%)" },
        { label: "Average score drift from anonymisation", value: "+0.08 points" },
        { label: "Interview transcript accuracy", value: "92.3% (target ≥90%)" },
        { label: "API P95 at 50 concurrent users", value: "<320 ms (target <500 ms)" },
        { label: "End-to-end resume scoring", value: "~18 seconds" },
        { label: "End-to-end interview scoring", value: "~42 seconds" },
        { label: "Test cases executed / pass rate", value: "420+ / 98%+, zero critical defects" },
        { label: "Security scan (OWASP ZAP)", value: "No high- or critical-severity vulnerabilities" },
        {
          label: "Stress test",
          value: "200 simultaneous submissions (4x target load), zero message loss",
        },
      ],
    },
    // TODO: 15 images sit in `docs/HRXpert Screenshots/` covering recruiter, admin,
    // interviewer and candidate dashboards. The applicant and resume views may contain
    // real names and contact details — scrub, convert to WebP and resize before these
    // are copied into `public/` and listed here.
    screenshots: [],
  },

  // ─────────────────────────────────────────────────────────── §E · KairosAI ──
  {
    slug: "kairosai",
    number: "06",
    name: "KairosAI",
    teaser: {
      pitch:
        "A job-search platform that structures your resume, scrapes and ranks live listings against it, and fills in the application forms for you.",
      engagement: "In-house build",
      domain: "Career tools",
      metric: "Three pillars, one candidate profile",
    },
    eyebrow: "In-house build",
    oneLiner:
      "An end-to-end job-search platform — from \"here is my CV\" to \"the application is submitted\".",
    pageTitle: "KairosAI — OlvixAI",
    metaDescription:
      "A job-search platform that structures your resume, scrapes and ranks live listings against it, and fills in application forms through a browser extension.",
    card: {
      tags: ["In-house build", "Career tools", "Scraping + browser extension"],
      pitch:
        "A job-search platform that turns your resume into structured data, collects and ranks live listings against it, runs scored mock interviews, and fills in the application forms through a browser extension that works on sites nobody wrote a rule for.",
      metric: "Three pillars, one candidate profile",
      detail: "7 months · 3-person team",
    },
    meta: [
      { label: "Type", value: "In-house build — academic capstone, delivered as a working MVP" },
      { label: "Domain", value: "HR-tech · career tools and job-search automation" },
      { label: "Timeframe", value: "~7 months" },
      {
        label: "Team",
        value:
          "3 engineers, split by domain — each owning the database, service and front end for their slice",
      },
      {
        label: "Status",
        value: "MVP — feature-complete and demonstrable end to end; not commercially launched",
      },
    ],
    challenge: [
      "Applying for jobs is a volume problem disguised as a writing problem. A serious search means a hundred-plus applications, and almost none of the work in them is interesting: retyping the same employment history into a different form on every site, rewording the same resume to match the vocabulary of each posting, and doing it across several job boards that have no knowledge of one another.",
      "Underneath that sits a filtering problem the candidate can't see. Most applications at any scale are screened by an ATS before a person reads them, which means a well-qualified candidate whose resume doesn't use the posting's vocabulary is rejected by a keyword match rather than a judgement. Candidates are asked to optimise against a system whose rules are never shown to them.",
      "The tooling that exists solves one slice each. A resume builder doesn't know what jobs are open. A job aggregator doesn't know whether you're a fit for what it's showing you, or whether your resume will survive the filter. Interview practice needs another human, or costs money, or both. So the candidate ends up as the integration layer between four tools, doing the joining by hand — which is exactly the part that makes the process exhausting.",
    ],
    role: [
      "The product was divided by domain: each of three people owned the data model, backend service and front end for their own area, composed into one application.",
      "Our slice covered the two halves at the front of the funnel — the resume pipeline (ingesting an uploaded resume, extracting it into structured data, optimising it against a target posting, running ATS keyword analysis, and classifying the candidate as junior, mid or senior), and the job collection and matching engine (the scraping and normalisation layer, and the hybrid matching system that scores listings against a candidate profile).",
      "The mock-interview chatbot and the browser extension were owned by a teammate. Both are described below, because the case for the product is that these pieces only matter as one loop — the extension is only useful because the resume is already structured, and the interview practice is only targeted because the matching engine decided which role the candidate is preparing for.",
    ],
    built: {
      intro:
        "Three pillars sharing one candidate profile: understand the candidate, find and rank the work, then actually get the applications out of the door.",
      groups: [
        {
          title: "Pillar A — Resume intelligence",
          intro: [
            "The candidate uploads a resume and it stops being a document. It's parsed into structured data — roles, dates, skills, projects, education — which is what makes everything downstream possible, including the autofill.",
          ],
          items: [
            {
              title: "Parsing and structuring",
              body: "an uploaded file from any template ends up the same shape as any other.",
            },
            {
              title: "Optimisation and ATS keyword analysis",
              body: "the resume is compared against a target posting and rewritten to match the vocabulary the filter is looking for, with the keyword gaps surfaced to the candidate rather than silently patched.",
            },
            {
              title: "Seniority classification",
              body: "junior, mid or senior, which becomes the primary filter on what gets recommended. Showing a junior candidate senior roles isn't a neutral failure; it wastes the applications they have the energy to make.",
            },
          ],
        },
        {
          title: "Pillar B — Job collection and matching",
          items: [
            {
              title: "Collection",
              body: "job pages fetched and parsed as scheduled batch jobs, each board handled by its own extractor, everything normalised into a shared job record.",
            },
            {
              title: "Hybrid matching",
              body: "a listing is scored three ways: semantic similarity between the structured resume and the posting, keyword matching against the terms the posting actually uses, and an LLM pass for the judgement call. The three signals combine into the recommendation.",
            },
            {
              title: "Tracking",
              body: "a dashboard of what's been applied to, what stage it's at, and what's still open, so the candidate isn't managing a hundred applications out of their inbox.",
            },
          ],
        },
        {
          title: "Pillar C — Interview practice and application automation",
          items: [
            {
              title: "Mock interviews",
              body: "a chatbot conducting practice interviews in text and voice, then scoring the candidate and giving feedback on the answers rather than just ending the conversation.",
            },
            {
              title: "Autofill browser extension",
              body: "reads the application form on the page, matches its fields against the stored resume data, and injects the values. It works across a wide range of sites rather than a fixed list, and on selected sites carries the application through to submission.",
            },
          ],
        },
      ],
    },
    stack: [
      {
        layer: "AI / ML",
        items: [
          "GPT-4o mini across the whole product — parsing, optimisation, ATS analysis, classification, match scoring, autofill field matching, and interview conversation and feedback",
          "embedding-based semantic similarity alongside keyword matching",
          "speech in and out for voice interviews",
        ],
      },
      { layer: "Frontend", items: ["Next.js", "React"] },
      { layer: "Backend", items: ["Node.js", "Express, split into per-domain services owned separately"] },
      {
        layer: "Data",
        items: [
          "Supabase — PostgreSQL for application data, auth, and object storage for uploaded resumes",
        ],
      },
      {
        layer: "Scraping",
        items: [
          "Cheerio-based HTML parsing over scheduled collection jobs, per-board extractors normalising into one schema",
        ],
      },
      {
        layer: "Extension",
        items: [
          "Reads the rendered form, model-matches fields against the stored resume, injects values, submits on selected sites",
        ],
      },
      { layer: "Infrastructure", items: ["Vercel"] },
    ],
    decisions: [
      {
        title: "Autofill by reading the page, not by maintaining selectors",
        paragraphs: [
          "The conventional way to build a form-filling extension is a rule per site: a hand-written map of CSS selectors to fields for each employer's form. That's straightforward, and it's also why most autofill tools support a short list of sites and break constantly. Application forms are built by thousands of companies on dozens of ATS products, every one free to change its markup on any given day, and no small team keeps a selector table current against that.",
          "So the extension carries no selectors. It reads the form as rendered, and the model matches the fields it finds against the structured resume — deciding that this input wants a phone number and that textarea wants the current job description — before injecting values. The consequence is that it generalises: it works on forms nobody wrote a rule for, including forms that didn't exist when it was built. That's also the clearest payoff from Pillar A, since matching a form field to a candidate is only tractable because the resume was turned into structured data at upload.",
        ],
      },
      {
        title: "Hybrid matching rather than picking one technique",
        paragraphs: [
          "Each of the three obvious strategies fails alone. Pure keyword matching is brittle and misses every candidate who says \"built REST services\" where the posting says \"API development\". Pure embedding similarity captures that equivalence but happily rates a related-but-wrong role highly, because semantic closeness isn't the same as being a fit. An LLM asked to judge every listing is the most accurate and by far the most expensive, and doesn't scale across a full board of postings.",
          "The system runs all three. Keeping keyword matching in the loop is the non-obvious part — it isn't there because it's a good similarity metric, it's there because it models the filter the candidate is actually up against. It's signal about whether the application will survive, not merely whether the candidate is suitable.",
        ],
      },
      {
        title: "Scraping as scheduled collection rather than live fetching",
        paragraphs: [
          "The naive design fetches listings when the user asks for recommendations. That makes the user wait on someone else's server, makes the request rate look exactly like the traffic pattern boards watch for, and re-fetches the same postings for every user who searches.",
          "Collection instead runs as scheduled batch jobs writing into a normalised store, with matching done against that store. The user's request touches the database and nothing else, which is why recommendations are fast, and the collection rate is decoupled from how many people happen to be searching.",
        ],
      },
      {
        title: "Consolidating two Postgres providers into one",
        paragraphs: [
          "The project began with data split across Neon and Supabase. Both are PostgreSQL, which is what made the split look harmless — and what made it a genuine drag. Auth and resume file storage already lived in Supabase, so the split meant two connection stories, two sets of credentials, two places to look when something was wrong, and a boundary to reason about every time a query wanted to join across it. For a three-person team on a seven-month timeline that's a tax paid continuously for no benefit.",
          "Neon was dropped and everything moved onto Supabase. The lesson worth recording is that the migration was cheap precisely because it was done early — the same decision deferred until the schema was fully grown would have been a project rather than a change.",
        ],
      },
      {
        title: "One model tier across the whole product",
        paragraphs: [
          "Every AI call runs on GPT-4o mini. A larger model would have improved the judgement-heavy calls, particularly match scoring and interview feedback. On a project with no revenue and a seven-month clock, running one cheap model everywhere is what let all three pillars get built and demonstrated rather than two of them being built well. It's the right call for an MVP, and the first thing worth revisiting if the product went further.",
        ],
      },
    ],
    results: {
      note: "A completed project delivered as an MVP, not a launched product. No usage, accuracy or revenue metrics were collected, so none are reported here.",
      headline: [{ value: 3, label: "Integrated pillars, one candidate profile" }],
      rows: [
        {
          label: "Scope delivered",
          value:
            "Three integrated pillars — resume intelligence, job collection and matching, and interview practice with application automation — working end to end against one candidate profile",
        },
        {
          label: "Commercial model",
          value:
            "Three tiers designed into the product (Starter, Pro, Elite), separated by application volume and how much automation is unlocked. Never taken to market; no revenue",
        },
        {
          label: "Extension coverage",
          value: "Generalises to application forms with no per-site rule written",
        },
      ],
    },
    // TODO: `docs/KairosAI/` holds 2 images, thin for a full page. Capture more from the
    // running MVP (the matching dashboard and the extension on a real form), scrub any
    // personal data, then copy into `public/` and list here.
    screenshots: [],
  },
];

/** Index-page copy — §A of `docs/Portfolio-Copy.md`. */
export const portfolioIndex = {
  pageTitle: "Work — OlvixAI",
  metaDescription:
    "Six AI products — a B2B health platform live on both app stores, a trading company's entire operation, an agent that writes and edits PowerPoint files. What we built, how, and what we can prove.",
  eyebrow: "Work",
  heading: "Six products.",
  headingDimmed: "Every layer of each one.",
  intro:
    "Two were built for paying clients, one is a live feature inside an employer's product, and three we built ourselves. All six went past the demo — through the parts that are tedious and unglamorous and are the actual reason software stays up. Each page below says what the problem was, what we decided and why, and what we can prove.",
  cta: {
    heading: "Want yours",
    headingDimmed: "in this list?",
    body: "Tell us what you're trying to build. We'll come back with what it takes, what it costs, and whether we're the right team for it — usually within two working days.",
    primary: { label: "Get a quote", href: "/contact" },
    secondary: { label: "How we work", href: "/#how-we-work" },
    finePrint: "Free 30-minute call. NDA on request.",
  },
} as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Prev/next for the case-study footer. The list wraps, so both are always present
 * and the reader can never hit a dead end at either edge.
 */
export function getProjectNeighbours(
  slug: string
): { prev: ProjectNavItem; next: ProjectNavItem } | null {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return null;
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev: toNavItem(prev), next: toNavItem(next) };
}

/**
 * Slim projections for client components.
 *
 * `projects` carries the full case-study prose — every challenge paragraph, decision
 * essay, stack row and results table for all six. Two things go wrong if a
 * `"use client"` component touches it directly:
 *
 *  - importing it pulls the whole module into that component's client JS bundle, and
 *  - passing a whole `Project` across the server/client boundary serialises every
 *    paragraph of it into the HTML of every page that renders the component.
 *
 * Both were happening. The prev/next nav received two complete neighbouring case
 * studies in order to render two names, which put PowerUp's decision essays into the
 * HTML of the Trading Operations page; and the home page teaser and footer imported the
 * entire array to show six short strings.
 *
 * So client components take these projections as props from the server pages instead.
 * Keep it that way: if a client component needs project data, add a projection here
 * rather than widening it to `Project`.
 */
export type ProjectNavItem = Pick<Project, "slug" | "name" | "eyebrow">;
export type ProjectTeaserItem = Pick<Project, "slug" | "name" | "teaser">;
export type ProjectCardItem = Pick<Project, "slug" | "name" | "number" | "card">;
export interface ProjectLink {
  name: string;
  href: string;
}

function toNavItem({ slug, name, eyebrow }: Project): ProjectNavItem {
  return { slug, name, eyebrow };
}

/** Home page "Selected work" teaser. */
export const projectTeasers: ProjectTeaserItem[] = projects.map(
  ({ slug, name, teaser }) => ({ slug, name, teaser })
);

/** Footer "Work" column. */
export const projectLinks: ProjectLink[] = projects.map(({ slug, name }) => ({
  name,
  href: `/portfolio/${slug}`,
}));

/** `/portfolio` index cards. */
export const projectCards: ProjectCardItem[] = projects.map(
  ({ slug, name, number, card }) => ({ slug, name, number, card })
);
