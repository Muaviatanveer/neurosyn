import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Building2, User, HelpCircle } from "lucide-react";
import { sendContactEmail } from "../lib/email";
import { Reveal } from "../components/site/ui";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact NeuroSyn — Start a Software or AI Project" },
      {
        name: "description",
        content:
          "Tell us what you're building. We'll help you define the technology, system architecture, and path to production.",
      },
      { property: "og:title", content: "Contact NeuroSyn" },
      {
        property: "og:description",
        content: "Let's build software that moves your business forward.",
      },
    ],
  }),
  component: ContactPage,
});

const serviceOptions = [
  "AI / Machine Learning",
  "Software Development",
  "Enterprise Integration",
  "Cloud / DevOps",
  "Data & Analytics",
  "Other",
];

function ContactPage() {
  const [selectedService, setSelectedService] = useState<string>("AI / Machine Learning");
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
      {/* Header */}
      <section className="border-b border-slate-200 bg-[#F8FAFC] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[900px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">
            <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
            Direct Engagement
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            Tell us what you're building.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Whether you need custom software, enterprise AI, or infrastructure engineering, our senior team will review your requirements and respond with technical clarity.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[760px]">
          {sent ? (
            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-10 text-center shadow-sm sm:p-16">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold text-slate-950 sm:text-3xl">
                Message Received
              </h2>
              <p className="mx-auto mt-3 max-w-md text-base text-slate-600">
                Thank you for reaching out. A senior engineering lead will review your requirements and schedule an introductory architecture session.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-8 rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10"
            >
              {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Scope Selector Pills */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  What can we help with?
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((service) => {
                    const isSelected = selectedService === service;
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition-all ${
                          isSelected
                            ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                            : "border-slate-200 bg-slate-50/70 text-slate-700 hover:border-slate-300 hover:bg-slate-100/80"
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Your Name <span className="text-[#06B6D4]">*</span>
                  </label>
                  <div className="relative mt-2">
                    <input
                      name="name"
                      required
                      placeholder="Jane Doe"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/40 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Company or Organization <span className="text-[#06B6D4]">*</span>
                  </label>
                  <div className="relative mt-2">
                    <input
                      name="company"
                      required
                      placeholder="Acme Corp"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/40 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/20"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Work Email <span className="text-[#06B6D4]">*</span>
                </label>
                <div className="relative mt-2">
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/40 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/20"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Tell us about the project <span className="text-[#06B6D4]">*</span>
                </label>
                <div className="relative mt-2">
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your current systems, objectives, timeline, or key technical challenges..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/40 p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/20"
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                <p className="text-xs text-slate-500">
                  We reply within 1 business day under standard NDA.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 disabled:opacity-50"
                >
                  <span>{loading ? "Sending..." : "Start the conversation"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}