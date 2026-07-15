import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizEngine } from "@/components/QuizEngine";
import { MissedPracticeLink } from "@/components/MissedPracticeLink";
import { UpgradePrompt } from "@/components/UpgradePrompt";
import { getExam, getQuestions, shuffle } from "@/data/catalog";
import { FREE_PRACTICE_LIMIT } from "@/data/pricing";
import { getAccess } from "@/lib/access";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) return { title: "Practice" };
  return {
    title: `${exam.shortTitle} Practice Test Free`,
    description: `Free ${exam.title} practice questions with explanations.`,
  };
}

export default async function PracticePage({ params }: Props) {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) notFound();

  const access = await getAccess();
  const full = shuffle(getQuestions(slug));
  const limited = !access.premium;
  const questions = limited ? full.slice(0, FREE_PRACTICE_LIMIT) : full;

  return (
    <div className="mx-auto max-w-2xl">
      {limited && (
        <div className="mb-8">
          <p className="mb-3 text-sm text-[var(--ink-muted)]">
            Free preview: {FREE_PRACTICE_LIMIT} of {full.length} questions.
            Unlock the full bank anytime.
          </p>
          <UpgradePrompt
            compact
            reason={`Free preview is capped at ${FREE_PRACTICE_LIMIT} questions. Unlock for lifetime access to the full bank.`}
          />
        </div>
      )}
      <div className="mb-6">
        <MissedPracticeLink examSlug={slug} />
      </div>
      <QuizEngine
        questions={questions}
        mode="practice"
        title={`${exam.shortTitle} · Practice`}
        examSlug={slug}
        showUpgradeAfter={limited}
      />
    </div>
  );
}
