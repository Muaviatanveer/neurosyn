import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const redirectMiddleware = createMiddleware().server(async ({ next, request }) => {
  if (request) {
    try {
      const url = new URL(request.url);
      const host = (
        request.headers.get("x-forwarded-host") ||
        request.headers.get("host") ||
        url.host ||
        ""
      ).toLowerCase();

      if (
        !host.includes("localhost") &&
        !host.includes("127.0.0.1") &&
        !host.includes("0.0.0.0") &&
        !host.endsWith(".local")
      ) {
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
          const target = `https://www.neurosyn.it.com${url.pathname}${url.search}`;
          return new Response(null, {
            status: 301,
            headers: {
              Location: target,
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        }
      }
    } catch {}
  }
  return await next();
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [redirectMiddleware, errorMiddleware],
}));
