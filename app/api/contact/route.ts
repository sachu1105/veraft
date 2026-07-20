import { NextResponse } from "next/server";
import { contactSchema, toFieldErrors } from "@/lib/contact-schema";
import { isEmailConfigured, sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: toFieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, company, message } = parsed.data;

  // If email delivery isn't configured, fall back to logging so local
  // development still works without credentials.
  if (!isEmailConfigured()) {
    console.info("[contact] new submission (email not configured)", {
      name,
      email,
      company: company || "—",
      length: message.length,
    });
    return NextResponse.json({ ok: true });
  }

  try {
    await sendContactEmail({ name, email, company, message });
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return NextResponse.json(
      { ok: false, message: "Something went wrong sending your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
