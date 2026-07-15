import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, PageHeader, Reveal, GlassCard } from "../components/site/ui";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — NeuroSyn" },
      { name: "description", content: "Four operating systems. One enterprise intelligence platform." },
      { property: "og:title", content: "NeuroSyn Products" },
      { property: "og:description", content: "SAP, Dev, Aero, and Kids — production-grade AI operating systems." },
    ],
  }),
  component: ProductsIndex,
});

const products = [
  {
    to: "/products/sap",
    name: "NeuroSyn-SAP",
    tag: "Enterprise Intelligence for SAP & ERP",
    desc: "Continuous auditing, anomaly detection, compliance monitoring, and executive reporting inside existing SAP and ERP environments.",
    status: "Pilot Integrations Available",
  },
  {
    to: "/products/dev",
    name: "NeuroSyn-Dev",
    tag: "AI Engineering Operating System",
    desc: "Multi-agent reasoning coordinates architecture, generation, verification, and deployment across the entire engineering lifecycle.",
    status: "Seeking Strategic Partners",
  },
  {
    to: "/products/aero",
    name: "NeuroSyn-Aero",
    tag: "Industrial AI for Aerospace Diagnostics",
    desc: "Physics-informed models and Bayesian diagnostics convert telemetry into explainable maintenance decisions.",
    status: "Engaging with Aerospace Partners",
  },
  {
    to: "/products/kids",
    name: "NeuroSyn-Kids",
    tag: "The AI Builder for the Next Generation",
    desc: "Natural-language software creation for young innovators — build, learn, and publish in a safe AI environment.",
    status: "Coming Soon",
  },
];

function ProductsIndex() {
  return (
    <>
      <Section>
        <PageHeader
          eyebrow="Products"
          title={<>An operating system for <span className="text-brand-gradient">every layer of enterprise intelligence.</span></>}
          subtitle="Purpose-built AI platforms for enterprise operations, engineering, industrial diagnostics, and next-generation creators."
        />
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i}>
              <Link to={p.to}>
                <GlassCard className="group h-full">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-widest text-brand">{p.tag}</div>
                    <div className="rounded-full border border-border bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                      {p.status}
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-semibold">{p.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-6 text-sm text-foreground/80 transition group-hover:text-brand">
                    Explore →
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
