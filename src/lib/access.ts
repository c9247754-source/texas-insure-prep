import { cookies } from "next/headers";
import { ACCESS_COOKIE } from "@/data/pricing";

export type AccessState = {
  premium: boolean;
  pdf: boolean;
};

export function parseAccessCookie(raw: string | undefined): AccessState {
  if (!raw) return { premium: false, pdf: false };
  try {
    const parsed = JSON.parse(raw) as Partial<AccessState>;
    return {
      premium: Boolean(parsed.premium),
      pdf: Boolean(parsed.pdf),
    };
  } catch {
    return { premium: false, pdf: false };
  }
}

export async function getAccess(): Promise<AccessState> {
  const jar = await cookies();
  return parseAccessCookie(jar.get(ACCESS_COOKIE)?.value);
}

export function serializeAccess(state: AccessState): string {
  return JSON.stringify({
    premium: state.premium,
    pdf: state.pdf,
  });
}
