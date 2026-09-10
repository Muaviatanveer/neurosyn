import { useState, useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, ShieldCheck, Zap, Activity, Cpu, Layers } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Clean, professional project overview with responsive 3D movement   */
/* and interactive prospect tabs (Engagements, Sprint SLAs, Stack)    */
/* ------------------------------------------------------------------ */

type CardTab = "engagements" | "velocity" | "stack";

const projects = [
  { client: "AAKS", type: "Enterprise AI", status: "Delivered", year: "2025" },
  { client: "Polarions", type: "Cloud & DevOps", status: "Delivered", year: "2025" },
  { client: "IJAIKE", type: "Knowledge Platform", status: "In Progress", year: "2026" },
];

const capabilities = [
  "Custom Software",
  "AI & ML Systems",
  "Cloud Infrastructure",
  "Enterprise ERP",
  "Data Engineering",
  "Security & Compliance",
];

const sprintMetrics = [
  { label: "Deployment Cycle", value: "Weekly", sub: "Production releases" },
  { label: "Automated Tests", value: "98.4%", sub: "Coverage threshold" },
  { label: "CI/CD Pipeline", value: "< 12m", sub: "Build & verify" },
  { label: "Security Audit", value: "Passed", sub: "SOC2 & ISO align" },
];

const techStack = [
  { category: "Backend & Systems", items: ["Python", "Rust", "Node.js", "Go"] },
  { category: "Web & Mobile", items: ["React / Next.js", "TypeScript", "React Native"] },
  { category: "AI & Data", items: ["PyTorch", "vLLM", "PostgreSQL", "Redis"] },
  { category: "Infrastructure", items: ["AWS", "Docker / K8s", "Terraform", "SAP RFC"] },
];

export function EnterpriseDashboardPreview() {
  const [activeTab, setActiveTab] = useState<CardTab>("engagements");
  const cardRef = useRef<HTMLDivElement>(null);

  // Direct responsive mouse tracking
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Snappy yet fluid spring physics
  const springX = useSpring(mx, { stiffness: 140, damping: 18, mass: 0.6 });
  const springY = useSpring(my, { stiffness: 140, damping: 18, mass: 0.6 });

  // Prominent, clearly visible 3D tilt
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  // Dynamic shadow shifting opposite to the angle of light/tilt
  const shadowX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(springY, [-0.5, 0.5], [24, -16]);
  const dynamicShadow = useTransform(
    [shadowX, shadowY],
    ([sx, sy]) =>
      `${sx}px ${sy}px 50px -10px rgba(15, 23, 42, 0.16), 0 8px 24px -4px rgba(15, 23, 42, 0.08)`
  );

  // Dynamic specular sheen following cursor
  const sheenX = useTransform(springX, [-0.5, 0.5], ["15%", "85%"]);
  const sheenY = useTransform(springY, [-0.5, 0.5], ["15%", "85%"]);
  const sheenGradient = useTransform(
    [sheenX, sheenY],
    ([sx, sy]) =>
      `radial-gradient(550px circle at ${sx} ${sy}, rgba(6, 182, 212, 0.07), rgba(255, 255, 255, 0.4) 30%, transparent 70%)`
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(mouseX);
    my.set(mouseY);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-[560px] py-4" style={{ perspective: 1100 }}>
      {/* Ambient floating layer — card is always gently moving in space */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            boxShadow: dynamicShadow,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative rounded-2xl border border-slate-200/90 bg-white transition-colors duration-300"
        >
          {/* Specular sheen overlay */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl"
            style={{ background: sheenGradient }}
          />

          {/* Header with Interactive Tabs */}
          <div className="border-b border-slate-100 px-6 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-[15px] font-semibold text-slate-900">Engineering Console</div>
                <div className="text-[12px] text-slate-500 mt-0.5">Live Delivery Standards</div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-150 px-2.5 py-1 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active Sprints
              </div>
            </div>

            {/* Tab switch bar */}
            <div className="mt-4 flex items-center gap-1 rounded-lg bg-slate-100/80 p-1 text-xs">
              <button
                onClick={() => setActiveTab("engagements")}
                className={`flex-1 rounded-md py-1.5 font-medium transition-all ${
                  activeTab === "engagements"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab("velocity")}
                className={`flex-1 rounded-md py-1.5 font-medium transition-all ${
                  activeTab === "velocity"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Sprint SLAs
              </button>
              <button
                onClick={() => setActiveTab("stack")}
                className={`flex-1 rounded-md py-1.5 font-medium transition-all ${
                  activeTab === "stack"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Tech Stack
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 border-b border-slate-100 bg-slate-50/50">
            {[
              { label: "Completed", value: "40+" },
              { label: "Client Retain", value: "96%" },
              { label: "Avg Sprint", value: "2 Wks" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`px-5 py-3 ${i < 2 ? "border-r border-slate-100" : ""}`}
              >
                <div className="text-[10px] font-medium uppercase tracking-wide text-slate-400">{stat.label}</div>
                <div className="mt-0.5 font-display text-xl font-semibold text-slate-900">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Tab Content Area with Smooth AnimatePresence */}
          <div className="min-h-[220px] px-6 py-4">
            <AnimatePresence mode="wait">
              {activeTab === "engagements" && (
                <motion.div
                  key="engagements"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1"
                >
                  <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400 mb-2">Recent Engagements</div>
                  {projects.map((project) => (
                    <div
                      key={project.client}
                      className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-b-0 hover:bg-slate-50/70 -mx-2 px-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 font-display text-[11px] font-bold text-slate-700">
                          {project.client.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{project.client}</div>
                          <div className="text-[11px] text-slate-500">{project.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">{project.year}</span>
                        {project.status === "Delivered" ? (
                          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                            <Check className="h-3 w-3 text-slate-500" />
                            Done
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                            <span className="h-1 w-1 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "velocity" && (
                <motion.div
                  key="velocity"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400 mb-2">Engineering Standards</div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {sprintMetrics.map((metric) => (
                      <div key={metric.label} className="rounded-lg border border-slate-150 bg-slate-50/80 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-medium text-slate-500">{metric.label}</span>
                          <Zap className="h-3.5 w-3.5 text-cyan-600" />
                        </div>
                        <div className="mt-1.5 font-display text-lg font-semibold text-slate-900">{metric.value}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{metric.sub}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "stack" && (
                <motion.div
                  key="stack"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400 mb-2">Production Technologies</div>
                  <div className="space-y-2.5">
                    {techStack.map((category) => (
                      <div key={category.category} className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-600 text-[11px]">{category.category}</span>
                        <div className="flex gap-1.5">
                          {category.items.map((item) => (
                            <span
                              key={item}
                              className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-700 border border-slate-200/60"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Capabilities chips */}
          <div className="border-t border-slate-100 px-6 py-3 bg-white">
            <div className="flex flex-wrap gap-1.5">
              {capabilities.map((cap) => (
                <span
                  key={cap}
                  className="rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3 rounded-b-2xl bg-slate-50/40">
            <span className="text-[11px] font-mono text-slate-500">neurosyn.it.com</span>
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
              <span>View all work</span>
              <ArrowUpRight className="h-3 w-3 text-slate-400" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

