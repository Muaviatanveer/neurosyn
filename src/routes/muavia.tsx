import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  Mail,
  Phone,
  Download,
  Send,
  Sparkles,
  Calendar,
  Clock,
} from "lucide-react";
import { Section, Reveal, Eyebrow, Panel } from "../components/site/ui";
import muaviaAsset from "../assets/muavia.jpeg.asset.json";
import { askMuavia } from "../lib/muavia-ai";
import { requestMeeting } from "../lib/muavia-booking";

export const Route = createFileRoute("/muavia")({
  head: () => ({
    meta: [
      { title: "Muavia Tanveer — Founder & Lead Architect, NeuroSyn AI" },
      {
        name: "description",
        content:
          "Founder & Lead Architect of NeuroSyn AI. Engineering AI systems that transform research into production-ready intelligence.",
      },
      { property: "og:title", content: "Muavia Tanveer — Founder, NeuroSyn AI" },
      {
        property: "og:description",
        content: "The founder office of Muavia Tanveer — meet the person behind NeuroSyn AI.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:image", content: muaviaAsset.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: muaviaAsset.url },
    ],
  }),
  component: MuaviaPage,
});

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0 blueprint opacity-40" />
      <ParticleField />
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-14 px-6 py-24 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow index="01">Founder Office · Private</Eyebrow>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-8 font-display text-5xl font-medium leading-[1.02] tracking-[-0.03em] text-instrument md:text-7xl">
              Muavia Tanveer
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-4 font-mono text-[12px] tracking-[0.22em] uppercase text-[var(--quantum)]">
              Founder &amp; Lead Architect · NeuroSyn AI
            </p>
          </Reveal>
          <Reveal delay={3}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
              Engineering AI systems that transform research into
              production-ready intelligence.
            </p>
          </Reveal>
          <Reveal delay={4}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#book"
                className="group inline-flex items-center gap-3 rounded-[4px] bg-foreground px-5 py-3 text-sm font-medium text-background transition-all duration-200 hover:bg-[var(--quantum)]"
              >
                Book a Meeting
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/"
                className="group inline-flex items-center gap-3 rounded-[4px] border border-[var(--line-strong)] px-5 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-[var(--surface)]"
              >
                Explore NeuroSyn
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={2}>
            <PortraitFrame />
          </Reveal>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-[var(--text-muted)]">
          <span className="font-mono text-[10px] tracking-[0.22em]">SCROLL</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function PortraitFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [20, -40]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[440px]">
      {/* Frame corners */}
      <span className="pointer-events-none absolute -left-2 -top-2 h-4 w-4 border-l border-t border-[var(--quantum)]" />
      <span className="pointer-events-none absolute -right-2 -top-2 h-4 w-4 border-r border-t border-[var(--quantum)]" />
      <span className="pointer-events-none absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-[var(--quantum)]" />
      <span className="pointer-events-none absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-[var(--quantum)]" />

      <motion.div
        style={{ y }}
        className="relative aspect-[4/5] overflow-hidden rounded-[6px] border border-[var(--line-strong)] bg-[var(--surface)]"
      >
        <img
          src={muaviaAsset.url}
          alt="Portrait of Muavia Tanveer, Founder of NeuroSyn AI"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
            <span>M · TANVEER</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--mint)] breathe" />
              AVAILABLE
            </span>
          </div>
        </div>
      </motion.div>

      <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
        <span>ID · 001</span>
        <span>LAHORE / GLOBAL</span>
      </div>
    </div>
  );
}

function ParticleField() {
  const nodes = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {nodes.map((_, i) => {
        const top = (i * 53) % 100;
        const left = (i * 71) % 100;
        return (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[var(--quantum)]"
            style={{ top: `${top}%`, left: `${left}%` }}
            animate={{ opacity: [0.15, 0.6, 0.15], y: [0, -12, 0] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.15 }}
          />
        );
      })}
    </div>
  );
}

/* ---------------- About ---------------- */

function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow index="02">About</Eyebrow>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-6 font-display text-4xl font-medium leading-tight tracking-[-0.02em] text-instrument md:text-5xl">
              About Muavia
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal delay={2}>
            <div className="space-y-6 text-[17px] leading-relaxed text-[var(--text-secondary)]">
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
    </Section>
  );
}

/* ---------------- Philosophy ---------------- */

const philosophy = [
  { t: "Think Deeply", d: "Every intelligent system should reason before responding." },
  { t: "Engineer Reliability", d: "AI must be explainable, verifiable, and production-ready." },
  { t: "Build for Tomorrow", d: "Technology should outlive trends and become infrastructure." },
];

function Philosophy() {
  return (
    <Section id="philosophy" className="!pt-0">
      <Reveal>
        <Eyebrow index="03">Philosophy</Eyebrow>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {philosophy.map((p, i) => (
          <Reveal key={p.t} delay={i}>
            <Panel className="!p-8">
              <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--quantum)]">
                0{i + 1}
              </div>
              <h3 className="mt-4 font-display text-2xl font-medium tracking-tight">{p.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                {p.d}
              </p>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Journey ---------------- */

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
    <Section id="journey" className="!pt-0">
      <Reveal>
        <Eyebrow index="04">Journey</Eyebrow>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-tight tracking-[-0.02em] text-instrument md:text-5xl">
          A short timeline.
        </h2>
      </Reveal>

      <div className="relative mt-14 grid gap-0 md:grid-cols-[120px_1fr]">
        <div className="hidden md:block" />
        <div className="relative">
          <div className="absolute left-[-1px] top-0 h-full w-px bg-[var(--line-strong)]" />
          <div className="space-y-10">
            {journey.map((j, i) => (
              <Reveal key={i} delay={i * 0.5}>
                <div className="relative pl-8">
                  <span className="absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full bg-[var(--quantum)] shadow-[0_0_12px_var(--quantum)]" />
                  <div className="flex flex-wrap items-baseline gap-4">
                    <span className="font-mono text-[11px] tracking-[0.22em] text-[var(--text-muted)]">
                      {j.y}
                    </span>
                    <span className="h-px w-8 bg-[var(--line-strong)]" />
                    <span className="font-display text-xl text-foreground">{j.t}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Featured Work ---------------- */

const products = [
  { name: "NeuroSyn-SAP", tag: "Enterprise forensic intelligence.", to: "/products/sap" },
  { name: "NeuroSyn-Dev", tag: "Engineering Operating System.", to: "/products/dev" },
  { name: "NeuroSyn-Aero", tag: "Industrial AI.", to: "/products/aero" },
  { name: "NeuroSyn-Copilot", tag: "Enterprise Intelligence.", to: "/products/copilot" },
] as const;

function Featured() {
  return (
    <Section id="work" className="!pt-0">
      <Reveal>
        <Eyebrow index="05">Featured Work</Eyebrow>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {products.map((p, i) => (
          <Reveal key={p.name} delay={i}>
            <Link
              to={p.to}
              className="panel group relative block overflow-hidden p-8 transition-all duration-200 hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)]"
            >
              <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-[var(--line-strong)]" />
              <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-[var(--line-strong)]" />
              <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[var(--line-strong)]" />
              <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[var(--line-strong)]" />

              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-medium tracking-tight">{p.name}</h3>
                <ArrowRight className="h-4 w-4 text-[var(--text-muted)] transition-all group-hover:translate-x-1 group-hover:text-[var(--quantum)]" />
              </div>
              <p className="mt-2 text-[15px] text-[var(--text-secondary)]">{p.tag}</p>
              <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--quantum)]">
                Learn More
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Recognition ---------------- */

const recognition = ["Research", "Hackathons", "Open Source", "Enterprise AI", "Speaking"];

function Recognition() {
  return (
    <Section id="recognition" className="!pt-0">
      <Reveal>
        <Eyebrow index="06">Recognition</Eyebrow>
      </Reveal>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {recognition.map((r, i) => (
          <Reveal key={r} delay={i}>
            <div className="hairline rounded-[4px] bg-[var(--surface)] px-5 py-6 text-center">
              <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--text-muted)]">
                0{i + 1}
              </div>
              <div className="mt-2 font-display text-lg text-foreground">{r}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Technologies ---------------- */

const tech = [
  "OpenAI", "Anthropic", "Google AI", "Python", "React", "Node",
  "Docker", "Neo4j", "MongoDB", "Ollama", "Qwen", "DeepSeek", "Azure", "AWS",
];

function Technologies() {
  return (
    <Section id="tech" className="!pt-0">
      <Reveal>
        <Eyebrow index="07">Technologies</Eyebrow>
      </Reveal>
      <div className="mt-10 flex flex-wrap gap-2">
        {tech.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03, duration: 0.4 }}
            className="hairline rounded-full bg-[var(--surface)] px-4 py-2 font-mono text-[12px] tracking-wide text-[var(--text-secondary)] transition-colors hover:border-[var(--quantum)] hover:text-[var(--quantum)]"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Ask Muavia AI ---------------- */

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
    <Section id="ask" className="!pt-0">
      <Reveal>
        <div className="flex items-center gap-3">
          <Eyebrow index="08">Ask Muavia AI</Eyebrow>
          <Sparkles className="h-3.5 w-3.5 text-[var(--quantum)]" />
        </div>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-tight tracking-[-0.02em] text-instrument md:text-5xl">
          Ask anything about my work.
        </h2>
      </Reveal>

      <Reveal delay={2}>
        <Panel className="mt-10 !p-6 md:!p-8">
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
              className="flex-1 rounded-[4px] border border-[var(--line-strong)] bg-[var(--surface-2)] px-4 py-3 text-[15px] outline-none transition focus:border-[var(--quantum)]"
            />
            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center justify-center gap-2 rounded-[4px] bg-[var(--quantum)] px-5 py-3 text-sm font-medium text-[#09090B] transition-all hover:opacity-90 disabled:opacity-60"
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
                className="hairline rounded-full px-3 py-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--quantum)] hover:text-[var(--quantum)]"
              >
                {s}
              </button>
            ))}
          </div>

          {(loading || a) && (
            <div className="mt-6 rounded-[4px] border border-[var(--line)] bg-[var(--surface-2)] p-5">
              <div className="mb-2 font-mono text-[10px] tracking-[0.22em] text-[var(--text-muted)]">
                MUAVIA AI · RESPONSE
              </div>
              {loading ? (
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--quantum)]" />
                  Reasoning…
                </div>
              ) : (
                <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-foreground">
                  {a}
                </p>
              )}
            </div>
          )}
        </Panel>
      </Reveal>
    </Section>
  );
}

/* ---------------- CV ---------------- */

function CV() {
  return (
    <Section id="cv" className="!pt-0">
      <Reveal>
        <Panel className="flex flex-col items-start justify-between gap-6 !p-8 md:flex-row md:items-center">
          <div>
            <Eyebrow index="09">Curriculum Vitae</Eyebrow>
            <h3 className="mt-4 font-display text-3xl font-medium tracking-tight">
              Download Resume
            </h3>
            <p className="mt-2 font-mono text-[11px] tracking-[0.22em] text-[var(--text-muted)]">
              LAST UPDATED · JUNE 2026
            </p>
          </div>
          <a
            href="mailto:muaviatanveer27@gmail.com?subject=CV%20Request%20—%20Muavia%20Tanveer"
            className="group inline-flex items-center gap-3 rounded-[4px] border border-[var(--line-strong)] px-5 py-3 text-sm font-medium text-foreground transition-all hover:bg-foreground hover:text-background"
          >
            <Download className="h-4 w-4" />
            Request CV
          </a>
        </Panel>
      </Reveal>
    </Section>
  );
}

/* ---------------- Connect ---------------- */

const socials = [
  { name: "LinkedIn", handle: "in/muavia-tanveer", href: "https://www.linkedin.com/", Icon: Linkedin },
  { name: "GitHub", handle: "@muaviatanveer", href: "https://github.com/", Icon: Github },
  { name: "X", handle: "@muaviatanveer", href: "https://x.com/", Icon: Twitter },
  { name: "Email", handle: "muaviatanveer27@gmail.com", href: "mailto:muaviatanveer27@gmail.com", Icon: Mail },
  { name: "Call", handle: "Book a slot below", href: "#book", Icon: Phone },
];

function Connect() {
  return (
    <Section id="connect" className="!pt-0">
      <Reveal>
        <Eyebrow index="10">Connect</Eyebrow>
      </Reveal>
      <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {socials.map(({ name, handle, href, Icon }, i) => (
          <Reveal key={name} delay={i}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="panel group flex items-center gap-4 !p-6 transition-all hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[4px] border border-[var(--line-strong)] bg-[var(--surface-2)] text-foreground transition-colors group-hover:border-[var(--quantum)] group-hover:text-[var(--quantum)]">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-display text-lg">{name}</div>
                <div className="font-mono text-[11px] text-[var(--text-muted)]">{handle}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-[var(--text-muted)] transition-all group-hover:translate-x-1 group-hover:text-[var(--quantum)]" />
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Book Meeting ---------------- */

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
    <Section id="book" className="!pt-0">
      <Reveal>
        <div className="flex items-center gap-3">
          <Eyebrow index="11">Book Meeting</Eyebrow>
          <Sparkles className="h-3.5 w-3.5 text-[var(--quantum)]" />
        </div>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-tight tracking-[-0.02em] text-instrument md:text-5xl">
          Reserve a private slot.
        </h2>
      </Reveal>

      <Reveal delay={2}>
        <Panel className="mt-10 !p-6 md:!p-10">
          {sent ? (
            <div className="py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--quantum)] text-[var(--quantum)]">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-2xl text-instrument">Request received.</h3>
              <p className="mt-2 text-[var(--text-secondary)]">
                You'll receive a confirmation shortly. I'll follow up personally.
              </p>
            </div>
          ) : (
            <>
              {/* Step indicator */}
              <div className="mb-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
                {stepLabels.map((l, i) => (
                  <div key={l} className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        step > i + 1
                          ? "border-[var(--quantum)] bg-[var(--quantum)] text-[#09090B]"
                          : step === i + 1
                          ? "border-[var(--quantum)] text-[var(--quantum)]"
                          : "border-[var(--line-strong)] text-[var(--text-muted)]"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={step === i + 1 ? "text-foreground" : "text-[var(--text-muted)]"}>
                      {l}
                    </span>
                    {i < stepLabels.length - 1 && <span className="h-px w-6 bg-[var(--line-strong)]" />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div>
                  <div className="mb-4 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Clock className="h-4 w-4" /> Select a duration
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    {durations.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`rounded-[4px] border p-6 text-left transition-all ${
                          duration === d
                            ? "border-[var(--quantum)] bg-[var(--surface-2)]"
                            : "border-[var(--line-strong)] hover:border-[var(--quantum)]"
                        }`}
                      >
                        <div className="font-display text-2xl">{d.split(" ")[0]}</div>
                        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                          Minutes
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 rounded-[4px] bg-foreground px-5 py-3 text-sm font-medium text-background hover:bg-[var(--quantum)]"
                    >
                      Continue <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                        Select Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        min={new Date().toISOString().slice(0, 10)}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-2 w-full rounded-[4px] border border-[var(--line-strong)] bg-[var(--surface-2)] px-4 py-3 text-sm outline-none focus:border-[var(--quantum)]"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                        Select Time
                      </label>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {times.map((t) => (
                          <button
                            key={t}
                            onClick={() => setTime(t)}
                            className={`rounded-[4px] border px-3 py-2 font-mono text-sm transition-all ${
                              time === t
                                ? "border-[var(--quantum)] bg-[var(--surface-2)] text-[var(--quantum)]"
                                : "border-[var(--line-strong)] hover:border-[var(--quantum)]"
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
                      className="rounded-[4px] border border-[var(--line-strong)] px-5 py-3 text-sm hover:bg-[var(--surface)]"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!date || !time}
                      className="inline-flex items-center gap-2 rounded-[4px] bg-foreground px-5 py-3 text-sm font-medium text-background hover:bg-[var(--quantum)] disabled:opacity-50"
                    >
                      Continue <ArrowRight className="h-4 w-4" />
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
                    <div className="rounded-[4px] border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3">
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                        Summary
                      </div>
                      <div className="mt-1 font-mono text-[12px] text-foreground">
                        {duration} · {date} · {time}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                      Reason
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      className="mt-2 w-full rounded-[4px] border border-[var(--line-strong)] bg-[var(--surface-2)] px-4 py-3 text-sm outline-none focus:border-[var(--quantum)]"
                    />
                  </div>
                  {error && <p className="mt-3 text-sm text-[var(--signal-error)]">{error}</p>}
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="rounded-[4px] border border-[var(--line-strong)] px-5 py-3 text-sm hover:bg-[var(--surface)]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded-[4px] bg-[var(--quantum)] px-5 py-3 text-sm font-medium text-[#09090B] hover:opacity-90 disabled:opacity-60"
                    >
                      {loading ? "Sending…" : "Submit Request"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </Panel>
      </Reveal>
    </Section>
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
      <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-[4px] border border-[var(--line-strong)] bg-[var(--surface-2)] px-4 py-3 text-sm outline-none focus:border-[var(--quantum)]"
      />
    </div>
  );
}

/* ---------------- QR Footer ---------------- */

function QRFooter() {
  return (
    <Section id="qr" className="!pt-0">
      <Reveal>
        <div className="hairline-strong rounded-[6px] bg-[var(--surface)] p-10 text-center md:p-16">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[var(--quantum)] text-[var(--quantum)]">
            <Sparkles className="h-4 w-4" />
          </div>
          <h3 className="mt-6 font-display text-3xl font-medium text-instrument md:text-4xl">
            Thanks for scanning.
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-[var(--text-secondary)]">
            Let's build something meaningful together.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-[4px] bg-foreground px-5 py-3 text-sm font-medium text-background hover:bg-[var(--quantum)]"
            >
              Book a Meeting <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="mailto:muaviatanveer27@gmail.com"
              className="inline-flex items-center gap-2 rounded-[4px] border border-[var(--line-strong)] px-5 py-3 text-sm font-medium hover:bg-[var(--surface-2)]"
            >
              <Mail className="h-4 w-4" /> Email Muavia
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- Page ---------------- */

function MuaviaPage() {
  useEffect(() => {
    // smooth anchor scrolling for in-page links
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
    <>
      <Hero />
      <About />
      <Philosophy />
      <Journey />
      <Featured />
      <Recognition />
      <Technologies />
      <AskMuavia />
      <CV />
      <Connect />
      <BookMeeting />
      <QRFooter />
    </>
  );
}
