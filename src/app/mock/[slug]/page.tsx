import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizEngine } from "@/components/QuizEngine";
import { UpgradePrompt } from "@/components/UpgradePrompt";
import { getExam, getQuestions, shuffle } from "@/data/catalog";
import { FREE_MOCK_LIMIT } from "@/data/pricing";
import { getAccess } from "@/lib/access";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) return { title: "Mock exam" };
  return {
    title: `${exam.shortTitle} Timed Mock Exam`,
    description: `Timed ${exam.title} mock exam simulator — ${exam.scoredQuestions} questions, ${exam.timeMinutes} minutes when unlocked.`,
  };
}

export default async function MockPage({ params }: Props) {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) notFound();

  const access = await getAccess();
  const limit = access.premium ? exam.scoredQuestions : FREE_MOCK_LIMIT;
  const minutes = access.premium
    ? exam.timeMinutes
    : Math.max(
        15,
        Math.round((exam.timeMinutes * FREE_MOCK_LIMIT) / exam.scoredQuestions),
      );
  const pool = shuffle(getQuestions(slug)).slice(0, limit);

  return (
    <div className="mx-auto max-w-2xl">
      {!access.premium && (
        <div className="mb-8">
          <UpgradePrompt
            compact
            reason={`Free mocks are ${FREE_MOCK_LIMIT} questions (~${minutes} min). Unlock for full ${exam.scoredQuestions}-question / ${exam.timeMinutes}-minute exam pace.`}
          />
        </div>
      )}
      <QuizEngine
        questions={pool}
        mode="mock"
        title={`${exam.shortTitle} · Mock`}
        timeMinutes={minutes}
        examSlug={slug}
        showUpgradeAfter={!access.premium}
      />
    </div>
  );
}
