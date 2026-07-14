"use client";

import { useState } from "react";
import type { ProductId } from "@/data/pricing";

type Props = {
  productId: ProductId;
  label?: string;
  className?: string;
};

export function BuyButton({
  productId,
  label = "Buy now",
  className = "btn-primary",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Checkout failed");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        className={className}
        onClick={startCheckout}
        disabled={loading}
      >
        {loading ? "Redirecting…" : label}
      </button>
      {error && <p className="mt-2 text-sm text-[var(--fail)]">{error}</p>}
    </div>
  );
}
