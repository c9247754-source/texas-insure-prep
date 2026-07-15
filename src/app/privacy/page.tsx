import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}.`,
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl leading-relaxed text-[var(--ink-muted)]">
      <h1 className="font-display text-4xl text-[var(--navy)]">Privacy Policy</h1>
      <p className="mt-2 text-sm">Last updated: July 15, 2026</p>

      <div className="mt-6 space-y-4 text-[15px]">
        <p>
          This Privacy Policy explains how {SITE_NAME} (“we”, “us”) collects and
          uses information when you visit {SITE_URL} or purchase digital study
          products through our checkout provider.
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Information we collect
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-[var(--ink)]">Usage data:</strong> standard
            server/analytics logs such as pages viewed, device/browser type, and
            approximate location derived from IP.
          </li>
          <li>
            <strong className="text-[var(--ink)]">Purchase data:</strong> when
            you buy an unlock or study sheet, payment is processed by Creem (our
            Merchant of Record). We receive limited order confirmation details
            needed to grant access; we do not store full card numbers on our
            servers.
          </li>
          <li>
            <strong className="text-[var(--ink)]">Access cookies:</strong> after
            a successful purchase we may set an httpOnly cookie on your browser
            to remember unlock status for this site.
          </li>
          <li>
            <strong className="text-[var(--ink)]">Messages you send:</strong>{" "}
            if you email {SUPPORT_EMAIL}, we keep the content needed to respond.
          </li>
        </ul>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          How we use information
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Deliver practice content and purchased digital access</li>
          <li>Process payments and prevent fraud/abuse</li>
          <li>Improve the site and answer support requests</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Payment processor
        </h2>
        <p>
          Checkout is handled by Creem. Their processing is governed by Creem’s
          own privacy terms in addition to this policy. Please review Creem’s
          documentation when paying.
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Cookies
        </h2>
        <p>
          We use essential cookies for purchasing/access. We may use basic
          analytics cookies later; you can block non-essential cookies in your
          browser settings.
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Sharing
        </h2>
        <p>
          We do not sell your personal information. We share data only with
          service providers needed to run the site (hosting, payment, email) or
          when required by law.
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Data retention
        </h2>
        <p>
          Access cookies last up to one year unless cleared. Support emails and
          order records are kept as long as reasonably needed for accounting,
          disputes, and legal compliance.
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Your choices
        </h2>
        <p>
          You can clear cookies/site data in your browser to remove unlock
          status. For privacy requests related to purchases, contact{" "}
          <a
            className="underline underline-offset-2"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Children
        </h2>
        <p>
          The site is intended for adults studying for professional licensing
          exams. We do not knowingly collect personal information from children
          under 13.
        </p>

        <h2 className="pt-2 font-display text-2xl text-[var(--navy)]">
          Contact
        </h2>
        <p>
          Privacy questions:{" "}
          <a
            className="underline underline-offset-2"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            {SUPPORT_EMAIL}
          </a>
          . Also see our{" "}
          <Link href="/terms" className="underline underline-offset-2">
            Terms of Service
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
