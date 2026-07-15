import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/technology", label: "Technology" },
  { to: "/industries", label: "Industries" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/investors", label: "Investors" },
] as const;

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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative h-7 w-7">
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-brand via-accent to-brand-3" />
            <div className="absolute inset-[3px] rounded-[5px] bg-background" />
            <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white">N</div>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">NeuroSyn</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "px-3 py-2 text-sm text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden rounded-md border border-border bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-white/10 md:inline-block"
          >
            Book a Demo
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md border border-border p-2 md:hidden"
            aria-label="Menu"
          >
            <div className="h-4 w-5 space-y-1">
              <span className="block h-0.5 w-full bg-foreground" />
              <span className="block h-0.5 w-full bg-foreground" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur md:hidden">
          <div className="flex flex-col p-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 text-sm text-muted-foreground">
                {l.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 rounded-md bg-white/10 py-2 text-center text-sm">
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}
