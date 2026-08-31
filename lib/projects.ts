/**
 * Portfolio data — the four OlvixAI case studies.
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

  // ─────────────────────────────────────────────────────── §C · Agentic Decks ──
  {
    slug: "agentic-decks",
    number: "02",
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

  // ──────────────────────────────────────────────────────────── §D · HRXpert ──
  {
    slug: "hrxpert",
    number: "03",
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
    number: "04",
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
    "Four AI products, from a B2B health platform live on both app stores to an agent that writes and edits PowerPoint files. What we built, how, and what it cost.",
  eyebrow: "Work",
  heading: "Four products.",
  headingDimmed: "Every layer of each one.",
  intro:
    "Two of these were built for other people, two we built ourselves. All four went past the demo — through the parts that are tedious and unglamorous and are the actual reason software stays up. Each page below says what the problem was, what we decided and why, and what we can prove.",
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
export function getProjectNeighbours(slug: string): { prev: Project; next: Project } | null {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return null;
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev, next };
}
