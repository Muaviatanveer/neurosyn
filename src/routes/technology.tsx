import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Section, PageHeader, Reveal, GlassCard, Eyebrow } from "../components/site/ui";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology — NeuroSyn" },
      { name: "description", content: "Intelligent systems built on modern AI infrastructure: multi-agent reasoning, explainable AI, verification pipelines, and enterprise APIs." },
      { property: "og:title", content: "NeuroSyn Technology" },
      { property: "og:description", content: "Built on modern AI infrastructure." },
    ],
  }),
  component: TechPage,
});

const stack = ["User", "Intelligent Router", "Specialized AI Engines", "Verification Layer", "Enterprise Systems", "Continuous Learning"];

const cards = [
  ["Hybrid AI Models", "Local + cloud compute orchestrated per workload for cost, latency, and privacy."],
  ["Explainable AI", "Every output traces back to evidence, sources, and reasoning steps."],
  ["Multi-Agent Reasoning", "Specialized engines debate trade-offs and converge on verified answers."],
  ["Knowledge Graphs", "Structured enterprise memory across repositories, systems, and telemetry."],
  ["Sandbox Verification", "Outputs validated in isolated environments before reaching production."],
  ["Enterprise APIs", "Secure integrations with SAP, ERP, industrial systems, and modern SaaS."],
];

function TechPage() {
  return (
    <>
      <Section>
        <PageHeader
          eyebrow="Technology"
          title={<>Built on modern <span className="text-brand-gradient">AI infrastructure.</span></>}
          subtitle="NeuroSyn combines advanced AI models, enterprise architecture, deterministic algorithms, and secure cloud-native infrastructure to solve complex business problems."
        />
      </Section>

      <Section className="!pt-0">
        <Reveal>
          <div className="glass rounded-3xl p-8 md:p-12">
            <Eyebrow>Reference Architecture</Eyebrow>
            <div className="mt-10 flex flex-col items-stretch gap-3">
              {stack.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="mx-auto flex max-w-md items-center justify-between rounded-xl border border-border bg-white/[0.03] px-6 py-4">
                    <span className="font-display text-sm text-brand">0{i + 1}</span>
                    <span className="font-display text-lg">{s}</span>
                    <span className="h-2 w-2 rounded-full bg-brand animate-pulse-glow" />
                  </div>
                  {i < stack.length - 1 && (
                    <div className="mx-auto my-2 h-6 w-px bg-gradient-to-b from-brand/60 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(([t, d], i) => (
            <Reveal key={t} delay={i}>
              <GlassCard>
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
