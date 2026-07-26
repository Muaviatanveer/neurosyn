import { Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-[1280px] px-6 py-24 md:px-10 md:py-32 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <div className="inline-flex items-center gap-3">
      {index && (
        <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--text-muted)]">
          {index}
        </span>
      )}
      <span className="h-px w-8 bg-[var(--line-strong)]" />
      <span className="label-mono text-[var(--text-secondary)]">{children}</span>
    </div>
  );
}

export function CTAButton({
  to,
  children,
  variant = "primary",
  href,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  const base =
    "group inline-flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]";
  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:bg-[var(--quantum)] hover:text-[#09090B]"
      : "hairline text-foreground hover:border-[var(--line-strong)] hover:bg-[var(--surface)]";
  const inner = (
    <>
      <span>{children}</span>
      <span className="font-mono text-[10px] opacity-60 transition-transform duration-[180ms] group-hover:translate-x-0.5">
        →
      </span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={`${base} ${styles} rounded-[4px]`}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to ?? "/"} className={`${base} ${styles} rounded-[4px]`}>
      {inner}
    </Link>
  );
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Panel({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`panel relative overflow-hidden p-6 transition-all duration-[180ms] ease-out ${
        hover ? "hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)]" : ""
      } ${className}`}
    >
      {/* corner tick marks */}
      <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-[var(--line-strong)]" />
      <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-[var(--line-strong)]" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[var(--line-strong)]" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[var(--line-strong)]" />
      {children}
    </div>
  );
}

// Back-compat alias so pre-existing pages keep working
export const GlassCard = Panel;

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  index = "00",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  index?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      {eyebrow && (
        <Reveal>
          <div className="flex justify-center">
            <Eyebrow index={index}>{eyebrow}</Eyebrow>
          </div>
        </Reveal>
      )}
      <Reveal delay={1}>
        <h1 className="mt-8 text-balance font-display text-5xl font-medium leading-[1.02] tracking-[-0.03em] text-instrument md:text-7xl">
          {title}
        </h1>
      </Reveal>
      {subtitle && (
        <Reveal delay={2}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-[var(--text-secondary)]">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
