import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHeader, Reveal, GlassCard, CTAButton } from "../components/site/ui";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — NeuroSyn" },
      { name: "description", content: "Enterprise pilots and design-partner engagements across SAP intelligence, engineering, and industrial diagnostics." },
      { property: "og:title", content: "NeuroSyn Case Studies" },
      { property: "og:description", content: "Enterprise pilots and design-partner engagements." },
    ],
  }),
  component: CasesPage,
});

const cases = [
  {
    tag: "SAP Intelligence",
    title: "Continuous audit inside a global SAP environment",
    metric: "Monthly audit cycles reduced from weeks to days",
    body: "NeuroSyn-SAP was deployed as an intelligence layer on top of an existing SAP landscape, automating anomaly detection and executive reporting across finance modules.",
  },
  {
    tag: "AI Engineering",
    title: "Autonomous engineering pipeline for a design partner",
    metric: "81% reduction in cloud AI cost per feature shipped",
    body: "NeuroSyn-Dev orchestrated multi-agent architecture, code verification, and deployment across a hybrid local + cloud environment.",
  },
  {
    tag: "Industrial Intelligence",
    title: "Physics-informed diagnostics across a maintenance fleet",
    metric: "Explainable maintenance recommendations at fleet scale",
    body: "NeuroSyn-Aero converted heterogeneous telemetry into engineering-grade decisions using Bayesian diagnostics and digital twins.",
  },
];

function CasesPage() {
  return (
    <>
      <Section>
        <PageHeader
          eyebrow="Case Studies"
          title={<>Enterprise-grade AI, <span className="text-brand-gradient">shipped to production.</span></>}
          subtitle="Design-partner engagements and pilot integrations across the NeuroSyn product suite."
        />
      </Section>
      <Section className="!pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i}>
              <GlassCard className="h-full">
                <div className="text-xs uppercase tracking-widest text-brand">{c.tag}</div>
                <h3 className="mt-3 font-display text-xl font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{c.body}</p>
                <div className="mt-6 rounded-lg border border-border bg-white/[0.03] px-4 py-3 text-sm text-foreground/90">
                  {c.metric}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 text-center">
          <CTAButton to="/contact">Discuss a Pilot</CTAButton>
        </div>
      </Section>
    </>
  );
}
