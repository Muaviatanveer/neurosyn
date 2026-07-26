import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Overview" },
  { to: "/products", label: "Products" },
  { to: "/technology", label: "Technology" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/case-studies", label: "Field Notes" },
  { to: "/about", label: "About" },
  { to: "/investors", label: "Investors" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <svg width="22" height="22" viewBox="0 0 22 22" className="text-foreground">
        <rect x="0.5" y="0.5" width="21" height="21" rx="2" stroke="currentColor" strokeOpacity="0.35" fill="none" />
        <path d="M4 16 L4 6 L10 12 L10 6 M14 16 L14 6 L18 12" stroke="currentColor" strokeWidth="1.25" fill="none" strokeLinecap="square" />
      </svg>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-[15px] font-medium tracking-tight">NEUROSYN</span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)]">OS/2.0</span>
      </div>
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
          ? "border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--background)_82%,transparent)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-3.5 md:px-10">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-[4px] px-3 py-1.5 text-[13px] text-[var(--text-secondary)] transition-colors duration-[120ms] hover:text-foreground"
              activeProps={{
                className:
                  "rounded-[4px] px-3 py-1.5 text-[13px] text-foreground bg-[var(--surface-2)]",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--mint)] shadow-[0_0_8px_var(--mint)] breathe" />
            <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--text-muted)]">
              SYS · ONLINE
            </span>
          </div>
          <Link
            to="/contact"
            className="hidden rounded-[4px] border border-[var(--line-strong)] px-4 py-2 text-[13px] font-medium text-foreground transition-all duration-[180ms] hover:bg-foreground hover:text-background lg:inline-block"
          >
            Request Access
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
              Request Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
