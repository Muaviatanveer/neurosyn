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
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Server,
  Zap,
  Lock,
  Terminal,
  Activity,
  GitBranch,
  Boxes,
  Workflow,
  Radio,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* NETSOL-Inspired 3D Frosted Glass Badges for the Bento Grid          */
/* ------------------------------------------------------------------ */
function Frosted3DVisual({ id }: { id: string }) {
  if (id === "software") {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-white">
        <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-blue-400/15 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/80 bg-white/70 shadow-lg shadow-blue-500/10 backdrop-blur-md">
          <Code className="h-10 w-10 text-[#1D81F2]" />
        </div>
        <div className="mt-4 font-display text-base font-bold text-slate-900">
          Modular Micro-Frontends
        </div>
        <div className="mt-1 text-xs text-slate-500 font-medium">
          Zero-Downtime Hot Swaps & Type-Safe SDKs
        </div>
      </div>
    );
  }

  if (id === "ai") {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50/60 via-indigo-50/30 to-white">
        <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-purple-400/15 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/80 bg-white/70 shadow-lg shadow-purple-500/10 backdrop-blur-md">
          <Brain className="h-10 w-10 text-purple-600" />
        </div>
        <div className="mt-4 font-display text-base font-bold text-slate-900">
          Neural Vector Synthesis
        </div>
        <div className="mt-1 text-xs text-slate-500 font-medium">
          Private Weights & Sub-150ms Token Latency
        </div>
      </div>
    );
  }

  if (id === "cloud") {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center overflow-hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50/60 via-blue-50/30 to-white">
        <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-cyan-400/15 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/80 bg-white/70 shadow-lg shadow-cyan-500/10 backdrop-blur-md">
          <Cloud className="h-10 w-10 text-cyan-600" />
        </div>
        <div className="mt-4 font-display text-base font-bold text-slate-900">
          Multi-Region Kubernetes
        </div>
        <div className="mt-1 text-xs text-slate-500 font-medium">
          Automated Canary Failover & 99.99% Uptime
        </div>
      </div>
    );
  }

  if (id === "sap") {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/60 via-orange-50/30 to-white">
        <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-amber-400/15 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/80 bg-white/70 shadow-lg shadow-amber-500/10 backdrop-blur-md">
          <Layers className="h-10 w-10 text-amber-600" />
        </div>
        <div className="mt-4 font-display text-base font-bold text-slate-900">
          SAP RFC Anomaly Telemetry
        </div>
        <div className="mt-1 text-xs text-slate-500 font-medium">
          ACDOCA Ledger Ingest & 99.98% Anomaly SLA
        </div>
      </div>
    );
  }

  if (id === "data") {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center overflow-hidden rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50/60 via-emerald-50/30 to-white">
        <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-teal-400/15 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/80 bg-white/70 shadow-lg shadow-teal-500/10 backdrop-blur-md">
          <Database className="h-10 w-10 text-teal-600" />
        </div>
        <div className="mt-4 font-display text-base font-bold text-slate-900">
          Distributed Event Ingestion
        </div>
        <div className="mt-1 text-xs text-slate-500 font-medium">
          Kafka Streams & Real-Time Analytical OLAP
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 via-slate-50/30 to-white">
      <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-emerald-400/15 blur-2xl" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/80 bg-white/70 shadow-lg shadow-emerald-500/10 backdrop-blur-md">
        <Shield className="h-10 w-10 text-emerald-600" />
      </div>
      <div className="mt-4 font-display text-base font-bold text-slate-900">
        Air-Gapped Hardware Enclave
      </div>
      <div className="mt-1 text-xs text-slate-500 font-medium">
        Zero External Egress & SOC2 / HIPAA Hardened
      </div>
    </div>
  );
}

/* Dedicated Real-Time Visual Terminals for each capability */
function CapabilityVisual({ id }: { id: string }) {
  if (id === "software") {
    return (
      <div className="rounded-2xl bg-slate-950 p-5 font-mono text-xs text-slate-300 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-slate-300 font-medium">neurosyn/api/runtime.ts</span>
          </div>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            200 OK (38ms)
          </span>
        </div>
        <div className="space-y-1.5 text-[11px] leading-relaxed text-slate-300">
          <p><span className="text-purple-400">export async function</span> <span className="text-blue-400">dispatchTransaction</span>(req: <span className="text-amber-300">Payload</span>) &#123;</p>
          <p className="pl-4 text-slate-500">// Zero-latency transactional state engine</p>
          <p className="pl-4"><span className="text-cyan-400">const</span> verified = <span className="text-purple-400">await</span> engine.<span className="text-blue-400">validateContract</span>(req);</p>
          <p className="pl-4"><span className="text-purple-400">return</span> Response.<span className="text-blue-400">json</span>(&#123; <span className="text-emerald-300">status</span>: <span className="text-emerald-300">'committed'</span>, <span className="text-emerald-300">p99</span>: <span className="text-amber-400">24ms</span> &#125;);</p>
          <p>&#125;</p>
        </div>
      </div>
    );
  }

  if (id === "ai") {
    return (
      <div className="rounded-2xl bg-slate-950 p-5 border border-slate-800 shadow-xl font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3 text-[11px]">
          <div className="flex items-center gap-2 text-slate-300">
            <Brain className="h-3.5 w-3.5 text-purple-400" />
            <span>Neural Embedding & Inference Cluster</span>
          </div>
          <span className="text-cyan-400 font-semibold">142ms Token SLA</span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
          <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/40">
            <div className="font-bold text-sm text-white">1024-D</div>
            <div className="text-[9px] text-slate-400 mt-0.5">Embeddings</div>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40">
            <div className="font-bold text-sm text-white">32 Head</div>
            <div className="text-[9px] text-slate-400 mt-0.5">Attention</div>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40">
            <div className="font-bold text-sm text-white">vLLM</div>
            <div className="text-[9px] text-slate-400 mt-0.5">Engine</div>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40">
            <div className="font-bold text-sm text-emerald-400">99.9%</div>
            <div className="text-[9px] text-slate-400 mt-0.5">Precision</div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "cloud") {
    return (
      <div className="rounded-2xl bg-slate-950 p-5 border border-slate-800 shadow-xl font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3 text-[11px]">
          <div className="flex items-center gap-2 text-slate-300">
            <Cloud className="h-3.5 w-3.5 text-cyan-400" />
            <span>Multi-Region Mesh Deployment</span>
          </div>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All Pods Healthy
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-slate-400 text-[10px]">US-EAST (Primary)</div>
            <div className="text-emerald-400 font-bold mt-1 text-sm">48 Pods Synced</div>
            <div className="text-[10px] text-slate-500 mt-0.5">&lt;8ms Edge Latency</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-slate-400 text-[10px]">EU-WEST (Failover)</div>
            <div className="text-emerald-400 font-bold mt-1 text-sm">32 Pods Ready</div>
            <div className="text-[10px] text-slate-500 mt-0.5">&lt;14ms Failover SLA</div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "sap") {
    return (
      <div className="rounded-2xl bg-slate-950 p-5 border border-slate-800 shadow-xl font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3 text-[11px]">
          <div className="flex items-center gap-2 text-slate-300">
            <Layers className="h-3.5 w-3.5 text-amber-400" />
            <span>SAP S/4HANA Real-Time RFC Gateway</span>
          </div>
          <span className="text-emerald-400 font-semibold">Live Bridge</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-amber-400 font-semibold">SAP RFC Connector</span>
            <div className="text-slate-500 text-[9px] mt-0.5">ACDOCA / BKPF Tables</div>
          </div>
          <ArrowRight className="h-4 w-4 text-blue-400 shrink-0" />
          <div className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-emerald-400 font-semibold">AI Anomaly Gate</span>
            <div className="text-slate-500 text-[9px] mt-0.5">Autonomous Audit Stream</div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "data") {
    return (
      <div className="rounded-2xl bg-slate-950 p-5 border border-slate-800 shadow-xl font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3 text-[11px]">
          <div className="flex items-center gap-2 text-slate-300">
            <Database className="h-3.5 w-3.5 text-teal-400" />
            <span>Event Streaming & Analytical Pipelines</span>
          </div>
          <span className="text-cyan-400 font-semibold">24,500 ev/sec</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-teal-400 font-semibold text-xs">Kafka Mesh</div>
            <div className="text-slate-500 text-[9px] mt-0.5">Partitioned Ingest</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-indigo-400 font-semibold text-xs">Vector Lake</div>
            <div className="text-slate-500 text-[9px] mt-0.5">HNSW Search</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-emerald-400 font-semibold text-xs">ClickHouse</div>
            <div className="text-slate-500 text-[9px] mt-0.5">&lt;40ms OLAP</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-950 p-5 border border-slate-800 shadow-xl font-mono">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3 text-[11px]">
        <div className="flex items-center gap-2 text-slate-300">
          <Shield className="h-3.5 w-3.5 text-emerald-400" />
          <span>Air-Gapped Cryptographic Enclave</span>
        </div>
        <span className="text-emerald-400 font-semibold">Zero Egress Verified</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-[10px] text-center">
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-emerald-400 font-semibold text-xs">Offline LLM</div>
          <div className="text-slate-500 text-[9px] mt-0.5">Private Compute</div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-cyan-400 font-semibold text-xs">Hardware Enclave</div>
          <div className="text-slate-500 text-[9px] mt-0.5">AES-256 GCM</div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-amber-400 font-semibold text-xs">Audit Stamp</div>
          <div className="text-slate-500 text-[9px] mt-0.5">SOC2 / ISO 27001</div>
        </div>
      </div>
    </div>
  );
}

export interface SolutionCapability {
  id: string;
  tabLabel: string;
  icon: typeof Code;
  badge: string;
  accentColor: string;
  pinstripeClass: string;
  cardGradient: string;
  title: string;
  tagline: string;
  description: string;
  specs: string[];
  metrics: { label: string; value: string }[];
  pills: string[];
  ctaLink: string;
}

const solutions: SolutionCapability[] = [
  {
    id: "software",
    tabLabel: "Web & Mobile",
    icon: Code,
    badge: "Core Engineering",
    accentColor: "#1D81F2",
    pinstripeClass: "netsol-pinstripes",
    cardGradient: "from-blue-50/80 via-white to-indigo-50/40",
    title: "Web & Native Mobile Platforms",
    tagline: "High-concurrency web portals, cross-platform mobile apps, and robust microservices.",
    description:
      "We design and build production-grade web applications and native mobile software from zero to global scale. Built with end-to-end type safety, modular architecture, and audited code quality.",
    specs: [
      "Custom SaaS platforms & customer portals",
      "iOS & Android cross-platform apps",
      "High-throughput REST & GraphQL APIs",
      "Offline-first sync & state hydration",
    ],
    metrics: [
      { label: "Production Latency", value: "< 50ms" },
      { label: "System Availability", value: "99.99%" },
      { label: "Code Test Coverage", value: "> 95%" },
    ],
    pills: ["Component-Driven", "API-First", "Sub-Millisecond Cache", "TypeScript Strict"],
    ctaLink: "/contact?service=software",
  },
  {
    id: "ai",
    tabLabel: "AI & ML Systems",
    icon: Brain,
    badge: "Intelligent Systems",
    accentColor: "#8B5CF6",
    pinstripeClass: "netsol-pinstripes",
    cardGradient: "from-purple-50/80 via-white to-indigo-50/40",
    title: "Custom AI & Machine Learning Systems",
    tagline: "Private AI assistants, document search, and custom neural pipelines.",
    description:
      "We deploy domain-specific AI models that run securely on your private servers or cloud infrastructure. From enterprise search over massive internal archives to automated classification pipelines.",
    specs: [
      "Custom RAG search over internal PDF & doc archives",
      "Private LLMs fine-tuned on company data",
      "Vision AI & OCR document classification",
      "Sub-second semantic vector matching",
    ],
    metrics: [
      { label: "Inference Latency", value: "< 140ms" },
      { label: "Citation Precision", value: "99.98%" },
      { label: "Data Egress", value: "Zero (Private)" },
    ],
    pills: ["Fine-Tuned LLMs", "Private Vector Lake", "Multi-Agent Teams", "Zero Data Leaks"],
    ctaLink: "/contact?service=ai",
  },
  {
    id: "cloud",
    tabLabel: "Cloud & DevOps",
    icon: Cloud,
    badge: "Cloud Systems",
    accentColor: "#0284C7",
    pinstripeClass: "netsol-pinstripes-teal",
    cardGradient: "from-cyan-50/80 via-white to-blue-50/40",
    title: "Cloud Infrastructure & Global Telemetry",
    tagline: "Automated Kubernetes setups, multi-cloud CI/CD, and real-time monitoring.",
    description:
      "We design resilient, cost-effective cloud architectures on AWS, GCP, and Azure. With automated rollback pipelines, multi-region cluster failover, and live performance dashboards.",
    specs: [
      "Terraform Infrastructure as Code (IaC)",
      "Multi-region Kubernetes & Docker orchestration",
      "Zero-downtime CI/CD automated deployment",
      "30-50% cloud cost reduction audits",
    ],
    metrics: [
      { label: "Pipeline Speed", value: "< 10 Min" },
      { label: "Deployment Failures", value: "0 in 14 Mo" },
      { label: "Cost Savings", value: "Up to 45%" },
    ],
    pills: ["Multi-Region Mesh", "GitOps CI/CD", "Automated Rollbacks", "Cost Optimized"],
    ctaLink: "/contact?service=cloud",
  },
  {
    id: "sap",
    tabLabel: "Enterprise & SAP",
    icon: Layers,
    badge: "Enterprise Integration",
    accentColor: "#D97706",
    pinstripeClass: "netsol-pinstripes",
    cardGradient: "from-amber-50/80 via-white to-orange-50/40",
    title: "Enterprise ERP & Modern SAP Bridges",
    tagline: "Bridge legacy SAP systems to modern web applications, APIs, and AI auditors.",
    description:
      "Modernize enterprise workflows without risky system overhauls. We build custom API layers over SAP ECC & S/4HANA, automated financial reconciliation bots, and modern dashboards.",
    specs: [
      "SAP RFC, BAPI & OData API integration layers",
      "Real-time ledger audit & fraud detection",
      "Legacy modernization without business downtime",
      "Automated procurement & invoicing pipelines",
    ],
    metrics: [
      { label: "Audit Acceleration", value: "85% Faster" },
      { label: "Anomaly Accuracy", value: "99.98%" },
      { label: "Integration SLA", value: "Zero Downtime" },
    ],
    pills: ["SAP ECC / S/4HANA", "Bi-directional RFC", "Auto Reconciliation", "Audit-Ready"],
    ctaLink: "/contact?service=sap",
  },
  {
    id: "data",
    tabLabel: "Data Pipelines",
    icon: Database,
    badge: "Data Engineering",
    accentColor: "#0D9488",
    pinstripeClass: "netsol-pinstripes-teal",
    cardGradient: "from-teal-50/80 via-white to-emerald-50/40",
    title: "High-Throughput Streaming & Data Lakehouses",
    tagline: "Reliable data pipelines, real-time analytics, and clean dashboards your team will use.",
    description:
      "Transform messy operational data into clean, structured intelligence. We design high-throughput event ingestion pipelines and ultra-fast analytical storage for real-time reporting.",
    specs: [
      "Real-time event streaming with Apache Kafka",
      "Data warehouse setup with Snowflake & BigQuery",
      "Automated ETL pipelines with dbt & Airflow",
      "Executive reporting dashboards in Metabase & Superset",
    ],
    metrics: [
      { label: "Stream Throughput", value: "50k+ Ev/Sec" },
      { label: "Query Latency", value: "< 45ms OLAP" },
      { label: "Data Integrity", value: "100% Synced" },
    ],
    pills: ["Apache Kafka", "ClickHouse OLAP", "Automated ETL", "Sub-Second Queries"],
    ctaLink: "/contact?service=data",
  },
  {
    id: "security",
    tabLabel: "Air-Gapped Security",
    icon: Shield,
    badge: "Mission Critical",
    accentColor: "#059669",
    pinstripeClass: "netsol-pinstripes-teal",
    cardGradient: "from-emerald-50/80 via-white to-slate-50/40",
    title: "Air-Gapped Enclaves & Compliance Systems",
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
      { label: "External Egress", value: "0 (Air-Gapped)" },
      { label: "Compliance Standard", value: "SOC2 / HIPAA" },
      { label: "Pen-Test Score", value: "Zero High CVEs" },
    ],
    pills: ["Air-Gapped Offline", "Hardware Enclave", "Zero Egress", "SOC2 / HIPAA Compliant"],
    ctaLink: "/contact?service=security",
  },
];

export function InteractiveSolutionConsole() {
  const [selectedId, setSelectedId] = useState<string>("ai");

  const current = solutions.find((s) => s.id === selectedId) || solutions[0];
  const IconComponent = current.icon;

  return (
    <div className="space-y-12">
      {/* 1. NETSOL-Style Centered Platform Badge & Segmented Switcher */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        {/* App Icon Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-2xl border border-blue-200/80 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-md">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1D81F2] text-white shadow-sm shadow-blue-500/30">
            <Cpu className="h-4.5 w-4.5" />
          </div>
          <span className="font-display text-sm font-bold text-slate-900 tracking-tight">
            NeuroSyn Engineering Ecosystem
          </span>
        </div>

        <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          An AI-driven, composable engineering platform for enterprises, OEMs, and technology partners uniting custom software, autonomous intelligence, and cloud telemetry.
        </p>

        {/* Horizontal Segmented Button Bar (NETSOL exact touch) */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
          {solutions.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`group relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#1D81F2] text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50/80"
                }`}
              >
                <span>{item.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. NETSOL-Style Multi-Card Bento Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="grid gap-6 lg:grid-cols-12 items-stretch"
        >
          {/* Left Primary Hero Card (Pastel gradient with linear vertical pinstripes) */}
          <div className={`relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-slate-200/80 bg-gradient-to-br ${current.cardGradient} p-8 lg:col-span-5 shadow-lg shadow-slate-900/5`}>
            
            {/* Architectural Pinstripes Accent at top */}
            <div className={`pointer-events-none absolute inset-0 opacity-40 ${current.pinstripeClass}`} />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md"
                  style={{ backgroundColor: current.accentColor }}
                >
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {current.badge}
                  </span>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-600 font-medium">
                {current.description}
              </p>

              {/* Engineering Scope Specs */}
              <div className="space-y-2.5 pt-2">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  Included Production Deliverables
                </div>
                <div className="space-y-2">
                  {current.specs.map((spec) => (
                    <div
                      key={spec}
                      className="flex items-start gap-2.5 rounded-xl border border-white/80 bg-white/70 p-3 text-xs text-slate-800 shadow-xs backdrop-blur-xs"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#1D81F2] shrink-0 mt-0.5" />
                      <span className="font-medium">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA Button */}
            <div className="relative z-10 mt-8 pt-6 border-t border-slate-200/60">
              <Link
                to={current.ctaLink}
                className="group inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-slate-950/10 transition-all hover:bg-slate-800 active:scale-[0.98]"
              >
                <span>Scope {current.tabLabel} Architecture</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right 2x2 Bento Cards Grid */}
          <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
            
            {/* Card 1: Interactive Live Architecture Terminal */}
            <div className="sm:col-span-2">
              <CapabilityVisual id={current.id} />
            </div>

            {/* Card 2: 3D Frosted Glass Core Visual */}
            <div className="h-full min-h-[200px]">
              <Frosted3DVisual id={current.id} />
            </div>

            {/* Card 3: Stacked 3D Interactive Pills (NETSOL Transcend Style) */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  Architectural Pillars
                </span>
                <div className="mt-4 space-y-2">
                  {current.pills.map((pill, idx) => (
                    <div
                      key={pill}
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-semibold shadow-xs transition-all ${
                        idx === 0
                          ? "bg-slate-900 text-white"
                          : idx === 1
                          ? "bg-blue-50 text-[#1D81F2] border border-blue-100"
                          : "bg-slate-50 text-slate-700 border border-slate-200/60"
                      }`}
                    >
                      <span>{pill}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-75" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Zero vendor lock-in</span>
              </div>
            </div>

            {/* Card 4: Production SLA & Performance Metrics Grid */}
            <div className="sm:col-span-2 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-4">
                Guaranteed Engineering Benchmarks
              </div>
              <div className="grid grid-cols-3 gap-4">
                {current.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl border border-slate-200/60 bg-white p-4 shadow-xs">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      {m.label}
                    </div>
                    <div className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-950">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
