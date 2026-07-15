export type QuestionDomain =
  | "life"
  | "health"
  | "annuity"
  | "ethics"
  | "texas-law"
  | "property"
  | "auto"
  | "commercial";

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
  property: "Property & Homeowners",
  auto: "Auto Insurance",
  commercial: "Commercial & Liability",
};

export const LH_DOMAINS: QuestionDomain[] = [
  "life",
  "health",
  "annuity",
  "ethics",
  "texas-law",
];

export const PC_DOMAINS: QuestionDomain[] = [
  "property",
  "auto",
  "commercial",
  "texas-law",
];

export function domainsForExam(slug: string): QuestionDomain[] {
  return slug === "tx-property-casualty" ? PC_DOMAINS : LH_DOMAINS;
}
