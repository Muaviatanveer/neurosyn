import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  Database,
  Plane,
  HeartPulse,
  Zap,
  Landmark,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Reveal, Eyebrow, CTAButton } from "../components/site/ui";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries & Sectors — NeuroSyn" },
      {
        name: "description",
        content:
          "Enterprise AI systems and custom software deployed across finance, SAP supply chains, aerospace, healthcare, energy, and the public sector.",
      },
      { property: "og:title", content: "Industries Served — NeuroSyn" },
      {
        property: "og:description",
        content: "AI and software systems purpose-built for regulated, mission-critical environments.",
      },
    ],
  }),
  component: IndustriesPage,
});

const sectorList = [
  {
    id: "finance",
    icon: Building2,
    badge: "Financial Services",
    title: "Banking, FinTech & Capital Markets",
    tagline: "High-throughput reconciliation, real-time fraud mitigation, and continuous audit.",
    description:
      "Modern financial institutions require sub-millisecond execution alongside rigorous regulatory compliance. NeuroSyn engineers deterministic ledger systems, automated trade surveillance, and intelligent compliance pipelines.",
    capabilities: [
      "Real-time fraud & AML transaction scoring under 15ms latency",
      "Automated balance sheet and ledger reconciliation across core banking engines",
      "Cryptographically verified audit logs compliant with PCI-DSS & SOX",
      "Autonomous financial report synthesis with source citation verification",
    ],
    compliance: ["PCI-DSS Level 1", "SOX 404", "GLBA", "ISO 20022"],
  },
  {
    id: "sap-supply-chain",
    icon: Database,
    badge: "Enterprise ERP",
    title: "SAP Landscapes & Global Supply Chains",
    tagline: "Unlocking latent intelligence across multi-instance SAP ERP environments.",
    description:
      "Enterprise supply chains operate on legacy ERP backbones that hold massive data volumes in rigid silos. We bridge modern AI models directly with SAP S/4HANA via secure RFC/OData connectors without disrupting operations.",
    capabilities: [
      "Predictive supply chain stockout and inventory replenishment modeling",
      "Automated PO-to-invoice matching and duplicate payment detection",
      "Natural language querying over multi-instance ECC and S/4HANA databases",
      "Zero-downtime microservices synchronization with zero schema corruption",
    ],
    compliance: ["SAP Certified Integrations", "ISO 9001", "SOC 2 Type II"],
  },
  {
    id: "aerospace-defense",
    icon: Plane,
    badge: "High-Reliability",
    title: "Aerospace, Defense & Fleet Maintenance",
    tagline: "Physics-informed Bayesian diagnostics for mission-critical physical assets.",
    description:
      "For aerospace manufacturers and fleet operators, unexpected mechanical downtime results in extreme costs and safety risks. We apply physics-guided neural networks to sensor telemetry, diagnosing fatigue weeks before standard threshold alerts.",
    capabilities: [
      "Heterogeneous vibration, acoustic, and thermal sensor stream ingestion",
      "Sub-10ms edge inference running on ruggedized onboard avionics",
      "Bayesian uncertainty estimation for explainable maintenance decisions",
      "Air-gapped telemetry processing with zero external network connectivity",
    ],
    compliance: ["ITAR Compliant", "DO-178C Alignment", "ISO 27001"],
  },
  {
    id: "healthcare-lifesciences",
    icon: HeartPulse,
    badge: "Life Sciences",
    title: "Healthcare Systems & Clinical Informatics",
    tagline: "Secure, explainable AI workflows designed for regulated medical data.",
    description:
      "Healthcare networks and pharmaceutical researchers require systems that respect patient confidentiality while accelerating clinical insight. We build zero-trust diagnostic portals, medical OCR engines, and automated trial analytics.",
    capabilities: [
      "Automated unstructured clinical record parsing and FHIR/HL7 mapping",
      "Multi-agent literature synthesis and clinical trial protocol cross-checks",
      "Cryptographic de-identification and data boundary enforcement",
      "Zero-egress private LLM clusters dedicated to medical research teams",
    ],
    compliance: ["HIPAA Security Rule", "HITECH", "GDPR Health", "SOC 2"],
  },
  {
    id: "energy-utilities",
    icon: Zap,
    badge: "Critical Infrastructure",
    title: "Energy, Power Grids & Utilities",
    tagline: "Predictive asset maintenance and grid telemetry optimization at scale.",
    description:
      "Utility operators manage vast distributed assets with legacy SCADA telemetry. NeuroSyn ingests time-series sensor flows to predict transformer failure, optimize distribution routing, and automate field dispatch workflows.",
    capabilities: [
      "SCADA & OPC-UA protocol bridging into modern streaming lakehouses",
      "Transformer and turbine degradation modeling using temporal convolution",
      "Dynamic load balancing and renewable energy generation forecasting",
      "Automated dispatch routing based on predictive failure probability",
    ],
    compliance: ["NERC CIP", "IEC 62443", "ISO 55001"],
  },
  {
    id: "public-sector",
    icon: Landmark,
    badge: "Sovereign Systems",
    title: "Public Sector & Sovereign Institutions",
    tagline: "Air-gapped, verifiable AI operating environments with complete data sovereignty.",
    description:
      "Government bodies require modern artificial intelligence that operates within strict jurisdictional boundaries. We deploy isolated, on-premise foundation model clusters with immutable audit logs and zero cloud dependency.",
    capabilities: [
      "Hardware-level air-gapped on-premise compute deployment",
      "Cross-department document intelligence and multilingual policy retrieval",
      "Role-based access matching physical security clearance levels",
      "Automated legislative compliance and regulatory cross-referencing",
    ],
    compliance: ["FedRAMP Aligned", "Zero-Trust Architecture", "FIPS 140-3"],
  },
];

function IndustriesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NETSOL Architectural Pinstripe Hero */}
      <section className="relative border-b border-slate-200 bg-[#FFFFFF] px-6 py-20 md:px-10 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25 netsol-pinstripes" />
        <div className="relative mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Who We Serve — Industry Solutions</span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[1.08]">
            Software & AI engineered for demanding{" "}
            <span className="text-[#1D81F2] underline decoration-blue-200/50 underline-offset-8">
              environments.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            NeuroSyn platforms are built for industries where reliability, operational uptime, cryptographic compliance, and explainable decisions are non-negotiable.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[#1D81F2] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-[#156CD4] hover:shadow-xl hover:shadow-blue-500/35 active:scale-[0.98]"
            >
              <span>Discuss Your Industry Requirements</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Bento Grid */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1360px] space-y-12">
          {sectorList.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <Reveal key={sector.id} delay={idx * 0.08}>
                <div className="group relative overflow-hidden rounded-[28px] border border-slate-200/85 bg-white p-8 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl lg:p-12">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3 max-w-3xl">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-[#1D81F2]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1D81F2]">
                          {sector.badge}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                        {sector.title}
                      </h2>
                      <p className="text-sm font-medium text-slate-700">
                        {sector.tagline}
                      </p>
                      <p className="text-base leading-relaxed text-slate-600">
                        {sector.description}
                      </p>
                    </div>

                    {/* Compliance Standards Badge Box */}
                    <div className="shrink-0 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 lg:w-72">
                      <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        <ShieldCheck className="h-4 w-4 text-[#1D81F2]" />
                        <span>Compliance Standards</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {sector.compliance.map((c) => (
                          <span
                            key={c}
                            className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Capabilities List */}
                  <div className="mt-8 border-t border-slate-100 pt-8">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Core Sector Capabilities & Workflows
                    </h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {sector.capabilities.map((cap) => (
                        <div key={cap} className="flex items-start gap-3 text-sm text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1D81F2]" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* NETSOL-Style Bottom Engagement Section */}
      <section className="border-t border-slate-200 bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="h-4 w-1 rounded-full bg-[#1D81F2]" />
            <span>Consulting & Proof-of-Concept</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Evaluate a dedicated sector pilot.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">
            We partner with industry leaders to prototype, validate, and scale specialized enterprise AI solutions under strict non-disclosure agreements.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton to="/contact">Request Sector Architecture Consultation</CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
