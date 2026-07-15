import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/site/ProductPage";

export const Route = createFileRoute("/products/sap")({
  head: () => ({
    meta: [
      { title: "NeuroSyn-SAP — Enterprise Intelligence for SAP & ERP" },
      { name: "description", content: "AI-powered auditing, compliance, anomaly detection, and executive reporting inside existing SAP and ERP environments." },
      { property: "og:title", content: "NeuroSyn-SAP" },
      { property: "og:description", content: "Enterprise Intelligence for SAP & ERP." },
    ],
  }),
  component: () => (
    <ProductPage
      eyebrow="Product 01"
      name="NeuroSyn-SAP"
      tagline="Enterprise Intelligence for SAP & ERP."
      description={
        <>
          <p>
            NeuroSyn-SAP integrates directly with existing SAP and ERP environments to automate
            financial reviews, operational audits, compliance validation, anomaly detection, and
            executive reporting.
          </p>
          <p>
            Rather than replacing enterprise systems, NeuroSyn acts as an intelligent operational
            layer that continuously monitors organizational data, surfaces operational risks, and
            generates explainable recommendations for finance and management teams.
          </p>
        </>
      }
      features={[
        "Automated Audit Intelligence",
        "Financial Anomaly Detection",
        "Compliance Monitoring",
        "Executive Dashboards",
        "Monthly Audit Reports",
        "Cross-Module Analytics",
        "Predictive Operational Insights",
        "Role-based AI Assistant",
      ]}
      benefits={[
        "Reduce manual auditing effort",
        "Accelerate reporting cycles",
        "Strengthen compliance posture",
        "Detect operational risk earlier",
        "Enterprise-ready deployment",
      ]}
      industries={["Large Enterprises", "Manufacturing", "Retail", "Healthcare", "Logistics", "Government", "Financial Institutions", "Public Sector"]}
      status="Available through pilot enterprise integrations, deployable inside existing SAP or ERP infrastructure."
      cta={{ label: "Request Pilot Integration", to: "/contact" }}
    />
  ),
});
