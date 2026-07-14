import { TX_LIFE_HEALTH_QUESTIONS, TX_LIFE_HEALTH_TRACK } from "./questions/tx-life-health";
import type { ExamTrack, Question, QuestionDomain } from "./types";

export const EXAMS: ExamTrack[] = [TX_LIFE_HEALTH_TRACK];

const QUESTION_BANKS: Record<string, Question[]> = {
  [TX_LIFE_HEALTH_TRACK.slug]: TX_LIFE_HEALTH_QUESTIONS,
};

export function getExam(slug: string): ExamTrack | undefined {
  return EXAMS.find((exam) => exam.slug === slug);
}

export function getQuestions(slug: string): Question[] {
  return QUESTION_BANKS[slug] ?? [];
}

export function getQuestionsByDomain(
  slug: string,
  domain: QuestionDomain | "all",
): Question[] {
  const all = getQuestions(slug);
  if (domain === "all") return all;
  return all.filter((q) => q.domain === domain);
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Affiliate / course CTA — replace href with your Aceable Partners tracking link. */
export const COURSE_CTA = {
  label: "Want a structured pass plan?",
  body: "If you want video lessons and a full pre-licensing path on top of drills, check a Texas-focused exam prep course.",
  href: "https://insurance.aceable.com/pre-license/texas/life-and-health/",
  button: "View Texas prep courses",
};
