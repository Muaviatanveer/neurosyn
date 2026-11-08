/**
 * Input sanitization helpers to defend against Cross-Site Scripting (XSS)
 * and SMTP Header Injection attacks.
 */

export function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/javascript:/gi, "") // strip pseudo-protocols
    .trim();
}

export function sanitizeHeader(input: unknown): string {
  if (typeof input !== "string") return "";
  return sanitizeText(input)
    .replace(/[\r\n\t]/g, " ") // prevent SMTP / HTTP header splitting
    .trim();
}

