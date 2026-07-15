import type { Metadata } from "next";
import Link from "next/link";
import { RestoreAccessForm } from "@/components/RestoreAccessForm";
import { SUPPORT_EMAIL } from "@/data/site";

export const metadata: Metadata = {
  title: "Restore Access",
  description:
    "Paste your Texas Insure Prep access code to unlock purchases on a new browser or device.",
};

export default function RestoreAccessPage() {
  return (
    <div className="mx-auto max-w-lg">
      <p className="eyebrow">Cross-device unlock</p>
      <h1 className="mt-2 font-display text-4xl text-[var(--navy)]">
        Restore your purchase
      </h1>
      <p className="mt-3 text-[var(--ink-muted)]">
        Access is stored as a cookie on the browser you used at checkout. If you
        clear cookies or switch devices, paste the access code shown after
        payment to restore full bank and/or Texas law sheet access here.
      </p>
      <RestoreAccessForm />
      <p className="mt-8 text-sm text-[var(--ink-muted)]">
        Lost your code? Email{" "}
        <a
          href={`mailto:${SUPPORT_EMAIL}?subject=Restore%20access%20code`}
          className="underline underline-offset-2"
        >
          {SUPPORT_EMAIL}
        </a>{" "}
        with your Creem receipt. Or open{" "}
        <Link href="/account" className="underline underline-offset-2">
          Account
        </Link>{" "}
        for entitlements and progress.
      </p>
    </div>
  );
}
