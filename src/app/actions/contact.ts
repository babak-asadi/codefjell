"use server";

import { Resend } from "resend";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const resend = new Resend(process.env.RSEND_KEY);

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    return { status: "error", message: "All fields are required." };
  }

  try {
    await resend.emails.send({
      from: "Codefjell Contact <noreply@codefjell.no>",
      to: "b.ascor94@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return { status: "success" };
  } catch {
    return { status: "error", message: "Failed to send message. Please try again." };
  }
}
