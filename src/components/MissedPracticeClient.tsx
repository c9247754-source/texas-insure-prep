"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { Question } from "@/data/types";
import { QuizEngine } from "@/components/QuizEngine";
import { loadProgress } from "@/lib/progress";

type Props = {
  pool: Question[];
  examSlug: string;
  title: string;
  showUpgradeAfter?: boolean;
};

export function MissedPracticeClient({
  pool,
  examSlug,
  title,
  showUpgradeAfter = false,
}: Props) {
  const questions = useMemo(() => {
    const { wrongIds } = loadProgress();
    const wrong = new Set(wrongIds);
    const byId = new Map(pool.map((q) => [q.id, q]));
    return wrongIds
      .map((id) => byId.get(id))
      .filter((q): q is Question => q !== undefined);
  }, [pool]);

  if (questions.length === 0) {
    return (
      <div className="border border-[var(--line)] bg-white/80 p-8">
        <p className="eyebrow">Missed questions</p>
        <h1 className="mt-2 font-display text-3xl text-[var(--navy)]">
          Nothing to retry yet
        </h1>
        <p className="mt-3 text-[var(--ink-muted)]">
          Answer practice or mock questions first. Wrong items are saved in this
          browser automatically so you can drill them here.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/practice/${examSlug}`} className="btn-primary">
            Start practice
          </Link>
          <Link href={`/topics/${examSlug}`} className="btn-secondary">
            Topics map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <p className="mb-6 text-sm text-[var(--ink-muted)]">
        Retrying {questions.length} missed question
        {questions.length === 1 ? "" : "s"} saved on this device. Get one right
        and it drops off this list.
      </p>
      <QuizEngine
        questions={questions}
        mode="practice"
        title={title}
        examSlug={examSlug}
        showUpgradeAfter={showUpgradeAfter}
      />
    </>
  );
}
