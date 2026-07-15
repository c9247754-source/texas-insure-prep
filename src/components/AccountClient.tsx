"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RestoreAccessForm } from "@/components/RestoreAccessForm";
import { loadProgress, type SavedProgress } from "@/lib/progress";

type Access = { premium: boolean; pdf: boolean };

type Props = {
  access: Access;
};

export function AccountClient({ access }: Props) {
  const [progress, setProgress] = useState<SavedProgress | null>(null);
  const [savedCode, setSavedCode] = useState<string | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
    try {
      setSavedCode(window.localStorage.getItem("tip_access_code"));
    } catch {
      setSavedCode(null);
    }
  }, []);

  const answered = progress ? Object.keys(progress.answered).length : 0;
  const wrong = progress?.wrongIds.length ?? 0;
  const examSlug = progress?.lastExamSlug ?? "tx-life-health";

  return (
    <div className="mx-auto max-w-2xl grid gap-8">
      <section className="border border-[var(--line)] bg-white p-6">
        <p className="eyebrow">Entitlements</p>
        <h2 className="mt-2 font-display text-2xl text-[var(--navy)]">
          Your access on this browser
        </h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            Full question bank:{" "}
            <strong className={access.premium ? "text-[var(--pass)]" : ""}>
              {access.premium ? "Unlocked" : "Locked"}
            </strong>
          </li>
          <li>
            Texas Law PDF:{" "}
            <strong className={access.pdf ? "text-[var(--pass)]" : ""}>
              {access.pdf ? "Unlocked" : "Locked"}
            </strong>
          </li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          {access.premium ? (
            <Link href="/practice/tx-life-health" className="btn-primary">
              Practice full bank
            </Link>
          ) : (
            <Link href="/pricing" className="btn-primary">
              Unlock bank · $12.99
            </Link>
          )}
          {access.pdf ? (
            <a href="/api/pdf/texas-law" className="btn-secondary">
              Download PDF
            </a>
          ) : (
            <Link href="/pricing" className="btn-secondary">
              Buy cheat sheet · $9.99
            </Link>
          )}
        </div>
      </section>

      <section className="border border-[var(--line)] bg-white p-6">
        <p className="eyebrow">Study progress</p>
        <h2 className="mt-2 font-display text-2xl text-[var(--navy)]">
          Saved on this device
        </h2>
        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-[var(--ink-muted)]">Questions answered</dt>
            <dd className="text-xl font-semibold">{answered}</dd>
          </div>
          <div>
            <dt className="text-[var(--ink-muted)]">Missed to retry</dt>
            <dd className="text-xl font-semibold">{wrong}</dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/practice/${examSlug}/missed`}
            className="btn-secondary"
          >
            Retry missed
          </Link>
          <Link href={`/topics/${examSlug}`} className="btn-ghost">
            Topics map
          </Link>
        </div>
        <p className="mt-3 text-xs text-[var(--ink-muted)]">
          Progress uses browser storage. Clearing site data resets the miss list
          — entitlements stay if you keep your TIP access code.
        </p>
      </section>

      <section className="border border-[var(--line)] bg-white p-6">
        <p className="eyebrow">Sign in with access code</p>
        <h2 className="mt-2 font-display text-2xl text-[var(--navy)]">
          No password account
        </h2>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          Purchases issue a <code>TIP.…</code> code instead of email/password.
          Paste it here (or on Restore) to unlock another browser.
        </p>
        {savedCode && (
          <div className="mt-4 border border-[var(--line)] bg-[var(--paper-deep)] p-3">
            <p className="text-xs text-[var(--ink-muted)]">
              Code saved locally on this device
            </p>
            <p className="mt-1 break-all font-mono text-xs">{savedCode}</p>
          </div>
        )}
        <RestoreAccessForm />
      </section>
    </div>
  );
}
