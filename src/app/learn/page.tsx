import type { Metadata } from "next";
import Link from "next/link";
import { LEARN_ARTICLES } from "@/data/seo/learn-articles";

export const metadata: Metadata = {
  title: "Texas Insurance License Study Guides",
  description:
    "Free guides for Texas Life & Health and Property & Casualty licensing — pass rates, exam costs, Texas law, ethics, and study plans.",
};

export default function LearnIndexPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="eyebrow">Free study guides</p>
      <h1 className="mt-2 font-display text-4xl text-[var(--navy)]">
        Learn Texas insurance licensing
      </h1>
      <p className="mt-3 text-[var(--ink-muted)]">
        Long-form pages built for search — and for candidates who want a clear
        plan before they burn a Pearson VUE seat.
      </p>

      <div className="mt-10 grid gap-4">
        {LEARN_ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/learn/${article.slug}`}
            className="border border-[var(--line)] bg-white/80 px-5 py-4 transition hover:border-[var(--navy)]"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--ink-muted)]">
              {article.eyebrow}
            </p>
            <h2 className="mt-1 font-display text-2xl text-[var(--navy)]">
              {article.title}
            </h2>
            <p className="mt-2 text-sm text-[var(--ink-muted)]">
              {article.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
