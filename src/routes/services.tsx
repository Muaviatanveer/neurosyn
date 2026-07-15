import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHeader, Reveal, GlassCard } from "../components/site/ui";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — NeuroSyn" },
      { name: "description", content: "Enterprise AI integration, engineering transformation, industrial intelligence, and custom product development." },
      { property: "og:title", content: "NeuroSyn Services" },
      { property: "og:description", content: "AI services organized around measurable business outcomes." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  ["Enterprise AI Integration", "We integrate advanced AI into existing enterprise systems, modernizing workflows without replacing your current infrastructure."],
  ["SAP & ERP Intelligence", "Deploy AI-powered auditing, reporting, anomaly detection, compliance monitoring, and business intelligence inside SAP and ERP environments."],
  ["AI Engineering Transformation", "Accelerate software delivery through autonomous engineering workflows, intelligent code verification, repository analysis, and AI-assisted deployment."],
  ["Industrial AI & Predictive Intelligence", "Telemetry analytics, predictive maintenance, digital twins, and operational intelligence for asset reliability and reduced downtime."],
  ["AI Strategy & Consulting", "Partner with our team to design AI roadmaps, identify automation opportunities, and implement scalable enterprise AI aligned to business objectives."],
  ["Custom AI Product Development", "From concept to deployment — tailored AI applications that solve industry-specific challenges and integrate cleanly with your ecosystem."],
];

function ServicesPage() {
  return (
    <>
      <Section>
        <PageHeader
          eyebrow="Services"
          title={<>Services organized around <span className="text-brand-gradient">measurable outcomes.</span></>}
          subtitle="From integration and consulting to full product development — we help enterprises operationalize AI at scale."
        />
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map(([t, d], i) => (
            <Reveal key={t} delay={i}>
              <GlassCard className="h-full">
                <div className="flex items-start gap-4">
                  <div className="font-display text-brand">0{i + 1}</div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{t}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{d}</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
