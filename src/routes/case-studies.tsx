import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, TrendingUp, Cpu, ShieldCheck, Database, Layers } from "lucide-react";
import { Reveal, Eyebrow, CTAButton } from "../components/site/ui";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies & Production Engagements — NeuroSyn" },
      {
        name: "description",
        content:
          "Explore real-world enterprise deployments across SAP intelligence, autonomous AI engineering, industrial diagnostics, and financial gateways.",
      },
      { property: "og:title", content: "NeuroSyn Enterprise Case Studies" },
      {
        property: "og:description",
        content: "Production-grade AI and custom software systems shipped to tier-1 enterprises.",
      },
    ],
  }),
  component: CasesPage,
});

const caseStudies = [
  {
    id: "sap-intelligence",
    category: "Enterprise SAP Intelligence",
    icon: Database,
    title: "Continuous Financial Audit & Anomaly Detection inside Global SAP Landscape",
    client: "Global Fortune 500 Industrial Conglomerate",
    metricHighlight: "82% Cycle Acceleration",
    metricLabel: "Monthly audit cycles reduced from 3 weeks to 48 hours",
    summary:
      "NeuroSyn engineered a sovereign intelligence layer directly on top of the client's SAP S/4HANA core via secure RFC and OData bridges. The system autonomously reconciles millions of cross-ledger journal entries, flags fraudulent deviations, and generates executive variance memos in real time.",
    highlights: [
      "Zero modifications to underlying SAP database schemas or core tables",
      "Over $14M in duplicate invoicing and discount anomalies caught in Q1",
      "Immutable cryptographic audit trails compliant with SOX 404 regulations",
    ],
    techStack: ["SAP S/4HANA", "OData v4", "FastAPI", "pgvector", "Zero-Trust RBAC"],
  },
  {
    id: "autonomous-dev",
    category: "AI Engineering & Developer Velocity",
    icon: Cpu,
    title: "Autonomous Multi-Agent Code Generation & Verification Pipeline",
    client: "Tier-1 FinTech & Digital Banking Provider",
    metricHighlight: "81% Cloud Cost Reduction",
    metricLabel: "Drop in token compute expenditure per verified feature",
    summary:
      "Replaced unstructured single-prompt coding tools with a coordinated multi-agent graph. Dedicated architect, implementer, and AST-security verification agents collaborate to produce pull requests with comprehensive unit test coverage and automated vulnerability audits.",
    highlights: [
      "Average pull-request turnaround compressed from 4 days to 45 minutes",
      "Zero syntax regressions across 2,400+ deployed pull requests",
      "Hybrid local model routing (vLLM) with air-gapped on-premise fallback",
    ],
    techStack: ["LangGraph", "TypeScript 5", "vLLM", "Docker Sandboxes", "GitHub Actions"],
  },
  {
    id: "industrial-telemetry",
    category: "Industrial IoT & Fleet Diagnostics",
    icon: Layers,
    title: "Physics-Informed Bayesian Diagnostics for Mission-Critical Fleet Assets",
    client: "Aerospace Maintenance & Defense Contractor",
    metricHighlight: "99.4% Precision Rate",
    metricLabel: "Sub-12ms telemetry anomaly detection across 12,000 sensors",
    summary:
      "Integrated high-frequency vibration, thermal, and acoustic sensor streams into physics-guided neural networks. The system predicts structural fatigue 180 operating hours ahead of standard threshold alarms, drastically minimizing unscheduled operational groundings.",
    highlights: [
      "Physics-guided loss functions eliminate unphysical hallucinated false positives",
      "Edge-optimized ONNX runtime executing directly on ruggedized onboard gateways",
      "Automated work-order generation dispatched straight to field technicians",
    ],
    techStack: ["PyTorch", "ONNX Runtime", "OPC-UA", "MQTT", "ClickHouse", "Rust"],
  },
  {
    id: "fintech-reconciliation",
    category: "Distributed Financial Backends",
    icon: TrendingUp,
    title: "High-Concurrency Real-Time Settlement & Reconciliation Backbone",
    client: "Pan-Regional Payment Processing Network",
    metricHighlight: "$1.4B+ Daily Volume",
    metricLabel: "Zero reconciliation discrepancy across 45M transactions/day",
    summary:
      "Engineered an event-driven Go microservices architecture on top of Apache Kafka. Delivers sub-millisecond idempotency checking, dual-entry accounting guarantees, and automated ISO 20022 message conversion under peak load spikes.",
    highlights: [
      "P99 latency maintained under 14ms during peak 18,000 TPS transaction events",
      "Deterministic disaster recovery with active-active cross-region failover",
      "PCI-DSS Level 1 compliant architecture with hardware-level HSM key management",
    ],
    techStack: ["Go (Golang)", "Apache Kafka", "PostgreSQL", "Redis Enterprise", "Kubernetes"],
  },
  {
    id: "sovereign-ai",
    category: "Air-Gapped Sovereign AI",
    icon: ShieldCheck,
    title: "Air-Gapped Document Intelligence & Reasoning Cluster for Public Sector",
    client: "Sovereign Public Sector Institution",
    metricHighlight: "100% On-Premise",
    metricLabel: "Zero cloud egress with full cryptographic data sovereignty",
    summary:
      "Designed and deployed an isolated on-premise compute cluster running sovereign open-weights LLMs. Enables secure search, semantic classification, and cross-document synthesis across tens of thousands of classified policy documents without third-party API exposure.",
    highlights: [
      "Hardware-level air-gapping with zero outbound network interfaces",
      "Sub-second vector retrieval over 4.5M pages of multilingual records",
      "Strict role-based document access control mirroring physical clearance levels",
    ],
    techStack: ["DeepSeek-R1", "Qdrant", "Python 3.12", "Triton Server", "NVIDIA H100s"],
  },
];

function CasesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NETSOL Architectural Pinstripe Hero */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 py-20 md:px-10 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Proven Production Track Record</span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[1.08]">
            Mission-critical systems, delivered to enterprise{" "}
            <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
              production.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Detailed engineering overviews of how NeuroSyn deploys custom software, autonomous AI platforms, and enterprise ERP integrations with measurable business impact.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[#1D81F2] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#156CD4] hover:shadow-xl hover:shadow-blue-500/35 active:scale-[0.98]"
            >
              <span>Schedule an Architecture Briefing</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Bento Grid */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1360px] space-y-12">
          {caseStudies.map((study, idx) => {
            const Icon = study.icon;
            return (
              <Reveal key={study.id} delay={idx * 0.1}>
                <div className="group relative overflow-hidden rounded-[28px] border border-slate-200/85 bg-white p-8 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl lg:p-12">
                  {/* Pinstripe header accent */}
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-[#1D81F2]">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1D81F2]">
                          {study.category}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs font-medium text-slate-500">{study.client}</span>
                      </div>
                      <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                        {study.title}
                      </h2>
                      <p className="text-base leading-relaxed text-slate-600">
                        {study.summary}
                      </p>
                    </div>

                    {/* Metric Card */}
                    <div className="shrink-0 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-slate-50 p-6 lg:w-72 text-left">
                      <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1D81F2]">
                        Validated Metric
                      </div>
                      <div className="mt-2 font-display text-3xl font-extrabold text-slate-950">
                        {study.metricHighlight}
                      </div>
                      <p className="mt-1 text-xs leading-normal text-slate-600">
                        {study.metricLabel}
                      </p>
                    </div>
                  </div>

                  {/* Highlights and Architecture */}
                  <div className="mt-8 grid gap-8 border-t border-slate-100 pt-8 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Engineering Highlights & Delivery
                      </h3>
                      <div className="mt-4 space-y-2.5">
                        {study.highlights.map((h) => (
                          <div key={h} className="flex items-start gap-3 text-sm text-slate-700">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1D81F2]" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-4">
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Core Architecture Stack
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {study.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* NETSOL-Style Call to Action */}
      <section className="border-t border-slate-200 bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Pilot Qualification</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Have an enterprise engineering challenge?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">
            Our principal software and AI architects evaluate your requirements under NDA and deliver an actionable architectural blueprint in 5 business days.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton to="/contact">Start a Technical Discussion</CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
