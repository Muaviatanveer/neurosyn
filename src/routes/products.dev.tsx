import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/site/ProductPage";

export const Route = createFileRoute("/products/dev")({
  head: () => ({
    meta: [
      { title: "NeuroSyn-Dev — AI Engineering Operating System" },
      { name: "description", content: "Autonomous engineering workflows with multi-agent reasoning, verification, and deployment." },
      { property: "og:title", content: "NeuroSyn-Dev" },
      { property: "og:description", content: "AI Engineering Operating System." },
    ],
  }),
  component: () => (
    <ProductPage
      eyebrow="Product 02"
      name="NeuroSyn-Dev"
      tagline="AI Engineering Operating System."
      description={
        <>
          <p>
            NeuroSyn-Dev enables engineering teams to build, review, verify, and deploy software
            using autonomous AI workflows.
          </p>
          <p>
            Instead of relying on a single coding assistant, NeuroSyn-Dev coordinates multiple
            specialized reasoning engines that plan architecture, generate code, validate
            implementations, debate engineering trade-offs, and verify outputs before production
            deployment.
          </p>
        </>
      }
      stats={[
        { k: "81%", v: "Cloud Cost Reduction" },
        { k: "5", v: "Cognitive Engines" },
        { k: "16+", v: "Engineering Modules" },
        { k: "Multi-Agent", v: "Verification" },
      ]}
      features={[
        "Autonomous Code Generation",
        "Architecture Planning",
        "Repository Analysis",
        "Engineering Strategy",
        "Code Verification",
        "Sandbox Testing",
        "Explainable AI Decisions",
        "Engineering Analytics",
        "Deployment Automation",
        "Technical Debt Detection",
        "AI CTO Insights",
        "Future Bug Prediction",
        "Knowledge Graph",
        "Engineering Memory",
        "Decision Replay",
        "Sprint Planning",
      ]}
      benefits={[
        "Reduce software development time",
        "Lower cloud AI infrastructure costs",
        "Improve engineering quality",
        "Increase deployment confidence",
        "Support hybrid infrastructure",
      ]}
      extra={[
        {
          title: "Technology Highlights",
          items: [
            "Hybrid Local + Cloud AI",
            "AMD GPU Acceleration",
            "Multi-Agent Architecture",
            "Sandbox Verification",
            "Enterprise Security",
            "Cost-Aware Routing",
            "Production Pipelines",
          ],
        },
      ]}
      status="Actively seeking strategic venture partners and enterprise design partners."
      cta={{ label: "Talk to Our Team", to: "/contact" }}
    />
  ),
});
