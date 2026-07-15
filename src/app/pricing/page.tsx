import type { Metadata } from "next";
import Link from "next/link";
import { BuyButton } from "@/components/BuyButton";
import { CourseBanner } from "@/components/QuizEngine";
import { getAccess } from "@/lib/access";
import { PRODUCTS } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing — Unlock Bank & Texas Law PDF",
  description:
    "Unlock the full Texas Life & Health question bank for $12.99 or buy the Texas Law cheat sheet PDF for $9.99.",
};

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  const params = await searchParams;
  const access = await getAccess();
  const unlock = PRODUCTS.unlock;
  const pdf = PRODUCTS.pdf;

  return (
    <div className="mx-auto max-w-4xl">
      <p className="eyebrow">Simple pricing</p>
      <h1 className="mt-2 font-display text-4xl text-[var(--navy)] md:text-5xl">
        Pay once. Drill until you pass.
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-[var(--ink-muted)]">
        Free users get a taste. Most candidates unlock the bank for coffee-money
        and stack the Texas law PDF the week before Pearson VUE.
      </p>

      {params.canceled && (
        <p className="mt-4 border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--ink-muted)]">
          Checkout canceled — no charge. You can restart anytime.
        </p>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="border border-[var(--navy)] bg-white p-6 shadow-[6px_6px_0_rgba(22,50,79,0.12)]">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
            Best value
          </p>
          <h2 className="mt-2 font-display text-3xl text-[var(--navy)]">
            {unlock.name}
          </h2>
          <p className="mt-1 font-display text-4xl text-[var(--ink)]">
            {unlock.priceLabel}
            <span className="ml-2 text-base font-sans font-normal text-[var(--ink-muted)]">
              one-time
            </span>
          </p>
          <p className="mt-3 text-sm text-[var(--ink-muted)]">{unlock.blurb}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {unlock.features.map((f) => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>
          <div className="mt-6">
            {access.premium ? (
              <Link href="/practice/tx-life-health" className="btn-primary">
                Already unlocked — practice
              </Link>
            ) : (
              <BuyButton
                productId="unlock"
                label={`Unlock for ${unlock.priceLabel}`}
              />
            )}
          </div>
        </article>

        <article className="border border-[var(--line)] bg-white/90 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
            Add-on
          </p>
          <h2 className="mt-2 font-display text-3xl text-[var(--navy)]">
            {pdf.name}
          </h2>
          <p className="mt-1 font-display text-4xl text-[var(--ink)]">
            {pdf.priceLabel}
            <span className="ml-2 text-base font-sans font-normal text-[var(--ink-muted)]">
              one-time
            </span>
          </p>
          <p className="mt-3 text-sm text-[var(--ink-muted)]">{pdf.blurb}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {pdf.features.map((f) => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>
          <div className="mt-6">
            {access.pdf ? (
              <Link href="/guide/texas-law" className="btn-secondary">
                Open your cheat sheet
              </Link>
            ) : (
              <BuyButton
                productId="pdf"
                label={`Buy PDF ${pdf.priceLabel}`}
                className="btn-secondary"
              />
            )}
          </div>
        </article>
      </div>

      <section className="mt-12 border border-[var(--line)] bg-[var(--paper-deep)] p-6 text-sm text-[var(--ink-muted)]">
        <p className="font-medium text-[var(--ink)]">What you get after checkout</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            Instant unlock on this browser — full question bank, domain drills, and
            130-question / 150-minute timed mocks aligned to InsTX-LAH pace.
          </li>
          <li>
            Cross-device restore code after checkout — paste it anytime at{" "}
            <a href="/unlock/restore" className="underline underline-offset-2">
              Restore Access
            </a>{" "}
            if you clear cookies or switch browsers.
          </li>
          <li>
            Texas Law printable cheat sheet for one-sitting state-section review
            before Pearson VUE.
          </li>
          <li>
            Secure checkout via Creem. Need help? Email{" "}
            <a
              href="mailto:c9247754@gmail.com"
              className="underline underline-offset-2"
            >
              c9247754@gmail.com
            </a>
            .
          </li>
        </ul>
      </section>

      <CourseBanner />
    </div>
  );
}
