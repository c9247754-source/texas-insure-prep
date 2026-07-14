import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseBanner } from "@/components/QuizEngine";
import { getExam, getQuestionsByDomain } from "@/data/catalog";
import { DOMAIN_LABELS, type QuestionDomain } from "@/data/types";

type Props = { params: Promise<{ slug: string }> };

const domains: QuestionDomain[] = [
  "life",
  "health",
  "annuity",
  "ethics",
  "texas-law",
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) return { title: "Topics" };
  return {
    title: `${exam.shortTitle} Topics & Texas Law`,
    description: `Study ${exam.title} by topic, including Texas law.`,
  };
}

export default async function TopicsPage({ params }: Props) {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <p className="eyebrow">Study map</p>
      <h1 className="mt-2 font-display text-4xl text-[var(--navy)]">
        {exam.shortTitle} topics
      </h1>
      <p className="mt-3 text-[var(--ink-muted)]">{exam.outlineNote}</p>

      <div className="mt-10 grid gap-4">
        {domains.map((domain) => {
          const count = getQuestionsByDomain(slug, domain).length;
          return (
            <div
              key={domain}
              className="flex flex-wrap items-center justify-between gap-3 border border-[var(--line)] bg-white/80 px-5 py-4"
            >
              <div>
                <h2 className="font-display text-xl text-[var(--navy)]">
                  {DOMAIN_LABELS[domain]}
                </h2>
                <p className="text-sm text-[var(--ink-muted)]">
                  {count} practice questions in the bank
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/practice/${slug}/${domain}`}
                  className="btn-secondary"
                >
                  Drill topic
                </Link>
                <Link href={`/practice/${slug}`} className="btn-ghost">
                  Mixed
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <CourseBanner />
    </div>
  );
}
