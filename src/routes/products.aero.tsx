import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/site/ProductPage";

export const Route = createFileRoute("/products/aero")({
  head: () => ({
    meta: [
      { title: "NeuroSyn-Aero — Industrial AI for Aerospace Diagnostics" },
      { name: "description", content: "Physics-informed AI, Bayesian diagnostics, and digital twins for predictive maintenance." },
      { property: "og:title", content: "NeuroSyn-Aero" },
      { property: "og:description", content: "Industrial AI for Aerospace Diagnostics." },
    ],
  }),
  component: () => (
    <ProductPage
      eyebrow="Product 03"
      name="NeuroSyn-Aero"
      tagline="Industrial AI for Aerospace Diagnostics."
      description={
        <>
          <p>
            NeuroSyn-Aero is an AI-powered decision intelligence platform that transforms
            industrial telemetry into explainable maintenance recommendations.
          </p>
          <p>
            Designed as an intelligence layer for aerospace and other high-value industrial assets,
            it combines deterministic physics, sensor analytics, and AI reasoning to help
            engineering teams identify anomalies, prioritize maintenance, and improve operational
            reliability.
          </p>
        </>
      }
      features={[
        "Predictive Maintenance",
        "Operational Intelligence",
        "Fleet Analytics",
        "Digital Twin Monitoring",
        "Telemetry Analysis",
        "Failure Prediction",
        "Maintenance Planning",
        "Explainable Diagnostics",
      ]}
      benefits={[
        "Improve asset reliability",
        "Minimize unplanned downtime",
        "Prioritize high-impact maintenance",
        "Ground decisions in physics + evidence",
        "Enhance existing monitoring stacks",
      ]}
      extra={[
        {
          title: "Enterprise Features",
          items: [
            "Physics-Informed AI",
            "Digital Twin Engine",
            "Bayesian Diagnostics",
            "Sensor Trust Validation",
            "Engineering Copilot",
            "Cross-Fleet Intelligence",
            "Interactive Reports",
            "Executive Dashboards",
          ],
        },
      ]}
      industries={["Aerospace", "Manufacturing", "Energy", "Heavy Industry", "Defense", "Transportation"]}
      status="Engaging with venture capital partners, aerospace collaborators, and enterprise pilot opportunities."
      cta={{ label: "Partner With NeuroSyn-Aero", to: "/contact" }}
    />
  ),
});
