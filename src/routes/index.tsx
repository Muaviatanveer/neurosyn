import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { NeuralSphere } from "../components/site/NeuralSphere";
import { Section, Eyebrow, CTAButton, Reveal, GlassCard } from "../components/site/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuroSyn — Enterprise AI, Built for Reality" },
      {
        name: "description",
        content:
          "AI operating systems that automate software engineering, enterprise operations, and industrial decision-making.",
      },
    ],
  }),
  component: Home,
});

const metrics = [
  { k: "3", v: "Production Products" },
  { k: "Enterprise", v: "Ready Deployments" },
  { k: "AI Native", v: "Multi-Agent Core" },
  { k: "Pilots", v: "Live Integrations" },
];

const products = [
  {
    to: "/products/sap",
    name: "NeuroSyn-SAP",
    tag: "Enterprise Intelligence for SAP & ERP",
    desc: "An intelligence layer for existing SAP and ERP environments — automated auditing, anomaly detection, compliance monitoring, and executive reporting.",
  },
  {
    to: "/products/dev",
    name: "NeuroSyn-Dev",
    tag: "AI Engineering Operating System",
    desc: "Coordinated reasoning engines plan architecture, generate code, verify implementations, and ship with production-grade confidence.",
  },
  {
    to: "/products/aero",
    name: "NeuroSyn-Aero",
    tag: "Industrial AI for Aerospace Diagnostics",
    desc: "Physics-informed models, telemetry analytics, and explainable diagnostics for predictive maintenance across high-value assets.",
  },
  {
    to: "/products/kids",
    name: "NeuroSyn-Kids",
    tag: "The AI Builder for the Next Generation",
    desc: "Natural-language software creation for young innovators — build websites, games, and applications with guided AI.",
  },
];

const whyItems = [
  ["Enterprise-first", "Designed from day one for scale, security, and reliability."],
  ["Explainable AI", "Every recommendation is transparent, traceable, and evidence-backed."],
  ["Hybrid Infrastructure", "Local + cloud compute with cost-aware routing."],
  ["Verifiable Intelligence", "Sandbox verification and deterministic checks on every output."],
  ["Human-in-the-loop", "AI that augments expertise, not replaces it."],
  ["Production Ready", "Ships to real environments — not demos."],
];

function Home() {
  return (
    <>
      {/* HERO */}
      <Section className="!py-24 md:!py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>Enterprise Intelligence Platform</Eyebrow>
            </Reveal>
            <Reveal delay={1}>
              <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
                <span className="text-gradient">Enterprise AI,</span>
                <br />
                <span className="text-brand-gradient">Built for Reality.</span>
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                From software engineering to enterprise automation and industrial diagnostics,
                NeuroSyn develops intelligent operating systems that help organizations move
                faster, reduce operational costs, and make confident decisions.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton to="/products">Explore Products →</CTAButton>
                <CTAButton to="/contact" variant="ghost">Book a Demo</CTAButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={2} className="hidden lg:block">
            <NeuralSphere />
          </Reveal>
        </div>

        {/* Metrics */}
        <Reveal delay={4}>
          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.v} className="bg-background/80 p-6 text-center">
                <div className="font-display text-2xl font-semibold text-brand-gradient md:text-3xl">{m.k}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{m.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* LOGOS / STATEMENT */}
      <Section className="!py-16 border-t border-border">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Looking for Strategic Partners · Pilot Integrations Available
          </p>
        </div>
      </Section>

      {/* PRODUCTS */}
      <Section>
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal><Eyebrow>Products</Eyebrow></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold text-gradient md:text-5xl">
                Four operating systems. One intelligence platform.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground">
              View all products →
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i}>
              <Link to={p.to}>
                <GlassCard className="group h-full">
                  <div className="flex h-full flex-col">
                    <div className="text-xs uppercase tracking-widest text-brand">{p.tag}</div>
                    <h3 className="mt-3 font-display text-2xl font-semibold">{p.name}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-sm text-foreground/80 transition group-hover:text-brand">
                      Learn more <span className="transition group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHY */}
      <Section className="border-t border-border">
        <Reveal><Eyebrow>Why NeuroSyn</Eyebrow></Reveal>
        <Reveal delay={1}>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold text-gradient md:text-5xl">
            Built for enterprise from day one.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyItems.map(([t, d], i) => (
            <Reveal key={t} delay={i}>
              <GlassCard>
                <h3 className="font-display text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass relative overflow-hidden rounded-3xl p-12 text-center md:p-20"
        >
          <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 50% 0%, rgba(79,140,255,0.35), transparent 60%)" }} />
          <h2 className="relative font-display text-4xl font-semibold text-gradient md:text-5xl">
            Let's build the future of intelligent enterprise.
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-muted-foreground">
            Explore a pilot, evaluate a partnership, or discuss investment opportunities with our team.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <CTAButton to="/contact">Book a Demo</CTAButton>
            <CTAButton to="/investors" variant="ghost">Talk to Founders</CTAButton>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
