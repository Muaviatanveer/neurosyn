import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { getStaticPage, notFoundHtml } from "./static-pages/router";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

// --- Security Headers ---
function applySecurityHeaders(response: Response): Response {
  const newResponse = new Response(response.body, response);
  newResponse.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );
  newResponse.headers.set("X-Content-Type-Options", "nosniff");
  newResponse.headers.set("X-Frame-Options", "DENY");
  newResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  newResponse.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()",
  );
  newResponse.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://ai.gateway.lovable.dev; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://ai.gateway.lovable.dev https://*.supabase.co; frame-src https://drive.google.com; object-src 'none'; base-uri 'self';",
  );
  return newResponse;
}

// --- Simple in-memory rate limiter ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string, maxRequests: number = 30, windowMs: number = 60_000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count++;
  return entry.count > maxRequests;
}

// Periodic cleanup to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitMap) {
    if (now > val.resetAt) rateLimitMap.delete(key);
  }
}, 120_000);

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function checkCanonical301Redirect(request: Request): Response | null {
  try {
    const url = new URL(request.url);
    const host = (
      request.headers.get("x-forwarded-host") ||
      request.headers.get("host") ||
      url.host ||
      ""
    ).toLowerCase();

    // Allow localhost and local test environments without domain redirect
    if (
      host.includes("localhost") ||
      host.includes("127.0.0.1") ||
      host.includes("0.0.0.0") ||
      host.endsWith(".local")
    ) {
      return null;
    }

    const proto = (
      request.headers.get("x-forwarded-proto") ||
      url.protocol.replace(":", "") ||
      "https"
    ).toLowerCase();

    const isRenderDomain = host.includes("onrender.com");
    const isBareDomain = host === "neurosyn.it.com";
    const isInsecure = proto === "http";
    const isPreferred = host === "www.neurosyn.it.com" && proto === "https";

    if (!isPreferred && (isRenderDomain || isBareDomain || isInsecure)) {
      let cleanPath = url.pathname;
      if (cleanPath.endsWith(".html") || cleanPath.endsWith(".html/")) {
        cleanPath = cleanPath.replace(/\/+$/, "").slice(0, -5);
      }
      if (cleanPath === "/index" || cleanPath === "") {
        cleanPath = "/";
      } else if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
        cleanPath = cleanPath.replace(/\/+$/, "");
      }
      // 301 Permanent Redirect to primary domain preserving pathname and query parameters
      const target = `https://www.neurosyn.it.com${cleanPath}${url.search}`;
      return new Response(null, {
        status: 301,
        headers: {
          Location: target,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch (err) {
    console.warn("[SEO Redirect check notice]", err);
  }
  return null;
}

function checkCleanUrlRedirect(request: Request): Response | null {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Skip static assets
    if (
      pathname.startsWith("/css/") ||
      pathname.startsWith("/js/") ||
      pathname.startsWith("/images/") ||
      pathname.startsWith("/assets/") ||
      pathname === "/favicon.ico" ||
      pathname === "/robots.txt" ||
      pathname === "/sitemap.xml" ||
      pathname === "/og-image.png" ||
      pathname === "/muavia.jpeg" ||
      pathname === "/healthz" ||
      pathname === "/api/health"
    ) {
      return null;
    }

    let needsRedirect = false;
    let cleanPath = pathname;

    // 1. Remove .html or .html/
    if (cleanPath.endsWith(".html") || cleanPath.endsWith(".html/")) {
      cleanPath = cleanPath.replace(/\/+$/, "").slice(0, -5);
      needsRedirect = true;
    }

    // 2. Normalize /index to /
    if (cleanPath === "/index" || cleanPath === "") {
      cleanPath = "/";
      if (pathname !== "/") {
        needsRedirect = true;
      }
    }

    // 3. Remove trailing slashes on non-root paths (e.g. /about/ -> /about)
    if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
      cleanPath = cleanPath.replace(/\/+$/, "");
      needsRedirect = true;
    }

    if (needsRedirect) {
      const host = (
        request.headers.get("x-forwarded-host") ||
        request.headers.get("host") ||
        url.host ||
        ""
      ).toLowerCase();

      const isLocal =
        host.includes("localhost") ||
        host.includes("127.0.0.1") ||
        host.includes("0.0.0.0") ||
        host.endsWith(".local");

      const target = isLocal
        ? `${url.protocol}//${url.host}${cleanPath}${url.search}`
        : `https://www.neurosyn.it.com${cleanPath}${url.search}`;

      return new Response(null, {
        status: 301,
        headers: {
          Location: target,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch (err) {
    console.warn("[Clean URL Redirect notice]", err);
  }
  return null;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("cf-connecting-ip") ||
      "unknown";

    const redirectResponse = checkCanonical301Redirect(request);
    if (redirectResponse) {
      return applySecurityHeaders(redirectResponse);
    }

    const cleanUrlRedirect = checkCleanUrlRedirect(request);
    if (cleanUrlRedirect) {
      return applySecurityHeaders(cleanUrlRedirect);
    }

    // High-performance health check endpoint for zero-latency keep-alive pings (prevents Render sleep)
    const url = new URL(request.url);

    // Server-side 301 redirect for /testimonials → /research architecture migration
    if (url.pathname === "/testimonials" || url.pathname.startsWith("/testimonials/")) {
      const newPath = url.pathname.replace(/^\/testimonials/, "/research");
      return applySecurityHeaders(
        new Response(null, {
          status: 301,
          headers: {
            Location: `https://www.neurosyn.it.com${newPath}${url.search}`,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        }),
      );
    }

    // Server-side 301 redirect for /insights → /case-studies consolidation
    if (url.pathname === "/insights" || url.pathname.startsWith("/insights/")) {
      return applySecurityHeaders(
        new Response(null, {
          status: 301,
          headers: {
            Location: `https://www.neurosyn.it.com/case-studies`,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        }),
      );
    }
    if (url.pathname === "/healthz" || url.pathname === "/api/health") {
      if (isRateLimited(clientIp, 60, 60_000)) {
        return applySecurityHeaders(
          new Response("Rate limit exceeded", {
            status: 429,
            headers: { "content-type": "text/plain" },
          }),
        );
      }
      return applySecurityHeaders(
        new Response("OK", {
          status: 200,
          headers: {
            "content-type": "text/plain",
            "cache-control": "no-store, no-cache, must-revalidate",
          },
        }),
      );
    }

    // CSRF Protection & Rate Limiting on POST requests (server functions)
    if (request.method === "POST") {
      const origin = request.headers.get("origin");
      if (origin) {
        try {
          const originHost = new URL(origin).host.toLowerCase();
          const host = (
            request.headers.get("x-forwarded-host") ||
            request.headers.get("host") ||
            ""
          ).toLowerCase();
          const isAllowed =
            originHost === "www.neurosyn.it.com" ||
            originHost === "neurosyn.it.com" ||
            originHost.includes("localhost") ||
            originHost.includes("127.0.0.1") ||
            (host && originHost === host);
          if (!isAllowed) {
            return applySecurityHeaders(
              new Response("Forbidden: Cross-Site Request Blocked", {
                status: 403,
                headers: { "content-type": "text/plain" },
              }),
            );
          }
        } catch {
          // ignore parsing error
        }
      }

      if (isRateLimited(clientIp, 10, 60_000)) {
        return applySecurityHeaders(
          new Response("Rate limit exceeded", {
            status: 429,
            headers: { "content-type": "text/plain" },
          }),
        );
      }
    }

    // Serve high-fidelity static pages (new enterprise dark theme from neurosyn 3)
    const staticPageHtml = getStaticPage(url.pathname);
    if (staticPageHtml) {
      return applySecurityHeaders(
        new Response(staticPageHtml, {
          status: 200,
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, max-age=1800, must-revalidate",
          },
        }),
      );
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      if (response.status === 404 && notFoundHtml) {
        return applySecurityHeaders(
          new Response(notFoundHtml, {
            status: 404,
            headers: { "content-type": "text/html; charset=utf-8" },
          }),
        );
      }
      return applySecurityHeaders(await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return applySecurityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
