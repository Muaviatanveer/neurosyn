import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef, type PointerEvent } from "react";

/**
 * Computational Lattice — a quiet reasoning core.
 * A layered isometric lattice with slow orbital nodes, subtle cursor parallax,
 * and instrument-grade telemetry annotations. No spheres, no glow-blobs.
 */
export function NeuralSphere() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const rotY = useTransform(sx, [-1, 1], [-8, 8]);
  const rotX = useTransform(sy, [-1, 1], [6, -6]);

  const layers = useMemo(() => {
    // 3 concentric ring layers of nodes on an isometric-ish plane
    const out: { r: number; count: number; phase: number }[] = [
      { r: 70, count: 6, phase: 0 },
      { r: 130, count: 10, phase: 0.4 },
      { r: 195, count: 14, phase: 0.8 },
    ];
    return out;
  }, []);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative aspect-square w-full max-w-[560px]"
      style={{ perspective: 1200 }}
    >
      {/* Instrument frame */}
      <div className="absolute inset-0 hairline rounded-[8px]">
        {/* Corner brackets */}
        {[
          "left-2 top-2 border-l border-t",
          "right-2 top-2 border-r border-t",
          "left-2 bottom-2 border-l border-b",
          "right-2 bottom-2 border-r border-b",
        ].map((c, i) => (
          <span key={i} className={`absolute h-3 w-3 border-[var(--line-strong)] ${c}`} />
        ))}
        {/* Telemetry labels */}
        <div className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.18em] text-[var(--text-muted)]">
          CORE · 001
        </div>
        <div className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.18em] text-[var(--text-muted)]">
          LAT · 12ms
        </div>
        <div className="absolute left-4 bottom-4 font-mono text-[10px] tracking-[0.18em] text-[var(--text-muted)]">
          MODULES · 07
        </div>
        <div className="absolute right-4 bottom-4 font-mono text-[10px] tracking-[0.18em] text-[var(--mint)]">
          STATUS · NOMINAL
        </div>
      </div>

      {/* Scanning hairline */}
      <motion.div
        className="pointer-events-none absolute inset-x-6 top-6 h-px overflow-hidden opacity-70"
        style={{
          background: "linear-gradient(90deg, transparent, var(--quantum), transparent)",
        }}
        animate={{ y: [0, 480, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Lattice — parallax rig */}
      <motion.div
        className="absolute inset-0"
        style={{ rotateY: rotY, rotateX: rotX, transformStyle: "preserve-3d" }}
      >
        <motion.svg
          viewBox="-260 -260 520 520"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="node-core" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#F7F8FA" />
              <stop offset="60%" stopColor="#7DF7E5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7DF7E5" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="line-soft" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
            </linearGradient>
          </defs>

          {/* Reticle */}
          <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
            <line x1="-240" y1="0" x2="240" y2="0" />
            <line x1="0" y1="-240" x2="0" y2="240" />
            <circle cx="0" cy="0" r="240" fill="none" strokeDasharray="2 6" />
          </g>

          {/* Layer rings */}
          {layers.map((L, li) => (
            <g key={li}>
              <circle
                cx="0"
                cy="0"
                r={L.r}
                fill="none"
                stroke="url(#line-soft)"
                strokeWidth="1"
              />
              {Array.from({ length: L.count }).map((_, i) => {
                const a = (i / L.count) * Math.PI * 2 + L.phase;
                const x = Math.cos(a) * L.r;
                const y = Math.sin(a) * L.r;
                // connect to previous layer's nearest node
                const prev = layers[li - 1];
                const conn = prev
                  ? {
                      x: Math.cos(a) * prev.r,
                      y: Math.sin(a) * prev.r,
                    }
                  : null;
                return (
                  <g key={i}>
                    {conn && (
                      <line
                        x1={conn.x}
                        y1={conn.y}
                        x2={x}
                        y2={y}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1"
                      />
                    )}
                    <rect
                      x={x - 2}
                      y={y - 2}
                      width="4"
                      height="4"
                      fill="#F7F8FA"
                      opacity={0.85}
                    />
                  </g>
                );
              })}
            </g>
          ))}

          {/* Slow orbiting satellites */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {[0, 90, 180, 270].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <g key={deg} transform={`translate(${Math.cos(rad) * 235} ${Math.sin(rad) * 235})`}>
                  <circle r="3" fill="#7DF7E5" />
                  <circle r="8" fill="none" stroke="#7DF7E5" strokeOpacity="0.25" />
                </g>
              );
            })}
          </motion.g>

          {/* Core */}
          <circle cx="0" cy="0" r="42" fill="url(#node-core)" opacity="0.9" />
          <circle cx="0" cy="0" r="14" fill="#F7F8FA" />
          <circle cx="0" cy="0" r="24" fill="none" stroke="rgba(255,255,255,0.4)" />
          <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(125,247,229,0.35)" strokeDasharray="1 4" />
        </motion.svg>
      </motion.div>

      {/* Bottom telemetry strip */}
      <div className="absolute inset-x-6 bottom-14 flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] text-[var(--text-muted)]">
        <span className="h-1 w-1 rounded-full bg-[var(--quantum)]" />
        <span>REASONING · MEMORY · PLANNING · VISION · VERIFY</span>
      </div>
    </div>
  );
}
