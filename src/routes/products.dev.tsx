import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/site/ProductPage";

export const Route = createFileRoute("/products/dev")({
  head: () => ({
    meta: [
      { title: "NeuroSyn-Dev — AI Engineering Operating System" },
      { name: "description", content: "Metacognitive software engineering system designed to automate, build, compile, test, and self-heal codebases inside isolated runtimes." },
      { property: "og:title", content: "NeuroSyn-Dev" },
      { property: "og:description", content: "Autonomous AI Engineering Operating System." },
    ],
  }),
  component: () => (
    <ProductPage
      eyebrow="Product 02 · Metacognitive Engineering OS"
      name="NeuroSyn-Dev"
      tagline="Autonomous Coding, Multi-Agent Debates, and Sandbox Verification."
      demoVideoUrl="https://drive.google.com/file/d/177VtmFqdKIfCiUTNCkLKDTCoyClBn85u/preview"
      description={
        <>
          <p>
            NeuroSyn-Dev is an autonomous, metacognitive software engineering operating system engineered to plan, build, compile, test, and audit codebase modifications locally on AMD ROCm/GPU hardware or secure cloud networks.
          </p>
          <p>
            By mounting isolated local Docker sockets to spin up containerized runtimes (Python, Node, OpenJDK), the platform validates, compiles, and self-heals code patches and architecture designs before deploying directly to production targets.
          </p>
        </>
      }
      stats={[
        { k: "AMD ROCm", v: "GPU Infrastructure" },
        { k: "5", v: "Orchestrated Engines" },
        { k: "512MB", v: "Container RAM Limits" },
        { k: "Self-Heal", v: "Self-Repair Mode" },
      ]}
      features={[
        "Autonomous Diagnostic Repair Loops",
        "Greenfield Progressive Repository Generation",
        "Sentinel CTO Code Scanner & Scorecard Generator",
        "Docker Sandbox Execution Environment (Node/Python/Java)",
        "Dependency Self-Healing (dynamic container module installations)",
        "Multi-Agent Debater Council (Security, QA, Architecture, Performance)",
        "synapseFabric Problem-Understanding Orchestrator",
        "Institutional Memory Search (Jaccard string similarity checks)",
        "Real-Time Log Autoscroller & Custom Regex Syntax Highlighter",
        "Event-Stream Aggregator (SSE /api/task/stream)",
        "Wildcard Route SPA Fallback & Static File Server Integration",
        "Restricted Shell Container Commands (e.g. py_compile, tsc)"
      ]}
      benefits={[
        "Reduces software engineering bug backlogs with self-healing sandboxes",
        "Prevents infinite loop crashes via severe host RAM and CPU quota capping",
        "Performs static code auditing against complex structural patterns",
        "Enforces SOLID conformance and segregates logical agent dependencies",
        "Saves prompt tokens by storing historically validated solutions"
      ]}
      extra={[
        {
          title: "Architecture & Integration Substrates",
          items: [
            "Local Ollama & vLLM Engines",
            "Fireworks AI Cloud Integrations",
            "Mongoose/MongoDB Schema Persistence",
            "Google & GitHub OAuth Integrations",
            "Dockerode Runtime Containers",
            "Vercel Serverless Function Guards"
          ],
        },
      ]}
      status="Available for enterprise DevOps, solutions architects, and engineering team evaluations."
      cta={{ label: "Deploy Engineering Sandbox", to: "/contact" }}
    />
  ),
});