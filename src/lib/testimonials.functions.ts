import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function client() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

export const listTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await client()
    .from("testimonials")
    .select("id,name,role,organization,rating,quote,created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(24);
  if (error) return { testimonials: [], error: "Unable to load reviews right now." };
  return { testimonials: data ?? [], error: null as string | null };
});

const submitSchema = z.object({
  name: z.string().trim().min(2).max(100),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  organization: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  quote: z.string().trim().min(20).max(1200),
});

export const submitTestimonial = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => submitSchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await client().from("testimonials").insert({
      name: data.name,
      role: data.role || null,
      organization: data.organization || null,
      email: data.email || null,
      rating: data.rating,
      quote: data.quote,
      approved: false,
    });
    if (error) return { ok: false as const, error: "Something went wrong. Please try again." };
    return { ok: true as const, error: null };
  });
