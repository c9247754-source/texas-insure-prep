import Link from "next/link";
import { BuyButton } from "@/components/BuyButton";
import { COURSE_CTA } from "@/data/catalog";
import { PRODUCTS } from "@/data/pricing";

type Props = {
  reason?: string;
  compact?: boolean;
};

export function UpgradePrompt({
  reason = "You’ve hit the free limit. Unlock the full bank to keep drilling.",
  compact = false,
}: Props) {
  const unlock = PRODUCTS.unlock;
  const pdf = PRODUCTS.pdf;

  return (
    <aside
      className={`border border-[var(--line)] bg-white ${compact ? "p-5" : "p-6 md:p-8"}`}
    >
      <p className="eyebrow">Upgrade</p>
      <h3 className="mt-2 font-display text-2xl text-[var(--navy)]">
        {unlock.name} — {unlock.priceLabel}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
        {reason}
      </p>
      <ul className="mt-4 space-y-1.5 text-sm text-[var(--ink)]">
        {unlock.features.map((f) => (
          <li key={f}>• {f}</li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-3">
        <BuyButton
          productId="unlock"
          label={`Unlock for ${unlock.priceLabel}`}
        />
        <Link href="/pricing" className="btn-secondary">
          See all pricing
        </Link>
      </div>

      <div className="mt-6 border-t border-[var(--line)] pt-5">
        <p className="text-sm font-medium text-[var(--ink)]">
          Or grab the {pdf.name} — {pdf.priceLabel}
        </p>
        <p className="mt-1 text-sm text-[var(--ink-muted)]">{pdf.blurb}</p>
        <div className="mt-3">
          <BuyButton
            productId="pdf"
            label={`Buy PDF ${pdf.priceLabel}`}
            className="btn-secondary"
          />
        </div>
      </div>

      <p className="mt-6 text-xs text-[var(--ink-muted)]">
        Prefer a full video course?{" "}
        <a
          href={COURSE_CTA.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="underline underline-offset-2"
        >
          {COURSE_CTA.button}
        </a>
      </p>
    </aside>
  );
}
