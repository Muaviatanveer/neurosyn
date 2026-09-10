import { useEffect, useRef, useState } from "react";

export type ProductEngineId = "sap" | "dev" | "aero" | "copilot" | null;

interface GeometricCoreProps {
  activeEngine: ProductEngineId;
  onEngineSelect?: (id: ProductEngineId) => void;
}

// 3D coordinates for the 4 engine nodes on an orbital ring
const engineNodes = [
  { id: "sap", label: "SAP CORE", targetAngle: 0, color: "#0891B2", subtitle: "ERP Telemetry & Anomaly Gate" },
  { id: "dev", label: "DEV OS", targetAngle: Math.PI * 0.5, color: "#0891B2", subtitle: "Multi-Agent Code Synthesis" },
  { id: "aero", label: "AERO ML", targetAngle: Math.PI, color: "#0891B2", subtitle: "Physics-Informed Diagnostics" },
  { id: "copilot", label: "COPILOT", targetAngle: Math.PI * 1.5, color: "#0891B2", subtitle: "Air-Gapped Document Engine" },
];

// Particle system for ambient energy
interface Particle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  opacity: number;
  radiusOffset: number;
  yOffset: number;
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: 0.4 + Math.random() * 0.7,
    speed: 0.002 + Math.random() * 0.008,
    size: 0.5 + Math.random() * 1.5,
    opacity: 0.1 + Math.random() * 0.35,
    radiusOffset: Math.random() * 0.3,
    yOffset: (Math.random() - 0.5) * 0.4,
  }));
}

export function GeometricCore({ activeEngine }: GeometricCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameId = useRef<number | null>(null);
  const rotationY = useRef(0);
  const rotationX = useRef(0.4);
  const targetRotationY = useRef(0);
  const particles = useRef<Particle[]>(createParticles(30));
  const time = useRef(0);
  const pulsePhase = useRef(0);

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (activeEngine) {
      const match = engineNodes.find((n) => n.id === activeEngine);
      if (match) {
        targetRotationY.current = -match.targetAngle + Math.PI * 0.5;
      }
    }
  }, [activeEngine]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      if (!isVisible) {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      time.current += 0.016;
      pulsePhase.current += 0.02;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.38;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      if (activeEngine) {
        rotationY.current += (targetRotationY.current - rotationY.current) * 0.06;
      } else if (!reducedMotion) {
        rotationY.current += 0.004;
      }

      const rotY = rotationY.current;
      const rotXVal = rotationX.current;

      const project = (px: number, py: number, pz: number) => {
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = px * cosY + pz * sinY;
        const z1 = -px * sinY + pz * cosY;

        const cosX = Math.cos(rotXVal);
        const sinX = Math.sin(rotXVal);
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;

        const focalLength = 350;
        const scale = focalLength / (focalLength + z2);
        return { x: centerX + x1 * scale, y: centerY + y2 * scale, z: z2, scale };
      };

      // ---- Outer orbital ring — dashed, dark on light ----
      const segments = 72;
      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const pt = project(Math.cos(theta) * radius, 0, Math.sin(theta) * radius);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = "rgba(15, 23, 42, 0.12)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.lineDashOffset = -time.current * 15;
      ctx.stroke();
      ctx.setLineDash([]);

      // ---- Inner core ring ----
      const innerRadius = radius * 0.55;
      const innerPulse = 1 + Math.sin(pulsePhase.current * 1.5) * 0.03;
      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const r = innerRadius * innerPulse;
        const pt = project(Math.cos(theta) * r, 0, Math.sin(theta) * r);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = `rgba(8, 145, 178, ${0.18 + Math.sin(pulsePhase.current) * 0.08})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // ---- Second inner ring ----
      const innerRadius2 = radius * 0.3;
      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const pt = project(Math.cos(theta) * innerRadius2, 0, Math.sin(theta) * innerRadius2);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = "rgba(15, 23, 42, 0.07)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // ---- Central vertical axis spindle ----
      const topSpindle = project(0, -radius * 0.65, 0);
      const bottomSpindle = project(0, radius * 0.65, 0);
      const glowPulse = 0.5 + Math.sin(pulsePhase.current) * 0.25;
      const axisGrad = ctx.createLinearGradient(topSpindle.x, topSpindle.y, bottomSpindle.x, bottomSpindle.y);
      axisGrad.addColorStop(0, "rgba(8, 145, 178, 0.05)");
      axisGrad.addColorStop(0.5, `rgba(8, 145, 178, ${0.25 + glowPulse * 0.12})`);
      axisGrad.addColorStop(1, "rgba(8, 145, 178, 0.05)");
      ctx.beginPath();
      ctx.moveTo(topSpindle.x, topSpindle.y);
      ctx.lineTo(bottomSpindle.x, bottomSpindle.y);
      ctx.strokeStyle = axisGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // ---- Orbiting particles ----
      particles.current.forEach((p) => {
        p.angle += p.speed;
        const pRadius = radius * p.radius;
        const px = Math.cos(p.angle) * pRadius;
        const py = p.yOffset * radius * 0.3 * Math.sin(time.current * 0.5 + p.radiusOffset * 10);
        const pz = Math.sin(p.angle) * pRadius;
        const pt = project(px, py, pz);

        const depthOpacity = Math.max(0, Math.min(1, (pt.z + 200) / 400));
        const finalOpacity = p.opacity * depthOpacity * (0.7 + Math.sin(time.current * 2 + p.angle) * 0.3);

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, p.size * pt.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(8, 145, 178, ${finalOpacity})`;
        ctx.fill();
      });

      // ---- Engine nodes and spokes ----
      const centerPt = project(0, 0, 0);

      engineNodes.forEach((node, idx) => {
        const isActive = activeEngine === node.id;
        const px = Math.cos(node.targetAngle) * radius;
        const pz = Math.sin(node.targetAngle) * radius;
        const pt = project(px, 0, pz);

        // Energy pulse along spoke
        if (!reducedMotion) {
          const pulseT = (time.current * 0.8 + idx * 0.7) % 1;
          const pulsePx = centerPt.x + (pt.x - centerPt.x) * pulseT;
          const pulsePy = centerPt.y + (pt.y - centerPt.y) * pulseT;
          const pulseOpacity = Math.sin(pulseT * Math.PI) * (isActive ? 0.7 : 0.3);

          ctx.beginPath();
          ctx.arc(pulsePx, pulsePy, isActive ? 3 : 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(8, 145, 178, ${pulseOpacity})`;
          ctx.fill();
        }

        // Spoke line
        ctx.beginPath();
        ctx.moveTo(centerPt.x, centerPt.y);
        ctx.lineTo(pt.x, pt.y);
        ctx.strokeStyle = isActive
          ? `rgba(8, 145, 178, ${0.6 + Math.sin(pulsePhase.current * 2) * 0.15})`
          : "rgba(15, 23, 42, 0.1)";
        ctx.lineWidth = isActive ? 1.8 : 1;
        ctx.stroke();

        // Active node glow
        if (isActive) {
          const glowSize = 14 + Math.sin(pulsePhase.current * 3) * 3;
          const nodeGlow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, glowSize);
          nodeGlow.addColorStop(0, "rgba(8, 145, 178, 0.2)");
          nodeGlow.addColorStop(0.5, "rgba(8, 145, 178, 0.06)");
          nodeGlow.addColorStop(1, "transparent");
          ctx.fillStyle = nodeGlow;
          ctx.fillRect(pt.x - glowSize, pt.y - glowSize, glowSize * 2, glowSize * 2);

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 10 + Math.sin(pulsePhase.current * 2) * 2, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(8, 145, 178, 0.3)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Node point
        ctx.beginPath();
        const nodeSize = isActive ? 5 + Math.sin(pulsePhase.current * 3) * 0.8 : 3;
        ctx.arc(pt.x, pt.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? "#0891B2" : "rgba(15, 23, 42, 0.35)";
        ctx.fill();

        if (isActive) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
        }

        // Label
        ctx.font = `${isActive ? "bold " : ""}10px 'IBM Plex Mono', monospace`;
        ctx.fillStyle = isActive ? "#0F172A" : "rgba(15, 23, 42, 0.4)";
        const labelX = pt.x > centerPt.x ? pt.x + 14 : pt.x - ctx.measureText(node.label).width - 14;
        ctx.fillText(node.label, labelX, pt.y + 4);

        if (isActive) {
          ctx.font = "9px 'IBM Plex Mono', monospace";
          ctx.fillStyle = "rgba(8, 145, 178, 0.8)";
          ctx.fillText(node.subtitle, labelX, pt.y + 16);
        }
      });

      // ---- Central nucleus ----
      ctx.beginPath();
      ctx.arc(centerPt.x, centerPt.y, 3.5 + Math.sin(pulsePhase.current * 2) * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = "#0891B2";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerPt.x, centerPt.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fill();

      ctx.restore();
      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [activeEngine, reducedMotion]);

  const activeNode = engineNodes.find((n) => n.id === activeEngine);

  return (
    <div className="relative mx-auto flex flex-col items-center justify-center">
      <div className="relative h-[320px] w-full max-w-[500px]">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      {/* Active telemetry readout bar */}
      <div className="mt-2 flex h-8 items-center gap-2 font-mono text-[11px] text-slate-500">
        <span
          className="h-1.5 w-1.5 rounded-full bg-[#0891B2]"
          style={{
            animation: "pulse 2s ease-in-out infinite",
            boxShadow: "0 0 4px rgba(8, 145, 178, 0.4)",
          }}
        />
        {activeNode ? (
          <span className="text-slate-800 transition-all duration-300">
            ACTIVE CORE: <strong className="text-[#0891B2]">{activeNode.label}</strong> — {activeNode.subtitle}
          </span>
        ) : (
          <span className="text-slate-400">
            NEUROSYN GEOMETRIC CORE · HOVER ENGINE TO REORIENT
          </span>
        )}
      </div>
    </div>
  );
}
