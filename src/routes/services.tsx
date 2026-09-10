import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Code2,
  Factory,
  Cloud,
  Database,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Cpu,
  Server,
  Layers,
  BarChart3,
  GitBranch,
} from "lucide-react";
import { Section, PageHeader, Reveal } from "../components/site/ui";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Engineering Services — NeuroSyn" },
      {
        name: "description",
        content:
          "End-to-end enterprise software, custom AI systems, cloud infrastructure, ERP modernization, and air-gapped security engineering.",
      },
      { property: "og:title", content: "NeuroSyn Engineering Services" },
      {
        property: "og:description",
        content: "Senior software and AI engineering services organized around measurable enterprise outcomes.",
      },
    ],
  }),
  component: ServicesPage,
});

const serviceCategories = [
  {
    id: "ai-ml",
    icon: Sparkles,
    badge: "Category 01",
    title: "AI & Machine Learning Engineering",
    tagline: "Production-grade AI systems engineered for deterministic reliability and enterprise ROI.",
    capabilities: [
      {
        name: "Custom Generative AI & Fine-Tuned Models",
        desc: "Tailored foundation models, domain-specific LoRA/QLoRA adapters, and distilled models for high accuracy on proprietary enterprise data.",
      },
      {
        name: "Autonomous Multi-Agent Orchestration",
        desc: "Supervisory agent networks, self-correcting execution graphs, and deterministic multi-agent workflows.",
      },
      {
        name: "Enterprise RAG & Semantic Memory",
        desc: "Hybrid lexical + vector search architectures with high-density chunking and cryptographically verified source citations.",
      },
      {
        name: "Computer Vision & Document Intelligence",
        desc: "Automated OCR, invoice/contract data extraction, visual quality inspection, and multimodal document processing.",
      },
      {
        name: "Predictive Modeling & Statistical Forecasting",
        desc: "Time-series forecasting, Bayesian diagnostics, anomaly detection, and operational risk modeling.",
      },
      {
        name: "Edge AI & Model Optimization",
        desc: "TensorRT and ONNX runtime optimization delivering sub-10ms inference latency on constrained edge hardware.",
      },
    ],
  },
  {
    id: "software",
    icon: Code2,
    badge: "Category 02",
    title: "Custom Software & Product Engineering",
    tagline: "Scalable web applications, SaaS platforms, and distributed systems built for high concurrency.",
    capabilities: [
      {
        name: "Full-Cycle Web & SaaS Platforms",
        desc: "End-to-end web applications engineered with modern SSR architectures, resilient data flows, and enterprise UX.",
      },
      {
        name: "High-Throughput Distributed Backends",
        desc: "Event-driven microservices, asynchronous queues, and high-concurrency architectures built in Go, Rust, and Python.",
      },
      {
        name: "Internal Portals & Executive Cockpits",
        desc: "Custom operational software, mission-critical admin suites, and real-time telemetry control rooms.",
      },
      {
        name: "API Design & Gateway Architecture",
        desc: "High-performance REST, gRPC, and GraphQL APIs with token-bucket rate limiting and zero-latency caching.",
      },
      {
        name: "Legacy Modernization & Cloud Migration",
        desc: "Systematic decomposition of legacy monoliths into cloud-native services with zero operational downtime.",
      },
      {
        name: "Rapid MVP & Design-Partner Prototyping",
        desc: "Accelerated 4-8 week engineering sprints delivering production-grade MVPs for market validation.",
      },
    ],
  },
  {
    id: "enterprise-erp",
    icon: Factory,
    badge: "Category 03",
    title: "Enterprise Solutions & ERP Integration",
    tagline: "Seamless bridges into SAP S/4HANA, ECC, and core operational systems without business disruption.",
    capabilities: [
      {
        name: "SAP S/4HANA & ECC Core Integration",
        desc: "Direct RFC, BAPI, and OData pipelines enabling secure bi-directional telemetry and transaction processing.",
      },
      {
        name: "Continuous Financial Audit & Anomaly Detection",
        desc: "Automated GL posting verification, vendor invoice discrepancy checks, and real-time ledger reconciliation.",
      },
      {
        name: "Supply Chain & Warehouse Intelligence",
        desc: "Stock variance matching across distribution centers, route optimization, and predictive inventory planning.",
      },
      {
        name: "Enterprise CRM & Data Hub Synchronization",
        desc: "High-integrity sync across Salesforce, Microsoft Dynamics 365, internal ERPs, and custom databases.",
      },
      {
        name: "Regulatory & Compliance Automation",
        desc: "Immutable audit logs, continuous internal control validation, and automated regulatory reporting.",
      },
    ],
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    badge: "Category 04",
    title: "Cloud, DevOps & Infrastructure Engineering",
    tagline: "Automated, cost-optimized cloud platforms with zero-downtime continuous deployment pipelines.",
    capabilities: [
      {
        name: "Multi-Cloud Architecture & Migration",
        desc: "Resilient deployments across AWS, Google Cloud, Azure, and bare-metal environments tailored for high availability.",
      },
      {
        name: "Kubernetes (K8s) & Container Orchestration",
        desc: "Production cluster provisioning, Istio service mesh, pod autoscaling, and container security hardening.",
      },
      {
        name: "Infrastructure as Code (IaC)",
        desc: "Reproducible, auditable infrastructure using Terraform, Pulumi, and Ansible configurations.",
      },
      {
        name: "Automated CI/CD & GitOps Delivery",
        desc: "Continuous integration pipelines with automated AST verification, linting, and canary/blue-green deployments.",
      },
      {
        name: "Observability, Telemetry & SRE",
        desc: "OpenTelemetry instrumentation, Prometheus metrics, Grafana dashboards, and distributed request tracing.",
      },
      {
        name: "FinOps & Cloud Cost Optimization",
        desc: "Workload right-sizing, autoscaling policies, and architectural refactoring reducing cloud compute bills by 30-50%.",
      },
    ],
  },
  {
    id: "data-bi",
    icon: Database,
    badge: "Category 05",
    title: "Data Engineering & Analytics Platforms",
    tagline: "Modern lakehouses, real-time streaming architectures, and high-dimensional semantic search.",
    capabilities: [
      {
        name: "Modern Data Lakehouse & Warehousing",
        desc: "Architecting scalable data warehouses in Snowflake, Google BigQuery, ClickHouse, and Databricks.",
      },
      {
        name: "Real-Time Streaming Pipelines",
        desc: "High-throughput Apache Kafka and Flink streaming systems processing millions of events per second with zero backpressure.",
      },
      {
        name: "ETL / ELT Pipeline Automation",
        desc: "Automated ingestion, deduplication, schema evolution management, and strict data quality enforcement.",
      },
      {
        name: "Vector Database Infrastructure",
        desc: "Multi-tenant vector indexing (Qdrant, Pinecone, pgvector) optimized for sub-20ms high-dimensional semantic search.",
      },
      {
        name: "Executive BI & Operational Telemetry",
        desc: "Interactive dashboards, real-time alerting systems, and business intelligence suites for operational leadership.",
      },
    ],
  },
  {
    id: "security-airgap",
    icon: ShieldCheck,
    badge: "Category 06",
    title: "Cybersecurity, Compliance & Air-Gapped Systems",
    tagline: "Zero-trust security frameworks, continuous AST audits, and sovereign air-gapped AI environments.",
    capabilities: [
      {
        name: "Air-Gapped & Sovereign AI Infrastructure",
        desc: "Fully isolated, on-premise deployments of LLMs and neural models for defense, finance, and healthcare privacy compliance.",
      },
      {
        name: "Zero-Trust Enterprise Architecture",
        desc: "Role-based access control (RBAC), end-to-end encryption at rest and in transit, and single sign-on (SSO) integration.",
      },
      {
        name: "Codebase Verification & AST Security Audits",
        desc: "Automated Abstract Syntax Tree (AST) analysis, cryptographic dependency verification, and automated vulnerability scanning.",
      },
      {
        name: "SOC 2, HIPAA, GDPR & ISO 27001 Engineering",
        desc: "Technical implementation of data residency controls, encryption standards, and immutable audit logs.",
      },
      {
        name: "Isolated Execution Sandboxes",
        desc: "Containerized, micro-VM sandboxes validating untrusted code and inputs before deployment to production networks.",
      },
    ],
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header with NETSOL Architectural Pinstripes */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 py-20 md:px-10 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Full-Spectrum Engineering Services</span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[1.08]">
            Software & AI systems built to move enterprises{" "}
            <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
              forward.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            From custom AI systems and distributed software platforms to enterprise ERP modernization and air-gapped sovereign environments—we deliver senior engineering execution.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[#1D81F2] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#156CD4] hover:shadow-xl hover:shadow-blue-500/35 active:scale-[0.98]"
            >
              <span>Start an Engineering Engagement</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="px-6 py-16 md:px-10 md:py-24 bg-[#F8FAFC]">
        <div className="mx-auto max-w-[1360px] space-y-16">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Reveal key={category.id}>
                <div
                  id={category.id}
                  className="scroll-mt-24 rounded-[28px] border border-slate-200/80 bg-white p-8 shadow-md shadow-slate-900/[0.02] transition-all hover:border-slate-300 hover:shadow-xl sm:p-12 overflow-hidden relative"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-15 netsol-pinstripes" />
                  
                  {/* Category Top Banner */}
                  <div className="relative z-10 flex flex-col justify-between gap-4 border-b border-slate-100 pb-8 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50/80 text-[#1D81F2] shadow-sm">
                        <Icon className="h-7 w-7" strokeWidth={1.75} />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D81F2]">
                          {category.badge}
                        </span>
                        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                          {category.title}
                        </h2>
                      </div>
                    </div>
                    <p className="max-w-md text-sm text-slate-600 font-medium">
                      {category.tagline}
                    </p>
                  </div>

                  {/* Capabilities Grid */}
                  <div className="relative z-10 mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {category.capabilities.map((cap) => (
                      <div
                        key={cap.name}
                        className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-5 transition-all hover:bg-white hover:border-slate-200 hover:shadow-sm"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#1D81F2]" />
                            <h3 className="font-display text-base font-semibold text-slate-900">
                              {cap.name}
                            </h3>
                          </div>
                          <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                            {cap.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Category Footer Action */}
                  <div className="relative z-10 mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
                    <span className="font-mono text-xs text-slate-500">
                      Production delivery with dedicated engineering pod
                    </span>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#1D81F2] hover:text-[#156CD4] transition-colors"
                    >
                      <span>Inquire about {category.title}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Engagement Models Banner (NETSOL Bento Style) */}
      <section className="border-t border-slate-200 bg-[#FFFFFF] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1360px]">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#1D81F2]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1D81F2]" />
              Enterprise Delivery
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Flexible Enterprise Engagement Models
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              We shape our engineering teams around your operational timeline, security parameters, and technical architecture.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-[24px] border border-slate-200/80 bg-slate-50/60 p-8 shadow-sm transition-all hover:bg-white hover:shadow-lg hover:border-slate-300">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D81F2] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">Model 01</span>
              <h3 className="mt-4 font-display text-xl font-bold text-slate-950">Dedicated Engineering Pods</h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 font-medium">
                Self-sufficient, senior engineering teams (Tech Lead, Staff Engineers, Data/ML Specialists) embedded directly into your delivery roadmap.
              </p>
            </div>
            <div className="rounded-[24px] border border-slate-200/80 bg-slate-50/60 p-8 shadow-sm transition-all hover:bg-white hover:shadow-lg hover:border-slate-300">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D81F2] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">Model 02</span>
              <h3 className="mt-4 font-display text-xl font-bold text-slate-950">Fixed-Scope Product Builds</h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 font-medium">
                Clearly scoped milestones from initial architectural specification to production deployment, security verification, and handoff.
              </p>
            </div>
            <div className="rounded-[24px] border border-slate-200/80 bg-slate-50/60 p-8 shadow-sm transition-all hover:bg-white hover:shadow-lg hover:border-slate-300">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D81F2] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">Model 03</span>
              <h3 className="mt-4 font-display text-xl font-bold text-slate-950">Architecture & Security Advisory</h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 font-medium">
                Senior staff advisory for AI feasibility, codebase due diligence, air-gapped readiness audits, and infrastructure modernization.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
