import React from "react";
import { ArrowRight, CheckCircle2, ChevronRight, Layers, ShieldCheck, Cpu } from "lucide-react";
import { ResearchProject } from "../../data/innovations";

interface ArchitectureDiagramProps {
  project: ResearchProject;
  className?: string;
}

export function ArchitectureDiagram({ project, className = "" }: ArchitectureDiagramProps) {
  return (
    <div className={`rounded-2xl border border-slate-200/90 bg-slate-50/60 p-6 md:p-8 ${className}`}>
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-[#1D81F2]">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              Verified Architecture Diagram
            </div>
            <div className="font-display text-base font-semibold text-slate-900">
              {project.name} · System Pipeline Topology
            </div>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-[11px] font-medium text-slate-600 shadow-xs">
          <span className="h-2 w-2 rounded-full bg-[#1D81F2] animate-pulse" />
          <span>Derived from Source Code</span>
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="mt-6">
        <div className="flex flex-col gap-3">
          {project.architectureNodes.map((node, idx) => (
            <div
              key={`${node.from}-${node.to}-${idx}`}
              className="group relative flex flex-col items-stretch sm:flex-row sm:items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition-all hover:border-[#1D81F2]/50 hover:shadow-xs"
            >
              {/* Origin Node */}
              <div className="flex flex-1 items-center gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 font-mono text-[11px] font-bold text-slate-600">
                  {idx + 1}
                </span>
                <span className="font-mono text-xs font-semibold text-slate-900">
                  {node.from}
                </span>
              </div>

              {/* Connector */}
              <div className="flex shrink-0 items-center justify-center gap-1.5 px-2 text-[#1D81F2]">
                {node.label ? (
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#1D81F2]">
                    {node.label}
                  </span>
                ) : (
                  <div className="h-px w-6 bg-blue-200 hidden sm:block" />
                )}
                <ChevronRight className="h-4 w-4 shrink-0 text-[#1D81F2]" />
              </div>

              {/* Destination Node */}
              <div className="flex flex-1 items-center gap-2 rounded-lg bg-slate-50/80 px-3 py-2 border border-slate-100">
                <span className="font-mono text-xs font-medium text-slate-800">
                  {node.to}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grounded verified source tag */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-4 font-mono text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Source Reference:</span>
          <span className="font-medium text-slate-700">
            {project.sourceFiles[0]}
          </span>
        </div>
        <div className="text-slate-400">
          Deterministic Execution Pipeline
        </div>
      </div>
    </div>
  );
}
