import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuizEngine } from "@/components/QuizEngine";
import { UpgradePrompt } from "@/components/UpgradePrompt";
import { getExam, getQuestionsByDomain, shuffle } from "@/data/catalog";
import { FREE_PRACTICE_LIMIT } from "@/data/pricing";
import { DOMAIN_LABELS, type QuestionDomain } from "@/data/types";
import { getAccess } from "@/lib/access";

type Props = {
  params: Promise<{ slug: string; domain: string }>;
};

const DOMAINS: QuestionDomain[] = [
  "life",
  "health",
  "annuity",
  "ethics",
  "texas-law",
];

function isDomain(value: string): value is QuestionDomain {
  return (DOMAINS as string[]).includes(value);
}

export async function generateStaticParams() {
  return ["tx-life-health", "tx-property-casualty"].flatMap((slug) =>
    DOMAINS.map((domain) => ({ slug, domain })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, domain } = await params;
  const exam = getExam(slug);
  if (!exam || !isDomain(domain)) return { title: "Practice" };
  return {
    title: `${exam.shortTitle} ${DOMAIN_LABELS[domain]} Practice`,
    description: `Free ${DOMAIN_LABELS[domain]} practice for ${exam.title}.`,
  };
}

export default async function DomainPracticePage({ params }: Props) {
  const { slug, domain: domainParam } = await params;
  const exam = getExam(slug);
  if (!exam || !isDomain(domainParam)) notFound();

  const access = await getAccess();
  const full = shuffle(getQuestionsByDomain(slug, domainParam));
  if (full.length === 0) notFound();

  const limited = !access.premium;
  const questions = limited ? full.slice(0, FREE_PRACTICE_LIMIT) : full;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="mb-2 text-sm text-[var(--ink-muted)]">
        <Link href={`/topics/${slug}`} className="underline underline-offset-2">
          Topics
        </Link>
        {" · "}
        <Link href={`/practice/${slug}`} className="underline underline-offset-2">
          Mixed practice
        </Link>
      </p>

      {limited && (
        <div className="mb-8">
          <p className="mb-3 text-sm text-[var(--ink-muted)]">
            Free preview: {Math.min(FREE_PRACTICE_LIMIT, full.length)} of{" "}
            {full.length} {DOMAIN_LABELS[domainParam]} questions.
          </p>
          <UpgradePrompt
            compact
            reason={`Unlock the full ${DOMAIN_LABELS[domainParam]} set and every other domain.`}
          />
        </div>
      )}

      <QuizEngine
        questions={questions}
        mode="practice"
        title={`${exam.shortTitle} · ${DOMAIN_LABELS[domainParam]}`}
        examSlug={slug}
        showUpgradeAfter={limited}
      />
    </div>
  );
}
