import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/services", label: "Services" },
  { to: "/products", label: "Solutions" },
  { to: "/case-studies", label: "Work" },
  { to: "/industries", label: "Industries" },
  { to: "/technology", label: "Technology" },
  { to: "/about", label: "About" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="NeuroSyn home">
      <span className="font-display text-[17px] font-semibold">NEURO</span>
      <span className="font-display text-[17px] font-normal text-[var(--text-muted)]">SYN</span>
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-[220ms] ease-out ${
        scrolled
          ? "border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--background)_92%,transparent)] backdrop-blur-md"
          : "border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--background)_84%,transparent)] backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-2 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--text-secondary)] transition-colors duration-[120ms] hover:text-foreground"
              activeProps={{
                className:
                  "px-2 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-foreground",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden rounded-[3px] bg-primary px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-primary-foreground transition-opacity hover:opacity-90 lg:inline-block"
          >
            Let's Talk
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-[4px] border border-[var(--line-strong)] p-2 lg:hidden"
            aria-label="Menu"
          >
            <div className="h-4 w-5 space-y-[5px]">
              <span className="block h-px w-full bg-foreground" />
              <span className="block h-px w-full bg-foreground" />
              <span className="block h-px w-3/4 bg-foreground" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-[var(--line)] bg-background lg:hidden">
          <div className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-[var(--text-secondary)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-[4px] border border-[var(--line-strong)] py-2 text-center text-sm"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
