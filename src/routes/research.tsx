import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import { researchCategories, researchProjects, ResearchProject } from "../data/innovations";
import { Reveal } from "../components/site/ui";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research & Engineering — NeuroSyn" },
      {
        name: "description",
        content:
          "Proprietary cognitive architectures, autonomous reasoning systems, verification infrastructure, and developer technologies built by NeuroSyn.",
      },
      { property: "og:title", content: "NeuroSyn Research & Engineering" },
      {
        property: "og:description",
        content:
          "Engineering Intelligence Beyond the Model. Proprietary cognitive systems, autonomous reasoning, verification infrastructure, and Mamba programming language.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const mambaProject = researchProjects.find((p) => p.id === "mamba")!;

  const filteredProjects =
    selectedCategory === "all"
      ? researchProjects
      : researchProjects.filter((p) => p.categoryKey === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NETSOL Architectural Pinstripe Hero */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 pt-24 pb-20 md:px-10 md:pt-32 md:pb-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[1200px]">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>NEUROSYN / RESEARCH & ENGINEERING</span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-[1.08]">
            Engineering Intelligence{" "}
            <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
              Beyond the Model.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Proprietary cognitive architectures, autonomous reasoning systems, verification infrastructure, and developer technologies engineered from first principles.
          </p>

          {/* Category Quick Stats */}
          <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-xs text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 shadow-2xs font-medium">
              <strong className="text-slate-900">4</strong> Cognitive Systems
            </span>
            <span className="rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 shadow-2xs font-medium">
              <strong className="text-slate-900">2</strong> Autonomous SDLC Engines
            </span>
            <span className="rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 shadow-2xs font-medium">
              <strong className="text-slate-900">2</strong> Verification Sandboxes
            </span>
            <span className="rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 shadow-2xs font-medium">
              <strong className="text-slate-900">1</strong> Native Compiled Language
            </span>
          </div>
        </div>
      </section>

      {/* Prominent Mamba Feature Section */}
      <section className="border-b border-slate-200 bg-slate-50/70 px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-3xl border border-blue-200/80 bg-linear-to-br from-white via-blue-50/30 to-white p-8 md:p-12 shadow-sm">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Context & Highlights */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 font-mono text-xs font-semibold text-[#1D81F2]">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>FLAGSHIP DEVELOPER TECHNOLOGY · v0.4.0</span>
                </div>

                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Mamba — Full-Stack Single-Binary Language
                </h2>

                <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                  {mambaProject.shortDescription}
                </p>

                {/* Verified Architecture Bullets */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                    <div className="font-mono text-[11px] font-semibold text-slate-500 uppercase">
                      Target Executable
                    </div>
                    <div className="mt-1 font-mono text-xs font-bold text-slate-900">
                      Standalone ~80 KB C++20 Machine Binary
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                    <div className="font-mono text-[11px] font-semibold text-slate-500 uppercase">
                      UI Runtime
                    </div>
                    <div className="mt-1 font-mono text-xs font-bold text-slate-900">
                      Atomic Reactive Signals (Zero Virtual DOM)
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                    <div className="font-mono text-[11px] font-semibold text-slate-500 uppercase">
                      Native AI Integration
                    </div>
                    <div className="mt-1 font-mono text-xs font-bold text-slate-900">
                      First-Class <code className="text-[#1D81F2]">agent</code> Syntax & Auto Endpoints
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                    <div className="font-mono text-[11px] font-semibold text-slate-500 uppercase">
                      Cloud Gateway
                    </div>
                    <div className="mt-1 font-mono text-xs font-bold text-slate-900">
                      Zero-Config Git Deploy to <span className="text-[#1D81F2]">mambacloud.app</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    to="/research/$projectId"
                    params={{ projectId: "mamba" }}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1D81F2] px-5 py-3 text-xs font-mono font-bold text-white shadow-sm transition-all hover:bg-blue-600"
                  >
                    <span>Explore Mamba Architecture</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href="https://github.com/Muaviatanveer/Mamba"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-mono font-semibold text-slate-800 transition-all hover:border-[#1D81F2] hover:text-[#1D81F2]"
                  >
                    <span>GitHub Repository</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href="https://mambacloud.app"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-mono font-semibold text-slate-800 transition-all hover:border-[#1D81F2] hover:text-[#1D81F2]"
                  >
                    <span>mambacloud.app</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Code Snippet */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-slate-800 bg-[#0B1120] p-5 text-slate-200 shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 font-semibold text-slate-300">examples/fullstack_showcase.mb</span>
                    </div>
                    <span className="text-[#1D81F2]">Mamba v0.4.0</span>
                  </div>
                  <pre className="mt-4 overflow-x-auto font-mono text-[11px] leading-relaxed text-slate-300">
                    <code>{`state counter = 0
state app_status = "Active"

agent Copilot {
    model "gpt-4o-mini"
    instructions "Mamba AI Assistant"
    tool web
}

component MetricCard {
    prop title
    card {
        heading title
        alert "ONLINE"
    }
}

ui App {
    column {
        heading "Full-Stack Single Binary"
        render MetricCard "Signals"
        button "⚡ Increment (+1)" {
            counter = counter + 1
        }
    }
}`}</code>
                  </pre>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 font-mono text-[10px] text-slate-500">
                    <span>1 Source → clang++ -O3</span>
                    <span className="text-emerald-400">0 Runtime Dependencies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-slate-200 bg-white px-6 py-6 md:px-10 sticky top-18 z-40 backdrop-blur-md bg-white/95">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-[#1D81F2] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              All Systems ({researchProjects.length})
            </button>
            {researchCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                  selectedCategory === cat.key
                    ? "bg-[#1D81F2] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="font-mono text-xs text-slate-500 hidden sm:block">
            Showing {filteredProjects.length} Verified Systems
          </div>
        </div>
      </section>

      {/* Main Grid: All 9 Systems */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* NeuroSyn-Aero Commercial Cross-Link Note */}
          <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
                Commercial Enterprise Deployments
              </div>
              <h3 className="mt-1 font-display text-lg font-semibold text-slate-950">
                Looking for NeuroSyn-Aero or enterprise ERP solutions?
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Turnkey commercial platforms like NeuroSyn-Aero, SAP Synapse, and NeuroSyn-Dev are maintained on our Solutions page.
              </p>
            </div>
            <Link
              to="/products/aero"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-mono text-xs font-semibold text-slate-800 shadow-2xs hover:border-[#1D81F2] hover:text-[#1D81F2]"
            >
              <span>View NeuroSyn-Aero</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project }: { project: ResearchProject }) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#1D81F2]/60 hover:shadow-md">
      <div>
        {/* Top Eyebrow & Badge */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {project.category}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-[10px] font-medium text-slate-700">
            {project.badge.split("·")[0].trim()}
          </span>
        </div>

        {/* 1. Project Name */}
        <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-slate-950 transition-colors group-hover:text-[#1D81F2]">
          {project.name}
        </h3>

        {/* 2. Short Description — ye kya karta hai */}
        <p className="mt-3 text-xs leading-relaxed text-slate-600">
          {project.shortDescription}
        </p>

        {/* Grounded verified attributes preview */}
        <div className="mt-5 space-y-2 rounded-xl bg-slate-50/80 p-3 border border-slate-100">
          {project.verifiedAttributes.slice(0, 2).map((attr) => (
            <div key={attr.label} className="font-mono text-[11px]">
              <span className="text-slate-500 uppercase">{attr.label}: </span>
              <span className="font-medium text-slate-800">{attr.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Explore Project Link — detailed page par */}
      <div className="mt-6 border-t border-slate-100 pt-5">
        <Link
          to="/research/$projectId"
          params={{ projectId: project.id }}
          className="inline-flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 font-mono text-xs font-semibold text-slate-800 transition-all group-hover:bg-[#1D81F2] group-hover:text-white"
        >
          <span>Explore Architecture</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
