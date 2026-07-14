import type { ExamTrack, Question } from "../types";
import { LIFE_QUESTIONS } from "./life";
import { HEALTH_QUESTIONS } from "./health";
import { ANNUITY_QUESTIONS } from "./annuity";
import { ETHICS_QUESTIONS } from "./ethics";
import { TEXAS_LAW_QUESTIONS } from "./texas-law";

export const TX_LIFE_HEALTH_TRACK: ExamTrack = {
  slug: "tx-life-health",
  title: "Texas Life, Accident & Health",
  shortTitle: "TX Life & Health",
  description:
    "Free practice for the Texas General Lines Life, Accident and Health exam (InsTX-LAH). Study general concepts plus Texas-specific rules that trip up first-time takers.",
  scoredQuestions: 130,
  timeMinutes: 150,
  passingScore: 70,
  outlineNote:
    "Public exam structure: roughly 100 general + 30 Texas law scored items (plus pretest items). This site uses original practice questions for study only.",
};

/**
 * Original educational practice items aligned to publicly known exam themes.
 * Not real Pearson VUE / TDI exam questions.
 */
export const TX_LIFE_HEALTH_QUESTIONS: Question[] = [
  ...LIFE_QUESTIONS,
  ...HEALTH_QUESTIONS,
  ...ANNUITY_QUESTIONS,
  ...ETHICS_QUESTIONS,
  ...TEXAS_LAW_QUESTIONS,
];
