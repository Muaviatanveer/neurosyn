import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Code,
  Brain,
  Cloud,
  Layers,
  Database,
  Shield,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Server,
  Zap,
  Lock,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Interactive Solution Console                                      */
/* Turns static slide cards into a live interactive software console */
/* ------------------------------------------------------------------ */

export interface SolutionCapability {
  id: string;
  icon: typeof Code;
  shortTitle: string;
  badge: string;
  tagline: string;
  description: string;
  specs: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
  workflow: { step: string; detail: string }[];
  ctaLink: string;
}

const solutions: SolutionCapability[] = [
  {
    id: "software",
    icon: Code,
    shortTitle: "Web & Mobile Platforms",
    badge: "Core Engineering",
    tagline: "High-performance web apps, mobile apps, and robust backend services.",
    description:
      "We design and build production-grade web applications and native mobile software from zero to scale. Built with modern type safety, modular microservices, and audited code quality.",
    specs: [
      "Custom SaaS & customer portals",
      "iOS & Android cross-platform apps",
      "High-throughput REST & GraphQL APIs",
      "Offline-first sync & state engines",
    ],
    metrics: [
      { label: "Production Latency", value: "< 75ms" },
      { label: "Target Availability", value: "99.99%" },
      { label: "Code Coverage", value: "> 95%" },
    ],
    stack: ["TypeScript", "React", "Next.js", "React Native", "Node.js", "PostgreSQL"],
    workflow: [
      { step: "01 Architecture", detail: "Domain modeling, API contracts & UX wireframes" },
      { step: "02 Core Sprints", detail: "Bi-weekly production builds with automated test suites" },
      { step: "03 Handover", detail: "Full source code, CI/CD pipelines & architecture docs" },
    ],
    ctaLink: "/contact?service=software",
  },
  {
    id: "ai",
    icon: Brain,
    shortTitle: "Custom AI & ML Systems",
    badge: "Intelligent Systems",
    tagline: "Private AI assistants, document search, and custom machine learning.",
    description:
      "We deploy domain-specific AI models that run securely on your private servers or cloud. From enterprise search over massive internal archives to automated classification pipelines.",
    specs: [
      "Private enterprise LLMs with zero data leakage",
      "Retrieval-Augmented Generation (RAG) over PDFs & databases",
      "Automated document processing & OCR extraction",
      "Real-time sensor anomaly detection",
    ],
    metrics: [
      { label: "Data Leakage", value: "0% (Private)" },
      { label: "Query Accuracy", value: "98.7%" },
      { label: "Inference Latency", value: "< 250ms" },
    ],
    stack: ["Python", "PyTorch", "vLLM", "HuggingFace", "LangChain", "Qdrant"],
    workflow: [
      { step: "01 Data Audit", detail: "Evaluate proprietary datasets & accuracy requirements" },
      { step: "02 Model Tuning", detail: "Fine-tune and benchmark against private enterprise ground truth" },
      { step: "03 Deployment", detail: "Deploy self-hosted inference API with monitoring" },
    ],
    ctaLink: "/contact?service=ai",
  },
  {
    id: "cloud",
    icon: Cloud,
    shortTitle: "Cloud & DevOps Infrastructure",
    badge: "Scale & Reliability",
    tagline: "Scalable cloud architecture, automated pipelines, and cost optimization.",
    description:
      "We build resilient cloud infrastructure that handles real traffic spikes without breaking the bank. Zero-downtime rolling deploys, multi-region replication, and infrastructure as code.",
    specs: [
      "Automated CI/CD build & test pipelines",
      "Kubernetes & container orchestration",
      "Multi-region disaster recovery & auto-failover",
      "Cloud cost auditing & efficiency reduction",
    ],
    metrics: [
      { label: "Deploy Time", value: "< 8 mins" },
      { label: "RTO / Recovery", value: "< 15 mins" },
      { label: "Avg Cost Savings", value: "34%" },
    ],
    stack: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    workflow: [
      { step: "01 Infra Review", detail: "Audit current cloud costs, security vulnerabilities & bottlenecks" },
      { step: "02 IaC Modernization", detail: "Codify infrastructure with Terraform & hardened containers" },
      { step: "03 Zero-Downtime Cutover", detail: "Seamless migration with blue-green deployments" },
    ],
    ctaLink: "/contact?service=cloud",
  },
  {
    id: "erp",
    icon: Layers,
    shortTitle: "Enterprise ERP & SAP Systems",
    badge: "Core Operations",
    tagline: "Connect legacy ERPs, automate transaction audits, and remove manual busywork.",
    description:
      "Connect SAP, Oracle, or custom databases with modern web interfaces. Automate cross-system reconciliation, ledger audits, and purchase-order approvals so your team doesn't copy-paste data.",
    specs: [
      "SAP ECC & S/4HANA bi-directional integrations",
      "Automated transaction validation & compliance",
      "Custom operations dashboards & executive reporting",
      "Legacy system migration & data transformation",
    ],
    metrics: [
      { label: "Reconciliation", value: "Real-time" },
      { label: "Manual Effort Saved", value: "~70%" },
      { label: "Audit Accuracy", value: "100%" },
    ],
    stack: ["SAP RFC", "OData", "PostgreSQL", "Python", "Apache Kafka", "Node.js"],
    workflow: [
      { step: "01 Schema Discovery", detail: "Map table structures, BAPIs, and transaction flow" },
      { step: "02 Middleware Build", detail: "High-speed connector with automated fallback & idempotency" },
      { step: "03 Rollout", detail: "Phased cutover with complete audit trail logging" },
    ],
    ctaLink: "/contact?service=erp",
  },
  {
    id: "data",
    icon: Database,
    shortTitle: "Data Engineering & Pipelines",
    badge: "Unified Intelligence",
    tagline: "Clean, reliable pipelines that turn raw data into actionable dashboards.",
    description:
      "We design high-volume streaming and batch data pipelines that ingest from dozens of sources, clean the data, and deliver clean models to your analytics team in sub-second queries.",
    specs: [
      "Real-time event streaming & ETL pipelines",
      "Centralized analytical data warehouses",
      "Automated schema validation & data quality guards",
      "Executive business intelligence dashboards",
    ],
    metrics: [
      { label: "Daily Volume", value: "10M+ rows" },
      { label: "Data Freshness", value: "< 2 mins" },
      { label: "Pipeline Uptime", value: "99.95%" },
    ],
    stack: ["Apache Kafka", "ClickHouse", "PostgreSQL", "dbt", "Snowflake", "Python"],
    workflow: [
      { step: "01 Ingestion Map", detail: "Define source connectors, volume estimates & schema rules" },
      { step: "02 Transformation", detail: "Build reliable dbt / streaming transforms with strict types" },
      { step: "03 BI Serving", detail: "Deliver blazing fast query performance for downstream reporting" },
    ],
    ctaLink: "/contact?service=data",
  },
  {
    id: "security",
    icon: Shield,
    shortTitle: "Air-Gapped & Security-First Systems",
    badge: "Category 6 Security",
    tagline: "Software engineered for environments where nothing touches the public internet.",
    description:
      "For healthcare, defense, and high-compliance enterprises. We engineer self-contained systems that run fully offline inside your private air-gapped network with zero external dependencies.",
    specs: [
      "100% offline self-hosted AI & software operation",
      "Air-gapped deployment packages & USB sync tooling",
      "SOC2, HIPAA, and ISO 27001 compliant architecture",
      "Complete cryptographic audit logging & access controls",
    ],
    metrics: [
      { label: "External Calls", value: "0 (Air-Gapped)" },
      { label: "Security Standard", value: "SOC2 / HIPAA" },
      { label: "Pen-Test Score", value: "Zero High" },
    ],
    stack: ["Rust", "Local LLMs", "On-Prem K8s", "SQLite / Postgres", "GPG Signing"],
    workflow: [
      { step: "01 Threat Model", detail: "Complete perimeter and compliance constraint assessment" },
      { step: "02 Air-Gap Package", detail: "Hermetically sealed container images with audited binaries" },
      { step: "03 On-Prem Handover", detail: "Direct installation verification on client hardware" },
    ],
    ctaLink: "/contact?service=security",
  },
];

export function InteractiveSolutionConsole() {
  const [selectedId, setSelectedId] = useState<string>("software");

  const current = solutions.find((s) => s.id === selectedId) || solutions[0];
  const IconComponent = current.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.03] overflow-hidden">
      {/* Console Top Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-3.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-slate-300 border border-slate-400/40" />
            <span className="h-3 w-3 rounded-full bg-slate-300 border border-slate-400/40" />
            <span className="h-3 w-3 rounded-full bg-slate-300 border border-slate-400/40" />
          </div>
          <span className="ml-3 font-mono text-[12px] font-medium text-slate-500">
            neurosyn://solutions-console
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Select capability to inspect architecture</span>
        </div>
      </div>

      {/* Main Grid: Left selector tabs, Right live architecture preview */}
      <div className="grid lg:grid-cols-12 min-h-[580px]">
        {/* Left Column: Interactive Capability Selector */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/30 p-3 sm:p-4 space-y-1.5">
          <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-slate-400">
            Select Core Capability
          </div>

          {solutions.map((item) => {
            const isSelected = item.id === selectedId;
            const ItemIcon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`group relative w-full text-left p-3.5 rounded-xl transition-all duration-200 flex items-start gap-3.5 ${
                  isSelected
                    ? "bg-white border border-slate-200 shadow-sm text-slate-900"
                    : "hover:bg-slate-100/70 text-slate-600 hover:text-slate-900 border border-transparent"
                }`}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <motion.div
                    layoutId="activeSolutionPill"
                    className="absolute left-0 top-3 bottom-3 w-1 bg-[#06B6D4] rounded-r-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                    isSelected
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-600 group-hover:border-slate-300 group-hover:text-slate-900"
                  }`}
                >
                  <ItemIcon className="h-4.5 w-4.5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-semibold truncate">
                      {item.shortTitle}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-md ${
                        isSelected
                          ? "bg-cyan-50 text-cyan-800 font-medium"
                          : "text-slate-400 group-hover:text-slate-500"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-1 leading-relaxed">
                    {item.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Live Architecture & Delivery Preview */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Header */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-700">
                    <IconComponent className="h-3.5 w-3.5 text-cyan-600" />
                    {current.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Production Architecture</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {current.shortTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {current.description}
                </p>
              </div>

              {/* Live Production Metrics Row */}
              <div className="grid grid-cols-3 gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                {current.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {m.label}
                    </div>
                    <div className="mt-1 font-display text-xl font-bold text-slate-900">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* What We Deliver Specs */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                  Core Engineering Scope
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {current.specs.map((spec) => (
                    <div
                      key={spec}
                      className="flex items-start gap-2 text-xs text-slate-700 bg-white border border-slate-150 rounded-lg p-2.5"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workflow Stepper */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                  Engineering Delivery Flow
                </div>
                <div className="space-y-2">
                  {current.workflow.map((w) => (
                    <div
                      key={w.step}
                      className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-50/60 border border-slate-100"
                    >
                      <span className="font-mono font-semibold text-slate-900 w-28 shrink-0">
                        {w.step}
                      </span>
                      <span className="text-slate-600 text-right flex-1 truncate pl-2">
                        {w.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Production Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {current.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Action Bar */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              Ready to scope this architecture?
            </span>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
            >
              <span>Start Project with This Stack</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
