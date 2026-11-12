"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  callSlots,
  contactSchema,
  projectTypes,
  timelines,
  toFieldErrors,
  type ContactInput,
  type FieldErrors,
} from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";
type Values = { [K in keyof ContactInput]-?: string };

const empty: Values = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  timeline: "",
  preferredDate: "",
  preferredSlot: "",
  timezone: "",
  message: "",
  website: "",
};

const inputBase =
  "w-full rounded-md border bg-paper px-4 py-3 text-body text-ink " +
  "placeholder:text-muted/60 transition-colors duration-150 focus:border-accent";

/** "Book a call" form — posts to /api/contact, which emails us via Resend. */
export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  function update<K extends keyof Values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const parsed = contactSchema.safeParse({
      ...values,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    if (!parsed.success) {
      const fieldErrors = toFieldErrors(parsed.error);
      setErrors(fieldErrors);
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
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-line bg-paper p-8 sm:p-10" role="status">
        <span className="flex size-11 items-center justify-center rounded-md bg-accent/10 text-accent">
          <Check size={22} strokeWidth={1.75} aria-hidden />
        </span>
        <h2 className="mt-5 text-heading text-ink">Request received — thank you.</h2>
        <p className="mt-2.5 max-w-md text-body text-muted">
          We&apos;ll reply within one business day to confirm a time. If it&apos;s
          urgent, email{" "}
          <a href={`mailto:${site.email}`} className="text-accent underline-offset-2 hover:underline">
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
      className="relative rounded-xl border border-line bg-paper p-6 shadow-[0_24px_60px_-34px_rgb(var(--c-accent)/0.4)] sm:p-8"
    >
      {formError && (
        <p
          role="alert"
          className="mb-6 rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-body-sm text-danger"
        >
          {formError}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          required
          error={errors.name}
          value={values.name}
          onChange={(v) => update("name", v)}
          autoComplete="name"
          placeholder="Your name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          error={errors.email}
          value={values.email}
          onChange={(v) => update("email", v)}
          autoComplete="email"
          placeholder="you@company.com"
        />
      </div>

      <div className="mt-5">
        <Field
          id="company"
          label="Company"
          optional
          error={errors.company}
          value={values.company}
          onChange={(v) => update("company", v)}
          autoComplete="organization"
          placeholder="Company or project name"
        />
      </div>

      <ChipGroup
        name="projectType"
        legend="What are we building?"
        required
        options={projectTypes}
        value={values.projectType}
        error={errors.projectType}
        onChange={(v) => update("projectType", v)}
      />

      <ChipGroup
        name="timeline"
        legend="Timeline"
        required
        options={timelines}
        value={values.timeline}
        error={errors.timeline}
        onChange={(v) => update("timeline", v)}
      />

      <fieldset className="mt-7">
        <legend className="mb-2.5 block font-mono text-label uppercase tracking-[0.1em] text-muted">
          Preferred call time <span className="ml-1 normal-case">(optional)</span>
        </legend>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label htmlFor="field-preferredDate" className="sr-only">
            Preferred date
          </label>
          <input
            id="field-preferredDate"
            type="date"
            value={values.preferredDate}
            onFocus={(e) => {
              e.currentTarget.min = new Date().toISOString().slice(0, 10);
            }}
            onChange={(e) => update("preferredDate", e.target.value)}
            aria-invalid={!!errors.preferredDate}
            className={cn(
              inputBase,
              "sm:w-auto",
              errors.preferredDate ? "border-danger" : "border-line",
            )}
          />
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Preferred time of day">
            {callSlots.map((slot) => (
              <Chip
                key={slot}
                name="preferredSlot"
                value={slot}
                checked={values.preferredSlot === slot}
                onChange={() => update("preferredSlot", values.preferredSlot === slot ? "" : slot)}
              />
            ))}
          </div>
        </div>
        {errors.preferredDate && (
          <FieldError id="preferredDate-error">{errors.preferredDate}</FieldError>
        )}
        <p className="mt-2 text-label text-muted">We&apos;ll match your time zone automatically.</p>
      </fieldset>

      <div className="mt-7">
        <FieldLabel htmlFor="field-message" label="Tell us about it" required />
        <textarea
          id="field-message"
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="What are you building, who is it for, and what does done look like?"
          className={cn(inputBase, "resize-y", errors.message ? "border-danger" : "border-line")}
        />
        {errors.message && <FieldError id="message-error">{errors.message}</FieldError>}
      </div>

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

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : "Book a call"}
          {!submitting && <ArrowRight size={18} strokeWidth={1.75} aria-hidden />}
        </Button>
        <p className="text-body-sm text-muted">Reply within one business day.</p>
      </div>
    </form>
  );
}

function Chip({
  name,
  value,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        onClick={checked ? onChange : undefined}
        className="peer sr-only"
      />
      <span className="inline-flex items-center rounded-md border border-line bg-paper px-3.5 py-2 text-body-sm text-ink transition-colors duration-150 hover:border-ink/25 peer-checked:border-accent peer-checked:bg-accent/5 peer-checked:text-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
        {value}
      </span>
    </label>
  );
}

function ChipGroup({
  name,
  legend,
  options,
  value,
  error,
  required,
  onChange,
}: {
  name: keyof Values;
  legend: string;
  options: readonly string[];
  value: string;
  error?: string;
  required?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset
      className="mt-7"
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    >
      <legend className="mb-2.5 block font-mono text-label uppercase tracking-[0.1em] text-muted">
        {legend}
        {required && <span className="ml-1 text-accent">*</span>}
      </legend>
      <div className="flex flex-wrap gap-2" id={`field-${name}`} tabIndex={-1}>
        {options.map((opt) => (
          <Chip
            key={opt}
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
        ))}
      </div>
      {error && <FieldError id={`${name}-error`}>{error}</FieldError>}
    </fieldset>
  );
}

function FieldLabel({
  htmlFor,
  label,
  required,
  optional,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block font-mono text-label uppercase tracking-[0.1em] text-muted"
    >
      {label}
      {required && <span className="ml-1 text-accent">*</span>}
      {optional && <span className="ml-1 normal-case text-muted">(optional)</span>}
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

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
  optional,
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={`field-${id}`} label={label} required={required} optional={optional} />
      <input
        id={`field-${id}`}
        name={id}
        type={type}
        required={required}
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
