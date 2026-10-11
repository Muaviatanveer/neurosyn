import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight, Code2, Cpu, ExternalLink, FileText, Layers, ShieldCheck } from "lucide-react";
import { researchProjects } from "../data/innovations";
import { ArchitectureDiagram } from "../components/site/ArchitectureDiagram";
import { Reveal, CTAButton } from "../components/site/ui";

export const Route = createFileRoute("/testimonials/$projectId")({
  head: ({ params }) => {
    const project = researchProjects.find((p) => p.id === params.projectId);
    const title = project
      ? `${project.name} — ${project.title} | NeuroSyn Research`
      : "Research & Engineering — NeuroSyn";
    const desc = project?.shortDescription ?? "Proprietary cognitive architectures and developer technologies.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  loader: ({ params }) => {
    const project = researchProjects.find((p) => p.id === params.projectId);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Pinstripe Hero */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 pt-24 pb-16 md:px-10 md:pt-32 md:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[1200px]">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 font-mono text-xs font-semibold text-slate-500">
            <Link to="/testimonials" className="transition-colors hover:text-[#1D81F2] flex items-center gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Testimonials & Engineering Systems</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="text-slate-400">{project.category}</span>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="text-slate-900 font-bold">{project.name}</span>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
                <span>{project.badge}</span>
              </div>
              <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
                {project.name}
              </h1>
              <p className="mt-3 text-lg font-medium text-slate-600 sm:text-xl">
                {project.title}
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {project.shortDescription}
              </p>
            </div>

            {/* External Links (e.g. for Mamba) */}
            {project.externalLinks && project.externalLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {project.externalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-mono font-semibold text-slate-800 shadow-xs transition-all hover:border-[#1D81F2] hover:text-[#1D81F2]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#1D81F2]" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Tech badges */}
          <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-slate-200/80">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-medium text-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1200px] space-y-16">
          {/* Executive Overview */}
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                01 / Architectural Mandate
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold text-slate-950 sm:text-3xl">
                System Overview & Engineering Purpose
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                {project.fullOverview}
              </p>
            </div>

            <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
                Verified Attributes
              </div>
              <div className="mt-4 space-y-3.5">
                {project.verifiedAttributes.map((attr) => (
                  <div key={attr.label} className="border-b border-slate-200/80 pb-3 last:border-b-0 last:pb-0">
                    <div className="font-mono text-[11px] font-semibold text-slate-500 uppercase">
                      {attr.label}
                    </div>
                    <div className="mt-1 font-mono text-xs font-medium text-slate-900">
                      {attr.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Architecture Pipeline Diagram */}
          <div>
            <div className="mb-4">
              <div className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                02 / Structural Topology
              </div>
              <h2 className="mt-1 font-display text-2xl font-semibold text-slate-950 sm:text-3xl">
                Execution Pipeline & Component Nodes
              </h2>
            </div>
            <ArchitectureDiagram project={project} />
          </div>

          {/* Lifecycle Breakdown Steps */}
          <div>
            <div className="mb-6">
              <div className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                03 / Execution Lifecycle
              </div>
              <h2 className="mt-1 font-display text-2xl font-semibold text-slate-950 sm:text-3xl">
                Step-by-Step Runtime Protocol
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {project.lifecycleSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#1D81F2] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-slate-900">
                      {step.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-3">
                    <div className="font-mono text-[10px] uppercase font-semibold text-slate-400">
                      Active Modules
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {step.components.map((c) => (
                        <span
                          key={c}
                          className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-700"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real Code or Log Trace Example */}
          {project.codeOrTraceExample && (
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    04 / Code & Trace Evidence
                  </div>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-slate-950 sm:text-3xl">
                    Implementation Snippet
                  </h2>
                </div>
                <div className="font-mono text-xs text-slate-500">
                  {project.codeOrTraceExample.caption}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#0B1120] p-6 text-slate-200 shadow-md">
                <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 font-semibold text-slate-300 uppercase">
                      {project.codeOrTraceExample.language}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">Actual Source Excerpt</span>
                </div>
                <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-slate-300">
                  <code>{project.codeOrTraceExample.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Source Repository Audit Trail */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
              <FileText className="h-4 w-4 text-[#1D81F2]" />
              <span>Documented Codebase Files</span>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              The specifications and architecture above were extracted and verified from the following repository paths:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.sourceFiles.map((file) => (
                <span
                  key={file}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1 font-mono text-xs font-medium text-slate-800 shadow-2xs"
                >
                  {file}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-8">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D81F2] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to All Systems</span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#090D16] px-5 py-2.5 text-xs font-mono font-semibold text-white transition-all hover:bg-slate-800"
            >
              <span>Schedule Architecture Review</span>
              <ArrowUpRight className="h-4 w-4 text-cyan-400" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
