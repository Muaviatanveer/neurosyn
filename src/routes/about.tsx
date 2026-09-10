import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Cpu,
  Database,
  ArrowRight,
  Layers,
  Sparkles,
  CheckCircle2,
  Lock,
  GitBranch,
} from "lucide-react";
import { Reveal, Eyebrow, CTAButton } from "../components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About NeuroSyn — Enterprise AI Operating Systems" },
      {
        name: "description",
        content:
          "NeuroSyn engineers production-grade AI platforms and custom software that integrate natively into enterprise workflows rather than replacing them.",
      },
      { property: "og:title", content: "About NeuroSyn" },
      {
        property: "og:description",
        content: "Engineering software and AI operating systems that work for enterprise reality.",
      },
    ],
  }),
  component: AboutPage,
});

const deliveryFramework = [
  {
    step: "01",
    title: "Applied Research & Feasibility",
    desc: "Rigorous evaluation of enterprise data structures, latency bounds, and compliance requirements before writing production code.",
  },
  {
    step: "02",
    title: "Deterministic Architecture",
    desc: "Designing type-safe, fault-tolerant execution graphs, database schemas, and air-gapped sandboxes with mathematical isolation.",
  },
  {
    step: "03",
    title: "Production Deployment",
    desc: "Continuous integration through containerized micro-VMs, automated AST verification, and multi-cloud container orchestration.",
  },
  {
    step: "04",
    title: "Native ERP & System Integration",
    desc: "Bidirectional protocol bridges connecting directly to SAP S/4HANA, Salesforce, Kafka streams, and legacy SQL datastores.",
  },
  {
    step: "05",
    title: "Continuous Intelligence & SRE",
    desc: "Autonomous telemetry monitoring, regression prevention, drift detection, and guaranteed 99.99% operational SLA execution.",
  },
];

const principles = [
  {
    icon: Lock,
    title: "Zero-Data-Leakage Guarantee",
    desc: "We prioritize on-premise, air-gapped, and sovereign model architectures. Your proprietary data never trains external third-party models.",
  },
  {
    icon: Cpu,
    title: "Deterministic Over Generative",
    desc: "We enforce strict schema validation, type checking, and physics-guided constraints to ensure zero hallucinations in production.",
  },
  {
    icon: Database,
    title: "Preserve Existing ERP Investment",
    desc: "We build non-destructive intelligence layers that amplify your existing SAP, Oracle, or custom systems without risky rip-and-replace cycles.",
  },
  {
    icon: GitBranch,
    title: "Full Code & IP Ownership",
    desc: "Clients own 100% of the custom software, agent workflows, LoRA adapters, and deployment infrastructure we engineer for them.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NETSOL Architectural Pinstripe Hero */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 py-20 md:px-10 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Company & Engineering Philosophy</span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[1.08]">
            We build software & AI systems that{" "}
            <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
              work.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            NeuroSyn develops production-grade platforms and custom software that integrate natively into enterprise workflows. Every system is engineered around explainability, uptime, and measurable business outcomes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/services"
              className="group inline-flex items-center gap-3 rounded-full bg-[#1D81F2] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#156CD4] hover:shadow-xl hover:shadow-blue-500/35 active:scale-[0.98]"
            >
              <span>Explore Our Capabilities</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision Bento */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1360px] grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="rounded-[28px] border border-slate-200/85 bg-white p-8 lg:p-12 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl h-full flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#1D81F2]">
                  <span className="h-3.5 w-1 rounded-full bg-[#1D81F2]" />
                  <span>Our Mission</span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Empowering enterprise operations through trustworthy technology.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  To empower organizations with deterministic, high-throughput software and AI systems that augment human expertise, streamline complex operations, and transform raw telemetry into high-confidence decisions through secure, explainable technology.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-[#1D81F2]" />
                <span>Enterprise SLA Guaranteed</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="rounded-[28px] border border-slate-200/85 bg-white p-8 lg:p-12 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl h-full flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#1D81F2]">
                  <span className="h-3.5 w-1 rounded-full bg-[#1D81F2]" />
                  <span>Our Vision</span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Setting the global standard for enterprise intelligence.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  To become the premier engineering partner for global enterprises by creating intelligent operating systems that redefine how businesses manage supply chains, verify complex software, and automate critical decisions without sacrificing security or sovereignty.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-[#1D81F2]" />
                <span>Zero Hallucination Architecture</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NETSOL-Style 5-Step Delivery Framework */}
      <section className="border-t border-slate-200 bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1360px]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
              <span>Engineering Lifecycle</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              From applied research to continuous intelligence.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              A disciplined, five-phase software and AI engineering framework designed to eliminate delivery risk.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {deliveryFramework.map((phase, idx) => (
              <Reveal key={phase.step} delay={idx * 0.08}>
                <div className="group rounded-[24px] border border-slate-200/85 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-lg h-full flex flex-col justify-between">
                  <div>
                    <div className="font-display text-xl font-black text-[#1D81F2]">
                      {phase.step}
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold text-slate-950">
                      {phase.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                      {phase.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-[11px] font-semibold text-[#1D81F2]">
                    <span>Phase {phase.step}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Engineering Principles Bento */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1360px]">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
              <span>Core Tenets</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Built on uncompromising engineering principles.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((pr, idx) => {
              const Icon = pr.icon;
              return (
                <Reveal key={pr.title} delay={idx * 0.08}>
                  <div className="rounded-[24px] border border-slate-200/85 bg-white p-7 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-lg h-full">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-[#1D81F2]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-slate-950">
                      {pr.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {pr.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="border-t border-slate-200 bg-[#0A0F1D] px-6 py-20 text-white md:px-10 md:py-24">
        <div className="mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-blue-400">
            <span className="h-3.5 w-1 rounded-full bg-[#1D81F2]" />
            <span>Ready to Build</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Engineering intelligence for the modern enterprise.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            Let's discuss how NeuroSyn can design, deploy, and scale custom software and AI systems for your organization.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[#1D81F2] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#156CD4] hover:shadow-xl active:scale-[0.98]"
            >
              <span>Start an Engineering Engagement</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link
              to="/services"
              className="rounded-full border border-slate-700 bg-slate-800/80 px-7 py-3.5 text-sm font-medium text-slate-200 transition-all hover:bg-slate-700"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
