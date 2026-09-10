import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Database, Cpu, Plane, Sparkles, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Reveal, Eyebrow, CTAButton } from "../components/site/ui";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Enterprise Products — NeuroSyn" },
      {
        name: "description",
        content:
          "Four production-grade AI operating systems: NeuroSyn-SAP, NeuroSyn-Dev, NeuroSyn-Aero, and NeuroSyn-Copilot.",
      },
      { property: "og:title", content: "NeuroSyn Enterprise Products" },
      {
        property: "og:description",
        content: "SAP, Dev, Aero, and Copilot — production-grade AI operating systems.",
      },
    ],
  }),
  component: ProductsIndex,
});

const products = [
  {
    to: "/products/sap",
    name: "NeuroSyn-SAP",
    icon: Database,
    tag: "Enterprise Intelligence for SAP & ERP",
    desc: "Continuous auditing, real-time anomaly detection, automated reconciliation, and executive variance reporting directly inside SAP S/4HANA landscapes.",
    status: "Pilot Integrations Available",
    metrics: "82% faster audit cycles",
    stack: ["SAP RFC", "OData v4", "SOX 404 Compliant"],
  },
  {
    to: "/products/dev",
    name: "NeuroSyn-Dev",
    icon: Cpu,
    tag: "Autonomous AI Engineering System",
    desc: "Multi-agent graph coordinating architecture design, code generation, Abstract Syntax Tree verification, and deployment across enterprise repos.",
    status: "Seeking Strategic Partners",
    metrics: "81% lower cloud AI compute cost",
    stack: ["Multi-Agent Graph", "AST Security Audits", "vLLM"],
  },
  {
    to: "/products/aero",
    name: "NeuroSyn-Aero",
    icon: Plane,
    tag: "Industrial AI for Fleet & Aero Diagnostics",
    desc: "Physics-informed neural networks and Bayesian diagnostic models converting raw high-frequency telemetry into explainable maintenance actions.",
    status: "Engaging Aerospace Partners",
    metrics: "99.4% precision on anomaly alarms",
    stack: ["Edge ONNX Runtime", "OPC-UA", "Bayesian Models"],
  },
  {
    to: "/products/copilot",
    name: "NeuroSyn-Copilot",
    icon: Sparkles,
    tag: "Repository & System Architecture Copilot",
    desc: "Automated, multi-agent analysis workflows on proprietary business telemetry, codebases, and unstructured documentation locally and securely.",
    status: "Pilot Integrations Available",
    metrics: "100% on-premise air-gapping",
    stack: ["Local Inference", "Vector Search", "Zero Egress"],
  },
];

function ProductsIndex() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NETSOL Architectural Pinstripe Hero */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 py-20 md:px-10 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Flagship Operating Systems</span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[1.08]">
            An operating system for every layer of enterprise{" "}
            <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
              intelligence.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Purpose-built AI platforms for enterprise finance, autonomous software engineering, industrial fleet diagnostics, and air-gapped system architecture.
          </p>
        </div>
      </section>

      {/* Products Bento Showcase */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1360px] grid gap-8 md:grid-cols-2">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.name} delay={i * 0.1}>
                <Link to={p.to} className="group block h-full">
                  <div className="rounded-[28px] border border-slate-200/85 bg-white p-8 lg:p-10 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-[#1D81F2]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1D81F2]">
                            {p.tag}
                          </span>
                        </div>
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                          {p.status}
                        </span>
                      </div>

                      <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-slate-950">
                        {p.name}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-slate-600">
                        {p.desc}
                      </p>

                      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 text-xs font-medium text-slate-800">
                        <span className="font-mono font-semibold text-[#1D81F2]">Validated:</span>{" "}
                        {p.metrics}
                      </div>
                    </div>

                    <div className="mt-8 border-t border-slate-100 pt-6 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <span className="group-hover:translate-x-1 inline-flex items-center gap-1 text-sm font-semibold text-[#1D81F2] transition-transform">
                        <span>Explore System</span>
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* NETSOL Bottom CTA */}
      <section className="border-t border-slate-200 bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Pilot Deployment</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Integrate NeuroSyn into your enterprise.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">
            Deploy as an on-premise air-gapped system or a private dedicated VPC cloud cluster with direct enterprise connectors.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton to="/contact">Request Product Architecture Demo</CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}