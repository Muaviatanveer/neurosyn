import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

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

    // Allow localhost and local test environments without redirect
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
      // 301 Permanent Redirect to primary domain preserving pathname and query parameters
      const target = `https://www.neurosyn.it.com${url.pathname}${url.search}`;
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

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const redirectResponse = checkCanonical301Redirect(request);
    if (redirectResponse) {
      return redirectResponse;
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
