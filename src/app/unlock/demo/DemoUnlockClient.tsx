"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ProductId } from "@/data/pricing";

export default function DemoUnlockClient() {
  const params = useSearchParams();
  const product = (params.get("product") as ProductId | null) ?? "unlock";
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessCode, setAccessCode] = useState<string | null>(null);

  useEffect(() => {
    async function grant() {
      try {
        const res = await fetch("/api/access/grant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product, demo: true }),
        });
        const data = (await res.json()) as {
          error?: string;
          accessCode?: string;
        };
        if (!res.ok) throw new Error(data.error ?? "Demo grant failed");
        if (data.accessCode) {
          setAccessCode(data.accessCode);
          try {
            window.localStorage.setItem("tip_access_code", data.accessCode);
          } catch {
            /* ignore */
          }
        }
        setDone(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Demo grant failed");
      }
    }
    void grant();
  }, [product]);

  return (
    <div className="mx-auto max-w-lg border border-[var(--line)] bg-white p-8">
      <p className="eyebrow">Demo mode</p>
      <h1 className="mt-2 font-display text-3xl text-[var(--navy)]">
        Creem not connected yet
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
        No <code>CREEM_API_KEY</code> found, so we unlocked{" "}
        <strong>{product}</strong> locally for funnel testing. Create two
        products in Creem, then set env vars from <code>.env.example</code>.
      </p>
      {error && <p className="mt-3 text-sm text-[var(--fail)]">{error}</p>}
      {done && accessCode && (
        <div className="mt-4 border border-[var(--line)] bg-[var(--paper-deep)] p-3">
          <p className="text-xs text-[var(--ink-muted)]">Demo restore code</p>
          <p className="mt-1 break-all font-mono text-xs">{accessCode}</p>
          <Link
            href="/unlock/restore"
            className="mt-2 inline-block text-sm underline underline-offset-2"
          >
            Test restore page
          </Link>
        </div>
      )}
      {done && (
        <div className="mt-6 flex flex-wrap gap-3">
          {product === "pdf" ? (
            <Link href="/guide/texas-law" className="btn-primary">
              Open cheat sheet
            </Link>
          ) : (
            <Link href="/practice/tx-life-health" className="btn-primary">
              Full practice
            </Link>
          )}
          <Link href="/pricing" className="btn-secondary">
            Back to pricing
          </Link>
        </div>
      )}
    </div>
  );
}
