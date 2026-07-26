import { Link } from "@tanstack/react-router";

const columns = [
  {
    title: "Products",
    items: [
      { to: "/products/sap", label: "NeuroSyn-SAP" },
      { to: "/products/dev", label: "NeuroSyn-Dev" },
      { to: "/products/aero", label: "NeuroSyn-Aero" },
      { to: "/products/copilot", label: "NeuroSyn-Copilot" },
    ],
  },
  {
    title: "Company",
    items: [
      { to: "/about", label: "About" },
      { to: "/services", label: "Services" },
      { to: "/technology", label: "Technology" },
      { to: "/investors", label: "Investors" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Systems",
    items: [
      { to: "/industries", label: "Industries" },
      { to: "/case-studies", label: "Field Notes" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--line-strong)] bg-background">
      <div className="ticks-x border-b border-[var(--line)]" />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <svg width="22" height="22" viewBox="0 0 22 22" className="text-foreground">
              <rect x="0.5" y="0.5" width="21" height="21" rx="2" stroke="currentColor" strokeOpacity="0.35" fill="none" />
              <path d="M4 16 L4 6 L10 12 L10 6 M14 16 L14 6 L18 12" stroke="currentColor" strokeWidth="1.25" fill="none" strokeLinecap="square" />
            </svg>
            <span className="font-display text-[15px] font-medium tracking-tight">NEUROSYN</span>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
            An operating system for intelligence. Reasoning, structured as infrastructure.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--mint)] shadow-[0_0_8px_var(--mint)]" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)]">
              ALL SYSTEMS · OPERATIONAL
            </span>
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <h4 className="label-mono">{col.title}</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {col.items.map((i) => (
                <li key={i.to}>
                  <Link
                    to={i.to}
                    className="text-[var(--text-secondary)] transition-colors hover:text-foreground"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="md:col-span-1">
          <h4 className="label-mono">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link to="/contact" className="text-[var(--text-secondary)] hover:text-foreground">
                Request access
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-3 border-t border-[var(--line)] px-6 py-6 font-mono text-[11px] tracking-[0.14em] text-[var(--text-muted)] md:flex-row md:items-center md:px-10">
        <p>© 2026 NEUROSYN — ALL RIGHTS RESERVED</p>
        <p>ENGINEERING · ENTERPRISE · INTELLIGENCE</p>
      </div>
    </footer>
  );
}
