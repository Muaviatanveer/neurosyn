import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

import appCss from "../styles.css?url";
import { GA_MEASUREMENT_ID, trackPageView } from "../lib/analytics";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";
import { AuroraBackground } from "../components/site/Background";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-border bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const ROOT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.neurosyn.it.com/#website",
      "url": "https://www.neurosyn.it.com",
      "name": "NeuroSyn",
      "alternateName": ["NeuroSyn AI", "NeuroSyn Enterprise", "NeuroSyn Systems"],
      "description":
        "Software & AI systems built to advance enterprises. Custom web applications, autonomous AI pipelines, cloud systems, and enterprise SAP modernization.",
      "publisher": {
        "@id": "https://www.neurosyn.it.com/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.neurosyn.it.com/#organization",
      "name": "NeuroSyn",
      "url": "https://www.neurosyn.it.com",
      "logo": "https://www.neurosyn.it.com/logo.png",
      "founder": {
        "@id": "https://www.neurosyn.it.com/#founder",
      },
      "sameAs": [
        "https://github.com/Muaviatanveer",
        "https://www.linkedin.com/in/muavia-tanveer-9a6856328/",
        "https://x.com/muaviakha83",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.neurosyn.it.com/#founder",
      "name": "Muavia Tanveer Khan",
      "jobTitle": "Founder & Lead Architect",
      "worksFor": {
        "@id": "https://www.neurosyn.it.com/#organization",
      },
      "url": "https://www.neurosyn.it.com/founder",
      "image": "https://www.neurosyn.it.com/muavia.jpeg",
      "sameAs": [
        "https://github.com/Muaviatanveer",
        "https://www.linkedin.com/in/muavia-tanveer-9a6856328/",
        "https://x.com/muaviakha83",
      ],
    },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NeuroSyn — Enterprise Software & AI Systems" },
      {
        name: "description",
        content:
          "Software & AI systems built to advance enterprises. Custom web applications, autonomous AI pipelines, cloud systems, and enterprise SAP modernization.",
      },
      { name: "author", content: "NeuroSyn" },
      { name: "application-name", content: "NeuroSyn" },
      { property: "og:site_name", content: "NeuroSyn" },
      { property: "og:title", content: "NeuroSyn — Enterprise Software & AI Systems" },
      {
        property: "og:description",
        content:
          "Software & AI systems built to advance enterprises. Custom web applications, autonomous AI pipelines, cloud systems, and enterprise SAP modernization.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.neurosyn.it.com" },
      { property: "og:image", content: "https://www.neurosyn.it.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "NeuroSyn — Enterprise Software & AI Systems" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NeuroSyn — Enterprise Software & AI Systems" },
      {
        name: "twitter:description",
        content:
          "Software & AI systems built to advance enterprises. Custom web applications, autonomous AI pipelines, cloud systems, and enterprise SAP modernization.",
      },
      { name: "twitter:image", content: "https://www.neurosyn.it.com/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { rel: "icon", href: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      { rel: "icon", href: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ROOT_SCHEMA),
      },
      ...(GA_MEASUREMENT_ID
        ? [
            {
              src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
              async: true,
            },
            {
              children: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  send_page_view: true
                });
              `,
            },
          ]
        : []),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SubnavBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const title = segments.length > 0 ? segments[0].replace(/-/g, " ") : "";
  const formattedTitle = title ? title.charAt(0).toUpperCase() + title.slice(1) : "";

  return (
    <div className="sticky top-18 z-40 border-b border-slate-200/90 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-10 max-w-[1360px] items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-2.5">
          <Link
            to="/"
            className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-700 shadow-xs transition hover:border-[#1D81F2] hover:bg-[#1D81F2]/5 hover:text-[#1D81F2]"
            title="Back to Home"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Home</span>
          </Link>
          {formattedTitle && (
            <>
              <span className="text-slate-300">/</span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-900">
                {formattedTitle}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // SPA Route Change Tracking for GA4 Realtime
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const host = window.location.host.toLowerCase();
      if (
        !host.includes("localhost") &&
        !host.includes("127.0.0.1") &&
        !host.includes("0.0.0.0") &&
        !host.endsWith(".local")
      ) {
        const isRender = host.includes("onrender.com");
        const isBare = host === "neurosyn.it.com";
        const isInsecure = window.location.protocol === "http:";
        if (isRender || isBare || isInsecure) {
          const target = `https://www.neurosyn.it.com${window.location.pathname}${window.location.search}`;
          window.location.replace(target);
        }
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuroraBackground />
      <Nav />
      <div className="pt-18">
        <SubnavBar />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </QueryClientProvider>
  );
}
