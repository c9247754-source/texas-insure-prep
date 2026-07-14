import { createHash } from "crypto";
import { Creem } from "creem";
import { creemServerMode, isCreemConfigured } from "@/lib/app-url";

let client: Creem | null = null;

export function getCreem(): Creem | null {
  if (!isCreemConfigured()) return null;
  if (!client) {
    client = new Creem({
      apiKey: process.env.CREEM_API_KEY!,
      server: creemServerMode(),
    });
  }
  return client;
}

/**
 * Verify Creem success-redirect signature.
 * Params must stay in URL order; exclude empty/null values; salt with API key.
 */
export function verifyCreemRedirectSignature(
  rawQuery: string,
  apiKey: string,
): boolean {
  const pairs = rawQuery.split("&").filter(Boolean);
  let signature = "";
  const parts: string[] = [];

  for (const pair of pairs) {
    const eq = pair.indexOf("=");
    if (eq === -1) continue;
    const key = decodeURIComponent(pair.slice(0, eq));
    const value = decodeURIComponent(pair.slice(eq + 1));
    if (key === "signature") {
      signature = value;
      continue;
    }
    if (!value || value === "null") continue;
    parts.push(`${key}=${value}`);
  }

  parts.push(`salt=${apiKey}`);
  const data = parts.join("|");
  const expected = createHash("sha256").update(data).digest("hex");
  return signature === expected;
}
