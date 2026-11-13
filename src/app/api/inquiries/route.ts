import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxLengths = {
  name: 100,
  email: 254,
  phone: 40,
  service: 100,
  eventDate: 10,
  location: 120,
  guests: 5,
  message: 2000,
} as const;

type InquiryField = keyof typeof maxLengths;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function clean(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!isRecord(body)) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });

  if (clean(body.website, 200)) return NextResponse.json({ ok: true, spam: true }, { status: 202 });

  const fields = Object.fromEntries(
    (Object.keys(maxLengths) as InquiryField[]).map((field) => [field, clean(body[field], maxLengths[field])]),
  ) as Record<InquiryField, string>;
  const locale = body.locale === "en" ? "en" : body.locale === "es" ? "es" : "";
  const consent = body.consent === "on" || body.consent === "true";

  if (!locale || !consent || !fields.name || !fields.phone || !fields.service || !fields.location || !emailPattern.test(fields.email)) {
    return NextResponse.json({ error: "Please check the required fields." }, { status: 400 });
  }
  if (fields.eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(fields.eventDate)) {
    return NextResponse.json({ error: "Invalid event date." }, { status: 400 });
  }
  if (fields.guests && (!/^\d+$/.test(fields.guests) || Number(fields.guests) < 1 || Number(fields.guests) > 10000)) {
    return NextResponse.json({ error: "Invalid guest count." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.INQUIRY_TO_EMAIL;
  const sender = process.env.INQUIRY_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) {
    return NextResponse.json({ error: "Inquiry email is not configured." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const labels =
    locale === "es"
      ? ["Nombre", "Correo", "Teléfono", "Servicio", "Fecha", "Lugar", "Invitados", "Mensaje"]
      : ["Name", "Email", "Phone", "Service", "Date", "Location", "Guests", "Message"];
  const values = [
    fields.name,
    fields.email,
    fields.phone,
    fields.service,
    fields.eventDate || "—",
    fields.location,
    fields.guests || "—",
    fields.message || "—",
  ];
  const text = labels.map((label, index) => `${label}: ${values[index]}`).join("\n");

  try {
    const { error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: fields.email,
      subject: `Nueva consulta web: ${fields.service}`,
      text,
    });

    if (error) {
      console.error("Inquiry email delivery failed:", error.message);
      return NextResponse.json({ error: "Could not deliver the inquiry." }, { status: 502 });
    }
  } catch (error) {
    console.error("Inquiry email request failed:", error);
    return NextResponse.json({ error: "Could not deliver the inquiry." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
