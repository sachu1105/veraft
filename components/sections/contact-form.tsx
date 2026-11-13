"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  CircleHelp,
  Globe,
  PenTool,
  Phone,
  Rocket,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DEFAULT_COUNTRY } from "@/lib/countries";
import { CountryPicker } from "@/components/ui/country-picker";
import {
  contactSchema,
  projectTypes,
  toFieldErrors,
  type ContactInput,
  type FieldErrors,
} from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";
type Values = { [K in keyof ContactInput]-?: string };
type ProjectType = (typeof projectTypes)[number];

const empty: Values = {
  name: "",
  email: "",
  phone: "",
  phoneCountry: "",
  projectType: "",
  timezone: "",
  message: "",
  website: "",
};

/** An icon per option, so the choices scan at a glance. Neutral grey; blue when picked. */
const projectIcons: Record<ProjectType, LucideIcon> = {
  "New product / MVP": Rocket,
  "Custom software or web app": Globe,
  "AI-powered product": Bot,
  "UI/UX or product design": PenTool,
  "Improve or maintain an existing app": Wrench,
  "Not sure yet": CircleHelp,
};

const inputBase =
  "w-full rounded-md border bg-paper px-4 py-3 text-body text-ink " +
  "placeholder:text-muted/60 transition-colors duration-150 focus:border-ink";

/**
 * "Start a project" form — posts to /api/contact, which emails us via Resend.
 * Ordered easiest-first: one click (what you need), a few lines, then who you
 * are. Phone is tucked behind "Prefer a call?" since most people want email.
 */
export function ContactForm({ className }: { className?: string }) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [showPhone, setShowPhone] = useState(false);

  // India by default (see DEFAULT_COUNTRY); the visitor can pick another.
  const phoneCountry = values.phoneCountry || DEFAULT_COUNTRY;

  function update<K extends keyof Values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const parsed = contactSchema.safeParse({
      ...values,
      phoneCountry,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    if (!parsed.success) {
      const fieldErrors = toFieldErrors(parsed.error);
      setErrors(fieldErrors);
      if (fieldErrors.phone) setShowPhone(true);
      const first = Object.keys(fieldErrors)[0];
      if (first) document.getElementById(`field-${first}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: FieldErrors;
      };

      if (res.ok && data.ok) {
        setStatus("success");
        return;
      }
      if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      throw new Error("Unexpected response");
    } catch {
      setStatus("error");
      setFormError(
        `Something went wrong sending your request. Please try again, or email us at ${site.email}.`,
      );
    }
  }

  function reset() {
    setValues(empty);
    setErrors({});
    setStatus("idle");
    setFormError(null);
    setShowPhone(false);
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-xl border border-line bg-paper p-8 shadow-raised sm:p-10 dark:bg-mist",
          className,
        )}
        role="status"
      >
        <span className="flex size-11 items-center justify-center rounded-md bg-accent text-on-accent">
          <Check size={22} strokeWidth={1.75} aria-hidden />
        </span>
        <h2 className="mt-5 text-heading text-ink">
          Thanks — we&apos;ve got it.
        </h2>
        <p className="mt-2.5 max-w-md text-body text-muted">
          {values.phone
            ? "We'll call or email you within one business day to set up a discovery call."
            : "We'll email you within one business day to set up a discovery call."}{" "}
          If it&apos;s urgent, email{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-accent-fg underline-offset-2 hover:underline"
          >
            {site.email}
          </a>
          .
        </p>
        <Button variant="secondary" className="mt-6" onClick={reset}>
          Send another request
        </Button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Project details"
      className={cn(
        "relative flex flex-col rounded-xl border border-line bg-paper p-5 shadow-raised sm:p-8 dark:bg-mist",
        className,
      )}
    >
      {formError && (
        <p
          role="alert"
          className="mb-6 rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-body-sm text-danger"
        >
          {formError}
        </p>
      )}

      <OptionGroup
        legend="What do you need?"
        value={values.projectType}
        error={errors.projectType}
        onChange={(v) => update("projectType", v)}
      />

      <div className="mt-6">
        <FieldLabel htmlFor="field-message" label="Tell us about it" />
        <textarea
          id="field-message"
          name="message"
          rows={3}
          required
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="What you want to build and who it's for. A few lines is plenty."
          className={cn(
            inputBase,
            "resize-y",
            errors.message ? "border-danger" : "border-line",
          )}
        />
        {errors.message && (
          <FieldError id="message-error">{errors.message}</FieldError>
        )}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Your name"
          error={errors.name}
          value={values.name}
          onChange={(v) => update("name", v)}
          autoComplete="name"
          placeholder="Jane Doe"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          error={errors.email}
          value={values.email}
          onChange={(v) => update("email", v)}
          autoComplete="email"
          placeholder="you@company.com"
        />
      </div>

      {showPhone ? (
        <PhoneField
          country={phoneCountry}
          onCountryChange={(v) => update("phoneCountry", v)}
          value={values.phone}
          onChange={(v) => update("phone", v)}
          error={errors.phone}
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowPhone(true)}
          className="mt-4 inline-flex items-center gap-2 rounded-md text-body-sm text-muted transition-colors hover:text-ink"
        >
          <Phone size={15} strokeWidth={1.75} aria-hidden />
          Prefer a call? Add your phone or WhatsApp
        </button>
      )}

      {/* Honeypot — visually hidden, off the tab order. */}
      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      {/* mt-auto: when the card is stretched to the left column, the send
          row sits on the bottom edge. */}
      <div className="mt-auto pt-7">
        <div className="border-t border-line pt-6">
          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full sm:w-auto"
          >
            {submitting ? "Sending…" : "Send project details"}
            {!submitting && (
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
            )}
          </Button>
          <p className="mt-3 text-body-sm text-muted">
            Free, no obligation. We reply within one business day.
          </p>
        </div>
      </div>
    </form>
  );
}

/** "What do you need?" — six option cards with icons, in a 2-column grid. */
function OptionGroup({
  legend,
  value,
  error,
  onChange,
}: {
  legend: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset
      aria-invalid={!!error}
      aria-describedby={error ? "projectType-error" : undefined}
    >
      <legend className="mb-2.5 block text-body-sm font-medium text-ink">
        {legend}
      </legend>
      <div
        className="grid gap-2 sm:grid-cols-2"
        id="field-projectType"
        tabIndex={-1}
      >
        {projectTypes.map((opt) => {
          const Icon = projectIcons[opt];
          const checked = value === opt;
          return (
            <label key={opt} className="flex cursor-pointer">
              <input
                type="radio"
                name="projectType"
                value={opt}
                checked={checked}
                onChange={() => onChange(opt)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border bg-paper px-3.5 py-3 text-body-sm text-ink transition-colors duration-150",
                  "hover:border-ink/25 peer-checked:border-accent peer-checked:bg-accent/5",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
                  error ? "border-danger/50" : "border-line",
                )}
              >
                <Icon
                  size={19}
                  strokeWidth={1.75}
                  aria-hidden
                  className={cn(
                    "shrink-0 transition-colors",
                    checked ? "text-accent-fg" : "text-muted",
                  )}
                />
                <span className="min-w-0 flex-1">{opt}</span>
                <span
                  aria-hidden
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                    checked
                      ? "border-accent bg-accent text-on-accent"
                      : "border-line",
                  )}
                >
                  {checked && <Check size={10} strokeWidth={3} />}
                </span>
              </span>
            </label>
          );
        })}
      </div>
      {error && <FieldError id="projectType-error">{error}</FieldError>}
    </fieldset>
  );
}

function FieldLabel({
  htmlFor,
  label,
  optional,
}: {
  htmlFor: string;
  label: string;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-body-sm font-medium text-ink"
    >
      {label}
      {optional && (
        <span className="ml-1.5 font-normal text-muted">(optional)</span>
      )}
    </label>
  );
}

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="mt-2 text-body-sm text-danger">
      {children}
    </p>
  );
}

/** Phone with a searchable country-code picker (flag + dial code). */
function PhoneField({
  country,
  onCountryChange,
  value,
  onChange,
  error,
}: {
  country: string;
  onCountryChange: (iso: string) => void;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const describedBy = error ? "phone-error" : "phone-hint";
  return (
    <div className="mt-5">
      <FieldLabel htmlFor="field-phone" label="Phone or WhatsApp" optional />
      <div className="flex gap-2">
        <CountryPicker
          id="field-phoneCountry"
          value={country}
          onChange={onCountryChange}
          invalid={!!error}
        />
        <input
          id="field-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          // Opened on request, so put the cursor straight in it.
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          placeholder="Phone number"
          className={cn(
            inputBase,
            "min-w-0 flex-1",
            error ? "border-danger" : "border-line",
          )}
        />
      </div>
      {error ? (
        <FieldError id="phone-error">{error}</FieldError>
      ) : (
        <p id="phone-hint" className="mt-2 text-label text-muted">
          We&apos;ll call or message you here instead of emailing.
        </p>
      )}
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={`field-${id}`} label={label} />
      <input
        id={`field-${id}`}
        name={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={cn(inputBase, error ? "border-danger" : "border-line")}
      />
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}
