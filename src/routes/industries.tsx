import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHeader, Reveal, GlassCard } from "../components/site/ui";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — NeuroSyn" },
      { name: "description", content: "Enterprise AI systems deployed across finance, manufacturing, aerospace, healthcare, energy, and public sector." },
      { property: "og:title", content: "Industries — NeuroSyn" },
      { property: "og:description", content: "AI systems purpose-built for demanding industries." },
    ],
  }),
  component: IndustriesPage,
});

const industries = [
  ["Enterprise", "Cross-functional AI for finance, ops, and IT."],
  ["Finance", "Automated auditing, anomaly detection, compliance."],
  ["Manufacturing", "Operational intelligence and predictive quality."],
  ["Healthcare", "Secure workflows, reporting, and analytics."],
  ["Education", "AI-native learning platforms for the next generation."],
  ["Government", "Explainable, auditable public-sector AI."],
  ["Aerospace", "Physics-informed diagnostics and fleet intelligence."],
  ["Energy", "Predictive maintenance for critical infrastructure."],
];

function IndustriesPage() {
  return (
    <>
      <Section>
        <PageHeader
          eyebrow="Industries"
          title={<>Deployed across <span className="text-brand-gradient">demanding environments.</span></>}
          subtitle="NeuroSyn platforms operate where reliability, explainability, and compliance are non-negotiable."
        />
      </Section>
      <Section className="!pt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {industries.map(([t, d], i) => (
            <Reveal key={t} delay={i}>
              <GlassCard className="h-full">
                <h3 className="font-display text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
