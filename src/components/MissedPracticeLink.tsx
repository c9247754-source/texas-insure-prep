"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getWrongCount } from "@/lib/progress";

type Props = { examSlug: string };

export function MissedPracticeLink({ examSlug }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getWrongCount());
    const onStorage = () => setCount(getWrongCount());
    window.addEventListener("storage", onStorage);
    window.addEventListener("tip-progress", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("tip-progress", onStorage);
    };
  }, []);

  if (count === 0) return null;

  return (
    <Link
      href={`/practice/${examSlug}/missed`}
      className="inline-flex items-center gap-2 border border-[var(--fail)] bg-[var(--fail-soft)] px-4 py-2 text-sm font-medium text-[var(--ink)]"
    >
      Retry {count} missed question{count === 1 ? "" : "s"}
    </Link>
  );
}
