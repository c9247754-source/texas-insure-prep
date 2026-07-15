import { NextResponse } from "next/server";
import { ACCESS_COOKIE } from "@/data/pricing";
import { parseAccessCookie, serializeAccess } from "@/lib/access";
import { mergeAccess, verifyAccessCode } from "@/lib/access-code";

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
    code?: string;
  } | null;

  const code = body?.code?.trim();
  if (!code) {
    return NextResponse.json({ error: "Access code required" }, { status: 400 });
  }

  const restored = verifyAccessCode(code);
  if (!restored || (!restored.premium && !restored.pdf)) {
    return NextResponse.json(
      { error: "Invalid or expired access code" },
      { status: 401 },
    );
  }

  const next = mergeAccess(readCurrentAccess(request), restored);
  const res = NextResponse.json({ ok: true, access: next, mode: "restore" });
  res.cookies.set(ACCESS_COOKIE, serializeAccess(next), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
