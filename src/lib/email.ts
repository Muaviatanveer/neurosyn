import { createServerFn } from '@tanstack/react-start';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = createServerFn({ method: 'POST' })
  // 1. Tell TanStack Start what type of data to expect
  .validator((data: { name: string; email: string; message: string }) => data)
  // 2. The handler now safely receives the validated data
  .handler(async ({ data }) => {
    try {
      const response = await resend.emails.send({
        from: 'onboarding@resend.dev', // Use your verified domain once configured in Resend
        to: 'muaviatanveer27@gmail.com',  // Put your recipient email address here
        subject: `New Query from ${data.name}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      });

      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  });