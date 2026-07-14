export type QuestionDomain =
  | "life"
  | "health"
  | "annuity"
  | "ethics"
  | "texas-law";

export type Question = {
  id: string;
  domain: QuestionDomain;
  prompt: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
};

export type ExamTrack = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  scoredQuestions: number;
  timeMinutes: number;
  passingScore: number;
  outlineNote: string;
};

export const DOMAIN_LABELS: Record<QuestionDomain, string> = {
  life: "Life Insurance",
  health: "Health & Accident",
  annuity: "Annuities",
  ethics: "Ethics & Consumer Protection",
  "texas-law": "Texas Law & Rules",
};
