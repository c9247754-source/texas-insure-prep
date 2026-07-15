import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${SITE_NAME}.`,
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl leading-relaxed text-[var(--ink-muted)]">
      <h1 className="font-display text-4xl text-[var(--navy)]">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm">Last updated: July 15, 2026</p>

      <div className="mt-6 space-y-4 text-[15px]">
        <p>
          These Terms of Service (“Terms”) govern your use of {SITE_NAME} at{" "}
          {SITE_URL}. By using the site or purchasing digital products, you
          agree to these Terms.
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Educational use only
        </h2>
        <p>
          Content is original educational practice material for Texas insurance
          licensing study. We are not affiliated with TDI, Pearson VUE, or any
          insurer. Practice questions are not live exam items and do not
          guarantee a passing score or a license.
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Accounts & access
        </h2>
        <p>
          Paid unlocks are typically granted via browser cookie after checkout.
          Access is intended for the purchaser on the browsers where the cookie
          is stored. Clearing cookies, switching devices, or using private
          browsing may remove access until support restores it when possible.
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Products & pricing
        </h2>
        <p>
          Digital products (such as full question-bank unlock and the Texas law
          cheat sheet) are sold as one-time purchases unless otherwise stated.
          Prices are shown in USD at checkout. Payments are processed by Creem
          as Merchant of Record.
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Refunds
        </h2>
        <p>
          Because products are instant digital access, refunds are generally not
          available after delivery except where required by law or if a verified
          technical failure prevents access. Contact{" "}
          <a
            className="underline underline-offset-2"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            {SUPPORT_EMAIL}
          </a>{" "}
          within 7 days of purchase if access fails after a successful payment.
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Acceptable use
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Do not scrape, copy, or redistribute question banks commercially</li>
          <li>Do not claim our practice items are official exam questions</li>
          <li>Do not attempt to reverse-engineer or abuse checkout/access systems</li>
        </ul>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Affiliate links
        </h2>
        <p>
          Some outbound course links may be affiliate links. We may earn a
          commission at no extra cost to you. Affiliate partners are independent;
          we do not control their products or results.
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Disclaimer of warranties
        </h2>
        <p>
          The site and products are provided “as is” without warranties of any
          kind to the fullest extent permitted by law. Licensing rules change—
          always verify requirements on official sites.
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Limitation of liability
        </h2>
        <p>
          To the fullest extent permitted by law, {SITE_NAME} is not liable for
          exam results, licensing outcomes, lost profits, or indirect damages
          arising from use of the site or products. Our total liability for a
          purchase is limited to the amount you paid for that purchase.
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Changes
        </h2>
        <p>
          We may update these Terms by posting a new version on this page. Continued
          use after changes constitutes acceptance.
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Contact / support
        </h2>
        <p>
          Customer support:{" "}
          <a
            className="underline underline-offset-2"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            {SUPPORT_EMAIL}
          </a>
          . Also see our{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/disclaimer" className="underline underline-offset-2">
            Disclaimer
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
