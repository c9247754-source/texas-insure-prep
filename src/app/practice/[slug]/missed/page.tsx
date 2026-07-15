import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MissedPracticeClient } from "@/components/MissedPracticeClient";
import { UpgradePrompt } from "@/components/UpgradePrompt";
import { getExam, getQuestions } from "@/data/catalog";
import { getAccess } from "@/lib/access";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) return { title: "Missed questions" };
  return {
    title: `${exam.shortTitle} — Retry Missed Questions`,
    description: `Drill questions you missed on ${exam.title} practice in this browser.`,
  };
}

export default async function MissedPracticePage({ params }: Props) {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) notFound();

  const access = await getAccess();
  const pool = getQuestions(slug);

  return (
    <div className="mx-auto max-w-2xl">
      <p className="mb-2 text-sm text-[var(--ink-muted)]">
        <Link href={`/practice/${slug}`} className="underline underline-offset-2">
          Mixed practice
        </Link>
        {" · "}
        <Link href={`/topics/${slug}`} className="underline underline-offset-2">
          Topics
        </Link>
      </p>

      {!access.premium && (
        <div className="mb-8">
          <UpgradePrompt
            compact
            reason="Missed-question retry works on items you have already seen. Unlock for the full bank and longer mocks."
          />
        </div>
      )}

      <MissedPracticeClient
        pool={pool}
        examSlug={slug}
        title={`${exam.shortTitle} · Missed`}
        showUpgradeAfter={!access.premium}
      />
    </div>
  );
}
