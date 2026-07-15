import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHeader, Reveal, GlassCard, CTAButton } from "../components/site/ui";

export const Route = createFileRoute("/investors")({
  head: () => ({
    meta: [
      { title: "Investors — NeuroSyn" },
      { name: "description", content: "Partner with NeuroSyn to build the next generation of enterprise AI operating systems." },
      { property: "og:title", content: "Invest in NeuroSyn" },
      { property: "og:description", content: "Building the future of enterprise intelligence." },
    ],
  }),
  component: InvestorsPage,
});

const themes = [
  ["Enterprise AI Platforms", "Operating systems that sit above SAP, ERP, and enterprise workflows."],
  ["Developer Productivity", "Multi-agent engineering for measurable software delivery gains."],
  ["Industrial Intelligence", "Physics-informed diagnostics for high-value assets and fleets."],
  ["Next-Gen Creators", "AI-native creation platforms for the next billion builders."],
];

function InvestorsPage() {
  return (
    <>
      <Section>
        <PageHeader
          eyebrow="Investors & Partners"
          title={<>Building the future of <span className="text-brand-gradient">enterprise intelligence.</span></>}
          subtitle="NeuroSyn is actively engaging with venture capital firms, strategic investors, enterprise partners, and design partners to accelerate the next generation of AI operating systems."
        />
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {themes.map(([t, d], i) => (
            <Reveal key={t} delay={i}>
              <GlassCard>
                <h3 className="font-display text-xl font-semibold">{t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 glass rounded-3xl p-10 text-center md:p-16">
          <h2 className="font-display text-3xl font-semibold text-gradient md:text-4xl">
            Let's shape the future together.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We welcome conversations with organizations interested in enterprise AI, industrial
            intelligence, developer productivity, and intelligent automation.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <CTAButton to="/contact">Become a Partner</CTAButton>
            <CTAButton to="/contact" variant="ghost">Contact Founders</CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}
