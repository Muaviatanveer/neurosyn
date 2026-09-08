import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Star } from "lucide-react";
import { Reveal } from "../components/site/ui";
import { listTestimonials, submitTestimonial } from "../lib/testimonials.functions";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Reviews & Testimonials — NeuroSyn" },
      { name: "description", content: "Read what clients and partners say about working with NeuroSyn, and share your own review of our engineering work." },
      { property: "og:title", content: "Client Reviews & Testimonials — NeuroSyn" },
      { property: "og:description", content: "Feedback from the organizations we build software with." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TestimonialsPage,
});

function Stars({ value, onChange }: { value: number; onChange?: (n: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type={onChange ? "button" : undefined}
          disabled={!onChange}
          onClick={() => onChange?.(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className={onChange ? "transition-transform hover:scale-110" : "cursor-default"}
        >
          <Star
            className={`h-4 w-4 ${n <= value ? "fill-[var(--brand)] text-[var(--brand)]" : "text-[var(--line-strong)]"}`}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}

const inputClass =
  "w-full rounded-[3px] border border-[var(--line-strong)] bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--brand)]";

function TestimonialsPage() {
  const load = useServerFn(listTestimonials);
  const send = useServerFn(submitTestimonial);
  const { data } = useQuery({ queryKey: ["testimonials"], queryFn: () => load() });

  const [form, setForm] = useState({ name: "", role: "", organization: "", email: "", quote: "" });
  const [rating, setRating] = useState(5);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () => send({ data: { ...form, rating } }),
    onSuccess: (res) => setError(res.ok ? null : res.error),
    onError: () => setError("Please check the fields and try again."),
  });

  const submitted = mutation.isSuccess && mutation.data?.ok;
  const list = data?.testimonials ?? [];

  return (
    <>
      <section className="border-b border-[var(--line)] px-6 pt-20 pb-16 md:px-10 md:pt-28">
        <div className="mx-auto max-w-[1360px]">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--brand)]">Reviews</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.04] md:text-7xl">
            What clients and partners say.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Honest feedback about our technical ability, communication, delivery, and business impact. Worked with us? Share your review below.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1360px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {list.length === 0 ? (
              <p className="text-[var(--text-secondary)]">No published reviews yet. Yours could be the first.</p>
            ) : (
              <div className="grid gap-px bg-[var(--line)] sm:grid-cols-2">
                {list.map((t) => (
                  <Reveal key={t.id} className="bg-background">
                    <figure className="h-full p-7">
                      <Stars value={t.rating} />
                      <blockquote className="mt-5 text-[17px] leading-relaxed">“{t.quote}”</blockquote>
                      <figcaption className="mt-6 text-sm">
                        <span className="font-medium">{t.name}</span>
                        <span className="block text-[var(--text-muted)]">
                          {[t.role, t.organization].filter(Boolean).join(" · ")}
                        </span>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="border border-[var(--line-strong)] p-7 md:p-9">
              <h2 className="font-display text-2xl font-medium">Leave a review</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Reviews are checked before they appear on the site.
              </p>

              {submitted ? (
                <p className="mt-8 rounded-[3px] border border-[var(--line-strong)] bg-card p-5 text-sm">
                  Thank you. Your review has been received and will appear once approved.
                </p>
              ) : (
                <form
                  className="mt-7 grid gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setError(null);
                    mutation.mutate();
                  }}
                >
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">Rating</label>
                    <Stars value={rating} onChange={setRating} />
                  </div>
                  <input required maxLength={100} placeholder="Your name" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input maxLength={120} placeholder="Role (optional)" className={inputClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                  <input maxLength={120} placeholder="Organization (optional)" className={inputClass} value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
                  <input type="email" maxLength={255} placeholder="Email (optional, not published)" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <textarea required minLength={20} maxLength={1200} rows={6} placeholder="What was it like working with NeuroSyn?" className={inputClass} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="rounded-[3px] bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {mutation.isPending ? "Submitting…" : "Submit review"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
