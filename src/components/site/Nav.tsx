import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const links = [
  { to: "/services", label: "Services" },
  { to: "/products", label: "Solutions" },
  { to: "/case-studies", label: "Work" },
  { to: "/industries", label: "Industries" },
  { to: "/technology", label: "Technology" },
  { to: "/testimonials", label: "Reviews" },
  { to: "/about", label: "About" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="NeuroSyn home">
      <span className="font-display text-[18px] font-bold tracking-[-0.02em] text-slate-900">NEURO</span>
      <span className="font-display text-[18px] font-medium tracking-[-0.02em] text-slate-400">SYN</span>
      <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-slate-200 bg-white/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] backdrop-blur-md"
          : "border-b border-slate-200/80 bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-[1360px] items-center justify-between px-6 md:px-10">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-1.5 text-[13px] font-medium text-slate-600 transition-colors hover:text-slate-900 hover:bg-slate-100/70"
              activeProps={{
                className:
                  "rounded-md px-3 py-1.5 text-[13px] font-semibold text-slate-900 bg-slate-100/90",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="group hidden items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-[13px] font-medium text-white transition-all hover:bg-slate-800 lg:inline-flex"
          >
            <span>Let's Talk</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md border border-slate-200 p-2 text-slate-700 lg:hidden"
            aria-label="Toggle Menu"
          >
            <div className="h-4 w-5 space-y-[5px]">
              <span className="block h-0.5 w-full bg-slate-800" />
              <span className="block h-0.5 w-full bg-slate-800" />
              <span className="block h-0.5 w-3/4 bg-slate-800" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 shadow-xl lg:hidden">
          <div className="flex flex-col space-y-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-md bg-slate-900 py-2.5 text-center text-sm font-medium text-white"
            >
              <span>Let's Talk</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
