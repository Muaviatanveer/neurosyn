import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/site/ProductPage";

export const Route = createFileRoute("/products/aero")({
  head: () => ({
    meta: [
      { title: "NeuroSyn-Aero — Industrial AI for Aerospace Diagnostics" },
      { name: "description", content: "High-density telemetry processing and multi-engine cognitive reasoning designed for aerospace diagnostics and prognostic fleet intelligence." },
      { property: "og:title", content: "NeuroSyn-Aero" },
      { property: "og:description", content: "Aerospace Diagnostics & Airworthiness Verification." },
    ],
  }),
  component: () => (
    <ProductPage
      eyebrow="Product 03 · Telemetry & Airworthiness Engine"
      name="NeuroSyn-Aero"
      tagline="Physics-Informed Digital Twins and Multi-Specialist Engineering Debates."
      demoVideoUrl="https://drive.google.com/file/d/1CKWSOBrEwr4KkKD0E-Im2U1ZxWur-msT/preview"
      description={
        <>
          <p>
            NeuroSyn-Aero is an enterprise-grade, high-density telemetry processing and multi-engine cognitive reasoning platform engineered for aerospace diagnostics, airworthiness verification, and prognostic fleet intelligence.
          </p>
          <p>
            Acting as a decision support cockpit, it monitors physical flight assets, captures rotational/structural anomalies, runs dialectical multi-agent debates among virtual aerospace specialists, and compiles real-time, audit-ready recommendations.
          </p>
        </>
      }
      features={[
        "Propulsion & Structural Telemetry Frame Processing",
        "5-Dimensional Kalman Filter State-Space Observer (Digital Twin)",
        "Adaptive 3-Tier AI Reasoning Flywheel (ADRE)",
        "Forensic Causal Graphs & Academic Evidence Panels",
        "Counterfactual (What-If) Simulator (BearingFrictionSim)",
        "Multi-Agent Engineering Debate Panel (Promise.all)",
        "MetaEvaluator Service (Divergence & Self-Critique Engine)",
        "Bayesian Hypothesis Tester (5 standard failure modes)",
        "Prognostic Lifecycle Extrapolation Timeline",
        "Decoupled Compliance Verification Layer (Ethics/Governance)",
        "Socket.io Web Socket Telemetry Stream Replays",
        "Jaccard Match Semantic Cache Checks (Jaccard >= 0.95)"
      ]}
      benefits={[
        "Minimizes flight aborts and unscheduled aircraft maintenance events",
        "Transforms unmeasurable latent variables (bearing wear, rotor stress) into calculated metrics",
        "Provides traceable causal chains backed by raw sensor readings and ArXiv citations",
        "Reconciles conflicting maintenance, operations, and cost profiles into a Decision Impact Matrix",
        "Optimizes telemetry ingest times via local LowDB memory vector caches"
      ]}
      extra={[
        {
          title: "Target Subsystems & Physical Solvers",
          items: [
            "Quantix Telemetry Subsystem",
            "ThirdEye Diagnostics Cascade",
            "Aura Deep Reasoning Engine (ADRE)",
            "Neo4j Graph Database Models",
            "Vibration Kurtosis Observers",
            "Academic Literature Search (Tavily/ArXiv API)"
          ],
        },
      ]}
      industries={[
        "Commercial Air Cargo",
        "Aerospace & Defense Operators",
        "UAV & Unmanned Aerial Systems",
        "Gas Turbine Fleet Managers",
        "Airworthiness Inspection & Auditing"
      ]}
      status="Actively engaging with mission control directors, commercial aviation teams, and aerospace research partners."
      cta={{ label: "Request Aerospace Pilot", to: "/contact" }}
    />
  ),
});