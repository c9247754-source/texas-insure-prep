import type { Metadata } from "next";
import { AccountClient } from "@/components/AccountClient";
import { getAccess } from "@/lib/access";

export const metadata: Metadata = {
  title: "Your Access Account",
  description:
    "View unlock status, study progress, and restore purchases with your TIP access code — no password required.",
};

export default async function AccountPage() {
  const access = await getAccess();

  return (
    <div className="mx-auto max-w-2xl">
      <p className="eyebrow">Account</p>
      <h1 className="mt-2 font-display text-4xl text-[var(--navy)]">
        Your Texas Insure Prep access
      </h1>
      <p className="mt-3 text-lg text-[var(--ink-muted)]">
        Lightweight account powered by your purchase access code — not a
        password login.
      </p>
      <div className="mt-10">
        <AccountClient access={access} />
      </div>
    </div>
  );
}
