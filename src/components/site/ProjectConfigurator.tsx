import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Code,
  Brain,
  Cloud,
  Layers,
  ShieldCheck,
  Zap,
  Users,
  Calendar,
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Interactive Project Architecture & Scope Configurator              */
/* BD tool: Helps prospective clients configure their project & scope */
/* ------------------------------------------------------------------ */

interface ObjectiveOption {
  id: string;
  title: string;
  desc: string;
  icon: typeof Code;
  suggestedStack: string[];
}

const objectives: ObjectiveOption[] = [
  {
    id: "app",
    title: "Web or Mobile App",
    desc: "Customer portals, SaaS products, native mobile apps, and high-throughput APIs.",
    icon: Code,
    suggestedStack: ["React / Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    id: "ai",
    title: "Private AI & ML System",
    desc: "Internal search over company documents, autonomous agents, and prediction models.",
    icon: Brain,
    suggestedStack: ["Python", "PyTorch", "vLLM", "Vector DB (Qdrant)"],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps Overhaul",
    desc: "Container orchestration, automated CI/CD pipelines, and cloud cost reduction.",
    icon: Cloud,
    suggestedStack: ["AWS / GCP", "Docker & K8s", "Terraform", "GitHub Actions"],
  },
  {
    id: "erp",
    title: "Enterprise ERP & SAP",
    desc: "Connect legacy databases, automate financial reconciliation, and remove manual audits.",
    icon: Layers,
    suggestedStack: ["SAP RFC / OData", "Python", "Kafka", "PostgreSQL"],
  },
];

const environments = [
  { id: "cloud", label: "Cloud Native", note: "AWS, GCP, or Azure multi-region" },
  { id: "hybrid", label: "Hybrid Enterprise", note: "Cloud + On-premise connection" },
  { id: "airgap", label: "Air-Gapped & Offline", note: "100% private on-prem, zero internet calls" },
];

const timelines = [
  { id: "fast", label: "4–6 Weeks", tier: "Production MVP", desc: "Fast-track core features & initial user testing" },
  { id: "standard", label: "8–12 Weeks", tier: "Enterprise Scale", desc: "Full feature suite, pentests & load testing" },
  { id: "dedicated", label: "Ongoing", tier: "Dedicated Pod", desc: "Continuous sprint delivery with assigned senior engineers" },
];

export function ProjectConfigurator() {
  const [selectedObjective, setSelectedObjective] = useState<string>("ai");
  const [selectedEnv, setSelectedEnv] = useState<string>("cloud");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("standard");

  const activeObjective = objectives.find((o) => o.id === selectedObjective) || objectives[0];
  const activeEnv = environments.find((e) => e.id === selectedEnv) || environments[0];
  const activeTimeline = timelines.find((t) => t.id === selectedTimeline) || timelines[1];

  // Dynamic team calculation
  const getTeamStructure = () => {
    if (selectedObjective === "ai") {
      return [
        "1 Senior AI / Systems Architect",
        "2 Senior Machine Learning & Full-Stack Engineers",
        selectedEnv === "airgap" ? "1 Air-Gap Security Specialist" : "1 Cloud & MLOps Engineer",
      ];
    }
    if (selectedObjective === "erp") {
      return [
        "1 Principal Enterprise Architect",
        "2 Senior Backend & SAP Integration Engineers",
        "1 Data Quality & QA Automation Engineer",
      ];
    }
    if (selectedObjective === "cloud") {
      return [
        "1 Lead DevOps & Infrastructure Architect",
        "2 Senior Site Reliability Engineers (SRE)",
        "1 Security & Compliance Auditor",
      ];
    }
    return [
      "1 Lead Product & Software Architect",
      "2 Senior Full-Stack Engineers (React/Node)",
      "1 UI/UX & QA Automation Engineer",
    ];
  };

  const team = getTeamStructure();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.04] overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-100 bg-slate-50/70 p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-[11px] font-semibold text-slate-700">
          <Sparkles className="h-3 w-3 text-cyan-600" />
          Interactive Architecture Estimator
        </div>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Configure your engineering scope in 30 seconds.
        </h3>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
          Select what you're planning to build to view the recommended team composition, production architecture stack, and sprint cadence.
        </p>
      </div>

      <div className="grid lg:grid-cols-12">
        {/* Left: 3-step configuration options */}
        <div className="lg:col-span-7 p-6 md:p-8 space-y-8 border-b lg:border-b-0 lg:border-r border-slate-100">
          {/* Step 1: Objective */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-900">
                1. Select Core System
              </span>
              <span className="text-[11px] text-slate-400 font-mono">What are you building?</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {objectives.map((obj) => {
                const isSelected = obj.id === selectedObjective;
                const ObjIcon = obj.icon;
                return (
                  <button
                    key={obj.id}
                    onClick={() => setSelectedObjective(obj.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ObjIcon
                        className={`h-4 w-4 shrink-0 ${isSelected ? "text-cyan-400" : "text-slate-500"}`}
                      />
                      <span className="font-display text-sm font-semibold truncate">
                        {obj.title}
                      </span>
                    </div>
                    <p
                      className={`mt-1.5 text-xs leading-relaxed line-clamp-2 ${
                        isSelected ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      {obj.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Deployment Environment */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-900">
                2. Deployment Environment
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Infrastructure target</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-2">
              {environments.map((env) => {
                const isSelected = env.id === selectedEnv;
                return (
                  <button
                    key={env.id}
                    onClick={() => setSelectedEnv(env.id)}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? "border-cyan-600 bg-cyan-50/40 text-slate-900 shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs font-semibold">{env.label}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 text-cyan-600" />}
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">{env.note}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Target Timeline */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-900">
                3. Delivery Cadence
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Target timeline</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-2">
              {timelines.map((time) => {
                const isSelected = time.id === selectedTimeline;
                return (
                  <button
                    key={time.id}
                    onClick={() => setSelectedTimeline(time.id)}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs font-semibold">{time.label}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                          isSelected ? "bg-slate-800 text-cyan-300" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {time.tier}
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-[11px] line-clamp-1 ${
                        isSelected ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      {time.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Live Blueprint & BD Handover Box */}
        <div className="lg:col-span-5 p-6 md:p-8 bg-slate-50/40 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-900">
                Generated Architecture Brief
              </span>
              <span className="font-mono text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                ● Live Estimate
              </span>
            </div>

            {/* Selected Spec Summary */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Selected System
              </div>
              <div className="font-display text-base font-bold text-slate-900">
                {activeObjective.title}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-mono">
                <span className="rounded bg-slate-100 px-2 py-0.5">{activeEnv.label}</span>
                <span>•</span>
                <span className="rounded bg-slate-100 px-2 py-0.5">{activeTimeline.label}</span>
              </div>
            </div>

            {/* Assigned Engineering Pod */}
            <div>
              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-slate-900 mb-2.5">
                <Users className="h-3.5 w-3.5 text-cyan-600" />
                <span>Dedicated Engineering Pod</span>
              </div>
              <div className="space-y-1.5">
                {team.map((member) => (
                  <div
                    key={member}
                    className="flex items-center gap-2 text-xs text-slate-700 bg-white border border-slate-150 rounded-lg px-3 py-2"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{member}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Stack */}
            <div>
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-900 mb-2">
                Recommended Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeObjective.suggestedStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] font-medium text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Guarantees */}
            <div className="rounded-xl border border-slate-150 bg-white p-3 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-cyan-600" />
                <span>100% full source code ownership on delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-cyan-600" />
                <span>Bi-weekly working production demos & clear SLAs</span>
              </div>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="mt-8 pt-4 border-t border-slate-200/80">
            <Link
              to="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg active:scale-[0.98]"
            >
              <span>Discuss This Scope With Our Engineers</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-2 text-center text-[11px] font-mono text-slate-400">
              Free architecture review • Response within 24 hours
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
