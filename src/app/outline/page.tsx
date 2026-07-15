import type { Metadata } from "next";
import Link from "next/link";
import {
  INSTX_LAH_TOPICS,
  OUTLINE_SOURCE,
  OUTLINE_TOPIC_COUNT,
} from "@/data/outline/instx-lah";
import coverage from "@/data/outline/coverage-report.json";

export const metadata: Metadata = {
  title: "InsTX-LAH Outline Map — Pearson VUE Themes",
  description:
    "Study map of Pearson VUE Texas Insurance Content Outlines (InsTX-LAH) themes. Original practice questions aligned to public outline topics — not live exam items.",
};

export default function OutlinePage() {
  const sections = Array.from(
    new Set(INSTX_LAH_TOPICS.map((t) => t.section)),
  );
  const byId = Object.fromEntries(
    coverage.rows.map((r) => [r.id, r.status as "strong" | "ok" | "weak"]),
  );

  return (
    <article className="mx-auto max-w-3xl">
      <p className="eyebrow">Study map</p>
      <h1 className="mt-2 font-display text-4xl text-[var(--navy)] md:text-5xl">
        InsTX-LAH outline alignment
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-[var(--ink-muted)]">
        Our bank is mapped to{" "}
        <strong className="font-medium text-[var(--ink)]">
          {OUTLINE_TOPIC_COUNT} public themes
        </strong>{" "}
        from the {OUTLINE_SOURCE.name} (effective {OUTLINE_SOURCE.effective}).
        Items are original educational practice — not Pearson VUE or TDI exam
        questions.
      </p>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <a
          href={OUTLINE_SOURCE.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Official outline PDF
        </a>
        <a
          href={OUTLINE_SOURCE.hub}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Pearson VUE Texas hub
        </a>
        <Link href="/practice/tx-life-health" className="btn-ghost">
          Start practice
        </Link>
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-4 border border-[var(--line)] bg-white/80 p-5 text-sm md:grid-cols-4">
        <div>
          <dt className="text-[var(--ink-muted)]">Themes tracked</dt>
          <dd className="text-2xl font-semibold text-[var(--ink)]">
            {coverage.totals.topics}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--ink-muted)]">Coverage</dt>
          <dd className="text-2xl font-semibold text-[var(--ink)]">
            {coverage.totals.coveragePct}%
          </dd>
        </div>
        <div>
          <dt className="text-[var(--ink-muted)]">Strong / OK</dt>
          <dd className="text-2xl font-semibold text-[var(--ink)]">
            {coverage.totals.strong + coverage.totals.ok}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--ink-muted)]">Still weak</dt>
          <dd className="text-2xl font-semibold text-[var(--ink)]">
            {coverage.totals.weak}
          </dd>
        </div>
      </dl>

      <p className="mt-4 text-sm text-[var(--ink-muted)]">
        {OUTLINE_SOURCE.disclaimer}
      </p>

      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <section key={section}>
            <h2 className="font-display text-2xl text-[var(--navy)]">
              {section}
            </h2>
            <ul className="mt-4 space-y-2">
              {INSTX_LAH_TOPICS.filter((t) => t.section === section).map(
                (topic) => {
                  const status = byId[topic.id] ?? "ok";
                  return (
                    <li
                      key={topic.id}
                      className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--line)] py-2 text-sm"
                    >
                      <span className="text-[var(--ink)]">{topic.title}</span>
                      <span
                        className={
                          status === "strong"
                            ? "text-[var(--navy)]"
                            : status === "weak"
                              ? "text-[var(--accent)]"
                              : "text-[var(--ink-muted)]"
                        }
                      >
                        {status}
                      </span>
                    </li>
                  );
                },
              )}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
