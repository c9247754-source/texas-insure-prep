import type { Metadata } from "next";
import Link from "next/link";
import { SUPPORT_EMAIL } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact & Support",
  description: "Contact Texas Insure Prep customer support by email.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl">
      <p className="eyebrow">Support</p>
      <h1 className="mt-2 font-display text-4xl text-[var(--navy)]">
        Contact & Support
      </h1>
      <p className="mt-4 text-[var(--ink-muted)]">
        Questions about purchases, unlocks, or study access? Email us and we
        will help as quickly as we can.
      </p>
      <p className="mt-8 font-display text-2xl text-[var(--navy)]">
        <a className="underline underline-offset-4" href={`mailto:${SUPPORT_EMAIL}`}>
          {SUPPORT_EMAIL}
        </a>
      </p>
      <ul className="mt-6 space-y-2 text-sm text-[var(--ink-muted)]">
        <li>• Include your order email / approximate purchase time if asking about access</li>
        <li>• Educational practice only — we cannot provide official TDI licensing decisions</li>
      </ul>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/pricing" className="btn-secondary">
          Pricing
        </Link>
        <Link href="/terms" className="btn-ghost">
          Terms
        </Link>
        <Link href="/privacy" className="btn-ghost">
          Privacy
        </Link>
      </div>
    </div>
  );
}
