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
      { to: "/muavia", label: "Founder" },
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
    <footer className="relative border-t border-slate-800 bg-[#090D16] text-white">
      <div className="mx-auto grid max-w-[1360px] gap-12 px-6 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <span className="font-display text-[18px] font-bold tracking-tight text-white">NEURO</span>
            <span className="font-display text-[18px] font-medium tracking-tight text-slate-400">SYN</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Senior AI and software engineering consultancy building resilient digital products, cloud platforms, and intelligent automation systems.
          </p>
          <div className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-slate-500">
            <span>Software</span>
            <span>·</span>
            <span>AI</span>
            <span>·</span>
            <span>Cloud</span>
            <span>·</span>
            <span>Data</span>
            <span>·</span>
            <span>ERP</span>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.items.map((i) => (
                <li key={i.to}>
                  <Link
                    to={i.to}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-1">
          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
            Engage
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/contact" className="text-cyan-400 hover:text-cyan-300">
                Start a project →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-3 border-t border-slate-800/80 px-6 py-6 font-mono text-[11px] tracking-wider text-slate-500 md:flex-row md:items-center md:px-10">
        <p>© 2026 NEUROSYN. ALL RIGHTS RESERVED.</p>
        <p>ENTERPRISE SOFTWARE & AI ENGINEERING</p>
      </div>
    </footer>
  );
}
