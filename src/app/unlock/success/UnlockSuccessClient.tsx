"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ProductId } from "@/data/pricing";

export default function UnlockSuccessClient() {
  const params = useSearchParams();
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState("Confirming payment…");
  const [product, setProduct] = useState<ProductId>("unlock");

  useEffect(() => {
    async function grant() {
      try {
        // Preserve raw query order for Creem signature verification
        const creemQuery = window.location.search.replace(/^\?/, "");
        if (!creemQuery.includes("checkout_id") && !creemQuery.includes("signature")) {
          throw new Error("Missing Creem payment details in the URL");
        }

        const res = await fetch("/api/access/grant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ creemQuery }),
        });
        const data = (await res.json()) as {
          error?: string;
          productId?: ProductId;
        };
        if (!res.ok) throw new Error(data.error ?? "Grant failed");
        if (data.productId) setProduct(data.productId);
        else if (params.get("request_id") === "pdf") setProduct("pdf");
        setStatus("ok");
        setMessage("You’re in. Access unlocked on this browser.");
      } catch (err) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Could not unlock");
      }
    }
    void grant();
  }, [params]);

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
