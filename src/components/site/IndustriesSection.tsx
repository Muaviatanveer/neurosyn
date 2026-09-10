import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { 
  Plane, 
  Factory, 
  HeartPulse, 
  Zap, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  Activity,
  Cpu,
  Radar
} from "lucide-react";
import { Reveal } from "./ui";

interface Industry {
  id: string;
  name: string;
  tagline: string;
  icon: typeof Plane;
  accentColor: string;
  metric: { label: string; value: string };
  capabilities: string[];
  telemetrySpec: string;
}

const INDUSTRIES: Industry[] = [
  {
    id: "aerospace",
    name: "Aerospace & Defense",
    tagline: "High-reliability avionics diagnostics and air-gapped fleet intelligence.",
    icon: Plane,
    accentColor: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-600",
    metric: { label: "Telemetry SLA", value: "<12ms Latency" },
    capabilities: [
      "Physics-informed sensor failure prediction",
      "Air-gapped on-premise model execution",
      "MIL-STD compliance data auditing"
    ],
    telemetrySpec: "AVIONICS_TELEMETRY: SENSOR_ARRAY_04 [STABLE]"
  },
  {
    id: "manufacturing",
    name: "Advanced Manufacturing",
    tagline: "Predictive sensor intelligence and real-time operational quality control.",
    icon: Factory,
    accentColor: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-600",
    metric: { label: "Unplanned Downtime", value: "-42% Reduction" },
    capabilities: [
      "Acoustic & thermal sensor anomaly detection",
      "Automated robotic visual quality inspection",
      "Real-time assembly line throughput balancing"
    ],
    telemetrySpec: "ASSEMBLY_LINE_09: ROBOTIC_FEED_ACTIVE [99.8%]"
  },
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    tagline: "Zero-leakage clinical intelligence and private medical search engines.",
    icon: HeartPulse,
    accentColor: "from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-600",
    metric: { label: "Data Leakage", value: "0% (HIPAA Compliant)" },
    capabilities: [
      "Private semantic query over clinical archives",
      "Automated medical record de-identification",
      "Secure diagnostic workflow orchestration"
    ],
    telemetrySpec: "CLINICAL_GATEWAY: ENCLAVE_ISOLATION_VERIFIED"
  },
  {
    id: "energy",
    name: "Energy & Critical Utilities",
    tagline: "Grid stability forecasting and predictive substation equipment maintenance.",
    icon: Zap,
    accentColor: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-600",
    metric: { label: "Grid Load Forecast", value: "98.9% Accuracy" },
    capabilities: [
      "High-frequency smart meter ingestion",
      "Transformer vibration & thermal risk modeling",
      "Distributed renewable dispatch optimization"
    ],
    telemetrySpec: "SUBSTATION_GRID: 50.02Hz FREQUENCY [SYNCED]"
  },
  {
    id: "finance",
    name: "Enterprise Finance & SAP",
    tagline: "Autonomous ledger anomaly detection and instant compliance reconciliation.",
    icon: Building2,
    accentColor: "from-indigo-500/20 to-violet-500/10 border-indigo-500/30 text-indigo-600",
    metric: { label: "Audit Turnaround", value: "10x Faster" },
    capabilities: [
      "Real-time SAP ECC & S/4HANA transactional stream",
      "Cross-border sanctions & AML pattern detection",
      "Automated financial close reconciliations"
    ],
    telemetrySpec: "ERP_STREAM: GENERAL_LEDGER_PARITY [VERIFIED]"
  }
];

export function IndustriesSection() {
  const [activeId, setActiveId] = useState<string>("aerospace");
  const activeIndustry = INDUSTRIES.find((i) => i.id === activeId) || INDUSTRIES[0];

  return (
    <section id="industries" className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 py-20 md:px-10 md:py-28 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full" />
      </div>

      <div className="relative mx-auto max-w-[1360px]">
        {/* Section Header (NETSOL Who We Serve Style) */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pb-6">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Global Industry Verticals</span>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl md:text-5xl">
            Who we{" "}
            <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
              serve.
            </span>
          </h2>
          <p className="text-base leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Orchestrating intelligence, resilience, and software excellence across mission-critical sectors — where failure is not an option and precision is paramount.
          </p>
        </div>

        {/* 5 Vertical Selector Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-3">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            const isSelected = activeId === ind.id;

            return (
              <button
                key={ind.id}
                onClick={() => setActiveId(ind.id)}
                className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#1D81F2] border-[#1D81F2] text-white shadow-lg shadow-blue-500/25 -translate-y-0.5"
                    : "bg-white hover:bg-slate-50/70 border-slate-200 text-slate-800"
                }`}
              >
                <div>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected ? "bg-white/20 text-white" : "bg-blue-50 text-[#1D81F2] border border-blue-100"
                  }`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="font-display font-bold text-sm">
                    {ind.name}
                  </div>
                </div>
                <div className={`mt-4 text-[11px] font-mono ${
                  isSelected ? "text-blue-100 font-semibold" : "text-slate-500 font-medium"
                }`}>
                  {ind.metric.value}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Vertical Deep Dive Showcase */}
        <div className="mt-8 rounded-[28px] border border-slate-200/85 bg-[#F8FAFC]/90 p-8 sm:p-12 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Description */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-semibold text-[#1D81F2] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                  {activeIndustry.name}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {activeIndustry.metric.label}: <strong className="text-slate-900 font-bold">{activeIndustry.metric.value}</strong>
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                {activeIndustry.tagline}
              </h3>

              <div className="space-y-2.5 pt-2">
                {activeIndustry.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#1D81F2] shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#1D81F2] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-blue-500/20 hover:bg-[#156CD4] transition-all active:scale-[0.98]"
                >
                  <span>Consult our {activeIndustry.name} architects</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Right Visual Telemetry Terminal Card */}
            <div className="lg:col-span-6">
              <div className="rounded-[22px] bg-[#0A0F1D] border border-slate-800 p-6 sm:p-7 text-slate-200 font-mono text-xs shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <Radar className="h-4 w-4 text-[#1D81F2] animate-spin" style={{ animationDuration: '6s' }} />
                    <span className="text-white font-semibold">NEUROSYN_ENTERPRISE_STREAM</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">● SECURE GATEWAY</span>
                </div>

                <div className="rounded-xl bg-slate-900/90 p-3.5 border border-slate-800 text-[11px] text-blue-300">
                  {activeIndustry.telemetrySpec}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="rounded-xl bg-slate-900 p-3.5 border border-slate-800">
                    <div className="text-slate-500 text-[10px] uppercase">Deployment Model</div>
                    <div className="text-white font-semibold text-xs mt-1">Air-Gapped Private Cloud</div>
                  </div>
                  <div className="rounded-xl bg-slate-900 p-3.5 border border-slate-800">
                    <div className="text-slate-500 text-[10px] uppercase">Fault Tolerance</div>
                    <div className="text-emerald-400 font-semibold text-xs mt-1">99.999% High Availability</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-3 flex items-center justify-between">
                  <span>Data Classification: Protected</span>
                  <span className="text-slate-300 font-semibold">Hardware Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
