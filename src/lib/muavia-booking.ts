import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";
import { sanitizeHeader, sanitizeText } from "./sanitize";

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  company: z.string().trim().max(100).optional().default(""),
  duration: z.string().trim().max(50),
  date: z.string().trim().max(50),
  time: z.string().trim().max(50),
  reason: z.string().trim().min(5, "Purpose is required").max(2000),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const requestMeeting = createServerFn({ method: "POST" })
  .validator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.RESEND_API_KEY;
    if (!key) return { success: false, error: "Email service not configured." };

    const cleanName = sanitizeHeader(data.name);
    const cleanEmail = sanitizeHeader(data.email);
    const cleanCompany = sanitizeHeader(data.company || "—");
    const cleanDuration = sanitizeHeader(data.duration);
    const cleanDate = sanitizeHeader(data.date);
    const cleanTime = sanitizeHeader(data.time);
    const cleanReason = sanitizeText(data.reason);

    const resend = new Resend(key);
    const owner = "muaviatanveer27@gmail.com";

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: owner,
        subject: `New Meeting Request — ${cleanName}`,
        text:
          `New Meeting Request\n\n` +
          `Name: ${cleanName}\n` +
          `Company: ${cleanCompany}\n` +
          `Email: ${cleanEmail}\n` +
          `Duration: ${cleanDuration}\n` +
          `Date: ${cleanDate}\n` +
          `Time: ${cleanTime}\n\n` +
          `Purpose:\n${cleanReason}`,
      });

      // Confirmation to requester (non-blocking)
      await resend.emails
        .send({
          from: "onboarding@resend.dev",
          to: cleanEmail,
          subject: "Your meeting request with Muavia Tanveer",
          text:
            `Hi ${cleanName},\n\n` +
            `Thanks for reaching out. Your meeting request has been received.\n\n` +
            `Duration: ${cleanDuration}\nDate: ${cleanDate}\nTime: ${cleanTime}\n\n` +
            `I'll follow up shortly to confirm.\n\n— Muavia Tanveer\nFounder & Lead Architect, NeuroSyn AI`,
        })
        .catch(() => null);

      return { success: true };
    } catch (e) {
      return { success: false, error: (e as Error).message };
    }
  });
