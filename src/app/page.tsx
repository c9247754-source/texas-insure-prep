import Link from "next/link";
import { CourseBanner } from "@/components/QuizEngine";
import { EXAMS, getQuestions } from "@/data/catalog";

export default function HomePage() {
  const exam = EXAMS[0];
  const count = getQuestions(exam.slug).length;

  return (
    <div className="mx-auto max-w-5xl">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="eyebrow">Texas · Life & Health · Free</p>
          <h1 className="mt-3 max-w-xl font-display text-5xl leading-[1.05] tracking-tight text-[var(--navy)] md:text-6xl">
            Texas Insure Prep
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[var(--ink-muted)]">
            First-time pass rates for TX Life & Health hover around the mid-50s.
            Drill original practice questions — especially Texas law — before you
            book Pearson VUE.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/practice/${exam.slug}`} className="btn-primary">
              Start free practice
            </Link>
            <Link href="/pricing" className="btn-secondary">
              Unlock full bank · $12.99
            </Link>
            <Link href="/guide/texas-law" className="btn-ghost">
              TX Law PDF · $9.99
            </Link>
          </div>
        </div>

        <aside className="border border-[var(--line)] bg-white/80 p-6 shadow-[8px_8px_0_rgba(22,50,79,0.08)]">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
            Launch track
          </p>
          <h2 className="mt-2 font-display text-2xl text-[var(--navy)]">
            {exam.shortTitle}
          </h2>
          <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-[var(--ink-muted)]">Practice bank</dt>
              <dd className="text-xl font-semibold text-[var(--ink)]">
                {count} Qs
              </dd>
            </div>
            <div>
              <dt className="text-[var(--ink-muted)]">Real exam pace</dt>
              <dd className="text-xl font-semibold text-[var(--ink)]">
                ~{exam.scoredQuestions} scored
              </dd>
            </div>
            <div>
              <dt className="text-[var(--ink-muted)]">Time limit</dt>
              <dd className="text-xl font-semibold text-[var(--ink)]">
                {exam.timeMinutes} min
              </dd>
            </div>
            <div>
              <dt className="text-[var(--ink-muted)]">Pass target</dt>
              <dd className="text-xl font-semibold text-[var(--ink)]">
                {exam.passingScore}%
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="mt-20 grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Practice mode",
            body: "Free preview of 20 questions. Unlock the full bank for $12.99.",
            href: `/practice/${exam.slug}`,
          },
          {
            title: "Mock exam",
            body: "Timed runs — free short mock, longer exams after unlock.",
            href: `/mock/${exam.slug}`,
          },
          {
            title: "Texas law PDF",
            body: "$9.99 printable cheat sheet for the state section that sinks first-timers.",
            href: `/guide/texas-law`,
          },
        ].map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group border border-[var(--line)] bg-white/70 p-5 transition hover:border-[var(--navy)]"
          >
            <h3 className="font-display text-xl text-[var(--navy)] group-hover:underline">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
              {card.body}
            </p>
          </Link>
        ))}
      </section>

      <CourseBanner />
    </div>
  );
}
