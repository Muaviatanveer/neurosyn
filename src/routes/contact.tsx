import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, Building2, User, Clock, Lock } from "lucide-react";
import { sendContactEmail } from "../lib/email";
import { Reveal } from "../components/site/ui";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact NeuroSyn — Start a Software or AI Project" },
      {
        name: "description",
        content:
          "Tell us what you're building. We'll help you define the technology, system architecture, and path to production under mutual NDA.",
      },
      { property: "og:title", content: "Contact NeuroSyn" },
      {
        property: "og:description",
        content: "Let's build software and AI systems that move your enterprise forward.",
      },
    ],
  }),
  component: ContactPage,
});

const serviceOptions = [
  "AI & Machine Learning",
  "Custom Software & SaaS",
  "Enterprise SAP & ERP Modernization",
  "Cloud & DevOps Architecture",
  "Data Pipelines & Lakehouses",
  "Cybersecurity & Air-Gapped AI",
];

function ContactPage() {
  const [selectedService, setSelectedService] = useState<string>("AI & Machine Learning");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const result = await sendContactEmail({
        data: {
          name,
          email,
          message: `Service Interest: ${selectedService}\nCompany: ${company}\n\nProject Scope:\n${message}`,
        },
      });

      if (result.success) {
        setSent(true);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to send message. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NETSOL Architectural Pinstripe Hero */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 py-20 md:px-10 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Direct Engineering Engagement</span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[1.08]">
            Tell us what you're{" "}
            <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
              building.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Whether you need enterprise AI, custom cloud software, or SAP modernization, our senior engineering leads review your requirements and respond with technical clarity.
          </p>

          {/* SLA Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-xs">
              <Clock className="h-4 w-4 text-[#1D81F2]" />
              <span>1 Business Day Response SLA</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-xs">
              <Lock className="h-4 w-4 text-[#1D81F2]" />
              <span>Standard Mutual NDA Guaranteed</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-xs">
              <ShieldCheck className="h-4 w-4 text-[#1D81F2]" />
              <span>Direct Architect Consultation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[840px]">
          {sent ? (
            <div className="rounded-[28px] border border-slate-200 bg-[#F8FAFC] p-10 text-center shadow-sm sm:p-16">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold text-slate-950 sm:text-3xl">
                Message Received
              </h2>
              <p className="mx-auto mt-3 max-w-md text-base text-slate-600">
                Thank you for reaching out. A senior engineering architect will review your technical requirements and reply within one business day.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-8 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-xs hover:bg-slate-50"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-[28px] border border-slate-200/85 bg-white p-8 shadow-sm sm:p-12"
            >
              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Scope Selector Pills */}
              <div className="space-y-3">
                <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Select Focus Area
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {serviceOptions.map((service) => {
                    const isSelected = selectedService === service;
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-[#1D81F2] text-white shadow-sm shadow-blue-500/25 border border-[#1D81F2]"
                            : "border border-slate-200 bg-slate-50/70 text-slate-700 hover:border-slate-300 hover:bg-slate-100/80"
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fields */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Your Name <span className="text-[#1D81F2]">*</span>
                  </label>
                  <div className="relative mt-2">
                    <input
                      name="name"
                      required
                      placeholder="Jane Doe"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D81F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D81F2]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Company or Organization <span className="text-[#1D81F2]">*</span>
                  </label>
                  <div className="relative mt-2">
                    <input
                      name="company"
                      required
                      placeholder="Acme Enterprise"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D81F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D81F2]/20"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Work Email <span className="text-[#1D81F2]">*</span>
                </label>
                <div className="relative mt-2">
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D81F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D81F2]/20"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Project Scope & Technical Objectives <span className="text-[#1D81F2]">*</span>
                </label>
                <div className="relative mt-2">
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your existing infrastructure, goals, timeline, and key technical challenges..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/40 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D81F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D81F2]/20"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row">
                <p className="text-xs text-slate-500">
                  We reply within 1 business day under mutual NDA.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#1D81F2] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#156CD4] hover:shadow-xl hover:shadow-blue-500/35 active:scale-[0.98] disabled:opacity-50"
                >
                  <span>{loading ? "Transmitting..." : "Start the Conversation"}</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}