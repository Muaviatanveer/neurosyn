import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCode,
  GitBranch,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Clock,
  FileCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Interactive Delivery Timeline Stepper                              */
/* Replaces static text lists with a clickable 4-phase sprint roadmap */
/* ------------------------------------------------------------------ */

interface Phase {
  id: number;
  step: string;
  name: string;
  duration: string;
  icon: typeof FileCode;
  summary: string;
  deliverables: string[];
  clientCheckpoint: string;
}

const phases: Phase[] = [
  {
    id: 1,
    step: "01",
    name: "Discovery & Architecture",
    duration: "Weeks 1–2",
    icon: FileCode,
    summary:
      "Before writing a single line of production code, we lock in your architecture, data models, and API contracts so there are no surprises later.",
    deliverables: [
      "Production Architecture Blueprint & Tech Stack Lock",
      "Database Entity-Relationship (ERD) Schema",
      "OpenAPI / Swagger Contract Specification",
      "Interactive UX Wireframes & Design Tokens",
    ],
    clientCheckpoint: "Formal Architecture Sign-Off & Sprint Milestone Roadmap",
  },
  {
    id: 2,
    step: "02",
    name: "Core Engineering Sprints",
    duration: "Weeks 3–6",
    icon: GitBranch,
    summary:
      "Rapid bi-weekly development cycles. You get access to a live private staging environment with working software updated every sprint.",
    deliverables: [
      "Bi-weekly live staging releases with real functionality",
      "Automated unit & end-to-end test suite (>95% coverage)",
      "Continuous Integration (CI) build & verify pipelines",
      "Direct Slack / Discord sync with your lead engineers",
    ],
    clientCheckpoint: "Live Sprint Demo & Direct Staging Testing Every Two Weeks",
  },
  {
    id: 3,
    step: "03",
    name: "Security, Pentest & Load Testing",
    duration: "Weeks 7–8",
    icon: ShieldCheck,
    summary:
      "We stress-test your system against heavy load spikes, audit for vulnerabilities, and ensure enterprise compliance before going live.",
    deliverables: [
      "Automated vulnerability scan & static code analysis",
      "High-throughput load testing (simulate 10,000+ concurrent requests)",
      "Zero high-severity findings security certification",
      "Air-gap packaging & private network verification (if applicable)",
    ],
    clientCheckpoint: "Security Audit Report & Production Readiness Clearance",
  },
  {
    id: 4,
    step: "04",
    name: "Production Launch & Handover",
    duration: "Launch & Beyond",
    icon: Rocket,
    summary:
      "We launch your system to production with zero downtime and hand over 100% of the repository, credentials, and documentation to your team.",
    deliverables: [
      "Complete Git repository ownership transferred to your GitHub/GitLab",
      "Terraform / Kubernetes Infrastructure as Code scripts",
      "Complete developer onboarding & architecture documentation",
      "Post-launch monitoring, warranty & optional SLA support",
    ],
    clientCheckpoint: "Full Codebase Transfer & Final Production Verification",
  },
];

export function DeliveryTimelineStepper() {
  const [activePhase, setActivePhase] = useState<number>(1);

  const current = phases.find((p) => p.id === activePhase) || phases[0];
  const CurrentIcon = current.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xl shadow-slate-900/[0.03]">
      {/* Top Phase Selectors */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-slate-100 pb-6">
        {phases.map((phase) => {
          const isActive = phase.id === activePhase;
          const PhaseIcon = phase.icon;

          return (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`relative text-left p-3.5 rounded-xl border transition-all ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                  : "border-slate-200 bg-slate-50/60 text-slate-700 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-xs font-bold ${
                    isActive ? "text-cyan-400" : "text-slate-400"
                  }`}
                >
                  Phase {phase.step}
                </span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive ? "bg-slate-800 text-slate-300" : "bg-white text-slate-500 border border-slate-200"
                  }`}
                >
                  {phase.duration}
                </span>
              </div>
              <div className="mt-2 font-display text-sm font-semibold truncate">
                {phase.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Phase Deep Dive */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="pt-6 grid md:grid-cols-12 gap-8 items-start"
        >
          {/* Left summary */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-800">
                <CurrentIcon className="h-4 w-4 text-cyan-600" />
              </span>
              <span className="font-semibold text-slate-900 uppercase">
                Phase {current.step} — {current.duration}
              </span>
            </div>
            <h4 className="font-display text-2xl font-bold tracking-tight text-slate-950">
              {current.name}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {current.summary}
            </p>

            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-700">
                <FileCheck className="h-3.5 w-3.5 text-cyan-600" />
                <span>Client Milestone Checkpoint</span>
              </div>
              <div className="text-xs text-slate-900 font-medium pt-1">
                {current.clientCheckpoint}
              </div>
            </div>
          </div>

          {/* Right deliverables list */}
          <div className="md:col-span-7 bg-slate-50/50 border border-slate-150 rounded-xl p-5 md:p-6 space-y-3">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Tangible Sprint Artifacts Delivered
            </div>
            <div className="space-y-2.5">
              {current.deliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-slate-200/80 bg-white p-3 text-xs text-slate-800 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
