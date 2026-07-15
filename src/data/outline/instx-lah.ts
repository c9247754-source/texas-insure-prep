/**
 * InsTX-LAH topic checklist derived from Pearson VUE's public Texas
 * Insurance Content Outlines (effective Dec 1, 2025).
 * Source: https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/publications/124401.pdf
 *
 * This is a study-map for ORIGINAL practice items — not live exam questions.
 */

export type OutlineTopic = {
  id: string;
  section: string;
  title: string;
  /** Case-insensitive substrings matched against prompt+explanation+choices */
  keywords: string[];
};

export const OUTLINE_SOURCE = {
  name: "Pearson VUE Texas Insurance Content Outlines",
  effective: "December 1, 2025",
  exam: "General Lines — Life, Accident & Health (InsTX-LAH)",
  url: "https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/publications/124401.pdf",
  hub: "https://www.pearsonvue.com/us/en/tx/insurance.html",
  disclaimer:
    "Practice items on this site are original educational content aligned to publicly listed outline themes. They are not Pearson VUE or TDI exam questions.",
};

/** High-level InsTX-LAH themes for coverage scoring. */
export const INSTX_LAH_TOPICS: OutlineTopic[] = [
  // Life — types
  { id: "life-whole", section: "Life · Types of policies", title: "Whole / limited-pay / single-premium", keywords: ["whole life", "limited-pay", "single-premium", "ordinary whole"] },
  { id: "life-ul-vl", section: "Life · Types of policies", title: "UL / VUL / variable / indexed / interest-sensitive", keywords: ["universal life", "variable universal", "variable life", "indexed life", "interest-sensitive"] },
  { id: "life-term", section: "Life · Types of policies", title: "Term types & renewable/convertible", keywords: ["term life", "decreasing term", "annually renewable", "renewable", "convertible", "return of premium"] },
  { id: "life-combo", section: "Life · Types of policies", title: "Joint / survivorship", keywords: ["joint life", "first-to-die", "survivorship", "second-to-die"] },
  // Annuities
  { id: "ann-types", section: "Annuities", title: "Immediate/deferred, fixed/variable/indexed", keywords: ["immediate", "deferred", "fixed annuity", "variable annuity", "indexed annuity", "accumulation", "annuitization", "payout"] },
  // Riders & provisions
  { id: "life-riders", section: "Life · Riders & provisions", title: "WOP, GIR, payor, AD&D, COL, LTC rider", keywords: ["waiver of premium", "guaranteed insurability", "payor", "accidental death", "cost of living", "long-term care rider", "term rider"] },
  { id: "life-provisions", section: "Life · Riders & provisions", title: "Free look, grace, loans, nonforfeiture, incontestability", keywords: ["free look", "free-look", "grace period", "policy loan", "nonforfeiture", "incontestab", "suicide", "misstatement of age", "entire contract", "settlement option", "accelerated death"] },
  { id: "life-beneficiaries", section: "Life · Riders & provisions", title: "Beneficiary designations", keywords: ["beneficiary", "revocable", "irrevocable", "contingent", "common disaster", "per stirpes"] },
  { id: "life-exclusions", section: "Life · Riders & provisions", title: "War / aviation / dangerous occupation", keywords: ["war", "aviation", "dangerous occupation"] },
  // App / UW / delivery / contract
  { id: "life-app-uw", section: "Life · Application & underwriting", title: "Application, warranties, receipts, replacement disclosures", keywords: ["application", "warranty", "representation", "conditional receipt", "replacement", "hipaa", "hiv", "patriot", "glba", "gramm-leach"] },
  { id: "life-uw-risk", section: "Life · Application & underwriting", title: "Insurable interest, FCRA, STOLI, risk class", keywords: ["insurable interest", "fair credit", "fcra", "stoli", "ioli", "risk class", "mib", "underwriting"] },
  { id: "life-contract", section: "Life · Contract law", title: "Consideration, adhesion, aleatory, unilateral", keywords: ["adhesion", "aleatory", "unilateral", "conditional contract", "offer and acceptance", "competent parties", "legal purpose"] },
  { id: "life-biz-tax", section: "Life · Other concepts", title: "Group life, key person, buy-sell, MEC, tax", keywords: ["group life", "conversion", "contributory", "key person", "buy-sell", "buy sell", "mec", "modified endowment", "life settlement", "third-party ownership", "social security"] },
  // Health types
  { id: "health-di", section: "Health · Policy types", title: "Disability income (individual, BOE, buyout, group, key)", keywords: ["disability income", "own-occupation", "any-occupation", "elimination period", "business overhead", "disability buyout", "residual disability", "key employee"] },
  { id: "health-medexp", section: "Health · Policy types", title: "Major medical / HMO / PPO / POS / FSA / HDHP / HSA / HRA", keywords: ["major medical", "hmo", "ppo", "pos plan", "flexible spending", "fsa", "hdhp", "health savings", "hsa", "health reimbursement", "hra", "copay", "coinsurance", "deductible"] },
  { id: "health-other", section: "Health · Policy types", title: "Medigap, LTC, COBRA, dental/vision/cancer/indemnity", keywords: ["medicare supplement", "medigap", "long-term care", "ltc", "cobra", "dental", "vision", "cancer", "critical illness", "hospital indemnity", "short-term medical", "ad&d", "accidental death and dismemberment"] },
  { id: "health-provisions", section: "Health · Provisions", title: "Mandatory health provisions & renewability", keywords: ["notice of claim", "proof of loss", "claim forms", "time limit on certain defenses", "relation of earnings", "probationary", "preexisting", "guaranteed renewable", "noncancelable", "usual reasonable", "urc", "preauthorization", "coordination of benefits"] },
  { id: "health-social", section: "Health · Social & other", title: "Medicare/Medicaid/SS, workers comp, subrogation", keywords: ["medicare part", "medicaid", "workers compensation", "workers' compensation", "subrogation", "occupational vs", "managed care"] },
  // Texas common
  { id: "tx-commissioner", section: "Texas · Common L&H statutes", title: "Commissioner powers, exams, penalties, C&D", keywords: ["commissioner", "cease and desist", "examination of records", "penalties"] },
  { id: "tx-defs", section: "Texas · Common L&H statutes", title: "Certificate of authority, domestic/foreign/alien, stock/mutual", keywords: ["certificate of authority", "domestic", "foreign insurer", "alien insurer", "stock insurer", "mutual insurer", "fraternal", "transacting insurance"] },
  { id: "tx-licensing", section: "Texas · Common L&H statutes", title: "Licensing, appointment, CE, temporary, notifications", keywords: ["appointment", "continuing education", "temporary license", "license suspension", "change of address", "tdi"] },
  { id: "tx-unfair", section: "Texas · Common L&H statutes", title: "Unfair practices, rebating, defamation, freud, commingling", keywords: ["rebating", "twisting", "misrepresentation", "defamation", "false advertising", "commingling", "coercion", "unfair discrimination", "fraud"] },
  { id: "tx-guaranty", section: "Texas · Common L&H statutes", title: "Texas Life & Health Guaranty Association", keywords: ["guaranty association", "guaranty"] },
  // Texas life-only
  { id: "tx-life-mkt", section: "Texas · Life-only", title: "Illustrations, buyer's guide, free look, replacement", keywords: ["illustration", "buyer's guide", "buyers guide", "policy summary", "replacement", "nonforfeiture"] },
  { id: "tx-credit-group", section: "Texas · Life-only", title: "Credit life / group life Texas rules themes", keywords: ["credit life", "group eligibility", "dependent coverage"] },
  // Texas health-only
  { id: "tx-health", section: "Texas · Accident & health", title: "Newborns, chemical dependency, Medigap TX, AIDS testing, LTC, small group, ACA", keywords: ["newborn", "chemical dependency", "aids testing", "hiv testing", "small group", "affordable care", "essential health", "marketplace", "exchange"] },
  { id: "tx-hmo", section: "Texas · HMO", title: "HMO evidence of coverage / network themes", keywords: ["evidence of coverage", "out of network", "hmo enrollment"] },
];

export const OUTLINE_TOPIC_COUNT = INSTX_LAH_TOPICS.length;
