import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section, PageHeader, Reveal, GlassCard } from "../components/site/ui";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NeuroSyn" },
      { name: "description", content: "Talk to NeuroSyn about pilots, partnerships, investment, and product demonstrations." },
      { property: "og:title", content: "Contact NeuroSyn" },
      { property: "og:description", content: "Let's build intelligent systems together." },
    ],
  }),
  component: ContactPage,
});

const inquiries = [
  ["Enterprise Partnerships", "Deploy NeuroSyn across your organization."],
  ["Pilot Integrations", "Evaluate a platform inside your existing infrastructure."],
  ["Investment Opportunities", "Discuss strategic investment and partnership."],
  ["Product Demonstrations", "See NeuroSyn-SAP, Dev, and Aero in action."],
  ["General Inquiries", "Any other questions — we'd love to hear from you."],
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Section>
        <PageHeader
          eyebrow="Contact"
          title={<>Let's build intelligent <span className="text-brand-gradient">systems together.</span></>}
          subtitle="Whether you're exploring AI adoption, planning a pilot, evaluating a partnership, or interested in investing — we'd love to hear from you."
        />
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <GlassCard className="!p-8">
              {sent ? (
                <div className="py-16 text-center">
                  <h3 className="font-display text-2xl font-semibold text-gradient">Thank you.</h3>
                  <p className="mt-3 text-muted-foreground">Our team will be in touch shortly.</p>
                </div>
              ) : (
                <form
                  className="grid gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Name" name="name" required />
                    <Field label="Company" name="company" required />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Work Email" name="email" type="email" required />
                    <Field label="Industry" name="industry" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                    <textarea
                      required
                      rows={5}
                      className="rounded-lg border border-border bg-white/[0.02] px-4 py-3 text-sm outline-none transition focus:border-brand"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                  >
                    Send message →
                  </button>
                </form>
              )}
            </GlassCard>
          </Reveal>

          <div className="space-y-4 lg:col-span-2">
            {inquiries.map(([t, d], i) => (
              <Reveal key={t} delay={i}>
                <GlassCard className="!p-5">
                  <h4 className="font-display text-sm font-semibold">{t}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{d}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-lg border border-border bg-white/[0.02] px-4 py-3 text-sm outline-none transition focus:border-brand"
      />
    </div>
  );
}
