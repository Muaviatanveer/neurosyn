import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/site/ProductPage";

export const Route = createFileRoute("/products/sap")({
  head: () => ({
    meta: [
      { title: "NeuroSyn-SAP — Enterprise Intelligence for SAP & ERP" },
      { name: "description", content: "Autonomous multi-agent forensic intelligence platform running sandboxed code execution, data privacy scrubbing, and mathematical validation." },
      { property: "og:title", content: "NeuroSyn-SAP" },
      { property: "og:description", content: "Enterprise Intelligence for SAP & ERP." },
    ],
  }),
  component: () => (
    <ProductPage
      eyebrow="Product 01 · Diamond-Grade Forensic Suite"
      name="NeuroSyn-SAP"
      tagline="Autonomous Multi-Agent Forensic Auditing & Financial Reconciliation."
      demoVideoUrl="https://drive.google.com/file/d/1HyvCIugjy5tzfsTzSlCbRnroCEJBFJ4t/preview"
      description={
        <>
          <p>
            The SAP-Synapse Engine is an autonomous multi-agent forensic intelligence platform designed for deep-dive financial reconciliations, compliance audits, and transaction-level anomaly detection across fragmented enterprise SAP data domains.
          </p>
          <p>
            Operating on a robust <strong>Parallel Realities Architecture (PRA)</strong>, the engine executes secure, Pandas-based data joins and statistical profiles inside isolated container sandboxes to detect leaks, verify ledger claims against raw metrics, and produce audit-ready PDF reports.
          </p>
        </>
      }
      stats={[
        { k: "100%", v: "Local Data Sovereignty" },
        { k: "32B", v: "DeepSeek Reasoning Core" },
        { k: "Docker", v: "Container Isolation" },
        { k: "Zero", v: "Mathematical Hallucination" },
      ]}
      features={[
        "Automatic ZIP/CSV Ingestion & Schema Discovery",
        "PII Privacy Masking (PrivacyGovernor Tokenizer Hash)",
        "Technical-to-Unified Rosetta Stone Field Mapper",
        "Strategic Planner Substrate (NeuroPlanner JSON Output)",
        "Dockerized Sandboxed Script Execution (DataPivotEngine)",
        "Self-Healing Code Execution (CognitiveMesh Tracebacks)",
        "RealityManager Parallel Reality Multi-Agent Debates",
        "Audit-Ready Narrative Synthesis (SynthesizerBoss)",
        "Mathematical Verification Engine (QuantumVerifier)",
        "Ollama VRAM Optimization (keep_alive release loops)",
        "High-Fidelity PDFKit Executive Generation",
        "Live Socket.io Execution Telemetry Streams"
      ]}
      benefits={[
        "Automates financial auditing of FI, HR, and SD ledgers with absolute privacy",
        "Ensures mathematical validity by cross-checking natural language claims with database metrics",
        "Sanitizes PII and unmasks only currency fields (AMOUNT, PRICE, TAX, SCORE)",
        "Shields database instances from manipulation with Read-only 'ro' bindings",
        "Detects leakage, operational waste, and fraudulent anomalies within seconds"
      ]}
      industries={[
        "Enterprise Finance",
        "Multinational Corporations",
        "Internal & External Auditing",
        "HR & Payroll Compliance",
        "Manufacturing & Distribution",
        "Government Entities"
      ]}
      status="Production-ready and deployable on-premise or within isolated VPCs. Standard API integrations available via prefix-routed endpoints."
      cta={{ label: "Schedule Forensic Pilot", to: "/contact" }}
    />
  ),
});