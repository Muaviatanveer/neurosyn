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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NeuroSyn — Custom Software & AI Systems" },
      {
        name: "description",
        content:
          "We build software that moves businesses forward. Custom web & mobile applications, AI systems, cloud infrastructure, and enterprise ERP.",
      },
      { name: "author", content: "NeuroSyn" },
      { property: "og:site_name", content: "NeuroSyn" },
      { property: "og:title", content: "NeuroSyn — Custom Software & AI Systems" },
      {
        property: "og:description",
        content:
          "We build software that moves businesses forward. Custom web & mobile applications, AI systems, cloud infrastructure, and enterprise ERP.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.neurosyn.it.com" },
      { property: "og:image", content: "https://www.neurosyn.it.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "NeuroSyn — Custom Software & AI Systems" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NeuroSyn — Custom Software & AI Systems" },
      { name: "twitter:description", content: "We build software that moves businesses forward. Custom web & mobile applications, AI systems, cloud infrastructure, and enterprise ERP." },
      { name: "twitter:image", content: "https://www.neurosyn.it.com/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap",
      },
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

function BackToHome() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === "/") return null;
  return (
    <Link
      to="/"
      className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-card/90 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur transition-colors hover:bg-card"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Home
    </Link>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuroraBackground />
      <Nav />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
      <BackToHome />
    </QueryClientProvider>
  );
}
