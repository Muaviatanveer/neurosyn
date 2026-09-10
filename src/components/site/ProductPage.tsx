import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";
import { Reveal, Eyebrow, CTAButton } from "./ui";

export interface ProductPageProps {
  eyebrow: string;
  name: string;
  tagline: string;
  description: ReactNode;
  demoVideoUrl?: string;
  features: string[];
  benefits: string[];
  extra?: { title: string; items: string[] }[];
  stats?: { k: string; v: string }[];
  status: string;
  cta: { label: string; to: string };
  industries?: string[];
}

export function ProductPage(p: ProductPageProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NETSOL Architectural Pinstripe Hero */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 py-20 md:px-10 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>{p.eyebrow}</span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-[1.08]">
            {p.name}
          </h1>
          <p className="mt-4 font-display text-xl font-medium text-[#1D81F2] sm:text-2xl">
            {p.tagline}
          </p>
          <div className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {p.description}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to={p.cta.to}
              className="group inline-flex items-center gap-3 rounded-full bg-[#1D81F2] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#156CD4] hover:shadow-xl hover:shadow-blue-500/35 active:scale-[0.98]"
            >
              <span>{p.cta.label}</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link
              to="/products"
              className="rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-300"
            >
              ← All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Demonstration Video if present */}
      {p.demoVideoUrl && (
        <section className="px-6 py-12 md:px-10">
          <div className="mx-auto max-w-[1100px] overflow-hidden rounded-[28px] border border-slate-200/85 bg-slate-950 p-2 shadow-2xl">
            <div className="aspect-video w-full overflow-hidden rounded-[22px] bg-black">
              <iframe
                src={p.demoVideoUrl}
                className="h-full w-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`${p.name} Demonstration Video`}
              />
            </div>
          </div>
        </section>
      )}

      {/* Quantified System Benchmarks */}
      {p.stats && (
        <section className="border-b border-slate-200 bg-[#F8FAFC] px-6 py-12 md:px-10">
          <div className="mx-auto max-w-[1280px] grid grid-cols-2 gap-4 md:grid-cols-4">
            {p.stats.map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-xs"
              >
                <div className="font-display text-3xl font-extrabold text-[#1D81F2] md:text-4xl">
                  {s.k}
                </div>
                <div className="mt-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-slate-600">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Capabilities & Business Value */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1360px] grid gap-12 lg:grid-cols-2">
          {/* Capabilities */}
          <div className="rounded-[28px] border border-slate-200/85 bg-white p-8 lg:p-12 shadow-sm">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#1D81F2]">
              <span className="h-3.5 w-1 rounded-full bg-[#1D81F2]" />
              <span>Core Capabilities</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              What the system delivers.
            </h2>
            <div className="mt-6 space-y-3">
              {p.features.map((f, i) => (
                <div
                  key={f}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-[#F8FAFC] p-4 text-sm text-slate-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1D81F2]" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Outcomes */}
          <div className="rounded-[28px] border border-slate-200/85 bg-white p-8 lg:p-12 shadow-sm">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#1D81F2]">
              <span className="h-3.5 w-1 rounded-full bg-[#1D81F2]" />
              <span>Business Impact</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Measurable ROI & operational value.
            </h2>
            <div className="mt-6 space-y-3">
              {p.benefits.map((b, i) => (
                <div
                  key={b}
                  className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/40 p-4 text-sm font-medium text-slate-800"
                >
                  <span className="font-mono text-sm font-bold text-[#1D81F2]">→</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Extra Tech Specifications */}
      {p.extra?.map((ex) => (
        <section key={ex.title} className="border-t border-slate-200 bg-[#F8FAFC] px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1360px]">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span className="h-3.5 w-1 rounded-full bg-[#1D81F2]" />
              <span>{ex.title}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {ex.items.map((it) => (
                <span
                  key={it}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-800 shadow-xs"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Target Industries */}
      {p.industries && (
        <section className="border-t border-slate-200 px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1360px]">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span className="h-3.5 w-1 rounded-full bg-[#1D81F2]" />
              <span>Target Environments</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {p.industries.map((ind) => (
                <div
                  key={ind}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-center text-sm font-semibold text-slate-800"
                >
                  {ind}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Status & Pilot Qualification Banner */}
      <section className="border-t border-slate-200 bg-[#0A0F1D] px-6 py-20 text-white md:px-10 md:py-24">
        <div className="mx-auto max-w-[960px] text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
            Current Deployment Status
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {p.status}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            Experience an architecture walkthrough or pilot evaluation of {p.name} tailored to your enterprise systems.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to={p.cta.to}
              className="group inline-flex items-center gap-3 rounded-full bg-[#1D81F2] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#156CD4] hover:shadow-xl active:scale-[0.98]"
            >
              <span>{p.cta.label}</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-slate-700 bg-slate-800/80 px-7 py-3.5 text-sm font-medium text-slate-200 transition-all hover:bg-slate-700"
            >
              Schedule Architecture Briefing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}