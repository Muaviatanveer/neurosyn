import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/site/ProductPage";

export const Route = createFileRoute("/products/kids")({
  head: () => ({
    meta: [
      { title: "NeuroSyn-Kids — The AI Builder for the Next Generation" },
      { name: "description", content: "Natural-language software creation for young innovators — safe, guided, and creative." },
      { property: "og:title", content: "NeuroSyn-Kids" },
      { property: "og:description", content: "The AI Builder for the Next Generation." },
    ],
  }),
  component: () => (
    <ProductPage
      eyebrow="Product 04 · Coming Soon"
      name="NeuroSyn-Kids"
      tagline="The AI Builder for the Next Generation."
      description={
        <>
          <p>
            NeuroSyn-Kids empowers children to create websites, games, applications, and digital
            experiences simply by describing their ideas in natural language.
          </p>
          <p>
            Designed specifically for young creators, it transforms imagination into working
            software while teaching computational thinking in a safe and intuitive environment.
          </p>
        </>
      }
      features={[
        "Natural Language Programming",
        "Kid-Friendly AI",
        "Safe Workspace",
        "Visual Learning",
        "Interactive Coding",
        "One-click Publishing",
        "Educational Guidance",
      ]}
      benefits={[
        "Turn imagination into working software",
        "Teach computational thinking",
        "Build creativity and problem-solving",
        "Safe, guided AI environment",
      ]}
      status="Currently in development. Sign up for early access."
      cta={{ label: "Request Early Access", to: "/contact" }}
    />
  ),
});
