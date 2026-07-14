import { NextResponse } from "next/server";
import { ACCESS_COOKIE, type ProductId } from "@/data/pricing";
import { parseAccessCookie, serializeAccess } from "@/lib/access";
import { getStripe } from "@/lib/stripe";

function grant(productId: ProductId, current: { premium: boolean; pdf: boolean }) {
  if (productId === "unlock") return { ...current, premium: true };
  if (productId === "pdf") return { ...current, pdf: true };
  return current;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    sessionId?: string;
    productId?: ProductId;
    demo?: boolean;
  } | null;

  const productId = body?.productId;
  if (!productId || (productId !== "unlock" && productId !== "pdf")) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  const cookieHeader = request.headers.get("cookie") ?? "";
  const raw = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${ACCESS_COOKIE}=`))
    ?.slice(ACCESS_COOKIE.length + 1);
  const current = parseAccessCookie(raw ? decodeURIComponent(raw) : undefined);

  // Demo unlock when Stripe is not configured
  if (body?.demo) {
    if (process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Demo unlock disabled in production with Stripe" },
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

  const stripe = getStripe();
  if (!stripe || !body.sessionId) {
    return NextResponse.json({ error: "Missing session" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(body.sessionId);
  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
  }

  const paidProduct =
    (session.metadata?.productId as ProductId | undefined) ?? productId;
  const next = grant(paidProduct, current);

  const res = NextResponse.json({ ok: true, access: next, mode: "stripe" });
  res.cookies.set(ACCESS_COOKIE, serializeAccess(next), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
