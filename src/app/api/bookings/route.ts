import { NextResponse } from "next/server";
import { Resend } from "resend";

type BookingPayload = {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  sessionDate: string;
  location: string;
  budget: string;
  instagram?: string;
  message: string;
};

function validate(payload: Partial<BookingPayload>): string | null {
  if (!payload.fullName?.trim()) return "Full name is required.";
  if (!payload.email?.trim() || !payload.email.includes("@")) return "Valid email is required.";
  if (!payload.phone?.trim()) return "Phone number is required.";
  if (!payload.serviceType?.trim()) return "Service type is required.";
  if (!payload.sessionDate?.trim()) return "Session date is required.";
  if (!payload.location?.trim()) return "Location is required.";
  if (!payload.budget?.trim()) return "Budget is required.";
  if (!payload.message?.trim() || payload.message.trim().length < 20) {
    return "Please add at least 20 characters in project details.";
  }
  return null;
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const payload = body as Partial<BookingPayload>;
  const error = validate(payload);

  if (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  const data: BookingPayload = {
    fullName: payload.fullName!.trim(),
    email: payload.email!.trim(),
    phone: payload.phone!.trim(),
    serviceType: payload.serviceType!.trim(),
    sessionDate: payload.sessionDate!.trim(),
    location: payload.location!.trim(),
    budget: payload.budget!.trim(),
    instagram: payload.instagram?.trim() ?? "",
    message: payload.message!.trim(),
  };

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[BOOKING] RESEND_API_KEY not set — booking payload:", JSON.stringify(data, null, 2));
    return NextResponse.json({ message: "Booking received" });
  }

  const resend = new Resend(apiKey);
  const to = process.env.BOOKING_EMAIL ?? "hello@vectorstudio.com";
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Vector Studio <onboarding@resend.dev>";

  const text = [
    `New booking request`,
    ``,
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Service: ${data.serviceType}`,
    `Date: ${data.sessionDate}`,
    `Location: ${data.location}`,
    `Budget: ${data.budget}`,
    `Instagram: ${data.instagram || "—"}`,
    ``,
    `Message:`,
    data.message,
  ].join("\n");

  try {
    await resend.emails.send({
      from,
      to,
      subject: `New booking: ${data.fullName}`,
      text,
    });
  } catch (err) {
    console.error("[BOOKING] Resend error:", err);
    return NextResponse.json(
      { message: "Could not send booking email. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Booking received" });
}
