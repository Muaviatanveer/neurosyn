import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { NeuralSphere } from "../components/site/NeuralSphere";
import { Section, Eyebrow, CTAButton, Reveal, Panel } from "../components/site/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuroSyn — The Operating System for Intelligence" },
      {
        name: "description",
        content:
          "Reasoning, structured as infrastructure. NeuroSyn builds enterprise AI operating systems for engineering, operations, and industrial diagnostics.",
      },
      { property: "og:title", content: "NeuroSyn — The Operating System for Intelligence" },
      {
        property: "og:description",
        content: "Reasoning, structured as infrastructure. Built for precision, not noise.",
      },
    ],
  }),
  component: Home,
});

const modules = [
  { id: "01", name: "Reasoning", desc: "Deliberate multi-step inference." },
  { id: "02", name: "Memory", desc: "Structured long-context recall." },
  { id: "03", name: "Planning", desc: "Constraint-aware task graphs." },
  { id: "04", name: "Vision", desc: "Multi-modal perception." },
  { id: "05", name: "Research", desc: "Autonomous information synthesis." },
  { id: "06", name: "Verification", desc: "Deterministic evidence checks." },
  { id: "07", name: "Execution", desc: "Governed action into systems." },
];

const capabilities = [
  {
    tag: "SAP · ERP",
    name: "NeuroSyn-SAP",
    desc: "Continuous auditing, anomaly detection, and executive reporting inside existing enterprise environments.",
    status: "PILOT",
    to: "/products/sap",
  },
  {
    tag: "ENGINEERING",
    name: "NeuroSyn-Dev",
    desc: "Coordinated reasoning across architecture, generation, verification, and deployment.",
    status: "PARTNERS",
    to: "/products/dev",
  },
  {
    tag: "AEROSPACE",
    name: "NeuroSyn-Aero",
    desc: "Physics-informed diagnostics and predictive maintenance for high-value industrial assets.",
    status: "PARTNERS",
    to: "/products/aero",
  },
  {
    tag: "COPILOT",
    name: "NeuroSyn-Copilot",
    desc: "Multi-agent analysis over unstructured business telemetry and documents, executed locally.",
    status: "PILOT",
    to: "/products/copilot",
  },
];

const metrics = [
  { k: "12ms", v: "Median Latency", d: "orchestration overhead" },
  { k: "07", v: "Reasoning Modules", d: "operational" },
  { k: "99.98%", v: "Verified Outputs", d: "sandbox-checked" },
  { k: "24/7", v: "Continuous Ops", d: "no drift" },
];

const proof = [
  ["Explainable", "Every output traces to its evidence."],
  ["Governed", "Human-in-the-loop, by design."],
  ["Hybrid", "Local and cloud compute, cost-routed."],
  ["Verifiable", "Deterministic checks on every action."],
];

function Home() {
  return (
    <>
      {/* HERO */}
      <Section className="!pt-32 !pb-24 md:!pt-40">
        <div className="grid items-start gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="00">System · Overview</Eyebrow>
            </Reveal>
            <Reveal delay={1}>
              <h1 className="mt-10 font-display text-[52px] font-medium leading-[0.98] tracking-[-0.035em] md:text-[92px]">
                <span className="text-instrument">The Operating System</span>
                <br />
                <span className="text-[var(--text-secondary)]">for </span>
                <span className="text-instrument">Intelligence.</span>
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-8 max-w-[46ch] text-[17px] leading-relaxed text-[var(--text-secondary)]">
                Reasoning, structured as infrastructure. NeuroSyn coordinates
                perception, memory, planning, and verification into a single
                intelligence surface — engineered for precision, not noise.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <CTAButton to="/products">Enter the System</CTAButton>
                <CTAButton to="/contact" variant="ghost">Request Access</CTAButton>
              </div>
            </Reveal>
            <Reveal delay={4}>
              <div className="mt-14 flex items-center gap-6 font-mono text-[10px] tracking-[0.18em] text-[var(--text-muted)]">
                <span>V · 2.0</span>
                <span className="h-px w-8 bg-[var(--line)]" />
                <span>BUILD · 2026.Q1</span>
                <span className="h-px w-8 bg-[var(--line)]" />
                <span className="text-[var(--mint)]">OPERATIONAL</span>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={2}>
              <NeuralSphere />
            </Reveal>
          </div>
        </div>

        {/* Telemetry bar */}
        <Reveal delay={5}>
          <div className="mt-24 grid grid-cols-2 divide-x divide-[var(--line)] border-y border-[var(--line-strong)] md:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.v} className="p-6">
                <div className="font-display text-3xl font-medium text-instrument md:text-4xl">
                  {m.k}
                </div>
                <div className="mt-3 label-mono">{m.v}</div>
                <div className="mt-1 text-[11px] text-[var(--text-muted)]">{m.d}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ARCHITECTURE */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow index="01">Architecture</Eyebrow>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-8 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-instrument md:text-5xl">
                An assembly of reasoning primitives.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Seven cooperating modules. Each observable, each governed, each replaceable.
                The system composes them into workflows the way an engineer composes a circuit.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((m, i) => (
                <Reveal key={m.id} delay={i * 0.5}>
                  <div className="group h-full bg-background p-6 transition-colors duration-[180ms] hover:bg-[var(--surface)]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)]">
                        MOD · {m.id}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-[var(--quantum)] opacity-60 transition-opacity group-hover:opacity-100" />
                    </div>
                    <h3 className="mt-8 font-display text-xl font-medium">{m.name}</h3>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">{m.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CAPABILITIES / PRODUCTS */}
      <Section>
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Eyebrow index="02">Modules · Products</Eyebrow>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-8 max-w-2xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-instrument md:text-5xl">
                Four operating systems.
                <br />
                One intelligence surface.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-[var(--text-secondary)] hover:text-foreground"
            >
              ALL PRODUCTS
              <span className="transition-transform duration-[180ms] group-hover:translate-x-0.5">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-px bg-[var(--line)] md:grid-cols-2">
          {capabilities.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.5}>
              <Link to={c.to} className="block h-full">
                <div className="group relative h-full bg-background p-8 transition-colors duration-[180ms] hover:bg-[var(--surface)] md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)]">
                      {c.tag}
                    </span>
                    <span className="rounded-[3px] border border-[var(--line-strong)] px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] text-[var(--quantum)]">
                      {c.status}
                    </span>
                  </div>
                  <h3 className="mt-12 font-display text-3xl font-medium tracking-[-0.02em] md:text-[36px]">
                    {c.name}
                  </h3>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    {c.desc}
                  </p>
                  <div className="mt-10 flex items-center gap-3 text-sm text-[var(--text-secondary)] transition-colors group-hover:text-[var(--quantum)]">
                    <span className="h-px w-8 bg-[var(--line-strong)] transition-all group-hover:w-12 group-hover:bg-[var(--quantum)]" />
                    <span>Enter module</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* LIVE INTELLIGENCE */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow index="03">Live · Intelligence</Eyebrow>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-8 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-instrument md:text-5xl">
                A quiet system, always thinking.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Modules run continuously — observing, verifying, and routing decisions
                across the enterprise. Every action is logged, every inference is auditable.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Panel className="p-0" hover={false}>
              <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--mint)] shadow-[0_0_8px_var(--mint)] breathe" />
                  <span className="label-mono">runtime · stream</span>
                </div>
                <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--text-muted)]">
                  UTC · 04:12:08
                </span>
              </div>
              <div className="divide-y divide-[var(--line)] font-mono text-[12px]">
                {[
                  ["04:12:04", "reasoning", "resolved plan #4821 · 6 steps · 240ms"],
                  ["04:12:03", "verify", "sandbox pass · 12/12 assertions"],
                  ["04:12:02", "memory", "context window compacted · 32k → 8k"],
                  ["04:12:00", "vision", "extracted 41 entities from 3 documents"],
                  ["04:11:58", "planning", "constraint graph updated · edges +7"],
                ].map(([t, m, msg]) => (
                  <div key={t} className="grid grid-cols-[80px_100px_1fr] items-center gap-4 px-5 py-3">
                    <span className="text-[var(--text-muted)]">{t}</span>
                    <span className="text-[var(--quantum)]">{m}</span>
                    <span className="text-[var(--text-secondary)]">{msg}</span>
                  </div>
                ))}
              </div>
              <div className="flow-line" />
            </Panel>
          </div>
        </div>
      </Section>

      {/* PROOF */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow index="04">Principles</Eyebrow>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-8 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-instrument md:text-5xl">
                Built for precision, not noise.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-px bg-[var(--line)] sm:grid-cols-2">
              {proof.map(([t, d], i) => (
                <Reveal key={t} delay={i * 0.5}>
                  <div className="h-full bg-background p-8">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)]">
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-xl font-medium">{t}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">{d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden border border-[var(--line-strong)] bg-[var(--surface)] p-12 md:p-20"
        >
          <div className="absolute inset-x-0 top-0 flow-line" />
          <div className="absolute inset-x-0 bottom-0 flow-line" />
          <div className="mx-auto max-w-3xl text-center">
            <span className="label-mono">Access · Program</span>
            <h2 className="mt-8 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-instrument md:text-6xl">
              An interface that feels awake.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--text-secondary)]">
              Pilot programs, strategic partnerships, and investor conversations are open.
              We work with a small number of teams at a time.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <CTAButton to="/contact">Request Access</CTAButton>
              <CTAButton to="/investors" variant="ghost">Talk to Founders</CTAButton>
            </div>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
