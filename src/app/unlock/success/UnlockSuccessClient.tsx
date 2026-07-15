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
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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
          accessCode?: string;
        };
        if (!res.ok) throw new Error(data.error ?? "Grant failed");
        if (data.productId) setProduct(data.productId);
        else if (params.get("request_id") === "pdf") setProduct("pdf");
        if (data.accessCode) {
          setAccessCode(data.accessCode);
          try {
            window.localStorage.setItem("tip_access_code", data.accessCode);
          } catch {
            /* ignore */
          }
        }
        setStatus("ok");
        setMessage(
          "You’re in. Access unlocked on this browser — save your restore code below for other devices.",
        );
      } catch (err) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Could not unlock");
      }
    }
    void grant();
  }, [params]);

  async function copyCode() {
    if (!accessCode) return;
    try {
      await navigator.clipboard.writeText(accessCode);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

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

      {status === "ok" && accessCode && (
        <div className="mt-6 border border-[var(--line)] bg-[var(--paper-deep)] p-4 text-left">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--ink-muted)]">
            Cross-device restore code
          </p>
          <p className="mt-2 break-all font-mono text-xs leading-relaxed text-[var(--ink)]">
            {accessCode}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn-secondary" onClick={copyCode}>
              {copied ? "Copied" : "Copy code"}
            </button>
            <Link href="/unlock/restore" className="btn-ghost">
              Restore later
            </Link>
          </div>
          <p className="mt-3 text-xs text-[var(--ink-muted)]">
            Screenshot or save this code. If cookies clear or you switch browsers,
            paste it at Restore Access to unlock again — no new payment required.
          </p>
        </div>
      )}

      {status === "ok" && (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {product === "pdf" ? (
            <Link href="/guide/texas-law" className="btn-primary">
              Open Texas Law sheet
            </Link>
          ) : (
            <Link href="/practice/tx-life-health" className="btn-primary">
              Start full practice
            </Link>
          )}
          <Link href="/account" className="btn-ghost">
            Account
          </Link>
          <Link href="/pricing" className="btn-secondary">
            Pricing
          </Link>
        </div>
      )}
    </div>
  );
}
