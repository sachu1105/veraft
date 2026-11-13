import { Resend } from "resend";
import { site } from "@/lib/site";
import type { ContactInput } from "@/lib/contact-schema";
import { findCountry, formatInternational } from "@/lib/countries";

/**
 * Booking / contact delivery via Resend.
 *
 * Env vars (see .env.example):
 *   RESEND_API_KEY   — required to send, from https://resend.com/api-keys
 *   CONTACT_TO       — inbox that receives requests (defaults to site.email)
 *   CONTACT_FROM     — sender on a domain verified in Resend. Until set,
 *                      Resend's shared "onboarding@resend.dev" is used, which
 *                      can only deliver to your own Resend account email.
 *
 * When CONTACT_FROM is set (i.e. a domain is verified), the client also gets
 * a short confirmation email.
 */

export type BookingMessage = Omit<ContactInput, "website">;

const FROM = process.env.CONTACT_FROM || `${site.name} <onboarding@resend.dev>`;
const TO = process.env.CONTACT_TO || site.email;
const CAN_EMAIL_CLIENTS = Boolean(process.env.CONTACT_FROM);

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function phoneLine(msg: BookingMessage): string {
  const full = formatInternational(msg.phone ?? "", msg.phoneCountry);
  if (!full) return "— (reply by email)";
  const country = msg.phone?.trim().startsWith("+") ? undefined : findCountry(msg.phoneCountry);
  return country ? `${full} (${country[1]})` : full;
}

function rows(msg: BookingMessage): [string, string][] {
  return [
    ["Name", msg.name],
    ["Email", msg.email],
    ["Phone", phoneLine(msg)],
    ["Needs", msg.projectType],
    ["Time zone", msg.timezone || "—"],
  ];
}

function internalText(msg: BookingMessage): string {
  return [
    ...rows(msg).map(([k, v]) => `${(k + ":").padEnd(16)}${v}`),
    "",
    "Message:",
    msg.message,
  ].join("\n");
}

function internalHtml(msg: BookingMessage): string {
  const tr = rows(msg)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;white-space:nowrap">${k}</td><td style="padding:6px 0;color:#0b0c10">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.5">
<h2 style="margin:0 0 16px;font-weight:600;color:#0b0c10">New call booking</h2>
<table style="border-collapse:collapse">${tr}</table>
<p style="margin:20px 0 6px;color:#6b7280">Message</p>
<div style="white-space:pre-wrap;color:#0b0c10;border-left:3px solid #001ffe;padding-left:12px">${escapeHtml(msg.message)}</div>
</div>`;
}

function confirmationText(msg: BookingMessage): string {
  return [
    `Hi ${msg.name},`,
    "",
    `Thanks for reaching out to ${site.name} — we've got your request (${msg.projectType}).`,
    msg.phone
      ? "We'll call or email you within one business day to set up a short call."
      : "We'll reply within one business day to set up a short call.",
    "",
    "If anything is time-sensitive, just reply to this email.",
    "",
    `— The ${site.name} team`,
    site.url,
  ].join("\n");
}

/** Send a booking request (and, if possible, a confirmation). Throws if the internal email fails. */
export async function sendBookingEmail(msg: BookingMessage): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: msg.email,
    subject: `New call booking: ${msg.name} — ${msg.projectType}`,
    text: internalText(msg),
    html: internalHtml(msg),
  });
  if (error) throw new Error(error.message);

  if (CAN_EMAIL_CLIENTS) {
    const confirm = await resend.emails.send({
      from: FROM,
      to: msg.email,
      replyTo: TO,
      subject: `We've got your request — ${site.name}`,
      text: confirmationText(msg),
    });
    // The request already reached us; a failed confirmation shouldn't fail it.
    if (confirm.error) console.warn("[contact] confirmation email failed", confirm.error.message);
  }
}
