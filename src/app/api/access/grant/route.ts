import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  resolveProductFromCreemId,
  type ProductId,
} from "@/data/pricing";
import { parseAccessCookie, serializeAccess } from "@/lib/access";
import { isCreemConfigured } from "@/lib/app-url";
import { verifyCreemRedirectSignature } from "@/lib/creem";

function grant(
  productId: ProductId,
  current: { premium: boolean; pdf: boolean },
) {
  if (productId === "unlock") return { ...current, premium: true };
  if (productId === "pdf") return { ...current, pdf: true };
  return current;
}

function readCurrentAccess(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const raw = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${ACCESS_COOKIE}=`))
    ?.slice(ACCESS_COOKIE.length + 1);
  return parseAccessCookie(raw ? decodeURIComponent(raw) : undefined);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    productId?: ProductId;
    demo?: boolean;
    /** Raw query string from Creem success redirect (without leading ?) */
    creemQuery?: string;
    checkoutId?: string | null;
    orderId?: string | null;
    customerId?: string | null;
    subscriptionId?: string | null;
    creemProductId?: string | null;
    requestId?: string | null;
    signature?: string | null;
  } | null;

  const current = readCurrentAccess(request);

  // Demo unlock when Creem is not configured
  if (body?.demo) {
    const productId = body.productId;
    if (!productId || (productId !== "unlock" && productId !== "pdf")) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }
    if (isCreemConfigured() && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Demo unlock disabled when Creem is configured in production" },
        { status: 403 },
      );
    }
    const next = grant(productId, current);
    const res = NextResponse.json({ ok: true, access: next, mode: "demo" });
    res.cookies.set(ACCESS_COOKIE, serializeAccess(next), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return res;
  }

  if (!isCreemConfigured() || !process.env.CREEM_API_KEY) {
    return NextResponse.json({ error: "Creem not configured" }, { status: 400 });
  }

  // Prefer verifying the raw redirect query (preserves param order)
  if (body?.creemQuery) {
    const valid = verifyCreemRedirectSignature(
      body.creemQuery,
      process.env.CREEM_API_KEY,
    );
    if (!valid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 401 });
    }

    const params = new URLSearchParams(body.creemQuery);
    const productId = resolveProductFromCreemId(
      params.get("product_id"),
      params.get("request_id"),
    );
    if (!productId) {
      return NextResponse.json({ error: "Unknown product" }, { status: 400 });
    }

    const next = grant(productId, current);
    const res = NextResponse.json({
      ok: true,
      access: next,
      mode: "creem",
      productId,
    });
    res.cookies.set(ACCESS_COOKIE, serializeAccess(next), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  }

  return NextResponse.json(
    { error: "Missing Creem payment payload" },
    { status: 400 },
  );
}
