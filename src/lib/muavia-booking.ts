import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

type BookingInput = {
  name: string;
  email: string;
  company?: string;
  duration: string;
  date: string;
  time: string;
  reason: string;
};

export const requestMeeting = createServerFn({ method: "POST" })
  .validator((data: BookingInput) => data)
  .handler(async ({ data }) => {
    const key = process.env.RESEND_API_KEY;
    if (!key) return { success: false, error: "Email service not configured." };
    const resend = new Resend(key);
    const owner = "muaviatanveer27@gmail.com";

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: owner,
        subject: `New Meeting Request — ${data.name}`,
        text:
          `New Meeting Request\n\n` +
          `Name: ${data.name}\n` +
          `Company: ${data.company || "—"}\n` +
          `Email: ${data.email}\n` +
          `Duration: ${data.duration}\n` +
          `Date: ${data.date}\n` +
          `Time: ${data.time}\n\n` +
          `Purpose:\n${data.reason}`,
      });

      // Confirmation to requester (may only deliver to verified addresses on default domain)
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: data.email,
        subject: "Your meeting request with Muavia Tanveer",
        text:
          `Hi ${data.name},\n\n` +
          `Thanks for reaching out. Your meeting request has been received.\n\n` +
          `Duration: ${data.duration}\nDate: ${data.date}\nTime: ${data.time}\n\n` +
          `I'll follow up shortly to confirm.\n\n— Muavia Tanveer\nFounder & Lead Architect, NeuroSyn AI`,
      }).catch(() => null);

      return { success: true };
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  });
