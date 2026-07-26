export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint opacity-70" />
      {/* Vignette — quiet depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, rgba(125,247,229,0.05), transparent 55%), radial-gradient(ellipse at 50% 120%, rgba(111,168,255,0.04), transparent 60%)",
        }}
      />
      {/* Edges — instrument frame */}
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--line-strong)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--line)]" />
    </div>
  );
}
