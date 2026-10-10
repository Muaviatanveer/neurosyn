import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Star, ArrowRight, ShieldCheck, CheckCircle2, MessageSquare, Award } from "lucide-react";
import { Reveal } from "../components/site/ui";
import { listTestimonials, submitTestimonial } from "../lib/testimonials.functions";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Reviews & Testimonials — NeuroSyn" },
      {
        name: "description",
        content:
          "Read what enterprise clients and partners say about working with NeuroSyn, and share your own review of our engineering work.",
      },
      { property: "og:title", content: "Client Reviews & Testimonials — NeuroSyn" },
      {
        property: "og:description",
        content: "Verified feedback from enterprise organizations we build software and AI systems with.",
      },
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
            className={`h-4.5 w-4.5 ${
              n <= value ? "fill-[#1D81F2] text-[#1D81F2]" : "text-slate-200"
            }`}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-[#1D81F2] focus:ring-2 focus:ring-[#1D81F2]/20";

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
    <div className="min-h-screen bg-white text-slate-900">
      {/* NETSOL Architectural Pinstripe Hero */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 py-20 md:px-10 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Verified Client Endorsements</span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[1.08]">
            What enterprise clients & partners{" "}
            <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
              say.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Unfiltered feedback about our engineering execution, architectural rigor, and measurable business impact across enterprise deployments.
          </p>

          {/* Trust benchmark pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-xs">
              <ShieldCheck className="h-4 w-4 text-[#1D81F2]" />
              <span>100% Senior Engineering Delivery</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Zero Production Regression Record</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-xs">
              <Award className="h-4 w-4 text-[#1D81F2]" />
              <span>4.9 / 5.0 Enterprise Partner Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Reviews & Feedback Section */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-12">
          {/* Published Reviews Column */}
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
                Verified Reviews ({list.length})
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#1D81F2]">
                <Stars value={5} />
                <span className="font-semibold text-slate-800">5.0</span>
              </div>
            </div>

            {list.length === 0 ? (
              <div className="rounded-[28px] border border-slate-200 bg-slate-50/50 p-12 text-center">
                <MessageSquare className="mx-auto h-8 w-8 text-slate-400" />
                <p className="mt-4 text-base font-semibold text-slate-900">
                  Be the first to leave a review
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Worked with our team on an engineering pilot or custom system? Submit your evaluation using the form on the right.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {list.map((t) => (
                  <Reveal key={t.id}>
                    <div className="group rounded-[28px] border border-slate-200/85 bg-white p-8 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl">
                      <div className="flex items-center justify-between">
                        <Stars value={t.rating} />
                        <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-[11px] font-semibold text-[#1D81F2]">
                          Verified Partner
                        </span>
                      </div>
                      <blockquote className="mt-5 text-base leading-relaxed text-slate-800">
                        “{t.quote}”
                      </blockquote>
                      <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-display text-sm font-bold text-[#1D81F2]">
                          {t.name.slice(0, 1)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                          <div className="text-xs text-slate-500">
                            {[t.role, t.organization].filter(Boolean).join(" · ")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          {/* Submit Review Column */}
          <div className="lg:col-span-5">
            <div className="rounded-[28px] border border-slate-200/85 bg-[#F8FAFC]/90 p-8 shadow-sm sm:p-10 sticky top-24">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#1D81F2]">
                <span className="h-3 w-1 rounded-full bg-[#1D81F2]" />
                <span>Partner Evaluation</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950">
                Leave a review
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Share your experience working with NeuroSyn. All submissions are verified by our team before appearing publicly.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-slate-950">
                    Thank you for your feedback!
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Your review has been securely received and will be published upon identity verification.
                  </p>
                </div>
              ) : (
                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setError(null);
                    mutation.mutate();
                  }}
                >
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Overall Rating <span className="text-[#1D81F2]">*</span>
                    </label>
                    <div className="rounded-xl border border-slate-200 bg-white p-3">
                      <Stars value={rating} onChange={setRating} />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Your Name <span className="text-[#1D81F2]">*</span>
                    </label>
                    <input
                      required
                      maxLength={100}
                      placeholder="Jane Doe"
                      className={inputClass}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Role / Title
                      </label>
                      <input
                        maxLength={120}
                        placeholder="VP of Engineering"
                        className={inputClass}
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Organization
                      </label>
                      <input
                        maxLength={120}
                        placeholder="Enterprise Corp"
                        className={inputClass}
                        value={form.organization}
                        onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Work Email
                    </label>
                    <input
                      type="email"
                      maxLength={255}
                      placeholder="jane@company.com (kept private)"
                      className={inputClass}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Review & Experience <span className="text-[#1D81F2]">*</span>
                    </label>
                    <textarea
                      required
                      minLength={20}
                      maxLength={1200}
                      rows={5}
                      placeholder="What was it like working with the NeuroSyn engineering team? Detail the scope, velocity, and business impact..."
                      className={inputClass}
                      value={form.quote}
                      onChange={(e) => setForm({ ...form, quote: e.target.value })}
                    />
                  </div>

                  {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#1D81F2] py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#156CD4] hover:shadow-xl hover:shadow-blue-500/35 active:scale-[0.98] disabled:opacity-60"
                  >
                    <span>{mutation.isPending ? "Submitting..." : "Submit Verified Review"}</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
