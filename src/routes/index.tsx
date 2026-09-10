import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  Cloud,
  Code2,
  Database,
  Factory,
  Layers3,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Workflow,
  Radio,
} from "lucide-react";
import { CTAButton, Reveal } from "../components/site/ui";
import { ChromeMolecularCore } from "../components/site/ChromeMolecularCore";
import { EnterpriseDashboardPreview } from "../components/site/EnterpriseDashboardPreview";
import { TiltCard } from "../components/site/TiltCard";
import { GeometricCore, type ProductEngineId } from "../components/site/GeometricCore";
import { InteractiveSolutionConsole } from "../components/site/InteractiveSolutionConsole";
import { ProjectConfigurator } from "../components/site/ProjectConfigurator";
import { DeliveryTimelineStepper } from "../components/site/DeliveryTimelineStepper";
import { EngagementModels } from "../components/site/EngagementModels";
import { IndustriesSection } from "../components/site/IndustriesSection";
import { Lock, ExternalLink, Activity } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuroSyn — Enterprise Software & AI Systems" },
      {
        name: "description",
        content:
          "Software & AI systems built to move enterprises forward. Custom web applications, autonomous AI pipelines, cloud infrastructure, and enterprise SAP modernization.",
      },
      { property: "og:site_name", content: "NeuroSyn" },
      { property: "og:title", content: "NeuroSyn — Enterprise Software & AI Systems" },
      {
        property: "og:description",
        content:
          "Software & AI systems built to move enterprises forward. Custom web applications, autonomous AI pipelines, cloud infrastructure, and enterprise SAP modernization.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.neurosyn.it.com" },
      { property: "og:image", content: "https://www.neurosyn.it.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "NeuroSyn — Enterprise Software & AI Systems" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NeuroSyn — Enterprise Software & AI Systems" },
      {
        name: "twitter:description",
        content:
          "Software & AI systems built to move enterprises forward. Custom web applications, autonomous AI pipelines, cloud infrastructure, and enterprise SAP modernization.",
      },
      { name: "twitter:image", content: "https://www.neurosyn.it.com/og-image.png" },
    ],
  }),
  component: Home,
});

/* 6 Service Categories */
const services = [
  {
    icon: Sparkles,
    title: "AI & Machine Learning",
    description:
      "Build chatbots, recommendation engines, document search, or automation tools that actually work in your day-to-day operations.",
    deliverables: ["Custom AI Models", "Chatbots & Assistants", "Document Search & Q&A"],
  },
  {
    icon: Code2,
    title: "Custom Software",
    description:
      "Web apps, mobile apps, internal tools, and APIs. We write clean code that's easy to maintain and built to last.",
    deliverables: ["Web & Mobile Apps", "APIs & Integrations", "Internal Tools & Dashboards"],
  },
  {
    icon: Factory,
    title: "Enterprise & SAP",
    description:
      "Connect your SAP system to modern tools, automate financial checks, and get your old systems working with new ones.",
    deliverables: ["SAP Integrations", "Financial Auditing Tools", "Legacy System Upgrades"],
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description:
      "Set up your servers, automate your deployments, and keep everything running smoothly without surprises.",
    deliverables: ["Server Setup & Management", "Automated Deployments", "Cost Optimization"],
  },
  {
    icon: Database,
    title: "Data & Analytics",
    description:
      "Organize your data, build dashboards your team will actually use, and set up reliable data pipelines.",
    deliverables: ["Data Pipelines", "Reporting Dashboards", "Database Design"],
  },
  {
    icon: ShieldCheck,
    title: "Security & Air-Gapped Systems",
    description:
      "Lock down your systems, run AI tools on your own servers without internet, and pass security audits with confidence.",
    deliverables: ["Offline AI Deployment", "Security Audits & Hardening", "Access Control Setup"],
  },
];

/* Case Studies */
const caseStudies = [
  {
    partner: "AAKS",
    category: "Finance & Enterprise AI",
    badge: "Enterprise AI & SAP",
    badgeColor: "bg-cyan-500/10 text-cyan-800 border-cyan-500/30",
    glowColor: "group-hover:border-cyan-500/40",
    image: "/assets/projects/aaks-ai-dashboard.jpg",
    url: "https://ops.aaks-internal.net/ai-telemetry",
    problem:
      "Their finance team was manually checking thousands of records across SAP tables. Audits were slow and errors slipped through.",
    solution:
      "We built an autonomous AI anomaly detection platform that ingests real-time SAP ledger updates and flags irregularities with 99.98% precision.",
    result: "Audits that took weeks now take days. Catches 99.98% of issues automatically with zero human oversight lag.",
    tags: ["Autonomous AI", "Finance", "SAP ECC & S/4HANA", "Air-Gapped"],
    metrics: [
      { label: "Audit Cycle", value: "85% Faster" },
      { label: "Detection SLA", value: "99.98%" },
      { label: "Data Security", value: "Air-Gapped" },
    ],
  },
  {
    partner: "Polarions",
    category: "Cloud Infrastructure & DevOps",
    badge: "Cloud Telemetry & K8s",
    badgeColor: "bg-emerald-500/10 text-emerald-800 border-emerald-500/30",
    glowColor: "group-hover:border-emerald-500/40",
    image: "/assets/projects/cloud-infra-monitor.jpg",
    url: "https://telemetry.polarions.cloud/clusters",
    problem:
      "Their distributed dev team was spending too much time on manual rollbacks and fragile deploys across multi-region Kubernetes clusters.",
    solution:
      "We designed an automated multi-region CI/CD and telemetry console with pre-flight smoke testing and automated rollback failover.",
    result: "Engineering team ships updates 4x faster with zero broken production releases over the past 14 months.",
    tags: ["Kubernetes", "DevOps Pipelines", "Global Telemetry", "AWS / GCP"],
    metrics: [
      { label: "Ship Velocity", value: "4x Faster" },
      { label: "Failed Deploys", value: "0 in 14 Mo" },
      { label: "Edge Latency", value: "<12ms p99" },
    ],
  },
  {
    partner: "IJAIKE",
    category: "Research & Document Intelligence",
    badge: "Knowledge Graph & AI",
    badgeColor: "bg-indigo-500/10 text-indigo-800 border-indigo-500/30",
    glowColor: "group-hover:border-indigo-500/40",
    image: "/assets/projects/knowledge-engine-ui.jpg",
    url: "https://search.ijaike-research.io/documents",
    problem:
      "Critical compliance research and historical contracts were scattered across fragmented network drives, slowing legal review teams.",
    solution:
      "We engineered a private semantic search engine and knowledge graph network that extracts clauses and verifies sources in sub-second queries.",
    result: "Real-time semantic queries across 10M+ documents in under a second, with pinpoint citation links directly to the source page.",
    tags: ["Vector Embeddings", "Semantic Search", "Private LLM", "Audit Trail"],
    metrics: [
      { label: "Indexed Corpus", value: "10M+ Docs" },
      { label: "Query Speed", value: "<850ms" },
      { label: "Citation Accuracy", value: "100% Verifiable" },
    ],
  },
];


/* 4 Products */
const proprietaryProducts = [
  {
    id: "sap" as const,
    name: "NeuroSyn-SAP",
    tag: "Autonomous SAP Ledger Intelligence",
    desc: "Watches your SAP transactions in real time, flags anomalies with 99.98% accuracy, and automates compliance checks with zero disruption.",
    to: "/products/sap",
    specs: ["SAP ECC & S/4HANA", "Zero Downtime", "Continuous Audit"],
    uiPreview: {
      status: "STREAM_ACTIVE",
      statusColor: "text-emerald-400",
      line1: "PARSER: RFC_TABLE_ACDOCA [SYNCED]",
      line2: "ANOMALIES_DETECTED: 0 (14,280 Txns Checked)",
      metric: "99.98% Accuracy",
    },
  },
  {
    id: "dev" as const,
    name: "NeuroSyn-Dev",
    tag: "Autonomous Code & CI/CD Engine",
    desc: "Reviews your code, generates verified test suites, detects subtle security CVEs, and maintains high engineering velocity.",
    to: "/products/dev",
    specs: ["Static & Dynamic Analysis", "Auto Test Gen", "Zero False Positives"],
    uiPreview: {
      status: "ANALYSIS_PASS",
      statusColor: "text-cyan-400",
      line1: "AST_LINT: 48 FILES SCANNED",
      line2: "TEST_SUITE_GEN: 12 TESTS PASSED (100%)",
      metric: "Zero CVEs",
    },
  },
  {
    id: "aero" as const,
    name: "NeuroSyn-Aero",
    tag: "Predictive Equipment Diagnostics",
    desc: "Reads real-time sensor streams from critical machinery, detects subtle harmonics drift, and alerts before mechanical failure occurs.",
    to: "/products/aero",
    specs: ["Offline Edge AI", "Physics-Informed", "Sub-second Alerts"],
    uiPreview: {
      status: "SENSORS_NORMAL",
      statusColor: "text-amber-400",
      line1: "VIBRATION_HARMONIC: 1.24 kHz [STABLE]",
      line2: "FAILURE_PROBABILITY: <0.02% (Next 720h)",
      metric: "3x Earlier Alerts",
    },
  },
  {
    id: "copilot" as const,
    name: "NeuroSyn-Copilot",
    tag: "Air-Gapped Document Intelligence",
    desc: "Ask complex questions across enterprise archives and retrieve verifiable answers with exact line and source page citations on your private hardware.",
    to: "/products/copilot",
    specs: ["Air-Gapped Offline", "Exact Page Citations", "Private Enclave"],
    uiPreview: {
      status: "ENCLAVE_READY",
      statusColor: "text-purple-400",
      line1: "INDEXED_CORPUS: 10,480,000 PAGES",
      line2: "VECTOR_SEARCH: HNSW COSINE (180ms)",
      metric: "100% On-Prem",
    },
  },
];

function Home() {
  const [hoveredEngine, setHoveredEngine] = useState<ProductEngineId>(null);

  return (
    <div className="bg-white text-slate-900">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (NETSOL Enterprise Aesthetic: Architectural Grid + 3D Chrome) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-[#FFFFFF] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        {/* Soft atmospheric ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl rounded-full" />
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-400/10 blur-3xl rounded-full" />
          <div className="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full" />
        </div>

        {/* NETSOL Architectural Linear Pinstripe Grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(15,23,42,0.4) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />

        <div className="mx-auto max-w-[1360px]">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left: NETSOL-Style Display Headline & Value Proposition */}
            <div className="lg:col-span-6 lg:pr-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Vertical accent pipe eyebrow (NETSOL exact style) */}
                <div className="mb-6 flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
                  <span>Enterprise Software & AI Systems</span>
                </div>

                <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[1.06]">
                  AI-enabled ecosystems that make commerce{" "}
                  <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
                    seamless.
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                  We build mission-critical custom web applications, autonomous AI pipelines, and resilient cloud systems for enterprises that require velocity and precision.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                {/* NETSOL-Style Royal Electric Blue CTA Pill Button with Arrow Icon */}
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#1D81F2] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#156CD4] hover:shadow-xl hover:shadow-blue-500/35 active:scale-[0.98]"
                >
                  <span>Get in touch</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-800 shadow-xs transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]"
                >
                  Explore Platform
                </Link>
              </motion.div>

              {/* Engineering capabilities banner */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-12 flex flex-wrap items-center gap-y-2 gap-x-6 border-t border-slate-200 pt-6 text-[11px] font-medium uppercase tracking-wider text-slate-500"
              >
                {["AI & Machine Learning", "Web & Mobile Apps", "Cloud Infrastructure", "Enterprise SAP"].map((cap, i) => (
                  <motion.span
                    key={cap}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-2"
                  >
                    {i > 0 && <span className="text-slate-300">·</span>}
                    {cap}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Right: NETSOL-Style 3D Metallic Chrome Molecular Centerpiece */}
            <div className="lg:col-span-6">
              <ChromeMolecularCore />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FLOATING CLIENT TRUST BAR (NETSOL Transcend Style Frosted Pill)         */}
      {/* ========================================================================= */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 py-12 md:px-10 overflow-hidden">
        {/* Subtle background linear pinstripes running behind the frosted pill */}
        <div className="pointer-events-none absolute inset-0 opacity-30 netsol-pinstripes" />

        <div className="relative mx-auto max-w-[1240px]">
          <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-900/[0.04] backdrop-blur-xl md:p-10">
            <div className="text-center">
              <p className="text-sm font-semibold tracking-tight text-slate-900 md:text-base">
                The world's leading brands are powered by NeuroSyn
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap items-center justify-around gap-8 md:gap-12">
              {[
                { name: "AAKS", sub: "CAPITAL & ASSETS" },
                { name: "POLARIONS", sub: "CLOUD NETWORKS" },
                { name: "IJAIKE", sub: "INTELLIGENCE LABS" },
                { name: "KSOL", sub: "OEM SYSTEMS" },
                { name: "NOVACREST", sub: "ENTERPRISE ERP" },
                { name: "AERO-DYNAMICS", sub: "DEFENSE TECH" },
              ].map((brand, i) => (
                <motion.div
                  key={brand.name}
                  className="flex flex-col items-center cursor-default group"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  whileHover={{ scale: 1.06 }}
                >
                  <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-800 transition-colors group-hover:text-[#1D81F2]">
                    {brand.name}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-slate-400 font-semibold mt-0.5">
                    {brand.sub}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PLATFORM & CAPABILITIES (NETSOL Transcend Platform Segmented Bento)     */}
      {/* ========================================================================= */}
      <section id="services" className="relative border-b border-slate-200 bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[1360px]">
          <InteractiveSolutionConsole />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SPRINT DELIVERY ROADMAP (Interactive 4-Phase Stepper)                  */}
      {/* ========================================================================= */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 py-20 md:px-10 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[1360px]">
          <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-10 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
                <span>How We Deliver</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl md:text-5xl">
                Structured sprints.{" "}
                <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
                  Zero ambiguity.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-base text-slate-600">
              Click through our 4-phase delivery process to inspect tangible deliverables and verification checkpoints at each stage.
            </p>
          </div>

          <div className="mt-12">
            <DeliveryTimelineStepper />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SELECTED WORK / CASE STUDIES (Visual Device Mockups & Real UI Pics)     */}
      {/* ========================================================================= */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 py-20 md:px-10 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20 netsol-pinstripes" />

        <div className="relative mx-auto max-w-[1360px]">
          <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-10 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
                <span>Proven Production Engineering</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl md:text-5xl">
                What we've engineered in{" "}
                <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
                  production.
                </span>
              </h2>
            </div>
            <Link
              to="/case-studies"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#1D81F2] hover:text-[#156CD4] transition-colors"
            >
              <span>View all case studies</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-14 space-y-12">
            {caseStudies.map((cs, idx) => (
              <Reveal key={cs.partner} delay={idx * 0.1}>
                <div className="group relative rounded-[28px] border border-slate-200/85 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300 md:p-8 lg:p-10">
                  <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                    
                    {/* Left Column: Context, Challenge, Solution & Impact Metrics */}
                    <div className="lg:col-span-5 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#1D81F2] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                            0{idx + 1}
                          </span>
                          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full border border-blue-100 bg-blue-50/50 text-[#1D81F2]">
                            {cs.badge}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-500 font-medium">
                          {cs.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                          {cs.partner}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                          {cs.problem}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-5 space-y-2">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-[#1D81F2] font-bold">
                          What We Engineered
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                          {cs.solution}
                        </p>
                      </div>

                      {/* 3 High-Impact Metrics Grid */}
                      <div className="grid grid-cols-3 gap-3 pt-2">
                        {cs.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 text-center">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                              {m.label}
                            </div>
                            <div className="mt-1 font-display font-extrabold text-sm text-[#1D81F2]">
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {cs.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-mono font-medium text-slate-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Realistic Browser Mockup Window with the Real Screenshot */}
                    <div className="lg:col-span-7">
                      <div className="mockup-frame rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl transition-all duration-300 group-hover:shadow-blue-950/20 group-hover:border-slate-700">
                        {/* Browser Top Navigation Bar */}
                        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-400 font-mono text-[11px]">
                            <Lock className="w-3 h-3 text-[#1D81F2]" />
                            <span>{cs.url}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="hidden sm:inline">Production Active</span>
                          </div>
                        </div>

                        {/* Real UI Screenshot Image */}
                        <div className="relative overflow-hidden bg-slate-950 aspect-[16/9]">
                          <img
                            src={cs.image}
                            alt={`${cs.partner} System UI Preview`}
                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                          {/* Subtle glare overlay */}
                          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-50 group-hover:opacity-70 transition-opacity" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ENGAGEMENT MODELS (BD Pitch Weapon: Dedicated Squads, Turnkey, Staff)  */}
      {/* ========================================================================= */}
      <EngagementModels />

      {/* ========================================================================= */}
      {/* 6. INDUSTRIES & HIGH-STAKES VERTICALS (Aerospace, Mfg, Health, Energy)    */}
      {/* ========================================================================= */}
      <IndustriesSection />

      {/* ========================================================================= */}
      {/* 7. PROPRIETARY TECHNOLOGY & PRODUCTS (15% Dark Technology Accent Anchor)  */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-y border-slate-800 bg-[#0A0F1D] text-white px-6 py-24 md:px-10 md:py-32">
        {/* Deep blue ambient glow */}
        <div className="pointer-events-none absolute inset-0 opacity-20 netsol-pinstripes" />

        <div className="relative mx-auto max-w-[1360px]">
          <div className="grid gap-8 border-b border-slate-800 pb-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-700 bg-slate-900/90 px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-400">
                  <span className="h-3.5 w-1 rounded-full bg-[#1D81F2]" />
                  <span>Proprietary Deep Tech</span>
                </div>
              </Reveal>
              <Reveal delay={1}>
                <h2 className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Technology we've engineered{" "}
                  <span className="text-[#1D81F2] underline decoration-blue-400/40 underline-offset-8">
                    in-house.
                  </span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={2}>
                <p className="text-base leading-relaxed text-slate-400">
                  Beyond bespoke client engineering, we build internal infrastructure and specialized autonomous tools deployed across enterprise environments.
                </p>
              </Reveal>
            </div>
          </div>

          {/* 3D Geometric Core Interactive Centerpiece */}
          <Reveal delay={1}>
            <div className="my-10">
              <GeometricCore activeEngine={hoveredEngine} />
            </div>
          </Reveal>

          {/* 4 Product Cards with Live Telemetry Previews */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {proprietaryProducts.map((p) => (
              <Reveal key={p.name}>
                <Link
                  to={p.to}
                  onMouseEnter={() => setHoveredEngine(p.id)}
                  onMouseLeave={() => setHoveredEngine(null)}
                  className={`group relative flex h-full flex-col justify-between rounded-[28px] border p-8 transition-all duration-300 ${
                    hoveredEngine === p.id
                      ? "border-[#1D81F2] bg-[#0F172A] shadow-2xl shadow-blue-500/20 -translate-y-1"
                      : "border-slate-800/90 bg-[#0F172A]/70 hover:border-slate-700 hover:bg-[#0F172A]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
                        hoveredEngine === p.id ? "text-[#1D81F2]" : "text-slate-400"
                      }`}>
                        {p.tag}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white group-hover:text-[#1D81F2] transition-colors">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {p.desc}
                    </p>

                    {/* Live Product Telemetry Preview */}
                    <div className="my-5 rounded-2xl bg-slate-950 border border-slate-800/90 p-4 font-mono text-xs space-y-1.5 shadow-inner">
                      <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-slate-800/80">
                        <span className={p.uiPreview.statusColor}>● {p.uiPreview.status}</span>
                        <span className="text-slate-400 font-semibold">{p.uiPreview.metric}</span>
                      </div>
                      <div className="text-[11px] text-blue-300 truncate">{p.uiPreview.line1}</div>
                      <div className="text-[11px] text-slate-400 truncate">{p.uiPreview.line2}</div>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-slate-800/80 pt-4">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
                      {p.specs.map((spec) => (
                        <span key={spec} className="rounded-lg border border-slate-800 bg-slate-900/90 px-2.5 py-1 text-slate-300">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PROJECT CONFIGURATOR (Interactive Scope & Architecture Estimator)      */}
      {/* ========================================================================= */}
      <section className="relative border-t border-slate-200 bg-[#FFFFFF] px-6 py-20 md:px-10 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[1360px]">
          <ProjectConfigurator />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FINAL CALL TO ACTION                                                    */}
      {/* ========================================================================= */}
      <section className="relative bg-[#0A0F1D] px-6 py-20 text-white md:px-10 md:py-28 overflow-hidden border-t border-slate-800">
        <div className="pointer-events-none absolute inset-0 opacity-15 netsol-pinstripes" />
        <div className="mx-auto max-w-[900px] text-center relative">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-blue-400">
              <span className="h-3.5 w-1 rounded-full bg-[#1D81F2]" />
              <span>Direct Technical Engagement</span>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl md:text-6xl">
              Have an enterprise software{" "}
              <span className="text-[#1D81F2] underline decoration-blue-400/40 underline-offset-8">
                challenge?
              </span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Tell us what you need. Our principal software architects will review your systems and deliver an actionable technical blueprint within 24 hours under NDA.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#1D81F2] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#156CD4] hover:shadow-xl hover:shadow-blue-500/35 active:scale-[0.98]"
              >
                <span>Start an Engagement</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-slate-700 bg-slate-800/80 px-8 py-4 text-sm font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:border-slate-600 active:scale-[0.98]"
              >
                Schedule Architecture Session
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}