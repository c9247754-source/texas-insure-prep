"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Question } from "@/data/types";
import { DOMAIN_LABELS } from "@/data/types";
import { COURSE_CTA } from "@/data/catalog";
import { UpgradePrompt } from "@/components/UpgradePrompt";

type Mode = "practice" | "mock";

type Props = {
  questions: Question[];
  mode: Mode;
  title: string;
  timeMinutes?: number;
  examSlug: string;
  showUpgradeAfter?: boolean;
};

type AnswerMap = Record<string, number>;

export function QuizEngine({
  questions,
  mode,
  title,
  timeMinutes = 150,
  examSlug,
  showUpgradeAfter = false,
}: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [revealed, setRevealed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(timeMinutes * 60);
  const [timerStarted, setTimerStarted] = useState(mode !== "mock");

  useEffect(() => {
    if (mode !== "mock" || !timerStarted || submitted) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          setSubmitted(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [mode, timerStarted, submitted]);

  const current = questions[index];
  const selected = current ? answers[current.id] : undefined;

  const score = useMemo(() => {
    let correct = 0;
    for (const q of questions) {
      if (answers[q.id] === q.correctIndex) correct += 1;
    }
    return { correct, total: questions.length };
  }, [answers, questions]);

  const domainBreakdown = useMemo(() => {
    const map = new Map<
      string,
      { label: string; correct: number; total: number }
    >();
    for (const q of questions) {
      const row = map.get(q.domain) ?? {
        label: DOMAIN_LABELS[q.domain],
        correct: 0,
        total: 0,
      };
      row.total += 1;
      if (answers[q.id] === q.correctIndex) row.correct += 1;
      map.set(q.domain, row);
    }
    return [...map.values()].sort((a, b) => {
      const ap = a.total ? a.correct / a.total : 0;
      const bp = b.total ? b.correct / b.total : 0;
      return ap - bp;
    });
  }, [answers, questions]);

  function selectChoice(choiceIndex: number) {
    if (!current || submitted) return;
    if (mode === "mock" && answers[current.id] !== undefined) return;

    setAnswers((prev) => ({ ...prev, [current.id]: choiceIndex }));

    if (mode === "practice") {
      setRevealed(true);
    }
  }

  function goNext() {
    if (index < questions.length - 1) {
      setRevealed(false);
      setIndex(index + 1);
      return;
    }
    setSubmitted(true);
  }

  function goPrev() {
    setRevealed(false);
    if (index > 0) setIndex(index - 1);
  }

  function formatTime(total: number) {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  if (!current) {
    return (
      <p className="text-[var(--ink-muted)]">No questions available yet.</p>
    );
  }

  if (submitted || (mode === "mock" && secondsLeft === 0 && timerStarted)) {
    const pct = Math.round((score.correct / score.total) * 100);
    const pass = pct >= 70;
    const missed = questions.filter((q) => answers[q.id] !== q.correctIndex);
    return (
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">Results</p>
        <h1 className="mt-2 font-display text-4xl text-[var(--ink)]">
          {pass ? "Passing pace" : "Keep drilling"} — {pct}%
        </h1>
        <p className="mt-3 text-lg text-[var(--ink-muted)]">
          You got {score.correct} of {score.total} correct. Target 70%+ before
          you schedule Pearson VUE.
        </p>

        {domainBreakdown.length > 1 && (
          <div className="mt-8 border border-[var(--line)] bg-white p-5">
            <h2 className="font-display text-xl text-[var(--navy)]">
              Weak domains first
            </h2>
            <ul className="mt-4 grid gap-2">
              {domainBreakdown.map((row) => {
                const domainPct = Math.round((row.correct / row.total) * 100);
                return (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-[var(--ink)]">{row.label}</span>
                    <span
                      className={
                        domainPct >= 70
                          ? "font-mono text-[var(--pass)]"
                          : "font-mono text-[var(--fail)]"
                      }
                    >
                      {row.correct}/{row.total} · {domainPct}%
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-sm text-[var(--ink-muted)]">
              Drill the lowest domain on the{" "}
              <Link
                href={`/topics/${examSlug}`}
                className="underline underline-offset-2"
              >
                topics map
              </Link>
              .
            </p>
          </div>
        )}

        {missed.length > 0 && (
          <div className="mt-8">
            <h2 className="font-display text-xl text-[var(--navy)]">
              Missed questions ({missed.length})
            </h2>
            <div className="mt-4 grid gap-3">
              {missed.map((q) => (
                <div key={q.id} className="border border-[var(--line)] bg-white p-4">
                  <p className="text-xs uppercase tracking-wider text-[var(--ink-muted)]">
                    {DOMAIN_LABELS[q.domain]}
                  </p>
                  <p className="mt-2 font-medium text-[var(--ink)]">{q.prompt}</p>
                  <p className="mt-2 text-sm text-[var(--ink-muted)]">
                    Answer: {q.choices[q.correctIndex]}
                  </p>
                  <p className="mt-1 text-sm text-[var(--ink)]">{q.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <details className="mt-8 border border-[var(--line)] bg-white/80 p-4">
          <summary className="cursor-pointer font-medium text-[var(--navy)]">
            Full answer review ({questions.length})
          </summary>
          <div className="mt-4 grid gap-3">
            {questions.map((q, i) => {
              const picked = answers[q.id];
              const ok = picked === q.correctIndex;
              return (
                <div key={q.id} className="border border-[var(--line)] bg-white p-4">
                  <p className="text-xs uppercase tracking-wider text-[var(--ink-muted)]">
                    Q{i + 1} · {DOMAIN_LABELS[q.domain]} ·{" "}
                    {ok ? (
                      <span className="text-[var(--pass)]">Correct</span>
                    ) : (
                      <span className="text-[var(--fail)]">Missed</span>
                    )}
                  </p>
                  <p className="mt-2 font-medium text-[var(--ink)]">{q.prompt}</p>
                  <p className="mt-2 text-sm text-[var(--ink-muted)]">
                    Answer: {q.choices[q.correctIndex]}
                  </p>
                  <p className="mt-1 text-sm text-[var(--ink)]">{q.explanation}</p>
                </div>
              );
            })}
          </div>
        </details>

        {showUpgradeAfter && (
          <div className="mt-8">
            <UpgradePrompt reason="Nice work finishing the free set. Unlock the full bank and longer mocks to stay on pace for Pearson VUE." />
          </div>
        )}

        <CourseBanner />

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/practice/${examSlug}`} className="btn-primary">
            Practice again
          </Link>
          <Link href={`/mock/${examSlug}`} className="btn-secondary">
            New mock exam
          </Link>
          <Link href="/pricing" className="btn-ghost">
            Pricing
          </Link>
          <Link href="/" className="btn-ghost">
            Home
          </Link>
        </div>
      </div>
    );
  }

  if (mode === "mock" && !timerStarted) {
    return (
      <div className="mx-auto max-w-xl border border-[var(--line)] bg-white p-8">
        <p className="eyebrow">Mock exam</p>
        <h1 className="mt-2 font-display text-3xl text-[var(--ink)]">{title}</h1>
        <p className="mt-3 text-[var(--ink-muted)]">
          {questions.length} questions · {timeMinutes} minutes · No hints until
          you submit. Timer starts when you begin.
        </p>
        <button
          type="button"
          className="btn-primary mt-6"
          onClick={() => setTimerStarted(true)}
        >
          Begin timed exam
        </button>
      </div>
    );
  }

  const showFeedback =
    mode === "practice" && revealed && selected !== undefined;
  const isCorrect = selected === current.correctIndex;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--line)] pb-4">
        <div>
          <p className="eyebrow">{title}</p>
          <p className="mt-1 text-sm text-[var(--ink-muted)]">
            Question {index + 1} of {questions.length} ·{" "}
            {DOMAIN_LABELS[current.domain]}
          </p>
        </div>
        {mode === "mock" && (
          <p className="font-mono text-lg tabular-nums text-[var(--ink)]">
            {formatTime(secondsLeft)}
          </p>
        )}
      </div>

      <h2 className="mt-8 font-display text-2xl leading-snug text-[var(--ink)] md:text-3xl">
        {current.prompt}
      </h2>

      <div className="mt-8 grid gap-3">
        {current.choices.map((choice, choiceIndex) => {
          const active = selected === choiceIndex;
          let styles =
            "border border-[var(--line)] bg-white text-left transition hover:border-[var(--ink)]";
          if (showFeedback && choiceIndex === current.correctIndex) {
            styles =
              "border border-[var(--pass)] bg-[var(--pass-soft)] text-left";
          } else if (showFeedback && active && !isCorrect) {
            styles =
              "border border-[var(--fail)] bg-[var(--fail-soft)] text-left";
          } else if (active && !showFeedback) {
            styles =
              "border border-[var(--accent)] bg-[var(--accent-soft)] text-left";
          }

          return (
            <button
              key={choice}
              type="button"
              className={`${styles} px-4 py-3 text-[15px] leading-relaxed`}
              onClick={() => selectChoice(choiceIndex)}
            >
              <span className="mr-3 font-mono text-xs text-[var(--ink-muted)]">
                {String.fromCharCode(65 + choiceIndex)}.
              </span>
              {choice}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="mt-6 border border-[var(--line)] bg-[var(--paper-deep)] p-4">
          <p className="font-medium text-[var(--ink)]">
            {isCorrect ? "Correct" : "Not quite"}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--ink-muted)]">
            {current.explanation}
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          className="btn-ghost"
          onClick={goPrev}
          disabled={index === 0}
        >
          Previous
        </button>
        {mode === "practice" ? (
          <button
            type="button"
            className="btn-primary"
            onClick={goNext}
            disabled={selected === undefined}
          >
            {index === questions.length - 1 ? "Finish & review" : "Next"}
          </button>
        ) : (
          <>
            <button
              type="button"
              className="btn-secondary"
              onClick={goNext}
              disabled={index === questions.length - 1}
            >
              Next
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setSubmitted(true)}
            >
              Submit exam
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function CourseBanner() {
  return (
    <aside className="mt-10 border border-[var(--line)] bg-[var(--navy)] p-6 text-[var(--paper)]">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
        Next step
      </p>
      <h3 className="mt-2 font-display text-2xl">{COURSE_CTA.label}</h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">
        {COURSE_CTA.body}
      </p>
      <a
        href={COURSE_CTA.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="btn-accent mt-5 inline-flex"
      >
        {COURSE_CTA.button}
      </a>
    </aside>
  );
}
