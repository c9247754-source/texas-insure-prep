export type AnswerRecord = {
  correct: boolean;
  at: number;
};

export type SavedProgress = {
  wrongIds: string[];
  answered: Record<string, AnswerRecord>;
  lastExamSlug?: string;
};

const STORAGE_KEY = "tip_progress_v1";

export function loadProgress(): SavedProgress {
  if (typeof window === "undefined") {
    return { wrongIds: [], answered: {} };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { wrongIds: [], answered: {} };
    const parsed = JSON.parse(raw) as SavedProgress;
    return {
      wrongIds: Array.isArray(parsed.wrongIds) ? parsed.wrongIds : [],
      answered: parsed.answered ?? {},
      lastExamSlug: parsed.lastExamSlug,
    };
  } catch {
    return { wrongIds: [], answered: {} };
  }
}

export function saveProgress(progress: SavedProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function recordAnswer(
  examSlug: string,
  questionId: string,
  correct: boolean,
) {
  const progress = loadProgress();
  progress.lastExamSlug = examSlug;
  progress.answered[questionId] = { correct, at: Date.now() };

  if (!correct) {
    if (!progress.wrongIds.includes(questionId)) {
      progress.wrongIds.push(questionId);
    }
  } else {
    progress.wrongIds = progress.wrongIds.filter((id) => id !== questionId);
  }

  saveProgress(progress);
}

export function getWrongCount(): number {
  return loadProgress().wrongIds.length;
}
