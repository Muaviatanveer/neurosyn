import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, Cloud, Code2, Database, Factory, Layers3, Sparkles, Star } from "lucide-react";
import { CTAButton, Reveal } from "../components/site/ui";
import { listTestimonials } from "../lib/testimonials.functions";

function Testimonials() {
  const load = useServerFn(listTestimonials);
  const { data } = useQuery({ queryKey: ["testimonials"], queryFn: () => load() });
  const list = (data?.testimonials ?? []).slice(0, 3);

  return (
    <section className="border-y border-[var(--line)] px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1360px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Label>Testimonials</Label>
            <h2 className="mt-6 font-display text-5xl font-medium md:text-7xl">What our partners say.</h2>
          </div>
          <Link to="/testimonials" className="inline-flex items-center gap-2 text-sm font-semibold">
            {list.length ? "Read all reviews" : "Leave a review"} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {list.length === 0 ? (
          <p className="mt-12 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
            Worked with NeuroSyn? Share your experience — approved reviews appear here.
          </p>
        ) : (
          <div className="mt-14 grid gap-px bg-[var(--line)] md:grid-cols-3">
            {list.map((t) => (
              <figure key={t.id} className="bg-background p-8">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[var(--brand)] text-[var(--brand)]" strokeWidth={1.5} />
                  ))}
                </div>
                <blockquote className="mt-6 text-lg leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium">{t.name}</span>
                  <span className="block text-[var(--text-muted)]">{[t.role, t.organization].filter(Boolean).join(" · ")}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI & Software Engineering Company — NeuroSyn" },
      { name: "description", content: "NeuroSyn designs, builds, deploys, and scales enterprise software, AI systems, cloud platforms, automation, and data products." },
      { property: "og:title", content: "NeuroSyn — AI & Software Engineering" },
      { property: "og:description", content: "We build intelligent software that moves businesses forward." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const services = [
  [Sparkles, "AI & Machine Learning", "Custom AI systems, LLM applications, retrieval systems, multi-agent workflows, and intelligent automation."],
  [Code2, "Software Development", "Web applications, SaaS platforms, enterprise systems, and custom software built for real operating environments."],
  [Cloud, "Cloud & DevOps", "Cloud architecture, deployment, CI/CD, infrastructure, and scalable backend systems."],
  [Database, "Data & Analytics", "Data platforms, dashboards, analytics pipelines, and intelligent decision systems."],
  [Factory, "Enterprise Solutions", "ERP and SAP integrations, workflow automation, and enterprise modernization."],
  [Layers3, "Product Engineering", "From idea and architecture to MVP, production deployment, and long-term development."],
] as const;

const advantages = [
  ["Full-Cycle Engineering", "Strategy, design, development, deployment, and maintenance under one accountable team."],
  ["AI-Native Expertise", "We architect AI where it creates measurable value—not as an add-on or a marketing feature."],
  ["Enterprise-Ready", "Security, scalability, integrations, and maintainability are designed in from day one."],
  ["Built Around Your Business", "Every solution is shaped around your workflows, users, systems, and objectives."],
];

const work = [
  ["Enterprise AI & SAP Intelligence", "Enterprise environment", "AI · SAP · Data · Automation", "Continuous audit and anomaly detection designed around existing finance workflows."],
  ["AI Engineering Platform", "Design-partner engagement", "AI · Software Engineering · Cloud", "Coordinated architecture, code verification, and deployment across hybrid environments."],
  ["Industrial Intelligence", "Aerospace and industrial systems", "Telemetry · ML · Digital Twins", "Physics-informed diagnostics that turn complex telemetry into explainable maintenance decisions."],
];

const products = [
  ["NeuroSyn-SAP", "Enterprise Intelligence", "/products/sap"],
  ["NeuroSyn-Dev", "AI Engineering", "/products/dev"],
  ["NeuroSyn-Aero", "Industrial Intelligence", "/products/aero"],
  ["NeuroSyn-Copilot", "Document & Repository Intelligence", "/products/copilot"],
] as const;

const industries = ["Financial Services", "Healthcare", "Education", "Manufacturing", "Aerospace & Defense", "Energy", "Government", "Technology"];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--brand)]">{children}</p>;
}

function Home() {
  return (
    <>
      <section className="border-b border-[var(--line)] px-6 pb-20 pt-20 md:px-10 md:pb-28 md:pt-28">
        <div className="mx-auto grid max-w-[1360px] gap-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal><Label>AI & Software Engineering Company</Label></Reveal>
            <Reveal delay={1}>
              <h1 className="mt-8 max-w-[950px] font-display text-[54px] font-medium leading-[0.98] md:text-[82px] lg:text-[104px]">
                We build software that moves businesses forward.
              </h1>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <Reveal delay={2}>
              <p className="max-w-xl text-[18px] leading-[1.65] text-[var(--text-secondary)]">
                NeuroSyn helps organizations design, build, deploy, and scale intelligent digital products—from enterprise platforms and automation systems to custom AI solutions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton to="/contact">Start a Project</CTAButton>
                <CTAButton to="/services" variant="ghost">Explore Our Services</CTAButton>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-[1360px] border-t border-[var(--line-strong)] pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
          AI Engineering · Software Development · Cloud · Automation · Data · Consulting
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-card px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-medium text-[var(--text-secondary)]">Organizations in our network and engagement history</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 font-display text-xl font-semibold text-foreground md:gap-x-16">
            <span>AAKS</span><span>IJAIKE</span><span>KSOL</span><span>Polarions</span>
          </div>
        </div>
      </section>

      <section id="services" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1360px]">
          <Reveal><Label>What we do</Label></Reveal>
          <div className="mt-6 grid gap-8 border-b border-[var(--line-strong)] pb-14 lg:grid-cols-2 lg:items-end">
            <Reveal delay={1}><h2 className="font-display text-5xl font-medium leading-[1.05] md:text-7xl">From strategy to production.</h2></Reveal>
            <Reveal delay={2}><p className="max-w-xl text-lg leading-relaxed text-[var(--text-secondary)] lg:justify-self-end">A senior engineering partner for software, AI, cloud, data, and enterprise modernization.</p></Reveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {services.map(([Icon, title, text], i) => (
              <Reveal key={title} delay={i * 0.4} className="border-b border-[var(--line)] lg:[&:not(:nth-child(3n))]:border-r lg:[&:nth-last-child(-n+3)]:border-b-0">
                <article className="group h-full p-7 transition-colors hover:bg-card md:p-9">
                  <Icon className="h-5 w-5 text-[var(--brand)]" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-10 text-2xl font-medium">{title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-24 text-primary-foreground md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1360px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Label>Why NeuroSyn</Label>
            <h2 className="mt-7 font-display text-5xl font-medium leading-[1.04] md:text-7xl">Engineering, not just outsourcing.</h2>
          </div>
          <div className="lg:col-span-7 lg:border-l lg:border-primary-foreground/20 lg:pl-14">
            {advantages.map(([title, text], i) => (
              <div key={title} className="grid gap-4 border-t border-primary-foreground/20 py-7 sm:grid-cols-[48px_1fr]">
                <span className="font-mono text-xs text-primary-foreground/50">0{i + 1}</span>
                <div><h3 className="text-xl font-medium">{title}</h3><p className="mt-2 max-w-xl leading-relaxed text-primary-foreground/70">{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1360px]">
          <div className="flex flex-col justify-between gap-8 border-b border-[var(--line-strong)] pb-12 md:flex-row md:items-end">
            <div><Label>Selected work</Label><h2 className="mt-6 font-display text-5xl font-medium md:text-7xl">What we've built.</h2></div>
            <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold">View all case studies <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div>
            {work.map(([title, context, tags, text], i) => (
              <article key={title} className="group grid gap-6 border-b border-[var(--line)] py-10 transition-colors hover:bg-card md:grid-cols-12 md:px-5">
                <div className="font-mono text-xs text-[var(--text-muted)] md:col-span-1">0{i + 1}</div>
                <div className="md:col-span-5"><h3 className="text-3xl font-medium">{title}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{context}</p></div>
                <p className="max-w-md leading-relaxed text-[var(--text-secondary)] md:col-span-4">{text}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--brand)] md:col-span-2 md:text-right">{tags}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />



      <section className="border-y border-[var(--line)] bg-card px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-[1360px] gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5"><Label>Industries</Label><h2 className="mt-6 font-display text-4xl font-medium md:text-6xl">Domain context matters.</h2><p className="mt-5 max-w-md leading-relaxed text-[var(--text-secondary)]">We design around the constraints, workflows, and standards of the environments where software must perform.</p></div>
          <div className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
            {industries.map((industry) => <div key={industry} className="flex items-center gap-3 border-t border-[var(--line)] py-5"><Check className="h-4 w-4 text-[var(--brand)]" /><span className="font-medium">{industry}</span></div>)}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1360px]">
          <div className="grid gap-8 lg:grid-cols-2"><div><Label>Proprietary technology</Label><h2 className="mt-6 font-display text-5xl font-medium md:text-7xl">We also build our own technology.</h2></div><p className="max-w-xl self-end text-lg leading-relaxed text-[var(--text-secondary)]">Beyond client engineering, NeuroSyn develops proprietary AI systems for complex enterprise and industrial problems.</p></div>
          <div className="mt-16 grid border-l border-t border-[var(--line)] md:grid-cols-2">
            {products.map(([name, type, to], i) => (
              <Link key={name} to={to} className="group border-b border-r border-[var(--line)] p-8 transition-colors hover:bg-card md:p-10">
                <span className="font-mono text-[10px] text-[var(--text-muted)]">0{i + 1}</span>
                <h3 className="mt-12 text-3xl font-medium">{name}</h3>
                <div className="mt-3 flex items-center justify-between text-[var(--text-secondary)]"><span>{type}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-24 text-primary-foreground md:px-10 md:py-32">
        <div className="mx-auto max-w-[1000px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary-foreground/60">Start a conversation</p>
          <h2 className="mt-7 font-display text-5xl font-medium leading-[1.04] md:text-7xl">Have a software challenge?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/70">Tell us what you're building. We'll help you define the technology, architecture, and path to production.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3"><Link to="/contact" className="rounded-[3px] bg-background px-6 py-3.5 text-sm font-semibold text-foreground">Start a Project</Link><Link to="/contact" className="rounded-[3px] border border-primary-foreground/30 px-6 py-3.5 text-sm font-semibold">Talk to Our Team</Link></div>
        </div>
      </section>
    </>
  );
}