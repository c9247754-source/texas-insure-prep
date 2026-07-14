import { Suspense } from "react";
import UnlockSuccessClient from "./UnlockSuccessClient";

export default function UnlockSuccessPage() {
  return (
    <Suspense
      fallback={
        <p className="mx-auto max-w-lg text-center text-[var(--ink-muted)]">
          Confirming payment…
        </p>
      }
    >
      <UnlockSuccessClient />
    </Suspense>
  );
}
