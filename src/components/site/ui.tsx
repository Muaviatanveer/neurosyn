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
    <section id={id} className={`relative mx-auto w-full max-w-7xl px-6 py-24 md:py-32 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-glow" />
      {children}
    </div>
  );
}

export function CTAButton({
  to,
  children,
  variant = "primary",
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium transition-all";
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:bg-white/90 hover:-translate-y-0.5"
      : "border border-border bg-white/[0.03] text-foreground hover:bg-white/[0.06]";
  return (
    <Link to={to} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
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

export function GlassCard({
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
      className={`glass relative overflow-hidden rounded-2xl p-6 transition-all ${
        hover ? "hover:-translate-y-1 hover:border-white/20" : ""
      } ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={1}>
        <h1 className="mt-6 text-balance text-4xl font-semibold text-gradient md:text-6xl">{title}</h1>
      </Reveal>
      {subtitle && (
        <Reveal delay={2}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
