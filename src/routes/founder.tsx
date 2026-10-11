import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Mail,
  Phone,
  Download,
  Send,
  Sparkles,
  Calendar,
  Clock,
  Award,
  BookOpen,
  Trophy,
  GraduationCap,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Reveal } from "../components/site/ui";
import { askMuavia } from "../lib/muavia-ai";
import { requestMeeting } from "../lib/muavia-booking";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Hon. Dr. Muavia Tanveer Khan — Founder & Lead Architect, NeuroSyn AI" },
      {
        name: "description",
        content:
          "Honorary Doctorate in Artificial Intelligence & Computer Sciences, Honoris Causa. Record Holder in Asia Book of Records. Founder & Lead Architect of NeuroSyn AI.",
      },
      { property: "og:title", content: "Hon. Dr. Muavia Tanveer Khan — Founder & Lead Architect, NeuroSyn AI" },
      {
        property: "og:description",
        content:
          "Honorary Doctorate in Artificial Intelligence & Computer Sciences, Honoris Causa. Record Holder in Asia Book of Records. Founder & Lead Architect of NeuroSyn AI.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:image", content: "/muavia.jpeg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/muavia.jpeg" },
    ],
  }),
  component: FounderPage,
});

/* ═══════════════════════════════════════════════════════════════════════════
   1. HERO
   ═══════════════════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 py-20 md:px-10 md:py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-25 netsol-pinstripes" />
      <div className="relative mx-auto max-w-[1360px]">
        <div className="grid gap-14 lg:grid-cols-12 items-center">
          {/* Portrait */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <Reveal>
              <div className="relative mx-auto max-w-[420px]">
                <div className="rounded-[28px] overflow-hidden border border-slate-200 bg-white p-3 shadow-xl">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-slate-100">
                    <img
                      src="/muavia.jpeg"
                      alt="Hon. Dr. Muavia Tanveer Khan, Founder of NeuroSyn AI"
                      className="h-full w-full object-cover object-top"
                      loading="eager"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/muavia-portrait.png";
                      }}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent p-5">
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white/90">
                        <span className="font-bold">HON. DR. M. TANVEER KHAN</span>
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                          ASIA BOOK OF RECORDS
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Corner accent */}
                <div className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-[#1D81F2] shadow-lg shadow-blue-500/30" />
              </div>
            </Reveal>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
                <span>Founder & Lead Architect</span>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[58px] lg:leading-[1.08]">
                Hon. Dr. Muavia{" "}
                <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
                  Tanveer Khan
                </span>
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-5 space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-4 py-1.5 text-xs font-medium text-blue-700">
                  <GraduationCap className="h-3.5 w-3.5 text-[#1D81F2]" />
                  <span>Honorary Doctorate in Artificial Intelligence & Computer Sciences, Honoris Causa</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/80 px-3.5 py-1.5 text-xs font-semibold text-amber-800">
                    <Award className="h-3.5 w-3.5 text-amber-600" />
                    Record Holder in Asia Book of Records
                  </span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Engineering AI systems that transform research into
                production-ready intelligence. Building enterprise-grade
                cognitive architectures at NeuroSyn AI.
              </p>
            </Reveal>
            <Reveal delay={4}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#book"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#1D81F2] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#156CD4] hover:shadow-xl hover:shadow-blue-500/35 active:scale-[0.98]"
                >
                  <span>Book a Meeting</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-400 active:scale-[0.98]"
                >
                  Explore NeuroSyn
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. RECOGNITION & HONORS
   ═══════════════════════════════════════════════════════════════════════════ */

const recognitions = [
  {
    icon: Award,
    badge: "Honor 01",
    title: "Record Holder in Asia Book of Records",
    subtitle: "Official Record Holder",
    description:
      "Honored as an official record holder in the Asia Book of Records for breakthrough innovations and system architectures in artificial intelligence.",
    accentColor: "text-amber-600",
    accentBg: "bg-amber-50 border-amber-100",
  },
  {
    icon: GraduationCap,
    badge: "Honor 02",
    title: "Honorary Doctorate in AI & Computer Sciences",
    subtitle: "Doctoral Honoris Causa",
    description:
      "Conferred Honorary Doctorate in Artificial Intelligence & Computer Sciences (Honoris Causa) for foundational research, multi-agent frameworks, and technological leadership.",
    accentColor: "text-[#1D81F2]",
    accentBg: "bg-blue-50 border-blue-100",
  },
  {
    icon: Trophy,
    badge: "Honor 03",
    title: "International Hackathon Winner",
    subtitle: "Technology competition recognition",
    description:
      "Victorious in international competitive hackathons and engineering tournaments, building enterprise-grade generative intelligence under rapid deployment constraints.",
    accentColor: "text-emerald-600",
    accentBg: "bg-emerald-50 border-emerald-100",
  },
  {
    icon: BookOpen,
    badge: "Honor 04",
    title: "IJAIKE — Research Scientist & Readers Committee",
    subtitle: "Academic research and peer-review contributions",
    description:
      "Active member of the Readers Committee and Research Scientist contributor to scholarly publications, peer-review juries, and scientific research methodologies.",
    accentColor: "text-purple-600",
    accentBg: "bg-purple-50 border-purple-100",
  },
];

function Recognition() {
  return (
    <section className="border-t border-slate-200 bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1360px]">
        <div className="max-w-2xl">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
              <span>Honors & Recognition</span>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
              Distinctions & academic{" "}
              <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
                contributions.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-3 text-base text-slate-600">
              Recognized internationally for engineering innovation, scholarly research, and competitive excellence.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {recognitions.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} delay={i * 0.08}>
                <div className="group h-full rounded-[24px] border border-slate-200/85 bg-white p-8 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${r.accentBg}`}>
                        <Icon className={`h-5.5 w-5.5 ${r.accentColor}`} />
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D81F2]">
                        {r.badge}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                      {r.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#1D81F2]">
                      {r.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {r.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <CheckCircle2 className="h-4 w-4 text-[#1D81F2]" />
                    <span>Verified Credential</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. ABOUT
   ═══════════════════════════════════════════════════════════════════════════ */

function About() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28 bg-white">
      <div className="mx-auto max-w-[1360px] grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
              <span>About</span>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              About Hon. Dr. Muavia Tanveer Khan
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal delay={2}>
            <div className="space-y-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              <p>
                I founded NeuroSyn AI with a simple belief: artificial
                intelligence should function as dependable infrastructure rather
                than isolated tools. My work focuses on architecting
                enterprise-grade AI operating systems that combine reasoning,
                verification, memory, and automation into cohesive platforms
                capable of solving complex engineering and business challenges.
              </p>
              <p>
                Rather than building another chatbot, I design systems that
                integrate with real organisations, enabling intelligent
                decision-making across software engineering, industrial
                diagnostics, enterprise operations, and research.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. PHILOSOPHY
   ═══════════════════════════════════════════════════════════════════════════ */

const philosophy = [
  { t: "Think Deeply", d: "Every intelligent system should reason before responding." },
  { t: "Engineer Reliability", d: "AI must be explainable, verifiable, and production-ready." },
  { t: "Build for Tomorrow", d: "Technology should outlive trends and become infrastructure." },
];

function Philosophy() {
  return (
    <section className="border-t border-slate-200 bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1360px]">
        <Reveal>
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Engineering Philosophy</span>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {philosophy.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08}>
              <div className="group h-full rounded-[24px] border border-slate-200/85 bg-white p-8 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl flex flex-col justify-between">
                <div>
                  <div className="font-display text-xl font-black text-[#1D81F2]">
                    0{i + 1}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-slate-950">
                    {p.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {p.d}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-[11px] font-semibold text-[#1D81F2]">
                  <span>Principle 0{i + 1}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. JOURNEY
   ═══════════════════════════════════════════════════════════════════════════ */

const journey = [
  { y: "2024", t: "Started building AI systems." },
  { y: "2024", t: "Founded NeuroSyn AI." },
  { y: "2025", t: "Developed enterprise multi-agent architecture." },
  { y: "2025", t: "Research collaborations." },
  { y: "2025", t: "International hackathons." },
  { y: "2026", t: "Building enterprise AI operating systems." },
];

function Journey() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28 bg-white">
      <div className="mx-auto max-w-[1360px]">
        <Reveal>
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Timeline</span>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            A short journey.
          </h2>
        </Reveal>

        <div className="mt-14 relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-3 bottom-3 w-px bg-slate-200 md:left-[120px]" />
          <div className="space-y-8">
            {journey.map((j, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="relative flex gap-6 md:gap-8 items-start">
                  <div className="hidden md:block w-[96px] text-right shrink-0">
                    <span className="font-mono text-xs font-bold text-[#1D81F2]">
                      {j.y}
                    </span>
                  </div>
                  <div className="relative shrink-0">
                    <span className="block h-3.5 w-3.5 rounded-full border-[3px] border-[#1D81F2] bg-white shadow-sm" />
                  </div>
                  <div className="pb-2">
                    <span className="md:hidden font-mono text-xs font-bold text-[#1D81F2]">
                      {j.y} —{" "}
                    </span>
                    <span className="font-display text-base font-semibold text-slate-900 sm:text-lg">
                      {j.t}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. FEATURED WORK
   ═══════════════════════════════════════════════════════════════════════════ */

const products = [
  { name: "NeuroSyn-SAP", tag: "Enterprise forensic intelligence.", to: "/products/sap" },
  { name: "NeuroSyn-Dev", tag: "Engineering Operating System.", to: "/products/dev" },
  { name: "NeuroSyn-Aero", tag: "Industrial AI.", to: "/products/aero" },
  { name: "NeuroSyn-Copilot", tag: "Enterprise Intelligence.", to: "/products/copilot" },
] as const;

function Featured() {
  return (
    <section className="border-t border-slate-200 bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1360px]">
        <Reveal>
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Featured Work</span>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <Link
                to={p.to}
                className="group h-full rounded-[24px] border border-slate-200/85 bg-white p-8 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{p.tag}</p>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-[#1D81F2]">
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. TECHNOLOGIES
   ═══════════════════════════════════════════════════════════════════════════ */

const tech = [
  "OpenAI", "Anthropic", "Google AI", "Python", "React", "Node",
  "Docker", "Neo4j", "MongoDB", "Ollama", "Qwen", "DeepSeek", "Azure", "AWS",
];

function Technologies() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28 bg-white">
      <div className="mx-auto max-w-[1360px]">
        <Reveal>
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Technologies</span>
          </div>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-3">
          {tech.map((t) => (
            <Reveal key={t}>
              <span className="rounded-full border border-slate-200 bg-slate-50/60 px-5 py-2.5 font-mono text-xs font-medium text-slate-700 transition-all hover:bg-[#1D81F2] hover:text-white hover:border-[#1D81F2] hover:shadow-md hover:shadow-blue-500/15">
                {t}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   8. ASK MUAVIA AI
   ═══════════════════════════════════════════════════════════════════════════ */

const suggested = [
  "What is NeuroSyn?",
  "What industries do you work with?",
  "Can Muavia build enterprise AI?",
  "Tell me about NeuroSyn-Aero.",
];

function AskMuavia() {
  const [q, setQ] = useState("");
  const [a, setA] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const submit = async (question: string) => {
    if (!question.trim() || loading) return;
    setLoading(true);
    setA("");
    try {
      const res = await askMuavia({ data: { question } });
      setA(res.answer);
    } catch {
      setA("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-t border-slate-200 bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1360px]">
        <div className="flex items-center gap-3">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
              <span>Ask Muavia AI</span>
            </div>
          </Reveal>
          <Sparkles className="h-4 w-4 text-[#1D81F2]" />
        </div>
        <Reveal delay={1}>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Ask anything about my work.
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-10 rounded-[28px] border border-slate-200/85 bg-white p-6 shadow-sm sm:p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(q);
              }}
              className="flex flex-col gap-3 md:flex-row"
            >
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="e.g. What is NeuroSyn-Aero?"
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm outline-none transition-all focus:border-[#1D81F2] focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#1D81F2] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-[#156CD4] hover:shadow-lg disabled:opacity-60"
              >
                {loading ? "Thinking…" : "Ask"}
                <Send className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              {suggested.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setQ(s);
                    submit(s);
                  }}
                  className="rounded-full border border-slate-200 bg-slate-50/60 px-3.5 py-1.5 text-xs font-medium text-slate-600 transition-all hover:bg-[#1D81F2] hover:text-white hover:border-[#1D81F2]"
                >
                  {s}
                </button>
              ))}
            </div>

            {(loading || a) && (
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/60 p-5">
                <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#1D81F2]">
                  MUAVIA AI · RESPONSE
                </div>
                {loading ? (
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1D81F2]" />
                    Reasoning…
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
                    {a}
                  </p>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   9. DOWNLOAD CV
   ═══════════════════════════════════════════════════════════════════════════ */

function CV() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28 bg-white">
      <div className="mx-auto max-w-[1360px]">
        <Reveal>
          <div className="rounded-[28px] border border-slate-200/85 bg-[#F8FAFC] p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
            <div className="pointer-events-none absolute inset-0 opacity-15 netsol-pinstripes" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
                <span>Curriculum Vitae</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Download Resume
              </h3>
              <p className="mt-1 font-mono text-xs text-slate-500 uppercase tracking-wider">
                Last Updated · June 2026
              </p>
            </div>
            <a
              href="/muavia-cv.pdf"
              download="Muavia_Tanveer_CV.pdf"
              className="relative z-10 group inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:bg-[#1D81F2] hover:text-white hover:border-[#1D81F2] hover:shadow-lg active:scale-[0.98]"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   10. CONNECT / SOCIALS
   ═══════════════════════════════════════════════════════════════════════════ */

const LinkedinIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.73v20.53C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.73C24 .78 23.2 0 22.22 0z"/></svg>
);
const GithubIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.26 5.69.41.36.78 1.06.78 2.14v3.18c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12.02C23.5 5.66 18.35.5 12 .5z"/></svg>
);
const XIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const socials = [
  { name: "LinkedIn", handle: "in/muavia-tanveer-9a6856328", href: "https://www.linkedin.com/in/muavia-tanveer-9a6856328/", Icon: LinkedinIcon },
  { name: "GitHub", handle: "@Muaviatanveer", href: "https://github.com/Muaviatanveer/Muaviatanveer", Icon: GithubIcon },
  { name: "X", handle: "@muaviakha83", href: "https://x.com/muaviakha83", Icon: XIcon },
  { name: "Email", handle: "muaviatanveer27@gmail.com", href: "mailto:muaviatanveer27@gmail.com", Icon: Mail },
  { name: "Call", handle: "Book a slot below", href: "#book", Icon: Phone },
];

function Connect() {
  return (
    <section className="border-t border-slate-200 bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1360px]">
        <Reveal>
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Connect</span>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {socials.map(({ name, handle, href, Icon }, i) => (
            <Reveal key={name} delay={i * 0.06}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-[20px] border border-slate-200/85 bg-white p-5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50/80 text-[#1D81F2] transition-colors group-hover:bg-[#1D81F2] group-hover:text-white group-hover:border-[#1D81F2]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-base font-semibold text-slate-900">{name}</div>
                  <div className="truncate font-mono text-xs text-slate-500">{handle}</div>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-300 transition-colors group-hover:text-[#1D81F2] shrink-0" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   11. BOOK MEETING
   ═══════════════════════════════════════════════════════════════════════════ */

const durations = ["15 minutes", "30 minutes", "60 minutes"];
const times = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

function BookMeeting() {
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState(durations[1]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", company: "", reason: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await requestMeeting({
        data: { ...form, duration, date, time },
      });
      if (res.success) setSent(true);
      else setError(res.error || "Failed to send request.");
    } catch {
      setError("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const stepLabels = ["Duration", "Date & Time", "Details"];

  return (
    <section id="book" className="scroll-mt-20 px-6 py-20 md:px-10 md:py-28 bg-white">
      <div className="mx-auto max-w-[1360px]">
        <div className="flex items-center gap-3">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
              <span>Book Meeting</span>
            </div>
          </Reveal>
          <Calendar className="h-4 w-4 text-[#1D81F2]" />
        </div>
        <Reveal delay={1}>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Reserve a private slot.
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-10 rounded-[28px] border border-slate-200/85 bg-[#F8FAFC] p-6 shadow-sm sm:p-10 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-15 netsol-pinstripes" />
            <div className="relative z-10">
              {sent ? (
                <div className="py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-[#1D81F2]">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-slate-950">Request received.</h3>
                  <p className="mt-2 text-slate-600">
                    You'll receive a confirmation shortly. I'll follow up personally.
                  </p>
                </div>
              ) : (
                <>
                  {/* Step indicator */}
                  <div className="mb-8 flex items-center gap-3 flex-wrap">
                    {stepLabels.map((l, i) => (
                      <div key={l} className="flex items-center gap-2">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                            step > i + 1
                              ? "bg-[#1D81F2] text-white"
                              : step === i + 1
                              ? "border-2 border-[#1D81F2] text-[#1D81F2]"
                              : "border-2 border-slate-200 text-slate-400"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className={`font-mono text-xs uppercase tracking-wider ${step === i + 1 ? "text-slate-900 font-bold" : "text-slate-400"}`}>
                          {l}
                        </span>
                        {i < stepLabels.length - 1 && <span className="h-px w-8 bg-slate-200" />}
                      </div>
                    ))}
                  </div>

                  {step === 1 && (
                    <div>
                      <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="h-4 w-4 text-[#1D81F2]" /> Select a duration
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        {durations.map((d) => (
                          <button
                            key={d}
                            onClick={() => setDuration(d)}
                            className={`rounded-2xl border p-6 text-left transition-all ${
                              duration === d
                                ? "border-[#1D81F2] bg-white shadow-md shadow-blue-500/10"
                                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                            }`}
                          >
                            <div className="font-display text-3xl font-bold text-slate-950">{d.split(" ")[0]}</div>
                            <div className="mt-1 font-mono text-xs uppercase tracking-wider text-slate-500">
                              Minutes
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="mt-8 flex justify-end">
                        <button
                          onClick={() => setStep(2)}
                          className="group inline-flex items-center gap-2 rounded-full bg-[#1D81F2] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-[#156CD4] active:scale-[0.98]"
                        >
                          Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="font-mono text-xs uppercase tracking-wider text-slate-500 font-semibold">
                            Select Date
                          </label>
                          <input
                            type="date"
                            value={date}
                            min={new Date().toISOString().slice(0, 10)}
                            onChange={(e) => setDate(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1D81F2] focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                        <div>
                          <label className="font-mono text-xs uppercase tracking-wider text-slate-500 font-semibold">
                            Select Time
                          </label>
                          <div className="mt-2 grid grid-cols-3 gap-2">
                            {times.map((t) => (
                              <button
                                key={t}
                                onClick={() => setTime(t)}
                                className={`rounded-xl border px-3 py-2.5 font-mono text-sm transition-all ${
                                  time === t
                                    ? "border-[#1D81F2] bg-blue-50 text-[#1D81F2] font-bold"
                                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 flex justify-between">
                        <button
                          onClick={() => setStep(1)}
                          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                          Back
                        </button>
                        <button
                          onClick={() => setStep(3)}
                          disabled={!date || !time}
                          className="group inline-flex items-center gap-2 rounded-full bg-[#1D81F2] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-[#156CD4] disabled:opacity-50 active:scale-[0.98]"
                        >
                          Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <form onSubmit={submit}>
                      <div className="grid gap-4 md:grid-cols-2">
                        <BookField label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                        <BookField label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                        <BookField label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                        <div className="rounded-xl border border-slate-200 bg-blue-50/50 px-4 py-3">
                          <div className="font-mono text-[10px] uppercase tracking-wider text-[#1D81F2] font-semibold">
                            Summary
                          </div>
                          <div className="mt-1 font-mono text-sm text-slate-800 font-medium">
                            {duration} · {date} · {time}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="font-mono text-xs uppercase tracking-wider text-slate-500 font-semibold">
                          Reason
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={form.reason}
                          onChange={(e) => setForm({ ...form, reason: e.target.value })}
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1D81F2] focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                      {error && <p className="mt-3 text-sm text-red-600 font-medium">{error}</p>}
                      <div className="mt-8 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="group inline-flex items-center gap-2 rounded-full bg-[#1D81F2] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-[#156CD4] disabled:opacity-60 active:scale-[0.98]"
                        >
                          {loading ? "Sending…" : "Submit Request"}
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BookField({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-xs uppercase tracking-wider text-slate-500 font-semibold">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1D81F2] focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   12. BOTTOM CTA
   ═══════════════════════════════════════════════════════════════════════════ */

function BottomCTA() {
  return (
    <section className="border-t border-slate-800 bg-[#0A0F1D] px-6 py-20 text-white md:px-10 md:py-28 overflow-hidden relative">
      <div className="pointer-events-none absolute inset-0 opacity-15 netsol-pinstripes" />
      <div className="mx-auto max-w-[900px] text-center relative">
        <Reveal>
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-blue-400">
            <span className="h-3.5 w-1 rounded-full bg-[#1D81F2]" />
            <span>Let's Connect</span>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Let's build something{" "}
            <span className="text-[#1D81F2] underline decoration-blue-400/40 underline-offset-8">
              meaningful.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-5 max-w-xl text-base text-slate-400">
            Whether it's a technical collaboration, research partnership, or enterprise AI engagement — I'm always open to conversations that push the boundary.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#book"
              className="group inline-flex items-center gap-3 rounded-full bg-[#1D81F2] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#156CD4] hover:shadow-xl hover:shadow-blue-500/35 active:scale-[0.98]"
            >
              <span>Book a Meeting</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
            <a
              href="mailto:muaviatanveer27@gmail.com"
              className="rounded-full border border-slate-700 bg-slate-800/80 px-8 py-4 text-sm font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:border-slate-600 active:scale-[0.98]"
            >
              <Mail className="inline h-4 w-4 mr-2" />
              Email Muavia
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE ASSEMBLY
   ═══════════════════════════════════════════════════════════════════════════ */

function FounderPage() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const a = t.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Hero />
      <Recognition />
      <About />
      <Philosophy />
      <Journey />
      <Featured />
      <Technologies />
      <AskMuavia />
      <CV />
      <Connect />
      <BookMeeting />
      <BottomCTA />
    </div>
  );
}
