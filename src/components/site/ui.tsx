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
    <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
      <span className="h-3.5 w-1 rounded-full bg-[#1D81F2]" />
      {index && <span className="text-[#1D81F2]">{index} ·</span>}
      <span>{children}</span>
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
    "group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-200 active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-[#1D81F2] text-white shadow-lg shadow-blue-500/25 hover:bg-[#156CD4] hover:shadow-xl hover:shadow-blue-500/35"
      : "border border-slate-200 bg-white text-slate-800 shadow-xs hover:bg-slate-50 hover:border-slate-300";
  const inner = (
    <>
      <span>{children}</span>
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={`${base} ${styles}`}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to ?? "/"} className={`${base} ${styles}`}>
      {inner}
    </Link>
  );
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
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
      viewport={{ once: true, margin: "-60px" }}
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
      className={`relative overflow-hidden rounded-[24px] border border-slate-200/85 bg-white p-7 shadow-sm transition-all duration-300 ${
        hover ? "hover:border-slate-300 hover:shadow-xl hover:-translate-y-0.5" : ""
      } ${className}`}
    >
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
        <h1 className="mt-6 text-balance font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[1.08]">
          {title}
        </h1>
      </Reveal>
      {subtitle && (
        <Reveal delay={2}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-slate-600 sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

