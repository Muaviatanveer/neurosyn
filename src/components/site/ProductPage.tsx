import type { ReactNode } from "react";
import { Section, Reveal, Eyebrow, CTAButton, GlassCard } from "./ui";

export interface ProductPageProps {
  eyebrow: string;
  name: string;
  tagline: string;
  description: ReactNode;
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
    <>
      <Section>
        <Reveal><Eyebrow>{p.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={1}>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            <span className="text-gradient">{p.name}</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-4 max-w-3xl font-display text-2xl text-brand-gradient md:text-3xl">
            {p.tagline}
          </div>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-8 max-w-3xl space-y-4 text-lg text-muted-foreground">{p.description}</div>
        </Reveal>
        <Reveal delay={4}>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTAButton to={p.cta.to}>{p.cta.label}</CTAButton>
            <CTAButton to="/products" variant="ghost">← All products</CTAButton>
          </div>
        </Reveal>
      </Section>

      {p.stats && (
        <Section className="!py-10">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {p.stats.map((s) => (
              <div key={s.v} className="bg-background/80 p-6 text-center">
                <div className="font-display text-2xl font-semibold text-brand-gradient md:text-3xl">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal><Eyebrow>Capabilities</Eyebrow></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 font-display text-3xl font-semibold text-gradient md:text-4xl">
                What it delivers.
              </h2>
            </Reveal>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {p.features.map((f, i) => (
                <Reveal key={f} delay={i * 0.5}>
                  <div className="flex items-start gap-3 rounded-xl border border-border bg-white/[0.02] p-4 text-sm">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <span>{f}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <Reveal><Eyebrow>Business Value</Eyebrow></Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 font-display text-3xl font-semibold text-gradient md:text-4xl">
                Outcomes, not conversations.
              </h2>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {p.benefits.map((b, i) => (
                <Reveal key={b} delay={i * 0.5}>
                  <GlassCard className="!p-4">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-display text-brand">→</span>
                      {b}
                    </div>
                  </GlassCard>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {p.extra?.map((ex) => (
        <Section key={ex.title} className="border-t border-border">
          <Reveal><Eyebrow>{ex.title}</Eyebrow></Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {ex.items.map((it, i) => (
              <Reveal key={it} delay={i * 0.3}>
                <div className="rounded-full border border-border bg-white/[0.03] px-4 py-2 text-sm text-foreground/90">
                  {it}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      ))}

      {p.industries && (
        <Section className="border-t border-border">
          <Reveal><Eyebrow>Industries</Eyebrow></Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {p.industries.map((ind, i) => (
              <Reveal key={ind} delay={i * 0.4}>
                <GlassCard className="!p-4 text-center text-sm">{ind}</GlassCard>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <div className="glass rounded-3xl p-10 text-center md:p-16">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Current Status</div>
          <p className="mx-auto mt-4 max-w-2xl font-display text-2xl text-gradient md:text-3xl">{p.status}</p>
          <div className="mt-8 flex justify-center gap-3">
            <CTAButton to={p.cta.to}>{p.cta.label}</CTAButton>
            <CTAButton to="/contact" variant="ghost">Talk to our team</CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}
