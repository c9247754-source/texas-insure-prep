import {
  LEARN_BODY_EXTRA,
  LEARN_FAQS,
  LEARN_RELATED,
  type LearnFaq,
} from "./learn-extra";

export type LearnArticle = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  body: string[];
  ctaHref: string;
  ctaLabel: string;
};

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: "how-to-get-texas-life-health-license",
    title: "How to Get a Texas Life & Health Insurance License",
    description:
      "Step-by-step path from study plan to Pearson VUE exam, fingerprints, and insurer appointments in Texas.",
    eyebrow: "Licensing path",
    body: [
      "Texas is unusual: many Life & Health candidates do not need mandatory pre-licensing classroom hours. That freedom helps you move fast — and it also means many first-timers walk into Pearson VUE under-prepared, especially on Texas law.",
      "A practical path looks like this: (1) confirm the current InsTX-LAH outline on the Pearson VUE / TDI side, (2) drill general insurance concepts and Texas rules until timed mocks clear 70%+, (3) schedule the exam, (4) complete the license application and fingerprints, (5) get appointed by insurers before you solicit.",
      "Passing the test is necessary but not the finish line. Appointments authorize you to represent specific carriers. Continuing education keeps the license active after you are in the field.",
      "Use free practice to find weak domains early. Most candidates who stall are strong on product vocabulary and weak on Texas consumer-protection themes — twisting, rebating, replacement disclosures, and honest advertising.",
    ],
    ctaHref: "/practice/tx-life-health",
    ctaLabel: "Start free L&H practice",
  },
  {
    slug: "texas-life-health-exam-pass-rate",
    title: "Texas Life & Health Exam Pass Rate — Why First-Timers Fail",
    description:
      "Why TX Life & Health first-time pass rates hover around the mid-50s and how to study the Texas law block that sinks scores.",
    eyebrow: "Pass rates",
    body: [
      "Public reporting around Texas Life, Accident & Health often shows first-time pass rates only in the mid-50% range. That is not because the math is brutal — it is because the exam mixes a large general section with a Texas-specific block many candidates under-weight.",
      "A candidate can feel fluent on whole life vs term, then lose points on guaranty association purpose, unfair trade practices, replacement paperwork, and fiduciary premium handling.",
      "Treat 70% as a floor in timed mixed mocks, not a stretch goal. If Texas-law tagged drills sit under 65%, delay the booking date. Retakes cost money and calendar time; an extra week of targeted practice is cheaper.",
      "Our bank heavily weights Texas law and ethics on purpose. Drill those until explanations feel obvious, then rebuild stamina with full-length mocks.",
    ],
    ctaHref: "/practice/tx-life-health/texas-law",
    ctaLabel: "Drill Texas law only",
  },
  {
    slug: "texas-insurance-license-exam-cost",
    title: "Texas Insurance License Exam Cost Checklist",
    description:
      "Budget for Pearson VUE fees, fingerprints, licensing steps, optional courses, and retakes for Texas insurance exams.",
    eyebrow: "Costs",
    body: [
      "Budget in layers: exam seating fee through Pearson VUE, fingerprint / background costs, license application fees, and optional prep (courses or practice unlocks). If you fail, add another seating fee and another week of study time.",
      "Texas’s lack of mandatory pre-licensing hours can look “cheap” on paper. Candidates still overspend by guessing and retaking. A focused question bank plus a one-sitting Texas law sheet is usually less expensive than two fails.",
      "After you pass, expect appointment onboarding time with carriers. That is not an exam fee, but it is part of getting paid — build it into your launch plan.",
      "Keep receipts and a simple spreadsheet. Freelancers who treat licensing like a mini business get to production faster than people who only chase the cheapest PDF dump online.",
    ],
    ctaHref: "/pricing",
    ctaLabel: "See unlock pricing",
  },
  {
    slug: "texas-law-insurance-exam-guide",
    title: "Texas Law for the Insurance Exam — High-Yield Guide",
    description:
      "Study map for Texas-specific Life & Health themes: TDI, appointments, CE, guaranty association, replacement, and unfair practices.",
    eyebrow: "Texas law",
    body: [
      "Start with the regulator: the Texas Department of Insurance (TDI) oversees insurers and producer licensing. Pearson VUE administers the exam; TDI owns the licensing framework around it.",
      "Memorize purpose-level ideas, not trivia theatre. Guaranty associations exist for limited protection if a member insurer fails — they are not a sales feature and should not be used as an inducement.",
      "Conduct verbs win points: twist (deceptive replacement), rebate (improper inducement), misrepresent, defame, coerce. When two answers feel close, pick the one that protects the consumer with disclosure and suitability.",
      "Pair this guide with Texas-law-only drills the night before test day. Then sleep. Cramming new product riders at 2 a.m. rarely beats a calm ethics pass.",
    ],
    ctaHref: "/guide/texas-law",
    ctaLabel: "Open Texas Law cheat sheet",
  },
  {
    slug: "life-insurance-basics-for-exam",
    title: "Life Insurance Basics for the Texas Exam",
    description:
      "Term vs permanent, beneficiaries, riders, nonforfeiture, and underwriting themes that show up on InsTX-LAH.",
    eyebrow: "Life",
    body: [
      "Know the job of each chassis: term for temporary pure protection, whole life for permanent + cash value discipline, universal for flexible premiums/death benefits, variable for separate-account risk.",
      "Owner, insured, and beneficiary are different roles. Revocable vs irrevocable designations change who controls updates. Contingent beneficiaries matter when the primary cannot take proceeds.",
      "Nonforfeiture options (reduced paid-up, extended term, cash surrender) appear constantly. Policy loans reduce the net death benefit if unpaid. Incontestability and suicide clauses are early-period rules.",
      "Underwriting classifies risk; illustrations are assumption tools, not promises. Replacement needs honest comparison — never hide cash values to force a switch.",
    ],
    ctaHref: "/practice/tx-life-health/life",
    ctaLabel: "Practice life questions",
  },
  {
    slug: "health-insurance-basics-for-exam",
    title: "Health & Disability Basics for the Texas Exam",
    description:
      "Deductibles, coinsurance, HMO/PPO, disability definitions, Medicare pieces, and LTC ADL triggers for exam prep.",
    eyebrow: "Health",
    body: [
      "Cost sharing vocabulary is non-negotiable: deductible, coinsurance, copay, out-of-pocket maximum. Major medical designs blend those pieces; indemnity hospital cash pays fixed amounts instead.",
      "Managed care: HMOs emphasize networks and gatekeepers; PPOs trade higher out-of-network cost for flexibility. Utilization review (prospective, concurrent, retrospective) polices medical necessity.",
      "Disability income hinges on definitions: own-occupation vs any-occupation, elimination periods, residual/partial benefits, and presumptive disability lists.",
      "Know Medicare Parts A/B/C/D at a purpose level, plus Medigap’s role. LTC turns on ADLs and custodial care — not acute hospital surgery trivia.",
    ],
    ctaHref: "/practice/tx-life-health/health",
    ctaLabel: "Practice health questions",
  },
  {
    slug: "annuity-basics-exam",
    title: "Annuity Basics for Insurance Licensing Exams",
    description:
      "Fixed, variable, and indexed annuities — accumulation vs annuitization, surrender charges, and suitability themes.",
    eyebrow: "Annuities",
    body: [
      "Annuities are income engines. Deferred contracts accumulate; immediate contracts start payouts soon after premium. Fixed credits insurer-backed interest; variable uses separate accounts; indexed formulas use caps, floors, and participation rates.",
      "Surrender charge schedules and free-withdrawal corridors control liquidity. Suitability asks whether the buyer’s horizon and cash needs survive those handcuffs.",
      "Payout options trade income size for death protection: life-only vs life with period certain vs joint and survivor vs refund features.",
      "Tax deferral is not “tax free forever.” Early distribution penalties and exclusion-ratio thinking show up on exams. Suitability documentation protects both the client and your license.",
    ],
    ctaHref: "/practice/tx-life-health/annuity",
    ctaLabel: "Practice annuity questions",
  },
  {
    slug: "insurance-ethics-texas",
    title: "Insurance Ethics for Texas Producers",
    description:
      "Twisting, rebating, misrepresentation, fiduciary premiums, suitability, and fair claims — the conduct answers examiners want.",
    eyebrow: "Ethics",
    body: [
      "If an answer choice maximizes commission while hiding costs, it is almost never correct on a licensing exam. Ethics items reward disclosure, suitability, and fiduciary care of premiums.",
      "Twisting is deceptive replacement. Churning is replacement theatre for commissions. Sliding adds coverages without informed consent. Rebating uses improper inducements outside the filed contract.",
      "Never coach applicants to omit medical history. Never forge signatures. Never invent claim facts. Privacy duties cover nonpublic personal information.",
      "After licensing, CE ethics hours exist because market-conduct failures harm real people — and draw TDI attention. Build the habit now while you still have practice-mode feedback.",
    ],
    ctaHref: "/practice/tx-life-health/ethics",
    ctaLabel: "Practice ethics questions",
  },
  {
    slug: "pearson-vue-texas-insurance",
    title: "Pearson VUE Texas Insurance Exam — What to Expect",
    description:
      "Scheduling, ID rules, exam security, score mindset, and how practice tests translate to InsTX sitting day.",
    eyebrow: "Test day",
    body: [
      "Pearson VUE schedules and delivers Texas insurance exams under strict security. Bring required ID, arrive early, and expect lockdown rules on notes, phones, and content disclosure.",
      "Public outlines show how many scored items land in general knowledge versus Texas law. Build stamina with timed mocks close to real length once your domain accuracy is solid.",
      "Do not chase “real exam dumps.” They are often illegal, outdated, or simply wrong — and candidate agreements typically forbid capturing or sharing live content.",
      "On test day, flag hard items, keep moving, and return with fresh eyes. A calm 70% process beats a panicked hunt for perfect recall on obscure riders.",
    ],
    ctaHref: "/mock/tx-life-health",
    ctaLabel: "Take a timed mock",
  },
  {
    slug: "texas-life-health-study-plan",
    title: "2-Week Texas Life & Health Study Plan",
    description:
      "A practical two-week drill plan using domain practice, Texas law sheets, and timed mocks before Pearson VUE.",
    eyebrow: "Study plan",
    body: [
      "Days 1–3: Life + Health domain drills until explanations feel automatic. Skim product chassis differences; do not drown in obscure riders yet.",
      "Days 4–6: Annuities + Ethics. Write the six ethics verbs on one card: twist, rebate, misrep, defame, coerce, churn.",
      "Days 7–10: Texas law every day — regulator, appointments, CE, guaranty purpose, replacement, unfair practices. Print the cheat sheet and annotate it.",
      "Days 11–14: Timed mixed mocks. After each mock, only restudy domains under 70%. Sleep before exam day; do a light Texas-law warm-up, not a new textbook.",
    ],
    ctaHref: "/topics/tx-life-health",
    ctaLabel: "Open the topic map",
  },
  {
    slug: "free-texas-insurance-practice-test",
    title: "Free Texas Insurance Practice Test",
    description:
      "Start a free Texas Life & Health practice set with instant explanations — then unlock the full bank when you are ready.",
    eyebrow: "Free practice",
    body: [
      "This site’s free preview gives you real exam-style multiple choice with immediate explanations. Use it to diagnose whether you are failing on products, ethics, or Texas law — not to memorize letter patterns.",
      "When the free set feels easy, that is the trap. Unlock the full mixed bank and longer mocks so you see distribution closer to a real sitting.",
      "Pair practice with the Texas law guide the week you schedule Pearson VUE. Free does not mean unfinished — it means you should graduate into volume.",
      "All items are original educational content aligned to public themes. They are not live Pearson VUE questions.",
    ],
    ctaHref: "/practice/tx-life-health",
    ctaLabel: "Launch free practice",
  },
  {
    slug: "texas-property-casualty-license",
    title: "Texas Property & Casualty License — Starter Guide",
    description:
      "How the TX P&C path differs from Life & Health, what to study first, and how to use our starter P&C bank.",
    eyebrow: "P&C track",
    body: [
      "Property & Casualty is a different line of authority from Life & Health. Expect homeowners forms, auto coverages, commercial liability themes, and the same Texas market-conduct spine.",
      "Learn vocabulary early: ACV vs replacement cost, named vs open peril, Section I vs II on homeowners, liability vs physical damage on auto, occurrence vs claims-made on liability forms.",
      "Texas still expects clean ethics: no misrepresentation, no claim fraud, fiduciary premiums, and honest advertising. Financial responsibility ideas show up around auto liability minimums.",
      "Our P&C bank is a starter set — use it to build fluency, then expand with outlines and additional drills before you book. You can unlock site access once and keep drilling both tracks in this browser.",
    ],
    ctaHref: "/practice/tx-property-casualty",
    ctaLabel: "Start P&C practice",
  },
];

export function getLearnArticle(slug: string): LearnArticle | undefined {
  return LEARN_ARTICLES.find((a) => a.slug === slug);
}

export function getLearnArticleBody(article: LearnArticle): string[] {
  const extra = LEARN_BODY_EXTRA[article.slug] ?? [];
  return [...article.body, ...extra];
}

export function getLearnArticleFaqs(slug: string): LearnFaq[] {
  return LEARN_FAQS[slug] ?? [];
}

export function getLearnRelatedArticles(
  slug: string,
): { slug: string; title: string }[] {
  const related = LEARN_RELATED[slug] ?? [];
  return related.map((relatedSlug) => {
    if (relatedSlug === "pricing") {
      return { slug: "pricing", title: "Pricing — unlock & Texas law PDF" };
    }
    const article = getLearnArticle(relatedSlug);
    return {
      slug: relatedSlug,
      title: article?.title ?? relatedSlug,
    };
  });
}
