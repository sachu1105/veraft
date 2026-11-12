import { NextResponse } from "next/server";
import { contactSchema, toFieldErrors } from "@/lib/contact-schema";
import { isEmailConfigured, sendBookingEmail } from "@/lib/email";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: toFieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  // Honeypot tripped — pretend success so bots don't learn anything.
  const { website, ...booking } = parsed.data;
  if (website) {
    return NextResponse.json({ ok: true });
  }

  // If email delivery isn't configured, fall back to logging so local
  // development still works without credentials.
  if (!isEmailConfigured()) {
    console.info("[contact] new booking (email not configured)", {
      name: booking.name,
      email: booking.email,
      projectType: booking.projectType,
      timeline: booking.timeline,
      length: booking.message.length,
    });
    return NextResponse.json({ ok: true });
  }

  try {
    await sendBookingEmail(booking);
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Something went wrong sending your request. Please try again, or email us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
