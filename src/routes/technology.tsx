import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Cpu,
  Code2,
  Layout,
  Server,
  Database,
  Cloud,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { Reveal } from "../components/site/ui";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology Stack & Architecture — NeuroSyn" },
      {
        name: "description",
        content:
          "Production-grade technology stack: AI & agentic frameworks, languages, distributed backends, streaming databases, cloud infrastructure, and enterprise ERP connectors.",
      },
      { property: "og:title", content: "NeuroSyn Technology Stack" },
      {
        property: "og:description",
        content: "Engineered on modern AI infrastructure and distributed cloud systems.",
      },
    ],
  }),
  component: TechPage,
});

const techLayers = [
  {
    id: "ai-frameworks",
    layerNumber: "Layer 01",
    name: "AI, Machine Learning & Agentic Frameworks",
    icon: Cpu,
    description:
      "Modern machine learning engines, agentic reasoning graphs, high-dimensional vector search, and state-of-the-art foundation model ecosystems.",
    techGroups: [
      {
        category: "Runtimes & Acceleration",
        items: ["PyTorch", "TensorFlow", "JAX", "ONNX Runtime", "vLLM", "TensorRT-LLM", "Hugging Face"],
      },
      {
        category: "Agentic Reasoning & RAG",
        items: ["LangGraph", "LlamaIndex", "LangChain", "AutoGen", "CrewAI"],
      },
      {
        category: "Vector Databases & Indexing",
        items: ["Qdrant", "Pinecone", "Milvus", "Weaviate", "pgvector", "Chroma"],
      },
      {
        category: "Foundation Models & Ecosystem",
        items: ["OpenAI GPT-4o", "Anthropic Claude 3.5/3.7", "Google Gemini 2.0 / 1.5", "Meta Llama 3.3", "DeepSeek-R1", "Mistral Large"],
      },
    ],
  },
  {
    id: "languages",
    layerNumber: "Layer 02",
    name: "Languages & Core Runtimes",
    icon: Code2,
    description:
      "Type-safe, memory-efficient, high-concurrency programming languages powering both mathematical compute and mission-critical business logic.",
    techGroups: [
      {
        category: "Systems & High Performance",
        items: ["Python 3.12+", "TypeScript 5+", "Go (Golang)", "Rust", "Java 21+", "C++20"],
      },
      {
        category: "Scripting & Runtimes",
        items: ["Node.js", "Bun", "Deno", "POSIX Shell / Bash"],
      },
    ],
  },
  {
    id: "frontend",
    layerNumber: "Layer 03",
    name: "Frontend & Modern Web Systems",
    icon: Layout,
    description:
      "Next-generation component architectures, server-side rendering (SSR), resilient state synchronization, and Apple-grade micro-interactions.",
    techGroups: [
      {
        category: "Frameworks & Meta-Frameworks",
        items: ["React 19", "Next.js", "TanStack Start / Router", "Vite", "Remix", "Vue.js"],
      },
      {
        category: "Styling & UI Systems",
        items: ["Tailwind CSS v4", "Framer Motion", "Radix UI Primitives", "CSS Modules"],
      },
      {
        category: "State, Validation & Queries",
        items: ["TanStack Query", "Zustand", "Redux Toolkit", "React Hook Form", "Zod"],
      },
    ],
  },
  {
    id: "backend",
    layerNumber: "Layer 04",
    name: "Backend, Distributed Systems & Messaging",
    icon: Server,
    description:
      "High-throughput microservices, event-driven architectures, low-latency RPC interfaces, and asynchronous pub/sub messaging backbones.",
    techGroups: [
      {
        category: "Backend Frameworks",
        items: ["FastAPI", "Django", "Go Fiber", "NestJS", "Express.js", "Actix Web", "Spring Boot"],
      },
      {
        category: "Protocols & Gateways",
        items: ["gRPC", "GraphQL", "REST / OpenAPI", "WebSockets", "tRPC", "WebRTC"],
      },
      {
        category: "Streaming & Message Queues",
        items: ["Apache Kafka", "RabbitMQ", "Redis Streams", "Apache Pulsar", "AWS SQS / SNS"],
      },
    ],
  },
  {
    id: "data-storage",
    layerNumber: "Layer 05",
    name: "Databases, Lakehouses & Storage",
    icon: Database,
    description:
      "ACID-compliant relational systems, high-speed distributed document stores, caching layers, and petabyte-scale analytical lakehouses.",
    techGroups: [
      {
        category: "Relational & SQL",
        items: ["PostgreSQL", "MySQL", "CockroachDB", "SQLite"],
      },
      {
        category: "NoSQL & Document Stores",
        items: ["MongoDB", "AWS DynamoDB", "Apache Cassandra"],
      },
      {
        category: "In-Memory & Caches",
        items: ["Redis", "Dragonfly", "KeyDB", "Memcached"],
      },
      {
        category: "OLAP & Data Lakehouses",
        items: ["Snowflake", "Google BigQuery", "ClickHouse", "Databricks", "DuckDB", "Amazon Redshift"],
      },
      {
        category: "Object Storage",
        items: ["AWS S3", "Cloudflare R2", "Google Cloud Storage", "MinIO"],
      },
    ],
  },
  {
    id: "cloud-devops",
    layerNumber: "Layer 06",
    name: "Cloud, DevOps & Infrastructure",
    icon: Cloud,
    description:
      "Multi-cloud architectures, declarative infrastructure-as-code, automated container orchestration, and continuous observability.",
    techGroups: [
      {
        category: "Cloud Providers",
        items: ["Amazon Web Services (AWS)", "Google Cloud Platform (GCP)", "Microsoft Azure", "Cloudflare"],
      },
      {
        category: "Containers & Mesh",
        items: ["Docker", "Kubernetes (K8s)", "Helm", "Istio Service Mesh", "Nomad"],
      },
      {
        category: "Infrastructure as Code",
        items: ["Terraform", "Pulumi", "AWS CDK", "Ansible"],
      },
      {
        category: "CI/CD & GitOps",
        items: ["GitHub Actions", "GitLab CI", "ArgoCD", "Jenkins"],
      },
      {
        category: "Observability & SRE",
        items: ["Prometheus", "Grafana", "Datadog", "OpenTelemetry", "Sentry", "ELK Stack"],
      },
    ],
  },
  {
    id: "enterprise-sap",
    layerNumber: "Layer 07",
    name: "Enterprise, SAP & Industrial Protocols",
    icon: Layers,
    description:
      "Enterprise resource planning systems, bidirectional protocol bridges, industrial IoT telemetry, and zero-trust security vaults.",
    techGroups: [
      {
        category: "Enterprise Core Systems",
        items: ["SAP S/4HANA", "SAP ECC", "NetWeaver", "Salesforce", "Oracle ERP Cloud"],
      },
      {
        category: "Connectors & Protocols",
        items: ["SAP RFC / BAPI", "OData v4", "IDoc", "SOAP", "EDIFACT", "MQTT", "OPC-UA (Industrial IoT)"],
      },
      {
        category: "Security & Vaults",
        items: ["OAuth 2.0 / OIDC", "SAML 2.0", "Okta", "Keycloak", "HashiCorp Vault"],
      },
    ],
  },
];

function TechPage() {
  const [activeLayer, setActiveLayer] = useState<string>("all");

  const filteredLayers =
    activeLayer === "all"
      ? techLayers
      : techLayers.filter((l) => l.id === activeLayer);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <section className="border-b border-slate-200 bg-[#F8FAFC] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">
            <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
            Enterprise Technology Architecture
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            Engineered on modern infrastructure.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            NeuroSyn selects proven, battle-tested technologies and modern AI frameworks to deliver resilient, scalable, and audit-compliant enterprise systems.
          </p>
        </div>
      </section>

      {/* Layer Filter Pills */}
      <section className="border-b border-slate-200 bg-white px-6 py-4 sticky top-18 z-40 backdrop-blur-md bg-white/90">
        <div className="mx-auto flex max-w-[1360px] items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => setActiveLayer("all")}
            className={`rounded-full px-3.5 py-1.5 font-medium whitespace-nowrap transition-colors ${
              activeLayer === "all"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Layers (01 - 07)
          </button>
          {techLayers.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLayer(l.id)}
              className={`rounded-full px-3.5 py-1.5 font-medium whitespace-nowrap transition-colors ${
                activeLayer === l.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {l.layerNumber}: {l.name.split("&")[0]}
            </button>
          ))}
        </div>
      </section>

      {/* Main Layers Grid */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1360px] space-y-12">
          {filteredLayers.map((layer) => {
            const Icon = layer.icon;
            return (
              <Reveal key={layer.id}>
                <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-slate-300 sm:p-10">
                  <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-[#0891B2]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-semibold text-[#0891B2]">
                          {layer.layerNumber}
                        </span>
                        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950">
                          {layer.name}
                        </h2>
                      </div>
                    </div>
                    <p className="max-w-md text-xs leading-relaxed text-slate-600">
                      {layer.description}
                    </p>
                  </div>

                  <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {layer.techGroups.map((group) => (
                      <div
                        key={group.category}
                        className="rounded-xl border border-slate-100 bg-[#F8FAFC]/90 p-4"
                      >
                        <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-700 border-b border-slate-200/80 pb-2">
                          {group.category}
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {group.items.map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Technical Philosophy Banner */}
      <section className="border-t border-slate-200 bg-[#090D16] px-6 py-16 text-white md:px-10 md:py-24">
        <div className="mx-auto max-w-[1000px] text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Engineering Standard
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Pragmatic Architecture, Deterministic Results.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">
            We do not adopt technologies for novelty. Every layer in our stack is selected to maximize type safety, auditability, operational uptime, and compute efficiency.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
            >
              <span>Discuss Architecture Requirements</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
