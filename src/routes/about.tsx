import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHeader, Reveal, GlassCard, Eyebrow, CTAButton } from "../components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NeuroSyn" },
      { name: "description", content: "NeuroSyn engineers production-grade AI operating systems for the modern enterprise." },
      { property: "og:title", content: "About NeuroSyn" },
      { property: "og:description", content: "AI systems that work — engineered for enterprise reality." },
    ],
  }),
  component: AboutPage,
});

const timeline = ["Research", "Architecture", "Deployment", "Enterprise Integration", "Continuous Intelligence"];

function AboutPage() {
  return (
    <>
      <Section>
        <PageHeader
          eyebrow="About"
          title={
            <>
              We don't build AI chatbots.
              <br />
              <span className="text-brand-gradient">We build AI systems that work.</span>
            </>
          }
          subtitle="NeuroSyn develops production-grade AI platforms that integrate into existing enterprise workflows rather than replacing them. Every product is designed around explainability, reliability, and measurable business outcomes."
        />
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <GlassCard>
              <Eyebrow>Mission</Eyebrow>
              <p className="mt-4 text-lg text-foreground/90">
                Empower organizations with trustworthy AI systems that augment human expertise,
                streamline operations, and transform data into intelligent decisions through
                secure, explainable, production-ready technology.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={1}>
            <GlassCard>
              <Eyebrow>Vision</Eyebrow>
              <p className="mt-4 text-lg text-foreground/90">
                Become a global leader in enterprise artificial intelligence by building
                intelligent operating systems that redefine how businesses develop software,
                manage operations, and solve complex engineering problems.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-border">
        <Reveal><Eyebrow>How we build</Eyebrow></Reveal>
        <Reveal delay={1}>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold text-gradient md:text-5xl">
            From research to continuous intelligence.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-4 md:grid-cols-5">
          {timeline.map((step, i) => (
            <Reveal key={step} delay={i}>
              <div className="relative rounded-2xl border border-border bg-white/[0.02] p-6">
                <div className="font-display text-sm text-brand">0{i + 1}</div>
                <div className="mt-2 font-display text-lg font-semibold">{step}</div>
                {i < timeline.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-brand/40 to-transparent md:block" style={{ left: "100%", width: "24px" }} />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="glass rounded-3xl p-12 text-center md:p-16">
          <h2 className="font-display text-3xl font-semibold text-gradient md:text-4xl">
            Engineering intelligence for the modern enterprise.
          </h2>
          <div className="mt-6 flex justify-center gap-3">
            <CTAButton to="/products">See our products</CTAButton>
            <CTAButton to="/contact" variant="ghost">Contact us</CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}
