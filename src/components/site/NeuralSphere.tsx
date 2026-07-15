import { motion } from "framer-motion";
import { useMemo } from "react";

export function NeuralSphere() {
  const nodes = useMemo(() => {
    const pts: { x: number; y: number; z: number }[] = [];
    const N = 60;
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(-1 + (2 * i) / N);
      const theta = Math.sqrt(N * Math.PI) * phi;
      pts.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
      });
    }
    return pts;
  }, []);

  const R = 180;
  return (
    <div className="relative flex h-[480px] w-full items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(79,140,255,0.25), transparent 60%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.svg
        viewBox="-250 -250 500 500"
        className="relative h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <radialGradient id="node-g" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#4f8cff" />
            <stop offset="100%" stopColor="#7c3aed" />
          </radialGradient>
          <linearGradient id="edge-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f8cff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {nodes.map((n, i) =>
          nodes.slice(i + 1).map((m, j) => {
            const d = Math.hypot(n.x - m.x, n.y - m.y, n.z - m.z);
            if (d > 0.6) return null;
            return (
              <line
                key={`${i}-${j}`}
                x1={n.x * R}
                y1={n.y * R}
                x2={m.x * R}
                y2={m.y * R}
                stroke="url(#edge-g)"
                strokeWidth={0.4}
              />
            );
          }),
        )}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x * R} cy={n.y * R} r={2 + (n.z + 1)} fill="url(#node-g)" opacity={0.4 + (n.z + 1) / 4} />
        ))}
      </motion.svg>
      {/* Orbiting particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-brand"
          style={{ boxShadow: "0 0 12px #4f8cff" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
        >
          <div style={{ transform: `translateX(${200 + i * 20}px)` }} className="h-2 w-2 rounded-full bg-brand" />
        </motion.div>
      ))}
    </div>
  );
}
