import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <motion.div
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(79,140,255,0.35), transparent 70%)" }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.28), transparent 70%)" }}
        animate={{ x: [0, -80, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(20,184,166,0.22), transparent 70%)" }}
        animate={{ x: [0, 40, 0], y: [0, -60, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
