import { Suspense } from "react";
import DemoUnlockClient from "./DemoUnlockClient";

export default function DemoUnlockPage() {
  return (
    <Suspense
      fallback={
        <p className="mx-auto max-w-lg text-[var(--ink-muted)]">
          Unlocking demo access…
        </p>
      }
    >
      <DemoUnlockClient />
    </Suspense>
  );
}
