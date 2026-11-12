import { z } from "zod";

export const projectTypes = [
  "New product / MVP",
  "AI feature or agent",
  "Integration / automation",
  "Deploy or maintain an app",
  "Not sure yet",
] as const;

export const timelines = ["As soon as possible", "In 1–3 months", "Just exploring"] as const;

export const callSlots = ["Morning", "Afternoon", "Evening"] as const;

const optionalDate = z
  .string()
  .trim()
  .refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), "Please pick a valid date.")
  .optional();

/** Shared by the client form and the API route so validation stays in sync. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email address."),
  company: z.string().trim().max(120).optional(),
  projectType: z.enum(projectTypes, "Pick what you'd like to build."),
  timeline: z.enum(timelines, "Pick a rough timeline."),
  preferredDate: optionalDate,
  preferredSlot: z.union([z.enum(callSlots), z.literal("")]).optional(),
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
