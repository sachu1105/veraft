import { Resend } from "resend";
import { site } from "@/lib/site";

/**
 * Contact-form delivery via Resend.
 *
 * Requires two env vars (see .env.example):
 *   RESEND_API_KEY   — from https://resend.com/api-keys
 *   CONTACT_TO       — inbox that receives submissions (defaults to site.email)
 *
 * CONTACT_FROM is optional; it must be an address on a domain you've
 * verified in Resend. Until a domain is verified, Resend's shared
 * "onboarding@resend.dev" sender works for testing.
 */

export type ContactMessage = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

const FROM = process.env.CONTACT_FROM || "Veraft <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO || site.email;

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/** Send a contact submission. Throws if delivery fails. */
export async function sendContactEmail(msg: ContactMessage): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const resend = new Resend(apiKey);
  const company = msg.company?.trim() || "—";

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: msg.email,
    subject: `New enquiry from ${msg.name}`,
    text: [
      `Name:    ${msg.name}`,
      `Email:   ${msg.email}`,
      `Company: ${company}`,
      "",
      "Message:",
      msg.message,
    ].join("\n"),
  });

  if (error) {
    throw new Error(error.message);
  }
}
