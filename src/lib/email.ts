import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";
import { sanitizeHeader, sanitizeText } from "./sanitize";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(5, "Message must be at least 5 characters").max(5000),
});

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string; message: string }) => {
    return contactSchema.parse(data);
  })
  .handler(async ({ data }) => {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      return { success: false, error: "Email service is not configured." };
    }

    const cleanName = sanitizeHeader(data.name);
    const cleanEmail = sanitizeHeader(data.email);
    const cleanMessage = sanitizeText(data.message);

    try {
      const resend = new Resend(key);
      const response = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "muaviatanveer27@gmail.com",
        subject: `New Query from ${cleanName}`,
        text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
      });

      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  });
