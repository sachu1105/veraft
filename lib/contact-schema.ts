import { z } from "zod";
import { countryCodes } from "@/lib/countries";

export const projectTypes = [
  "New product / MVP",
  "Custom software or web app",
  "AI-powered product",
  "UI/UX or product design",
  "Improve or modernise an existing app",
  "Ongoing engineering or maintenance",
  "Not sure yet",
] as const;

/**
 * Optional phone, typed without the country code (that comes from the picker)
 * or as a full "+…" number. Empty, or 4–15 digits with common separators.
 */
const optionalPhone = z
  .string()
  .trim()
  .refine((v) => {
    if (v === "") return true;
    if (!/^\+?[\d\s\-().]+$/.test(v)) return false;
    const digits = v.replace(/\D/g, "").length;
    return digits >= 4 && digits <= 15;
  }, "Please enter a valid phone number, or leave it blank.")
  .optional();

/** Shared by the client form and the API route so validation stays in sync. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email address."),
  phone: optionalPhone,
  phoneCountry: z.union([z.enum(countryCodes), z.literal("")]).optional(),
  projectType: z.enum(projectTypes, "Pick what you need help with."),
  // Captured automatically from the browser, so we can schedule in their time.
  timezone: z.string().trim().max(64).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters.")
    .max(4000, "That's a bit long — please keep it under 4000 characters."),
  // Honeypot: real users never fill this; bots often do. Kept permissive
  // here so a tripped bot passes validation and can be silently accepted
  // by the route (rather than getting a revealing error).
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

/** Version-robust mapping of zod issues to a flat field -> message map. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in out)) {
      out[key as keyof ContactInput] = issue.message;
    }
  }
  return out;
}
