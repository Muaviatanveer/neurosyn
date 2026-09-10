import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Shield, Cpu, Network, ArrowUpRight } from "lucide-react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  radius: number;
  label: string;
  role: string;
}

const SECTORS = [
  { name: "Enterprises", desc: "Autonomous core platforms & ERP orchestration" },
  { name: "Capital & Fintech", desc: "High-throughput sub-millisecond ledgers & audits" },
  { name: "Autonomous Logistics", desc: "Predictive supply chain routing & edge telematics" },
  { name: "Defense & Aerospace", desc: "Air-gapped mission systems with zero external leaks" },
  { name: "Health Systems", desc: "HIPAA-compliant document intelligence & diagnostics" },
];

export function ChromeMolecularCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSectorIdx, setActiveSectorIdx] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Sector auto-rotation every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSectorIdx((prev) => (prev + 1) % SECTORS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotX = 0.25;
    let rotY = 0.4;
    let targetRotX = 0.25;
    let targetRotY = 0.4;
    let isHovering = false;

    // Define 3D Chrome Molecular Structure (Center sphere + 4 outer satellite nodes)
    const d = 110;
    const baseNodes: Node3D[] = [
      { x: 0, y: 0, z: 0, radius: 36, label: "Core Kernel", role: "Central AI Orchestration" },
      { x: d * 0.9, y: -d * 0.4, z: d * 0.3, radius: 22, label: "AI Engine", role: "Autonomous Reasoning" },
      { x: -d * 0.85, y: -d * 0.35, z: -d * 0.4, radius: 20, label: "Edge Security", role: "Air-Gapped Enclave" },
      { x: d * 0.2, y: d * 0.85, z: -d * 0.5, radius: 23, label: "Data Pipeline", role: "Real-time Telemetry" },
      { x: -d * 0.3, y: d * 0.6, z: d * 0.8, radius: 21, label: "Cloud Mesh", role: "Distributed Resilience" },
    ];

    // Node connections (cylinders)
    const connections = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 3],
      [2, 4],
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotY = nx * 0.8;
      targetRotX = -ny * 0.6 + 0.25;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetRotX = 0.25;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    const render = (time: number) => {
      // High-DPI Canvas sizing
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = rect.width;
      const height = rect.height;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Auto slow rotation if not hovering
      if (!isHovering) {
        targetRotY += 0.004;
      }

      // Smooth damping
      rotX += (targetRotX - rotX) * 0.06;
      rotY += (targetRotY - rotY) * 0.06;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const fov = 450;
      const cx = width / 2;
      const cy = height / 2 - 10;

      // Project nodes to 2D
      const projected = baseNodes.map((n) => {
        // Rotate around Y
        const x1 = n.x * cosY - n.z * sinY;
        const z1 = n.x * sinY + n.z * cosY;

        // Rotate around X
        const y2 = n.y * cosX - z1 * sinX;
        const z2 = n.y * sinX + z1 * cosX;

        // Perspective projection
        const scale = fov / (fov + z2);
        return {
          ...n,
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          pz: z2,
          pRadius: n.radius * scale,
          scale,
        };
      });

      // Sort by Z for proper depth rendering
      const sortedNodes = [...projected].sort((a, b) => a.pz - b.pz);

      // Draw connecting chrome rods
      connections.forEach(([i1, i2]) => {
        const p1 = projected[i1];
        const p2 = projected[i2];

        // Linear gradient simulating chrome specular highlight along the rod
        const grad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
        grad.addColorStop(0, "rgba(160, 175, 195, 0.85)");
        grad.addColorStop(0.3, "rgba(255, 255, 255, 0.95)");
        grad.addColorStop(0.6, "rgba(140, 160, 185, 0.75)");
        grad.addColorStop(1, "rgba(180, 195, 215, 0.85)");

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(3.5, 5 * ((p1.scale + p2.scale) / 2));
        ctx.lineCap = "round";
        ctx.stroke();

        // Subtle rod shadow
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py + 1.5);
        ctx.lineTo(p2.px, p2.py + 1.5);
        ctx.strokeStyle = "rgba(15, 23, 42, 0.12)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Draw metallic chrome spheres
      sortedNodes.forEach((node) => {
        const { px, py, pRadius } = node;

        // Drop shadow under sphere
        const shadowGrad = ctx.createRadialGradient(
          px,
          py + pRadius * 0.3,
          pRadius * 0.4,
          px,
          py + pRadius * 0.5,
          pRadius * 1.3
        );
        shadowGrad.addColorStop(0, "rgba(15, 23, 42, 0.18)");
        shadowGrad.addColorStop(1, "rgba(15, 23, 42, 0)");
        ctx.fillStyle = shadowGrad;
        ctx.beginPath();
        ctx.arc(px, py + pRadius * 0.3, pRadius * 1.3, 0, Math.PI * 2);
        ctx.fill();

        // Chrome Base Gradient
        const chromeGrad = ctx.createRadialGradient(
          px - pRadius * 0.35,
          py - pRadius * 0.4,
          pRadius * 0.1,
          px,
          py,
          pRadius
        );
        chromeGrad.addColorStop(0, "#FFFFFF"); // Pure light reflection
        chromeGrad.addColorStop(0.2, "#E2E8F0"); // Light chrome
        chromeGrad.addColorStop(0.5, "#94A3B8"); // Midtone brushed steel
        chromeGrad.addColorStop(0.85, "#475569"); // Deep reflection
        chromeGrad.addColorStop(1, "#1E293B"); // Rim shadow

        ctx.beginPath();
        ctx.arc(px, py, pRadius, 0, Math.PI * 2);
        ctx.fillStyle = chromeGrad;
        ctx.fill();

        // Secondary Sky Reflection (Blue ambient bounce like NETSOL)
        const skyGrad = ctx.createRadialGradient(
          px + pRadius * 0.25,
          py + pRadius * 0.3,
          pRadius * 0.05,
          px + pRadius * 0.2,
          py + pRadius * 0.25,
          pRadius * 0.8
        );
        skyGrad.addColorStop(0, "rgba(29, 129, 242, 0.35)");
        skyGrad.addColorStop(0.6, "rgba(29, 129, 242, 0.1)");
        skyGrad.addColorStop(1, "rgba(29, 129, 242, 0)");

        ctx.beginPath();
        ctx.arc(px, py, pRadius, 0, Math.PI * 2);
        ctx.fillStyle = skyGrad;
        ctx.fill();

        // Crisp Pinpoint Specular Glint
        const glintGrad = ctx.createRadialGradient(
          px - pRadius * 0.38,
          py - pRadius * 0.42,
          0,
          px - pRadius * 0.38,
          py - pRadius * 0.42,
          pRadius * 0.35
        );
        glintGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        glintGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.4)");
        glintGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.arc(px - pRadius * 0.38, py - pRadius * 0.42, pRadius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = glintGrad;
        ctx.fill();

        // Outer precision stroke rim
        ctx.beginPath();
        ctx.arc(px, py, pRadius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const activeSector = SECTORS[activeSectorIdx];

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center select-none"
    >
      {/* NETSOL-Inspired Architectural Backdrop Panel with linear pinstripes */}
      <div className="relative w-full max-w-[500px] h-[440px] rounded-[32px] overflow-hidden border border-indigo-100/80 bg-gradient-to-br from-[#F4F6FF] via-[#EEF2FF] to-[#E5EDFF] p-6 shadow-xl shadow-indigo-950/5">
        
        {/* Background Vertical Mint/Teal Architectural Pinstripes (NETSOL exact touch) */}
        <div className="pointer-events-none absolute inset-0 opacity-40 netsol-pinstripes" />
        <div className="pointer-events-none absolute top-4 right-4 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-4 left-4 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl" />

        {/* Top Status Indicators */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3 py-1 text-[11px] font-mono font-semibold text-[#1D81F2] backdrop-blur-md shadow-xs">
            <span className="h-2 w-2 rounded-full bg-[#1D81F2] animate-pulse" />
            LIVE KERNEL MESH
          </div>
          <div className="text-[11px] font-mono text-slate-600 bg-white/60 px-2.5 py-1 rounded-md border border-slate-200/60 backdrop-blur-sm">
            440Hz Telemetry
          </div>
        </div>

        {/* 3D Chrome Molecular Canvas */}
        <div className="relative h-[290px] w-full cursor-grab active:cursor-grabbing">
          <canvas
            ref={canvasRef}
            className="h-full w-full block"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Dynamic Sector Tag Underneath (NETSOL exact style: big bold blue rotating title) */}
        <div className="relative z-10 text-center -mt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="space-y-0.5"
            >
              <h4 className="font-display text-2xl font-bold tracking-tight text-[#1D81F2]">
                {activeSector.name}
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto truncate font-medium">
                {activeSector.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Sector Dots Selector */}
        <div className="relative z-10 mt-3 flex items-center justify-center gap-1.5">
          {SECTORS.map((s, idx) => (
            <button
              key={s.name}
              onClick={() => setActiveSectorIdx(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSectorIdx === idx ? "w-6 bg-[#1D81F2]" : "w-1.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Select ${s.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
