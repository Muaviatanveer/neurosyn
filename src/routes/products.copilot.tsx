import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/site/ProductPage";

export const Route = createFileRoute("/products/copilot")({
  head: () => ({
    meta: [
      { title: "NeuroSyn-Copilot — Enterprise-Grade Repository Analysis & System Architecture" },
      { name: "description", content: "Self-contained Engineering Intelligence Operating System executing automated, local multi-agent analysis workflows on business telemetry." },
      { property: "og:title", content: "NeuroSyn-Copilot" },
      { property: "og:description", content: "Universal Repository Analysis & Documentation." },
    ],
  }),
  component: () => (
    <ProductPage
      eyebrow="Product 04 · Pilot Available"
      name="NeuroSyn-Copilot"
      tagline="Universal Repository Analysis & Documentation."
      demoVideoUrl="https://drive.google.com/file/d/10ms4rgy1t8nZPzpwsmLCsUeWFR542L48/preview" // Added video
      description={
        <>
          <p>
            NeuroSyn-Copilot is a self-contained, enterprise-grade Engineering Intelligence Operating System 
            designed to run automated, multi-agent analysis workflows on business telemetry datasets and unstructured text documents.
          </p>
          <p>
            Operating on a localized execution design pattern, it prioritizes confidentiality and strict data compliance 
            by leveraging local LLM models (e.g., Qwen, DeepSeek via Ollama) and a local cache database, while retaining 
            resilient cloud LLM failover fallbacks.
          </p>
        </>
      }
      features={[
        "Multi-Format Ingestion (.xlsx, .xls, .csv, .pdf)",
        "Cognitive Agent Pipeline (Analyst, Strategist, Designer, Writer, Exporter)",
        "Dynamic Chart Ingestion & Rendering (headless Chart.js)",
        "Multi-Format Export Compilation (PDFKit, Word docx, pptxgenjs Decks)",
        "Interactive Execution Timeline (Server-Sent Events / SSE)",
        "NeuroScore™ Trust Index & Weighted Confidence Analysis",
        "Token Cost Optimization via Node.js Column Summaries",
        "Session Ingest Caching via MongoDB stateless cache"
      ]}
      benefits={[
        "Zero data leakage via completely localized execution models",
        "Over 90% reduction in LLM token consumption on large datasets",
        "High-reliability multi-agent workflows in sandboxed environments",
        "Stateless serverless reliability with session caches"
      ]}
      status="Pilot integrations available for enterprise environments. Request early access below."
      cta={{ label: "Request Pilot Integration", to: "/contact" }}
    />
  ),
});