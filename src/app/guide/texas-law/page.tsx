import type { Metadata } from "next";
import Link from "next/link";
import { BuyButton } from "@/components/BuyButton";
import { PrintButton } from "@/components/PrintButton";
import { getAccess } from "@/lib/access";
import { PRODUCTS } from "@/data/pricing";
import { TEXAS_LAW_CHEAT_SHEET } from "@/data/texas-law-guide";

export const metadata: Metadata = {
  title: "Texas Law Printable Cheat Sheet",
  description:
    "Printable Texas law study sheet for Life & Health licensing — print or save as PDF from your browser.",
};

export default async function TexasLawGuidePage() {
  const access = await getAccess();
  const pdf = PRODUCTS.pdf;

  if (!access.pdf) {
    return (
      <div className="mx-auto max-w-xl border border-[var(--line)] bg-white p-8">
        <p className="eyebrow">Locked</p>
        <h1 className="mt-2 font-display text-3xl text-[var(--navy)]">
          {pdf.name}
        </h1>
        <p className="mt-3 text-[var(--ink-muted)]">{pdf.blurb}</p>
        <ul className="mt-4 space-y-1 text-sm">
          {pdf.features.map((f) => (
            <li key={f}>• {f}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <BuyButton productId="pdf" label={`Unlock for ${pdf.priceLabel}`} />
          <Link href="/pricing" className="btn-secondary">
            All pricing
          </Link>
        </div>
      </div>
    );
  }

  const sheet = TEXAS_LAW_CHEAT_SHEET;

  return (
    <article className="mx-auto max-w-3xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/pricing" className="btn-ghost">
          ← Pricing
        </Link>
        <PrintButton />
      </div>

      <div className="border border-[var(--line)] bg-white p-6 md:p-10 print:border-0 print:p-0">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
          Texas Insure Prep
        </p>
        <h1 className="mt-2 font-display text-3xl text-[var(--navy)] md:text-4xl">
          {sheet.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
          {sheet.subtitle}
        </p>

        <div className="mt-8 space-y-8">
          {sheet.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl text-[var(--navy)]">
                {section.heading}
              </h2>
              <ul className="mt-2 space-y-2 text-[15px] leading-relaxed text-[var(--ink)]">
                {section.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-[var(--accent)]">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-10 border-t border-[var(--line)] pt-4 text-xs text-[var(--ink-muted)]">
          Not affiliated with TDI or Pearson VUE. Rules change — confirm on
          official sites before you sit.
        </p>
      </div>
    </article>
  );
}
