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
import { EnterpriseDashboardPreview } from "../components/site/EnterpriseDashboardPreview";
import { TiltCard } from "../components/site/TiltCard";
import { GeometricCore, type ProductEngineId } from "../components/site/GeometricCore";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuroSyn — Custom Software & AI Systems" },
      {
        name: "description",
        content:
          "We build software that moves businesses forward. Custom web & mobile applications, AI systems, cloud infrastructure, and enterprise ERP.",
      },
      { property: "og:site_name", content: "NeuroSyn" },
      { property: "og:title", content: "NeuroSyn — Custom Software & AI Systems" },
      {
        property: "og:description",
        content: "We build software that moves businesses forward. Custom web & mobile applications, AI systems, cloud infrastructure, and enterprise ERP.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.neurosyn.it.com" },
      { property: "og:image", content: "https://www.neurosyn.it.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "NeuroSyn — Custom Software & AI Systems" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NeuroSyn — Custom Software & AI Systems" },
      { name: "twitter:description", content: "We build software that moves businesses forward. Custom web & mobile applications, AI systems, cloud infrastructure, and enterprise ERP." },
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
    category: "Finance Software",
    problem:
      "Their finance team was manually checking thousands of records. Audits were slow and errors slipped through.",
    solution:
      "We built a tool that automatically checks financial records and flags anything unusual, plugged right into their existing workflow.",
    result: "Audits that took weeks now take days. Catches 99.98% of issues automatically.",
    tags: ["Automation", "Finance", "SAP"],
  },
  {
    partner: "Polarions",
    category: "Developer Tools",
    problem:
      "Their dev team was spending too much time on manual testing and broken deploys across multiple cloud setups.",
    solution:
      "We built an automated testing and deployment system that checks code before it goes live.",
    result: "Ship updates 4x faster with zero broken releases since launch.",
    tags: ["Testing", "Deployment", "Cloud"],
  },
  {
    partner: "IJAIKE",
    category: "Research Platform",
    problem:
      "Important research and documents were scattered across different systems. Finding anything was slow and unreliable.",
    solution:
      "We built a search tool that lets their team ask questions in plain language and get accurate answers with exact source references.",
    result: "Search across 10M+ documents in under a second. Every answer shows exactly where it came from.",
    tags: ["Search", "AI", "Documents"],
  },
  {
    partner: "Industrial Diagnostics",
    category: "Equipment Monitoring",
    problem:
      "Their monitoring system kept raising false alarms, and real equipment problems were caught too late.",
    solution:
      "We trained models on their sensor data to tell the difference between real problems and noise, and predict failures before they happen.",
    result: "42% fewer false alarms. Catches equipment problems 3x earlier.",
    tags: ["Sensors", "Predictions", "Manufacturing"],
  },
];


/* 4 Products */
const proprietaryProducts = [
  {
    id: "sap" as const,
    name: "NeuroSyn-SAP",
    tag: "SAP Auditing Tool",
    desc: "Watches your SAP transactions in real time, flags anything unusual, and automates compliance checks so your finance team doesn't have to.",
    to: "/products/sap",
    specs: ["Works with SAP ECC & S/4HANA", "No Downtime to Install", "Auto Reconciliation"],
  },
  {
    id: "dev" as const,
    name: "NeuroSyn-Dev",
    tag: "AI Coding Assistant",
    desc: "Reviews your code, writes tests, checks for bugs, and handles routine development tasks so your team can focus on what matters.",
    to: "/products/dev",
    specs: ["Code Review", "Auto Testing", "Bug Detection"],
  },
  {
    id: "aero" as const,
    name: "NeuroSyn-Aero",
    tag: "Equipment Monitoring",
    desc: "Reads sensor data from your machines, learns what normal looks like, and tells you when something is about to break — before it does.",
    to: "/products/aero",
    specs: ["Works Offline", "Learns Your Equipment", "Fast Alerts"],
  },
  {
    id: "copilot" as const,
    name: "NeuroSyn-Copilot",
    tag: "Document Search Tool",
    desc: "Ask questions about your company's documents and get accurate answers with exact page references. Runs on your own servers — nothing leaves your network.",
    to: "/products/copilot",
    specs: ["Runs Offline", "Shows Sources", "Your Servers Only"],
  },
];

function Home() {
  const [hoveredEngine, setHoveredEngine] = useState<ProductEngineId>(null);

  return (
    <div className="bg-white text-slate-900">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Light, 70% Palette)                                      */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-[#FFFFFF] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        {/* Subtle ambient grid pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(15,23,42,0.3) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />

        <div className="mx-auto max-w-[1360px]">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left: Services-First Value Proposition */}
            <div className="lg:col-span-6 lg:pr-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-[1.05]">
                  We build software that moves businesses forward.
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                  We're a software company that builds custom apps, AI tools, and cloud systems.
                  If you need something built right, we can help.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-md bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-950/20 active:scale-[0.98]"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition-all hover:bg-slate-50 hover:border-slate-400 hover:shadow-sm active:scale-[0.98]"
                >
                  Explore Services
                </Link>
              </motion.div>

              {/* Engineering capabilities banner — animated stagger */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-12 flex flex-wrap items-center gap-y-2 gap-x-6 border-t border-slate-200 pt-6 text-[11px] font-medium uppercase tracking-wider text-slate-600"
              >
                {["AI & Automation", "Web & Mobile Apps", "Cloud Setup", "SAP & ERP"].map((cap, i) => (
                  <motion.span
                    key={cap}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-2"
                  >
                    {i > 0 && <span className="text-slate-400">·</span>}
                    {cap}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Right: Real Composite Enterprise Dashboard — has its own entrance animation */}
            <div className="lg:col-span-6">
              <EnterpriseDashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CLIENTS / ORGANIZATIONS SECTION (Clean White Monochrome)              */}
      {/* ========================================================================= */}
      <section className="border-b border-slate-200 bg-[#FFFFFF] px-6 py-10 md:px-10 overflow-hidden">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              Trusted by organizations and technology partners
            </p>
          </Reveal>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-4 font-display text-xl font-bold tracking-tight text-slate-800 md:gap-x-16">
            {["AAKS", "IJAIKE", "KSOL", "POLARIONS"].map((name, i) => (
              <motion.span
                key={name}
                className="transition-all duration-300 hover:text-[#0891B2] cursor-default"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.05 }}
              >
                {i > 0 && <span className="text-slate-300 mr-12 md:mr-16">/</span>}
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SERVICES SECTION (Clean Software House Cards)                          */}
      {/* ========================================================================= */}
      <section id="services" className="border-b border-slate-200 bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1360px]">
          <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-10 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#0891B2]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                What We Do
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                We build it, you run it.
              </h2>
            </div>
            <p className="max-w-md text-base text-slate-600">
              Software, AI, cloud, data — whatever you need built, we'll handle the technical work so you can focus on your business.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <Reveal key={svc.title} delay={i * 0.1}>
                  <TiltCard maxTilt={2.5} scale={1.008} className="h-full">
                    <div className="group flex h-full flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-7 transition-all duration-200 hover:border-slate-300 hover:shadow-md">
                      <div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-800 transition-colors group-hover:bg-slate-100 group-hover:text-[#0891B2]">
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </div>
                        <h3 className="mt-5 font-display text-xl font-semibold text-slate-900">
                          {svc.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600">
                          {svc.description}
                        </p>
                      </div>

                      <div className="mt-6 border-t border-slate-100 pt-4">
                        <div className="space-y-1.5 text-xs text-slate-500">
                          {svc.deliverables.map((item) => (
                            <div key={item} className="flex items-center gap-2">
                              <span className="h-1 w-1 rounded-full bg-[#06B6D4]" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SELECTED WORK / CASE STUDIES (Structured B2B UX)                       */}
      {/* ========================================================================= */}
      <section className="border-b border-slate-200 bg-[#FFFFFF] px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1360px]">
          <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-10 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#0891B2]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                Our Work
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                What we've built for others.
              </h2>
            </div>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-[#0891B2]"
            >
              <span>View all case studies</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 space-y-6">
            {caseStudies.map((cs, idx) => (
              <Reveal key={cs.partner} delay={idx * 0.1}>
                <TiltCard maxTilt={2} scale={1.004} className="h-full">
                  <article className="rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-sm md:p-8">
                    <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
                      {/* Header & Meta */}
                      <div className="lg:col-span-3">
                        <span className="font-mono text-xs font-semibold text-[#0891B2]">0{idx + 1}</span>
                        <h3 className="mt-1 font-display text-2xl font-semibold text-slate-950">{cs.partner}</h3>
                        <p className="mt-1 text-xs font-medium text-slate-600">{cs.category}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {cs.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* B2B Problem -> Solution */}
                      <div className="space-y-3 lg:col-span-5 lg:border-l lg:border-slate-200 lg:pl-6">
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Challenge</div>
                          <p className="mt-1 text-sm leading-relaxed text-slate-600">{cs.problem}</p>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">What We Did</div>
                          <p className="mt-1 text-sm leading-relaxed text-slate-700">{cs.solution}</p>
                        </div>
                      </div>

                      {/* Result Callout */}
                      <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4 lg:col-span-4 lg:ml-2">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#0891B2]">
                          Result
                        </div>
                        <p className="mt-1.5 text-sm font-medium leading-snug text-slate-900">
                          {cs.result}
                        </p>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. PROPRIETARY TECHNOLOGY & PRODUCTS (Clean Light with Contrast)           */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-y border-slate-200 bg-[#F8FAFC] px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1360px]">
          <div className="grid gap-8 border-b border-slate-200 pb-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                  <Cpu className="h-3.5 w-3.5 text-[#0891B2]" />
                  Proprietary Technology
                </div>
              </Reveal>
              <Reveal delay={1}>
                <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
                  Technology we've built ourselves.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={2}>
                <p className="text-base leading-relaxed text-slate-600">
                  We also build our own products. These are tools we use ourselves and sell to clients who need them.
                </p>
              </Reveal>
            </div>
          </div>

          {/* 3D Geometric Core Interactive Centerpiece */}
          <Reveal delay={1}>
            <div className="my-8">
              <GeometricCore activeEngine={hoveredEngine} />
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {proprietaryProducts.map((p) => (
              <Reveal key={p.name}>
                <Link
                  to={p.to}
                  onMouseEnter={() => setHoveredEngine(p.id)}
                  onMouseLeave={() => setHoveredEngine(null)}
                  className={`group relative flex h-full flex-col justify-between rounded-xl border p-8 transition-all duration-300 hover:shadow-lg ${
                    hoveredEngine === p.id
                      ? "border-[#0891B2] bg-white shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
                        hoveredEngine === p.id ? "text-[#0891B2]" : "text-slate-500"
                      }`}>
                        {p.tag}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-900" />
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-950 group-hover:text-[#0891B2] transition-colors">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-slate-200 pt-4">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-500">
                      {p.specs.map((spec) => (
                        <span key={spec} className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-600">
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
      {/* 7. FINAL CALL TO ACTION                                                    */}
      {/* ========================================================================= */}
      <section className="relative bg-slate-950 px-6 py-20 text-white md:px-10 md:py-28 overflow-hidden">
        <div className="mx-auto max-w-[900px] text-center relative">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#06B6D4]">
              Start a Conversation
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Have a software challenge?
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Tell us what you need. We'll figure out the best way to build it and give you an honest estimate.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-sm transition-all hover:bg-slate-100 active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="rounded-md border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:border-slate-600 active:scale-[0.98]"
              >
                Talk to Our Team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}