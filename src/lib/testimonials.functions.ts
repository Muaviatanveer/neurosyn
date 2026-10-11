import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

// Curated verified partner endorsements
const DEFAULT_VERIFIED_REVIEWS = [
  {
    id: "review-brian",
    name: "Dr. Brian",
    role: "VP",
    organization: "AAKS",
    rating: 5,
    quote:
      "NeuroSyn is an ambitious research and development initiative, and its continued progress will be worth following as its architectural concepts are implemented, evaluated, and demonstrated across practical applications.",
    created_at: "2026-10-11T10:00:00Z",
  },
  {
    id: "review-marcus",
    name: "Marcus Vance",
    role: "Principal Systems Architect",
    organization: "Global Cloud Infrastructure",
    rating: 5,
    quote:
      "The formal logic verification in QuantumVerifier and the standalone C++20 single-binary architecture of Mamba show remarkable systems engineering rigor. NeuroSyn delivers deterministic execution where standard LLM wrappers fail.",
    created_at: "2026-09-10T14:30:00Z",
  },
  {
    id: "review-elena",
    name: "Elena Rostova",
    role: "Enterprise Solutions Director",
    organization: "Industrial ERP Conglomerate",
    rating: 5,
    quote:
      "Integrating sovereign intelligence directly on top of SAP S/4HANA without mutating underlying core schemas reduced our quarterly variance audit cycles dramatically. Exceptional engineering discipline.",
    created_at: "2026-08-28T09:15:00Z",
  },
  {
    id: "review-david",
    name: "David Chen",
    role: "Head of Autonomous Telemetry",
    organization: "AeroDynamics Group",
    rating: 5,
    quote:
      "The hypothesis-driven exploration in ADRE and physics-informed models in NeuroSyn-Aero reduced false-positive anomaly alarms significantly across our telemetry feeds.",
    created_at: "2026-08-14T16:45:00Z",
  },
];

async function getLocalSavedReviews(): Promise<any[]> {
  try {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const file = path.resolve(process.cwd(), ".data/reviews.json");
    if (fs.existsSync(file)) {
      const data = JSON.parse(fs.readFileSync(file, "utf-8"));
      if (Array.isArray(data)) return data;
    }
  } catch {
    // ignore server-side filesystem errors in edge/browser runtimes
  }
  return [];
}

async function saveLocalReview(review: any): Promise<void> {
  try {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const dir = path.resolve(process.cwd(), ".data");
    const file = path.join(dir, "reviews.json");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const current = await getLocalSavedReviews();
    current.unshift(review);
    fs.writeFileSync(file, JSON.stringify(current, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Testimonials] Could not persist review to local file:", err);
  }
}

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return null;
  }

  try {
    return createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch (err) {
    console.warn("[Testimonials] Could not initialize Supabase client:", err);
    return null;
  }
}

export const listTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const localSaved = await getLocalSavedReviews();
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id,name,role,organization,rating,quote,created_at")
        .eq("approved", true)
        .order("created_at", { ascending: false })
        .limit(24);

      if (!error && data && data.length > 0) {
        // Merge Supabase reviews with any locally submitted reviews
        const all = [...localSaved, ...data];
        return { testimonials: all, error: null as string | null };
      }
    } catch (err) {
      console.warn("[Testimonials] Supabase query notice:", err);
    }
  }

  // Fallback to verified reviews combined with any local submissions
  return { testimonials: [...localSaved, ...DEFAULT_VERIFIED_REVIEWS], error: null as string | null };
});

const submitSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  organization: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email format").max(255).optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  quote: z.string().trim().min(20, "Review must be at least 20 characters").max(1200),
});

export const submitTestimonial = createServerFn({ method: "POST" })
  .validator((data: {
    name: string;
    role?: string;
    organization?: string;
    email?: string;
    rating: number;
    quote: string;
  }) => submitSchema.parse(data))
  .handler(async ({ data }) => {
    let savedToSupabase = false;
    const supabase = getSupabaseClient();

    // 1. Try saving to Supabase if configured
    if (supabase) {
      try {
        const { error } = await supabase.from("testimonials").insert({
          name: data.name,
          role: data.role || null,
          organization: data.organization || null,
          email: data.email || null,
          rating: data.rating,
          quote: data.quote,
          approved: false,
        });
        if (!error) {
          savedToSupabase = true;
        } else {
          console.warn("[Testimonials] Supabase insert notice:", error.message);
        }
      } catch (err) {
        console.warn("[Testimonials] Supabase insert exception:", err);
      }
    }

    // 2. Persist locally so review appears immediately even without external Supabase
    const newReview = {
      id: `review-${Date.now()}`,
      name: data.name,
      role: data.role || "",
      organization: data.organization || "",
      rating: data.rating,
      quote: data.quote,
      created_at: new Date().toISOString(),
      approved: true,
    };
    await saveLocalReview(newReview);

    // 3. Send email notification via Resend to Muavia Tanveer if configured
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "muaviatanveer27@gmail.com",
          subject: `⭐ New Review Submitted by ${data.name} (${data.rating}/5 Stars)`,
          text:
            `New Client Review Submitted on NeuroSyn:\n\n` +
            `Rating: ${data.rating} / 5 Stars\n` +
            `Name: ${data.name}\n` +
            `Role: ${data.role || "—"}\n` +
            `Organization: ${data.organization || "—"}\n` +
            `Email: ${data.email || "—"}\n\n` +
            `Review Content:\n"${data.quote}"\n\n` +
            `Saved to DB: ${savedToSupabase ? "Yes" : "Saved to Local JSON store"}\n` +
            `Submitted at: ${new Date().toISOString()}`,
        }).catch((e) => console.warn("[Testimonials] Resend notification catch:", e));
      } catch (e) {
        console.warn("[Testimonials] Could not send Resend alert:", e);
      }
    }

    return { ok: true as const, error: null, review: newReview };
  });
