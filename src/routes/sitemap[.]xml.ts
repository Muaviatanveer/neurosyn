import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://www.neurosyn.it.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const currentDate = new Date().toISOString().split("T")[0];
        const pages = [
          { path: "/", priority: "1.0", changefreq: "daily" },
          { path: "/founder", priority: "0.95", changefreq: "weekly" },
          { path: "/reviews", priority: "0.9", changefreq: "daily" },
          { path: "/services", priority: "0.9", changefreq: "weekly" },
          { path: "/technology", priority: "0.9", changefreq: "weekly" },
          { path: "/products", priority: "0.85", changefreq: "weekly" },
          { path: "/products/sap", priority: "0.85", changefreq: "weekly" },
          { path: "/products/dev", priority: "0.85", changefreq: "weekly" },
          { path: "/products/aero", priority: "0.85", changefreq: "weekly" },
          { path: "/products/copilot", priority: "0.85", changefreq: "weekly" },
          { path: "/case-studies", priority: "0.8", changefreq: "weekly" },
          { path: "/industries", priority: "0.8", changefreq: "weekly" },
          { path: "/about", priority: "0.8", changefreq: "weekly" },
          { path: "/testimonials", priority: "0.8", changefreq: "weekly" },
          { path: "/investors", priority: "0.7", changefreq: "monthly" },
          { path: "/contact", priority: "0.8", changefreq: "monthly" },
        ];
        const urls = pages
          .map(
            (p) =>
              `  <url>\n    <loc>${BASE_URL}${p.path}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});
