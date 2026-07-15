import { createHmac, timingSafeEqual } from "crypto";
import type { AccessState } from "@/lib/access";

function getSecret(): string {
  return (
    process.env.ACCESS_CODE_SECRET?.trim() ||
    process.env.CREEM_API_KEY?.trim() ||
    "tip-dev-access-secret-change-me"
  );
}

function b64url(input: string | Buffer): string {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromB64url(input: string): Buffer {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return Buffer.from(normalized, "base64");
}

function sign(payload: string): string {
  return b64url(createHmac("sha256", getSecret()).update(payload).digest());
}

/** Lifetime access codes (~10 years). User can restore on another browser. */
export function issueAccessCode(access: AccessState): string {
  const payload = JSON.stringify({
    v: 1,
    premium: access.premium ? 1 : 0,
    pdf: access.pdf ? 1 : 0,
    iat: Math.floor(Date.now() / 1000),
  });
  const body = b64url(payload);
  return `TIP.${body}.${sign(body)}`;
}

export function verifyAccessCode(code: string): AccessState | null {
  const raw = code.trim();
  const parts = raw.split(".");
  if (parts.length !== 3 || parts[0] !== "TIP") return null;
  const [, body, sig] = parts;
  if (!body || !sig) return null;

  const expected = sign(body);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  try {
    const parsed = JSON.parse(fromB64url(body).toString("utf8")) as {
      v?: number;
      premium?: number;
      pdf?: number;
      iat?: number;
    };
    if (parsed.v !== 1) return null;
    // Reject codes older than ~10 years
    if (
      typeof parsed.iat === "number" &&
      parsed.iat < Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 365 * 10
    ) {
      return null;
    }
    return {
      premium: Boolean(parsed.premium),
      pdf: Boolean(parsed.pdf),
    };
  } catch {
    return null;
  }
}

export function mergeAccess(a: AccessState, b: AccessState): AccessState {
  return {
    premium: a.premium || b.premium,
    pdf: a.pdf || b.pdf,
  };
}
