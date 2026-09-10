import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Database, Cpu, Plane, Sparkles, TrendingUp, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Reveal, Eyebrow, CTAButton } from "../components/site/ui";

export const Route = createFileRoute("/investors")({
  head: () => ({
    meta: [
      { title: "Investors & Strategic Partners — NeuroSyn" },
      {
        name: "description",
        content:
          "Partner with NeuroSyn to accelerate the next generation of enterprise AI operating systems, autonomous engineering platforms, and industrial diagnostics.",
      },
      { property: "og:title", content: "Invest in NeuroSyn" },
      {
        property: "og:description",
        content: "Building the future of enterprise intelligence.",
      },
    ],
  }),
  component: InvestorsPage,
});

const investmentThemes = [
  {
    icon: Database,
    title: "Enterprise ERP & SAP Intelligence",
    tag: "High-Moat Enterprise Software",
    desc: "Unlocking proprietary corporate telemetry inside SAP S/4HANA landscapes via secure protocol bridges, automating continuous audits and eliminating manual reconciliation.",
    stats: "$280B Addressable ERP Market",
  },
  {
    icon: Cpu,
    title: "Autonomous Developer Productivity",
    tag: "Developer Velocity & Agentic AI",
    desc: "Next-generation multi-agent reasoning graphs that automate code generation, Abstract Syntax Tree verification, and continuous security regression checks.",
    stats: "81% Token Compute Cost Savings",
  },
  {
    icon: Plane,
    title: "Industrial & Aerospace Diagnostics",
    tag: "Mission-Critical IoT",
    desc: "Physics-informed Bayesian diagnostic models converting high-frequency vibration and thermal telemetry into explainable fleet maintenance workflows.",
    stats: "99.4% Anomaly Precision Rate",
  },
  {
    icon: Sparkles,
    title: "Sovereign Air-Gapped AI",
    tag: "Regulated & Public Sector",
    desc: "Hardware-level isolated on-premise foundation model clusters purpose-engineered for defense, public sector, and healthcare data sovereignty.",
    stats: "Zero Cloud Egress Guarantee",
  },
];

function InvestorsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NETSOL Architectural Pinstripe Hero */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 py-20 md:px-10 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Strategic Capital & Partnerships</span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[1.08]">
            Building the future of enterprise{" "}
            <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
              intelligence.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            NeuroSyn is actively collaborating with institutional venture capital, enterprise strategic partners, and early design partners to accelerate sovereign AI operating systems.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[#1D81F2] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#156CD4] hover:shadow-xl hover:shadow-blue-500/35 active:scale-[0.98]"
            >
              <span>Connect with Founders</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Investment Themes Bento Grid */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1360px] grid gap-8 md:grid-cols-2">
          {investmentThemes.map((theme, i) => {
            const Icon = theme.icon;
            return (
              <Reveal key={theme.title} delay={i * 0.1}>
                <div className="rounded-[28px] border border-slate-200/85 bg-white p-8 lg:p-10 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-[#1D81F2]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1D81F2]">
                          {theme.tag}
                        </span>
                      </div>
                    </div>

                    <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                      {theme.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-slate-600">
                      {theme.desc}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-slate-100 pt-6 flex items-center justify-between">
                    <span className="rounded-lg border border-blue-100 bg-blue-50/60 px-3 py-1 font-mono text-xs font-semibold text-[#1D81F2]">
                      {theme.stats}
                    </span>
                    <Link
                      to="/contact"
                      className="group inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#1D81F2]"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Strategic Engagement Banner */}
      <section className="border-t border-slate-200 bg-[#0A0F1D] px-6 py-20 text-white md:px-10 md:py-24">
        <div className="mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-blue-400">
            <span className="h-3.5 w-1 rounded-full bg-[#1D81F2]" />
            <span>Partnership Inquiries</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Let's shape the enterprise intelligence landscape together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            We welcome conversations with institutional investors, venture partners, and enterprise software leaders.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton to="/contact">Request Executive Briefing</CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
