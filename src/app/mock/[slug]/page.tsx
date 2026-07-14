import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizEngine } from "@/components/QuizEngine";
import { UpgradePrompt } from "@/components/UpgradePrompt";
import { getExam, getQuestions, shuffle } from "@/data/catalog";
import { FREE_MOCK_LIMIT, PREMIUM_MOCK_LIMIT } from "@/data/pricing";
import { getAccess } from "@/lib/access";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) return { title: "Mock exam" };
  return {
    title: `${exam.shortTitle} Timed Mock Exam`,
    description: `Timed ${exam.title} mock exam simulator for study.`,
  };
}

export default async function MockPage({ params }: Props) {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) notFound();

  const access = await getAccess();
  const limit = access.premium ? PREMIUM_MOCK_LIMIT : FREE_MOCK_LIMIT;
  const pool = shuffle(getQuestions(slug)).slice(0, limit);
  const minutes = access.premium ? 60 : 18;

  return (
    <div className="mx-auto max-w-2xl">
      {!access.premium && (
        <div className="mb-8">
          <UpgradePrompt
            compact
            reason={`Free mocks are ${FREE_MOCK_LIMIT} questions. Unlock for longer ${PREMIUM_MOCK_LIMIT}-question timed runs.`}
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
