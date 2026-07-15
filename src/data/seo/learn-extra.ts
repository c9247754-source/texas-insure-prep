export type LearnFaq = { question: string; answer: string };

/** Additional long-form paragraphs keyed by learn article slug. */
export const LEARN_BODY_EXTRA: Record<string, string[]> = {
  "how-to-get-texas-life-health-license": [
    "Texas uses the InsTX-LAH exam code for the General Lines Life, Accident and Health line. Public outlines describe a scored mix of general insurance knowledge and Texas-specific law. You do not need to memorize the exact pretest count — you do need stamina for roughly 130 scored items in about 150 minutes.",
    "Before you spend money on a third retake, map your weak domains with tagged practice. Life vocabulary alone will not carry you if Texas unfair-trade and replacement items sit in the 50% range. Most successful candidates front-load Texas law once products feel familiar, then shift to mixed timed mocks.",
    "Fingerprinting and background review are part of the licensing pipeline after you pass. Budget calendar time for carrier appointments too — you cannot ethically solicit on behalf of an insurer until appointed. Treat licensing like opening a small business: compliance first, marketing second.",
    "Continuing education begins after you are licensed, not before the exam. Still, learning CE themes early helps on ethics items: honesty in advertising, suitability, fiduciary premium handling, and fair claims support.",
    "If you are career-switching without insurance experience, pair question drills with one structured outline read-through. Drills tell you what you miss; outlines tell you what exists. Neither alone is enough for a mid-50s first-time pass rate environment.",
    "Schedule Pearson VUE only after two consecutive timed mocks at or above 70% with mixed domains — not after one lucky run. Retake fees and lost momentum cost more than an extra week of Texas-law drilling.",
    "Keep a single notebook for missed themes: guaranty association purpose, replacement disclosure, rebate vs lawful dividends, appointment vs solicitation. Re-read that notebook the night before — not a brand-new textbook.",
    "After licensing, your reputation is your renewals book. The exam is the gate; market conduct is the career. Study ethics like your license depends on it — because after you pass, it does.",
  ],
  "texas-life-health-exam-pass-rate": [
    "Pass-rate statistics vary by reporting period, but Texas Life & Health first-time results often land near the mid-50% range. That is not a comment on candidate intelligence — it reflects a wide syllabus plus a state law block many people under-study.",
    "General knowledge items cover life chassis, health cost-sharing, annuities, and producer conduct. Texas items ask whether you know who regulates what, what guaranty associations are for, and which sales behavior crosses into twisting or rebating.",
    "Candidates who only memorize flashcards without explanations fail when two answers look partially correct. Practice with instant feedback builds pattern recognition: consumer protection beats commission maximization on ethics stems.",
    "A domain scoreboard beats a single percentage. You can sit at 78% overall while Texas law sits at 58% — that gap predicts exam-day pain. Drill the lowest domain until it is no longer lowest.",
    "Retakes are normal in this industry, but they are expensive and demoralizing. An extra week on Texas law is cheaper than a second Pearson VUE sitting plus another week off work.",
    "Timed mocks reveal reading fatigue. Many failures are not knowledge gaps — they are pacing problems on item 90. Build length gradually: short mocks first, then full 130-question runs once accuracy is stable.",
    "Do not interpret a single practice vendor’s pass guarantee as exam certainty. Original educational banks aligned to public themes are lawful study tools; stolen live content is not.",
    "Your goal is not perfection — it is clearing 70% with margin. Aim for low-70s on hard mixed mocks; that buffer absorbs test-day stress and unfamiliar wording.",
  ],
  "texas-insurance-license-exam-cost": [
    "Exam fees change — verify current Pearson VUE pricing before you budget. Layer fingerprinting, license application, and optional prep on top of the sitting fee itself.",
    "Mandatory pre-licensing classroom hours are not required for many Texas Life & Health paths, which lowers upfront tuition but increases self-study risk. A modest practice unlock plus focused guides often costs less than one failed retake.",
    "Carrier appointments may involve background checks and contracting paperwork — not exam fees, but real time. Plan income runway if you are leaving another job to sell insurance.",
    "Optional courses with video and instructor support run higher than question banks. Choose based on learning style: some people need video; others pass with drills and a Texas law sheet.",
    "Track every licensing expense for taxes if you are independent — many candidates treat this as a business launch, not a hobby.",
    "Avoid scam “exam dump” sellers. Besides ethical and legal issues, outdated wrong answers fail you twice: once on payment, once on score.",
    "If budget is tight, use free preview questions to prove you will study, then unlock before mocks get repetitive. Spreading spend across two months hurts momentum.",
    "Compare total cost of passing once vs retaking twice. Often the “expensive” prep option is the cheaper path.",
  ],
  "texas-law-insurance-exam-guide": [
    "Texas Department of Insurance (TDI) supervises insurers and producers operating in the state. Pearson VUE delivers the exam under contract. Know which body owns licensing rules versus test delivery logistics.",
    "Appointments authorize a producer to act for a specific insurer. Solicitation without appointment is a classic exam trap — study the sequence: licensed → appointed → solicit.",
    "Guaranty associations provide limited protection if a member insurer fails. They are not marketing benefits and must not be sold as inducements to buy.",
    "Replacement regulations exist because churning policies harms consumers. Honest comparison, disclosure, and suitability beat commission-driven switching every time on the exam.",
    "Unfair trade practice vocabulary is high yield: twist, rebate, misrepresentation, defamation, coercion, sliding. When stuck, choose the answer that protects the consumer with disclosure.",
    "Continuing education keeps licensed producers current. CE is not usually heavy on the exam, but renewal and compliance themes appear.",
    "Fiduciary handling of premiums means prompt remittance and no commingling with personal funds. Exam items love “producer keeps check in personal account for a week.”",
    "Texas advertising rules punish misleading superiority claims and fake urgency. If an answer invents a TDI deadline to close a sale, it is wrong.",
    "Print a one-page Texas law checklist and annotate it after each mock. The annotations matter more than the printout itself.",
    "Pair this guide with domain-only Texas law drills until explanations feel obvious, then return to mixed exams.",
  ],
  "life-insurance-basics-for-exam": [
    "Term insurance provides temporary protection with little or no cash value. Whole life offers permanent coverage with cash value discipline. Universal life adds premium and death benefit flexibility. Variable life shifts investment risk to the owner via separate accounts.",
    "Owner, insured, and beneficiary are distinct roles. The owner controls most policy changes; the insured is the life being covered; beneficiaries receive proceeds.",
    "Riders modify the base contract: waiver of premium, guaranteed insurability, accidental death, term riders on permanent bases. Know what each rider does at a purpose level.",
    "Nonforfeiture options protect cash-value owners who stop paying: reduced paid-up, extended term, cash surrender. Policy loans reduce net death benefit if unpaid.",
    "Underwriting classifies mortality and morbidity risk. Misrepresentation on applications can trigger contestability issues early in the contract.",
    "Group life uses master contracts through employers or associations. Conversion rights when employment ends are common exam themes.",
    "Key person, buy-sell, and credit life are specialized use cases — know who buys the policy and what risk is being indemnified.",
    "Illustrations show hypothetical values; guarantees live in the contract. Never confuse projected non-guaranteed elements with promises.",
  ],
  "health-insurance-basics-for-exam": [
    "Major medical policies combine deductibles, coinsurance, copays, and out-of-pocket maximums. Know how each shifts cost between insurer and insured.",
    "HMO plans emphasize network care and primary care gatekeepers. PPO plans allow more out-of-network access at higher cost-sharing.",
    "Disability income insurance hinges on definitions: own-occupation vs any-occupation, elimination periods, benefit periods, and residual disability.",
    "Medicare Parts A, B, C, and D serve different roles — hospital, medical services, Medicare Advantage bundling, and prescription drugs. Medigap supplements Original Medicare gaps.",
    "Long-term care insurance triggers on inability to perform activities of daily living or cognitive impairment — custodial care, not acute surgery trivia.",
    "COBRA allows temporary continuation of group coverage after qualifying events — know who pays the premium and how long continuation may last.",
    "HIPAA themes include portability and privacy — not a deep law exam, but know privacy and pre-existing condition framing at a high level.",
    "Utilization review types — prospective, concurrent, retrospective — police medical necessity and length of stay.",
  ],
  "annuity-basics-exam": [
    "Deferred annuities accumulate; immediate annuities begin payouts soon after premium. Know the timing difference cold.",
    "Fixed annuities credit insurer-declared rates. Variable annuities use separate accounts with market risk. Indexed annuities link credits to external indices with caps and participation rates.",
    "Surrender charges discourage early withdrawals; free withdrawal corridors may allow partial access.",
    "Annuitization converts accumulated value into an income stream. Payout options trade payment size against period certain and survivor protections.",
    "Qualified vs non-qualified annuities affects tax treatment of contributions and payouts — exam items love “already taxed money” vs pre-tax funding.",
    "Suitability requires matching liquidity needs, age, and risk tolerance to surrender schedules and product complexity.",
    "Annuities are not replacements for emergency funds. Exam ethics items punish pushing illiquid contracts on short-horizon buyers.",
  ],
  "insurance-ethics-texas": [
    "Ethics questions reward the most consumer-protective reasonable choice. If one option hides costs or pressures a vulnerable buyer, eliminate it first.",
    "Twisting is inducing replacement through misrepresentation. Churning is excessive replacement for commissions. Sliding is adding coverage without informed consent.",
    "Rebating is offering something of value not in the contract to induce a sale — distinct from lawful dividends on participating policies.",
    "Premium fiduciary duty: remit promptly, do not commingle, maintain accurate records. Small delays for “convenience” fail exams and real audits.",
    "Misrepresentation includes exaggerating benefits, inventing regulatory deadlines, and implying guaranty association protection as a sales sweetener.",
    "Privacy covers nonpublic personal information — protect applications, health details, and policy data.",
    "After licensing, market conduct complaints can trigger TDI investigation. Build honest habits during practice, not after your first claim dispute.",
  ],
  "pearson-vue-texas-insurance": [
    "Create your Pearson VUE account early and verify name matches ID exactly. Mismatches cause check-in stress you do not need on exam day.",
    "Arrive early; lockers and security rules vary by center but phones and notes stay out of the room.",
    "Expect multiple-choice single-best-answer items. Flag and move — perfectionism on item 12 steals time from item 112.",
    "Pretest items may not count toward score; you cannot tell which are which — treat every item seriously.",
    "Your score report shows pass/fail; use failing reports to rebuild a domain study plan before rebooking.",
    "Candidate agreements prohibit capturing or sharing live exam content. Educational practice aligned to public outlines is the lawful path.",
    "Sleep and hydration beat last-minute cramming of new product minutiae. Warm up with Texas law and ethics the morning of — not a new chapter on obscure riders.",
  ],
  "texas-life-health-study-plan": [
    "Week one builds vocabulary across life and health domains with untimed practice and explanations. Speed comes after accuracy.",
    "Mid-plan, add annuity and ethics-only sets. Write unethical behaviors on one index card and review daily.",
    "Texas law week should include regulator roles, appointments, guaranty purpose, replacement, unfair trade terms, and CE renewal basics.",
    "Final days are for timed mixed mocks with review only on domains below 70%. Do not introduce brand-new topics 48 hours before test day.",
    "If you work full time, two weeks means nightly 60–90 minute sessions — not passive video watching. Active questions beat passive listening.",
    "Track missed question IDs if your tool supports it; redo missed themes before new volume.",
    "Book the exam only when mock scores justify it — booking first and hoping is how retake revenue gets generated.",
  ],
  "free-texas-insurance-practice-test": [
    "Free preview questions exist to diagnose gaps, not to simulate full exam length. Use them to learn whether you are weak on products, ethics, or Texas law.",
    "Instant explanations are the product — read them even when you guess correctly. Correct guesses without reasoning repeat on exam day.",
    "When free items feel easy, increase difficulty with domain-only Texas drills and longer mocks — easy free sets do not predict pass results.",
    "Original educational content aligned to public exam themes is lawful and sustainable. Sites promising exact live forms are high-risk for you and for them.",
    "Unlocking the full bank is a one-time decision for many candidates — compare that to one retake fee plus lost work time.",
    "Pair free practice with printable Texas law review the week you schedule Pearson VUE.",
  ],
  "texas-property-casualty-license": [
    "Property & Casualty is a separate line of authority from Life & Health in Texas. Vehicles, homes, businesses, and liability forms dominate the syllabus.",
    "Homeowners policies split property (Section I) and liability (Section II). Know peril types: named peril vs open peril framing at exam level.",
    "Auto insurance combines liability, medical payments, uninsured motorists, and physical damage coverages — know minimum financial responsibility themes for Texas.",
    "Commercial general liability uses occurrence vs claims-made language — triggers and reporting matter for exam stems.",
    "Texas market conduct rules apply across lines: no misrepresentation, no claim fraud, fiduciary premiums, honest advertising.",
    "Our P&C bank is a starter set for vocabulary — expand with outlines and additional drills before booking the full P&C exam.",
    "One unlock on this site includes both L&H and P&C starter banks in the same browser session.",
  ],
};

export const LEARN_FAQS: Record<string, LearnFaq[]> = {
  "how-to-get-texas-life-health-license": [
    {
      question: "Do I need pre-licensing classroom hours for Texas Life & Health?",
      answer:
        "Many Texas Life & Health candidates are not required to complete mandatory pre-licensing classroom hours, but you must still pass the Pearson VUE exam and complete licensing steps including fingerprints and applications. Self-study discipline matters more when hours are not mandated.",
    },
    {
      question: "What exam code is used for Texas Life, Accident & Health?",
      answer:
        "Candidates typically sit for the InsTX-LAH exam. Public outlines describe general knowledge plus Texas-specific law sections. Verify current details on official TDI and Pearson VUE resources before you schedule.",
    },
    {
      question: "When should I schedule Pearson VUE?",
      answer:
        "Schedule after timed mixed practice mocks consistently meet or exceed 70%, with Texas law domains no longer your weakest area. Booking too early is a common reason for first-time failures.",
    },
    {
      question: "Is passing the exam the same as being ready to sell?",
      answer:
        "No. You also need an active license, carrier appointments, and ongoing compliance including continuing education. Passing is a major milestone, not the entire business launch.",
    },
  ],
  "texas-life-health-exam-pass-rate": [
    {
      question: "What is the Texas Life & Health first-time pass rate?",
      answer:
        "Public reporting often shows first-time pass rates in the mid-50% range depending on period and source. Treat that as a signal to take Texas law and timed practice seriously.",
    },
    {
      question: "Why do candidates fail if they know life insurance basics?",
      answer:
        "Many know product vocabulary but lose points on Texas-specific law, ethics, and consumer protection items. The exam blends both — strength in one area does not offset weakness in the other.",
    },
    {
      question: "What score should I target in practice mocks?",
      answer:
        "Aim for at least 70% on timed mixed mocks, with no major domain stuck below the mid-60s. A small buffer above 70% absorbs test-day stress.",
    },
    {
      question: "Are retakes common?",
      answer:
        "Yes, many producers pass on a second attempt. Retakes cost fees and time — targeted Texas law practice is usually cheaper than rebooking blindly.",
    },
  ],
  "texas-insurance-license-exam-cost": [
    {
      question: "How much does the Texas insurance exam cost?",
      answer:
        "Fees include Pearson VUE sitting charges plus fingerprinting and licensing application costs. Amounts change — confirm current pricing on official sites when you budget.",
    },
    {
      question: "Is a question bank cheaper than a full course?",
      answer:
        "Often yes for self-motivated learners. A focused bank plus Texas law sheet may cost less than one retake, while video courses help people who need structured instruction.",
    },
    {
      question: "Do appointments cost money?",
      answer:
        "Appointments are contractual with carriers, not an exam fee, but onboarding takes time. Plan runway if you are transitioning careers.",
    },
    {
      question: "Are exam dumps worth buying?",
      answer:
        "No — they are frequently wrong, unethical, and may violate candidate agreements. Use original practice aligned to public outlines instead.",
    },
  ],
  "texas-law-insurance-exam-guide": [
    {
      question: "Who regulates insurance in Texas?",
      answer:
        "The Texas Department of Insurance (TDI) oversees insurers and producer licensing frameworks. Pearson VUE administers exams under contract.",
    },
    {
      question: "What is the Texas guaranty association for?",
      answer:
        "It provides limited protection if a member insurer fails. It is not a sales benefit and should not be used as an inducement to buy coverage.",
    },
    {
      question: "What is twisting?",
      answer:
        "Twisting is inducing a policy replacement through misrepresentation or incomplete comparison — a classic unfair trade practice theme on Texas exams.",
    },
    {
      question: "How should I study Texas law the week before the exam?",
      answer:
        "Drill Texas-law-only questions, review a one-page checklist, and sleep. Avoid cramming entirely new product riders at the last minute.",
    },
  ],
  "life-insurance-basics-for-exam": [
    {
      question: "What is the difference between term and whole life?",
      answer:
        "Term provides temporary protection with little cash value. Whole life is permanent and typically builds cash value when premiums are paid as required.",
    },
    {
      question: "What are nonforfeiture options?",
      answer:
        "They let cash-value policy owners choose reduced paid-up insurance, extended term, or cash surrender instead of losing all value when premiums stop.",
    },
    {
      question: "What does incontestability mean?",
      answer:
        "After a stated period, the insurer’s ability to contest the policy based on application misrepresentation is sharply limited.",
    },
    {
      question: "What is insurable interest?",
      answer:
        "It must generally exist at policy issue to prevent wagering on another person’s life.",
    },
  ],
  "health-insurance-basics-for-exam": [
    {
      question: "What is the difference between a deductible and coinsurance?",
      answer:
        "The deductible is what you pay first on covered services. Coinsurance is the percentage split of remaining covered costs after the deductible.",
    },
    {
      question: "How do HMO and PPO plans differ?",
      answer:
        "HMOs emphasize network care and gatekeepers. PPOs offer more out-of-network flexibility at higher cost-sharing.",
    },
    {
      question: "What triggers long-term care benefits?",
      answer:
        "Inability to perform activities of daily living or cognitive impairment requiring custodial care — not acute hospital trivia.",
    },
    {
      question: "What is an elimination period in disability insurance?",
      answer:
        "It is the waiting period after disability begins before benefits start paying — longer elimination periods usually mean lower premiums.",
    },
  ],
  "annuity-basics-exam": [
    {
      question: "What is annuitization?",
      answer:
        "It converts accumulated contract value into a scheduled income stream using payout options defined in the contract.",
    },
    {
      question: "How does a fixed annuity differ from a variable annuity?",
      answer:
        "Fixed annuities credit insurer-backed rates. Variable annuities invest in separate accounts and expose the owner to market risk.",
    },
    {
      question: "What are surrender charges?",
      answer:
        "They penalize early withdrawals above free withdrawal limits during early contract years — liquidity matters for suitability.",
    },
    {
      question: "Why do exams emphasize suitability on annuities?",
      answer:
        "Complex, illiquid contracts harm buyers who need short-term access to funds. Suitability documentation protects consumers and producers.",
    },
  ],
  "insurance-ethics-texas": [
    {
      question: "What is rebating?",
      answer:
        "Offering something of value not specified in the contract to induce a sale — an improper inducement on licensing exams.",
    },
    {
      question: "How should producers handle client premiums?",
      answer:
        "Remit promptly, do not commingle with personal funds, and maintain accurate records — fiduciary handling is heavily tested.",
    },
    {
      question: "What is sliding?",
      answer:
        "Adding coverages or amounts without the insured’s informed consent — an unfair practice.",
    },
    {
      question: "How do I pick between two close ethics answers?",
      answer:
        "Choose the option with clearer disclosure, suitability, and consumer protection — not the one that maximizes commission or pressure.",
    },
  ],
  "pearson-vue-texas-insurance": [
    {
      question: "What ID rules apply at Pearson VUE?",
      answer:
        "Bring government-issued ID that matches your registration exactly. Requirements are listed on Pearson VUE’s candidate information — verify before test day.",
    },
    {
      question: "Can I use notes during the exam?",
      answer:
        "No — personal notes, phones, and unauthorized materials stay out of the testing room per center security rules.",
    },
    {
      question: "Are all exam questions scored?",
      answer:
        "Public outlines reference pretest items that may not count toward your score. Treat every item seriously because you cannot identify pretest questions.",
    },
    {
      question: "Should I use exam dumps?",
      answer:
        "No. They risk wrong answers, ethical issues, and agreement violations. Use lawful educational practice instead.",
    },
  ],
  "texas-life-health-study-plan": [
    {
      question: "How long should I study before booking?",
      answer:
        "Most active learners need focused weeks, not days — especially if starting from zero insurance background. Book when mocks justify it, not on hope.",
    },
    {
      question: "What should I study every day in week two?",
      answer:
        "Texas law, ethics verbs, and timed mixed mocks with review only on domains below 70%.",
    },
    {
      question: "Is one mock enough?",
      answer:
        "No — use multiple timed runs to build pacing for full-length exams and to confirm scores are stable, not lucky.",
    },
    {
      question: "Should I cram new riders the night before?",
      answer:
        "Light Texas law warm-up beats heavy new material. Sleep matters for recall under pressure.",
    },
  ],
  "free-texas-insurance-practice-test": [
    {
      question: "How many free questions can I try?",
      answer:
        "The site offers a free preview of practice questions with explanations — enough to diagnose weak domains before unlocking the full bank.",
    },
    {
      question: "Are these real Pearson VUE questions?",
      answer:
        "No. All items are original educational content aligned to public exam themes, not live exam recreations.",
    },
    {
      question: "When should I unlock the full bank?",
      answer:
        "When free preview items feel comfortable and you need volume, domain drills, and full-length timed mocks closer to InsTX-LAH pace.",
    },
    {
      question: "Does free practice include timed mocks?",
      answer:
        "Yes — a shorter free mock is available; full 130-question / 150-minute pace unlocks with the bank.",
    },
  ],
  "texas-property-casualty-license": [
    {
      question: "Is P&C the same license as Life & Health?",
      answer:
        "No — Property & Casualty is a separate line of authority with different exams and product focus.",
    },
    {
      question: "What topics appear on Texas P&C exams?",
      answer:
        "Homeowners, auto, commercial liability, and Texas market conduct themes among others — verify current outlines officially.",
    },
    {
      question: "Does the unlock include P&C questions?",
      answer:
        "Yes — the same browser unlock includes the Life & Health bank plus a P&C starter set on this site.",
    },
    {
      question: "Is the P&C bank a full exam simulation?",
      answer:
        "It is a starter bank for vocabulary and themes — expand with additional study before booking the full P&C exam.",
    },
  ],
};

export const LEARN_RELATED: Record<string, string[]> = {
  "how-to-get-texas-life-health-license": [
    "texas-life-health-study-plan",
    "texas-law-insurance-exam-guide",
    "pearson-vue-texas-insurance",
  ],
  "texas-life-health-exam-pass-rate": [
    "texas-law-insurance-exam-guide",
    "free-texas-insurance-practice-test",
    "texas-life-health-study-plan",
  ],
  "texas-insurance-license-exam-cost": [
    "how-to-get-texas-life-health-license",
    "free-texas-insurance-practice-test",
    "pricing",
  ],
  "texas-law-insurance-exam-guide": [
    "insurance-ethics-texas",
    "texas-life-health-exam-pass-rate",
    "life-insurance-basics-for-exam",
  ],
  "life-insurance-basics-for-exam": [
    "health-insurance-basics-for-exam",
    "annuity-basics-exam",
    "free-texas-insurance-practice-test",
  ],
  "health-insurance-basics-for-exam": [
    "life-insurance-basics-for-exam",
    "insurance-ethics-texas",
    "texas-life-health-study-plan",
  ],
  "annuity-basics-exam": [
    "life-insurance-basics-for-exam",
    "insurance-ethics-texas",
    "texas-law-insurance-exam-guide",
  ],
  "insurance-ethics-texas": [
    "texas-law-insurance-exam-guide",
    "texas-life-health-exam-pass-rate",
    "pearson-vue-texas-insurance",
  ],
  "pearson-vue-texas-insurance": [
    "texas-life-health-study-plan",
    "free-texas-insurance-practice-test",
    "how-to-get-texas-life-health-license",
  ],
  "texas-life-health-study-plan": [
    "texas-law-insurance-exam-guide",
    "life-insurance-basics-for-exam",
    "health-insurance-basics-for-exam",
  ],
  "free-texas-insurance-practice-test": [
    "texas-life-health-exam-pass-rate",
    "how-to-get-texas-life-health-license",
    "pricing",
  ],
  "texas-property-casualty-license": [
    "insurance-ethics-texas",
    "texas-law-insurance-exam-guide",
    "free-texas-insurance-practice-test",
  ],
};
