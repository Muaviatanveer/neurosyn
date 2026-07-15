import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-gradient-to-br from-brand via-accent to-brand-3" />
              <span className="font-display text-lg font-semibold">NeuroSyn</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              NeuroSyn builds enterprise AI operating systems that automate software engineering,
              enterprise operations, and industrial intelligence through secure, explainable, and
              production-ready artificial intelligence.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Products</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/products/sap" className="text-foreground/80 hover:text-foreground">NeuroSyn-SAP</Link></li>
              <li><Link to="/products/dev" className="text-foreground/80 hover:text-foreground">NeuroSyn-Dev</Link></li>
              <li><Link to="/products/aero" className="text-foreground/80 hover:text-foreground">NeuroSyn-Aero</Link></li>
              <li><Link to="/products/kids" className="text-foreground/80 hover:text-foreground">NeuroSyn-Kids</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="text-foreground/80 hover:text-foreground">About</Link></li>
              <li><Link to="/services" className="text-foreground/80 hover:text-foreground">Services</Link></li>
              <li><Link to="/technology" className="text-foreground/80 hover:text-foreground">Technology</Link></li>
              <li><Link to="/investors" className="text-foreground/80 hover:text-foreground">Investors</Link></li>
              <li><Link to="/contact" className="text-foreground/80 hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© 2026 NeuroSyn. All rights reserved.</p>
          <p>Engineering Enterprise Intelligence.</p>
        </div>
      </div>
    </footer>
  );
}
