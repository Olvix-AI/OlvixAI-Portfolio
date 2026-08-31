"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

/* ==========================================================================
 * Types
 * ========================================================================== */

export type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  need: string;
  project: string;
  timeline: string;
  budget: string;
  source: string;
};

type FieldName = keyof ContactFormValues;
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

/* ==========================================================================
 * THE ONLY PLACE THIS PAGE TALKS TO A SERVER
 *
 * TODO(backend): nothing else in this file has to change when you wire this up.
 * Keep the signature (`ContactFormValues` in, resolve on success, THROW on
 * failure) and the idle / submitting / success / error states keep working.
 *
 * Option 1 — third-party form service (Formspree, Basin, Web3Forms).
 * Recommended for launch: no backend, no secrets in the repo, one-file swap.
 *
 *   const res = await fetch("https://formspree.io/f/<FORM_ID>", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json", Accept: "application/json" },
 *     body: JSON.stringify(data),
 *   });
 *   if (!res.ok) throw new Error(`Contact endpoint responded ${res.status}`);
 *   return;
 *
 * Option 2 — own it: `app/api/contact/route.ts` + Resend or Postmark.
 *
 *   const res = await fetch("/api/contact", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(data),
 *   });
 *   if (!res.ok) throw new Error(`Contact endpoint responded ${res.status}`);
 *   return;
 *
 *   The route handler must re-validate server side (`zod` is already a
 *   dependency — client validation below is a UX affordance, not a control),
 *   send to the SHARED inbox hello@olvix.io, and needs RESEND_API_KEY plus a
 *   verified sending domain on olvix.io.
 *
 * Either way also add Cloudflare Turnstile — the honeypot below is the free
 * 90%, not the whole answer.
 *
 * Until one of those exists this simulates a successful round trip so the
 * success state is reachable and testable. IT DOES NOT SEND ANYTHING.
 * ========================================================================== */
async function submitContactForm(data: ContactFormValues): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, 900);
  });

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info(
      "[contact] simulated submit — no backend is wired yet, nothing was sent",
      data,
    );
  }
}

/* ==========================================================================
 * Copy — every string below is verbatim from docs/Contact-Copy.md
 * ========================================================================== */

const NEED_OPTIONS = [
  "A new AI product built from scratch",
  "AI added into a product we already have",
  "Help with something already half-built",
  "Not sure yet — that's fine",
];

const TIMELINE_OPTIONS = [
  "As soon as possible",
  "1–3 months",
  "3–6 months",
  "Later this year",
  "Just exploring",
];

const BUDGET_OPTIONS = [
  "Not sure yet",
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
];

const BUDGET_HELPER = `So we can tell you straight away whether it's a fit. "Not sure yet" is a real answer.`;

const COMPANY_PLACEHOLDER = "Name, and a URL if it's live";

const PROJECT_PLACEHOLDER =
  "What it does, who it's for, and what's already in place. If there's a deadline driving it, say so.";

const CONSENT_LINE =
  "We'll only use this to reply to you. Nothing else, no list, no sharing.";

const VALIDATION_MESSAGES: Record<"name" | "email" | "need" | "project", string> = {
  name: "We need something to call you.",
  email: "That doesn't look like an email address.",
  need: "Pick the closest one — we'll figure out the rest on the call.",
  project: "A sentence is enough to start.",
};

const SUCCESS = {
  heading: "Got it.",
  body: "We've read it — or we will within a few hours. Either way you'll have a reply within two working days, from one of the four of us.",
  link: "While you wait: see what we've built",
  href: "/portfolio",
};

const FAILURE = {
  heading: "That didn't send.",
  bodyBefore: "Something on our end. Email ",
  email: "hello@olvix.io",
  bodyAfter:
    " and we'll pick it up from there — your message is worth more to us than our form is.",
};

// Not in the copy doc: the error summary is an accessibility requirement, and a
// summary needs a heading. This is the standard GOV.UK string.
const ERROR_SUMMARY_TITLE = "There is a problem";

// Not in the copy doc: placeholder text for the two optional selects, which is
// UI chrome rather than messaging.
const SELECT_PLACEHOLDER = "Select one";

/* ==========================================================================
 * Validation
 * ========================================================================== */

const FIELD_IDS = {
  name: "contact-name",
  email: "contact-email",
  company: "contact-company",
  need: "contact-need",
  project: "contact-project",
  timeline: "contact-timeline",
  budget: "contact-budget",
  source: "contact-source",
} as const satisfies Record<FieldName, string>;

const REQUIRED_FIELDS: FieldName[] = ["name", "email", "need", "project"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateField(
  field: FieldName,
  values: ContactFormValues,
): string | undefined {
  switch (field) {
    case "name":
      return values.name.trim() ? undefined : VALIDATION_MESSAGES.name;
    case "email":
      return EMAIL_PATTERN.test(values.email.trim())
        ? undefined
        : VALIDATION_MESSAGES.email;
    case "need":
      return values.need ? undefined : VALIDATION_MESSAGES.need;
    case "project":
      return values.project.trim() ? undefined : VALIDATION_MESSAGES.project;
    default:
      return undefined;
  }
}

/* ==========================================================================
 * Shared classes — matched to the site, nothing invented
 * ========================================================================== */

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:focus-visible:ring-foreground";

// Sharp inputs, hairline borders, no shadow — same language as the bordered
// cards elsewhere on the site. h-12 keeps the touch target over 44px.
const CONTROL =
  `w-full rounded-none border-foreground/15 bg-transparent shadow-none text-base ` +
  `placeholder:text-muted-foreground/70 transition-colors hover:border-foreground/25 ` +
  `focus-visible:border-foreground/40 aria-invalid:border-destructive ${FOCUS_RING}`;

const LABEL =
  "text-xs font-mono uppercase tracking-widest text-foreground/70";

const LINK =
  `underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground ` +
  `transition-colors rounded-sm ${FOCUS_RING}`;

/* ==========================================================================
 * Reserved error slot — always rendered, so validation text never shifts the
 * layout when it appears.
 * ========================================================================== */

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <div className="min-h-5 mt-2">
      {message ? (
        <p id={id} role="alert" className="text-sm text-destructive">
          {message}
        </p>
      ) : null}
    </div>
  );
}

function OptionalTag() {
  return (
    <span className="text-xs font-mono text-muted-foreground">Optional</span>
  );
}

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true" className="text-foreground/40">
        *
      </span>
      <span className="sr-only">(required)</span>
    </>
  );
}

/* ==========================================================================
 * Draft persistence — a paragraph someone spent five minutes on should survive
 * a refresh. Read inside an effect, never in a useState initializer, so the
 * server and the first client render always agree.
 * ========================================================================== */

const DRAFT_KEY = "olvix:contact-draft";

const EMPTY_VALUES: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  need: "",
  project: "",
  timeline: "",
  budget: "",
  source: "",
};

/* ==========================================================================
 * Component
 * ========================================================================== */

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [showSummary, setShowSummary] = useState(false);

  const summaryRef = useRef<HTMLDivElement>(null);
  const failureRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const skipFirstSaveRef = useRef(true);

  // Restore a draft, if there is one.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<ContactFormValues>;
      setValues((prev) => {
        const next = { ...prev };
        (Object.keys(EMPTY_VALUES) as FieldName[]).forEach((key) => {
          if (typeof parsed[key] === "string") next[key] = parsed[key] as string;
        });
        return next;
      });
    } catch {
      // A blocked or corrupt store is not worth surfacing to the user.
    }
  }, []);

  // Mirror the draft as they type.
  useEffect(() => {
    if (skipFirstSaveRef.current) {
      skipFirstSaveRef.current = false;
      return;
    }
    if (status === "success") return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
    } catch {
      // Ignore — persistence is a convenience, not a requirement.
    }
  }, [values, status]);

  // Move focus to whichever block just took over.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") failureRef.current?.focus();
  }, [status]);

  const setValue = (field: FieldName, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);

    // Clear an error the moment it stops being true, but never introduce one
    // mid-typing — that is what blur is for.
    if (errors[field]) {
      const message = validateField(field, next);
      setErrors((prev) => {
        const copy = { ...prev };
        if (message) copy[field] = message;
        else delete copy[field];
        return copy;
      });
    }
  };

  const handleBlur = (field: FieldName) => {
    const message = validateField(field, values);
    setErrors((prev) => {
      const copy = { ...prev };
      if (message) copy[field] = message;
      else delete copy[field];
      return copy;
    });
  };

  const errorList = REQUIRED_FIELDS.filter((field) => errors[field]).map(
    (field) => ({
      field,
      anchorId: FIELD_IDS[field],
      focusId: field === "need" ? `${FIELD_IDS.need}-0` : FIELD_IDS[field],
      message: errors[field] as string,
    }),
  );

  const focusInvalidField = (anchorId: string, focusId: string) => {
    const anchor = document.getElementById(anchorId);
    anchor?.scrollIntoView({ block: "center", behavior: "smooth" });
    const target = document.getElementById(focusId);
    if (target instanceof HTMLElement) target.focus({ preventScroll: true });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors: FieldErrors = {};
    REQUIRED_FIELDS.forEach((field) => {
      const message = validateField(field, values);
      if (message) nextErrors[field] = message;
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setShowSummary(true);
      // Wait for the summary to exist before moving focus into it.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setShowSummary(false);

    // Honeypot: a bot filled a field no human can see. Behave exactly like a
    // success so it has nothing to learn, and send nothing.
    if (honeypotRef.current?.value) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      await submitContactForm(values);
      try {
        window.localStorage.removeItem(DRAFT_KEY);
      } catch {
        // Ignore.
      }
      setStatus("success");
    } catch {
      // Values stay in state — a failed submit must never cost them the text.
      setStatus("error");
    }
  };

  /* ---------------------------------------------------------------------- */

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="border border-foreground/10 p-8 lg:p-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <h2 className="font-display text-4xl lg:text-5xl tracking-tight mb-6">
          {SUCCESS.heading}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
          {SUCCESS.body}
        </p>
        <a
          href={SUCCESS.href}
          className={`inline-flex items-center gap-2 text-base group ${LINK}`}
        >
          {SUCCESS.link}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="relative max-w-xl">
      {/* Error summary — focusable, links to each invalid field, and sits
          alongside the inline errors rather than replacing them. */}
      {showSummary && errorList.length > 0 ? (
        <div
          ref={summaryRef}
          role="alert"
          tabIndex={-1}
          aria-labelledby="contact-error-summary-title"
          className="mb-10 border border-destructive/40 bg-destructive/5 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <h2
            id="contact-error-summary-title"
            className="text-xs font-mono uppercase tracking-widest text-destructive mb-4"
          >
            {ERROR_SUMMARY_TITLE}
          </h2>
          <ul className="space-y-2">
            {errorList.map((item) => (
              <li key={item.field}>
                <a
                  href={`#${item.anchorId}`}
                  onClick={(event) => {
                    event.preventDefault();
                    focusInvalidField(item.anchorId, item.focusId);
                  }}
                  className={`text-sm text-destructive ${LINK}`}
                >
                  {item.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Submit failure */}
      {status === "error" ? (
        <div
          ref={failureRef}
          role="alert"
          tabIndex={-1}
          className="mb-10 border border-destructive/40 bg-destructive/5 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <h2 className="font-display text-2xl tracking-tight mb-3">
            {FAILURE.heading}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {FAILURE.bodyBefore}
            <a href={`mailto:${FAILURE.email}`} className={`text-foreground ${LINK}`}>
              {FAILURE.email}
            </a>
            {FAILURE.bodyAfter}
          </p>
        </div>
      ) : null}

      <div className="space-y-8">
        {/* 1 · Your name */}
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <Label htmlFor={FIELD_IDS.name} className={LABEL}>
              Your name
              <RequiredMark />
            </Label>
          </div>
          <Input
            id={FIELD_IDS.name}
            name="name"
            type="text"
            autoComplete="name"
            required
            className={`h-12 ${CONTROL}`}
            value={values.name}
            onChange={(event) => setValue("name", event.target.value)}
            onBlur={() => handleBlur("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${FIELD_IDS.name}-error` : undefined}
          />
          <FieldError id={`${FIELD_IDS.name}-error`} message={errors.name} />
        </div>

        {/* 2 · Work email */}
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <Label htmlFor={FIELD_IDS.email} className={LABEL}>
              Work email
              <RequiredMark />
            </Label>
          </div>
          <Input
            id={FIELD_IDS.email}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            className={`h-12 ${CONTROL}`}
            value={values.email}
            onChange={(event) => setValue("email", event.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${FIELD_IDS.email}-error` : undefined}
          />
          <FieldError id={`${FIELD_IDS.email}-error`} message={errors.email} />
        </div>

        {/* 3 · Company or product */}
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <Label htmlFor={FIELD_IDS.company} className={LABEL}>
              Company or product
            </Label>
            <OptionalTag />
          </div>
          <Input
            id={FIELD_IDS.company}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={COMPANY_PLACEHOLDER}
            className={`h-12 ${CONTROL}`}
            value={values.company}
            onChange={(event) => setValue("company", event.target.value)}
          />
          <FieldError id={`${FIELD_IDS.company}-error`} />
        </div>

        {/* 4 · What do you need? */}
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <span id={`${FIELD_IDS.need}-label`} className={`flex items-center gap-2 ${LABEL}`}>
              What do you need?
              <RequiredMark />
            </span>
          </div>
          <RadioGroup
            id={FIELD_IDS.need}
            aria-labelledby={`${FIELD_IDS.need}-label`}
            aria-required="true"
            aria-invalid={errors.need ? true : undefined}
            aria-describedby={errors.need ? `${FIELD_IDS.need}-error` : undefined}
            value={values.need}
            onValueChange={(value) => setValue("need", value)}
            className="gap-3"
          >
            {NEED_OPTIONS.map((option, index) => {
              const optionId = `${FIELD_IDS.need}-${index}`;
              const selected = values.need === option;
              return (
                <Label
                  key={option}
                  htmlFor={optionId}
                  className={`items-center gap-4 p-4 border cursor-pointer transition-colors text-base font-normal leading-normal ${
                    selected
                      ? "border-foreground/40 bg-foreground/5"
                      : "border-foreground/10 hover:border-foreground/25"
                  } ${errors.need ? "border-destructive/50" : ""}`}
                >
                  <RadioGroupItem
                    id={optionId}
                    value={option}
                    onBlur={() => handleBlur("need")}
                    className={`border-foreground/30 text-foreground ${FOCUS_RING}`}
                  />
                  <span>{option}</span>
                </Label>
              );
            })}
          </RadioGroup>
          <FieldError id={`${FIELD_IDS.need}-error`} message={errors.need} />
        </div>

        {/* 5 · What are you trying to build? */}
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <Label htmlFor={FIELD_IDS.project} className={LABEL}>
              What are you trying to build?
              <RequiredMark />
            </Label>
          </div>
          <Textarea
            id={FIELD_IDS.project}
            name="project"
            rows={6}
            placeholder={PROJECT_PLACEHOLDER}
            required
            className={`min-h-40 py-3 leading-relaxed ${CONTROL}`}
            value={values.project}
            onChange={(event) => setValue("project", event.target.value)}
            onBlur={() => handleBlur("project")}
            aria-invalid={errors.project ? true : undefined}
            aria-describedby={
              errors.project ? `${FIELD_IDS.project}-error` : undefined
            }
          />
          <FieldError id={`${FIELD_IDS.project}-error`} message={errors.project} />
        </div>

        {/* 6 · Timeline */}
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <Label
              id={`${FIELD_IDS.timeline}-label`}
              htmlFor={FIELD_IDS.timeline}
              className={LABEL}
            >
              Timeline
            </Label>
            <OptionalTag />
          </div>
          <Select
            value={values.timeline}
            onValueChange={(value) => setValue("timeline", value)}
          >
            <SelectTrigger
              id={FIELD_IDS.timeline}
              aria-labelledby={`${FIELD_IDS.timeline}-label ${FIELD_IDS.timeline}`}
              className={`data-[size=default]:h-12 ${CONTROL}`}
            >
              <SelectValue placeholder={SELECT_PLACEHOLDER} />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {TIMELINE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option} className="rounded-none text-base">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError id={`${FIELD_IDS.timeline}-error`} />
        </div>

        {/* 7 · Budget */}
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <Label
              id={`${FIELD_IDS.budget}-label`}
              htmlFor={FIELD_IDS.budget}
              className={LABEL}
            >
              Budget
            </Label>
            <OptionalTag />
          </div>
          <p
            id={`${FIELD_IDS.budget}-helper`}
            className="text-sm text-muted-foreground leading-relaxed mb-3"
          >
            {BUDGET_HELPER}
          </p>
          <Select
            value={values.budget}
            onValueChange={(value) => setValue("budget", value)}
          >
            <SelectTrigger
              id={FIELD_IDS.budget}
              aria-labelledby={`${FIELD_IDS.budget}-label ${FIELD_IDS.budget}`}
              aria-describedby={`${FIELD_IDS.budget}-helper`}
              className={`data-[size=default]:h-12 ${CONTROL}`}
            >
              <SelectValue placeholder={SELECT_PLACEHOLDER} />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {BUDGET_OPTIONS.map((option) => (
                <SelectItem key={option} value={option} className="rounded-none text-base">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError id={`${FIELD_IDS.budget}-error`} />
        </div>

        {/* 8 · How did you find us? */}
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <Label htmlFor={FIELD_IDS.source} className={LABEL}>
              How did you find us?
            </Label>
            <OptionalTag />
          </div>
          <Input
            id={FIELD_IDS.source}
            name="source"
            type="text"
            placeholder="Referral, search, LinkedIn…"
            className={`h-12 ${CONTROL}`}
            value={values.source}
            onChange={(event) => setValue("source", event.target.value)}
          />
          <FieldError id={`${FIELD_IDS.source}-error`} />
        </div>
      </div>

      {/* Honeypot — off-screen, out of the tab order, hidden from assistive
          tech. Humans never see it; bots fill everything. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-website-url">
          Leave this field empty
          <input
            ref={honeypotRef}
            id="contact-website-url"
            name="website_url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      {/* Submit */}
      <div className="mt-12">
        <Button
          type="submit"
          disabled={submitting}
          className={`bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group ${FOCUS_RING}`}
        >
          {submitting ? "Sending…" : "Send it"}
          {submitting ? null : (
            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          )}
        </Button>

        {/* Status for screen readers while the request is in flight. */}
        <p aria-live="polite" className="sr-only">
          {submitting ? "Sending…" : ""}
        </p>

        <p className="mt-5 text-sm text-muted-foreground">
          Or email{" "}
          <a
            href="mailto:hello@olvix.io"
            className={`text-foreground ${LINK}`}
          >
            hello@olvix.io
          </a>{" "}
          directly.
        </p>

        <p className="mt-3 text-sm text-muted-foreground">{CONSENT_LINE}</p>
      </div>
    </form>
  );
}
