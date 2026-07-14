"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ProductId } from "@/data/pricing";

export default function UnlockSuccessClient() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const product = (params.get("product") as ProductId | null) ?? "unlock";
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState("Confirming payment…");

  useEffect(() => {
    async function grant() {
      try {
        const res = await fetch("/api/access/grant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, productId: product }),
        });
        const data = (await res.json()) as { error?: string };
        if (!res.ok) throw new Error(data.error ?? "Grant failed");
        setStatus("ok");
        setMessage("You’re in. Access unlocked on this browser.");
      } catch (err) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Could not unlock");
      }
    }
    void grant();
  }, [sessionId, product]);

  return (
    <div className="mx-auto max-w-lg border border-[var(--line)] bg-white p-8 text-center">
      <p className="eyebrow">Checkout</p>
      <h1 className="mt-2 font-display text-3xl text-[var(--navy)]">
        {status === "ok"
          ? "Payment confirmed"
          : status === "error"
            ? "Something went wrong"
            : "Finishing up"}
      </h1>
      <p className="mt-3 text-[var(--ink-muted)]">{message}</p>
      {status === "ok" && (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {product === "pdf" ? (
            <Link href="/guide/texas-law" className="btn-primary">
              Open Texas Law PDF
            </Link>
          ) : (
            <Link href="/practice/tx-life-health" className="btn-primary">
              Start full practice
            </Link>
          )}
          <Link href="/pricing" className="btn-secondary">
            Pricing
          </Link>
        </div>
      )}
    </div>
  );
}
