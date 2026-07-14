import Link from "next/link";
import { CourseBanner } from "@/components/QuizEngine";
import { EXAMS, getQuestions } from "@/data/catalog";
import { LEARN_ARTICLES } from "@/data/seo/learn-articles";

export default function HomePage() {
  const primary = EXAMS[0];
  const secondary = EXAMS[1];
  const count = getQuestions(primary.slug).length;
  const pcCount = secondary ? getQuestions(secondary.slug).length : 0;

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
            Drill {count}+ original questions — especially Texas law — before you
            book Pearson VUE.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/practice/${primary.slug}`} className="btn-primary">
              Start free practice
            </Link>
            <Link href="/pricing" className="btn-secondary">
              Unlock full bank · $12.99
            </Link>
            <Link href="/learn" className="btn-ghost">
              Free study guides
            </Link>
          </div>
        </div>

        <aside className="border border-[var(--line)] bg-white/80 p-6 shadow-[8px_8px_0_rgba(22,50,79,0.08)]">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
            Flagship track
          </p>
          <h2 className="mt-2 font-display text-2xl text-[var(--navy)]">
            {primary.shortTitle}
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
                ~{primary.scoredQuestions} scored
              </dd>
            </div>
            <div>
              <dt className="text-[var(--ink-muted)]">Time limit</dt>
              <dd className="text-xl font-semibold text-[var(--ink)]">
                {primary.timeMinutes} min
              </dd>
            </div>
            <div>
              <dt className="text-[var(--ink-muted)]">Pass target</dt>
              <dd className="text-xl font-semibold text-[var(--ink)]">
                {primary.passingScore}%
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="mt-20 grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Practice mode",
            body: `Free preview of 20 questions. Unlock all ${count} L&H items for $12.99.`,
            href: `/practice/${primary.slug}`,
          },
          {
            title: "Mock exam",
            body: "Timed runs — free short mock, longer exams after unlock.",
            href: `/mock/${primary.slug}`,
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

      {secondary && (
        <section className="mt-16 border border-[var(--line)] bg-[var(--paper-deep)] p-6 md:p-8">
          <p className="eyebrow">Also live</p>
          <h2 className="mt-2 font-display text-3xl text-[var(--navy)]">
            {secondary.shortTitle} starter bank
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--ink-muted)]">
            {pcCount} original P&C practice items covering homeowners, auto,
            commercial liability themes, and Texas market conduct — included with
            the same unlock.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/practice/${secondary.slug}`}
              className="btn-secondary"
            >
              Start P&C practice
            </Link>
            <Link href={`/topics/${secondary.slug}`} className="btn-ghost">
              P&C topics
            </Link>
          </div>
        </section>
      )}

      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">SEO study guides</p>
            <h2 className="mt-2 font-display text-3xl text-[var(--navy)]">
              Free licensing guides
            </h2>
          </div>
          <Link href="/learn" className="text-sm text-[var(--navy)] underline underline-offset-2">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {LEARN_ARTICLES.slice(0, 4).map((article) => (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="border border-[var(--line)] bg-white/80 px-4 py-3 hover:border-[var(--navy)]"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
                {article.eyebrow}
              </p>
              <p className="mt-1 font-display text-lg text-[var(--navy)]">
                {article.title}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <CourseBanner />
    </div>
  );
}
